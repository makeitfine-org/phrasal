import { listVerbIndex } from '../data/listVerbIndex';

describe('listVerbIndex', () => {
  it('contains entries for all 7 base verbs', () => {
    const bases = new Set(listVerbIndex.map(e => e.verb.split(' ')[0]));
    expect(bases).toContain('Get');
    expect(bases).toContain('Make');
    expect(bases).toContain('Put');
    expect(bases).toContain('Take');
    expect(bases).toContain('Give');
    expect(bases).toContain('Go');
    expect(bases).toContain('Come');
  });

  it('has at least one entry per base verb', () => {
    for (const base of ['Get', 'Make', 'Put', 'Take', 'Give', 'Go', 'Come']) {
      expect(listVerbIndex.filter(e => e.verb.startsWith(`${base} `))).not.toHaveLength(0);
    }
  });

  it('every entry has a non-empty verb', () => {
    for (const e of listVerbIndex) {
      expect(e.verb.trim()).not.toBe('');
    }
  });

  it('every entry has a non-empty definition', () => {
    for (const e of listVerbIndex) {
      expect(e.definition.trim()).not.toBe('');
    }
  });

  it('every entry has a non-empty example', () => {
    for (const e of listVerbIndex) {
      expect(e.example.trim()).not.toBe('');
    }
  });

  it('every entry has a non-empty route', () => {
    for (const e of listVerbIndex) {
      expect(e.route.trim()).not.toBe('');
    }
  });

  it('every entry has a non-empty storageKey', () => {
    for (const e of listVerbIndex) {
      expect(e.storageKey.trim()).not.toBe('');
    }
  });

  it('every entry has a non-empty sectionId', () => {
    for (const e of listVerbIndex) {
      expect(e.sectionId.trim()).not.toBe('');
    }
  });

  it('every entry has a non-empty entryId', () => {
    for (const e of listVerbIndex) {
      expect(e.entryId.trim()).not.toBe('');
    }
  });

  it('routes point to the correct verb page', () => {
    expect(listVerbIndex.find(e => e.verb === 'Get off')?.route).toBe('/phrasal-verbs/list/get');
    expect(listVerbIndex.find(e => e.verb === 'Make up')?.route).toBe('/phrasal-verbs/list/make');
    expect(listVerbIndex.find(e => e.verb === 'Put off')?.route).toBe('/phrasal-verbs/list/put');
    expect(listVerbIndex.find(e => e.verb === 'Take on')?.route).toBe('/phrasal-verbs/list/take');
    expect(listVerbIndex.find(e => e.verb === 'Give up')?.route).toBe('/phrasal-verbs/list/give');
    expect(listVerbIndex.find(e => e.verb === 'Go on')?.route).toBe('/phrasal-verbs/list/go');
    expect(listVerbIndex.find(e => e.verb === 'Come back')?.route).toBe('/phrasal-verbs/list/come');
  });

  it('storageKey includes storageKeyPrefix', () => {
    const entry = listVerbIndex.find(e => e.verb === 'Get off')!;
    expect(entry.storageKey).toContain(entry.sectionId);
  });

  it('storageKey ends with _section_expanded', () => {
    for (const e of listVerbIndex) {
      expect(e.storageKey).toMatch(/_section_expanded$/);
    }
  });

  it('all entryIds are unique', () => {
    const ids = listVerbIndex.map(e => e.entryId);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('contains "Get off" entries with multiple meanings', () => {
    const entries = listVerbIndex.filter(e => e.verb === 'Get off');
    expect(entries.length).toBeGreaterThan(1);
    expect(entries[0].route).toBe('/phrasal-verbs/list/get');
    expect(entries[0].storageKey).toBe('getOff_section_expanded');
    expect(entries[0].sectionId).toBe('getOff');
    expect(entries[0].definition.trim()).not.toBe('');
    expect(entries[0].example.trim()).not.toBe('');
  });

  it('entryId encodes the sectionId and meaning index', () => {
    const entries = listVerbIndex.filter(e => e.verb === 'Get off');
    expect(entries[0].entryId).toBe('getOff_0');
    expect(entries[1].entryId).toBe('getOff_1');
  });
});
