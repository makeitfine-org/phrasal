import VerbPageLayout, { MeaningData, SectionData } from '../../components/VerbPage';

const base = import.meta.env.BASE_URL;

const offMeanings: MeaningData[] = [
  {
    definition: 'To delay or postpone something',
    example: 'We have to put off the sprint planning meeting until tomorrow.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A meeting being postponed',
  },
  {
    definition: 'To make someone not want to do something or dislike something',
    example: 'The complex code architecture put me off learning Java at first.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A person deterred by complex code',
  },
  {
    definition: 'To distract someone',
    example: 'Please be quiet; your talking is putting me off my work.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A person being distracted from their work',
  },
];

const onMeanings: MeaningData[] = [
  {
    definition: 'To dress oneself in clothing',
    example: 'I put on my suit for the management interview.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A person putting on a suit for an interview',
  },
  {
    definition: 'To organize a performance or event',
    example: 'The company put on a great training event for new developers.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A company training event for developers',
  },
  {
    definition: 'To gain weight',
    example: 'He put on three kilos during the holidays.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A person who gained weight during holidays',
  },
  {
    definition: 'To turn on a machine or appliance',
    example: 'Could you put the projector on for the presentation?',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A person turning on a projector for a presentation',
  },
  {
    definition: 'To pretend to have a feeling or attitude',
    example: "She isn't really angry; she's just putting it on.",
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A person pretending to be angry',
  },
];

const upMeanings: MeaningData[] = [
  {
    definition: 'To build or erect something',
    example: 'They put up a new office building in Warsaw.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A new office building being constructed in Warsaw',
  },
  {
    definition: 'To increase prices or rates',
    example: 'The software provider put up their subscription fees.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A software provider raising subscription fees',
  },
  {
    definition: 'To provide accommodation for someone',
    example: 'I can put you up at my apartment while you are visiting for the conference.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A person offering accommodation to a conference visitor',
  },
  {
    definition: 'To offer resistance or fight back',
    example: 'The competitor put up a strong fight for the market share.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A competitor fighting for market share',
  },
];

const downMeanings: MeaningData[] = [
  {
    definition: 'To write something down',
    example: 'Let me put down your contact details.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A person writing down contact details',
  },
  {
    definition: 'To criticize or humiliate someone',
    example: 'A good leader never puts down their team members.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A leader treating team members respectfully',
  },
  {
    definition: 'To pay a deposit',
    example: 'We put down a 10% deposit for the new office space.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A person paying a deposit for office space',
  },
  {
    definition: 'To suppress a rebellion or protest by force',
    example: 'The government quickly put down the protests.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A government suppressing protests',
  },
  {
    definition: 'To euthanize an animal',
    example: 'The vet had to put down the sick dog.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A vet with a sick dog',
  },
  {
    definition: 'To attribute a cause to something (put down to)',
    example: "I put the project's success down to excellent teamwork.",
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A team celebrating a successful project',
  },
];

const inMeanings: MeaningData[] = [
  {
    definition: 'To spend time or effort on something',
    example: 'The development team put in 50 hours a week to finish the Java update.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A development team working long hours on a Java update',
  },
  {
    definition: 'To install an appliance or system',
    example: 'We are putting in a new server system today.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Technicians installing a new server system',
  },
  {
    definition: 'To officially submit a request or document',
    example: 'I put in a request for more holiday time.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A person submitting a holiday request form',
  },
  {
    definition: 'To interrupt a conversation with a remark',
    example: '"I think we should test the code first," the junior developer put in.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A junior developer interrupting a conversation',
  },
];

const intoMeanings: MeaningData[] = [
  {
    definition: 'To invest time, money, or effort into a project',
    example: 'The company put a lot of money into research and development.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A company investing in research and development',
  },
  {
    definition: 'To express something in words',
    example: 'It is hard to put this complex business strategy into simple words.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A person trying to simplify a complex business strategy',
  },
];

const outMeanings: MeaningData[] = [
  {
    definition: 'To extinguish a fire or a cigarette',
    example: 'The fire alarm rang, but they quickly put out the small fire.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'People extinguishing a small office fire',
  },
  {
    definition: 'To publish or release something',
    example: 'The team put out a new version of the app last night.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A team releasing a new app version',
  },
  {
    definition: 'To inconvenience someone',
    example: "I hope it doesn't put you out if we move the meeting to 5 PM.",
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A person asking if a meeting time change is inconvenient',
  },
  {
    definition: 'To place something outside',
    example: "Don't forget to put out the recycling bins.",
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A person placing recycling bins outside',
  },
];

const awayMeanings: MeaningData[] = [
  {
    definition: 'To store things in their correct place',
    example: 'Please put away those files when you finish reading them.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A person storing files in their correct place',
  },
  {
    definition: 'To save money for the future',
    example: 'She puts away a portion of her salary every month for retirement.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A person saving money for retirement',
  },
  {
    definition: 'To send someone to prison or a mental hospital (informal)',
    example: 'The judge put him away for ten years for fraud.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A judge sentencing someone for fraud',
  },
  {
    definition: 'To eat or drink a large amount',
    example: 'He can really put away a lot of coffee during a coding session.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A developer drinking a lot of coffee during a coding session',
  },
];

const acrossOverMeanings: MeaningData[] = [
  {
    definition: 'To explain an idea clearly so people understand it (put across / put over)',
    example: 'The CEO put his vision across very well during the meeting.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A CEO clearly explaining a vision during a meeting',
  },
];

const forwardMeanings: MeaningData[] = [
  {
    definition: 'To suggest an idea, plan, or person for consideration',
    example: 'The manager put forward a new agile framework for the team.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A manager suggesting an agile framework to the team',
  },
  {
    definition: 'To change a clock to a later time',
    example: "Don't forget to put your clocks forward in the spring.",
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A person changing a clock forward in spring',
  },
];

