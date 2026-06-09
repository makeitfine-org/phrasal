import VerbPageLayout, { MeaningData, SectionData } from '../../components/VerbPage';

const base = import.meta.env.BASE_URL;

const againstMeanings: MeaningData[] = [
  {
    definition: 'To express a desire for someone or something to fail or lose.',
    example: "In a healthy business environment, you focus on improving your own product rather than cheering against your competitors.",
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Team focused on improving their own product',
  },
];

const forMeanings: MeaningData[] = [
  {
    definition: 'To publicly support a specific person, team, or idea, hoping they will succeed.',
    example: 'Everyone in the office is cheering for the new software release to be a success.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Office team cheering for a software release',
  },
];

const offMeanings: MeaningData[] = [
  {
    definition: 'To applaud or shout in support of someone as they are leaving a stage, field, or room.',
    example: 'After 20 years with the company, the retiring manager was cheered off the stage by his colleagues.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Colleagues cheering off a retiring manager',
  },
];

const onMeanings: MeaningData[] = [
  {
    definition: 'To encourage someone by shouting words of support, usually when they are competing or doing something difficult.',
    example: 'The whole department went to the meeting to cheer her on during her final presentation.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Department cheering on a presenter',
  },
];

const upMeanings: MeaningData[] = [
  {
    definition: 'To start feeling happier; to stop being sad.',
    example: 'You need to cheer up! The project delay is not a total disaster.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person cheering up after a project delay',
  },
  {
    definition: 'To make another person feel happier.',
    example: 'We bought some coffee and cake to cheer the team up after a stressful week.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Team being cheered up with coffee and cake',
  },
];

export const sections: SectionData[] = [
  { particle: 'against', storageKey: 'cheerAgainst_section_expanded', storageKeyPrefix: 'cheerAgainst', meanings: againstMeanings },
  { particle: 'for',     storageKey: 'cheerFor_section_expanded',     storageKeyPrefix: 'cheerFor',     meanings: forMeanings },
  { particle: 'off',     storageKey: 'cheerOff_section_expanded',     storageKeyPrefix: 'cheerOff',     meanings: offMeanings },
  { particle: 'on',      storageKey: 'cheerOn_section_expanded',      storageKeyPrefix: 'cheerOn',      meanings: onMeanings },
  { particle: 'up',      storageKey: 'cheerUp_section_expanded',      storageKeyPrefix: 'cheerUp',      meanings: upMeanings },
];

export default function CheerVerbPage() {
  return <VerbPageLayout title="Cheer" sections={sections} />;
}
