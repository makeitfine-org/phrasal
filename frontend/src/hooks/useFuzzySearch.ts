import { useMemo } from 'react';
import Fuse, { type IFuseOptions } from 'fuse.js';
import { tokenizedSearch } from '../utils/fuzzySearch';

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

  const typedKeys = useMemo(
    () => (keys as Array<{ name: keyof T & string; weight: number }>),
    [keys]
  );

  return useMemo(() => {
    const trimmed = query.trim();
    if (!trimmed) {
      if (!sortByField) return items;
      return [...items].sort((a, b) =>
        String(a[sortByField]).localeCompare(String(b[sortByField]))
      );
    }

    const fuseResults = fuse.search(trimmed, { limit: 50 });
    const fuseItems = fuseResults.map(r => r.item);

    const customResults = tokenizedSearch(items, typedKeys, trimmed);

    const seen = new Set<T>(fuseItems);
    for (const { item } of customResults) {
      if (!seen.has(item)) {
        seen.add(item);
        fuseItems.push(item);
      }
    }

    return fuseItems.slice(0, 50);
  }, [fuse, query, items, sortByField, typedKeys]);
}
