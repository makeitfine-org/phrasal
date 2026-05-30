import React, { useState, useEffect } from 'react';
import { XIcon } from './Icons';
import type { VerbEntry } from '../types';

interface ExcludedModalProps {
  excluded: Set<number>;
  allVerbs: VerbEntry[];
  onInclude: (verbIndex: number) => void;
  onClose: () => void;
  itemLabel?: string;
}

export default function ExcludedModal({ excluded, allVerbs, onInclude, onClose, itemLabel = 'Verbs' }: ExcludedModalProps) {
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  const sortedIndices = [...excluded].sort((a, b) => a - b);

  const filteredIndices = searchQuery.trim()
    ? sortedIndices.filter(idx => {
        const v = allVerbs[idx];
        const q = searchQuery.toLowerCase();
        return v.verb.toLowerCase().includes(q) || v.definition.toLowerCase().includes(q);
      })
    : sortedIndices;

  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-lg w-full max-h-[80vh] flex flex-col border border-gray-200 dark:border-gray-800"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-5 border-b border-gray-200 dark:border-gray-800">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">
            Excluded {itemLabel} ({excluded.size})
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors border border-gray-200 dark:border-gray-700"
          >
            <XIcon />
          </button>
        </div>

        {excluded.size > 0 && (
          <div className="px-4 pt-3 pb-2">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:border-blue-500 dark:focus:border-blue-500"
              autoFocus
            />
          </div>
        )}

        <div className="overflow-y-auto flex-1 p-4 pt-2">
          {excluded.size === 0 ? (
            <p className="text-center text-gray-500 dark:text-gray-400 py-8">
              No {itemLabel.toLowerCase()} are currently excluded.
            </p>
          ) : filteredIndices.length === 0 ? (
            <p className="text-center text-gray-500 dark:text-gray-400 py-8">
              No matches found.
            </p>
          ) : (
            <ul className="space-y-2">
              {filteredIndices.map(idx => {
                const v = allVerbs[idx];
                return (
                  <li
                    key={idx}
                    className="flex justify-between items-start gap-4 p-3 rounded-xl bg-gray-50 dark:bg-gray-800"
                  >
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">{v.verb}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">{v.definition}</p>
                    </div>
                    <button
                      onClick={() => onInclude(idx)}
                      className="shrink-0 text-xs font-semibold px-3 py-1 rounded-full bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300 border border-green-300 dark:border-green-700 hover:bg-green-200 transition-colors"
                    >
                      Include
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
