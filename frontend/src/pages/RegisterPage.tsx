import React, { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/useAuth';
import { ApiError } from '../api/client';
import { alertClass, buttonClass, inputClass, linkClass } from './LoginPage';

const MIN_PASSWORD_LENGTH = 10;
const HTTP_CONFLICT = 409;

export default function RegisterPage() {
  const { status, register } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [duplicate, setDuplicate] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  if (status === 'authenticated') {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setDuplicate(false);
    setFieldErrors({});

    if (password.length < MIN_PASSWORD_LENGTH) {
      setFieldErrors({ password: `Password must be at least ${MIN_PASSWORD_LENGTH} characters` });
      return;
    }
    if (password !== confirm) {
      setFieldErrors({ confirm: 'Passwords do not match' });
      return;
    }

    setPending(true);
    try {
      await register(email, password);
      navigate('/', { replace: true });
    } catch (e) {
      if (e instanceof ApiError && e.status === HTTP_CONFLICT) {
        setDuplicate(true);
      } else if (e instanceof ApiError && e.problem?.errors && Object.keys(e.problem.errors).length > 0) {
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

  return (
    <main id="main-content" className="max-w-sm mx-auto pt-16 px-4 pb-20">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">Sign up</h1>
      {duplicate && (
        <div role="alert" data-testid="auth-error" className={alertClass}>
          An account with this email already exists. <Link to="/login" className={linkClass}>Log in</Link>
        </div>
      )}
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
            onChange={e => setPassword(e.target.value)}
            data-testid="register-password" className={`${inputClass} mt-1`}
          />
          <span className="block mt-1 text-xs text-gray-500 dark:text-gray-400">At least {MIN_PASSWORD_LENGTH} characters</span>
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
