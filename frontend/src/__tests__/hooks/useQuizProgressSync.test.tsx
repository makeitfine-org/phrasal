import React from 'react';
import { renderHook, act } from '@testing-library/react';
import { AuthContext, type AuthContextValue } from '../../auth/AuthContext';
import {
  SAVE_DEBOUNCE_MS,
  flushQuizProgress,
  useQuizProgressSync,
} from '../../hooks/useQuizProgressSync';
import { ApiError } from '../../api/client';
import * as api from '../../api/quizProgressApi';
import { readSyncMeta, restoreAnonymousProgress, writeSyncMeta } from '../../utils/quizProgressStorage';
import type { QuizPersistedState } from '../../types';

vi.mock('../../api/quizProgressApi');

const KEY = 'phrasal-verbs';
const IDS = [10, 20, 30];
const EMPTY: QuizPersistedState = { mastered: [], excluded: [], history: [], currentIndex: -1 };
const LOCAL: QuizPersistedState = { mastered: [0], excluded: [1], history: [], currentIndex: -1 };
const LOCAL_DOC = { schemaVersion: 1, mastered: [10], excluded: [20], history: [], currentIndex: -1 };
const EMPTY_DOC = { schemaVersion: 1, mastered: [], excluded: [], history: [], currentIndex: -1 };

const base: AuthContextValue = {
  status: 'anonymous', user: null,
  login: async () => {}, register: async () => {}, logout: async () => {}, deleteAccount: async () => {}, refresh: async () => {},
};
const asUser = (id: number): AuthContextValue => ({
  ...base, status: 'authenticated', user: { id, email: `u${id}@x.co`, role: 'USER', twoFactorEnabled: false, twoFactorEnrollmentRequired: false, hasPassword: true },
});

let auth: AuthContextValue = base;
const wrapper = ({ children }: { children: React.ReactNode }) => (
  <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
);

const progress = (state: unknown) => ({ quizKey: KEY, state, version: 0, updatedAt: '' }) as never;
const apply = vi.fn();

function mount(snapshot: QuizPersistedState = EMPTY) {
  return renderHook(
    (props: { snapshot: QuizPersistedState }) =>
      useQuizProgressSync({ quizKey: KEY, itemIds: IDS, snapshot: props.snapshot, applyState: apply }),
    { wrapper, initialProps: { snapshot } },
  );
}

const settle = () => act(async () => { await vi.advanceTimersByTimeAsync(0); });
const advance = (ms: number) => act(async () => { await vi.advanceTimersByTimeAsync(ms); });

beforeEach(() => {
  vi.useFakeTimers();
  localStorage.clear();
  auth = base;
  apply.mockReset();
  vi.mocked(api.fetchQuizProgress).mockReset();
  vi.mocked(api.saveQuizProgress).mockReset().mockResolvedValue(progress(EMPTY_DOC));
});

afterEach(() => {
  vi.useRealTimers();
});

describe('useQuizProgressSync — anonymous and loading', () => {
  it('anonymous makes no API calls, even after changes', async () => {
    const { rerender } = mount();
    await settle();
    rerender({ snapshot: LOCAL });
    await advance(SAVE_DEBOUNCE_MS * 2);
    expect(api.fetchQuizProgress).not.toHaveBeenCalled();
    expect(api.saveQuizProgress).not.toHaveBeenCalled();
    expect(apply).not.toHaveBeenCalled();
  });

  it('loading makes no API calls', async () => {
    auth = { ...base, status: 'loading' };
    mount();
    await settle();
    expect(api.fetchQuizProgress).not.toHaveBeenCalled();
  });

  it('anonymous with an owned cache (expired session) clears local progress but keeps darkMode', async () => {
    localStorage.setItem('phrasalQuizState', JSON.stringify({ mastered: [1], darkMode: true }));
    writeSyncMeta(KEY, { ownerId: 4, dirty: false });
    const { result } = mount(LOCAL);
    await settle();
    expect(JSON.parse(localStorage.getItem('phrasalQuizState')!)).toEqual({ darkMode: true });
    expect(readSyncMeta(KEY)).toEqual({ ownerId: null, dirty: false });
    expect(apply).toHaveBeenCalledWith(EMPTY);
    expect(result.current.syncStatus).toBe('off');
    expect(api.fetchQuizProgress).not.toHaveBeenCalled();
  });
});

