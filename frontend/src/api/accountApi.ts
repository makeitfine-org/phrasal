import { post } from './client';

const BASE = '/me';

/** Replaces the password; the server signs out the other devices and rotates this session's cookie. */
export function changePassword(currentPassword: string, newPassword: string): Promise<void> {
  return post<void>(`${BASE}/password`, { currentPassword, newPassword });
}
