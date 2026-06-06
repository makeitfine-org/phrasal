import VerbPageLayout, { MeaningData, SectionData } from '../../components/VerbPage';

const base = import.meta.env.BASE_URL;

const offMeanings: MeaningData[] = [
  {
    definition: 'To remove clothing or accessories',
    example: 'Please take off your shoes inside the house.',
    imageSrc: `${base}images/phrasal_verbs/list/take/off/clothing.png`,
    imageAlt: 'A person removing their shoes at the door',
  },
  {
    definition: 'To leave the ground and begin flying',
    example: 'The flight will take off in ten minutes.',
    imageSrc: `${base}images/phrasal_verbs/list/take/off/planes.png`,
    imageAlt: 'An aeroplane taking off from a runway',
  },
  {
    definition: 'To become very successful very quickly (business or ideas)',
    example: 'Her new software company really took off this year.',
    imageSrc: `${base}images/phrasal_verbs/list/take/off/business.png`,
    imageAlt: 'A fast-growing software company',
  },
  {
    definition: 'To leave quickly or without warning (informal)',
    example: 'He took off before the meeting ended.',
    imageSrc: `${base}images/phrasal_verbs/list/take/off/leave_suddenly.png`,
    imageAlt: 'A person leaving a meeting early without warning',
  },
  {
    definition: 'To have time away from work',
    example: 'I need to take a few days off to rest.',
    imageSrc: `${base}images/phrasal_verbs/list/take/off/days_off.png`,
    imageAlt: 'A person resting at home on days off work',
  },
];

const onMeanings: MeaningData[] = [
  {
    definition: 'To accept or take responsibility for work or a task',
    example: 'I cannot take on any new projects right now.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A person declining extra project responsibilities',
  },
  {
    definition: 'To employ or hire someone',
    example: 'The company is taking on fifty new developers.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A company hiring new developers',
  },
  {
    definition: 'To compete or fight against someone',
    example: 'Our team will take on the market leader next year.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Two teams competing in a business challenge',
  },
];

const upMeanings: MeaningData[] = [
  {
    definition: 'To start a new activity or hobby',
    example: 'He took up golf to relax after work.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A person starting to play golf',
  },
  {
    definition: 'To use or fill an amount of time or space',
    example: 'These large files take up too much space on the server.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Large files filling up server storage space',
  },
  {
    definition: "To accept an offer that has been made (often 'take someone up on')",
    example: 'I will take you up on that job offer.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A person accepting a job offer',
  },
  {
    definition: 'To shorten a piece of clothing',
    example: 'I need to take up these trousers; they are too long.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A tailor shortening a pair of trousers',
  },
];

const downMeanings: MeaningData[] = [
  {
    definition: 'To write down information',
    example: 'Please take down the main points of the presentation.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A person writing notes during a presentation',
  },
  {
    definition: 'To remove from a high place or to dismantle something',
    example: 'We need to take down the old website.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A developer removing an old website',
  },
  {
    definition: 'To defeat or humiliate someone',
    example: "The journalist's report took down the corrupt manager.",
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A journalist exposing a corrupt manager',
  },
];

const inMeanings: MeaningData[] = [
  {
    definition: 'To absorb and understand information',
    example: 'The technical manual was very hard to take in.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A person struggling to understand a complex manual',
  },
  {
    definition: 'To allow someone or something to stay in your home',
    example: 'She took in a dog from the street.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A person taking in a stray dog from the street',
  },
  {
    definition: 'To deceive or trick someone (often passive)',
    example: 'Many people were taken in by the email scam.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'People being deceived by an email scam',
  },
  {
    definition: 'To make a piece of clothing narrower or smaller',
    example: 'I lost weight, so I had to take in my suits.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A tailor making a suit smaller',
  },
];

const intoMeanings: MeaningData[] = [
  {
    definition: "To consider something when making a decision (mainly 'take into account / consideration')",
    example: 'We must take the budget into account before making a decision.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A team considering the budget before making a decision',
  },
];

const outMeanings: MeaningData[] = [
  {
    definition: 'To remove something from a place or container',
    example: 'Please take the trash out.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A person taking out the rubbish',
  },
  {
    definition: 'To invite someone to go somewhere and pay for them',
    example: 'I would like to take you out for dinner.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Two people having dinner at a restaurant',
  },
  {
    definition: 'To obtain an official service such as a loan or insurance',
    example: 'The business took out a large bank loan.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A business manager signing a bank loan agreement',
  },
  {
    definition: 'To destroy or eliminate something (informal)',
    example: 'The virus took out the entire IT system.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A computer virus destroying an IT system',
  },
  {
    definition: "To direct negative feelings at someone who is not responsible (phrase 'take it out on')",
    example: 'I know you are stressed, but do not take it out on your team.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A stressed manager unfairly venting on team members',
  },
];

