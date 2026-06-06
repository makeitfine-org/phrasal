import VerbPageLayout, { MeaningData, SectionData } from '../../components/VerbPage';

const base = import.meta.env.BASE_URL;

const aboutMeanings: MeaningData[] = [
  {
    definition: 'To happen or occur, especially in a way that is not planned',
    example: 'How did this bug in the Java code come about?',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A developer wondering how a bug appeared',
  },
];

const acrossMeanings: MeaningData[] = [
  {
    definition: 'To find or meet something or someone by chance',
    example: 'I came across an excellent article on Agile leadership yesterday.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A developer finding an article by chance',
  },
  {
    definition: 'To give a specific impression to others',
    example: 'She comes across as a very confident and capable manager.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A confident manager presenting to a team',
  },
];

const afterMeanings: MeaningData[] = [
  {
    definition: 'To chase or pursue someone (often to punish them or take something)',
    example: "If we break the NDA, the client's legal team will come after us.",
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A legal team pursuing someone',
  },
  {
    definition: 'To follow in time or order',
    example: 'Phase two of the project comes after the initial testing.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A project timeline showing phases in order',
  },
];

const againstMeanings: MeaningData[] = [
  {
    definition: 'To face a difficult problem or strong opposition (come up against)',
    example: 'We came up against several security issues during deployment.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A team facing security issues during deployment',
  },
];

const aheadMeanings: MeaningData[] = [
  {
    definition: 'To finish in a winning, profitable, or advantageous position (come out ahead)',
    example: 'Despite the economic crisis, our company came out ahead of the competition.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A company finishing ahead of competitors',
  },
];

const apartMeanings: MeaningData[] = [
  {
    definition: 'To break into pieces or fail completely',
    example: 'The legacy system is so old that its architecture is starting to come apart.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A legacy system architecture breaking apart',
  },
];

const aroundMeanings: MeaningData[] = [
  {
    definition: 'To change your opinion to agree with someone else',
    example: "He didn't like the new Java framework at first, but he came around after seeing the performance tests.",
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A developer changing their opinion about a framework',
  },
  {
    definition: 'To visit someone at their home or desk',
    example: 'The CEO is coming around to our department later this afternoon.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A CEO visiting a department',
  },
  {
    definition: 'To regain consciousness (wake up after fainting)',
    example: 'He fainted from the heat, but he came round quickly.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A person regaining consciousness after fainting',
  },
];

const awayMeanings: MeaningData[] = [
  {
    definition: 'To leave a place or situation with a specific feeling, idea, or result',
    example: 'I came away from the strategy meeting feeling very optimistic about Q3.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A person leaving a meeting feeling optimistic',
  },
  {
    definition: 'To separate or detach from something',
    example: 'The back cover of the laptop just came away in my hands.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A laptop cover detaching unexpectedly',
  },
];

const backMeanings: MeaningData[] = [
  {
    definition: 'To return to a place, state, or topic',
    example: "Let's come back to the budget discussion after lunch.",
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A team returning to a budget discussion',
  },
  {
    definition: 'To become popular or fashionable again',
    example: 'Older, hierarchical management styles are not likely to come back.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'An old management style returning',
  },
];

const behindMeanings: MeaningData[] = [
  {
    definition: 'To follow closely or to rank lower than something else in a list',
    example: 'In the market share report, our main product comes behind theirs.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A product ranking lower in a market share report',
  },
];

const byMeanings: MeaningData[] = [
  {
    definition: 'To get or obtain something, especially something that is rare or hard to find',
    example: 'Experienced Senior Java Developers are hard to come by these days.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A recruiter searching for a rare senior developer',
  },
  {
    definition: 'To make a short, casual visit',
    example: 'Please come by my office when you have a moment.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A person making a short visit to an office',
  },
];

const downMeanings: MeaningData[] = [
  {
    definition: 'To fall or decrease (prices, levels, etc.)',
    example: 'Our cloud hosting costs have finally come down this month.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A graph showing decreasing cloud hosting costs',
  },
  {
    definition: 'To make a firm decision or support a specific side',
    example: 'The leadership team came down on the side of investing in AI.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A leadership team deciding to invest in AI',
  },
];

const forMeanings: MeaningData[] = [
  {
    definition: 'To arrive in order to collect someone or something',
    example: 'The courier will come for the signed contracts at 3:00 PM.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A courier arriving to collect signed contracts',
  },
];

const forwardMeanings: MeaningData[] = [
  {
    definition: 'To offer help, information, or take responsibility',
    example: 'We need two volunteers to come forward and lead the new internal project.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Volunteers stepping forward to lead a project',
  },
];

