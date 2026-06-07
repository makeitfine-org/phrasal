import type { SectionData } from '../components/VerbPage';
import { sections as getSections } from '../pages/get/GetVerbPage';
import { sections as makeSections } from '../pages/make/MakeVerbPage';
import { sections as putSections } from '../pages/put/PutVerbPage';
import { sections as takeSections } from '../pages/take/TakeVerbPage';
import { sections as giveSections } from '../pages/give/GiveVerbPage';
import { sections as goSections } from '../pages/go/GoVerbPage';
import { sections as comeSections } from '../pages/come/ComeVerbPage';

export interface ListSearchEntry {
  verb: string;
  definition: string;
  example: string;
  route: string;
  storageKey: string;
  sectionId: string;
  entryId: string;
}

function buildEntries(sections: SectionData[], baseVerb: string, route: string): ListSearchEntry[] {
  return sections.flatMap(s =>
    s.meanings.map((m, i) => ({
      verb: `${baseVerb} ${s.particle}`,
      definition: m.definition,
      example: m.example,
      route,
      storageKey: s.storageKey,
      sectionId: s.storageKeyPrefix,
      entryId: `${s.storageKeyPrefix}_${i}`,
    }))
  );
}

export const listVerbIndex: ListSearchEntry[] = [
  ...buildEntries(getSections, 'Get', '/phrasal-verbs/list/get'),
  ...buildEntries(makeSections, 'Make', '/phrasal-verbs/list/make'),
  ...buildEntries(putSections, 'Put', '/phrasal-verbs/list/put'),
  ...buildEntries(takeSections, 'Take', '/phrasal-verbs/list/take'),
  ...buildEntries(giveSections, 'Give', '/phrasal-verbs/list/give'),
  ...buildEntries(goSections, 'Go', '/phrasal-verbs/list/go'),
  ...buildEntries(comeSections, 'Come', '/phrasal-verbs/list/come'),
];
