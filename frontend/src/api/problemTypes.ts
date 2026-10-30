import { ApiError } from './client';

export const EMAIL_NOT_VERIFIED = 'email-not-verified';
export const VERIFICATION_LINK_EXPIRED = 'verification-link-expired';
export const VERIFICATION_LINK_INVALID = 'verification-link-invalid';
export const RESET_LINK_INVALID = 'reset-link-invalid';
export const RESET_LINK_EXPIRED = 'reset-link-expired';
export const INVALID_TWO_FACTOR_CODE = 'invalid-two-factor-code';
export const TWO_FACTOR_LOGIN_EXPIRED = 'two-factor-login-expired';
export const WRONG_PASSWORD = 'wrong-password';
export const TWO_FACTOR_ALREADY_ENABLED = 'two-factor-already-enabled';
export const TWO_FACTOR_SETUP_NOT_STARTED = 'two-factor-setup-not-started';
export const TWO_FACTOR_NOT_ENABLED = 'two-factor-not-enabled';

/** True when the error is an API problem whose `type` URI ends with `/{type}`. */
export function isProblemType(error: unknown, type: string): boolean {
  return error instanceof ApiError && !!error.problem?.type && error.problem.type.endsWith(`/${type}`);
}
