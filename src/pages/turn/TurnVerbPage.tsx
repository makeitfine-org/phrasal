import VerbPageLayout, { MeaningData, SectionData } from '../../components/VerbPage';

const base = import.meta.env.BASE_URL;

const aboutMeanings: MeaningData[] = [
  {
    definition: 'To physically turn to face the opposite direction.',
    example: 'The soldier turned about and marched away.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Soldier turning to face the opposite direction',
  },
];

const againstMeanings: MeaningData[] = [
  {
    definition: 'To suddenly become hostile toward someone or something.',
    example: 'The public turned against the mayor after the scandal broke.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Public becoming hostile toward the mayor after a scandal',
  },
  {
    definition: 'To cause someone to be hostile toward another person.',
    example: 'She tried to turn the team against their new manager.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person trying to turn a team against their new manager',
  },
];

const aroundMeanings: MeaningData[] = [
  {
    definition: 'To change direction and face the opposite way.',
    example: 'Turn around and look at the camera.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person turning around to face the camera',
  },
  {
    definition: 'To dramatically improve a bad situation or make a failing business successful.',
    example: 'The new CEO managed to turn the struggling company around in just two years.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'CEO turning around a struggling company in two years',
  },
  {
    definition: 'To complete a piece of work or fulfill a request within a specific timeframe.',
    example: 'We can turn this project around by Friday afternoon.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Team completing a project turnaround by Friday',
  },
];

const awayMeanings: MeaningData[] = [
  {
    definition: 'To refuse someone entry or admittance.',
    example: 'The bouncer turned us away because the club was at full capacity.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Bouncer turning people away from a full club',
  },
  {
    definition: 'To look in a different direction, often out of disgust, shame, or lack of interest.',
    example: 'The movie scene was so gruesome that I had to turn away.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person turning away from a gruesome movie scene',
  },
];

const backMeanings: MeaningData[] = [
  {
    definition: 'To return the way you came, usually because of a problem.',
    example: 'The snowstorm was so heavy that we had to turn back.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Travellers turning back due to a heavy snowstorm',
  },
  {
    definition: 'To reverse a process or return to a previous state.',
    example: "We've come too far to turn back the clock now.",
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person unable to turn back the clock on progress',
  },
  {
    definition: 'To fold back a cover or page.',
    example: 'Turn back the first page to see the dedication.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person folding back the first page of a book',
  },
];

const downMeanings: MeaningData[] = [
  {
    definition: 'To decrease the volume, heat, or power of a device.',
    example: "Please turn down the music; it's too loud.",
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person turning down loud music',
  },
  {
    definition: 'To reject or refuse an offer, request, or person.',
    example: 'She turned down the job offer because the salary was too low.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person turning down a job offer due to low salary',
  },
  {
    definition: 'To fold down the covers of a bed in preparation for sleep.',
    example: 'The hotel staff turned down the bed while we were at dinner.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Hotel staff turning down the bed covers',
  },
];

const inMeanings: MeaningData[] = [
  {
    definition: 'To submit an assignment, report, or document.',
    example: "Don't forget to turn in your paperwork by the end of the day.",
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person turning in paperwork by end of day',
  },
  {
    definition: 'To go to bed (informal).',
    example: "I'm exhausted; I think I'll turn in early tonight.",
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Tired person turning in early for the night',
  },
  {
    definition: 'To surrender to the authorities or police.',
    example: 'The fugitive finally turned himself in after a week on the run.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Fugitive turning himself in to the police',
  },
  {
    definition: 'To produce a particular amount or degree of something (like a performance).',
    example: 'The team turned in an outstanding performance during the final match.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Team turning in an outstanding performance in the final',
  },
];

const intoMeanings: MeaningData[] = [
  {
    definition: 'To transform or change into something completely different.',
    example: 'The caterpillar turned into a beautiful butterfly.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Caterpillar transforming into a butterfly',
  },
  {
    definition: 'To direct a vehicle into a specific space or road.',
    example: 'He turned into the driveway and parked the car.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Driver turning into a driveway to park',
  },
];

const offMeanings: MeaningData[] = [
  {
    definition: 'To stop a machine, device, or flow of power.',
    example: 'Remember to turn off the lights when you leave the room.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person turning off the lights when leaving a room',
  },
  {
    definition: 'To cause someone to lose interest, enthusiasm, or sexual arousal.',
    example: 'His arrogance is a massive turn-off for me.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person turned off by someone else\'s arrogance',
  },
  {
    definition: 'To leave a road or path to go onto another.',
    example: 'We need to turn off the highway at the next exit.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Driver turning off the highway at an exit',
  },
];

const onMeanings: MeaningData[] = [
  {
    definition: 'To start a machine, device, or flow of power.',
    example: 'Can you turn on the air conditioning?',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person turning on the air conditioning',
  },
  {
    definition: 'To suddenly and unexpectedly attack someone, physically or verbally.',
    example: 'The previously friendly dog suddenly turned on the stranger.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Dog suddenly turning on a stranger',
  },
  {
    definition: 'To cause someone to feel excited or sexually aroused.',
    example: 'Confidence is a trait that really turns people on.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Confident person attracting others',
  },
  {
    definition: 'To depend or hinge entirely on a specific detail.',
    example: 'The entire legal case turns on the forensic evidence.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Legal case hinging on forensic evidence',
  },
];

