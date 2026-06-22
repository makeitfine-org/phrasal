import VerbPageLayout, { MeaningData, SectionData } from '../../components/VerbPage';

const base = import.meta.env.BASE_URL;

const aboutMeanings: MeaningData[] = [
  {
    definition: 'To spend time doing nothing productive or useful.',
    example: 'Instead of looking for a new job, he just sits around the house all day.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person sitting around the house instead of looking for a new job',
  },
];

const backMeanings: MeaningData[] = [
  {
    definition: 'To relax in a chair.',
    example: 'Now that the software release is finished, we can sit back and relax.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Team sitting back and relaxing after finishing a software release',
  },
  {
    definition: 'To intentionally take no action when you should probably do something.',
    example: "A good manager doesn't just sit back while the team struggles with a project.",
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Manager not sitting back while the team struggles with a project',
  },
];

const byMeanings: MeaningData[] = [
  {
    definition: 'To fail to take action to stop something bad from happening.',
    example: 'I cannot sit by and let them make this terrible business decision.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person refusing to sit by and let a terrible business decision be made',
  },
];

const downMeanings: MeaningData[] = [
  {
    definition: 'To take a seat (literal).',
    example: 'Please sit down, the meeting will begin shortly.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person sitting down as the meeting is about to begin',
  },
  {
    definition: 'To have a serious conversation or a formal meeting with someone (sit down with).',
    example: 'We need to sit down with the client and discuss the new Java requirements.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Team sitting down with the client to discuss Java requirements',
  },
];

const forMeanings: MeaningData[] = [
  {
    definition: 'To take an official exam.',
    example: 'She is going to sit for her project management certification next month.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person sitting for a project management certification exam',
  },
  {
    definition: 'To pose for an artist or photographer.',
    example: 'The CEO sat for a professional portrait for the company website.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'CEO sitting for a professional portrait for the company website',
  },
  {
    definition: 'To take care of children while their parents are out (babysit).',
    example: 'My sister is sitting for my children tonight.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Sister sitting for children tonight while parents are out',
  },
];

const inMeanings: MeaningData[] = [
  {
    definition: 'To attend a meeting or class as an observer, rather than an active participant (sit in on).',
    example: 'As a junior developer, can I sit in on the architecture meeting to learn how it works?',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Junior developer sitting in on an architecture meeting to learn',
  },
  {
    definition: 'To temporarily replace someone and do their job (sit in for).',
    example: 'I will sit in for the team leader while she is on holiday.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person sitting in for the team leader while she is on holiday',
  },
  {
    definition: 'To occupy a building as a form of protest.',
    example: 'The workers decided to sit in at the factory until their demands were met.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Workers sitting in at the factory until their demands were met',
  },
];

const onMeanings: MeaningData[] = [
  {
    definition: 'To be an official member of a board or committee.',
    example: 'He sits on the board of directors for three different tech companies.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person sitting on the board of directors for three tech companies',
  },
  {
    definition: 'To delay making a decision or taking action on something.',
    example: 'The HR department has been sitting on my promotion request for weeks.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'HR department sitting on a promotion request for weeks',
  },
];

const outMeanings: MeaningData[] = [
  {
    definition: 'To choose not to participate in an activity.',
    example: "I don't know much about this part of the project, so I will sit this discussion out.",
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person sitting out a project discussion they know little about',
  },
  {
    definition: 'To wait patiently until a difficult or unpleasant situation finishes.',
    example: 'We just have to sit out the economic crisis and hope the market improves soon.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'People sitting out the economic crisis and hoping the market improves',
  },
];

const overMeanings: MeaningData[] = [
  {
    definition: 'To spend a long time doing something, usually eating or drinking, while having a conversation.',
    example: 'We sat over coffee for hours discussing the new business strategy.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'People sitting over coffee for hours discussing a business strategy',
  },
];

const throughMeanings: MeaningData[] = [
  {
    definition: 'To stay until the end of an event that is long, boring, or difficult.',
    example: 'I had to sit through a three-hour presentation on software compliance.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person sitting through a three-hour software compliance presentation',
  },
];

const upMeanings: MeaningData[] = [
  {
    definition: 'To move from a lying down position to a sitting position, or to sit straight.',
    example: 'You should sit up straight during your job interview.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person sitting up straight during a job interview',
  },
  {
    definition: 'To stay awake late into the night.',
    example: 'The developers sat up until 2 AM fixing bugs in the code.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Developers sitting up until 2 AM fixing bugs in the code',
  },
  {
    definition: 'To suddenly pay attention to something because it is surprising or important (sit up and take notice).',
    example: 'When sales dropped by 20%, the leadership team finally sat up and took notice.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Leadership team sitting up and taking notice after sales dropped by 20%',
  },
];

const withMeanings: MeaningData[] = [
  {
    definition: 'To be acceptable to someone, or to cause a certain feeling.',
    example: 'The new remote work policy does not sit well with the development team.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'New remote work policy not sitting well with the development team',
  },
  {
    definition: 'To spend time with someone who is upset or sick to give them support.',
    example: 'I sat with him after he heard that his project was canceled.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person sitting with a colleague after his project was canceled',
  },
];

export const sections: SectionData[] = [
  { particle: 'about / around / round', storageKey: 'sitAbout_section_expanded', storageKeyPrefix: 'sitAbout', meanings: aboutMeanings },
  { particle: 'back',                   storageKey: 'sitBack_section_expanded',  storageKeyPrefix: 'sitBack',  meanings: backMeanings },
  { particle: 'by',                     storageKey: 'sitBy_section_expanded',    storageKeyPrefix: 'sitBy',    meanings: byMeanings },
  { particle: 'down',                   storageKey: 'sitDown_section_expanded',  storageKeyPrefix: 'sitDown',  meanings: downMeanings },
  { particle: 'for',                    storageKey: 'sitFor_section_expanded',   storageKeyPrefix: 'sitFor',   meanings: forMeanings },
  { particle: 'in',                     storageKey: 'sitIn_section_expanded',    storageKeyPrefix: 'sitIn',    meanings: inMeanings },
  { particle: 'on',                     storageKey: 'sitOn_section_expanded',    storageKeyPrefix: 'sitOn',    meanings: onMeanings },
  { particle: 'out',                    storageKey: 'sitOut_section_expanded',   storageKeyPrefix: 'sitOut',   meanings: outMeanings },
  { particle: 'over',                   storageKey: 'sitOver_section_expanded',  storageKeyPrefix: 'sitOver',  meanings: overMeanings },
  { particle: 'through',                storageKey: 'sitThrough_section_expanded', storageKeyPrefix: 'sitThrough', meanings: throughMeanings },
  { particle: 'up',                     storageKey: 'sitUp_section_expanded',    storageKeyPrefix: 'sitUp',    meanings: upMeanings },
  { particle: 'with',                   storageKey: 'sitWith_section_expanded',  storageKeyPrefix: 'sitWith',  meanings: withMeanings },
];

export default function SitVerbPage() {
  return <VerbPageLayout title="Sit" sections={sections} />;
}
