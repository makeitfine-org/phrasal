import VerbPageLayout, { MeaningData, SectionData } from '../../components/VerbPage';

const base = import.meta.env.BASE_URL;

const aboutAroundMeanings: MeaningData[] = [
  {
    definition: 'To move in different directions because of the wind.',
    example: 'The autumn leaves are blowing around the garden.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Autumn leaves blowing around the garden',
  },
  {
    definition: 'To spread rumors or stories (mostly British English).',
    example: 'There are a few rumors blowing about the office regarding the new manager.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Rumors spreading through an office',
  },
];

const apartMeanings: MeaningData[] = [
  {
    definition: 'To completely destroy something using an explosion.',
    example: 'The bomb blew the old building apart.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Building destroyed by an explosion',
  },
  {
    definition: 'To completely destroy an argument, idea, or plan by showing its flaws.',
    example: 'The senior developer blew apart my software architecture proposal during the meeting.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Developer debunking a software proposal',
  },
];

const awayMeanings: MeaningData[] = [
  {
    definition: 'To impress someone very much.',
    example: 'The team\'s presentation on the new Java framework completely blew me away.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Team presentation impressing the audience',
  },
  {
    definition: 'To move something away using the wind.',
    example: 'Hold onto your documents, or the wind will blow them away.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Documents being blown away by wind',
  },
  {
    definition: 'To defeat competitors easily or kill someone.',
    example: 'Our new product will blow the competition away.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Product easily defeating the competition',
  },
];

const backMeanings: MeaningData[] = [
  {
    definition: 'When the wind pushes something (like smoke or hair) back toward you.',
    example: 'I tried to light the fire, but the smoke blew back into my face.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Smoke blowing back into someone\'s face',
  },
  {
    definition: 'To have unexpected negative consequences for the person who started an action (often used as the noun blowback).',
    example: 'The company\'s aggressive marketing campaign blew back on them when customers complained.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Marketing campaign backfiring on a company',
  },
];

const byMeanings: MeaningData[] = [
  {
    definition: 'To pass very quickly (usually referring to time).',
    example: 'The weekend just blew by, and now it is Monday again.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Time passing very quickly over a weekend',
  },
  {
    definition: 'To easily move past a competitor or obstacle.',
    example: 'The runner blew by the defender to score a goal.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Runner passing a defender to score',
  },
];

const downMeanings: MeaningData[] = [
  {
    definition: 'To make something fall to the ground using strong wind.',
    example: 'The storm blew down several trees in our neighborhood.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Storm blowing down trees',
  },
];

const inMeanings: MeaningData[] = [
  {
    definition: 'To arrive casually, suddenly, or unexpectedly.',
    example: 'The CEO just blew in from London and wants to see you.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'CEO arriving unexpectedly from a flight',
  },
];

const intoMeanings: MeaningData[] = [
  {
    definition: 'To enter a room or building casually or loudly.',
    example: 'She blew into the office 20 minutes late, holding a cup of coffee.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person arriving late to the office with coffee',
  },
  {
    definition: 'To push air from your mouth into a device.',
    example: 'The police officer asked the driver to blow into the breathalyzer.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Driver blowing into a breathalyzer',
  },
];

const offMeanings: MeaningData[] = [
  {
    definition: 'To ignore someone or fail to attend an appointment.',
    example: 'I tried to organize a meeting with the client, but he blew me off.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Client ignoring a meeting request',
  },
  {
    definition: 'To ignore a responsibility or task.',
    example: 'He blew off his homework to play video games.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Student ignoring homework to play video games',
  },
  {
    definition: 'To release physical or emotional pressure (often "blow off steam").',
    example: 'After a stressful week at work, I like to run 10 kilometers to blow off steam.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person running to relieve stress after work',
  },
];

