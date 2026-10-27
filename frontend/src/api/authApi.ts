import { get, post, ApiError } from './client';
import type { CurrentUser } from '../types';

const HTTP_UNAUTHORIZED = 401;

export function register(email: string, password: string): Promise<CurrentUser> {
  return post<CurrentUser>('/auth/register', { email, password });
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
