import { useGrammarEntries } from '../hooks/useGrammarEntries';
import GrammarQuiz from '../components/GrammarQuiz';

export default function IWishPage() {
  const { entries, loading, error } = useGrammarEntries('i-wish-if-only');

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto pt-10 px-4 pb-20 text-center">
        <p className="text-lg text-gray-600 dark:text-gray-400">Loading grammar exercises...</p>
      </div>
    );
  }

  if (error || entries.length === 0) {
    return (
      <div className="max-w-2xl mx-auto pt-10 px-4 pb-20 text-center">
        <p className="text-lg text-red-600 dark:text-red-400">
          {error ?? 'No grammar entries available'}
        </p>
      </div>
    );
  }

  return <GrammarQuiz entries={entries} />;
}
