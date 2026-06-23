import { useState, useEffect } from 'react';
import { fetchVerbList, type VerbListItem } from '../api/verbDetailsApi';

export interface UseVerbListReturn {
  verbs: VerbListItem[];
  loading: boolean;
  error: string | null;
}

export function useVerbList(): UseVerbListReturn {
  const [verbs, setVerbs] = useState<VerbListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    fetchVerbList()
      .then(result => {
        if (!cancelled) {
          setVerbs(result);
          setLoading(false);
        }
      })
      .catch(err => {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Failed to load verb list');
          setLoading(false);
        }
      });

    return () => { cancelled = true; };
  }, []);

  return { verbs, loading, error };
}