const outMeanings: MeaningData[] = [
  {
    definition: 'To extinguish a flame with your breath or wind.',
    example: 'Make a wish and blow out the candles on your birthday cake.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Blowing out birthday cake candles',
  },
  {
    definition: 'To defeat an opponent very easily.',
    example: 'Our sales team blew out the competition this quarter.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Sales team dominating the competition',
  },
  {
    definition: "When a vehicle's tire suddenly bursts.",
    example: 'I was driving to Warsaw when my front tire blew out.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Car tire blowing out on the road',
  },
];

const overMeanings: MeaningData[] = [
  {
    definition: 'When a bad situation, argument, or storm ends or is forgotten without causing serious damage.',
    example: 'The management decided to wait for the PR scandal to blow over before launching the app.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Waiting for a PR scandal to pass',
  },
];

const throughMeanings: MeaningData[] = [
  {
    definition: 'To spend money very quickly and irresponsibly.',
    example: 'The startup blew through its entire budget in just six months.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Startup spending through its budget rapidly',
  },
  {
    definition: 'To travel through a place quickly without stopping.',
    example: 'We didn\'t have time for sightseeing; we just blew through Paris on our way south.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Passing through Paris without stopping',
  },
];

const upMeanings: MeaningData[] = [
  {
    definition: 'To explode or be destroyed by an explosion.',
    example: 'The action movie hero walked away as the car blew up behind him.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Car exploding in an action movie scene',
  },
  {
    definition: 'To fill something with air (inflate).',
    example: 'Can you help me blow up these balloons for the party?',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Inflating balloons for a party',
  },
  {
    definition: 'To suddenly become very angry.',
    example: 'My boss blew up at me when I accidentally deleted the database.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Boss becoming angry after a database mistake',
  },
  {
    definition: 'To enlarge a photograph or image.',
    example: 'Let\'s blow up this chart so everyone in the meeting room can see it.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Enlarging a chart for a meeting room',
  },
  {
    definition: 'To suddenly become very popular or successful.',
    example: 'Their new social media app blew up overnight.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Social media app becoming viral overnight',
  },
];

export const sections: SectionData[] = [
  { particle: 'about / around (round)', storageKey: 'blowAbout_section_expanded',   storageKeyPrefix: 'blowAbout',   meanings: aboutAroundMeanings },
  { particle: 'apart',                  storageKey: 'blowApart_section_expanded',   storageKeyPrefix: 'blowApart',   meanings: apartMeanings },
  { particle: 'away',                   storageKey: 'blowAway_section_expanded',    storageKeyPrefix: 'blowAway',    meanings: awayMeanings },
  { particle: 'back',                   storageKey: 'blowBack_section_expanded',    storageKeyPrefix: 'blowBack',    meanings: backMeanings },
  { particle: 'by',                     storageKey: 'blowBy_section_expanded',      storageKeyPrefix: 'blowBy',      meanings: byMeanings },
  { particle: 'down',                   storageKey: 'blowDown_section_expanded',    storageKeyPrefix: 'blowDown',    meanings: downMeanings },
  { particle: 'in',                     storageKey: 'blowIn_section_expanded',      storageKeyPrefix: 'blowIn',      meanings: inMeanings },
  { particle: 'into',                   storageKey: 'blowInto_section_expanded',    storageKeyPrefix: 'blowInto',    meanings: intoMeanings },
  { particle: 'off',                    storageKey: 'blowOff_section_expanded',     storageKeyPrefix: 'blowOff',     meanings: offMeanings },
  { particle: 'out',                    storageKey: 'blowOut_section_expanded',     storageKeyPrefix: 'blowOut',     meanings: outMeanings },
  { particle: 'over',                   storageKey: 'blowOver_section_expanded',    storageKeyPrefix: 'blowOver',    meanings: overMeanings },
  { particle: 'through',                storageKey: 'blowThrough_section_expanded', storageKeyPrefix: 'blowThrough', meanings: throughMeanings },
  { particle: 'up',                     storageKey: 'blowUp_section_expanded',      storageKeyPrefix: 'blowUp',      meanings: upMeanings },
];

export default function BlowVerbPage() {
  return <VerbPageLayout title="Blow" sections={sections} />;
}
