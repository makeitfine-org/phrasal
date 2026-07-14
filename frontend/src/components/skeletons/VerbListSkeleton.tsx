import React from 'react';
import SkeletonBlock from './SkeletonBlock';

export default function VerbListSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col items-center justify-center p-6">
      {/* Title + subtitle */}
      <div className="flex justify-center mb-2">
        <SkeletonBlock className="h-10 w-56" />
      </div>
      <div className="flex justify-center mb-4">
        <SkeletonBlock className="h-6 w-72" />
      </div>

      {/* Search button */}
      <div className="w-full max-w-sm mb-6 flex justify-end">
        <SkeletonBlock className="w-9 h-9 !rounded-full" />
      </div>

      {/* Cards */}
      <div className="flex flex-col gap-4 w-full max-w-sm">
        {/* Particles card */}
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-md p-6">
          <div className="flex items-center justify-between">
            <SkeletonBlock className="h-6 w-24" />
            <SkeletonBlock className="w-5 h-5" />
          </div>
        </div>

        <hr className="border-gray-600 dark:border-gray-500" />

        {/* Verb cards */}
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-md p-6"
          >
            <div className="flex items-center justify-between">
              <SkeletonBlock className="h-6 w-20" />
              <SkeletonBlock className="w-5 h-5" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
