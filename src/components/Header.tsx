import React from 'react';
import { Trash2, EyeOffIcon, SearchIcon } from './Icons';

interface HeaderProps {
  masteredCount: number;
  totalCount: number;
  currentIndex: number;
  onReset: () => void;
  excludedCount: number;
  onShowExcluded: () => void;
  onShowSearch: () => void;
}

export default function Header({ masteredCount, totalCount, currentIndex, onReset, excludedCount, onShowExcluded, onShowSearch }: HeaderProps) {
  return (
    <div className="flex justify-between items-center mb-8">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
          Phrasal Verbs
        </h1>
        <div className="flex items-center gap-4 mt-1">
          <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
            Mastered:{' '}
            <span className="text-green-600 dark:text-green-400 font-bold">{masteredCount}</span>
            {' '}/ {totalCount}
          </p>
          <span className="h-1 w-1 rounded-full bg-gray-300 dark:bg-gray-700" />
          <p className="text-sm font-bold text-indigo-600 dark:text-indigo-400">
            Question № {currentIndex + 1}
          </p>
        </div>
      </div>
      <div className="flex space-x-2">
        <button
          onClick={onShowSearch}
          className="p-2 bg-gray-200 dark:bg-gray-800 rounded-full text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors shadow-sm"
          title="Search phrasal verbs"
        >
          <SearchIcon />
        </button>
        <button
          onClick={onShowExcluded}
          className="p-2 bg-gray-200 dark:bg-gray-800 rounded-full text-orange-600 dark:text-orange-400 hover:bg-orange-100 dark:hover:bg-orange-900/30 transition-colors shadow-sm relative"
          title="View excluded verbs"
        >
          <EyeOffIcon />
          {excludedCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs font-bold w-6 h-4 rounded-full flex items-center justify-center">
              {excludedCount > 99 ? '99+' : excludedCount}
            </span>
          )}
        </button>
        <button
          onClick={onReset}
          className="p-2 bg-gray-200 dark:bg-gray-800 rounded-full text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors shadow-sm"
          title="Global Reset - Clear all progress"
        >
          <Trash2 />
        </button>
      </div>
    </div>
  );
}
