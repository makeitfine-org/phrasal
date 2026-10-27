export const TEST_PASSWORD = 'e2e-password-123';
export const TEST_EMAIL_PATTERN = 'e2e-%@phrasal.test';

export function uniqueEmail(): string {
    return `e2e-${Date.now()}-${Math.random().toString(36).slice(2, 8)}@phrasal.test`;
}

/** Admin credentials come from the environment (.env locally, CI env); the compose dev defaults are in .env.example. */
export function adminCredentials(): { email: string; password: string } {
    const email = process.env.ADMIN_EMAIL;
    const password = process.env.ADMIN_PASSWORD;
    if (!email || !password) {
        throw new Error('ADMIN_EMAIL and ADMIN_PASSWORD must be set (copy e2e/.env.example to e2e/.env)');
    }
    return { email, password };
}
