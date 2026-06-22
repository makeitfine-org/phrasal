import VerbPageLayout, { MeaningData, SectionData } from '../../components/VerbPage';

const base = import.meta.env.BASE_URL;

const inMeanings: MeaningData[] = [
  {
    definition: 'To discover someone in the middle of doing something (usually bad).',
    example: 'The audit team caught the vendor in a lie about their data protection protocols.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Audit team catching vendor in a lie',
  },
  {
    definition: 'To be trapped or delayed by an unavoidable situation (used as caught in).',
    example: 'I missed the daily Scrum meeting because I got caught in heavy traffic.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person caught in heavy traffic',
  },
];

const onMeanings: MeaningData[] = [
  {
    definition: 'To understand something (often after a delay or difficulty).',
    example: 'The syntax of the new Java library was confusing at first, but the junior developers eventually caught on.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Junior developers understanding a new Java library',
  },
  {
    definition: 'To become popular or widely accepted.',
    example: 'Microservices architecture quickly caught on as the standard for enterprise software development.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Microservices architecture becoming popular',
  },
];

const outMeanings: MeaningData[] = [
  {
    definition: 'To discover that someone has made a mistake, lied, or done something wrong.',
    example: 'The automated testing pipeline caught the developer out by exposing a critical security flaw in the code.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Testing pipeline exposing a security flaw',
  },
  {
    definition: 'To put someone in a difficult, unexpected, or unprepared situation.',
    example: 'The sudden crash of our cloud servers caught the management team out during the product launch.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Cloud server crash catching management unprepared',
  },
];

const upMeanings: MeaningData[] = [
  {
    definition: 'To reach the same level, standard, or position as someone or something else.',
    example: 'Our software is lacking some features, so we need to release a major update to catch up with our main competitor.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Software team catching up with competitor',
  },
  {
    definition: 'To do work or tasks that you did not have time to do earlier (often followed by "on").',
    example: 'I need to block out two hours this afternoon to catch up on my code reviews and emails.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Developer catching up on code reviews',
  },
  {
    definition: 'To talk to someone to find out the latest news about their life or work.',
    example: "Let's schedule a brief meeting on Friday to catch up on the project's progress.",
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Team meeting to catch up on project progress',
  },
  {
    definition: 'To involve someone in a situation, often against their will (used in the passive: be/get caught up in).',
    example: 'The lead engineer got caught up in administrative tasks and had no time to write code.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Engineer caught up in administrative tasks',
  },
];

export const sections: SectionData[] = [
  { particle: 'in',  storageKey: 'catchIn_section_expanded',  storageKeyPrefix: 'catchIn',  meanings: inMeanings },
  { particle: 'on',  storageKey: 'catchOn_section_expanded',  storageKeyPrefix: 'catchOn',  meanings: onMeanings },
  { particle: 'out', storageKey: 'catchOut_section_expanded', storageKeyPrefix: 'catchOut', meanings: outMeanings },
  { particle: 'up',  storageKey: 'catchUp_section_expanded',  storageKeyPrefix: 'catchUp',  meanings: upMeanings },
];

export default function CatchVerbPage() {
  return <VerbPageLayout title="Catch" sections={sections} />;
}
