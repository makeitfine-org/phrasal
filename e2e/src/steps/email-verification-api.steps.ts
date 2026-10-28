import { When, Then } from '@cucumber/cucumber';
import { strict as assert } from 'assert';
import { PhrasalWorld } from '../world';
import { countMessagesTo, verificationToken } from '../support/mailpit-client';
import { uniqueEmail } from '../support/test-users';

const AUTH = '/api/v1/auth';
const NOTHING_SENT_WAIT_MS = 2_000;

function currentEmail(world: PhrasalWorld): string {
    assert.ok(world.currentEmail, 'No current email: register a user first');
    return world.currentEmail!;
}

async function verifyWith(world: PhrasalWorld, token: string) {
    world.lastResponse = await world.apiClient.post(`${AUTH}/verify-email`, { token });
}

async function awaitMessageCount(address: string, expected: number, timeoutMs = 10_000): Promise<number> {
    const deadline = Date.now() + timeoutMs;
    let count = await countMessagesTo(address);
    while (count < expected && Date.now() < deadline) {
        await new Promise((resolve) => setTimeout(resolve, 250));
        count = await countMessagesTo(address);
    }
    return count;
}

When('I open the verification link from my email', async function (this: PhrasalWorld) {
    const token = await verificationToken(currentEmail(this));
    if (!this.verificationTokens.includes(token)) {
        this.verificationTokens.push(token);
    }
    await verifyWith(this, token);
});

When('I verify with the token {string}', async function (this: PhrasalWorld, token: string) {
    await verifyWith(this, token);
});

When('I request a new verification email', async function (this: PhrasalWorld) {
    this.verificationTokens.push(await verificationToken(currentEmail(this)));
    this.lastResponse = await this.apiClient.post(`${AUTH}/resend-verification`, { email: currentEmail(this) });
});

When('I request a new verification email for an unknown address', async function (this: PhrasalWorld) {
    this.currentEmail = uniqueEmail();
    this.lastResponse = await this.apiClient.post(`${AUTH}/resend-verification`, { email: this.currentEmail });
});

Then('I should receive a verification email', async function (this: PhrasalWorld) {
    const token = await verificationToken(currentEmail(this));
    assert.equal(token.length, 43);
});

Then('I should have received {int} verification emails', async function (this: PhrasalWorld, expected: number) {
    assert.equal(await awaitMessageCount(currentEmail(this), expected), expected);
});

Then('the previous verification link should no longer work', async function (this: PhrasalWorld) {
    assert.ok(this.verificationTokens.length > 0, 'No earlier verification token was recorded');
    await verifyWith(this, this.verificationTokens[0]);
    assert.equal(this.lastResponse!.status, 400);
});

Then('no email should have been sent to that address', async function (this: PhrasalWorld) {
    await new Promise((resolve) => setTimeout(resolve, NOTHING_SENT_WAIT_MS));
    assert.equal(await countMessagesTo(currentEmail(this)), 0);
});
