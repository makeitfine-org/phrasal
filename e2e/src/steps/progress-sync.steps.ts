import { Given, When, Then } from '@cucumber/cucumber';
import { strict as assert } from 'assert';
import { PhrasalWorld } from '../world';
import { TEST_PASSWORD } from '../support/test-users';

const FRONTEND_URL = `http://localhost:${process.env.FRONTEND_PORT || '3000'}`;
const PROGRESS_PATH = '/api/v1/me/quiz-progress/';
const PAGE_TIMEOUT = 10_000;
const SAVE_TIMEOUT = 15_000;
// longer than the 2 s save debounce, so a request that would be sent has been sent
const DEBOUNCE_GRACE_MS = 3_000;

interface SyncWorld extends PhrasalWorld {
    accounts?: Map<string, string>;
    progressRequests?: string[];
}

function isProgressSave(r: { url(): string; request(): { method(): string }; ok(): boolean }): boolean {
    return r.url().includes(PROGRESS_PATH) && r.request().method() === 'PUT' && r.ok();
}

When('I exclude the current quiz item', async function (this: PhrasalWorld) {
    await this.page!.getByTestId('exclude-toggle').click();
});

When('I exclude the current quiz item and wait for the progress save', async function (this: PhrasalWorld) {
    const saved = this.page!.waitForResponse(isProgressSave, { timeout: SAVE_TIMEOUT });
    await this.page!.getByTestId('exclude-toggle').click();
    await saved;
});

When('I clear the browser storage and reload', async function (this: PhrasalWorld) {
    await this.page!.evaluate(() => localStorage.clear());
    await this.page!.reload();
    await this.page!.waitForSelector('[placeholder="Type phrasal verb"]', { timeout: PAGE_TIMEOUT });
});

When('I remember this account as {string}', function (this: SyncWorld, name: string) {
    assert.ok(this.currentEmail, 'No current email: sign up first');
    this.accounts = this.accounts ?? new Map();
    this.accounts.set(name, this.currentEmail!);
});

When('I log in as the remembered account {string}', async function (this: SyncWorld, name: string) {
    const email = this.accounts?.get(name);
    assert.ok(email, `Account "${name}" was not remembered`);
    this.currentEmail = email;
    const page = this.page!;
    await page.goto(`${FRONTEND_URL}/login`);
    await page.getByTestId('login-email').fill(email!);
    await page.getByTestId('login-password').fill(TEST_PASSWORD);
    await page.getByTestId('login-submit').click();
    await page.getByTestId('user-menu').waitFor({ timeout: PAGE_TIMEOUT });
});

Given('I record progress requests', function (this: SyncWorld) {
    this.progressRequests = [];
    this.page!.on('request', (req) => {
        if (req.url().includes(PROGRESS_PATH)) {
            this.progressRequests!.push(`${req.method()} ${req.url()}`);
        }
    });
});

Then('the excluded count should be {int}', async function (this: PhrasalWorld, expected: number) {
    const badge = this.page!.getByTestId('excluded-count');
    if (expected === 0) {
        await badge.waitFor({ state: 'detached', timeout: PAGE_TIMEOUT });
        return;
    }
    await badge.waitFor({ timeout: PAGE_TIMEOUT });
    const deadline = Date.now() + PAGE_TIMEOUT;
    let text = '';
    while (Date.now() < deadline) {
        text = ((await badge.textContent()) ?? '').trim();
        if (text === String(expected)) return;
        await this.page!.waitForTimeout(200);
    }
    assert.equal(text, String(expected));
});

Then('my saved {string} progress should have {int} excluded items',
    async function (this: PhrasalWorld, quizKey: string, expected: number) {
        // polls: the upload after sign-up is debounced and may land after the step starts
        const deadline = Date.now() + SAVE_TIMEOUT;
        let status = 0;
        let count = -1;
        while (Date.now() < deadline) {
            const res = await this.page!.request.get(`${FRONTEND_URL}${PROGRESS_PATH}${quizKey}`);
            status = res.status();
            if (status === 200) {
                count = ((await res.json()).state.excluded ?? []).length;
                if (count === expected) return;
            }
            await this.page!.waitForTimeout(300);
        }
        assert.fail(`Saved ${quizKey} progress: status ${status}, excluded ${count}, expected ${expected}`);
    });

Then('no quiz progress request should have been sent', async function (this: SyncWorld) {
    await this.page!.waitForTimeout(DEBOUNCE_GRACE_MS);
    assert.deepEqual(this.progressRequests, []);
});
