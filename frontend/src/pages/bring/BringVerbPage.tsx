import VerbPageLayout, { MeaningData, SectionData } from '../../components/VerbPage';

const base = import.meta.env.BASE_URL;

const aboutMeanings: MeaningData[] = [
  {
    definition: 'To cause something to happen.',
    example: 'The new management structure brought about a massive improvement in team efficiency.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A management change bringing about improved team efficiency',
  },
  {
    definition: '(Nautical) To cause a ship to change direction.',
    example: 'The captain brought the ship about to avoid the storm.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A captain steering a ship around a storm',
  },
];

const aroundMeanings: MeaningData[] = [
  {
    definition: 'To persuade someone to agree with your point of view.',
    example: "He didn't want to use the new software at first, but we eventually brought him around.",
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Persuading a colleague to adopt new software',
  },
  {
    definition: 'To restore someone to consciousness.',
    example: 'She fainted from the heat, but a glass of cold water brought her round.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Reviving someone who fainted from heat',
  },
  {
    definition: 'To bring someone or something to a place (like a home).',
    example: "I'll bring the documents round to your apartment this evening.",
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Delivering documents to someone\'s apartment',
  },
  {
    definition: 'To gradually introduce a specific topic into a conversation.',
    example: 'After chatting about the weather, she smoothly brought the conversation around to the job offer.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Steering a conversation toward a job offer',
  },
];

const awayMeanings: MeaningData[] = [
  {
    definition: 'To learn or gain an impression, memory, or lesson from an experience.',
    example: 'The main insight I brought away from the tech conference was how heavily AI will impact sourcing.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Taking away key insights from a tech conference',
  },
];

const backMeanings: MeaningData[] = [
  {
    definition: 'To return something to its original place or owner.',
    example: 'Please bring back the laptop when you finish the presentation.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Returning a laptop after a presentation',
  },
  {
    definition: 'To cause someone to remember something from the past.',
    example: 'Walking through my old university campus really brought back memories.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Revisiting a university campus bringing back memories',
  },
  {
    definition: 'To reintroduce something or start doing something again.',
    example: 'The company decided to bring back the remote work policy.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A company reintroducing a remote work policy',
  },
];

const byMeanings: MeaningData[] = [
  {
    definition: 'To visit someone briefly in order to deliver something.',
    example: "I'll bring the signed contracts by the office tomorrow morning.",
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Dropping off signed contracts at an office',
  },
];

const downMeanings: MeaningData[] = [
  {
    definition: 'To reduce a level, rate, or amount.',
    example: 'We need to bring down our time-to-hire metric this quarter.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Reducing the time-to-hire metric in a company',
  },
  {
    definition: 'To cause a government or leader to lose power.',
    example: 'The financial scandal eventually brought down the prime minister.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A financial scandal bringing down a prime minister',
  },
  {
    definition: 'To make someone feel sad, depressed, or less energetic.',
    example: 'This endless rainy weather is really bringing me down.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Rainy weather bringing someone down emotionally',
  },
  {
    definition: 'To cause an aircraft or an animal to fall to the ground.',
    example: 'The pilot safely brought down the plane despite the engine failure.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A pilot safely landing a plane with engine failure',
  },
];

const forwardMeanings: MeaningData[] = [
  {
    definition: 'To change the date or time of an event so that it happens earlier.',
    example: 'Because of a scheduling conflict, the interview was brought forward to 10:00 AM.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Moving an interview to an earlier time',
  },
  {
    definition: 'To introduce a plan, proposal, or argument for discussion.',
    example: 'The team brought forward several excellent ideas during the brainstorming session.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A team proposing ideas during a brainstorming session',
  },
  {
    definition: '(Accounting) To transfer a total from the bottom of one page to the top of the next.',
    example: 'The balance of $5,000 was brought forward to the new ledger.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Transferring a balance to a new ledger page',
  },
];

