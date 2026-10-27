import type { ProblemDetail } from '../types';
import { readCookie } from '../utils/cookies';

const BASE_URL = '/api/v1';
const CSRF_COOKIE = 'XSRF-TOKEN';
const CSRF_HEADER = 'X-XSRF-TOKEN';

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
    public problem?: ProblemDetail,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

interface RequestOptions {
  params?: Record<string, string>;
  body?: unknown;
}

async function readProblem(response: Response): Promise<ProblemDetail | undefined> {
  try {
    const parsed: unknown = JSON.parse(await response.text());
    return parsed !== null && typeof parsed === 'object' ? (parsed as ProblemDetail) : undefined;
  } catch {
    return undefined;
  }
}

async function request<T>(method: string, path: string, options: RequestOptions = {}): Promise<T> {
  const url = new URL(`${BASE_URL}${path}`, window.location.origin);
  if (options.params) {
    Object.entries(options.params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.set(key, value);
      }
    });
  }

  const headers: Record<string, string> = {};
  const init: RequestInit = { method, credentials: 'same-origin', headers };
  if (method !== 'GET') {
    if (options.body !== undefined) {
      headers['Content-Type'] = 'application/json';
      init.body = JSON.stringify(options.body);
    }
    const token = readCookie(CSRF_COOKIE);
    if (token) {
      headers[CSRF_HEADER] = token;
    }
  }

  const response = await fetch(url.toString(), init);

  if (!response.ok) {
    const problem = await readProblem(response);
    const message = problem?.detail ?? problem?.title ?? response.statusText;
    throw new ApiError(response.status, message || `Request failed: ${response.status}`, problem);
  }

  if (response.status === 204) {
    return undefined as T;
  }
  const text = await response.text();
  return (text ? JSON.parse(text) : undefined) as T;
}

export function get<T>(path: string, params?: Record<string, string>): Promise<T> {
  return request<T>('GET', path, { params });
}

export function post<T>(path: string, body?: unknown): Promise<T> {
  return request<T>('POST', path, { body });
}

export function put<T>(path: string, body?: unknown): Promise<T> {
  return request<T>('PUT', path, { body });
}

export function del<T>(path: string): Promise<T> {
  return request<T>('DELETE', path);
}
