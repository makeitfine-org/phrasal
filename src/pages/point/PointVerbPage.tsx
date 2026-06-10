import VerbPageLayout, { MeaningData, SectionData } from '../../components/VerbPage';

const base = import.meta.env.BASE_URL;

const aheadForwardMeanings: MeaningData[] = [
  {
    definition: 'To look toward or indicate the future.',
    example: 'This new business model points forward to a more automated and efficient company.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Business model pointing forward to an automated and efficient company',
  },
];

const backMeanings: MeaningData[] = [
  {
    definition: 'To show that something is connected to a past event, or to remind someone of the past.',
    example: 'Most of these software bugs point back to the rushed code we merged last month.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Software bugs pointing back to rushed code merged last month',
  },
];

const offMeanings: MeaningData[] = [
  {
    definition: 'To separate numbers with a decimal point (used mainly in mathematics and accounting).',
    example: 'When calculating the final cost, remember to point off two decimal places.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Pointing off decimal places when calculating final cost',
  },
];

const outMeanings: MeaningData[] = [
  {
    definition: 'To tell someone a fact they did not know or had forgotten.',
    example: 'The lead developer pointed out that the Java update would break our older systems.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Lead developer pointing out that a Java update would break older systems',
  },
  {
    definition: 'To direct attention to someone or something using your finger.',
    example: 'During the office tour, the manager pointed out where the IT department sits.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Manager pointing out where the IT department sits during office tour',
  },
];

const toMeanings: MeaningData[] = [
  {
    definition: 'To mention something as proof or as a reason why something happened.',
    example: 'The CEO pointed to the new marketing strategy to explain the sudden growth in sales.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'CEO pointing to new marketing strategy to explain growth in sales',
  },
  {
    definition: 'To suggest that a particular situation or result is likely.',
    example: 'All the server performance metrics point to a memory leak in the application.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Server performance metrics pointing to a memory leak in the application',
  },
  {
    definition: 'To physically aim your finger or an object at something.',
    example: 'The architect pointed to the database schema on the whiteboard.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Architect pointing to the database schema on the whiteboard',
  },
];

const upMeanings: MeaningData[] = [
  {
    definition: 'To emphasize something or make a problem easier to notice (similar to "highlight").',
    example: 'The recent system crash points up the need for better error handling in our code.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'System crash pointing up the need for better error handling in code',
  },
];

export const sections: SectionData[] = [
  { particle: 'ahead / forward', storageKey: 'pointAhead_section_expanded', storageKeyPrefix: 'pointAhead', meanings: aheadForwardMeanings },
  { particle: 'back',            storageKey: 'pointBack_section_expanded',  storageKeyPrefix: 'pointBack',  meanings: backMeanings },
  { particle: 'off',             storageKey: 'pointOff_section_expanded',   storageKeyPrefix: 'pointOff',   meanings: offMeanings },
  { particle: 'out',             storageKey: 'pointOut_section_expanded',   storageKeyPrefix: 'pointOut',   meanings: outMeanings },
  { particle: 'to',              storageKey: 'pointTo_section_expanded',    storageKeyPrefix: 'pointTo',    meanings: toMeanings },
  { particle: 'up',              storageKey: 'pointUp_section_expanded',    storageKeyPrefix: 'pointUp',    meanings: upMeanings },
];

export default function PointVerbPage() {
  return <VerbPageLayout title="Point" sections={sections} />;
}
