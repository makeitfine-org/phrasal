import VerbPageLayout, { MeaningData, SectionData } from '../../components/VerbPage';

const base = import.meta.env.BASE_URL;

const aboutMeanings: MeaningData[] = [
  {
    definition: 'To keep something near you because it might be useful.',
    example: 'I always keep a pen around just in case I need to take notes.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Keeping a pen around in case notes are needed',
  },
  {
    definition: 'To continue to associate with someone or let them stay in a group or company.',
    example: 'He isn\'t very productive, so I don\'t know why they keep him around.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Keeping an unproductive person around in a company',
  },
];

const acrossMeanings: MeaningData[] = [
  {
    definition: 'To stay informed about a situation or topic (mainly British English).',
    example: 'As a project manager, I need to keep across all the software updates.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Project manager keeping across all software updates',
  },
];

const afterMeanings: MeaningData[] = [
  {
    definition: 'To repeatedly remind or nag someone to do something (mainly US English).',
    example: 'I have to keep after my team to submit their timesheets on Friday.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Manager keeping after team to submit timesheets',
  },
];

const aheadMeanings: MeaningData[] = [
  {
    definition: 'To stay in front of others or stay more advanced than competitors.',
    example: 'To succeed in business, you must innovate to keep ahead of your rivals.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Business innovating to keep ahead of rivals',
  },
];

const apartMeanings: MeaningData[] = [
  {
    definition: 'To prevent people, animals, or things from coming together.',
    example: 'The two dogs were fighting, so we had to keep them apart.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Keeping two fighting dogs apart',
  },
  {
    definition: 'To stay away from each other.',
    example: 'The two rival teams were told to keep apart before the match.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Rival teams told to keep apart before a match',
  },
];

const awayMeanings: MeaningData[] = [
  {
    definition: 'To avoid going near something or someone.',
    example: 'You should keep away from that dog; it looks aggressive.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Keeping away from an aggressive-looking dog',
  },
  {
    definition: 'To prevent someone or something from going near.',
    example: 'Keep the children away from the hot stove.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Keeping children away from a hot stove',
  },
];

const backMeanings: MeaningData[] = [
  {
    definition: 'To stay at a safe distance, or make someone stay back.',
    example: 'The police told the crowd to keep back from the accident.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Police telling crowd to keep back from an accident',
  },
  {
    definition: 'To hide information; to not tell someone everything you know.',
    example: 'I feel like the client is keeping something back from us.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Client keeping information back from the team',
  },
  {
    definition: 'To stop yourself from showing an emotion.',
    example: 'She struggled to keep back her tears during the sad movie.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person struggling to keep back tears during a sad movie',
  },
];

const behindMeanings: MeaningData[] = [
  {
    definition: 'To stay in a place after everyone else has left.',
    example: 'I kept behind after the meeting to ask the speaker a question.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Staying behind after a meeting to ask the speaker a question',
  },
  {
    definition: 'To make someone stay after others have left.',
    example: 'The manager kept me behind to discuss my performance.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Manager keeping an employee behind to discuss performance',
  },
];

const downMeanings: MeaningData[] = [
  {
    definition: 'To stop the number, level, or size of something from increasing.',
    example: 'We need to keep our expenses down this quarter.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Keeping expenses down during the quarter',
  },
  {
    definition: 'To manage to keep food or medicine in your stomach without vomiting.',
    example: 'He was so sick that he couldn\'t keep any water down.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Sick person unable to keep any water down',
  },
  {
    definition: 'To stay hidden by crouching or lying flat.',
    example: 'Keep down! I don\'t want anyone to see us.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Crouching down to stay hidden from view',
  },
  {
    definition: 'To prevent a person or group of people from having power or freedom.',
    example: 'The corrupt government tried to keep the citizens down.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Corrupt government trying to keep citizens from having power',
  },
];

const inMeanings: MeaningData[] = [
  {
    definition: 'To make someone stay inside as a punishment.',
    example: 'The teacher kept him in after school because he didn\'t do his homework.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Teacher keeping a student in after school as punishment',
  },
  {
    definition: 'To control or hide an emotion.',
    example: 'She was very angry but managed to keep her feelings in.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person managing to keep their feelings in despite being angry',
  },
  {
    definition: 'To prevent a fire from dying out.',
    example: 'Add some more wood to keep the fire in.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Adding wood to keep a fire burning',
  },
];

const offMeanings: MeaningData[] = [
  {
    definition: 'To avoid touching or walking on something.',
    example: 'Please keep off the grass while the park is being maintained.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Sign asking people to keep off the grass during maintenance',
  },
  {
    definition: 'To avoid mentioning or discussing a specific topic.',
    example: 'Let\'s keep off the subject of politics during the meeting.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Keeping off the subject of politics during a meeting',
  },
  {
    definition: 'To prevent something from touching or harming something else.',
    example: 'Use this spray to keep the bugs off your plants.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Using spray to keep bugs off plants',
  },
  {
    definition: 'To avoid eating, drinking, or using something.',
    example: 'I am trying to keep off sugar to improve my health.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person trying to keep off sugar to improve health',
  },
];

