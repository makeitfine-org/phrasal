import VerbPageLayout, { MeaningData, SectionData } from '../../components/VerbPage';

const base = import.meta.env.BASE_URL;

const againstMeanings: MeaningData[] = [
  {
    definition: 'To be considered a disadvantage or a negative point for someone.',
    example: 'His lack of management experience might count against him in the job interview.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Lack of experience counting against a job applicant',
  },
];

const backMeanings: MeaningData[] = [
  {
    definition: 'To count backwards from a specific number or date to calculate something.',
    example: 'To figure out when the project started, we need to count back six weeks from today.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Counting back weeks on a calendar',
  },
];

const downMeanings: MeaningData[] = [
  {
    definition: 'To say numbers backwards to zero, usually before a big event.',
    example: 'The crowd started to count down from ten before the rocket launch.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Crowd counting down before a rocket launch',
  },
  {
    definition: 'To wait eagerly for an event to happen.',
    example: 'We are counting down the days until our summer holiday.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Counting down the days until summer holiday',
  },
];

const forMeanings: MeaningData[] = [
  {
    definition: 'To have a specific level of importance or value.',
    example: 'Good communication skills count for a lot in a software development team.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Communication skills counting for a lot in a team',
  },
  {
    definition: 'To be worth something (often used with "nothing" or "something").',
    example: 'Does all my hard work count for nothing?',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Hard work counting for nothing',
  },
];

const inMeanings: MeaningData[] = [
  {
    definition: 'To include someone in an activity, group, or plan.',
    example: 'If you are ordering pizza for lunch, please count me in!',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Being counted in for a group pizza order',
  },
];

const offMeanings: MeaningData[] = [
  {
    definition: 'To say numbers aloud in order, usually to divide a group of people into smaller teams.',
    example: 'The coach asked the players to count off by threes.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Players counting off by threes',
  },
];

const onMeanings: MeaningData[] = [
  {
    definition: 'To depend or rely on someone to do something.',
    example: 'You can always count on Sarah to help you finish the report on time.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Relying on a colleague to finish a report on time',
  },
  {
    definition: 'To expect something to happen and base your plans on it.',
    example: "We didn't count on it raining so heavily during our outdoor meeting.",
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Unexpected heavy rain at an outdoor meeting',
  },
];

const outMeanings: MeaningData[] = [
  {
    definition: 'To not include someone in an activity or plan.',
    example: 'I feel too sick to go to the dinner party, so count me out.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Being counted out of a dinner party due to illness',
  },
  {
    definition: 'To count things one by one, often when distributing them (like money).',
    example: 'The cashier slowly counted out the coins and gave me my change.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Cashier counting out coins for change',
  },
  {
    definition: '(In boxing) To declare a fighter defeated because they cannot stand up before the referee counts to ten.',
    example: 'The champion hit him hard, and the referee counted him out.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Referee counting out a boxer',
  },
];

const upMeanings: MeaningData[] = [
  {
    definition: 'To add things together to find the total amount.',
    example: 'Please count up all the expenses from the business trip.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Counting up business trip expenses',
  },
];

export const sections: SectionData[] = [
  { particle: 'against', storageKey: 'countAgainst_section_expanded', storageKeyPrefix: 'countAgainst', meanings: againstMeanings },
  { particle: 'back',    storageKey: 'countBack_section_expanded',    storageKeyPrefix: 'countBack',    meanings: backMeanings },
  { particle: 'down',    storageKey: 'countDown_section_expanded',    storageKeyPrefix: 'countDown',    meanings: downMeanings },
  { particle: 'for',     storageKey: 'countFor_section_expanded',     storageKeyPrefix: 'countFor',     meanings: forMeanings },
  { particle: 'in',      storageKey: 'countIn_section_expanded',      storageKeyPrefix: 'countIn',      meanings: inMeanings },
  { particle: 'off',     storageKey: 'countOff_section_expanded',     storageKeyPrefix: 'countOff',     meanings: offMeanings },
  { particle: 'on',      storageKey: 'countOn_section_expanded',      storageKeyPrefix: 'countOn',      meanings: onMeanings },
  { particle: 'out',     storageKey: 'countOut_section_expanded',     storageKeyPrefix: 'countOut',     meanings: outMeanings },
  { particle: 'up',      storageKey: 'countUp_section_expanded',      storageKeyPrefix: 'countUp',      meanings: upMeanings },
];

export default function CountVerbPage() {
  return <VerbPageLayout title="Count" sections={sections} />;
}
