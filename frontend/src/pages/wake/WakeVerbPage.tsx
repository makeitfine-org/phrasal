import VerbPageLayout, { MeaningData, SectionData } from '../../components/VerbPage';

const base = import.meta.env.BASE_URL;

const toMeanings: MeaningData[] = [
  {
    definition: 'To stop sleeping and immediately find a specific condition, sound, or situation greeting you.',
    example: 'We woke to the sound of birds singing outside the window.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Waking to the sound of birds singing outside the window',
  },
  {
    definition: 'To become aware of a fact or responsibility (literary).',
    example: 'Society is slowly waking to the severe impacts of climate change.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Society slowly waking to the severe impacts of climate change',
  },
];

const upMeanings: MeaningData[] = [
  {
    definition: 'To transition naturally from sleep to an awake state.',
    example: 'I usually wake up at 6:30 AM without an alarm.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person waking up at 6:30 AM without an alarm',
  },
  {
    definition: 'To rouse another person, animal, or system from sleep.',
    example: 'Please wake me up when the train gets to London.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Asking someone to wake you up when the train gets to London',
  },
  {
    definition: 'To stop being inattentive or oblivious and start paying attention to responsibilities.',
    example: 'The team was playing terribly, but they finally woke up in the second half and won the game.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Team finally waking up in the second half and winning the game',
  },
  {
    definition: 'To inject energy, excitement, or activity into a dull environment or event.',
    example: 'We need to hire a better DJ to wake this party up.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Hiring a better DJ to wake the party up',
  },
];

const upToMeanings: MeaningData[] = [
  {
    definition: 'To finally realize or understand a fact, condition, or danger that one was previously ignoring or failing to notice.',
    example: "The company's board needs to wake up to the fact that their competitors are innovating faster.",
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: "Company's board needing to wake up to the fact that competitors are innovating faster",
  },
];

export const sections: SectionData[] = [
  { particle: 'to',    storageKey: 'wakeTo_section_expanded',   storageKeyPrefix: 'wakeTo',   meanings: toMeanings },
  { particle: 'up',    storageKey: 'wakeUp_section_expanded',   storageKeyPrefix: 'wakeUp',   meanings: upMeanings },
  { particle: 'up to', storageKey: 'wakeUpTo_section_expanded', storageKeyPrefix: 'wakeUpTo', meanings: upToMeanings },
];

export default function WakeVerbPage() {
  return <VerbPageLayout title="Wake" sections={sections} />;
}
