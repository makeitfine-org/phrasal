import { When, Then } from '@cucumber/cucumber';
import { strict as assert } from 'assert';
import { PhrasalWorld } from '../world';

When('I click the search button', async function (this: PhrasalWorld) {
    const btn = this.page!.locator('[aria-label="Search phrasal verbs"]');
    await btn.waitFor({ timeout: 10000 });
    await btn.click();
});

Then('I should see the search modal', async function (this: PhrasalWorld) {
    const dialog = this.page!.locator('[role="dialog"][aria-label="Search"]');
    await dialog.waitFor({ timeout: 5000 });
    assert.ok(await dialog.isVisible(), 'Expected search modal to be visible');
});

Then('I should see the search input', async function (this: PhrasalWorld) {
    const input = this.page!.locator('[role="dialog"] input[type="text"]');
    assert.ok(await input.isVisible(), 'Expected search input to be visible');
});

When('I type {string} in the search input', async function (this: PhrasalWorld, text: string) {
    const input = this.page!.locator('[role="dialog"] input[type="text"]');
    await input.waitFor({ timeout: 5000 });
    await input.fill(text);
    await this.page!.waitForTimeout(300);
});

Then('I should see search results', async function (this: PhrasalWorld) {
    const items = this.page!.locator('[role="dialog"] li');
    await items.first().waitFor({ timeout: 5000 });
    const count = await items.count();
    assert.ok(count > 0, `Expected search results, found ${count}`);
});

Then('I should see a search result containing {string}', async function (this: PhrasalWorld, text: string) {
    const item = this.page!.locator(`[role="dialog"] li:has-text("${text}")`).first();
    assert.ok(await item.isVisible(), `Expected a search result containing "${text}"`);
});

When('I press Escape', async function (this: PhrasalWorld) {
    await this.page!.keyboard.press('Escape');
});

Then('the search modal should be closed', async function (this: PhrasalWorld) {
    const dialog = this.page!.locator('[role="dialog"][aria-label="Search"]');
    await dialog.waitFor({ state: 'hidden', timeout: 5000 });
    assert.ok(!(await dialog.isVisible()), 'Expected search modal to be hidden');
});

Then('I should see {string} in the search modal', async function (this: PhrasalWorld, text: string) {
    const element = this.page!.locator(`[role="dialog"]:has-text("${text}")`);
    await element.waitFor({ timeout: 5000 });
    assert.ok(await element.isVisible(), `Expected to see "${text}" in search modal`);
});

When('I click the first search result', async function (this: PhrasalWorld) {
    const item = this.page!.locator('[role="dialog"] li').first();
    await item.waitFor({ timeout: 5000 });
    await item.click();
    await this.page!.waitForLoadState('networkidle');
});
