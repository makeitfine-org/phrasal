import VerbPageLayout, { MeaningData, SectionData } from '../../components/VerbPage';

const base = import.meta.env.BASE_URL;

const aboutMeanings: MeaningData[] = [
  {
    definition: 'To treat someone or something roughly.',
    example: 'The older children were pulling the little boy about, so the teacher intervened.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Older children pulling a little boy about while teacher intervenes',
  },
];

const aheadMeanings: MeaningData[] = [
  {
    definition: 'To take the lead in a race or competition.',
    example: 'In the final months of the year, our software company finally pulled ahead of the competition.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Software company pulling ahead of the competition in the final months',
  },
];

const againstMeanings: MeaningData[] = [
  {
    definition: 'To resist or oppose a force.',
    example: 'The dog kept pulling against the leash.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Dog pulling against the leash',
  },
  {
    definition: 'To work in opposition to someone.',
    example: 'The team will fail if half the members are pulling against the manager.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Team members pulling against the manager causing failure',
  },
];

const apartMeanings: MeaningData[] = [
  {
    definition: 'To separate people or animals that are fighting.',
    example: 'The referee had to pull the two players apart.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Referee pulling two players apart during a fight',
  },
  {
    definition: 'To criticize heavily to show the flaws in something.',
    example: 'The manager pulled the marketing plan apart during the meeting.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Manager pulling the marketing plan apart during a meeting',
  },
  {
    definition: 'To break or tear something into pieces.',
    example: 'The child pulled the toy apart to see how it worked.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Child pulling a toy apart to see how it works',
  },
];

const aroundRoundMeanings: MeaningData[] = [
  {
    definition: 'To recover from a serious illness or injury (mostly British English).',
    example: 'He was very sick after the surgery, but the doctors say he will pull round.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Patient recovering after surgery as doctors say he will pull round',
  },
];

const awayMeanings: MeaningData[] = [
  {
    definition: 'To start moving (usually a vehicle).',
    example: 'The train pulled away from the station exactly on time.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Train pulling away from the station exactly on time',
  },
  {
    definition: 'To move your body back from someone.',
    example: 'She pulled away when he tried to grab her arm.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person pulling away when someone tries to grab their arm',
  },
  {
    definition: 'To increase your lead in a competition.',
    example: 'In the second half of the race, the leading runner pulled away from the rest of the group.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Leading runner pulling away from the rest of the group in the second half',
  },
];

const backMeanings: MeaningData[] = [
  {
    definition: 'To retreat or move backwards.',
    example: 'The army was ordered to pull back from the city.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Army ordered to pull back from the city',
  },
  {
    definition: 'To decide not to do something you previously planned.',
    example: 'The investors pulled back from the deal at the last minute because of financial risks.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Investors pulling back from a deal at the last minute due to financial risks',
  },
];

const downMeanings: MeaningData[] = [
  {
    definition: 'To demolish or destroy a building.',
    example: 'They are pulling down the old factory to build a new office block.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Workers pulling down an old factory to build a new office block',
  },
  {
    definition: 'To make someone feel depressed or weak.',
    example: 'The stress of the new project is really pulling him down.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Project stress pulling a person down and making them feel depressed',
  },
  {
    definition: 'To earn a specific amount of money (informal).',
    example: 'As a senior Java developer, she pulls down a very high salary.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Senior Java developer pulling down a very high salary',
  },
];

const forMeanings: MeaningData[] = [
  {
    definition: 'To support, hope, or cheer for someone\'s success.',
    example: 'Good luck with your job interview tomorrow! We are all pulling for you.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Team pulling for a colleague before their job interview',
  },
];

const forwardMeanings: MeaningData[] = [
  {
    definition: 'To move a vehicle slightly forward.',
    example: 'Can you pull forward a little bit so I have room to park behind you?',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Driver pulling forward slightly to make room for parking',
  },
];

