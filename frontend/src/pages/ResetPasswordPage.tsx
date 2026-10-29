import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import * as authApi from '../api/authApi';
import { ApiError } from '../api/client';
import { RESET_LINK_EXPIRED, RESET_LINK_INVALID, isProblemType } from '../api/problemTypes';
import { passwordViolation } from '../auth/passwordPolicy';
import { useAuth } from '../auth/useAuth';
import PasswordRequirements from '../components/PasswordRequirements';
import { alertClass, buttonClass, inputClass, linkClass } from './LoginPage';

type ResetState = 'incomplete' | 'form' | 'submitting' | 'success' | 'expired' | 'invalid';

const HTTP_TOO_MANY_REQUESTS = 429;
const GENERIC_ERROR = 'Something went wrong. Please try again.';
const textClass = 'text-gray-700 dark:text-gray-300';

export default function ResetPasswordPage() {
  // Unlike the login and register pages, this one never redirects a logged-in visitor:
  // the emailed link may be opened in a browser that is logged in.
  const { status, refresh } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  // The token leaves the address bar and history right away; it lives only in this ref.
  const token = useRef(searchParams.get('token'));
  const [state, setState] = useState<ResetState>(token.current ? 'form' : 'incomplete');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (searchParams.has('token')) {
      navigate('/reset-password', { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!token.current) return;
    setError(null);
    setFieldErrors({});

    const violation = passwordViolation(password);
    if (violation) {
      setFieldErrors({ password: violation });
      return;
    }
    if (password !== confirm) {
      setFieldErrors({ confirm: 'Passwords do not match' });
      return;
    }

    setState('submitting');
    try {
      await authApi.resetPassword(token.current, password);
      // A browser logged in as this user just lost its session; the menu must show "Log in".
      await refresh();
      setState('success');
    } catch (e) {
      if (isProblemType(e, RESET_LINK_EXPIRED)) {
        setState('expired');
        return;
      }
      if (isProblemType(e, RESET_LINK_INVALID)) {
        setState('invalid');
        return;
      }
      // The token stays valid after a rejected password or a rate limit, so the form stays.
      setState('form');
      if (e instanceof ApiError && e.problem?.errors && Object.keys(e.problem.errors).length > 0) {
        setFieldErrors(e.problem.errors);
      } else if (e instanceof ApiError && e.status === HTTP_TOO_MANY_REQUESTS) {
        setError(e.message);
      } else {
        setError(GENERIC_ERROR);
      }
    }
  };

  const fieldError = (name: string) =>
    fieldErrors[name] ? (
      <span role="alert" data-testid={`field-error-${name}`} className="block mt-1 text-sm text-red-600 dark:text-red-400">
        {fieldErrors[name]}
      </span>
    ) : null;

  const requestNewLink = (
    <Link to="/forgot-password" data-testid="reset-request-new-link" className={`${buttonClass} block text-center`}>
      Request a new link
    </Link>
  );

  const showForm = state === 'form' || state === 'submitting';
  // The auth check on load sets the CSRF cookie that the POST needs.
  const submitDisabled = state === 'submitting' || status === 'loading';

  return (
    <main id="main-content" className="max-w-sm mx-auto pt-16 px-4 pb-20">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">Set a new password</h1>
      <div data-testid="reset-status" data-state={state} className="space-y-4">
        {state === 'incomplete' && (
          <>
            <p className={textClass}>This link is incomplete.</p>
            {requestNewLink}
          </>
        )}
        {showForm && (
          <>
            {error && (
              <div role="alert" data-testid="auth-error" className={alertClass}>{error}</div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              <label className="block text-sm text-gray-700 dark:text-gray-300">
                New password
                <input
                  type="password" autoComplete="new-password" required value={password}
                  aria-describedby="reset-password-requirements"
                  onChange={e => setPassword(e.target.value)}
                  data-testid="reset-password" className={`${inputClass} mt-1`}
                />
                <PasswordRequirements id="reset-password-requirements" password={password} />
                {fieldError('password')}
              </label>
              <label className="block text-sm text-gray-700 dark:text-gray-300">
                Confirm new password
                <input
                  type="password" autoComplete="new-password" required value={confirm}
                  onChange={e => setConfirm(e.target.value)}
                  data-testid="reset-password-confirm" className={`${inputClass} mt-1`}
                />
                {fieldError('confirm')}
              </label>
              <button type="submit" disabled={submitDisabled} data-testid="reset-submit" className={buttonClass}>
                {state === 'submitting' ? 'Saving…' : 'Set new password'}
              </button>
            </form>
          </>
        )}
        {state === 'success' && (
          <>
            <p role="status" className={textClass}>
              Your password has been changed. You were logged out on every device.
            </p>
            <Link to="/login" data-testid="reset-login-link" className={`${buttonClass} block text-center`}>Log in</Link>
          </>
        )}
        {state === 'expired' && (
          <>
            <p className={textClass}>This link has expired.</p>
            {requestNewLink}
          </>
        )}
        {state === 'invalid' && (
          <>
            <p className={textClass}>This link is invalid or was already used.</p>
            {requestNewLink}
            <p className="text-sm">
              <Link to="/login" className={linkClass}>Log in</Link>
            </p>
          </>
        )}
      </div>
    </main>
  );
}
