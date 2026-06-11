import VerbPageLayout, { MeaningData, SectionData } from '../../components/VerbPage';

const base = import.meta.env.BASE_URL;

const aboutMeanings: MeaningData[] = [
  {
    definition: 'To start doing something that needs a lot of time and energy.',
    example: 'The team immediately set about rewriting the legacy Java code.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Team setting about rewriting the legacy Java code',
  },
];

const againstMeanings: MeaningData[] = [
  {
    definition: 'To make people or groups oppose or hate each other.',
    example: 'Poor leadership set the development team against the testing team.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Poor leadership setting the development team against the testing team',
  },
  {
    definition: 'To balance one thing against another (often used in finance).',
    example: 'You can set the cost of the new servers against your tax bill.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Setting cost of new servers against tax bill',
  },
];

const aheadMeanings: MeaningData[] = [
  {
    definition: 'To change the time on a clock to a later time.',
    example: "Don't forget to set your clocks ahead by one hour this weekend.",
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Setting clocks ahead by one hour this weekend',
  },
];

const apartMeanings: MeaningData[] = [
  {
    definition: 'To make someone or something different and better than others.',
    example: 'Her excellent leadership skills set her apart from other managers.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Excellent leadership skills setting her apart from other managers',
  },
  {
    definition: 'To keep time or space for a special purpose.',
    example: 'We set apart two hours on Friday afternoons for code reviews.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Setting apart two hours on Friday afternoons for code reviews',
  },
];

const backMeanings: MeaningData[] = [
  {
    definition: 'To delay the progress of a project or plan.',
    example: 'A critical bug in the database set the project back by three weeks.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Critical bug in the database setting the project back by three weeks',
  },
  {
    definition: 'To cost someone a large amount of money (informal).',
    example: 'Buying those enterprise software licenses will set us back a lot of money.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Buying enterprise software licenses setting us back a lot of money',
  },
];

const byMeanings: MeaningData[] = [
  {
    definition: 'To save money or things for the future.',
    example: 'The company has a budget set by for emergency server repairs.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Company budget set by for emergency server repairs',
  },
];

const downMeanings: MeaningData[] = [
  {
    definition: 'To write something on paper so there is an official record.',
    example: 'The new coding standards are set down in the employee handbook.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'New coding standards set down in the employee handbook',
  },
  {
    definition: 'To state officially how something must be done (to make a rule).',
    example: 'The CEO set down strict rules for working remotely.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'CEO setting down strict rules for working remotely',
  },
  {
    definition: 'To stop a vehicle to let a passenger get out.',
    example: 'The taxi driver set him down right in front of the office building.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Taxi driver setting him down in front of the office building',
  },
];

const inMeanings: MeaningData[] = [
  {
    definition: 'To begin and seem likely to continue for a long time (usually used for negative situations, feelings, or bad weather).',
    example: 'Panic set in when the main production server crashed.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Panic setting in when the main production server crashed',
  },
];

const offMeanings: MeaningData[] = [
  {
    definition: 'To start a journey.',
    example: 'They set off for the tech conference in Berlin at 8:00 AM.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Setting off for the tech conference in Berlin at 8:00 AM',
  },
  {
    definition: 'To cause an alarm to ring or a bomb to explode.',
    example: 'The faulty sensor set off the fire alarm in the data center.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Faulty sensor setting off the fire alarm in the data center',
  },
  {
    definition: 'To cause a series of events to happen.',
    example: "The manager's email set off a wave of complaints.",
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: "Manager's email setting off a wave of complaints",
  },
  {
    definition: 'To make someone start laughing or crying.',
    example: "The presenter's joke set the whole room off.",
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: "Presenter's joke setting the whole room off",
  },
];

const onMeanings: MeaningData[] = [
  {
    definition: 'To attack someone, or to make an animal attack someone.',
    example: 'The security guards set their dogs on the intruders.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Security guards setting their dogs on the intruders',
  },
  {
    definition: 'To be very determined to do something (used passively as "be set on").',
    example: 'The lead architect is set on using microservices for this project.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Lead architect set on using microservices for this project',
  },
];

