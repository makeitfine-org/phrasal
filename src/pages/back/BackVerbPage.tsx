import VerbPageLayout, { MeaningData, SectionData } from '../../components/VerbPage';

const base = import.meta.env.BASE_URL;

const awayMeanings: MeaningData[] = [
  {
    definition: 'To move backwards to get away from someone or something frightening.',
    example: 'The developer backed away from the hot server rack.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Backing away from a hot server rack',
  },
  {
    definition: 'To show that you do not support a plan or idea anymore, or to avoid a difficult situation.',
    example: 'The investors started to back away from the project when costs increased.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Investors backing away from a project',
  },
];

const downMeanings: MeaningData[] = [
  {
    definition: 'To admit that you were wrong, or to stop demanding something because of opposition.',
    example: 'A good manager knows when to back down during a heated argument with a team member.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A manager backing down in an argument',
  },
];

const inMeanings: MeaningData[] = [
  {
    definition: 'To drive a vehicle backward into a parking space.',
    example: 'It is much safer to back in to this parking spot so you can drive out easily later.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Backing a car into a parking spot',
  },
];

const intoMeanings: MeaningData[] = [
  {
    definition: 'To drive a vehicle backwards and accidentally hit something.',
    example: "I accidentally backed into the CEO's car this morning.",
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Accidentally backing into a car',
  },
  {
    definition: 'To get into a career or situation by chance, rather than by planning (informal).',
    example: "She didn't study management; she just backed into the leadership role when her boss left.",
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Unexpectedly moving into a leadership role',
  },
];

const offMeanings: MeaningData[] = [
  {
    definition: 'To move backward away from danger or a threat.',
    example: 'The security guard told the angry customer to back off.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A security guard telling someone to back off',
  },
  {
    definition: 'To stop criticizing someone or telling them what to do.',
    example: 'You need to back off and let your software team solve the problem on their own.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Giving a team space to solve problems',
  },
  {
    definition: 'To stop supporting an idea, or to decide not to do something you were planning to do.',
    example: 'The company backed off from their plan to release the software early.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A company backing off from an early release plan',
  },
];

const ontoMeanings: MeaningData[] = [
  {
    definition: 'If a building backs onto something, the back of the building faces it.',
    example: 'Our new corporate headquarters backs onto a beautiful public park.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A building backing onto a public park',
  },
];

const outMeanings: MeaningData[] = [
  {
    definition: 'To drive a vehicle backward out of a space.',
    example: 'She backed out of the garage very slowly.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Backing a car out of a garage',
  },
  {
    definition: 'To decide not to do something that you agreed or promised to do.',
    example: 'The client tried to back out of the contract at the last minute.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A client backing out of a contract',
  },
];

const overMeanings: MeaningData[] = [
  {
    definition: 'To drive a vehicle backwards over something or someone.',
    example: 'I accidentally backed over my laptop bag in the driveway.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Accidentally backing over a laptop bag',
  },
];

const upMeanings: MeaningData[] = [
  {
    definition: 'To move backwards.',
    example: 'Could you back up a few steps so I can see the screen?',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Moving backward to see a screen',
  },
  {
    definition: 'To support someone or confirm that what they are saying is true.',
    example: 'I will pitch the new Java framework to the board, but I need you to back me up.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A colleague backing up a pitch to the board',
  },
  {
    definition: 'To make a copy of computer data so it is not lost.',
    example: 'Always back up the database before deploying a major update.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Backing up a database before deployment',
  },
  {
    definition: 'To cause traffic to stop or move very slowly.',
    example: 'The accident backed up traffic on the highway for miles.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'An accident causing traffic to back up',
  },
];

export const sections: SectionData[] = [
  { particle: 'away',         storageKey: 'backAway_section_expanded',  storageKeyPrefix: 'backAway',  meanings: awayMeanings },
  { particle: 'down',         storageKey: 'backDown_section_expanded',  storageKeyPrefix: 'backDown',  meanings: downMeanings },
  { particle: 'in',           storageKey: 'backIn_section_expanded',    storageKeyPrefix: 'backIn',    meanings: inMeanings },
  { particle: 'into',         storageKey: 'backInto_section_expanded',  storageKeyPrefix: 'backInto',  meanings: intoMeanings },
  { particle: 'off',          storageKey: 'backOff_section_expanded',   storageKeyPrefix: 'backOff',   meanings: offMeanings },
  { particle: 'onto',         storageKey: 'backOnto_section_expanded',  storageKeyPrefix: 'backOnto',  meanings: ontoMeanings },
  { particle: 'out / out of', storageKey: 'backOut_section_expanded',   storageKeyPrefix: 'backOut',   meanings: outMeanings },
  { particle: 'over',         storageKey: 'backOver_section_expanded',  storageKeyPrefix: 'backOver',  meanings: overMeanings },
  { particle: 'up',           storageKey: 'backUp_section_expanded',    storageKeyPrefix: 'backUp',    meanings: upMeanings },
];

export default function BackVerbPage() {
  return <VerbPageLayout title="Back" sections={sections} />;
}
