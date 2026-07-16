import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { SunIcon, MoonIcon } from './Icons';
import NavigationMenu from './NavigationMenu';

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
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-white focus:dark:bg-gray-900 focus:text-blue-600 focus:dark:text-blue-400 focus:rounded-lg focus:shadow-lg focus:border focus:border-gray-300 focus:dark:border-gray-700 focus:font-semibold focus:outline-none"
      >
        Skip to content
      </a>
      <NavigationMenu darkMode={darkMode} onToggleDarkMode={() => setDarkMode(d => !d)} />
      {isHome && (
        <div className="fixed top-3 right-3 flex items-center gap-2 z-50">
          <div id="verb-page-actions" />
          <button
            onClick={() => setDarkMode(d => !d)}
            className="p-2 bg-gray-200 dark:bg-gray-800 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors shadow-sm border border-gray-300 dark:border-gray-700"
            title="Toggle Dark/Light Mode"
            aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {darkMode ? <MoonIcon /> : <SunIcon />}
          </button>
        </div>
      )}
      <main id="main-content">
        {children}
      </main>
    </>
  );
}
