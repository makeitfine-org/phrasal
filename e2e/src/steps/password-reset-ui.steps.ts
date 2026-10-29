import { When, Then } from '@cucumber/cucumber';
import { strict as assert } from 'assert';
import { PhrasalWorld } from '../world';
import { passwordResetToken } from '../support/mailpit-client';

const FRONTEND_URL = `http://localhost:${process.env.FRONTEND_PORT || '3000'}`;
const PAGE_TIMEOUT = 10_000;
const EMAIL_PLACEHOLDER = '<email>';

function currentEmail(world: PhrasalWorld): string {
    assert.ok(world.currentEmail, 'No current email: register a user first');
    return world.currentEmail!;
}

/** `<email>` in a password stands for the current user's email, which is generated per scenario. */
function expandPassword(world: PhrasalWorld, password: string): string {
    if (!password.includes(EMAIL_PLACEHOLDER)) return password;
    return password.split(EMAIL_PLACEHOLDER).join(currentEmail(world));
}

async function setPassword(world: PhrasalWorld, password: string, confirmation: string) {
    const page = world.page!;
    await page.getByTestId('reset-password').fill(expandPassword(world, password));
    await page.getByTestId('reset-password-confirm').fill(expandPassword(world, confirmation));
    await page.getByTestId('reset-submit').click();
}

async function waitForResetState(world: PhrasalWorld, state: string) {
    await world.page!.locator(`[data-testid="reset-status"][data-state="${state}"]`).waitFor({ timeout: PAGE_TIMEOUT });
}

When('I click the forgot-password link on the login page', async function (this: PhrasalWorld) {
    const page = this.page!;
    await page.goto(`${FRONTEND_URL}/login`);
    await page.getByTestId('login-email').fill(currentEmail(this));
    await page.getByTestId('forgot-password-link').click();
    await page.getByTestId('forgot-email').waitFor({ timeout: PAGE_TIMEOUT });
});

Then('the forgot-password email field should contain my email', async function (this: PhrasalWorld) {
    assert.equal(await this.page!.getByTestId('forgot-email').inputValue(), currentEmail(this));
});

When('I request a password reset through the form', async function (this: PhrasalWorld) {
    await this.page!.getByTestId('forgot-submit').click();
});

Then('I should see the forgot-password check-your-inbox message', async function (this: PhrasalWorld) {
    const panel = this.page!.getByTestId('forgot-check-email');
    await panel.waitFor({ timeout: PAGE_TIMEOUT });
    assert.ok((await panel.textContent())?.includes(currentEmail(this)), 'Expected the panel to show my email');
});

When('I open the password reset link from my email in the browser', async function (this: PhrasalWorld) {
    // Only the token of the emailed link is used, so a non-default FRONTEND_PORT still works.
    const token = await passwordResetToken(currentEmail(this));
    await this.page!.goto(`${FRONTEND_URL}/reset-password?token=${token}`);
});

When('I open the reset page with the token {string}', async function (this: PhrasalWorld, token: string) {
    await this.page!.goto(`${FRONTEND_URL}/reset-password?token=${encodeURIComponent(token)}`);
});

When('I open the reset page without a token', async function (this: PhrasalWorld) {
    await this.page!.goto(`${FRONTEND_URL}/reset-password`);
});

When('I set the new password {string} through the form', async function (this: PhrasalWorld, password: string) {
    await setPassword(this, password, password);
});

When('I set the new password {string} with the confirmation {string} through the form',
    async function (this: PhrasalWorld, password: string, confirmation: string) {
        await setPassword(this, password, confirmation);
    });

Then('I should see the reset state {string}', async function (this: PhrasalWorld, state: string) {
    await waitForResetState(this, state);
});

Then('I should see the reset password field error mentioning {string}', async function (this: PhrasalWorld, text: string) {
    const error = this.page!.getByTestId('field-error-password');
    await error.waitFor({ timeout: PAGE_TIMEOUT });
    assert.ok((await error.textContent())?.includes(text), `Expected the password error to mention "${text}"`);
});

Then('I should see the reset confirmation field error', async function (this: PhrasalWorld) {
    await this.page!.getByTestId('field-error-confirm').waitFor({ timeout: PAGE_TIMEOUT });
});

Then('I should see the request-a-new-link option', async function (this: PhrasalWorld) {
    await this.page!.getByTestId('reset-request-new-link').waitFor({ timeout: PAGE_TIMEOUT });
});

When('I log in through the form with the new password {string}', async function (this: PhrasalWorld, password: string) {
    const page = this.page!;
    await page.getByTestId('reset-login-link').click();
    await page.getByTestId('login-email').fill(currentEmail(this));
    await page.getByTestId('login-password').fill(password);
    await page.getByTestId('login-submit').click();
    await page.getByTestId('user-menu').waitFor({ timeout: PAGE_TIMEOUT });
});