const outMeanings: MeaningData[] = [
  {
    definition: 'To begin an activity with a specific goal in mind.',
    example: 'We set out to build the fastest application on the market.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Setting out to build the fastest application on the market',
  },
  {
    definition: 'To explain ideas, facts, or plans clearly in writing or speaking.',
    example: 'The project manager set out the timeline during the sprint planning meeting.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Project manager setting out the timeline during sprint planning meeting',
  },
  {
    definition: 'To start a journey (similar to "set off").',
    example: "She set out for the client's office early in the morning.",
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: "Setting out for the client's office early in the morning",
  },
];

const overMeanings: MeaningData[] = [
  {
    definition: 'To give someone authority or power over someone else.',
    example: 'She was set over the entire IT department after the reorganization.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'She was set over the entire IT department after the reorganization',
  },
];

const toMeanings: MeaningData[] = [
  {
    definition: 'To start working or doing something with a lot of energy and determination.',
    example: 'The developers set to and fixed all the major bugs before the deadline.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Developers setting to and fixing all the major bugs before the deadline',
  },
];

const upMeanings: MeaningData[] = [
  {
    definition: 'To start a new business or organization.',
    example: 'They set up a successful software company five years ago.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Setting up a successful software company five years ago',
  },
  {
    definition: 'To arrange or plan a meeting or event.',
    example: 'I will set up a video call with the stakeholders for tomorrow.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Setting up a video call with stakeholders for tomorrow',
  },
  {
    definition: 'To prepare equipment or software so it is ready to use.',
    example: 'The IT support team is coming to set up your new Java development environment.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'IT support team setting up new Java development environment',
  },
  {
    definition: 'To trick someone in order to make them look guilty of a crime or mistake.',
    example: "He didn't leak the company data; he was set up by a rival.",
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'He was set up by a rival to look guilty',
  },
];

export const sections: SectionData[] = [
  { particle: 'about',   storageKey: 'setAbout_section_expanded',   storageKeyPrefix: 'setAbout',   meanings: aboutMeanings },
  { particle: 'against', storageKey: 'setAgainst_section_expanded', storageKeyPrefix: 'setAgainst', meanings: againstMeanings },
  { particle: 'ahead',   storageKey: 'setAhead_section_expanded',   storageKeyPrefix: 'setAhead',   meanings: aheadMeanings },
  { particle: 'apart',   storageKey: 'setApart_section_expanded',   storageKeyPrefix: 'setApart',   meanings: apartMeanings },
  { particle: 'back',    storageKey: 'setBack_section_expanded',    storageKeyPrefix: 'setBack',    meanings: backMeanings },
  { particle: 'by',      storageKey: 'setBy_section_expanded',      storageKeyPrefix: 'setBy',      meanings: byMeanings },
  { particle: 'down',    storageKey: 'setDown_section_expanded',    storageKeyPrefix: 'setDown',    meanings: downMeanings },
  { particle: 'in',      storageKey: 'setIn_section_expanded',      storageKeyPrefix: 'setIn',      meanings: inMeanings },
  { particle: 'off',     storageKey: 'setOff_section_expanded',     storageKeyPrefix: 'setOff',     meanings: offMeanings },
  { particle: 'on',      storageKey: 'setOn_section_expanded',      storageKeyPrefix: 'setOn',      meanings: onMeanings },
  { particle: 'out',     storageKey: 'setOut_section_expanded',     storageKeyPrefix: 'setOut',     meanings: outMeanings },
  { particle: 'over',    storageKey: 'setOver_section_expanded',    storageKeyPrefix: 'setOver',    meanings: overMeanings },
  { particle: 'to',      storageKey: 'setTo_section_expanded',      storageKeyPrefix: 'setTo',      meanings: toMeanings },
  { particle: 'up',      storageKey: 'setUp_section_expanded',      storageKeyPrefix: 'setUp',      meanings: upMeanings },
];

export default function SetVerbPage() {
  return <VerbPageLayout title="Set" sections={sections} />;
}
