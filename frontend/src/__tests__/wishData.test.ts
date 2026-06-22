import { wishData } from '../data/wishData';
import { GrammarEntry } from '../types';

describe('wishData', () => {
  it('exports at least 3 entries', () => {
    expect(wishData.length).toBeGreaterThanOrEqual(3);
  });

  it('every entry has a non-empty sentence', () => {
    wishData.forEach((entry: GrammarEntry) => {
      expect(entry.sentence.trim()).not.toBe('');
    });
  });

  it('every entry has at least one correctAnswer', () => {
    wishData.forEach((entry: GrammarEntry) => {
      expect(entry.correctAnswers.length).toBeGreaterThanOrEqual(1);
    });
  });

  it('every correctAnswer is a non-empty string', () => {
    wishData.forEach((entry: GrammarEntry) => {
      entry.correctAnswers.forEach(answer => {
        expect(answer.trim()).not.toBe('');
      });
    });
  });

  it('the third entry (файл) has two accepted answers', () => {
    const entry = wishData.find(e => e.sentence.includes('файл'));
    expect(entry).toBeDefined();
    expect(entry!.correctAnswers.length).toBe(2);
  });
});
