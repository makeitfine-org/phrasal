import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../auth/useAuth';
import { ApiError } from '../api/client';
import ResendVerification from '../components/ResendVerification';
import PasswordRequirements from '../components/PasswordRequirements';
import GoogleSignInButton from '../components/GoogleSignInButton';
import { MIN_PASSWORD_LENGTH, passwordViolation } from '../auth/passwordPolicy';
import { alertClass, buttonClass, inputClass, linkClass } from './LoginPage';

/** Keep in sync with the backend `EMAIL_VERIFICATION_TOKEN_TTL`. */
const VERIFICATION_LINK_TTL_HOURS = 24;

export default function RegisterPage() {
  const { status, register } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [website, setWebsite] = useState('');
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
      await register(email, password, website);
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
      <GoogleSignInButton />
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
          <PasswordRequirements id="password-requirements" password={password} email={email} />
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
        {/* Honeypot: off-screen rather than display:none, so bots that skip hidden fields still fill it. */}
        <div aria-hidden="true" className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden">
          <label htmlFor="register-website">Website</label>
          <input
            id="register-website" name="website" type="text" tabIndex={-1} autoComplete="off"
            data-testid="register-website" value={website} onChange={e => setWebsite(e.target.value)}
          />
        </div>
        <button type="submit" disabled={pending} data-testid="register-submit" className={buttonClass}>
          {pending ? 'Creating account…' : 'Sign up'}
        </button>
      </form>
      <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
        Already have an account? <Link to="/login" className={linkClass}>Log in</Link>
      </p>
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
        By signing up you agree to the <Link to="/privacy" data-testid="privacy-link" className={linkClass}>Privacy Policy</Link>.
      </p>
    </main>
  );
}
