import React, { useCallback, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../auth/useAuth';
import { disableTwoFactor, fetchTwoFactorStatus, regenerateRecoveryCodes } from '../api/twoFactorApi';
import type { TwoFactorStatus } from '../types';
import ChangePasswordForm from '../components/account/ChangePasswordForm';
import CodeForm from '../components/twoFactor/CodeForm';
import RecoveryCodesPanel from '../components/twoFactor/RecoveryCodesPanel';
import TwoFactorSetup from '../components/twoFactor/TwoFactorSetup';
import { alertClass, linkClass } from './LoginPage';

const LOW_RECOVERY_CODES = 3;

type View = 'status' | 'setup' | 'regenerate' | 'newCodes' | 'disable';

const actionButtonClass =
  'px-4 py-2 rounded-lg text-sm font-semibold bg-blue-600 text-white hover:bg-blue-700';
const outlineButtonClass =
  'px-4 py-2 rounded-lg text-sm font-medium border border-gray-300 dark:border-gray-600 ' +
  'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800';

function formatDate(iso: string | null): string {
  return iso ? new Date(iso).toLocaleDateString() : '';
}

export default function AccountSecurityPage() {
  const { status, user, refresh } = useAuth();
  const [twoFactor, setTwoFactor] = useState<TwoFactorStatus | null>(null);
  const [loadFailed, setLoadFailed] = useState(false);
  const [view, setView] = useState<View>('status');
  const [newCodes, setNewCodes] = useState<string[]>([]);

  const load = useCallback(async () => {
    setLoadFailed(false);
    try {
      setTwoFactor(await fetchTwoFactorStatus());
    } catch {
      setLoadFailed(true);
    }
  }, []);

  useEffect(() => {
    if (status === 'authenticated') void load();
  }, [status, load]);

  if (status === 'loading') return null;
  if (status === 'anonymous' || !user) {
    return <Navigate to="/login" replace state={{ from: '/account/security' }} />;
  }

  const backToStatus = () => {
    setView('status');
    void load();
  };

  const handleRegenerate = async (code: string) => {
    const result = await regenerateRecoveryCodes(code);
    setNewCodes(result.recoveryCodes);
    setView('newCodes');
  };

  const handleDisable = async (code: string) => {
    await disableTwoFactor(code);
    await refresh();
    backToStatus();
  };

  const isAdmin = user.role === 'ADMIN';

  const renderBody = () => {
    if (loadFailed) {
      return (
        <div role="alert" data-testid="two-factor-load-error" className={alertClass}>
          <p>Could not load your security settings.</p>
          <button type="button" data-testid="two-factor-retry" onClick={() => void load()} className={linkClass}>
            Try again
          </button>
        </div>
      );
    }
    if (!twoFactor) return null;

    if (view === 'setup') {
      return <TwoFactorSetup onEnabled={backToStatus} onCancel={() => setView('status')} />;
    }
    if (view === 'newCodes') {
      return <RecoveryCodesPanel codes={newCodes} onDone={backToStatus} />;
    }
    if (view === 'regenerate') {
      return (
        <div>
          <p className="mb-3 text-sm text-gray-700 dark:text-gray-300">
            Enter a code to replace your recovery codes. The old ones stop working.
          </p>
          <CodeForm label="Authentication or recovery code" submitLabel="Generate new codes"
            testIdPrefix="recovery-codes" onSubmit={handleRegenerate} />
          <p className="mt-4 text-sm">
            <button type="button" onClick={() => setView('status')} className={linkClass}>Cancel</button>
          </p>
        </div>
      );
    }
    if (view === 'disable') {
      return (
        <div>
          <p className="mb-3 text-sm text-gray-700 dark:text-gray-300">
            Turning off two-factor authentication makes your account less safe.
            {isAdmin && ' You will lose admin rights until you turn it on again.'}
          </p>
          <CodeForm label="Authentication or recovery code" submitLabel="Turn off"
            testIdPrefix="two-factor-disable" onSubmit={handleDisable} />
          <p className="mt-4 text-sm">
            <button type="button" onClick={() => setView('status')} className={linkClass}>Cancel</button>
          </p>
        </div>
      );
    }

    if (!twoFactor.enabled) {
      return (
        <div>
          <p data-testid="two-factor-status" className="mb-2 font-medium text-gray-900 dark:text-gray-100">
            Two-factor authentication is off
          </p>
          {isAdmin && (
            <p className="mb-4 text-sm text-amber-800 dark:text-amber-300">
              Required for administrators: content editing stays locked until you turn this on.
            </p>
          )}
          <button type="button" data-testid="two-factor-enable" onClick={() => setView('setup')} className={actionButtonClass}>
            Turn on
          </button>
        </div>
      );
    }

    return (
      <div>
        <p data-testid="two-factor-status" className="mb-2 font-medium text-gray-900 dark:text-gray-100">
          Two-factor authentication is on since {formatDate(twoFactor.enabledAt)}
        </p>
        <p data-testid="recovery-codes-remaining" className="mb-2 text-sm text-gray-700 dark:text-gray-300">
          Recovery codes left: {twoFactor.recoveryCodesRemaining}
        </p>
        {twoFactor.recoveryCodesRemaining <= LOW_RECOVERY_CODES && (
          <p role="status" data-testid="recovery-codes-low" className="mb-4 text-sm text-amber-800 dark:text-amber-300">
            Generate new codes soon.
          </p>
        )}
        <div className="flex flex-wrap gap-2">
          <button type="button" data-testid="recovery-codes-regenerate" onClick={() => setView('regenerate')} className={outlineButtonClass}>
            Generate new recovery codes
          </button>
          <button type="button" data-testid="two-factor-disable" onClick={() => setView('disable')} className={outlineButtonClass}>
            Turn off
          </button>
        </div>
      </div>
    );
  };

  return (
    <main id="main-content" className="max-w-md mx-auto pt-16 px-4 pb-20">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">Account security</h1>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">{user.email}</p>
      {isAdmin ? (
        <p data-testid="admin-managed-note" className="mb-6 text-sm text-gray-700 dark:text-gray-300">
          The admin account&apos;s password and email are managed through server configuration.
        </p>
      ) : (
        <ChangePasswordForm />
      )}
      <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">Two-factor authentication</h2>
      {renderBody()}
    </main>
  );
}
