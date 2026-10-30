import React from 'react';
import { render, screen, act, waitFor } from '@testing-library/react';
import { AuthProvider } from '../../auth/AuthContext';
import { useAuth } from '../../auth/useAuth';
import * as accountApi from '../../api/accountApi';
import * as authApi from '../../api/authApi';
import { ApiError } from '../../api/client';
import { flushQuizProgress } from '../../hooks/useQuizProgressSync';
import { clearAccountQuizProgress, stashAllAnonymousProgress } from '../../utils/quizProgressStorage';

vi.mock('../../api/authApi');
vi.mock('../../api/accountApi');
vi.mock('../../hooks/useQuizProgressSync', () => ({ flushQuizProgress: vi.fn() }));
vi.mock('../../utils/quizProgressStorage', () => ({
  clearAccountQuizProgress: vi.fn(),
  stashAllAnonymousProgress: vi.fn(),
}));

const user = { id: 1, email: 'a@b.co', role: 'USER' as const, twoFactorEnabled: false, twoFactorEnrollmentRequired: false };
let auth: ReturnType<typeof useAuth>;

function Probe() {
  auth = useAuth();
  return <div data-testid="state">{auth.status}:{auth.user?.email ?? '-'}</div>;
}

function renderProvider() {
  return render(<AuthProvider><Probe /></AuthProvider>);
}

beforeEach(() => {
  vi.mocked(authApi.fetchCurrentUser).mockReset();
  vi.mocked(authApi.login).mockReset();
  vi.mocked(authApi.register).mockReset();
  vi.mocked(authApi.logout).mockReset();
  vi.mocked(accountApi.deleteAccount).mockReset();
  vi.mocked(flushQuizProgress).mockReset().mockResolvedValue(undefined);
  vi.mocked(clearAccountQuizProgress).mockReset();
  vi.mocked(stashAllAnonymousProgress).mockReset();
});

