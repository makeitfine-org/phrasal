import VerbPageLayout, { MeaningData, SectionData } from '../../components/VerbPage';

const base = import.meta.env.BASE_URL;

const offMeanings: MeaningData[] = [
  {
    definition: 'To explode or fire (a weapon or device)',
    example: 'The bomb went off in the city center.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'An explosion in a city center',
  },
  {
    definition: 'To make a sudden loud noise (an alarm)',
    example: 'My morning alarm went off at 6:00 AM.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'An alarm clock going off in the morning',
  },
  {
    definition: 'To stop working or power down',
    example: 'The lights went off during the storm.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Lights going off during a storm',
  },
  {
    definition: 'To spoil or go bad (food)',
    example: 'This milk smells like it has gone off.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Spoiled milk that has gone off',
  },
  {
    definition: 'To happen in a specific way',
    example: 'The software presentation went off without any problems.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A successful software presentation',
  },
  {
    definition: 'To stop liking someone or something',
    example: "I used to love Java, but I've gone off it recently.",
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A developer who has lost interest in Java',
  },
  {
    definition: 'To leave a place',
    example: 'The manager went off to a meeting.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A manager leaving for a meeting',
  },
];

const onMeanings: MeaningData[] = [
  {
    definition: 'To continue doing something',
    example: 'Please go on with your code explanation; I am listening.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A person continuing to explain something',
  },
  {
    definition: 'To happen or be taking place',
    example: 'What is going on in the server room?',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A server room with activity happening',
  },
  {
    definition: 'To start operating (power, lights, machines)',
    example: 'The backup generator went on automatically.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A backup generator starting up automatically',
  },
  {
    definition: 'To talk too much or at excessive length about something',
    example: 'He goes on and on about his leadership skills.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A person talking excessively about their leadership',
  },
  {
    definition: 'To proceed to do something next after completing a previous action',
    example: 'After fixing the bug, she went on to optimize the database.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A developer moving on to optimize the database',
  },
  {
    definition: 'To base an opinion or decision on something',
    example: "We don't have much data to go on.",
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A team lacking data to base a decision on',
  },
];

const upMeanings: MeaningData[] = [
  {
    definition: 'To increase or rise',
    example: 'Software licensing prices have gone up this year.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A graph showing rising software prices',
  },
  {
    definition: 'To be built or constructed',
    example: 'New office buildings are going up in the business district.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'New office buildings under construction',
  },
  {
    definition: 'To explode or catch fire',
    example: 'The old factory went up in flames.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A factory going up in flames',
  },
];

const downMeanings: MeaningData[] = [
  {
    definition: 'To decrease or fall',
    example: 'Our server error rates went down last month.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A graph showing decreasing server error rates',
  },
  {
    definition: 'To stop working (computers or systems)',
    example: 'The entire network went down for two hours.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A network that has gone down',
  },
  {
    definition: 'To be remembered in a certain way',
    example: 'He will go down in history as a great CEO.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A CEO being remembered in history',
  },
  {
    definition: 'To be received by an audience in a specific way',
    example: 'The new management policy did not go down well with the team.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A team reacting poorly to a new management policy',
  },
  {
    definition: 'To set (the sun)',
    example: 'We finished work just as the sun was going down.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'The sun setting as the workday ends',
  },
];

const inMeanings: MeaningData[] = [
  {
    definition: 'To enter a place',
    example: 'The door is open, so you can go in.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A person entering through an open door',
  },
  {
    definition: 'To be understood or remembered',
    example: "The complex instructions just didn't go in.",
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A person struggling to understand complex instructions',
  },
  {
    definition: 'To become hidden (the sun going behind clouds)',
    example: 'It suddenly got cold when the sun went in behind a cloud.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'The sun disappearing behind a cloud',
  },
];

const intoMeanings: MeaningData[] = [
  {
    definition: 'To discuss or explain something in detail',
    example: "Let's not go into the budget problems right now.",
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'People choosing not to discuss budget problems',
  },
  {
    definition: 'To enter a specific profession or business',
    example: 'She decided to go into project management.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A person entering the project management profession',
  },
  {
    definition: 'To crash or collide with something',
    example: 'The car lost control and went into a tree.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A car crashing into a tree',
  },
  {
    definition: 'To enter a specific state or condition',
    example: 'The company went into liquidation.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A company entering liquidation',
  },
];

