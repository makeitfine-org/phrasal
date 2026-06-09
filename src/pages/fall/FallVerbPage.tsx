import VerbPageLayout, { MeaningData, SectionData } from '../../components/VerbPage';

const base = import.meta.env.BASE_URL;

const aboutMeanings: MeaningData[] = [
  {
    definition: 'To laugh uncontrollably (mostly British/Australian English).',
    example: 'The whole team fell about laughing during the presentation.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Whole team laughing uncontrollably during a presentation',
  },
];

const apartMeanings: MeaningData[] = [
  {
    definition: 'To fail completely (systems, plans, or organizations).',
    example: 'The software project fell apart due to poor management.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Software project failing due to poor management',
  },
  {
    definition: 'To experience a serious emotional or mental breakdown.',
    example: 'He fell apart after losing his leadership role.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person experiencing emotional breakdown after losing their leadership role',
  },
  {
    definition: 'To break into pieces because of poor condition.',
    example: 'These old documents are starting to fall apart.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Old documents breaking into pieces due to poor condition',
  },
];

const awayMeanings: MeaningData[] = [
  {
    definition: 'To gradually decrease, fade, or disappear.',
    example: 'Client interest fell away when the prices increased.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Client interest declining as prices increase',
  },
  {
    definition: 'To break off and drop to the ground.',
    example: 'The old plaster fell away from the ceiling.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Old plaster falling away from the ceiling',
  },
  {
    definition: 'To slope downwards.',
    example: 'The land falls away sharply behind the building.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Land sloping downwards sharply behind a building',
  },
];

const backMeanings: MeaningData[] = [
  {
    definition: 'To retreat or move backwards (often military or strategic).',
    example: 'Our competitors pushed hard, forcing us to fall back and rethink our strategy.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Team falling back and rethinking strategy under competitor pressure',
  },
  {
    definition: 'To rely on something as a backup plan when other things fail (fall back on).',
    example: 'If the Java application fails, we have a backup system to fall back on.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Backup system ready to fall back on if Java application fails',
  },
];

const behindMeanings: MeaningData[] = [
  {
    definition: 'To fail to complete work or make payments on time.',
    example: "If you don't manage your time well, you will fall behind on the project schedule.",
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person falling behind on project schedule due to poor time management',
  },
  {
    definition: 'To move slower than the rest of a group.',
    example: 'She fell behind the other runners because her leg hurt.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Runner falling behind the group due to a leg injury',
  },
];

const downMeanings: MeaningData[] = [
  {
    definition: 'To be proven weak, inadequate, or incorrect (often an argument or plan).',
    example: 'His business strategy falls down when you look at the financial data.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Business strategy proven inadequate when examining financial data',
  },
  {
    definition: 'To drop to the ground (literal).',
    example: 'The sign was not attached properly and fell down.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Sign falling down because it was not attached properly',
  },
];

const forMeanings: MeaningData[] = [
  {
    definition: 'To be tricked or deceived by a lie or scam.',
    example: "I can't believe the manager fell for that obvious phishing email.",
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Manager falling for an obvious phishing email',
  },
  {
    definition: 'To fall deeply in love with someone.',
    example: 'They met at a tech conference and fell for each other immediately.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Two people falling for each other at a tech conference',
  },
];

const inMeanings: MeaningData[] = [
  {
    definition: 'To collapse inwards (like a roof, wall, or ceiling).',
    example: 'The roof of the old warehouse fell in under the heavy snow.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Old warehouse roof collapsing inwards under heavy snow',
  },
  {
    definition: 'To form a line (military).',
    example: 'The sergeant ordered the soldiers to fall in.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Soldiers forming a line after sergeant orders them to fall in',
  },
  {
    definition: 'To agree to a plan or join a group of people (fall in with).',
    example: "We decided to fall in with the director's new strategy.",
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: "Team agreeing to fall in with the director's new strategy",
  },
];

const intoMeanings: MeaningData[] = [
  {
    definition: 'To start doing something by chance, rather than by plan (like a career).',
    example: "I didn't study management; I just fell into it.",
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person falling into a management career by chance rather than plan',
  },
  {
    definition: 'To be naturally divided into categories.',
    example: 'The users of this software fall into three main groups.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Software users naturally divided into three main groups',
  },
  {
    definition: 'To enter a specific state or condition.',
    example: 'The building fell into ruin after years of neglect.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Building falling into ruin after years of neglect',
  },
];

const offMeanings: MeaningData[] = [
  {
    definition: 'To decrease in quantity, quality, or frequency.',
    example: 'Product sales usually fall off during the summer holidays.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Product sales falling off during summer holidays',
  },
  {
    definition: 'To detach from something.',
    example: 'The handle fell off the door.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Door handle falling off',
  },
];