const outMeanings: MeaningData[] = [
  {
    definition: 'To end up or result in a particular way.',
    example: 'Despite the rain, the outdoor party turned out to be a great success.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Outdoor party turning out to be a success despite rain',
  },
  {
    definition: 'To attend an event or gather as a crowd.',
    example: 'A massive crowd turned out for the free concert in the park.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Massive crowd turning out for a free concert',
  },
  {
    definition: 'To extinguish a light.',
    example: 'Turn out the lights before you go to sleep.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person turning out the lights before sleeping',
  },
  {
    definition: 'To produce or manufacture something.',
    example: 'That factory turns out over five hundred cars a day.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Factory turning out five hundred cars a day',
  },
  {
    definition: "To empty one's pockets or a receptacle.",
    example: 'The security guard asked him to turn out his pockets.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Security guard asking someone to turn out their pockets',
  },
];

const overMeanings: MeaningData[] = [
  {
    definition: 'To flip something so the other side faces up.',
    example: "If your pancakes are bubbling, it's time to turn them over.",
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person flipping pancakes when they start bubbling',
  },
  {
    definition: 'To transfer control, responsibility, or possession to someone else.',
    example: 'He turned the business over to his daughter when he retired.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Business owner transferring control to his daughter',
  },
  {
    definition: 'To start an engine (referring to the mechanical rotation).',
    example: "The battery was dead, so the engine wouldn't even turn over.",
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Dead car battery preventing the engine from turning over',
  },
  {
    definition: 'To generate a specific amount of revenue in a business.',
    example: 'The retail store turns over a million dollars annually.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Retail store generating a million dollars in annual turnover',
  },
  {
    definition: 'To think about a concept or idea carefully.',
    example: 'She turned the idea over in her mind before giving an answer.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person carefully turning an idea over in their mind',
  },
];

const toMeanings: MeaningData[] = [
  {
    definition: 'To go to someone or something for help, advice, or comfort.',
    example: 'When I have a problem, I always turn to my best friend.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person turning to their best friend for help',
  },
  {
    definition: 'To start doing a particular activity or habit, often a negative one, to cope with stress.',
    example: 'He turned to drinking after he lost his job.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person turning to drinking after losing their job',
  },
  {
    definition: 'To direct your attention to a new topic or to a specific page.',
    example: "Let's turn to page 42 in the textbook.",
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Students turning to a specific page in the textbook',
  },
];

const upMeanings: MeaningData[] = [
  {
    definition: 'To increase the volume, heat, or power of a device.',
    example: 'Can you turn up the radio? I love this song.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person turning up the radio volume',
  },
  {
    definition: 'To appear unexpectedly or arrive, sometimes late.',
    example: 'He turned up at the party completely uninvited.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person turning up uninvited at a party',
  },
  {
    definition: 'To be found, usually by accident, after being lost.',
    example: "Don't worry, your missing keys will turn up eventually.",
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Missing keys turning up after being lost',
  },
  {
    definition: 'To shorten a garment by folding the hem upward.',
    example: 'I bought these trousers, but they are too long and need to be turned up.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Tailor turning up the hem of trousers',
  },
];

export const sections: SectionData[] = [
  { particle: 'about',          storageKey: 'turnAbout_section_expanded',   storageKeyPrefix: 'turnAbout',   meanings: aboutMeanings },
  { particle: 'against',        storageKey: 'turnAgainst_section_expanded', storageKeyPrefix: 'turnAgainst', meanings: againstMeanings },
  { particle: 'around / round', storageKey: 'turnAround_section_expanded',  storageKeyPrefix: 'turnAround',  meanings: aroundMeanings },
  { particle: 'away',           storageKey: 'turnAway_section_expanded',    storageKeyPrefix: 'turnAway',    meanings: awayMeanings },
  { particle: 'back',           storageKey: 'turnBack_section_expanded',    storageKeyPrefix: 'turnBack',    meanings: backMeanings },
  { particle: 'down',           storageKey: 'turnDown_section_expanded',    storageKeyPrefix: 'turnDown',    meanings: downMeanings },
  { particle: 'in',             storageKey: 'turnIn_section_expanded',      storageKeyPrefix: 'turnIn',      meanings: inMeanings },
  { particle: 'into',           storageKey: 'turnInto_section_expanded',    storageKeyPrefix: 'turnInto',    meanings: intoMeanings },
  { particle: 'off',            storageKey: 'turnOff_section_expanded',     storageKeyPrefix: 'turnOff',     meanings: offMeanings },
  { particle: 'on',             storageKey: 'turnOn_section_expanded',      storageKeyPrefix: 'turnOn',      meanings: onMeanings },
  { particle: 'out',            storageKey: 'turnOut_section_expanded',     storageKeyPrefix: 'turnOut',     meanings: outMeanings },
  { particle: 'over',           storageKey: 'turnOver_section_expanded',    storageKeyPrefix: 'turnOver',    meanings: overMeanings },
  { particle: 'to',             storageKey: 'turnTo_section_expanded',      storageKeyPrefix: 'turnTo',      meanings: toMeanings },
  { particle: 'up',             storageKey: 'turnUp_section_expanded',      storageKeyPrefix: 'turnUp',      meanings: upMeanings },
];

export default function TurnVerbPage() {
  return <VerbPageLayout title="Turn" sections={sections} />;
}