const inMeanings: MeaningData[] = [
  {
    definition: 'To arrive (usually for trains).',
    example: 'The train from Warsaw is pulling in at platform 3.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Train from Warsaw pulling in at platform 3',
  },
  {
    definition: 'To move a vehicle to the side of the road.',
    example: 'I need to pull in at the next gas station.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Driver pulling in at the next gas station',
  },
  {
    definition: 'To attract people or money.',
    example: 'The new advertising campaign is pulling in a lot of new customers.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'New advertising campaign pulling in many new customers',
  },
  {
    definition: 'To arrest someone.',
    example: 'The police pulled him in for questioning.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Police pulling someone in for questioning',
  },
];

const intoMeanings: MeaningData[] = [
  {
    definition: 'To arrive at a destination (for vehicles).',
    example: 'The bus pulled into the station twenty minutes late.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Bus pulling into the station twenty minutes late',
  },
];

const offMeanings: MeaningData[] = [
  {
    definition: 'To succeed in doing something very difficult or unexpected.',
    example: 'No one thought we could finish the software update by Friday, but the team pulled it off.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Team pulling off a software update by Friday against all expectations',
  },
  {
    definition: 'To drive a vehicle off the main road.',
    example: 'We pulled off the highway to find a place to eat.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Car pulling off the highway to find a place to eat',
  },
  {
    definition: 'To remove clothing quickly.',
    example: 'He pulled off his boots and left them by the door.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person pulling off their boots and leaving them by the door',
  },
];

const onMeanings: MeaningData[] = [
  {
    definition: 'To put on clothing quickly.',
    example: 'She pulled on a sweater because it was getting cold.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person pulling on a sweater because it is getting cold',
  },
  {
    definition: 'To breathe in smoke from a cigarette or pipe.',
    example: 'He pulled heavily on his cigar.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person pulling heavily on a cigar',
  },
];

const outMeanings: MeaningData[] = [
  {
    definition: 'To move into traffic (for vehicles).',
    example: 'A truck pulled out right in front of me, and I had to brake hard.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Truck pulling out in front of a car forcing the driver to brake hard',
  },
  {
    definition: 'To leave a station (for trains).',
    example: 'Our train was pulling out just as we arrived at the platform.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Train pulling out just as passengers arrive at the platform',
  },
  {
    definition: 'To withdraw from an agreement, deal, or situation.',
    example: 'The sponsor pulled out of the project due to budget cuts.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Sponsor pulling out of the project due to budget cuts',
  },
  {
    definition: 'To extract or remove something.',
    example: 'He reached into his bag and pulled out a laptop.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person reaching into their bag and pulling out a laptop',
  },
];

const overMeanings: MeaningData[] = [
  {
    definition: 'To stop a vehicle by the side of the road.',
    example: 'The police officer signaled for the driver to pull over.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Police officer signaling for a driver to pull over',
  },
];

const throughMeanings: MeaningData[] = [
  {
    definition: 'To recover from a very serious illness or injury.',
    example: 'It was a terrible accident, but the doctors are confident she will pull through.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Doctors confident that a patient will pull through after a terrible accident',
  },
  {
    definition: 'To succeed in a very difficult situation.',
    example: 'The economy was bad, but strong leadership helped the business pull through.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Strong leadership helping a business pull through a bad economy',
  },
];

const toMeanings: MeaningData[] = [
  {
    definition: 'To close something, like a door or window, but often without locking it.',
    example: 'Please pull the door to when you leave the office.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person pulling the door to when leaving the office',
  },
];

const togetherMeanings: MeaningData[] = [
  {
    definition: 'To work as a team to achieve something.',
    example: 'If we all pull together, we can finish this development phase by the deadline.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Team pulling together to finish a development phase by the deadline',
  },
  {
    definition: 'To collect or organize information/things.',
    example: 'I need an hour to pull together the data for the presentation.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person taking an hour to pull together data for a presentation',
  },
  {
    definition: 'To regain emotional control (often "pull yourself together").',
    example: 'You need to pull yourself together and focus on the task.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person pulling themselves together and focusing on the task',
  },
];

