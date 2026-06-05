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
    if (window.getSelection()?.toString()) return;
    setCollapsed(c => {
      const next = !c;
      localStorage.setItem(storageKey, String(next));
      return next;
    });
  };

  return (
    <div
      className={`bg-white dark:bg-gray-900 rounded-2xl border border-gray-600 dark:border-gray-400 shadow-md overflow-hidden ${isDefault ? 'cursor-default' : 'cursor-pointer'}`}
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

const afterMeanings: Omit<MeaningProps, 'number' | 'storageKeyPrefix'>[] = [
  {
    definition: 'To chase someone or something',
    example: 'The security guard made after the shoplifter.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A security guard chasing a shoplifter',
  },
];

const awayMeanings: Omit<MeaningProps, 'number' | 'storageKeyPrefix'>[] = [
  {
    definition: 'To steal something and escape with it (make away with)',
    example: 'Hackers made away with thousands of encrypted passwords.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Hackers stealing encrypted passwords',
  },
];

const forMeanings: Omit<MeaningProps, 'number' | 'storageKeyPrefix'>[] = [
  {
    definition: 'To move directly towards a place',
    example: 'After the meeting ended, we made for the exit.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'People moving towards the exit after a meeting',
  },
  {
    definition: 'To help make something possible or produce a specific result',
    example: 'Clear communication makes for a highly effective management team.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A team communicating clearly and effectively',
  },
];

const intoMeanings: Omit<MeaningProps, 'number' | 'storageKeyPrefix'>[] = [
  {
    definition: 'To change or transform something into something else',
    example: 'The developers made the old legacy system into a modern Java application.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Developers transforming a legacy system into a modern application',
  },
];

const offMeanings: Omit<MeaningProps, 'number' | 'storageKeyPrefix'>[] = [
  {
    definition: 'To leave quickly, especially to escape after doing something wrong (make off with)',
    example: 'The thieves made off before the police arrived.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Thieves leaving quickly before police arrive',
  },
];

const outMeanings: Omit<MeaningProps, 'number' | 'storageKeyPrefix'>[] = [
  {
    definition: 'To manage to see, hear, or read something with difficulty',
    example: 'I could not make out the error message on the monitor because the screen was too bright.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A person struggling to read an error message on a bright screen',
  },
  {
    definition: "To understand someone's character or a situation",
    example: 'He is a very quiet team leader; I cannot quite make him out.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A person trying to understand their team leader',
  },
  {
    definition: 'To write all the necessary information on an official document (like a check or invoice)',
    example: "Please make the invoice out to the company's head office.",
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A person writing an invoice to a head office',
  },
  {
    definition: 'To claim or pretend that something is true',
    example: 'The software vendor made out that their system was completely bug-free.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A software vendor claiming their system has no bugs',
  },
  {
    definition: 'To progress, perform, or succeed in a situation',
    example: 'How did you make out with the new project timeline?',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A person asking about progress on a project timeline',
  },
  {
    definition: 'To kiss and touch romantically (informal)',
    example: 'The teenagers were making out in the back of the cinema.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Teenagers at the back of a cinema',
  },
];

const overMeanings: Omit<MeaningProps, 'number' | 'storageKeyPrefix'>[] = [
  {
    definition: 'To change or improve the appearance of someone or something',
    example: 'We made over the entire office space to encourage better collaboration.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'An office space being redesigned for better collaboration',
  },
  {
    definition: 'To legally transfer ownership of property or money to someone else',
    example: 'The CEO made over his shares to his business partner.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A CEO transferring shares to a business partner',
  },
];

const upMeanings: Omit<MeaningProps, 'number' | 'storageKeyPrefix'>[] = [
  {
    definition: 'To invent a story, excuse, or explanation',
    example: 'He made up an excuse for missing the daily stand-up meeting.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A person inventing an excuse for missing a meeting',
  },
  {
    definition: 'To form the whole of something',
    example: 'Senior developers make up 40% of our engineering department.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Senior developers forming part of an engineering department',
  },
  {
    definition: 'To become friendly again after an argument',
    example: 'The co-founders argued over the budget, but they made up the next day.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Two co-founders reconciling after an argument',
  },
  {
    definition: 'To prepare, build, or arrange something from parts',
    example: 'Can you make up a list of requirements for the new software module?',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A person preparing a list of requirements',
  },
];

const upForMeanings: Omit<MeaningProps, 'number' | 'storageKeyPrefix'>[] = [
  {
    definition: 'To compensate for something bad, missing, or lost',
    example: 'We worked late on Friday to make up for the time lost during the server crash.',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'Team members working late to compensate for lost time',
  },
];

const withMeanings: Omit<MeaningProps, 'number' | 'storageKeyPrefix'>[] = [
  {
    definition: 'To produce, supply, or give something quickly (slang/informal)',
    example: 'Make with the financial reports, the board is waiting!',
    imageSrc: `${base}images/phrasal_verbs/list/default.png`,
    imageAlt: 'A person urgently requesting financial reports for the board',
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

export default function MakeVerbPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 px-4 py-10">
      <div className="max-w-[700px] mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-6 text-center">
          Make
        </h1>

        <Section particle="after" meanings={afterMeanings} storageKey="makeAfter_section_expanded" storageKeyPrefix="makeAfter" />
        <hr className="border-gray-600 dark:border-gray-500 my-2" />
        <Section particle="away (with)" meanings={awayMeanings} storageKey="makeAway_section_expanded" storageKeyPrefix="makeAway" />
        <hr className="border-gray-600 dark:border-gray-500 my-2" />
        <Section particle="for" meanings={forMeanings} storageKey="makeFor_section_expanded" storageKeyPrefix="makeFor" />
        <hr className="border-gray-600 dark:border-gray-500 my-2" />
        <Section particle="into" meanings={intoMeanings} storageKey="makeInto_section_expanded" storageKeyPrefix="makeInto" />
        <hr className="border-gray-600 dark:border-gray-500 my-2" />
        <Section particle="off (with)" meanings={offMeanings} storageKey="makeOff_section_expanded" storageKeyPrefix="makeOff" />
        <hr className="border-gray-600 dark:border-gray-500 my-2" />
        <Section particle="out" meanings={outMeanings} storageKey="makeOut_section_expanded" storageKeyPrefix="makeOut" />
        <hr className="border-gray-600 dark:border-gray-500 my-2" />
        <Section particle="over" meanings={overMeanings} storageKey="makeOver_section_expanded" storageKeyPrefix="makeOver" />
        <hr className="border-gray-600 dark:border-gray-500 my-2" />
        <Section particle="up" meanings={upMeanings} storageKey="makeUp_section_expanded" storageKeyPrefix="makeUp" />
        <hr className="border-gray-600 dark:border-gray-500 my-2" />
        <Section particle="up for" meanings={upForMeanings} storageKey="makeUpFor_section_expanded" storageKeyPrefix="makeUpFor" />
        <hr className="border-gray-600 dark:border-gray-500 my-2" />
        <Section particle="with" meanings={withMeanings} storageKey="makeWith_section_expanded" storageKeyPrefix="makeWith" />
      </div>
    </div>
  );
}