const outMeanings: MeaningData[] = [
  {
    definition: 'To leave home for a social event or activity',
    example: 'We are going out for dinner to celebrate the launch.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A team going out for a celebratory dinner',
  },
  {
    definition: 'To stop burning or shining (fire or lights)',
    example: 'The fire went out because we forgot to add wood.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A fire going out for lack of wood',
  },
  {
    definition: 'To be published, broadcast, or sent',
    example: 'The team email went out yesterday.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A team email being sent',
  },
  {
    definition: 'To become unfashionable or out of date',
    example: 'That style of UI design went out years ago.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'An outdated UI design style',
  },
  {
    definition: 'To have a romantic relationship with someone',
    example: 'They have been going out for two years.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A couple in a romantic relationship',
  },
];

const awayMeanings: MeaningData[] = [
  {
    definition: 'To leave a place or person',
    example: 'Please go away, I need to focus on my work.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A person asking for space to focus on work',
  },
  {
    definition: 'To disappear or fade',
    example: 'The error message went away when I restarted the application.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'An error message disappearing after a restart',
  },
  {
    definition: 'To leave home for a holiday',
    example: 'We are going away to the mountains for the weekend.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A person going on a mountain holiday',
  },
];

const acrossMeanings: MeaningData[] = [
  {
    definition: 'To move to the other side of something',
    example: "We need to go across the street to reach the client's office.",
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: "People crossing the street to reach an office",
  },
];

const forwardMeanings: MeaningData[] = [
  {
    definition: 'To progress or advance with a plan or idea',
    example: 'We are going forward with the new business strategy.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A team advancing with a new business strategy',
  },
  {
    definition: 'To move clocks ahead (daylight saving time)',
    example: 'The clocks go forward in the spring.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A clock being moved forward in spring',
  },
];

const backMeanings: MeaningData[] = [
  {
    definition: 'To return to a place or previous state',
    example: 'I need to go back to the office; I forgot my laptop.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A person returning to the office for a forgotten laptop',
  },
  {
    definition: 'To have existed or started since a specific time',
    example: 'This legacy code goes back to 2010.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Legacy code dating back to 2010',
  },
  {
    definition: 'To break a promise or agreement (go back on something)',
    example: "The vendor went back on their promise to deliver the software today.",
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A vendor breaking a delivery promise',
  },
];

const forMeanings: MeaningData[] = [
  {
    definition: 'To choose or select something',
    example: 'I will go for the standard Java framework instead of the experimental one.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A developer choosing a Java framework',
  },
  {
    definition: 'To try to achieve or get something',
    example: 'If you want that promotion, you should go for it!',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A person going for a promotion',
  },
  {
    definition: 'To attack someone physically or verbally',
    example: 'The dog suddenly went for the mailman.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A dog attacking the mailman',
  },
  {
    definition: 'To apply equally to someone or something else',
    example: 'The rules are strict, and that goes for managers, too.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Rules applying equally to all employees including managers',
  },
];

const byMeanings: MeaningData[] = [
  {
    definition: 'To pass (used for time)',
    example: 'As the years went by, the technology improved significantly.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Technology improving as years go by',
  },
  {
    definition: 'To base a decision on something or follow rules',
    example: 'If we go by the manual, this should take two hours.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A person following the manual to complete a task',
  },
  {
    definition: 'To be known by a specific name',
    example: 'His name is Robert, but he goes by Bob.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A man named Robert who goes by the name Bob',
  },
];

const togetherMeanings: MeaningData[] = [
  {
    definition: 'To look or sound good in combination',
    example: 'The new logo and the brand colors go together perfectly.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A logo and brand colors that complement each other',
  },
  {
    definition: 'To frequently accompany each other',
    example: 'High risk and high reward usually go together in business.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'High risk and high reward going hand in hand',
  },
];

