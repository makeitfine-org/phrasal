import type { QuizKey } from '../api/quizProgressApi';

export const QUIZ_STORAGE_KEYS: Record<QuizKey, string> = {
  'phrasal-verbs': 'phrasalQuizState',
  'grammar-i-wish-if-only': 'grammarIWishState',
};

const SYNC_META_KEY = 'quizProgressSync';
const ANON_BACKUP_KEY = 'quizProgressAnonymous';
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

type AnonBackups = Partial<Record<QuizKey, Record<string, unknown>>>;

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function readAnonBackups(): AnonBackups {
  try {
    const parsed: unknown = JSON.parse(localStorage.getItem(ANON_BACKUP_KEY) ?? '{}');
    return isPlainObject(parsed) ? parsed : {};
  } catch {
    return {};
  }
}

function writeAnonBackups(all: AnonBackups): void {
  try {
    if (Object.keys(all).length === 0) localStorage.removeItem(ANON_BACKUP_KEY);
    else localStorage.setItem(ANON_BACKUP_KEY, JSON.stringify(all));
  } catch {
    // storage blocked: the anonymous copy is simply not kept
  }
}

function readProgressFields(key: QuizKey): Record<string, unknown> {
  try {
    const parsed: unknown = JSON.parse(localStorage.getItem(QUIZ_STORAGE_KEYS[key]) ?? '{}');
    if (!isPlainObject(parsed)) return {};
    return Object.fromEntries(PROGRESS_FIELDS.filter(f => f in parsed).map(f => [f, parsed[f]]));
  } catch {
    return {};
  }
}

// Keeps the anonymous visitor's progress in a separate slot so that signing in cannot lose it.
// Only call while the local copy is anonymous (no account owns it); an empty copy drops the slot.
export function stashAnonymousProgress(key: QuizKey): void {
  const others = { ...readAnonBackups() };
  delete others[key];
  const fields = readProgressFields(key);
  writeAnonBackups(Object.keys(fields).length > 0 ? { ...others, [key]: fields } : others);
}

// Called right before a login: backs up every quiz whose local copy still belongs to the visitor.
export function stashAllAnonymousProgress(): void {
  (Object.keys(QUIZ_STORAGE_KEYS) as QuizKey[]).forEach(key => {
    if (readSyncMeta(key).ownerId === null) {
      stashAnonymousProgress(key);
    }
  });
}

// Puts the stashed anonymous progress back into the quiz storage and returns it (null if none).
export function restoreAnonymousProgress(key: QuizKey): Record<string, unknown> | null {
  const fields = readAnonBackups()[key];
  if (!isPlainObject(fields) || Object.keys(fields).length === 0) return null;
  try {
    const existing: unknown = JSON.parse(localStorage.getItem(QUIZ_STORAGE_KEYS[key]) ?? '{}');
    const base = isPlainObject(existing) ? existing : {};
    localStorage.setItem(QUIZ_STORAGE_KEYS[key], JSON.stringify({ ...base, ...fields }));
  } catch {
    return null;
  }
  return fields;
}

// Leaves an account: wipes its cached progress and brings the anonymous progress back.
export function resetToAnonymousProgress(key: QuizKey): Record<string, unknown> | null {
  clearLocalQuizState(key);
  return restoreAnonymousProgress(key);
}

// Called on logout: swaps account progress for the anonymous copy; anonymous-only keys stay as is.
export function clearAccountQuizProgress(): void {
  (Object.keys(QUIZ_STORAGE_KEYS) as QuizKey[]).forEach(key => {
    if (readSyncMeta(key).ownerId !== null) {
      resetToAnonymousProgress(key);
    }
  });
  clearSyncMeta();
}
