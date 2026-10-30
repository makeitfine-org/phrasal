import React, { useState } from 'react';
import { requestEmailChange } from '../../api/accountApi';
import { ApiError } from '../../api/client';
import { WRONG_PASSWORD, isProblemType } from '../../api/problemTypes';
import { useAuth } from '../../auth/useAuth';
import { alertClass, buttonClass, inputClass } from '../../pages/LoginPage';

const GENERIC_ERROR = 'Something went wrong. Please try again.';

export default function ChangeEmailForm() {
  const { user } = useAuth();
  const [newEmail, setNewEmail] = useState('');
  const [password, setPassword] = useState('');
  const [pending, setPending] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [error, setError] = useState<string | null>(null);
  const [sentTo, setSentTo] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setSentTo(null);
    setFieldErrors({});

    const target = newEmail.trim();
    if (target.toLowerCase() === user?.email.toLowerCase()) {
      setFieldErrors({ newEmail: 'New email must be different from your current one' });
      return;
    }

    setPending(true);
    try {
      await requestEmailChange(target, password);
      setPassword('');
      setSentTo(target);
    } catch (e) {
      if (isProblemType(e, WRONG_PASSWORD)) {
        setFieldErrors({ currentPassword: 'Wrong password' });
      } else if (e instanceof ApiError && e.problem?.errors && Object.keys(e.problem.errors).length > 0) {
        setFieldErrors(e.problem.errors);
      } else {
        setError(e instanceof ApiError ? e.message : GENERIC_ERROR);
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
    <section aria-labelledby="change-email-heading" className="mb-10">
      <h2 id="change-email-heading" className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1">
        Change email
      </h2>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Current: {user?.email}</p>
      {error && <div role="alert" data-testid="change-email-error" className={`${alertClass} mb-3`}>{error}</div>}
      {sentTo && (
        <p role="status" data-testid="change-email-success" className="mb-3 text-sm text-green-700 dark:text-green-400">
          We sent a confirmation link to {sentTo}. Your email stays {user?.email} until you open it.
          The link expires in 1 hour.
        </p>
      )}
      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <label className="block text-sm text-gray-700 dark:text-gray-300">
          New email
          <input
            type="email" autoComplete="email" required value={newEmail}
            onChange={e => setNewEmail(e.target.value)}
            data-testid="change-email-new" className={`${inputClass} mt-1`}
          />
          {fieldError('newEmail')}
        </label>
        <label className="block text-sm text-gray-700 dark:text-gray-300">
          Current password
          <input
            type="password" autoComplete="current-password" required value={password}
            onChange={e => setPassword(e.target.value)}
            data-testid="change-email-password" className={`${inputClass} mt-1`}
          />
          {fieldError('currentPassword')}
        </label>
        <button type="submit" disabled={pending} data-testid="change-email-submit" className={buttonClass}>
          {pending ? 'Sending…' : 'Send confirmation link'}
        </button>
      </form>
    </section>
  );
}
