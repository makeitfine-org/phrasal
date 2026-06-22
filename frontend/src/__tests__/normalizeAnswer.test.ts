import { normalizeAnswer, isAnswerCorrect } from '../utils/normalizeAnswer';

describe('normalizeAnswer', () => {
  it('lowercases the string', () => {
    expect(normalizeAnswer('Hello World')).toBe('hello world');
  });

  it('trims leading and trailing whitespace', () => {
    expect(normalizeAnswer('  hello  ')).toBe('hello');
  });

  it('strips punctuation', () => {
    expect(normalizeAnswer("If only I hadn't done it.")).toBe('if only i hadnt done it');
  });

  it('collapses multiple spaces to one', () => {
    expect(normalizeAnswer('hello   world')).toBe('hello world');
  });

  it('handles mixed punctuation', () => {
    expect(normalizeAnswer('I wish I had done it!')).toBe('i wish i had done it');
  });

  it('handles apostrophes in contractions', () => {
    expect(normalizeAnswer("I wouldn't do that.")).toBe('i wouldnt do that');
  });
});

describe('isAnswerCorrect', () => {
  const correctAnswers = [
    "If only I hadn't forgotten to save this document yesterday",
    "I wish I hadn't forgotten to save this document yesterday",
  ];

  it('accepts the first correct answer exactly', () => {
    expect(isAnswerCorrect(correctAnswers[0], correctAnswers)).toBe(true);
  });

  it('accepts the second correct answer exactly', () => {
    expect(isAnswerCorrect(correctAnswers[1], correctAnswers)).toBe(true);
  });

  it('accepts an answer with different punctuation', () => {
    expect(isAnswerCorrect("If only I hadn't forgotten to save this document yesterday.", correctAnswers)).toBe(true);
  });

  it('accepts an answer with different casing', () => {
    expect(isAnswerCorrect("IF ONLY I HADN'T FORGOTTEN TO SAVE THIS DOCUMENT YESTERDAY", correctAnswers)).toBe(true);
  });

  it('rejects a wrong answer', () => {
    expect(isAnswerCorrect('I wish I had done something else', correctAnswers)).toBe(false);
  });

  it('rejects an empty answer', () => {
    expect(isAnswerCorrect('', correctAnswers)).toBe(false);
  });

  it('rejects whitespace-only answer', () => {
    expect(isAnswerCorrect('   ', correctAnswers)).toBe(false);
  });
});
