import { Page } from 'playwright';

export const MOCK_OAUTH2_URL = process.env.MOCK_OAUTH2_URL || `http://localhost:${process.env.MOCK_OAUTH2_PORT || '8090'}`;

const READY_TIMEOUT_MS = 30_000;
const POLL_INTERVAL_MS = 500;
const PAGE_TIMEOUT = 10_000;

export interface GoogleIdentity {
    sub: string;
    email: string;
    emailVerified: boolean;
}

export function uniqueGoogleSubject(): string {
    return `e2e-google-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

/** Fills the stand-in's login form: `username` becomes the `sub` claim, `claims` adds `email` and `email_verified`. */
export async function signInAtMock(page: Page, identity: GoogleIdentity): Promise<void> {
    const username = page.locator('input[name="username"]');
    await username.waitFor({ timeout: PAGE_TIMEOUT });
    await username.fill(identity.sub);
    await page.locator('textarea[name="claims"], input[name="claims"]').fill(
        JSON.stringify({ email: identity.email, email_verified: identity.emailVerified }),
    );
    await page.locator('[type="submit"]').click();
}

export async function waitForMockProvider(): Promise<void> {
    const deadline = Date.now() + READY_TIMEOUT_MS;
    let lastError = 'no answer';
    while (Date.now() < deadline) {
        try {
            const response = await fetch(`${MOCK_OAUTH2_URL}/default/.well-known/openid-configuration`);
            if (response.ok) {
                return;
            }
            lastError = `HTTP ${response.status}`;
        } catch (error) {
            lastError = String(error);
        }
        await new Promise((resolve) => setTimeout(resolve, POLL_INTERVAL_MS));
    }
    throw new Error(`The Google stand-in at ${MOCK_OAUTH2_URL} is not ready: ${lastError}`);
}
