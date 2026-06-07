# Plan: Add Particles Reference Page

## Context
The app has verb-specific detail pages (Get, Make, Put, Take, Give, Go, Come) accessible from the Phrasal Verbs List page. The user wants a **Particles reference page** — a static page listing 27 phrasal verb particles (off, on, up, down, in, into, out, away, cross/across, forward, back, for, by, together, with, without, apart, over, ahead, after, behind, through, about, around/round, to, against, along) each with a one-line core-meaning description. A link card for this page goes **at the top** of the list page, followed by a thin divider separating it from the verb cards.

---

## 1. New page: `src/pages/particles/ParticlesPage.tsx`

Static reference page — no VerbPageLayout, no accordion. Follows `GrammarPage.tsx` as the structural model.

**Data constant** (top of file):
```ts
const PARTICLES = [
  { name: 'off',           description: 'Indicates breaking contact between two things, moving away from a surface, or stopping a process.' },
  { name: 'on',            description: 'The exact opposite of "off." Indicates attachment, continuation, activation, or starting a process.' },
  { name: 'up',            description: 'Indicates completion, improvement, increase, creation, or physical upward movement.' },
  { name: 'down',          description: 'Indicates reduction, lowering, stopping, restriction, or completing something on paper.' },
  { name: 'in',            description: 'Indicates inclusion, entry, penetration, submission, or movement toward the interior of a space, system, or group.' },
  { name: 'into',          description: 'Transformation, deep entry, intense investigation, or crash involvement.' },
  { name: 'out',           description: 'Indicates exclusion, exit, extension, public release, fading away, or doing something completely to the very end.' },
  { name: 'away',          description: 'Indicates continuous action, complete disappearance, moving to a safe distance, or giving things to others freely.' },
  { name: 'cross / across',description: 'Indicates movement from one side to another, intersecting paths, or clear communication that bridges a gap.' },
  { name: 'forward',       description: 'Indicates advancement, progression toward the future, anticipation, or sending something onward to a next stage or recipient.' },
  { name: 'back',          description: 'Return, retreat, retaliation, or looking at the past.' },
  { name: 'for',           description: 'Indicates purpose, substitution, destination, representation, or seeking a specific target. Answers "why" or "what is the goal."' },
  { name: 'by',            description: 'Proximity (passing near something), survival (managing with limited resources), brief visits, or passive adherence to rules.' },
  { name: 'together',      description: 'Unification, connection, collaboration, organization, or combining individual parts into a single whole.' },
  { name: 'with',          description: 'Indicates accompaniment, agreement, handling a situation, sharing an emotion, or possessing a specific trait.' },
  { name: 'without',       description: 'Indicates deprivation, managing a lack of something, skipping an action, or excluding an item.' },
  { name: 'apart',         description: 'Indicates separation, disintegration, division, or breaking into smaller pieces.' },
  { name: 'over',          description: 'Indicates repetition, transition across a boundary, visual inspection, falling, or complete control and dominance.' },
  { name: 'ahead',         description: 'Indicates future planning, moving forward in time or space, or gaining an advantage and being successful.' },
  { name: 'after',         description: 'Indicates pursuit, caretaking, imitation, or tracking a timeline.' },
  { name: 'behind',        description: 'Indicates falling back in progress, leaving something at a previous location, supporting someone, or hidden motives.' },
  { name: 'through',       description: 'Indicates completion from beginning to end, endurance during a difficult time, penetration across a barrier, or deep inspection.' },
  { name: 'about',         description: 'Indicates aimless movement, proximity, a shift in direction, or a topic of focus.' },
  { name: 'around / round',description: 'Circular motion, casual or aimless activity, bypassing an obstacle, changing your mind, or spreading to many people.' },
  { name: 'to',            description: 'Direction, alignment, attachment, awakening, or a direct response to a person or thing.' },
  { name: 'against',       description: 'Opposition, physical contact or leaning, comparison, or preparation for an upcoming problem.' },
  { name: 'along',         description: 'Indicates either forward movement/progress, accompaniment, or agreement.' },
];
```

**Layout:**
```tsx
<div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col items-center p-6 pt-12">
  <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2">Particles</h1>
  <p className="text-gray-500 dark:text-gray-400 mb-10 text-lg">
    Core meanings of the most common phrasal verb particles
  </p>
  <div className="flex flex-col gap-3 w-full max-w-sm">
    {PARTICLES.map(({ name, description }) => (
      <div key={name} className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-md p-4">
        <p className="text-base font-semibold text-gray-900 dark:text-gray-100">{name}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{description}</p>
      </div>
    ))}
  </div>
</div>
```

---

## 2. Wire up route in `src/main.tsx`

Add import and route **before** the `/phrasal-verbs/list` route:
```tsx
import ParticlesPage from './pages/particles/ParticlesPage';
// ...
<Route path="/phrasal-verbs/particles" element={<ParticlesPage />} />
```

---

## 3. Add Particles card to `src/pages/PhrasalVerbsListPage.tsx`

**Add constant** (near top, with other particle lists):
```ts
const PARTICLE_NAMES = [
  'off', 'on', 'up', 'down', 'in', 'into', 'out', 'away', 'cross / across',
  'forward', 'back', 'for', 'by', 'together', 'with', 'without', 'apart',
  'over', 'ahead', 'after', 'behind', 'through', 'about', 'around / round',
  'to', 'against', 'along',
];
```

**Add** `const particleNamesText = PARTICLE_NAMES.join(', ');` in the component body.

**Insert at the top of the cards `<div>`, before the Get card:**
```jsx
<Link
  to="/phrasal-verbs/particles"
  className="block rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-md hover:shadow-lg transition-shadow p-6"
>
  <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-1">Particles</h2>
  <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2" title={particleNamesText}>
    {particleNamesText}
  </p>
</Link>
<hr className="border-gray-200 dark:border-gray-700" />
```

No copy button — particles are reference content, not a word list to copy.

---

## 4. Tests

### `src/__tests__/ParticlesPage.test.tsx`
Follow `GrammarPage.test.tsx` pattern — render with `<MemoryRouter>`:
- Renders "Particles" heading
- Renders subtitle "Core meanings of the most common phrasal verb particles"
- Renders all 27 particle names (loop through the list and assert each `name` is in the document)
- Renders a sample of descriptions (e.g. for `off`, `into`, `along`) to confirm data is wired correctly

### `src/__tests__/PhrasalVerbsListPage.test.tsx` additions
- Add `/phrasal-verbs/particles` route to `renderPageWithRoutes()`
- **Particles card** describe block:
  - Renders "Particles" heading
  - Link href is `/phrasal-verbs/particles`
- **Particles subtitle** describe block:
  - Subtitle renders (matches e.g. `/off, on, up/i`)
  - Has `line-clamp-2` class
  - `title` attribute contains representative particles (`cross / across`, `around / round`, `along`)
- **Particles divider** describe block:
  - An `<hr>` element exists between the Particles card and the Get card

---

## Verification

```bash
npm run test:run
```

All existing tests pass. New tests cover the ParticlesPage content and the list-page Particles card.