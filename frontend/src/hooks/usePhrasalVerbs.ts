import { useState, useEffect } from 'react';
import { fetchPhrasalVerbs, type PhrasalVerbsData } from '../api/phrasalVerbsApi';

export interface UsePhrasalVerbsReturn extends PhrasalVerbsData {
  loading: boolean;
  error: string | null;
}

const INITIAL: PhrasalVerbsData = { allVerbs: [], verbsForBrowse: [] };

export function usePhrasalVerbs(): UsePhrasalVerbsReturn {
  const [data, setData] = useState<PhrasalVerbsData>(INITIAL);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    fetchPhrasalVerbs()
      .then(result => {
        if (!cancelled) {
          setData(result);
          setLoading(false);
        }
      })
      .catch(err => {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Failed to load phrasal verbs');
          setLoading(false);
        }
      });

    return () => { cancelled = true; };
  }, []);

  return { ...data, loading, error };
}
