import { GrammarEntry } from '../types';

const wishEntries: Omit<GrammarEntry, 'id'>[] = [
  {
    sentence: 'Жаль, что я не прочитал ту документацию по Java на прошлой неделе',
    correctAnswers: ['I wish I had read that Java documentation last week'],
  },
  {
    sentence: 'Я бы хотел, чтобы мой компьютер перестал так медленно работать',
    correctAnswers: ['I wish my computer would stop working so slowly'],
  },
  {
    sentence: 'Если бы только я не забыл сохранить этот файл вчера!',
    correctAnswers: [
      "If only I hadn't forgotten to save this document yesterday",
      "I wish I hadn't forgotten to save this document yesterday",
    ],
  },
];

// Synthetic ids (row index + 1): static reference data, not served by the API.
export const wishData: GrammarEntry[] = wishEntries.map((entry, i) => ({ id: i + 1, ...entry }));
