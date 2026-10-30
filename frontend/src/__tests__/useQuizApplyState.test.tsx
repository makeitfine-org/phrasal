import React from 'react';
import { renderHook, act } from '@testing-library/react';
import { AuthContext, type AuthContextValue } from '../auth/AuthContext';
import { useQuiz } from '../hooks/useQuiz';
import * as api from '../api/quizProgressApi';

vi.mock('../api/quizProgressApi');

const STORAGE_KEY = 'testQuizState';
const IDS = [10, 20, 30, 40, 50];
const auth: AuthContextValue = {
  status: 'authenticated', user: { id: 1, email: 'a@b.co', role: 'USER', twoFactorEnabled: false, twoFactorEnrollmentRequired: false },
  login: async () => {}, register: async () => {}, logout: async () => {}, refresh: async () => {},
};
const wrapper = ({ children }: { children: React.ReactNode }) => (
  <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
);
const config = () => ({
  storageKey: STORAGE_KEY,
  poolSize: 5,
  completionMessage: 'done',
  checkAnswer: () => true,
  sync: { quizKey: 'phrasal-verbs' as const, itemIds: IDS },
});
const serverDoc = (state: object) =>
  ({ quizKey: 'phrasal-verbs', state: { schemaVersion: 1, ...state }, version: 1, updatedAt: '' }) as never;

beforeEach(() => {
  localStorage.clear();
  vi.spyOn(Math, 'random').mockReturnValue(0);
  vi.mocked(api.fetchQuizProgress).mockReset();
  vi.mocked(api.saveQuizProgress).mockReset().mockResolvedValue(serverDoc({}));
});
afterEach(() => vi.restoreAllMocks());

describe('useQuiz — applying a server state', () => {
  it('shows mastered, excluded and history, and persists them while keeping darkMode', async () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ darkMode: true }));
    vi.mocked(api.fetchQuizProgress).mockResolvedValue(serverDoc({
      mastered: [10, 20], excluded: [30],
      history: [{ id: 20, inputValue: 'x', status: 'correct' }], currentIndex: 0,
    }));
    const { result } = renderHook(() => useQuiz(config()), { wrapper });
    await act(async () => { await Promise.resolve(); });

    expect(Array.from(result.current.mastered)).toEqual([0, 1]);
    expect(Array.from(result.current.excluded)).toEqual([2]);
    expect(result.current.history).toEqual([{ index: 1, inputValue: 'x', status: 'correct' }]);
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY)!);
    expect(stored.darkMode).toBe(true);
    expect(stored.excluded).toEqual([2]);
    expect(stored.history).toHaveLength(1);
  });

  it('an applied empty state bootstraps a new item', async () => {
    vi.mocked(api.fetchQuizProgress).mockResolvedValue(serverDoc({
      mastered: [], excluded: [], history: [], currentIndex: -1,
    }));
    const { result } = renderHook(() => useQuiz(config()), { wrapper });
    await act(async () => { await Promise.resolve(); });
    expect(result.current.history).toHaveLength(1);
    expect(result.current.ready).toBe(true);
    expect(result.current.mastered.size).toBe(0);
  });

  it('keeps local state when the server load fails', async () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      mastered: [1], excluded: [], history: [{ index: 1, inputValue: '', status: 'idle' }], currentIndex: 0,
    }));
    vi.mocked(api.fetchQuizProgress).mockRejectedValue(new TypeError('offline'));
    const { result } = renderHook(() => useQuiz(config()), { wrapper });
    await act(async () => { await Promise.resolve(); });
    expect(Array.from(result.current.mastered)).toEqual([1]);
    expect(api.saveQuizProgress).not.toHaveBeenCalled();
  });
});
