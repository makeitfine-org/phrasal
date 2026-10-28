import { useCallback, useEffect, useRef, useState } from 'react';
import { useAuth } from '../auth/useAuth';
import { ApiError } from '../api/client';
import {
  fetchQuizProgress,
  saveQuizProgress,
  type QuizKey,
  type QuizProgressDocument,
} from '../api/quizProgressApi';
import type { QuizPersistedState } from '../types';
import { fromProgressDocument, toProgressDocument } from '../utils/quizProgressMapping';
import {
  readSyncMeta,
  resetToAnonymousProgress,
  stashAnonymousProgress,
  writeSyncMeta,
} from '../utils/quizProgressStorage';

export type SyncStatus = 'off' | 'loading' | 'synced' | 'error';

export const SAVE_DEBOUNCE_MS = 2000;
const HTTP_UNAUTHORIZED = 401;
const HTTP_BAD_REQUEST = 400;

const EMPTY_STATE: QuizPersistedState = { mastered: [], excluded: [], history: [], currentIndex: -1 };

export interface QuizProgressSyncInput {
  quizKey: QuizKey;
  itemIds: number[];
  snapshot: QuizPersistedState;
  applyState: (state: QuizPersistedState) => void;
  enabled?: boolean;
}

// The only module-level state: every mounted sync hook registers its flush here so that logout
// can push pending progress while the session cookie is still valid.
const flushers = new Set<() => Promise<void>>();

export async function flushQuizProgress(): Promise<void> {
  await Promise.all(Array.from(flushers).map(flush => flush()));
}

export function useQuizProgressSync(input: QuizProgressSyncInput): { syncStatus: SyncStatus } {
  const { quizKey, itemIds, snapshot, applyState, enabled = true } = input;
  const auth = useAuth();
  const status = enabled ? auth.status : 'loading';
  const user = auth.user;
  const userId = user?.id ?? null;
  const [syncStatus, setSyncStatus] = useState<SyncStatus>('off');

  const snapshotRef = useRef(snapshot);
  snapshotRef.current = snapshot;
  const itemIdsRef = useRef(itemIds);
  itemIdsRef.current = itemIds;
  const applyRef = useRef(applyState);
  applyRef.current = applyState;

  const ownerRef = useRef<number | null>(null);
  const lastSavedJson = useRef<string | null>(null);
  const pendingDoc = useRef<QuizProgressDocument | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const chain = useRef<Promise<void>>(Promise.resolve());
  const warnedBadRequest = useRef(false);

  const clearTimer = useCallback(() => {
    if (timer.current !== null) {
      clearTimeout(timer.current);
      timer.current = null;
    }
  }, []);

  // Sends the pending document now; saves for one quiz key are chained so the last snapshot wins.
  const sendPending = useCallback((keepalive = false): Promise<void> => {
    clearTimer();
    const doc = pendingDoc.current;
    if (doc === null) return chain.current;
    pendingDoc.current = null;
    const run = async () => {
      try {
        await saveQuizProgress(quizKey, doc, keepalive ? { keepalive: true } : undefined);
        lastSavedJson.current = JSON.stringify(doc);
        if (pendingDoc.current === null && ownerRef.current !== null) {
          writeSyncMeta(quizKey, { ownerId: ownerRef.current, dirty: false });
        }
      } catch (error) {
        if (error instanceof ApiError && error.status === HTTP_UNAUTHORIZED) {
          setSyncStatus('off');
        } else if (error instanceof ApiError && error.status === HTTP_BAD_REQUEST) {
          if (!warnedBadRequest.current) {
            warnedBadRequest.current = true;
            console.warn('Quiz progress was rejected by the server:', error.message);
          }
        }
        // any failure keeps dirty = true; the next change (or login) retries
      }
    };
    chain.current = chain.current.then(run);
    return chain.current;
  }, [quizKey, clearTimer]);

  // Load once per (user, quiz): reconcile the server copy with the local copy.
  useEffect(() => {
    if (status === 'loading') return;
    let cancelled = false;
    clearTimer();
    pendingDoc.current = null;

    if (status !== 'authenticated' || userId === null) {
      setSyncStatus('off');
      const hadOwner = readSyncMeta(quizKey).ownerId !== null || ownerRef.current !== null;
      ownerRef.current = null;
      lastSavedJson.current = null;
      if (hadOwner) {
        // The session ended: an account's cached progress must not stay on screen or on disk;
        // the visitor's own anonymous progress comes back instead.
        const anonymous = resetToAnonymousProgress(quizKey);
        writeSyncMeta(quizKey, { ownerId: null, dirty: false });
        applyRef.current({ ...EMPTY_STATE, ...anonymous });
      }
      return;
    }

    setSyncStatus('loading');
    ownerRef.current = null;
    lastSavedJson.current = null;

    const finish = (doc: QuizProgressDocument) => {
      lastSavedJson.current = JSON.stringify(doc);
      ownerRef.current = userId;
      writeSyncMeta(quizKey, { ownerId: userId, dirty: false });
      setSyncStatus('synced');
    };

    const load = async () => {
      const meta = readSyncMeta(quizKey);
      // Local progress that no account owns is the visitor's; keep a copy before the account's
      // progress replaces it on screen.
      if (meta.ownerId === null) stashAnonymousProgress(quizKey);
      const ids = itemIdsRef.current;
      try {
        if (meta.ownerId === userId && meta.dirty) {
          const doc = toProgressDocument(snapshotRef.current, ids);
          await saveQuizProgress(quizKey, doc);
          if (!cancelled) finish(doc);
          return;
        }
        const remote = await fetchQuizProgress(quizKey);
        if (cancelled) return;
        if (remote) {
          const mapped = fromProgressDocument(remote.state, ids);
          if (mapped === null) {
            setSyncStatus('error');
            return;
          }
          applyRef.current(mapped);
          finish(toProgressDocument(mapped, ids));
          return;
        }
        let doc: QuizProgressDocument;
        if (meta.ownerId === null || meta.ownerId === userId) {
          doc = toProgressDocument(snapshotRef.current, ids);
        } else {
          // Another account's cached progress must never be uploaded under this account.
          applyRef.current(EMPTY_STATE);
          doc = toProgressDocument(EMPTY_STATE, ids);
        }
        await saveQuizProgress(quizKey, doc);
        if (!cancelled) finish(doc);
      } catch {
        if (!cancelled) setSyncStatus('error');
      }
    };
    void load();

    return () => {
      cancelled = true;
    };
  }, [status, userId, quizKey, clearTimer]);

  // Debounced save of local changes while synced.
  useEffect(() => {
    if (syncStatus !== 'synced' || ownerRef.current === null) return;
    const doc = toProgressDocument(snapshot, itemIds);
    if (JSON.stringify(doc) === lastSavedJson.current) return;
    pendingDoc.current = doc;
    writeSyncMeta(quizKey, { ownerId: ownerRef.current, dirty: true });
    clearTimer();
    timer.current = setTimeout(() => { void sendPending(); }, SAVE_DEBOUNCE_MS);
  }, [snapshot, itemIds, syncStatus, quizKey, clearTimer, sendPending]);

  // Flush on unmount, tab close and logout.
  useEffect(() => {
    const flush = () => sendPending();
    const onPageHide = () => { void sendPending(true); };
    flushers.add(flush);
    window.addEventListener('pagehide', onPageHide);
    return () => {
      flushers.delete(flush);
      window.removeEventListener('pagehide', onPageHide);
      void sendPending();
    };
  }, [sendPending]);

  return { syncStatus };
}
