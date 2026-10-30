import { When, Then } from '@cucumber/cucumber';
import { strict as assert } from 'assert';
import { PhrasalWorld } from '../world';
import { TEST_PASSWORD } from '../support/test-users';

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
