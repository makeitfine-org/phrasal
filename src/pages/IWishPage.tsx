import React, { useState, useEffect, useRef, useCallback } from 'react';
import { wishData } from '../data/wishData';
import { isAnswerCorrect } from '../utils/normalizeAnswer';
import { renderSentenceWithMask } from '../utils/renderSentence';
import Header from '../components/Header';
import QuizCard from '../components/QuizCard';
import Feedback from '../components/Feedback';
import NavigationControls from '../components/NavigationControls';
import ExcludedModal from '../components/ExcludedModal';
import SearchModal from '../components/SearchModal';
import TutorialModal from '../components/TutorialModal';
import type { HistoryItem, VerbEntry } from '../types';

const STORAGE_KEY = 'grammarIWishState';

interface PersistedState {
  mastered?: number[];
  excluded?: number[];
  history?: HistoryItem[];
  currentIndex?: number;
}

function entryToVerbEntry(index: number): VerbEntry {
  const entry = wishData[index];
  return {
    verb: entry.correctAnswers[0],
    definition: entry.sentence,
    sentences: [],
    wordsToHide: [],
  };
}

const displayEntries: VerbEntry[] = wishData.map(entry => ({
  verb: entry.sentence,
  definition: entry.correctAnswers[0],
  sentences: [],
  wordsToHide: [],
}));

