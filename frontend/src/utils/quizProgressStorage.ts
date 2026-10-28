import type { QuizKey } from '../api/quizProgressApi';

export const QUIZ_STORAGE_KEYS: Record<QuizKey, string> = {
  'phrasal-verbs': 'phrasalQuizState',
  'grammar-i-wish-if-only': 'grammarIWishState',
};

const SYNC_META_KEY = 'quizProgressSync';
const PROGRESS_FIELDS = ['mastered', 'excluded', 'history', 'currentIndex'];

export interface SyncMeta {
  ownerId: number | null;
  dirty: boolean;
}

const DEFAULT_META: SyncMeta = { ownerId: null, dirty: false };

function readAllMeta(): Partial<Record<QuizKey, Partial<SyncMeta>>> {
  try {
    const parsed: unknown = JSON.parse(localStorage.getItem(SYNC_META_KEY) ?? '{}');
    return parsed !== null && typeof parsed === 'object' && !Array.isArray(parsed) ? parsed : {};
  } catch {
    return {};
  }
}

function writeAllMeta(all: Partial<Record<QuizKey, SyncMeta>>): void {
  try {
    localStorage.setItem(SYNC_META_KEY, JSON.stringify(all));
  } catch {
    // storage blocked: the quiz keeps working without sync metadata
  }
}

export function readSyncMeta(key: QuizKey): SyncMeta {
  const raw = readAllMeta()[key];
  return {
    ownerId: typeof raw?.ownerId === 'number' ? raw.ownerId : DEFAULT_META.ownerId,
    dirty: raw?.dirty === true,
  };
}

export function writeSyncMeta(key: QuizKey, meta: SyncMeta): void {
  writeAllMeta({ ...readAllMeta(), [key]: meta } as Partial<Record<QuizKey, SyncMeta>>);
}

export function clearSyncMeta(): void {
  try {
    localStorage.removeItem(SYNC_META_KEY);
  } catch {
    // storage blocked
  }
}

export function clearLocalQuizState(key: QuizKey): void {
  const storageKey = QUIZ_STORAGE_KEYS[key];
  try {
    const parsed: unknown = JSON.parse(localStorage.getItem(storageKey) ?? '{}');
    if (parsed === null || typeof parsed !== 'object' || Array.isArray(parsed)) return;
    const kept = { ...(parsed as Record<string, unknown>) };
    PROGRESS_FIELDS.forEach(field => delete kept[field]);
    localStorage.setItem(storageKey, JSON.stringify(kept));
  } catch {
    // storage blocked or corrupt: nothing to clear
  }
}

// Called on logout: wipes only progress that belongs to an account; anonymous progress stays.
export function clearAccountQuizProgress(): void {
  (Object.keys(QUIZ_STORAGE_KEYS) as QuizKey[]).forEach(key => {
    if (readSyncMeta(key).ownerId !== null) {
      clearLocalQuizState(key);
    }
  });
  clearSyncMeta();
}
