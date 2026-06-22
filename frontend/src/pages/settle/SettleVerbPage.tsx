import VerbPageLayout, { MeaningData, SectionData } from '../../components/VerbPage';

const base = import.meta.env.BASE_URL;

const backMeanings: MeaningData[] = [
  {
    definition: 'To relax into a comfortable physical position, usually leaning backward.',
    example: 'After a very successful product launch, the CEO settled back in his chair with a smile.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'CEO settling back in his chair with a smile after a successful product launch',
  },
];

const downMeanings: MeaningData[] = [
  {
    definition: 'To become quiet and relaxed after being excited, nervous, or angry.',
    example: 'The manager waited for the noisy room to settle down before starting her presentation.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Manager waiting for the noisy room to settle down before starting her presentation',
  },
  {
    definition: 'To start living a quiet, stable life, often by staying in one place, buying a house, or starting a family.',
    example: 'After years of moving between different tech startups, he decided to settle down in Warsaw and take a stable corporate job.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person deciding to settle down in Warsaw and take a stable corporate job after moving between tech startups',
  },
  {
    definition: 'To start paying serious attention to a task ("settle down to").',
    example: 'We need to settle down to work if we want to finish this software update today.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Team settling down to work to finish a software update',
  },
];

const forMeanings: MeaningData[] = [
  {
    definition: 'To accept something that is available, even though it is not exactly what you wanted or hoped for.',
    example: 'We wanted to hire a senior Java developer, but because of the budget, we had to settle for a mid-level programmer.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Team settling for a mid-level programmer because of budget constraints',
  },
];

const inMeanings: MeaningData[] = [
  {
    definition: 'To become comfortable, relaxed, and familiar in a new home, environment, or job.',
    example: 'It takes about a month for a new employee to fully settle in and learn the company culture.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'New employee settling in and learning the company culture',
  },
];

const intoMeanings: MeaningData[] = [
  {
    definition: 'To get used to a new role, routine, or situation and become comfortable with it.',
    example: 'She quickly settled into her new position as the lead project manager.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person quickly settling into her new position as lead project manager',
  },
];

const onMeanings: MeaningData[] = [
  {
    definition: 'To make a final decision or choice after thinking about multiple options.',
    example: 'After reviewing several different programming languages, the development team settled on Java for the new project.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Development team settling on Java for the new project after reviewing programming languages',
  },
  {
    definition: 'To land or rest on a physical surface.',
    example: 'The dust finally settled on the old office desks.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Dust settling on old office desks',
  },
];

const outMeanings: MeaningData[] = [
  {
    definition: 'To reach an agreement without going through a full court trial (often phrased as "settle out of court").',
    example: 'The two companies decided to settle out of court to avoid a long and expensive legal battle.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Two companies deciding to settle out of court to avoid a legal battle',
  },
  {
    definition: 'To sink to the bottom of a liquid.',
    example: 'If you leave the coffee pot alone, the grounds will settle out at the bottom.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Coffee grounds settling out at the bottom of the coffee pot',
  },
];

const overMeanings: MeaningData[] = [
  {
    definition: 'To descend and cover something (often used to describe weather, a feeling, or a mood in a room).',
    example: 'A deep silence settled over the boardroom when the team saw the terrible financial results.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Deep silence settling over the boardroom when the team saw the terrible financial results',
  },
];

const toMeanings: MeaningData[] = [
  {
    definition: 'To begin giving your full attention and effort to a task (very similar to "settle down to").',
    example: 'Once everyone had their coffee, the team settled to the task of fixing the software bugs.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Team settling to the task of fixing software bugs after getting coffee',
  },
];

const upMeanings: MeaningData[] = [
  {
    definition: 'To pay money that you owe, usually to balance an account or share a bill.',
    example: 'I will pay for the client\'s lunch now, and we can settle up when we get back to the office.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person paying for client lunch and arranging to settle up later at the office',
  },
];

const withMeanings: MeaningData[] = [
  {
    definition: 'To reach a financial agreement or pay a debt to a person or organization.',
    example: 'The company finally settled with its suppliers after a long dispute over the late invoices.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Company settling with its suppliers after a long dispute over late invoices',
  },
  {
    definition: 'To punish someone who has done something bad to you in the past.',
    example: 'I have an old argument to settle with a former competitor.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person having an old argument to settle with a former competitor',
  },
];

export const sections: SectionData[] = [
  { particle: 'back', storageKey: 'settleBack_section_expanded', storageKeyPrefix: 'settleBack', meanings: backMeanings },
  { particle: 'down', storageKey: 'settleDown_section_expanded', storageKeyPrefix: 'settleDown', meanings: downMeanings },
  { particle: 'for',  storageKey: 'settleFor_section_expanded',  storageKeyPrefix: 'settleFor',  meanings: forMeanings },
  { particle: 'in',   storageKey: 'settleIn_section_expanded',   storageKeyPrefix: 'settleIn',   meanings: inMeanings },
  { particle: 'into', storageKey: 'settleInto_section_expanded', storageKeyPrefix: 'settleInto', meanings: intoMeanings },
  { particle: 'on',   storageKey: 'settleOn_section_expanded',   storageKeyPrefix: 'settleOn',   meanings: onMeanings },
  { particle: 'out',  storageKey: 'settleOut_section_expanded',  storageKeyPrefix: 'settleOut',  meanings: outMeanings },
  { particle: 'over', storageKey: 'settleOver_section_expanded', storageKeyPrefix: 'settleOver', meanings: overMeanings },
  { particle: 'to',   storageKey: 'settleTo_section_expanded',   storageKeyPrefix: 'settleTo',   meanings: toMeanings },
  { particle: 'up',   storageKey: 'settleUp_section_expanded',   storageKeyPrefix: 'settleUp',   meanings: upMeanings },
  { particle: 'with', storageKey: 'settleWith_section_expanded', storageKeyPrefix: 'settleWith', meanings: withMeanings },
];

export default function SettleVerbPage() {
  return <VerbPageLayout title="Settle" sections={sections} />;
}
