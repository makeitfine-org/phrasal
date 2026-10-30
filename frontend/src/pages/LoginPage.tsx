import React, { useState } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/useAuth';
import { ApiError } from '../api/client';
import { EMAIL_NOT_VERIFIED, isProblemType } from '../api/problemTypes';
import ResendVerification from '../components/ResendVerification';

export const inputClass =
  'w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 ' +
  'text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500';
export const buttonClass =
  'w-full px-4 py-2 rounded-lg font-semibold bg-blue-600 text-white hover:bg-blue-700 ' +
  'disabled:opacity-60 disabled:cursor-not-allowed';
export const alertClass =
  'mb-4 p-3 rounded-lg bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 text-sm';
export const linkClass = 'text-blue-600 dark:text-blue-400 hover:underline';

export default function LoginPage() {
  const { status, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [unverified, setUnverified] = useState(false);

  if (status === 'authenticated') {
    return <Navigate to="/" replace />;
  }

  const notice = (location.state as { notice?: string } | null)?.notice;

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setPending(true);
    setError(null);
    setUnverified(false);
    try {
      const result = await login(email, password);
      const from = (location.state as { from?: string } | null)?.from;
      if (result === 'two-factor-required') {
        navigate('/login/2fa', { replace: true, state: { from } });
        return;
      }
      navigate(from ?? '/', { replace: true });
    } catch (e) {
      if (isProblemType(e, EMAIL_NOT_VERIFIED)) {
        setUnverified(true);
        return;
      }
      setError(e instanceof ApiError ? e.message : 'Something went wrong. Please try again.');
    } finally {
      setPending(false);
    }
  };

  return (
    <main id="main-content" className="max-w-sm mx-auto pt-16 px-4 pb-20">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">Log in</h1>
      {notice && (
        <p role="status" data-testid="login-notice" className="mb-4 text-sm text-green-700 dark:text-green-400">
          {notice}
        </p>
      )}
      {error && (
        <div role="alert" data-testid="auth-error" className={alertClass}>{error}</div>
      )}
      {unverified && (
        <div role="alert" data-testid="auth-error" className={alertClass}>
          <p className="mb-2">Please confirm your email first. Check your inbox.</p>
          <ResendVerification initialEmail={email} compact />
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block text-sm text-gray-700 dark:text-gray-300">
          Email
          <input
            type="email" autoComplete="email" required value={email}
            onChange={e => setEmail(e.target.value)}
            data-testid="login-email" className={`${inputClass} mt-1`}
          />
        </label>
        <label className="block text-sm text-gray-700 dark:text-gray-300">
          Password
          <input
            type="password" autoComplete="current-password" required value={password}
            onChange={e => setPassword(e.target.value)}
            data-testid="login-password" className={`${inputClass} mt-1`}
          />
        </label>
        <p className="text-sm">
          <Link to="/forgot-password" state={{ email }} data-testid="forgot-password-link" className={linkClass}>
            Forgot password?
          </Link>
        </p>
        <button type="submit" disabled={pending} data-testid="login-submit" className={buttonClass}>
          {pending ? 'Logging in…' : 'Log in'}
        </button>
      </form>
      <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
        No account? <Link to="/register" className={linkClass}>Sign up</Link>
      </p>
    </main>
  );
}
