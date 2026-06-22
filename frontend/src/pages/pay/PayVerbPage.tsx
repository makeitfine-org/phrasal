import VerbPageLayout, { MeaningData, SectionData } from '../../components/VerbPage';

const base = import.meta.env.BASE_URL;

const offMeanings: MeaningData[] = [
  {
    definition: 'To completely pay back a debt.',
    example: 'After five years, the company finally paid off its bank loan.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Company finally paying off its bank loan after five years',
  },
  {
    definition: 'To result in success or yield good results after hard work or investment.',
    example: "The team's long hours of coding really paid off when the software launched successfully.",
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: "Team's long hours of coding paying off when the software launched successfully",
  },
  {
    definition: 'To bribe someone so they keep quiet or do not cause trouble.',
    example: 'The corrupt manager tried to pay off the inspector.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Corrupt manager trying to pay off the inspector',
  },
  {
    definition: 'To dismiss workers and give them their final wages (more common in British English).',
    example: 'The factory closed down and paid off all its workers.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Factory closing down and paying off all its workers',
  },
];

const upMeanings: MeaningData[] = [
  {
    definition: 'To give someone the money you owe them, especially when you do not want to or when you are forced to do it.',
    example: 'The supplier threatened legal action until the client finally paid up.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Client finally paying up after supplier threatened legal action',
  },
];

const downMeanings: MeaningData[] = [
  {
    definition: 'To reduce the total amount of a debt by paying a portion of it.',
    example: "The management team decided to pay down the company's debt before investing in new projects.",
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: "Management team deciding to pay down the company's debt before investing in new projects",
  },
];

const inMeanings: MeaningData[] = [
  {
    definition: 'To put money into a bank account, pension, or fund.',
    example: 'I need to go to the bank to pay in these checks.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person going to the bank to pay in some checks',
  },
];

const outMeanings: MeaningData[] = [
  {
    definition: 'To disburse or spend a large amount of money, often from a fund, insurance, or company profit (like dividends).',
    example: 'The insurance policy paid out $50,000 after the office roof leaked.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Insurance policy paying out after the office roof leaked',
  },
  {
    definition: 'To slowly release or let out a rope (nautical).',
    example: 'The sailor paid out the rope to let the boat move away from the dock.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Sailor paying out the rope to let the boat move away from the dock',
  },
];

const awayMeanings: MeaningData[] = [
  {
    definition: 'Similar to "pay out," meaning to let a rope slide through your hands (nautical/rare).',
    example: 'He paid away the line as the anchor dropped.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Sailor paying away the line as the anchor dropped',
  },
];

const forwardMeanings: MeaningData[] = [
  {
    definition: 'To respond to someone\'s kindness or help by doing a good deed for someone else, rather than returning the favor to the original person.',
    example: 'My mentor helped me start my career, so I try to pay it forward by mentoring junior developers.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person paying it forward by mentoring junior developers after being helped by a mentor',
  },
];

const backMeanings: MeaningData[] = [
  {
    definition: 'To return money to someone who loaned it to you.',
    example: 'If you lend me $20 for lunch, I will pay you back tomorrow.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person promising to pay back $20 borrowed for lunch',
  },
  {
    definition: 'To do something bad to someone because they did something bad to you (revenge).',
    example: 'I will pay him back for stealing my promotion.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person planning to pay back someone who stole their promotion',
  },
];

const forMeanings: MeaningData[] = [
  {
    definition: 'To give money in exchange for goods or services.',
    example: 'The company will pay for your travel expenses.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Company agreeing to pay for travel expenses',
  },
  {
    definition: 'To suffer the negative results of a mistake or bad decision.',
    example: 'We ignored the software bugs during testing, and now we are paying for it with customer complaints.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Team paying for ignoring software bugs with customer complaints',
  },
];

const overMeanings: MeaningData[] = [
  {
    definition: 'To transfer money to someone in authority or to a third party.',
    example: 'The business is required to pay over all collected taxes to the government at the end of the quarter.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Business paying over collected taxes to the government at the end of the quarter',
  },
];

export const sections: SectionData[] = [
  { particle: 'off',      storageKey: 'payOff_section_expanded',     storageKeyPrefix: 'payOff',     meanings: offMeanings },
  { particle: 'up',       storageKey: 'payUp_section_expanded',      storageKeyPrefix: 'payUp',      meanings: upMeanings },
  { particle: 'down',     storageKey: 'payDown_section_expanded',    storageKeyPrefix: 'payDown',    meanings: downMeanings },
  { particle: 'in / into', storageKey: 'payIn_section_expanded',     storageKeyPrefix: 'payIn',      meanings: inMeanings },
  { particle: 'out',      storageKey: 'payOut_section_expanded',     storageKeyPrefix: 'payOut',     meanings: outMeanings },
  { particle: 'away',     storageKey: 'payAway_section_expanded',    storageKeyPrefix: 'payAway',    meanings: awayMeanings },
  { particle: 'forward',  storageKey: 'payForward_section_expanded', storageKeyPrefix: 'payForward', meanings: forwardMeanings },
  { particle: 'back',     storageKey: 'payBack_section_expanded',    storageKeyPrefix: 'payBack',    meanings: backMeanings },
  { particle: 'for',      storageKey: 'payFor_section_expanded',     storageKeyPrefix: 'payFor',     meanings: forMeanings },
  { particle: 'over',     storageKey: 'payOver_section_expanded',    storageKeyPrefix: 'payOver',    meanings: overMeanings },
];

export default function PayVerbPage() {
  return <VerbPageLayout title="Pay" sections={sections} />;
}
