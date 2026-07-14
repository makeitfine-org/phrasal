import React from 'react';
import SkeletonBlock from './SkeletonBlock';

export default function QuizSkeleton() {
  return (
    <div className="max-w-2xl mx-auto pt-10 px-4 pb-20">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <SkeletonBlock className="h-8 w-48 mb-2" />
          <SkeletonBlock className="h-4 w-28" />
        </div>
        <div className="flex space-x-2">
          {[...Array(4)].map((_, i) => (
            <SkeletonBlock key={i} className="w-9 h-9 !rounded-full" />
          ))}
        </div>
      </div>

      {/* Quiz card */}
      <div className="bg-white dark:bg-gray-850 rounded-2xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-800">
        <SkeletonBlock className="h-2 w-full !rounded-none" />

        <div className="p-6 md:p-8">
          {/* Explanation */}
          <div className="mb-6">
            <SkeletonBlock className="h-4 w-28 mb-2" />
            <SkeletonBlock className="h-20 w-full rounded-r-xl" />
          </div>

          {/* Hint */}
          <div className="mb-6">
            <SkeletonBlock className="h-4 w-16 mb-2" />
            <SkeletonBlock className="h-12 w-full rounded-lg" />
          </div>

          {/* Sentence */}
          <div className="mb-8">
            <SkeletonBlock className="h-4 w-24 mb-2" />
            <SkeletonBlock className="h-16 w-full rounded-xl" />
          </div>

          {/* Input */}
          <SkeletonBlock className="h-14 w-full rounded-xl" />
        </div>

        {/* Navigation footer */}
        <div className="bg-gray-100 dark:bg-gray-950 p-4 border-t border-gray-200 dark:border-gray-800 flex justify-between items-center">
          <div className="flex space-x-2">
            <SkeletonBlock className="w-10 h-10 rounded-lg" />
            <SkeletonBlock className="w-10 h-10 rounded-lg" />
          </div>
          <SkeletonBlock className="w-20 h-10 rounded-lg" />
        </div>
      </div>
    </div>
  );
}
