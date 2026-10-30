import { googleErrorMessage } from '../../auth/googleErrors';

const GENERIC = "Google sign-in didn't finish. Please try again.";

describe('googleErrorMessage', () => {
  it.each([
    ['google', GENERIC],
    ['google-email-unverified',
      "Google hasn't confirmed this email address, so it can't be used here. Sign up with email and password instead."],
    ['google-account-conflict',
      'This email address belongs to an account linked to a different Google account. Log in with your password instead.'],
    ['google-admin-account', 'Admin accounts sign in with email and password.'],
  ])('maps %s to its text', (code, message) => {
    expect(googleErrorMessage(code)).toBe(message);
  });

  it.each(['whatever', 'access_denied', '<script>alert(1)</script>', 'constructor', '__proto__', 'GOOGLE'])(
    'gives the generic text for the unknown code %s',
    code => {
      expect(googleErrorMessage(code)).toBe(GENERIC);
    },
  );

  it('returns null without a code', () => {
    expect(googleErrorMessage(null)).toBeNull();
    expect(googleErrorMessage('')).toBeNull();
  });
});
