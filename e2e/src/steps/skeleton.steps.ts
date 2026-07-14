import { Given, When, Then } from '@cucumber/cucumber';
import { strict as assert } from 'assert';
import { Route } from 'playwright';
import { PhrasalWorld } from '../world';

const FRONTEND_URL = `http://localhost:${process.env.FRONTEND_PORT || '3000'}`;

let pendingRoute: Route | null = null;

Given('the API route {string} is delayed', async function (this: PhrasalWorld, pattern: string) {
    this.page = await this.browser!.newPage();
    pendingRoute = null;

    const routeReady = new Promise<void>((resolve) => {
        this.page!.route(`**${pattern}`, (route) => {
            pendingRoute = route;
            resolve();
        });
    });

    (this as any)._routeReady = routeReady;
});

When('I start navigating to {string}', async function (this: PhrasalWorld, path: string) {
    this.page!.goto(`${FRONTEND_URL}${path}`).catch(() => {});
    await (this as any)._routeReady;
    await this.page!.waitForSelector('.animate-pulse', { timeout: 5000 });
});

When('the delayed API response is released', async function (this: PhrasalWorld) {
    assert.ok(pendingRoute, 'No pending route to release');
    await pendingRoute.continue();
    pendingRoute = null;
    await this.page!.waitForLoadState('networkidle');
});

Then('I should see skeleton placeholders', async function (this: PhrasalWorld) {
    const skeletons = await this.page!.locator('.animate-pulse').all();
    assert.ok(skeletons.length > 0, `Expected skeleton placeholders, found ${skeletons.length}`);
});

Then('I should not see any loading text', async function (this: PhrasalWorld) {
    const loadingText = await this.page!.locator('text=/[Ll]oading/').count();
    assert.strictEqual(loadingText, 0, 'Found "Loading" text on the page');
});

Then('skeleton placeholders should no longer be visible', async function (this: PhrasalWorld) {
    await this.page!.waitForSelector('.animate-pulse', { state: 'detached', timeout: 5000 });
});
