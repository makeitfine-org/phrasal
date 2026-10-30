import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { AuthContext, type AuthContextValue } from '../auth/AuthContext';
import PhrasalVerbQuiz from '../components/PhrasalVerbQuiz';
import GrammarQuiz from '../components/GrammarQuiz';
import * as api from '../api/quizProgressApi';
import type { BrowseVerbEntry, GrammarEntry, VerbEntry } from '../types';

vi.mock('../api/quizProgressApi');

const base: AuthContextValue = {
  status: 'anonymous', user: null,
  login: async () => {}, register: async () => {}, logout: async () => {}, refresh: async () => {},
};
const authed: AuthContextValue = { ...base, status: 'authenticated', user: { id: 1, email: 'a@b.co', role: 'USER', twoFactorEnabled: false, twoFactorEnrollmentRequired: false, hasPassword: true } };

const verbs: VerbEntry[] = [10, 20, 30].map((id, i) => ({
  id, verb: `Verb ${i}`, definition: `Def ${i}`, sentences: [`Sentence ${i}`], wordsToHide: [],
}));
const browse: BrowseVerbEntry[] = verbs.map((v, i) => ({ ...v, quizIndex: i }));
const entries: GrammarEntry[] = [5, 6, 7].map(id => ({ id, sentence: `S${id}`, correctAnswers: [`A${id}`] }));

const progress = (state: object) =>
  ({ quizKey: 'phrasal-verbs', state: { schemaVersion: 1, ...state }, version: 1, updatedAt: '' }) as never;

beforeEach(() => {
  localStorage.clear();
  vi.mocked(api.fetchQuizProgress).mockReset();
  vi.mocked(api.saveQuizProgress).mockReset().mockResolvedValue(progress({}));
});

const withAuth = (value: AuthContextValue, ui: React.ReactElement) =>
  render(<AuthContext.Provider value={value}>{ui}</AuthContext.Provider>);

describe('quiz sync wiring', () => {
  it('anonymous: the phrasal quiz works and never calls the progress API', async () => {
    withAuth(base, <PhrasalVerbQuiz allVerbs={verbs} verbsForBrowse={browse} />);
    expect(await screen.findByTestId('exclude-toggle')).toBeInTheDocument();
    expect(screen.queryByTestId('excluded-count')).not.toBeInTheDocument();
    expect(api.fetchQuizProgress).not.toHaveBeenCalled();
  });

  it('logged in: the server excluded count shows in the phrasal quiz header', async () => {
    vi.mocked(api.fetchQuizProgress).mockResolvedValue(progress({
      mastered: [10, 20], excluded: [10, 20],
      history: [{ id: 30, inputValue: '', status: 'idle' }], currentIndex: 0,
    }));
    withAuth(authed, <PhrasalVerbQuiz allVerbs={verbs} verbsForBrowse={browse} />);
    await waitFor(() => expect(screen.getByTestId('excluded-count')).toHaveTextContent('2'));
    expect(api.fetchQuizProgress).toHaveBeenCalledWith('phrasal-verbs');
  });

  it('logged in: the grammar quiz loads its own quiz key', async () => {
    vi.mocked(api.fetchQuizProgress).mockResolvedValue(progress({
      mastered: [], excluded: [5],
      history: [{ id: 6, inputValue: '', status: 'idle' }], currentIndex: 0,
    }));
    withAuth(authed, <GrammarQuiz entries={entries} />);
    await waitFor(() => expect(screen.getByTestId('excluded-count')).toHaveTextContent('1'));
    expect(api.fetchQuizProgress).toHaveBeenCalledWith('grammar-i-wish-if-only');
  });

  // A Google sign-in ends in a full page load of /: the user appears through the auth check, not AuthContext.login,
  // so stashAllAnonymousProgress never runs and the sync hook has to keep the visitor's progress on its own.
  it('a user who appears on page load: the anonymous progress is stashed and the server copy loads', async () => {
    const anonymous = { mastered: [2], excluded: [2], history: [], currentIndex: -1 };
    localStorage.setItem('phrasalQuizState', JSON.stringify(anonymous));
    vi.mocked(api.fetchQuizProgress).mockResolvedValue(progress({
      mastered: [10, 20], excluded: [10, 20],
      history: [{ id: 30, inputValue: '', status: 'idle' }], currentIndex: 0,
    }));
    const ui = <PhrasalVerbQuiz allVerbs={verbs} verbsForBrowse={browse} />;
    const { rerender } = withAuth({ ...base, status: 'loading' }, ui);
    expect(await screen.findByTestId('exclude-toggle')).toBeInTheDocument();
    expect(api.fetchQuizProgress).not.toHaveBeenCalled();

    rerender(<AuthContext.Provider value={authed}>{ui}</AuthContext.Provider>);
    await waitFor(() => expect(screen.getByTestId('excluded-count')).toHaveTextContent('2'));
    expect(api.fetchQuizProgress).toHaveBeenCalledWith('phrasal-verbs');
    const stash = JSON.parse(localStorage.getItem('quizProgressAnonymous') ?? '{}');
    expect(stash['phrasal-verbs']).toMatchObject({ mastered: [2], excluded: [2] });
    expect(api.saveQuizProgress).not.toHaveBeenCalled();
  });

  it('logged in with a failing server: the quiz still works locally', async () => {
    vi.mocked(api.fetchQuizProgress).mockRejectedValue(new TypeError('offline'));
    withAuth(authed, <PhrasalVerbQuiz allVerbs={verbs} verbsForBrowse={browse} />);
    expect(await screen.findByTestId('exclude-toggle')).toBeInTheDocument();
    expect(api.saveQuizProgress).not.toHaveBeenCalled();
  });
});
