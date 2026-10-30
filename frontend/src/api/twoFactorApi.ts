import { get, post } from './client';
import type { RecoveryCodes, TwoFactorSetup, TwoFactorStatus } from '../types';

const BASE = '/me/2fa';

export function fetchTwoFactorStatus(): Promise<TwoFactorStatus> {
  return get<TwoFactorStatus>(BASE);
}

export function startTwoFactorSetup(password: string): Promise<TwoFactorSetup> {
  return post<TwoFactorSetup>(`${BASE}/setup`, { password });
}

/** Turns 2FA on; the response carries the one-time recovery codes. */
export function confirmTwoFactorSetup(code: string): Promise<RecoveryCodes> {
  return post<RecoveryCodes>(`${BASE}/confirm`, { code });
}

export function regenerateRecoveryCodes(code: string): Promise<RecoveryCodes> {
  return post<RecoveryCodes>(`${BASE}/recovery-codes`, { code });
}

export function disableTwoFactor(code: string): Promise<void> {
  return post<void>(`${BASE}/disable`, { code });
}
