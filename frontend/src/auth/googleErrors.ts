const GENERIC = "Google sign-in didn't finish. Please try again.";

// The codes the backend puts in /login?error=…; any other value gets the generic text and is never shown as is.
const MESSAGES = new Map<string, string>([
  ['google', GENERIC],
  ['google-email-unverified',
    "Google hasn't confirmed this email address, so it can't be used here. Sign up with email and password instead."],
  ['google-account-conflict',
    'This email address belongs to an account linked to a different Google account. Log in with your password instead.'],
  ['google-admin-account', 'Admin accounts sign in with email and password.'],
]);

/** The text for a failed Google sign-in, or `null` when there is no error code. */
export function googleErrorMessage(code: string | null): string | null {
  if (!code) {
    return null;
  }
  return MESSAGES.get(code) ?? GENERIC;
}