const backMeanings: MeaningData[] = [
  {
    definition: 'To return something to its original place',
    example: 'Please put the laptop back in the cabinet.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A person returning a laptop to a cabinet',
  },
  {
    definition: 'To delay an event or appointment',
    example: 'The product launch was put back to November.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A product launch calendar being moved to November',
  },
  {
    definition: 'To change a clock to an earlier time',
    example: 'We put the clocks back one hour in the autumn.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A person setting a clock back one hour in autumn',
  },
];

const byMeanings: MeaningData[] = [
  {
    definition: 'To save money for the future',
    example: 'I try to put by some money each month for a new computer.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A person saving money each month for a new computer',
  },
];

const togetherMeanings: MeaningData[] = [
  {
    definition: 'To assemble the parts of something',
    example: 'We need to put together the new office furniture.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'People assembling new office furniture',
  },
  {
    definition: 'To organize or create a group or plan',
    example: 'The HR director put together an excellent leadership training program.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'An HR director organizing a leadership training program',
  },
];

const withMeanings: MeaningData[] = [
  {
    definition: 'To tolerate or accept a difficult situation without complaining (put up with)',
    example: 'As a project manager, you have to put up with unexpected delays.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A project manager dealing with unexpected delays',
  },
];

const aheadMeanings: MeaningData[] = [
  {
    definition: 'To give someone an advantage over others',
    example: 'Learning Java will really put you ahead in the job market.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A person gaining an advantage in the job market by learning Java',
  },
];

const behindMeanings: MeaningData[] = [
  {
    definition: 'To forget about a bad experience and move on',
    example: 'We lost a big client, but we need to put it behind us and focus on the future.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A team moving forward after losing a client',
  },
];

const throughMeanings: MeaningData[] = [
  {
    definition: 'To connect someone on the telephone',
    example: 'Please hold the line, I will put you through to the IT department.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A receptionist connecting a call to the IT department',
  },
  {
    definition: 'To make someone experience something very difficult',
    example: 'The tough interview process really put the candidates through a lot of stress.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Candidates experiencing a stressful interview process',
  },
  {
    definition: 'To successfully complete a business transaction or proposal',
    example: 'We finally managed to put the deal through.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Business partners completing a deal',
  },
];

const aboutAroundRoundMeanings: MeaningData[] = [
  {
    definition: 'To spread a rumour or false story (put about / put around / put round)',
    example: 'Someone is putting it about that the company is going bankrupt.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A rumour spreading about a company going bankrupt',
  },
];

const toMeanings: MeaningData[] = [
  {
    definition: 'To suggest an idea or a question to someone directly',
    example: 'I put it to the board of directors, but they rejected the idea.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A person presenting an idea to the board of directors',
  },
  {
    definition: 'To cause trouble or expense for someone',
    example: 'Moving the server room put us to a lot of trouble.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A team dealing with the trouble of moving a server room',
  },
];

export const sections: SectionData[] = [
  { particle: 'off', storageKey: 'putOff_section_expanded', storageKeyPrefix: 'putOff', meanings: offMeanings },
  { particle: 'on', storageKey: 'putOn_section_expanded', storageKeyPrefix: 'putOn', meanings: onMeanings },
  { particle: 'up', storageKey: 'putUp_section_expanded', storageKeyPrefix: 'putUp', meanings: upMeanings },
  { particle: 'down', storageKey: 'putDown_section_expanded', storageKeyPrefix: 'putDown', meanings: downMeanings },
  { particle: 'in', storageKey: 'putIn_section_expanded', storageKeyPrefix: 'putIn', meanings: inMeanings },
  { particle: 'into', storageKey: 'putInto_section_expanded', storageKeyPrefix: 'putInto', meanings: intoMeanings },
  { particle: 'out', storageKey: 'putOut_section_expanded', storageKeyPrefix: 'putOut', meanings: outMeanings },
  { particle: 'away', storageKey: 'putAway_section_expanded', storageKeyPrefix: 'putAway', meanings: awayMeanings },
  { particle: 'across / over', storageKey: 'putAcrossOver_section_expanded', storageKeyPrefix: 'putAcrossOver', meanings: acrossOverMeanings },
  { particle: 'forward', storageKey: 'putForward_section_expanded', storageKeyPrefix: 'putForward', meanings: forwardMeanings },
  { particle: 'back', storageKey: 'putBack_section_expanded', storageKeyPrefix: 'putBack', meanings: backMeanings },
  { particle: 'by', storageKey: 'putBy_section_expanded', storageKeyPrefix: 'putBy', meanings: byMeanings },
  { particle: 'together', storageKey: 'putTogether_section_expanded', storageKeyPrefix: 'putTogether', meanings: togetherMeanings },
  { particle: 'with', storageKey: 'putWith_section_expanded', storageKeyPrefix: 'putWith', meanings: withMeanings },
  { particle: 'ahead', storageKey: 'putAhead_section_expanded', storageKeyPrefix: 'putAhead', meanings: aheadMeanings },
  { particle: 'behind', storageKey: 'putBehind_section_expanded', storageKeyPrefix: 'putBehind', meanings: behindMeanings },
  { particle: 'through', storageKey: 'putThrough_section_expanded', storageKeyPrefix: 'putThrough', meanings: throughMeanings },
  { particle: 'about / around / round', storageKey: 'putAboutAroundRound_section_expanded', storageKeyPrefix: 'putAboutAroundRound', meanings: aboutAroundRoundMeanings },
  { particle: 'to', storageKey: 'putTo_section_expanded', storageKeyPrefix: 'putTo', meanings: toMeanings },
];

export default function PutVerbPage() {
  return <VerbPageLayout title="Put" sections={sections} />;
}
