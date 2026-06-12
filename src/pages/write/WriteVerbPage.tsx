import VerbPageLayout, { MeaningData, SectionData } from '../../components/VerbPage';

const base = import.meta.env.BASE_URL;

const aboutMeanings: MeaningData[] = [
  {
    definition: 'To discuss a particular subject in writing.',
    example: 'I want to write about the impact of artificial intelligence on the job market.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person writing about artificial intelligence and job market',
  },
];

const againstMeanings: MeaningData[] = [
  {
    definition: 'To write essays, articles, or books opposing a specific idea, policy, or person.',
    example: 'He spent his later years writing against the dangers of censorship.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Author writing essays opposing censorship',
  },
  {
    definition: 'To deduct an expense from a specific account or budget (finance).',
    example: 'We will write the cost of the software against this quarter\'s IT budget.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Accountant deducting software cost from IT budget',
  },
];

const aroundMeanings: MeaningData[] = [
  {
    definition: 'To intentionally avoid addressing the main point or a difficult topic in a text.',
    example: 'The biography is frustrating because the author writes around the politician\'s well-known scandals.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Author avoiding difficult topics in a biography',
  },
  {
    definition: 'To circulate a memo or letter to a group of people (British: write round).',
    example: 'I\'ll write round to the committee members to see who is available.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person circulating a memo to committee members',
  },
];

const awayMeanings: MeaningData[] = [
  {
    definition: 'To send a letter requesting something (synonymous with write off for).',
    example: 'When I was a kid, I used to write away for x-ray glasses I saw in comic books.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Child writing away to request a toy seen in a comic book',
  },
  {
    definition: 'To write continuously and diligently.',
    example: 'I left her at her desk, just writing away at her novel.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Writer working diligently at a desk on a novel',
  },
];

const backMeanings: MeaningData[] = [
  {
    definition: 'To reply to someone\'s letter, email, or message.',
    example: 'I sent him an email last week, but he still hasn\'t written back.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person waiting for a reply to an email they sent',
  },
];

const downMeanings: MeaningData[] = [
  {
    definition: 'To record something on paper so it is not forgotten.',
    example: 'Please write down my phone number before you lose it.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person writing down a phone number to remember it',
  },
  {
    definition: 'To reduce the estimated or nominal value of an asset (finance).',
    example: 'The company had to write down its inventory due to the sudden drop in market prices.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Accountant writing down inventory value due to market price drop',
  },
  {
    definition: 'To write in a condescendingly simple way (usually write down to).',
    example: 'A good children\'s author never writes down to their audience.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Children\'s author writing respectfully for young readers',
  },
];

const forMeanings: MeaningData[] = [
  {
    definition: 'To be employed by or submit writing to a specific publication.',
    example: 'She writes for several major technology magazines.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Journalist writing articles for technology magazines',
  },
  {
    definition: 'To request something by mail.',
    example: 'You can write for a free copy of the catalog.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person writing to request a free catalog by mail',
  },
];

const inMeanings: MeaningData[] = [
  {
    definition: 'To send a letter or email to an organization or television station to express an opinion.',
    example: 'Hundreds of viewers wrote in to complain about the controversial episode.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Viewers writing in to a TV station to complain',
  },
  {
    definition: 'To cast a vote for a candidate whose name is not on the official ballot by writing their name.',
    example: 'Because she missed the deadline to get on the ballot, her supporters had to write her in.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Voter writing in a candidate\'s name on a ballot',
  },
  {
    definition: 'To insert text into a document or form.',
    example: 'Please write in your name and address at the top of the page.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person filling in name and address on a form',
  },
];

const intoMeanings: MeaningData[] = [
  {
    definition: 'To formally include a specific clause, rule, or condition in a contract or script.',
    example: 'We made sure to write a penalty clause into the agreement to protect our investment.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Lawyer writing a penalty clause into a contract',
  },
];

const offMeanings: MeaningData[] = [
  {
    definition: 'To cancel a bad debt or accept a financial loss.',
    example: 'The bank decided to write off the unpaid loan.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Bank official writing off an unpaid loan',
  },
  {
    definition: 'To decide that someone or something is useless, unimportant, or a failure.',
    example: 'He had a bad first semester, but don\'t write him off just yet; he is improving.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Teacher encouraging a struggling student not to be written off',
  },
  {
    definition: 'To damage a vehicle so badly that it cannot be repaired (British/Commonwealth).',
    example: 'She lost control on the ice and completely wrote off her car.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Damaged car after an accident on icy road',
  },
  {
    definition: 'To deduct an expense to reduce taxable income.',
    example: 'You can write off the cost of your home office on your taxes.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person deducting home office expenses on tax return',
  },
  {
    definition: 'To send a letter requesting something (often write off for).',
    example: 'I wrote off for a free sample of the new moisturizer.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person writing off for a free product sample',
  },
];

const onMeanings: MeaningData[] = [
  {
    definition: 'To write about a specific topic or subject (formal/academic).',
    example: 'Professor Smith writes primarily on medieval European history.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Professor writing academic works on medieval European history',
  },
  {
    definition: 'To continue writing despite distractions or obstacles.',
    example: 'Despite the noise in the cafe, she just put her headphones in and wrote on.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Writer with headphones continuing to write in a noisy cafe',
  },
];

