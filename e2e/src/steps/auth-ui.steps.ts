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

When('I type the password {string} on the sign-up form', async function (this: PhrasalWorld, password: string) {
    await this.page!.getByTestId('register-password').fill(password);
});

Then('I should see the password tip mentioning letters, digits and symbols', async function (this: PhrasalWorld) {
    const tip = this.page!.getByTestId('password-tip');
    await tip.waitFor({ timeout: PAGE_TIMEOUT });
    const text = (await tip.textContent()) ?? '';
    assert.ok(/letters/.test(text) && /digits/.test(text) && /symbols/.test(text), `Unexpected tip: ${text}`);
    const rules = (await this.page!.getByTestId('password-rule-min-length').textContent()) ?? '';
    assert.ok(rules.includes('At least 10 characters'), `Unexpected length rule: ${rules}`);
});

async function assertLengthRule(world: PhrasalWorld, met: boolean) {
    await world.page!
        .locator(`[data-testid="password-rule-min-length"][data-met="${met}"]`)
        .waitFor({ timeout: PAGE_TIMEOUT });
}

Then('the password length rule should be unmet', async function (this: PhrasalWorld) {
    await assertLengthRule(this, false);
});

Then('the password length rule should be met', async function (this: PhrasalWorld) {
    await assertLengthRule(this, true);
});

When('I submit the sign-up form with the password {string}', async function (this: PhrasalWorld, password: string) {
    const page = this.page!;
    await page.getByTestId('register-email').fill(uniqueEmail());
    await page.getByTestId('register-password').fill(password);
    await page.getByTestId('register-password-confirm').fill(password);
    await page.getByTestId('register-submit').click();
});

When('I type the email {string} and the password {string} on the sign-up form',
    async function (this: PhrasalWorld, email: string, password: string) {
        await this.page!.getByTestId('register-email').fill(email);
        await this.page!.getByTestId('register-password').fill(password);
    });

Then('I should see the password field error mentioning {string}', async function (this: PhrasalWorld, text: string) {
    const error = this.page!.getByTestId('field-error-password');
    await error.waitFor({ timeout: PAGE_TIMEOUT });
    assert.ok((await error.textContent())?.includes(text), `Expected the password error to mention "${text}"`);
});

Then('the password email rule should be unmet', async function (this: PhrasalWorld) {
    await this.page!
        .locator('[data-testid="password-rule-no-email"][data-met="false"]')
        .waitFor({ timeout: PAGE_TIMEOUT });
});
