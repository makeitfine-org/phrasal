import VerbPageLayout, { MeaningData, SectionData } from '../../components/VerbPage';

const base = import.meta.env.BASE_URL;

const outMeanings: MeaningData[] = [
  {
    definition: 'To discover information, learn a fact, or solve a problem.',
    example: 'We need to review the server logs to find out why the Java application is crashing.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Reviewing server logs to find out why the Java application is crashing',
  },
  {
    definition: 'To discover that someone has lied, kept a secret, or done something wrong (separable: find someone out).',
    example: 'He lied on his resume, but the HR department eventually found him out.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'HR department finding out that employee lied on resume',
  },
];

const forMeanings: MeaningData[] = [
  {
    definition: 'To make an official decision in favor of someone (formal, used in legal or official settings).',
    example: 'After reviewing the contract, the judge found for the software developer and ordered the client to pay the invoice.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Judge finding for the software developer and ordering client to pay the invoice',
  },
];

const againstMeanings: MeaningData[] = [
  {
    definition: 'To make an official decision that someone is guilty or loses a dispute (formal, used in legal or official settings).',
    example: 'The court found against the leadership team because they did not follow labor laws.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Court finding against the leadership team for not following labor laws',
  },
];

export const sections: SectionData[] = [
  { particle: 'out',     storageKey: 'findOut_section_expanded',     storageKeyPrefix: 'findOut',     meanings: outMeanings },
  { particle: 'for',     storageKey: 'findFor_section_expanded',     storageKeyPrefix: 'findFor',     meanings: forMeanings },
  { particle: 'against', storageKey: 'findAgainst_section_expanded', storageKeyPrefix: 'findAgainst', meanings: againstMeanings },
];

export default function FindVerbPage() {
  return <VerbPageLayout title="Find" sections={sections} />;
}
