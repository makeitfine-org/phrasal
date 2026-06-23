import { fetchListVerbIndex, type ListSearchEntry } from '../data/listVerbIndex';
import { get } from '../api/client';

vi.mock('../api/client', () => ({
  get: vi.fn(),
}));

const MOCK_API_RESPONSE = [
  {
    id: 1,
    verb: 'get',
    label: 'Get',
    particles: ['off', 'on'],
    sections: [
      {
        particle: 'off',
        storageKeyPrefix: 'getOff',
        meanings: [
          { definition: 'To leave or dismount', example: 'Get off the bus.', imageSrc: 'images/default.png', imageAlt: 'alt1' },
          { definition: 'To escape punishment', example: 'He got off lightly.', imageSrc: 'images/default.png', imageAlt: 'alt2' },
        ],
      },
      {
        particle: 'on',
        storageKeyPrefix: 'getOn',
        meanings: [
          { definition: 'To board', example: 'Get on the train.', imageSrc: 'images/default.png', imageAlt: 'alt3' },
        ],
      },
    ],
  },
  {
    id: 2,
    verb: 'make',
    label: 'Make',
    particles: ['up'],
    sections: [
      {
        particle: 'up',
        storageKeyPrefix: 'makeUp',
        meanings: [
          { definition: 'To invent', example: 'Make up a story.', imageSrc: 'images/default.png', imageAlt: 'alt4' },
        ],
      },
    ],
  },
];

describe('fetchListVerbIndex', () => {
  beforeEach(() => {
    vi.mocked(get).mockReset();
    vi.mocked(get).mockResolvedValue(MOCK_API_RESPONSE);
    vi.resetModules();
  });

  async function loadFresh(): Promise<ListSearchEntry[]> {
    const mod = await import('../data/listVerbIndex');
    return mod.fetchListVerbIndex();
  }

  it('calls the correct API endpoint', async () => {
    await loadFresh();
    expect(get).toHaveBeenCalledWith('/verb-details/all');
  });

  it('builds entries for all verbs', async () => {
    const index = await loadFresh();
    const bases = new Set(index.map(e => e.verb.split(' ')[0]));
    expect(bases).toContain('Get');
    expect(bases).toContain('Make');
  });

  it('every entry has a non-empty verb', async () => {
    const index = await loadFresh();
    for (const e of index) {
      expect(e.verb.trim()).not.toBe('');
    }
  });

  it('every entry has a non-empty definition', async () => {
    const index = await loadFresh();
    for (const e of index) {
      expect(e.definition.trim()).not.toBe('');
    }
  });

  it('every entry has a non-empty example', async () => {
    const index = await loadFresh();
    for (const e of index) {
      expect(e.example.trim()).not.toBe('');
    }
  });

  it('every entry has a non-empty route', async () => {
    const index = await loadFresh();
    for (const e of index) {
      expect(e.route.trim()).not.toBe('');
    }
  });

  it('every entry has a non-empty storageKey', async () => {
    const index = await loadFresh();
    for (const e of index) {
      expect(e.storageKey.trim()).not.toBe('');
    }
  });

  it('every entry has a non-empty sectionId', async () => {
    const index = await loadFresh();
    for (const e of index) {
      expect(e.sectionId.trim()).not.toBe('');
    }
  });

  it('every entry has a non-empty entryId', async () => {
    const index = await loadFresh();
    for (const e of index) {
      expect(e.entryId.trim()).not.toBe('');
    }
  });

  it('routes point to the correct verb page', async () => {
    const index = await loadFresh();
    expect(index.find(e => e.verb === 'Get off')?.route).toBe('/phrasal-verbs/list/get');
    expect(index.find(e => e.verb === 'Make up')?.route).toBe('/phrasal-verbs/list/make');
  });

  it('storageKey includes storageKeyPrefix', async () => {
    const index = await loadFresh();
    const entry = index.find(e => e.verb === 'Get off')!;
    expect(entry.storageKey).toContain(entry.sectionId);
  });

  it('storageKey ends with _section_expanded', async () => {
    const index = await loadFresh();
    for (const e of index) {
      expect(e.storageKey).toMatch(/_section_expanded$/);
    }
  });

  it('all entryIds are unique', async () => {
    const index = await loadFresh();
    const ids = index.map(e => e.entryId);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('contains "Get off" entries with multiple meanings', async () => {
    const index = await loadFresh();
    const entries = index.filter(e => e.verb === 'Get off');
    expect(entries.length).toBe(2);
    expect(entries[0].route).toBe('/phrasal-verbs/list/get');
    expect(entries[0].storageKey).toBe('getOff_section_expanded');
    expect(entries[0].sectionId).toBe('getOff');
    expect(entries[0].definition.trim()).not.toBe('');
    expect(entries[0].example.trim()).not.toBe('');
  });

  it('entryId encodes the sectionId and meaning index', async () => {
    const index = await loadFresh();
    const entries = index.filter(e => e.verb === 'Get off');
    expect(entries[0].entryId).toBe('getOff_0');
    expect(entries[1].entryId).toBe('getOff_1');
  });
});
