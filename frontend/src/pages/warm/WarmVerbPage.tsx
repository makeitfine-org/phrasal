import VerbPageLayout, { MeaningData, SectionData } from '../../components/VerbPage';

const base = import.meta.env.BASE_URL;

const downMeanings: MeaningData[] = [
  {
    definition: 'To perform gentle exercises or stretches after vigorous physical activity to help the body recover (British English).',
    example: 'After testing out the new 20-inch bike on the trail, make sure to walk for a bit to warm down.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Warming down after exercise by walking',
  },
];

const overMeanings: MeaningData[] = [
  {
    definition: 'To reheat cooked food (North American English, synonymous with warm up).',
    example: "We can just warm over last night's dinner.",
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: "Warming over last night's dinner",
  },
  {
    definition: 'To present an old idea or strategy as if it were new or original, usually with a negative connotation (as the adjective warmed-over).',
    example: 'The agency pitched us a new sourcing strategy, but it was just a warmed-over version of what we did in 2024.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Agency pitching a warmed-over strategy as new',
  },
];

const throughMeanings: MeaningData[] = [
  {
    definition: 'To heat food gently until it is warm right to the middle without cooking it further or changing its texture.',
    example: 'Just put the tortillas in the oven for a few minutes to warm through.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Warming tortillas through in the oven',
  },
];

const toMeanings: MeaningData[] = [
  {
    definition: 'To begin to like someone or something after initial hesitation or doubt (often warm up to).',
    example: "I wasn't sure about the Adizes PAEI management model at first, but I'm really warming to it.",
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Warming to the Adizes PAEI management model',
  },
  {
    definition: 'To become interested in or enthusiastic about an idea or topic.',
    example: 'The executive team is finally warming to the idea of reopening the individual entrepreneurship structure.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Executive team warming to the idea of reopening entrepreneurship structure',
  },
];

const upMeanings: MeaningData[] = [
  {
    definition: 'To increase in temperature or make someone or something warmer.',
    example: "Let's step inside the cafe to warm up; the wind is freezing today.",
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Stepping inside the cafe to warm up from the freezing wind',
  },
  {
    definition: 'To prepare for an activity, event, or performance by practicing or doing gentle exercises.',
    example: 'I usually warm up with some simple coding exercises before jumping into heavy software development.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Warming up with coding exercises before heavy software development',
  },
  {
    definition: 'To become more animated, relaxed, or friendly in a social or professional setting.',
    example: 'The candidate was nervous at first, but she warmed up after we started discussing her GitHub projects.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Candidate warming up during discussion of GitHub projects',
  },
  {
    definition: 'To reheat food that has already been cooked.',
    example: "I'll warm up the leftover pierogi for lunch.",
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Warming up leftover pierogi for lunch',
  },
  {
    definition: 'To leave a machine running for a short time until it reaches its optimal operating temperature.',
    example: 'Give the car a minute to warm up before we drive off.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Giving the car a minute to warm up before driving off',
  },
];

export const sections: SectionData[] = [
  { particle: 'down',    storageKey: 'warmDown_section_expanded',    storageKeyPrefix: 'warmDown',    meanings: downMeanings },
  { particle: 'over',    storageKey: 'warmOver_section_expanded',    storageKeyPrefix: 'warmOver',    meanings: overMeanings },
  { particle: 'through', storageKey: 'warmThrough_section_expanded', storageKeyPrefix: 'warmThrough', meanings: throughMeanings },
  { particle: 'to',      storageKey: 'warmTo_section_expanded',      storageKeyPrefix: 'warmTo',      meanings: toMeanings },
  { particle: 'up',      storageKey: 'warmUp_section_expanded',      storageKeyPrefix: 'warmUp',      meanings: upMeanings },
];

export default function WarmVerbPage() {
  return <VerbPageLayout title="Warm" sections={sections} />;
}
