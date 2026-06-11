import VerbPageLayout, { MeaningData, SectionData } from '../../components/VerbPage';

const base = import.meta.env.BASE_URL;

const aboutMeanings: MeaningData[] = [
  {
    definition: 'To stay in a place for a little while, often waiting for something to happen.',
    example: 'Stick around after the sprint review; we need to discuss the Java 21 migration.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person sticking around after sprint review to discuss Java 21 migration',
  },
];

const awayMeanings: MeaningData[] = [
  {
    definition: 'To store or put something in a safe or hidden place.',
    example: 'I stuck the old project contracts away in the archive cabinet.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person sticking old project contracts away in an archive cabinet',
  },
];

const byMeanings: MeaningData[] = [
  {
    definition: 'To remain loyal to someone during difficult times.',
    example: 'The founders stuck by each other when the company almost went bankrupt.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Founders sticking by each other when the company almost went bankrupt',
  },
  {
    definition: 'To keep a promise or remain committed to a decision.',
    example: 'Management decided to stick by their decision to invest heavily in cloud infrastructure.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Management sticking by their decision to invest heavily in cloud infrastructure',
  },
];

const downMeanings: MeaningData[] = [
  {
    definition: 'To attach something to a surface using glue or tape.',
    example: 'Stick down the network cables so nobody trips in the server room.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person sticking down network cables in the server room',
  },
  {
    definition: 'To write something quickly (informal).',
    example: 'Let me stick down these API endpoints before I forget them.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Developer sticking down API endpoints before forgetting them',
  },
];

const forMeanings: MeaningData[] = [
  {
    definition: 'To lack something necessary (used in the passive form "be stuck for").',
    example: "We are stuck for ideas on how to improve the application's performance.",
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: "Team stuck for ideas on how to improve application performance",
  },
];

const inMeanings: MeaningData[] = [
  {
    definition: 'To remain strongly in someone\'s memory (often used as "stick in your mind").',
    example: "The CEO's speech on agile leadership really stuck in my mind.",
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: "CEO speech on agile leadership sticking in someone's mind",
  },
];

const outMeanings: MeaningData[] = [
  {
    definition: 'To be very easy to see or notice because of being different.',
    example: 'The memory leak in the backend logic really sticks out when you look at the server logs.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Memory leak sticking out in server logs',
  },
  {
    definition: 'To continue to the end of a difficult situation (used as "stick it out").',
    example: 'The first year of running a business is hard, but you have to stick it out.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person sticking it out through the first year of running a business',
  },
];

const toMeanings: MeaningData[] = [
  {
    definition: 'To continue doing or following a specific plan, rule, or subject without changing.',
    example: "Let's stick to the meeting agenda so we finish on time.",
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Team sticking to meeting agenda to finish on time',
  },
  {
    definition: 'To keep a promise or agreement.',
    example: 'The vendor stuck to the original budget despite the extra development work.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Vendor sticking to original budget despite extra development work',
  },
];

const togetherMeanings: MeaningData[] = [
  {
    definition: 'To support each other as a group, especially in hard times.',
    example: 'A successful development team sticks together during a stressful product release.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Development team sticking together during a stressful product release',
  },
];

const upMeanings: MeaningData[] = [
  {
    definition: 'To point upwards or stand above a surface.',
    example: 'The cooling fan on the new server model sticks up higher than the old one.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Cooling fan on new server model sticking up higher than the old one',
  },
  {
    definition: 'To defend or support someone or an idea (used as "stick up for").',
    example: 'A good manager will always stick up for their team when other departments criticize them.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Manager sticking up for their team when other departments criticize them',
  },
];

const withMeanings: MeaningData[] = [
  {
    definition: 'To continue using or doing something, rather than changing it.',
    example: 'We decided to stick with the Spring Boot framework instead of learning a new ecosystem.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Team sticking with the Spring Boot framework instead of learning a new ecosystem',
  },
  {
    definition: 'To stay close to someone for guidance or safety.',
    example: 'Stick with the senior architect today, and she will show you how the deployment pipeline works.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Developer sticking with senior architect to learn deployment pipeline',
  },
];

export const sections: SectionData[] = [
  { particle: 'about / around', storageKey: 'stickAbout_section_expanded',    storageKeyPrefix: 'stickAbout',    meanings: aboutMeanings },
  { particle: 'away',           storageKey: 'stickAway_section_expanded',     storageKeyPrefix: 'stickAway',     meanings: awayMeanings },
  { particle: 'by',             storageKey: 'stickBy_section_expanded',       storageKeyPrefix: 'stickBy',       meanings: byMeanings },
  { particle: 'down',           storageKey: 'stickDown_section_expanded',     storageKeyPrefix: 'stickDown',     meanings: downMeanings },
  { particle: 'for',            storageKey: 'stickFor_section_expanded',      storageKeyPrefix: 'stickFor',      meanings: forMeanings },
  { particle: 'in',             storageKey: 'stickIn_section_expanded',       storageKeyPrefix: 'stickIn',       meanings: inMeanings },
  { particle: 'out',            storageKey: 'stickOut_section_expanded',      storageKeyPrefix: 'stickOut',      meanings: outMeanings },
  { particle: 'to',             storageKey: 'stickTo_section_expanded',       storageKeyPrefix: 'stickTo',       meanings: toMeanings },
  { particle: 'together',       storageKey: 'stickTogether_section_expanded', storageKeyPrefix: 'stickTogether', meanings: togetherMeanings },
  { particle: 'up',             storageKey: 'stickUp_section_expanded',       storageKeyPrefix: 'stickUp',       meanings: upMeanings },
  { particle: 'with',           storageKey: 'stickWith_section_expanded',     storageKeyPrefix: 'stickWith',     meanings: withMeanings },
];

export default function StickVerbPage() {
  return <VerbPageLayout title="Stick" sections={sections} />;
}
