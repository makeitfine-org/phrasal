import {
  QUIZ_STORAGE_KEYS,
  clearAccountQuizProgress,
  clearLocalQuizState,
  clearSyncMeta,
  readSyncMeta,
  resetToAnonymousProgress,
  restoreAnonymousProgress,
  stashAllAnonymousProgress,
  stashAnonymousProgress,
  writeSyncMeta,
} from '../../utils/quizProgressStorage';

const PV = 'phrasal-verbs';
const GRAMMAR = 'grammar-i-wish-if-only';

const state = (extra: Record<string, unknown> = {}) =>
  JSON.stringify({ mastered: [1], excluded: [2], history: [], currentIndex: 0, ...extra });

beforeEach(() => localStorage.clear());
afterEach(() => vi.unstubAllGlobals());

describe('QUIZ_STORAGE_KEYS', () => {
  it('maps quiz keys to the existing localStorage keys', () => {
    expect(QUIZ_STORAGE_KEYS).toEqual({ 'phrasal-verbs': 'phrasalQuizState', 'grammar-i-wish-if-only': 'grammarIWishState' });
  });
});

describe('sync meta', () => {
  it('defaults when nothing is stored', () => {
    expect(readSyncMeta(PV)).toEqual({ ownerId: null, dirty: false });
  });

  it('round-trips per quiz key', () => {
    writeSyncMeta(PV, { ownerId: 7, dirty: true });
    expect(readSyncMeta(PV)).toEqual({ ownerId: 7, dirty: true });
    expect(readSyncMeta(GRAMMAR)).toEqual({ ownerId: null, dirty: false });
  });

  it.each(['{not json', '[1,2]', '"x"', 'null'])('falls back to defaults for corrupt value %s', (raw) => {
    localStorage.setItem('quizProgressSync', raw);
    expect(readSyncMeta(PV)).toEqual({ ownerId: null, dirty: false });
  });

  it('ignores fields of the wrong type', () => {
    localStorage.setItem('quizProgressSync', JSON.stringify({ [PV]: { ownerId: 'x', dirty: 'yes' } }));
    expect(readSyncMeta(PV)).toEqual({ ownerId: null, dirty: false });
  });

  it('clearSyncMeta removes everything', () => {
    writeSyncMeta(PV, { ownerId: 1, dirty: false });
    clearSyncMeta();
    expect(readSyncMeta(PV)).toEqual({ ownerId: null, dirty: false });
  });

  it('does not throw when storage is blocked', () => {
    const blocked = () => { throw new Error('blocked'); };
    vi.stubGlobal('localStorage', { getItem: blocked, setItem: blocked, removeItem: blocked });
    expect(() => writeSyncMeta(PV, { ownerId: 1, dirty: true })).not.toThrow();
    expect(readSyncMeta(PV)).toEqual({ ownerId: null, dirty: false });
    expect(() => clearSyncMeta()).not.toThrow();
    expect(() => clearLocalQuizState(PV)).not.toThrow();
    expect(() => clearAccountQuizProgress()).not.toThrow();
  });
});

describe('clearLocalQuizState', () => {
  it('removes progress fields but keeps darkMode', () => {
    localStorage.setItem('phrasalQuizState', state({ darkMode: true }));
    clearLocalQuizState(PV);
    expect(JSON.parse(localStorage.getItem('phrasalQuizState')!)).toEqual({ darkMode: true });
  });

  it('does nothing for a missing key or corrupt JSON', () => {
    clearLocalQuizState(PV);
    localStorage.setItem('phrasalQuizState', '{bad');
    clearLocalQuizState(PV);
    expect(localStorage.getItem('phrasalQuizState')).toBe('{bad');
  });
});

describe('clearAccountQuizProgress', () => {
  it('clears only owned keys and keeps anonymous progress', () => {
    localStorage.setItem('phrasalQuizState', state({ darkMode: true }));
    localStorage.setItem('grammarIWishState', state());
    writeSyncMeta(PV, { ownerId: 5, dirty: false });

    clearAccountQuizProgress();

    expect(JSON.parse(localStorage.getItem('phrasalQuizState')!)).toEqual({ darkMode: true });
    expect(JSON.parse(localStorage.getItem('grammarIWishState')!).mastered).toEqual([1]);
    expect(readSyncMeta(PV)).toEqual({ ownerId: null, dirty: false });
  });

  it('leaves all progress alone when no key has an owner', () => {
    localStorage.setItem('phrasalQuizState', state());
    clearAccountQuizProgress();
    expect(JSON.parse(localStorage.getItem('phrasalQuizState')!).mastered).toEqual([1]);
  });
});

