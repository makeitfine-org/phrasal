import VerbPageLayout, { MeaningData, SectionData } from '../../components/VerbPage';

const base = import.meta.env.BASE_URL;

const aroundMeanings: MeaningData[] = [
  {
    definition: 'To act as a guide and give someone a tour of a new place.',
    example: 'Welcome to the new headquarters! Let me show you around the office.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person showing a new colleague around the office headquarters',
  },
];

const downMeanings: MeaningData[] = [
  {
    definition: 'In card games, to lay your cards face-up on the table to reveal your hand.',
    example: 'After the final bet, it was time to show down their cards.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Players showing down their cards at the end of a poker game',
  },
];

const forMeanings: MeaningData[] = [
  {
    definition: 'Used in the phrase "have something to show for [an effort]," meaning to have a result or evidence of your hard work.',
    example: 'I worked all weekend on the project, but because of a server crash, I have nothing to show for it.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Developer frustrated after a server crash left nothing to show for a weekend of work',
  },
];

const inMeanings: MeaningData[] = [
  {
    definition: 'To act as a guide and lead someone inside a room or building (show in).',
    example: 'When the candidates arrive, please show them in.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Receptionist showing candidates into the office',
  },
  {
    definition: 'To lead someone into a specific room (show into).',
    example: 'The receptionist showed the guests into the main conference room.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Receptionist showing guests into the main conference room',
  },
];

const offMeanings: MeaningData[] = [
  {
    definition: 'To behave in a way that is intended to attract attention or admiration (often seen as negative or boastful).',
    example: 'He only bought that expensive sports car to show off.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person showing off an expensive sports car to attract attention',
  },
  {
    definition: 'To proudly display something you have or have achieved.',
    example: 'She wanted to show off her new Java application to the management team.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Developer showing off a new Java application to the management team',
  },
  {
    definition: 'To make something look its best or highlight its good qualities.',
    example: 'That tailored suit really shows off his professional style.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person in a tailored suit that shows off their professional style',
  },
];

const outMeanings: MeaningData[] = [
  {
    definition: 'To lead or escort someone to the exit of a building or room.',
    example: 'Thank you for the interview. My assistant will show you out.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Assistant showing an interview candidate out of the office',
  },
];

const overMeanings: MeaningData[] = [
  {
    definition: 'To guide someone around a building to inspect it (primarily British English, similar to "show around").',
    example: 'The real estate agent showed us over the new office space.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Real estate agent showing clients over a new office space',
  },
];

const throughMeanings: MeaningData[] = [
  {
    definition: 'To be visible under or through a layer of something else (like cloth or paper).',
    example: 'You need to apply another coat of paint; the old dark color is showing through.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Old dark paint color showing through a new coat of paint on a wall',
  },
  {
    definition: 'To become obvious or visible, referring to an emotion or quality someone is trying to hide.',
    example: 'She tried to stay calm, but her frustration showed through when the software crashed again.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: "Developer's frustration showing through when the software crashed again",
  },
];

const toMeanings: MeaningData[] = [
  {
    definition: 'To escort or lead someone to a specific location or seat.',
    example: 'The host showed us to our table.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Restaurant host showing guests to their table',
  },
];

const upMeanings: MeaningData[] = [
  {
    definition: 'To arrive or appear at a place, especially when expected or late.',
    example: 'We waited for an hour, but the client never showed up for the meeting.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Team waiting for a client who never showed up for the meeting',
  },
  {
    definition: 'To be clearly visible.',
    example: 'The coffee stain won\'t show up on a dark carpet.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Coffee stain that does not show up on a dark carpet',
  },
  {
    definition: "To reveal someone's faults or make them feel embarrassed, usually by doing something better than them.",
    example: "The junior developer's clean, efficient code showed up the senior developer's messy work.",
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: "Junior developer's clean code showing up the senior developer's messy work",
  },
  {
    definition: 'To test positive for something (e.g., in a medical or drug test).',
    example: 'The virus did not show up in his blood test.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Medical professional reviewing blood test results where a virus did not show up',
  },
];

export const sections: SectionData[] = [
  { particle: 'around / round / about', storageKey: 'showAround_section_expanded', storageKeyPrefix: 'showAround', meanings: aroundMeanings },
  { particle: 'down',                   storageKey: 'showDown_section_expanded',   storageKeyPrefix: 'showDown',   meanings: downMeanings },
  { particle: 'for',                    storageKey: 'showFor_section_expanded',    storageKeyPrefix: 'showFor',    meanings: forMeanings },
  { particle: 'in / into',              storageKey: 'showIn_section_expanded',     storageKeyPrefix: 'showIn',     meanings: inMeanings },
  { particle: 'off',                    storageKey: 'showOff_section_expanded',    storageKeyPrefix: 'showOff',    meanings: offMeanings },
  { particle: 'out',                    storageKey: 'showOut_section_expanded',    storageKeyPrefix: 'showOut',    meanings: outMeanings },
  { particle: 'over',                   storageKey: 'showOver_section_expanded',   storageKeyPrefix: 'showOver',   meanings: overMeanings },
  { particle: 'through',                storageKey: 'showThrough_section_expanded',storageKeyPrefix: 'showThrough',meanings: throughMeanings },
  { particle: 'to',                     storageKey: 'showTo_section_expanded',     storageKeyPrefix: 'showTo',     meanings: toMeanings },
  { particle: 'up',                     storageKey: 'showUp_section_expanded',     storageKeyPrefix: 'showUp',     meanings: upMeanings },
];

export default function ShowVerbPage() {
  return <VerbPageLayout title="Show" sections={sections} />;
}
