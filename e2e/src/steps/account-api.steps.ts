import { Given, Then, When } from '@cucumber/cucumber';
import { strict as assert } from 'assert';
import { PhrasalWorld } from '../world';
import { ApiClient } from '../support/api-client';
import { TEST_PASSWORD } from '../support/test-users';

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
