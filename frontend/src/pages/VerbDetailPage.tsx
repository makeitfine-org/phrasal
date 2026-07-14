import { useParams } from 'react-router-dom';
import VerbPageLayout from '../components/VerbPage';
import { useVerbDetail } from '../hooks/useVerbDetail';
import VerbDetailSkeleton from '../components/skeletons/VerbDetailSkeleton';

export default function VerbDetailPage() {
  const { verb } = useParams<{ verb: string }>();
  const { title, sections, loading, error } = useVerbDetail(verb!);

  if (loading) {
    return <VerbDetailSkeleton />;
  }

  if (error || sections.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center">
        <p className="text-red-500 text-lg">{error ?? 'Verb not found'}</p>
      </div>
    );
  }

  return <VerbPageLayout title={title} sections={sections} />;
}