const outMeanings: MeaningData[] = [
  {
    definition: 'To write something completely in full rather than using abbreviations or numbers.',
    example: 'You need to write out the numbers one through ten, but you can use digits for 11 and up.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Student writing numbers out in full on a worksheet',
  },
  {
    definition: 'To remove a character from a television series by not including them in future scripts.',
    example: 'When the actor decided to leave the show, the writers wrote him out by having his character move to Paris.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'TV writers discussing how to write out a departing character',
  },
  {
    definition: 'To fill in all the necessary details on a document such as a check or prescription.',
    example: 'The doctor wrote out a prescription for antibiotics.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Doctor writing out a prescription for a patient',
  },
];

const overMeanings: MeaningData[] = [
  {
    definition: 'To replace old computer data with new data; to overwrite.',
    example: 'Be careful when saving the document, or you might write over yesterday\'s work.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person carefully saving a document to avoid overwriting old work',
  },
];

const throughMeanings: MeaningData[] = [
  {
    definition: 'To revise a piece of writing completely from beginning to end (journalism/editing).',
    example: 'The editor told the reporter to write through the draft to make the narrative flow better.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Editor reviewing a draft and asking the reporter to revise it fully',
  },
];

const toMeanings: MeaningData[] = [
  {
    definition: 'To send a written message or letter to a specific person or entity.',
    example: 'I write to my grandmother at least once a month.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person writing a letter to their grandmother each month',
  },
  {
    definition: 'To target a piece of writing toward a specific demographic.',
    example: 'It\'s hard to write to a teenage audience without sounding inauthentic.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Author trying to write authentically for a teenage audience',
  },
];

const upMeanings: MeaningData[] = [
  {
    definition: 'To produce a formal, complete written document based on notes or a draft.',
    example: 'Give me an hour to write up the minutes from our meeting.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person writing up meeting minutes from notes',
  },
  {
    definition: 'To officially record someone\'s poor performance or rule violation in a disciplinary file.',
    example: 'The manager wrote him up for arriving late three days in a row.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Manager recording an employee\'s repeated tardiness in a disciplinary file',
  },
  {
    definition: 'To publish a review or article praising someone or something.',
    example: 'The local newspaper wrote up the new restaurant in their weekend edition.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Journalist writing a positive review of a new restaurant',
  },
  {
    definition: 'To artificially increase the recorded, nominal value of an asset (finance).',
    example: 'The corporation wrote up the value of its real estate portfolio.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Financial analyst writing up the value of a real estate portfolio',
  },
];

export const sections: SectionData[] = [
  { particle: 'about',         storageKey: 'writeAbout_section_expanded',   storageKeyPrefix: 'writeAbout',   meanings: aboutMeanings },
  { particle: 'against',       storageKey: 'writeAgainst_section_expanded', storageKeyPrefix: 'writeAgainst', meanings: againstMeanings },
  { particle: 'around / round',storageKey: 'writeAround_section_expanded',  storageKeyPrefix: 'writeAround',  meanings: aroundMeanings },
  { particle: 'away',          storageKey: 'writeAway_section_expanded',    storageKeyPrefix: 'writeAway',    meanings: awayMeanings },
  { particle: 'back',          storageKey: 'writeBack_section_expanded',    storageKeyPrefix: 'writeBack',    meanings: backMeanings },
  { particle: 'down',          storageKey: 'writeDown_section_expanded',    storageKeyPrefix: 'writeDown',    meanings: downMeanings },
  { particle: 'for',           storageKey: 'writeFor_section_expanded',     storageKeyPrefix: 'writeFor',     meanings: forMeanings },
  { particle: 'in',            storageKey: 'writeIn_section_expanded',      storageKeyPrefix: 'writeIn',      meanings: inMeanings },
  { particle: 'into',          storageKey: 'writeInto_section_expanded',    storageKeyPrefix: 'writeInto',    meanings: intoMeanings },
  { particle: 'off',           storageKey: 'writeOff_section_expanded',     storageKeyPrefix: 'writeOff',     meanings: offMeanings },
  { particle: 'on',            storageKey: 'writeOn_section_expanded',      storageKeyPrefix: 'writeOn',      meanings: onMeanings },
  { particle: 'out',           storageKey: 'writeOut_section_expanded',     storageKeyPrefix: 'writeOut',     meanings: outMeanings },
  { particle: 'over',          storageKey: 'writeOver_section_expanded',    storageKeyPrefix: 'writeOver',    meanings: overMeanings },
  { particle: 'through',       storageKey: 'writeThrough_section_expanded', storageKeyPrefix: 'writeThrough', meanings: throughMeanings },
  { particle: 'to',            storageKey: 'writeTo_section_expanded',      storageKeyPrefix: 'writeTo',      meanings: toMeanings },
  { particle: 'up',            storageKey: 'writeUp_section_expanded',      storageKeyPrefix: 'writeUp',      meanings: upMeanings },
];

export default function WriteVerbPage() {
  return <VerbPageLayout title="Write" sections={sections} />;
}
