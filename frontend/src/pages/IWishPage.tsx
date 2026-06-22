import { useState } from 'react';
import { wishData } from '../data/wishData';
import { isAnswerCorrect } from '../utils/normalizeAnswer';
import { renderSentenceWithMask } from '../utils/renderSentence';
import { useQuiz } from '../hooks/useQuiz';
import Header from '../components/Header';
import QuizCard from '../components/QuizCard';
import Feedback from '../components/Feedback';
import NavigationControls from '../components/NavigationControls';
import ExcludedModal from '../components/ExcludedModal';
import SearchModal from '../components/SearchModal';
import TutorialModal from '../components/TutorialModal';
import type { VerbEntry } from '../types';

function entryToVerbEntry(index: number): VerbEntry {
  const entry = wishData[index];
  return {
    verb: entry.correctAnswers[0],
    definition: entry.sentence,
    sentences: [],
    wordsToHide: [],
  };
}

const displayEntries: VerbEntry[] = wishData.map(entry => ({
  verb: entry.sentence,
  definition: entry.correctAnswers[0],
  sentences: [],
  wordsToHide: [],
}));

const checkAnswer = (input: string, index: number) =>
  isAnswerCorrect(input, wishData[index].correctAnswers);

export default function IWishPage() {
  const [showTutorialModal, setShowTutorialModal] = useState(false);

  const quiz = useQuiz({
    storageKey: 'grammarIWishState',
    poolSize: wishData.length,
    completionMessage: 'Congratulations! You have completed all available sentences in this session!',
    checkAnswer,
  }, showTutorialModal);

  if (!quiz.ready) return null;

  const currentQ = entryToVerbEntry(quiz.currentItem!.index);

  return (
    <div
      className="max-w-2xl mx-auto pt-10 px-4 pb-20"
      onTouchStart={quiz.onTouchStart}
      onTouchMove={quiz.onTouchMove}
      onTouchEnd={quiz.onTouchEnd}
    >
      <Header
        masteredCount={quiz.mastered.size}
        totalCount={wishData.length}
        currentIndex={quiz.currentIndex}
        onReset={quiz.handleGlobalReset}
        excludedCount={quiz.excluded.size}
        onShowExcluded={() => quiz.setShowExcludedModal(true)}
        onShowSearch={() => quiz.setShowSearchModal(true)}
        onShowAllVerbs={() => setShowTutorialModal(true)}
        title="I wish / If only"
        searchTitle="Search by sentences"
        excludedTitle="View excluded sentences"
        allVerbsTitle="Tutorial"
      />

      <div className="bg-white dark:bg-gray-850 rounded-2xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-800 transition-all duration-300">
        <div
          className={`h-2 w-full ${
            quiz.status === 'correct' ? 'bg-green-500' : quiz.status === 'wrong' ? 'bg-red-500' : 'bg-blue-500'
          }`}
        />

        <QuizCard
          verb={currentQ}
          status={quiz.status}
          inputValue={quiz.inputValue}
          revealSentence={quiz.revealSentence}
          inputRef={quiz.inputRef}
          onInputChange={quiz.updateInputValue}
          onSubmit={quiz.handleSubmit}
          onIdk={quiz.handleIdk}
          onToggleReveal={() => quiz.setRevealSentence(r => !r)}
          renderSentenceWithMask={renderSentenceWithMask}
          isExcluded={quiz.excluded.has(quiz.currentItem!.index)}
          onToggleExclude={() => quiz.handleToggleExclude(quiz.currentItem!.index)}
        />

        <Feedback status={quiz.status} correctVerb={currentQ.verb} />

        <NavigationControls
          currentIndex={quiz.currentIndex}
          historyLength={quiz.history.length}
          remainingCount={quiz.remainingCount}
          status={quiz.status}
          onPrev={quiz.handlePrev}
          onNext={quiz.handleNext}
          onReset={quiz.resetState}
        />
      </div>

      {quiz.showExcludedModal && (
        <ExcludedModal
          excluded={quiz.excluded}
          allVerbs={displayEntries}
          onInclude={quiz.handleIncludeVerb}
          onClose={() => quiz.setShowExcludedModal(false)}
          itemLabel="Sentences"
        />
      )}
      {quiz.showSearchModal && (
        <SearchModal
          allVerbs={displayEntries}
          excluded={quiz.excluded}
          onSelect={quiz.handleJumpToVerb}
          onUnexclude={quiz.handleUnexcludeAndJump}
          onClose={() => quiz.setShowSearchModal(false)}
          searchPlaceholder="Search by sentences..."
        />
      )}
      {showTutorialModal && (
        <TutorialModal onClose={() => setShowTutorialModal(false)} />
      )}
    </div>
  );
}
