import VerbPageLayout, { MeaningData, SectionData } from '../../components/VerbPage';

const base = import.meta.env.BASE_URL;

const offMeanings: MeaningData[] = [
  {
    definition: 'To use your hand or a brush to remove dirt, dust, or something unwanted from a surface.',
    example: 'I brushed off my suit before entering the meeting.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Brushing off a suit before a meeting',
  },
  {
    definition: 'To ignore someone, refuse to listen to them, or treat their ideas as unimportant.',
    example: 'I tried to suggest a new Java framework, but the lead developer brushed me off.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Developer dismissing a framework suggestion',
  },
];

const upMeanings: MeaningData[] = [
  {
    definition: 'To improve your knowledge or skill in something you learned in the past but have partly forgotten.',
    example: 'You should brush up on your management skills before applying for the leadership role.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Improving management skills before a leadership role',
  },
];

const awayMeanings: MeaningData[] = [
  {
    definition: 'To remove something by sweeping it with your hand or a brush.',
    example: 'She brushed away the crumbs from the keyboard.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Brushing crumbs off a keyboard',
  },
  {
    definition: 'To quickly dismiss a feeling, thought, or fear.',
    example: 'He brushed away his doubts and launched the new software product.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Dismissing doubts before launching a product',
  },
];

const downMeanings: MeaningData[] = [
  {
    definition: 'To clean someone or something by brushing them from top to bottom.',
    example: 'The rider brushed down the horse after the race.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Rider brushing down a horse after a race',
  },
];

const outMeanings: MeaningData[] = [
  {
    definition: 'To remove tangles or dirt from hair or fur using a brush.',
    example: "It takes a long time to brush out this dog's thick coat.",
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: "Brushing out a dog's thick coat",
  },
  {
    definition: 'To clean the inside of something with a brush.',
    example: 'Please brush out the back of the company van before returning it.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Cleaning the inside of a company van with a brush',
  },
];

const onMeanings: MeaningData[] = [
  {
    definition: 'To apply a liquid (like paint, glue, or a sauce) to a surface using a brush.',
    example: 'Brush on a light coat of varnish to protect the wood.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Applying varnish to wood with a brush',
  },
];

const overMeanings: MeaningData[] = [
  {
    definition: 'To ignore a problem or treat a topic lightly instead of explaining it in detail.',
    example: 'The CEO brushed over the bad financial report and focused only on future goals.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'CEO glossing over a bad financial report',
  },
];

const againstMeanings: MeaningData[] = [
  {
    definition: 'To touch someone or something lightly while moving past them.',
    example: 'My shoulder brushed against the doorframe as I walked into the office.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Shoulder lightly touching a doorframe',
  },
];

const byMeanings: MeaningData[] = [
  {
    definition: 'To walk past someone in a narrow space, touching them slightly.',
    example: 'He brushed by me in the crowded hallway without saying excuse me.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Walking past someone in a crowded hallway',
  },
];

const backMeanings: MeaningData[] = [
  {
    definition: 'To push hair away from your face.',
    example: 'She brushed back her hair to look closer at the screen.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Brushing hair back to see a screen clearly',
  },
  {
    definition: 'To force someone to move backward (often used in baseball when a pitcher throws a ball very close to the batter).',
    example: 'The pitcher threw a fast ball inside to brush back the batter.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Pitcher throwing inside to push back the batter',
  },
];

const throughMeanings: MeaningData[] = [
  {
    definition: 'To move a brush completely through hair to remove knots.',
    example: 'Just brush through your hair quickly before the video call starts.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Brushing through hair before a video call',
  },
];

export const sections: SectionData[] = [
  { particle: 'off',       storageKey: 'brushOff_section_expanded',     storageKeyPrefix: 'brushOff',     meanings: offMeanings },
  { particle: 'up / up on', storageKey: 'brushUp_section_expanded',      storageKeyPrefix: 'brushUp',      meanings: upMeanings },
  { particle: 'away',      storageKey: 'brushAway_section_expanded',    storageKeyPrefix: 'brushAway',    meanings: awayMeanings },
  { particle: 'down',      storageKey: 'brushDown_section_expanded',    storageKeyPrefix: 'brushDown',    meanings: downMeanings },
  { particle: 'out',       storageKey: 'brushOut_section_expanded',     storageKeyPrefix: 'brushOut',     meanings: outMeanings },
  { particle: 'on',        storageKey: 'brushOn_section_expanded',      storageKeyPrefix: 'brushOn',      meanings: onMeanings },
  { particle: 'over',      storageKey: 'brushOver_section_expanded',    storageKeyPrefix: 'brushOver',    meanings: overMeanings },
  { particle: 'against',   storageKey: 'brushAgainst_section_expanded', storageKeyPrefix: 'brushAgainst', meanings: againstMeanings },
  { particle: 'by',        storageKey: 'brushBy_section_expanded',      storageKeyPrefix: 'brushBy',      meanings: byMeanings },
  { particle: 'back',      storageKey: 'brushBack_section_expanded',    storageKeyPrefix: 'brushBack',    meanings: backMeanings },
  { particle: 'through',   storageKey: 'brushThrough_section_expanded', storageKeyPrefix: 'brushThrough', meanings: throughMeanings },
];

export default function BrushVerbPage() {
  return <VerbPageLayout title="Brush" sections={sections} />;
}
