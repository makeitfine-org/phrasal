import React, { useState, useEffect } from 'react';
import NavigationMenu from './NavigationMenu';

const STORAGE_KEY = 'phrasalQuizState';

export default function PageShell({ children }: { children: React.ReactNode }) {

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
      <main id="main-content">
        {children}
      </main>
    </>
  );
}