const inMeanings: MeaningData[] = [
  {
    definition: 'To enter a room or building',
    example: 'Please come in and take a seat.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A person entering a room',
  },
  {
    definition: 'To become relevant or involved in a situation',
    example: 'The backend is finished, so this is where the frontend team comes in.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A frontend team becoming involved in a project',
  },
  {
    definition: 'To arrive (news, money, results)',
    example: 'The Q2 revenue reports just came in.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Q2 revenue reports arriving',
  },
];

const intoMeanings: MeaningData[] = [
  {
    definition: 'To inherit money or property',
    example: 'He came into a lot of money and started his own software firm.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A person inheriting money to start a software firm',
  },
  {
    definition: 'To become a factor or take effect',
    example: 'When designing this application, data privacy regulations must come into play.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Data privacy regulations coming into effect',
  },
];

const offMeanings: MeaningData[] = [
  {
    definition: 'To happen successfully or go exactly as planned',
    example: 'The software launch came off without a single major bug.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A successful software launch',
  },
  {
    definition: 'To detach or be removed from something',
    example: "The label came off the server box, so we don't know the serial number.",
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A label detaching from a server box',
  },
];

const onMeanings: MeaningData[] = [
  {
    definition: 'To start functioning (machines, systems, lights)',
    example: 'When the power failed, the backup servers came on automatically.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Backup servers starting automatically after a power failure',
  },
  {
    definition: 'To make progress or improve',
    example: "The junior developer's coding skills are really coming on.",
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A junior developer improving their coding skills',
  },
  {
    definition: 'Used to encourage someone to hurry up, try harder, or stop being unreasonable',
    example: 'Come on, we can finish this sprint today if we focus!',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A team being encouraged to finish a sprint',
  },
];

const outMeanings: MeaningData[] = [
  {
    definition: 'To be published, released, or made available to the public',
    example: 'The next version of the Java Development Kit comes out next month.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A new version of the Java Development Kit being released',
  },
  {
    definition: 'To become known (often secrets or truth)',
    example: 'It eventually came out that the project was severely underfunded.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'The truth about an underfunded project coming out',
  },
  {
    definition: 'To be removed (like a stain)',
    example: "The coffee stain won't come out of the carpet.",
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A coffee stain on a carpet that will not come out',
  },
];

const overMeanings: MeaningData[] = [
  {
    definition: "To visit someone's house, office, or country",
    example: 'The regional manager is coming over from London next week.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A regional manager traveling from London for a visit',
  },
  {
    definition: 'To affect someone suddenly with a strong feeling',
    example: 'A sudden wave of panic came over him before his presentation to the board.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A person overwhelmed by panic before a board presentation',
  },
];

const throughMeanings: MeaningData[] = [
  {
    definition: 'To successfully complete or survive a difficult situation',
    example: 'Thanks to strong leadership, the company came through the financial crisis.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A company surviving a financial crisis',
  },
  {
    definition: 'To deliver what was promised or expected',
    example: 'The engineering team came through with the bug fix right before the deadline.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'An engineering team delivering a bug fix on time',
  },
  {
    definition: 'To be approved or to arrive (official documents, messages)',
    example: 'My visa approval finally came through.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A visa approval document arriving',
  },
];

const toMeanings: MeaningData[] = [
  {
    definition: 'To reach a total amount',
    example: 'The total cost for the new software licenses comes to $15,000.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A bill for software licenses totalling $15,000',
  },
  {
    definition: 'To reach a state, decision, or situation',
    example: 'After hours of negotiation, we finally came to an agreement.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A team reaching an agreement after negotiation',
  },
  {
    definition: 'To regain consciousness',
    example: 'When he came to in the hospital, he asked for his laptop.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A person regaining consciousness in hospital',
  },
  {
    definition: 'Concerning a specific topic (when it comes to)',
    example: 'When it comes to team management, communication is the most important skill.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A team discussing management and communication',
  },
];

const togetherMeanings: MeaningData[] = [
  {
    definition: 'To unite as a group for a common purpose',
    example: 'The entire IT department came together to resolve the server outage.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'An IT department uniting to resolve a server outage',
  },
  {
    definition: 'To begin to form a coherent, successful whole',
    example: 'After weeks of messy coding, the final application is finally coming together.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'An application coming together after weeks of development',
  },
];

