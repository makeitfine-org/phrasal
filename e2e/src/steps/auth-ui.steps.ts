import { When, Then } from '@cucumber/cucumber';
import { strict as assert } from 'assert';
import { PhrasalWorld } from '../world';
import { TEST_PASSWORD, uniqueEmail } from '../support/test-users';
import { verificationToken } from '../support/mailpit-client';

const FRONTEND_URL = `http://localhost:${process.env.FRONTEND_PORT || '3000'}`;
const PAGE_TIMEOUT = 10_000;

const PAGE_PATHS: Record<string, string> = {
    'log in': '/login',
    'sign up': '/register',
};

async function submitLogin(world: PhrasalWorld, password: string) {
    assert.ok(world.currentEmail, 'No current email: register a user first');
    const page = world.page!;
    await page.goto(`${FRONTEND_URL}/login`);
    await page.getByTestId('login-email').fill(world.currentEmail!);
    await page.getByTestId('login-password').fill(password);
    await page.getByTestId('login-submit').click();
}

When('I open the {string} page', async function (this: PhrasalWorld, name: string) {
    const path = PAGE_PATHS[name.toLowerCase()];
    assert.ok(path, `Unknown auth page "${name}"`);
    await this.page!.goto(`${FRONTEND_URL}${path}`);
    await this.page!.waitForLoadState('networkidle');
});

async function submitSignUp(world: PhrasalWorld) {
    world.currentEmail = uniqueEmail();
    const page = world.page!;
    await page.goto(`${FRONTEND_URL}/register`);
    await page.getByTestId('register-email').fill(world.currentEmail);
    await page.getByTestId('register-password').fill(TEST_PASSWORD);
    await page.getByTestId('register-password-confirm').fill(TEST_PASSWORD);
    await page.getByTestId('register-submit').click();
    await page.getByTestId('register-check-email').waitFor({ timeout: PAGE_TIMEOUT });
}

async function openVerificationLink(world: PhrasalWorld) {
    assert.ok(world.currentEmail, 'No current email: sign up first');
    // The emailed link carries APP_BASE_URL; only its token is used, so a non-default FRONTEND_PORT still works.
    const token = await verificationToken(world.currentEmail!);
    await world.page!.goto(`${FRONTEND_URL}/verify-email?token=${token}`);
}

async function waitForVerifyState(world: PhrasalWorld, state: string) {
    await world.page!.locator(`[data-testid="verify-status"][data-state="${state}"]`).waitFor({ timeout: PAGE_TIMEOUT });
}

When('I submit the sign-up form with a new email', async function (this: PhrasalWorld) {
    await submitSignUp(this);
});

When('I sign up through the form with a new email', async function (this: PhrasalWorld) {
    await submitSignUp(this);
    await openVerificationLink(this);
    await waitForVerifyState(this, 'success');
    // Same tab: localStorage (anonymous progress) survives into the login.
    await submitLogin(this, TEST_PASSWORD);
    await this.page!.getByTestId('user-menu').waitFor({ timeout: PAGE_TIMEOUT });
});

When('I open the verification link from my email in the browser', async function (this: PhrasalWorld) {
    await openVerificationLink(this);
});

When('I open the verification page with the token {string}', async function (this: PhrasalWorld, token: string) {
    await this.page!.goto(`${FRONTEND_URL}/verify-email?token=${encodeURIComponent(token)}`);
});

When('I open the verification page without a token', async function (this: PhrasalWorld) {
    await this.page!.goto(`${FRONTEND_URL}/verify-email`);
});

When('I ask for a new verification email', async function (this: PhrasalWorld) {
    await this.page!.getByTestId('resend-verification').click();
});

Then('I should see the check-your-inbox message', async function (this: PhrasalWorld) {
    const panel = this.page!.getByTestId('register-check-email');
    await panel.waitFor({ timeout: PAGE_TIMEOUT });
    assert.ok((await panel.textContent())?.includes(this.currentEmail!), 'Expected the panel to show my email');
});

Then('I should see that my email is confirmed', async function (this: PhrasalWorld) {
    await waitForVerifyState(this, 'success');
});

Then('I should see the verification state {string}', async function (this: PhrasalWorld, state: string) {
    await waitForVerifyState(this, state);
});

Then('I should see the resend form', async function (this: PhrasalWorld) {
    await this.page!.getByTestId('resend-verification').waitFor({ timeout: PAGE_TIMEOUT });
});

Then('I should see the resend confirmation', async function (this: PhrasalWorld) {
    await this.page!.getByTestId('resend-done').waitFor({ timeout: PAGE_TIMEOUT });
});

When('I log in through the form', async function (this: PhrasalWorld) {
    await submitLogin(this, TEST_PASSWORD);
    await this.page!.getByTestId('user-menu').waitFor({ timeout: PAGE_TIMEOUT });
});

When('I try to log in through the form', async function (this: PhrasalWorld) {
    await submitLogin(this, TEST_PASSWORD);
});

Then('I should see the email-not-verified message with a resend option', async function (this: PhrasalWorld) {
    const page = this.page!;
    await page.getByTestId('auth-error').waitFor({ timeout: PAGE_TIMEOUT });
    await page.getByTestId('resend-verification').waitFor({ timeout: PAGE_TIMEOUT });
});

When('I log in through the form with password {string}', async function (this: PhrasalWorld, password: string) {
    await submitLogin(this, password);
    await this.page!.getByTestId('auth-error').waitFor({ timeout: PAGE_TIMEOUT });
});

When('I log out through the user menu', async function (this: PhrasalWorld) {
    await this.page!.getByTestId('user-menu').click();
    await this.page!.getByTestId('nav-logout').click();
    await this.page!.getByTestId('nav-login').waitFor({ timeout: PAGE_TIMEOUT });
});

Then('the user menu should show my email', async function (this: PhrasalWorld) {
    const menu = this.page!.getByTestId('user-menu');
    await menu.waitFor({ timeout: PAGE_TIMEOUT });
    assert.equal((await menu.textContent())?.trim(), this.currentEmail);
});

Then('I should see the {string} link in the navigation', async function (this: PhrasalWorld, label: string) {
    const link = this.page!.locator('[data-testid="nav-menu"]').getByRole('link', { name: label, exact: true });
    await link.first().waitFor({ timeout: PAGE_TIMEOUT });
    assert.ok(await link.first().isVisible(), `Expected "${label}" link to be visible`);
});

Then('I should see an auth error', async function (this: PhrasalWorld) {
    assert.ok(await this.page!.getByTestId('auth-error').isVisible(), 'Expected an auth error to be visible');
});