const inMeanings: MeaningData[] = [
  {
    definition: 'To involve someone new in a project or situation (often an expert).',
    example: 'We had to bring in a senior DevOps consultant to fix the server architecture.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Bringing in a DevOps consultant to fix server issues',
  },
  {
    definition: 'To earn or produce money.',
    example: 'Her freelance coding projects bring in an extra $2,000 a month.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Freelance coding projects generating extra income',
  },
  {
    definition: 'To introduce a new law, rule, or system.',
    example: 'The government is bringing in stricter data privacy regulations.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A government introducing stricter data privacy laws',
  },
  {
    definition: 'To take someone to a police station for questioning or arrest.',
    example: 'The police brought him in for questioning.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Police bringing a suspect in for questioning',
  },
  {
    definition: '(Legal) To yield or announce a verdict in court.',
    example: 'The jury brought in a verdict of not guilty.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A jury delivering a not guilty verdict in court',
  },
];

const intoMeanings: MeaningData[] = [
  {
    definition: 'To cause someone or something to become involved in a specific situation, state, or condition.',
    example: "Please don't bring me into your argument.",
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Being dragged into someone else\'s argument',
  },
];

const offMeanings: MeaningData[] = [
  {
    definition: 'To succeed in doing something very difficult, often unexpectedly.',
    example: 'Negotiating that salary package with a tight budget was tough, but she brought it off beautifully.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Successfully negotiating a salary package under budget pressure',
  },
];

const onMeanings: MeaningData[] = [
  {
    definition: 'To cause something to happen (usually something negative, like an illness or bad situation).',
    example: 'I think the sudden change in weather brought on my cold.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Weather change bringing on a cold',
  },
  {
    definition: 'To help someone develop or improve, especially in their career or skills.',
    example: 'The senior manager really brought the junior recruiters on over the last year.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A senior manager developing junior recruiters',
  },
  {
    definition: 'To send a player onto the field during a sports match.',
    example: 'The coach brought on a substitute striker in the 80th minute.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A coach sending on a substitute striker',
  },
  {
    definition: 'Used as an exclamation ("Bring it on!") to show you are prepared for a challenge.',
    example: 'Another difficult technical assessment to evaluate? Bring it on!',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Someone confidently accepting a difficult challenge',
  },
];

const outMeanings: MeaningData[] = [
  {
    definition: 'To produce a new product and start selling it, or to publish something.',
    example: 'Apple is bringing out a new iPhone model in September.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Apple launching a new iPhone model',
  },
  {
    definition: 'To highlight or make a particular quality noticeable.',
    example: 'The behavioral interview questions really brought out her leadership qualities.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Interview questions bringing out leadership qualities',
  },
  {
    definition: 'To cause a physical reaction on the skin (like a rash).',
    example: 'Eating strawberries always brings me out in a rash.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Strawberries causing a skin rash',
  },
  {
    definition: '(Bring someone out of their shell) To make a shy person more confident.',
    example: 'Working closely with a team really brought him out of his shell.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Teamwork bringing a shy person out of their shell',
  },
];

const overMeanings: MeaningData[] = [
  {
    definition: 'To bring someone or something from one place to another (especially to someone\'s home).',
    example: "I'll bring over my notes so we can study English grammar together.",
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Bringing notes over to study together',
  },
  {
    definition: 'To persuade someone to change to your side or opinion (similar to bring around).',
    example: 'We managed to bring the hesitant candidate over to our side with a better relocation package.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Persuading a hesitant candidate with a better offer',
  },
];

const throughMeanings: MeaningData[] = [
  {
    definition: 'To help someone successfully survive a very difficult, dangerous, or life-threatening situation.',
    example: 'The incredible medical team brought him through the surgery safely.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A medical team successfully guiding a patient through surgery',
  },
];

