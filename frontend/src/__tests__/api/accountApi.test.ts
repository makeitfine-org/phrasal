import { changePassword } from '../../api/accountApi';
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
});
