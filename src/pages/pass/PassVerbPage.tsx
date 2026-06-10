import VerbPageLayout, { MeaningData, SectionData } from '../../components/VerbPage';

const base = import.meta.env.BASE_URL;

const awayMeanings: MeaningData[] = [
  {
    definition: 'To die (a polite and respectful phrase).',
    example: 'The founder of the company passed away peacefully last year.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'The founder of the company passed away peacefully last year',
  },
];

const byMeanings: MeaningData[] = [
  {
    definition: 'To go past a place or person.',
    example: 'I pass by your office every morning on my way to get coffee.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person passing by an office every morning on the way to get coffee',
  },
  {
    definition: 'To happen without affecting someone, or to miss an opportunity.',
    example: 'We cannot let this great market opportunity pass us by.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Team unable to let a great market opportunity pass them by',
  },
];

const downMeanings: MeaningData[] = [
  {
    definition: 'To give knowledge, skills, or items to younger generations or junior members.',
    example: 'The senior manager passed down her negotiation skills to the new team members.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Senior manager passing down negotiation skills to new team members',
  },
];

const forMeanings: MeaningData[] = [
  {
    definition: 'To be accepted as something else, often despite not being it.',
    example: 'His Java skills are so good that he could easily pass for a senior developer.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Developer with such good Java skills that he could pass for a senior developer',
  },
];

const inMeanings: MeaningData[] = [
  {
    definition: 'To give work to a teacher or manager (similar to "hand in").',
    example: 'Please remember to pass in your project reports by Friday afternoon.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Employee passing in project reports by Friday afternoon',
  },
];

const intoMeanings: MeaningData[] = [
  {
    definition: 'To become part of something, usually history or legend.',
    example: 'His successful software release passed into company history.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A successful software release passing into company history',
  },
];

const offMeanings: MeaningData[] = [
  {
    definition: 'To falsely present someone or something as something else.',
    example: 'He tried to pass off the copied code as his own original work.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Developer trying to pass off copied code as his own original work',
  },
  {
    definition: 'To happen or take place in a certain way.',
    example: 'The project launch passed off without any major problems.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Project launch passing off without any major problems',
  },
];

const onMeanings: MeaningData[] = [
  {
    definition: 'To give information or an object to someone else.',
    example: 'Please pass on this message to the development team.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person passing on a message to the development team',
  },
  {
    definition: 'To refuse an opportunity or offer.',
    example: 'I think I will pass on the invitation to the conference.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person deciding to pass on the invitation to the conference',
  },
  {
    definition: 'To die (another polite phrase).',
    example: 'Sadly, his grandfather passed on last week.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: "Person's grandfather sadly passing on last week",
  },
];

const outMeanings: MeaningData[] = [
  {
    definition: 'To distribute something to a group of people.',
    example: 'Could you pass out these documents before the management meeting starts?',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person passing out documents before the management meeting starts',
  },
  {
    definition: 'To lose consciousness or faint.',
    example: 'It was so hot in the server room that he almost passed out.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person almost passing out because it was so hot in the server room',
  },
];

const overMeanings: MeaningData[] = [
  {
    definition: 'To ignore or not choose someone for a position or promotion.',
    example: 'She was passed over for the leadership role, so she decided to leave the company.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Employee passed over for the leadership role deciding to leave the company',
  },
  {
    definition: 'To ignore a topic in a conversation.',
    example: "Let's pass over this minor detail and focus on the main strategy.",
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Team deciding to pass over a minor detail and focus on the main strategy',
  },
];

const throughMeanings: MeaningData[] = [
  {
    definition: 'To travel or stop in a place for a very short time.',
    example: 'I am just passing through Warsaw, so I only have time for a quick lunch.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Traveller passing through Warsaw with only time for a quick lunch',
  },
  {
    definition: 'To experience a phase or situation.',
    example: 'The tech industry is passing through a difficult period right now.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'The tech industry passing through a difficult period',
  },
];

const toMeanings: MeaningData[] = [
  {
    definition: 'To transfer ownership or responsibility to someone else.',
    example: 'When the CEO retired, leadership passed to her deputy.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Leadership passing to the deputy when the CEO retired',
  },
];

const upMeanings: MeaningData[] = [
  {
    definition: 'To fail to take advantage of an opportunity.',
    example: 'You should not pass up the chance to lead this new team.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person being advised not to pass up the chance to lead a new team',
  },
];

const aroundMeanings: MeaningData[] = [
  {
    definition: 'To offer or give something to every person in a group.',
    example: 'They passed around the tablet so everyone could see the new app design.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Team passing around a tablet so everyone could see the new app design',
  },
];

export const sections: SectionData[] = [
  { particle: 'away',                  storageKey: 'passAway_section_expanded',    storageKeyPrefix: 'passAway',    meanings: awayMeanings },
  { particle: 'by',                    storageKey: 'passBy_section_expanded',      storageKeyPrefix: 'passBy',      meanings: byMeanings },
  { particle: 'down',                  storageKey: 'passDown_section_expanded',    storageKeyPrefix: 'passDown',    meanings: downMeanings },
  { particle: 'for',                   storageKey: 'passFor_section_expanded',     storageKeyPrefix: 'passFor',     meanings: forMeanings },
  { particle: 'in',                    storageKey: 'passIn_section_expanded',      storageKeyPrefix: 'passIn',      meanings: inMeanings },
  { particle: 'into',                  storageKey: 'passInto_section_expanded',    storageKeyPrefix: 'passInto',    meanings: intoMeanings },
  { particle: 'off',                   storageKey: 'passOff_section_expanded',     storageKeyPrefix: 'passOff',     meanings: offMeanings },
  { particle: 'on',                    storageKey: 'passOn_section_expanded',      storageKeyPrefix: 'passOn',      meanings: onMeanings },
  { particle: 'out',                   storageKey: 'passOut_section_expanded',     storageKeyPrefix: 'passOut',     meanings: outMeanings },
  { particle: 'over',                  storageKey: 'passOver_section_expanded',    storageKeyPrefix: 'passOver',    meanings: overMeanings },
  { particle: 'through',               storageKey: 'passThrough_section_expanded', storageKeyPrefix: 'passThrough', meanings: throughMeanings },
  { particle: 'to',                    storageKey: 'passTo_section_expanded',      storageKeyPrefix: 'passTo',      meanings: toMeanings },
  { particle: 'up',                    storageKey: 'passUp_section_expanded',      storageKeyPrefix: 'passUp',      meanings: upMeanings },
  { particle: 'around / round / about', storageKey: 'passAround_section_expanded', storageKeyPrefix: 'passAround',  meanings: aroundMeanings },
];

export default function PassVerbPage() {
  return <VerbPageLayout title="Pass" sections={sections} />;
}
