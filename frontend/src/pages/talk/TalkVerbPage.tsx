import VerbPageLayout, { MeaningData, SectionData } from '../../components/VerbPage';

const base = import.meta.env.BASE_URL;

const aboutMeanings: MeaningData[] = [
  {
    definition: 'To discuss a specific topic, person, or idea.',
    example: 'We need to talk about the new software update.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Team talking about the new software update',
  },
];

const acrossMeanings: MeaningData[] = [
  {
    definition: 'To speak at the same time as someone else, often in a confusing way where people are not listening to each other.',
    example: 'The meeting was a mess because everyone was talking across each other.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'People talking across each other in a chaotic meeting',
  },
];

const againstMeanings: MeaningData[] = [
  {
    definition: 'To speak in opposition to an idea, plan, or person.',
    example: 'Several managers talked against the proposed budget cuts.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Managers talking against the proposed budget cuts',
  },
];

const aroundMeanings: MeaningData[] = [
  {
    definition: 'To avoid speaking directly about the main issue.',
    example: 'Stop talking around the problem and tell me what is wrong.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person talking around the problem instead of addressing it directly',
  },
  {
    definition: 'To persuade someone to agree with you or change their mind.',
    example: "He didn't want to join the project, but I finally talked him round.",
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person talking someone round to join the project',
  },
];

const awayMeanings: MeaningData[] = [
  {
    definition: 'To continue talking for a long time, often in a relaxed manner.',
    example: 'We sat in the cafe, talking away for hours.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Two people talking away in a cafe for hours',
  },
];

const backMeanings: MeaningData[] = [
  {
    definition: 'To reply rudely to someone in a position of authority (like a parent, teacher, or boss).',
    example: 'The student was sent to the principal for talking back to his teacher.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Student talking back to a teacher and being sent to the principal',
  },
];

const downMeanings: MeaningData[] = [
  {
    definition: 'To speak to someone as if they are less intelligent or less important than you (talk down to).',
    example: 'A good leader never talks down to their team members.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Leader avoiding talking down to team members',
  },
  {
    definition: 'To negotiate a lower price for something.',
    example: 'The car was $5,000, but I talked the seller down to $4,500.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person talking the seller down on a car price',
  },
  {
    definition: 'To guide an aircraft to a safe landing using radio instructions.',
    example: 'The air traffic controller talked the pilot down safely.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Air traffic controller talking the pilot down to a safe landing',
  },
];

const forMeanings: MeaningData[] = [
  {
    definition: 'To speak on behalf of someone else or a group.',
    example: 'I can only talk for myself, not the whole department.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person talking for themselves, not the whole department',
  },
];

const intoMeanings: MeaningData[] = [
  {
    definition: 'To persuade someone to do something they initially did not want to do.',
    example: 'She talked me into taking the management course.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person being talked into taking a management course',
  },
];

const onMeanings: MeaningData[] = [
  {
    definition: 'To continue talking, often for a long time or in a boring way.',
    example: 'He talked on and on about his holiday.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person talking on and on about their holiday',
  },
];

const outMeanings: MeaningData[] = [
  {
    definition: 'To discuss a problem thoroughly until it is completely resolved.',
    example: 'We had a disagreement, but we sat down and talked it out.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Two people sitting down and talking out a disagreement',
  },
  {
    definition: 'To persuade someone not to do something (talk out of).',
    example: 'I talked him out of quitting his job.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person being talked out of quitting their job',
  },
];

const overMeanings: MeaningData[] = [
  {
    definition: 'To discuss a plan or problem carefully before making a decision.',
    example: "Let's talk over the contract before we sign it.",
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Team talking over the contract before signing',
  },
  {
    definition: 'To speak louder than someone else to interrupt them.',
    example: 'Please don\'t talk over me while I am presenting.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person being talked over during a presentation',
  },
];

