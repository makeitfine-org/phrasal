import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import * as accountApi from '../api/accountApi';
import { ApiError } from '../api/client';
import {
  EMAIL_CHANGE_CONFLICT, EMAIL_CHANGE_LINK_EXPIRED, EMAIL_CHANGE_LINK_INVALID, isProblemType,
} from '../api/problemTypes';
import { useAuth } from '../auth/useAuth';
import { buttonClass, linkClass } from './LoginPage';

type ChangeState = 'confirming' | 'done' | 'invalid' | 'expired' | 'conflict' | 'error';

const textClass = 'text-gray-700 dark:text-gray-300';

export default function ConfirmEmailChangePage() {
  const { status, refresh } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  // The token leaves the address bar and history right away; it lives only in this ref.
  const token = useRef(searchParams.get('token'));
  const started = useRef(false);
  const [state, setState] = useState<ChangeState>(token.current ? 'confirming' : 'invalid');
  const [message, setMessage] = useState('');

  const confirm = useCallback(async (value: string) => {
    setState('confirming');
    try {
      await accountApi.confirmEmailChange(value);
      // Every session of the account is gone now; make the app notice.
      await refresh();
      setState('done');
    } catch (e) {
      if (isProblemType(e, EMAIL_CHANGE_LINK_EXPIRED)) {
        setState('expired');
      } else if (isProblemType(e, EMAIL_CHANGE_LINK_INVALID)) {
        setState('invalid');
      } else if (isProblemType(e, EMAIL_CHANGE_CONFLICT)) {
        setState('conflict');
      } else {
        setMessage(e instanceof ApiError ? e.message : 'Something went wrong. Try the link again.');
        setState('error');
      }
    }
  }, [refresh]);

  useEffect(() => {
    if (searchParams.has('token')) {
      navigate('/confirm-email-change', { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // A visitor arriving from an email has no CSRF cookie yet; the auth check on load sets it,
    // and the POST would be rejected without it.
    if (status === 'loading') return;
    // StrictMode runs this effect twice: one POST per token.
    if (token.current && !started.current) {
      started.current = true;
      void confirm(token.current);
    }
  }, [status, confirm]);

  return (
    <main id="main-content" className="max-w-sm mx-auto pt-16 px-4 pb-20">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">Confirm your new email</h1>
      <div data-testid={`email-change-state-${state}`} className="space-y-4">
        {state === 'confirming' && <p role="status" className={textClass}>Confirming your new email…</p>}
        {state === 'done' && (
          <>
            <p role="status" className={textClass}>
              Your email address was changed. Log in with your new address.
            </p>
            <Link to="/login" data-testid="email-change-login-link" className={`${buttonClass} block text-center`}>
              Log in
            </Link>
          </>
        )}
        {(state === 'invalid' || state === 'expired') && (
          <>
            <p className={textClass}>
              This link is invalid or has expired. Request the change again on the Account security page.
            </p>
            <p className="text-sm">
              <Link to="/account/security" className={linkClass}>Account security</Link>
            </p>
          </>
        )}
        {state === 'conflict' && (
          <p role="alert" className={textClass}>This address is already used by another account.</p>
        )}
        {state === 'error' && <p role="alert" className={textClass}>{message}</p>}
      </div>
    </main>
  );
}
