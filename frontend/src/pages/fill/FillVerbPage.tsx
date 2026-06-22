import VerbPageLayout, { MeaningData, SectionData } from '../../components/VerbPage';

const base = import.meta.env.BASE_URL;

const downMeanings: MeaningData[] = [
  {
    definition: 'To copy data or formulas to the cells below (specific to software/business context like Excel).',
    example: 'Select the top cell and fill down the formula to the bottom of the column.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Selecting top cell and filling down formula to bottom of column',
  },
];

const inMeanings: MeaningData[] = [
  {
    definition: 'To complete a form or document by writing required information.',
    example: 'Please fill in this application form and return it to the HR department.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person filling in application form to return to HR department',
  },
  {
    definition: 'To provide someone with missing information (fill someone in).',
    example: 'I missed the morning meeting. Can you fill me in on what the team discussed?',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Colleague filling in coworker on what the team discussed at the morning meeting',
  },
  {
    definition: 'To temporarily do someone else\'s job because they are absent (fill in for).',
    example: 'The lead developer is sick today, so I will fill in for him.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Developer filling in for sick lead developer',
  },
  {
    definition: 'To close a hole or empty space by putting a substance into it.',
    example: 'The city workers finally filled in the hole in the street.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'City workers filling in the hole in the street',
  },
];

const outMeanings: MeaningData[] = [
  {
    definition: 'To complete a form or document (US English equivalent of "fill in").',
    example: 'It took me an hour to fill out the tax documents.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person spending an hour to fill out the tax documents',
  },
  {
    definition: 'To become larger, heavier, or rounder (usually referring to a person gaining weight or muscle).',
    example: 'He used to be very thin, but he has filled out since he started going to the gym.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person who has filled out since starting to go to the gym',
  },
];

const upMeanings: MeaningData[] = [
  {
    definition: 'To make something completely full, or to become completely full.',
    example: 'We need to fill up the car with petrol before we start driving.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Filling up car with petrol before driving',
  },
  {
    definition: 'To eat enough food so that you are no longer hungry.',
    example: "Don't fill up on bread before the main course arrives!",
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person told not to fill up on bread before main course arrives',
  },
];

const withMeanings: MeaningData[] = [
  {
    definition: 'To put a substance or object into a container until there is no more space.',
    example: 'She filled the cup with coffee.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person filling the cup with coffee',
  },
  {
    definition: 'To cause someone to feel a strong emotion.',
    example: 'The successful software launch filled the team with pride.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Successful software launch filling the team with pride',
  },
];

export const sections: SectionData[] = [
  { particle: 'down', storageKey: 'fillDown_section_expanded', storageKeyPrefix: 'fillDown', meanings: downMeanings },
  { particle: 'in',   storageKey: 'fillIn_section_expanded',   storageKeyPrefix: 'fillIn',   meanings: inMeanings },
  { particle: 'out',  storageKey: 'fillOut_section_expanded',  storageKeyPrefix: 'fillOut',  meanings: outMeanings },
  { particle: 'up',   storageKey: 'fillUp_section_expanded',   storageKeyPrefix: 'fillUp',   meanings: upMeanings },
  { particle: 'with', storageKey: 'fillWith_section_expanded', storageKeyPrefix: 'fillWith', meanings: withMeanings },
];

export default function FillVerbPage() {
  return <VerbPageLayout title="Fill" sections={sections} />;
}
