import VerbPageLayout, { MeaningData, SectionData } from '../../components/VerbPage';

const base = import.meta.env.BASE_URL;

const offMeanings: MeaningData[] = [
  {
    definition: 'To remove something by cutting.',
    example: 'He cut off the tags from his new shirt.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Removing tags from a new shirt',
  },
  {
    definition: 'To interrupt someone speaking.',
    example: 'She cut me off mid-sentence to correct a date.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A person interrupting a conversation',
  },
  {
    definition: 'To stop providing a service or supply.',
    example: 'The electric company cut off our power because of an unpaid bill.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'An electricity supply being cut off',
  },
  {
    definition: 'To isolate or block access to a place.',
    example: 'The heavy snowstorm cut off the mountain village from the main road.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A village isolated by a snowstorm',
  },
  {
    definition: "To block another vehicle's path aggressively.",
    example: 'A white van cut me off on the highway, forcing me to brake hard.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A van cutting off another vehicle on a highway',
  },
  {
    definition: 'To disinherit or stop giving someone money.',
    example: 'His wealthy parents finally cut him off.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Parents cutting off financial support',
  },
];

const onMeanings: MeaningData[] = [
  {
    definition: 'To turn on a device or switch (Regional/Southern US).',
    example: "Can you cut on the lights? It's getting dark in here.",
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Turning on the lights in a room',
  },
];

const upMeanings: MeaningData[] = [
  {
    definition: 'To chop into small pieces.',
    example: 'Could you cut up the carrots for the stew?',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Chopping carrots into small pieces',
  },
  {
    definition: 'To act silly or cause a playful disruption (Informal).',
    example: 'The students were cutting up in the back of the classroom.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Students being silly in a classroom',
  },
  {
    definition: 'To deeply upset someone emotionally (often passive).',
    example: 'He was really cut up about failing his certification exam.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A person feeling upset after failing an exam',
  },
  {
    definition: 'To severely criticize.',
    example: 'The reviewers absolutely cut the new software release up.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Reviewers harshly criticizing a software release',
  },
  {
    definition: "To drive aggressively across someone's path (UK Informal).",
    example: 'That driver just cut me up on the roundabout.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A driver cutting in front of another on a roundabout',
  },
];

const downMeanings: MeaningData[] = [
  {
    definition: 'To cause something to fall by cutting.',
    example: 'The city cut down the old oak tree because it was rotting.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Felling a rotting oak tree',
  },
  {
    definition: 'To reduce the amount or frequency of something.',
    example: "I'm trying to cut down on caffeine before bed.",
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A person reducing their caffeine intake',
  },
  {
    definition: 'To kill or severely injure someone (often in a literary or tragic context).',
    example: 'The young soldiers were cut down in their prime.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Soldiers falling in battle',
  },
];

const inMeanings: MeaningData[] = [
  {
    definition: 'To interrupt a conversation.',
    example: 'Do you mind if I cut in with a quick question?',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A person interrupting a conversation with a question',
  },
  {
    definition: 'To move suddenly in front of another vehicle or person.',
    example: 'The sports car cut in far too closely.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A sports car cutting in front of another vehicle',
  },
  {
    definition: 'To include someone in a deal or share of profits.',
    example: "Since you brought us the client, we'll cut you in on the commission.",
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Colleagues sharing a commission deal',
  },
  {
    definition: 'To automatically start operating (referring to machines).',
    example: 'When the temperature drops, the backup heater cuts in.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A backup heater automatically starting up',
  },
  {
    definition: 'To interrupt a dancing couple to take over as a partner.',
    example: 'May I cut in?',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A person asking to cut in on a dancing couple',
  },
];

const intoMeanings: MeaningData[] = [
  {
    definition: 'To slice or penetrate a physical object.',
    example: 'The sharp wire cut into my skin.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A sharp wire cutting into skin',
  },
  {
    definition: 'To consume a portion of something valuable such as time, money, or profits.',
    example: 'The server outages are cutting into our quarterly profits.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Server outages reducing quarterly profits',
  },
  {
    definition: 'To interrupt (similar to cut in).',
    example: "I don't want to cut into your lunch break, but this is urgent.",
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A person apologetically interrupting a lunch break',
  },
];

