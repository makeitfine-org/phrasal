# Plan: Add "Give" Verb Page

## Context
The app has detail pages for Get, Make, Put, and Take. The user wants to add a "Give" page with 11 phrasal-verb sections (give away, back, in, in to, off, on/onto, out, over, up, (it) up for, with), a link card on the list page, and full test coverage — following the exact same pattern as TakeVerbPage.

---

## 1. New page: `src/pages/give/GiveVerbPage.tsx`

Import `VerbPageLayout, { MeaningData, SectionData }` from `../../components/VerbPage`.

Define `const base = import.meta.env.BASE_URL;` and one `*Meanings: MeaningData[]` array per particle. All `imageSrc` values use `${base}images/phrasal_verbs/list/default.png` (no give-specific images yet).

**Sections (11 total, 23 meanings):**

| Particle | `storageKeyPrefix` | Meanings |
|---|---|---|
| `away` | `giveAway` | 1) provide for free, 2) reveal a secret, 3) betray true identity/feelings, 4) formally hand over a bride |
| `back` | `giveBack` | 1) return to original owner, 2) contribute to society/community |
| `in` | `giveIn` | 1) yield/surrender to demands, 2) hand over / submit a document (British) |
| `in to` | `giveInTo` | 1) stop resisting a feeling, desire, or pressure |
| `off` | `giveOff` | 1) produce/emit something physical or an invisible feeling |
| `on / onto` | `giveOnOnto` | 1) open toward / provide a view of (doors, windows, rooms) |
| `out` | `giveOut` | 1) distribute to a group, 2) stop working / fail completely, 3) make information public |
| `over` | `giveOver` | 1) hand over control/responsibility, 2) dedicate time/space to a purpose, 3) stop doing sth annoying (British informal) |
| `up` | `giveUp` | 1) stop trying / accept defeat, 2) stop a regular habit, 3) part with sth valuable / give time, 4) surrender to authorities |
| `(it) up for` | `giveItUpFor` | 1) applaud / clap for someone |
| `with` | `giveWith` | 1) provide or tell information (informal/slang) |

`storageKey` for each section: `{prefix}_section_expanded` (e.g. `giveAway_section_expanded`).

Export default `GiveVerbPage` → `<VerbPageLayout title="Give" sections={sections} />`.

---

## 2. Wire up route in `src/main.tsx`

Add import:
```ts
import GiveVerbPage from './pages/give/GiveVerbPage';
```
Add route after the take route:
```tsx
<Route path="/phrasal-verbs/list/give" element={<GiveVerbPage />} />
```

---

## 3. Add Give card to `src/pages/PhrasalVerbsListPage.tsx`

- Add `GIVE_PARTICLES` constant: `['away', 'back', 'in', 'in to', 'off', 'on / onto', 'out', 'over', 'up', '(it) up for', 'with']`
- Add `const [giveCopied, setGiveCopied] = useState(false);`
- Add `handleGiveCopy` — same pattern as `handleTakeCopy`
- Add `const giveParticlesText = GIVE_PARTICLES.join(', ');`
- Add `<Link to="/phrasal-verbs/list/give" ...>` card — same JSX structure as the Take card, substituting Give everywhere

---

## 4. Tests

### `src/__tests__/give_verb_page/helpers.tsx`
Mirrors `take_verb_page/helpers.tsx` — imports `GiveVerbPage` and calls `createVerbPageHelpers`.

### `src/__tests__/give_verb_page/general.test.tsx`
- renders "Give" heading
- renders all 11 section particles
- all sections start collapsed
- badge counts: `'4'` appears in exactly 2 sections (away, up); `'3'` in exactly 2 (out, over); `'2'` in exactly 2 (back, in); `'1'` appears in every expanded section (≥11)

### Per-particle test files (11 files, one per section):
`away.test.tsx`, `back.test.tsx`, `in.test.tsx`, `in_to.test.tsx`, `off.test.tsx`, `on_onto.test.tsx`, `out.test.tsx`, `over.test.tsx`, `up.test.tsx`, `it_up_for.test.tsx`, `with.test.tsx`

Each file follows the `off.test.tsx` pattern (from take_verb_page):
- **Definition tests** — one `it` per meaning verifying the definition text renders after `expandSection`
- `describeSectionToggle(LABEL, particle, storageKey, /first definition/i, renderPage)` — from `sharedSectionTests`
- `describeChevronAndColour(LABEL, particle, renderPage)` — from `sharedSectionTests`
- `describeMeaningCardLayout(LABEL, particle, /first def/i, /first example/i, renderPage, getCard)` — from `sharedSectionTests`
- **Card expand/collapse** — collapsed hides examples + images, click expands, click again collapses, all cards expanded shows all examples + correct image count
- **Expanded card layout** — truncate class on collapsed def, no truncate on expanded, image before def before example in DOM

### `src/__tests__/PhrasalVerbsListPage.test.tsx` additions
- Add `/phrasal-verbs/list/give` route to `renderPageWithRoutes()`
- `ALL_GIVE_PARTICLES` constant
- **Give card** describe block: renders "Give" heading, link href is `/phrasal-verbs/list/give`
- **Give particles subtitle** describe block: subtitle renders, has `line-clamp-2`, title attr contains unique particles (`on / onto`, `(it) up for`)
- **Give copy button** describe block: renders, correct title before/after click, clipboard content, reverts after 1500 ms, does not navigate

---

## Verification

```bash
npm run test:run
```

All existing tests must continue to pass. New test files cover all 11 sections and the list page Give card.