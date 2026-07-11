import { Given, When, Then } from '@cucumber/cucumber';
import { strict as assert } from 'assert';
import { PhrasalWorld } from '../world';

const FRONTEND_URL = `http://localhost:${process.env.FRONTEND_PORT || '3000'}`;

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

When('I navigate to the verb list page', async function (this: PhrasalWorld) {
    await this.page!.goto(`${FRONTEND_URL}/phrasal-verbs/list`);
    await this.page!.waitForSelector('[data-testid^="verb-card-"]', { timeout: 10000 });
});

When('I navigate to the verb detail page for {string}', async function (this: PhrasalWorld, verb: string) {
    await this.page!.goto(`${FRONTEND_URL}/phrasal-verbs/list/${verb}`);
    await this.page!.waitForLoadState('networkidle');
});

When('I click on the verb card for {string}', async function (this: PhrasalWorld, label: string) {
    const card = this.page!.locator(`h2:has-text("${label}")`).first();
    await card.click();
    await this.page!.waitForLoadState('networkidle');
});

Then('I should see at least {int} verb cards', async function (this: PhrasalWorld, count: number) {
    const cards = await this.page!.locator('[data-testid^="verb-card-"]:not([data-testid="verb-card-particles"])').all();
    assert.ok(cards.length >= count, `Expected at least ${count} verb cards, found ${cards.length}`);
});

Then('I should see a verb card for {string}', async function (this: PhrasalWorld, label: string) {
    const heading = this.page!.locator(`h2:has-text("${label}")`).first();
    assert.ok(await heading.isVisible(), `Expected verb card for "${label}" to be visible`);
});

Then('I should see at least one particle section', async function (this: PhrasalWorld) {
    const section = this.page!.locator('button[class*="rounded"]').first();
    await section.waitFor({ timeout: 10000 });
    assert.ok(await section.isVisible(), 'Expected at least one particle section');
});
