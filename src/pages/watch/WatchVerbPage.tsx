import VerbPageLayout, { MeaningData, SectionData } from '../../components/VerbPage';

const base = import.meta.env.BASE_URL;

const backMeanings: MeaningData[] = [
  {
    definition: 'To view a video, film, or recording of a previous event, often for review or analysis.',
    example: 'We recorded the interview so we could watch it back later and take notes.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Watching back a recorded interview for review',
  },
];

const forMeanings: MeaningData[] = [
  {
    definition: 'To look actively for a sign, event, or specific thing to happen.',
    example: 'Keep driving, and watch for the exit sign just past the bridge.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Watching for an exit sign while driving',
  },
];

const onMeanings: MeaningData[] = [
  {
    definition: 'To observe something happening, often dramatic or serious, without becoming actively involved.',
    example: 'A large crowd gathered and watched on in shock as the building burned.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Crowd watching on in shock as a building burns',
  },
];

const outMeanings: MeaningData[] = [
  {
    definition: 'To be careful and pay attention to immediate danger (usually used as an exclamation or warning).',
    example: 'Watch out! There is a car coming right at us.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Warning to watch out for an oncoming car',
  },
];

const outForMeanings: MeaningData[] = [
  {
    definition: 'To be alert to the danger or presence of something or someone.',
    example: 'If you go hiking in those woods, watch out for bears.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Watching out for bears while hiking in the woods',
  },
  {
    definition: 'To protect someone or look after their best interests.',
    example: 'Older siblings usually watch out for the younger ones at school.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Older siblings watching out for younger ones at school',
  },
  {
    definition: 'To wait expectantly for something to arrive or appear.',
    example: 'Watch out for the postman; I am expecting an important package today.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Watching out for the postman while expecting a package',
  },
];

const overMeanings: MeaningData[] = [
  {
    definition: 'To protect, guard, or care for someone or something.',
    example: 'The shepherd watched over his flock of sheep through the night.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Shepherd watching over his flock of sheep through the night',
  },
  {
    definition: 'To strictly supervise someone or an activity to ensure it is done correctly.',
    example: 'The manager stood at the back of the room and watched over the new employees as they worked.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Manager watching over new employees as they work',
  },
];

const throughMeanings: MeaningData[] = [
  {
    definition: 'To watch a program, movie, or series entirely from beginning to end.',
    example: 'It took me a whole weekend, but I finally watched the series through.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Watching a series through over a whole weekend',
  },
];

export const sections: SectionData[] = [
  { particle: 'back',    storageKey: 'watchBack_section_expanded',    storageKeyPrefix: 'watchBack',    meanings: backMeanings },
  { particle: 'for',     storageKey: 'watchFor_section_expanded',     storageKeyPrefix: 'watchFor',     meanings: forMeanings },
  { particle: 'on',      storageKey: 'watchOn_section_expanded',      storageKeyPrefix: 'watchOn',      meanings: onMeanings },
  { particle: 'out',     storageKey: 'watchOut_section_expanded',     storageKeyPrefix: 'watchOut',     meanings: outMeanings },
  { particle: 'out for', storageKey: 'watchOutFor_section_expanded',  storageKeyPrefix: 'watchOutFor',  meanings: outForMeanings },
  { particle: 'over',    storageKey: 'watchOver_section_expanded',    storageKeyPrefix: 'watchOver',    meanings: overMeanings },
  { particle: 'through', storageKey: 'watchThrough_section_expanded', storageKeyPrefix: 'watchThrough', meanings: throughMeanings },
];

export default function WatchVerbPage() {
  return <VerbPageLayout title="Watch" sections={sections} />;
}
