import React, { useState } from 'react';
import { Link, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../auth/useAuth';
import * as authApi from '../api/authApi';
import { ApiError } from '../api/client';
import { alertClass, buttonClass, inputClass, linkClass } from './LoginPage';

/** Keep in sync with the backend `PASSWORD_RESET_TOKEN_TTL`. */
export const RESET_LINK_TTL_HOURS = 1;

const HTTP_TOO_MANY_REQUESTS = 429;
const GENERIC_ERROR = 'Something went wrong. Please try again.';

export default function ForgotPasswordPage() {
  const { status } = useAuth();
  const location = useLocation();
  const [email, setEmail] = useState((location.state as { email?: string } | null)?.email ?? '');
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [sentTo, setSentTo] = useState<string | null>(null);

  if (status === 'authenticated') {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setFieldErrors({});
    setPending(true);
    try {
      await authApi.forgotPassword(email);
      setSentTo(email);
    } catch (e) {
      if (e instanceof ApiError && e.problem?.errors && Object.keys(e.problem.errors).length > 0) {
        setFieldErrors(e.problem.errors);
      } else if (e instanceof ApiError && e.status === HTTP_TOO_MANY_REQUESTS) {
        setError(e.message);
      } else {
        setError(GENERIC_ERROR);
      }
    } finally {
      setPending(false);
    }
  };

  if (sentTo) {
    return (
      <main id="main-content" className="max-w-sm mx-auto pt-16 px-4 pb-20">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">Check your inbox</h1>
        <div data-testid="forgot-check-email" className="space-y-4 text-gray-700 dark:text-gray-300">
          <p>
            If an account exists for <strong>{sentTo}</strong>, we sent a link to reset the password.
            It expires in {RESET_LINK_TTL_HOURS} {RESET_LINK_TTL_HOURS === 1 ? 'hour' : 'hours'}.
          </p>
          <p className="text-sm">Didn't get it? Check spam, or try again in a few minutes.</p>
          <p className="text-sm">
            <Link to="/login" data-testid="forgot-login-link" className={linkClass}>Back to log in</Link>
          </p>
        </div>
      </main>
    );
  }

  return (
    <main id="main-content" className="max-w-sm mx-auto pt-16 px-4 pb-20">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">Reset your password</h1>
      {error && (
        <div role="alert" data-testid="auth-error" className={alertClass}>{error}</div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block text-sm text-gray-700 dark:text-gray-300">
          Email
          <input
            type="email" autoComplete="email" required value={email}
            onChange={e => setEmail(e.target.value)}
            data-testid="forgot-email" className={`${inputClass} mt-1`}
          />
          {fieldErrors.email && (
            <span role="alert" data-testid="field-error-email" className="block mt-1 text-sm text-red-600 dark:text-red-400">
              {fieldErrors.email}
            </span>
          )}
        </label>
        <button type="submit" disabled={pending} data-testid="forgot-submit" className={buttonClass}>
          {pending ? 'Sending…' : 'Send reset link'}
        </button>
      </form>
      <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
        <Link to="/login" className={linkClass}>Back to log in</Link>
      </p>
    </main>
  );
}
