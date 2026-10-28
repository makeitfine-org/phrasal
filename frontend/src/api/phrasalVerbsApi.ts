import { get } from './client';
import type { VerbEntry, BrowseVerbEntry } from '../types';

interface PhrasalVerbResponse {
  id: number;
  verb: string;
  definition: string;
  sentences: string[];
  wordsToHide: string[];
  createdAt: string;
  updatedAt: string;
  version: number;
}

interface Page<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
}

export interface PhrasalVerbsData {
  allVerbs: VerbEntry[];
  verbsForBrowse: BrowseVerbEntry[];
}

export async function fetchPhrasalVerbs(): Promise<PhrasalVerbsData> {
  const page = await get<Page<PhrasalVerbResponse>>('/phrasal-verbs', {
    size: '1000',
    sort: 'id,asc',
  });

  const allVerbs: VerbEntry[] = page.content.map(r => ({
    id: r.id,
    verb: r.verb,
    definition: r.definition,
    sentences: r.sentences,
    wordsToHide: r.wordsToHide,
  }));
  const verbsForBrowse: BrowseVerbEntry[] = allVerbs.map((v, i) => ({ ...v, quizIndex: i }));

  return { allVerbs, verbsForBrowse };
}