describe('AuthProvider', () => {
  it('starts loading then authenticated', async () => {
    vi.mocked(authApi.fetchCurrentUser).mockResolvedValue(user);
    renderProvider();
    expect(screen.getByTestId('state')).toHaveTextContent('loading:-');
    await waitFor(() => expect(screen.getByTestId('state')).toHaveTextContent('authenticated:a@b.co'));
  });

  it('is anonymous when /me returns null', async () => {
    vi.mocked(authApi.fetchCurrentUser).mockResolvedValue(null);
    renderProvider();
    await waitFor(() => expect(screen.getByTestId('state')).toHaveTextContent('anonymous:-'));
  });

  it('is anonymous on a network error', async () => {
    vi.mocked(authApi.fetchCurrentUser).mockRejectedValue(new TypeError('network'));
    renderProvider();
    await waitFor(() => expect(screen.getByTestId('state')).toHaveTextContent('anonymous:-'));
  });

  it('login updates the user', async () => {
    vi.mocked(authApi.fetchCurrentUser).mockResolvedValueOnce(null).mockResolvedValue(user);
    vi.mocked(authApi.login).mockResolvedValue('authenticated');
    renderProvider();
    await waitFor(() => expect(screen.getByTestId('state')).toHaveTextContent('anonymous'));
    await act(() => auth.login('a@b.co', 'pw'));
    expect(authApi.login).toHaveBeenCalledWith('a@b.co', 'pw');
    expect(screen.getByTestId('state')).toHaveTextContent('authenticated:a@b.co');
  });

  it('login asking for a second factor stays anonymous and does not re-fetch /me', async () => {
    vi.mocked(authApi.fetchCurrentUser).mockResolvedValue(null);
    vi.mocked(authApi.login).mockResolvedValue('two-factor-required');
    renderProvider();
    await waitFor(() => expect(screen.getByTestId('state')).toHaveTextContent('anonymous'));
    let result: string | undefined;
    await act(async () => { result = await auth.login('a@b.co', 'pw'); });
    expect(result).toBe('two-factor-required');
    expect(authApi.fetchCurrentUser).toHaveBeenCalledTimes(1);
    expect(screen.getByTestId('state')).toHaveTextContent('anonymous:-');
  });

  it('completeTwoFactorLogin authenticates', async () => {
    vi.mocked(authApi.fetchCurrentUser).mockResolvedValueOnce(null).mockResolvedValue(user);
    vi.mocked(authApi.verifyTwoFactorLogin).mockResolvedValue(user);
    renderProvider();
    await waitFor(() => expect(screen.getByTestId('state')).toHaveTextContent('anonymous'));
    await act(() => auth.completeTwoFactorLogin('123456'));
    expect(authApi.verifyTwoFactorLogin).toHaveBeenCalledWith('123456');
    expect(screen.getByTestId('state')).toHaveTextContent('authenticated:a@b.co');
  });

  it('a failing completeTwoFactorLogin rethrows and stays anonymous', async () => {
    vi.mocked(authApi.fetchCurrentUser).mockResolvedValue(null);
    vi.mocked(authApi.verifyTwoFactorLogin).mockRejectedValue(new ApiError(401, 'bad'));
    renderProvider();
    await waitFor(() => expect(screen.getByTestId('state')).toHaveTextContent('anonymous'));
    await act(async () => {
      await expect(auth.completeTwoFactorLogin('000000')).rejects.toMatchObject({ status: 401 });
    });
    expect(authApi.fetchCurrentUser).toHaveBeenCalledTimes(1);
    expect(screen.getByTestId('state')).toHaveTextContent('anonymous:-');
  });

  it('login backs up the anonymous progress before calling the API', async () => {
    const order: string[] = [];
    vi.mocked(authApi.fetchCurrentUser).mockResolvedValueOnce(null).mockResolvedValue(user);
    vi.mocked(stashAllAnonymousProgress).mockImplementation(() => { order.push('stash'); });
    vi.mocked(authApi.login).mockImplementation(async () => { order.push('login'); return 'authenticated' as const; });
    renderProvider();
    await waitFor(() => expect(screen.getByTestId('state')).toHaveTextContent('anonymous'));
    await act(() => auth.login('a@b.co', 'pw'));
    expect(order).toEqual(['stash', 'login']);
  });

  it('logout does not back up anonymous progress', async () => {
    vi.mocked(authApi.fetchCurrentUser).mockResolvedValueOnce(user).mockResolvedValue(null);
    vi.mocked(authApi.logout).mockResolvedValue(undefined);
    renderProvider();
    await waitFor(() => expect(screen.getByTestId('state')).toHaveTextContent('authenticated'));
    await act(() => auth.logout());
    expect(stashAllAnonymousProgress).not.toHaveBeenCalled();
  });

  it('register calls only register; status stays anonymous', async () => {
    vi.mocked(authApi.fetchCurrentUser).mockResolvedValue(null);
    vi.mocked(authApi.register).mockResolvedValue(undefined);
    renderProvider();
    await waitFor(() => expect(screen.getByTestId('state')).toHaveTextContent('anonymous'));
    await act(() => auth.register('a@b.co', 'pw'));
    expect(authApi.register).toHaveBeenCalledWith('a@b.co', 'pw');
    expect(authApi.login).not.toHaveBeenCalled();
    expect(stashAllAnonymousProgress).not.toHaveBeenCalled();
    expect(screen.getByTestId('state')).toHaveTextContent('anonymous:-');
  });

  it('logout returns to anonymous and re-fetches /me', async () => {
    vi.mocked(authApi.fetchCurrentUser).mockResolvedValueOnce(user).mockResolvedValue(null);
    vi.mocked(authApi.logout).mockResolvedValue(undefined);
    renderProvider();
    await waitFor(() => expect(screen.getByTestId('state')).toHaveTextContent('authenticated'));
    await act(() => auth.logout());
    expect(authApi.fetchCurrentUser).toHaveBeenCalledTimes(2);
    expect(screen.getByTestId('state')).toHaveTextContent('anonymous:-');
  });

  it('logout runs flush → api logout → clear local progress → /me', async () => {
    const order: string[] = [];
    vi.mocked(authApi.fetchCurrentUser)
      .mockResolvedValueOnce(user)
      .mockImplementation(async () => { order.push('me'); return null; });
    vi.mocked(flushQuizProgress).mockImplementation(async () => { order.push('flush'); });
    vi.mocked(authApi.logout).mockImplementation(async () => { order.push('logout'); });
    vi.mocked(clearAccountQuizProgress).mockImplementation(() => { order.push('clear'); });
    renderProvider();
    await waitFor(() => expect(screen.getByTestId('state')).toHaveTextContent('authenticated'));
    await act(() => auth.logout());
    expect(order).toEqual(['flush', 'logout', 'clear', 'me']);
  });

  it('a failing flush still logs out and clears local progress', async () => {
    vi.mocked(authApi.fetchCurrentUser).mockResolvedValueOnce(user).mockResolvedValue(null);
    vi.mocked(flushQuizProgress).mockRejectedValue(new Error('flush failed'));
    vi.mocked(authApi.logout).mockResolvedValue(undefined);
    renderProvider();
    await waitFor(() => expect(screen.getByTestId('state')).toHaveTextContent('authenticated'));
    await act(() => auth.logout());
    expect(authApi.logout).toHaveBeenCalled();
    expect(clearAccountQuizProgress).toHaveBeenCalled();
    expect(screen.getByTestId('state')).toHaveTextContent('anonymous');
  });

  it('a failing api logout does not clear local progress', async () => {
    vi.mocked(authApi.fetchCurrentUser).mockResolvedValue(user);
    vi.mocked(flushQuizProgress).mockResolvedValue(undefined);
    vi.mocked(clearAccountQuizProgress).mockReset();
    vi.mocked(authApi.logout).mockRejectedValue(new ApiError(500, 'boom'));
    renderProvider();
    await waitFor(() => expect(screen.getByTestId('state')).toHaveTextContent('authenticated'));
    await expect(act(() => auth.logout())).rejects.toMatchObject({ status: 500 });
    expect(clearAccountQuizProgress).not.toHaveBeenCalled();
  });

  it('failing login rethrows and stays anonymous', async () => {
    vi.mocked(authApi.fetchCurrentUser).mockResolvedValue(null);
    vi.mocked(authApi.login).mockRejectedValue(new ApiError(401, 'Invalid email or password'));
    renderProvider();
    await waitFor(() => expect(screen.getByTestId('state')).toHaveTextContent('anonymous'));
    await expect(act(() => auth.login('a@b.co', 'bad'))).rejects.toMatchObject({ status: 401 });
    expect(screen.getByTestId('state')).toHaveTextContent('anonymous:-');
  });
});

