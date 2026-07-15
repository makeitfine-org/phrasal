import { renderHook } from '@testing-library/react';
import { useFuzzySearch } from '../../hooks/useFuzzySearch';

interface TestItem {
  name: string;
  description: string;
  example: string;
}

const items: TestItem[] = [
  { name: 'figure out', description: 'To understand a problem and find a solution', example: 'It took the team three hours to figure out why the Java application was crashing.' },
  { name: 'look up', description: 'To search for information', example: 'I need to look up the documentation for this library.' },
  { name: 'break down', description: 'To stop functioning or to divide into parts', example: 'The server broke down during the deployment.' },
  { name: 'give up', description: 'To stop trying', example: 'Never give up on a difficult bug.' },
];

const keys = [
  { name: 'name' as const, weight: 2 },
  { name: 'description' as const, weight: 1.5 },
  { name: 'example' as const, weight: 1 },
];

describe('useFuzzySearch', () => {
  it('returns all items sorted alphabetically when query is empty', () => {
    const { result } = renderHook(() =>
      useFuzzySearch({ items, keys, query: '', sortByField: 'name' })
    );
    expect(result.current.map(i => i.name)).toEqual([
      'break down', 'figure out', 'give up', 'look up',
    ]);
  });

  it('returns all items for whitespace-only query', () => {
    const { result } = renderHook(() =>
      useFuzzySearch({ items, keys, query: '   ', sortByField: 'name' })
    );
    expect(result.current).toHaveLength(items.length);
  });

  it('returns matching items in relevance order for non-empty query', () => {
    const { result } = renderHook(() =>
      useFuzzySearch({ items, keys, query: 'figure out', sortByField: 'name' })
    );
    expect(result.current[0].name).toBe('figure out');
  });

  it('returns empty array when nothing matches', () => {
    const { result } = renderHook(() =>
      useFuzzySearch({ items, keys, query: 'zzznomatch', sortByField: 'name' })
    );
    expect(result.current).toHaveLength(0);
  });

  it('handles typos', () => {
    const { result } = renderHook(() =>
      useFuzzySearch({ items, keys, query: 'figure owt', sortByField: 'name' })
    );
    expect(result.current.length).toBeGreaterThan(0);
    expect(result.current[0].name).toBe('figure out');
  });

  it('handles case-insensitive matching', () => {
    const { result } = renderHook(() =>
      useFuzzySearch({ items, keys, query: 'FIGURE OUT', sortByField: 'name' })
    );
    expect(result.current[0].name).toBe('figure out');
  });

  it('matches across definition text', () => {
    const { result } = renderHook(() =>
      useFuzzySearch({ items, keys, query: 'understand a problem', sortByField: 'name' })
    );
    expect(result.current.length).toBeGreaterThan(0);
    expect(result.current[0].name).toBe('figure out');
  });

  it('matches across example text', () => {
    const { result } = renderHook(() =>
      useFuzzySearch({ items, keys, query: 'the team three', sortByField: 'name' })
    );
    expect(result.current.length).toBeGreaterThan(0);
    expect(result.current[0].name).toBe('figure out');
  });

  it('ranks verb name matches higher than description matches', () => {
    const testItems: TestItem[] = [
      { name: 'act up', description: 'to look up information', example: 'example' },
      { name: 'look up', description: 'to search', example: 'example' },
    ];
    const { result } = renderHook(() =>
      useFuzzySearch({ items: testItems, keys, query: 'look up', sortByField: 'name' })
    );
    expect(result.current[0].name).toBe('look up');
  });

  it('returns items unsorted when sortByField is not provided and query is empty', () => {
    const { result } = renderHook(() =>
      useFuzzySearch({ items, keys, query: '' })
    );
    expect(result.current).toHaveLength(items.length);
    expect(result.current).toEqual(items);
  });

  it('matches subsequence across word boundaries without spaces', () => {
    const { result } = renderHook(() =>
      useFuzzySearch({ items, keys, query: 'tethree', sortByField: 'name' })
    );
    expect(result.current.length).toBeGreaterThan(0);
    expect(result.current[0].name).toBe('figure out');
  });

  it('matches tokenized partial words with fuzzy per-token', () => {
    const { result } = renderHook(() =>
      useFuzzySearch({ items, keys, query: 'te thrh', sortByField: 'name' })
    );
    expect(result.current.length).toBeGreaterThan(0);
    expect(result.current[0].name).toBe('figure out');
  });

  it('matches partial words from definition and example', () => {
    const { result } = renderHook(() =>
      useFuzzySearch({ items, keys, query: 'probl solut', sortByField: 'name' })
    );
    expect(result.current.length).toBeGreaterThan(0);
    expect(result.current[0].name).toBe('figure out');
  });

  it('matches single partial token via subsequence', () => {
    const { result } = renderHook(() =>
      useFuzzySearch({ items, keys, query: 'fgout', sortByField: 'name' })
    );
    expect(result.current.length).toBeGreaterThan(0);
    expect(result.current[0].name).toBe('figure out');
  });
});
