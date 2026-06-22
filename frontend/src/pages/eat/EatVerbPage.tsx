import VerbPageLayout, { MeaningData, SectionData } from '../../components/VerbPage';

const base = import.meta.env.BASE_URL;

const upMeanings: MeaningData[] = [
  {
    definition: 'To consume a meal or food completely.',
    example: 'You need to eat up your vegetables before you can have dessert.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Child eating up vegetables before dessert',
  },
  {
    definition: 'To consume a large amount of time, money, or resources.',
    example: 'Heating this massive house eats up a large portion of my monthly salary.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Large house consuming a large portion of monthly salary on heating',
  },
  {
    definition: 'To enjoy something greatly, or to eagerly believe something without questioning it.',
    example: 'The politician told the crowd exactly what they wanted to hear, and they ate it up.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Crowd eagerly believing what a politician tells them',
  },
  {
    definition: 'To consume someone emotionally with negative feelings like guilt or jealousy.',
    example: 'Keeping the secret from her best friend was slowly eating her up inside.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person consumed by guilt from keeping a secret',
  },
  {
    definition: 'To completely absorb, destroy, or defeat a competitor.',
    example: 'The tech giant easily ate up the smaller startups in the area.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Tech giant absorbing smaller startups',
  },
];

const intoMeanings: MeaningData[] = [
  {
    definition: 'To use up a portion of a valuable reserve, especially money or time.',
    example: 'The unexpected plumbing repairs really ate into our vacation savings.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Plumbing repairs eating into vacation savings',
  },
  {
    definition: 'To gradually damage or destroy a surface through chemical action or corrosion.',
    example: 'Without a protective coating, the salty sea air will quickly eat into the metal.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Salty sea air corroding unprotected metal',
  },
];

const awayMeanings: MeaningData[] = [
  {
    definition: 'To gradually destroy, erode, or consume something over time.',
    example: 'Over thousands of years, the river slowly ate away the soft limestone.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'River eroding soft limestone over thousands of years',
  },
  {
    definition: 'To continuously bother, distress, or cause anxiety for someone (often used with "at").',
    example: 'The stress of the upcoming trial was eating away at him.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person distressed by stress of an upcoming trial',
  },
];

const outMeanings: MeaningData[] = [
  {
    definition: 'To eat a meal at a restaurant or café rather than cooking at home.',
    example: 'I am far too exhausted to cook, so let\'s eat out tonight.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Couple eating out at a restaurant instead of cooking at home',
  },
];

const inMeanings: MeaningData[] = [
  {
    definition: 'To eat a meal at home instead of going to a restaurant.',
    example: 'We are trying to stick to a tight budget, so we plan to eat in this weekend.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Family eating in at home to stick to a budget',
  },
];

const throughMeanings: MeaningData[] = [
  {
    definition: 'To make a physical hole in something by biting, chewing, or corroding.',
    example: 'During the winter, mice managed to eat through the drywall in the garage.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Mice eating through drywall in a garage during winter',
  },
  {
    definition: 'To exhaust or consume a massive supply of money or resources very rapidly.',
    example: 'He ate through his entire inheritance in just three years of reckless spending.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person rapidly spending through an entire inheritance',
  },
];

const aroundMeanings: MeaningData[] = [
  {
    definition: 'To consume a meal while deliberately avoiding a specific ingredient on the plate.',
    example: 'The child absolutely hated mushrooms and carefully ate around them.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Child carefully eating around mushrooms on their plate',
  },
];

const onMeanings: MeaningData[] = [
  {
    definition: 'To gradually consume a large amount of leftover food over an extended period.',
    example: 'We cooked a massive turkey for the holiday and will just eat on it for the rest of the week.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Family eating leftover turkey over several days after the holiday',
  },
];

const downMeanings: MeaningData[] = [
  {
    definition: 'To graze pasture or grass until it is very short or completely gone.',
    example: 'The herd of sheep completely ate down the grass in the lower field.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Herd of sheep grazing down the grass in a field',
  },
];

const offMeanings: MeaningData[] = [
  {
    definition: 'To remove a layer or surface by eating, chewing, or chemical corrosion.',
    example: 'The dog chewed the furniture so aggressively that he ate the varnish off.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Dog chewing furniture and removing the varnish',
  },
];

export const sections: SectionData[] = [
  { particle: 'up',            storageKey: 'eatUp_section_expanded',      storageKeyPrefix: 'eatUp',      meanings: upMeanings },
  { particle: 'into',          storageKey: 'eatInto_section_expanded',    storageKeyPrefix: 'eatInto',    meanings: intoMeanings },
  { particle: 'away',          storageKey: 'eatAway_section_expanded',    storageKeyPrefix: 'eatAway',    meanings: awayMeanings },
  { particle: 'out',           storageKey: 'eatOut_section_expanded',     storageKeyPrefix: 'eatOut',     meanings: outMeanings },
  { particle: 'in',            storageKey: 'eatIn_section_expanded',      storageKeyPrefix: 'eatIn',      meanings: inMeanings },
  { particle: 'through',       storageKey: 'eatThrough_section_expanded', storageKeyPrefix: 'eatThrough', meanings: throughMeanings },
  { particle: 'around / round', storageKey: 'eatAround_section_expanded',  storageKeyPrefix: 'eatAround',  meanings: aroundMeanings },
  { particle: 'on',            storageKey: 'eatOn_section_expanded',      storageKeyPrefix: 'eatOn',      meanings: onMeanings },
  { particle: 'down',          storageKey: 'eatDown_section_expanded',    storageKeyPrefix: 'eatDown',    meanings: downMeanings },
  { particle: 'off',           storageKey: 'eatOff_section_expanded',     storageKeyPrefix: 'eatOff',     meanings: offMeanings },
];

export default function EatVerbPage() {
  return <VerbPageLayout title="Eat" sections={sections} />;
}
