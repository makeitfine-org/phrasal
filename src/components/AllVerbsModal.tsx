import React, { useState, useEffect } from 'react';
import { XIcon } from './Icons';
import type { BrowseVerbEntry } from '../types';

interface AllVerbsModalProps {
  verbs: BrowseVerbEntry[];
  excluded: Set<number>;
  onClose: () => void;
}

export default function AllVerbsModal({ verbs, excluded, onClose }: AllVerbsModalProps) {
  const [query, setQuery] = useState('');
  const [showExcluded, setShowExcluded] = useState(false);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  const filtered = verbs
    .filter(v => {
      if (!showExcluded && v.quizIndex !== undefined && excluded.has(v.quizIndex)) return false;
      if (!query.trim()) return true;
      const q = query.toLowerCase();
      return v.verb.toLowerCase().includes(q) || v.definition.toLowerCase().includes(q);
    })
    .sort((a, b) => a.verb.localeCompare(b.verb));

  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-lg w-full max-h-[80vh] flex flex-col border border-gray-200 dark:border-gray-800"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex flex-col gap-2 p-4 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white flex-1">
              All Verbs ({verbs.length})
            </h2>
            <button
              onClick={onClose}
              className="p-2 rounded-full text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors border border-gray-200 dark:border-gray-700"
              aria-label="Close"
            >
              <XIcon />
            </button>
          </div>
          <input
            type="text"
            placeholder="Search verbs..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:border-blue-500 dark:focus:border-blue-500"
            autoFocus
          />
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

        <div className="overflow-y-auto flex-1 p-4">
          {filtered.length === 0 ? (
            <p className="text-center text-gray-400 dark:text-gray-500 py-10 text-sm">
              No matches found
            </p>
          ) : (
            <ul className="space-y-3">
              {filtered.map((v, idx) => (
                <li key={`${idx}-${v.verb}`} className="p-3 rounded-xl bg-gray-50 dark:bg-gray-800">
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-gray-900 dark:text-white">{v.verb}</p>
                    {v.quizIndex !== undefined && excluded.has(v.quizIndex) && (
                      <span className="text-xs px-1.5 py-0.5 rounded bg-orange-100 dark:bg-orange-900/40 text-orange-600 dark:text-orange-400 font-medium">
                        excluded
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">{v.definition}</p>
                  {v.sentences.length > 0 && (
                    <ul className="mt-1 space-y-0.5">
                      {v.sentences.map((s, si) => (
                        <li key={si} className="text-sm text-gray-600 dark:text-gray-300 italic">• {s}</li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
