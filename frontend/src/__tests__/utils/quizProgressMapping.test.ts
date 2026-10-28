import { fromProgressDocument, toProgressDocument } from '../../utils/quizProgressMapping';
import type { QuizPersistedState } from '../../types';

const IDS = [10, 20, 30];

const baseDoc = {
  schemaVersion: 1,
  mastered: [],
  excluded: [],
  history: [],
  currentIndex: -1,
};

describe('toProgressDocument', () => {
  it('maps indices to ids, never keeping indices', () => {
    const local: QuizPersistedState = {
      mastered: [1],
      excluded: [0, 2],
      history: [{ index: 1, inputValue: 'x', status: 'correct' }],
      currentIndex: 0,
    };
    const doc = toProgressDocument(local, IDS);
    expect(doc.mastered).toEqual([20]);
    expect(doc.excluded).toEqual([10, 30]);
    expect(doc.history).toEqual([{ id: 20, inputValue: 'x', status: 'correct' }]);
    expect(doc.currentIndex).toBe(0);
    expect(doc.schemaVersion).toBe(1);
  });

  it('drops out-of-range indices', () => {
    const doc = toProgressDocument(
      { mastered: [1, 99], excluded: [-1], history: [{ index: 50, inputValue: '', status: 'idle' }] },
      IDS,
    );
    expect(doc.mastered).toEqual([20]);
    expect(doc.excluded).toEqual([]);
    expect(doc.history).toEqual([]);
  });

  it('turns an empty local state into an empty document', () => {
    expect(toProgressDocument({}, IDS)).toEqual(baseDoc);
  });
});

describe('fromProgressDocument', () => {
  it('round-trips local → document → local', () => {
    const local: QuizPersistedState = {
      mastered: [0],
      excluded: [2],
      history: [
        { index: 1, inputValue: 'a', status: 'wrong' },
        { index: 0, inputValue: 'b', status: 'correct' },
      ],
      currentIndex: 1,
    };
    expect(fromProgressDocument(toProgressDocument(local, IDS), IDS)).toEqual(local);
  });

  it('re-maps ids after content before an item was deleted', () => {
    const doc = { ...baseDoc, mastered: [20], excluded: [30] };
    expect(fromProgressDocument(doc, [10, 30])).toEqual({
      mastered: [],
      excluded: [1],
      history: [],
      currentIndex: -1,
    });
  });

  it('keeps existing state when content is appended; the new item is unseen', () => {
    const doc = { ...baseDoc, mastered: [10], excluded: [20] };
    const result = fromProgressDocument(doc, [10, 20, 30, 40])!;
    expect(result.mastered).toEqual([0]);
    expect(result.excluded).toEqual([1]);
    expect(result.history).toEqual([]);
    expect(result.mastered).not.toContain(3);
  });

  it('removes history items of deleted content and clamps currentIndex', () => {
    const doc = {
      ...baseDoc,
      history: [
        { id: 10, inputValue: '', status: 'correct' },
        { id: 20, inputValue: '', status: 'wrong' },
        { id: 30, inputValue: '', status: 'idle' },
      ],
      currentIndex: 1,
    };
    const result = fromProgressDocument(doc, [10, 30])!;
    expect(result.history!.map(h => h.index)).toEqual([0, 1]);
    expect(result.currentIndex).toBe(1);
  });

  it('keeps the pointer on its item when an earlier item is dropped', () => {
    const doc = {
      ...baseDoc,
      history: [
        { id: 10, inputValue: '', status: 'correct' },
        { id: 20, inputValue: '', status: 'wrong' },
      ],
      currentIndex: 1,
    };
    const result = fromProgressDocument(doc, [20])!;
    expect(result.history).toHaveLength(1);
    expect(result.currentIndex).toBe(0);
  });

  it('falls back to the last remaining item when the current one was deleted', () => {
    const doc = {
      ...baseDoc,
      history: [
        { id: 10, inputValue: '', status: 'correct' },
        { id: 20, inputValue: '', status: 'wrong' },
      ],
      currentIndex: 1,
    };
    expect(fromProgressDocument(doc, [10])!.currentIndex).toBe(0);
  });

  it('clamps an out-of-range currentIndex and keeps -1', () => {
    const history = [{ id: 10, inputValue: '', status: 'correct' }];
    expect(fromProgressDocument({ ...baseDoc, history, currentIndex: 9 }, IDS)!.currentIndex).toBe(0);
    expect(fromProgressDocument({ ...baseDoc, history, currentIndex: -1 }, IDS)!.currentIndex).toBe(-1);
  });

  it('maps an empty document to an empty state', () => {
    expect(fromProgressDocument(baseDoc, IDS)).toEqual({
      mastered: [], excluded: [], history: [], currentIndex: -1,
    });
  });

  it.each([
    ['schemaVersion 2', { ...baseDoc, schemaVersion: 2 }],
    ['null', null],
    ['an array', []],
    ['a string', 'x'],
    ['missing mastered', { ...baseDoc, mastered: undefined }],
    ['non-numeric excluded', { ...baseDoc, excluded: ['a'] }],
    ['missing history', { ...baseDoc, history: undefined }],
    ['a bad history item', { ...baseDoc, history: [{ id: 'x' }] }],
    ['an unknown status', { ...baseDoc, history: [{ id: 10, inputValue: '', status: 'bogus' }] }],
    ['missing currentIndex', { ...baseDoc, currentIndex: undefined }],
  ])('returns null for %s', (_name, doc) => {
    expect(fromProgressDocument(doc, IDS)).toBeNull();
  });
});
