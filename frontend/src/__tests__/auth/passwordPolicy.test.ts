import { containsEmail, passwordRules, passwordViolation } from '../../auth/passwordPolicy';

describe('passwordPolicy', () => {
  it('rejects fewer than 10 characters', () => {
    expect(passwordViolation('123456789')).toBe('Password must be at least 10 characters');
  });

  it('accepts exactly 10 characters', () => {
    expect(passwordViolation('1234567890')).toBeNull();
  });

  it('accepts 72 ASCII bytes and rejects 73', () => {
    expect(passwordViolation('ab'.repeat(36))).toBeNull();
    expect(passwordViolation('a'.repeat(73))).toBe('Password must not exceed 72 bytes (UTF-8)');
  });

  it('counts multi-byte characters by UTF-8 bytes', () => {
    expect(passwordViolation('€x'.repeat(12))).toBeNull(); // 12*4 = 48 bytes
    expect(passwordViolation('€'.repeat(23) + 'xyz')).toBeNull(); // 72 bytes
    expect(passwordViolation('€'.repeat(25))).not.toBeNull();
  });

  it('reports each rule as met or not', () => {
    expect(passwordRules('').map(r => r.met)).toEqual([false, true, true]);
    expect(passwordRules('a'.repeat(80)).map(r => r.met)).toEqual([true, false, true]);
    expect(passwordRules('my-janedoe-pass', 'janedoe@x.org').map(r => r.met)).toEqual([true, true, false]);
  });

  it('rejects a single repeated character', () => {
    expect(passwordViolation('z'.repeat(12))).toBe('Password must not be a single repeated character');
  });

  it('rejects a password containing the email or its local part, ignoring case', () => {
    expect(passwordViolation('x-Jane@Site.org-x', 'jane@site.org')).toBe('Password must not contain your email address');
    expect(passwordViolation('my-JANEDOE-pass', 'janedoe@site.org')).toBe('Password must not contain your email address');
  });

  it('ignores local parts shorter than 4 characters and blank emails', () => {
    expect(containsEmail('my-bob-is-secret', 'bob@site.org')).toBe(false);
    expect(containsEmail('anything-goes-here', '  ')).toBe(false);
  });
});
