import { get } from './client';
import type { GrammarEntry } from '../types';

interface GrammarEntryResponse {
  id: number;
  category: string;
  sentence: string;
  correctAnswers: string[];
  createdAt: string;
  updatedAt: string;
  version: number;
}

interface Page<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
}

export async function fetchGrammarEntries(category: string): Promise<GrammarEntry[]> {
  const page = await get<Page<GrammarEntryResponse>>('/grammar-entries', {
    category,
    size: '1000',
    sort: 'id,asc',
  });

  return page.content.map(r => ({
    sentence: r.sentence,
    correctAnswers: r.correctAnswers,
  }));
}
