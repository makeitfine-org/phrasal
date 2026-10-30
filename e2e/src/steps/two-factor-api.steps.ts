import { Given, When, Then } from '@cucumber/cucumber';
import { strict as assert } from 'assert';
import { PhrasalWorld } from '../world';
import { TEST_PASSWORD, adminCredentials } from '../support/test-users';
import { adminState } from '../support/admin-two-factor';
import { latestMessageTo } from '../support/mailpit-client';
import { codeForStep, nextAcceptedCode } from '../support/totp';

const AUTH = '/api/v1/auth';
const TWO_FA = '/api/v1/me/2fa';
const CODE_STEP_TIMEOUT_MS = 65_000;

function currentEmail(world: PhrasalWorld): string {
    assert.ok(world.currentEmail, 'No current email: register a user first');
    return world.currentEmail!;
}

function secret(world: PhrasalWorld): string {
    assert.ok(world.twoFactorSecret, 'No two-factor secret: start two-factor setup first');
    return world.twoFactorSecret!;
}

/** A code the server has not accepted yet; remembers its step so the next call moves on. */
async function freshCode(world: PhrasalWorld): Promise<string> {
    const { code, step } = await nextAcceptedCode(secret(world), world.lastTotpStep);
    world.lastTotpStep = step;
    return code;
}

async function startSetup(world: PhrasalWorld, password: string) {
    world.lastResponse = await world.apiClient.post(`${TWO_FA}/setup`, { password });
    if (world.lastResponse.status === 200) {
        world.twoFactorSecret = world.lastResponse.data.secret;
    }
}

async function confirmSetup(world: PhrasalWorld, code: string) {
    world.lastResponse = await world.apiClient.post(`${TWO_FA}/confirm`, { code });
    if (world.lastResponse.status === 200) {
        world.recoveryCodes = world.lastResponse.data.recoveryCodes;
    }
}

async function loginAgain(world: PhrasalWorld) {
    world.lastResponse = await world.apiClient.post(`${AUTH}/login`, {
        email: currentEmail(world),
        password: TEST_PASSWORD,
    });
}

async function submitSecondFactor(world: PhrasalWorld, code: string) {
    world.lastResponse = await world.apiClient.post(`${AUTH}/login/2fa`, { code });
}

function recoveryCode(world: PhrasalWorld, number: number): string {
    assert.ok(number >= 1 && number <= world.recoveryCodes.length, `No recovery code number ${number}`);
    return world.recoveryCodes[number - 1];
}

When('I start two-factor setup with my password', async function (this: PhrasalWorld) {
    await startSetup(this, TEST_PASSWORD);
});

When('I start two-factor setup with password {string}', async function (this: PhrasalWorld, password: string) {
    await startSetup(this, password);
});

When(
    'I confirm two-factor setup with a valid code',
    { timeout: CODE_STEP_TIMEOUT_MS },
    async function (this: PhrasalWorld) {
        await confirmSetup(this, await freshCode(this));
    },
);

When('I confirm two-factor setup with code {string}', async function (this: PhrasalWorld, code: string) {
    await confirmSetup(this, code);
});

Given('I have two-factor authentication enabled', { timeout: CODE_STEP_TIMEOUT_MS }, async function (this: PhrasalWorld) {
    await startSetup(this, TEST_PASSWORD);
    assert.equal(this.lastResponse!.status, 200, 'Two-factor setup failed');
    await confirmSetup(this, await freshCode(this));
    assert.equal(this.lastResponse!.status, 200, 'Two-factor confirmation failed');
});

When('I submit a valid two-factor code', { timeout: CODE_STEP_TIMEOUT_MS }, async function (this: PhrasalWorld) {
    await submitSecondFactor(this, await freshCode(this));
});

When('I submit the same two-factor code again', async function (this: PhrasalWorld) {
    assert.ok(this.lastTotpStep !== null, 'No two-factor code was used yet');
    await submitSecondFactor(this, codeForStep(secret(this), this.lastTotpStep!));
});

When('I log in again as the admin', async function (this: PhrasalWorld) {
    const { email, password } = adminCredentials();
    this.lastResponse = await this.apiClient.post(`${AUTH}/login`, { email, password });
});

When('I submit the admin two-factor code', { timeout: CODE_STEP_TIMEOUT_MS }, async function (this: PhrasalWorld) {
    assert.ok(adminState, 'The admin has no two-factor state: log in as the admin first');
    const { code, step } = await nextAcceptedCode(adminState!.secret, adminState!.lastStep);
    adminState!.lastStep = step;
    await submitSecondFactor(this, code);
});

When('I submit two-factor code {string}', async function (this: PhrasalWorld, code: string) {
    await submitSecondFactor(this, code);
});

When('I submit recovery code number {int}', async function (this: PhrasalWorld, number: number) {
    await submitSecondFactor(this, recoveryCode(this, number));
});

When('I log in again with the current email and password', async function (this: PhrasalWorld) {
    await loginAgain(this);
});

When('I disable two-factor authentication with a valid code', { timeout: CODE_STEP_TIMEOUT_MS }, async function (this: PhrasalWorld) {
    this.lastResponse = await this.apiClient.post(`${TWO_FA}/disable`, { code: await freshCode(this) });
});

When('I regenerate recovery codes with a valid code', { timeout: CODE_STEP_TIMEOUT_MS }, async function (this: PhrasalWorld) {
    this.lastResponse = await this.apiClient.post(`${TWO_FA}/recovery-codes`, { code: await freshCode(this) });
    if (this.lastResponse.status === 200) {
        this.previousRecoveryCodes = this.recoveryCodes;
        this.recoveryCodes = this.lastResponse.data.recoveryCodes;
    }
});

When('I submit {int} wrong two-factor codes', async function (this: PhrasalWorld, attempts: number) {
    for (let attempt = 0; attempt < attempts; attempt++) {
        await submitSecondFactor(this, '000000');
    }
});

When('I submit the old recovery code number {int}', async function (this: PhrasalWorld, number: number) {
    assert.ok(this.previousRecoveryCodes.length >= number, 'No previous recovery codes recorded');
    await submitSecondFactor(this, this.previousRecoveryCodes[number - 1]);
});

Then('the login should ask for a second factor', function (this: PhrasalWorld) {
    assert.ok(this.lastResponse, 'No response recorded');
    assert.equal(this.lastResponse!.status, 202);
    assert.equal(this.lastResponse!.data.twoFactorRequired, true);
});

Then('I should receive {int} recovery codes', function (this: PhrasalWorld, count: number) {
    assert.ok(this.lastResponse, 'No response recorded');
    const codes: string[] = this.lastResponse!.data.recoveryCodes;
    assert.equal(codes.length, count);
    assert.equal(new Set(codes).size, count, 'Recovery codes must be distinct');
});

Then('the two-factor status should be {string}', async function (this: PhrasalWorld, status: string) {
    const response = await this.apiClient.get(TWO_FA);
    assert.equal(response.status, 200);
    assert.equal(response.data.enabled, status === 'enabled');
});

Then('I should receive the email {string}', async function (this: PhrasalWorld, subject: string) {
    const message = await latestMessageTo(currentEmail(this), { subject });
    assert.equal(message.subject, subject);
});