const withMeanings: MeaningData[] = [
  {
    definition: 'To match or suit something',
    example: "That font doesn't go with the website's professional design.",
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A font that clashes with a professional website design',
  },
  {
    definition: 'To choose or accept an idea or offer',
    example: 'We decided to go with the second marketing proposal.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A team accepting a marketing proposal',
  },
  {
    definition: 'To accompany someone',
    example: "I'm going to the conference; do you want to go with me?",
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Two people going to a conference together',
  },
];

const withoutMeanings: MeaningData[] = [
  {
    definition: 'To manage or live without something you usually have',
    example: 'The budget is tight, so we will have to go without the extra monitors this year.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A team managing without extra monitors due to budget cuts',
  },
];

const overMeanings: MeaningData[] = [
  {
    definition: 'To review, check, or examine something carefully',
    example: "Let's go over the project requirements one more time.",
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A team reviewing project requirements',
  },
  {
    definition: 'To move toward someone or something',
    example: 'I will go over to the IT department to ask for help.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A person walking over to the IT department',
  },
  {
    definition: 'To be received in a specific way by an audience',
    example: "His joke didn't go over very well during the serious meeting.",
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A joke falling flat during a serious meeting',
  },
];

const aheadMeanings: MeaningData[] = [
  {
    definition: 'To start or proceed with an action',
    example: 'We have the budget, so we can go ahead with the development.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A team proceeding with development after budget approval',
  },
  {
    definition: 'To move in front of someone',
    example: 'You go ahead, I will catch up with you in a minute.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A person moving ahead while another catches up',
  },
];

const afterMeanings: MeaningData[] = [
  {
    definition: 'To try to catch or stop someone',
    example: 'The police went after the thief.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Police chasing a thief',
  },
  {
    definition: 'To try to achieve or get something (like a job or goal)',
    example: 'She is going after a leadership role in the company.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A professional pursuing a leadership role',
  },
];

const behindMeanings: MeaningData[] = [
  {
    definition: 'To go to the back of something',
    example: 'The cat went behind the sofa.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A cat going behind the sofa',
  },
  {
    definition: "To do something secretly without someone's knowledge or permission",
    example: "He went behind the manager's back and changed the server configurations.",
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: "An employee secretly changing server configurations",
  },
];

const throughMeanings: MeaningData[] = [
  {
    definition: 'To experience a difficult situation',
    example: 'The company went through a tough financial period last year.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A company experiencing a tough financial period',
  },
  {
    definition: 'To search or examine something carefully',
    example: 'I need to go through my emails to find the invoice.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A person carefully searching through emails',
  },
  {
    definition: 'To be officially approved or completed',
    example: 'The merger finally went through yesterday.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A merger being officially approved',
  },
  {
    definition: 'To use up a supply of something',
    example: "We go through a lot of coffee in the developers' room.",
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: "Developers going through a lot of coffee",
  },
  {
    definition: 'To practise or rehearse something',
    example: "Let's go through the presentation one more time.",
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A team rehearsing a presentation',
  },
];

const aboutMeanings: MeaningData[] = [
  {
    definition: 'To begin to tackle a task or problem',
    example: "I don't know how to go about fixing this complex bug.",
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A developer figuring out how to fix a complex bug',
  },
  {
    definition: 'To behave or do things in a normal or usual way',
    example: 'Despite the bad news, they went about their daily work.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Employees continuing their daily work despite bad news',
  },
];

const aroundMeanings: MeaningData[] = [
  {
    definition: 'To circulate or spread (illness or news)',
    example: 'There is a rumor going around about a new software release.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A rumor spreading through an office about a software release',
  },
  {
    definition: 'To be enough for everyone to have a share',
    example: 'Are there enough printed reports to go around?',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Reports being distributed to everyone in the meeting',
  },
  {
    definition: 'To visit someone at their location',
    example: "I'll go around to his desk later to discuss the code.",
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A colleague visiting a desk to discuss code',
  },
  {
    definition: 'To spin or rotate',
    example: 'The wheels go around.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Wheels spinning and rotating',
  },
];

const toMeanings: MeaningData[] = [
  {
    definition: 'To start a specific action or enter a state',
    example: 'After 12 hours of coding, I finally went to sleep.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A developer going to sleep after a long coding session',
  },
  {
    definition: 'To be given or assigned to someone',
    example: 'All the extra project funds will go to the marketing team.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Project funds being allocated to the marketing team',
  },
];

