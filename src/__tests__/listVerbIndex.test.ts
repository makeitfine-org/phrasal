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

  it('all sectionIds are unique (no duplicate section IDs)', () => {
    const ids = listVerbIndex.map(e => e.sectionId);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('contains "Get off" entry with correct fields', () => {
    const entry = listVerbIndex.find(e => e.verb === 'Get off');
    expect(entry).toBeDefined();
    expect(entry!.route).toBe('/phrasal-verbs/list/get');
    expect(entry!.storageKey).toBe('getOff_section_expanded');
    expect(entry!.sectionId).toBe('getOff');
    expect(entry!.definition).toBeTruthy();
  });
});
