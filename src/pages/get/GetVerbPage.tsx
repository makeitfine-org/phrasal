import React from 'react';

interface MeaningProps {
  number: number;
  definition: string;
  example: string;
  imageSrc: string;
  imageAlt: string;
}

function Meaning({ number, definition, example, imageSrc, imageAlt }: MeaningProps) {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-md overflow-hidden">
      <img
        src={imageSrc}
        alt={imageAlt}
        className="w-full"
      />
      <div className="p-6">
        <div className="flex items-start gap-3 mb-3">
          <span className="flex-shrink-0 w-7 h-7 rounded-full bg-blue-600 text-white text-sm font-bold flex items-center justify-center">
            {number}
          </span>
          <p className="text-gray-800 dark:text-gray-100 font-medium leading-snug">
            {definition}
          </p>
        </div>
        <p className="text-gray-500 dark:text-gray-400 text-sm italic pl-10">
          "{example}"
        </p>
      </div>
    </div>
  );
}

const base = import.meta.env.BASE_URL;

const meanings: Omit<MeaningProps, 'number'>[] = [
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

export default function GetVerbPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 px-4 py-10">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-1 text-center">
          Get off
        </h1>
        <p className="mb-10" />

        <div className="flex flex-col gap-6">
          {meanings.map((m, i) => (
            <Meaning key={i} number={i + 1} {...m} />
          ))}
        </div>
      </div>
    </div>
  );
}
