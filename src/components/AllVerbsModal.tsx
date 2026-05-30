import React, { useEffect } from 'react';
import { XIcon } from './Icons';
import type { VerbEntry } from '../types';

interface AllVerbsModalProps {
  verbs: VerbEntry[];
  onClose: () => void;
}

export default function AllVerbsModal({ verbs, onClose }: AllVerbsModalProps) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

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

        <div className="overflow-y-auto flex-1 p-4">
          <ul className="space-y-3">
            {verbs.map((v, idx) => (
              <li key={idx} className="p-3 rounded-xl bg-gray-50 dark:bg-gray-800">
                <p className="font-semibold text-gray-900 dark:text-white">{v.verb}</p>
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
        </div>
      </div>
    </div>
  );
}