const outMeanings: MeaningData[] = [
  {
    definition: 'To remove a shape or part by cutting.',
    example: 'She cut out an interesting article from the newspaper.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Cutting an article out of a newspaper',
  },
  {
    definition: 'To stop eating or doing something completely.',
    example: 'My doctor told me to cut out sugar.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A person eliminating sugar from their diet',
  },
  {
    definition: 'To suddenly stop working (referring to engines or machines).',
    example: 'The car engine cut out halfway up the hill.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A car engine stalling on a hill',
  },
  {
    definition: 'To exclude someone.',
    example: 'They completely cut me out of the decision-making process.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A person being excluded from a group decision',
  },
  {
    definition: 'To be naturally suited for something (usually negative and passive).',
    example: "After three weeks, he realized he wasn't cut out for sales.",
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A person realizing they are not suited for sales',
  },
];

const awayMeanings: MeaningData[] = [
  {
    definition: 'To remove the outer or unwanted parts by cutting.',
    example: 'The surgeon carefully cut away the damaged tissue.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A surgeon removing damaged tissue',
  },
  {
    definition: 'To suddenly shift the camera to another scene (Film/Media).',
    example: 'The broadcast cut away to a reporter live at the scene.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A broadcast cutting to a live reporter',
  },
];

const acrossMeanings: MeaningData[] = [
  {
    definition: 'To take a shortcut across an area.',
    example: 'We cut across the park to get to the station faster.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'People cutting across a park to reach a station',
  },
  {
    definition: 'To affect or apply to multiple different groups, transcending boundaries.',
    example: 'The demand for flexible working conditions cuts across all departments.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A workplace policy affecting all departments',
  },
];

const backMeanings: MeaningData[] = [
  {
    definition: 'To reduce spending, production, or consumption.',
    example: 'The company is cutting back on hiring this quarter.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A company reducing its hiring budget',
  },
  {
    definition: 'To prune a plant to control its growth.',
    example: 'We need to cut back the rose bushes before winter.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Pruning rose bushes before winter',
  },
  {
    definition: 'To return to a previous scene (Film/Media).',
    example: "The movie cuts back to the protagonist's childhood.",
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A film cutting back to a childhood scene',
  },
];

const togetherMeanings: MeaningData[] = [
  {
    definition: 'To edit film or audio by joining distinct pieces.',
    example: 'The marketing team cut together a fast-paced promotional video.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A marketing team editing a promotional video',
  },
];

const apartMeanings: MeaningData[] = [
  {
    definition: 'To separate or dismantle by cutting.',
    example: 'They cut the old ship apart for scrap metal.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Workers dismantling an old ship for scrap',
  },
  {
    definition: 'To severely criticize or destroy an argument.',
    example: "The defense attorney cut the witness's testimony apart.",
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: "A defense attorney dismantling a witness's testimony",
  },
];

const overMeanings: MeaningData[] = [
  {
    definition: 'To switch from an old system to a new one (IT/Business context).',
    example: 'The engineering team will cut over to the new cloud servers at midnight.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'An engineering team migrating to new cloud servers',
  },
];

const aheadMeanings: MeaningData[] = [
  {
    definition: 'To move in front of others in a line unethically.',
    example: 'A group of teenagers tried to cut ahead of us in the queue.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Teenagers cutting ahead in a queue',
  },
];

const throughMeanings: MeaningData[] = [
  {
    definition: 'To take a shortcut through an area.',
    example: "Let's cut through the alley to avoid the main street traffic.",
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'People taking a shortcut through an alley',
  },
  {
    definition: 'To quickly deal with or bypass obstacles and bureaucracy.',
    example: 'We hired a local consultant to cut through the legal red tape.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A consultant cutting through legal bureaucracy',
  },
  {
    definition: 'To penetrate a barrier such as sound, darkness, or confusion.',
    example: 'The siren cut through the silence of the night.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A siren cutting through the night silence',
  },
];