const awayMeanings: MeaningData[] = [
  {
    definition: 'To remove or subtract something',
    example: 'If you take away the marketing costs, the profit is high.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A person subtracting costs from a profit calculation',
  },
  {
    definition: 'To confiscate something without permission',
    example: 'The teacher took away his mobile phone.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A teacher confiscating a student\'s mobile phone',
  },
  {
    definition: 'To buy food from a restaurant to eat elsewhere',
    example: 'We bought a pizza to take away.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A person buying a takeaway pizza',
  },
  {
    definition: 'To learn or receive a main lesson or message (noun: a takeaway)',
    example: 'What did you take away from that leadership seminar?',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A person reflecting on the key lessons from a seminar',
  },
];

const crossAcrossMeanings: MeaningData[] = [
  {
    definition: 'Literal use: to physically guide or lead someone across a space (no common figurative meaning)',
    example: 'She took the blind man across the street.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A person helping a blind man cross the street',
  },
];

const forwardMeanings: MeaningData[] = [
  {
    definition: 'To develop, promote, or make progress with a plan or idea',
    example: 'We need a new manager to take this project forward.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A manager moving a project forward',
  },
];

const backMeanings: MeaningData[] = [
  {
    definition: 'To return something to the place where it was bought',
    example: 'The laptop was broken, so I took it back to the store.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A person returning a broken laptop to a store',
  },
  {
    definition: 'To admit that something you said was wrong',
    example: 'I take back what I said; you were right.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A person admitting they were wrong in a conversation',
  },
  {
    definition: 'To remind someone of an earlier time in their life',
    example: 'Hearing that old song takes me back to my university days.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A person feeling nostalgic after hearing an old song',
  },
  {
    definition: 'To accept someone back into a relationship or job',
    example: 'The company took him back after he finished his studies.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A company welcoming an employee back after their studies',
  },
];

const forMeanings: MeaningData[] = [
  {
    definition: "To mistake someone's identity or character",
    example: 'Do you take me for a fool?',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A person challenging someone who has misjudged them',
  },
  {
    definition: "To fail to appreciate something or someone (phrase 'take for granted')",
    example: 'A good leader never takes their employees for granted.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A leader showing appreciation for their team',
  },
];

const byMeanings: MeaningData[] = [
  {
    definition: "To happen unexpectedly (phrase 'take by surprise')",
    example: 'The sudden market crash took us by surprise.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Business people shocked by a sudden market crash',
  },
  {
    definition: "To rapidly become very popular or widely admired (phrase 'take by storm')",
    example: 'The new app took the world by storm.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A new app becoming wildly popular worldwide',
  },
];

const togetherMeanings: MeaningData[] = [
  {
    definition: 'To consider a group of things or facts as a whole',
    example: 'Taken together, these three software modules form a powerful system.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Three software modules considered as one system',
  },
];

const withMeanings: MeaningData[] = [
  {
    definition: 'To be attracted to or impressed by someone or something (usually passive)',
    example: 'I was very taken with his presentation on Agile management.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A person impressed by a presentation on Agile management',
  },
];

const withoutMeanings: MeaningData[] = [
  {
    definition: 'Literal use: to take an item without something else (no common figurative meaning)',
    example: 'I will take the coffee without sugar.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A person ordering coffee without sugar',
  },
];

const apartMeanings: MeaningData[] = [
  {
    definition: 'To separate something into its component pieces',
    example: 'The engineer took the machine apart to fix it.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'An engineer dismantling a machine for repairs',
  },
  {
    definition: 'To criticize someone or something very heavily, or to defeat easily',
    example: 'The director took my business plan apart.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A director heavily criticising a business plan',
  },
];

const overMeanings: MeaningData[] = [
  {
    definition: 'To gain control of a company, organization, or situation',
    example: 'A larger corporation wants to take over our business.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A large corporation taking over a smaller business',
  },
  {
    definition: 'To replace someone in doing a task or job',
    example: 'I am tired. Can you take over driving?',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A passenger taking over the driving from a tired driver',
  },
];

const aheadMeanings: MeaningData[] = [
  {
    definition: 'Literal use: to carry or move something to the front (no standard figurative meaning)',
    example: 'Could you take this report ahead and put it on the meeting table?',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A person carrying a report to the front of a meeting room',
  },
];

const afterMeanings: MeaningData[] = [
  {
    definition: 'To look or behave like an older family member',
    example: 'She takes after her father; they both love mathematics.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A daughter who resembles her father in personality',
  },
];

const behindMeanings: MeaningData[] = [
  {
    definition: 'Literal use: to physically move someone or something to the back (no standard figurative meaning)',
    example: 'Take the new equipment behind the stage before the show starts.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Stage crew moving equipment behind the stage',
  },
];

const throughMeanings: MeaningData[] = [
  {
    definition: 'To explain or describe a process step by step',
    example: 'Let me take you through the new software setup.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A trainer explaining a software setup step by step',
  },
];

