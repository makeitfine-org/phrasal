import VerbPageLayout, { MeaningData, SectionData } from '../../components/VerbPage';

const base = import.meta.env.BASE_URL;

const offMeanings: MeaningData[] = [
  {
    definition: 'To leave.',
    example: 'I am off to the management conference now.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Heading off to a conference',
  },
  {
    definition: 'To be canceled.',
    example: 'The project launch is off because of critical bugs.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A project launch being canceled',
  },
  {
    definition: 'To be absent from work.',
    example: 'Two developers are off sick today.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Developers absent from work',
  },
  {
    definition: 'To go bad (for food).',
    example: "Don't drink that milk; I think it is off.",
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Milk that has gone off',
  },
];

const onMeanings: MeaningData[] = [
  {
    definition: 'To happen as planned.',
    example: 'Is the team meeting still on for tomorrow?',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A team meeting still happening as planned',
  },
  {
    definition: 'To function or operate (for machines or devices).',
    example: 'Ensure the backup server is on.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A backup server that is on and running',
  },
  {
    definition: 'To take medication.',
    example: 'He is on antibiotics for his cough.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Taking antibiotics for a cough',
  },
];

const upMeanings: MeaningData[] = [
  {
    definition: 'To be awake and out of bed.',
    example: 'I was up all night fixing the Java code.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Up all night fixing code',
  },
  {
    definition: 'To increase.',
    example: 'Company profits are up by 15% this quarter.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Company profits increasing',
  },
  {
    definition: 'To be next in turn.',
    example: 'You are up next for your performance review.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Being next for a performance review',
  },
  {
    definition: 'To expire (for time).',
    example: 'Stop writing; your time is up.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: "Time's up during an exam",
  },
  {
    definition: 'To happen (informal).',
    example: 'What is up with the database connection?',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Something wrong with the database connection',
  },
];

const downMeanings: MeaningData[] = [
  {
    definition: 'To stop working (for systems or machines).',
    example: 'The production environment is down right now.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A production environment that is down',
  },
  {
    definition: 'To decrease.',
    example: 'Sales are down compared to last month.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Sales figures decreasing',
  },
  {
    definition: 'To feel sad or depressed.',
    example: "He is a bit down because he didn't get the promotion.",
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: "Someone feeling down after missing a promotion",
  },
];

const inMeanings: MeaningData[] = [
  {
    definition: 'To be at home or in the office.',
    example: 'The CEO will be in at 9:00 AM.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'The CEO arriving at the office',
  },
  {
    definition: 'To be submitted.',
    example: 'All financial reports must be in by Friday.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Financial reports submitted by a deadline',
  },
  {
    definition: 'To be fashionable or popular.',
    example: 'Agile methodology is very in right now.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Agile methodology being popular',
  },
];

const intoMeanings: MeaningData[] = [
  {
    definition: 'To be very interested in something.',
    example: 'She is really into software architecture and system design.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Being enthusiastic about software architecture',
  },
];

const outMeanings: MeaningData[] = [
  {
    definition: 'To be absent from home or the office.',
    example: 'The manager is out until next week.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A manager out of the office',
  },
  {
    definition: 'To be published or released.',
    example: 'The new version of the application is out.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A new application version released',
  },
  {
    definition: 'To be revealed (for a secret).',
    example: 'The secret is out; everyone knows about the merger.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A secret merger being revealed',
  },
  {
    definition: 'To be impossible or unacceptable.',
    example: 'Working over the weekend is out.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Weekend work being ruled out',
  },
];

const awayMeanings: MeaningData[] = [
  {
    definition: 'To be absent or on a trip.',
    example: 'He is away on a business trip to London.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'On a business trip to London',
  },
];

const acrossMeanings: MeaningData[] = [
  {
    definition: 'To be fully familiar with or understand a topic.',
    example: 'As a project manager, I need to be across all the new data privacy laws.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A project manager familiar with data privacy laws',
  },
];

