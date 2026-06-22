import VerbPageLayout, { MeaningData, SectionData } from '../../components/VerbPage';

const base = import.meta.env.BASE_URL;

const aboutMeanings: MeaningData[] = [
  {
    definition: 'To try to get information about a subject or a person.',
    example: 'I need to call the hotel to ask about their parking rules.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Asking about hotel parking rules',
  },
];

const afterMeanings: MeaningData[] = [
  {
    definition: 'To ask for news about someone, usually concerning their health or how their life is going.',
    example: 'I saw your old manager yesterday, and he asked after you.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Asking after someone',
  },
];

const aroundMeanings: MeaningData[] = [
  {
    definition: 'To ask many different people the same question, usually to find information or get help.',
    example: "I don't know a good plumber, but I will ask around the office for you.",
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Asking around the office',
  },
  {
    definition: 'To invite someone to your home (British English — usually "ask round").',
    example: 'We should ask the new neighbors round for a cup of coffee.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Inviting neighbors for coffee',
  },
];

const awayMeanings: MeaningData[] = [
  {
    definition: 'An expression used to tell someone that they can start asking their questions.',
    example: 'If anyone has questions about the new software update, ask away!',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Encouraging someone to ask questions',
  },
];

const backMeanings: MeaningData[] = [
  {
    definition: 'To invite someone to return to a place (like your house or an event).',
    example: 'We had a great time with them, so we will definitely ask them back soon.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Inviting someone to return',
  },
  {
    definition: 'To invite someone to return for a second job interview.',
    example: 'The first interview went very well, so they asked her back for a second one.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Being invited back for a second interview',
  },
];

const downMeanings: MeaningData[] = [
  {
    definition: 'To invite someone to come downstairs from a higher floor.',
    example: 'His mother asked him down for breakfast.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Asking someone to come downstairs for breakfast',
  },
];

const forMeanings: MeaningData[] = [
  {
    definition: 'To request something to be given to you.',
    example: "I am going to the boss's office to ask for a pay rise.",
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Asking for a pay rise',
  },
  {
    definition: 'To say that you want to speak to a specific person.',
    example: 'When you arrive at the reception desk, ask for Mr. Smith.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Asking for a specific person at reception',
  },
  {
    definition: 'To behave in a way that will clearly cause trouble or problems (usually "asking for it" or "asking for trouble").',
    example: 'Driving that fast in the rain is just asking for trouble.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Driving fast in the rain — asking for trouble',
  },
];

const inMeanings: MeaningData[] = [
  {
    definition: 'To invite someone to come inside a building, house, or room.',
    example: 'It was raining heavily outside, so I asked her in to wait.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Inviting someone inside out of the rain',
  },
];

const intoMeanings: MeaningData[] = [
  {
    definition: 'Similar to "ask in," but used when specifying the exact room someone is invited into.',
    example: "The manager asked me into his office to discuss the new project.",
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: "Being asked into a manager's office",
  },
];

const offMeanings: MeaningData[] = [
  {
    definition: 'To request permission to not go to work for a specific period of time.',
    example: "I need to ask Friday off so I can attend my sister's wedding.",
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Asking for a day off work',
  },
];

const outMeanings: MeaningData[] = [
  {
    definition: 'To invite someone to go to a movie, restaurant, etc., because you want to start a romantic relationship with them.',
    example: 'He finally found the courage to ask her out on a date.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Asking someone out on a date',
  },
];

const overMeanings: MeaningData[] = [
  {
    definition: 'To invite someone to your home, usually for a short visit or a meal.',
    example: "Let's ask Tom and Sarah over for dinner this Saturday.",
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Inviting friends over for dinner',
  },
];

const upMeanings: MeaningData[] = [
  {
    definition: 'To invite someone to come upstairs to a higher floor.',
    example: 'I asked him up to my apartment to show him my new computer setup.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Asking someone to come upstairs',
  },
];

export const sections: SectionData[] = [
  { particle: 'about',          storageKey: 'askAbout_section_expanded',  storageKeyPrefix: 'askAbout',  meanings: aboutMeanings },
  { particle: 'after',          storageKey: 'askAfter_section_expanded',  storageKeyPrefix: 'askAfter',  meanings: afterMeanings },
  { particle: 'around / round', storageKey: 'askAround_section_expanded', storageKeyPrefix: 'askAround', meanings: aroundMeanings },
  { particle: 'away',           storageKey: 'askAway_section_expanded',   storageKeyPrefix: 'askAway',   meanings: awayMeanings },
  { particle: 'back',           storageKey: 'askBack_section_expanded',   storageKeyPrefix: 'askBack',   meanings: backMeanings },
  { particle: 'down',           storageKey: 'askDown_section_expanded',   storageKeyPrefix: 'askDown',   meanings: downMeanings },
  { particle: 'for',            storageKey: 'askFor_section_expanded',    storageKeyPrefix: 'askFor',    meanings: forMeanings },
  { particle: 'in',             storageKey: 'askIn_section_expanded',     storageKeyPrefix: 'askIn',     meanings: inMeanings },
  { particle: 'into',           storageKey: 'askInto_section_expanded',   storageKeyPrefix: 'askInto',   meanings: intoMeanings },
  { particle: 'off',            storageKey: 'askOff_section_expanded',    storageKeyPrefix: 'askOff',    meanings: offMeanings },
  { particle: 'out',            storageKey: 'askOut_section_expanded',    storageKeyPrefix: 'askOut',    meanings: outMeanings },
  { particle: 'over',           storageKey: 'askOver_section_expanded',   storageKeyPrefix: 'askOver',   meanings: overMeanings },
  { particle: 'up',             storageKey: 'askUp_section_expanded',     storageKeyPrefix: 'askUp',     meanings: upMeanings },
];

export default function AskVerbPage() {
  return <VerbPageLayout title="Ask" sections={sections} />;
}
