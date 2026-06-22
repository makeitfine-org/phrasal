import VerbPageLayout, { MeaningData, SectionData } from '../../components/VerbPage';

const base = import.meta.env.BASE_URL;

const awayMeanings: MeaningData[] = [
  {
    definition: 'To remove dirt, rubbish, or objects to leave a space tidy.',
    example: 'Please clean away the empty plates from the dining table.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Cleaning away empty plates from a dining table',
  },
];

const aroundMeanings: MeaningData[] = [
  {
    definition: 'To wash or tidy the space near an object without moving the object itself.',
    example: "Don't worry about moving the heavy cabinet; just clean around it.",
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Cleaning around a heavy cabinet',
  },
];

const downMeanings: MeaningData[] = [
  {
    definition: 'To wash an entire surface, usually from top to bottom.',
    example: 'We need to clean down the walls before we start painting.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Cleaning down walls before painting',
  },
];

const offMeanings: MeaningData[] = [
  {
    definition: 'To remove dirt, marks, or a substance from a surface.',
    example: 'Make sure to clean the mud off your boots before coming inside.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Cleaning mud off boots',
  },
];

const outMeanings: MeaningData[] = [
  {
    definition: 'To empty and clean the inside of a space (like a room, cupboard, or box), usually by throwing away unwanted items.',
    example: 'I spent my Saturday cleaning out the garage.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Cleaning out a garage',
  },
  {
    definition: "To use or take all of someone's money.",
    example: 'Paying for those car repairs completely cleaned me out.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Car repairs emptying a wallet',
  },
  {
    definition: 'To steal everything of value from a place.',
    example: 'The thieves cleaned out the safe during the night.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Thieves cleaning out a safe',
  },
];

const upMeanings: MeaningData[] = [
  {
    definition: 'To make a place or a person completely clean and tidy.',
    example: 'We need to clean up the living room before our guests arrive.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Cleaning up a living room before guests arrive',
  },
  {
    definition: 'To make a large profit or a lot of money quickly.',
    example: 'The retail company cleaned up during the holiday sales.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Retail company making large profits during holiday sales',
  },
  {
    definition: 'To stop crime, corruption, or bad behavior in a specific organization or area.',
    example: 'The new mayor promised to clean up the city center.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'New mayor promising to clean up the city center',
  },
];

const upAfterMeanings: MeaningData[] = [
  {
    definition: 'To remove the mess or dirt created by someone or something else.',
    example: 'I am constantly cleaning up after my new puppy.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Cleaning up after a puppy',
  },
];

export const sections: SectionData[] = [
  { particle: 'around',   storageKey: 'cleanAround_section_expanded',   storageKeyPrefix: 'cleanAround',   meanings: aroundMeanings },
  { particle: 'away',     storageKey: 'cleanAway_section_expanded',     storageKeyPrefix: 'cleanAway',     meanings: awayMeanings },
  { particle: 'down',     storageKey: 'cleanDown_section_expanded',     storageKeyPrefix: 'cleanDown',     meanings: downMeanings },
  { particle: 'off',      storageKey: 'cleanOff_section_expanded',      storageKeyPrefix: 'cleanOff',      meanings: offMeanings },
  { particle: 'out',      storageKey: 'cleanOut_section_expanded',      storageKeyPrefix: 'cleanOut',      meanings: outMeanings },
  { particle: 'up',       storageKey: 'cleanUp_section_expanded',       storageKeyPrefix: 'cleanUp',       meanings: upMeanings },
  { particle: 'up after', storageKey: 'cleanUpAfter_section_expanded',  storageKeyPrefix: 'cleanUpAfter',  meanings: upAfterMeanings },
];

export default function CleanVerbPage() {
  return <VerbPageLayout title="Clean" sections={sections} />;
}
