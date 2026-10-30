import React, { useState } from 'react';
import { ApiError } from '../../api/client';
import { INVALID_TWO_FACTOR_CODE, isProblemType } from '../../api/problemTypes';
import { alertClass, buttonClass, inputClass } from '../../pages/LoginPage';

interface CodeFormProps {
  label: string;
  submitLabel: string;
  testIdPrefix: string;
  onSubmit: (code: string) => Promise<void>;
}

/** One "code + submit" form; takes an authenticator code or a recovery code. */
export default function CodeForm({ label, submitLabel, testIdPrefix, onSubmit }: CodeFormProps) {
  const [code, setCode] = useState('');
  const [pending, setPending] = useState(false);
  const [fieldError, setFieldError] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setPending(true);
    setFieldError(null);
    setError(null);
    try {
      await onSubmit(code.trim());
    } catch (e) {
      if (isProblemType(e, INVALID_TWO_FACTOR_CODE)) {
        setFieldError('Invalid or already used code');
        setCode('');
      } else {
        setError(e instanceof ApiError ? e.message : 'Something went wrong. Please try again.');
      }
    } finally {
      setPending(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <div role="alert" data-testid={`${testIdPrefix}-alert`} className={alertClass}>{error}</div>}
      <label className="block text-sm text-gray-700 dark:text-gray-300">
        {label}
        <input
          type="text" autoComplete="one-time-code" required autoFocus value={code}
          onChange={e => setCode(e.target.value)}
          data-testid={`${testIdPrefix}-code`} className={`${inputClass} mt-1`}
        />
      </label>
      {fieldError && (
        <p role="alert" data-testid={`${testIdPrefix}-error`} className="text-sm text-red-600 dark:text-red-400">
          {fieldError}
        </p>
      )}
      <button type="submit" disabled={pending} data-testid={`${testIdPrefix}-submit`} className={buttonClass}>
        {pending ? 'Checking…' : submitLabel}
      </button>
    </form>
  );
}