const forwardMeanings: MeaningData[] = [
  {
    definition: 'To act presumptuously or too confidently.',
    example: 'I do not want to be forward, but I think your strategy has a major flaw.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Politely pointing out a strategic flaw',
  },
];

const backMeanings: MeaningData[] = [
  {
    definition: 'To return.',
    example: 'I will be back at my desk in ten minutes.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Returning to a desk',
  },
];

const forMeanings: MeaningData[] = [
  {
    definition: 'To support or be in favor of.',
    example: 'We are for the new flexible working hours.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Supporting flexible working hours',
  },
  {
    definition: 'To be intended for.',
    example: 'This internal API is for senior developers only.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'An API restricted to senior developers',
  },
];

const byMeanings: MeaningData[] = [
  {
    definition: 'To be physically near.',
    example: 'The server room is by the elevator.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A server room near the elevator',
  },
  {
    definition: 'To be the work of someone (passive sense).',
    example: 'This excellent module is by our lead Java developer.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A module created by the lead developer',
  },
];

const togetherMeanings: MeaningData[] = [
  {
    definition: 'To be unified or in a relationship.',
    example: 'The leadership team needs to be together on this decision.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A leadership team unified on a decision',
  },
  {
    definition: 'To be organized (have it together).',
    example: 'She is very professional and really has herself together.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A professional and organized person',
  },
];

const withMeanings: MeaningData[] = [
  {
    definition: 'To support someone.',
    example: 'I am with you on this proposal; it makes sense.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Supporting a proposal',
  },
  {
    definition: 'To understand someone.',
    example: 'I am not sure I am with you. Can you explain the logic again?',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Asking for clarification on a logic point',
  },
];

const withoutMeanings: MeaningData[] = [
  {
    definition: 'To lack something.',
    example: 'We are without internet access at the moment.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Working without internet access',
  },
];

const apartMeanings: MeaningData[] = [
  {
    definition: 'To be separated physically or emotionally.',
    example: 'The two microservices must be apart to avoid system dependencies.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Two microservices kept separate',
  },
];

const overMeanings: MeaningData[] = [
  {
    definition: 'To be finished.',
    example: 'The sprint planning meeting is over.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A sprint planning meeting finishing',
  },
];

const aheadMeanings: MeaningData[] = [
  {
    definition: 'To be winning or further advanced than expected.',
    example: 'Our development team is ahead of schedule this month.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A development team ahead of schedule',
  },
];

const afterMeanings: MeaningData[] = [
  {
    definition: 'To want, try to get, or look for something.',
    example: 'What exactly are you after in this contract negotiation?',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Negotiating a contract',
  },
];

const behindMeanings: MeaningData[] = [
  {
    definition: 'To be late or delayed.',
    example: 'We are two weeks behind schedule on this project.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A project behind schedule',
  },
  {
    definition: 'To support someone or something.',
    example: 'The board of directors is completely behind the new CEO.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'The board of directors supporting the new CEO',
  },
];

const throughMeanings: MeaningData[] = [
  {
    definition: 'To be finished doing something or to end a relationship.',
    example: 'I am through with using this outdated software.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Done with using outdated software',
  },
];

const aboutMeanings: MeaningData[] = [
  {
    definition: 'To be going to happen very soon (be about to).',
    example: 'Save your work; the system is about to restart.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A system about to restart',
  },
  {
    definition: 'To mean or consist of (what something is about).',
    example: 'Good leadership is about listening to your team.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Leadership being about listening',
  },
];

const aroundMeanings: MeaningData[] = [
  {
    definition: 'To be present or available.',
    example: 'Will you be around for a code review later this afternoon?',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Being available for a code review',
  },
];

const toMeanings: MeaningData[] = [
  {
    definition: 'To be required or scheduled to do something (formal).',
    example: 'You are to report directly to the IT director.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Reporting to the IT director',
  },
];

const againstMeanings: MeaningData[] = [
  {
    definition: 'To oppose someone or something.',
    example: 'Many users are against the new interface changes.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Users opposing new interface changes',
  },
];

