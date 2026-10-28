import type { QuizProgressDocument } from '../api/quizProgressApi';
import type { HistoryItem, QuizPersistedState, Status } from '../types';

const SCHEMA_VERSION = 1;
const NO_POSITION = -1;
const STATUSES: readonly Status[] = ['idle', 'correct', 'wrong'];

const isIdList = (value: unknown): value is number[] =>
  Array.isArray(value) && value.every(v => typeof v === 'number');

const isHistoryItem = (value: unknown): value is QuizProgressDocument['history'][number] => {
  if (value === null || typeof value !== 'object') return false;
  const item = value as Record<string, unknown>;
  return typeof item.id === 'number'
    && typeof item.inputValue === 'string'
    && STATUSES.includes(item.status as Status);
};

// Local state keeps positions in the item list; the server document keeps stable item ids.
export function toProgressDocument(local: QuizPersistedState, itemIds: number[]): QuizProgressDocument {
  const idAt = (index: number): number | undefined => itemIds[index];
  const toIds = (indices: number[] = []) =>
    indices.map(idAt).filter((id): id is number => id !== undefined);

  const history = (local.history ?? []).flatMap(item => {
    const id = idAt(item.index);
    return id === undefined ? [] : [{ id, inputValue: item.inputValue, status: item.status }];
  });

  return {
    schemaVersion: SCHEMA_VERSION,
    mastered: toIds(local.mastered),
    excluded: toIds(local.excluded),
    history,
    currentIndex: local.currentIndex ?? NO_POSITION,
  };
}

export function fromProgressDocument(doc: unknown, itemIds: number[]): QuizPersistedState | null {
  if (doc === null || typeof doc !== 'object' || Array.isArray(doc)) return null;
  const d = doc as Record<string, unknown>;
  if (d.schemaVersion !== SCHEMA_VERSION) return null;
  if (!isIdList(d.mastered) || !isIdList(d.excluded)) return null;
  if (!Array.isArray(d.history) || !d.history.every(isHistoryItem)) return null;
  if (typeof d.currentIndex !== 'number') return null;

  const indexById = new Map(itemIds.map((id, index) => [id, index]));
  const toIndices = (ids: number[]) =>
    ids.flatMap(id => (indexById.has(id) ? [indexById.get(id)!] : []));

  const history: HistoryItem[] = [];
  let currentIndex = NO_POSITION;
  const pointer = d.currentIndex;
  d.history.forEach((item, position) => {
    const index = indexById.get(item.id);
    if (index === undefined) return;
    history.push({ index, inputValue: item.inputValue, status: item.status });
    if (position === pointer) currentIndex = history.length - 1;
  });
  // The pointed item was dropped (or the pointer is out of range): fall back to the last remaining item.
  if (pointer >= 0 && currentIndex === NO_POSITION) currentIndex = history.length - 1;

  return {
    mastered: toIndices(d.mastered),
    excluded: toIndices(d.excluded),
    history,
    currentIndex,
  };
}
