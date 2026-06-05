import React, { useState } from 'react';

interface MeaningProps {
  number: number;
  definition: string;
  example: string;
  imageSrc: string;
  imageAlt: string;
  storageKeyPrefix: string;
}

function Meaning({ number, definition, example, imageSrc, imageAlt, storageKeyPrefix }: MeaningProps) {
  const isDefault = imageSrc.endsWith('default.png');
  const storageKey = `${storageKeyPrefix}_meaning_${number}_collapsed`;
  const [collapsed, setCollapsed] = useState(() => {
    if (isDefault) return true;
    const saved = localStorage.getItem(storageKey);
    return saved !== null ? saved === 'true' : true;
  });

  const toggle = () => {
    if (isDefault) return;
    setCollapsed(c => {
      const next = !c;
      localStorage.setItem(storageKey, String(next));
      return next;
    });
  };

  return (
    <div
      className={`bg-white dark:bg-gray-900 rounded-2xl border border-gray-600 dark:border-gray-400 shadow-md overflow-hidden ${isDefault ? 'cursor-default' : 'cursor-pointer'} select-none`}
      onClick={toggle}
    >
      {collapsed ? (
        <div className="p-4">
          <div className="flex items-start gap-2">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center">
              {number}
            </span>
            <div className="min-w-0 flex-1">
              <p
                className="text-gray-800 dark:text-gray-100 text-xl md:text-base font-medium leading-snug truncate"
                title={definition}
              >
                {definition}
              </p>
              <p
                className="text-gray-500 dark:text-gray-400 text-xl md:text-sm italic truncate mt-0.5"
                title={`"${example}"`}
              >
                "{example}"
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-4 pt-3">
          <div className="flex justify-center mb-3">
            <img
              src={imageSrc}
              alt={imageAlt}
              className="max-w-sm w-full border border-gray-200 dark:border-gray-700 rounded-xl"
            />
          </div>
          <div>
            <div className="flex items-start gap-2 mb-2">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center">
                {number}
              </span>
              <p
                className="text-gray-800 dark:text-gray-100 text-xl md:text-base font-medium leading-snug"
                title={definition}
              >
                {definition}
              </p>
            </div>
            <p className="text-gray-500 dark:text-gray-400 text-xl md:text-sm italic pl-8">
              "{example}"
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

const base = import.meta.env.BASE_URL;

const offMeanings: Omit<MeaningProps, 'number' | 'storageKeyPrefix'>[] = [
  {
    definition: 'To leave a form of public transport (bus, train, plane)',
    example: 'We need to get off the train at the next station.',
    imageSrc: `${base}images/phrasal_verbs/list/get/off/transport.png`,
    imageAlt: 'People getting off a train at a station',
  },
  {
    definition: 'To finish work',
    example: 'I usually get off work at 5:00 PM.',
    imageSrc: `${base}images/phrasal_verbs/list/get/off/work.png`,
    imageAlt: 'A person leaving the office at the end of the workday',
  },
  {
    definition: 'To escape punishment',
    example: 'The manager made a huge mistake, but he got off with just a warning.',
    imageSrc: `${base}images/phrasal_verbs/list/get/off/punishment.png`,
    imageAlt: 'A boss giving a warning to an employee',
  },
  {
    definition: 'To send something (like a letter or email)',
    example: 'I will get this report off to the client before the end of the day.',
    imageSrc: `${base}images/phrasal_verbs/list/get/off/send.png`,
    imageAlt: 'Sending a report by email and by post',
  },
];

const onMeanings: Omit<MeaningProps, 'number' | 'storageKeyPrefix'>[] = [
  {
    definition: 'To step onto a form of public transport',
    example: 'Hurry up and get on the bus before it leaves!',
    imageSrc: `${base}images/phrasal_verbs/list/get/on/transport.png`,
    imageAlt: 'A person boarding a bus',
  },
  {
    definition: 'To make progress or handle a situation',
    example: 'How are you getting on with the new Java project?',
    imageSrc: `${base}images/phrasal_verbs/list/get/on/progress.png`,
    imageAlt: 'A person making progress on a project',
  },
  {
    definition: 'To have a good relationship (often "get on with")',
    example: 'I get on very well with my team members.',
    imageSrc: `${base}images/phrasal_verbs/list/get/on/relationship.png`,
    imageAlt: 'Team members having a good relationship',
  },
  {
    definition: 'To continue doing something',
    example: "Let's stop chatting and get on with the meeting.",
    imageSrc: `${base}images/phrasal_verbs/list/get/on/continue.png`,
    imageAlt: 'People continuing with a meeting',
  },
];

const downMeanings: Omit<MeaningProps, 'number' | 'storageKeyPrefix'>[] = [
  {
    definition: 'To move to a lower position',
    example: 'You need to get down from that ladder before you fall.',
    imageSrc: `${base}images/phrasal_verbs/list/get/down/climb_down.png`,
    imageAlt: 'A person climbing down a ladder',
  },
  {
    definition: 'To make someone feel sad or depressed',
    example: 'This rainy weather is really getting me down.',
    imageSrc: `${base}images/phrasal_verbs/list/get/down/sad.png`,
    imageAlt: 'A person feeling sad and depressed by rainy weather',
  },
  {
    definition: 'To write something',
    example: 'Let me get your contact details down in my notebook.',
    imageSrc: `${base}images/phrasal_verbs/list/get/down/write.png`,
    imageAlt: 'A person writing contact details in a notebook',
  },
  {
    definition: 'To start focusing on a task seriously (often "get down to")',
    example: "Enough small talk; let's get down to business.",
    imageSrc: `${base}images/phrasal_verbs/list/get/down/focus.png`,
    imageAlt: 'People getting down to business in a meeting',
  },
];

const inMeanings: Omit<MeaningProps, 'number' | 'storageKeyPrefix'>[] = [
  {
    definition: 'To enter a car, room, or building',
    example: 'Get in the car, we are going to be late.',
    imageSrc: `${base}images/phrasal_verbs/list/get/in/car.png`,
    imageAlt: 'A person getting into a car',
  },
  {
    definition: 'To arrive (usually a train, flight, or arriving at home/work)',
    example: 'What time does your flight get in?',
    imageSrc: `${base}images/phrasal_verbs/list/get/in/arriving.jpg`,
    imageAlt: 'A flight arriving at an airport',
  },
  {
    definition: 'To be accepted into a school, club, or organization',
    example: 'She applied to a top university and she got in.',
    imageSrc: `${base}images/phrasal_verbs/list/get/in/accepted.png`,
    imageAlt: 'A student receiving an acceptance letter',
  },
  {
    definition: 'To submit something',
    example: 'I need to get my expenses application in by Friday.',
    imageSrc: `${base}images/phrasal_verbs/list/get/in/submit.png`,
    imageAlt: 'A person submitting an expenses application',
  },
];

const intoMeanings: Omit<MeaningProps, 'number' | 'storageKeyPrefix'>[] = [
  {
    definition: 'To become interested or involved in something',
    example: 'I recently got into software development.',
    imageSrc: `${base}images/phrasal_verbs/list/get/into/interest.png`,
    imageAlt: 'A person becoming interested in software development',
  },
  {
    definition: 'To enter a specific state or situation',
    example: 'The company got into financial trouble last year.',
    imageSrc: `${base}images/phrasal_verbs/list/get/into/state.png`,
    imageAlt: 'A company in financial trouble',
  },
  {
    definition: 'To start a habit',
    example: "I've got into the habit of checking my emails before breakfast.",
    imageSrc: `${base}images/phrasal_verbs/list/get/into/hobby.png`,
    imageAlt: 'A person with a morning email-checking habit',
  },
];

const outMeanings: Omit<MeaningProps, 'number' | 'storageKeyPrefix'>[] = [
  {
    definition: 'To leave a place or a car',
    example: 'The fire alarm rang, and everyone got out of the building.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'People leaving a building after a fire alarm',
  },
  {
    definition: 'To become known (usually a secret or hidden information)',
    example: 'The news of the CEO leaving got out to the press.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'News of a CEO leaving spreading to the press',
  },
  {
    definition: 'To produce or publish something',
    example: 'We need to get this new application out by next month.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A team launching a new application',
  },
  {
    definition: 'To avoid doing something you do not want to do (often "get out of")',
    example: 'He tried to get out of doing the presentation, but his boss said no.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A person trying to avoid giving a presentation',
  },
];

const upMeanings: Omit<MeaningProps, 'number' | 'storageKeyPrefix'>[] = [
  {
    definition: 'To rise from bed after sleeping',
    example: 'I get up at 6:30 AM every morning.',
    imageSrc: `${base}images/phrasal_verbs/list/get/up/bed.png`,
    imageAlt: 'A person getting out of bed in the morning',
  },
  {
    definition: 'To stand up',
    example: 'He got up from his desk to welcome the visitors.',
    imageSrc: `${base}images/phrasal_verbs/list/get/up/desk.png`,
    imageAlt: 'A person standing up from their desk',
  },
  {
    definition: 'To organize or arrange something',
    example: 'We need to get up a team to handle this new software update.',
    imageSrc: `${base}images/phrasal_verbs/list/get/up/arrange.png`,
    imageAlt: 'People being organized into a team',
  },
];

const awayMeanings: Omit<MeaningProps, 'number' | 'storageKeyPrefix'>[] = [
  {
    definition: 'To escape',
    example: 'The thief got away before the police arrived.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A thief escaping before police arrive',
  },
  {
    definition: 'To go on a holiday or take a break',
    example: 'We are hoping to get away to the mountains for the weekend.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A family going on a holiday to the mountains',
  },
  {
    definition: 'To do something wrong without being punished (often "get away with")',
    example: "He lied about his sales numbers, but he won't get away with it.",
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A person lying about sales numbers without consequences',
  },
];

const acrossMeanings: Omit<MeaningProps, 'number' | 'storageKeyPrefix'>[] = [
  {
    definition: 'To communicate an idea successfully so people understand it',
    example: 'The leader got her vision across perfectly during the presentation.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A leader communicating their vision during a presentation',
  },
  {
    definition: 'To physically cross a road, river, or space',
    example: 'We need to get across the street.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'People crossing a street',
  },
];

const forwardMeanings: Omit<MeaningProps, 'number' | 'storageKeyPrefix'>[] = [
  {
    definition: 'To move to the front (often used in sports to describe attacking)',
    example: "The team's defenders need to get forward to help score a goal.",
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Defenders moving forward to help score a goal',
  },
];

const backMeanings: Omit<MeaningProps, 'number' | 'storageKeyPrefix'>[] = [
  {
    definition: 'To return to a place or a state',
    example: 'When did you get back from your business trip?',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A person returning from a business trip',
  },
  {
    definition: 'To have something returned to you',
    example: 'I finally got my laptop back from the IT department.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A person getting their laptop back from IT',
  },
  {
    definition: 'To return to a previous activity (often "get back to")',
    example: "I'll answer that question later; let's get back to the main topic.",
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'People getting back to the main topic in a meeting',
  },
  {
    definition: 'To take revenge on someone (often "get back at")',
    example: 'She wants to get back at her competitor by launching a better product.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A person planning to outperform a competitor',
  },
];

const byMeanings: Omit<MeaningProps, 'number' | 'storageKeyPrefix'>[] = [
  {
    definition: 'To manage to survive or do something with limited money, knowledge, or resources',
    example: "My Spanish isn't perfect, but I know enough to get by.",
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A person managing with limited resources',
  },
  {
    definition: 'To physically move past someone',
    example: 'Excuse me, could you move a little so I can get by?',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A person trying to move past someone in a corridor',
  },
];

const togetherMeanings: Omit<MeaningProps, 'number' | 'storageKeyPrefix'>[] = [
  {
    definition: 'To meet socially',
    example: "Let's get together for a coffee next week.",
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Friends meeting for coffee',
  },
  {
    definition: 'To organize your thoughts, life, or things (often "get your act together")',
    example: 'If he wants a promotion, he needs to get his act together and work harder.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A person organizing their work and thoughts',
  },
];

const withMeanings: Omit<MeaningProps, 'number' | 'storageKeyPrefix'>[] = [
  {
    definition: 'To understand or adapt to modern trends or new rules (informal)',
    example: 'You need to get with the new management strategy, or you will be left behind.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A person adapting to a new management strategy',
  },
];

const overMeanings: Omit<MeaningProps, 'number' | 'storageKeyPrefix'>[] = [
  {
    definition: 'To recover from an illness, a shock, or a bad emotional experience',
    example: 'It took him two weeks to get over the flu.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A person recovering from the flu',
  },
  {
    definition: 'To overcome a problem or difficulty',
    example: 'We need to get over this technical issue before the software launches.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A team overcoming a technical issue',
  },
  {
    definition: 'To finish something unpleasant so you don\'t have to worry about it (often "get it over with")',
    example: "I hate performance reviews, but let's just do it and get it over with.",
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A person finishing an unpleasant performance review',
  },
];

const aheadMeanings: Omit<MeaningProps, 'number' | 'storageKeyPrefix'>[] = [
  {
    definition: 'To be successful and make progress in your career or life',
    example: 'She reads a lot of business books because she wants to get ahead in her career.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A person reading business books to advance their career',
  },
];

const afterMeanings: Omit<MeaningProps, 'number' | 'storageKeyPrefix'>[] = [
  {
    definition: 'To urge, remind, or scold someone to do something they are supposed to do',
    example: 'I need to get after the developers to finish writing the code.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A manager urging developers to finish their work',
  },
  {
    definition: 'To chase someone or something',
    example: 'The dog got after the cat.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A dog chasing a cat',
  },
];

const behindMeanings: Omit<MeaningProps, 'number' | 'storageKeyPrefix'>[] = [
  {
    definition: 'To fall behind schedule or fail to keep up with work or payments',
    example: 'I was sick for a week, and I got behind on my emails.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A person falling behind on their emails after being sick',
  },
  {
    definition: 'To support a person, idea, or project',
    example: "The whole team got behind the new manager's plan.",
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: "A team supporting their manager's plan",
  },
];

const throughMeanings: Omit<MeaningProps, 'number' | 'storageKeyPrefix'>[] = [
  {
    definition: 'To finish a difficult task or survive a difficult period',
    example: 'We just need to get through this busy week, and then we can relax.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'People getting through a busy work week',
  },
  {
    definition: 'To make contact by telephone',
    example: "I tried to call customer service, but I couldn't get through.",
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A person unable to reach customer service by phone',
  },
  {
    definition: 'To make someone understand something (often "get through to")',
    example: "I've explained the risks, but I just can't get through to him.",
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A person trying to make someone understand the risks',
  },
];

const aboutAroundMeanings: Omit<MeaningProps, 'number' | 'storageKeyPrefix'>[] = [
  {
    definition: 'To travel to different places',
    example: 'We used the subway to get around the city.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'People using the subway to travel around a city',
  },
  {
    definition: 'To find a way to avoid a rule or solve a problem',
    example: 'The programmers found a clever way to get around the security block.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Programmers finding a way around a security block',
  },
  {
    definition: 'To spread (usually news or rumors)',
    example: 'Word gets around fast in this office.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'News spreading quickly through an office',
  },
  {
    definition: 'To finally do something you have delayed doing (often "get around to")',
    example: 'I will get around to updating my resume this weekend.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A person finally updating their resume',
  },
];

const toMeanings: Omit<MeaningProps, 'number' | 'storageKeyPrefix'>[] = [
  {
    definition: 'To arrive at a destination',
    example: 'What time did you get to the office this morning?',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A person arriving at the office in the morning',
  },
  {
    definition: 'To have the opportunity to do something',
    example: 'Because of my job, I get to travel all over the world.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A person traveling all over the world for their job',
  },
  {
    definition: 'To annoy or upset someone',
    example: 'The constant complaining is really getting to me.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A person being annoyed by constant complaining',
  },
  {
    definition: 'To begin an action (often "get to work")',
    example: "The break is over; let's get to work.",
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'People getting back to work after a break',
  },
];

function Section({
  particle,
  meanings,
  storageKey,
  storageKeyPrefix,
}: {
  particle: string;
  meanings: Omit<MeaningProps, 'number' | 'storageKeyPrefix'>[];
  storageKey: string;
  storageKeyPrefix: string;
}) {
  const [expanded, setExpanded] = useState(() => {
    const saved = localStorage.getItem(storageKey);
    return saved !== null ? saved === 'true' : false;
  });

  const toggle = () => {
    setExpanded(e => {
      const next = !e;
      localStorage.setItem(storageKey, String(next));
      return next;
    });
  };

  return (
    <div className="mb-5">
      <div
        className="flex items-center gap-2 cursor-pointer select-none mb-4 px-1"
        onClick={toggle}
      >
        <span className={`text-sm transition-transform duration-200 inline-block ${expanded ? 'rotate-90 text-white' : 'text-blue-600 dark:text-blue-400'}`}>
          ▶
        </span>
        <span className={`text-2xl font-bold ${expanded ? 'text-white' : 'text-blue-600 dark:text-blue-400'}`}>{particle}</span>
      </div>

      {expanded && (
        <div className="flex flex-col gap-6">
          {meanings.map((m, i) => (
            <Meaning key={i} number={i + 1} storageKeyPrefix={storageKeyPrefix} {...m} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function GetVerbPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 px-4 py-10">
      <div className="max-w-[700px] mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-6 text-center">
          Get
        </h1>

        <Section particle="off" meanings={offMeanings} storageKey="getOff_section_expanded" storageKeyPrefix="getOff" />
        <hr className="border-gray-600 dark:border-gray-500 my-2" />
        <Section particle="on" meanings={onMeanings} storageKey="getOn_section_expanded" storageKeyPrefix="getOn" />
        <hr className="border-gray-600 dark:border-gray-500 my-2" />
        <Section particle="up" meanings={upMeanings} storageKey="getUp_section_expanded" storageKeyPrefix="getUp" />
        <hr className="border-gray-600 dark:border-gray-500 my-2" />
        <Section particle="down" meanings={downMeanings} storageKey="getDown_section_expanded" storageKeyPrefix="getDown" />
        <hr className="border-gray-600 dark:border-gray-500 my-2" />
        <Section particle="in" meanings={inMeanings} storageKey="getIn_section_expanded" storageKeyPrefix="getIn" />
        <hr className="border-gray-600 dark:border-gray-500 my-2" />
        <Section particle="into" meanings={intoMeanings} storageKey="getInto_section_expanded" storageKeyPrefix="getInto" />
        <hr className="border-gray-600 dark:border-gray-500 my-2" />
        <Section particle="out" meanings={outMeanings} storageKey="getOut_section_expanded" storageKeyPrefix="getOut" />
        <hr className="border-gray-600 dark:border-gray-500 my-2" />
        <Section particle="away" meanings={awayMeanings} storageKey="getAway_section_expanded" storageKeyPrefix="getAway" />
        <hr className="border-gray-600 dark:border-gray-500 my-2" />
        <Section particle="across" meanings={acrossMeanings} storageKey="getAcross_section_expanded" storageKeyPrefix="getAcross" />
        <hr className="border-gray-600 dark:border-gray-500 my-2" />
        <Section particle="forward" meanings={forwardMeanings} storageKey="getForward_section_expanded" storageKeyPrefix="getForward" />
        <hr className="border-gray-600 dark:border-gray-500 my-2" />
        <Section particle="back" meanings={backMeanings} storageKey="getBack_section_expanded" storageKeyPrefix="getBack" />
        <hr className="border-gray-600 dark:border-gray-500 my-2" />
        <Section particle="by" meanings={byMeanings} storageKey="getBy_section_expanded" storageKeyPrefix="getBy" />
        <hr className="border-gray-600 dark:border-gray-500 my-2" />
        <Section particle="together" meanings={togetherMeanings} storageKey="getTogether_section_expanded" storageKeyPrefix="getTogether" />
        <hr className="border-gray-600 dark:border-gray-500 my-2" />
        <Section particle="with" meanings={withMeanings} storageKey="getWith_section_expanded" storageKeyPrefix="getWith" />
        <hr className="border-gray-600 dark:border-gray-500 my-2" />
        <Section particle="over" meanings={overMeanings} storageKey="getOver_section_expanded" storageKeyPrefix="getOver" />
        <hr className="border-gray-600 dark:border-gray-500 my-2" />
        <Section particle="ahead" meanings={aheadMeanings} storageKey="getAhead_section_expanded" storageKeyPrefix="getAhead" />
        <hr className="border-gray-600 dark:border-gray-500 my-2" />
        <Section particle="after" meanings={afterMeanings} storageKey="getAfter_section_expanded" storageKeyPrefix="getAfter" />
        <hr className="border-gray-600 dark:border-gray-500 my-2" />
        <Section particle="behind" meanings={behindMeanings} storageKey="getBehind_section_expanded" storageKeyPrefix="getBehind" />
        <hr className="border-gray-600 dark:border-gray-500 my-2" />
        <Section particle="through" meanings={throughMeanings} storageKey="getThrough_section_expanded" storageKeyPrefix="getThrough" />
        <hr className="border-gray-600 dark:border-gray-500 my-2" />
        <Section particle="about / around" meanings={aboutAroundMeanings} storageKey="getAboutAround_section_expanded" storageKeyPrefix="getAboutAround" />
        <hr className="border-gray-600 dark:border-gray-500 my-2" />
        <Section particle="to" meanings={toMeanings} storageKey="getTo_section_expanded" storageKeyPrefix="getTo" />
      </div>
    </div>
  );
}
