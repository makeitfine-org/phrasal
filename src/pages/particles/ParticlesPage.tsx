import React from 'react';

const PARTICLES = [
  { name: 'off',            description: 'Indicates breaking contact between two things, moving away from a surface, or stopping a process.' },
  { name: 'on',             description: 'The exact opposite of "off." Indicates attachment, continuation, activation, or starting a process.' },
  { name: 'up',             description: 'Indicates completion, improvement, increase, creation, or physical upward movement.' },
  { name: 'down',           description: 'Indicates reduction, lowering, stopping, restriction, or completing something on paper.' },
  { name: 'in',             description: 'Indicates inclusion, entry, penetration, submission, or movement toward the interior of a space, system, or group.' },
  { name: 'into',           description: 'Transformation, deep entry, intense investigation, or crash involvement.' },
  { name: 'out',            description: 'Indicates exclusion, exit, extension, public release, fading away, or doing something completely to the very end.' },
  { name: 'away',           description: 'Indicates continuous action, complete disappearance, moving to a safe distance, or giving things to others freely.' },
  { name: 'cross / across', description: 'Indicates movement from one side to another, intersecting paths, or clear communication that bridges a gap.' },
  { name: 'forward',        description: 'Indicates advancement, progression toward the future, anticipation, or sending something onward to a next stage or recipient.' },
  { name: 'back',           description: 'Return, retreat, retaliation, or looking at the past.' },
  { name: 'for',            description: 'Indicates purpose, substitution, destination, representation, or seeking a specific target. Answers "why" or "what is the goal."' },
  { name: 'by',             description: 'Proximity (passing near something), survival (managing with limited resources), brief visits, or passive adherence to rules.' },
  { name: 'together',       description: 'Unification, connection, collaboration, organization, or combining individual parts into a single whole.' },
  { name: 'with',           description: 'Indicates accompaniment, agreement, handling a situation, sharing an emotion, or possessing a specific trait.' },
  { name: 'without',        description: 'Indicates deprivation, managing a lack of something, skipping an action, or excluding an item.' },
  { name: 'apart',          description: 'Indicates separation, disintegration, division, or breaking into smaller pieces.' },
  { name: 'over',           description: 'Indicates repetition, transition across a boundary, visual inspection, falling, or complete control and dominance.' },
  { name: 'ahead',          description: 'Indicates future planning, moving forward in time or space, or gaining an advantage and being successful.' },
  { name: 'after',          description: 'Indicates pursuit, caretaking, imitation, or tracking a timeline.' },
  { name: 'behind',         description: 'Indicates falling back in progress, leaving something at a previous location, supporting someone, or hidden motives.' },
  { name: 'through',        description: 'Indicates completion from beginning to end, endurance during a difficult time, penetration across a barrier, or deep inspection.' },
  { name: 'about',          description: 'Indicates aimless movement, proximity, a shift in direction, or a topic of focus.' },
  { name: 'around / round', description: 'Circular motion, casual or aimless activity, bypassing an obstacle, changing your mind, or spreading to many people.' },
  { name: 'to',             description: 'Direction, alignment, attachment, awakening, or a direct response to a person or thing.' },
  { name: 'against',        description: 'Opposition, physical contact or leaning, comparison, or preparation for an upcoming problem.' },
  { name: 'along',          description: 'Indicates either forward movement/progress, accompaniment, or agreement.' },
];

export const PARTICLE_NAMES = PARTICLES.map(p => p.name);

export default function ParticlesPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col items-center p-6 pt-12">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2">Particles</h1>
      <p className="text-gray-500 dark:text-gray-400 mb-10 text-lg">
        Core meanings of the most common phrasal verb particles
      </p>
      <div className="flex flex-col gap-3 w-full max-w-sm">
        {PARTICLES.map(({ name, description }) => (
          <div
            key={name}
            className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-md p-4"
          >
            <p className="text-base font-semibold text-gray-900 dark:text-gray-100">{name}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
