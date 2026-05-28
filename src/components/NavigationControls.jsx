import React from 'react';
import { ChevronLeft, ChevronRight, RotateCcw, SkipForward } from './Icons.jsx';

export default function NavigationControls({
  currentIndex,
  historyLength,
  remainingCount,
  status,
  onPrev,
  onNext,
  onReset,
  onSkip,
}) {
  const atStart = currentIndex === 0;
  const atEnd = currentIndex === historyLength - 1 && remainingCount === 0;
  const skipDisabled = remainingCount === 0;

  return (
    <div className="bg-gray-100 dark:bg-gray-950 p-4 border-t border-gray-200 dark:border-gray-800 flex justify-between items-center">
      <div className="flex space-x-2">
        <button
          onClick={onPrev}
          disabled={atStart}
          className={`p-2 rounded-lg flex items-center justify-center transition-colors ${
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
          className={`p-2 rounded-lg flex items-center justify-center transition-colors ${
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
          className={`flex items-center space-x-1 px-4 py-2 rounded-lg font-medium transition-colors ${
            status === 'idle'
              ? 'opacity-50 cursor-not-allowed text-gray-500'
              : 'bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-700'
          }`}
        >
          <RotateCcw />
          <span>Reset</span>
        </button>

        <button
          onClick={onSkip}
          disabled={skipDisabled}
          className={`flex items-center space-x-1 px-4 py-2 rounded-lg font-medium transition-colors ${
            skipDisabled
              ? 'opacity-50 cursor-not-allowed text-gray-500'
              : 'bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-800/60'
          }`}
        >
          <span>Next</span>
          <SkipForward />
        </button>
      </div>
    </div>
  );
}
