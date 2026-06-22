import VerbPageLayout, { MeaningData, SectionData } from '../../components/VerbPage';

const base = import.meta.env.BASE_URL;

const aboutMeanings: MeaningData[] = [
  {
    definition: 'To hit out in all directions; to attack violently.',
    example: 'When the attackers approached, he began laying about him with a heavy stick.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person laying about with a heavy stick to defend against attackers',
  },
];

const awayMeanings: MeaningData[] = [
  {
    definition: 'To save money or goods for future use (often used in retail as "layaway").',
    example: 'The company lays away a portion of its quarterly profits for future software investments.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Company laying away quarterly profits for future software investments',
  },
];

const byMeanings: MeaningData[] = [
  {
    definition: 'To save money for a specific future need (similar to lay away).',
    example: 'She laid by some money every month to fund her new startup.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person laying by money every month to fund a new startup',
  },
];

const downMeanings: MeaningData[] = [
  {
    definition: 'To officially establish a rule, policy, or principle.',
    example: 'The management team laid down clear guidelines for remote work.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Management team laying down clear guidelines for remote work',
  },
  {
    definition: 'To surrender weapons; to stop fighting.',
    example: 'The rebels finally agreed to lay down their arms.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Rebels agreeing to lay down their arms',
  },
  {
    definition: 'To record music or audio.',
    example: 'The band went into the studio to lay down a new track.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Band going into the studio to lay down a new track',
  },
  {
    definition: 'To store wine in a cellar for aging.',
    example: 'We laid down several bottles of red wine to drink in ten years.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Laying down bottles of red wine in a cellar for aging',
  },
];

const forMeanings: MeaningData[] = [
  {
    definition: 'To wait secretly to attack someone; to ambush (old-fashioned/rare).',
    example: 'The thieves were laying for the manager outside the bank.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Thieves laying for the manager outside the bank',
  },
];

const inMeanings: MeaningData[] = [
  {
    definition: 'To collect and store a large supply of something for future use.',
    example: 'We need to lay in plenty of coffee before the development team starts the big sprint.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Laying in plenty of coffee before the development team starts the big sprint',
  },
];

const intoMeanings: MeaningData[] = [
  {
    definition: 'To criticize someone angrily or attack them physically.',
    example: 'The lead developer laid into the junior programmer for pushing broken code to the main server.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Lead developer laying into junior programmer for pushing broken code',
  },
];

const offMeanings: MeaningData[] = [
  {
    definition: "To end a worker's employment, usually because the company has no work or no budget.",
    example: 'The business had to lay off 20 employees due to the economic crisis.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Business laying off 20 employees due to the economic crisis',
  },
  {
    definition: 'To stop criticizing or bothering someone.',
    example: 'Lay off him! He is doing the best he can to meet the deadline.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person being told to lay off someone who is doing their best',
  },
  {
    definition: 'To stop using, consuming, or doing something for a while.',
    example: "I need to lay off the caffeine; I've been drinking too much coffee.",
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person deciding to lay off caffeine after drinking too much coffee',
  },
];

const onMeanings: MeaningData[] = [
  {
    definition: 'To provide or supply something, especially food, entertainment, or transport.',
    example: 'The company laid on a massive buffet for the leadership conference.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Company laying on a massive buffet for the leadership conference',
  },
  {
    definition: 'To apply something very thickly (like paint) or to exaggerate something (like praise or guilt).',
    example: "Don't lay on the praise too thick, or it will sound insincere.",
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person being warned not to lay on the praise too thick',
  },
];

const outMeanings: MeaningData[] = [
  {
    definition: 'To explain a plan or idea clearly and in detail.',
    example: 'The CEO laid out the new business strategy during the meeting.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'CEO laying out the new business strategy during the meeting',
  },
  {
    definition: 'To arrange things so they can be easily seen or used.',
    example: 'The designer laid out the new Java application interface on the screen.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Designer laying out the new Java application interface on the screen',
  },
  {
    definition: 'To spend a large amount of money.',
    example: 'We laid out thousands of dollars on the new server infrastructure.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Team laying out thousands of dollars on new server infrastructure',
  },
  {
    definition: 'To knock someone unconscious.',
    example: 'One punch was enough to lay him out.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'One punch being enough to lay someone out',
  },
];

const overMeanings: MeaningData[] = [
  {
    definition: 'To stop somewhere temporarily during a long journey (this creates the noun "layover").',
    example: 'I had to lay over in Frankfurt for six hours before my connecting flight to New York.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Traveller laying over in Frankfurt for six hours before a connecting flight',
  },
];

const toMeanings: MeaningData[] = [
  {
    definition: '(Nautical) To bring a ship to a standstill while facing the wind.',
    example: 'The captain decided to lay to until the storm passed.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Captain deciding to lay to until the storm passed',
  },
];

const upMeanings: MeaningData[] = [
  {
    definition: 'To be forced to stay in bed because of illness or injury (usually used in the passive: "laid up").',
    example: "Our project manager is laid up with the flu and won't be in the office this week.",
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Project manager laid up with the flu and unable to come to the office',
  },
  {
    definition: 'To take something out of active use and store it (often applied to ships, cars, or machinery).',
    example: 'The old hardware was laid up in the storage room.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Old hardware laid up in the storage room',
  },
];

export const sections: SectionData[] = [
  { particle: 'about', storageKey: 'layAbout_section_expanded', storageKeyPrefix: 'layAbout', meanings: aboutMeanings },
  { particle: 'away',  storageKey: 'layAway_section_expanded',  storageKeyPrefix: 'layAway',  meanings: awayMeanings },
  { particle: 'by',    storageKey: 'layBy_section_expanded',    storageKeyPrefix: 'layBy',    meanings: byMeanings },
  { particle: 'down',  storageKey: 'layDown_section_expanded',  storageKeyPrefix: 'layDown',  meanings: downMeanings },
  { particle: 'for',   storageKey: 'layFor_section_expanded',   storageKeyPrefix: 'layFor',   meanings: forMeanings },
  { particle: 'in',    storageKey: 'layIn_section_expanded',    storageKeyPrefix: 'layIn',    meanings: inMeanings },
  { particle: 'into',  storageKey: 'layInto_section_expanded',  storageKeyPrefix: 'layInto',  meanings: intoMeanings },
  { particle: 'off',   storageKey: 'layOff_section_expanded',   storageKeyPrefix: 'layOff',   meanings: offMeanings },
  { particle: 'on',    storageKey: 'layOn_section_expanded',    storageKeyPrefix: 'layOn',    meanings: onMeanings },
  { particle: 'out',   storageKey: 'layOut_section_expanded',   storageKeyPrefix: 'layOut',   meanings: outMeanings },
  { particle: 'over',  storageKey: 'layOver_section_expanded',  storageKeyPrefix: 'layOver',  meanings: overMeanings },
  { particle: 'to',    storageKey: 'layTo_section_expanded',    storageKeyPrefix: 'layTo',    meanings: toMeanings },
  { particle: 'up',    storageKey: 'layUp_section_expanded',    storageKeyPrefix: 'layUp',    meanings: upMeanings },
];

export default function LayVerbPage() {
  return <VerbPageLayout title="Lay" sections={sections} />;
}
