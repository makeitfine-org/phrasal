import { get, post, ApiError } from './client';
import type { AuthProviders, CurrentUser } from '../types';

const HTTP_UNAUTHORIZED = 401;

/** A full path for an `href`: the browser navigates there and the backend redirects to Google. */
export const GOOGLE_SIGN_IN_URL = '/api/v1/auth/oauth2/authorization/google';

export function fetchAuthProviders(): Promise<AuthProviders> {
  return get<AuthProviders>('/auth/providers');
}

/** Resolves for any 2xx; the body is ignored (the account only exists after the email is verified). */
export async function register(email: string, password: string, website = ''): Promise<void> {
  await post<unknown>('/auth/register', { email, password, website });
}

export function verifyEmail(token: string): Promise<void> {
  return post<void>('/auth/verify-email', { token });
}

export function resendVerification(email: string): Promise<void> {
  return post<void>('/auth/resend-verification', { email });
}

/** Resolves for any 2xx; the answer is the same whether or not the address has an account. */
export async function forgotPassword(email: string): Promise<void> {
  await post<unknown>('/auth/forgot-password', { email });
}

export function resetPassword(token: string, password: string): Promise<void> {
  return post<void>('/auth/reset-password', { token, password });
}

export type LoginResult = 'authenticated' | 'two-factor-required';

interface LoginChallenge {
  twoFactorRequired?: boolean;
}

/** `202 {twoFactorRequired: true}` means the password was right but a code is still needed. */
export async function login(email: string, password: string): Promise<LoginResult> {
  const body = await post<LoginChallenge | CurrentUser | undefined>('/auth/login', { email, password });
  return (body as LoginChallenge | undefined)?.twoFactorRequired === true ? 'two-factor-required' : 'authenticated';
}

/** The code is a 6-digit authenticator code or a recovery code. */
export function verifyTwoFactorLogin(code: string): Promise<CurrentUser> {
  return post<CurrentUser>('/auth/login/2fa', { code });
}

export function logout(): Promise<void> {
  return post<void>('/auth/logout');
}

export async function fetchCurrentUser(): Promise<CurrentUser | null> {
  try {
    return await get<CurrentUser>('/auth/me');
  } catch (error) {
    if (error instanceof ApiError && error.status === HTTP_UNAUTHORIZED) {
      return null;
    }
    throw error;
  }
}
