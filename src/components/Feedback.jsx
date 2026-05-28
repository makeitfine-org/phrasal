import React from 'react';

export default function Feedback({ status, correctVerb }) {
  if (status === 'idle') return null;

  return (
    <div
      className={`mt-6 p-5 rounded-xl border fade-in ${
        status === 'correct'
          ? 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800'
          : 'bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800'
      }`}
    >
      {status === 'correct' ? (
        <div>
          <h3 className="text-lg font-bold text-green-800 dark:text-green-300 mb-1">Excellent!</h3>
          <p className="text-green-700 dark:text-green-400">
            You got it right. This verb has been added to your mastered list.
          </p>
        </div>
      ) : (
        <div>
          <h3 className="text-lg font-bold text-red-800 dark:text-red-300 mb-2">Not quite!</h3>
          <p className="text-red-700 dark:text-red-400 mb-2">
            The correct phrasal verb is:{' '}
            <span className="font-bold underline text-xl">{correctVerb}</span>
          </p>
        </div>
      )}
    </div>
  );
}
