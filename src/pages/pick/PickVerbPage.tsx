import VerbPageLayout, { MeaningData, SectionData } from '../../components/VerbPage';

const base = import.meta.env.BASE_URL;

const apartMeanings: MeaningData[] = [
  {
    definition: 'To pull something into separate physical pieces.',
    example: 'The birds picked the piece of bread apart.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Birds picking the piece of bread apart',
  },
  {
    definition: 'To find all the mistakes or flaws in an idea or argument.',
    example: 'The senior developers picked my code architecture apart during the review.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Senior developers picking apart code architecture during review',
  },
];

const awayMeanings: MeaningData[] = [
  {
    definition: 'To remove small pieces of something slowly.',
    example: 'He picked away the old paint from the wall.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person picking away old paint from the wall',
  },
  {
    definition: 'To slowly reduce or destroy something (usually "pick away at").',
    example: 'The new competitor slowly picked away at our market share.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'New competitor picking away at market share',
  },
];

const offMeanings: MeaningData[] = [
  {
    definition: 'To target or shoot one by one.',
    example: 'The sniper picked off the enemy guards from a distance.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Sniper picking off enemy guards from a distance',
  },
  {
    definition: 'To remove something by pulling it.',
    example: 'She picked off the dry leaves from the houseplant.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person picking off dry leaves from the houseplant',
  },
  {
    definition: 'To intercept (often in sports).',
    example: 'The defender picked off the pass perfectly.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Defender picking off the pass perfectly',
  },
];

const onMeanings: MeaningData[] = [
  {
    definition: 'To bully or treat someone unfairly.',
    example: 'The older children always picked on him at school.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Older children picking on a student at school',
  },
  {
    definition: 'To choose someone to do a task or answer a question.',
    example: 'The manager picked on me to lead the presentation.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Manager picking someone to lead the presentation',
  },
];

const outMeanings: MeaningData[] = [
  {
    definition: 'To choose or select carefully.',
    example: 'We need to pick out a good candidate for the management role.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Team picking out a candidate for the management role',
  },
  {
    definition: 'To recognize someone or something in a group.',
    example: 'I could easily pick her out in the crowded room.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person picking someone out in a crowded room',
  },
  {
    definition: 'To play a tune on an instrument slowly or with difficulty.',
    example: 'He picked out a simple melody on the piano.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Musician picking out a simple melody on the piano',
  },
];

const overMeanings: MeaningData[] = [
  {
    definition: 'To carefully examine a group of things to select the best ones.',
    example: 'By the time I arrived at the market, the best fruit had already been picked over.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Fruit at the market already picked over by the time someone arrived',
  },
];

const throughMeanings: MeaningData[] = [
  {
    definition: 'To search carefully among a pile or collection of items.',
    example: 'The team picked through the raw data looking for helpful trends.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Team picking through raw data looking for helpful trends',
  },
];

const upMeanings: MeaningData[] = [
  {
    definition: 'To lift something from a surface.',
    example: 'Please pick up your clothes from the floor.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person picking up clothes from the floor',
  },
  {
    definition: 'To collect someone in a vehicle.',
    example: 'I will pick you up at the airport at six.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person being picked up at the airport',
  },
  {
    definition: 'To learn a skill casually, without formal training.',
    example: 'I picked up some new programming skills while working on that project.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Developer picking up new programming skills on a project',
  },
  {
    definition: 'To improve or increase.',
    example: 'Sales usually pick up in the fourth quarter.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Sales graph picking up in the fourth quarter',
  },
  {
    definition: 'To catch an illness.',
    example: 'I picked up a bad cold at the conference.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person picking up a cold at the conference',
  },
  {
    definition: 'To resume an activity (often "pick back up").',
    example: "We are out of time, so let's pick this discussion back up tomorrow.",
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Team planning to pick up a discussion again tomorrow',
  },
  {
    definition: 'To pay a bill.',
    example: 'The company will pick up the tab for the team dinner.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Company picking up the tab for the team dinner',
  },
  {
    definition: 'To notice or detect something (usually "pick up on").',
    example: 'The software easily picks up on errors in the code.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Software picking up on errors in the code',
  },
];

export const sections: SectionData[] = [
  { particle: 'apart',   storageKey: 'pickApart_section_expanded',   storageKeyPrefix: 'pickApart',   meanings: apartMeanings },
  { particle: 'away',    storageKey: 'pickAway_section_expanded',    storageKeyPrefix: 'pickAway',    meanings: awayMeanings },
  { particle: 'off',     storageKey: 'pickOff_section_expanded',     storageKeyPrefix: 'pickOff',     meanings: offMeanings },
  { particle: 'on',      storageKey: 'pickOn_section_expanded',      storageKeyPrefix: 'pickOn',      meanings: onMeanings },
  { particle: 'out',     storageKey: 'pickOut_section_expanded',     storageKeyPrefix: 'pickOut',     meanings: outMeanings },
  { particle: 'over',    storageKey: 'pickOver_section_expanded',    storageKeyPrefix: 'pickOver',    meanings: overMeanings },
  { particle: 'through', storageKey: 'pickThrough_section_expanded', storageKeyPrefix: 'pickThrough', meanings: throughMeanings },
  { particle: 'up',      storageKey: 'pickUp_section_expanded',      storageKeyPrefix: 'pickUp',      meanings: upMeanings },
];

export default function PickVerbPage() {
  return <VerbPageLayout title="Pick" sections={sections} />;
}
