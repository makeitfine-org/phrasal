import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MenuIcon, XIcon, ChevronDown, SunIcon, MoonIcon } from './Icons';

interface NavigationMenuProps {
  darkMode?: boolean;
  onToggleDarkMode?: () => void;
}

interface SubItem {
  label: string;
  to: string;
}

interface NavSection {
  label: string;
  basePath: string;
  items: SubItem[];
}

const NAV_SECTIONS: NavSection[] = [
  {
    label: 'Phrasal Verbs',
    basePath: '/phrasal-verbs',
    items: [
      { label: 'Quiz', to: '/phrasal-verbs/test-most-popular' },
      { label: 'List', to: '/phrasal-verbs/list' },
      { label: 'Particles', to: '/phrasal-verbs/particles' },
    ],
  },
  {
    label: 'Grammar',
    basePath: '/grammar',
    items: [
      { label: 'I wish / If only', to: '/grammar/i-wish-if-only' },
    ],
  },
];

function useClickOutside(ref: React.RefObject<HTMLElement | null>, handler: () => void) {
  useEffect(() => {
    function onMouseDown(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) handler();
    }
    document.addEventListener('mousedown', onMouseDown);
    return () => document.removeEventListener('mousedown', onMouseDown);
  }, [ref, handler]);
}

function DesktopDropdown({ section }: { section: NavSection }) {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isActive = location.pathname.startsWith(section.basePath);

  useClickOutside(ref, () => setOpen(false));

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(o => !o)}
        data-testid={`nav-${section.basePath.replace(/\//g, '-').slice(1)}`}
        aria-expanded={open}
        aria-haspopup="true"
        className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
          isActive
            ? 'bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300'
            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
        }`}
      >
        {section.label}
        <span className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`}>
          <ChevronDown />
        </span>
      </button>

      {open && (
        <div
          data-testid={`dropdown-${section.basePath.replace(/\//g, '-').slice(1)}`}
          className="absolute left-0 top-full mt-1 w-48 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-lg py-1 z-50"
        >
          {section.items.map(item => {
            const itemActive = location.pathname === item.to ||
              (item.to.endsWith('/list') && location.pathname.startsWith(item.to));
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`block px-4 py-2 text-sm transition-colors ${
                  itemActive
                    ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-medium'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

function MobileSection({ section, onNavigate }: { section: NavSection; onNavigate: () => void }) {
  const location = useLocation();
  const [expanded, setExpanded] = useState(false);
  const isActive = location.pathname.startsWith(section.basePath);

  return (
    <div>
      <button
        onClick={() => setExpanded(e => !e)}
        aria-expanded={expanded}
        className={`flex items-center justify-between w-full px-4 py-3 text-sm font-medium transition-colors ${
          isActive
            ? 'text-blue-700 dark:text-blue-300'
            : 'text-gray-700 dark:text-gray-300'
        }`}
      >
        {section.label}
        <span className={`transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`}>
          <ChevronDown />
        </span>
      </button>

      {expanded && (
        <div className="pl-4 pb-1">
          {section.items.map(item => {
            const itemActive = location.pathname === item.to ||
              (item.to.endsWith('/list') && location.pathname.startsWith(item.to));
            return (
              <Link
                key={item.to}
                to={item.to}
                onClick={onNavigate}
                className={`block px-4 py-2 text-sm rounded-lg transition-colors ${
                  itemActive
                    ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-medium'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function NavigationMenu({ darkMode, onToggleDarkMode }: NavigationMenuProps = {}) {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const mobileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <nav data-testid="nav-menu" aria-label="Main navigation" className="sticky top-0 z-40 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-5xl mx-auto px-4 flex items-center h-12">
        <Link
          to="/"
          className="flex items-center gap-2 mr-6 shrink-0"
          title="Home"
        >
          <img src={`${import.meta.env.BASE_URL}favicon.svg`} alt="" className="w-5 h-5" aria-hidden="true" />
          <span className="text-sm font-semibold text-gray-900 dark:text-gray-100 hidden sm:inline">English Tutorial</span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {NAV_SECTIONS.map(section => (
            <DesktopDropdown key={section.basePath} section={section} />
          ))}
        </div>

        <div className="flex-1" />

        <div className="flex items-center gap-2">
          <div id="verb-page-actions" />
          {onToggleDarkMode && (
            <button
              onClick={onToggleDarkMode}
              className="p-2 bg-gray-200 dark:bg-gray-800 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors shadow-sm border border-gray-300 dark:border-gray-700"
              title="Toggle Dark/Light Mode"
              aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {darkMode ? <MoonIcon /> : <SunIcon />}
            </button>
          )}
        </div>

        <button
          data-testid="nav-hamburger"
          onClick={() => setMobileOpen(o => !o)}
          className="md:hidden p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <XIcon /> : <MenuIcon />}
        </button>
      </div>

      {mobileOpen && (
        <div
          ref={mobileRef}
          data-testid="nav-mobile-menu"
          className="md:hidden border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 pb-2"
        >
          {NAV_SECTIONS.map(section => (
            <MobileSection
              key={section.basePath}
              section={section}
              onNavigate={() => setMobileOpen(false)}
            />
          ))}
        </div>
      )}
    </nav>
  );
}
