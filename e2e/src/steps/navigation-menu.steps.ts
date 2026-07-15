import { When, Then } from '@cucumber/cucumber';
import { strict as assert } from 'assert';
import { PhrasalWorld } from '../world';

const FRONTEND_URL = `http://localhost:${process.env.FRONTEND_PORT || '3000'}`;

When('I navigate to the phrasal verbs hub', async function (this: PhrasalWorld) {
    await this.page!.goto(`${FRONTEND_URL}/phrasal-verbs`);
    await this.page!.waitForLoadState('networkidle');
});

When('I navigate to the grammar hub', async function (this: PhrasalWorld) {
    await this.page!.goto(`${FRONTEND_URL}/grammar`);
    await this.page!.waitForLoadState('networkidle');
});

Then('I should see the navigation menu', async function (this: PhrasalWorld) {
    const nav = this.page!.locator('[data-testid="nav-menu"]');
    assert.ok(await nav.isVisible(), 'Expected navigation menu to be visible');
});

Then('I should not see the navigation menu', async function (this: PhrasalWorld) {
    const nav = this.page!.locator('[data-testid="nav-menu"]');
    const count = await nav.count();
    assert.strictEqual(count, 0, 'Expected navigation menu to not be present');
});

Then('the navigation menu should contain a home link', async function (this: PhrasalWorld) {
    const homeLink = this.page!.locator('[data-testid="nav-menu"] a[title="Home"]');
    assert.ok(await homeLink.isVisible(), 'Expected home link in navigation menu');
});

When('I click the Phrasal Verbs dropdown', async function (this: PhrasalWorld) {
    await this.page!.locator('[data-testid="nav-phrasal-verbs"]').click();
});

When('I click the Grammar dropdown', async function (this: PhrasalWorld) {
    await this.page!.locator('[data-testid="nav-grammar"]').click();
});

Then('I should see a dropdown with links {string}, {string}, {string}', async function (this: PhrasalWorld, link1: string, link2: string, link3: string) {
    const dropdown = this.page!.locator('[data-testid="dropdown-phrasal-verbs"]');
    await dropdown.waitFor({ timeout: 5000 });
    for (const linkText of [link1, link2, link3]) {
        const link = dropdown.locator(`a:has-text("${linkText}")`);
        assert.ok(await link.isVisible(), `Expected dropdown link "${linkText}" to be visible`);
    }
});

Then('I should see a dropdown with link {string}', async function (this: PhrasalWorld, linkText: string) {
    const dropdown = this.page!.locator('[data-testid="dropdown-grammar"]');
    await dropdown.waitFor({ timeout: 5000 });
    const link = dropdown.locator(`a:has-text("${linkText}")`);
    assert.ok(await link.isVisible(), `Expected dropdown link "${linkText}" to be visible`);
});

When('I click the dropdown link {string}', async function (this: PhrasalWorld, linkText: string) {
    const link = this.page!.locator(`a:has-text("${linkText}")`).first();
    await link.click();
    await this.page!.waitForLoadState('networkidle');
});

When('I click the dropdown link {string} and wait for the quiz', async function (this: PhrasalWorld, linkText: string) {
    const link = this.page!.locator(`a:has-text("${linkText}")`).first();
    await link.click();
    await this.page!.waitForSelector('[placeholder="Type phrasal verb"]', { timeout: 10000 });
});

When('I click the home link in the navigation menu', async function (this: PhrasalWorld) {
    await this.page!.locator('[data-testid="nav-menu"] a[title="Home"]').click();
    await this.page!.waitForLoadState('networkidle');
});
