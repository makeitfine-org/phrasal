import { register, login, logout, fetchCurrentUser } from '../../api/authApi';
import { get, post, ApiError } from '../../api/client';

vi.mock('../../api/client', async () => {
  const actual = await vi.importActual<typeof import('../../api/client')>('../../api/client');
  return { ...actual, get: vi.fn(), post: vi.fn() };
});

const user = { id: 1, email: 'a@b.co', role: 'USER' as const };

afterEach(() => {
  vi.mocked(get).mockReset();
  vi.mocked(post).mockReset();
});

describe('authApi', () => {
  it('register posts credentials', async () => {
    vi.mocked(post).mockResolvedValue(user);
    expect(await register('a@b.co', 'secret-pass-1')).toEqual(user);
    expect(post).toHaveBeenCalledWith('/auth/register', { email: 'a@b.co', password: 'secret-pass-1' });
  });

  it('login posts credentials', async () => {
    vi.mocked(post).mockResolvedValue(user);
    expect(await login('a@b.co', 'pw')).toEqual(user);
    expect(post).toHaveBeenCalledWith('/auth/login', { email: 'a@b.co', password: 'pw' });
  });

  it('logout posts without body', async () => {
    vi.mocked(post).mockResolvedValue(undefined);
    await logout();
    expect(post).toHaveBeenCalledWith('/auth/logout');
  });

  it('fetchCurrentUser returns the user', async () => {
    vi.mocked(get).mockResolvedValue(user);
    expect(await fetchCurrentUser()).toEqual(user);
    expect(get).toHaveBeenCalledWith('/auth/me');
  });

  it('fetchCurrentUser returns null on 401', async () => {
    vi.mocked(get).mockRejectedValue(new ApiError(401, 'Unauthorized'));
    expect(await fetchCurrentUser()).toBeNull();
  });

  it('fetchCurrentUser rethrows other errors', async () => {
    vi.mocked(get).mockRejectedValue(new ApiError(500, 'boom'));
    await expect(fetchCurrentUser()).rejects.toMatchObject({ status: 500 });
  });
});
