import VerbPageLayout, { MeaningData, SectionData } from '../../components/VerbPage';

const base = import.meta.env.BASE_URL;

const againstMeanings: MeaningData[] = [
  {
    definition: 'To compare one thing with another to see if they match or to find differences.',
    example: 'The finance team must check the monthly expenses against the budget.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Finance team comparing expenses against budget',
  },
];

const aroundMeanings: MeaningData[] = [
  {
    definition: 'To look in various places or ask several people for information (often to compare prices or options).',
    example: 'We should check around for a cheaper cloud hosting provider before signing a contract.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Team checking around for a cheaper cloud provider',
  },
];

const backMeanings: MeaningData[] = [
  {
    definition: 'To return later to see if something has happened or is ready.',
    example: 'The system is still restarting; please check back in five minutes.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'System restarting, check back later',
  },
];

const downMeanings: MeaningData[] = [
  {
    definition: 'To go down a list of options until you find one that works (often used in processes or sports).',
    example: 'If the main database fails, the system will check down the list and connect to the backup server.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'System checking down a list to connect to backup server',
  },
];

const forMeanings: MeaningData[] = [
  {
    definition: 'To look closely to find a specific thing (often errors, signs, or problems).',
    example: 'We ran automated tests to check for security bugs in the code.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Automated tests checking for security bugs',
  },
];

const inMeanings: MeaningData[] = [
  {
    definition: 'To register your arrival at a hotel, airport, or event.',
    example: 'The CEO checked in at the hotel right before the leadership conference.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'CEO checking in at a hotel',
  },
  {
    definition: 'To contact someone briefly to give an update or make sure everything is okay.',
    example: "Let's check in on Friday to discuss the sprint results.",
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Team checking in on Friday to discuss sprint results',
  },
  {
    definition: 'To upload or save source code to a version control system (like Git or SVN).',
    example: 'Make sure to check in your Java code before you leave for the weekend.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Developer checking in Java code to version control',
  },
  {
    definition: 'To leave your bags at the airport before a flight.',
    example: 'I need to check in my heavy suitcase.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Passenger checking in a heavy suitcase',
  },
];

const intoMeanings: MeaningData[] = [
  {
    definition: 'To arrive and register at a hotel, clinic, or hospital.',
    example: 'We checked into the Hilton at 3:00 PM.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Guests checking into the Hilton',
  },
  {
    definition: 'To investigate or look for more information about a problem.',
    example: 'The application keeps crashing; the IT team needs to check into it immediately.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'IT team checking into a crashing application',
  },
];

const offMeanings: MeaningData[] = [
  {
    definition: 'To mark an item on a list to show that it has been completed or verified.',
    example: 'After completing the code review, I checked off the task in Jira.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Developer checking off a task in Jira',
  },
];

const onMeanings: MeaningData[] = [
  {
    definition: 'To look at someone or something to make sure they are safe, progressing well, or in good condition.',
    example: 'The manager stopped by to check on the new Java developers.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Manager checking on new Java developers',
  },
];

const outMeanings: MeaningData[] = [
  {
    definition: 'To pay your bill and leave a hotel.',
    example: 'We have to check out of our rooms by 11:00 AM.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Guests checking out of hotel rooms',
  },
  {
    definition: 'To examine, investigate, or look at something interesting.',
    example: 'You should check out this new Java framework; it could save us a lot of time.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Developer checking out a new Java framework',
  },
  {
    definition: 'To prove to be true or correct after investigation.',
    example: "The server logs show no errors, so the user's story doesn't check out.",
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: "Server logs showing the user's story doesn't check out",
  },
  {
    definition: 'To pay for goods at a store or online.',
    example: 'I added the books to my online cart and checked out.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Customer checking out an online shopping cart',
  },
  {
    definition: 'To download or switch to a specific version of code from a repository (like Git).',
    example: 'Please check out the feature-login branch and run the tests.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Developer checking out a Git branch',
  },
  {
    definition: 'To stop paying attention or disconnect mentally because you are tired or bored.',
    example: 'The meeting was so long that half the team checked out after an hour.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Team members mentally checked out during a long meeting',
  },
];

const overMeanings: MeaningData[] = [
  {
    definition: 'To examine something carefully from start to finish to find errors or problems.',
    example: 'Please check over the business contract before you sign it.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Lawyer checking over a business contract',
  },
];

const throughMeanings: MeaningData[] = [
  {
    definition: 'To look at or read a collection of items carefully.',
    example: 'I checked through the error logs to find where the Java exception happened.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Developer checking through error logs',
  },
  {
    definition: 'To send luggage directly to a final destination without needing to collect it during a connection.',
    example: 'My bags were checked through all the way to Warsaw.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Bags checked through to Warsaw',
  },
];

const upMeanings: MeaningData[] = [
  {
    definition: 'To investigate someone or something to discover what they are doing or if they are okay.',
    example: 'The client called to check up on the progress of the software release.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Client checking up on software release progress',
  },
];

const withMeanings: MeaningData[] = [
  {
    definition: 'To ask someone for permission, advice, or information before doing something.',
    example: 'You need to check with the project manager before changing the database structure.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Developer checking with project manager before changing database',
  },
];

export const sections: SectionData[] = [
  { particle: 'against',      storageKey: 'checkAgainst_section_expanded', storageKeyPrefix: 'checkAgainst', meanings: againstMeanings },
  { particle: 'around / round', storageKey: 'checkAround_section_expanded',  storageKeyPrefix: 'checkAround',  meanings: aroundMeanings },
  { particle: 'back',         storageKey: 'checkBack_section_expanded',    storageKeyPrefix: 'checkBack',    meanings: backMeanings },
  { particle: 'down',         storageKey: 'checkDown_section_expanded',    storageKeyPrefix: 'checkDown',    meanings: downMeanings },
  { particle: 'for',          storageKey: 'checkFor_section_expanded',     storageKeyPrefix: 'checkFor',     meanings: forMeanings },
  { particle: 'in',           storageKey: 'checkIn_section_expanded',      storageKeyPrefix: 'checkIn',      meanings: inMeanings },
  { particle: 'into',         storageKey: 'checkInto_section_expanded',    storageKeyPrefix: 'checkInto',    meanings: intoMeanings },
  { particle: 'off',          storageKey: 'checkOff_section_expanded',     storageKeyPrefix: 'checkOff',     meanings: offMeanings },
  { particle: 'on',           storageKey: 'checkOn_section_expanded',      storageKeyPrefix: 'checkOn',      meanings: onMeanings },
  { particle: 'out',          storageKey: 'checkOut_section_expanded',     storageKeyPrefix: 'checkOut',     meanings: outMeanings },
  { particle: 'over',         storageKey: 'checkOver_section_expanded',    storageKeyPrefix: 'checkOver',    meanings: overMeanings },
  { particle: 'through',      storageKey: 'checkThrough_section_expanded', storageKeyPrefix: 'checkThrough', meanings: throughMeanings },
  { particle: 'up',           storageKey: 'checkUp_section_expanded',      storageKeyPrefix: 'checkUp',      meanings: upMeanings },
  { particle: 'with',         storageKey: 'checkWith_section_expanded',    storageKeyPrefix: 'checkWith',    meanings: withMeanings },
];

export default function CheckVerbPage() {
  return <VerbPageLayout title="Check" sections={sections} />;
}
