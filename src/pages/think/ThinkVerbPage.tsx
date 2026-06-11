import VerbPageLayout, { MeaningData, SectionData } from '../../components/VerbPage';

const base = import.meta.env.BASE_URL;

const aboutMeanings: MeaningData[] = [
  {
    definition: 'To consider a person, thing, or idea — to spend time examining an idea or focusing your mind on someone or something.',
    example: 'Give me a few days to think about your proposal.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person taking time to think about a proposal',
  },
  {
    definition: 'To hold a specific view or belief regarding a topic.',
    example: 'What do you think about the new company policy?',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person sharing their view about the new company policy',
  },
  {
    definition: 'To recall a memory or picture something in your mind.',
    example: 'It makes me sad to think about how much time we wasted.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person feeling sad while thinking about wasted time',
  },
];

const aheadMeanings: MeaningData[] = [
  {
    definition: 'To consider what might happen in the future so that you are prepared.',
    example: 'Good managers always think ahead to avoid potential problems.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Manager thinking ahead to avoid potential problems',
  },
];

const aroundMeanings: MeaningData[] = [
  {
    definition: 'To consider a situation or problem from every possible perspective in order to find a solution.',
    example: 'The team needs to think around this issue to find a creative fix.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Team thinking around an issue to find a creative solution',
  },
];

const backMeanings: MeaningData[] = [
  {
    definition: 'To focus your mind on events that have already happened.',
    example: 'When I think back to my first job, I realize how much I have learned.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person thinking back to their first job and reflecting on growth',
  },
];

const forMeanings: MeaningData[] = [
  {
    definition: 'To form your own opinions and make your own choices, rather than letting others decide for you (think for yourself).',
    example: 'A good leader encourages their team to think for themselves.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Leader encouraging team to think for themselves',
  },
];

const onMeanings: MeaningData[] = [
  {
    definition: 'To spend time considering something — similar to "think about," meaning to reflect on a decision or idea.',
    example: 'It is a strong offer, but I need to think on it for a few days.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person thinking on a strong job offer for a few days',
  },
  {
    definition: 'To keep in mind or remember (mainly British/informal).',
    example: 'You should think on what I told you before you make a mistake.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person being reminded to think on advice before making a mistake',
  },
];

const outMeanings: MeaningData[] = [
  {
    definition: 'To plan something completely and carefully from start to finish.',
    example: 'We need to think out our strategy before the client meeting.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Team thinking out their strategy before a client meeting',
  },
];

const overMeanings: MeaningData[] = [
  {
    definition: 'To take time to reflect on a suggestion, offer, or problem before making a final decision.',
    example: 'Take the weekend to think over the job offer.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person taking time to think over a job offer',
  },
];

const throughMeanings: MeaningData[] = [
  {
    definition: 'To carefully consider every step, detail, and possible result of a plan or action before doing it.',
    example: 'You should think through the consequences before you quit your job.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person thinking through the consequences before quitting their job',
  },
];

const toMeanings: MeaningData[] = [
  {
    definition: 'To remember to do something (usually used in the negative).',
    example: "I was so busy that I didn't think to call my clients to update them.",
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: "Busy person who didn't think to call clients",
  },
  {
    definition: 'To expect or imagine that a specific situation is possible.',
    example: 'Who would have thought to see you here today?',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Surprised person at an unexpected meeting',
  },
];

const upMeanings: MeaningData[] = [
  {
    definition: 'To use your imagination to create a plan, an idea, or an excuse.',
    example: 'The developers thought up a brilliant solution to the software bug.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Developers thinking up a brilliant solution to a software bug',
  },
];

export const sections: SectionData[] = [
  { particle: 'about',          storageKey: 'thinkAbout_section_expanded',   storageKeyPrefix: 'thinkAbout',   meanings: aboutMeanings },
  { particle: 'ahead',          storageKey: 'thinkAhead_section_expanded',   storageKeyPrefix: 'thinkAhead',   meanings: aheadMeanings },
  { particle: 'around / round', storageKey: 'thinkAround_section_expanded',  storageKeyPrefix: 'thinkAround',  meanings: aroundMeanings },
  { particle: 'back',           storageKey: 'thinkBack_section_expanded',    storageKeyPrefix: 'thinkBack',    meanings: backMeanings },
  { particle: 'for',            storageKey: 'thinkFor_section_expanded',     storageKeyPrefix: 'thinkFor',     meanings: forMeanings },
  { particle: 'on',             storageKey: 'thinkOn_section_expanded',      storageKeyPrefix: 'thinkOn',      meanings: onMeanings },
  { particle: 'out',            storageKey: 'thinkOut_section_expanded',     storageKeyPrefix: 'thinkOut',     meanings: outMeanings },
  { particle: 'over',           storageKey: 'thinkOver_section_expanded',    storageKeyPrefix: 'thinkOver',    meanings: overMeanings },
  { particle: 'through',        storageKey: 'thinkThrough_section_expanded', storageKeyPrefix: 'thinkThrough', meanings: throughMeanings },
  { particle: 'to',             storageKey: 'thinkTo_section_expanded',      storageKeyPrefix: 'thinkTo',      meanings: toMeanings },
  { particle: 'up',             storageKey: 'thinkUp_section_expanded',      storageKeyPrefix: 'thinkUp',      meanings: upMeanings },
];

export default function ThinkVerbPage() {
  return <VerbPageLayout title="Think" sections={sections} />;
}
