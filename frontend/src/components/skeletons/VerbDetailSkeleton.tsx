import React from 'react';
import SkeletonBlock from './SkeletonBlock';

export default function VerbDetailSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 px-4 py-10">
      <div className="max-w-[700px] mx-auto">
        {/* Title */}
        <div className="flex justify-center mb-6">
          <SkeletonBlock className="h-10 w-40" />
        </div>

        {/* Sections */}
        {[...Array(3)].map((_, si) => (
          <div key={si}>
            {si > 0 && <hr className="border-gray-600 dark:border-gray-500 my-2" />}
            <div className="mb-5">
              <div className="flex items-center gap-2 mb-4 px-1">
                <SkeletonBlock className="w-4 h-4" />
                <SkeletonBlock className="h-7 w-24" />
              </div>
              {si === 0 && (
                <div className="flex flex-col gap-6">
                  {[...Array(2)].map((_, mi) => (
                    <div
                      key={mi}
                      className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-600 dark:border-gray-400 shadow-md p-4"
                    >
                      <div className="flex items-start gap-2">
                        <SkeletonBlock className="w-6 h-6 !rounded-full flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <SkeletonBlock className="h-5 w-3/4 mb-1.5" />
                          <SkeletonBlock className="h-4 w-1/2" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
