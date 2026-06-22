import VerbPageLayout, { MeaningData, SectionData } from '../../components/VerbPage';

const base = import.meta.env.BASE_URL;

const awayMeanings: MeaningData[] = [
  {
    definition: 'To erode or cause something to gradually disappear, thin, or become smooth through continuous friction, use, or weather.',
    example: 'Years of salty sea breezes have worn away the bright paint on the older coastal buildings.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Coastal buildings with paint worn away by salty sea breezes',
  },
];

const downMeanings: MeaningData[] = [
  {
    definition: 'To overcome someone\'s resistance, opposition, or reluctance through persistent pressure.',
    example: 'The developer initially wanted a much higher salary, but the long negotiation process eventually wore them down.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Developer worn down during a long salary negotiation',
  },
  {
    definition: 'To reduce the size, thickness, or effectiveness of something by continuous friction or prolonged use.',
    example: 'The treads on the 20-inch bicycle tires were completely worn down from a summer of heavy riding.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Bicycle tires worn down from heavy summer riding',
  },
];

const inMeanings: MeaningData[] = [
  {
    definition: 'To wear new clothing, especially stiff shoes or boots, until they conform to your body and become comfortable to use.',
    example: 'I need to walk around the apartment for a few days to wear in these new shoes before we do any serious walking.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Wearing in new shoes by walking around the apartment',
  },
];

const offMeanings: MeaningData[] = [
  {
    definition: 'To gradually disappear, fade, or stop having an effect, usually referring to a feeling, a drug\'s effect, or a novelty.',
    example: 'The excitement of moving to a new country can start to wear off once the heavy paperwork begins.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Excitement of moving to a new country wearing off with paperwork',
  },
];

const onMeanings: MeaningData[] = [
  {
    definition: 'Of time or an event: to pass, especially when it feels slow, tedious, or prolonged.',
    example: 'As the technical interview wore on, it became clear the applicant didn\'t actually have the required Java experience.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A technical interview wearing on as the applicant struggles',
  },
  {
    definition: 'To gradually annoy, irritate, or exhaust someone\'s patience over time.',
    example: 'The constant noise from the street below started to wear on Sam as the afternoon progressed.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Constant street noise wearing on someone\'s patience',
  },
];

const outMeanings: MeaningData[] = [
  {
    definition: 'To use something until it is damaged, broken, or completely useless.',
    example: 'I\'ve practically worn out my laptop\'s keyboard from typing so many outreach messages.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Laptop keyboard worn out from heavy typing',
  },
  {
    definition: 'To make someone extremely physically or mentally tired; to exhaust.',
    example: 'Coordinating two young children\'s daily schedules while managing full-time work can really wear you out.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Parent worn out from managing children and full-time work',
  },
];

const throughMeanings: MeaningData[] = [
  {
    definition: 'To create a hole in something as a result of continuous use, friction, or rubbing.',
    example: 'She leaned on her desk so much that she completely wore through the elbows of her favourite sweater.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Sweater with elbows worn through from leaning on a desk',
  },
];

export const sections: SectionData[] = [
  { particle: 'away',    storageKey: 'wearAway_section_expanded',    storageKeyPrefix: 'wearAway',    meanings: awayMeanings },
  { particle: 'down',    storageKey: 'wearDown_section_expanded',    storageKeyPrefix: 'wearDown',    meanings: downMeanings },
  { particle: 'in',      storageKey: 'wearIn_section_expanded',      storageKeyPrefix: 'wearIn',      meanings: inMeanings },
  { particle: 'off',     storageKey: 'wearOff_section_expanded',     storageKeyPrefix: 'wearOff',     meanings: offMeanings },
  { particle: 'on',      storageKey: 'wearOn_section_expanded',      storageKeyPrefix: 'wearOn',      meanings: onMeanings },
  { particle: 'out',     storageKey: 'wearOut_section_expanded',     storageKeyPrefix: 'wearOut',     meanings: outMeanings },
  { particle: 'through', storageKey: 'wearThrough_section_expanded', storageKeyPrefix: 'wearThrough', meanings: throughMeanings },
];

export default function WearVerbPage() {
  return <VerbPageLayout title="Wear" sections={sections} />;
}
