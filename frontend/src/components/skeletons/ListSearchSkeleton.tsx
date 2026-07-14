import React from 'react';
import SkeletonBlock from './SkeletonBlock';

export default function ListSearchSkeleton() {
  return (
    <div className="py-2">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="px-4 py-3 border-b border-gray-100 dark:border-gray-800 last:border-0">
          <SkeletonBlock className="h-5 w-32 mb-1.5" />
          <SkeletonBlock className="h-4 w-3/4 mb-1" />
          <SkeletonBlock className="h-4 w-1/2" />
        </div>
      ))}
    </div>
  );
}
