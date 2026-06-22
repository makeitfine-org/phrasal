import VerbPageLayout, { MeaningData, SectionData } from '../../components/VerbPage';

const base = import.meta.env.BASE_URL;

const downMeanings: MeaningData[] = [
  {
    definition: 'To disappoint someone by failing to do what you promised or what they expected.',
    example: 'The manager promised a bonus, but she let the team down by canceling it.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Manager letting the team down by canceling a promised bonus',
  },
  {
    definition: 'To make clothing longer.',
    example: 'My son has grown so much that I need to let down his trousers.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Parent letting down the hem of trousers for a growing child',
  },
  {
    definition: 'To allow air to escape from something (like a tire).',
    example: 'Someone let down the tires on my car.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Someone letting down the tires on a car',
  },
];

const inMeanings: MeaningData[] = [
  {
    definition: 'To allow someone or something to enter a place.',
    example: 'Please open the door and let the client in.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person opening the door to let the client in',
  },
  {
    definition: 'To allow someone to share a secret or know about a special plan.',
    example: 'The CEO let me in on the new business strategy before it was announced.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'CEO letting an employee in on the new business strategy',
  },
];

const intoMeanings: MeaningData[] = [
  {
    definition: 'To allow someone to enter a room or building.',
    example: 'The security guard let us into the server room.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Security guard letting employees into the server room',
  },
  {
    definition: 'To share a secret with someone.',
    example: 'She let me into her plans for starting a new software company.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person sharing secret plans for starting a new software company',
  },
];

const offMeanings: MeaningData[] = [
  {
    definition: 'To not punish someone, or to give them a very light punishment.',
    example: 'The boss let him off with a warning for being late to the meeting.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Boss letting an employee off with a warning for being late',
  },
  {
    definition: 'To make a bomb explode, or to fire a gun or firework.',
    example: 'The children let off fireworks in the park to celebrate.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Children letting off fireworks in the park to celebrate',
  },
  {
    definition: 'To excuse someone from a duty or obligation.',
    example: 'My manager let me off early today so I could go to the doctor.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Manager letting an employee off early to go to the doctor',
  },
];

const onMeanings: MeaningData[] = [
  {
    definition: 'To reveal a secret or show that you know something.',
    example: "We are planning a surprise party, so please don't let on.",
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person being asked not to let on about a surprise party',
  },
  {
    definition: 'To pretend.',
    example: 'He let on that he was an expert in Java, but he actually knew very little.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person letting on that they are an expert in Java',
  },
];

const outMeanings: MeaningData[] = [
  {
    definition: 'To allow a person or animal to leave a place.',
    example: 'Someone left the gate open and let the dogs out.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Dogs being let out through an open gate',
  },
  {
    definition: 'To make clothing wider.',
    example: 'I gained a few kilos on holiday, so I need to let out this suit.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person letting out a suit after gaining weight on holiday',
  },
  {
    definition: 'To suddenly make a sound.',
    example: 'She let out a sigh of relief when the code finally compiled.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Developer letting out a sigh of relief when code finally compiled',
  },
  {
    definition: 'When a class, school, or meeting finishes and people can leave.',
    example: 'The leadership seminar lets out at 4:00 PM.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Leadership seminar letting out at 4:00 PM',
  },
];

const upMeanings: MeaningData[] = [
  {
    definition: 'To stop or become less severe (usually referring to bad weather or a difficult situation).',
    example: "The heavy workload hasn't let up since we started this new project.",
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Heavy workload not letting up since starting a new project',
  },
  {
    definition: 'To stop working as hard as you were before.',
    example: "We are close to the deadline, so we can't let up now.",
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Team unable to let up as deadline approaches',
  },
];

const byMeanings: MeaningData[] = [
  {
    definition: 'To move aside to allow someone or something to pass you.',
    example: 'Please step aside and let the paramedics by.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person stepping aside to let the paramedics by',
  },
];

const throughMeanings: MeaningData[] = [
  {
    definition: 'To allow someone or something to pass a barrier, a security check, or a test.',
    example: 'The firewall is strictly configured and will not let unauthorized traffic through.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Firewall not letting unauthorized traffic through',
  },
];

export const sections: SectionData[] = [
  { particle: 'down',    storageKey: 'letDown_section_expanded',    storageKeyPrefix: 'letDown',    meanings: downMeanings },
  { particle: 'in',      storageKey: 'letIn_section_expanded',      storageKeyPrefix: 'letIn',      meanings: inMeanings },
  { particle: 'into',    storageKey: 'letInto_section_expanded',    storageKeyPrefix: 'letInto',    meanings: intoMeanings },
  { particle: 'off',     storageKey: 'letOff_section_expanded',     storageKeyPrefix: 'letOff',     meanings: offMeanings },
  { particle: 'on',      storageKey: 'letOn_section_expanded',      storageKeyPrefix: 'letOn',      meanings: onMeanings },
  { particle: 'out',     storageKey: 'letOut_section_expanded',     storageKeyPrefix: 'letOut',     meanings: outMeanings },
  { particle: 'up',      storageKey: 'letUp_section_expanded',      storageKeyPrefix: 'letUp',      meanings: upMeanings },
  { particle: 'by',      storageKey: 'letBy_section_expanded',      storageKeyPrefix: 'letBy',      meanings: byMeanings },
  { particle: 'through', storageKey: 'letThrough_section_expanded', storageKeyPrefix: 'letThrough', meanings: throughMeanings },
];

export default function LetVerbPage() {
  return <VerbPageLayout title="Let" sections={sections} />;
}
