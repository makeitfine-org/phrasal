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
  const storageKey = `${storageKeyPrefix}_meaning_${number}_collapsed`;
  const [collapsed, setCollapsed] = useState(() => {
    const saved = localStorage.getItem(storageKey);
    return saved !== null ? saved === 'true' : true;
  });

  const toggle = () => {
    setCollapsed(c => {
      const next = !c;
      localStorage.setItem(storageKey, String(next));
      return next;
    });
  };

  return (
    <div
      className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-600 dark:border-gray-400 shadow-md overflow-hidden cursor-pointer select-none"
      onClick={toggle}
    >
      <div className="p-4">
        <div className="flex items-start gap-2">
          <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center">
            {number}
          </span>
          <p
            className="text-gray-800 dark:text-gray-100 text-xl md:text-base font-medium leading-snug truncate"
            title={definition}
          >
            {definition}
          </p>
        </div>
      </div>
      {!collapsed && (
        <div className="px-4 pb-4">
          <div className="flex justify-center mb-3">
            <img
              src={imageSrc}
              alt={imageAlt}
              className="max-w-sm w-full border border-gray-200 dark:border-gray-700 rounded-xl"
              
            />
          </div>
          <p className="text-gray-500 dark:text-gray-400 text-xl md:text-sm italic pl-8">
            "{example}"
          </p>
        </div>
      )}
    </div>
  );
}

const base = import.meta.env.BASE_URL;

const offMeanings: Omit<MeaningProps, 'number'>[] = [
  {
    definition: 'To leave a form of public transport (bus, train, plane)',
    example: 'We need to get off the train at the next station.',
    imageSrc: `${base}images/get/off/transport.png`,
    imageAlt: 'People getting off a train at a station',
  },
  {
    definition: 'To finish work',
    example: 'I usually get off work at 5:00 PM.',
    imageSrc: `${base}images/get/off/work.png`,
    imageAlt: 'A person leaving the office at the end of the workday',
  },
  {
    definition: 'To escape punishment',
    example: 'The manager made a huge mistake, but he got off with just a warning.',
    imageSrc: `${base}images/get/off/punishment.png`,
    imageAlt: 'A boss giving a warning to an employee',
  },
  {
    definition: 'To send something (like a letter or email)',
    example: 'I will get this report off to the client before the end of the day.',
    imageSrc: `${base}images/get/off/send.png`,
    imageAlt: 'Sending a report by email and by post',
  },
];

const onMeanings: Omit<MeaningProps, 'number'>[] = [
  {
    definition: 'To step onto a form of public transport',
    example: 'Hurry up and get on the bus before it leaves!',
    imageSrc: `${base}images/get/on/transport.png`,
    imageAlt: 'A person boarding a bus',
  },
  {
    definition: 'To make progress or handle a situation',
    example: 'How are you getting on with the new Java project?',
    imageSrc: `${base}images/get/on/progress.png`,
    imageAlt: 'A person making progress on a project',
  },
  {
    definition: 'To have a good relationship (often "get on with")',
    example: 'I get on very well with my team members.',
    imageSrc: `${base}images/get/on/relationship.png`,
    imageAlt: 'Team members having a good relationship',
  },
  {
    definition: 'To continue doing something',
    example: "Let's stop chatting and get on with the meeting.",
    imageSrc: `${base}images/get/on/continue.png`,
    imageAlt: 'People continuing with a meeting',
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
    return saved !== null ? saved === 'true' : true;
  });

  const toggle = () => {
    setExpanded(e => {
      const next = !e;
      localStorage.setItem(storageKey, String(next));
      return next;
    });
  };

  return (
    <div className="mb-10">
      <div
        className="flex items-center gap-2 cursor-pointer select-none mb-4 px-1"
        onClick={toggle}
      >
        <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">{particle}</span>
        <span className={`text-blue-600 dark:text-blue-400 text-sm transition-transform duration-200 inline-block ${expanded ? 'rotate-90' : ''}`}>
          ▶
        </span>
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
        <Section particle="on" meanings={onMeanings} storageKey="getOn_section_expanded" storageKeyPrefix="getOn" />
      </div>
    </div>
  );
}
