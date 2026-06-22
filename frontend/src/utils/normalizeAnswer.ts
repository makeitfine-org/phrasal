export function normalizeAnswer(s: string): string {
  return s
    .toLowerCase()
    .trim()
    .replace(/[^\w\s]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

export function isAnswerCorrect(userInput: string, correctAnswers: string[]): boolean {
  const normalized = normalizeAnswer(userInput);
  return correctAnswers.some(a => normalizeAnswer(a) === normalized);
}
