import VerbPageLayout, { MeaningData, SectionData } from '../../components/VerbPage';

const base = import.meta.env.BASE_URL;

const aroundMeanings: MeaningData[] = [
  {
    definition: 'To give a share of something to everyone present in a circle or group.',
    example: 'Please deal the documents around so everyone has a copy.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Dealing documents around so everyone has a copy',
  },
];

const awayMeanings: MeaningData[] = [
  {
    definition: 'To give something away in a trade or negotiation, often losing a valuable asset.',
    example: 'The company dealt away its most profitable division to pay off debts.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Company dealing away its most profitable division',
  },
];

const byMeanings: MeaningData[] = [
  {
    definition: 'To treat someone in a particular way (formal / old-fashioned).',
    example: 'She always felt that she had been dealt by unfairly in the promotion process.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person feeling dealt by unfairly in a promotion process',
  },
];

const inMeanings: MeaningData[] = [
  {
    definition: 'To buy and sell specific products as a business.',
    example: 'His store deals in rare books and antique maps.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Store dealing in rare books and antique maps',
  },
  {
    definition: 'To include someone in an activity, especially a card game.',
    example: 'We are going to start the next game of poker. Deal me in!',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Player being dealt into a poker game',
  },
];

const intoMeanings: MeaningData[] = [
  {
    definition: 'To physically or metaphorically include someone in a group or game (very similar to "deal in").',
    example: 'Pull up a chair and we will deal you into the game.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Dealing someone into a card game',
  },
];

const outMeanings: MeaningData[] = [
  {
    definition: 'To distribute or share things among a group of people.',
    example: 'The manager dealt out the new project assignments to the team.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Manager dealing out project assignments to the team',
  },
  {
    definition: 'To give a punishment to someone.',
    example: 'The judge dealt out a very harsh sentence for the crime.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Judge dealing out a harsh sentence',
  },
];

const toMeanings: MeaningData[] = [
  {
    definition: 'To punish, attack someone, or take strong action to fix a problem (Regional: Australia / New Zealand).',
    example: 'If the server keeps crashing, the IT department will have to deal to it.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'IT department dealing to a crashing server',
  },
];

const withMeanings: MeaningData[] = [
  {
    definition: 'To take action to solve a problem or complete a task.',
    example: 'I have a lot of emails to deal with this morning.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person dealing with a lot of emails in the morning',
  },
  {
    definition: 'To do business with someone or an organization.',
    example: 'Our company only deals with local suppliers to reduce shipping costs.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Company dealing with local suppliers',
  },
  {
    definition: 'To be about a specific subject.',
    example: 'This training course deals with effective management techniques.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Training course dealing with management techniques',
  },
  {
    definition: 'To manage or handle difficult emotions or situations.',
    example: 'It can be hard to deal with stress when you have a tight deadline.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person dealing with stress under a tight deadline',
  },
];

export const sections: SectionData[] = [
  { particle: 'around / round', storageKey: 'dealAround_section_expanded', storageKeyPrefix: 'dealAround', meanings: aroundMeanings },
  { particle: 'away',           storageKey: 'dealAway_section_expanded',   storageKeyPrefix: 'dealAway',   meanings: awayMeanings },
  { particle: 'by',             storageKey: 'dealBy_section_expanded',     storageKeyPrefix: 'dealBy',     meanings: byMeanings },
  { particle: 'in',             storageKey: 'dealIn_section_expanded',     storageKeyPrefix: 'dealIn',     meanings: inMeanings },
  { particle: 'into',           storageKey: 'dealInto_section_expanded',   storageKeyPrefix: 'dealInto',   meanings: intoMeanings },
  { particle: 'out',            storageKey: 'dealOut_section_expanded',    storageKeyPrefix: 'dealOut',    meanings: outMeanings },
  { particle: 'to',             storageKey: 'dealTo_section_expanded',     storageKeyPrefix: 'dealTo',     meanings: toMeanings },
  { particle: 'with',           storageKey: 'dealWith_section_expanded',   storageKeyPrefix: 'dealWith',   meanings: withMeanings },
];

export default function DealVerbPage() {
  return <VerbPageLayout title="Deal" sections={sections} />;
}
