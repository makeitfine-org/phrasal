import React, { useState, useEffect, useRef } from 'react';
import { XIcon } from './Icons';
import { useFocusTrap } from '../hooks/useFocusTrap';
import { fetchListVerbIndex, type ListSearchEntry } from '../data/listVerbIndex';

interface ListSearchModalProps {
  onSelect: (entry: ListSearchEntry) => void;
  onClose: () => void;
  entries?: ListSearchEntry[];
}

export default function ListSearchModal({ onSelect, onClose, entries: entriesProp }: ListSearchModalProps) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [entries, setEntries] = useState<ListSearchEntry[]>(entriesProp ?? []);
  const [loadingEntries, setLoadingEntries] = useState(!entriesProp);
  const listRef = useRef<HTMLUListElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  useFocusTrap(panelRef);

  useEffect(() => {
    if (entriesProp) return;
    let cancelled = false;
    fetchListVerbIndex()
      .then(data => {
        if (!cancelled) {
          setEntries(data);
          setLoadingEntries(false);
        }
      })
      .catch(() => {
        if (!cancelled) setLoadingEntries(false);
      });
    return () => { cancelled = true; };
  }, [entriesProp]);

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

  const q = query.toLowerCase().trim();
  const results: ListSearchEntry[] = entries
    .filter(e =>
      !q ||
      e.verb.toLowerCase().includes(q) ||
      e.definition.toLowerCase().includes(q) ||
      e.example.toLowerCase().includes(q)
    )
    .sort((a, b) => a.verb.localeCompare(b.verb));

  const handleSelect = (entry: ListSearchEntry) => {
    onSelect(entry);
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
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Search"
        className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-lg w-full max-h-[60vh] flex flex-col border border-gray-200 dark:border-gray-800"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 p-4 border-b border-gray-200 dark:border-gray-800">
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
            aria-label="Close"
            className="p-2 rounded-full text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors shrink-0 border border-gray-200 dark:border-gray-700"
          >
            <XIcon />
          </button>
        </div>

        <div className="overflow-y-auto flex-1">
          {loadingEntries ? (
            <p className="text-center text-gray-400 dark:text-gray-500 py-10 text-sm">
              Loading...
            </p>
          ) : results.length === 0 ? (
            <p className="text-center text-gray-400 dark:text-gray-500 py-10 text-sm">
              No matches found
            </p>
          ) : (
            <ul ref={listRef}>
              {results.map((entry, i) => (
                <li
                  key={entry.entryId}
                  onClick={() => handleSelect(entry)}
                  className={`flex flex-col px-4 py-3 cursor-pointer border-b border-gray-100 dark:border-gray-800 last:border-0 transition-colors ${
                    i === selectedIndex
                      ? 'bg-blue-100 dark:bg-blue-900/50'
                      : 'hover:bg-blue-50 dark:hover:bg-blue-900/30'
                  }`}
                >
                  <span className="font-semibold text-gray-900 dark:text-white">{entry.verb}</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">{entry.definition}</span>
                  <span className="text-sm text-gray-400 dark:text-gray-500 mt-0.5 italic">"{entry.example}"</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
