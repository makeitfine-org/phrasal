import { ApiError } from './client';

export const EMAIL_NOT_VERIFIED = 'email-not-verified';
export const VERIFICATION_LINK_EXPIRED = 'verification-link-expired';
export const VERIFICATION_LINK_INVALID = 'verification-link-invalid';

/** True when the error is an API problem whose `type` URI ends with `/{type}`. */
export function isProblemType(error: unknown, type: string): boolean {
  return error instanceof ApiError && !!error.problem?.type && error.problem.type.endsWith(`/${type}`);
}
