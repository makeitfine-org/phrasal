import axios from 'axios';

const POLL_INTERVAL_MS = 250;
const DEFAULT_TIMEOUT_MS = 10_000;
const LINK_PATTERN = /https?:\/\/[^\s"<]+\/verify-email\?token=[A-Za-z0-9_-]{43}/;
const EMAIL_CHANGE_LINK_PATTERN = /https?:\/\/[^\s"<]+\/confirm-email-change\?token=[A-Za-z0-9_-]{43}/;
const RESET_LINK_PATTERN = /https?:\/\/[^\s"<]+\/reset-password\?token=[A-Za-z0-9_-]{43}/;

export const VERIFICATION_SUBJECT = 'Confirm your Phrasal account';
export const PASSWORD_RESET_SUBJECT = 'Reset your Phrasal password';
export const PASSWORD_CHANGED_SUBJECT = 'Your Phrasal password was changed';
export const EMAIL_CHANGE_SUBJECT = 'Confirm your new Phrasal email address';
export const EMAIL_CHANGED_SUBJECT = 'Your Phrasal email address was changed';
export const ACCOUNT_DELETED_SUBJECT = 'Your Phrasal account was deleted';
export const ACCOUNT_EXISTS_SUBJECT = 'You already have a Phrasal account';

export interface MailMessage {
    subject: string;
    text: string;
    html: string;
}

interface SearchResult {
    messages: { ID: string; Subject: string }[];
}

function mailpit() {
    return axios.create({
        baseURL: process.env.MAILPIT_URL || 'http://localhost:8025',
        timeout: 10_000,
    });
}

function toQuery(address: string, subject?: string): string {
    return subject ? `to:"${address}" subject:"${subject}"` : `to:"${address}"`;
}

async function search(address: string, subject?: string): Promise<SearchResult['messages']> {
    const response = await mailpit().get<SearchResult>('/api/v1/search', {
        params: { query: toQuery(address, subject) },
    });
    return response.data.messages ?? [];
}

function sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

/** Newest message sent to the address; polls until one arrives. Mailpit lists newest first. */
export async function latestMessageTo(
    address: string,
    { timeoutMs = DEFAULT_TIMEOUT_MS, subject }: { timeoutMs?: number; subject?: string } = {},
): Promise<MailMessage> {
    const deadline = Date.now() + timeoutMs;
    for (;;) {
        const messages = await search(address, subject);
        if (messages.length > 0) {
            const detail = await mailpit().get(`/api/v1/message/${messages[0].ID}`);
            return { subject: detail.data.Subject, text: detail.data.Text ?? '', html: detail.data.HTML ?? '' };
        }
        if (Date.now() >= deadline) {
            const what = subject ? `email "${subject}"` : 'email';
            throw new Error(`No ${what} to ${address} arrived within ${timeoutMs} ms`);
        }
        await sleep(POLL_INTERVAL_MS);
    }
}

export async function verificationLink(address: string): Promise<string> {
    const message = await latestMessageTo(address, { subject: VERIFICATION_SUBJECT });
    const match = LINK_PATTERN.exec(message.text) ?? LINK_PATTERN.exec(message.html);
    if (!match) {
        throw new Error(`No verification link in the latest email to ${address} (subject: "${message.subject}")`);
    }
    return match[0];
}

export async function verificationToken(address: string): Promise<string> {
    const token = new URL(await verificationLink(address)).searchParams.get('token');
    if (!token) {
        throw new Error(`Verification link for ${address} has no token`);
    }
    return token;
}

export async function passwordResetLink(address: string): Promise<string> {
    const message = await latestMessageTo(address, { subject: PASSWORD_RESET_SUBJECT });
    const match = RESET_LINK_PATTERN.exec(message.text) ?? RESET_LINK_PATTERN.exec(message.html);
    if (!match) {
        throw new Error(`No password reset link in the latest email to ${address} (subject: "${message.subject}")`);
    }
    return match[0];
}

export async function passwordResetToken(address: string): Promise<string> {
    const token = new URL(await passwordResetLink(address)).searchParams.get('token');
    if (!token) {
        throw new Error(`Password reset link for ${address} has no token`);
    }
    return token;
}

export async function emailChangeLink(address: string): Promise<string> {
    const message = await latestMessageTo(address, { subject: EMAIL_CHANGE_SUBJECT });
    const match = EMAIL_CHANGE_LINK_PATTERN.exec(message.text) ?? EMAIL_CHANGE_LINK_PATTERN.exec(message.html);
    if (!match) {
        throw new Error(`No email change link in the latest email to ${address} (subject: "${message.subject}")`);
    }
    return match[0];
}

export async function emailChangeToken(address: string): Promise<string> {
    const token = new URL(await emailChangeLink(address)).searchParams.get('token');
    if (!token) {
        throw new Error(`Email change link for ${address} has no token`);
    }
    return token;
}

export async function countMessagesTo(address: string, subject?: string): Promise<number> {
    return (await search(address, subject)).length;
}

/** Clean-up; the pattern may use Mailpit search wildcards such as e2e-*@phrasal.test. */
export async function deleteMessagesTo(pattern: string): Promise<void> {
    await mailpit().delete('/api/v1/search', { params: { query: toQuery(pattern) } });
}
