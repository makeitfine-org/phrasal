import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Link, useNavigate } from 'react-router-dom';
import { SearchIcon, ExpandAllIcon, CollapseAllIcon } from '../components/Icons';
import ListSearchModal from '../components/ListSearchModal';
import type { ListSearchEntry } from '../data/listVerbIndex';
import { useVerbList } from '../hooks/useVerbList';

const PARTICLE_NAMES = [
  'off', 'on', 'up', 'down', 'in', 'into', 'out', 'away', 'cross / across',
  'forward', 'back', 'for', 'by', 'together', 'with', 'without', 'apart',
  'over', 'ahead', 'after', 'behind', 'through', 'about', 'around / round',
  'to', 'against', 'along',
];

const EXPANDED_KEY = 'verbListExpanded';

function loadExpanded(): Set<string> {
  try {
    const saved = localStorage.getItem(EXPANDED_KEY);
    return saved ? new Set(JSON.parse(saved) as string[]) : new Set();
  } catch {
    return new Set();
  }
}

export default function PhrasalVerbsListPage() {
  const navigate = useNavigate();
  const { verbs, loading, error } = useVerbList();
  const [showSearch, setShowSearch] = useState(false);
  const [expanded, setExpanded] = useState<Set<string>>(loadExpanded);
  const [copiedVerb, setCopiedVerb] = useState<string | null>(null);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center">
        <p className="text-gray-500 dark:text-gray-400 text-lg">Loading verb list...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );
  }

  const verbCards = verbs.map(v => ({
    key: v.verb,
    label: v.label,
    to: `/phrasal-verbs/list/${v.verb}`,
    particles: v.particles,
  }));

  const allKeys = ['particles', ...verbCards.map(v => v.key)];
  const allExpanded = allKeys.every(k => expanded.has(k));

  const toggleAll = () => {
    if (allExpanded) {
      setExpanded(new Set());
      localStorage.setItem(EXPANDED_KEY, JSON.stringify([]));
    } else {
      setExpanded(new Set(allKeys));
      localStorage.setItem(EXPANDED_KEY, JSON.stringify(allKeys));
    }
  };

  const toggleExpanded = (key: string) => {
    setExpanded(prev => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      localStorage.setItem(EXPANDED_KEY, JSON.stringify([...next]));
      return next;
    });
  };

  const handleCopy = (e: React.MouseEvent, label: string, particles: string[]) => {
    e.preventDefault();
    e.stopPropagation();
    const text = particles.map(p => `${label.toLowerCase()} ${p}`).join(', ');
    navigator.clipboard.writeText(text).then(() => {
      setCopiedVerb(label);
      setTimeout(() => setCopiedVerb(null), 1500);
    });
  };

  const particleNamesText = PARTICLE_NAMES.join(', ');

  const handleSearchSelect = (entry: ListSearchEntry) => {
    localStorage.setItem(entry.storageKey, 'true');
    navigate(entry.route, { state: { scrollTo: entry.sectionId } });
  };

  const portalTarget = document.getElementById('verb-page-actions');

  return (
    <>
      {portalTarget && ReactDOM.createPortal(
        <button
          onClick={toggleAll}
          title={allExpanded ? 'Collapse all' : 'Expand all'}
          className="p-1.5 rounded-full bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors shadow-sm border border-gray-300 dark:border-gray-700 flex items-center justify-center text-gray-700 dark:text-gray-300"
        >
          {allExpanded ? <ExpandAllIcon /> : <CollapseAllIcon />}
        </button>,
        portalTarget
      )}
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2">
        Phrasal Verbs List
      </h1>
      <p className="text-gray-500 dark:text-gray-400 mb-4 text-lg">
        Browse definitions and examples by verb
      </p>
      <div className="w-full max-w-sm mb-6 flex justify-end">
        <button
          onClick={() => setShowSearch(true)}
          className="p-2 bg-gray-200 dark:bg-gray-800 rounded-full text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors shadow-sm border border-gray-300 dark:border-gray-700"
          title="Search phrasal verbs"
          aria-label="Search phrasal verbs"
        >
          <SearchIcon />
        </button>
      </div>

      <div className="flex flex-col gap-4 w-full max-w-sm">
        <div
          data-testid="verb-card-particles"
          onClick={() => navigate('/phrasal-verbs/particles')}
          className="cursor-pointer rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-md hover:shadow-lg transition-shadow p-6"
        >
          <div className="flex items-center justify-between">
            <Link
              to="/phrasal-verbs/particles"
              onClick={e => e.stopPropagation()}
              className="text-xl font-semibold text-gray-900 dark:text-gray-100"
            >
              <h2>Particles</h2>
            </Link>
            <button
              data-testid="toggle-card-particles"
              onClick={e => { e.stopPropagation(); toggleExpanded('particles'); }}
              className="flex items-center p-0.5 rounded text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
              aria-label={expanded.has('particles') ? 'Collapse Particles' : 'Expand Particles'}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`w-5 h-5 transition-transform duration-200 ${expanded.has('particles') ? 'rotate-180' : ''}`}
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
          {expanded.has('particles') && (
            <p
              className="text-sm text-gray-500 dark:text-gray-400 mt-2"
              title={particleNamesText}
            >
              {particleNamesText}
            </p>
          )}
        </div>
        <hr className="border-gray-600 dark:border-gray-500" />
        {verbCards.map(({ key, label, to, particles }) => {
          const isExpanded = expanded.has(key);
          const isCopied = copiedVerb === label;
          return (
            <div
              key={key}
              data-testid={`verb-card-${key}`}
              onClick={() => navigate(to)}
              className="cursor-pointer rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-md hover:shadow-lg transition-shadow p-6"
            >
              <div className="flex items-center justify-between">
                <Link
                  to={to}
                  onClick={e => e.stopPropagation()}
                  className="text-xl font-semibold text-gray-900 dark:text-gray-100"
                >
                  <h2>{label}</h2>
                </Link>
                <div className="flex items-center gap-1">
                  {isExpanded && (
                    <button
                      onClick={e => handleCopy(e, label, particles)}
                      className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                      title={isCopied ? 'Copied!' : `Copy all "${label.toLowerCase()}" phrasal verbs`}
                    >
                      {isCopied ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                          <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                        </svg>
                      )}
                    </button>
                  )}
                  <button
                    data-testid={`toggle-card-${key}`}
                    onClick={e => { e.stopPropagation(); toggleExpanded(key); }}
                    className="flex items-center p-0.5 rounded text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                    aria-label={isExpanded ? `Collapse ${label}` : `Expand ${label}`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={`w-5 h-5 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
              {isExpanded && (
                <p
                  className="text-sm text-gray-500 dark:text-gray-400 mt-2"
                  title={particles.join(', ')}
                >
                  {particles.join(', ')}
                </p>
              )}
            </div>
          );
        })}
      </div>
      {showSearch && (
        <ListSearchModal
          onSelect={handleSearchSelect}
          onClose={() => setShowSearch(false)}
        />
      )}
    </div>
    </>
  );
}
