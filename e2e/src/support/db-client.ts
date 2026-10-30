import { Client } from 'pg';

export async function createDbClient(): Promise<Client> {
    const client = new Client({
        host: process.env.DB_HOST || 'localhost',
        port: parseInt(process.env.POSTGRES_PORT || '5432'),
        database: process.env.DB_NAME || 'phrasaldb',
        user: process.env.DB_USER || 'postgres',
        password: process.env.DB_PASSWORD || 'postgres',
    });
    await client.connect();
    return client;
}

export interface GoogleAccountState {
    googleSubject: string | null;
    hasPassword: boolean;
    verified: boolean;
}

/** What the database holds for an email after a Google sign-in; `null` when there is no such account. */
export async function googleAccountState(email: string): Promise<GoogleAccountState | null> {
    const db = await createDbClient();
    try {
        const result = await db.query(
            'SELECT google_subject, password_hash IS NOT NULL AS has_password, email_verified_at IS NOT NULL AS verified '
            + 'FROM users WHERE email = $1',
            [email],
        );
        if (result.rows.length === 0) {
            return null;
        }
        const row = result.rows[0];
        return {
            googleSubject: row.google_subject,
            hasPassword: row.has_password,
            verified: row.verified,
        };
    } finally {
        await db.end();
    }
}

export async function countUsersWithGoogleSubject(sub: string): Promise<number> {
    const db = await createDbClient();
    try {
        const result = await db.query('SELECT COUNT(*)::int AS total FROM users WHERE google_subject = $1', [sub]);
        return result.rows[0].total;
    } finally {
        await db.end();
    }
}