const throughMeanings: MeaningData[] = [
  {
    definition: 'To explain a process or idea to someone step by step.',
    example: 'Can you talk me through how to use this Java framework?',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Developer being talked through how to use a Java framework',
  },
  {
    definition: 'To discuss a problem in detail to find a solution.',
    example: 'We need to talk through these errors in the code.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Team talking through errors in the code to find a solution',
  },
];

const toMeanings: MeaningData[] = [
  {
    definition: 'To have a conversation with someone.',
    example: 'I need to talk to the client tomorrow.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person needing to talk to a client tomorrow',
  },
  {
    definition: 'To reprimand or scold someone for doing something wrong.',
    example: 'The manager had to talk to him about arriving late.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Manager talking to an employee about arriving late',
  },
];

const togetherMeanings: MeaningData[] = [
  {
    definition: 'To converse with one another (literal meaning).',
    example: 'The two developers talked together quietly in the corner.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Two developers talking together quietly in the corner',
  },
];

const upMeanings: MeaningData[] = [
  {
    definition: 'To praise or promote something to make it sound very good or exciting.',
    example: 'They are really talking up the new product launch.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Team talking up the new product launch',
  },
];

const withMeanings: MeaningData[] = [
  {
    definition: 'To have a discussion with someone, often implying a more equal, two-way conversation.',
    example: 'I enjoyed talking with you at the conference.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Two people enjoying talking with each other at a conference',
  },
];

export const sections: SectionData[] = [
  { particle: 'about',         storageKey: 'talkAbout_section_expanded',    storageKeyPrefix: 'talkAbout',    meanings: aboutMeanings },
  { particle: 'across',        storageKey: 'talkAcross_section_expanded',   storageKeyPrefix: 'talkAcross',   meanings: acrossMeanings },
  { particle: 'against',       storageKey: 'talkAgainst_section_expanded',  storageKeyPrefix: 'talkAgainst',  meanings: againstMeanings },
  { particle: 'around / round', storageKey: 'talkAround_section_expanded',  storageKeyPrefix: 'talkAround',   meanings: aroundMeanings },
  { particle: 'away',          storageKey: 'talkAway_section_expanded',     storageKeyPrefix: 'talkAway',     meanings: awayMeanings },
  { particle: 'back',          storageKey: 'talkBack_section_expanded',     storageKeyPrefix: 'talkBack',     meanings: backMeanings },
  { particle: 'down',          storageKey: 'talkDown_section_expanded',     storageKeyPrefix: 'talkDown',     meanings: downMeanings },
  { particle: 'for',           storageKey: 'talkFor_section_expanded',      storageKeyPrefix: 'talkFor',      meanings: forMeanings },
  { particle: 'into',          storageKey: 'talkInto_section_expanded',     storageKeyPrefix: 'talkInto',     meanings: intoMeanings },
  { particle: 'on',            storageKey: 'talkOn_section_expanded',       storageKeyPrefix: 'talkOn',       meanings: onMeanings },
  { particle: 'out',           storageKey: 'talkOut_section_expanded',      storageKeyPrefix: 'talkOut',      meanings: outMeanings },
  { particle: 'over',          storageKey: 'talkOver_section_expanded',     storageKeyPrefix: 'talkOver',     meanings: overMeanings },
  { particle: 'through',       storageKey: 'talkThrough_section_expanded',  storageKeyPrefix: 'talkThrough',  meanings: throughMeanings },
  { particle: 'to',            storageKey: 'talkTo_section_expanded',       storageKeyPrefix: 'talkTo',       meanings: toMeanings },
  { particle: 'together',      storageKey: 'talkTogether_section_expanded', storageKeyPrefix: 'talkTogether', meanings: togetherMeanings },
  { particle: 'up',            storageKey: 'talkUp_section_expanded',       storageKeyPrefix: 'talkUp',       meanings: upMeanings },
  { particle: 'with',          storageKey: 'talkWith_section_expanded',     storageKeyPrefix: 'talkWith',     meanings: withMeanings },
];

export default function TalkVerbPage() {
  return <VerbPageLayout title="Talk" sections={sections} />;
}
