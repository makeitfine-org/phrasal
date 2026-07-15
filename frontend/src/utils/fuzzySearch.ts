function levenshtein(a: string, b: string): number {
  const m = a.length;
  const n = b.length;
  if (m === 0) return n;
  if (n === 0) return m;

  let prev = Array.from({ length: n + 1 }, (_, j) => j);
  let curr = new Array<number>(n + 1);

  for (let i = 1; i <= m; i++) {
    curr[0] = i;
    for (let j = 1; j <= n; j++) {
      if (a[i - 1] === b[j - 1]) {
        curr[j] = prev[j - 1];
      } else {
        curr[j] = 1 + Math.min(prev[j], curr[j - 1], prev[j - 1]);
      }
    }
    [prev, curr] = [curr, prev];
  }

  return prev[n];
}

function stringSimilarity(a: string, b: string): number {
  if (a === b) return 1;
  if (a.length === 0 || b.length === 0) return 0;
  const maxLen = Math.max(a.length, b.length);
  return Math.max(0, 1 - levenshtein(a, b) / maxLen);
}

export function subsequenceScore(pattern: string, text: string): number {
  if (pattern.length === 0 || pattern.length > text.length) return 0;
  if (text.includes(pattern)) return 1;

  let pi = 0;
  let consecutive = 0;
  let maxConsecutive = 0;
  let lastMatchIdx = -2;

  for (let ti = 0; ti < text.length && pi < pattern.length; ti++) {
    if (pattern[pi] === text[ti]) {
      consecutive = ti === lastMatchIdx + 1 ? consecutive + 1 : 1;
      maxConsecutive = Math.max(maxConsecutive, consecutive);
      lastMatchIdx = ti;
      pi++;
    }
  }

  if (pi < pattern.length) return 0;

  const consecutiveRatio = maxConsecutive / pattern.length;
  return 0.3 + 0.3 * consecutiveRatio;
}

const WORD_SIM_FLOOR = 0.5;

function bestWordSimilarity(token: string, text: string): number {
  const words = text.split(/\s+/);
  let best = 0;
  for (const word of words) {
    if (word.length === 0) continue;
    const sim = stringSimilarity(token, word);
    if (sim >= WORD_SIM_FLOOR && sim > best) best = sim;
  }
  return best;
}

function bestFuzzyScore(token: string, text: string): number {
  if (text.includes(token)) return 1.0;

  const subSeq = subsequenceScore(token, text);
  const wordSim = bestWordSimilarity(token, text);
  return Math.max(subSeq, wordSim);
}

interface SearchKey<T> {
  name: keyof T & string;
  weight: number;
}

export interface ScoredResult<T> {
  item: T;
  score: number;
}

const MIN_TOKEN_SCORE = 0.3;

export function tokenizedSearch<T>(
  items: T[],
  keys: SearchKey<T>[],
  query: string,
): ScoredResult<T>[] {
  const trimmed = query.trim().toLowerCase();
  if (trimmed.length < 2) return [];

  const tokens = trimmed.split(/\s+/).filter(t => t.length > 0);
  if (tokens.length === 0) return [];

  const scored: ScoredResult<T>[] = [];

  for (const item of items) {
    let totalScore = 0;
    let allMatched = true;

    for (const token of tokens) {
      let bestRawScore = 0;
      let bestWeightedScore = 0;

      for (const key of keys) {
        const value = String(item[key.name] ?? '').toLowerCase();
        const raw = bestFuzzyScore(token, value);
        if (raw > bestRawScore) bestRawScore = raw;
        const weighted = raw * key.weight;
        if (weighted > bestWeightedScore) bestWeightedScore = weighted;
      }

      if (bestRawScore < MIN_TOKEN_SCORE) {
        allMatched = false;
        break;
      }
      totalScore += bestWeightedScore;
    }

    if (allMatched) {
      scored.push({ item, score: totalScore / tokens.length });
    }
  }

  return scored.sort((a, b) => b.score - a.score);
}
