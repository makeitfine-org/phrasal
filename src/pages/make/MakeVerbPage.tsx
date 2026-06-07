import VerbPageLayout, { MeaningData, SectionData } from '../../components/VerbPage';

const base = import.meta.env.BASE_URL;

const afterMeanings: MeaningData[] = [
  {
    definition: 'To chase someone or something',
    example: 'The security guard made after the shoplifter.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A security guard chasing a shoplifter',
  },
];

const awayMeanings: MeaningData[] = [
  {
    definition: 'To steal something and escape with it (make away with)',
    example: 'Hackers made away with thousands of encrypted passwords.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Hackers stealing encrypted passwords',
  },
];

const forMeanings: MeaningData[] = [
  {
    definition: 'To move directly towards a place',
    example: 'After the meeting ended, we made for the exit.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'People moving towards the exit after a meeting',
  },
  {
    definition: 'To help make something possible or produce a specific result',
    example: 'Clear communication makes for a highly effective management team.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A team communicating clearly and effectively',
  },
];

const intoMeanings: MeaningData[] = [
  {
    definition: 'To change or transform something into something else',
    example: 'The developers made the old legacy system into a modern Java application.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Developers transforming a legacy system into a modern application',
  },
];

const offMeanings: MeaningData[] = [
  {
    definition: 'To leave quickly, especially to escape after doing something wrong (make off with)',
    example: 'The thieves made off before the police arrived.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Thieves leaving quickly before police arrive',
  },
];

const outMeanings: MeaningData[] = [
  {
    definition: 'To manage to see, hear, or read something with difficulty',
    example: 'I could not make out the error message on the monitor because the screen was too bright.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A person struggling to read an error message on a bright screen',
  },
  {
    definition: "To understand someone's character or a situation",
    example: 'He is a very quiet team leader; I cannot quite make him out.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A person trying to understand their team leader',
  },
  {
    definition: 'To write all the necessary information on an official document (like a check or invoice)',
    example: "Please make the invoice out to the company's head office.",
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A person writing an invoice to a head office',
  },
  {
    definition: 'To claim or pretend that something is true',
    example: 'The software vendor made out that their system was completely bug-free.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A software vendor claiming their system has no bugs',
  },
  {
    definition: 'To progress, perform, or succeed in a situation',
    example: 'How did you make out with the new project timeline?',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A person asking about progress on a project timeline',
  },
  {
    definition: 'To kiss and touch romantically (informal)',
    example: 'The teenagers were making out in the back of the cinema.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Teenagers at the back of a cinema',
  },
];

const overMeanings: MeaningData[] = [
  {
    definition: 'To change or improve the appearance of someone or something',
    example: 'We made over the entire office space to encourage better collaboration.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'An office space being redesigned for better collaboration',
  },
  {
    definition: 'To legally transfer ownership of property or money to someone else',
    example: 'The CEO made over his shares to his business partner.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A CEO transferring shares to a business partner',
  },
];

const upMeanings: MeaningData[] = [
  {
    definition: 'To invent a story, excuse, or explanation',
    example: 'He made up an excuse for missing the daily stand-up meeting.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A person inventing an excuse for missing a meeting',
  },
  {
    definition: 'To form the whole of something',
    example: 'Senior developers make up 40% of our engineering department.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Senior developers forming part of an engineering department',
  },
  {
    definition: 'To become friendly again after an argument',
    example: 'The co-founders argued over the budget, but they made up the next day.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Two co-founders reconciling after an argument',
  },
  {
    definition: 'To prepare, build, or arrange something from parts',
    example: 'Can you make up a list of requirements for the new software module?',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A person preparing a list of requirements',
  },
];

const upForMeanings: MeaningData[] = [
  {
    definition: 'To compensate for something bad, missing, or lost',
    example: 'We worked late on Friday to make up for the time lost during the server crash.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Team members working late to compensate for lost time',
  },
];

const withMeanings: MeaningData[] = [
  {
    definition: 'To produce, supply, or give something quickly (slang/informal)',
    example: 'Make with the financial reports, the board is waiting!',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A person urgently requesting financial reports for the board',
  },
];

export const sections: SectionData[] = [
  { particle: 'after', storageKey: 'makeAfter_section_expanded', storageKeyPrefix: 'makeAfter', meanings: afterMeanings },
  { particle: 'away (with)', storageKey: 'makeAway_section_expanded', storageKeyPrefix: 'makeAway', meanings: awayMeanings },
  { particle: 'for', storageKey: 'makeFor_section_expanded', storageKeyPrefix: 'makeFor', meanings: forMeanings },
  { particle: 'into', storageKey: 'makeInto_section_expanded', storageKeyPrefix: 'makeInto', meanings: intoMeanings },
  { particle: 'off (with)', storageKey: 'makeOff_section_expanded', storageKeyPrefix: 'makeOff', meanings: offMeanings },
  { particle: 'out', storageKey: 'makeOut_section_expanded', storageKeyPrefix: 'makeOut', meanings: outMeanings },
  { particle: 'over', storageKey: 'makeOver_section_expanded', storageKeyPrefix: 'makeOver', meanings: overMeanings },
  { particle: 'up', storageKey: 'makeUp_section_expanded', storageKeyPrefix: 'makeUp', meanings: upMeanings },
  { particle: 'up for', storageKey: 'makeUpFor_section_expanded', storageKeyPrefix: 'makeUpFor', meanings: upForMeanings },
  { particle: 'with', storageKey: 'makeWith_section_expanded', storageKeyPrefix: 'makeWith', meanings: withMeanings },
];

export default function MakeVerbPage() {
  return <VerbPageLayout title="Make" sections={sections} />;
}