const onMeanings: MeaningData[] = [
  {
    definition: "To become someone's duty or responsibility.",
    example: 'When the CEO resigned, the responsibility fell on the vice president.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Responsibility falling on the vice president after the CEO resigned',
  },
  {
    definition: 'To happen on a specific date.',
    example: 'This year, the project deadline falls on a Friday.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Project deadline falling on a Friday this year',
  },
  {
    definition: 'To attack eagerly or suddenly.',
    example: 'The press fell on the politician after the scandal broke.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Press attacking a politician eagerly after a scandal',
  },
  {
    definition: 'To experience difficult times (idiom: fall on hard times).',
    example: 'The company fell on hard times during the recession.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Company experiencing hard times during a recession',
  },
];

const outMeanings: MeaningData[] = [
  {
    definition: 'To have an argument and stop being friends or colleagues.',
    example: 'The two founders fell out over the future direction of the company.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Two founders arguing and falling out over company direction',
  },
  {
    definition: 'To become detached and drop (usually hair or teeth).',
    example: 'Stress can cause your hair to fall out.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Hair falling out due to stress',
  },
  {
    definition: 'To leave a formation (military).',
    example: 'The troops were ordered to fall out and rest.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Troops ordered to fall out and rest from military formation',
  },
];

const overMeanings: MeaningData[] = [
  {
    definition: 'To collapse or drop to the ground.',
    example: 'The server rack almost fell over during the earthquake.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Server rack almost falling over during an earthquake',
  },
  {
    definition: 'To try extremely hard, often looking foolish, to do something (fall over oneself).',
    example: 'Recruiters are falling over themselves to hire good Java developers.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Recruiters eagerly competing to hire good Java developers',
  },
];

const throughMeanings: MeaningData[] = [
  {
    definition: 'To fail to happen or be completed (usually plans, deals, or projects).',
    example: 'The merger fell through at the last minute due to legal issues.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Merger falling through at the last minute due to legal issues',
  },
];

const toMeanings: MeaningData[] = [
  {
    definition: "To become someone's duty or responsibility (similar to fall on).",
    example: 'It falls to the senior developer to train the new team members.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Senior developer responsible for training new team members',
  },
  {
    definition: 'To start doing something energetically, especially eating or working.',
    example: 'They fell to eating as soon as the food arrived.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'People starting to eat energetically as soon as the food arrived',
  },
];

export const sections: SectionData[] = [
  { particle: 'about / around / round', storageKey: 'fallAbout_section_expanded',   storageKeyPrefix: 'fallAbout',   meanings: aboutMeanings },
  { particle: 'apart',                  storageKey: 'fallApart_section_expanded',   storageKeyPrefix: 'fallApart',   meanings: apartMeanings },
  { particle: 'away',                   storageKey: 'fallAway_section_expanded',    storageKeyPrefix: 'fallAway',    meanings: awayMeanings },
  { particle: 'back',                   storageKey: 'fallBack_section_expanded',    storageKeyPrefix: 'fallBack',    meanings: backMeanings },
  { particle: 'behind',                 storageKey: 'fallBehind_section_expanded',  storageKeyPrefix: 'fallBehind',  meanings: behindMeanings },
  { particle: 'down',                   storageKey: 'fallDown_section_expanded',    storageKeyPrefix: 'fallDown',    meanings: downMeanings },
  { particle: 'for',                    storageKey: 'fallFor_section_expanded',     storageKeyPrefix: 'fallFor',     meanings: forMeanings },
  { particle: 'in',                     storageKey: 'fallIn_section_expanded',      storageKeyPrefix: 'fallIn',      meanings: inMeanings },
  { particle: 'into',                   storageKey: 'fallInto_section_expanded',    storageKeyPrefix: 'fallInto',    meanings: intoMeanings },
  { particle: 'off',                    storageKey: 'fallOff_section_expanded',     storageKeyPrefix: 'fallOff',     meanings: offMeanings },
  { particle: 'on / upon',              storageKey: 'fallOn_section_expanded',      storageKeyPrefix: 'fallOn',      meanings: onMeanings },
  { particle: 'out',                    storageKey: 'fallOut_section_expanded',     storageKeyPrefix: 'fallOut',     meanings: outMeanings },
  { particle: 'over',                   storageKey: 'fallOver_section_expanded',    storageKeyPrefix: 'fallOver',    meanings: overMeanings },
  { particle: 'through',                storageKey: 'fallThrough_section_expanded', storageKeyPrefix: 'fallThrough', meanings: throughMeanings },
  { particle: 'to',                     storageKey: 'fallTo_section_expanded',      storageKeyPrefix: 'fallTo',      meanings: toMeanings },
];

export default function FallVerbPage() {
  return <VerbPageLayout title="Fall" sections={sections} />;
}
