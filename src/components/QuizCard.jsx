import React from 'react';
import { InfoIcon, LightbulbIcon, PencilIcon } from './Icons.jsx';

export default function QuizCard({
  verb,
  status,
  inputValue,
  revealSentence,
  inputRef,
  onInputChange,
  onSubmit,
  onIdk,
  onToggleReveal,
  renderSentenceWithMask,
  isExcluded,
  onToggleExclude,
}) {
  const hint = `Starts with the letter "${verb.verb.charAt(0)}".`;

  return (
    <div className="p-6 md:p-8 relative">
      <button
        type="button"
        onClick={onToggleExclude}
        className={`absolute top-4 right-4 text-xs font-semibold px-3 py-1 rounded-full border transition-colors ${
          isExcluded
            ? 'bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300 border-red-300 dark:border-red-700 hover:bg-red-200 dark:hover:bg-red-800/60'
            : 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 border-gray-300 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-700'
        }`}
        title={isExcluded ? 'Click to include in quiz' : 'Click to exclude from quiz'}
      >
        {isExcluded ? 'Excluded' : 'Exclude'}
      </button>

      {/* Explanation */}
      <div className="mb-6">
        <h3 className="text-sm font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-2 flex items-center">
          <InfoIcon />
          Explanation:
        </h3>
        <p className="text-lg md:text-xl text-gray-800 dark:text-gray-100 font-medium leading-relaxed bg-indigo-50 dark:bg-indigo-900/20 border-l-4 border-indigo-500 p-4 rounded-r-xl shadow-sm">
          {verb.definition}
        </p>
      </div>

      {/* Hint */}
      <div className="mb-6">
        <h3 className="text-sm font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-2 flex items-center">
          <LightbulbIcon />
          Hint:
        </h3>
        <p className="text-md text-blue-800 dark:text-blue-200 font-medium bg-blue-50 dark:bg-blue-900/30 px-4 py-3 rounded-lg border border-blue-100 dark:border-blue-800/50">
          {hint}
        </p>
      </div>

      {/* Sentence */}
      <div className={`mb-8 ${isExcluded ? 'hidden' : ''}`}>
        <h3 className="text-sm font-bold uppercase tracking-wider text-green-600 dark:text-green-400 mb-2 flex items-center">
          <PencilIcon />
          Sentence:
        </h3>
        <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-100 dark:border-green-800/50 space-y-2">
          {verb.sentences.map((sentence, i) => (
            <p key={i} className="text-lg text-gray-800 dark:text-gray-200 italic">
              {renderSentenceWithMask(
                sentence,
                verb.wordsToHide,
                status !== 'idle' || revealSentence,
                onToggleReveal,
              )}
            </p>
          ))}
        </div>
      </div>

      {/* Input */}
      <form onSubmit={onSubmit} className="relative">
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => onInputChange(e.target.value)}
          disabled={status !== 'idle'}
          placeholder="Type the phrasal verb here..."
          className={`w-full px-5 py-4 rounded-xl border-2 bg-gray-50 dark:bg-gray-900 text-lg focus:outline-none transition-colors ${
            status === 'idle'
              ? 'border-gray-300 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-500 text-gray-900 dark:text-white'
              : status === 'correct'
              ? 'border-green-500 text-green-700 dark:text-green-400'
              : 'border-red-500 text-red-700 dark:text-red-400'
          }`}
          autoComplete="off"
        />
        {status === 'idle' && (
          <div className="absolute right-2 top-2 bottom-2 flex gap-2">
            <button
              type="button"
              onClick={onIdk}
              className="bg-amber-500 hover:bg-amber-600 text-white px-6 rounded-lg font-semibold transition-colors shadow-sm"
            >
              IDK
            </button>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 rounded-lg font-semibold transition-colors shadow-sm"
            >
              Check
            </button>
          </div>
        )}
      </form>
    </div>
  );
}
