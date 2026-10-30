import {
  fetchTwoFactorStatus, startTwoFactorSetup, confirmTwoFactorSetup, regenerateRecoveryCodes, disableTwoFactor,
} from '../../api/twoFactorApi';
import { get, post, ApiError } from '../../api/client';

vi.mock('../../api/client', async () => {
  const actual = await vi.importActual<typeof import('../../api/client')>('../../api/client');
  return { ...actual, get: vi.fn(), post: vi.fn() };
});

afterEach(() => {
  vi.mocked(get).mockReset();
  vi.mocked(post).mockReset();
});

describe('twoFactorApi', () => {
  it('fetchTwoFactorStatus gets the status', async () => {
    const status = { enabled: true, enabledAt: '2026-10-30T10:00:00', recoveryCodesRemaining: 8 };
    vi.mocked(get).mockResolvedValue(status);
    expect(await fetchTwoFactorStatus()).toEqual(status);
    expect(get).toHaveBeenCalledWith('/me/2fa');
  });

  it('startTwoFactorSetup posts the password', async () => {
    const setup = { secret: 'ABCD', otpauthUri: 'otpauth://totp/x' };
    vi.mocked(post).mockResolvedValue(setup);
    expect(await startTwoFactorSetup('pw')).toEqual(setup);
    expect(post).toHaveBeenCalledWith('/me/2fa/setup', { password: 'pw' });
  });

  it('confirmTwoFactorSetup posts the code and returns the recovery codes', async () => {
    vi.mocked(post).mockResolvedValue({ recoveryCodes: ['a', 'b'] });
    expect(await confirmTwoFactorSetup('123456')).toEqual({ recoveryCodes: ['a', 'b'] });
    expect(post).toHaveBeenCalledWith('/me/2fa/confirm', { code: '123456' });
  });

  it('regenerateRecoveryCodes posts the code', async () => {
    vi.mocked(post).mockResolvedValue({ recoveryCodes: ['c'] });
    expect(await regenerateRecoveryCodes('123456')).toEqual({ recoveryCodes: ['c'] });
    expect(post).toHaveBeenCalledWith('/me/2fa/recovery-codes', { code: '123456' });
  });

  it('disableTwoFactor posts the code and resolves without a body', async () => {
    vi.mocked(post).mockResolvedValue(undefined);
    await expect(disableTwoFactor('123456')).resolves.toBeUndefined();
    expect(post).toHaveBeenCalledWith('/me/2fa/disable', { code: '123456' });
  });

  it('rethrows an ApiError', async () => {
    vi.mocked(post).mockRejectedValue(new ApiError(400, 'bad'));
    await expect(confirmTwoFactorSetup('000000')).rejects.toMatchObject({ status: 400 });
  });
});
