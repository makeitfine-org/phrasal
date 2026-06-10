import type { SectionData } from '../components/VerbPage';
import { sections as getSections } from '../pages/get/GetVerbPage';
import { sections as makeSections } from '../pages/make/MakeVerbPage';
import { sections as putSections } from '../pages/put/PutVerbPage';
import { sections as takeSections } from '../pages/take/TakeVerbPage';
import { sections as giveSections } from '../pages/give/GiveVerbPage';
import { sections as goSections } from '../pages/go/GoVerbPage';
import { sections as comeSections } from '../pages/come/ComeVerbPage';
import { sections as actSections } from '../pages/act/ActVerbPage';
import { sections as cutSections } from '../pages/cut/CutVerbPage';
import { sections as breakSections } from '../pages/break/BreakVerbPage';
import { sections as bringS } from '../pages/bring/BringVerbPage';
import { sections as askSections } from '../pages/ask/AskVerbPage';
import { sections as backSections } from '../pages/back/BackVerbPage';
import { sections as beSections } from '../pages/be/BeVerbPage';
import { sections as blowSections } from '../pages/blow/BlowVerbPage';
import { sections as brushSections } from '../pages/brush/BrushVerbPage';
import { sections as buildSections } from '../pages/build/BuildVerbPage';
import { sections as callSections } from '../pages/call/CallVerbPage';
import { sections as carrySections } from '../pages/carry/CarryVerbPage';
import { sections as catchSections } from '../pages/catch/CatchVerbPage';
import { sections as checkSections } from '../pages/check/CheckVerbPage';
import { sections as cheerSections } from '../pages/cheer/CheerVerbPage';
import { sections as cleanSections } from '../pages/clean/CleanVerbPage';
import { sections as countSections } from '../pages/count/CountVerbPage';
import { sections as dealSections } from '../pages/deal/DealVerbPage';
import { sections as doSections } from '../pages/do/DoVerbPage';
import { sections as dressSections } from '../pages/dress/DressVerbPage';
import { sections as dropSections } from '../pages/drop/DropVerbPage';
import { sections as eatSections } from '../pages/eat/EatVerbPage';
import { sections as fallSections } from '../pages/fall/FallVerbPage';
import { sections as figureSections } from '../pages/figure/FigureVerbPage';
import { sections as fillSections } from '../pages/fill/FillVerbPage';
import { sections as findSections } from '../pages/find/FindVerbPage';
import { sections as growSections } from '../pages/grow/GrowVerbPage';
import { sections as handSections } from '../pages/hand/HandVerbPage';
import { sections as hangSections } from '../pages/hang/HangVerbPage';
import { sections as holdSections } from '../pages/hold/HoldVerbPage';
import { sections as keepSections } from '../pages/keep/KeepVerbPage';
import { sections as knockSections } from '../pages/knock/KnockVerbPage';
import { sections as laySections } from '../pages/lay/LayVerbPage';
import { sections as leaveSections } from '../pages/leave/LeaveVerbPage';

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
  ...buildEntries(actSections, 'Act', '/phrasal-verbs/list/act'),
  ...buildEntries(cutSections, 'Cut', '/phrasal-verbs/list/cut'),
  ...buildEntries(breakSections, 'Break', '/phrasal-verbs/list/break'),
  ...buildEntries(bringS, 'Bring', '/phrasal-verbs/list/bring'),
  ...buildEntries(askSections, 'Ask', '/phrasal-verbs/list/ask'),
  ...buildEntries(backSections, 'Back', '/phrasal-verbs/list/back'),
  ...buildEntries(beSections, 'Be', '/phrasal-verbs/list/be'),
  ...buildEntries(blowSections, 'Blow', '/phrasal-verbs/list/blow'),
  ...buildEntries(brushSections, 'Brush', '/phrasal-verbs/list/brush'),
  ...buildEntries(buildSections, 'Build', '/phrasal-verbs/list/build'),
  ...buildEntries(callSections, 'Call', '/phrasal-verbs/list/call'),
  ...buildEntries(carrySections, 'Carry', '/phrasal-verbs/list/carry'),
  ...buildEntries(catchSections, 'Catch', '/phrasal-verbs/list/catch'),
  ...buildEntries(checkSections, 'Check', '/phrasal-verbs/list/check'),
  ...buildEntries(cheerSections, 'Cheer', '/phrasal-verbs/list/cheer'),
  ...buildEntries(cleanSections, 'Clean', '/phrasal-verbs/list/clean'),
  ...buildEntries(countSections, 'Count', '/phrasal-verbs/list/count'),
  ...buildEntries(dealSections, 'Deal', '/phrasal-verbs/list/deal'),
  ...buildEntries(doSections, 'Do', '/phrasal-verbs/list/do'),
  ...buildEntries(dressSections, 'Dress', '/phrasal-verbs/list/dress'),
  ...buildEntries(dropSections, 'Drop', '/phrasal-verbs/list/drop'),
  ...buildEntries(eatSections, 'Eat', '/phrasal-verbs/list/eat'),
  ...buildEntries(fallSections, 'Fall', '/phrasal-verbs/list/fall'),
  ...buildEntries(figureSections, 'Figure', '/phrasal-verbs/list/figure'),
  ...buildEntries(fillSections, 'Fill', '/phrasal-verbs/list/fill'),
  ...buildEntries(findSections, 'Find', '/phrasal-verbs/list/find'),
  ...buildEntries(growSections, 'Grow', '/phrasal-verbs/list/grow'),
  ...buildEntries(handSections, 'Hand', '/phrasal-verbs/list/hand'),
  ...buildEntries(hangSections, 'Hang', '/phrasal-verbs/list/hang'),
  ...buildEntries(holdSections, 'Hold', '/phrasal-verbs/list/hold'),
  ...buildEntries(keepSections, 'Keep', '/phrasal-verbs/list/keep'),
  ...buildEntries(knockSections, 'Knock', '/phrasal-verbs/list/knock'),
  ...buildEntries(laySections, 'Lay', '/phrasal-verbs/list/lay'),
  ...buildEntries(leaveSections, 'Leave', '/phrasal-verbs/list/leave'),
];
