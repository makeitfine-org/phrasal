import VerbPageLayout, { MeaningData, SectionData } from '../../components/VerbPage';

const base = import.meta.env.BASE_URL;

const afterMeanings: MeaningData[] = [
  {
    definition: 'To take care of someone or something and make sure they have what they need.',
    example: "As a manager, you must look after your team's well-being.",
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: "Manager looking after the team's well-being",
  },
];

const aheadMeanings: MeaningData[] = [
  {
    definition: 'To think about and plan for the future.',
    example: 'A good leader needs to look ahead to anticipate changes in the market.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Leader looking ahead to anticipate market changes',
  },
];

const aroundMeanings: MeaningData[] = [
  {
    definition: 'To walk through a place to see what is there.',
    example: 'We took some time to look around the new office before the meeting.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Team looking around the new office before a meeting',
  },
  {
    definition: 'To search for something in various places.',
    example: 'I am looking about for a new software developer to join the team.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person looking about for a new software developer to hire',
  },
];

const awayMeanings: MeaningData[] = [
  {
    definition: 'To turn your eyes away from someone or something.',
    example: 'The presentation data was so confusing that I had to look away from the screen.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person looking away from confusing presentation data on the screen',
  },
];

const backMeanings: MeaningData[] = [
  {
    definition: 'To think about something that happened in the past.',
    example: 'When I look back on my early days programming in Java, I realize how much I have learned.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Developer looking back on early Java programming days',
  },
];

const downMeanings: MeaningData[] = [
  {
    definition: 'To think that you are better or more important than someone else.',
    example: 'A professional leader should never look down on junior employees.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Professional leader avoiding looking down on junior employees',
  },
];

const forMeanings: MeaningData[] = [
  {
    definition: 'To try to find something or someone.',
    example: 'The development team is looking for a solution to the database error.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Development team looking for a solution to a database error',
  },
];

const forwardMeanings: MeaningData[] = [
  {
    definition: 'To feel excited and happy about something that is going to happen in the future.',
    example: 'I look forward to reviewing the new business strategy with you tomorrow.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person looking forward to reviewing a new business strategy',
  },
];

const inMeanings: MeaningData[] = [
  {
    definition: 'To visit a person for a short time, usually to check that they are okay.',
    example: 'I will look in on the new trainees later to see if they need help.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Manager looking in on new trainees to check if they need help',
  },
];

const intoMeanings: MeaningData[] = [
  {
    definition: 'To investigate or research the facts of a situation or problem.',
    example: 'The IT department will look into why the server crashed.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'IT department looking into the cause of a server crash',
  },
];

const onMeanings: MeaningData[] = [
  {
    definition: 'To watch an event happen without taking part in it.',
    example: 'The manager looked on as the team successfully deployed the new code.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Manager looking on as the team deploys new code',
  },
  {
    definition: 'To consider someone or something in a specific way.',
    example: 'I look on her as the best project manager in the company.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person looking on a colleague as the best project manager',
  },
];

const outMeanings: MeaningData[] = [
  {
    definition: 'To be careful or to warn someone of danger.',
    example: 'Look out! That server rack is falling.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Warning to look out as a server rack is falling',
  },
  {
    definition: 'To take care of someone and make sure they are treated well (look out for).',
    example: 'Good business partners always look out for each other.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Business partners looking out for each other',
  },
  {
    definition: 'To watch carefully in order to find something (look out for).',
    example: 'Please look out for any spelling errors in the final contract.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person looking out for spelling errors in a final contract',
  },
];

const overMeanings: MeaningData[] = [
  {
    definition: 'To examine or read something quickly to check its quality.',
    example: 'Could you look over this financial report before I send it to the client?',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person looking over a financial report before sending it to a client',
  },
];

const throughMeanings: MeaningData[] = [
  {
    definition: 'To read something quickly.',
    example: 'I will look through the Java documentation to find the correct method.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Developer looking through Java documentation to find a method',
  },
  {
    definition: 'To deliberately ignore someone you know by pretending you do not see them.',
    example: 'I smiled at my former boss, but he just looked straight through me.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Former boss looking straight through a person and pretending not to see them',
  },
];

