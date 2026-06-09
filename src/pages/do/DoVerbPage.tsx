import VerbPageLayout, { MeaningData, SectionData } from '../../components/VerbPage';

const base = import.meta.env.BASE_URL;

const aboutMeanings: MeaningData[] = [
  {
    definition: 'To take action to fix a problem.',
    example: 'The project deadline is at risk; what are we going to do about it?',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Team discussing what to do about a project deadline at risk',
  },
];

const awayMeanings: MeaningData[] = [
  {
    definition: 'To abolish, get rid of, or stop using something.',
    example: 'Many companies are trying to do away with paper receipts.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Companies doing away with paper receipts',
  },
  {
    definition: 'To kill someone or an animal (informal).',
    example: 'The villain in the movie planned to do away with the king.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Villain planning to do away with the king',
  },
];

const byMeanings: MeaningData[] = [
  {
    definition: 'To treat someone in a particular way (almost always used in the phrase "do right by" or "do well by" someone).',
    example: 'As a leader, you must always try to do right by your team members.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Leader trying to do right by their team members',
  },
];

const downMeanings: MeaningData[] = [
  {
    definition: 'To criticize someone unfairly, making them or yourself seem less successful or important.',
    example: 'Stop doing yourself down; you gave an excellent presentation today.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person being told to stop doing themselves down after a presentation',
  },
  {
    definition: 'To cheat someone, usually in a business deal.',
    example: 'The mechanic tried to do me down on the cost of the car repairs.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Mechanic trying to do a customer down on car repair costs',
  },
];

const forMeanings: MeaningData[] = [
  {
    definition: 'To severely damage, ruin, or kill (usually used in the passive "be done for").',
    example: 'If the manager catches us sleeping at our desks, we are done for.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Employees worried about being done for if caught sleeping at desks',
  },
];

const inMeanings: MeaningData[] = [
  {
    definition: 'To make someone extremely tired (exhaust).',
    example: 'That 10-kilometer run really did me in.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Runner exhausted after a 10-kilometer run that did them in',
  },
  {
    definition: 'To injure a body part.',
    example: 'I did my back in while moving that heavy sofa.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person who did their back in while moving a heavy sofa',
  },
  {
    definition: 'To kill or murder (informal).',
    example: 'The gang threatened to do him in if he went to the police.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Gang threatening to do someone in if they go to the police',
  },
];

const intoMeanings: MeaningData[] = [
  {
    definition: 'To translate a piece of text into another language (formal and slightly old-fashioned).',
    example: 'The ancient poem was done into English by a famous scholar.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Scholar doing an ancient poem into English',
  },
];

const outMeanings: MeaningData[] = [
  {
    definition: 'To clean or decorate a room thoroughly.',
    example: 'I need to do out the kitchen cupboards this weekend; they are so messy.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person doing out messy kitchen cupboards',
  },
  {
    definition: 'To cheat someone in order to take something from them (do someone out of something).',
    example: 'He lied on the contract to do his business partner out of his share of the money.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person lying on a contract to do their business partner out of money',
  },
];

const overMeanings: MeaningData[] = [
  {
    definition: 'To do something again because it was wrong the first time (mainly US English).',
    example: 'This financial report is full of mistakes; you need to do it over.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Employee needing to do a financial report over due to mistakes',
  },
  {
    definition: 'To attack and beat someone up (UK informal).',
    example: 'He got done over by a group of angry football fans.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person who got done over by angry football fans',
  },
  {
    definition: 'To burgle or rob a place (UK informal).',
    example: 'Their apartment was done over while they were on holiday.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Apartment done over while owners were on holiday',
  },
];

const toMeanings: MeaningData[] = [
  {
    definition: 'To treat someone in a certain way, usually causing harm, damage, or change.',
    example: "I can't believe what the hairdresser did to my hair!",
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: "Person shocked by what the hairdresser did to their hair",
  },
];

const upMeanings: MeaningData[] = [
  {
    definition: 'To fasten or tie clothes, shoelaces, or seatbelts.',
    example: 'It is very cold outside, so make sure to do up your coat.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person doing up their coat in cold weather',
  },
  {
    definition: 'To repair, decorate, or renovate a building or room.',
    example: 'They bought an old, ruined house to do it up and sell it for a profit.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'People doing up an old ruined house to sell for profit',
  },
  {
    definition: 'To wrap a parcel or gift.',
    example: 'I need to do up this present with a nice red ribbon.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person doing up a present with a red ribbon',
  },
];

const withMeanings: MeaningData[] = [
  {
    definition: 'To need or want something (always used with "could" or "can").',
    example: 'I could really do with a hot cup of coffee right now.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person who could really do with a hot cup of coffee',
  },
  {
    definition: 'To have a connection or relationship with (often used as "have something/nothing to do with").',
    example: 'The software bug has nothing to do with the recent system update.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Developer explaining the bug has nothing to do with the system update',
  },
];

const withoutMeanings: MeaningData[] = [
  {
    definition: 'To manage to survive or continue even when you do not have something you need.',
    example: 'We have no milk left for the coffee, so we will just have to do without.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'People having to do without milk for their coffee',
  },
];

export const sections: SectionData[] = [
  { particle: 'about',   storageKey: 'doAbout_section_expanded',   storageKeyPrefix: 'doAbout',   meanings: aboutMeanings },
  { particle: 'away',    storageKey: 'doAway_section_expanded',    storageKeyPrefix: 'doAway',    meanings: awayMeanings },
  { particle: 'by',      storageKey: 'doBy_section_expanded',      storageKeyPrefix: 'doBy',      meanings: byMeanings },
  { particle: 'down',    storageKey: 'doDown_section_expanded',    storageKeyPrefix: 'doDown',    meanings: downMeanings },
  { particle: 'for',     storageKey: 'doFor_section_expanded',     storageKeyPrefix: 'doFor',     meanings: forMeanings },
  { particle: 'in',      storageKey: 'doIn_section_expanded',      storageKeyPrefix: 'doIn',      meanings: inMeanings },
  { particle: 'into',    storageKey: 'doInto_section_expanded',    storageKeyPrefix: 'doInto',    meanings: intoMeanings },
  { particle: 'out',     storageKey: 'doOut_section_expanded',     storageKeyPrefix: 'doOut',     meanings: outMeanings },
  { particle: 'over',    storageKey: 'doOver_section_expanded',    storageKeyPrefix: 'doOver',    meanings: overMeanings },
  { particle: 'to',      storageKey: 'doTo_section_expanded',      storageKeyPrefix: 'doTo',      meanings: toMeanings },
  { particle: 'up',      storageKey: 'doUp_section_expanded',      storageKeyPrefix: 'doUp',      meanings: upMeanings },
  { particle: 'with',    storageKey: 'doWith_section_expanded',    storageKeyPrefix: 'doWith',    meanings: withMeanings },
  { particle: 'without', storageKey: 'doWithout_section_expanded', storageKeyPrefix: 'doWithout', meanings: withoutMeanings },
];

export default function DoVerbPage() {
  return <VerbPageLayout title="Do" sections={sections} />;
}
