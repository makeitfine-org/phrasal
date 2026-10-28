import { fetchPhrasalVerbs } from '../../api/phrasalVerbsApi';

const mockFetch = vi.fn();
vi.stubGlobal('fetch', mockFetch);

afterEach(() => mockFetch.mockReset());

function page(content: unknown[]) {
  return new Response(JSON.stringify({ content, totalElements: content.length, totalPages: 1 }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}

const row = (id: number, verb: string) => ({
  id, verb, definition: 'd', sentences: ['s'], wordsToHide: ['w'],
  createdAt: '', updatedAt: '', version: 0,
});

describe('fetchPhrasalVerbs', () => {
  it('carries server ids and puts every verb into allVerbs', async () => {
    mockFetch.mockResolvedValue(page([row(10, 'Act out'), row(20, 'Act up'), row(30, 'Back up')]));
    const { allVerbs } = await fetchPhrasalVerbs();
    expect(allVerbs.map(v => v.id)).toEqual([10, 20, 30]);
    expect(allVerbs.map(v => v.verb)).toEqual(['Act out', 'Act up', 'Back up']);
  });

  it('numbers verbsForBrowse by position', async () => {
    mockFetch.mockResolvedValue(page([row(10, 'A'), row(20, 'B'), row(30, 'C')]));
    const { verbsForBrowse } = await fetchPhrasalVerbs();
    verbsForBrowse.forEach((v, i) => expect(v.quizIndex).toBe(i));
    expect(verbsForBrowse.map(v => v.id)).toEqual([10, 20, 30]);
  });

  it('requests id-ascending order and no learned filter', async () => {
    mockFetch.mockResolvedValue(page([]));
    await fetchPhrasalVerbs();
    const url = mockFetch.mock.calls[0][0] as string;
    expect(url).toContain('sort=id%2Casc');
    expect(url).not.toContain('learned');
  });

  it('returns empty lists for an empty page', async () => {
    mockFetch.mockResolvedValue(page([]));
    expect(await fetchPhrasalVerbs()).toEqual({ allVerbs: [], verbsForBrowse: [] });
  });
});
