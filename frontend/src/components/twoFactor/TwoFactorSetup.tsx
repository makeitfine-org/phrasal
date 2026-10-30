import React, { useState } from 'react';
import { useAuth } from '../../auth/useAuth';
import { ApiError } from '../../api/client';
import { WRONG_PASSWORD, isProblemType } from '../../api/problemTypes';
import { confirmTwoFactorSetup, startTwoFactorSetup } from '../../api/twoFactorApi';
import type { TwoFactorSetup as SetupData } from '../../types';
import { formatSecret } from '../../utils/formatSecret';
import { alertClass, buttonClass, inputClass, linkClass } from '../../pages/LoginPage';
import CodeForm from './CodeForm';
import QrCode from './QrCode';
import RecoveryCodesPanel from './RecoveryCodesPanel';

type Step = 'password' | 'scan' | 'codes';

interface TwoFactorSetupProps {
  onEnabled: () => void;
  onCancel: () => void;
}

export default function TwoFactorSetup({ onEnabled, onCancel }: TwoFactorSetupProps) {
  const { refresh } = useAuth();
  const [step, setStep] = useState<Step>('password');
  const [password, setPassword] = useState('');
  const [pending, setPending] = useState(false);
  const [fieldError, setFieldError] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [setup, setSetup] = useState<SetupData | null>(null);
  const [recoveryCodes, setRecoveryCodes] = useState<string[]>([]);

  const handlePassword = async (event: React.FormEvent) => {
    event.preventDefault();
    setPending(true);
    setFieldError(null);
    setError(null);
    try {
      setSetup(await startTwoFactorSetup(password));
      setPassword('');
      setStep('scan');
    } catch (e) {
      if (isProblemType(e, WRONG_PASSWORD)) {
        setFieldError('Wrong password');
      } else {
        setError(e instanceof ApiError ? e.message : 'Something went wrong. Please try again.');
      }
    } finally {
      setPending(false);
    }
  };

  const handleConfirm = async (code: string) => {
    const result = await confirmTwoFactorSetup(code);
    setRecoveryCodes(result.recoveryCodes);
    setStep('codes');
  };

  const handleDone = async () => {
    await refresh();
    onEnabled();
  };

  if (step === 'codes') {
    return <RecoveryCodesPanel codes={recoveryCodes} onDone={handleDone} />;
  }

  if (step === 'scan' && setup) {
    return (
      <div data-testid="two-factor-scan">
        <p className="mb-3 text-sm text-gray-700 dark:text-gray-300">
          Scan this QR code with an authenticator app (Google Authenticator, 1Password, Authy…).
        </p>
        <div className="mb-3 flex justify-center"><QrCode value={setup.otpauthUri} /></div>
        <p className="mb-1 text-sm text-gray-700 dark:text-gray-300">Can&apos;t scan? Enter this key:</p>
        <p data-testid="two-factor-secret" className="mb-4 font-mono text-sm select-all break-all text-gray-900 dark:text-gray-100">
          {formatSecret(setup.secret)}
        </p>
        <CodeForm
          label="Enter the 6-digit code from the app" submitLabel="Turn on"
          testIdPrefix="two-factor-confirm" onSubmit={handleConfirm}
        />
        <p className="mt-4 text-sm">
          <button type="button" data-testid="two-factor-cancel" onClick={onCancel} className={linkClass}>Cancel</button>
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handlePassword} className="space-y-4" data-testid="two-factor-password-step">
      <p className="text-sm text-gray-700 dark:text-gray-300">
        Confirm your password to turn on two-factor authentication
      </p>
      {error && <div role="alert" data-testid="two-factor-setup-alert" className={alertClass}>{error}</div>}
      <label className="block text-sm text-gray-700 dark:text-gray-300">
        Password
        <input
          type="password" autoComplete="current-password" required autoFocus value={password}
          onChange={e => setPassword(e.target.value)}
          data-testid="two-factor-password" className={`${inputClass} mt-1`}
        />
      </label>
      {fieldError && (
        <p role="alert" data-testid="two-factor-password-error" className="text-sm text-red-600 dark:text-red-400">
          {fieldError}
        </p>
      )}
      <button type="submit" disabled={pending} data-testid="two-factor-password-submit" className={buttonClass}>
        {pending ? 'Checking…' : 'Continue'}
      </button>
      <p className="text-sm">
        <button type="button" data-testid="two-factor-cancel" onClick={onCancel} className={linkClass}>Cancel</button>
      </p>
    </form>
  );
}
