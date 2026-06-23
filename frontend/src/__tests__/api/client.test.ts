import { get, ApiError } from '../../api/client';

const mockFetch = vi.fn();
vi.stubGlobal('fetch', mockFetch);

afterEach(() => {
  mockFetch.mockReset();
});

function jsonResponse(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    statusText: status === 200 ? 'OK' : 'Error',
    headers: { 'Content-Type': 'application/json' },
  });
}

describe('API client — get()', () => {
  it('fetches from /api/v1 base URL', async () => {
    mockFetch.mockResolvedValue(jsonResponse({ ok: true }));
    await get('/phrasal-verbs');
    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining('/api/v1/phrasal-verbs'),
    );
  });

  it('returns parsed JSON on success', async () => {
    mockFetch.mockResolvedValue(jsonResponse({ content: [1, 2, 3] }));
    const result = await get<{ content: number[] }>('/test');
    expect(result).toEqual({ content: [1, 2, 3] });
  });

  it('appends query params to URL', async () => {
    mockFetch.mockResolvedValue(jsonResponse({}));
    await get('/phrasal-verbs', { size: '1000', learned: 'false' });
    const calledUrl = mockFetch.mock.calls[0][0] as string;
    expect(calledUrl).toContain('size=1000');
    expect(calledUrl).toContain('learned=false');
  });

  it('throws ApiError on 404', async () => {
    mockFetch.mockResolvedValue(new Response('', { status: 404, statusText: 'Not Found' }));
    await expect(get('/missing')).rejects.toThrow(ApiError);
    await expect(get('/missing')).rejects.toMatchObject({ status: 404 });
  });

  it('throws ApiError on 500', async () => {
    mockFetch.mockResolvedValue(new Response('', { status: 500, statusText: 'Internal Server Error' }));
    await expect(get('/fail')).rejects.toThrow(ApiError);
    await expect(get('/fail')).rejects.toMatchObject({ status: 500 });
  });

  it('throws on network error', async () => {
    mockFetch.mockRejectedValue(new TypeError('Failed to fetch'));
    await expect(get('/offline')).rejects.toThrow('Failed to fetch');
  });
});
