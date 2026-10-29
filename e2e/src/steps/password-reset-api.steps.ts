import { When, Then } from '@cucumber/cucumber';
import { strict as assert } from 'assert';
import { PhrasalWorld } from '../world';
import { ApiClient } from '../support/api-client';
import {
    PASSWORD_CHANGED_SUBJECT,
    PASSWORD_RESET_SUBJECT,
    countMessagesTo,
    latestMessageTo,
    passwordResetToken,
} from '../support/mailpit-client';
import { uniqueEmail } from '../support/test-users';

const AUTH = '/api/v1/auth';
const NOTHING_SENT_WAIT_MS = 2_000;
const POLL_INTERVAL_MS = 250;
const CHECK_INBOX_MESSAGE = 'If this address can be used, we have sent a link to it. Check your inbox.';
const VALID_PASSWORD = 'e2e-other-password-456';

function currentEmail(world: PhrasalWorld): string {
    assert.ok(world.currentEmail, 'No current email: register a user first');
    return world.currentEmail!;
}

async function requestReset(world: PhrasalWorld, email: string) {
    world.lastResponse = await world.apiClient.post(`${AUTH}/forgot-password`, { email });
}

async function resetWith(client: ApiClient, token: string, password: string) {
    return client.post(`${AUTH}/reset-password`, { token, password });
}

async function awaitResetMailCount(address: string, expected: number, timeoutMs = 10_000): Promise<number> {
    const deadline = Date.now() + timeoutMs;
    let count = await countMessagesTo(address, PASSWORD_RESET_SUBJECT);
    while (count < expected && Date.now() < deadline) {
        await new Promise((resolve) => setTimeout(resolve, POLL_INTERVAL_MS));
        count = await countMessagesTo(address, PASSWORD_RESET_SUBJECT);
    }
    return count;
}

When('I request a password reset', async function (this: PhrasalWorld) {
    await requestReset(this, currentEmail(this));
});

When('I request a password reset for an unknown address', async function (this: PhrasalWorld) {
    this.currentEmail = uniqueEmail();
    await requestReset(this, this.currentEmail);
});

When('I request a password reset {int} times', async function (this: PhrasalWorld, times: number) {
    const email = currentEmail(this);
    for (let attempt = 1; attempt <= times; attempt++) {
        await requestReset(this, email);
        if (this.lastResponse!.status === 202) {
            // wait for the mail so tokens are recorded in order and each request invalidates the one before
            assert.equal(await awaitResetMailCount(email, attempt), attempt);
            this.resetTokens.push(await passwordResetToken(email));
        }
    }
});

Then('I should receive a password reset email', async function (this: PhrasalWorld) {
    const token = await passwordResetToken(currentEmail(this));
    assert.equal(token.length, 43);
    if (!this.resetTokens.includes(token)) {
        this.resetTokens.push(token);
    }
});

Then('I should have received {int} password reset emails', async function (this: PhrasalWorld, expected: number) {
    assert.equal(await awaitResetMailCount(currentEmail(this), expected), expected);
});

Then('no password reset email should have been sent to that address', async function (this: PhrasalWorld) {
    await new Promise((resolve) => setTimeout(resolve, NOTHING_SENT_WAIT_MS));
    assert.equal(await countMessagesTo(currentEmail(this), PASSWORD_RESET_SUBJECT), 0);
});

When('I reset my password to {string} with the link from my email', async function (this: PhrasalWorld, password: string) {
    const token = await passwordResetToken(currentEmail(this));
    if (!this.resetTokens.includes(token)) {
        this.resetTokens.push(token);
    }
    this.lastResponse = await resetWith(this.apiClient, token, password);
});

When('I reset my password to {string} from another device', async function (this: PhrasalWorld, password: string) {
    const token = await passwordResetToken(currentEmail(this));
    const otherDevice = new ApiClient(`http://localhost:${process.env.BACKEND_PORT || '8080'}`);
    this.lastResponse = await resetWith(otherDevice, token, password);
});

When('I reset my password to {string} with the token {string}', async function (this: PhrasalWorld, password: string, token: string) {
    this.lastResponse = await resetWith(this.apiClient, token, password);
});

When('I use the same reset link again with the password {string}', async function (this: PhrasalWorld, password: string) {
    assert.ok(this.resetTokens.length > 0, 'No reset token was recorded');
    this.lastResponse = await resetWith(this.apiClient, this.resetTokens[this.resetTokens.length - 1], password);
});

Then('the previous password reset link should no longer work', async function (this: PhrasalWorld) {
    assert.ok(this.resetTokens.length > 1, 'Fewer than two reset tokens were recorded');
    this.lastResponse = await resetWith(this.apiClient, this.resetTokens[0], VALID_PASSWORD);
    assert.equal(this.lastResponse.status, 400);
});

Then('I should receive a password changed notice', async function (this: PhrasalWorld) {
    const message = await latestMessageTo(currentEmail(this), { subject: PASSWORD_CHANGED_SUBJECT });
    assert.equal(message.subject, PASSWORD_CHANGED_SUBJECT);
});

Then('the response should be the check-your-inbox message', function (this: PhrasalWorld) {
    assert.deepEqual(this.lastResponse!.data, { message: CHECK_INBOX_MESSAGE });
});