const aboutMeanings: MeaningData[] = [
  {
    definition: 'Literal use: to express an approximate amount of time, distance, or effort (no standard phrasal verb)',
    example: 'It will take about two hours to finish the report.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A person estimating how long a task will take',
  },
];

const aroundRoundMeanings: MeaningData[] = [
  {
    definition: 'To show someone around a place (also: take round)',
    example: 'Welcome to the headquarters. I will take you around.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A person giving a tour of company headquarters',
  },
];

const toMeanings: MeaningData[] = [
  {
    definition: 'To start liking someone or something quickly and naturally',
    example: 'The team took to the new manager immediately.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A team warming to a new manager straight away',
  },
  {
    definition: 'To start a new habit, often as a response to stress or difficulty',
    example: 'Because of stress, he took to drinking coffee late at night.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A person developing a late-night coffee habit due to stress',
  },
];

const againstMeanings: MeaningData[] = [
  {
    definition: 'To start to dislike someone for no clear or obvious reason',
    example: 'I do not know why, but she took against me from my first day in the office.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A person who dislikes a colleague for no clear reason',
  },
];

const sections: SectionData[] = [
  { particle: 'off', storageKey: 'takeOff_section_expanded', storageKeyPrefix: 'takeOff', meanings: offMeanings },
  { particle: 'on', storageKey: 'takeOn_section_expanded', storageKeyPrefix: 'takeOn', meanings: onMeanings },
  { particle: 'up', storageKey: 'takeUp_section_expanded', storageKeyPrefix: 'takeUp', meanings: upMeanings },
  { particle: 'down', storageKey: 'takeDown_section_expanded', storageKeyPrefix: 'takeDown', meanings: downMeanings },
  { particle: 'in', storageKey: 'takeIn_section_expanded', storageKeyPrefix: 'takeIn', meanings: inMeanings },
  { particle: 'into', storageKey: 'takeInto_section_expanded', storageKeyPrefix: 'takeInto', meanings: intoMeanings },
  { particle: 'out', storageKey: 'takeOut_section_expanded', storageKeyPrefix: 'takeOut', meanings: outMeanings },
  { particle: 'away', storageKey: 'takeAway_section_expanded', storageKeyPrefix: 'takeAway', meanings: awayMeanings },
  { particle: 'cross / across', storageKey: 'takeCrossAcross_section_expanded', storageKeyPrefix: 'takeCrossAcross', meanings: crossAcrossMeanings },
  { particle: 'forward', storageKey: 'takeForward_section_expanded', storageKeyPrefix: 'takeForward', meanings: forwardMeanings },
  { particle: 'back', storageKey: 'takeBack_section_expanded', storageKeyPrefix: 'takeBack', meanings: backMeanings },
  { particle: 'for', storageKey: 'takeFor_section_expanded', storageKeyPrefix: 'takeFor', meanings: forMeanings },
  { particle: 'by', storageKey: 'takeBy_section_expanded', storageKeyPrefix: 'takeBy', meanings: byMeanings },
  { particle: 'together', storageKey: 'takeTogether_section_expanded', storageKeyPrefix: 'takeTogether', meanings: togetherMeanings },
  { particle: 'with', storageKey: 'takeWith_section_expanded', storageKeyPrefix: 'takeWith', meanings: withMeanings },
  { particle: 'without', storageKey: 'takeWithout_section_expanded', storageKeyPrefix: 'takeWithout', meanings: withoutMeanings },
  { particle: 'apart', storageKey: 'takeApart_section_expanded', storageKeyPrefix: 'takeApart', meanings: apartMeanings },
  { particle: 'over', storageKey: 'takeOver_section_expanded', storageKeyPrefix: 'takeOver', meanings: overMeanings },
  { particle: 'ahead', storageKey: 'takeAhead_section_expanded', storageKeyPrefix: 'takeAhead', meanings: aheadMeanings },
  { particle: 'after', storageKey: 'takeAfter_section_expanded', storageKeyPrefix: 'takeAfter', meanings: afterMeanings },
  { particle: 'behind', storageKey: 'takeBehind_section_expanded', storageKeyPrefix: 'takeBehind', meanings: behindMeanings },
  { particle: 'through', storageKey: 'takeThrough_section_expanded', storageKeyPrefix: 'takeThrough', meanings: throughMeanings },
  { particle: 'about', storageKey: 'takeAbout_section_expanded', storageKeyPrefix: 'takeAbout', meanings: aboutMeanings },
  { particle: 'around / round', storageKey: 'takeAroundRound_section_expanded', storageKeyPrefix: 'takeAroundRound', meanings: aroundRoundMeanings },
  { particle: 'to', storageKey: 'takeTo_section_expanded', storageKeyPrefix: 'takeTo', meanings: toMeanings },
  { particle: 'against', storageKey: 'takeAgainst_section_expanded', storageKeyPrefix: 'takeAgainst', meanings: againstMeanings },
];

export default function TakeVerbPage() {
  return <VerbPageLayout title="Take" sections={sections} />;
}
