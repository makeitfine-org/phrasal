import { register, login, verifyTwoFactorLogin, logout, fetchCurrentUser, verifyEmail, resendVerification, forgotPassword, resetPassword, fetchAuthProviders, GOOGLE_SIGN_IN_URL } from '../../api/authApi';
import { get, post, ApiError } from '../../api/client';

vi.mock('../../api/client', async () => {
  const actual = await vi.importActual<typeof import('../../api/client')>('../../api/client');
  return { ...actual, get: vi.fn(), post: vi.fn() };
});

const user = { id: 1, email: 'a@b.co', role: 'USER' as const, twoFactorEnabled: false, twoFactorEnrollmentRequired: false, hasPassword: true };

afterEach(() => {
  vi.mocked(get).mockReset();
  vi.mocked(post).mockReset();
});

describe('authApi', () => {
  it('register posts credentials and resolves for a 201 body', async () => {
    vi.mocked(post).mockResolvedValue(user);
    await expect(register('a@b.co', 'secret-pass-1')).resolves.toBeUndefined();
    expect(post).toHaveBeenCalledWith('/auth/register', { email: 'a@b.co', password: 'secret-pass-1', website: '' });
  });

  it('register passes the honeypot value through', async () => {
    vi.mocked(post).mockResolvedValue(undefined);
    await register('a@b.co', 'secret-pass-1', 'http://spam');
    expect(post).toHaveBeenCalledWith('/auth/register', { email: 'a@b.co', password: 'secret-pass-1', website: 'http://spam' });
  });

  it('register resolves for a 202 message body', async () => {
    vi.mocked(post).mockResolvedValue({ message: 'If this address can be used, we have sent a link to it.' });
    await expect(register('a@b.co', 'secret-pass-1')).resolves.toBeUndefined();
  });

  it('verifyEmail posts the token', async () => {
    vi.mocked(post).mockResolvedValue(undefined);
    await verifyEmail('tok');
    expect(post).toHaveBeenCalledWith('/auth/verify-email', { token: 'tok' });
  });

  it('resendVerification posts the email', async () => {
    vi.mocked(post).mockResolvedValue(undefined);
    await resendVerification('a@b.co');
    expect(post).toHaveBeenCalledWith('/auth/resend-verification', { email: 'a@b.co' });
  });

  it('forgotPassword posts the email and resolves for a 202 body', async () => {
    vi.mocked(post).mockResolvedValue({ message: 'If this address can be used, we have sent a link to it.' });
    await expect(forgotPassword('a@b.co')).resolves.toBeUndefined();
    expect(post).toHaveBeenCalledWith('/auth/forgot-password', { email: 'a@b.co' });
  });

  it('forgotPassword rejects with the ApiError of a 429', async () => {
    vi.mocked(post).mockRejectedValue(new ApiError(429, 'Too many requests'));
    await expect(forgotPassword('a@b.co')).rejects.toMatchObject({ status: 429 });
  });

  it('resetPassword posts the token and the password', async () => {
    vi.mocked(post).mockResolvedValue(undefined);
    await expect(resetPassword('tok', 'new-secret-pass')).resolves.toBeUndefined();
    expect(post).toHaveBeenCalledWith('/auth/reset-password', { token: 'tok', password: 'new-secret-pass' });
  });

  it('resetPassword rejects with an ApiError that carries the problem', async () => {
    const problem = { type: 'https://phrasal.net/problems/reset-link-invalid' };
    vi.mocked(post).mockRejectedValue(new ApiError(400, 'x', problem));
    await expect(resetPassword('tok', 'new-secret-pass')).rejects.toMatchObject({ status: 400, problem });
  });

  it('login posts credentials and reports authenticated for a user body', async () => {
    vi.mocked(post).mockResolvedValue(user);
    expect(await login('a@b.co', 'pw')).toBe('authenticated');
    expect(post).toHaveBeenCalledWith('/auth/login', { email: 'a@b.co', password: 'pw' });
  });

  it('login maps a 202 two-factor challenge to two-factor-required', async () => {
    vi.mocked(post).mockResolvedValue({ twoFactorRequired: true });
    expect(await login('a@b.co', 'pw')).toBe('two-factor-required');
  });

  it('verifyTwoFactorLogin posts the code and returns the user', async () => {
    vi.mocked(post).mockResolvedValue(user);
    expect(await verifyTwoFactorLogin('123456')).toEqual(user);
    expect(post).toHaveBeenCalledWith('/auth/login/2fa', { code: '123456' });
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

  it('fetchAuthProviders gets the enabled providers', async () => {
    vi.mocked(get).mockResolvedValue({ google: true });
    expect(await fetchAuthProviders()).toEqual({ google: true });
    expect(get).toHaveBeenCalledWith('/auth/providers');
  });

  it('fetchAuthProviders rejects with the ApiError of a failed request', async () => {
    vi.mocked(get).mockRejectedValue(new ApiError(503, 'Service unavailable'));
    await expect(fetchAuthProviders()).rejects.toMatchObject({ status: 503 });
  });

  it('GOOGLE_SIGN_IN_URL is the full path of the backend start endpoint', () => {
    expect(GOOGLE_SIGN_IN_URL).toBe('/api/v1/auth/oauth2/authorization/google');
  });
});
