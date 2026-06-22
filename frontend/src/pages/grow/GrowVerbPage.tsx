import VerbPageLayout, { MeaningData, SectionData } from '../../components/VerbPage';

const base = import.meta.env.BASE_URL;

const apartMeanings: MeaningData[] = [
  {
    definition: 'To gradually become less close in a relationship over time.',
    example: 'The co-founders grew apart over the years and eventually split the business.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Co-founders growing apart over the years and eventually splitting the business',
  },
];

const awayMeanings: MeaningData[] = [
  {
    definition: 'To gradually become less connected to someone or something, or to stop supporting a past habit or idea.',
    example: 'As the startup expanded, we naturally grew away from our original, informal working style.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Startup growing away from its original informal working style',
  },
];

const backMeanings: MeaningData[] = [
  {
    definition: 'To grow again after being cut, broken, or damaged (usually referring to plants or hair).',
    example: 'We had to cut down the tree, but the branches are starting to grow back.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Tree branches starting to grow back after being cut down',
  },
];

const inMeanings: MeaningData[] = [
  {
    definition: 'To fill an empty space by growing (often used for hair or plants).',
    example: 'We planted new seeds in the garden, and the grass is finally growing in.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Grass finally growing in after planting new seeds in the garden',
  },
];

const intoMeanings: MeaningData[] = [
  {
    definition: 'To develop the skills and confidence needed for a new role or responsibility.',
    example: 'It was a big promotion, but she quickly grew into her position as a team leader.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Employee growing into her position as a team leader after a big promotion',
  },
  {
    definition: 'To become large enough to fit into clothing.',
    example: 'The jacket is too big for him now, but he will grow into it.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Child who will grow into a jacket that is currently too big',
  },
  {
    definition: 'To develop into a different or larger state.',
    example: 'What started as a simple Java application grew into a massive enterprise platform.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Simple Java application growing into a massive enterprise platform',
  },
];

const onMeanings: MeaningData[] = [
  {
    definition: "To become increasingly liked or appreciated by someone over time.",
    example: "I didn't like the new management software at first, but it is starting to grow on me.",
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'New management software growing on a user over time',
  },
];

const outMeanings: MeaningData[] = [
  {
    definition: 'To allow hair to grow back to its natural style or color.',
    example: 'She is growing out her dyed blonde hair.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person growing out dyed blonde hair',
  },
  {
    definition: 'To become too big for a physical space or piece of clothing.',
    example: 'Our development team grew out of the small office in just six months.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Development team growing out of the small office in six months',
  },
  {
    definition: 'To stop doing something as you become older or more mature.',
    example: 'He used to micromanage his team, but luckily he grew out of that habit.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Manager growing out of the habit of micromanaging his team',
  },
  {
    definition: 'To develop or happen as a direct result of something else.',
    example: 'The new mobile app grew out of a simple idea shared during a brainstorming meeting.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Mobile app growing out of a simple idea from a brainstorming meeting',
  },
];

const overMeanings: MeaningData[] = [
  {
    definition: 'To become covered with growing plants (like vines, moss, or grass).',
    example: 'The old, abandoned factory was eventually grown over by ivy.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Old abandoned factory grown over by ivy',
  },
];

const toMeanings: MeaningData[] = [
  {
    definition: 'To gradually begin to experience a feeling or an action (usually followed by another verb, like like, love, realize, understand).',
    example: 'After working with him for a year, I grew to respect his leadership style.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: "Employee growing to respect their manager's leadership style after working together",
  },
];

const togetherMeanings: MeaningData[] = [
  {
    definition: 'To become closely united or emotionally connected.',
    example: 'After the merger, the two departments slowly grew together to form one strong team.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Two departments growing together to form one strong team after a merger',
  },
  {
    definition: 'To fuse or join while growing (often used for plants or healing bones).',
    example: 'The broken bone was set in a cast and grew together perfectly.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Broken bone growing together perfectly after being set in a cast',
  },
];

const upMeanings: MeaningData[] = [
  {
    definition: 'To change from being a child to being an adult.',
    example: 'He grew up in Poland and later moved abroad to study software engineering.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Person who grew up in Poland and moved abroad to study software engineering',
  },
  {
    definition: 'To behave in a mature, adult way (often used as a criticism or command when someone is acting childish).',
    example: 'Stop arguing about minor code formatting and grow up!',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Developers being told to grow up and stop arguing about minor code formatting',
  },
  {
    definition: 'To slowly develop, arise, or establish itself (often used for cities, industries, or systems).',
    example: 'A massive ecosystem of tools and frameworks grew up around the Java programming language.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Ecosystem of tools and frameworks growing up around the Java programming language',
  },
];

const withMeanings: MeaningData[] = [
  {
    definition: 'To expand, develop, or change proportionally alongside something else.',
    example: 'You need a server architecture that can grow with your business needs.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Server architecture growing with business needs',
  },
];

export const sections: SectionData[] = [
  { particle: 'apart',       storageKey: 'growApart_section_expanded',    storageKeyPrefix: 'growApart',    meanings: apartMeanings },
  { particle: 'away',        storageKey: 'growAway_section_expanded',     storageKeyPrefix: 'growAway',     meanings: awayMeanings },
  { particle: 'back',        storageKey: 'growBack_section_expanded',     storageKeyPrefix: 'growBack',     meanings: backMeanings },
  { particle: 'in',          storageKey: 'growIn_section_expanded',       storageKeyPrefix: 'growIn',       meanings: inMeanings },
  { particle: 'into',        storageKey: 'growInto_section_expanded',     storageKeyPrefix: 'growInto',     meanings: intoMeanings },
  { particle: 'on',          storageKey: 'growOn_section_expanded',       storageKeyPrefix: 'growOn',       meanings: onMeanings },
  { particle: 'out / out of', storageKey: 'growOut_section_expanded',     storageKeyPrefix: 'growOut',      meanings: outMeanings },
  { particle: 'over',        storageKey: 'growOver_section_expanded',     storageKeyPrefix: 'growOver',     meanings: overMeanings },
  { particle: 'to',          storageKey: 'growTo_section_expanded',       storageKeyPrefix: 'growTo',       meanings: toMeanings },
  { particle: 'together',    storageKey: 'growTogether_section_expanded', storageKeyPrefix: 'growTogether', meanings: togetherMeanings },
  { particle: 'up',          storageKey: 'growUp_section_expanded',       storageKeyPrefix: 'growUp',       meanings: upMeanings },
  { particle: 'with',        storageKey: 'growWith_section_expanded',     storageKeyPrefix: 'growWith',     meanings: withMeanings },
];

export default function GrowVerbPage() {
  return <VerbPageLayout title="Grow" sections={sections} />;
}
