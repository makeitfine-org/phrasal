import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../auth/useAuth';

const SECURITY_PATH = '/account/security';

export default function TwoFactorEnrollmentBanner() {
  const { user } = useAuth();
  const { pathname } = useLocation();

  if (!user?.twoFactorEnrollmentRequired || pathname === SECURITY_PATH) return null;

  return (
    <div
      role="status" data-testid="two-factor-enrollment-banner"
      className="px-4 py-2 text-sm text-center bg-amber-100 dark:bg-amber-900/40 text-amber-900 dark:text-amber-200"
    >
      Administrators must turn on two-factor authentication before editing content.{' '}
      <Link to={SECURITY_PATH} className="font-semibold underline">Set it up</Link>
    </div>
  );
}
