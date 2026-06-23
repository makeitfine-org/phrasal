import { fetchVerbList, fetchVerbDetail } from '../../api/verbDetailsApi';
import { get } from '../../api/client';

vi.mock('../../api/client', () => ({
  get: vi.fn(),
}));

afterEach(() => {
  vi.mocked(get).mockReset();
});

describe('fetchVerbList', () => {
  it('calls GET /verb-details with correct params', async () => {
    vi.mocked(get).mockResolvedValue({
      content: [
        { id: 1, verb: 'act', label: 'Act', particles: ['on', 'up'] },
      ],
      totalElements: 1,
      totalPages: 1,
    });

    const result = await fetchVerbList();

    expect(get).toHaveBeenCalledWith('/verb-details', { size: '100', sort: 'verb,asc' });
    expect(result).toEqual([
      { verb: 'act', label: 'Act', particles: ['on', 'up'] },
    ]);
  });

  it('maps multiple verbs from paginated response', async () => {
    vi.mocked(get).mockResolvedValue({
      content: [
        { id: 1, verb: 'act', label: 'Act', particles: ['on'] },
        { id: 2, verb: 'get', label: 'Get', particles: ['off', 'on'] },
      ],
      totalElements: 2,
      totalPages: 1,
    });

    const result = await fetchVerbList();
    expect(result).toHaveLength(2);
    expect(result[0].verb).toBe('act');
    expect(result[1].verb).toBe('get');
  });
});

describe('fetchVerbDetail', () => {
  it('calls GET /verb-details/by-verb/{verb}', async () => {
    vi.mocked(get).mockResolvedValue({
      id: 1,
      verb: 'get',
      label: 'Get',
      particles: ['off'],
      sections: [
        {
          particle: 'off',
          storageKeyPrefix: 'getOff',
          meanings: [
            { definition: 'To leave', example: 'Get off.', imageSrc: 'images/default.png', imageAlt: 'alt' },
          ],
        },
      ],
    });

    const result = await fetchVerbDetail('get');

    expect(get).toHaveBeenCalledWith('/verb-details/by-verb/get');
    expect(result.title).toBe('Get');
    expect(result.sections).toHaveLength(1);
  });

  it('derives storageKey from storageKeyPrefix', async () => {
    vi.mocked(get).mockResolvedValue({
      id: 1, verb: 'get', label: 'Get', particles: ['off'],
      sections: [{
        particle: 'off',
        storageKeyPrefix: 'getOff',
        meanings: [{ definition: 'd', example: 'e', imageSrc: 'img.png', imageAlt: 'a' }],
      }],
    });

    const result = await fetchVerbDetail('get');
    expect(result.sections[0].storageKey).toBe('getOff_section_expanded');
  });

  it('prepends BASE_URL to imageSrc', async () => {
    vi.mocked(get).mockResolvedValue({
      id: 1, verb: 'get', label: 'Get', particles: ['off'],
      sections: [{
        particle: 'off',
        storageKeyPrefix: 'getOff',
        meanings: [{ definition: 'd', example: 'e', imageSrc: 'images/default.png', imageAlt: 'a' }],
      }],
    });

    const result = await fetchVerbDetail('get');
    expect(result.sections[0].meanings[0].imageSrc).toContain('images/default.png');
  });

  it('encodes verb slug in URL', async () => {
    vi.mocked(get).mockResolvedValue({
      id: 1, verb: 'act', label: 'Act', particles: [],
      sections: [],
    });

    await fetchVerbDetail('act');
    expect(get).toHaveBeenCalledWith('/verb-details/by-verb/act');
  });
});
