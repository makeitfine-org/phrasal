import VerbPageLayout, { MeaningData, SectionData } from '../../components/VerbPage';

const base = import.meta.env.BASE_URL;

const aboutAroundRoundMeanings: MeaningData[] = [
  {
    definition: 'To be very busy doing many different tasks.',
    example: 'The project manager was running around all day trying to organize the sprint planning.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Project manager running around all day organizing the sprint planning',
  },
  {
    definition: 'To deceive or cheat someone (usually "run around on").',
    example: 'The vendor was giving us the runaround instead of delivering the software on time.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Vendor giving the runaround instead of delivering software on time',
  },
];

const acrossMeanings: MeaningData[] = [
  {
    definition: 'To find something or meet someone by chance.',
    example: 'I ran across an old Java library that perfectly solves our database problem.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Developer running across an old Java library that solves a database problem',
  },
];

const afterMeanings: MeaningData[] = [
  {
    definition: 'To chase someone or something.',
    example: 'Startups spend a lot of time running after new investors.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Startups running after new investors',
  },
];

const againstMeanings: MeaningData[] = [
  {
    definition: 'To compete with someone in an election or business contest.',
    example: 'Our product is running against two major competitors in the enterprise market.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Product running against two major competitors in the enterprise market',
  },
  {
    definition: 'To cause difficulties or oppose principles.',
    example: 'The new company policy runs against our agile working methods.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'New company policy running against agile working methods',
  },
];

const aheadMeanings: MeaningData[] = [
  {
    definition: 'To progress faster than scheduled.',
    example: 'The development team is running ahead of schedule for the Q3 release.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Development team running ahead of schedule for the Q3 release',
  },
];

const awayMeanings: MeaningData[] = [
  {
    definition: 'To escape or leave a difficult situation.',
    example: 'A good leader does not run away from hard decisions.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Good leader not running away from hard decisions',
  },
];

const backMeanings: MeaningData[] = [
  {
    definition: 'To return quickly.',
    example: 'I need to run back to the office to get my security badge.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person running back to the office to get a security badge',
  },
  {
    definition: 'To replay audio or video.',
    example: "Let's run the recording back to hear what the client said about the API requirements.",
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: "Running the recording back to hear what the client said about API requirements",
  },
];

const behindMeanings: MeaningData[] = [
  {
    definition: 'To be late or delayed according to a schedule.',
    example: 'We are running behind on the backend integration.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Team running behind on the backend integration',
  },
];

const byMeanings: MeaningData[] = [
  {
    definition: 'To tell someone about an idea to get their opinion or approval.',
    example: 'I need to run this new architecture design by the CTO before we start coding.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Developer running a new architecture design by the CTO before coding',
  },
];

const downMeanings: MeaningData[] = [
  {
    definition: 'To lose power (a battery/machine) or energy (a person).',
    example: "The server's backup battery finally ran down after three hours.",
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Server backup battery running down after three hours',
  },
  {
    definition: 'To criticize someone constantly.',
    example: 'A toxic manager constantly runs down their employees in front of others.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Toxic manager constantly running down employees in front of others',
  },
  {
    definition: 'To find the source of something after a long search.',
    example: 'The QA team finally ran down the cause of the memory leak in the Java application.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'QA team running down the cause of a memory leak in the Java application',
  },
];

const forMeanings: MeaningData[] = [
  {
    definition: 'To try to be elected to an official or leadership position.',
    example: 'She decided to run for the board of directors.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'She decided to run for the board of directors',
  },
];

const inMeanings: MeaningData[] = [
  {
    definition: 'To use a new machine carefully until it is ready for normal use.',
    example: 'We need to run in the new servers before putting them into full production.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Running in new servers before putting them into full production',
  },
  {
    definition: 'To arrest someone (informal police term).',
    example: 'The police ran him in for trespassing.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Police running someone in for trespassing',
  },
];

const intoMeanings: MeaningData[] = [
  {
    definition: 'To experience a problem or difficulty unexpectedly.',
    example: 'We ran into an unexpected bug while compiling the code.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Developer running into an unexpected bug while compiling the code',
  },
  {
    definition: 'To meet someone unexpectedly.',
    example: 'I ran into our former lead developer at a tech conference.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Running into a former lead developer at a tech conference',
  },
];

const offMeanings: MeaningData[] = [
  {
    definition: 'To quickly make copies of a document.',
    example: 'Could you run off 20 copies of the meeting agenda?',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Running off 20 copies of the meeting agenda',
  },
  {
    definition: 'To force someone or something to leave.',
    example: 'The aggressive takeover ran the original founders off.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Aggressive takeover running the original founders off',
  },
];

const onMeanings: MeaningData[] = [
  {
    definition: 'To be powered by something.',
    example: 'The legacy enterprise system still runs on Java 8.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Legacy enterprise system still running on Java 8',
  },
  {
    definition: 'To continue for too long.',
    example: 'The daily stand-up meeting ran on for an hour.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Daily stand-up meeting running on for an hour',
  },
];

const outMeanings: MeaningData[] = [
  {
    definition: 'To use all of a supply so there is nothing left.',
    example: 'We ran out of budget before finishing the software testing phase.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Running out of budget before finishing the software testing phase',
  },
  {
    definition: 'To expire (for a contract, document, or agreement).',
    example: 'Our cloud service contract runs out next month.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Cloud service contract running out next month',
  },
];

