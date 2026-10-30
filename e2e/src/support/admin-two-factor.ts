import { createDbClient } from './db-client';

/** Secret and last used step of the dev admin's 2FA, kept for the whole run (the admin account is shared). */
export interface AdminTwoFactorState {
    secret: string;
    lastStep: number;
}

export let adminState: AdminTwoFactorState | null = null;

export function rememberAdminTwoFactor(state: AdminTwoFactorState): void {
    adminState = state;
}

/** Switches the admin's 2FA off in the database so developers (and the next run) start from a clean admin. */
export async function resetAdminTwoFactor(): Promise<void> {
    adminState = null;
    const email = process.env.ADMIN_EMAIL;
    if (!email) {
        return;
    }
    const db = await createDbClient();
    try {
        await db.query(
            'DELETE FROM user_recovery_codes WHERE user_id = (SELECT id FROM users WHERE email = $1)',
            [email],
        );
        await db.query(
            'UPDATE users SET totp_secret_enc = NULL, totp_enabled_at = NULL, totp_last_step = NULL WHERE email = $1',
            [email],
        );
    } finally {
        await db.end();
    }
}
