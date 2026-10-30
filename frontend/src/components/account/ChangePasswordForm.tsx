import React, { useState } from 'react';
import { changePassword } from '../../api/accountApi';
import { ApiError } from '../../api/client';
import { WRONG_PASSWORD, isProblemType } from '../../api/problemTypes';
import { passwordViolation } from '../../auth/passwordPolicy';
import { useAuth } from '../../auth/useAuth';
import { alertClass, buttonClass, inputClass } from '../../pages/LoginPage';
import PasswordRequirements from '../PasswordRequirements';

const GENERIC_ERROR = 'Something went wrong. Please try again.';
const SUCCESS_MESSAGE = 'Password changed. You were logged out on your other devices.';

export default function ChangePasswordForm() {
  const { user, refresh } = useAuth();
  const [current, setCurrent] = useState('');
  const [next, setNext] = useState('');
  const [confirm, setConfirm] = useState('');
  const [pending, setPending] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setDone(false);
    setFieldErrors({});

    const violation = passwordViolation(next, user?.email);
    if (violation) {
      setFieldErrors({ newPassword: violation });
      return;
    }
    if (next !== confirm) {
      setFieldErrors({ confirm: 'Passwords do not match' });
      return;
    }

    setPending(true);
    try {
      await changePassword(current, next);
      setCurrent('');
      setNext('');
      setConfirm('');
      setDone(true);
      await refresh();
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
    <section aria-labelledby="change-password-heading" className="mb-10">
      <h2 id="change-password-heading" className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
        Change password
      </h2>
      {error && <div role="alert" data-testid="change-password-error" className={`${alertClass} mb-3`}>{error}</div>}
      {done && (
        <p role="status" data-testid="change-password-success" className="mb-3 text-sm text-green-700 dark:text-green-400">
          {SUCCESS_MESSAGE}
        </p>
      )}
      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <label className="block text-sm text-gray-700 dark:text-gray-300">
          Current password
          <input
            type="password" autoComplete="current-password" required value={current}
            onChange={e => setCurrent(e.target.value)}
            data-testid="change-password-current" className={`${inputClass} mt-1`}
          />
          {fieldError('currentPassword')}
        </label>
        <label className="block text-sm text-gray-700 dark:text-gray-300">
          New password
          <input
            type="password" autoComplete="new-password" required minLength={10} value={next}
            aria-describedby="change-password-requirements"
            onChange={e => setNext(e.target.value)}
            data-testid="change-password-new" className={`${inputClass} mt-1`}
          />
          <PasswordRequirements id="change-password-requirements" password={next} email={user?.email} />
          {fieldError('newPassword')}
        </label>
        <label className="block text-sm text-gray-700 dark:text-gray-300">
          Confirm new password
          <input
            type="password" autoComplete="new-password" required value={confirm}
            onChange={e => setConfirm(e.target.value)}
            data-testid="change-password-confirm" className={`${inputClass} mt-1`}
          />
          {fieldError('confirm')}
        </label>
        <button type="submit" disabled={pending} data-testid="change-password-submit" className={buttonClass}>
          {pending ? 'Saving…' : 'Change password'}
        </button>
      </form>
    </section>
  );
}
