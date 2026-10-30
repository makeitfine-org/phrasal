import { After, Given, When, Then } from '@cucumber/cucumber';
import { strict as assert } from 'assert';
import { PhrasalWorld } from '../world';
import { TEST_PASSWORD, adminCredentials } from '../support/test-users';
import { resetAdminTwoFactor } from '../support/admin-two-factor';
import { nextAcceptedCode, normalizeSecret } from '../support/totp';

const FRONTEND_URL = `http://localhost:${process.env.FRONTEND_PORT || '3000'}`;
const PAGE_TIMEOUT = 10_000;
const CODE_STEP_TIMEOUT_MS = 65_000;
const SECURITY_PATH = '/account/security';
const CODE_PATH = '/login/2fa';

async function freshCode(world: PhrasalWorld): Promise<string> {
    assert.ok(world.twoFactorSecret, 'No two-factor secret: turn on two-factor authentication first');
    const { code, step } = await nextAcceptedCode(world.twoFactorSecret!, world.lastTotpStep);
    world.lastTotpStep = step;
    return code;
}

async function openSecurityPage(world: PhrasalWorld) {
    await world.page!.goto(`${FRONTEND_URL}${SECURITY_PATH}`);
}

async function fillAndSubmit(world: PhrasalWorld, prefix: string, code: string) {
    const page = world.page!;
    await page.getByTestId(`${prefix}-code`).fill(code);
    await page.getByTestId(`${prefix}-submit`).click();
}

async function logInAs(world: PhrasalWorld, email: string, password: string) {
    const page = world.page!;
    await page.goto(`${FRONTEND_URL}/login`);
    await page.getByTestId('login-email').fill(email);
    await page.getByTestId('login-password').fill(password);
    await page.getByTestId('login-submit').click();
}

async function enrollThroughPage(world: PhrasalWorld, password: string) {
    const page = world.page!;
    await openSecurityPage(world);
    await page.getByTestId('two-factor-enable').click();
    await page.getByTestId('two-factor-password').fill(password);
    await page.getByTestId('two-factor-password-submit').click();
    const shown = await page.getByTestId('two-factor-secret').textContent({ timeout: PAGE_TIMEOUT });
    world.twoFactorSecret = normalizeSecret(shown ?? '');
    await fillAndSubmit(world, 'two-factor-confirm', await freshCode(world));
    await page.getByTestId('recovery-code').first().waitFor({ timeout: PAGE_TIMEOUT });
    const codes = await page.getByTestId('recovery-code').allTextContents();
    world.recoveryCodes = codes.map((text) => text.trim());
}

When(
    'I turn on two-factor authentication through the account security page',
    { timeout: CODE_STEP_TIMEOUT_MS },
    async function (this: PhrasalWorld) {
        await enrollThroughPage(this, TEST_PASSWORD);
    },
);

Given(
    'I am logged in through the form as the admin without two-factor',
    async function (this: PhrasalWorld) {
        await resetAdminTwoFactor();
        const { email, password } = adminCredentials();
        this.currentEmail = email;
        await logInAs(this, email, password);
        await this.page!.getByTestId('user-menu').waitFor({ timeout: PAGE_TIMEOUT });
    },
);

When(
    'I turn on two-factor authentication through the account security page as the admin',
    { timeout: CODE_STEP_TIMEOUT_MS },
    async function (this: PhrasalWorld) {
        await enrollThroughPage(this, adminCredentials().password);
    },
);

Then('I should see {int} recovery codes', async function (this: PhrasalWorld, count: number) {
    assert.equal(this.recoveryCodes.length, count);
    assert.equal(new Set(this.recoveryCodes).size, count, 'Recovery codes must be distinct');
});

When('I finish saving my recovery codes', async function (this: PhrasalWorld) {
    await this.page!.getByTestId('recovery-codes-done').click();
    await this.page!.getByTestId('two-factor-status').waitFor({ timeout: PAGE_TIMEOUT });
});

When('I enter a valid two-factor code', { timeout: CODE_STEP_TIMEOUT_MS }, async function (this: PhrasalWorld) {
    await fillAndSubmit(this, 'two-factor', await freshCode(this));
    await this.page!.getByTestId('user-menu').waitFor({ timeout: PAGE_TIMEOUT });
});

When('I enter recovery code number {int}', async function (this: PhrasalWorld, number: number) {
    assert.ok(number >= 1 && number <= this.recoveryCodes.length, `No recovery code number ${number}`);
    const page = this.page!;
    await page.getByTestId('two-factor-use-recovery').click();
    await page.getByTestId('two-factor-recovery-code').fill(this.recoveryCodes[number - 1]);
    await page.getByTestId('two-factor-submit').click();
    await page.getByTestId('user-menu').waitFor({ timeout: PAGE_TIMEOUT });
});

When('I enter the two-factor code {string}', async function (this: PhrasalWorld, code: string) {
    await fillAndSubmit(this, 'two-factor', code);
    await this.page!.getByTestId('two-factor-error').waitFor({ timeout: PAGE_TIMEOUT });
});

When(
    'I turn off two-factor authentication with a valid code',
    { timeout: CODE_STEP_TIMEOUT_MS },
    async function (this: PhrasalWorld) {
        await openSecurityPage(this);
        await this.page!.getByTestId('two-factor-disable').click();
        await fillAndSubmit(this, 'two-factor-disable', await freshCode(this));
        await this.page!.getByTestId('two-factor-enable').waitFor({ timeout: PAGE_TIMEOUT });
    },
);

When('I log in through the form and reach the two-factor code page', async function (this: PhrasalWorld) {
    await logInAs(this, this.currentEmail!, TEST_PASSWORD);
    await this.page!.waitForURL(`**${CODE_PATH}`, { timeout: PAGE_TIMEOUT });
});

Then('I should be on the two-factor code page', async function (this: PhrasalWorld) {
    await this.page!.waitForURL(`**${CODE_PATH}`, { timeout: PAGE_TIMEOUT });
    await this.page!.getByTestId('two-factor-code').waitFor({ timeout: PAGE_TIMEOUT });
});

Then(
    'the account security page should show two-factor authentication as {string}',
    async function (this: PhrasalWorld, state: string) {
        await openSecurityPage(this);
        const status = this.page!.getByTestId('two-factor-status');
        await status.waitFor({ timeout: PAGE_TIMEOUT });
        assert.ok(
            (await status.textContent())?.toLowerCase().includes(` ${state.toLowerCase()}`),
            `Expected two-factor authentication to be ${state}`,
        );
    },
);

Then('I should see the two-factor enrollment banner', async function (this: PhrasalWorld) {
    await this.page!.goto(FRONTEND_URL);
    await this.page!.getByTestId('two-factor-enrollment-banner').waitFor({ timeout: PAGE_TIMEOUT });
});

Then('I should not see the two-factor enrollment banner', async function (this: PhrasalWorld) {
    await this.page!.goto(FRONTEND_URL);
    await this.page!.getByTestId('user-menu').waitFor({ timeout: PAGE_TIMEOUT });
    assert.equal(await this.page!.getByTestId('two-factor-enrollment-banner').count(), 0);
});

When('I visit the account security page', async function (this: PhrasalWorld) {
    await openSecurityPage(this);
});

Then('I should be on the login page', async function (this: PhrasalWorld) {
    await this.page!.waitForURL('**/login', { timeout: PAGE_TIMEOUT });
});

// The admin account is shared by the whole run: a browser scenario that enrolled it leaves no secret in the API
// steps' state, so clear it in the database for the next API scenario.
After({ tags: '@admin-two-factor' }, async function () {
    await resetAdminTwoFactor();
});
