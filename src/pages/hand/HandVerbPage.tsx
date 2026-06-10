import VerbPageLayout, { MeaningData, SectionData } from '../../components/VerbPage';

const base = import.meta.env.BASE_URL;

const backMeanings: MeaningData[] = [
  {
    definition: 'To return something to the person who owned it or gave it to you.',
    example: 'After reviewing the code, please hand back the printed reports to the project manager.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Handing back printed reports to the project manager after reviewing the code',
  },
];

const downMeanings: MeaningData[] = [
  {
    definition: 'To pass knowledge, traditions, or items from an older person to a younger person (or from a predecessor to a successor).',
    example: 'The retiring CEO handed down his leadership principles to the new management team.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Retiring CEO handing down leadership principles to the new management team',
  },
  {
    definition: 'To officially announce a formal or legal decision.',
    example: 'The board of directors will hand down their final decision on the software budget next week.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Board of directors handing down their final decision on the software budget',
  },
];

const inMeanings: MeaningData[] = [
  {
    definition: 'To submit something or give it to a person in authority (like a boss, teacher, or official).',
    example: 'He decided to hand in his resignation because he found a new job in software development.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person handing in their resignation after finding a new job in software development',
  },
];

const offMeanings: MeaningData[] = [
  {
    definition: 'To pass the responsibility, control, or execution of a task to someone else.',
    example: 'I will hand off the server maintenance tasks to the junior Java developers tomorrow.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Handing off server maintenance tasks to junior Java developers',
  },
];

const onMeanings: MeaningData[] = [
  {
    definition: 'To give something to the next person, often in a sequence (similar to passing a message or object along).',
    example: 'Please read this project update and hand it on to the rest of the management team.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Handing on a project update to the rest of the management team',
  },
];

const outMeanings: MeaningData[] = [
  {
    definition: 'To distribute something to multiple people in a group.',
    example: 'The team leader handed out the new coding guidelines during the meeting.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Team leader handing out new coding guidelines during the meeting',
  },
];

const overMeanings: MeaningData[] = [
  {
    definition: 'To give control, responsibility, or ownership of something to someone else.',
    example: 'When the project is finished, we will hand over the new application to the client.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Handing over the new application to the client when the project is finished',
  },
  {
    definition: 'To give something to someone because they demand it (often formal or forced).',
    example: 'The security guard asked him to hand over his company ID card.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Security guard asking someone to hand over their company ID card',
  },
];

const aroundMeanings: MeaningData[] = [
  {
    definition: 'To offer or pass something to each person in a group.',
    example: 'They handed around the new smartphones so the development team could test them.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Handing around new smartphones for the development team to test',
  },
];

const toMeanings: MeaningData[] = [
  {
    definition: 'Used in the phrase "have to hand it to someone" — to admit that someone has done something very well and give them credit for it.',
    example: 'You have to hand it to her; she managed that difficult software project perfectly.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Giving credit to someone who managed a difficult software project perfectly',
  },
];

export const sections: SectionData[] = [
  { particle: 'back',                storageKey: 'handBack_section_expanded',    storageKeyPrefix: 'handBack',    meanings: backMeanings },
  { particle: 'down',                storageKey: 'handDown_section_expanded',    storageKeyPrefix: 'handDown',    meanings: downMeanings },
  { particle: 'in',                  storageKey: 'handIn_section_expanded',      storageKeyPrefix: 'handIn',      meanings: inMeanings },
  { particle: 'off',                 storageKey: 'handOff_section_expanded',     storageKeyPrefix: 'handOff',     meanings: offMeanings },
  { particle: 'on',                  storageKey: 'handOn_section_expanded',      storageKeyPrefix: 'handOn',      meanings: onMeanings },
  { particle: 'out',                 storageKey: 'handOut_section_expanded',     storageKeyPrefix: 'handOut',     meanings: outMeanings },
  { particle: 'over',                storageKey: 'handOver_section_expanded',    storageKeyPrefix: 'handOver',    meanings: overMeanings },
  { particle: 'around / round / about', storageKey: 'handAround_section_expanded', storageKeyPrefix: 'handAround', meanings: aroundMeanings },
  { particle: 'to',                  storageKey: 'handTo_section_expanded',      storageKeyPrefix: 'handTo',      meanings: toMeanings },
];

export default function HandVerbPage() {
  return <VerbPageLayout title="Hand" sections={sections} />;
}
