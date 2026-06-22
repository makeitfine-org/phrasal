import VerbPageLayout, { MeaningData, SectionData } from '../../components/VerbPage';

const base = import.meta.env.BASE_URL;

const aboutMeanings: MeaningData[] = [
  {
    definition: 'To talk about ideas in an informal way.',
    example: 'We knocked a few new software features around during the meeting.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Team knocking software feature ideas around during a meeting',
  },
  {
    definition: 'To relax or travel without a strict schedule.',
    example: 'After selling his startup, he knocked about Europe for a year.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person knocking about Europe after selling his startup',
  },
  {
    definition: 'When an object is somewhere in a room but not organised.',
    example: 'I have an old Java textbook knocking around my office.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Old Java textbook knocking around an office',
  },
  {
    definition: 'To hit someone repeatedly.',
    example: 'The robbers knocked the guard about.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Robbers knocking the guard about',
  },
];

const againstMeanings: MeaningData[] = [
  {
    definition: 'To accidentally hit something while moving.',
    example: 'I knocked against the server rack and unplugged a cable.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Accidentally knocking against a server rack and unplugging a cable',
  },
];

const apartMeanings: MeaningData[] = [
  {
    definition: 'To hit something so hard it breaks into pieces.',
    example: 'The storm knocked the old warehouse apart.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Storm knocking the old warehouse apart',
  },
];

const backMeanings: MeaningData[] = [
  {
    definition: 'To reject an offer or application.',
    example: 'The investors knocked back our business proposal.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Investors knocking back a business proposal',
  },
  {
    definition: 'To cost someone a large amount of money.',
    example: 'That new server knocked the company back $5,000.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'New server knocking the company back five thousand dollars',
  },
  {
    definition: 'To consume an alcoholic drink quickly.',
    example: 'He knocked back a coffee before the presentation.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person knocking back a coffee before a presentation',
  },
  {
    definition: 'To surprise or shock someone; to leave someone amazed or stunned.',
    example: 'The sudden drop in sales really knocked me back.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Sudden drop in sales knocking someone back',
  },
];

const downMeanings: MeaningData[] = [
  {
    definition: 'To destroy a building completely.',
    example: 'They knocked down the old office to build a new one.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Knocking down an old office to build a new one',
  },
  {
    definition: 'To reduce the cost of an item.',
    example: 'The vendor knocked down the price of the software license.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Vendor knocking down the price of a software license',
  },
  {
    definition: 'To successfully negotiate a discount.',
    example: 'I knocked the supplier down by 15%.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Negotiating a supplier down by fifteen percent',
  },
  {
    definition: 'To strike someone with a vehicle so they fall.',
    example: 'A delivery bike almost knocked him down.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Delivery bike almost knocking someone down',
  },
];

const inMeanings: MeaningData[] = [
  {
    definition: 'To hit a nail or object so it goes into a surface.',
    example: 'He knocked the nail in with a hammer.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Knocking a nail in with a hammer',
  },
];

const intoMeanings: MeaningData[] = [
  {
    definition: 'To unexpectedly meet someone you know.',
    example: 'I knocked into my old project manager at the tech conference.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Unexpectedly knocking into an old project manager at a tech conference',
  },
  {
    definition: 'To walk into something by accident.',
    example: 'She was looking at her phone and knocked into the desk.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person looking at phone and knocking into the desk',
  },
];

const offMeanings: MeaningData[] = [
  {
    definition: 'To finish your workday.',
    example: "Let's knock off early today and go home.",
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Team knocking off early to go home',
  },
  {
    definition: 'To remove an amount from a total.',
    example: 'Can you knock 10% off the final invoice?',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Knocking ten percent off a final invoice',
  },
  {
    definition: 'To produce a piece of work very quickly.',
    example: 'She knocked off the weekly report in just 20 minutes.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person knocking off the weekly report in twenty minutes',
  },
  {
    definition: 'To make a cheap imitation of a product illegally.',
    example: 'A competitor tried to knock off our main application.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Competitor trying to knock off the main application',
  },
  {
    definition: 'To rob a place (informal).',
    example: 'The thieves knocked off a local bank.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Thieves knocking off a local bank',
  },
  {
    definition: 'To kill someone (informal).',
    example: 'The gang knocked him off.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Gang knocking someone off',
  },
];

const onMeanings: MeaningData[] = [
  {
    definition: 'To hit a door repeatedly.',
    example: 'I knocked on, but no one answered the door.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Knocking on a door with no answer',
  },
  {
    definition: 'Used as "knock-on effect" to describe how one event causes another.',
    example: 'The bug in the Java code had a knock-on effect on the whole database.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Bug in Java code having a knock-on effect on the database',
  },
];

