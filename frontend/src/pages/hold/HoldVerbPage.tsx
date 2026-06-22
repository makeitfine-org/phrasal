import VerbPageLayout, { MeaningData, SectionData } from '../../components/VerbPage';

const base = import.meta.env.BASE_URL;

const againstMeanings: MeaningData[] = [
  {
    definition: 'To let a past mistake or negative action influence your opinion of someone; to hold a grudge.',
    example: 'The developer made a major error in the code, but the manager did not hold it against him during his performance review.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Manager not holding a code error against a developer during performance review',
  },
];

const backMeanings: MeaningData[] = [
  {
    definition: 'To hesitate to act or speak.',
    example: 'We need all your ideas for this project, so please do not hold back in the meeting.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Encouraging team members not to hold back their ideas in a meeting',
  },
  {
    definition: 'To stop something from moving forward, developing, or succeeding.',
    example: 'The team is highly skilled, but outdated legacy software is holding them back.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Legacy software holding back a skilled team',
  },
  {
    definition: 'To keep information a secret.',
    example: 'I suspect the client is holding back some details about their budget.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Client holding back budget details',
  },
];

const downMeanings: MeaningData[] = [
  {
    definition: 'To manage to keep a job for a period of time.',
    example: 'It requires excellent leadership skills to hold down a management position in such a fast-paced company.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Leader holding down a management position in a fast-paced company',
  },
  {
    definition: 'To keep costs, prices, or numbers at a low level.',
    example: 'We need to hold down our server costs this quarter to remain profitable.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Keeping server costs held down to remain profitable',
  },
  {
    definition: 'To physically prevent someone or something from moving.',
    example: 'The wind was so strong that we had to hold down the equipment.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Holding down equipment in strong wind',
  },
];

const inMeanings: MeaningData[] = [
  {
    definition: 'To hide or control your emotions.',
    example: 'The CEO was furious about the delayed release, but she managed to hold in her anger.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'CEO holding in anger about a delayed release',
  },
  {
    definition: 'To pull your stomach inwards.',
    example: 'He held his stomach in to look better in the photograph.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Holding stomach in for a photograph',
  },
];

const offMeanings: MeaningData[] = [
  {
    definition: 'To delay doing something.',
    example: 'We decided to hold off on deploying the new Java application until the testing phase was 100% complete.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Holding off on deploying a Java application until testing is complete',
  },
  {
    definition: 'To stop an opponent or competitor from defeating you.',
    example: 'The company managed to hold off its main competitors by launching a superior product.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Company holding off competitors by launching a superior product',
  },
];

const onMeanings: MeaningData[] = [
  {
    definition: 'To wait for a short time (often used on the phone).',
    example: 'Could you hold on a minute while I check the project schedule?',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Asking someone to hold on while checking the project schedule',
  },
  {
    definition: 'To survive in a difficult or dangerous situation.',
    example: 'The startup held on through the economic crisis and eventually became a market leader.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Startup holding on through an economic crisis',
  },
  {
    definition: 'To grip something tightly.',
    example: 'Hold on to the handrail so you do not fall on the stairs.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Holding on to the handrail to avoid falling on stairs',
  },
];

const outMeanings: MeaningData[] = [
  {
    definition: 'To continue to defend yourself or survive in a difficult situation.',
    example: 'The team held out against the pressure from the clients and delivered high-quality work.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Team holding out against client pressure to deliver quality work',
  },
  {
    definition: 'To offer a possibility, chance, or hope.',
    example: 'The new business strategy holds out hope for a better financial year.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'New business strategy holding out hope for a better financial year',
  },
  {
    definition: 'To extend a part of your body (like a hand) or an object.',
    example: 'She held out her hand to welcome the new employee.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Holding out a hand to welcome a new employee',
  },
  {
    definition: 'To wait and refuse to accept anything less than what you want (hold out for).',
    example: 'The senior developer is holding out for a higher salary before signing the contract.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Senior developer holding out for a higher salary before signing a contract',
  },
];

