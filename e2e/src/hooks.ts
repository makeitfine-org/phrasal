import { Before, After, BeforeAll, AfterAll, setDefaultTimeout } from '@cucumber/cucumber';
import { chromium, Browser } from 'playwright';
import { ApiClient } from './support/api-client';
import dotenv from 'dotenv';

dotenv.config();

setDefaultTimeout(30_000);

let browser: Browser | null = null;

BeforeAll(async function () {
    browser = await chromium.launch({ headless: true });
});

AfterAll(async function () {
    if (browser) {
        await browser.close();
        browser = null;
    }
});

Before(function () {
    this.apiClient = new ApiClient(`http://localhost:${process.env.BACKEND_PORT || '8080'}`);
    this.lastResponse = null;
    this.browser = browser;
    this.page = null;
});

After(async function () {
    if (this.page) {
        await this.page.close();
        this.page = null;
    }
});
