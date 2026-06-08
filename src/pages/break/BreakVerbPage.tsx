import VerbPageLayout, { MeaningData, SectionData } from '../../components/VerbPage';

const base = import.meta.env.BASE_URL;

const offMeanings: MeaningData[] = [
  {
    definition: 'To remove a part of something (by force or snapping).',
    example: 'He broke off a square of chocolate and gave it to me.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Breaking off a square of chocolate',
  },
  {
    definition: 'To suddenly stop speaking or doing something.',
    example: 'She broke off in the middle of her sentence when the phone rang.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A person stopping mid-sentence when the phone rings',
  },
  {
    definition: 'To end a relationship, agreement, or negotiation.',
    example: 'The two countries have broken off diplomatic relations.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Two countries ending diplomatic relations',
  },
];

const upMeanings: MeaningData[] = [
  {
    definition: 'To separate into smaller pieces.',
    example: 'The ship broke up on the rocks during the storm.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A ship breaking apart on rocks during a storm',
  },
  {
    definition: 'To end a romantic relationship or marriage.',
    example: 'Sam and Alex broke up after five years of dating.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A couple ending their relationship',
  },
  {
    definition: 'To force a crowd to disperse or to stop a fight.',
    example: 'The police arrived to break up the protest.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Police dispersing a protest',
  },
  {
    definition: 'To divide something into smaller, manageable parts.',
    example: "Let's break up this large project into smaller tasks.",
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Dividing a large project into smaller tasks',
  },
  {
    definition: 'To lose audio signal (telecommunications).',
    example: "I can't hear you very well, your voice is breaking up.",
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A poor phone connection breaking up',
  },
  {
    definition: 'To end the school term for holidays (chiefly British).',
    example: 'The children are excited because school breaks up next week.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Children excited about school breaking up for holidays',
  },
  {
    definition: 'To burst into laughter, or make someone else laugh (chiefly American).',
    example: 'That comedian always breaks me up.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A comedian making someone burst into laughter',
  },
];

const downMeanings: MeaningData[] = [
  {
    definition: 'To stop working (machinery or vehicles).',
    example: 'My car broke down on the highway.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A car breaking down on a highway',
  },
  {
    definition: 'To lose control of one\'s emotions and start crying.',
    example: 'She broke down in tears when she heard the news.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A person breaking down in tears',
  },
  {
    definition: 'To fail or collapse (negotiations, systems, or relationships).',
    example: 'The peace talks broke down after neither side would compromise.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Peace talks collapsing without compromise',
  },
  {
    definition: 'To divide information into smaller parts for easier analysis.',
    example: 'Can you break down this budget so I can see where the money is going?',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Breaking down a budget for analysis',
  },
  {
    definition: 'To destroy or remove a barrier or obstacle.',
    example: 'The organization works to break down social barriers.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'An organization breaking down social barriers',
  },
  {
    definition: 'To decompose or separate into basic chemical elements.',
    example: 'Plastic takes hundreds of years to break down in the environment.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Plastic slowly decomposing in the environment',
  },
];

const inMeanings: MeaningData[] = [
  {
    definition: 'To enter a building by force or illegally (intransitive).',
    example: 'Thieves broke in while we were away on vacation.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Thieves breaking into a house',
  },
  {
    definition: 'To interrupt a conversation.',
    example: '"I completely disagree," he broke in.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A person interrupting a conversation',
  },
  {
    definition: 'To wear new shoes or use new equipment until they become comfortable.',
    example: 'My feet hurt because I\'m still breaking in these new leather boots.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Breaking in a pair of new leather boots',
  },
  {
    definition: 'To train a new employee, or to train an animal (like a horse) to be ridden.',
    example: 'It takes a few weeks to break in a wild horse.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Training a wild horse to be ridden',
  },
];

const intoMeanings: MeaningData[] = [
  {
    definition: 'To enter a building by force (transitive — requires an object).',
    example: 'Someone broke into my apartment last night.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'An intruder breaking into an apartment',
  },
  {
    definition: 'To suddenly begin doing something (laughing, running, singing, sweating).',
    example: 'As soon as she saw him, she broke into a smile.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A person suddenly breaking into a smile',
  },
  {
    definition: 'To successfully enter a new profession, industry, or market.',
    example: 'It is very difficult to break into the publishing industry.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Someone trying to break into the publishing industry',
  },
  {
    definition: 'To open something by force or use emergency supplies/funds.',
    example: 'We had to break into our savings to pay for the roof repair.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Breaking into savings to cover an unexpected expense',
  },
];

const outMeanings: MeaningData[] = [
  {
    definition: 'To start suddenly (war, fire, disease, riots).',
    example: 'World War II broke out in 1939.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'The sudden outbreak of World War II',
  },
  {
    definition: 'To escape from a place (like a prison).',
    example: 'Three inmates managed to break out of the maximum-security facility.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Inmates breaking out of a maximum-security prison',
  },
  {
    definition: 'To develop a skin condition (sweat, spots, acne, rash).',
    example: 'Eating too much dairy makes my skin break out.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Skin breaking out in spots due to dairy',
  },
  {
    definition: 'To bring something out to use or celebrate with.',
    example: "We won the contract! Let's break out the champagne.",
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Celebrating a contract win with champagne',
  },
];

