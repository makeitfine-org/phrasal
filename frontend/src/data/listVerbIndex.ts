import { get } from '../api/client';

export interface ListSearchEntry {
  verb: string;
  definition: string;
  example: string;
  route: string;
  storageKey: string;
  sectionId: string;
  entryId: string;
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

function buildEntries(sections: VerbDetailSectionResponse[], baseVerb: string, route: string): ListSearchEntry[] {
  return sections.flatMap(s =>
    s.meanings.map((m, i) => ({
      verb: `${baseVerb} ${s.particle}`,
      definition: m.definition,
      example: m.example,
      route,
      storageKey: `${s.storageKeyPrefix}_section_expanded`,
      sectionId: s.storageKeyPrefix,
      entryId: `${s.storageKeyPrefix}_${i}`,
    }))
  );
}

let cachedIndex: ListSearchEntry[] | null = null;

export async function fetchListVerbIndex(): Promise<ListSearchEntry[]> {
  if (cachedIndex) return cachedIndex;

  const verbDetails = await get<VerbDetailResponse[]>('/verb-details/all');

  cachedIndex = verbDetails.flatMap(v =>
    buildEntries(v.sections, v.label, `/phrasal-verbs/list/${v.verb}`)
  );

  return cachedIndex;
}