describe('AuthProvider deleteAccount', () => {
  it('runs api delete → clear local progress → /me, without flushing progress', async () => {
    const order: string[] = [];
    vi.mocked(authApi.fetchCurrentUser)
      .mockResolvedValueOnce(user)
      .mockImplementation(async () => { order.push('me'); return null; });
    vi.mocked(accountApi.deleteAccount).mockImplementation(async () => { order.push('delete'); });
    vi.mocked(clearAccountQuizProgress).mockImplementation(() => { order.push('clear'); });
    renderProvider();
    await waitFor(() => expect(screen.getByTestId('state')).toHaveTextContent('authenticated'));
    await act(() => auth.deleteAccount('pw', '123456'));
    expect(accountApi.deleteAccount).toHaveBeenCalledWith('pw', '123456');
    expect(order).toEqual(['delete', 'clear', 'me']);
    expect(flushQuizProgress).not.toHaveBeenCalled();
    expect(screen.getByTestId('state')).toHaveTextContent('anonymous:-');
  });

  it('a failing delete rethrows, keeps the user and keeps the local progress', async () => {
    vi.mocked(authApi.fetchCurrentUser).mockResolvedValue(user);
    vi.mocked(accountApi.deleteAccount).mockRejectedValue(new ApiError(400, 'Wrong password'));
    renderProvider();
    await waitFor(() => expect(screen.getByTestId('state')).toHaveTextContent('authenticated'));
    await expect(act(() => auth.deleteAccount('bad'))).rejects.toMatchObject({ status: 400 });
    expect(clearAccountQuizProgress).not.toHaveBeenCalled();
    expect(authApi.fetchCurrentUser).toHaveBeenCalledTimes(1);
    expect(screen.getByTestId('state')).toHaveTextContent('authenticated:a@b.co');
  });
});

describe('useAuth without provider', () => {
  it('returns the anonymous default', () => {
    render(<Probe />);
    expect(screen.getByTestId('state')).toHaveTextContent('anonymous:-');
  });

  it('has a no-op deleteAccount', async () => {
    render(<Probe />);
    await expect(auth.deleteAccount('pw')).resolves.toBeUndefined();
  });
});
