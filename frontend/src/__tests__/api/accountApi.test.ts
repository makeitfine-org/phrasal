import { changePassword, confirmEmailChange, deleteAccount, requestEmailChange } from '../../api/accountApi';
import { post } from '../../api/client';

vi.mock('../../api/client', async () => {
  const actual = await vi.importActual<typeof import('../../api/client')>('../../api/client');
  return { ...actual, post: vi.fn() };
});

afterEach(() => {
  vi.mocked(post).mockReset();
});

describe('accountApi', () => {
  it('changePassword posts both passwords to /me/password', async () => {
    vi.mocked(post).mockResolvedValue(undefined);
    await changePassword('old-pass', 'new-pass');
    expect(post).toHaveBeenCalledWith('/me/password', { currentPassword: 'old-pass', newPassword: 'new-pass' });
  });

  it('changePassword passes the API error on', async () => {
    const error = new Error('boom');
    vi.mocked(post).mockRejectedValue(error);
    await expect(changePassword('a', 'b')).rejects.toBe(error);
  });

  it('requestEmailChange posts the address and password to /me/email', async () => {
    vi.mocked(post).mockResolvedValue({ message: 'ok' });
    await expect(requestEmailChange('new@x.co', 'pw')).resolves.toBeUndefined();
    expect(post).toHaveBeenCalledWith('/me/email', { newEmail: 'new@x.co', currentPassword: 'pw' });
  });

  it('requestEmailChange passes the API error on', async () => {
    const error = new Error('boom');
    vi.mocked(post).mockRejectedValue(error);
    await expect(requestEmailChange('a@b.co', 'x')).rejects.toBe(error);
  });

  it('confirmEmailChange posts the token to /auth/confirm-email-change', async () => {
    vi.mocked(post).mockResolvedValue(undefined);
    await confirmEmailChange('tok');
    expect(post).toHaveBeenCalledWith('/auth/confirm-email-change', { token: 'tok' });
  });

  it('confirmEmailChange passes the API error on', async () => {
    const error = new Error('boom');
    vi.mocked(post).mockRejectedValue(error);
    await expect(confirmEmailChange('t')).rejects.toBe(error);
  });

  it('deleteAccount posts only the password when there is no code', async () => {
    vi.mocked(post).mockResolvedValue(undefined);
    await deleteAccount('pw');
    expect(post).toHaveBeenCalledWith('/me/delete', { password: 'pw' });
  });

  it('deleteAccount adds the code when given', async () => {
    vi.mocked(post).mockResolvedValue(undefined);
    await deleteAccount('pw', '123456');
    expect(post).toHaveBeenCalledWith('/me/delete', { password: 'pw', code: '123456' });
  });

  it('deleteAccount passes the API error on', async () => {
    const error = new Error('boom');
    vi.mocked(post).mockRejectedValue(error);
    await expect(deleteAccount('a')).rejects.toBe(error);
  });
});
