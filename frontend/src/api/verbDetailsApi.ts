import { get } from './client';
import type { SectionData, MeaningData } from '../components/VerbPage';

interface VerbDetailSummaryResponse {
  id: number;
  verb: string;
  label: string;
  particles: string[];
}

interface VerbDetailMeaningResponse {
  definition: string;
  example: string;
  imageSrc: string;
  imageAlt: string;
}

interface VerbDetailSectionResponse {
  particle: string;
  storageKeyPrefix: string;
  meanings: VerbDetailMeaningResponse[];
}

interface VerbDetailResponse {
  id: number;
  verb: string;
  label: string;
  particles: string[];
  sections: VerbDetailSectionResponse[];
}

interface Page<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
}

export interface VerbListItem {
  verb: string;
  label: string;
  particles: string[];
}

export interface VerbDetailData {
  title: string;
  sections: SectionData[];
}

export async function fetchVerbList(): Promise<VerbListItem[]> {
  const page = await get<Page<VerbDetailSummaryResponse>>('/verb-details', {
    size: '100',
    sort: 'verb,asc',
  });
  return page.content.map(r => ({
    verb: r.verb,
    label: r.label,
    particles: r.particles,
  }));
}

export async function fetchVerbDetail(verb: string): Promise<VerbDetailData> {
  const r = await get<VerbDetailResponse>(`/verb-details/by-verb/${encodeURIComponent(verb)}`);
  const base = import.meta.env.BASE_URL;
  const sections: SectionData[] = r.sections.map(s => ({
    particle: s.particle,
    storageKey: `${s.storageKeyPrefix}_section_expanded`,
    storageKeyPrefix: s.storageKeyPrefix,
    meanings: s.meanings.map((m): MeaningData => ({
      definition: m.definition,
      example: m.example,
      imageSrc: `${base}${m.imageSrc}`,
      imageAlt: m.imageAlt,
    })),
  }));
  return { title: r.label, sections };
}