describe('useQuizProgressSync — load', () => {
  it('server 200 applies the mapped state, sets the owner and does not echo a PUT', async () => {
    auth = asUser(1);
    vi.mocked(api.fetchQuizProgress).mockResolvedValue(progress(LOCAL_DOC));
    // the real applyState makes the snapshot equal the applied state
    const applied = { mastered: [0], excluded: [1], history: [], currentIndex: -1 };
    const { result, rerender } = mount(applied);
    await settle();
    expect(apply).toHaveBeenCalledWith(applied);
    expect(readSyncMeta(KEY)).toEqual({ ownerId: 1, dirty: false });
    expect(result.current.syncStatus).toBe('synced');
    rerender({ snapshot: { ...applied } });
    await advance(SAVE_DEBOUNCE_MS * 2);
    expect(api.saveQuizProgress).not.toHaveBeenCalled();
  });

  it('404 with anonymous local progress imports it (first login)', async () => {
    auth = asUser(1);
    vi.mocked(api.fetchQuizProgress).mockResolvedValue(null);
    const { result } = mount(LOCAL);
    await settle();
    expect(api.saveQuizProgress).toHaveBeenCalledWith(KEY, LOCAL_DOC);
    expect(apply).not.toHaveBeenCalled();
    expect(readSyncMeta(KEY).ownerId).toBe(1);
    expect(result.current.syncStatus).toBe('synced');
  });

  it("404 with another user's cache resets locally and never uploads the other user's data", async () => {
    auth = asUser(2);
    writeSyncMeta(KEY, { ownerId: 1, dirty: false });
    vi.mocked(api.fetchQuizProgress).mockResolvedValue(null);
    mount(LOCAL);
    await settle();
    expect(apply).toHaveBeenCalledWith(EMPTY);
    expect(api.saveQuizProgress).toHaveBeenCalledTimes(1);
    expect(api.saveQuizProgress).toHaveBeenCalledWith(KEY, EMPTY_DOC);
    expect(readSyncMeta(KEY).ownerId).toBe(2);
  });

  it('same owner with dirty progress is pushed first, without a GET', async () => {
    auth = asUser(1);
    writeSyncMeta(KEY, { ownerId: 1, dirty: true });
    const { result } = mount(LOCAL);
    await settle();
    expect(api.fetchQuizProgress).not.toHaveBeenCalled();
    expect(api.saveQuizProgress).toHaveBeenCalledWith(KEY, LOCAL_DOC);
    expect(readSyncMeta(KEY)).toEqual({ ownerId: 1, dirty: false });
    expect(result.current.syncStatus).toBe('synced');
  });

  it('a GET 500 gives error and nothing is saved after changes', async () => {
    auth = asUser(1);
    vi.mocked(api.fetchQuizProgress).mockRejectedValue(new ApiError(500, 'boom'));
    const { result, rerender } = mount();
    await settle();
    expect(result.current.syncStatus).toBe('error');
    rerender({ snapshot: LOCAL });
    await advance(SAVE_DEBOUNCE_MS * 2);
    expect(api.saveQuizProgress).not.toHaveBeenCalled();
  });

  it('a network error gives error', async () => {
    auth = asUser(1);
    vi.mocked(api.fetchQuizProgress).mockRejectedValue(new TypeError('offline'));
    const { result } = mount();
    await settle();
    expect(result.current.syncStatus).toBe('error');
  });

  it('an unknown schemaVersion gives error: no apply, no PUT', async () => {
    auth = asUser(1);
    vi.mocked(api.fetchQuizProgress).mockResolvedValue(progress({ ...LOCAL_DOC, schemaVersion: 2 }));
    const { result, rerender } = mount();
    await settle();
    rerender({ snapshot: LOCAL });
    await advance(SAVE_DEBOUNCE_MS * 2);
    expect(result.current.syncStatus).toBe('error');
    expect(apply).not.toHaveBeenCalled();
    expect(api.saveQuizProgress).not.toHaveBeenCalled();
  });
});

