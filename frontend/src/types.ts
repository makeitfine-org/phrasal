export type Status = 'idle' | 'correct' | 'wrong';

export interface HistoryItem {
  index: number;
  inputValue: string;
  status: Status;
}

export interface QuizPersistedState {
  mastered?: number[];
  excluded?: number[];
  history?: HistoryItem[];
  currentIndex?: number;
}

export type RawVerbEntry = [
  string,
  string,
  string | string[],
  string[],
  boolean, // seed flag, unused
];

export interface VerbEntry {
  id: number;
  verb: string;
  definition: string;
  sentences: string[];
  wordsToHide: string[];
}

export type BrowseVerbEntry = VerbEntry & { quizIndex: number };

export interface GrammarEntry {
  id: number;
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
  twoFactorEnabled: boolean;
  twoFactorEnrollmentRequired: boolean;
  /** `false` for an account created by Google sign-in until a password is set by email. */
  hasPassword: boolean;
}

export interface AuthProviders {
  google: boolean;
}

export interface TwoFactorStatus {
  enabled: boolean;
  enabledAt: string | null;
  recoveryCodesRemaining: number;
}

export interface TwoFactorSetup {
  secret: string;
  otpauthUri: string;
}

export interface RecoveryCodes {
  recoveryCodes: string[];
}