const awayMeanings: MeaningData[] = [
  {
    definition: 'To physically escape from someone who is holding you.',
    example: 'He grabbed her arm, but she managed to break away.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A person breaking free from someone grabbing their arm',
  },
  {
    definition: 'To separate from a group, crowd, or pack (often in a race).',
    example: 'Three cyclists broke away from the main pack to take the lead.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Cyclists breaking away from the main pack in a race',
  },
  {
    definition: 'To leave a political party, country, or organization to form a new one.',
    example: 'The rebel faction broke away to form their own government.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A rebel faction breaking away to form a new government',
  },
];

const backMeanings: MeaningData[] = [
  {
    definition: 'To regain a lost advantage (specifically in sports like tennis).',
    example: 'He lost his serve in the first set but immediately broke back in the next game.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A tennis player breaking back after losing a set',
  },
];

const forMeanings: MeaningData[] = [
  {
    definition: 'To suddenly run toward something (usually safety or cover).',
    example: 'When the rain started pouring, we broke for the trees.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'People running for cover under trees in the rain',
  },
  {
    definition: 'To pause an activity for a short period.',
    example: "Let's break for lunch and resume the meeting at 2:00 PM.",
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A team pausing a meeting for lunch',
  },
];

const withMeanings: MeaningData[] = [
  {
    definition: 'To stop following a tradition, habit, or custom.',
    example: 'The designer broke with tradition by using bright neon colors for the wedding dress.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A designer breaking tradition with a neon wedding dress',
  },
  {
    definition: 'To end a relationship or association with a person or group.',
    example: 'He broke with his family over their political differences.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A person severing ties with family over politics',
  },
];

const apartMeanings: MeaningData[] = [
  {
    definition: 'To separate or shatter into pieces (often violently).',
    example: 'The space shuttle broke apart upon re-entering the atmosphere.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A space shuttle breaking apart on re-entry',
  },
  {
    definition: 'To destroy a relationship, organization, or group.',
    example: 'The scandal threatened to break the entire committee apart.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A scandal threatening to break a committee apart',
  },
];

const overMeanings: MeaningData[] = [
  {
    definition: 'To wash or burst over something (like waves).',
    example: 'The massive wave broke over the bow of the ship.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A massive wave breaking over the bow of a ship',
  },
  {
    definition: 'To happen suddenly and intensely in a specific location (weather or events).',
    example: 'The storm broke over the city just after midnight.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A storm breaking over a city at midnight',
  },
];

const throughMeanings: MeaningData[] = [
  {
    definition: 'To force a way through an obstacle, barrier, or defense.',
    example: 'The sun finally broke through the heavy clouds.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Sunlight breaking through heavy clouds',
  },
  {
    definition: 'To make a significant discovery or overcome a major limitation.',
    example: 'Scientists hope to break through in their cancer research this year.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Scientists making a breakthrough in cancer research',
  },
];

const toMeanings: MeaningData[] = [
  {
    definition: 'To tell someone bad or surprising news gently (used as "break it to" or "break the news to").',
    example: 'I hate to break it to you, but your flight has been canceled.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Gently breaking bad news about a canceled flight',
  },
];

const againstMeanings: MeaningData[] = [
  {
    definition: 'To crash forcefully into something.',
    example: 'We sat and watched the waves break against the rocky cliffs.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Waves breaking against rocky cliffs',
  },
];

export const sections: SectionData[] = [
  { particle: 'off',     storageKey: 'breakOff_section_expanded',     storageKeyPrefix: 'breakOff',     meanings: offMeanings },
  { particle: 'up',      storageKey: 'breakUp_section_expanded',      storageKeyPrefix: 'breakUp',      meanings: upMeanings },
  { particle: 'down',    storageKey: 'breakDown_section_expanded',    storageKeyPrefix: 'breakDown',    meanings: downMeanings },
  { particle: 'in',      storageKey: 'breakIn_section_expanded',      storageKeyPrefix: 'breakIn',      meanings: inMeanings },
  { particle: 'into',    storageKey: 'breakInto_section_expanded',    storageKeyPrefix: 'breakInto',    meanings: intoMeanings },
  { particle: 'out',     storageKey: 'breakOut_section_expanded',     storageKeyPrefix: 'breakOut',     meanings: outMeanings },
  { particle: 'away',    storageKey: 'breakAway_section_expanded',    storageKeyPrefix: 'breakAway',    meanings: awayMeanings },
  { particle: 'back',    storageKey: 'breakBack_section_expanded',    storageKeyPrefix: 'breakBack',    meanings: backMeanings },
  { particle: 'for',     storageKey: 'breakFor_section_expanded',     storageKeyPrefix: 'breakFor',     meanings: forMeanings },
  { particle: 'with',    storageKey: 'breakWith_section_expanded',    storageKeyPrefix: 'breakWith',    meanings: withMeanings },
  { particle: 'apart',   storageKey: 'breakApart_section_expanded',   storageKeyPrefix: 'breakApart',   meanings: apartMeanings },
  { particle: 'over',    storageKey: 'breakOver_section_expanded',    storageKeyPrefix: 'breakOver',    meanings: overMeanings },
  { particle: 'through', storageKey: 'breakThrough_section_expanded', storageKeyPrefix: 'breakThrough', meanings: throughMeanings },
  { particle: 'to',      storageKey: 'breakTo_section_expanded',      storageKeyPrefix: 'breakTo',      meanings: toMeanings },
  { particle: 'against', storageKey: 'breakAgainst_section_expanded', storageKeyPrefix: 'breakAgainst', meanings: againstMeanings },
];

export default function BreakVerbPage() {
  return <VerbPageLayout title="Break" sections={sections} />;
}
