import { get } from './client';
import type { VerbEntry, BrowseVerbEntry } from '../types';

interface PhrasalVerbResponse {
  id: number;
  verb: string;
  definition: string;
  sentences: string[];
  wordsToHide: string[];
  isLearned: boolean;
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

  const responses = page.content;

  let quizIndex = 0;
  const allVerbs: VerbEntry[] = [];
  const verbsForBrowse: BrowseVerbEntry[] = [];

  for (const r of responses) {
    const entry: VerbEntry = {
      verb: r.verb,
      definition: r.definition,
      sentences: r.sentences,
      wordsToHide: r.wordsToHide,
    };

    if (!r.isLearned) {
      allVerbs.push(entry);
      verbsForBrowse.push({ ...entry, quizIndex: quizIndex++ });
    } else {
      verbsForBrowse.push({ ...entry });
    }
  }

  return { allVerbs, verbsForBrowse };
}
