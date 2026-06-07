import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SearchIcon } from '../components/Icons';
import ListSearchModal from '../components/ListSearchModal';
import type { ListSearchEntry } from '../data/listVerbIndex';

const PARTICLE_NAMES = [
  'off', 'on', 'up', 'down', 'in', 'into', 'out', 'away', 'cross / across',
  'forward', 'back', 'for', 'by', 'together', 'with', 'without', 'apart',
  'over', 'ahead', 'after', 'behind', 'through', 'about', 'around / round',
  'to', 'against', 'along',
];

const GET_PARTICLES = [
  'off', 'on', 'up', 'down', 'in', 'into', 'out', 'away', 'across',
  'forward', 'back', 'by', 'together', 'with', 'over', 'ahead', 'after',
  'behind', 'through', 'about / around', 'to',
];

const MAKE_PARTICLES = [
  'after', 'away (with)', 'for', 'into', 'off (with)', 'out', 'over', 'up', 'up for', 'with',
];

const PUT_PARTICLES = [
  'off', 'on', 'up', 'down', 'in', 'into', 'out', 'away', 'across / over',
  'forward', 'back', 'by', 'together', 'with', 'ahead', 'behind', 'through',
  'about / around / round', 'to',
];

const GIVE_PARTICLES = [
  'away', 'back', 'in', 'in to', 'off', 'on / onto', 'out', 'over', 'up', '(it) up for', 'with',
];

const GO_PARTICLES = [
  'off', 'on', 'up', 'down', 'in', 'into', 'out', 'away', 'across',
  'forward', 'back', 'for', 'by', 'together', 'with', 'without',
  'over', 'ahead', 'after', 'behind', 'through', 'about', 'around / round',
  'to', 'against',
];

const COME_PARTICLES = [
  'about', 'across', 'after', 'against', 'ahead', 'apart', 'around / round',
  'away', 'back', 'behind', 'by', 'down', 'for', 'forward', 'in', 'into',
  'off', 'on', 'out', 'over', 'through', 'to', 'together', 'up', 'with', 'without',
];

const TAKE_PARTICLES = [
  'off', 'on', 'up', 'down', 'in', 'into', 'out', 'away', 'cross / across',
  'forward', 'back', 'for', 'by', 'together', 'with', 'without', 'apart',
  'over', 'ahead', 'after', 'behind', 'through', 'about', 'around / round',
  'to', 'against',
];

