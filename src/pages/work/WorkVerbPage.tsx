import VerbPageLayout, { MeaningData, SectionData } from '../../components/VerbPage';

const base = import.meta.env.BASE_URL;

const againstMeanings: MeaningData[] = [
  {
    definition: 'To make it harder for someone to succeed; to act as a disadvantage.',
    example: 'His lack of formal experience might work against him in the interview.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person facing disadvantage during a job interview due to lack of experience',
  },
];

const aheadMeanings: MeaningData[] = [
  {
    definition: 'To complete tasks before they are due or scheduled.',
    example: 'Whenever I have free time, I try to work ahead on my assignments.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Student working ahead on assignments during free time',
  },
];

const aroundMeanings: MeaningData[] = [
  {
    definition: 'To find a way to bypass or overcome an obstacle without actually fixing the core issue (giving the noun: workaround).',
    example: 'The software has a bug, but we found a way to work around it.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Developer finding a workaround for a software bug',
  },
  {
    definition: "To schedule or arrange plans to accommodate someone else's constraints.",
    example: 'Tell me when you are free, and I will work around your schedule.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: "Calendar arranged to accommodate someone else's schedule",
  },
];

const awayMeanings: MeaningData[] = [
  {
    definition: 'To continue working hard and diligently for a sustained period.',
    example: 'She was happily working away at her desk all afternoon.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Employee working away diligently at a desk all afternoon',
  },
];

const backMeanings: MeaningData[] = [
  {
    definition: 'To start from an end result or deadline and calculate backwards to determine when to begin.',
    example: 'If the project is due on Friday, we need to work back to see when we must start.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Timeline worked back from a Friday project deadline',
  },
];

const downMeanings: MeaningData[] = [
  {
    definition: 'To gradually reduce something or progress downwards systematically, often through a list or pile.',
    example: "I have a huge stack of files; I'm just going to start at the top and work down.",
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person working down through a large stack of files',
  },
];

const forMeanings: MeaningData[] = [
  {
    definition: 'To be employed by a person or organization.',
    example: 'I work for an IT consultancy firm.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Employee working for an IT consultancy firm',
  },
  {
    definition: "To be suitable, convenient, or effective for someone's needs.",
    example: "Meeting at 10 AM doesn't work for me.",
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: "Person indicating a meeting time doesn't work for their schedule",
  },
];

const inMeanings: MeaningData[] = [
  {
    definition: 'To make time or space for something or someone in a busy schedule.',
    example: 'My schedule is packed, but I can work a quick meeting in at 3:00 PM.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Busy calendar with a quick meeting worked in at 3:00 PM',
  },
  {
    definition: 'To mix a substance into another substance thoroughly.',
    example: 'Gently work in the butter until the dough is crumbly.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Butter being worked into dough until crumbly',
  },
];

const intoMeanings: MeaningData[] = [
  {
    definition: 'To successfully fit someone or something into a busy schedule.',
    example: 'The dentist was able to work me into her schedule.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Dentist working a patient into a busy schedule',
  },
  {
    definition: 'To blend or push one material into another.',
    example: 'Work the lotion into your skin.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Lotion being worked into skin',
  },
  {
    definition: 'To gradually reach a certain emotional state, usually negative.',
    example: 'He managed to work himself into a frenzy.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person working themselves into a frenzy',
  },
];

const offMeanings: MeaningData[] = [
  {
    definition: 'To eliminate something like stress, anger, or calories through physical activity.',
    example: 'After a frustrating meeting, I went to the gym to work off my anger.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person going to the gym to work off anger after a frustrating meeting',
  },
  {
    definition: 'To repay a debt by providing labor or services instead of money.',
    example: "He couldn't afford the repairs, so he offered to work off the debt by painting the mechanic's house.",
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: "Person painting a mechanic's house to work off a repair debt",
  },
];

const onMeanings: MeaningData[] = [
  {
    definition: 'To spend time repairing, improving, or developing something.',
    example: 'She is working on her pronunciation to sound more fluent.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Student working on pronunciation to sound more fluent',
  },
  {
    definition: 'To try to persuade or influence someone to do something.',
    example: "My manager doesn't want to approve the budget, but I'll work on him.",
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: "Employee trying to work on manager to approve a budget",
  },
];

const outMeanings: MeaningData[] = [
  {
    definition: 'To exercise to improve physical fitness.',
    example: 'I try to work out at the gym three times a week.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person working out at the gym three times a week',
  },
  {
    definition: 'To solve a problem or calculate an answer.',
    example: 'Let me just work out the total cost with taxes included.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person working out the total cost with taxes on a calculator',
  },
  {
    definition: 'To happen or develop in a particular, usually successful, way.',
    example: 'I was worried about the relocation, but everything worked out perfectly.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Relocation that worked out perfectly in the end',
  },
  {
    definition: "To understand someone's character or a confusing situation.",
    example: "He is so mysterious; I just can't work him out.",
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: "Person puzzled trying to work out a mysterious person's character",
  },
];

