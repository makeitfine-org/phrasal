import React, { useState } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/useAuth';
import { ApiError } from '../api/client';
import { INVALID_TWO_FACTOR_CODE, TWO_FACTOR_LOGIN_EXPIRED, isProblemType } from '../api/problemTypes';
import { alertClass, buttonClass, inputClass, linkClass } from './LoginPage';

const CODE_LENGTH = 6;

export default function LoginTwoFactorPage() {
  const { status, completeTwoFactorLogin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: string } | null)?.from;
  const [useRecovery, setUseRecovery] = useState(false);
  const [code, setCode] = useState('');
  const [pending, setPending] = useState(false);
  const [fieldError, setFieldError] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [expired, setExpired] = useState(false);

  if (status === 'authenticated') {
    return <Navigate to={from ?? '/'} replace />;
  }

  const toggleRecovery = () => {
    setUseRecovery(value => !value);
    setCode('');
    setFieldError(null);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setPending(true);
    setFieldError(null);
    setError(null);
    try {
      await completeTwoFactorLogin(code.trim());
      navigate(from ?? '/', { replace: true });
    } catch (e) {
      if (isProblemType(e, INVALID_TWO_FACTOR_CODE)) {
        setFieldError('Invalid or already used code');
        setCode('');
      } else if (isProblemType(e, TWO_FACTOR_LOGIN_EXPIRED)) {
        setExpired(true);
      } else {
        setError(e instanceof ApiError ? e.message : 'Something went wrong. Please try again.');
      }
    } finally {
      setPending(false);
    }
  };

  return (
    <main id="main-content" className="max-w-sm mx-auto pt-16 px-4 pb-20">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">Two-factor authentication</h1>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
        {useRecovery
          ? 'Enter one of your recovery codes. Each code works once.'
          : 'Enter the 6-digit code from your authenticator app.'}
      </p>
      {expired && (
        <div role="alert" data-testid="auth-error" className={alertClass}>
          <p>Your sign-in timed out.</p>
          <Link to="/login" state={{ from }} data-testid="two-factor-login-again" className={linkClass}>
            Log in again
          </Link>
        </div>
      )}
      {error && (
        <div role="alert" data-testid="auth-error" className={alertClass}>{error}</div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block text-sm text-gray-700 dark:text-gray-300">
          {useRecovery ? 'Recovery code' : 'Authentication code'}
          {useRecovery ? (
            <input
              key="recovery" type="text" autoComplete="off" required autoFocus value={code}
              onChange={e => setCode(e.target.value)}
              data-testid="two-factor-recovery-code" className={`${inputClass} mt-1`}
            />
          ) : (
            <input
              key="code" type="text" inputMode="numeric" autoComplete="one-time-code"
              pattern="[0-9]{6}" maxLength={CODE_LENGTH} required autoFocus value={code}
              onChange={e => setCode(e.target.value)}
              data-testid="two-factor-code" className={`${inputClass} mt-1`}
            />
          )}
        </label>
        {fieldError && (
          <p role="alert" data-testid="two-factor-error" className="text-sm text-red-600 dark:text-red-400">
            {fieldError}
          </p>
        )}
        <button type="submit" disabled={pending} data-testid="two-factor-submit" className={buttonClass}>
          {pending ? 'Checking…' : 'Verify'}
        </button>
      </form>
      <p className="mt-4 text-sm">
        <button
          type="button" onClick={toggleRecovery} data-testid="two-factor-use-recovery"
          className={linkClass}
        >
          {useRecovery ? 'Use the authenticator app' : 'Use a recovery code instead'}
        </button>
      </p>
    </main>
  );
}
