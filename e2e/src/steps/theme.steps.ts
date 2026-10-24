import { Given, When, Then } from '@cucumber/cucumber';
import { strict as assert } from 'assert';
import { PhrasalWorld } from '../world';

type ColorScheme = 'dark' | 'light';

const THEME_TOGGLE = 'button[title="Toggle Dark/Light Mode"]';

Given('the browser is open with a {string} system color scheme', async function (this: PhrasalWorld, scheme: ColorScheme) {
    this.page = await this.browser!.newPage({ colorScheme: scheme });
});

When('the system color scheme changes to {string}', async function (this: PhrasalWorld, scheme: ColorScheme) {
    await this.page!.emulateMedia({ colorScheme: scheme });
});

When('I click the theme toggle', async function (this: PhrasalWorld) {
    await this.page!.locator(THEME_TOGGLE).click();
});

When('I reload the page', async function (this: PhrasalWorld) {
    await this.page!.reload();
    await this.page!.waitForLoadState('networkidle');
});

Then('the page should be in {string} mode', async function (this: PhrasalWorld, scheme: ColorScheme) {
    const toggle = this.page!.locator(THEME_TOGGLE);
    await toggle.waitFor({ timeout: 5000 });
    const isDark = await this.page!.evaluate(() => document.documentElement.classList.contains('dark'));
    assert.equal(isDark, scheme === 'dark', `Expected <html> to ${scheme === 'dark' ? 'have' : 'not have'} the "dark" class`);
    const expectedLabel = scheme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode';
    assert.equal(await toggle.getAttribute('aria-label'), expectedLabel);
});
