import React, { useState, useEffect, useRef } from 'react';
import { XIcon } from './Icons';
import type { VerbEntry } from '../types';

interface SearchModalProps {
  allVerbs: VerbEntry[];
  excluded: Set<number>;
  onSelect: (verbIndex: number) => void;
  onUnexclude: (verbIndex: number) => void;
  onClose: () => void;
}

type SearchResult = VerbEntry & { index: number; isExcluded: boolean };

export default function SearchModal({ allVerbs, excluded, onSelect, onUnexclude, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [showExcluded, setShowExcluded] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  useEffect(() => { setSelectedIndex(-1); }, [query]);

  useEffect(() => {
    if (selectedIndex >= 0 && listRef.current) {
      const item = listRef.current.children[selectedIndex] as HTMLElement | undefined;
      if (item) item.scrollIntoView({ block: 'nearest' });
    }
  }, [selectedIndex]);

  const results: SearchResult[] = allVerbs
    .map((v, i) => ({ ...v, index: i, isExcluded: excluded.has(i) }))
    .filter(v => showExcluded ? true : !v.isExcluded)
    .filter(v =>
      !query.trim() ||
      v.verb.toLowerCase().includes(query.toLowerCase()) ||
      v.definition.toLowerCase().includes(query.toLowerCase())
    );

  const handleSelect = (v: SearchResult) => {
    if (v.isExcluded) {
      onUnexclude(v.index);
    } else {
      onSelect(v.index);
    }
    onClose();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(i => Math.min(i + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(i => Math.max(i - 1, 0));
    } else if (e.key === 'Enter' && selectedIndex >= 0) {
      e.preventDefault();
      handleSelect(results[selectedIndex]);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center p-4 pt-20"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-lg w-full max-h-[60vh] flex flex-col border border-gray-200 dark:border-gray-800"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex flex-col gap-2 p-4 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-3">
            <input
              type="text"
              placeholder="Search phrasal verbs..."
              value={query}
              onChange={e => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:border-blue-500 dark:focus:border-blue-500"
              autoFocus
            />
            <button
              onClick={onClose}
              className="p-2 rounded-full text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors shrink-0"
            >
              <XIcon />
            </button>
          </div>
          <label className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 cursor-pointer select-none w-fit">
            <input
              type="checkbox"
              checked={showExcluded}
              onChange={e => setShowExcluded(e.target.checked)}
              className="accent-orange-500 w-4 h-4"
            />
            Excluded
          </label>
        </div>

        <div className="overflow-y-auto flex-1">
          {results.length === 0 ? (
            <p className="text-center text-gray-400 dark:text-gray-500 py-10 text-sm">
              No matches found
            </p>
          ) : (
            <ul ref={listRef}>
              {results.map((v, i) => (
                <li
                  key={v.index}
                  onClick={() => handleSelect(v)}
                  className={`flex flex-col px-4 py-3 cursor-pointer border-b border-gray-100 dark:border-gray-800 last:border-0 transition-colors ${
                    i === selectedIndex
                      ? 'bg-blue-100 dark:bg-blue-900/50'
                      : 'hover:bg-blue-50 dark:hover:bg-blue-900/30'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-gray-900 dark:text-white">{v.verb}</span>
                    {v.isExcluded && (
                      <span className="text-xs px-1.5 py-0.5 rounded bg-orange-100 dark:bg-orange-900/40 text-orange-600 dark:text-orange-400 font-medium">
                        excluded
                      </span>
                    )}
                  </div>
                  <span className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">{v.definition}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
