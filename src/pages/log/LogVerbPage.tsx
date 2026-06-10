import VerbPageLayout, { MeaningData, SectionData } from '../../components/VerbPage';

const base = import.meta.env.BASE_URL;

const inIntoMeanings: MeaningData[] = [
  {
    definition: 'To provide credentials (like a username and password) to access a computer system, application, or network.',
    example: 'You must log into the Java application using your administrator credentials.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person logging into a Java application using administrator credentials',
  },
  {
    definition: 'To officially record that someone has arrived at a place, such as an office or hotel.',
    example: 'All new contractors need to log in at the reception desk before entering the building.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'New contractors logging in at the reception desk before entering the building',
  },
];

const outMeanings: MeaningData[] = [
  {
    definition: 'To safely close your session and disconnect from a system, application, or website.',
    example: 'Always remember to log out of the database when you finish your shift.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person logging out of a database at the end of their shift',
  },
];

const onMeanings: MeaningData[] = [
  {
    definition: 'To connect to a computer network or start using a digital system (same meaning as log in).',
    example: 'The project manager logged on to the company network to review the latest software release.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Project manager logging on to company network to review the latest software release',
  },
];

const offMeanings: MeaningData[] = [
  {
    definition: 'To disconnect from a computer network or system (same meaning as log out).',
    example: 'Make sure you log off your workstation before leaving the office.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Employee logging off their workstation before leaving the office',
  },
];

const upMeanings: MeaningData[] = [
  {
    definition: 'To achieve, record, or complete a specific amount of time, distance, or number of items (more common in British English).',
    example: 'The development team has logged up over 200 hours of overtime to meet the project deadline.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Development team logging up over 200 hours of overtime to meet the project deadline',
  },
];

export const sections: SectionData[] = [
  { particle: 'in / into', storageKey: 'logIn_section_expanded',  storageKeyPrefix: 'logIn',  meanings: inIntoMeanings },
  { particle: 'out',       storageKey: 'logOut_section_expanded', storageKeyPrefix: 'logOut', meanings: outMeanings },
  { particle: 'on',        storageKey: 'logOn_section_expanded',  storageKeyPrefix: 'logOn',  meanings: onMeanings },
  { particle: 'off',       storageKey: 'logOff_section_expanded', storageKeyPrefix: 'logOff', meanings: offMeanings },
  { particle: 'up',        storageKey: 'logUp_section_expanded',  storageKeyPrefix: 'logUp',  meanings: upMeanings },
];

export default function LogVerbPage() {
  return <VerbPageLayout title="Log" sections={sections} />;
}
