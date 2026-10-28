import {
  QUIZ_STORAGE_KEYS,
  clearAccountQuizProgress,
  clearLocalQuizState,
  clearSyncMeta,
  readSyncMeta,
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
