import { usePhrasalVerbs } from './hooks/usePhrasalVerbs';
import PhrasalVerbQuiz from './components/PhrasalVerbQuiz';

export default function App() {
  const { allVerbs, verbsForBrowse, loading, error } = usePhrasalVerbs();

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto pt-10 px-4 pb-20 text-center">
        <p className="text-lg text-gray-600 dark:text-gray-400">Loading phrasal verbs...</p>
      </div>
    );
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
