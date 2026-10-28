import { get, post, put, del, ApiError } from '../../api/client';

const mockFetch = vi.fn();
vi.stubGlobal('fetch', mockFetch);

afterEach(() => {
  mockFetch.mockReset();
  document.cookie = 'XSRF-TOKEN=; max-age=0; path=/';
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
      expect.objectContaining({ credentials: 'same-origin' }),
    );
  });

  it('returns parsed JSON on success', async () => {
    mockFetch.mockResolvedValue(jsonResponse({ content: [1, 2, 3] }));
    const result = await get<{ content: number[] }>('/test');
    expect(result).toEqual({ content: [1, 2, 3] });
  });

  it('appends query params to URL', async () => {
    mockFetch.mockResolvedValue(jsonResponse({}));
    await get('/phrasal-verbs', { size: '1000', q: 'get' });
    const calledUrl = mockFetch.mock.calls[0][0] as string;
    expect(calledUrl).toContain('size=1000');
    expect(calledUrl).toContain('q=get');
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

describe('API client — writes', () => {
  function lastInit() {
    return mockFetch.mock.calls[0][1] as RequestInit & { headers: Record<string, string> };
  }

  it('POST sends method, JSON body, Content-Type and CSRF header', async () => {
    document.cookie = 'XSRF-TOKEN=tok%201; path=/';
    mockFetch.mockResolvedValue(jsonResponse({ id: 1 }));
    const result = await post('/auth/login', { email: 'a@b.c' });
    const init = lastInit();
    expect(result).toEqual({ id: 1 });
    expect(init.method).toBe('POST');
    expect(init.body).toBe(JSON.stringify({ email: 'a@b.c' }));
    expect(init.headers['Content-Type']).toBe('application/json');
    expect(init.headers['X-XSRF-TOKEN']).toBe('tok 1');
    expect(init.credentials).toBe('same-origin');
  });

  it('omits the CSRF header when there is no cookie', async () => {
    mockFetch.mockResolvedValue(jsonResponse({}));
    await post('/x', {});
    expect(lastInit().headers).not.toHaveProperty('X-XSRF-TOKEN');
  });

  it('PUT and DELETE send the CSRF header', async () => {
    document.cookie = 'XSRF-TOKEN=t; path=/';
    mockFetch.mockResolvedValue(new Response(null, { status: 204 }));
    await put('/x/1', { a: 1 });
    await del('/x/1');
    expect(mockFetch.mock.calls[0][1].method).toBe('PUT');
    expect(mockFetch.mock.calls[0][1].headers['X-XSRF-TOKEN']).toBe('t');
    expect(mockFetch.mock.calls[1][1].method).toBe('DELETE');
    expect(mockFetch.mock.calls[1][1].headers['X-XSRF-TOKEN']).toBe('t');
    expect(mockFetch.mock.calls[1][1].headers).not.toHaveProperty('Content-Type');
  });

  it('PUT passes keepalive: true to fetch when requested', async () => {
    mockFetch.mockResolvedValue(jsonResponse({}));
    await put('/x', { a: 1 }, { keepalive: true });
    expect(lastInit().keepalive).toBe(true);
  });

  it('PUT without options sends no keepalive key', async () => {
    mockFetch.mockResolvedValue(jsonResponse({}));
    await put('/x', { a: 1 });
    expect(lastInit()).not.toHaveProperty('keepalive');
  });

  it('returns undefined on 204', async () => {
    mockFetch.mockResolvedValue(new Response(null, { status: 204 }));
    await expect(post('/auth/logout')).resolves.toBeUndefined();
  });

  it('returns undefined on an empty 200 body', async () => {
    mockFetch.mockResolvedValue(new Response('', { status: 200 }));
    await expect(post('/x')).resolves.toBeUndefined();
  });

  it('exposes problem+json field errors on ApiError', async () => {
    mockFetch.mockResolvedValue(
      new Response(JSON.stringify({ title: 'Bad Request', detail: 'Validation failed', errors: { password: 'too short' } }), {
        status: 400,
        statusText: 'Bad Request',
        headers: { 'Content-Type': 'application/problem+json' },
      }),
    );
    await expect(post('/auth/register', {})).rejects.toMatchObject({
      status: 400,
      message: 'Validation failed',
      problem: { errors: { password: 'too short' } },
    });
  });

  it('falls back to title when detail is missing', async () => {
    mockFetch.mockResolvedValue(new Response(JSON.stringify({ title: 'Too Many Requests' }), { status: 429 }));
    await expect(post('/x')).rejects.toMatchObject({ message: 'Too Many Requests' });
  });

  it('401 with an empty body gives ApiError without problem', async () => {
    mockFetch.mockResolvedValue(new Response('', { status: 401, statusText: 'Unauthorized' }));
    const error = await post('/x').catch((e: unknown) => e as ApiError);
    expect(error).toBeInstanceOf(ApiError);
    expect(error.status).toBe(401);
    expect(error.problem).toBeUndefined();
    expect(error.message).toBe('Unauthorized');
  });

  it('a non-JSON error body does not throw a parse error', async () => {
    mockFetch.mockResolvedValue(new Response('<html>oops</html>', { status: 502, statusText: 'Bad Gateway' }));
    await expect(post('/x')).rejects.toMatchObject({ name: 'ApiError', status: 502, message: 'Bad Gateway' });
  });
});