describe('anonymous progress backup', () => {
  it('stashes the progress fields only, without darkMode', () => {
    localStorage.setItem('phrasalQuizState', state({ darkMode: true }));
    stashAnonymousProgress(PV);
    expect(JSON.parse(localStorage.getItem('quizProgressAnonymous')!)).toEqual({
      [PV]: { mastered: [1], excluded: [2], history: [], currentIndex: 0 },
    });
  });

  it('keeps one slot per quiz key', () => {
    localStorage.setItem('phrasalQuizState', state());
    localStorage.setItem('grammarIWishState', state({ mastered: [9] }));
    stashAnonymousProgress(PV);
    stashAnonymousProgress(GRAMMAR);
    const all = JSON.parse(localStorage.getItem('quizProgressAnonymous')!);
    expect(all[PV].mastered).toEqual([1]);
    expect(all[GRAMMAR].mastered).toEqual([9]);
  });

  it('an empty local copy drops the slot instead of storing nothing', () => {
    localStorage.setItem('phrasalQuizState', state());
    stashAnonymousProgress(PV);
    localStorage.setItem('phrasalQuizState', JSON.stringify({ darkMode: true }));
    stashAnonymousProgress(PV);
    expect(localStorage.getItem('quizProgressAnonymous')).toBeNull();
  });

  it('restore returns null and writes nothing when no backup exists', () => {
    expect(restoreAnonymousProgress(PV)).toBeNull();
    expect(localStorage.getItem('phrasalQuizState')).toBeNull();
  });

  it.each(['{not json', '[1]', '"x"'])('restore ignores a corrupt backup %s', (raw) => {
    localStorage.setItem('quizProgressAnonymous', raw);
    expect(restoreAnonymousProgress(PV)).toBeNull();
  });

  it('restore merges the backup into the quiz storage and keeps darkMode', () => {
    localStorage.setItem('phrasalQuizState', state({ darkMode: true }));
    stashAnonymousProgress(PV);
    clearLocalQuizState(PV);
    expect(restoreAnonymousProgress(PV)).toEqual({ mastered: [1], excluded: [2], history: [], currentIndex: 0 });
    expect(JSON.parse(localStorage.getItem('phrasalQuizState')!)).toEqual(JSON.parse(state({ darkMode: true })));
  });

  it('resetToAnonymousProgress replaces account progress with the anonymous copy', () => {
    localStorage.setItem('phrasalQuizState', state({ mastered: [1] }));
    stashAnonymousProgress(PV);
    localStorage.setItem('phrasalQuizState', state({ mastered: [77] }));
    resetToAnonymousProgress(PV);
    expect(JSON.parse(localStorage.getItem('phrasalQuizState')!).mastered).toEqual([1]);
  });

  it('resetToAnonymousProgress without a backup leaves no progress', () => {
    localStorage.setItem('phrasalQuizState', state());
    expect(resetToAnonymousProgress(PV)).toBeNull();
    expect(JSON.parse(localStorage.getItem('phrasalQuizState')!)).toEqual({});
  });

  it('clearAccountQuizProgress brings the anonymous copy back on logout', () => {
    localStorage.setItem('phrasalQuizState', state({ mastered: [1] }));
    stashAnonymousProgress(PV);
    localStorage.setItem('phrasalQuizState', state({ mastered: [77] }));
    writeSyncMeta(PV, { ownerId: 5, dirty: false });
    clearAccountQuizProgress();
    expect(JSON.parse(localStorage.getItem('phrasalQuizState')!).mastered).toEqual([1]);
  });

  it('does not throw when storage is blocked', () => {
    const blocked = () => { throw new Error('blocked'); };
    vi.stubGlobal('localStorage', { getItem: blocked, setItem: blocked, removeItem: blocked });
    expect(() => stashAnonymousProgress(PV)).not.toThrow();
    expect(restoreAnonymousProgress(PV)).toBeNull();
  });
});

describe('stashAllAnonymousProgress', () => {
  it('backs up every quiz that no account owns', () => {
    localStorage.setItem('phrasalQuizState', state({ mastered: [1] }));
    localStorage.setItem('grammarIWishState', state({ mastered: [9] }));
    stashAllAnonymousProgress();
    const all = JSON.parse(localStorage.getItem('quizProgressAnonymous')!);
    expect(all[PV].mastered).toEqual([1]);
    expect(all[GRAMMAR].mastered).toEqual([9]);
  });

  it("never backs up a quiz whose local copy belongs to an account", () => {
    localStorage.setItem('phrasalQuizState', state({ mastered: [77] }));
    writeSyncMeta(PV, { ownerId: 5, dirty: false });
    stashAllAnonymousProgress();
    expect(localStorage.getItem('quizProgressAnonymous')).toBeNull();
  });
});