export default function PhrasalVerbsListPage() {
  const navigate = useNavigate();
  const [showSearch, setShowSearch] = useState(false);
  const [copied, setCopied] = useState(false);
  const [makeCopied, setMakeCopied] = useState(false);
  const [putCopied, setPutCopied] = useState(false);
  const [takeCopied, setTakeCopied] = useState(false);
  const [giveCopied, setGiveCopied] = useState(false);
  const [goCopied, setGoCopied] = useState(false);
  const [comeCopied, setComeCopied] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const text = GET_PARTICLES.map(p => `get ${p}`).join(', ');
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };

  const handleMakeCopy = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const text = MAKE_PARTICLES.map(p => `make ${p}`).join(', ');
    navigator.clipboard.writeText(text).then(() => {
      setMakeCopied(true);
      setTimeout(() => setMakeCopied(false), 1500);
    });
  };

  const particlesText = GET_PARTICLES.join(', ');
  const makeParticlesText = MAKE_PARTICLES.join(', ');

  const handlePutCopy = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const text = PUT_PARTICLES.map(p => `put ${p}`).join(', ');
    navigator.clipboard.writeText(text).then(() => {
      setPutCopied(true);
      setTimeout(() => setPutCopied(false), 1500);
    });
  };

  const putParticlesText = PUT_PARTICLES.join(', ');

  const handleTakeCopy = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const text = TAKE_PARTICLES.map(p => `take ${p}`).join(', ');
    navigator.clipboard.writeText(text).then(() => {
      setTakeCopied(true);
      setTimeout(() => setTakeCopied(false), 1500);
    });
  };

  const takeParticlesText = TAKE_PARTICLES.join(', ');

  const handleGiveCopy = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const text = GIVE_PARTICLES.map(p => `give ${p}`).join(', ');
    navigator.clipboard.writeText(text).then(() => {
      setGiveCopied(true);
      setTimeout(() => setGiveCopied(false), 1500);
    });
  };

  const giveParticlesText = GIVE_PARTICLES.join(', ');

  const handleGoCopy = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const text = GO_PARTICLES.map(p => `go ${p}`).join(', ');
    navigator.clipboard.writeText(text).then(() => {
      setGoCopied(true);
      setTimeout(() => setGoCopied(false), 1500);
    });
  };

  const goParticlesText = GO_PARTICLES.join(', ');

  const handleComeCopy = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const text = COME_PARTICLES.map(p => `come ${p}`).join(', ');
    navigator.clipboard.writeText(text).then(() => {
      setComeCopied(true);
      setTimeout(() => setComeCopied(false), 1500);
    });
  };

  const comeParticlesText = COME_PARTICLES.join(', ');
  const particleNamesText = PARTICLE_NAMES.join(', ');

  const handleSearchSelect = (entry: ListSearchEntry) => {
    localStorage.setItem(entry.storageKey, 'true');
    navigate(entry.route, { state: { scrollTo: entry.sectionId } });
  };

  return (
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
        <Link
          to="/phrasal-verbs/particles"
          className="block rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-md hover:shadow-lg transition-shadow p-6"
        >
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-1">
            Particles
          </h2>
          <p
            className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2"
            title={particleNamesText}
          >
            {particleNamesText}
          </p>
        </Link>
        <hr className="border-gray-600 dark:border-gray-500" />
        <Link
          to="/phrasal-verbs/list/get"
          className="relative block rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-md hover:shadow-lg transition-shadow p-6 pr-12"
        >
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-1">
            Get
          </h2>
          <p
            className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2"
            title={particlesText}
          >
            {particlesText}
          </p>
          <button
            onClick={handleCopy}
            className="absolute top-4 right-4 p-1.5 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            title={copied ? 'Copied!' : 'Copy all "get" phrasal verbs'}
          >
            {copied ? (
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
        </Link>
        <Link
          to="/phrasal-verbs/list/make"
          className="relative block rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-md hover:shadow-lg transition-shadow p-6 pr-12"
        >
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-1">
            Make
          </h2>
          <p
            className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2"
            title={makeParticlesText}
          >
            {makeParticlesText}
          </p>
          <button
            onClick={handleMakeCopy}
            className="absolute top-4 right-4 p-1.5 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            title={makeCopied ? 'Copied!' : 'Copy all "make" phrasal verbs'}
          >
            {makeCopied ? (
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
        </Link>
        <Link
          to="/phrasal-verbs/list/put"
          className="relative block rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-md hover:shadow-lg transition-shadow p-6 pr-12"
        >
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-1">
            Put
          </h2>
          <p
            className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2"
            title={putParticlesText}
          >
            {putParticlesText}
          </p>
          <button
            onClick={handlePutCopy}
            className="absolute top-4 right-4 p-1.5 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            title={putCopied ? 'Copied!' : 'Copy all "put" phrasal verbs'}
          >
            {putCopied ? (
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
        </Link>
        <Link
          to="/phrasal-verbs/list/take"
          className="relative block rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-md hover:shadow-lg transition-shadow p-6 pr-12"
        >
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-1">
            Take
          </h2>
          <p
            className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2"
            title={takeParticlesText}
          >
            {takeParticlesText}
          </p>
          <button
            onClick={handleTakeCopy}
            className="absolute top-4 right-4 p-1.5 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            title={takeCopied ? 'Copied!' : 'Copy all "take" phrasal verbs'}
          >
            {takeCopied ? (
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
        </Link>
        <Link
          to="/phrasal-verbs/list/give"
          className="relative block rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-md hover:shadow-lg transition-shadow p-6 pr-12"
        >
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-1">
            Give
          </h2>
          <p
            className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2"
            title={giveParticlesText}
          >
            {giveParticlesText}
          </p>
          <button
            onClick={handleGiveCopy}
            className="absolute top-4 right-4 p-1.5 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            title={giveCopied ? 'Copied!' : 'Copy all "give" phrasal verbs'}
          >
            {giveCopied ? (
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
        </Link>
        <Link
          to="/phrasal-verbs/list/go"
          className="relative block rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-md hover:shadow-lg transition-shadow p-6 pr-12"
        >
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-1">
            Go
          </h2>
          <p
            className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2"
            title={goParticlesText}
          >
            {goParticlesText}
          </p>
          <button
            onClick={handleGoCopy}
            className="absolute top-4 right-4 p-1.5 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            title={goCopied ? 'Copied!' : 'Copy all "go" phrasal verbs'}
          >
            {goCopied ? (
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
        </Link>
        <Link
          to="/phrasal-verbs/list/come"
          className="relative block rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-md hover:shadow-lg transition-shadow p-6 pr-12"
        >
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-1">
            Come
          </h2>
          <p
            className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2"
            title={comeParticlesText}
          >
            {comeParticlesText}
          </p>
          <button
            onClick={handleComeCopy}
            className="absolute top-4 right-4 p-1.5 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            title={comeCopied ? 'Copied!' : 'Copy all "come" phrasal verbs'}
          >
            {comeCopied ? (
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
        </Link>
      </div>
      {showSearch && (
        <ListSearchModal
          onSelect={handleSearchSelect}
          onClose={() => setShowSearch(false)}
        />
      )}
    </div>
  );
}
