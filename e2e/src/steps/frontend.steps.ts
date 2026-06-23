import { Given, When, Then } from '@cucumber/cucumber';
import { strict as assert } from 'assert';
import { PhrasalWorld } from '../world';

const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';

Given('the browser is open', async function (this: PhrasalWorld) {
    this.page = await this.browser!.newPage();
});

When('I navigate to the homepage', async function (this: PhrasalWorld) {
    await this.page!.goto(FRONTEND_URL);
    await this.page!.waitForLoadState('networkidle');
});

When('I navigate to the phrasal verbs quiz', async function (this: PhrasalWorld) {
    await this.page!.goto(`${FRONTEND_URL}/phrasal-verbs/test-most-popular`);
    await this.page!.waitForSelector('[placeholder="Type phrasal verb"]', { timeout: 10000 });
});

When('I navigate to the grammar quiz', async function (this: PhrasalWorld) {
    await this.page!.goto(`${FRONTEND_URL}/grammar/i-wish-if-only`);
    await this.page!.waitForSelector('[placeholder="Type phrasal verb"]', { timeout: 10000 });
});

Then('I should see the heading {string}', async function (this: PhrasalWorld, heading: string) {
    const element = await this.page!.locator(`text="${heading}"`).first();
    assert.ok(await element.isVisible(), `Expected heading "${heading}" to be visible`);
});

Then('I should see a link to {string}', async function (this: PhrasalWorld, linkText: string) {
    const link = await this.page!.locator(`a:has-text("${linkText}")`).first();
    assert.ok(await link.isVisible(), `Expected link "${linkText}" to be visible`);
});

Then('I should see a quiz input field', async function (this: PhrasalWorld) {
    const input = await this.page!.locator('[placeholder="Type phrasal verb"]').first();
    assert.ok(await input.isVisible(), 'Expected quiz input field to be visible');
});
