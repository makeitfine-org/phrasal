import VerbPageLayout, { MeaningData, SectionData } from '../../components/VerbPage';

const base = import.meta.env.BASE_URL;

const aboutMeanings: MeaningData[] = [
  {
    definition: 'To move quickly and energetically from one place to another within an area.',
    example: 'She spent the entire Saturday zipping around town running errands.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person moving quickly around town running errands',
  },
];

const acrossMeanings: MeaningData[] = [
  {
    definition: 'To travel very rapidly from one side of a space, surface, or area to the other.',
    example: 'The speedboat zipped across the lake in under a minute.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Speedboat zipping rapidly across a lake',
  },
];

const aheadMeanings: MeaningData[] = [
  {
    definition: 'To advance quickly, often leaving others behind or moving to the front of a line or progression.',
    example: 'He zipped ahead of the rest of the runners in the final lap.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Runner zipping ahead of others in the final lap',
  },
];

const apartMeanings: MeaningData[] = [
  {
    definition: 'To separate two pieces of fabric or material by opening a zipper that connects them.',
    example: 'These convertible hiking pants zip apart at the knee to become shorts.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Convertible hiking pants zipping apart at the knee',
  },
];

const awayMeanings: MeaningData[] = [
  {
    definition: 'To depart or move away very rapidly.',
    example: 'As soon as the light turned green, the sports car zipped away.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Sports car zipping away as traffic light turns green',
  },
];

const backMeanings: MeaningData[] = [
  {
    definition: 'To return to a place very quickly for a short duration.',
    example: 'I just need to zip back to the office to grab my laptop.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person quickly returning to the office to grab a laptop',
  },
];

const byMeanings: MeaningData[] = [
  {
    definition: 'To physically pass someone or something very quickly.',
    example: 'A cyclist zipped by me on the trail and nearly startled me.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Cyclist zipping by a pedestrian on a trail',
  },
  {
    definition: 'Of time: to pass very quickly.',
    example: 'The summer holidays just seemed to zip by this year.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Calendar pages flying by representing summer holidays passing quickly',
  },
];

const downMeanings: MeaningData[] = [
  {
    definition: 'To unfasten a zipper by moving it in a downward direction.',
    example: 'He zipped down his jacket because the sun came out.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person unzipping their jacket downward as the sun comes out',
  },
  {
    definition: 'To travel quickly down a path, road, or digital page.',
    example: 'Let me just zip down to the bottom of this document to check the signature line.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person quickly scrolling to the bottom of a document',
  },
];

const inMeanings: MeaningData[] = [
  {
    definition: 'To arrive or enter a place very quickly.',
    example: "I'll zip in and grab a coffee before the meeting starts.",
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person quickly entering a coffee shop before a meeting',
  },
  {
    definition: 'To attach an inner lining to a larger garment using a zipper.',
    example: 'You can zip in the fleece lining to make the raincoat suitable for winter.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person zipping a fleece lining into a raincoat for winter',
  },
];

const intoMeanings: MeaningData[] = [
  {
    definition: 'To put on a piece of clothing rapidly.',
    example: 'She zipped into her wetsuit and ran toward the ocean.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Swimmer quickly putting on a wetsuit and running toward the ocean',
  },
  {
    definition: 'To maneuver a vehicle or oneself into a space quickly.',
    example: 'He zipped into the parking spot right before the other driver could take it.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Car quickly maneuvering into a parking spot',
  },
];

const offMeanings: MeaningData[] = [
  {
    definition: 'To leave or depart quickly in a hurry.',
    example: 'I have to zip off to a dentist appointment now, but I\'ll call you later.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person rushing off to a dentist appointment',
  },
  {
    definition: 'To detach a removable part of a garment using a zipper.',
    example: 'He zipped off the sleeves of his jacket when it got too hot.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person detaching jacket sleeves using a zipper in hot weather',
  },
];

const onMeanings: MeaningData[] = [
  {
    definition: 'To attach a piece of fabric or a removable garment part using a zipper.',
    example: 'If it starts raining, you can just zip on the hood.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person attaching a hood to a jacket using a zipper',
  },
];

const outMeanings: MeaningData[] = [
  {
    definition: 'To go outside or leave a place for a very brief, quick errand.',
    example: "I'm going to zip out to the grocery store for some milk; I'll be back in ten minutes.",
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person quickly heading out to the grocery store for milk',
  },
  {
    definition: 'To remove an inner lining from a garment by unzipping it.',
    example: 'Make sure you zip out the thermal layer before you put the coat in the washing machine.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person removing a thermal lining from a coat before washing',
  },
];

