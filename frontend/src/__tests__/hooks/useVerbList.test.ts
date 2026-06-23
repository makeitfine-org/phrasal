import { renderHook, waitFor } from '@testing-library/react';
import { useVerbList } from '../../hooks/useVerbList';

const mockFetchVerbList = vi.fn();

vi.mock('../../api/verbDetailsApi', () => ({
  fetchVerbList: (...args: unknown[]) => mockFetchVerbList(...args),
}));

afterEach(() => {
  mockFetchVerbList.mockReset();
});

const mockData = [
  { verb: 'act', label: 'Act', particles: ['on / upon', 'up'] },
  { verb: 'get', label: 'Get', particles: ['off', 'on'] },
];

describe('useVerbList', () => {
  it('starts in loading state', () => {
    mockFetchVerbList.mockReturnValue(new Promise(() => {}));
    const { result } = renderHook(() => useVerbList());
    expect(result.current.loading).toBe(true);
    expect(result.current.error).toBeNull();
    expect(result.current.verbs).toEqual([]);
  });

  it('returns data on successful fetch', async () => {
    mockFetchVerbList.mockResolvedValue(mockData);
    const { result } = renderHook(() => useVerbList());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.verbs).toEqual(mockData);
    expect(result.current.error).toBeNull();
  });

  it('returns error on failed fetch', async () => {
    mockFetchVerbList.mockRejectedValue(new Error('Network error'));
    const { result } = renderHook(() => useVerbList());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.error).toBe('Network error');
    expect(result.current.verbs).toEqual([]);
  });

  it('returns generic error message for non-Error rejections', async () => {
    mockFetchVerbList.mockRejectedValue('something broke');
    const { result } = renderHook(() => useVerbList());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.error).toBe('Failed to load verb list');
  });
});
