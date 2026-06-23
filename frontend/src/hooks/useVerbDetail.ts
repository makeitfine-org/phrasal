import { useState, useEffect } from 'react';
import { fetchVerbDetail, type VerbDetailData } from '../api/verbDetailsApi';

export interface UseVerbDetailReturn extends VerbDetailData {
  loading: boolean;
  error: string | null;
}

const INITIAL: VerbDetailData = { title: '', sections: [] };

export function useVerbDetail(verb: string): UseVerbDetailReturn {
  const [data, setData] = useState<VerbDetailData>(INITIAL);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    fetchVerbDetail(verb)
      .then(result => {
        if (!cancelled) {
          setData(result);
          setLoading(false);
        }
      })
      .catch(err => {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Failed to load verb detail');
          setLoading(false);
        }
      });

    return () => { cancelled = true; };
  }, [verb]);

  return { ...data, loading, error };
}