const overMeanings: MeaningData[] = [
  {
    definition: 'To physically assault or beat someone up severely (informal).',
    example: "The gang threatened to work him over if he didn't pay.",
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Gang threatening to work someone over if they do not pay',
  },
  {
    definition: 'To examine, treat, or revise something very thoroughly.',
    example: 'The editors will work over the manuscript before publishing it.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Editors working over a manuscript before publishing',
  },
];

const throughMeanings: MeaningData[] = [
  {
    definition: 'To deal with, resolve, or overcome a complex problem or difficult emotion step by step.',
    example: 'Couples counseling helped them work through their trust issues.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Couple working through trust issues in counseling',
  },
  {
    definition: 'To read, process, or complete a large amount of material from beginning to end.',
    example: 'It took me three hours to work through all the emails in my inbox.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person working through a large inbox full of emails',
  },
];

const toMeanings: MeaningData[] = [
  {
    definition: 'To operate according to a specific schedule, rule, or constraint.',
    example: 'We are working to a very tight deadline.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Team working to a very tight deadline',
  },
];

const togetherMeanings: MeaningData[] = [
  {
    definition: 'To collaborate or cooperate as a team.',
    example: 'If we work together, we can finish this much faster.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Team working together to finish a project much faster',
  },
];

const upMeanings: MeaningData[] = [
  {
    definition: 'To gradually develop or build something, often a feeling like an appetite, courage, or sweat.',
    example: 'We went for a long hike and worked up a huge appetite.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Hikers working up a huge appetite on a long hike',
  },
  {
    definition: 'To make oneself or someone else feel upset, excited, or anxious (often used in the passive: worked up).',
    example: "Don't get yourself all worked up over a minor mistake.",
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person getting worked up over a minor mistake',
  },
  {
    definition: 'To gradually progress to something more advanced or demanding.',
    example: 'Start with lighter weights and work up to the heavy ones.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Gym-goer working up from lighter weights to heavier ones',
  },
];

const withMeanings: MeaningData[] = [
  {
    definition: 'To collaborate alongside someone.',
    example: 'I love working with my new team.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Employee working with a new team collaboratively',
  },
  {
    definition: 'To use something as a tool, material, or basis for a project.',
    example: 'Wood is a beautiful material to work with.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Craftsperson working with wood as a beautiful material',
  },
  {
    definition: 'To accommodate or adapt to a situation or constraint.',
    example: "We have a very tight budget, but we'll try to work with it.",
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Team trying to work with a very tight budget',
  },
];

export const sections: SectionData[] = [
  { particle: 'against',       storageKey: 'workAgainst_section_expanded',  storageKeyPrefix: 'workAgainst',  meanings: againstMeanings },
  { particle: 'ahead',         storageKey: 'workAhead_section_expanded',    storageKeyPrefix: 'workAhead',    meanings: aheadMeanings },
  { particle: 'around / round', storageKey: 'workAround_section_expanded',  storageKeyPrefix: 'workAround',   meanings: aroundMeanings },
  { particle: 'away',          storageKey: 'workAway_section_expanded',     storageKeyPrefix: 'workAway',     meanings: awayMeanings },
  { particle: 'back',          storageKey: 'workBack_section_expanded',     storageKeyPrefix: 'workBack',     meanings: backMeanings },
  { particle: 'down',          storageKey: 'workDown_section_expanded',     storageKeyPrefix: 'workDown',     meanings: downMeanings },
  { particle: 'for',           storageKey: 'workFor_section_expanded',      storageKeyPrefix: 'workFor',      meanings: forMeanings },
  { particle: 'in',            storageKey: 'workIn_section_expanded',       storageKeyPrefix: 'workIn',       meanings: inMeanings },
  { particle: 'into',          storageKey: 'workInto_section_expanded',     storageKeyPrefix: 'workInto',     meanings: intoMeanings },
  { particle: 'off',           storageKey: 'workOff_section_expanded',      storageKeyPrefix: 'workOff',      meanings: offMeanings },
  { particle: 'on',            storageKey: 'workOn_section_expanded',       storageKeyPrefix: 'workOn',       meanings: onMeanings },
  { particle: 'out',           storageKey: 'workOut_section_expanded',      storageKeyPrefix: 'workOut',      meanings: outMeanings },
  { particle: 'over',          storageKey: 'workOver_section_expanded',     storageKeyPrefix: 'workOver',     meanings: overMeanings },
  { particle: 'through',       storageKey: 'workThrough_section_expanded',  storageKeyPrefix: 'workThrough',  meanings: throughMeanings },
  { particle: 'to',            storageKey: 'workTo_section_expanded',       storageKeyPrefix: 'workTo',       meanings: toMeanings },
  { particle: 'together',      storageKey: 'workTogether_section_expanded', storageKeyPrefix: 'workTogether', meanings: togetherMeanings },
  { particle: 'up',            storageKey: 'workUp_section_expanded',       storageKeyPrefix: 'workUp',       meanings: upMeanings },
  { particle: 'with',          storageKey: 'workWith_section_expanded',     storageKeyPrefix: 'workWith',     meanings: withMeanings },
];

export default function WorkVerbPage() {
  return <VerbPageLayout title="Work" sections={sections} />;
}