const againstMeanings: MeaningData[] = [
  {
    definition: 'To oppose or disagree with something',
    example: 'Implementing this feature goes against our main design principles.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A feature that conflicts with design principles',
  },
  {
    definition: 'To be unfavorable to someone (especially in contests or legal cases)',
    example: 'The final verdict went against the company.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A court verdict going against a company',
  },
];

export const sections: SectionData[] = [
  { particle: 'off', storageKey: 'goOff_section_expanded', storageKeyPrefix: 'goOff', meanings: offMeanings },
  { particle: 'on', storageKey: 'goOn_section_expanded', storageKeyPrefix: 'goOn', meanings: onMeanings },
  { particle: 'up', storageKey: 'goUp_section_expanded', storageKeyPrefix: 'goUp', meanings: upMeanings },
  { particle: 'down', storageKey: 'goDown_section_expanded', storageKeyPrefix: 'goDown', meanings: downMeanings },
  { particle: 'in', storageKey: 'goIn_section_expanded', storageKeyPrefix: 'goIn', meanings: inMeanings },
  { particle: 'into', storageKey: 'goInto_section_expanded', storageKeyPrefix: 'goInto', meanings: intoMeanings },
  { particle: 'out', storageKey: 'goOut_section_expanded', storageKeyPrefix: 'goOut', meanings: outMeanings },
  { particle: 'away', storageKey: 'goAway_section_expanded', storageKeyPrefix: 'goAway', meanings: awayMeanings },
  { particle: 'across', storageKey: 'goAcross_section_expanded', storageKeyPrefix: 'goAcross', meanings: acrossMeanings },
  { particle: 'forward', storageKey: 'goForward_section_expanded', storageKeyPrefix: 'goForward', meanings: forwardMeanings },
  { particle: 'back', storageKey: 'goBack_section_expanded', storageKeyPrefix: 'goBack', meanings: backMeanings },
  { particle: 'for', storageKey: 'goFor_section_expanded', storageKeyPrefix: 'goFor', meanings: forMeanings },
  { particle: 'by', storageKey: 'goBy_section_expanded', storageKeyPrefix: 'goBy', meanings: byMeanings },
  { particle: 'together', storageKey: 'goTogether_section_expanded', storageKeyPrefix: 'goTogether', meanings: togetherMeanings },
  { particle: 'with', storageKey: 'goWith_section_expanded', storageKeyPrefix: 'goWith', meanings: withMeanings },
  { particle: 'without', storageKey: 'goWithout_section_expanded', storageKeyPrefix: 'goWithout', meanings: withoutMeanings },
  { particle: 'over', storageKey: 'goOver_section_expanded', storageKeyPrefix: 'goOver', meanings: overMeanings },
  { particle: 'ahead', storageKey: 'goAhead_section_expanded', storageKeyPrefix: 'goAhead', meanings: aheadMeanings },
  { particle: 'after', storageKey: 'goAfter_section_expanded', storageKeyPrefix: 'goAfter', meanings: afterMeanings },
  { particle: 'behind', storageKey: 'goBehind_section_expanded', storageKeyPrefix: 'goBehind', meanings: behindMeanings },
  { particle: 'through', storageKey: 'goThrough_section_expanded', storageKeyPrefix: 'goThrough', meanings: throughMeanings },
  { particle: 'about', storageKey: 'goAbout_section_expanded', storageKeyPrefix: 'goAbout', meanings: aboutMeanings },
  { particle: 'around / round', storageKey: 'goAround_section_expanded', storageKeyPrefix: 'goAround', meanings: aroundMeanings },
  { particle: 'to', storageKey: 'goTo_section_expanded', storageKeyPrefix: 'goTo', meanings: toMeanings },
  { particle: 'against', storageKey: 'goAgainst_section_expanded', storageKeyPrefix: 'goAgainst', meanings: againstMeanings },
];

export default function GoVerbPage() {
  return <VerbPageLayout title="Go" sections={sections} />;
}