const toMeanings: MeaningData[] = [
  {
    definition: 'To make someone conscious again after they have fainted.',
    example: 'The paramedics used smelling salts to bring him to.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Paramedics reviving someone with smelling salts',
  },
  {
    definition: 'To reach a mathematical total.',
    example: 'The latest hires bring our total headcount to 150 employees.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'New hires bringing company headcount to 150',
  },
];

const togetherMeanings: MeaningData[] = [
  {
    definition: 'To help people or groups to become friendly, collaborate, or unite.',
    example: 'The project brought together software developers from all over Europe.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A project uniting software developers from across Europe',
  },
];

const upMeanings: MeaningData[] = [
  {
    definition: 'To care for and raise a child until they are an adult.',
    example: 'She was brought up in a bilingual household.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A child being raised in a bilingual household',
  },
  {
    definition: 'To mention a subject or start talking about a specific topic.',
    example: 'Make sure you bring up the remote work options during the first interview.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Mentioning remote work options in a job interview',
  },
  {
    definition: 'To make something appear on a computer screen.',
    example: "Let me just bring up his GitHub repository so we can review his code.",
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Bringing up a GitHub repository on a computer screen',
  },
  {
    definition: 'To vomit.',
    example: 'He ate some bad seafood and brought up his dinner.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Someone feeling ill after eating bad seafood',
  },
];

export const sections: SectionData[] = [
  { particle: 'about',          storageKey: 'bringAbout_section_expanded',   storageKeyPrefix: 'bringAbout',   meanings: aboutMeanings },
  { particle: 'around / round', storageKey: 'bringAround_section_expanded',  storageKeyPrefix: 'bringAround',  meanings: aroundMeanings },
  { particle: 'away',           storageKey: 'bringAway_section_expanded',    storageKeyPrefix: 'bringAway',    meanings: awayMeanings },
  { particle: 'back',           storageKey: 'bringBack_section_expanded',    storageKeyPrefix: 'bringBack',    meanings: backMeanings },
  { particle: 'by',             storageKey: 'bringBy_section_expanded',      storageKeyPrefix: 'bringBy',      meanings: byMeanings },
  { particle: 'down',           storageKey: 'bringDown_section_expanded',    storageKeyPrefix: 'bringDown',    meanings: downMeanings },
  { particle: 'forward',        storageKey: 'bringForward_section_expanded', storageKeyPrefix: 'bringForward', meanings: forwardMeanings },
  { particle: 'in',             storageKey: 'bringIn_section_expanded',      storageKeyPrefix: 'bringIn',      meanings: inMeanings },
  { particle: 'into',           storageKey: 'bringInto_section_expanded',    storageKeyPrefix: 'bringInto',    meanings: intoMeanings },
  { particle: 'off',            storageKey: 'bringOff_section_expanded',     storageKeyPrefix: 'bringOff',     meanings: offMeanings },
  { particle: 'on',             storageKey: 'bringOn_section_expanded',      storageKeyPrefix: 'bringOn',      meanings: onMeanings },
  { particle: 'out',            storageKey: 'bringOut_section_expanded',     storageKeyPrefix: 'bringOut',     meanings: outMeanings },
  { particle: 'over',           storageKey: 'bringOver_section_expanded',    storageKeyPrefix: 'bringOver',    meanings: overMeanings },
  { particle: 'through',        storageKey: 'bringThrough_section_expanded', storageKeyPrefix: 'bringThrough', meanings: throughMeanings },
  { particle: 'to',             storageKey: 'bringTo_section_expanded',      storageKeyPrefix: 'bringTo',      meanings: toMeanings },
  { particle: 'together',       storageKey: 'bringTogether_section_expanded',storageKeyPrefix: 'bringTogether',meanings: togetherMeanings },
  { particle: 'up',             storageKey: 'bringUp_section_expanded',      storageKeyPrefix: 'bringUp',      meanings: upMeanings },
];

export default function BringVerbPage() {
  return <VerbPageLayout title="Bring" sections={sections} />;
}
