import VerbPageLayout, { MeaningData, SectionData } from '../../components/VerbPage';

const base = import.meta.env.BASE_URL;

const aboutMeanings: MeaningData[] = [
  {
    definition: 'To make a phone call concerning a specific topic.',
    example: 'I am calling about the open software engineering position.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person making a phone call about a job position',
  },
];

const acrossMeanings: MeaningData[] = [
  {
    definition: 'To shout to someone on the other side of a room, street, or space.',
    example: 'He called across the open-plan office to ask for the password.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person shouting across an open-plan office',
  },
];

const afterMeanings: MeaningData[] = [
  {
    definition: 'To shout to someone as they are walking away from you.',
    example: 'I called after him, but he had already entered the elevator.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person shouting after someone entering an elevator',
  },
  {
    definition: 'To give a child the same name as someone else.',
    example: 'He was called after his grandfather.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Child named after a grandfather',
  },
];

const aheadMeanings: MeaningData[] = [
  {
    definition: 'To telephone a place before you arrive there (often to make a reservation or check something).',
    example: 'We should call ahead to ensure the conference room is available.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person calling ahead to check conference room availability',
  },
];

const aroundMeanings: MeaningData[] = [
  {
    definition: 'To telephone several different people or companies, usually to get information or compare prices.',
    example: 'I will call around to find a better price for our cloud hosting.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person calling multiple companies to compare prices',
  },
  {
    definition: 'To visit someone\'s house casually.',
    example: 'Feel free to call round after work for a coffee.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person visiting a friend\'s house casually',
  },
];

const awayMeanings: MeaningData[] = [
  {
    definition: 'To ask someone to leave the place where they are to go somewhere else, usually for an emergency.',
    example: 'The director was called away to an urgent meeting.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Director being called away to an urgent meeting',
  },
];

const backMeanings: MeaningData[] = [
  {
    definition: 'To return a telephone call.',
    example: 'I am in a meeting, can I call you back in an hour?',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person returning a phone call after a meeting',
  },
  {
    definition: 'To ask someone to return for a second job interview.',
    example: 'They liked her portfolio and called her back for a final interview.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Candidate being called back for a final interview',
  },
];

const byMeanings: MeaningData[] = [
  {
    definition: 'To make a short, informal visit to a place while going somewhere else.',
    example: 'I\'ll call by the IT department on my way to lunch to drop off the broken mouse.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person making a brief visit to the IT department',
  },
];

const downMeanings: MeaningData[] = [
  {
    definition: 'To shout to someone who is on a lower level than you.',
    example: 'She called down from the second floor to ask if the package had arrived.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person shouting down from the second floor',
  },
  {
    definition: 'To request negative consequences or punishment upon someone (formal/literary).',
    example: 'He called down curses on his rivals.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person invoking curses on rivals',
  },
];

const forMeanings: MeaningData[] = [
  {
    definition: 'To demand or require a specific action or quality.',
    example: 'Managing a large team calls for great communication skills.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Manager requiring strong communication skills from team',
  },
  {
    definition: 'To publicly ask for something to happen.',
    example: 'The users are calling for better privacy features in the app.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Users demanding better privacy features',
  },
  {
    definition: 'To go to a place to pick someone or something up.',
    example: 'I will call for you at the hotel at 8:00 AM.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person picking someone up from a hotel',
  },
];

const forwardMeanings: MeaningData[] = [
  {
    definition: 'To ask someone to step to the front of a group.',
    example: 'The CEO called the project manager forward to receive an award.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'CEO calling project manager forward for an award',
  },
];

const inMeanings: MeaningData[] = [
  {
    definition: 'To ask an expert or specialist to come and help with a problem.',
    example: 'The system crashed, so we had to call in an external IT consultant.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'External IT consultant called in to fix a system crash',
  },
  {
    definition: 'To telephone your office or a radio/TV show.',
    example: 'Two team members called in sick today.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Team members calling in sick to the office',
  },
  {
    definition: 'To demand that people return a product because it is broken or dangerous (a recall).',
    example: 'The manufacturer called in thousands of laptops due to battery issues.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Manufacturer recalling laptops due to battery issues',
  },
];

const intoMeanings: MeaningData[] = [
  {
    definition: 'To call into question means to make people doubt something (idiom).',
    example: 'The recent security breach called into question the software\'s reliability.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Security breach calling software reliability into question',
  },
  {
    definition: 'To summon someone into a room.',
    example: 'The manager called him into the office for a performance review.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Manager summoning employee for a performance review',
  },
];

const offMeanings: MeaningData[] = [
  {
    definition: 'To cancel an event, meeting, or agreement that was planned.',
    example: 'We had to call off the project meeting because the lead developer was sick.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Project meeting being cancelled due to sick developer',
  },
  {
    definition: 'To order a person or animal to stop attacking or searching.',
    example: 'The manager told the legal team to call off their aggressive negotiations.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Manager calling off aggressive legal negotiations',
  },
];

const onMeanings: MeaningData[] = [
  {
    definition: 'To ask someone formally to speak or do something.',
    example: 'I would like to call on our CEO to say a few words.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Host calling on CEO to speak at an event',
  },
  {
    definition: 'To use a quality, skill, or resource that you have.',
    example: 'The team had to call on all their experience to fix the critical bug.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Team calling on their experience to fix a critical bug',
  },
  {
    definition: 'To visit someone for a short time (often formally).',
    example: 'We will call on the new client tomorrow morning.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Business team making a formal visit to a new client',
  },
];

