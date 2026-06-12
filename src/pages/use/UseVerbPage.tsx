import VerbPageLayout, { MeaningData, SectionData } from '../../components/VerbPage';

const base = import.meta.env.BASE_URL;

const againstMeanings: MeaningData[] = [
  {
    definition: 'To utilize information, evidence, or a person\'s trait to harm, manipulate, or gain an advantage over them.',
    example: 'You have the right to remain silent; anything you say can and will be used against you in a court of law.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Right to remain silent; anything said can be used against you in a court of law',
  },
];

const toMeanings: MeaningData[] = [
  {
    definition: 'Indicates an action done regularly in the past but no longer done, or a past state that no longer exists.',
    example: 'I used to play the piano every day when I was a child.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Child who used to play piano every day',
  },
  {
    definition: 'To be familiar with something so it no longer seems new, strange, or difficult (be/get used to).',
    example: 'It took me a few months, but I am finally used to waking up at 5:00 AM.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person finally used to waking up at 5:00 AM after a few months',
  },
];

const upMeanings: MeaningData[] = [
  {
    definition: 'To consume entirely, expending the entirety of a supply, resource, or material so that nothing is left.',
    example: 'We need to use up all the fresh vegetables in the fridge before they spoil.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Using up all fresh vegetables in the fridge before they spoil',
  },
  {
    definition: 'To drain someone of their energy, strength, or usefulness (often passive).',
    example: 'After working three double shifts in a row, he felt completely used up.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person feeling completely used up after working three double shifts in a row',
  },
];

export const sections: SectionData[] = [
  { particle: 'against',      storageKey: 'useAgainst_section_expanded', storageKeyPrefix: 'useAgainst', meanings: againstMeanings },
  { particle: 'to / used to', storageKey: 'useTo_section_expanded',      storageKeyPrefix: 'useTo',      meanings: toMeanings },
  { particle: 'up',           storageKey: 'useUp_section_expanded',       storageKeyPrefix: 'useUp',      meanings: upMeanings },
];

export default function UseVerbPage() {
  return <VerbPageLayout title="Use" sections={sections} />;
}
