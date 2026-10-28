import { Given, When, Then } from '@cucumber/cucumber';
import { strict as assert } from 'assert';
import { PhrasalWorld } from '../world';
import { verificationToken } from '../support/mailpit-client';
import { TEST_PASSWORD, adminCredentials, uniqueEmail } from '../support/test-users';

const AUTH = '/api/v1/auth';

async function register(world: PhrasalWorld, email: string, password: string) {
    world.currentEmail = email;
    world.lastResponse = await world.apiClient.post(`${AUTH}/register`, { email, password });
    world.firstRegistrationResponse ??= world.lastResponse;
}

async function login(world: PhrasalWorld, email: string, password: string) {
    world.lastResponse = await world.apiClient.post(`${AUTH}/login`, { email, password });
}

async function verifyCurrentEmail(world: PhrasalWorld) {
    const token = await verificationToken(currentEmail(world));
    world.verificationTokens.push(token);
    world.lastResponse = await world.apiClient.post(`${AUTH}/verify-email`, { token });
    assert.equal(world.lastResponse!.status, 204, 'Email verification failed');
}

function currentEmail(world: PhrasalWorld): string {
    assert.ok(world.currentEmail, 'No current email: register a user first');
    return world.currentEmail!;
}

Given('I am logged in as the admin', async function (this: PhrasalWorld) {
    const { email, password } = adminCredentials();
    this.currentEmail = email;
    await login(this, email, password);
    assert.equal(this.lastResponse!.status, 200, 'Admin login failed');
});

Given('I am logged in as a new user', async function (this: PhrasalWorld) {
    await register(this, uniqueEmail(), TEST_PASSWORD);
    assert.equal(this.lastResponse!.status, 202, 'Registration failed');
    await verifyCurrentEmail(this);
    await login(this, currentEmail(this), TEST_PASSWORD);
    assert.equal(this.lastResponse!.status, 200, 'Login failed');
});

Given('a registered user exists', async function (this: PhrasalWorld) {
    await register(this, uniqueEmail(), TEST_PASSWORD);
    assert.equal(this.lastResponse!.status, 202, 'Registration failed');
    await verifyCurrentEmail(this);
    this.apiClient.clearCookies();
});

Given('an unverified user exists', async function (this: PhrasalWorld) {
    await register(this, uniqueEmail(), TEST_PASSWORD);
    assert.equal(this.lastResponse!.status, 202, 'Registration failed');
    this.apiClient.clearCookies();
});

When('I register with a new email and password {string}', async function (this: PhrasalWorld, password: string) {
    await register(this, uniqueEmail(), password);
});

When('I register again with the same email', async function (this: PhrasalWorld) {
    await register(this, currentEmail(this), TEST_PASSWORD);
});

When('I log in with the current email and password {string}', async function (this: PhrasalWorld, password: string) {
    await login(this, currentEmail(this), password);
});

When('I request my profile', async function (this: PhrasalWorld) {
    this.lastResponse = await this.apiClient.get(`${AUTH}/me`);
});

When('I log out', async function (this: PhrasalWorld) {
    this.lastResponse = await this.apiClient.post(`${AUTH}/logout`);
});

When('I fail to log in {int} times', async function (this: PhrasalWorld, attempts: number) {
    for (let attempt = 0; attempt < attempts; attempt++) {
        await login(this, currentEmail(this), 'definitely-wrong-password');
    }
});

Then('the profile email should be the current email', function (this: PhrasalWorld) {
    assert.ok(this.lastResponse, 'No response recorded');
    assert.equal(this.lastResponse!.data.email, currentEmail(this));
});

Then('the response should equal the first registration response', function (this: PhrasalWorld) {
    assert.ok(this.lastResponse && this.firstRegistrationResponse, 'No registration responses recorded');
    assert.equal(this.lastResponse!.status, this.firstRegistrationResponse!.status);
    assert.deepEqual(this.lastResponse!.data, this.firstRegistrationResponse!.data);
});

Then('the response role should be {string}', function (this: PhrasalWorld, role: string) {
    assert.ok(this.lastResponse, 'No response recorded');
    assert.equal(this.lastResponse!.data.role, role);
});

Then('the response should contain a numeric id', function (this: PhrasalWorld) {
    assert.ok(this.lastResponse, 'No response recorded');
    assert.equal(typeof this.lastResponse!.data.id, 'number');
});
