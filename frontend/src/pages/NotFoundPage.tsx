import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col items-center justify-center p-6 text-center">
      <span className="text-8xl font-mono font-bold text-red-500 dark:text-red-400">404</span>
      <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-4 mb-2">Page Not Found</h1>
      <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-sm">
        The page you're looking for doesn't exist or has been moved.
      </p>
    </div>
  );
}
