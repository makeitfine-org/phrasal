import React, { useState, useEffect, useRef, useCallback } from 'react';
import type { HistoryItem, Status } from '../types';

interface PersistedState {
  mastered?: number[];
  excluded?: number[];
  history?: HistoryItem[];
  currentIndex?: number;
}

export interface UseQuizConfig {
  storageKey: string;
  poolSize: number;
  completionMessage: string;
  checkAnswer: (input: string, itemIndex: number) => boolean;
}

export interface UseQuizReturn {
  mastered: Set<number>;
  excluded: Set<number>;
  history: HistoryItem[];
  currentIndex: number;
  currentItem: HistoryItem | undefined;
  revealSentence: boolean;
  showExcludedModal: boolean;
  showSearchModal: boolean;
  inputValue: string;
  status: Status;
  remainingCount: number;
  ready: boolean;
  inputRef: React.RefObject<HTMLInputElement>;
  setShowExcludedModal: React.Dispatch<React.SetStateAction<boolean>>;
  setShowSearchModal: React.Dispatch<React.SetStateAction<boolean>>;
  setRevealSentence: React.Dispatch<React.SetStateAction<boolean>>;
  handleGlobalReset: () => void;
  handleNext: () => void;
  handlePrev: () => void;
  resetState: () => void;
  handleIdk: () => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  updateInputValue: (val: string) => void;
  handleToggleExclude: (verbIndex: number) => void;
  handleIncludeVerb: (verbIndex: number) => void;
  handleJumpToVerb: (verbIndex: number) => void;
  handleUnexcludeAndJump: (verbIndex: number) => void;
  onTouchStart: (e: React.TouchEvent<HTMLDivElement>) => void;
  onTouchMove: (e: React.TouchEvent<HTMLDivElement>) => void;
  onTouchEnd: () => void;
}

export function useQuiz(config: UseQuizConfig, extraModalOpen = false): UseQuizReturn {
  const { storageKey, poolSize, completionMessage, checkAnswer } = config;

  const savedState = JSON.parse(localStorage.getItem(storageKey) || '{}') as PersistedState;

  const [mastered, setMastered] = useState<Set<number>>(new Set(savedState.mastered ?? []));
  const [excluded, setExcluded] = useState<Set<number>>(new Set(savedState.excluded ?? []));
  const [history, setHistory] = useState<HistoryItem[]>(savedState.history ?? []);
  const [currentIndex, setCurrentIndex] = useState<number>(savedState.currentIndex ?? -1);
  const [revealSentence, setRevealSentence] = useState(false);
  const [showExcludedModal, setShowExcludedModal] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);
  const bootstrapDone = useRef(savedState.history != null && savedState.history.length > 0);

  const checkAnswerRef = useRef(checkAnswer);
  checkAnswerRef.current = checkAnswer;

  const poolSizeRef = useRef(poolSize);
  poolSizeRef.current = poolSize;

  const completionMessageRef = useRef(completionMessage);
  completionMessageRef.current = completionMessage;

  useEffect(() => {
    const existing = JSON.parse(localStorage.getItem(storageKey) || '{}');
    localStorage.setItem(
      storageKey,
      JSON.stringify({
        ...existing,
        mastered: Array.from(mastered),
        excluded: Array.from(excluded),
        history,
        currentIndex,
      })
    );
  }, [mastered, excluded, history, currentIndex, storageKey]);

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
    for (let i = 0; i < poolSizeRef.current; i++) {
      if (!usedIndices.has(i) && !excluded.has(i)) remaining.push(i);
    }
    if (remaining.length === 0) {
      alert(completionMessageRef.current);
      return;
    }
    const nextIdx = remaining[Math.floor(Math.random() * remaining.length)];
    setHistory(prev => [...prev, { index: nextIdx, inputValue: '', status: 'idle' }]);
    setCurrentIndex(prev => prev + 1);
  }, [history, excluded]);

  const handleGlobalReset = useCallback(() => {
    if (window.confirm('Are you sure you want to reset ALL progress? This cannot be undone.')) {
      localStorage.removeItem(storageKey);
      setMastered(new Set());
      setExcluded(new Set());
      setHistory([]);
      setCurrentIndex(-1);
      setShowExcludedModal(false);
      bootstrapDone.current = false;
    }
  }, [storageKey]);

  const handleNext = useCallback(() => {
    if (currentIndex < history.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else if (history.length < poolSizeRef.current) {
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

    const isCorrect = checkAnswerRef.current(currentItem.inputValue, currentItem.index);

    setHistory(prev => {
      const next = [...prev];
      next[currentIndex] = { ...next[currentIndex], status: isCorrect ? 'correct' : 'wrong' };
      return next;
    });
    if (isCorrect) {
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
      const remaining = Array.from({ length: poolSizeRef.current }, (_, i) => i)
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
      if (showExcludedModal || showSearchModal || extraModalOpen) return;
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
  }, [currentIndex, history, resetState, handleIdk, handleNext, handlePrev, showExcludedModal, showSearchModal, extraModalOpen]);

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

  const currentItem = currentIndex >= 0 ? history[currentIndex] : undefined;

  return {
    mastered,
    excluded,
    history,
    currentIndex,
    currentItem,
    revealSentence,
    showExcludedModal,
    showSearchModal,
    inputValue: currentItem?.inputValue ?? '',
    status: currentItem?.status ?? 'idle',
    remainingCount: Array.from({ length: poolSize }, (_, i) => i)
      .filter(i => !new Set(history.map(h => h.index)).has(i) && !excluded.has(i)).length,
    ready: currentIndex !== -1,
    inputRef,
    setShowExcludedModal,
    setShowSearchModal,
    setRevealSentence,
    handleGlobalReset,
    handleNext,
    handlePrev,
    resetState,
    handleIdk,
    handleSubmit,
    updateInputValue,
    handleToggleExclude,
    handleIncludeVerb,
    handleJumpToVerb,
    handleUnexcludeAndJump,
    onTouchStart,
    onTouchMove,
    onTouchEnd,
  };
}