export const sections: SectionData[] = [
  { particle: 'off',           storageKey: 'beOff_section_expanded',     storageKeyPrefix: 'beOff',     meanings: offMeanings },
  { particle: 'on',            storageKey: 'beOn_section_expanded',      storageKeyPrefix: 'beOn',      meanings: onMeanings },
  { particle: 'up',            storageKey: 'beUp_section_expanded',      storageKeyPrefix: 'beUp',      meanings: upMeanings },
  { particle: 'down',          storageKey: 'beDown_section_expanded',    storageKeyPrefix: 'beDown',    meanings: downMeanings },
  { particle: 'in',            storageKey: 'beIn_section_expanded',      storageKeyPrefix: 'beIn',      meanings: inMeanings },
  { particle: 'into',          storageKey: 'beInto_section_expanded',    storageKeyPrefix: 'beInto',    meanings: intoMeanings },
  { particle: 'out',           storageKey: 'beOut_section_expanded',     storageKeyPrefix: 'beOut',     meanings: outMeanings },
  { particle: 'away',          storageKey: 'beAway_section_expanded',    storageKeyPrefix: 'beAway',    meanings: awayMeanings },
  { particle: 'across',        storageKey: 'beAcross_section_expanded',  storageKeyPrefix: 'beAcross',  meanings: acrossMeanings },
  { particle: 'forward',       storageKey: 'beForward_section_expanded', storageKeyPrefix: 'beForward', meanings: forwardMeanings },
  { particle: 'back',          storageKey: 'beBack_section_expanded',    storageKeyPrefix: 'beBack',    meanings: backMeanings },
  { particle: 'for',           storageKey: 'beFor_section_expanded',     storageKeyPrefix: 'beFor',     meanings: forMeanings },
  { particle: 'by',            storageKey: 'beBy_section_expanded',      storageKeyPrefix: 'beBy',      meanings: byMeanings },
  { particle: 'together',      storageKey: 'beTogether_section_expanded',storageKeyPrefix: 'beTogether',meanings: togetherMeanings },
  { particle: 'with',          storageKey: 'beWith_section_expanded',    storageKeyPrefix: 'beWith',    meanings: withMeanings },
  { particle: 'without',       storageKey: 'beWithout_section_expanded', storageKeyPrefix: 'beWithout', meanings: withoutMeanings },
  { particle: 'apart',         storageKey: 'beApart_section_expanded',   storageKeyPrefix: 'beApart',   meanings: apartMeanings },
  { particle: 'over',          storageKey: 'beOver_section_expanded',    storageKeyPrefix: 'beOver',    meanings: overMeanings },
  { particle: 'ahead',         storageKey: 'beAhead_section_expanded',   storageKeyPrefix: 'beAhead',   meanings: aheadMeanings },
  { particle: 'after',         storageKey: 'beAfter_section_expanded',   storageKeyPrefix: 'beAfter',   meanings: afterMeanings },
  { particle: 'behind',        storageKey: 'beBehind_section_expanded',  storageKeyPrefix: 'beBehind',  meanings: behindMeanings },
  { particle: 'through',       storageKey: 'beThrough_section_expanded', storageKeyPrefix: 'beThrough', meanings: throughMeanings },
  { particle: 'about',         storageKey: 'beAbout_section_expanded',   storageKeyPrefix: 'beAbout',   meanings: aboutMeanings },
  { particle: 'around / round',storageKey: 'beAround_section_expanded',  storageKeyPrefix: 'beAround',  meanings: aroundMeanings },
  { particle: 'to',            storageKey: 'beTo_section_expanded',      storageKeyPrefix: 'beTo',      meanings: toMeanings },
  { particle: 'against',       storageKey: 'beAgainst_section_expanded', storageKeyPrefix: 'beAgainst', meanings: againstMeanings },
];

export default function BeVerbPage() {
  return <VerbPageLayout title="Be" sections={sections} />;
}
