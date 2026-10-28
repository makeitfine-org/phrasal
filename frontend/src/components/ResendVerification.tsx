import React, { useEffect, useRef, useState } from 'react';
import * as authApi from '../api/authApi';
import { ApiError } from '../api/client';
import { buttonClass, inputClass } from '../pages/LoginPage';

const HTTP_TOO_MANY_REQUESTS = 429;
/** Stops accidental double sends after a success; the server enforces the real limit. */
export const RESEND_COOLDOWN_MS = 30_000;

interface ResendVerificationProps {
  initialEmail?: string;
  /** With an initial email, hides the field and shows only the button. */
  compact?: boolean;
}

export default function ResendVerification({ initialEmail = '', compact = false }: ResendVerificationProps) {
  const [email, setEmail] = useState(initialEmail);
  const [pending, setPending] = useState(false);
  const [done, setDone] = useState(false);
  const [cooldown, setCooldown] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  const showField = !(compact && initialEmail);

  const handleSend = async (event: React.FormEvent) => {
    event.preventDefault();
    setPending(true);
    setError(null);
    try {
      await authApi.resendVerification(email);
      setDone(true);
      setCooldown(true);
      timer.current = setTimeout(() => setCooldown(false), RESEND_COOLDOWN_MS);
    } catch (e) {
      setDone(false);
      setError(
        e instanceof ApiError && e.status === HTTP_TOO_MANY_REQUESTS
          ? e.message
          : 'Could not send the email. Please try again.',
      );
    } finally {
      setPending(false);
    }
  };

  return (
    <form onSubmit={handleSend} className="space-y-3" noValidate>
      {showField && (
        <label className="block text-sm text-gray-700 dark:text-gray-300">
          Email
          <input
            type="email" autoComplete="email" required value={email}
            onChange={e => setEmail(e.target.value)}
            data-testid="resend-email" className={`${inputClass} mt-1`}
          />
        </label>
      )}
      <button
        type="submit" disabled={pending || cooldown || !email}
        data-testid="resend-verification" className={buttonClass}
      >
        {pending ? 'Sending…' : 'Resend verification email'}
      </button>
      {done && (
        <p role="status" data-testid="resend-done" className="text-sm text-green-700 dark:text-green-400">
          If an account needs verification, we've sent a new link.
        </p>
      )}
      {error && (
        <p role="alert" data-testid="resend-error" className="text-sm text-red-600 dark:text-red-400">{error}</p>
      )}
    </form>
  );
}
