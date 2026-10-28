import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import * as authApi from '../api/authApi';
import {
  VERIFICATION_LINK_EXPIRED, VERIFICATION_LINK_INVALID, isProblemType,
} from '../api/problemTypes';
import { useAuth } from '../auth/useAuth';
import ResendVerification from '../components/ResendVerification';
import { buttonClass, linkClass } from './LoginPage';

type VerifyState = 'incomplete' | 'verifying' | 'success' | 'expired' | 'invalid' | 'error';

const textClass = 'text-gray-700 dark:text-gray-300';

export default function VerifyEmailPage() {
  const { status } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  // The token leaves the address bar and history right away; it lives only in this ref.
  const token = useRef(searchParams.get('token'));
  const started = useRef(false);
  const [state, setState] = useState<VerifyState>(token.current ? 'verifying' : 'incomplete');

  const verify = useCallback(async (value: string) => {
    setState('verifying');
    try {
      await authApi.verifyEmail(value);
      setState('success');
    } catch (e) {
      if (isProblemType(e, VERIFICATION_LINK_EXPIRED)) {
        setState('expired');
      } else if (isProblemType(e, VERIFICATION_LINK_INVALID)) {
        setState('invalid');
      } else {
        setState('error');
      }
    }
  }, []);

  useEffect(() => {
    if (searchParams.has('token')) {
      navigate('/verify-email', { replace: true });
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
      void verify(token.current);
    }
  }, [status, verify]);

  const loginButton = (
    <Link to="/login" data-testid="verify-login-link" className={`${buttonClass} block text-center`}>Log in</Link>
  );

  return (
    <main id="main-content" className="max-w-sm mx-auto pt-16 px-4 pb-20">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">Confirm your email</h1>
      <div data-testid="verify-status" data-state={state} className="space-y-4">
        {state === 'incomplete' && (
          <>
            <p className={textClass}>This link is incomplete. Request a new one:</p>
            <ResendVerification />
          </>
        )}
        {state === 'verifying' && <p role="status" className={textClass}>Confirming your email…</p>}
        {state === 'success' && (
          <>
            <p role="status" className={textClass}>Your email is confirmed.</p>
            {status === 'authenticated'
              ? <Link to="/" className={`${buttonClass} block text-center`}>Go to the quiz</Link>
              : loginButton}
          </>
        )}
        {state === 'expired' && (
          <>
            <p className={textClass}>This link has expired.</p>
            <ResendVerification />
          </>
        )}
        {state === 'invalid' && (
          <>
            <p className={textClass}>This link is invalid or was already used.</p>
            <ResendVerification />
            <p className="text-sm">
              <Link to="/login" data-testid="verify-login-link" className={linkClass}>Log in</Link>
            </p>
          </>
        )}
        {state === 'error' && (
          <>
            <p role="alert" className={textClass}>Something went wrong. Try the link again.</p>
            <button
              type="button" data-testid="verify-retry" className={buttonClass}
              onClick={() => token.current && void verify(token.current)}
            >
              Try again
            </button>
          </>
        )}
      </div>
    </main>
  );
}
