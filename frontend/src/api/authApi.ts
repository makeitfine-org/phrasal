import { get, post, ApiError } from './client';
import type { CurrentUser } from '../types';

const HTTP_UNAUTHORIZED = 401;

/** Resolves for any 2xx; the body is ignored (the account only exists after the email is verified). */
export async function register(email: string, password: string): Promise<void> {
  await post<unknown>('/auth/register', { email, password });
}

export function verifyEmail(token: string): Promise<void> {
  return post<void>('/auth/verify-email', { token });
}

export function resendVerification(email: string): Promise<void> {
  return post<void>('/auth/resend-verification', { email });
}

export function login(email: string, password: string): Promise<CurrentUser> {
  return post<CurrentUser>('/auth/login', { email, password });
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
