import { ApiError } from '../../api/client';
import {
  EMAIL_NOT_VERIFIED, RESET_LINK_EXPIRED, RESET_LINK_INVALID, VERIFICATION_LINK_EXPIRED, VERIFICATION_LINK_INVALID,
  isProblemType,
} from '../../api/problemTypes';

describe('isProblemType', () => {
  it('matches a type URI ending with the slug', () => {
    const error = new ApiError(403, 'x', { type: 'https://phrasal.net/problems/email-not-verified' });
    expect(isProblemType(error, EMAIL_NOT_VERIFIED)).toBe(true);
  });

  it('does not match another type or a partial slug', () => {
    const error = new ApiError(400, 'x', { type: 'https://phrasal.net/problems/verification-link-expired' });
    expect(isProblemType(error, EMAIL_NOT_VERIFIED)).toBe(false);
    expect(isProblemType(error, 'link-expired')).toBe(false);
    expect(isProblemType(error, VERIFICATION_LINK_EXPIRED)).toBe(true);
  });

  it('is false for non-ApiError values and a missing problem', () => {
    expect(isProblemType(new Error('x'), EMAIL_NOT_VERIFIED)).toBe(false);
    expect(isProblemType(undefined, EMAIL_NOT_VERIFIED)).toBe(false);
    expect(isProblemType(new ApiError(500, 'x'), EMAIL_NOT_VERIFIED)).toBe(false);
    expect(isProblemType(new ApiError(403, 'x', {}), EMAIL_NOT_VERIFIED)).toBe(false);
  });

  it('matches the reset link problems and keeps them apart from the verification ones', () => {
    const invalid = new ApiError(400, 'x', { type: 'https://phrasal.net/problems/reset-link-invalid' });
    const expired = new ApiError(400, 'x', { type: 'https://phrasal.net/problems/reset-link-expired' });
    const verification = new ApiError(400, 'x', { type: 'https://phrasal.net/problems/verification-link-invalid' });
    expect(isProblemType(invalid, RESET_LINK_INVALID)).toBe(true);
    expect(isProblemType(expired, RESET_LINK_EXPIRED)).toBe(true);
    expect(isProblemType(invalid, RESET_LINK_EXPIRED)).toBe(false);
    expect(isProblemType(verification, RESET_LINK_INVALID)).toBe(false);
    expect(isProblemType(invalid, VERIFICATION_LINK_INVALID)).toBe(false);
  });
});
