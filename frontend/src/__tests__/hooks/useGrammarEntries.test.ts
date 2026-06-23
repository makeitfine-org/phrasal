import { renderHook, waitFor } from '@testing-library/react';
import { useGrammarEntries } from '../../hooks/useGrammarEntries';

const mockFetchGrammarEntries = vi.fn();

vi.mock('../../api/grammarEntriesApi', () => ({
  fetchGrammarEntries: (...args: unknown[]) => mockFetchGrammarEntries(...args),
}));

afterEach(() => {
  mockFetchGrammarEntries.mockReset();
});

const mockEntries = [
  { sentence: 'Test sentence', correctAnswers: ['Answer one'] },
  { sentence: 'Another sentence', correctAnswers: ['Answer two', 'Answer three'] },
];

describe('useGrammarEntries', () => {
  it('starts in loading state', () => {
    mockFetchGrammarEntries.mockReturnValue(new Promise(() => {}));
    const { result } = renderHook(() => useGrammarEntries('i-wish-if-only'));
    expect(result.current.loading).toBe(true);
    expect(result.current.error).toBeNull();
    expect(result.current.entries).toEqual([]);
  });

  it('passes category to fetchGrammarEntries', async () => {
    mockFetchGrammarEntries.mockResolvedValue(mockEntries);
    renderHook(() => useGrammarEntries('i-wish-if-only'));
    expect(mockFetchGrammarEntries).toHaveBeenCalledWith('i-wish-if-only');
  });

  it('returns entries on successful fetch', async () => {
    mockFetchGrammarEntries.mockResolvedValue(mockEntries);
    const { result } = renderHook(() => useGrammarEntries('i-wish-if-only'));

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.entries).toEqual(mockEntries);
    expect(result.current.error).toBeNull();
  });

  it('returns error on failed fetch', async () => {
    mockFetchGrammarEntries.mockRejectedValue(new Error('Server unavailable'));
    const { result } = renderHook(() => useGrammarEntries('i-wish-if-only'));

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.error).toBe('Server unavailable');
    expect(result.current.entries).toEqual([]);
  });

  it('returns generic error message for non-Error rejections', async () => {
    mockFetchGrammarEntries.mockRejectedValue(42);
    const { result } = renderHook(() => useGrammarEntries('test'));

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.error).toBe('Failed to load grammar entries');
  });
});
