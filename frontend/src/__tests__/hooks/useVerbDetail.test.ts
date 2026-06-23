import { renderHook, waitFor } from '@testing-library/react';
import { useVerbDetail } from '../../hooks/useVerbDetail';

const mockFetchVerbDetail = vi.fn();

vi.mock('../../api/verbDetailsApi', () => ({
  fetchVerbDetail: (...args: unknown[]) => mockFetchVerbDetail(...args),
}));

afterEach(() => {
  mockFetchVerbDetail.mockReset();
});

const mockData = {
  title: 'Get',
  sections: [
    {
      particle: 'off',
      storageKey: 'getOff_section_expanded',
      storageKeyPrefix: 'getOff',
      meanings: [
        { definition: 'To leave', example: 'Get off the bus.', imageSrc: '/images/default.png', imageAlt: 'alt' },
      ],
    },
  ],
};

describe('useVerbDetail', () => {
  it('starts in loading state', () => {
    mockFetchVerbDetail.mockReturnValue(new Promise(() => {}));
    const { result } = renderHook(() => useVerbDetail('get'));
    expect(result.current.loading).toBe(true);
    expect(result.current.error).toBeNull();
    expect(result.current.sections).toEqual([]);
    expect(result.current.title).toBe('');
  });

  it('returns data on successful fetch', async () => {
    mockFetchVerbDetail.mockResolvedValue(mockData);
    const { result } = renderHook(() => useVerbDetail('get'));

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.title).toBe('Get');
    expect(result.current.sections).toEqual(mockData.sections);
    expect(result.current.error).toBeNull();
  });

  it('calls fetchVerbDetail with correct verb', async () => {
    mockFetchVerbDetail.mockResolvedValue(mockData);
    renderHook(() => useVerbDetail('get'));

    await waitFor(() => expect(mockFetchVerbDetail).toHaveBeenCalledWith('get'));
  });

  it('returns error on failed fetch', async () => {
    mockFetchVerbDetail.mockRejectedValue(new Error('Not found'));
    const { result } = renderHook(() => useVerbDetail('nonexistent'));

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.error).toBe('Not found');
    expect(result.current.sections).toEqual([]);
  });

  it('returns generic error message for non-Error rejections', async () => {
    mockFetchVerbDetail.mockRejectedValue('something broke');
    const { result } = renderHook(() => useVerbDetail('get'));

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.error).toBe('Failed to load verb detail');
  });

  it('re-fetches when verb changes', async () => {
    mockFetchVerbDetail.mockResolvedValue(mockData);
    const { rerender } = renderHook(
      ({ verb }) => useVerbDetail(verb),
      { initialProps: { verb: 'get' } },
    );

    await waitFor(() => expect(mockFetchVerbDetail).toHaveBeenCalledWith('get'));

    const newData = { title: 'Make', sections: [] };
    mockFetchVerbDetail.mockResolvedValue(newData);
    rerender({ verb: 'make' });

    await waitFor(() => expect(mockFetchVerbDetail).toHaveBeenCalledWith('make'));
  });
});