export default function IWishPage() {
  const savedState = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}') as PersistedState;

  const [mastered, setMastered] = useState<Set<number>>(new Set(savedState.mastered ?? []));
  const [excluded, setExcluded] = useState<Set<number>>(new Set(savedState.excluded ?? []));
  const [history, setHistory] = useState<HistoryItem[]>(savedState.history ?? []);
  const [currentIndex, setCurrentIndex] = useState<number>(savedState.currentIndex ?? -1);
  const [revealSentence, setRevealSentence] = useState(false);
  const [showExcludedModal, setShowExcludedModal] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [showTutorialModal, setShowTutorialModal] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);
  const bootstrapDone = useRef(savedState.history != null && savedState.history.length > 0);

  useEffect(() => {
    const existing = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        ...existing,
        mastered: Array.from(mastered),
        excluded: Array.from(excluded),
        history,
        currentIndex,
      })
    );
  }, [mastered, excluded, history, currentIndex]);

  useEffect(() => {
    setRevealSentence(false);
  }, [currentIndex, history]);

  useEffect(() => {
    if (history.length === 0 && !bootstrapDone.current) {
      bootstrapDone.current = true;
      goToNextUnmastered();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [history.length]);

  const goToNextUnmastered = useCallback(() => {
    const usedIndices = new Set(history.map(h => h.index));
    const remaining: number[] = [];
    for (let i = 0; i < wishData.length; i++) {
      if (!usedIndices.has(i) && !excluded.has(i)) remaining.push(i);
    }
    if (remaining.length === 0) {
      alert('Congratulations! You have completed all available sentences in this session!');
      return;
    }
    const nextIdx = remaining[Math.floor(Math.random() * remaining.length)];
    setHistory(prev => [...prev, { index: nextIdx, inputValue: '', status: 'idle' }]);
    setCurrentIndex(prev => prev + 1);
  }, [history, excluded]);

  const handleGlobalReset = useCallback(() => {
    if (window.confirm('Are you sure you want to reset ALL progress? This cannot be undone.')) {
      localStorage.removeItem(STORAGE_KEY);
      setMastered(new Set());
      setExcluded(new Set());
      setHistory([]);
      setCurrentIndex(-1);
      setShowExcludedModal(false);
      bootstrapDone.current = false;
    }
  }, []);

  const handleNext = useCallback(() => {
    if (currentIndex < history.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else if (history.length < wishData.length) {
      goToNextUnmastered();
    }
  }, [currentIndex, history.length, goToNextUnmastered]);

  const handlePrev = useCallback(() => {
    if (currentIndex > 0) setCurrentIndex(prev => prev - 1);
  }, [currentIndex]);

  const resetState = useCallback(() => {
    setHistory(prev => {
      const next = [...prev];
      next[currentIndex] = { ...next[currentIndex], inputValue: '', status: 'idle' };
      return next;
    });
    const verbIndex = history[currentIndex]?.index;
    if (verbIndex !== undefined) {
      setMastered(prev => {
        if (!prev.has(verbIndex)) return prev;
        const next = new Set(prev);
        next.delete(verbIndex);
        return next;
      });
    }
  }, [currentIndex, history]);

  const handleIdk = useCallback(() => {
    setHistory(prev => {
      const next = [...prev];
      next[currentIndex] = { ...next[currentIndex], status: 'wrong' };
      return next;
    });
  }, [currentIndex]);

  const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const currentItem = history[currentIndex];
    if (!currentItem.inputValue.trim() || currentItem.status !== 'idle') return;

    const entry = wishData[currentItem.index];
    const correct = isAnswerCorrect(currentItem.inputValue, entry.correctAnswers);

    setHistory(prev => {
      const next = [...prev];
      next[currentIndex] = { ...next[currentIndex], status: correct ? 'correct' : 'wrong' };
      return next;
    });
    if (correct) {
      setMastered(prev => new Set(prev).add(currentItem.index));
    }
  }, [currentIndex, history]);

  const updateInputValue = useCallback((val: string) => {
    setHistory(prev => {
      const next = [...prev];
      next[currentIndex] = { ...next[currentIndex], inputValue: val };
      return next;
    });
  }, [currentIndex]);

  const handleToggleExclude = useCallback((verbIndex: number) => {
    if (excluded.has(verbIndex)) {
      setExcluded(prev => { const next = new Set(prev); next.delete(verbIndex); return next; });
      return;
    }

    const newExcluded = new Set(excluded);
    newExcluded.add(verbIndex);
    setMastered(prev => new Set(prev).add(verbIndex));
    setExcluded(newExcluded);

    const newHistory = history.filter((_, i) => i !== currentIndex);

    if (newHistory.length === 0 || currentIndex >= newHistory.length) {
      const usedIndices = new Set(newHistory.map(h => h.index));
      const remaining = wishData
        .map((_, i) => i)
        .filter(i => !usedIndices.has(i) && !newExcluded.has(i));
      if (remaining.length > 0) {
        const nextIdx = remaining[Math.floor(Math.random() * remaining.length)];
        const finalHistory = [...newHistory, { index: nextIdx, inputValue: '', status: 'idle' as const }];
        setHistory(finalHistory);
        setCurrentIndex(finalHistory.length - 1);
      } else {
        setHistory(newHistory);
        setCurrentIndex(Math.max(0, newHistory.length - 1));
      }
    } else {
      setHistory(newHistory);
    }
  }, [excluded, currentIndex, history]);

  const handleIncludeVerb = useCallback((verbIndex: number) => {
    setExcluded(prev => { const next = new Set(prev); next.delete(verbIndex); return next; });
    setMastered(prev => { const next = new Set(prev); next.delete(verbIndex); return next; });
  }, []);

  const handleJumpToVerb = useCallback((verbIndex: number) => {
    const existingPos = history.findIndex(h => h.index === verbIndex);
    if (existingPos !== -1) {
      setCurrentIndex(existingPos);
    } else {
      setHistory(prev => [...prev, { index: verbIndex, inputValue: '', status: 'idle' }]);
      setCurrentIndex(history.length);
    }
  }, [history]);

  const handleUnexcludeAndJump = useCallback((verbIndex: number) => {
    setExcluded(prev => { const next = new Set(prev); next.delete(verbIndex); return next; });
    setMastered(prev => { const next = new Set(prev); next.delete(verbIndex); return next; });
    const existingPos = history.findIndex(h => h.index === verbIndex);
    if (existingPos !== -1) {
      setCurrentIndex(existingPos);
    } else {
      setHistory(prev => [...prev, { index: verbIndex, inputValue: '', status: 'idle' }]);
      setCurrentIndex(history.length);
    }
  }, [history]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (showExcludedModal || showSearchModal || showTutorialModal) return;
      const currentStatus = history[currentIndex]?.status ?? 'idle';
      const key = e.key.toLowerCase();

      if (key === '`') {
        if (currentStatus !== 'idle') {
          e.preventDefault();
          resetState();
          return;
        }
      }
      if (e.key === 'Escape' && currentStatus === 'idle') {
        e.preventDefault();
        handleIdk();
        return;
      }
      if (document.activeElement === inputRef.current && e.key !== 'Enter') return;

      if (e.key === 'ArrowLeft') {
        if (currentIndex > 0) handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'Enter' && currentStatus !== 'idle') {
        handleNext();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, history, resetState, handleIdk, handleNext, handlePrev, showExcludedModal, showSearchModal, showTutorialModal]);

  const minSwipeDistance = 50;
  const onTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };
  const onTouchMove = (e: React.TouchEvent<HTMLDivElement>) => setTouchEnd(e.targetTouches[0].clientX);
  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > minSwipeDistance) handleNext();
    else if (distance < -minSwipeDistance && currentIndex > 0) handlePrev();
  };

  if (currentIndex === -1) return null;

  const currentItem = history[currentIndex];
  const currentQ = entryToVerbEntry(currentItem.index);
  const { inputValue, status } = currentItem;

  const usedIndices = new Set(history.map(h => h.index));
  const remainingCount = wishData.filter((_, i) => !usedIndices.has(i) && !excluded.has(i)).length;

  return (
    <div
      className="max-w-2xl mx-auto pt-10 px-4 pb-20"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <Header
        masteredCount={mastered.size}
        totalCount={wishData.length}
        currentIndex={currentIndex}
        onReset={handleGlobalReset}
        excludedCount={excluded.size}
        onShowExcluded={() => setShowExcludedModal(true)}
        onShowSearch={() => setShowSearchModal(true)}
        onShowAllVerbs={() => setShowTutorialModal(true)}
        title="I wish / If only"
        searchTitle="Search by sentences"
        excludedTitle="View excluded sentences"
        allVerbsTitle="Tutorial"
      />

      <div className="bg-white dark:bg-gray-850 rounded-2xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-800 transition-all duration-300">
        <div
          className={`h-2 w-full ${
            status === 'correct' ? 'bg-green-500' : status === 'wrong' ? 'bg-red-500' : 'bg-blue-500'
          }`}
        />

        <QuizCard
          verb={currentQ}
          status={status}
          inputValue={inputValue}
          revealSentence={revealSentence}
          inputRef={inputRef}
          onInputChange={updateInputValue}
          onSubmit={handleSubmit}
          onIdk={handleIdk}
          onToggleReveal={() => setRevealSentence(r => !r)}
          renderSentenceWithMask={renderSentenceWithMask}
          isExcluded={excluded.has(currentItem.index)}
          onToggleExclude={() => handleToggleExclude(currentItem.index)}
        />

        <Feedback status={status} correctVerb={currentQ.verb} />

        <NavigationControls
          currentIndex={currentIndex}
          historyLength={history.length}
          remainingCount={remainingCount}
          status={status}
          onPrev={handlePrev}
          onNext={handleNext}
          onReset={resetState}
        />
      </div>

      {showExcludedModal && (
        <ExcludedModal
          excluded={excluded}
          allVerbs={displayEntries}
          onInclude={handleIncludeVerb}
          onClose={() => setShowExcludedModal(false)}
          itemLabel="Sentences"
        />
      )}
      {showSearchModal && (
        <SearchModal
          allVerbs={displayEntries}
          excluded={excluded}
          onSelect={handleJumpToVerb}
          onUnexclude={handleUnexcludeAndJump}
          onClose={() => setShowSearchModal(false)}
          searchPlaceholder="Search by sentences..."
        />
      )}
      {showTutorialModal && (
        <TutorialModal onClose={() => setShowTutorialModal(false)} />
      )}
    </div>
  );
}
