import VerbPageLayout, { MeaningData, SectionData } from '../../components/VerbPage';

const base = import.meta.env.BASE_URL;

const onMeanings: MeaningData[] = [
  {
    definition: 'To take action because of information, advice, or instructions.',
    example: 'The manager decided to act on the feedback she received from the team.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A manager acting on team feedback',
  },
  {
    definition: 'To have an effect on something (often used in medicine or science).',
    example: 'This type of medication acts on the nervous system to reduce pain.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Medication affecting the nervous system',
  },
];

const upMeanings: MeaningData[] = [
  {
    definition: 'To misbehave or cause trouble (usually referring to children).',
    example: 'The children were bored, so they started acting up in the classroom.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Children misbehaving in a classroom',
  },
  {
    definition: 'To malfunction, stop working properly, or cause physical pain (referring to machines or body parts).',
    example: 'My old laptop is acting up again; the screen keeps freezing.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A laptop with a frozen screen',
  },
];

const outMeanings: MeaningData[] = [
  {
    definition: 'To perform a story, scene, or situation using actions and words.',
    example: "During the workshop, the developers acted out the user's journey to understand the software requirements better.",
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Developers acting out a user journey in a workshop',
  },
  {
    definition: 'To express negative emotions or stress through disruptive or bad behavior, often because the person cannot talk about their feelings.',
    example: "The teenager was acting out at school because of his parents' divorce.",
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A teenager acting out due to emotional distress',
  },
];

const forMeanings: MeaningData[] = [
  {
    definition: 'To represent someone else or do something on their behalf (especially in legal or business situations).',
    example: 'The lawyer was hired to act for the CEO during the contract negotiations.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A lawyer representing a CEO in negotiations',
  },
];

const againstMeanings: MeaningData[] = [
  {
    definition: 'To do something that opposes, harms, or violates a person, rule, or interest.',
    example: "By sharing confidential data, the employee acted against the company's core policies.",
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'An employee acting against company policies',
  },
];

export const sections: SectionData[] = [
  {
    particle: 'on / upon',
    storageKey: 'actOn_section_expanded',
    storageKeyPrefix: 'actOn',
    meanings: onMeanings,
  },
  {
    particle: 'up',
    storageKey: 'actUp_section_expanded',
    storageKeyPrefix: 'actUp',
    meanings: upMeanings,
  },
  {
    particle: 'out',
    storageKey: 'actOut_section_expanded',
    storageKeyPrefix: 'actOut',
    meanings: outMeanings,
  },
  {
    particle: 'for',
    storageKey: 'actFor_section_expanded',
    storageKeyPrefix: 'actFor',
    meanings: forMeanings,
  },
  {
    particle: 'against',
    storageKey: 'actAgainst_section_expanded',
    storageKeyPrefix: 'actAgainst',
    meanings: againstMeanings,
  },
];

export default function ActVerbPage() {
  return <VerbPageLayout title="Act" sections={sections} />;
}
