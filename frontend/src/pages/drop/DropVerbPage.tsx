import VerbPageLayout, { MeaningData, SectionData } from '../../components/VerbPage';

const base = import.meta.env.BASE_URL;

const acrossMeanings: MeaningData[] = [
  {
    definition: 'To happen to find or meet (very rare / old-fashioned; "come across" is almost always preferred today).',
    example: 'I dropped across an old project file on the server.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person unexpectedly finding an old project file',
  },
];

const aroundMeanings: MeaningData[] = [
  {
    definition: 'To visit someone informally.',
    example: 'I will drop round the office tomorrow to sign the final contracts.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person making an informal visit to the office',
  },
];

const awayMeanings: MeaningData[] = [
  {
    definition: 'To become weaker, smaller, or gradually disappear.',
    example: 'Public interest in the old software version slowly dropped away.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Graph showing declining public interest over time',
  },
];

const backMeanings: MeaningData[] = [
  {
    definition: 'To return to a lower position or level.',
    example: 'Our company\'s market share dropped back to second place this quarter.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Chart showing a company\'s market share dropping back to second place',
  },
  {
    definition: 'To move into a position behind someone else (like in a race).',
    example: 'The runner dropped back because he was exhausted.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Exhausted runner falling behind others in a race',
  },
];

const behindMeanings: MeaningData[] = [
  {
    definition: 'To fail to keep up with others; to fall behind a schedule.',
    example: 'We have dropped behind schedule on the latest software release.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Team falling behind schedule on a software release',
  },
];

const byMeanings: MeaningData[] = [
  {
    definition: 'To make a short, informal visit (similar to "drop in").',
    example: 'Please drop by my desk later so we can discuss the leadership training.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person making a brief informal visit to a colleague\'s desk',
  },
];

const downMeanings: MeaningData[] = [
  {
    definition: 'To fall or move to a lower position.',
    example: 'Please select your country from the drop-down menu in the application.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'User selecting a country from a drop-down menu in an application',
  },
];

const inMeanings: MeaningData[] = [
  {
    definition: 'To make a short, informal visit without arranging it in advance.',
    example: 'Feel free to drop in if you have any questions about the new code.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person dropping in for an unplanned visit to ask questions',
  },
];

const intoMeanings: MeaningData[] = [
  {
    definition: 'To visit a place briefly.',
    example: 'I will drop into the IT department to pick up my new laptop.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person briefly visiting the IT department to collect a laptop',
  },
  {
    definition: 'To accidentally fall into a habit or state.',
    example: 'It is easy to drop into bad coding habits if you don\'t do code reviews.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Developer falling into bad coding habits without code reviews',
  },
];

const offMeanings: MeaningData[] = [
  {
    definition: 'To take someone or something to a place and leave them there.',
    example: 'I will drop off the management report at your office tomorrow.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person leaving a management report at an office',
  },
  {
    definition: 'To decrease in level, amount, or quality.',
    example: 'Software sales usually drop off during the summer holidays.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Graph showing software sales declining during summer holidays',
  },
  {
    definition: 'To fall asleep.',
    example: 'The presentation was so boring that a few people dropped off.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'People falling asleep during a boring presentation',
  },
];

const onMeanings: MeaningData[] = [
  {
    definition: 'To criticize or punish someone suddenly (mainly UK, informal).',
    example: 'The boss dropped on the development team for missing the deadline.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Boss criticizing the development team for missing a deadline',
  },
  {
    definition: 'To accidentally meet someone or find something (informal).',
    example: 'We dropped on a great solution for the Java bug.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Team accidentally discovering a solution to a Java bug',
  },
];

const outMeanings: MeaningData[] = [
  {
    definition: 'To stop participating or being involved in something.',
    example: 'One of our main investors dropped out of the project.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Investor deciding to leave a project',
  },
  {
    definition: 'To leave a school, college, or course before finishing.',
    example: 'He dropped out of his business degree to start his own company.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Student leaving university to start a business',
  },
];

const overMeanings: MeaningData[] = [
  {
    definition: 'To visit someone informally at their location (often their home).',
    example: 'Why don\'t you drop over later to review the Java architecture together?',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person visiting a colleague informally to review architecture',
  },
];

const throughMeanings: MeaningData[] = [
  {
    definition: 'To fail to happen or fail to be completed ("fall through" is much more common but "drop through" is sometimes used).',
    example: 'The business merger dropped through at the last minute.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Business merger falling through at the last minute',
  },
];

const toMeanings: MeaningData[] = [
  {
    definition: 'To decrease to a specific level or amount.',
    example: 'The server response time dropped to 50 milliseconds after the update.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Server response time decreasing to 50 milliseconds after an update',
  },
];

export const sections: SectionData[] = [
  { particle: 'across',        storageKey: 'dropAcross_section_expanded',  storageKeyPrefix: 'dropAcross',  meanings: acrossMeanings },
  { particle: 'around / round', storageKey: 'dropAround_section_expanded',  storageKeyPrefix: 'dropAround',  meanings: aroundMeanings },
  { particle: 'away',          storageKey: 'dropAway_section_expanded',    storageKeyPrefix: 'dropAway',    meanings: awayMeanings },
  { particle: 'back',          storageKey: 'dropBack_section_expanded',    storageKeyPrefix: 'dropBack',    meanings: backMeanings },
  { particle: 'behind',        storageKey: 'dropBehind_section_expanded',  storageKeyPrefix: 'dropBehind',  meanings: behindMeanings },
  { particle: 'by',            storageKey: 'dropBy_section_expanded',      storageKeyPrefix: 'dropBy',      meanings: byMeanings },
  { particle: 'down',          storageKey: 'dropDown_section_expanded',    storageKeyPrefix: 'dropDown',    meanings: downMeanings },
  { particle: 'in',            storageKey: 'dropIn_section_expanded',      storageKeyPrefix: 'dropIn',      meanings: inMeanings },
  { particle: 'into',          storageKey: 'dropInto_section_expanded',    storageKeyPrefix: 'dropInto',    meanings: intoMeanings },
  { particle: 'off',           storageKey: 'dropOff_section_expanded',     storageKeyPrefix: 'dropOff',     meanings: offMeanings },
  { particle: 'on',            storageKey: 'dropOn_section_expanded',      storageKeyPrefix: 'dropOn',      meanings: onMeanings },
  { particle: 'out',           storageKey: 'dropOut_section_expanded',     storageKeyPrefix: 'dropOut',     meanings: outMeanings },
  { particle: 'over',          storageKey: 'dropOver_section_expanded',    storageKeyPrefix: 'dropOver',    meanings: overMeanings },
  { particle: 'through',       storageKey: 'dropThrough_section_expanded', storageKeyPrefix: 'dropThrough', meanings: throughMeanings },
  { particle: 'to',            storageKey: 'dropTo_section_expanded',      storageKeyPrefix: 'dropTo',      meanings: toMeanings },
];

export default function DropVerbPage() {
  return <VerbPageLayout title="Drop" sections={sections} />;
}
