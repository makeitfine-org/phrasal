import VerbPageLayout, { MeaningData, SectionData } from '../../components/VerbPage';

const base = import.meta.env.BASE_URL;

const upMeanings: MeaningData[] = [
  {
    definition: 'To confuse two things or people by thinking that one person or thing is another because they are similar.',
    example: 'I always mix up the two brothers because they look exactly the same.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person confusing two brothers who look exactly the same',
  },
  {
    definition: 'To make a mixture by combining different ingredients.',
    example: 'Give me a few minutes, and I will mix up some pancake batter for breakfast.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person mixing up pancake batter for breakfast',
  },
  {
    definition: 'To do something differently to make it more interesting and less boring ("mix it up").',
    example: "We usually have our team meetings on Mondays, but let's mix it up and meet on Friday this week.",
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Team deciding to mix up their meeting schedule by switching from Monday to Friday',
  },
  {
    definition: 'To be connected to or involved in something illegal, dishonest, or complicated ("be mixed up in").',
    example: 'The manager was fired when the company discovered he was mixed up in financial fraud.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Manager being fired after being discovered mixed up in financial fraud',
  },
];

const inIntoMeanings: MeaningData[] = [
  {
    definition: 'To put a new substance into an existing mixture and stir it.',
    example: 'Add the sugar to the bowl and mix it in slowly.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person adding sugar to a bowl and mixing it in slowly',
  },
  {
    definition: 'To join a group of people and interact with them naturally.',
    example: 'The new employee tried to mix in with the rest of the team during the lunch break.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'New employee mixing in with the rest of the team during lunch break',
  },
];

const withMeanings: MeaningData[] = [
  {
    definition: 'To spend time talking to different people, usually at a social event or at work.',
    example: 'A good leader needs to be able to mix with people from all departments.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Good leader mixing with people from all departments',
  },
  {
    definition: 'To put two or more substances together.',
    example: 'Oil does not mix with water.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Oil and water that do not mix together',
  },
];

const togetherMeanings: MeaningData[] = [
  {
    definition: 'To blend two or more items so that they become a single substance or group.',
    example: 'In software development, you cannot easily mix together two completely different programming architectures.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Software developer unable to mix together two completely different programming architectures',
  },
];

const downMeanings: MeaningData[] = [
  {
    definition: 'In audio engineering and music production, to combine multiple individual sound tracks into one final stereo or mono track.',
    example: 'After recording the vocals and instruments, the sound engineer will mix down the project.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Sound engineer mixing down vocals and instruments into a final track',
  },
];

export const sections: SectionData[] = [
  { particle: 'up',       storageKey: 'mixUp_section_expanded',       storageKeyPrefix: 'mixUp',       meanings: upMeanings },
  { particle: 'in / into', storageKey: 'mixIn_section_expanded',      storageKeyPrefix: 'mixIn',       meanings: inIntoMeanings },
  { particle: 'with',     storageKey: 'mixWith_section_expanded',     storageKeyPrefix: 'mixWith',     meanings: withMeanings },
  { particle: 'together', storageKey: 'mixTogether_section_expanded', storageKeyPrefix: 'mixTogether', meanings: togetherMeanings },
  { particle: 'down',     storageKey: 'mixDown_section_expanded',     storageKeyPrefix: 'mixDown',     meanings: downMeanings },
];

export default function MixVerbPage() {
  return <VerbPageLayout title="Mix" sections={sections} />;
}
