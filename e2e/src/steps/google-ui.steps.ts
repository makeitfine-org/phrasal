import { When, Then } from '@cucumber/cucumber';
import { strict as assert } from 'assert';
import { PhrasalWorld } from '../world';
import { TEST_PASSWORD, adminCredentials, uniqueEmail } from '../support/test-users';
import { countUsersWithGoogleSubject, googleAccountState } from '../support/db-client';
import { MOCK_OAUTH2_URL, GoogleIdentity, signInAtMock, uniqueGoogleSubject } from '../support/mock-oauth2';

const FRONTEND_URL = `http://localhost:${process.env.FRONTEND_PORT || '3000'}`;
const PAGE_TIMEOUT = 10_000;
const SECURITY_PATH = '/account/security';

/** Opens /login, presses the button and fills the stand-in's form; resolves once the browser is back on the app. */
async function continueWithGoogle(world: PhrasalWorld, identity: GoogleIdentity) {
    const page = world.page!;
    await page.goto(`${FRONTEND_URL}/login`);
    await page.getByTestId('google-sign-in').click();
    await signInAtMock(page, identity);
    await page.waitForURL((url) => !url.href.startsWith(MOCK_OAUTH2_URL), { timeout: PAGE_TIMEOUT });
}

function newGoogleUser(world: PhrasalWorld): GoogleIdentity {
    world.currentEmail = uniqueEmail();
    world.googleSubject = uniqueGoogleSubject();
    return { sub: world.googleSubject, email: world.currentEmail, emailVerified: true };
}

/** A Google identity for an email the scenario already has (or the admin's), with a subject of its own. */
function identityFor(world: PhrasalWorld, email: string, emailVerified: boolean): GoogleIdentity {
    world.currentEmail = email;
    world.googleSubject = uniqueGoogleSubject();
    return { sub: world.googleSubject, email, emailVerified };
}

When('I continue with Google as a new Google user', async function (this: PhrasalWorld) {
    await continueWithGoogle(this, newGoogleUser(this));
});

When('I continue with Google again as the same Google user', async function (this: PhrasalWorld) {
    assert.ok(this.googleSubject && this.currentEmail, 'No Google user yet: continue with Google first');
    await continueWithGoogle(this, { sub: this.googleSubject!, email: this.currentEmail!, emailVerified: true });
});

When('I continue with Google with my email', async function (this: PhrasalWorld) {
    assert.ok(this.currentEmail, 'No current email: register a user first');
    await continueWithGoogle(this, identityFor(this, this.currentEmail!, true));
});

When('I continue with Google with an unverified email', async function (this: PhrasalWorld) {
    await continueWithGoogle(this, identityFor(this, uniqueEmail(), false));
});

When('I continue with Google with the admin email', async function (this: PhrasalWorld) {
    await continueWithGoogle(this, identityFor(this, adminCredentials().email, true));
});

Then('I should see the Google sign-in button', async function (this: PhrasalWorld) {
    await this.page!.getByTestId('google-sign-in').waitFor({ timeout: PAGE_TIMEOUT });
});

Then('I should see the Google error {string}', async function (this: PhrasalWorld, text: string) {
    const page = this.page!;
    await page.waitForURL('**/login', { timeout: PAGE_TIMEOUT });
    const error = page.getByTestId('auth-error');
    await error.waitFor({ timeout: PAGE_TIMEOUT });
    assert.ok((await error.textContent())?.includes(text), `Expected the error to mention "${text}"`);
    assert.ok(!page.url().includes('error='), `The error code is still in the URL: ${page.url()}`);
});

Then('my account should be linked to Google without a password', async function (this: PhrasalWorld) {
    const state = await googleAccountState(this.currentEmail!);
    assert.ok(state, 'No account for the current email');
    assert.equal(state!.googleSubject, this.googleSubject);
    assert.equal(state!.hasPassword, false);
    assert.equal(state!.verified, true);
});

Then('there should be one account for my Google user', async function (this: PhrasalWorld) {
    assert.equal(await countUsersWithGoogleSubject(this.googleSubject!), 1);
});

When('I open the Google callback with an access-denied error in the browser', async function (this: PhrasalWorld) {
    await this.page!.goto(`${FRONTEND_URL}/api/v1/auth/oauth2/code/google?error=access_denied&state=x`);
});

When('I ask for a link to set a password', async function (this: PhrasalWorld) {
    const page = this.page!;
    await page.goto(`${FRONTEND_URL}${SECURITY_PATH}`);
    await page.getByTestId('set-password-panel').waitFor({ timeout: PAGE_TIMEOUT });
    await page.getByTestId('set-password-request').click();
});

Then('I should see the set-password check-your-inbox message', async function (this: PhrasalWorld) {
    await this.page!.getByTestId('set-password-sent').waitFor({ timeout: PAGE_TIMEOUT });
});

When('I log in through the form with the password I just set', async function (this: PhrasalWorld) {
    const page = this.page!;
    await page.goto(`${FRONTEND_URL}/login`);
    await page.getByTestId('login-email').fill(this.currentEmail!);
    await page.getByTestId('login-password').fill(TEST_PASSWORD);
    await page.getByTestId('login-submit').click();
    await page.getByTestId('user-menu').waitFor({ timeout: PAGE_TIMEOUT });
});