const overMeanings: MeaningData[] = [
  {
    definition: 'To go beyond a time limit.',
    example: 'The project review ran over its scheduled time.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Project review running over its scheduled time',
  },
  {
    definition: 'To quickly review or explain something.',
    example: "Let's run over the main points of the business strategy one more time.",
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Running over the main points of the business strategy',
  },
  {
    definition: 'To hit with a vehicle.',
    example: 'The delivery truck ran over a sign in the company parking lot.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Delivery truck running over a sign in the company parking lot',
  },
];

const throughMeanings: MeaningData[] = [
  {
    definition: 'To practice, review, or explain something from beginning to end.',
    example: 'The team ran through the deployment steps before the actual release.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Team running through the deployment steps before the actual release',
  },
  {
    definition: 'To spend money very quickly.',
    example: 'The startup ran through its initial funding in just six months.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Startup running through its initial funding in just six months',
  },
];

const toMeanings: MeaningData[] = [
  {
    definition: 'To reach a particular amount or cost.',
    example: 'The costs for upgrading the IT infrastructure will run to $50,000.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Costs for upgrading IT infrastructure running to $50,000',
  },
  {
    definition: 'To ask someone for help, often too quickly.',
    example: 'You cannot just run to the CEO every time there is a minor conflict in the team.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Running to the CEO every time there is a minor conflict in the team',
  },
];

const togetherMeanings: MeaningData[] = [
  {
    definition: 'To mix or blend so that things cannot be separated.',
    example: 'When you work from home, your professional and personal lives can easily run together.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Professional and personal lives running together when working from home',
  },
];

const upMeanings: MeaningData[] = [
  {
    definition: 'To create a large debt or cost.',
    example: 'We ran up a huge AWS bill during the load testing phase.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Running up a huge AWS bill during the load testing phase',
  },
];

const withMeanings: MeaningData[] = [
  {
    definition: 'To take an idea and develop it independently.',
    example: 'The management team loved the proposal and told us to run with it.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Management team telling the team to run with the proposal',
  },
];

const withoutMeanings: MeaningData[] = [
  {
    definition: 'To function lacking something.',
    example: 'The microservice is designed to run without a continuous database connection.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Microservice designed to run without a continuous database connection',
  },
];

export const sections: SectionData[] = [
  { particle: 'about / around / round', storageKey: 'runAbout_section_expanded',   storageKeyPrefix: 'runAbout',   meanings: aboutAroundRoundMeanings },
  { particle: 'across',                 storageKey: 'runAcross_section_expanded',  storageKeyPrefix: 'runAcross',  meanings: acrossMeanings },
  { particle: 'after',                  storageKey: 'runAfter_section_expanded',   storageKeyPrefix: 'runAfter',   meanings: afterMeanings },
  { particle: 'against',                storageKey: 'runAgainst_section_expanded', storageKeyPrefix: 'runAgainst', meanings: againstMeanings },
  { particle: 'ahead',                  storageKey: 'runAhead_section_expanded',   storageKeyPrefix: 'runAhead',   meanings: aheadMeanings },
  { particle: 'away',                   storageKey: 'runAway_section_expanded',    storageKeyPrefix: 'runAway',    meanings: awayMeanings },
  { particle: 'back',                   storageKey: 'runBack_section_expanded',    storageKeyPrefix: 'runBack',    meanings: backMeanings },
  { particle: 'behind',                 storageKey: 'runBehind_section_expanded',  storageKeyPrefix: 'runBehind',  meanings: behindMeanings },
  { particle: 'by',                     storageKey: 'runBy_section_expanded',      storageKeyPrefix: 'runBy',      meanings: byMeanings },
  { particle: 'down',                   storageKey: 'runDown_section_expanded',    storageKeyPrefix: 'runDown',    meanings: downMeanings },
  { particle: 'for',                    storageKey: 'runFor_section_expanded',     storageKeyPrefix: 'runFor',     meanings: forMeanings },
  { particle: 'in',                     storageKey: 'runIn_section_expanded',      storageKeyPrefix: 'runIn',      meanings: inMeanings },
  { particle: 'into',                   storageKey: 'runInto_section_expanded',    storageKeyPrefix: 'runInto',    meanings: intoMeanings },
  { particle: 'off',                    storageKey: 'runOff_section_expanded',     storageKeyPrefix: 'runOff',     meanings: offMeanings },
  { particle: 'on',                     storageKey: 'runOn_section_expanded',      storageKeyPrefix: 'runOn',      meanings: onMeanings },
  { particle: 'out',                    storageKey: 'runOut_section_expanded',     storageKeyPrefix: 'runOut',     meanings: outMeanings },
  { particle: 'over',                   storageKey: 'runOver_section_expanded',    storageKeyPrefix: 'runOver',    meanings: overMeanings },
  { particle: 'through',                storageKey: 'runThrough_section_expanded', storageKeyPrefix: 'runThrough', meanings: throughMeanings },
  { particle: 'to',                     storageKey: 'runTo_section_expanded',      storageKeyPrefix: 'runTo',      meanings: toMeanings },
  { particle: 'together',               storageKey: 'runTogether_section_expanded',storageKeyPrefix: 'runTogether',meanings: togetherMeanings },
  { particle: 'up',                     storageKey: 'runUp_section_expanded',      storageKeyPrefix: 'runUp',      meanings: upMeanings },
  { particle: 'with',                   storageKey: 'runWith_section_expanded',    storageKeyPrefix: 'runWith',    meanings: withMeanings },
  { particle: 'without',                storageKey: 'runWithout_section_expanded', storageKeyPrefix: 'runWithout', meanings: withoutMeanings },
];

export default function RunVerbPage() {
  return <VerbPageLayout title="Run" sections={sections} />;
}