describe('useQuizProgressSync — saving', () => {
  async function syncedMount() {
    auth = asUser(1);
    vi.mocked(api.fetchQuizProgress).mockResolvedValue(progress(EMPTY_DOC));
    const hook = mount();
    await settle();
    return hook;
  }

  it('debounces five changes into one PUT with the last snapshot; dirty true before, false after', async () => {
    const { rerender } = await syncedMount();
    for (let i = 1; i <= 5; i++) {
      rerender({ snapshot: { ...EMPTY, mastered: [0, 1, 2].slice(0, i % 3 + 1), currentIndex: -1 } });
      await advance(300);
    }
    const last = { ...EMPTY, mastered: [0, 1], excluded: [2] };
    rerender({ snapshot: last });
    expect(readSyncMeta(KEY).dirty).toBe(true);
    expect(api.saveQuizProgress).not.toHaveBeenCalled();
    await advance(SAVE_DEBOUNCE_MS);
    expect(api.saveQuizProgress).toHaveBeenCalledTimes(1);
    expect(vi.mocked(api.saveQuizProgress).mock.calls[0][1]).toMatchObject({ mastered: [10, 20], excluded: [30] });
    expect(readSyncMeta(KEY).dirty).toBe(false);
  });

  it('the session ending before the debounce fires cancels the pending save', async () => {
    const { rerender } = await syncedMount();
    rerender({ snapshot: LOCAL });
    auth = base;
    rerender({ snapshot: LOCAL });
    await advance(SAVE_DEBOUNCE_MS * 2);
    expect(api.saveQuizProgress).not.toHaveBeenCalled();
  });

  it('a PUT failing with 401 turns sync off and keeps dirty', async () => {
    const { result, rerender } = await syncedMount();
    vi.mocked(api.saveQuizProgress).mockRejectedValue(new ApiError(401, 'expired'));
    rerender({ snapshot: LOCAL });
    await advance(SAVE_DEBOUNCE_MS);
    expect(result.current.syncStatus).toBe('off');
    expect(readSyncMeta(KEY).dirty).toBe(true);
  });

  it('a PUT 400 warns once and keeps dirty', async () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const { rerender } = await syncedMount();
    vi.mocked(api.saveQuizProgress).mockRejectedValue(new ApiError(400, 'too large'));
    rerender({ snapshot: LOCAL });
    await advance(SAVE_DEBOUNCE_MS);
    rerender({ snapshot: { ...LOCAL, mastered: [0, 1] } });
    await advance(SAVE_DEBOUNCE_MS);
    expect(warn).toHaveBeenCalledTimes(1);
    expect(readSyncMeta(KEY).dirty).toBe(true);
    warn.mockRestore();
  });

  it('a network error keeps dirty and the next change retries', async () => {
    const { rerender } = await syncedMount();
    vi.mocked(api.saveQuizProgress).mockRejectedValueOnce(new TypeError('offline'));
    rerender({ snapshot: LOCAL });
    await advance(SAVE_DEBOUNCE_MS);
    expect(readSyncMeta(KEY).dirty).toBe(true);
    rerender({ snapshot: { ...LOCAL, mastered: [0, 1] } });
    await advance(SAVE_DEBOUNCE_MS);
    expect(api.saveQuizProgress).toHaveBeenCalledTimes(2);
    expect(readSyncMeta(KEY).dirty).toBe(false);
  });

  it('never has two PUTs in flight for one key', async () => {
    const { rerender } = await syncedMount();
    let inFlight = 0;
    let maxInFlight = 0;
    vi.mocked(api.saveQuizProgress).mockImplementation(async () => {
      inFlight++;
      maxInFlight = Math.max(maxInFlight, inFlight);
      await new Promise(r => setTimeout(r, 1000));
      inFlight--;
      return progress(EMPTY_DOC);
    });
    rerender({ snapshot: LOCAL });
    await advance(SAVE_DEBOUNCE_MS);
    rerender({ snapshot: { ...LOCAL, mastered: [0, 1] } });
    await advance(SAVE_DEBOUNCE_MS + 3000);
    expect(api.saveQuizProgress).toHaveBeenCalledTimes(2);
    expect(maxInFlight).toBe(1);
  });
});

describe('useQuizProgressSync — flush', () => {
  async function pendingMount() {
    auth = asUser(1);
    vi.mocked(api.fetchQuizProgress).mockResolvedValue(progress(EMPTY_DOC));
    const hook = mount();
    await settle();
    hook.rerender({ snapshot: LOCAL });
    return hook;
  }

  it('unmount sends a pending change immediately', async () => {
    const { unmount } = await pendingMount();
    expect(api.saveQuizProgress).not.toHaveBeenCalled();
    unmount();
    await settle();
    expect(api.saveQuizProgress).toHaveBeenCalledWith(KEY, LOCAL_DOC, undefined);
  });

  it('pagehide sends with keepalive', async () => {
    await pendingMount();
    act(() => { window.dispatchEvent(new Event('pagehide')); });
    await settle();
    expect(api.saveQuizProgress).toHaveBeenCalledWith(KEY, LOCAL_DOC, { keepalive: true });
  });

  it('flushQuizProgress resolves only after the pending PUT finishes', async () => {
    await pendingMount();
    let release!: () => void;
    vi.mocked(api.saveQuizProgress).mockImplementation(
      () => new Promise(resolve => { release = () => resolve(progress(EMPTY_DOC)); }),
    );
    let done = false;
    const flushed = flushQuizProgress().then(() => { done = true; });
    await settle();
    expect(done).toBe(false);
    release();
    await act(async () => { await flushed; });
    expect(done).toBe(true);
  });

  it('flushQuizProgress with nothing pending resolves without a request', async () => {
    auth = asUser(1);
    vi.mocked(api.fetchQuizProgress).mockResolvedValue(progress(EMPTY_DOC));
    mount();
    await settle();
    await act(async () => { await flushQuizProgress(); });
    expect(api.saveQuizProgress).not.toHaveBeenCalled();
  });
});

