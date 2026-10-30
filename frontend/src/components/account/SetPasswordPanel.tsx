import { useState } from 'react';
import { forgotPassword } from '../../api/authApi';
import { ApiError } from '../../api/client';
import { useAuth } from '../../auth/useAuth';
import { alertClass, buttonClass } from '../../pages/LoginPage';
import { RESET_LINK_TTL_HOURS } from '../../pages/ForgotPasswordPage';

const GENERIC_ERROR = 'Something went wrong. Please try again.';

/**
 * For an account created by Google sign-in: the password is set through the reset-by-email flow, which proves the
 * mailbox the way Google did. No new backend endpoint.
 */
export default function SetPasswordPanel() {
  const { user } = useAuth();
  const [pending, setPending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!user) return null;

  const handleRequest = async () => {
    setPending(true);
    setError(null);
    setSent(false);
    try {
      await forgotPassword(user.email);
      setSent(true);
    } catch (e) {
      setError(e instanceof ApiError ? e.message : GENERIC_ERROR);
    } finally {
      setPending(false);
    }
  };

  return (
    <section data-testid="set-password-panel" aria-labelledby="set-password-heading" className="mb-10">
      <h2 id="set-password-heading" className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1">
        Set a password
      </h2>
      <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
        You sign in with Google. Set a password to change your email address, turn on two-factor authentication, or
        delete your account. You will be signed out everywhere after you set it.
      </p>
      {error && <div role="alert" data-testid="set-password-error" className={`${alertClass} mb-3`}>{error}</div>}
      {sent && (
        <p role="status" data-testid="set-password-sent" className="mb-3 text-sm text-green-700 dark:text-green-400">
          Check your inbox for a link. It expires in {RESET_LINK_TTL_HOURS} {RESET_LINK_TTL_HOURS === 1 ? 'hour' : 'hours'}.
        </p>
      )}
      <button
        type="button" disabled={pending} onClick={() => void handleRequest()}
        data-testid="set-password-request" className={buttonClass}
      >
        {pending ? 'Sending…' : 'Email me a link to set a password'}
      </button>
    </section>
  );
}
