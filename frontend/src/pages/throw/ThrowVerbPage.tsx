import VerbPageLayout, { MeaningData, SectionData } from '../../components/VerbPage';

const base = import.meta.env.BASE_URL;

const aboutMeanings: MeaningData[] = [
  {
    definition: 'To scatter things untidily.',
    example: 'Clothes and books were thrown about the messy room.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Clothes and books scattered untidily around a room',
  },
  {
    definition: 'To discuss ideas or suggestions casually.',
    example: 'We spent the afternoon throwing around some concepts for the new ad campaign.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Team casually discussing concepts for an ad campaign',
  },
  {
    definition: 'To use power, money, or authority aggressively or recklessly (often "throw one\'s weight around").',
    example: 'As soon as he got promoted, he started throwing his weight around and demanding respect.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Newly promoted person throwing their weight around and demanding respect',
  },
];

const awayMeanings: MeaningData[] = [
  {
    definition: 'To discard as trash.',
    example: "Don't throw away that receipt; you might need it.",
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person keeping a receipt instead of throwing it away',
  },
  {
    definition: 'To waste or fail to make use of an opportunity or advantage.',
    example: 'He had a great talent but threw it away by not practicing.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person wasting a great talent by not practicing',
  },
  {
    definition: 'To speak casually or unintentionally (a "throwaway" comment).',
    example: 'He threw away a comment about retiring next year, but nobody noticed.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person making a casual throwaway comment that nobody noticed',
  },
];

const backMeanings: MeaningData[] = [
  {
    definition: 'To drink something quickly (usually alcohol).',
    example: 'He threw back a shot of whiskey and left the bar.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person quickly throwing back a shot of whiskey at a bar',
  },
  {
    definition: 'To revert to or resemble an earlier time or type (often a noun: "throwback").',
    example: 'Her fashion style throws back to the 1980s.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: "Person whose fashion style throws back to the 1980s",
  },
  {
    definition: 'To delay or impede progress.',
    example: 'The bad weather threw back their construction schedule by two weeks.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Bad weather throwing back a construction schedule by two weeks',
  },
  {
    definition: 'To be forced to rely on something (often "throw back on").',
    example: 'When his business failed, he was thrown back on his savings.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person forced to rely on savings after business failure',
  },
];

const downMeanings: MeaningData[] = [
  {
    definition: 'To drop or push someone or something to the ground violently or abruptly.',
    example: 'He threw down his pen in frustration and walked out.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person throwing down their pen in frustration and walking out',
  },
  {
    definition: 'To issue a challenge (often "throw down the gauntlet").',
    example: "The opposing team threw down a challenge we couldn't ignore.",
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Opposing team throwing down a challenge that cannot be ignored',
  },
];

const inMeanings: MeaningData[] = [
  {
    definition: 'To include something extra for free with a purchase.',
    example: "If you buy the laptop today, we'll throw in a carrying case.",
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Salesperson throwing in a carrying case with a laptop purchase',
  },
  {
    definition: 'To interject or add a remark to a conversation.',
    example: 'He threw in a joke to lighten the mood.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person throwing in a joke to lighten the mood',
  },
  {
    definition: 'To surrender or give up (often "throw in the towel").',
    example: 'After three failed attempts to fix the engine, he finally threw in the towel.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person finally throwing in the towel after three failed attempts to fix the engine',
  },
];

const intoMeanings: MeaningData[] = [
  {
    definition: 'To force a person, group, or place into a specific, usually negative, condition.',
    example: 'The sudden power outage threw the entire city into chaos.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Sudden power outage throwing an entire city into chaos',
  },
  {
    definition: 'To engage enthusiastically in a task (usually "throw oneself into").',
    example: 'After the breakup, she threw herself into her work.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person throwing herself into work after a breakup',
  },
];

const offMeanings: MeaningData[] = [
  {
    definition: 'To remove quickly or carelessly (clothing).',
    example: 'She threw off her heavy winter coat as soon as she entered the house.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person throwing off their heavy winter coat upon entering the house',
  },
  {
    definition: 'To free oneself from something negative (illness, trouble, restraint).',
    example: "I can't seem to throw off this cold; I've had it for weeks.",
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: "Person unable to throw off a lingering cold",
  },
  {
    definition: 'To confuse, distract, or mislead someone.',
    example: 'The unexpected question during the interview really threw me off.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Candidate thrown off by an unexpected interview question',
  },
  {
    definition: 'To emit or radiate (heat, light, smell).',
    example: 'That old radiator throws off a surprising amount of heat.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Old radiator throwing off a surprising amount of heat',
  },
];

const onMeanings: MeaningData[] = [
  {
    definition: 'To put on quickly or hastily (clothing).',
    example: 'I just threw on a pair of jeans and ran to the grocery store.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person quickly throwing on jeans and running to the grocery store',
  },
];

