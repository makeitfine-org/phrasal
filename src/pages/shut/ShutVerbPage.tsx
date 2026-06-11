import VerbPageLayout, { MeaningData, SectionData } from '../../components/VerbPage';

const base = import.meta.env.BASE_URL;

const awayMeanings: MeaningData[] = [
  {
    definition: 'To isolate someone or something in a place where they cannot be seen or disturbed.',
    example: 'Before the exams, she shut herself away in the library for a week.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Student shutting herself away in the library before exams',
  },
];

const downMeanings: MeaningData[] = [
  {
    definition: 'To turn off a computer, machine, or system completely.',
    example: 'Always remember to shut down your laptop before putting it in your bag.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person shutting down laptop before putting it in bag',
  },
  {
    definition: 'To close a business or factory permanently or for a long time.',
    example: 'During the economic crisis, many local shops had to shut down.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Local shops shutting down during economic crisis',
  },
  {
    definition: 'To stop an opponent from playing well or succeeding (often used in sports or business).',
    example: 'Our defense managed to shut down their best player.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Defense shutting down the best player on the opposing team',
  },
];

const inMeanings: MeaningData[] = [
  {
    definition: 'To prevent someone or an animal from leaving a room or building by closing the door.',
    example: "It's raining heavily, so the cat has been shut in all day.",
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Cat shut in the house all day due to heavy rain',
  },
  {
    definition: 'To accidentally catch a body part or clothing in a closing door.',
    example: 'I accidentally shut my coat in the car door.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person accidentally shutting coat in car door',
  },
];

const offMeanings: MeaningData[] = [
  {
    definition: 'To stop the supply of something (like water, gas, or electricity).',
    example: 'The plumber had to shut off the water before fixing the pipe.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Plumber shutting off water before fixing the pipe',
  },
  {
    definition: 'To turn off a machine or engine.',
    example: 'Please shut off the engine when you park the car.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Driver shutting off engine when parking the car',
  },
  {
    definition: 'To isolate or separate a place from other areas.',
    example: 'The new wall shuts off the garden from the busy street.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'New wall shutting off the garden from the busy street',
  },
];

const outMeanings: MeaningData[] = [
  {
    definition: 'To prevent something from entering a place (like light or noise).',
    example: 'We use heavy curtains to shut out the street lights at night.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Heavy curtains shutting out street lights at night',
  },
  {
    definition: 'To exclude someone from an activity, or from your thoughts and feelings.',
    example: 'When he gets stressed, he stops talking and shuts everyone out.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person shutting everyone out when stressed',
  },
  {
    definition: 'To prevent an opposing team from scoring any points in a game (mainly used in sports).',
    example: 'The goalkeeper played perfectly and shut out the other team.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Goalkeeper shutting out the other team with a perfect performance',
  },
];

const upMeanings: MeaningData[] = [
  {
    definition: 'To stop talking or making a noise (informal, considered rude).',
    example: "I wish the dog next door would shut up; I'm trying to sleep.",
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person wishing the dog next door would shut up while trying to sleep',
  },
  {
    definition: 'To close and lock a building completely (often for the night or for a long time).',
    example: 'The manager shuts up the shop at 8:00 PM every evening.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Manager shutting up the shop at 8:00 PM every evening',
  },
  {
    definition: 'To keep someone or an animal securely in a room or place.',
    example: 'I was shut up in the meeting room for three hours today.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person shut up in the meeting room for three hours',
  },
];

export const sections: SectionData[] = [
  { particle: 'away', storageKey: 'shutAway_section_expanded', storageKeyPrefix: 'shutAway', meanings: awayMeanings },
  { particle: 'down', storageKey: 'shutDown_section_expanded', storageKeyPrefix: 'shutDown', meanings: downMeanings },
  { particle: 'in',   storageKey: 'shutIn_section_expanded',   storageKeyPrefix: 'shutIn',   meanings: inMeanings },
  { particle: 'off',  storageKey: 'shutOff_section_expanded',  storageKeyPrefix: 'shutOff',  meanings: offMeanings },
  { particle: 'out',  storageKey: 'shutOut_section_expanded',  storageKeyPrefix: 'shutOut',  meanings: outMeanings },
  { particle: 'up',   storageKey: 'shutUp_section_expanded',   storageKeyPrefix: 'shutUp',   meanings: upMeanings },
];

export default function ShutVerbPage() {
  return <VerbPageLayout title="Shut" sections={sections} />;
}
