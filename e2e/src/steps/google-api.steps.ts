import { When, Then } from '@cucumber/cucumber';
import { strict as assert } from 'assert';
import { PhrasalWorld } from '../world';
import { MOCK_OAUTH2_URL } from '../support/mock-oauth2';

const AUTH = '/api/v1/auth';
const APP_BASE_URL = process.env.APP_BASE_URL || `http://localhost:${process.env.FRONTEND_PORT || '3000'}`;

function location(world: PhrasalWorld): string {
    assert.ok(world.lastResponse, 'No response recorded');
    const value = world.lastResponse!.headers['location'];
    assert.ok(value, `Expected a Location header, got status ${world.lastResponse!.status}`);
    return value;
}

When('I request the sign-in providers', async function (this: PhrasalWorld) {
    this.lastResponse = await this.apiClient.get(`${AUTH}/providers`);
});

Then('Google sign-in should be enabled', function (this: PhrasalWorld) {
    assert.equal(this.lastResponse!.data.google, true);
});

When('I start a Google sign-in', async function (this: PhrasalWorld) {
    this.lastResponse = await this.apiClient.getWithoutRedirect(`${AUTH}/oauth2/authorization/google`);
});

Then("I should be redirected to the Google stand-in with the app's callback URL", function (this: PhrasalWorld) {
    assert.equal(this.lastResponse!.status, 302);
    const target = new URL(location(this));
    assert.equal(`${target.origin}${target.pathname}`, `${MOCK_OAUTH2_URL}/default/authorize`);
    const params = target.searchParams;
    assert.ok(params.get('client_id'), 'Expected a client_id');
    assert.equal(params.get('response_type'), 'code');
    assert.deepEqual(params.get('scope')?.split(' ').sort(), ['email', 'openid', 'profile']);
    assert.ok(params.get('state'), 'Expected a state');
    assert.ok(params.get('nonce'), 'Expected a nonce');
    assert.equal(params.get('redirect_uri'), `${APP_BASE_URL}${AUTH}/oauth2/code/google`);
});

When('I open the Google callback without starting a sign-in', async function (this: PhrasalWorld) {
    this.lastResponse = await this.apiClient.getWithoutRedirect(`${AUTH}/oauth2/code/google?code=x&state=y`);
});

Then('I should be redirected to the login page with the error {string}', function (this: PhrasalWorld, code: string) {
    assert.equal(this.lastResponse!.status, 302);
    assert.ok(location(this).endsWith(`/login?error=${code}`), `Unexpected redirect: ${location(this)}`);
});
