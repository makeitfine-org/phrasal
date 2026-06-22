import VerbPageLayout, { MeaningData, SectionData } from '../../components/VerbPage';

const base = import.meta.env.BASE_URL;

const backMeanings: MeaningData[] = [
  {
    definition: 'To step backward in order to form a straight line (military / marching context).',
    example: 'The front row had to dress back to give the others more space.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Front row stepping backward to form a straight line',
  },
];

const byMeanings: MeaningData[] = [
  {
    definition: 'To use a specific person or point on one side as a guide to form a straight line (military / marching context).',
    example: 'The marching band had to dress by the right.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Marching band aligning by a reference point on the right',
  },
];

const downMeanings: MeaningData[] = [
  {
    definition: 'To wear clothes that are more informal or casual than what you usually wear.',
    example: 'My company allows us to dress down on Fridays and wear jeans.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person wearing casual clothes on a casual Friday',
  },
  {
    definition: 'To strongly criticize or scold someone because they did something wrong.',
    example: 'The manager dressed down the team for missing the important deadline.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Manager scolding team for missing a deadline',
  },
];

const offMeanings: MeaningData[] = [
  {
    definition: 'To use a specific reference point to form a straight line in a formation (military / marching context).',
    example: 'The soldiers were ordered to dress off the right flank.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Soldiers aligning off the right flank',
  },
];

const onMeanings: MeaningData[] = [
  {
    definition: 'To use a specific person or point directly as a guide to align a formation (military / marching context).',
    example: 'The captain ordered the soldiers to dress on the center guide.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Soldiers aligning on the center guide',
  },
];

const outMeanings: MeaningData[] = [
  {
    definition: 'To put on a sports uniform or equipment to get ready to play in a game.',
    example: 'Only twenty players will dress out for the football game this weekend.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Football players putting on uniforms before a game',
  },
  {
    definition: "To clean and prepare an animal's body so the meat can be eaten or sold.",
    example: 'It took the hunters a few hours to dress out the deer they caught.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Hunters preparing a deer after a hunt',
  },
];

const upMeanings: MeaningData[] = [
  {
    definition: 'To wear formal, elegant, or special clothes, usually for an event.',
    example: 'We are going to a fancy restaurant tonight, so we need to dress up.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'People dressed up for a fancy restaurant',
  },
  {
    definition: 'To put on a costume to look like someone or something else.',
    example: 'The children decided to dress up as pirates and princesses.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Children dressed up as pirates and princesses',
  },
  {
    definition: 'To make something look more attractive, interesting, or better than it really is.',
    example: 'You can dress up a plain soup by adding some fresh herbs and cream.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Plain soup made more attractive with fresh herbs and cream',
  },
];

export const sections: SectionData[] = [
  { particle: 'back', storageKey: 'dressBack_section_expanded', storageKeyPrefix: 'dressBack', meanings: backMeanings },
  { particle: 'by',   storageKey: 'dressBy_section_expanded',   storageKeyPrefix: 'dressBy',   meanings: byMeanings },
  { particle: 'down', storageKey: 'dressDown_section_expanded', storageKeyPrefix: 'dressDown', meanings: downMeanings },
  { particle: 'off',  storageKey: 'dressOff_section_expanded',  storageKeyPrefix: 'dressOff',  meanings: offMeanings },
  { particle: 'on',   storageKey: 'dressOn_section_expanded',   storageKeyPrefix: 'dressOn',   meanings: onMeanings },
  { particle: 'out',  storageKey: 'dressOut_section_expanded',  storageKeyPrefix: 'dressOut',  meanings: outMeanings },
  { particle: 'up',   storageKey: 'dressUp_section_expanded',   storageKeyPrefix: 'dressUp',   meanings: upMeanings },
];

export default function DressVerbPage() {
  return <VerbPageLayout title="Dress" sections={sections} />;
}
