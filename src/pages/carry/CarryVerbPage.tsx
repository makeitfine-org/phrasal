import VerbPageLayout, { MeaningData, SectionData } from '../../components/VerbPage';

const base = import.meta.env.BASE_URL;

const aboutMeanings: MeaningData[] = [
  {
    definition: 'To keep something with you everywhere you go (physical).',
    example: 'The lead developer carries around a notebook to write down new software ideas.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Developer carrying a notebook everywhere',
  },
  {
    definition: 'To hold onto a feeling or emotion (usually negative) for a long time.',
    example: 'She carried around a lot of stress after the project failed.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person carrying stress after project failure',
  },
];

const awayMeanings: MeaningData[] = [
  {
    definition: 'To become too excited and lose control of your behavior (almost always used in the passive voice: "get/be carried away").',
    example: "The marketing team got carried away with the new features and promised the client things we couldn't build.",
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Marketing team getting carried away with promises',
  },
];

const backMeanings: MeaningData[] = [
  {
    definition: 'To bring a past memory to mind; to make someone remember a specific time.',
    example: 'Hearing that old startup story carried the CEO back to his first year in business.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'CEO remembering early startup days',
  },
];

const forwardMeanings: MeaningData[] = [
  {
    definition: 'To make a project or idea progress to the next stage.',
    example: 'We need a strong manager to carry this initiative forward.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Manager carrying initiative forward',
  },
  {
    definition: '(Business / Accounting) To transfer a financial total or a specific benefit to a new page, period, or year.',
    example: 'Any unused vacation days from this year will be carried forward to next year.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Accountant transferring vacation days to next year',
  },
];

const offMeanings: MeaningData[] = [
  {
    definition: 'To succeed in doing something difficult, often when others did not expect you to.',
    example: 'It was a highly risky strategy, but the leadership team carried it off perfectly.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Leadership team succeeding with a risky strategy',
  },
  {
    definition: 'To win a prize, competition, or award.',
    example: 'Our company carried off three major industry awards this year.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Company winning industry awards',
  },
  {
    definition: 'To cause death, usually due to a disease (formal and older use).',
    example: 'The virus carried off thousands of people in the 19th century.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Historical illustration of disease spreading',
  },
];

const onMeanings: MeaningData[] = [
  {
    definition: 'To continue doing something.',
    example: 'Please carry on with your coding; I will check your progress after lunch.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Developer continuing to code',
  },
  {
    definition: 'To manage, run, or take part in a business or activity.',
    example: 'They carry on a successful IT consulting business in Warsaw.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'IT consulting business running in Warsaw',
  },
  {
    definition: 'To behave in an uncontrolled, angry, or childish way.',
    example: 'The customer carried on for ten minutes about the delayed software release.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Customer complaining about software delay',
  },
  {
    definition: 'To have a secret, often romantic or sexual, relationship.',
    example: 'It was rumored that the two directors were carrying on.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Two people having a secret relationship',
  },
];

const outMeanings: MeaningData[] = [
  {
    definition: 'To perform, execute, or complete a task, instruction, experiment, or plan.',
    example: 'The IT department carried out the system update over the weekend without any issues.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'IT department performing a system update',
  },
  {
    definition: 'To fulfill a promise or a threat.',
    example: 'The management carried out their promise to increase employee training budgets.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Management fulfilling training budget promise',
  },
];

const overMeanings: MeaningData[] = [
  {
    definition: 'To continue to exist in a different situation, environment, or time.',
    example: 'His excellent management skills carried over perfectly into his new role as a director.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Manager transferring skills to new director role',
  },
  {
    definition: 'To delay or postpone something to a later time.',
    example: "We ran out of time, so the final agenda item was carried over to next week's meeting.",
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Agenda item postponed to next meeting',
  },
];

const throughMeanings: MeaningData[] = [
  {
    definition: 'To complete a task successfully despite facing significant difficulties.',
    example: "The team's dedication carried the software release through to a successful launch.",
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Team completing software release despite difficulties',
  },
  {
    definition: 'To help someone or something survive a difficult situation.',
    example: 'The emergency investment carried the business through the financial crisis.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Business surviving financial crisis with investment',
  },
];

export const sections: SectionData[] = [
  { particle: 'about / around / round', storageKey: 'carryAbout_section_expanded',   storageKeyPrefix: 'carryAbout',   meanings: aboutMeanings },
  { particle: 'away',                   storageKey: 'carryAway_section_expanded',    storageKeyPrefix: 'carryAway',    meanings: awayMeanings },
  { particle: 'back',                   storageKey: 'carryBack_section_expanded',    storageKeyPrefix: 'carryBack',    meanings: backMeanings },
  { particle: 'forward',                storageKey: 'carryForward_section_expanded', storageKeyPrefix: 'carryForward', meanings: forwardMeanings },
  { particle: 'off',                    storageKey: 'carryOff_section_expanded',     storageKeyPrefix: 'carryOff',     meanings: offMeanings },
  { particle: 'on',                     storageKey: 'carryOn_section_expanded',      storageKeyPrefix: 'carryOn',      meanings: onMeanings },
  { particle: 'out',                    storageKey: 'carryOut_section_expanded',     storageKeyPrefix: 'carryOut',     meanings: outMeanings },
  { particle: 'over',                   storageKey: 'carryOver_section_expanded',    storageKeyPrefix: 'carryOver',    meanings: overMeanings },
  { particle: 'through',                storageKey: 'carryThrough_section_expanded', storageKeyPrefix: 'carryThrough', meanings: throughMeanings },
];

export default function CarryVerbPage() {
  return <VerbPageLayout title="Carry" sections={sections} />;
}
