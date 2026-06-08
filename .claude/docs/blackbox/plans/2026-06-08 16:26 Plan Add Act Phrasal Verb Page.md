# Plan: Add "Act" Phrasal Verb Page

## Context
The user provided content for five "Act" phrasal verbs (act on/upon, act up, act out, act for, act against) and wants them exposed the same way the existing verb pages work: a card on the list page linking to a dedicated verb page with expandable sections and meaning cards.

---

## Files to Modify

### 1. `src/pages/PhrasalVerbsListPage.tsx`
Add `ACT_PARTICLES` constant and a new entry in `VERBS`:
```ts
const ACT_PARTICLES = ['on / upon', 'up', 'out', 'for', 'against'];

// in VERBS array — append after 'come':
{ key: 'act', label: 'Act', to: '/phrasal-verbs/list/act', particles: ACT_PARTICLES },
```

### 2. `src/main.tsx`
Import and register the new route:
```ts
import ActVerbPage from './pages/act/ActVerbPage';
// in Routes (after come):
<Route path="/phrasal-verbs/list/act" element={<ActVerbPage />} />
```

### 3. `src/data/listVerbIndex.ts`
Import act sections and add to the search index:
```ts
import { sections as actSections } from '../pages/act/ActVerbPage';
// in listVerbIndex array:
...buildEntries(actSections, 'Act', '/phrasal-verbs/list/act'),
```

### 4. NEW `src/pages/act/ActVerbPage.tsx`
Model directly on `GetVerbPage.tsx`. Five particles with the content below.

**Sections & meanings (from user input):**

| Particle | storageKeyPrefix | # meanings |
|----------|-----------------|-----------|
| on / upon | `actOn` | 2 |
| up | `actUp` | 2 |
| out | `actOut` | 2 |
| for | `actFor` | 1 |
| against | `actAgainst` | 1 |

Each `MeaningData` picks the **first example** sentence from the user's list.  
Image paths follow convention: `${base}images/phrasal_verbs/list/act/{particle}/{slug}.png`  
(Actual image files are out of scope; broken-image graceful rendering is handled by the browser.)

**Content:**

- **on / upon**
  1. def: "To take action because of information, advice, or instructions." / ex: "The manager decided to act on the feedback she received from the team." / img: `on/take_action.png`
  2. def: "To have an effect on something (often used in medicine or science)." / ex: "This type of medication acts on the nervous system to reduce pain." / img: `on/effect.png`

- **up**
  1. def: "To misbehave or cause trouble (usually referring to children)." / ex: "The children were bored, so they started acting up in the classroom." / img: `up/misbehave.png`
  2. def: "To malfunction, stop working properly, or cause physical pain (referring to machines or body parts)." / ex: "My old laptop is acting up again; the screen keeps freezing." / img: `up/malfunction.png`

- **out**
  1. def: "To perform a story, scene, or situation using actions and words." / ex: "During the workshop, the developers acted out the user's journey to understand the software requirements better." / img: `out/perform.png`
  2. def: "To express negative emotions or stress through disruptive or bad behavior, often because the person cannot talk about their feelings." / ex: "The teenager was acting out at school because of his parents' divorce." / img: `out/emotions.png`

- **for**
  1. def: "To represent someone else or do something on their behalf (especially in legal or business situations)." / ex: "The lawyer was hired to act for the CEO during the contract negotiations." / img: `for/represent.png`

- **against**
  1. def: "To do something that opposes, harms, or violates a person, rule, or interest." / ex: "By sharing confidential data, the employee acted against the company's core policies." / img: `against/oppose.png`

Export `sections` (required by `listVerbIndex.ts`) and a default `ActVerbPage` component rendered via `<VerbPageLayout sections={sections} verb="Act" />`.

---

## Test Files

### 5. NEW `src/__tests__/act_verb_page/helpers.tsx`
```ts
import ActVerbPage from '../../pages/act/ActVerbPage';
import { createVerbPageHelpers } from '../verbPage/helpers';
export const { renderPage, getCard, getSection, expandSection } = createVerbPageHelpers(ActVerbPage);
```

### 6. NEW test files — one per particle
Pattern mirrors `src/__tests__/get_verb_page/off.test.tsx`.

| File | particle | storageKey | firstDef regex |
|------|----------|-----------|----------------|
| `on_upon.test.tsx` | `on / upon` | `actOn_section_expanded` | `/To take action because of/i` |
| `up.test.tsx` | `up` | `actUp_section_expanded` | `/To misbehave or cause trouble/i` |
| `out.test.tsx` | `out` | `actOut_section_expanded` | `/To perform a story/i` |
| `for.test.tsx` | `for` | `actFor_section_expanded` | `/To represent someone else/i` |
| `against.test.tsx` | `against` | `actAgainst_section_expanded` | `/To do something that opposes/i` |

Each test file covers:
- Definition text renders (one `it` per meaning)
- `describeSectionToggle(...)` — collapse/expand + localStorage
- `describeChevronAndColour(...)` — chevron + colour
- Card border classes (light/dark)
- Card expand/collapse (example visibility, image count)
- localStorage persistence for card expanded state

### 7. MODIFY `src/__tests__/PhrasalVerbsListPage.test.tsx`
- Add `ALL_ACT_PARTICLES = ['on / upon', 'up', 'out', 'for', 'against']`
- Add `renderPageWithRoutes` route for `/phrasal-verbs/list/act`
- Add a describe block for "Act" card mirroring the existing per-verb blocks:
  - Renders "Act" heading
  - Link navigates to `/phrasal-verbs/list/act`
  - Expand/collapse shows correct particles subtitle
  - Copy button copies particle list

---

## Verification
```bash
npm run test:run   # all tests pass
npm run build      # no TypeScript errors
```
Manually: visit `/phrasal-verbs/list` → see Act card → click link → see Act verb page with 5 collapsible sections.