import { When, Then } from '@cucumber/cucumber';
import { strict as assert } from 'assert';
import { PhrasalWorld } from '../world';
import { emailChangeToken } from '../support/mailpit-client';
import { TEST_PASSWORD, uniqueEmail } from '../support/test-users';

const PAGE_TIMEOUT = 10_000;

When('I change my password to {string} through the form', async function (this: PhrasalWorld, password: string) {
    const page = this.page!;
    await page.getByTestId('change-password-current').fill(TEST_PASSWORD);
    await page.getByTestId('change-password-new').fill(password);
    await page.getByTestId('change-password-confirm').fill(password);
    await page.getByTestId('change-password-submit').click();
});

Then('I should see the password changed message', async function (this: PhrasalWorld) {
    const message = this.page!.getByTestId('change-password-success');
    await message.waitFor({ timeout: PAGE_TIMEOUT });
    assert.ok((await message.textContent())?.includes('Password changed'), 'Expected the password changed message');
});

When('I log in again through the form with the password {string}', async function (this: PhrasalWorld, password: string) {
    const page = this.page!;
    assert.ok(this.currentEmail, 'No current email: register a user first');
    await page.goto(`http://localhost:${process.env.FRONTEND_PORT || '3000'}/login`);
    await page.getByTestId('login-email').fill(this.currentEmail!);
    await page.getByTestId('login-password').fill(password);
    await page.getByTestId('login-submit').click();
    await page.getByTestId('user-menu').waitFor({ timeout: PAGE_TIMEOUT });
});

When('I request an email change to a new address through the form', async function (this: PhrasalWorld) {
    const page = this.page!;
    this.newEmail = uniqueEmail();
    await page.getByTestId('change-email-new').fill(this.newEmail);
    await page.getByTestId('change-email-password').fill(TEST_PASSWORD);
    await page.getByTestId('change-email-submit').click();
});

Then('I should see the email change check-your-inbox message', async function (this: PhrasalWorld) {
    const message = this.page!.getByTestId('change-email-success');
    await message.waitFor({ timeout: PAGE_TIMEOUT });
    assert.ok((await message.textContent())?.includes(this.newEmail!), 'Expected the message to name the new address');
});

When('I open the email change link from my email in the browser', async function (this: PhrasalWorld) {
    assert.ok(this.newEmail, 'No new email: request an email change first');
    // Only the token of the emailed link is used, so a non-default FRONTEND_PORT still works.
    const token = await emailChangeToken(this.newEmail!);
    await this.page!.goto(`http://localhost:${process.env.FRONTEND_PORT || '3000'}/confirm-email-change?token=${token}`);
});

Then('I should see the email change state {string}', async function (this: PhrasalWorld, name: string) {
    await this.page!.getByTestId(`email-change-state-${name}`).waitFor({ timeout: PAGE_TIMEOUT });
});

When('I log in through the form with the new email', async function (this: PhrasalWorld) {
    const page = this.page!;
    assert.ok(this.newEmail, 'No new email: request an email change first');
    await page.goto(`http://localhost:${process.env.FRONTEND_PORT || '3000'}/login`);
    await page.getByTestId('login-email').fill(this.newEmail!);
    await page.getByTestId('login-password').fill(TEST_PASSWORD);
    await page.getByTestId('login-submit').click();
    await page.getByTestId('user-menu').waitFor({ timeout: PAGE_TIMEOUT });
    this.currentEmail = this.newEmail;
});

When('I delete my account through the form with password {string}', async function (this: PhrasalWorld, password: string) {
    const page = this.page!;
    await page.getByTestId('delete-account-open').click();
    await page.getByTestId('delete-account-password').fill(password);
    await page.getByTestId('delete-account-confirm').check();
    await page.getByTestId('delete-account-submit').click();
});

Then('I should see the account deleted notice', async function (this: PhrasalWorld) {
    const notice = this.page!.getByTestId('login-notice');
    await notice.waitFor({ timeout: PAGE_TIMEOUT });
    assert.ok((await notice.textContent())?.includes('Your account was deleted'), 'Expected the account deleted notice');
    await this.page!.getByTestId('nav-login').waitFor({ timeout: PAGE_TIMEOUT });
});