const outMeanings: MeaningData[] = [
  {
    definition: 'To publicly criticize someone for doing something wrong.',
    example: 'The leader called out the team member for unprofessional behavior.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Leader calling out a team member for unprofessional behavior',
  },
  {
    definition: 'To ask a professional to come for an emergency.',
    example: 'We had to call out an engineer in the middle of the night.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Engineer called out for an emergency at night',
  },
  {
    definition: 'To speak loudly so someone can hear you.',
    example: 'The manager called out my name across the warehouse.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Manager calling out a name across a warehouse',
  },
];

const overMeanings: MeaningData[] = [
  {
    definition: 'To ask someone to come to where you are standing.',
    example: 'I called the junior developer over to look at my screen.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Developer calling a colleague over to look at their screen',
  },
  {
    definition: 'To read aloud a list of names to check who is present (mostly British English).',
    example: 'The trainer called over the names before the workshop started.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Trainer calling over names before a workshop',
  },
];

const throughMeanings: MeaningData[] = [
  {
    definition: 'To connect a phone call to someone else.',
    example: 'The receptionist called me through to the HR director.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Receptionist connecting a call to the HR director',
  },
];

const toMeanings: MeaningData[] = [
  {
    definition: 'To shout in order to get someone\'s attention.',
    example: 'She called to the cab driver to stop.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person shouting to a cab driver to stop',
  },
];

const togetherMeanings: MeaningData[] = [
  {
    definition: 'To formally ask a group of people to meet in one place.',
    example: 'We need to call the board of directors together to discuss the merger.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Board of directors called together to discuss a merger',
  },
];

const upMeanings: MeaningData[] = [
  {
    definition: 'To telephone someone.',
    example: 'I will call up the software vendor to ask about the pricing.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person calling a software vendor about pricing',
  },
  {
    definition: 'To find and show information on a computer screen.',
    example: 'Can you call up the latest sales data on your monitor?',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person displaying sales data on a computer monitor',
  },
  {
    definition: 'To officially order someone to join the military.',
    example: 'His grandfather was called up during the war.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Soldier being called up during wartime',
  },
  {
    definition: 'To make someone remember something.',
    example: 'The old office building called up memories of my first job.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Old office building evoking memories of a first job',
  },
];

export const sections: SectionData[] = [
  { particle: 'about',          storageKey: 'callAbout_section_expanded',   storageKeyPrefix: 'callAbout',   meanings: aboutMeanings },
  { particle: 'across',         storageKey: 'callAcross_section_expanded',  storageKeyPrefix: 'callAcross',  meanings: acrossMeanings },
  { particle: 'after',          storageKey: 'callAfter_section_expanded',   storageKeyPrefix: 'callAfter',   meanings: afterMeanings },
  { particle: 'ahead',          storageKey: 'callAhead_section_expanded',   storageKeyPrefix: 'callAhead',   meanings: aheadMeanings },
  { particle: 'around / round', storageKey: 'callAround_section_expanded',  storageKeyPrefix: 'callAround',  meanings: aroundMeanings },
  { particle: 'away',           storageKey: 'callAway_section_expanded',    storageKeyPrefix: 'callAway',    meanings: awayMeanings },
  { particle: 'back',           storageKey: 'callBack_section_expanded',    storageKeyPrefix: 'callBack',    meanings: backMeanings },
  { particle: 'by',             storageKey: 'callBy_section_expanded',      storageKeyPrefix: 'callBy',      meanings: byMeanings },
  { particle: 'down',           storageKey: 'callDown_section_expanded',    storageKeyPrefix: 'callDown',    meanings: downMeanings },
  { particle: 'for',            storageKey: 'callFor_section_expanded',     storageKeyPrefix: 'callFor',     meanings: forMeanings },
  { particle: 'forward',        storageKey: 'callForward_section_expanded', storageKeyPrefix: 'callForward', meanings: forwardMeanings },
  { particle: 'in',             storageKey: 'callIn_section_expanded',      storageKeyPrefix: 'callIn',      meanings: inMeanings },
  { particle: 'into',           storageKey: 'callInto_section_expanded',    storageKeyPrefix: 'callInto',    meanings: intoMeanings },
  { particle: 'off',            storageKey: 'callOff_section_expanded',     storageKeyPrefix: 'callOff',     meanings: offMeanings },
  { particle: 'on / upon',      storageKey: 'callOn_section_expanded',      storageKeyPrefix: 'callOn',      meanings: onMeanings },
  { particle: 'out',            storageKey: 'callOut_section_expanded',     storageKeyPrefix: 'callOut',     meanings: outMeanings },
  { particle: 'over',           storageKey: 'callOver_section_expanded',    storageKeyPrefix: 'callOver',    meanings: overMeanings },
  { particle: 'through',        storageKey: 'callThrough_section_expanded', storageKeyPrefix: 'callThrough', meanings: throughMeanings },
  { particle: 'to',             storageKey: 'callTo_section_expanded',      storageKeyPrefix: 'callTo',      meanings: toMeanings },
  { particle: 'together',       storageKey: 'callTogether_section_expanded',storageKeyPrefix: 'callTogether',meanings: togetherMeanings },
  { particle: 'up',             storageKey: 'callUp_section_expanded',      storageKeyPrefix: 'callUp',      meanings: upMeanings },
];

export default function CallVerbPage() {
  return <VerbPageLayout title="Call" sections={sections} />;
}
