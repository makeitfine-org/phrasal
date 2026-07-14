import { usePhrasalVerbs } from './hooks/usePhrasalVerbs';
import PhrasalVerbQuiz from './components/PhrasalVerbQuiz';
import QuizSkeleton from './components/skeletons/QuizSkeleton';

export default function App() {
  const { allVerbs, verbsForBrowse, loading, error } = usePhrasalVerbs();

  if (loading) {
    return <QuizSkeleton />;
  }

  if (error || allVerbs.length === 0) {
    return (
      <div className="max-w-2xl mx-auto pt-10 px-4 pb-20 text-center">
        <p className="text-lg text-red-600 dark:text-red-400">
          {error ?? 'No phrasal verbs available'}
        </p>
      </div>
    );
  }

  return <PhrasalVerbQuiz allVerbs={allVerbs} verbsForBrowse={verbsForBrowse} />;
}
