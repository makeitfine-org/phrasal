import { Before, After, BeforeAll, AfterAll, setDefaultTimeout } from '@cucumber/cucumber';
import { chromium, Browser } from 'playwright';
import { ApiClient } from './support/api-client';
import { createDbClient } from './support/db-client';
import { deleteMessagesTo } from './support/mailpit-client';
import { TEST_EMAIL_PATTERN } from './support/test-users';
import { resetAdminTwoFactor } from './support/admin-two-factor';
import dotenv from 'dotenv';

dotenv.config();

const MAILPIT_TEST_PATTERN = 'e2e-*@phrasal.test';

setDefaultTimeout(30_000);

let browser: Browser | null = null;

BeforeAll(async function () {
    await resetAdminTwoFactor();
    browser = await chromium.launch({ headless: true });
});

AfterAll(async function () {
    await resetAdminTwoFactor();
    if (browser) {
        await browser.close();
        browser = null;
    }
    try {
        const db = await createDbClient();
        try {
            await db.query('DELETE FROM spring_session WHERE principal_name LIKE $1', [TEST_EMAIL_PATTERN]);
            await db.query('DELETE FROM phrasal_verbs WHERE verb = $1', ['E2E admin verb']);
            await db.query('DELETE FROM users WHERE email LIKE $1', [TEST_EMAIL_PATTERN]);
        } finally {
            await db.end();
        }
    } finally {
        await deleteMessagesTo(MAILPIT_TEST_PATTERN);
    }
});

Before(function () {
    this.apiClient = new ApiClient(`http://localhost:${process.env.BACKEND_PORT || '8080'}`);
    this.lastResponse = null;
    this.browser = browser;
    this.page = null;
    this.currentEmail = null;
    this.verificationTokens = [];
    this.resetTokens = [];
    this.firstRegistrationResponse = null;
    this.twoFactorSecret = null;
    this.recoveryCodes = [];
    this.previousRecoveryCodes = [];
    this.lastTotpStep = null;
});

After(async function () {
    if (this.page) {
        await this.page.close();
        this.page = null;
    }
});
