import axios from 'axios';

const POLL_INTERVAL_MS = 250;
const DEFAULT_TIMEOUT_MS = 10_000;
const LINK_PATTERN = /https?:\/\/[^\s"<]+\/verify-email\?token=[A-Za-z0-9_-]{43}/;

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

function toQuery(address: string): string {
    return `to:"${address}"`;
}

async function search(address: string): Promise<SearchResult['messages']> {
    const response = await mailpit().get<SearchResult>('/api/v1/search', { params: { query: toQuery(address) } });
    return response.data.messages ?? [];
}

function sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

/** Newest message sent to the address; polls until one arrives. Mailpit lists newest first. */
export async function latestMessageTo(
    address: string,
    { timeoutMs = DEFAULT_TIMEOUT_MS }: { timeoutMs?: number } = {},
): Promise<MailMessage> {
    const deadline = Date.now() + timeoutMs;
    for (;;) {
        const messages = await search(address);
        if (messages.length > 0) {
            const detail = await mailpit().get(`/api/v1/message/${messages[0].ID}`);
            return { subject: detail.data.Subject, text: detail.data.Text ?? '', html: detail.data.HTML ?? '' };
        }
        if (Date.now() >= deadline) {
            throw new Error(`No email to ${address} arrived within ${timeoutMs} ms`);
        }
        await sleep(POLL_INTERVAL_MS);
    }
}

export async function verificationLink(address: string): Promise<string> {
    const message = await latestMessageTo(address);
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

export async function countMessagesTo(address: string): Promise<number> {
    return (await search(address)).length;
}

/** Clean-up; the pattern may use Mailpit search wildcards such as e2e-*@phrasal.test. */
export async function deleteMessagesTo(pattern: string): Promise<void> {
    await mailpit().delete('/api/v1/search', { params: { query: toQuery(pattern) } });
}
