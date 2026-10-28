import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../auth/useAuth';
import { ApiError } from '../api/client';
import ResendVerification from '../components/ResendVerification';
import { MIN_PASSWORD_LENGTH, PASSWORD_TIP, passwordRules, passwordViolation } from '../auth/passwordPolicy';
import { alertClass, buttonClass, inputClass, linkClass } from './LoginPage';

/** Keep in sync with the backend `EMAIL_VERIFICATION_TOKEN_TTL`. */
const VERIFICATION_LINK_TTL_HOURS = 24;

export default function RegisterPage() {
  const { status, register } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sentTo, setSentTo] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  if (status === 'authenticated') {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setFieldErrors({});

    const violation = passwordViolation(password, email);
    if (violation) {
      setFieldErrors({ password: violation });
      return;
    }
    if (password !== confirm) {
      setFieldErrors({ confirm: 'Passwords do not match' });
      return;
    }

    setPending(true);
    try {
      await register(email, password);
      setSentTo(email);
    } catch (e) {
      if (e instanceof ApiError && e.problem?.errors && Object.keys(e.problem.errors).length > 0) {
        setFieldErrors(e.problem.errors);
      } else {
        setError(e instanceof ApiError ? e.message : 'Something went wrong. Please try again.');
      }
    } finally {
      setPending(false);
    }
  };

  const fieldError = (name: string) =>
    fieldErrors[name] ? (
      <span role="alert" data-testid={`field-error-${name}`} className="block mt-1 text-sm text-red-600 dark:text-red-400">
        {fieldErrors[name]}
      </span>
    ) : null;

  if (sentTo) {
    return (
      <main id="main-content" className="max-w-sm mx-auto pt-16 px-4 pb-20">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">Check your inbox</h1>
        <div data-testid="register-check-email" className="space-y-4 text-gray-700 dark:text-gray-300">
          <p>
            We sent a link to <strong>{sentTo}</strong>. It expires in {VERIFICATION_LINK_TTL_HOURS} hours.
          </p>
          <p className="text-sm">Didn't get it? Check spam, or</p>
          <ResendVerification initialEmail={sentTo} compact />
          <p className="text-sm">
            <Link to="/login" className={linkClass}>Back to log in</Link>
          </p>
        </div>
      </main>
    );
  }

  return (
    <main id="main-content" className="max-w-sm mx-auto pt-16 px-4 pb-20">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">Sign up</h1>
      {error && (
        <div role="alert" data-testid="auth-error" className={alertClass}>{error}</div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <label className="block text-sm text-gray-700 dark:text-gray-300">
          Email
          <input
            type="email" autoComplete="email" required value={email}
            onChange={e => setEmail(e.target.value)}
            data-testid="register-email" className={`${inputClass} mt-1`}
          />
          {fieldError('email')}
        </label>
        <label className="block text-sm text-gray-700 dark:text-gray-300">
          Password
          <input
            type="password" autoComplete="new-password" required minLength={MIN_PASSWORD_LENGTH} value={password}
            aria-describedby="password-requirements"
            onChange={e => setPassword(e.target.value)}
            data-testid="register-password" className={`${inputClass} mt-1`}
          />
          <div id="password-requirements" data-testid="password-requirements" className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            <ul>
              {passwordRules(password, email).map(rule => (
                <li key={rule.id} data-testid={`password-rule-${rule.id}`} data-met={rule.met}
                  className={rule.met ? 'text-green-700 dark:text-green-400' : undefined}>
                  <span aria-hidden="true">{rule.met ? '✓' : '○'}</span> {rule.label}
                </li>
              ))}
            </ul>
            <p data-testid="password-tip" className="mt-1">{PASSWORD_TIP}</p>
          </div>
          {fieldError('password')}
        </label>
        <label className="block text-sm text-gray-700 dark:text-gray-300">
          Confirm password
          <input
            type="password" autoComplete="new-password" required value={confirm}
            onChange={e => setConfirm(e.target.value)}
            data-testid="register-password-confirm" className={`${inputClass} mt-1`}
          />
          {fieldError('confirm')}
        </label>
        <button type="submit" disabled={pending} data-testid="register-submit" className={buttonClass}>
          {pending ? 'Creating account…' : 'Sign up'}
        </button>
      </form>
      <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
        Already have an account? <Link to="/login" className={linkClass}>Log in</Link>
      </p>
    </main>
  );
}
