import { TOTP, Secret } from 'otpauth';

export const PERIOD_SECONDS = 30;
const PERIOD_MS = PERIOD_SECONDS * 1000;
const DIGITS = 6;
/** The server accepts the previous, current and next step (clock-skew window of one step). */
const SKEW_STEPS = 1;

export interface AcceptedCode {
    code: string;
    step: number;
}

export function currentStep(now: number = Date.now()): number {
    return Math.floor(now / PERIOD_MS);
}

/** The page shows the key in groups; the API expects it without spaces. */
export function normalizeSecret(text: string): string {
    return text.replace(/\s+/g, '').toUpperCase();
}

export function codeForStep(secret: string, step: number): string {
    const totp = new TOTP({
        secret: Secret.fromBase32(normalizeSecret(secret)),
        digits: DIGITS,
        period: PERIOD_SECONDS,
        algorithm: 'SHA1',
    });
    return totp.generate({ timestamp: step * PERIOD_MS });
}

function sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * A code the server has not seen yet: the server rejects any step at or below the last one it accepted.
 * Uses the current step when it is newer, else the next step (inside the skew window), else waits for the clock
 * to reach the next step (at most one period, so callers need a step timeout above 30 s).
 */
export async function nextAcceptedCode(secret: string, lastUsedStep?: number | null): Promise<AcceptedCode> {
    let now = currentStep();
    if (lastUsedStep == null || now > lastUsedStep) {
        return { code: codeForStep(secret, now), step: now };
    }
    const next = lastUsedStep + 1;
    if (next <= now + SKEW_STEPS) {
        return { code: codeForStep(secret, next), step: next };
    }
    while (now < next - SKEW_STEPS) {
        await sleep((now + 1) * PERIOD_MS - Date.now() + 50);
        now = currentStep();
    }
    return { code: codeForStep(secret, next), step: next };
}