const overMeanings: MeaningData[] = [
  {
    definition: 'To postpone or delay an event or discussion until a later time.',
    example: 'We do not have enough time today, so we will hold over the architecture discussion until tomorrow\'s meeting.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Holding over an architecture discussion until the next meeting',
  },
  {
    definition: 'To allow someone to stay in a job or position longer than originally planned.',
    example: 'The outgoing director was held over for three months to help train the new leadership team.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Outgoing director held over to help train the new leadership team',
  },
];

const toMeanings: MeaningData[] = [
  {
    definition: 'To make someone keep a promise or follow a standard.',
    example: 'We agreed to deliver the software by Friday, and the client will hold us to that deadline.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Client holding the team to a Friday software delivery deadline',
  },
  {
    definition: 'To continue to believe an idea or follow a plan, even when it is difficult.',
    example: 'We must hold to our original business plan if we want to see long-term results.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Holding to the original business plan for long-term results',
  },
];

const togetherMeanings: MeaningData[] = [
  {
    definition: 'To remain united or to keep a group united.',
    example: 'A strong manager knows how to hold a team together during stressful project sprints.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Strong manager holding a team together during stressful project sprints',
  },
  {
    definition: 'To remain intact and not break into pieces.',
    example: 'The old database system is barely holding together; we need to replace it soon.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Old database system barely holding together',
  },
];

const upMeanings: MeaningData[] = [
  {
    definition: 'To delay someone or something.',
    example: 'A critical bug in the code is holding up the entire product release.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Critical bug holding up the entire product release',
  },
  {
    definition: 'To remain strong, successful, or true when tested.',
    example: 'Their argument sounded good at first, but it did not hold up under close examination.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Argument not holding up under close examination',
  },
  {
    definition: 'To support the weight of something.',
    example: 'These concrete pillars hold up the entire roof of the building.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Concrete pillars holding up the roof of a building',
  },
  {
    definition: 'To rob a bank, shop, or person using violence or a weapon.',
    example: 'The thieves tried to hold up the security van.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Thieves attempting to hold up a security van',
  },
];

const withMeanings: MeaningData[] = [
  {
    definition: 'To approve of an idea or activity (almost always used in the negative).',
    example: 'I do not hold with micromanaging experienced developers; they work better with independence.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Not holding with micromanaging experienced developers',
  },
];

export const sections: SectionData[] = [
  { particle: 'against',   storageKey: 'holdAgainst_section_expanded',   storageKeyPrefix: 'holdAgainst',   meanings: againstMeanings },
  { particle: 'back',      storageKey: 'holdBack_section_expanded',      storageKeyPrefix: 'holdBack',      meanings: backMeanings },
  { particle: 'down',      storageKey: 'holdDown_section_expanded',      storageKeyPrefix: 'holdDown',      meanings: downMeanings },
  { particle: 'in',        storageKey: 'holdIn_section_expanded',        storageKeyPrefix: 'holdIn',        meanings: inMeanings },
  { particle: 'off',       storageKey: 'holdOff_section_expanded',       storageKeyPrefix: 'holdOff',       meanings: offMeanings },
  { particle: 'on',        storageKey: 'holdOn_section_expanded',        storageKeyPrefix: 'holdOn',        meanings: onMeanings },
  { particle: 'out',       storageKey: 'holdOut_section_expanded',       storageKeyPrefix: 'holdOut',       meanings: outMeanings },
  { particle: 'over',      storageKey: 'holdOver_section_expanded',      storageKeyPrefix: 'holdOver',      meanings: overMeanings },
  { particle: 'to',        storageKey: 'holdTo_section_expanded',        storageKeyPrefix: 'holdTo',        meanings: toMeanings },
  { particle: 'together',  storageKey: 'holdTogether_section_expanded',  storageKeyPrefix: 'holdTogether',  meanings: togetherMeanings },
  { particle: 'up',        storageKey: 'holdUp_section_expanded',        storageKeyPrefix: 'holdUp',        meanings: upMeanings },
  { particle: 'with',      storageKey: 'holdWith_section_expanded',      storageKeyPrefix: 'holdWith',      meanings: withMeanings },
];

export default function HoldVerbPage() {
  return <VerbPageLayout title="Hold" sections={sections} />;
}
