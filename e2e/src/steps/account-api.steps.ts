import { Given, Then, When } from '@cucumber/cucumber';
import { strict as assert } from 'assert';
import { PhrasalWorld } from '../world';
import { ApiClient } from '../support/api-client';
import {
    ACCOUNT_DELETED_SUBJECT, ACCOUNT_EXISTS_SUBJECT, EMAIL_CHANGED_SUBJECT, EMAIL_CHANGE_SUBJECT, countMessagesTo, emailChangeToken,
    latestMessageTo,
} from '../support/mailpit-client';
import { nextAcceptedCode } from '../support/totp';
import { TEST_PASSWORD, uniqueEmail } from '../support/test-users';

const AUTH = '/api/v1/auth';
const ME = '/api/v1/me';

/** The second browser of a scenario; each scenario gets its own world, so nothing leaks between them. */
const otherDevices = new WeakMap<PhrasalWorld, ApiClient>();

function currentEmail(world: PhrasalWorld): string {
    assert.ok(world.currentEmail, 'No current email: register a user first');
    return world.currentEmail!;
}

async function changePassword(world: PhrasalWorld, currentPassword: string, newPassword: string) {
    world.lastResponse = await world.apiClient.post(`${ME}/password`, { currentPassword, newPassword });
}

Given('I am also logged in on another device', async function (this: PhrasalWorld) {
    const device = new ApiClient(`http://localhost:${process.env.BACKEND_PORT || '8080'}`);
    const response = await device.post(`${AUTH}/login`, { email: currentEmail(this), password: TEST_PASSWORD });
    assert.equal(response.status, 200, 'Login on the other device failed');
    otherDevices.set(this, device);
});

When('I change my password from {string} to {string}', async function (this: PhrasalWorld, current: string, next: string) {
    await changePassword(this, current, next);
});

When('I change my password with the wrong current password', async function (this: PhrasalWorld) {
    await changePassword(this, 'definitely-not-my-password', 'e2e-brand-new-password-1');
});

When('I request the profile on the other device', async function (this: PhrasalWorld) {
    const device = otherDevices.get(this);
    assert.ok(device, 'No other device: log in on another device first');
    this.lastResponse = await device!.get(`${AUTH}/me`);
});

Then('the new password error should mention {string}', function (this: PhrasalWorld, text: string) {
    assert.ok(this.lastResponse, 'No response recorded');
    const message: string | undefined = this.lastResponse!.data?.errors?.newPassword;
    assert.ok(message?.includes(text), `Expected new password error to mention "${text}", got: ${message}`);
});

async function requestEmailChange(world: PhrasalWorld, newEmail: string, password: string) {
    world.newEmail = newEmail;
    world.lastResponse = await world.apiClient.post(`${ME}/email`, { newEmail, currentPassword: password });
}

function newEmailOf(world: PhrasalWorld): string {
    assert.ok(world.newEmail, 'No new email: request an email change first');
    return world.newEmail!;
}

When('I request an email change to a new address with password {string}', async function (this: PhrasalWorld, password: string) {
    await requestEmailChange(this, uniqueEmail(), password);
});

When('I request an email change to the address of another registered user', async function (this: PhrasalWorld) {
    const other = new ApiClient(`http://localhost:${process.env.BACKEND_PORT || '8080'}`);
    const email = uniqueEmail();
    const response = await other.post(`${AUTH}/register`, { email, password: TEST_PASSWORD });
    assert.equal(response.status, 202, 'Registering the other user failed');
    await requestEmailChange(this, email, TEST_PASSWORD);
});

When('I request an email change to my current address', async function (this: PhrasalWorld) {
    await requestEmailChange(this, currentEmail(this), TEST_PASSWORD);
});

Then('I should receive an email change link at the new address', async function (this: PhrasalWorld) {
    const message = await latestMessageTo(newEmailOf(this), { subject: EMAIL_CHANGE_SUBJECT });
    assert.equal(message.subject, EMAIL_CHANGE_SUBJECT);
});

Then('no email change link should be sent to the new address', async function (this: PhrasalWorld) {
    assert.equal(await countMessagesTo(newEmailOf(this), EMAIL_CHANGE_SUBJECT), 0);
});

Then('the other user\'s address should receive an account exists notice', async function (this: PhrasalWorld) {
    const message = await latestMessageTo(newEmailOf(this), { subject: ACCOUNT_EXISTS_SUBJECT });
    assert.equal(message.subject, ACCOUNT_EXISTS_SUBJECT);
});

When('I confirm the email change with the link from my email', async function (this: PhrasalWorld) {
    const token = await emailChangeToken(newEmailOf(this));
    this.lastResponse = await this.apiClient.post(`${AUTH}/confirm-email-change`, { token });
});

Then('the old address should receive an email changed notice', async function (this: PhrasalWorld) {
    const message = await latestMessageTo(currentEmail(this), { subject: EMAIL_CHANGED_SUBJECT });
    assert.ok(message.text.includes(newEmailOf(this)), 'Expected the notice to name the new address');
});

When('I confirm the email change with the link from my email again', async function (this: PhrasalWorld) {
    const token = await emailChangeToken(newEmailOf(this));
    this.lastResponse = await this.apiClient.post(`${AUTH}/confirm-email-change`, { token });
});

When('I log in with the new email and password {string}', async function (this: PhrasalWorld, password: string) {
    this.lastResponse = await this.apiClient.post(`${AUTH}/login`, { email: newEmailOf(this), password });
});

When('I delete my account with password {string}', async function (this: PhrasalWorld, password: string) {
    this.lastResponse = await this.apiClient.post(`${ME}/delete`, { password });
});

When(
    'I delete my account with password {string} and a valid two-factor code',
    { timeout: 65_000 },
    async function (this: PhrasalWorld, password: string) {
        assert.ok(this.twoFactorSecret, 'No two-factor secret: enable two-factor first');
        const { code, step } = await nextAcceptedCode(this.twoFactorSecret!, this.lastTotpStep);
        this.lastTotpStep = step;
        this.lastResponse = await this.apiClient.post(`${ME}/delete`, { password, code });
    },
);

Then('I should receive an account deleted notice', async function (this: PhrasalWorld) {
    const message = await latestMessageTo(currentEmail(this), { subject: ACCOUNT_DELETED_SUBJECT });
    assert.equal(message.subject, ACCOUNT_DELETED_SUBJECT);
});

When('I register again with my old email', async function (this: PhrasalWorld) {
    this.lastResponse = await this.apiClient.post(`${AUTH}/register`, { email: currentEmail(this), password: TEST_PASSWORD });
});