describe('useQuizProgressSync — user switch', () => {
  it("cancels A's pending timer and loads B", async () => {
    auth = asUser(1);
    vi.mocked(api.fetchQuizProgress).mockResolvedValue(progress(EMPTY_DOC));
    const { rerender } = mount();
    await settle();
    rerender({ snapshot: LOCAL });

    auth = asUser(2);
    vi.mocked(api.fetchQuizProgress).mockResolvedValue(progress(LOCAL_DOC));
    rerender({ snapshot: LOCAL });
    await advance(SAVE_DEBOUNCE_MS * 2);

    expect(api.fetchQuizProgress).toHaveBeenCalledTimes(2);
    expect(apply).toHaveBeenCalledWith({ mastered: [0], excluded: [1], history: [], currentIndex: -1 });
    expect(api.saveQuizProgress).not.toHaveBeenCalled();
    expect(readSyncMeta(KEY).ownerId).toBe(2);
  });

  it('logout while mounted clears the in-memory state', async () => {
    auth = asUser(1);
    vi.mocked(api.fetchQuizProgress).mockResolvedValue(progress(LOCAL_DOC));
    const { rerender } = mount();
    await settle();
    apply.mockClear();
    auth = base;
    rerender({ snapshot: LOCAL });
    await settle();
    expect(apply).toHaveBeenCalledWith(EMPTY);
  });
});

describe('useQuizProgressSync — anonymous progress is kept across login and logout', () => {
  const ANON = { mastered: [3], excluded: [4], history: [], currentIndex: -1 };

  it('login stashes the anonymous progress before the account replaces it', async () => {
    localStorage.setItem('phrasalQuizState', JSON.stringify(ANON));
    auth = asUser(1);
    vi.mocked(api.fetchQuizProgress).mockResolvedValue(progress(LOCAL_DOC));
    mount(ANON);
    await settle();
    expect(JSON.parse(localStorage.getItem('quizProgressAnonymous')!)[KEY]).toEqual(ANON);
  });

  it("login does not stash another account's cached progress", async () => {
    localStorage.setItem('phrasalQuizState', JSON.stringify(ANON));
    writeSyncMeta(KEY, { ownerId: 1, dirty: false });
    auth = asUser(2);
    vi.mocked(api.fetchQuizProgress).mockResolvedValue(null);
    mount(ANON);
    await settle();
    expect(localStorage.getItem('quizProgressAnonymous')).toBeNull();
  });

  it('logout while mounted applies the anonymous progress, not an empty state', async () => {
    localStorage.setItem('phrasalQuizState', JSON.stringify(ANON));
    auth = asUser(1);
    vi.mocked(api.fetchQuizProgress).mockResolvedValue(progress(LOCAL_DOC));
    const { rerender } = mount(ANON);
    await settle();
    localStorage.setItem('phrasalQuizState', JSON.stringify(LOCAL));
    apply.mockClear();
    auth = base;
    rerender({ snapshot: LOCAL });
    await settle();
    expect(apply).toHaveBeenCalledWith(ANON);
    expect(JSON.parse(localStorage.getItem('phrasalQuizState')!)).toEqual(ANON);
    expect(restoreAnonymousProgress(KEY)).toEqual(ANON);
  });

  it('logout without an anonymous backup falls back to the empty state', async () => {
    auth = asUser(1);
    vi.mocked(api.fetchQuizProgress).mockResolvedValue(progress(LOCAL_DOC));
    const { rerender } = mount();
    await settle();
    apply.mockClear();
    auth = base;
    rerender({ snapshot: LOCAL });
    await settle();
    expect(apply).toHaveBeenCalledWith(EMPTY);
  });
});
