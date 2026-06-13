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
            className="p-1.5 rounded-full bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors shadow-sm border border-gray-300 dark:border-gray-700 flex items-center justify-center"
            title="Move to Home page"
          >
            <img src={`${import.meta.env.BASE_URL}favicon.svg`} alt="Home" className="w-5 h-5" />
          </Link>
        )}
        <div id="verb-page-actions" />
        <button
          onClick={() => setDarkMode(d => !d)}
          className="p-2 bg-gray-200 dark:bg-gray-800 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors shadow-sm border border-gray-300 dark:border-gray-700"
          title="Toggle Dark/Light Mode"
        >
            {darkMode ? <MoonIcon/> : <SunIcon/>}
        </button>
      </div>
      {children}
    </>
  );
}
