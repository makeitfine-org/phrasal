import VerbPageLayout, { MeaningData, SectionData } from '../../components/VerbPage';

const base = import.meta.env.BASE_URL;

const aboutMeanings: MeaningData[] = [
  {
    definition: 'To spend time in a place doing nothing or waiting.',
    example: 'We were just standing around waiting for the meeting to start.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'People standing around waiting for the meeting to start',
  },
];

const againstMeanings: MeaningData[] = [
  {
    definition: 'To oppose or fight against someone or something.',
    example: "The team leader stood against the new policy because it was bad for productivity.",
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Team leader standing against a new policy that was bad for productivity',
  },
];

const apartMeanings: MeaningData[] = [
  {
    definition: 'To be separate or isolated from others.',
    example: 'The two servers stand apart in the data center for security reasons.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Two servers standing apart in a data center for security reasons',
  },
  {
    definition: 'To be noticeably different or better than others.',
    example: 'Her excellent management skills make her stand apart from the other candidates.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person standing apart from other candidates due to excellent management skills',
  },
];

const awayMeanings: MeaningData[] = [
  {
    definition: 'To move backwards or keep a distance from something (mostly literal).',
    example: 'Please stand away from the servers while they are restarting.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person standing away from servers while they are restarting',
  },
];

const backMeanings: MeaningData[] = [
  {
    definition: 'To move a short distance away or backwards.',
    example: 'The firefighters told everyone to stand back.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Firefighters telling everyone to stand back',
  },
  {
    definition: 'To view a situation objectively, from a wider perspective.',
    example: 'Sometimes a manager needs to stand back and look at the whole project before making a decision.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Manager standing back to look at the whole project before making a decision',
  },
];

const behindMeanings: MeaningData[] = [
  {
    definition: 'To support someone or guarantee the quality of something.',
    example: 'We stand behind the quality of our Java software products.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Team standing behind the quality of their Java software products',
  },
];

const byMeanings: MeaningData[] = [
  {
    definition: 'To be ready for action.',
    example: 'The IT support team is standing by to fix the network issue.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'IT support team standing by to fix a network issue',
  },
  {
    definition: 'To remain loyal to someone in a difficult situation.',
    example: 'A good leader stands by their team during a crisis.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A good leader standing by their team during a crisis',
  },
  {
    definition: 'To adhere to a promise, decision, or belief.',
    example: 'I stand by my decision to hire him for the development team.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person standing by their decision to hire someone for the development team',
  },
  {
    definition: 'To watch something bad happen without trying to help.',
    example: 'I cannot simply stand by while the project fails.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person refusing to stand by while the project fails',
  },
];

const downMeanings: MeaningData[] = [
  {
    definition: 'To resign or leave a position of leadership.',
    example: 'The CEO agreed to stand down after ten years in charge.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'CEO standing down after ten years in charge',
  },
  {
    definition: 'To relax from a state of military or security readiness.',
    example: 'The security team was told to stand down after the false alarm.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Security team standing down after a false alarm',
  },
];

const forMeanings: MeaningData[] = [
  {
    definition: 'To represent a word or idea (for abbreviations).',
    example: 'In software development, API stands for Application Programming Interface.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'API standing for Application Programming Interface in software development',
  },
  {
    definition: 'To tolerate or accept (usually used in the negative).',
    example: 'The boss will not stand for poor communication.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Boss not standing for poor communication',
  },
  {
    definition: 'To support a cause or principle.',
    example: 'Our company stands for equality and respect.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Company standing for equality and respect',
  },
];

const inMeanings: MeaningData[] = [
  {
    definition: 'To temporarily replace or substitute for someone who is absent (often "stand in for").',
    example: 'I will stand in for the manager while she is on a business trip.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person standing in for the manager while she is on a business trip',
  },
];

const intoMeanings: MeaningData[] = [
  {
    definition: 'To sail or move toward danger (rare, old nautical term).',
    example: 'The ship was standing into the storm.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Ship standing into a storm',
  },
];

const offMeanings: MeaningData[] = [
  {
    definition: 'To keep at a distance, or to keep someone away.',
    example: 'The police managed to stand off the angry crowd.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Police managing to stand off an angry crowd',
  },
];

const onMeanings: MeaningData[] = [
  {
    definition: 'To insist on strict rules or formalities.',
    example: "We don't need to stand on ceremony; just call me by my first name.",
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person saying we do not need to stand on ceremony',
  },
  {
    definition: 'To rely on or be based on.',
    example: 'My argument stands on solid financial data.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Argument standing on solid financial data',
  },
];

const outMeanings: MeaningData[] = [
  {
    definition: 'To be very easy to see or notice.',
    example: 'The red button stands out against the dark background of the app.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Red button standing out against the dark background of the app',
  },
  {
    definition: 'To be much better than others.',
    example: 'As a Java developer, his coding skills really stand out.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Java developer whose coding skills really stand out',
  },
  {
    definition: 'To stubbornly resist or hold out for a better offer.',
    example: 'The union is standing out for a higher salary.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Union standing out for a higher salary',
  },
];

