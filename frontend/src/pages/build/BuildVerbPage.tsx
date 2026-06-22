import VerbPageLayout, { MeaningData, SectionData } from '../../components/VerbPage';

const base = import.meta.env.BASE_URL;

const aroundMeanings: MeaningData[] = [
  {
    definition: 'To base a strategy, system, plan, or team on a central person, idea, or concept.',
    example: 'The CEO decided to build the new marketing strategy around customer retention.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'CEO building a marketing strategy around customer retention',
  },
];

const inIntoMeanings: MeaningData[] = [
  {
    definition: 'To include something as a permanent, essential, or integral part of a system, plan, or structure from the beginning.',
    example: 'When planning the project schedule, we need to build in some extra time for unexpected delays.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Building extra time into a project schedule',
  },
];

const onMeanings: MeaningData[] = [
  {
    definition: 'To use a past achievement, existing idea, or success as a foundation for further progress and development.',
    example: 'We can build on the momentum of last quarter\'s sales to reach our new targets.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Building on last quarter\'s sales momentum',
  },
];

const outMeanings: MeaningData[] = [
  {
    definition: 'To develop, expand, or complete a system, space, or business so that it reaches its full potential or size.',
    example: 'The startup received funding to build out its sales and marketing departments.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Startup expanding its sales and marketing departments',
  },
];

const upMeanings: MeaningData[] = [
  {
    definition: 'To gradually increase in amount, size, strength, or intensity.',
    example: 'If we don\'t refactor the code regularly, technical debt will build up quickly.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Technical debt building up without regular refactoring',
  },
  {
    definition: 'To talk about someone or something in a very positive way to create a good impression (often before introducing them).',
    example: 'The director really built up the new project manager before she walked into the meeting.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Director building up a new project manager before a meeting',
  },
  {
    definition: 'To develop an area with many buildings and infrastructure.',
    example: 'The area around the new technology park has become highly built up over the last five years.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Area around a technology park becoming built up',
  },
];

const toMeanings: MeaningData[] = [
  {
    definition: 'To gradually increase and approach a climax, peak, or major event.',
    example: 'The tension in the boardroom was building to a breaking point before the final decision was made.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Tension building in a boardroom toward a decision',
  },
];

export const sections: SectionData[] = [
  { particle: 'around / round', storageKey: 'buildAround_section_expanded', storageKeyPrefix: 'buildAround', meanings: aroundMeanings },
  { particle: 'in / into',      storageKey: 'buildIn_section_expanded',     storageKeyPrefix: 'buildIn',     meanings: inIntoMeanings },
  { particle: 'on',             storageKey: 'buildOn_section_expanded',     storageKeyPrefix: 'buildOn',     meanings: onMeanings },
  { particle: 'out',            storageKey: 'buildOut_section_expanded',    storageKeyPrefix: 'buildOut',    meanings: outMeanings },
  { particle: 'up',             storageKey: 'buildUp_section_expanded',     storageKeyPrefix: 'buildUp',     meanings: upMeanings },
  { particle: 'to',             storageKey: 'buildTo_section_expanded',     storageKeyPrefix: 'buildTo',     meanings: toMeanings },
];

export default function BuildVerbPage() {
  return <VerbPageLayout title="Build" sections={sections} />;
}
