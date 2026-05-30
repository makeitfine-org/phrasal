import React from 'react';
import { ChevronLeft, ChevronRight, RotateCcw } from './Icons';
import type { Status } from '../types';

interface NavigationControlsProps {
  currentIndex: number;
  historyLength: number;
  remainingCount: number;
  status: Status;
  onPrev: () => void;
  onNext: () => void;
  onReset: () => void;
}

export default function NavigationControls({
  currentIndex,
  historyLength,
  remainingCount,
  status,
  onPrev,
  onNext,
  onReset,
}: NavigationControlsProps) {
  const atStart = currentIndex === 0;
  const atEnd = currentIndex === historyLength - 1 && remainingCount === 0;

  return (
    <div className="bg-gray-100 dark:bg-gray-950 p-4 border-t border-gray-200 dark:border-gray-800 flex justify-between items-center">
      <div className="flex space-x-2">
        <button
          onClick={onPrev}
          disabled={atStart}
          className={`p-2 rounded-lg flex items-center justify-center transition-colors border border-gray-200 dark:border-gray-700 ${
            atStart
              ? 'text-gray-400 dark:text-gray-600 cursor-not-allowed'
              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800'
          }`}
          title="Previous Question"
        >
          <ChevronLeft />
        </button>
        <button
          onClick={onNext}
          disabled={atEnd}
          className={`p-2 rounded-lg flex items-center justify-center transition-colors border border-gray-200 dark:border-gray-700 ${
            atEnd
              ? 'text-gray-400 dark:text-gray-600 cursor-not-allowed'
              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800'
          }`}
          title="Next / History Forward"
        >
          <ChevronRight />
        </button>
      </div>

      <div className="flex space-x-3">
        <button
          onClick={onReset}
          disabled={status === 'idle'}
          className={`flex items-center space-x-1 px-4 py-2 rounded-lg font-medium transition-colors border ${
            status === 'idle'
              ? 'opacity-50 cursor-not-allowed text-gray-500 border-gray-200 dark:border-gray-700'
              : 'bg-gray-200 dark:bg-gray-800 text-amber-500 hover:bg-gray-300 dark:hover:bg-gray-700 border-gray-300 dark:border-gray-700'
          }`}
        >
          <RotateCcw />
          <span>Reset</span>
        </button>
      </div>
    </div>
  );
}
