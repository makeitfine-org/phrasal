import VerbPageLayout, { MeaningData, SectionData } from '../../components/VerbPage';

const base = import.meta.env.BASE_URL;

const backMeanings: MeaningData[] = [
  {
    definition: 'To make another attempt to contact someone or return to a place at a later time because the first attempt was unsuccessful.',
    example: "The hiring manager is currently stuck in a meeting; I'll try back in an hour.",
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person trying to contact someone again after an unsuccessful first attempt',
  },
];

const forMeanings: MeaningData[] = [
  {
    definition: 'To make a concerted effort to achieve, win, or obtain something, often when success is not guaranteed.',
    example: 'After updating his professional profile, Sam decided to try for the Senior Recruitment Coordinator position.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person making a concerted effort to achieve a goal',
  },
];

const onMeanings: MeaningData[] = [
  {
    definition: 'To put on an item of clothing or accessories to see if it fits or looks good before buying or wearing it.',
    example: 'I need to try on this blazer to make sure it looks professional for the client meeting.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person trying on a blazer in a shop before buying it',
  },
  {
    definition: 'To attempt to deceive someone or test someone\'s boundaries to see what you can get away with (primarily British/Australian English, "try it on").',
    example: "The candidate knew the salary cap was strict, but he still tried it on during negotiations by asking for an extra 20%.",
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Candidate trying it on during salary negotiations by pushing beyond the cap',
  },
];

const outMeanings: MeaningData[] = [
  {
    definition: 'To test something (such as a new system, tool, or method) in a practical setting to evaluate its effectiveness or performance.',
    example: 'We decided to try out a new GitHub sourcing extension to see if it helps us find specialized DevOps talent faster.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Team trying out a new GitHub sourcing extension to evaluate its performance',
  },
  {
    definition: 'To test an idea, pitch, or product on someone to get their reaction (try out on).',
    example: 'Can I try out my new interview script on you before I call the first applicant?',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person trying out a new interview script on a colleague for feedback',
  },
];

const outForMeanings: MeaningData[] = [
  {
    definition: 'To undergo a competitive evaluation, audition, or test to earn a position on a team, in a play, or in a company.',
    example: 'Several junior developers are going to try out for the lead engineering vacancy by submitting technical assessments.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Junior developers trying out for a lead engineering position',
  },
];

const overMeanings: MeaningData[] = [
  {
    definition: 'To practice, rehearse, or run through something from beginning to end to check for flaws (slightly dated, most commonly used with music or speeches).',
    example: "Let's try over the presentation one more time before the stakeholders arrive.",
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Team trying over a presentation one more time before stakeholders arrive',
  },
];

export const sections: SectionData[] = [
  { particle: 'back',    storageKey: 'tryBack_section_expanded',   storageKeyPrefix: 'tryBack',   meanings: backMeanings },
  { particle: 'for',     storageKey: 'tryFor_section_expanded',    storageKeyPrefix: 'tryFor',    meanings: forMeanings },
  { particle: 'on',      storageKey: 'tryOn_section_expanded',     storageKeyPrefix: 'tryOn',     meanings: onMeanings },
  { particle: 'out',     storageKey: 'tryOut_section_expanded',    storageKeyPrefix: 'tryOut',    meanings: outMeanings },
  { particle: 'out for', storageKey: 'tryOutFor_section_expanded', storageKeyPrefix: 'tryOutFor', meanings: outForMeanings },
  { particle: 'over',    storageKey: 'tryOver_section_expanded',   storageKeyPrefix: 'tryOver',   meanings: overMeanings },
];

export default function TryVerbPage() {
  return <VerbPageLayout title="Try" sections={sections} />;
}
