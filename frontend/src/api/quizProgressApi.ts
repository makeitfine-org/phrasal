import { ApiError, get, put } from './client';
import type { Status } from '../types';

export type QuizKey = 'phrasal-verbs' | 'grammar-i-wish-if-only';

export interface QuizProgressDocument {
  schemaVersion: 1;
  mastered: number[];
  excluded: number[];
  history: { id: number; inputValue: string; status: Status }[];
  currentIndex: number;
}

export interface QuizProgress {
  quizKey: QuizKey;
  state: QuizProgressDocument;
  version: number;
  updatedAt: string;
}

const NOT_FOUND = 404;

const progressPath = (key: QuizKey) => `/me/quiz-progress/${key}`;

export async function fetchQuizProgress(key: QuizKey): Promise<QuizProgress | null> {
  try {
    return await get<QuizProgress>(progressPath(key));
  } catch (error) {
    if (error instanceof ApiError && error.status === NOT_FOUND) {
      return null;
    }
    throw error;
  }
}

export function saveQuizProgress(
  key: QuizKey,
  state: QuizProgressDocument,
  options?: { keepalive?: boolean },
): Promise<QuizProgress> {
  return put<QuizProgress>(progressPath(key), { state }, options);
}
