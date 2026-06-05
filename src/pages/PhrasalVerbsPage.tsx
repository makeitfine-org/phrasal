import React from 'react';
import { Link } from 'react-router-dom';

export default function PhrasalVerbsPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2">
        Phrasal Verbs
      </h1>
      <p className="text-gray-500 dark:text-gray-400 mb-10 text-lg">
        Choose a topic to practice
      </p>

      <div className="flex flex-col gap-4 w-full max-w-sm">
        <Link
          to="/phrasal-verbs/test-most-popular"
          className="block rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-md hover:shadow-lg transition-shadow p-6"
        >
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-1">
            Test most popular
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Practice English phrasal verbs with fill-in-the-blank exercises
          </p>
        </Link>
      </div>
    </div>
  );
}