const outMeanings: MeaningData[] = [
  {
    definition: 'To hit someone so hard they become unconscious.',
    example: 'The boxer knocked his opponent out in the first round.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Boxer knocking opponent out in the first round',
  },
  {
    definition: 'To remove a person or team from a competition.',
    example: 'Our team was knocked out in the quarter-finals.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Team knocked out in the quarter-finals',
  },
  {
    definition: 'To stop a system from working.',
    example: 'The power outage knocked out our main servers.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Power outage knocking out main servers',
  },
  {
    definition: 'To create something at high speed.',
    example: 'The developers can knock out a prototype by tomorrow.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Developers knocking out a prototype by tomorrow',
  },
  {
    definition: 'To greatly impress someone.',
    example: 'Her leadership skills completely knocked me out.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Leadership skills completely knocking someone out with admiration',
  },
];

const overMeanings: MeaningData[] = [
  {
    definition: 'To hit something so it falls on its side.',
    example: 'I accidentally knocked over my coffee onto the keyboard.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Accidentally knocking over coffee onto the keyboard',
  },
  {
    definition: 'To steal from a business (informal).',
    example: 'They knocked over a gas station.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Thieves knocking over a gas station',
  },
];

const throughMeanings: MeaningData[] = [
  {
    definition: 'To remove a wall between two spaces to connect rooms.',
    example: 'We knocked through the wall to create an open-plan office.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Knocking through a wall to create an open-plan office',
  },
];

const togetherMeanings: MeaningData[] = [
  {
    definition: 'To create something quickly using whatever is available.',
    example: 'I knocked together a quick test environment for the new app.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Knocking together a quick test environment for a new app',
  },
];

const upMeanings: MeaningData[] = [
  {
    definition: 'To make a meal or item in a short time.',
    example: 'Let me knock up a quick presentation for the client.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Knocking up a quick presentation for a client',
  },
  {
    definition: 'To knock on a door to wake someone (UK English).',
    example: 'Can you knock me up at 6 AM?',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Knocking someone up at six in the morning',
  },
  {
    definition: 'To make someone pregnant (informal/slang).',
    example: 'He knocked his girlfriend up.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Informal reference to knocking someone up',
  },
  {
    definition: 'To warm up for tennis by hitting the ball before a match.',
    example: 'The players are knocking up on the court.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Tennis players knocking up on the court before a match',
  },
];

export const sections: SectionData[] = [
  { particle: 'about / around / round', storageKey: 'knockAbout_section_expanded',   storageKeyPrefix: 'knockAbout',    meanings: aboutMeanings },
  { particle: 'against',                storageKey: 'knockAgainst_section_expanded',  storageKeyPrefix: 'knockAgainst',  meanings: againstMeanings },
  { particle: 'apart',                  storageKey: 'knockApart_section_expanded',    storageKeyPrefix: 'knockApart',    meanings: apartMeanings },
  { particle: 'back',                   storageKey: 'knockBack_section_expanded',     storageKeyPrefix: 'knockBack',     meanings: backMeanings },
  { particle: 'down',                   storageKey: 'knockDown_section_expanded',     storageKeyPrefix: 'knockDown',     meanings: downMeanings },
  { particle: 'in',                     storageKey: 'knockIn_section_expanded',       storageKeyPrefix: 'knockIn',       meanings: inMeanings },
  { particle: 'into',                   storageKey: 'knockInto_section_expanded',     storageKeyPrefix: 'knockInto',     meanings: intoMeanings },
  { particle: 'off',                    storageKey: 'knockOff_section_expanded',      storageKeyPrefix: 'knockOff',      meanings: offMeanings },
  { particle: 'on',                     storageKey: 'knockOn_section_expanded',       storageKeyPrefix: 'knockOn',       meanings: onMeanings },
  { particle: 'out',                    storageKey: 'knockOut_section_expanded',      storageKeyPrefix: 'knockOut',      meanings: outMeanings },
  { particle: 'over',                   storageKey: 'knockOver_section_expanded',     storageKeyPrefix: 'knockOver',     meanings: overMeanings },
  { particle: 'through',                storageKey: 'knockThrough_section_expanded',  storageKeyPrefix: 'knockThrough',  meanings: throughMeanings },
  { particle: 'together',               storageKey: 'knockTogether_section_expanded', storageKeyPrefix: 'knockTogether', meanings: togetherMeanings },
  { particle: 'up',                     storageKey: 'knockUp_section_expanded',       storageKeyPrefix: 'knockUp',       meanings: upMeanings },
];

export default function KnockVerbPage() {
  return <VerbPageLayout title="Knock" sections={sections} />;
}
