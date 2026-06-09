import VerbPageLayout, { MeaningData, SectionData } from '../../components/VerbPage';

const base = import.meta.env.BASE_URL;

const outMeanings: MeaningData[] = [
  {
    definition: 'To understand a problem and find a solution.',
    example: 'It took the team three hours to figure out why the Java application was crashing.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Team working three hours to figure out why the Java application was crashing',
  },
  {
    definition: 'To calculate an amount or cost.',
    example: 'We need to figure out exactly how much the new software licenses will cost.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Team calculating the exact cost of new software licenses',
  },
  {
    definition: "To understand someone's character, behavior, or motives.",
    example: 'I cannot figure our new manager out; she is very quiet and hard to read.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: "Person trying to figure out their new manager's quiet and hard to read character",
  },
];

const onMeanings: MeaningData[] = [
  {
    definition: 'To plan on something happening or expect something to be true.',
    example: 'We figure on launching the new product by the end of the second quarter.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Team planning to launch new product by end of second quarter',
  },
  {
    definition: 'To rely on or trust someone/something.',
    example: 'You can always figure on John to deliver his code on time.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'John reliably delivering his code on time',
  },
];

const inMeanings: MeaningData[] = [
  {
    definition: 'To include a specific detail or amount when making a calculation or plan.',
    example: 'When estimating the project timeline, you must figure in the time needed for testing and fixing bugs.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Developer figuring in time needed for testing and fixing bugs in project timeline estimate',
  },
];

const intoMeanings: MeaningData[] = [
  {
    definition: 'To be a relevant factor or play a part in a situation, decision, or plan.',
    example: 'The cost of hiring new developers did not figure into the original budget.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Cost of hiring new developers not figured into original budget',
  },
];

const upMeanings: MeaningData[] = [
  {
    definition: 'To add numbers together to calculate a total amount.',
    example: 'Let me figure up the total hours we spent on the server migration last month.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Developer calculating total hours spent on server migration last month',
  },
];

const forMeanings: MeaningData[] = [
  {
    definition: "To expect someone to be a certain type of person, or to make an assumption about their character.",
    example: 'I figured him for a strict leader, but he is actually very relaxed.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person figured for a strict leader but actually very relaxed',
  },
];

export const sections: SectionData[] = [
  { particle: 'for',  storageKey: 'figureFor_section_expanded',  storageKeyPrefix: 'figureFor',  meanings: forMeanings },
  { particle: 'in',   storageKey: 'figureIn_section_expanded',   storageKeyPrefix: 'figureIn',   meanings: inMeanings },
  { particle: 'into', storageKey: 'figureInto_section_expanded', storageKeyPrefix: 'figureInto', meanings: intoMeanings },
  { particle: 'on',   storageKey: 'figureOn_section_expanded',   storageKeyPrefix: 'figureOn',   meanings: onMeanings },
  { particle: 'out',  storageKey: 'figureOut_section_expanded',  storageKeyPrefix: 'figureOut',  meanings: outMeanings },
  { particle: 'up',   storageKey: 'figureUp_section_expanded',   storageKeyPrefix: 'figureUp',   meanings: upMeanings },
];

export default function FigureVerbPage() {
  return <VerbPageLayout title="Figure" sections={sections} />;
}