const overMeanings: MeaningData[] = [
  {
    definition: 'To watch someone closely, often in an intimidating or annoying way.',
    example: "I can't write code well if the boss is standing over me.",
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Boss standing over a developer who cannot write code well',
  },
  {
    definition: 'To be postponed or delayed to a later time.',
    example: 'This agenda item can stand over until our next meeting.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Agenda item standing over until the next meeting',
  },
];

const toMeanings: MeaningData[] = [
  {
    definition: 'To take up defensive positions (military).',
    example: 'The soldiers were ordered to stand to.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Soldiers ordered to stand to at their defensive positions',
  },
  {
    definition: 'To be in a position where you are likely to gain or lose something.',
    example: 'The company stands to gain a lot of money from this new software contract.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Company standing to gain a lot of money from a new software contract',
  },
];

const togetherMeanings: MeaningData[] = [
  {
    definition: 'To remain united and support each other.',
    example: 'The team must stand together during this difficult transition period.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Team standing together during a difficult transition period',
  },
];

const upMeanings: MeaningData[] = [
  {
    definition: 'To rise to your feet.',
    example: 'Please stand up when the clients enter the room.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person standing up when clients enter the room',
  },
  {
    definition: 'To remain valid, true, or strong when tested.',
    example: 'This new software architecture will stand up to heavy user traffic.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'New software architecture standing up to heavy user traffic',
  },
  {
    definition: 'To fail to keep an appointment or date with someone.',
    example: 'The contractor stood me up for our 10:00 AM meeting.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Contractor standing someone up for a 10 AM meeting',
  },
];

const withMeanings: MeaningData[] = [
  {
    definition: 'To express solidarity or support for someone.',
    example: 'We stand with our colleagues in the overseas office during their difficult time.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Team standing with overseas colleagues during a difficult time',
  },
];

export const sections: SectionData[] = [
  { particle: 'about / around',  storageKey: 'standAbout_section_expanded',   storageKeyPrefix: 'standAbout',   meanings: aboutMeanings },
  { particle: 'against',         storageKey: 'standAgainst_section_expanded',  storageKeyPrefix: 'standAgainst', meanings: againstMeanings },
  { particle: 'apart',           storageKey: 'standApart_section_expanded',    storageKeyPrefix: 'standApart',   meanings: apartMeanings },
  { particle: 'away',            storageKey: 'standAway_section_expanded',     storageKeyPrefix: 'standAway',    meanings: awayMeanings },
  { particle: 'back',            storageKey: 'standBack_section_expanded',     storageKeyPrefix: 'standBack',    meanings: backMeanings },
  { particle: 'behind',          storageKey: 'standBehind_section_expanded',   storageKeyPrefix: 'standBehind',  meanings: behindMeanings },
  { particle: 'by',              storageKey: 'standBy_section_expanded',       storageKeyPrefix: 'standBy',      meanings: byMeanings },
  { particle: 'down',            storageKey: 'standDown_section_expanded',     storageKeyPrefix: 'standDown',    meanings: downMeanings },
  { particle: 'for',             storageKey: 'standFor_section_expanded',      storageKeyPrefix: 'standFor',     meanings: forMeanings },
  { particle: 'in',              storageKey: 'standIn_section_expanded',       storageKeyPrefix: 'standIn',      meanings: inMeanings },
  { particle: 'into',            storageKey: 'standInto_section_expanded',     storageKeyPrefix: 'standInto',    meanings: intoMeanings },
  { particle: 'off',             storageKey: 'standOff_section_expanded',      storageKeyPrefix: 'standOff',     meanings: offMeanings },
  { particle: 'on',              storageKey: 'standOn_section_expanded',       storageKeyPrefix: 'standOn',      meanings: onMeanings },
  { particle: 'out',             storageKey: 'standOut_section_expanded',      storageKeyPrefix: 'standOut',     meanings: outMeanings },
  { particle: 'over',            storageKey: 'standOver_section_expanded',     storageKeyPrefix: 'standOver',    meanings: overMeanings },
  { particle: 'to',              storageKey: 'standTo_section_expanded',       storageKeyPrefix: 'standTo',      meanings: toMeanings },
  { particle: 'together',        storageKey: 'standTogether_section_expanded', storageKeyPrefix: 'standTogether', meanings: togetherMeanings },
  { particle: 'up',              storageKey: 'standUp_section_expanded',       storageKeyPrefix: 'standUp',      meanings: upMeanings },
  { particle: 'with',            storageKey: 'standWith_section_expanded',     storageKeyPrefix: 'standWith',    meanings: withMeanings },
];

export default function StandVerbPage() {
  return <VerbPageLayout title="Stand" sections={sections} />;
}