const toMeanings: MeaningData[] = [
  {
    definition: 'To rely on someone to provide something (like help or advice).',
    example: 'The board of directors looks to the CEO for clear guidance.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Board of directors looking to the CEO for guidance',
  },
  {
    definition: 'To direct your attention to something.',
    example: 'We must look to our competitors to see what strategies they are using.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Team looking to competitors to study their strategies',
  },
];

const upMeanings: MeaningData[] = [
  {
    definition: 'To try to find a piece of information in a book, list, or on the internet.',
    example: "If you don't know the exact syntax, look it up in the manual.",
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person looking up syntax in a manual',
  },
  {
    definition: 'To improve or get better (usually referring to a situation or business).',
    example: 'After a difficult first quarter, sales are finally looking up.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Sales looking up after a difficult first quarter',
  },
  {
    definition: 'To contact or visit someone you have not seen for a long time.',
    example: 'If you are ever in Warsaw, please look me up.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person being asked to look up a friend when visiting Warsaw',
  },
  {
    definition: 'To deeply respect and admire someone (look up to).',
    example: 'Many junior developers look up to him because of his deep technical knowledge.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Junior developers looking up to an experienced developer for his technical knowledge',
  },
];

export const sections: SectionData[] = [
  { particle: 'after',                 storageKey: 'lookAfter_section_expanded',   storageKeyPrefix: 'lookAfter',   meanings: afterMeanings },
  { particle: 'ahead',                 storageKey: 'lookAhead_section_expanded',   storageKeyPrefix: 'lookAhead',   meanings: aheadMeanings },
  { particle: 'around / round / about', storageKey: 'lookAround_section_expanded', storageKeyPrefix: 'lookAround',  meanings: aroundMeanings },
  { particle: 'away',                  storageKey: 'lookAway_section_expanded',    storageKeyPrefix: 'lookAway',    meanings: awayMeanings },
  { particle: 'back (on)',             storageKey: 'lookBack_section_expanded',    storageKeyPrefix: 'lookBack',    meanings: backMeanings },
  { particle: 'down on',               storageKey: 'lookDown_section_expanded',    storageKeyPrefix: 'lookDown',    meanings: downMeanings },
  { particle: 'for',                   storageKey: 'lookFor_section_expanded',     storageKeyPrefix: 'lookFor',     meanings: forMeanings },
  { particle: 'forward to',            storageKey: 'lookForward_section_expanded', storageKeyPrefix: 'lookForward', meanings: forwardMeanings },
  { particle: 'in (on)',               storageKey: 'lookIn_section_expanded',      storageKeyPrefix: 'lookIn',      meanings: inMeanings },
  { particle: 'into',                  storageKey: 'lookInto_section_expanded',    storageKeyPrefix: 'lookInto',    meanings: intoMeanings },
  { particle: 'on',                    storageKey: 'lookOn_section_expanded',      storageKeyPrefix: 'lookOn',      meanings: onMeanings },
  { particle: 'out',                   storageKey: 'lookOut_section_expanded',     storageKeyPrefix: 'lookOut',     meanings: outMeanings },
  { particle: 'over',                  storageKey: 'lookOver_section_expanded',    storageKeyPrefix: 'lookOver',    meanings: overMeanings },
  { particle: 'through',               storageKey: 'lookThrough_section_expanded', storageKeyPrefix: 'lookThrough', meanings: throughMeanings },
  { particle: 'to',                    storageKey: 'lookTo_section_expanded',      storageKeyPrefix: 'lookTo',      meanings: toMeanings },
  { particle: 'up',                    storageKey: 'lookUp_section_expanded',      storageKeyPrefix: 'lookUp',      meanings: upMeanings },
];

export default function LookVerbPage() {
  return <VerbPageLayout title="Look" sections={sections} />;
}
