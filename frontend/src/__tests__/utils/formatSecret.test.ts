import { formatSecret } from '../../utils/formatSecret';

describe('formatSecret', () => {
  it('groups the key in fours', () => {
    expect(formatSecret('ABCDEFGHIJ')).toBe('ABCD EFGH IJ');
  });

  it('returns an empty string for an empty key', () => {
    expect(formatSecret('')).toBe('');
  });
});
