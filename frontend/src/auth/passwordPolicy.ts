/** Keep in sync with the backend `PasswordPolicy`. */
export const MIN_PASSWORD_LENGTH = 10;
export const MAX_PASSWORD_BYTES = 72;

export const PASSWORD_TIP =
  'Tip: mix letters, digits and symbols (e.g. ! ? # $), or use a passphrase of several words. Common passwords such as "password123" are rejected.';

export interface PasswordRule {
  id: 'min-length' | 'max-bytes' | 'no-email';
  label: string;
  met: boolean;
}

const utf8Bytes = (value: string) => new TextEncoder().encode(value).length;

const MIN_EMAIL_PART_LENGTH = 4;

/** Mirrors the backend rule: the password must not contain the email or its local part (4+ characters). */
export function containsEmail(password: string, email: string): boolean {
  const lowerEmail = email.trim().toLowerCase();
  if (!lowerEmail) return false;
  const lowerPassword = password.toLowerCase();
  if (lowerPassword.includes(lowerEmail)) return true;
  const at = lowerEmail.indexOf('@');
  const localPart = at > 0 ? lowerEmail.slice(0, at) : '';
  return localPart.length >= MIN_EMAIL_PART_LENGTH && lowerPassword.includes(localPart);
}

export function passwordRules(password: string, email = ''): PasswordRule[] {
  return [
    {
      id: 'min-length',
      label: `At least ${MIN_PASSWORD_LENGTH} characters`,
      met: password.length >= MIN_PASSWORD_LENGTH,
    },
    {
      id: 'max-bytes',
      label: `At most ${MAX_PASSWORD_BYTES} bytes (about ${MAX_PASSWORD_BYTES} letters or digits)`,
      met: utf8Bytes(password) <= MAX_PASSWORD_BYTES,
    },
    {
      id: 'no-email',
      label: 'Does not contain your email address',
      met: !containsEmail(password, email),
    },
  ];
}

/** First broken rule message, or null when the password is acceptable. */
export function passwordViolation(password: string, email = ''): string | null {
  if (password.length < MIN_PASSWORD_LENGTH) {
    return `Password must be at least ${MIN_PASSWORD_LENGTH} characters`;
  }
  if (utf8Bytes(password) > MAX_PASSWORD_BYTES) {
    return `Password must not exceed ${MAX_PASSWORD_BYTES} bytes (UTF-8)`;
  }
  if (new Set(password).size === 1) {
    return 'Password must not be a single repeated character';
  }
  if (containsEmail(password, email)) {
    return 'Password must not contain your email address';
  }
  return null;
}
