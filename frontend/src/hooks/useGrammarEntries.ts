import { useState, useEffect } from 'react';
import { fetchGrammarEntries } from '../api/grammarEntriesApi';
import type { GrammarEntry } from '../types';

export interface UseGrammarEntriesReturn {
  entries: GrammarEntry[];
  loading: boolean;
  error: string | null;
}

export function useGrammarEntries(category: string): UseGrammarEntriesReturn {
  const [entries, setEntries] = useState<GrammarEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    fetchGrammarEntries(category)
      .then(result => {
        if (!cancelled) {
          setEntries(result);
          setLoading(false);
        }
      })
      .catch(err => {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Failed to load grammar entries');
          setLoading(false);
        }
      });

    return () => { cancelled = true; };
  }, [category]);

  return { entries, loading, error };
}
