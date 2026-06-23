import { renderHook, waitFor } from '@testing-library/react';
import { usePhrasalVerbs } from '../../hooks/usePhrasalVerbs';

const mockFetchPhrasalVerbs = vi.fn();

vi.mock('../../api/phrasalVerbsApi', () => ({
  fetchPhrasalVerbs: (...args: unknown[]) => mockFetchPhrasalVerbs(...args),
}));

afterEach(() => {
  mockFetchPhrasalVerbs.mockReset();
});

const mockData = {
  allVerbs: [
    { verb: 'Act out', definition: 'To perform', sentences: ['They acted out.'], wordsToHide: ['acted out'] },
  ],
  verbsForBrowse: [
    { verb: 'Act out', definition: 'To perform', sentences: ['They acted out.'], wordsToHide: ['acted out'], quizIndex: 0 },
  ],
};

describe('usePhrasalVerbs', () => {
  it('starts in loading state', () => {
    mockFetchPhrasalVerbs.mockReturnValue(new Promise(() => {}));
    const { result } = renderHook(() => usePhrasalVerbs());
    expect(result.current.loading).toBe(true);
    expect(result.current.error).toBeNull();
    expect(result.current.allVerbs).toEqual([]);
  });

  it('returns data on successful fetch', async () => {
    mockFetchPhrasalVerbs.mockResolvedValue(mockData);
    const { result } = renderHook(() => usePhrasalVerbs());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.allVerbs).toEqual(mockData.allVerbs);
    expect(result.current.verbsForBrowse).toEqual(mockData.verbsForBrowse);
    expect(result.current.error).toBeNull();
  });

  it('returns error on failed fetch', async () => {
    mockFetchPhrasalVerbs.mockRejectedValue(new Error('Network error'));
    const { result } = renderHook(() => usePhrasalVerbs());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.error).toBe('Network error');
    expect(result.current.allVerbs).toEqual([]);
  });

  it('returns generic error message for non-Error rejections', async () => {
    mockFetchPhrasalVerbs.mockRejectedValue('something broke');
    const { result } = renderHook(() => usePhrasalVerbs());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.error).toBe('Failed to load phrasal verbs');
  });
});
