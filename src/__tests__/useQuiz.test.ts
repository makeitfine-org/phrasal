import { renderHook, act } from '@testing-library/react';
import { useQuiz } from '../hooks/useQuiz';
import type { UseQuizConfig } from '../hooks/useQuiz';

const STORAGE_KEY = 'testQuizState';

function makeConfig(overrides?: Partial<UseQuizConfig>): UseQuizConfig {
  return {
    storageKey: STORAGE_KEY,
    poolSize: 5,
    completionMessage: 'All done!',
    checkAnswer: (input, index) => input.toLowerCase() === `answer${index}`,
    ...overrides,
  };
}

beforeEach(() => {
  localStorage.clear();
  vi.spyOn(Math, 'random').mockReturnValue(0);
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe('useQuiz — state init from localStorage', () => {
  it('starts with empty state when localStorage is empty', () => {
    const { result } = renderHook(() => useQuiz(makeConfig()));
    expect(result.current.mastered.size).toBe(0);
    expect(result.current.excluded.size).toBe(0);
    expect(result.current.history).toHaveLength(1); // bootstrap adds one
    expect(result.current.currentIndex).toBe(0);
  });

  it('restores mastered, excluded, history, currentIndex from localStorage', () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      mastered: [1, 2],
      excluded: [3],
      history: [
        { index: 0, inputValue: '', status: 'idle' },
        { index: 4, inputValue: 'test', status: 'correct' },
      ],
      currentIndex: 1,
    }));
    const { result } = renderHook(() => useQuiz(makeConfig()));
    expect(result.current.mastered).toEqual(new Set([1, 2]));
    expect(result.current.excluded).toEqual(new Set([3]));
    expect(result.current.history).toHaveLength(2);
    expect(result.current.currentIndex).toBe(1);
    expect(result.current.inputValue).toBe('test');
    expect(result.current.status).toBe('correct');
  });
});

describe('useQuiz — persistence on state change', () => {
  it('persists state to localStorage after bootstrap', () => {
    renderHook(() => useQuiz(makeConfig()));
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY)!);
    expect(saved.history).toHaveLength(1);
    expect(saved.currentIndex).toBe(0);
    expect(saved.mastered).toEqual([]);
    expect(saved.excluded).toEqual([]);
  });

  it('preserves existing unrelated fields in localStorage', () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ darkMode: true, customField: 42 }));
    renderHook(() => useQuiz(makeConfig()));
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY)!);
    expect(saved.darkMode).toBe(true);
    expect(saved.customField).toBe(42);
  });

  it('updates localStorage when mastered changes', () => {
    const { result } = renderHook(() => useQuiz(makeConfig()));
    act(() => { result.current.updateInputValue('answer0'); });
    act(() => {
      result.current.handleSubmit({ preventDefault: () => {} } as React.FormEvent<HTMLFormElement>);
    });
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY)!);
    expect(saved.mastered).toContain(0);
  });
});

describe('useQuiz — pick-next-card skipping mastered/excluded', () => {
  it('picks from remaining pool excluding used and excluded indices', () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      mastered: [],
      excluded: [0, 1],
      history: [{ index: 2, inputValue: '', status: 'idle' }],
      currentIndex: 0,
    }));
    const { result } = renderHook(() => useQuiz(makeConfig()));
    act(() => { result.current.handleNext(); });
    // remaining: [3, 4] (0,1 excluded, 2 used). Math.random()=0 picks index 3
    expect(result.current.history[1].index).toBe(3);
  });

  it('shows completion alert when all items are used or excluded', () => {
    const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      mastered: [],
      excluded: [1, 2, 3, 4],
      history: [{ index: 0, inputValue: '', status: 'idle' }],
      currentIndex: 0,
    }));
    const { result } = renderHook(() => useQuiz(makeConfig()));
    act(() => { result.current.handleNext(); });
    expect(alertSpy).toHaveBeenCalledWith('All done!');
  });
});

describe('useQuiz — navigation bounds', () => {
  it('handlePrev does not go below 0', () => {
    const { result } = renderHook(() => useQuiz(makeConfig()));
    act(() => { result.current.handlePrev(); });
    expect(result.current.currentIndex).toBe(0);
  });

  it('handlePrev decrements currentIndex when > 0', () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      mastered: [],
      excluded: [],
      history: [
        { index: 0, inputValue: '', status: 'idle' },
        { index: 1, inputValue: '', status: 'idle' },
      ],
      currentIndex: 1,
    }));
    const { result } = renderHook(() => useQuiz(makeConfig()));
    act(() => { result.current.handlePrev(); });
    expect(result.current.currentIndex).toBe(0);
  });

  it('handleNext moves forward in history when not at end', () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      mastered: [],
      excluded: [],
      history: [
        { index: 0, inputValue: '', status: 'idle' },
        { index: 1, inputValue: '', status: 'idle' },
      ],
      currentIndex: 0,
    }));
    const { result } = renderHook(() => useQuiz(makeConfig()));
    act(() => { result.current.handleNext(); });
    expect(result.current.currentIndex).toBe(1);
  });

  it('handleNext picks a new card when at end of history', () => {
    const { result } = renderHook(() => useQuiz(makeConfig()));
    expect(result.current.history).toHaveLength(1);
    act(() => { result.current.handleNext(); });
    expect(result.current.history).toHaveLength(2);
    expect(result.current.currentIndex).toBe(1);
  });
});

