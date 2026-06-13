import VerbPageLayout, { MeaningData, SectionData } from '../../components/VerbPage';

const base = import.meta.env.BASE_URL;

const aboutAroundRoundMeanings: MeaningData[] = [
  {
    definition: 'To search anxiously or desperately for something, usually an idea, a solution, or an excuse',
    example: 'After the system crashed, the developers cast about for a quick fix to get the servers running again.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Developers searching for a quick fix after a system crash',
  },
];

const awayMeanings: MeaningData[] = [
  {
    definition: 'To throw something away because it is no longer wanted or needed',
    example: 'Do not cast away your old Java components; you might be able to reuse them in future microservices.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A developer discarding old Java components',
  },
  {
    definition: 'To be left stranded somewhere after a shipwreck (usually passive)',
    example: 'The sailors were cast away on a remote island for three months.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Sailors stranded on a remote island after a shipwreck',
  },
];

const backMeanings: MeaningData[] = [
  {
    definition: "To think about things that happened in the past (almost always used as 'cast your mind back')",
    example: 'If we cast our minds back to the last Agile sprint, we can identify exactly why the feature was delayed.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A team reflecting on a previous Agile sprint',
  },
];

const downMeanings: MeaningData[] = [
  {
    definition: 'To make someone feel sad, depressed, or discouraged (almost always passive or used as an adjective)',
    example: 'The engineering team was very cast down when the CEO canceled their project.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A discouraged engineering team after their project was canceled',
  },
];

const forwardMeanings: MeaningData[] = [
  {
    definition: "To direct your thoughts toward the future and imagine what will happen (often 'cast your mind forward')",
    example: "Let's cast our minds forward to next year and plan our marketing strategy for the new product launch.",
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A team planning their marketing strategy for the next year',
  },
];

const offMeanings: MeaningData[] = [
  {
    definition: 'To get rid of something or someone that you no longer want, need, or want to be restricted by',
    example: 'The company managed to cast off its old-fashioned image by launching an innovative software platform.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A company reinventing its image with an innovative software platform',
  },
  {
    definition: 'To untie a boat from its dock or mooring so it can sail away',
    example: 'The captain ordered the crew to cast off at sunrise.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A crew untying a boat from the dock at sunrise',
  },
  {
    definition: '(In knitting) To remove the final stitches from the needle to finish a piece of work',
    example: 'Once the scarf is the right length, you can cast off.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A person casting off the final stitches of a knitted scarf',
  },
];

const onMeanings: MeaningData[] = [
  {
    definition: '(In knitting) To create the very first row of stitches on a needle to start a project',
    example: 'She cast on fifty stitches to begin making the sweater.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A person casting on stitches to start a knitted sweater',
  },
];

const outMeanings: MeaningData[] = [
  {
    definition: 'To forcefully expel someone or something; to make someone leave a group, organization, or place',
    example: 'The corrupt board member was cast out of the company after the financial audit.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A corrupt board member being expelled after a financial audit',
  },
];

const upMeanings: MeaningData[] = [
  {
    definition: 'To calculate or add up a column of figures (formal, mainly British English)',
    example: 'The financial manager cast up the final expenses for the software development cycle.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A financial manager adding up expenses for a software project',
  },
  {
    definition: '(Of the sea) To wash something onto the shore',
    example: 'The storm cast up pieces of broken wood onto the beach.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Storm waves washing broken wood onto a beach',
  },
];

export const sections: SectionData[] = [
  { particle: 'about / around / round', storageKey: 'castAboutAroundRound_section_expanded', storageKeyPrefix: 'castAboutAroundRound', meanings: aboutAroundRoundMeanings },
  { particle: 'away', storageKey: 'castAway_section_expanded', storageKeyPrefix: 'castAway', meanings: awayMeanings },
  { particle: 'back', storageKey: 'castBack_section_expanded', storageKeyPrefix: 'castBack', meanings: backMeanings },
  { particle: 'down', storageKey: 'castDown_section_expanded', storageKeyPrefix: 'castDown', meanings: downMeanings },
  { particle: 'forward', storageKey: 'castForward_section_expanded', storageKeyPrefix: 'castForward', meanings: forwardMeanings },
  { particle: 'off', storageKey: 'castOff_section_expanded', storageKeyPrefix: 'castOff', meanings: offMeanings },
  { particle: 'on', storageKey: 'castOn_section_expanded', storageKeyPrefix: 'castOn', meanings: onMeanings },
  { particle: 'out', storageKey: 'castOut_section_expanded', storageKeyPrefix: 'castOut', meanings: outMeanings },
  { particle: 'up', storageKey: 'castUp_section_expanded', storageKeyPrefix: 'castUp', meanings: upMeanings },
];

export default function CastVerbPage() {
  return <VerbPageLayout title="Cast" sections={sections} />;
}