const aboutMeanings: MeaningData[] = [
  {
    definition: 'To move or run around actively or aimlessly (UK Informal).',
    example: 'The kids were cutting about the garden all afternoon.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Children running around a garden',
  },
  {
    definition: 'To take a quick shortcut around an obstacle.',
    example: "If we cut round the back of the building, we'll miss the crowd.",
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'People cutting round the back of a building',
  },
];

const toMeanings: MeaningData[] = [
  {
    definition: 'To skip ahead to a specific, more important point.',
    example: "Let's cut to the chase and discuss the budget.",
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'People cutting to the main point in a discussion',
  },
  {
    definition: 'To shift to a new scene (Film/Media scriptwriting).',
    example: 'The hero falls asleep. Cut to: interior, office, daytime.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A film script directing a scene cut',
  },
];

const againstMeanings: MeaningData[] = [
  {
    definition: 'To go against the grain, expectations, or natural order.',
    example: 'His decision to expand the business cuts against the current economic trends.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A business decision going against economic trends',
  },
];

export const sections: SectionData[] = [
  { particle: 'off',          storageKey: 'cutOff_section_expanded',     storageKeyPrefix: 'cutOff',      meanings: offMeanings },
  { particle: 'on',           storageKey: 'cutOn_section_expanded',      storageKeyPrefix: 'cutOn',       meanings: onMeanings },
  { particle: 'up',           storageKey: 'cutUp_section_expanded',      storageKeyPrefix: 'cutUp',       meanings: upMeanings },
  { particle: 'down',         storageKey: 'cutDown_section_expanded',    storageKeyPrefix: 'cutDown',     meanings: downMeanings },
  { particle: 'in',           storageKey: 'cutIn_section_expanded',      storageKeyPrefix: 'cutIn',       meanings: inMeanings },
  { particle: 'into',         storageKey: 'cutInto_section_expanded',    storageKeyPrefix: 'cutInto',     meanings: intoMeanings },
  { particle: 'out',          storageKey: 'cutOut_section_expanded',     storageKeyPrefix: 'cutOut',      meanings: outMeanings },
  { particle: 'away',         storageKey: 'cutAway_section_expanded',    storageKeyPrefix: 'cutAway',     meanings: awayMeanings },
  { particle: 'across',       storageKey: 'cutAcross_section_expanded',  storageKeyPrefix: 'cutAcross',   meanings: acrossMeanings },
  { particle: 'back',         storageKey: 'cutBack_section_expanded',    storageKeyPrefix: 'cutBack',     meanings: backMeanings },
  { particle: 'together',     storageKey: 'cutTogether_section_expanded',storageKeyPrefix: 'cutTogether', meanings: togetherMeanings },
  { particle: 'apart',        storageKey: 'cutApart_section_expanded',   storageKeyPrefix: 'cutApart',    meanings: apartMeanings },
  { particle: 'over',         storageKey: 'cutOver_section_expanded',    storageKeyPrefix: 'cutOver',     meanings: overMeanings },
  { particle: 'ahead',        storageKey: 'cutAhead_section_expanded',   storageKeyPrefix: 'cutAhead',    meanings: aheadMeanings },
  { particle: 'through',      storageKey: 'cutThrough_section_expanded', storageKeyPrefix: 'cutThrough',  meanings: throughMeanings },
  { particle: 'about / round',storageKey: 'cutAbout_section_expanded',   storageKeyPrefix: 'cutAbout',    meanings: aboutMeanings },
  { particle: 'to',           storageKey: 'cutTo_section_expanded',      storageKeyPrefix: 'cutTo',       meanings: toMeanings },
  { particle: 'against',      storageKey: 'cutAgainst_section_expanded', storageKeyPrefix: 'cutAgainst',  meanings: againstMeanings },
];

export default function CutVerbPage() {
  return <VerbPageLayout title="Cut" sections={sections} />;
}
