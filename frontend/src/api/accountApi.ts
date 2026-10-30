import { post } from './client';

const BASE = '/me';

/** Replaces the password; the server signs out the other devices and rotates this session's cookie. */
export function changePassword(currentPassword: string, newPassword: string): Promise<void> {
  return post<void>(`${BASE}/password`, { currentPassword, newPassword });
}

/** Asks for a confirmation link to the new address; the email changes only when the link is opened. */
export async function requestEmailChange(newEmail: string, currentPassword: string): Promise<void> {
  await post<unknown>(`${BASE}/email`, { newEmail, currentPassword });
}

/** Redeems the emailed link; the server closes every session of the account. */
export function confirmEmailChange(token: string): Promise<void> {
  return post<void>('/auth/confirm-email-change', { token });
}
