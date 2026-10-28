import { fetchQuizProgress, saveQuizProgress, type QuizProgressDocument } from '../../api/quizProgressApi';
import { ApiError } from '../../api/client';

const mockFetch = vi.fn();
vi.stubGlobal('fetch', mockFetch);

afterEach(() => {
  mockFetch.mockReset();
  document.cookie = 'XSRF-TOKEN=; max-age=0; path=/';
});

const DOC: QuizProgressDocument = {
  schemaVersion: 1,
  mastered: [1],
  excluded: [2],
  history: [{ id: 1, inputValue: 'x', status: 'correct' }],
  currentIndex: 0,
};
const PROGRESS = { quizKey: 'phrasal-verbs', state: DOC, version: 3, updatedAt: '2026-01-01T00:00:00Z' };

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), { status, headers: { 'Content-Type': 'application/json' } });
}

describe('fetchQuizProgress', () => {
  it('GETs the per-quiz path and returns the object on 200', async () => {
    mockFetch.mockResolvedValue(json(PROGRESS));
    await expect(fetchQuizProgress('phrasal-verbs')).resolves.toEqual(PROGRESS);
    const [url, init] = mockFetch.mock.calls[0];
    expect(url).toContain('/api/v1/me/quiz-progress/phrasal-verbs');
    expect(init.method).toBe('GET');
  });

  it('uses the grammar key in the path', async () => {
    mockFetch.mockResolvedValue(json(PROGRESS));
    await fetchQuizProgress('grammar-i-wish-if-only');
    expect(mockFetch.mock.calls[0][0]).toContain('/me/quiz-progress/grammar-i-wish-if-only');
  });

  it('returns null on 404', async () => {
    mockFetch.mockResolvedValue(json({ title: 'Quiz Progress Not Found' }, 404));
    await expect(fetchQuizProgress('phrasal-verbs')).resolves.toBeNull();
  });

  it.each([401, 500])('rethrows ApiError on %i', async (status) => {
    mockFetch.mockResolvedValue(json({ title: 'x' }, status));
    await expect(fetchQuizProgress('phrasal-verbs')).rejects.toBeInstanceOf(ApiError);
    mockFetch.mockResolvedValue(json({ title: 'x' }, status));
    await expect(fetchQuizProgress('phrasal-verbs')).rejects.toMatchObject({ status });
  });

  it('rethrows network errors', async () => {
    mockFetch.mockRejectedValue(new TypeError('Failed to fetch'));
    await expect(fetchQuizProgress('phrasal-verbs')).rejects.toThrow('Failed to fetch');
  });
});

describe('saveQuizProgress', () => {
  it('PUTs { state } with the CSRF header', async () => {
    document.cookie = 'XSRF-TOKEN=tok; path=/';
    mockFetch.mockResolvedValue(json(PROGRESS));
    await expect(saveQuizProgress('phrasal-verbs', DOC)).resolves.toEqual(PROGRESS);
    const [url, init] = mockFetch.mock.calls[0];
    expect(url).toContain('/api/v1/me/quiz-progress/phrasal-verbs');
    expect(init.method).toBe('PUT');
    expect(JSON.parse(init.body)).toEqual({ state: DOC });
    expect(init.headers['X-XSRF-TOKEN']).toBe('tok');
    expect(init).not.toHaveProperty('keepalive');
  });

  it('passes keepalive when asked', async () => {
    mockFetch.mockResolvedValue(json(PROGRESS));
    await saveQuizProgress('phrasal-verbs', DOC, { keepalive: true });
    expect(mockFetch.mock.calls[0][1].keepalive).toBe(true);
  });

  it('throws ApiError on 401', async () => {
    mockFetch.mockResolvedValue(json({ title: 'Unauthorized' }, 401));
    await expect(saveQuizProgress('phrasal-verbs', DOC)).rejects.toMatchObject({ status: 401 });
  });
});
