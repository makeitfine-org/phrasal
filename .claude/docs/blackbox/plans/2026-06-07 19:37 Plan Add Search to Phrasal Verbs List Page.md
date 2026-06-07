# Plan: Add Search to Phrasal Verbs List Page

## Context
The `/phrasal-verbs/list` hub page has cards for 7 verb pages (Get, Make, Put, Take, Give, Go, Come).
Each verb page uses `VerbPageLayout` with accordion sections per particle (e.g. "get off", "get on").
The user wants a search on the list page that mirrors the quiz's "Search phrasal verbs" modal:
type to find a verb, select it → navigate to the verb page, auto-expand that particle's section, scroll to it.

## Data Flow

`GetVerbPage.tsx` (and other 6 pages) define inline `const sections: SectionData[]`.
Each `SectionData` has `{ particle, storageKey, storageKeyPrefix, meanings: MeaningData[] }`.
`storageKey` = e.g. `"getOff_section_expanded"` (used for localStorage expansion state).
`storageKeyPrefix` = e.g. `"getOff"` (used as the DOM element ID for scroll targeting).

## Changes

### 1. Export `sections` from each verb page (7 files, 1-line change each)
Change `const sections: SectionData[]` → `export const sections: SectionData[]`

Files:
- `src/pages/get/GetVerbPage.tsx`
- `src/pages/make/MakeVerbPage.tsx`
- `src/pages/put/PutVerbPage.tsx`
- `src/pages/take/TakeVerbPage.tsx`
- `src/pages/give/GiveVerbPage.tsx`
- `src/pages/go/GoVerbPage.tsx`
- `src/pages/come/ComeVerbPage.tsx`

### 2. Create `src/data/listVerbIndex.ts` (new file)
Aggregate all 7 sections into a flat searchable list.

```ts
export interface ListSearchEntry {
  verb: string;        // "Get off"
  definition: string;  // first meaning's definition
  route: string;       // "/phrasal-verbs/list/get"
  storageKey: string;  // "getOff_section_expanded" — pre-write to open section
  sectionId: string;   // "getOff" — DOM id for scroll target
}
```

Build by iterating each verb's sections: `verb = capitalize(baseVerb) + ' ' + section.particle`,
`definition = section.meanings[0].definition`.

### 3. Create `src/components/ListSearchModal.tsx` (new file)
Simplified modal — no quiz-specific excluded/unexclude logic.

```ts
interface ListSearchModalProps {
  onSelect: (entry: ListSearchEntry) => void;
  onClose: () => void;
}
```

Reuse the same visual structure and keyboard navigation as `SearchModal.tsx`:
- Filters `listVerbIndex` by `verb` and `definition` fields (case-insensitive substring)
- Sorts alphabetically
- Arrow up/down + Enter keyboard navigation
- Escape closes
- No "Excluded" checkbox

### 4. Update `src/pages/PhrasalVerbsListPage.tsx`
- Add `useNavigate` (React Router) + `useState(false)` for `showSearch`
- Add a search button below the subtitle (using `SearchIcon` from `src/components/Icons.tsx`)
- `handleSearchSelect(entry: ListSearchEntry)`:
  ```ts
  localStorage.setItem(entry.storageKey, 'true');  // force-open section on destination page
  navigate(entry.route, { state: { scrollTo: entry.sectionId } });
  ```
- Render `<ListSearchModal>` when `showSearch === true`

### 5. Update `src/components/VerbPage.tsx`
- **Section component**: add `id={storageKeyPrefix}` to the outer `<div className="mb-5">`
- **VerbPageLayout**: add `useLocation()` + `useEffect` to scroll on navigation state:
  ```ts
  const location = useLocation();
  useEffect(() => {
    const target = (location.state as { scrollTo?: string } | null)?.scrollTo;
    if (!target) return;
    const el = document.getElementById(target);
    if (el) el.scrollIntoView({ block: 'start' });
  }, []);
  ```

## New tests
- `src/__tests__/listVerbIndex.test.ts` — verify correct entries (count, non-empty fields, correct routes)
- `src/__tests__/ListSearchModal.test.tsx` — renders, filters results, keyboard nav, calls onSelect/onClose
- Update `src/__tests__/PhrasalVerbsListPage.test.tsx` — search button present, opens modal

## Verification
`npm run test:run` passes. Manual: list page → click search → type "get off" → select →
Get page opens with "off" section expanded and scrolled into view.