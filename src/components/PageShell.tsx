import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { SunIcon, MoonIcon } from './Icons';

const STORAGE_KEY = 'phrasalQuizState';

export default function PageShell({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const isHome = location.pathname === '/';

  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    return saved.darkMode ?? false;
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...saved, darkMode }));
  }, [darkMode]);

  return (
    <>
      <div className="fixed top-3 right-3 flex items-center gap-2 z-50">
        {!isHome && (
          <Link
            to="/"
            className="px-3 py-1.5 text-sm font-medium rounded-full bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors shadow-sm border border-gray-300 dark:border-gray-700"
          >
            Home
          </Link>
        )}
        <button
          onClick={() => setDarkMode(d => !d)}
          className="p-2 bg-gray-200 dark:bg-gray-800 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors shadow-sm border border-gray-300 dark:border-gray-700"
          title="Toggle Dark/Light Mode"
        >
          {darkMode ? <SunIcon /> : <MoonIcon />}
        </button>
      </div>
      {children}
    </>
  );
}
