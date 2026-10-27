import { When, Then } from '@cucumber/cucumber';
import { strict as assert } from 'assert';
import { PhrasalWorld } from '../world';
import { TEST_PASSWORD, uniqueEmail } from '../support/test-users';

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

When('I sign up through the form with a new email', async function (this: PhrasalWorld) {
    this.currentEmail = uniqueEmail();
    const page = this.page!;
    await page.goto(`${FRONTEND_URL}/register`);
    await page.getByTestId('register-email').fill(this.currentEmail);
    await page.getByTestId('register-password').fill(TEST_PASSWORD);
    await page.getByTestId('register-password-confirm').fill(TEST_PASSWORD);
    await page.getByTestId('register-submit').click();
    await page.getByTestId('user-menu').waitFor({ timeout: PAGE_TIMEOUT });
});

When('I log in through the form', async function (this: PhrasalWorld) {
    await submitLogin(this, TEST_PASSWORD);
    await this.page!.getByTestId('user-menu').waitFor({ timeout: PAGE_TIMEOUT });
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
