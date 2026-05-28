import React from 'react';

export function renderSentenceWithMask(sentence, wordsToHide, isRevealed, onToggle) {
  if (!wordsToHide || wordsToHide.length === 0) return <span>{sentence}</span>;

  const escapedWords = [...wordsToHide]
    .sort((a, b) => b.length - a.length)
    .map(w => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));

  const regex = new RegExp(`\\b(${escapedWords.join('|')})\\b`, 'gi');
  const parts = sentence.split(regex);

  return (
    <span>
      {parts.map((part, i) => {
        if (i % 2 !== 0) {
          return (
            <span
              key={i}
              onClick={onToggle}
              className={`cursor-pointer px-1 mx-0.5 rounded transition-all duration-300 ${
                isRevealed
                  ? 'bg-yellow-100 dark:bg-yellow-900/40 text-gray-900 dark:text-white border-b-2 border-yellow-400'
                  : 'bg-gray-200 dark:bg-gray-800 text-transparent select-none border-b-2 border-gray-400 dark:border-gray-600'
              }`}
              title={isRevealed ? 'Click to hide' : 'Click to reveal'}
              style={{ textShadow: isRevealed ? 'none' : '0 0 8px rgba(156, 163, 175, 0.5)' }}
            >
              {isRevealed ? part : part.replace(/[a-zA-Z]/g, 'X')}
            </span>
          );
        }
        return <React.Fragment key={i}>{part}</React.Fragment>;
      })}
    </span>
  );
}
