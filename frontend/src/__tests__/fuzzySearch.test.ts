import { subsequenceScore, tokenizedSearch, type ScoredResult } from '../utils/fuzzySearch';

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

function names(results: ScoredResult<TestItem>[]): string[] {
  return results.map(r => r.item.name);
}

describe('subsequenceScore', () => {
  it('returns 1 for exact substring', () => {
    expect(subsequenceScore('team', 'the team three')).toBe(1);
  });

  it('returns 0 when pattern is longer than text', () => {
    expect(subsequenceScore('abcdefgh', 'abc')).toBe(0);
  });

  it('returns 0 for empty pattern', () => {
    expect(subsequenceScore('', 'some text')).toBe(0);
  });

  it('returns 0 when characters are not found in order', () => {
    expect(subsequenceScore('zyx', 'abc')).toBe(0);
  });

  it('scores a full subsequence match between 0.3 and 0.6', () => {
    const score = subsequenceScore('tethree', 'it took the team three hours');
    expect(score).toBeGreaterThan(0.3);
    expect(score).toBeLessThanOrEqual(0.6);
  });

  it('gives higher score when characters are more consecutive', () => {
    const highConsecutive = subsequenceScore('three', 'it took three hours');
    const lowConsecutive = subsequenceScore('three', 'the hat run eye ear');
    expect(highConsecutive).toBeGreaterThan(lowConsecutive);
  });
});

describe('tokenizedSearch', () => {
  it('returns empty for queries shorter than 2 chars', () => {
    expect(tokenizedSearch(items, keys, 'a')).toHaveLength(0);
  });

  it('returns empty for whitespace-only query', () => {
    expect(tokenizedSearch(items, keys, '   ')).toHaveLength(0);
  });

  it('matches exact substring in name', () => {
    const results = tokenizedSearch(items, keys, 'figure out');
    expect(names(results)).toContain('figure out');
  });

  it('matches exact substring in definition', () => {
    const results = tokenizedSearch(items, keys, 'understand a problem');
    expect(names(results)).toContain('figure out');
  });

  it('matches exact substring in example', () => {
    const results = tokenizedSearch(items, keys, 'the team three');
    expect(names(results)).toContain('figure out');
  });

  it('matches subsequence across word boundaries (no spaces)', () => {
    const results = tokenizedSearch(items, keys, 'tethree');
    expect(results.length).toBeGreaterThan(0);
    expect(names(results)).toContain('figure out');
  });

  it('matches tokenized query with fuzzy per-token matching', () => {
    const results = tokenizedSearch(items, keys, 'te thrh');
    expect(results.length).toBeGreaterThan(0);
    expect(names(results)).toContain('figure out');
  });

  it('matches query with typos via word similarity', () => {
    const results = tokenizedSearch(items, keys, 'figure owt');
    expect(results.length).toBeGreaterThan(0);
    expect(results[0].item.name).toBe('figure out');
  });

  it('returns nothing for complete gibberish', () => {
    expect(tokenizedSearch(items, keys, 'zzznomatch')).toHaveLength(0);
  });

  it('is case insensitive', () => {
    const results = tokenizedSearch(items, keys, 'FIGURE OUT');
    expect(names(results)).toContain('figure out');
  });

  it('requires all tokens to match', () => {
    const results = tokenizedSearch(items, keys, 'figure zzzzz');
    expect(results).toHaveLength(0);
  });

  it('sorts results by score descending', () => {
    const results = tokenizedSearch(items, keys, 'out');
    expect(results.length).toBeGreaterThan(0);
    for (let i = 1; i < results.length; i++) {
      expect(results[i].score).toBeLessThanOrEqual(results[i - 1].score);
    }
  });

  it('gives higher score to name matches than description matches', () => {
    const testItems: TestItem[] = [
      { name: 'look up', description: 'to search', example: 'example' },
      { name: 'act up', description: 'to look up information', example: 'example' },
    ];
    const results = tokenizedSearch(testItems, keys, 'look up');
    expect(results[0].item.name).toBe('look up');
  });
});