const upMeanings: MeaningData[] = [
  {
    definition: 'To be mentioned or discussed in conversation',
    example: 'The topic of remote work came up during the board meeting.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Remote work being discussed at a board meeting',
  },
  {
    definition: 'To happen unexpectedly (often causing a problem)',
    example: "I have to cancel our 1-on-1 meeting; something urgent has come up.",
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'An urgent issue coming up unexpectedly',
  },
  {
    definition: 'To approach in time',
    example: 'We need to prepare; the final project deadline is coming up fast.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A project deadline approaching fast',
  },
];

const withMeanings: MeaningData[] = [
  {
    definition: 'To be included as part of a product, package, or deal',
    example: 'The enterprise software license comes with 24/7 technical support.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'An enterprise software license with technical support included',
  },
];

const withoutMeanings: MeaningData[] = [
  {
    definition: 'To lack a feature or item that is normally included',
    example: 'The basic version of the app comes without the advanced analytics dashboard.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A basic app version missing the analytics dashboard',
  },
];

const sections: SectionData[] = [
  { particle: 'about', storageKey: 'comeAbout_section_expanded', storageKeyPrefix: 'comeAbout', meanings: aboutMeanings },
  { particle: 'across', storageKey: 'comeAcross_section_expanded', storageKeyPrefix: 'comeAcross', meanings: acrossMeanings },
  { particle: 'after', storageKey: 'comeAfter_section_expanded', storageKeyPrefix: 'comeAfter', meanings: afterMeanings },
  { particle: 'against', storageKey: 'comeAgainst_section_expanded', storageKeyPrefix: 'comeAgainst', meanings: againstMeanings },
  { particle: 'ahead', storageKey: 'comeAhead_section_expanded', storageKeyPrefix: 'comeAhead', meanings: aheadMeanings },
  { particle: 'apart', storageKey: 'comeApart_section_expanded', storageKeyPrefix: 'comeApart', meanings: apartMeanings },
  { particle: 'around / round', storageKey: 'comeAround_section_expanded', storageKeyPrefix: 'comeAround', meanings: aroundMeanings },
  { particle: 'away', storageKey: 'comeAway_section_expanded', storageKeyPrefix: 'comeAway', meanings: awayMeanings },
  { particle: 'back', storageKey: 'comeBack_section_expanded', storageKeyPrefix: 'comeBack', meanings: backMeanings },
  { particle: 'behind', storageKey: 'comeBehind_section_expanded', storageKeyPrefix: 'comeBehind', meanings: behindMeanings },
  { particle: 'by', storageKey: 'comeBy_section_expanded', storageKeyPrefix: 'comeBy', meanings: byMeanings },
  { particle: 'down', storageKey: 'comeDown_section_expanded', storageKeyPrefix: 'comeDown', meanings: downMeanings },
  { particle: 'for', storageKey: 'comeFor_section_expanded', storageKeyPrefix: 'comeFor', meanings: forMeanings },
  { particle: 'forward', storageKey: 'comeForward_section_expanded', storageKeyPrefix: 'comeForward', meanings: forwardMeanings },
  { particle: 'in', storageKey: 'comeIn_section_expanded', storageKeyPrefix: 'comeIn', meanings: inMeanings },
  { particle: 'into', storageKey: 'comeInto_section_expanded', storageKeyPrefix: 'comeInto', meanings: intoMeanings },
  { particle: 'off', storageKey: 'comeOff_section_expanded', storageKeyPrefix: 'comeOff', meanings: offMeanings },
  { particle: 'on', storageKey: 'comeOn_section_expanded', storageKeyPrefix: 'comeOn', meanings: onMeanings },
  { particle: 'out', storageKey: 'comeOut_section_expanded', storageKeyPrefix: 'comeOut', meanings: outMeanings },
  { particle: 'over', storageKey: 'comeOver_section_expanded', storageKeyPrefix: 'comeOver', meanings: overMeanings },
  { particle: 'through', storageKey: 'comeThrough_section_expanded', storageKeyPrefix: 'comeThrough', meanings: throughMeanings },
  { particle: 'to', storageKey: 'comeTo_section_expanded', storageKeyPrefix: 'comeTo', meanings: toMeanings },
  { particle: 'together', storageKey: 'comeTogether_section_expanded', storageKeyPrefix: 'comeTogether', meanings: togetherMeanings },
  { particle: 'up', storageKey: 'comeUp_section_expanded', storageKeyPrefix: 'comeUp', meanings: upMeanings },
  { particle: 'with', storageKey: 'comeWith_section_expanded', storageKeyPrefix: 'comeWith', meanings: withMeanings },
  { particle: 'without', storageKey: 'comeWithout_section_expanded', storageKeyPrefix: 'comeWithout', meanings: withoutMeanings },
];

export default function ComeVerbPage() {
  return <VerbPageLayout title="Come" sections={sections} />;
}
