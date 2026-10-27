export type Status = 'idle' | 'correct' | 'wrong';

export interface HistoryItem {
  index: number;
  inputValue: string;
  status: Status;
}

export type RawVerbEntry = [
  string,
  string,
  string | string[],
  string[],
  boolean,
];

export interface VerbEntry {
  verb: string;
  definition: string;
  sentences: string[];
  wordsToHide: string[];
}

export type BrowseVerbEntry = VerbEntry & { quizIndex?: number };

export interface GrammarEntry {
  sentence: string;
  correctAnswers: string[];
}

export interface ProblemDetail {
  type?: string;
  title?: string;
  status?: number;
  detail?: string;
  errors?: Record<string, string>;
}

export type Role = 'USER' | 'ADMIN';

export interface CurrentUser {
  id: number;
  email: string;
  role: Role;
}
