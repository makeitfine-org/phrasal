import { useState } from 'react';
import { renderSentenceWithMask } from '../utils/renderSentence';
import { useQuiz } from '../hooks/useQuiz';
import Header from './Header';
import QuizCard from './QuizCard';
import Feedback from './Feedback';
import NavigationControls from './NavigationControls';
import ExcludedModal from './ExcludedModal';
import SearchModal from './SearchModal';
import AllVerbsModal from './AllVerbsModal';
import type { VerbEntry, BrowseVerbEntry } from '../types';

interface PhrasalVerbQuizProps {
  allVerbs: VerbEntry[];
  verbsForBrowse: BrowseVerbEntry[];
}

export default function PhrasalVerbQuiz({ allVerbs, verbsForBrowse }: PhrasalVerbQuizProps) {
  const [showAllVerbsModal, setShowAllVerbsModal] = useState(false);

  const checkAnswer = (input: string, index: number) => {
    const verb = allVerbs[index];
    const cleanUser = input.toLowerCase().trim().replace(/[()]/g, '');
    const cleanCorrect = verb.verb.toLowerCase().trim().replace(/[()]/g, '');
    return cleanUser === cleanCorrect;
  };

  const quiz = useQuiz({
    storageKey: 'phrasalQuizState',
    poolSize: allVerbs.length,
    completionMessage: 'Congratulations! You have completed all available phrasal verbs in this session!',
    checkAnswer,
  }, showAllVerbsModal);

  if (!quiz.ready) return null;

  const currentQ = allVerbs[quiz.currentItem!.index];

  return (
    <div
      className="max-w-2xl mx-auto pt-10 px-4 pb-20"
      onTouchStart={quiz.onTouchStart}
      onTouchMove={quiz.onTouchMove}
      onTouchEnd={quiz.onTouchEnd}
    >
      <Header
        title="Quiz Phrasal Verbs"
        masteredCount={quiz.mastered.size}
        totalCount={allVerbs.length}
        currentIndex={quiz.currentIndex}
        onReset={quiz.handleGlobalReset}
        excludedCount={quiz.excluded.size}
        onShowExcluded={() => quiz.setShowExcludedModal(true)}
        onShowSearch={() => quiz.setShowSearchModal(true)}
        onShowAllVerbs={() => setShowAllVerbsModal(true)}
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
          allVerbs={allVerbs}
          onInclude={quiz.handleIncludeVerb}
          onClose={() => quiz.setShowExcludedModal(false)}
        />
      )}
      {quiz.showSearchModal && (
        <SearchModal
          allVerbs={allVerbs}
          excluded={quiz.excluded}
          onSelect={quiz.handleJumpToVerb}
          onUnexclude={quiz.handleUnexcludeAndJump}
          onClose={() => quiz.setShowSearchModal(false)}
        />
      )}
      {showAllVerbsModal && (
        <AllVerbsModal
          verbs={verbsForBrowse}
          excluded={quiz.excluded}
          onClose={() => setShowAllVerbsModal(false)}
        />
      )}
    </div>
  );
}
