import React, { useEffect, useRef } from 'react';
import { XIcon } from './Icons';
import { useFocusTrap } from '../hooks/useFocusTrap';

interface TutorialModalProps {
  onClose: () => void;
}

const sections = [
  {
    heading: 'I wish I did',
    rule: 'We can use wish + subject + past simple to talk about things that we would like to be different in the present or future (but that are very unlikely or impossible).',
    examples: [
      'I wish things were different, but this is the way they are.',
      'We wish we had enough money to help you.',
      'I wish I could be there for you tomorrow.',
    ],
    note: null,
  },
  {
    heading: 'I wish I had done',
    rule: 'We can use wish + subject + past perfect to talk about things that happened in the past and that we regret (we would have wanted them to be different).',
    examples: [
      "I wish I hadn't quit my job two years ago.",
      "I wish we hadn't wasted all that money.",
    ],
    note: null,
  },
  {
    heading: 'I wish you would do',
    rule: 'We can use wish + person/thing + would + infinitive when we talk about situations that annoy us and would like them to change or to stop.',
    examples: [
      "I wish you would stop biting your nails. I hate it when you do it.",
      "I wish it would stop raining. It's been three days!",
    ],
    note: 'We can NOT use this structure to wish about ourselves: "I wish I would…"',
  },
  {
    heading: 'If only',
    rule: 'We can use if only instead of I wish with a very similar meaning. The only difference is that if only is more emphatic.',
    examples: [
      'If only I was/were a bit taller!*',
      'If only you had followed my advice.',
      'If only you would make a bit of an effort. You are wasting your life!',
    ],
    note: '🔍 Note that we can use were instead of was with I/he/she after I wish/if only.',
  },
];

export default function TutorialModal({ onClose }: TutorialModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  useFocusTrap(panelRef);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="tutorial-modal-title"
        className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-lg w-full max-h-[80vh] flex flex-col border border-gray-200 dark:border-gray-800"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-5 border-b border-gray-200 dark:border-gray-800">
          <h2 id="tutorial-modal-title" className="text-lg font-bold text-gray-900 dark:text-white">
            I wish / If only — Tutorial
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors border border-gray-200 dark:border-gray-700"
            aria-label="Close"
          >
            <XIcon />
          </button>
        </div>

        <div className="overflow-y-auto flex-1 p-5 space-y-6">
          {sections.map(section => (
            <div key={section.heading}>
              <h3 className="text-base font-bold text-indigo-700 dark:text-indigo-400 mb-2">
                {section.heading}
              </h3>
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-3 leading-relaxed">
                {section.rule}
              </p>
              <ul className="space-y-1 mb-2">
                {section.examples.map((ex, i) => (
                  <li
                    key={i}
                    className="text-sm italic text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-800 px-3 py-1.5 rounded-lg border-l-2 border-indigo-300 dark:border-indigo-600"
                  >
                    {ex}
                  </li>
                ))}
              </ul>
              {section.note && (
                <p className="text-xs text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700/50 px-3 py-2 rounded-lg">
                  {section.note}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
