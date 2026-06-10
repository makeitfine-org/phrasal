import VerbPageLayout, { MeaningData, SectionData } from '../../components/VerbPage';

const base = import.meta.env.BASE_URL;

const aboutMeanings: MeaningData[] = [
  {
    definition: 'To spend time somewhere doing nothing in particular, just waiting or relaxing.',
    example: 'Teenagers often hang around the shopping mall on weekends.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Teenagers hanging around the shopping mall on weekends',
  },
  {
    definition: 'To wait or stay in a place for a specific reason.',
    example: "I'll hang around until the management meeting is over.",
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Waiting around until the management meeting is over',
  },
  {
    definition: 'To spend time with a specific group of people.',
    example: 'He started to hang around with the software development team.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Hanging around with the software development team',
  },
];

const backMeanings: MeaningData[] = [
  {
    definition: 'To hesitate or stay behind the rest of a group because of fear, shyness, or uncertainty.',
    example: 'She hung back while the other candidates rushed to introduce themselves to the CEO.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Candidate hanging back while others rushed to introduce themselves to the CEO',
  },
];

const behindMeanings: MeaningData[] = [
  {
    definition: 'To stay in a place after other people have already left.',
    example: 'The lead developer hung behind after the meeting to ask a few more questions.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Lead developer hanging behind after the meeting to ask more questions',
  },
];

const downMeanings: MeaningData[] = [
  {
    definition: 'To drop or fall loosely downwards (usually describing hair, clothing, or branches).',
    example: 'Her long coat hung down to her ankles.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Long coat hanging down to the ankles',
  },
];

const inMeanings: MeaningData[] = [
  {
    definition: 'To remain positive and not give up during a difficult situation. (Almost always used in the phrase "hang in there".)',
    example: 'The Java migration project is really tough right now, but hang in there — it will get easier soon.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Encouraging someone to hang in there during a tough Java migration project',
  },
];

const offMeanings: MeaningData[] = [
  {
    definition: 'To hold onto the side of something to prevent yourself from falling.',
    example: 'The rescue worker was hanging off the side of the helicopter.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Rescue worker hanging off the side of a helicopter',
  },
  {
    definition: 'To hesitate or wait before taking an action (less common).',
    example: 'The board hung off making a final decision until they saw the financial report.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Board hanging off making a final decision until they saw the financial report',
  },
];

const onMeanings: MeaningData[] = [
  {
    definition: 'To wait for a short time.',
    example: 'Hang on a minute, I need to find my laptop charger.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Asking someone to hang on a minute while finding a laptop charger',
  },
  {
    definition: 'To hold something very securely.',
    example: "Hang on to the railing so you don't slip on the ice.",
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Hanging on to the railing to avoid slipping on ice',
  },
  {
    definition: 'To keep something instead of throwing it away or giving it away (usually "hang on to").',
    example: 'You should hang on to those old code backups, just in case.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Hanging on to old code backups just in case',
  },
  {
    definition: 'To rely or depend completely on something.',
    example: "The company's future hangs on the success of this new application.",
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: "Company's future hanging on the success of a new application",
  },
];

const outMeanings: MeaningData[] = [
  {
    definition: 'To spend free time relaxing or socializing with friends.',
    example: 'We usually hang out at the local coffee shop after work.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Friends hanging out at the local coffee shop after work',
  },
  {
    definition: 'To put wet clothes outside on a line to dry.',
    example: 'I need to hang the washing out before it rains.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Hanging the washing out on a line before it rains',
  },
  {
    definition: 'To lean your body out of a window or opening.',
    example: 'Do not hang out of the train window while it is moving.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Warning not to hang out of the train window while moving',
  },
];

const overMeanings: MeaningData[] = [
  {
    definition: 'To make someone worry about a future problem, or to loom like a threat.',
    example: 'The threat of budget cuts was hanging over the entire IT department.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Threat of budget cuts hanging over the entire IT department',
  },
];

const togetherMeanings: MeaningData[] = [
  {
    definition: 'To support each other and stay united as a group, especially in difficult times.',
    example: 'If the startup wants to survive this crisis, the leadership team must hang together.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Leadership team hanging together to survive the startup crisis',
  },
  {
    definition: 'To be logical, consistent, or believable (usually describing a story, theory, or argument).',
    example: "The system architect's explanation for the server crash simply doesn't hang together.",
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: "System architect's explanation for the server crash not hanging together",
  },
];

const upMeanings: MeaningData[] = [
  {
    definition: 'To end a telephone conversation by breaking the connection.',
    example: "Please don't hang up on me, I haven't finished explaining the problem!",
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: "Asking someone not to hang up before finishing explaining the problem",
  },
  {
    definition: 'To place a piece of clothing on a hook or a hanger.',
    example: 'When you enter the office, please hang up your coat in the closet.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Hanging up a coat in the office closet',
  },
  {
    definition: 'To cause a delay or problem (often used in the passive voice).',
    example: 'The software release got hung up by a series of unexpected bugs.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Software release getting hung up by unexpected bugs',
  },
];

const withMeanings: MeaningData[] = [
  {
    definition: 'An informal version of "hang out with"; to spend time with people.',
    example: 'I prefer to hang with people who share my interest in business management.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Preferring to hang with people who share an interest in business management',
  },
];

export const sections: SectionData[] = [
  { particle: 'about / around / round', storageKey: 'hangAbout_section_expanded',    storageKeyPrefix: 'hangAbout',    meanings: aboutMeanings },
  { particle: 'back',                   storageKey: 'hangBack_section_expanded',     storageKeyPrefix: 'hangBack',     meanings: backMeanings },
  { particle: 'behind',                 storageKey: 'hangBehind_section_expanded',   storageKeyPrefix: 'hangBehind',   meanings: behindMeanings },
  { particle: 'down',                   storageKey: 'hangDown_section_expanded',     storageKeyPrefix: 'hangDown',     meanings: downMeanings },
  { particle: 'in',                     storageKey: 'hangIn_section_expanded',       storageKeyPrefix: 'hangIn',       meanings: inMeanings },
  { particle: 'off',                    storageKey: 'hangOff_section_expanded',      storageKeyPrefix: 'hangOff',      meanings: offMeanings },
  { particle: 'on',                     storageKey: 'hangOn_section_expanded',       storageKeyPrefix: 'hangOn',       meanings: onMeanings },
  { particle: 'out',                    storageKey: 'hangOut_section_expanded',      storageKeyPrefix: 'hangOut',      meanings: outMeanings },
  { particle: 'over',                   storageKey: 'hangOver_section_expanded',     storageKeyPrefix: 'hangOver',     meanings: overMeanings },
  { particle: 'together',               storageKey: 'hangTogether_section_expanded', storageKeyPrefix: 'hangTogether', meanings: togetherMeanings },
  { particle: 'up',                     storageKey: 'hangUp_section_expanded',       storageKeyPrefix: 'hangUp',       meanings: upMeanings },
  { particle: 'with',                   storageKey: 'hangWith_section_expanded',     storageKeyPrefix: 'hangWith',     meanings: withMeanings },
];

export default function HangVerbPage() {
  return <VerbPageLayout title="Hang" sections={sections} />;
}