const onMeanings: MeaningData[] = [
  {
    definition: 'To continue doing something.',
    example: 'Even though the project was difficult, the team kept on working.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Team keeping on working despite a difficult project',
  },
  {
    definition: 'To continue to employ someone.',
    example: 'The company decided to keep him on as a consultant after he retired.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Company keeping a retired employee on as a consultant',
  },
  {
    definition: 'To leave a piece of clothing on your body.',
    example: 'It\'s cold in here, so I will keep my jacket on.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Keeping a jacket on because it is cold',
  },
  {
    definition: 'To repeatedly remind or complain to someone.',
    example: 'My manager keeps on at me to finish the financial report.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Manager repeatedly reminding an employee to finish the financial report',
  },
];

const outMeanings: MeaningData[] = [
  {
    definition: 'To not enter a place, or to stop someone or something from entering.',
    example: 'There is a sign on the door that says \'Danger: Keep Out.\'',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Danger: Keep Out sign on a door',
  },
  {
    definition: 'To stay away from a problem, argument, or situation.',
    example: 'This is a private argument, so please keep out of it.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Staying out of a private argument',
  },
];

const toMeanings: MeaningData[] = [
  {
    definition: 'To follow a plan, rule, or agreement.',
    example: 'We have a tight deadline, so let\'s keep to the schedule.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Team keeping to the schedule due to a tight deadline',
  },
  {
    definition: 'To limit something to a certain amount.',
    example: 'Please keep your presentation to ten minutes.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Keeping a presentation to ten minutes',
  },
  {
    definition: 'To stay on a particular path or road.',
    example: 'When hiking in the forest, always keep to the marked trail.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Hiker keeping to the marked trail in a forest',
  },
  {
    definition: 'To avoid talking to other people; to stay private.',
    example: 'He is very shy and mostly keeps to himself at the office.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Shy person keeping to himself at the office',
  },
];

const togetherMeanings: MeaningData[] = [
  {
    definition: 'To stay in a group and not separate.',
    example: 'We need to keep together so we don\'t get lost in the city.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Group keeping together to avoid getting lost in the city',
  },
  {
    definition: 'To not break apart or fall to pieces.',
    example: 'I hope my old laptop keeps together until I can buy a new one.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Old laptop barely keeping together',
  },
];

const upMeanings: MeaningData[] = [
  {
    definition: 'To move at the same speed as someone or something else.',
    example: 'The software industry changes so fast that it\'s hard to keep up.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Struggling to keep up with fast-changing software industry',
  },
  {
    definition: 'To continue doing something at a high level.',
    example: 'You are doing a great job — keep up the good work!',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Encouraging someone to keep up the good work',
  },
  {
    definition: 'To stay awake, or to prevent someone from sleeping.',
    example: 'My neighbor\'s loud music kept me up all night.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Neighbor\'s loud music keeping someone up all night',
  },
  {
    definition: 'To maintain something in good condition.',
    example: 'It costs a lot of money to keep up such a large office building.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Maintaining a large office building in good condition',
  },
];

export const sections: SectionData[] = [
  { particle: 'about / around / round', storageKey: 'keepAbout_section_expanded',     storageKeyPrefix: 'keepAbout',     meanings: aboutMeanings },
  { particle: 'across',                 storageKey: 'keepAcross_section_expanded',     storageKeyPrefix: 'keepAcross',    meanings: acrossMeanings },
  { particle: 'after',                  storageKey: 'keepAfter_section_expanded',      storageKeyPrefix: 'keepAfter',     meanings: afterMeanings },
  { particle: 'ahead',                  storageKey: 'keepAhead_section_expanded',      storageKeyPrefix: 'keepAhead',     meanings: aheadMeanings },
  { particle: 'apart',                  storageKey: 'keepApart_section_expanded',      storageKeyPrefix: 'keepApart',     meanings: apartMeanings },
  { particle: 'away',                   storageKey: 'keepAway_section_expanded',       storageKeyPrefix: 'keepAway',      meanings: awayMeanings },
  { particle: 'back',                   storageKey: 'keepBack_section_expanded',       storageKeyPrefix: 'keepBack',      meanings: backMeanings },
  { particle: 'behind',                 storageKey: 'keepBehind_section_expanded',     storageKeyPrefix: 'keepBehind',    meanings: behindMeanings },
  { particle: 'down',                   storageKey: 'keepDown_section_expanded',       storageKeyPrefix: 'keepDown',      meanings: downMeanings },
  { particle: 'in',                     storageKey: 'keepIn_section_expanded',         storageKeyPrefix: 'keepIn',        meanings: inMeanings },
  { particle: 'off',                    storageKey: 'keepOff_section_expanded',        storageKeyPrefix: 'keepOff',       meanings: offMeanings },
  { particle: 'on',                     storageKey: 'keepOn_section_expanded',         storageKeyPrefix: 'keepOn',        meanings: onMeanings },
  { particle: 'out',                    storageKey: 'keepOut_section_expanded',        storageKeyPrefix: 'keepOut',       meanings: outMeanings },
  { particle: 'to',                     storageKey: 'keepTo_section_expanded',         storageKeyPrefix: 'keepTo',        meanings: toMeanings },
  { particle: 'together',               storageKey: 'keepTogether_section_expanded',   storageKeyPrefix: 'keepTogether',  meanings: togetherMeanings },
  { particle: 'up',                     storageKey: 'keepUp_section_expanded',         storageKeyPrefix: 'keepUp',        meanings: upMeanings },
];

export default function KeepVerbPage() {
  return <VerbPageLayout title="Keep" sections={sections} />;
}
