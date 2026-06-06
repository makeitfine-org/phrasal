import React, { useState } from 'react';

export interface MeaningData {
  definition: string;
  example: string;
  imageSrc: string;
  imageAlt: string;
}

export interface SectionData {
  particle: string;
  storageKey: string;
  storageKeyPrefix: string;
  meanings: MeaningData[];
}

interface MeaningProps extends MeaningData {
  number: number;
  storageKeyPrefix: string;
}

function Meaning({ number, definition, example, imageSrc, imageAlt, storageKeyPrefix }: MeaningProps) {
  const isDefault = imageSrc.endsWith('default.png');
  const storageKey = `${storageKeyPrefix}_meaning_${number}_collapsed`;
  const [collapsed, setCollapsed] = useState(() => {
    const saved = localStorage.getItem(storageKey);
    return saved !== null ? saved === 'true' : true;
  });

  const toggle = () => {
    if (window.getSelection()?.toString()) return;
    setCollapsed(c => {
      const next = !c;
      localStorage.setItem(storageKey, String(next));
      return next;
    });
  };

  return (
    <div
      className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-600 dark:border-gray-400 shadow-md overflow-hidden cursor-pointer"
      onClick={toggle}
    >
      <div className="p-4">
        {!collapsed && !isDefault && (
          <div className="flex justify-center mb-3">
            <img
              src={imageSrc}
              alt={imageAlt}
              className="max-w-sm w-full border border-gray-200 dark:border-gray-700 rounded-xl"
            />
          </div>
        )}
        <div className="flex items-start gap-2">
          <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center">
            {number}
          </span>
          <div className="min-w-0 flex-1">
            <p
              className={`text-gray-800 dark:text-gray-100 text-xl md:text-base font-medium leading-snug${collapsed ? ' truncate' : ''}`}
              title={definition}
            >
              {definition}
            </p>
            <p
              className={`text-gray-500 dark:text-gray-400 text-xl md:text-sm italic mt-0.5${collapsed ? ' truncate' : ''}`}
              title={`"${example}"`}
            >
              "{example}"
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Section({ particle, meanings, storageKey, storageKeyPrefix }: SectionData) {
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

export default function VerbPageLayout({ title, sections }: { title: string; sections: SectionData[] }) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 px-4 py-10">
      <div className="max-w-[700px] mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-6 text-center">
          {title}
        </h1>
        {sections.map((s, i) => (
          <React.Fragment key={s.particle}>
            {i > 0 && <hr className="border-gray-600 dark:border-gray-500 my-2" />}
            <Section {...s} />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