describe('useQuiz — handleSubmit with checkAnswer', () => {
  it('marks correct when checkAnswer returns true', () => {
    const { result } = renderHook(() => useQuiz(makeConfig()));
    act(() => {
      result.current.updateInputValue('answer0');
    });
    act(() => {
      result.current.handleSubmit({ preventDefault: () => {} } as React.FormEvent<HTMLFormElement>);
    });
    expect(result.current.status).toBe('correct');
    expect(result.current.mastered.has(0)).toBe(true);
  });

  it('marks wrong when checkAnswer returns false', () => {
    const { result } = renderHook(() => useQuiz(makeConfig()));
    act(() => {
      result.current.updateInputValue('wrong');
    });
    act(() => {
      result.current.handleSubmit({ preventDefault: () => {} } as React.FormEvent<HTMLFormElement>);
    });
    expect(result.current.status).toBe('wrong');
    expect(result.current.mastered.has(0)).toBe(false);
  });

  it('does not submit when input is blank', () => {
    const { result } = renderHook(() => useQuiz(makeConfig()));
    act(() => {
      result.current.handleSubmit({ preventDefault: () => {} } as React.FormEvent<HTMLFormElement>);
    });
    expect(result.current.status).toBe('idle');
  });
});

describe('useQuiz — resetState', () => {
  it('resets current card to idle and removes from mastered', () => {
    const { result } = renderHook(() => useQuiz(makeConfig()));
    act(() => { result.current.updateInputValue('answer0'); });
    act(() => {
      result.current.handleSubmit({ preventDefault: () => {} } as React.FormEvent<HTMLFormElement>);
    });
    expect(result.current.status).toBe('correct');
    expect(result.current.mastered.has(0)).toBe(true);
    act(() => { result.current.resetState(); });
    expect(result.current.status).toBe('idle');
    expect(result.current.mastered.has(0)).toBe(false);
  });
});

describe('useQuiz — handleGlobalReset', () => {
  it('clears all state and localStorage on confirm', () => {
    vi.spyOn(window, 'confirm').mockReturnValue(true);
    const { result } = renderHook(() => useQuiz(makeConfig()));
    act(() => { result.current.updateInputValue('answer0'); });
    act(() => {
      result.current.handleSubmit({ preventDefault: () => {} } as React.FormEvent<HTMLFormElement>);
    });
    expect(result.current.mastered.size).toBe(1);
    act(() => { result.current.handleGlobalReset(); });
    // After reset, bootstrap runs again
    expect(result.current.mastered.size).toBe(0);
    expect(result.current.excluded.size).toBe(0);
  });

  it('does not reset when user cancels', () => {
    vi.spyOn(window, 'confirm').mockReturnValue(false);
    const { result } = renderHook(() => useQuiz(makeConfig()));
    act(() => { result.current.updateInputValue('answer0'); });
    act(() => {
      result.current.handleSubmit({ preventDefault: () => {} } as React.FormEvent<HTMLFormElement>);
    });
    act(() => { result.current.handleGlobalReset(); });
    expect(result.current.mastered.size).toBe(1);
  });
});

describe('useQuiz — ready flag', () => {
  it('ready is true after bootstrap', () => {
    const { result } = renderHook(() => useQuiz(makeConfig()));
    expect(result.current.ready).toBe(true);
  });
});

describe('useQuiz — handleIdk', () => {
  it('sets status to wrong', () => {
    const { result } = renderHook(() => useQuiz(makeConfig()));
    act(() => { result.current.handleIdk(); });
    expect(result.current.status).toBe('wrong');
  });
});

describe('useQuiz — modal state', () => {
  it('manages excluded and search modal state', () => {
    const { result } = renderHook(() => useQuiz(makeConfig()));
    expect(result.current.showExcludedModal).toBe(false);
    expect(result.current.showSearchModal).toBe(false);
    act(() => { result.current.setShowExcludedModal(true); });
    expect(result.current.showExcludedModal).toBe(true);
    act(() => { result.current.setShowSearchModal(true); });
    expect(result.current.showSearchModal).toBe(true);
  });
});
