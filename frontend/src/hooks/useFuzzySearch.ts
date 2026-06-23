import { useMemo } from 'react';
import Fuse, { type IFuseOptions } from 'fuse.js';

interface UseFuzzySearchOptions<T> {
  items: T[];
  keys: IFuseOptions<T>['keys'];
  query: string;
  sortByField?: keyof T & string;
}

export function useFuzzySearch<T>({ items, keys, query, sortByField }: UseFuzzySearchOptions<T>): T[] {
  const fuse = useMemo(
    () => new Fuse(items, {
      keys,
      threshold: 0.4,
      ignoreLocation: true,
      minMatchCharLength: 2,
      findAllMatches: true,
    }),
    [items, keys]
  );

  return useMemo(() => {
    const trimmed = query.trim();
    if (!trimmed) {
      if (!sortByField) return items;
      return [...items].sort((a, b) =>
        String(a[sortByField]).localeCompare(String(b[sortByField]))
      );
    }
    return fuse.search(trimmed, { limit: 50 }).map(r => r.item);
  }, [fuse, query, items, sortByField]);
}
