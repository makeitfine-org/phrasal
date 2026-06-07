import VerbPageLayout, { MeaningData, SectionData } from '../../components/VerbPage';

const base = import.meta.env.BASE_URL;

const awayMeanings: MeaningData[] = [
  {
    definition: 'To provide something for free (as a gift or promotion)',
    example: 'The software company is giving away free trials to new users.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A software company giving away free trials',
  },
  {
    definition: 'To reveal a secret or hidden information',
    example: "Please don't give away our negotiation strategy to the competitors.",
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A person revealing a secret strategy',
  },
  {
    definition: 'To betray someone or accidentally show their true identity or feelings',
    example: 'He tried to hide his frustration, but his tone of voice gave him away.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A person whose tone of voice betrays their true feelings',
  },
  {
    definition: 'To formally hand over a bride at a wedding',
    example: 'Her father gave her away at the ceremony.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A father walking his daughter down the aisle',
  },
];

const backMeanings: MeaningData[] = [
  {
    definition: 'To return something to its original owner',
    example: 'You must give back the company laptop when you leave the job.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'An employee returning a laptop to the company',
  },
  {
    definition: 'To contribute to society or a community after achieving success',
    example: 'The successful manager likes to give back by mentoring junior developers.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A manager mentoring junior developers',
  },
];

const inMeanings: MeaningData[] = [
  {
    definition: 'To finally agree to what someone wants after initially refusing (yield/surrender)',
    example: "Management finally gave in to the workers' demands for flexible hours.",
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Management agreeing to workers demands',
  },
  {
    definition: 'To hand over or submit a document (mainly British English)',
    example: 'Please give in your project reports by Friday afternoon.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'An employee submitting a project report',
  },
];

const inToMeanings: MeaningData[] = [
  {
    definition: 'To stop resisting a feeling, desire, or pressure',
    example: 'The company gave in to market pressure and lowered its prices.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A company yielding to market pressure',
  },
];

const offMeanings: MeaningData[] = [
  {
    definition: 'To produce or emit something physical (heat, light, smell) or an invisible feeling (a vibe/energy)',
    example: 'The server room gives off a lot of heat.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A server room emitting heat',
  },
];

const onOntoMeanings: MeaningData[] = [
  {
    definition: 'To open in the direction of, or provide a view of (used for doors, windows, or rooms)',
    example: "The CEO's office has large windows that give onto the city skyline.",
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: "An office window with a view onto the city skyline",
  },
];

const outMeanings: MeaningData[] = [
  {
    definition: 'To distribute something to a group of people',
    example: 'They were giving out informational flyers at the business conference.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A person distributing flyers at a conference',
  },
  {
    definition: 'To stop working or fail completely (used for machines, supplies, or body parts)',
    example: "We couldn't finish the presentation because the projector's lamp gave out.",
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A projector failing during a presentation',
  },
  {
    definition: 'To make information public',
    example: 'The HR department will give out the details of the new health plan tomorrow.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'An HR department announcing new health plan details',
  },
];

const overMeanings: MeaningData[] = [
  {
    definition: 'To hand over control, responsibility, or possession of something',
    example: 'The founder gave over control of the daily operations to the new CEO.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A founder handing over control to a new CEO',
  },
  {
    definition: 'To dedicate time or space to a specific purpose (usually passive: be given over to)',
    example: 'The afternoon meeting was given over to brainstorming new Java applications.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A meeting dedicated entirely to brainstorming',
  },
  {
    definition: 'To stop doing something annoying (mainly British informal)',
    example: 'Oh, give over! Stop complaining about the minor bugs in the code.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A person telling someone to stop complaining',
  },
];

const upMeanings: MeaningData[] = [
  {
    definition: 'To stop trying to do something or accept defeat (surrender)',
    example: "The coding problem was incredibly difficult, but the developer didn't give up.",
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A developer persisting through a difficult coding problem',
  },
  {
    definition: 'To stop doing a regular habit',
    example: 'I decided to give up drinking coffee late in the afternoon.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A person deciding to stop drinking coffee',
  },
  {
    definition: 'To part with something valuable or give away your time',
    example: 'We had to give up our weekend to finish the software release on time.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A team working over the weekend to finish a software release',
  },
  {
    definition: 'To surrender yourself to the authorities',
    example: 'The hacker finally gave himself up to the police.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A person surrendering to the police',
  },
];

const itUpForMeanings: MeaningData[] = [
  {
    definition: 'To applaud or clap for someone (used to welcome a speaker or performer)',
    example: "Let's give it up for our keynote speaker!",
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'An audience applauding a keynote speaker',
  },
];

const withMeanings: MeaningData[] = [
  {
    definition: 'To provide or tell information (informal/slang)',
    example: 'Come on, give with the details! What happened during the board meeting?',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A person asking for details about a board meeting',
  },
];

export const sections: SectionData[] = [
  { particle: 'away', storageKey: 'giveAway_section_expanded', storageKeyPrefix: 'giveAway', meanings: awayMeanings },
  { particle: 'back', storageKey: 'giveBack_section_expanded', storageKeyPrefix: 'giveBack', meanings: backMeanings },
  { particle: 'in', storageKey: 'giveIn_section_expanded', storageKeyPrefix: 'giveIn', meanings: inMeanings },
  { particle: 'in to', storageKey: 'giveInTo_section_expanded', storageKeyPrefix: 'giveInTo', meanings: inToMeanings },
  { particle: 'off', storageKey: 'giveOff_section_expanded', storageKeyPrefix: 'giveOff', meanings: offMeanings },
  { particle: 'on / onto', storageKey: 'giveOnOnto_section_expanded', storageKeyPrefix: 'giveOnOnto', meanings: onOntoMeanings },
  { particle: 'out', storageKey: 'giveOut_section_expanded', storageKeyPrefix: 'giveOut', meanings: outMeanings },
  { particle: 'over', storageKey: 'giveOver_section_expanded', storageKeyPrefix: 'giveOver', meanings: overMeanings },
  { particle: 'up', storageKey: 'giveUp_section_expanded', storageKeyPrefix: 'giveUp', meanings: upMeanings },
  { particle: '(it) up for', storageKey: 'giveItUpFor_section_expanded', storageKeyPrefix: 'giveItUpFor', meanings: itUpForMeanings },
  { particle: 'with', storageKey: 'giveWith_section_expanded', storageKeyPrefix: 'giveWith', meanings: withMeanings },
];

export default function GiveVerbPage() {
  return <VerbPageLayout title="Give" sections={sections} />;
}