const upMeanings: MeaningData[] = [
  {
    definition: 'To slow down and stop a vehicle.',
    example: 'A black taxi pulled up outside the building.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Black taxi pulling up outside the building',
  },
  {
    definition: 'To bring information onto a computer screen.',
    example: 'Give me a second to pull up your account on my system.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person pulling up a customer account on their system',
  },
  {
    definition: 'To correct or criticize someone for a mistake.',
    example: 'The manager pulled him up on his constant lateness.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Manager pulling an employee up on their constant lateness',
  },
  {
    definition: 'To move a piece of furniture closer.',
    example: 'Pull up a chair and join our meeting.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person pulling up a chair to join a meeting',
  },
];

export const sections: SectionData[] = [
  { particle: 'about',          storageKey: 'pullAbout_section_expanded',   storageKeyPrefix: 'pullAbout',   meanings: aboutMeanings },
  { particle: 'ahead',          storageKey: 'pullAhead_section_expanded',   storageKeyPrefix: 'pullAhead',   meanings: aheadMeanings },
  { particle: 'against',        storageKey: 'pullAgainst_section_expanded', storageKeyPrefix: 'pullAgainst', meanings: againstMeanings },
  { particle: 'apart',          storageKey: 'pullApart_section_expanded',   storageKeyPrefix: 'pullApart',   meanings: apartMeanings },
  { particle: 'around / round', storageKey: 'pullAround_section_expanded',  storageKeyPrefix: 'pullAround',  meanings: aroundRoundMeanings },
  { particle: 'away',           storageKey: 'pullAway_section_expanded',    storageKeyPrefix: 'pullAway',    meanings: awayMeanings },
  { particle: 'back',           storageKey: 'pullBack_section_expanded',    storageKeyPrefix: 'pullBack',    meanings: backMeanings },
  { particle: 'down',           storageKey: 'pullDown_section_expanded',    storageKeyPrefix: 'pullDown',    meanings: downMeanings },
  { particle: 'for',            storageKey: 'pullFor_section_expanded',     storageKeyPrefix: 'pullFor',     meanings: forMeanings },
  { particle: 'forward',        storageKey: 'pullForward_section_expanded', storageKeyPrefix: 'pullForward', meanings: forwardMeanings },
  { particle: 'in',             storageKey: 'pullIn_section_expanded',      storageKeyPrefix: 'pullIn',      meanings: inMeanings },
  { particle: 'into',           storageKey: 'pullInto_section_expanded',    storageKeyPrefix: 'pullInto',    meanings: intoMeanings },
  { particle: 'off',            storageKey: 'pullOff_section_expanded',     storageKeyPrefix: 'pullOff',     meanings: offMeanings },
  { particle: 'on',             storageKey: 'pullOn_section_expanded',      storageKeyPrefix: 'pullOn',      meanings: onMeanings },
  { particle: 'out',            storageKey: 'pullOut_section_expanded',     storageKeyPrefix: 'pullOut',     meanings: outMeanings },
  { particle: 'over',           storageKey: 'pullOver_section_expanded',    storageKeyPrefix: 'pullOver',    meanings: overMeanings },
  { particle: 'through',        storageKey: 'pullThrough_section_expanded', storageKeyPrefix: 'pullThrough', meanings: throughMeanings },
  { particle: 'to',             storageKey: 'pullTo_section_expanded',      storageKeyPrefix: 'pullTo',      meanings: toMeanings },
  { particle: 'together',       storageKey: 'pullTogether_section_expanded',storageKeyPrefix: 'pullTogether',meanings: togetherMeanings },
  { particle: 'up',             storageKey: 'pullUp_section_expanded',      storageKeyPrefix: 'pullUp',      meanings: upMeanings },
];

export default function PullVerbPage() {
  return <VerbPageLayout title="Pull" sections={sections} />;
}
