import { renderHook, waitFor } from '@testing-library/react';
import { resetAuthProvidersCache, useAuthProviders } from '../../auth/useAuthProviders';
import { fetchAuthProviders } from '../../api/authApi';
import { ApiError } from '../../api/client';

vi.mock('../../api/authApi', () => ({ fetchAuthProviders: vi.fn() }));

afterEach(() => {
  vi.mocked(fetchAuthProviders).mockReset();
  resetAuthProvidersCache();
});

describe('useAuthProviders', () => {
  it('is null while loading, then the providers', async () => {
    vi.mocked(fetchAuthProviders).mockResolvedValue({ google: true });
    const { result } = renderHook(() => useAuthProviders());
    expect(result.current).toBeNull();
    await waitFor(() => expect(result.current).toEqual({ google: true }));
  });

  it('fetches once for every component on the page', async () => {
    vi.mocked(fetchAuthProviders).mockResolvedValue({ google: true });
    const first = renderHook(() => useAuthProviders());
    const second = renderHook(() => useAuthProviders());
    await waitFor(() => expect(first.result.current).toEqual({ google: true }));
    await waitFor(() => expect(second.result.current).toEqual({ google: true }));
    renderHook(() => useAuthProviders());
    expect(fetchAuthProviders).toHaveBeenCalledTimes(1);
  });

  it('reports no providers when the request fails', async () => {
    vi.mocked(fetchAuthProviders).mockRejectedValue(new ApiError(500, 'boom'));
    const { result } = renderHook(() => useAuthProviders());
    await waitFor(() => expect(result.current).toEqual({ google: false }));
  });

  it('keeps the disabled answer', async () => {
    vi.mocked(fetchAuthProviders).mockResolvedValue({ google: false });
    const { result } = renderHook(() => useAuthProviders());
    await waitFor(() => expect(result.current).toEqual({ google: false }));
  });

  it('fetches again after the cache is reset', async () => {
    vi.mocked(fetchAuthProviders).mockResolvedValueOnce({ google: false }).mockResolvedValueOnce({ google: true });
    const first = renderHook(() => useAuthProviders());
    await waitFor(() => expect(first.result.current).toEqual({ google: false }));
    resetAuthProvidersCache();
    const second = renderHook(() => useAuthProviders());
    await waitFor(() => expect(second.result.current).toEqual({ google: true }));
  });

  it('ignores an answer that arrives after unmount', async () => {
    let resolve: (value: { google: boolean }) => void = () => {};
    vi.mocked(fetchAuthProviders).mockReturnValue(new Promise(r => { resolve = r; }));
    const { result, unmount } = renderHook(() => useAuthProviders());
    unmount();
    resolve({ google: true });
    await Promise.resolve();
    expect(result.current).toBeNull();
  });
});