const overMeanings: MeaningData[] = [
  {
    definition: 'To travel quickly to a nearby location, often someone\'s home or office.',
    example: "I'll zip over to your place after work to drop off the tools you lent me.",
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person quickly travelling to a friend\'s place to return tools',
  },
];

const throughMeanings: MeaningData[] = [
  {
    definition: 'To do, read, or complete a task very quickly and with ease.',
    example: 'She zipped through the exam in half the allotted time.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Student completing an exam quickly in half the allotted time',
  },
  {
    definition: 'To travel through a place without stopping, or to navigate a physical space rapidly.',
    example: 'We bypassed the traffic and zipped through the city centre.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Car navigating rapidly through the city centre avoiding traffic',
  },
];

const toMeanings: MeaningData[] = [
  {
    definition: 'To move rapidly to a specific destination or state.',
    example: 'Zip to the end of the video to see the surprise reveal.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person skipping to the end of a video to see the surprise reveal',
  },
];

const togetherMeanings: MeaningData[] = [
  {
    definition: 'To connect two separate items using their interlocking zippers.',
    example: 'We zipped together our two sleeping bags to make one large bed for the camping trip.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Two sleeping bags being zipped together for a camping trip',
  },
];

const upMeanings: MeaningData[] = [
  {
    definition: 'To close a garment, bag, or tent completely by fastening its zipper.',
    example: "Make sure you zip up your coat; it's freezing outside!",
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person zipping up their coat in cold weather',
  },
  {
    definition: 'To be quiet or stop talking (slang/idiomatic, often commanded as zip it).',
    example: "I told him to zip up before his complaining got us into more trouble.",
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person being told to zip up and stop complaining',
  },
];

export const sections: SectionData[] = [
  { particle: 'about / around / round', storageKey: 'zipAbout_section_expanded',   storageKeyPrefix: 'zipAbout',   meanings: aboutMeanings },
  { particle: 'across',                 storageKey: 'zipAcross_section_expanded',  storageKeyPrefix: 'zipAcross',  meanings: acrossMeanings },
  { particle: 'ahead',                  storageKey: 'zipAhead_section_expanded',   storageKeyPrefix: 'zipAhead',   meanings: aheadMeanings },
  { particle: 'apart',                  storageKey: 'zipApart_section_expanded',   storageKeyPrefix: 'zipApart',   meanings: apartMeanings },
  { particle: 'away',                   storageKey: 'zipAway_section_expanded',    storageKeyPrefix: 'zipAway',    meanings: awayMeanings },
  { particle: 'back',                   storageKey: 'zipBack_section_expanded',    storageKeyPrefix: 'zipBack',    meanings: backMeanings },
  { particle: 'by',                     storageKey: 'zipBy_section_expanded',      storageKeyPrefix: 'zipBy',      meanings: byMeanings },
  { particle: 'down',                   storageKey: 'zipDown_section_expanded',    storageKeyPrefix: 'zipDown',    meanings: downMeanings },
  { particle: 'in',                     storageKey: 'zipIn_section_expanded',      storageKeyPrefix: 'zipIn',      meanings: inMeanings },
  { particle: 'into',                   storageKey: 'zipInto_section_expanded',    storageKeyPrefix: 'zipInto',    meanings: intoMeanings },
  { particle: 'off',                    storageKey: 'zipOff_section_expanded',     storageKeyPrefix: 'zipOff',     meanings: offMeanings },
  { particle: 'on',                     storageKey: 'zipOn_section_expanded',      storageKeyPrefix: 'zipOn',      meanings: onMeanings },
  { particle: 'out',                    storageKey: 'zipOut_section_expanded',     storageKeyPrefix: 'zipOut',     meanings: outMeanings },
  { particle: 'over',                   storageKey: 'zipOver_section_expanded',    storageKeyPrefix: 'zipOver',    meanings: overMeanings },
  { particle: 'through',                storageKey: 'zipThrough_section_expanded', storageKeyPrefix: 'zipThrough', meanings: throughMeanings },
  { particle: 'to',                     storageKey: 'zipTo_section_expanded',      storageKeyPrefix: 'zipTo',      meanings: toMeanings },
  { particle: 'together',               storageKey: 'zipTogether_section_expanded',storageKeyPrefix: 'zipTogether',meanings: togetherMeanings },
  { particle: 'up',                     storageKey: 'zipUp_section_expanded',      storageKeyPrefix: 'zipUp',      meanings: upMeanings },
];

export default function ZipVerbPage() {
  return <VerbPageLayout title="Zip" sections={sections} />;
}
