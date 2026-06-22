import VerbPageLayout, { MeaningData, SectionData } from '../../components/VerbPage';

const base = import.meta.env.BASE_URL;

const aboutMeanings: MeaningData[] = [
  {
    definition: 'To put things in random places in an untidy way, making a mess.',
    example: "Please don't leave your dirty clothes around the house.",
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person leaving dirty clothes around the house',
  },
];

const backMeanings: MeaningData[] = [
  {
    definition: 'To make a student repeat a school year because their grades were too low (mainly used in US English).',
    example: 'He failed his math and science exams, so the school left him back a year.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Student being left back a year due to failing exams',
  },
];

const behindMeanings: MeaningData[] = [
  {
    definition: 'To forget to take someone or something with you when you depart.',
    example: 'I accidentally left my umbrella behind at the coffee shop.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person accidentally leaving an umbrella behind at a coffee shop',
  },
  {
    definition: 'To permanently move on from a situation, place, or person.',
    example: 'She moved to a new city to leave her difficult past behind.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person moving to a new city to leave a difficult past behind',
  },
  {
    definition: 'To progress much faster than competitors, making them look slow or outdated.',
    example: 'The software company left its competitors behind by releasing a revolutionary new app.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Software company leaving competitors behind with a revolutionary new app',
  },
];

const forMeanings: MeaningData[] = [
  {
    definition: 'To begin a journey with a specific destination in mind.',
    example: 'We need to pack our bags because we leave for London early tomorrow morning.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person packing bags to leave for London early in the morning',
  },
];

const inMeanings: MeaningData[] = [
  {
    definition: 'To not remove something; to let it stay where it is.',
    example: 'The editor decided to leave that paragraph in the final article.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Editor deciding to leave a paragraph in the final article',
  },
];

const offMeanings: MeaningData[] = [
  {
    definition: 'To stop doing something.',
    example: "Let's start the meeting exactly where we left off yesterday.",
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Team starting a meeting where they left off yesterday',
  },
  {
    definition: 'To purposefully or accidentally exclude someone or something from a list.',
    example: 'I think there is a mistake; my name was left off the guest list.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person noticing their name was left off the guest list',
  },
];

const onMeanings: MeaningData[] = [
  {
    definition: 'To let a machine, device, or light continue working.',
    example: "Don't leave the TV on when you go to sleep.",
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person being reminded not to leave the TV on when going to sleep',
  },
  {
    definition: 'To continue wearing a piece of clothing.',
    example: "It's cold in the office, so I will leave my jacket on.",
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person leaving their jacket on because the office is cold',
  },
];

const outMeanings: MeaningData[] = [
  {
    definition: 'To not include someone or something.',
    example: 'You can leave out the last exercise; it is optional.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Teacher telling students they can leave out the last exercise',
  },
  {
    definition: 'To make a person feel excluded from a group or activity.',
    example: 'She felt left out when her colleagues went to lunch without her.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person feeling left out when colleagues went to lunch without her',
  },
];

const overMeanings: MeaningData[] = [
  {
    definition: 'To have a portion of something remaining after the rest has been used or eaten (almost always used in the passive as "left over").',
    example: 'We have a lot of pizza left over from the project launch party.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Pizza left over from a project launch party',
  },
];

const toMeanings: MeaningData[] = [
  {
    definition: 'To give someone else the responsibility or authority to handle a task.',
    example: "I don't know how to fix this server error; I'll leave it to the IT department.",
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person leaving a server error fix to the IT department',
  },
  {
    definition: 'To give money or property to someone in a will after passing away.',
    example: 'The CEO left his entire estate to charity.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'CEO leaving his entire estate to charity in his will',
  },
];

const upMeanings: MeaningData[] = [
  {
    definition: 'To let someone else make a decision or choose an option.',
    example: 'We can eat pizza or sushi for lunch; I will leave it up to you.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person leaving the lunch decision up to someone else',
  },
  {
    definition: 'To let a physical object or decoration remain hanging.',
    example: 'We usually leave our holiday decorations up until the middle of January.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Holiday decorations left up until the middle of January',
  },
];

const withMeanings: MeaningData[] = [
  {
    definition: 'To give an object to someone so they can keep it safe or take care of it temporarily.',
    example: 'Can I leave my heavy bags with you while I quickly run to the store?',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person leaving heavy bags with someone while running to the store',
  },
];

export const sections: SectionData[] = [
  { particle: 'about / around', storageKey: 'leaveAbout_section_expanded', storageKeyPrefix: 'leaveAbout', meanings: aboutMeanings },
  { particle: 'back',           storageKey: 'leaveBack_section_expanded',  storageKeyPrefix: 'leaveBack',  meanings: backMeanings },
  { particle: 'behind',         storageKey: 'leaveBehind_section_expanded',storageKeyPrefix: 'leaveBehind',meanings: behindMeanings },
  { particle: 'for',            storageKey: 'leaveFor_section_expanded',   storageKeyPrefix: 'leaveFor',   meanings: forMeanings },
  { particle: 'in',             storageKey: 'leaveIn_section_expanded',    storageKeyPrefix: 'leaveIn',    meanings: inMeanings },
  { particle: 'off',            storageKey: 'leaveOff_section_expanded',   storageKeyPrefix: 'leaveOff',   meanings: offMeanings },
  { particle: 'on',             storageKey: 'leaveOn_section_expanded',    storageKeyPrefix: 'leaveOn',    meanings: onMeanings },
  { particle: 'out',            storageKey: 'leaveOut_section_expanded',   storageKeyPrefix: 'leaveOut',   meanings: outMeanings },
  { particle: 'over',           storageKey: 'leaveOver_section_expanded',  storageKeyPrefix: 'leaveOver',  meanings: overMeanings },
  { particle: 'to',             storageKey: 'leaveTo_section_expanded',    storageKeyPrefix: 'leaveTo',    meanings: toMeanings },
  { particle: 'up (to)',        storageKey: 'leaveUp_section_expanded',    storageKeyPrefix: 'leaveUp',    meanings: upMeanings },
  { particle: 'with',           storageKey: 'leaveWith_section_expanded',  storageKeyPrefix: 'leaveWith',  meanings: withMeanings },
];

export default function LeaveVerbPage() {
  return <VerbPageLayout title="Leave" sections={sections} />;
}
