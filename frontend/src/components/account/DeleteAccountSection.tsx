import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ApiError } from '../../api/client';
import { INVALID_TWO_FACTOR_CODE, WRONG_PASSWORD, isProblemType } from '../../api/problemTypes';
import { useAuth } from '../../auth/useAuth';
import { alertClass, inputClass, linkClass } from '../../pages/LoginPage';

const GENERIC_ERROR = 'Something went wrong. Please try again.';
export const DELETED_NOTICE = 'Your account was deleted.';

const dangerButtonClass =
  'px-4 py-2 rounded-lg font-semibold bg-red-600 text-white hover:bg-red-700 ' +
  'disabled:opacity-60 disabled:cursor-not-allowed';
const dangerOutlineClass =
  'px-4 py-2 rounded-lg text-sm font-medium border border-red-600 text-red-700 dark:text-red-400 ' +
  'hover:bg-red-50 dark:hover:bg-red-900/30';

interface DeleteAccountSectionProps {
  /**
   * Called with true before the delete request and with false if it fails. Once the session ends, the page that
   * hosts this section redirects an anonymous visitor on its own, so it needs to know the reason to show the notice.
   */
  onDeletingChange?: (deleting: boolean) => void;
}

export default function DeleteAccountSection({ onDeletingChange }: DeleteAccountSectionProps) {
  const { user, deleteAccount } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');
  const [confirmed, setConfirmed] = useState(false);
  const [pending, setPending] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [error, setError] = useState<string | null>(null);

  const close = () => {
    setOpen(false);
    setPassword('');
    setCode('');
    setConfirmed(false);
    setFieldErrors({});
    setError(null);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setFieldErrors({});
    setPending(true);
    onDeletingChange?.(true);
    try {
      await deleteAccount(password, user?.twoFactorEnabled ? code.trim() : undefined);
      navigate('/login', { replace: true, state: { notice: DELETED_NOTICE } });
    } catch (e) {
      if (isProblemType(e, WRONG_PASSWORD)) {
        setFieldErrors({ password: 'Wrong password' });
      } else if (isProblemType(e, INVALID_TWO_FACTOR_CODE)) {
        setFieldErrors({ code: 'Invalid or already used code' });
        setCode('');
      } else {
        setError(e instanceof ApiError ? e.message : GENERIC_ERROR);
      }
      setPending(false);
      onDeletingChange?.(false);
    }
  };

  const fieldError = (name: string) =>
    fieldErrors[name] ? (
      <span role="alert" data-testid={`field-error-${name}`} className="block mt-1 text-sm text-red-600 dark:text-red-400">
        {fieldErrors[name]}
      </span>
    ) : null;

  return (
    <section aria-labelledby="delete-account-heading" className="mt-10">
      <h2 id="delete-account-heading" className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
        Delete account
      </h2>
      {!open ? (
        <button type="button" data-testid="delete-account-open" onClick={() => setOpen(true)} className={dangerOutlineClass}>
          Delete my account…
        </button>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4" noValidate data-testid="delete-account-form">
          <p className="text-sm text-gray-700 dark:text-gray-300">
            This permanently deletes your account, your saved quiz progress and your two-factor settings.
            It can&apos;t be undone.
          </p>
          {error && <div role="alert" data-testid="delete-account-error" className={alertClass}>{error}</div>}
          <label className="block text-sm text-gray-700 dark:text-gray-300">
            Password
            <input
              type="password" autoComplete="current-password" required value={password}
              onChange={e => setPassword(e.target.value)}
              data-testid="delete-account-password" className={`${inputClass} mt-1`}
            />
            {fieldError('password')}
          </label>
          {user?.twoFactorEnabled && (
            <label className="block text-sm text-gray-700 dark:text-gray-300">
              Authenticator or recovery code
              <input
                type="text" autoComplete="one-time-code" required value={code}
                onChange={e => setCode(e.target.value)}
                data-testid="delete-account-code" className={`${inputClass} mt-1`}
              />
              {fieldError('code')}
            </label>
          )}
          <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
            <input
              type="checkbox" checked={confirmed} onChange={e => setConfirmed(e.target.checked)}
              data-testid="delete-account-confirm"
            />
            I understand
          </label>
          <div className="flex items-center gap-4">
            <button
              type="submit" disabled={!confirmed || pending}
              data-testid="delete-account-submit" className={dangerButtonClass}
            >
              {pending ? 'Deleting…' : 'Delete account'}
            </button>
            <button type="button" data-testid="delete-account-cancel" onClick={close} className={linkClass}>
              Cancel
            </button>
          </div>
        </form>
      )}
    </section>
  );
}