const outMeanings: MeaningData[] = [
  {
    definition: 'To discard or dispose of something as trash.',
    example: "It's time to throw out all these old magazines.",
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person throwing out a collection of old magazines',
  },
  {
    definition: 'To evict or expel someone from a place.',
    example: 'The bouncer threw them out of the club for fighting.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Bouncer throwing troublemakers out of a club',
  },
  {
    definition: 'To reject or dismiss (a plan, idea, or legal case).',
    example: 'The judge threw out the lawsuit due to a lack of evidence.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Judge throwing out a lawsuit due to a lack of evidence',
  },
  {
    definition: 'To emit or radiate (light, heat, smoke).',
    example: 'The fireplace throws out a lot of warmth.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Fireplace throwing out a lot of warmth',
  },
  {
    definition: 'To offer an idea or suggestion for consideration.',
    example: 'Let me just throw this idea out and see what you think.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person throwing out an idea for the team to consider',
  },
  {
    definition: 'To confuse someone or cause them to make a mistake (chiefly British).',
    example: 'The loud music threw me out while I was trying to count the money.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person thrown out by loud music while trying to count money',
  },
];

const overMeanings: MeaningData[] = [
  {
    definition: 'To abandon, reject, or leave someone (especially a romantic partner).',
    example: 'She threw him over for a wealthy businessman.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person being thrown over for a wealthy businessman',
  },
  {
    definition: 'To abandon a plan or idea.',
    example: 'We had to throw over our original strategy when the budget was cut.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Team throwing over their original strategy after budget cuts',
  },
];

const togetherMeanings: MeaningData[] = [
  {
    definition: 'To make, prepare, or assemble something quickly or hastily.',
    example: "I didn't have much time, so I just threw together a quick salad.",
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person quickly throwing together a salad with limited time',
  },
  {
    definition: 'To force people to associate with each other due to circumstances.',
    example: 'The blizzard threw the stranded passengers together for the night.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Blizzard throwing stranded passengers together for the night',
  },
];

const upMeanings: MeaningData[] = [
  {
    definition: 'To vomit.',
    example: 'The turbulent flight made him throw up.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person feeling sick from a turbulent flight',
  },
  {
    definition: 'To produce, reveal, or bring to light (ideas, problems, results).',
    example: 'The data analysis threw up some very interesting anomalies.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Data analysis throwing up interesting anomalies',
  },
  {
    definition: 'To build or construct something hastily.',
    example: 'They threw up a temporary fence to keep the dogs out.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'People hastily throwing up a temporary fence to keep dogs out',
  },
  {
    definition: 'To quit or abandon (a job or position) suddenly.',
    example: 'She threw up her corporate career to travel the world.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person throwing up their corporate career to travel the world',
  },
  {
    definition: 'To cause something (like dust or water) to rise into the air.',
    example: 'The speeding truck threw up a massive cloud of dust.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Speeding truck throwing up a massive cloud of dust',
  },
];

export const sections: SectionData[] = [
  { particle: 'about / around / round', storageKey: 'throwAbout_section_expanded',    storageKeyPrefix: 'throwAbout',    meanings: aboutMeanings },
  { particle: 'away',                   storageKey: 'throwAway_section_expanded',     storageKeyPrefix: 'throwAway',     meanings: awayMeanings },
  { particle: 'back',                   storageKey: 'throwBack_section_expanded',     storageKeyPrefix: 'throwBack',     meanings: backMeanings },
  { particle: 'down',                   storageKey: 'throwDown_section_expanded',     storageKeyPrefix: 'throwDown',     meanings: downMeanings },
  { particle: 'in',                     storageKey: 'throwIn_section_expanded',       storageKeyPrefix: 'throwIn',       meanings: inMeanings },
  { particle: 'into',                   storageKey: 'throwInto_section_expanded',     storageKeyPrefix: 'throwInto',     meanings: intoMeanings },
  { particle: 'off',                    storageKey: 'throwOff_section_expanded',      storageKeyPrefix: 'throwOff',      meanings: offMeanings },
  { particle: 'on',                     storageKey: 'throwOn_section_expanded',       storageKeyPrefix: 'throwOn',       meanings: onMeanings },
  { particle: 'out',                    storageKey: 'throwOut_section_expanded',      storageKeyPrefix: 'throwOut',      meanings: outMeanings },
  { particle: 'over',                   storageKey: 'throwOver_section_expanded',     storageKeyPrefix: 'throwOver',     meanings: overMeanings },
  { particle: 'together',               storageKey: 'throwTogether_section_expanded', storageKeyPrefix: 'throwTogether', meanings: togetherMeanings },
  { particle: 'up',                     storageKey: 'throwUp_section_expanded',       storageKeyPrefix: 'throwUp',       meanings: upMeanings },
];

export default function ThrowVerbPage() {
  return <VerbPageLayout title="Throw" sections={sections} />;
}
