# Plan: Default.png cards — allow expand/collapse, never render `<img>`

## Context

Cards whose `imageSrc` ends with `default.png` are currently locked collapsed: `cursor-default`, click is a no-op, localStorage is ignored. The user wants them to behave like normal cards (click toggles expand/collapse, localStorage persists state) but without ever rendering an `<img>` element — the expanded view shows only the definition and example text.

## Changes

### 1. `src/components/VerbPage.tsx` — `Meaning` component (4 edits)

| Line(s) | Old | New |
|---------|-----|-----|
| 25-29 | `if (isDefault) return true;` before localStorage read | Remove that guard — all cards read localStorage |
| 31-33 | `if (isDefault) return;` at top of `toggle` | Remove that guard |
| 43 | `isDefault ? 'cursor-default' : 'cursor-pointer'` | Always `cursor-pointer` |
| 71-76 | `<img …/>` always rendered when expanded | Wrap in `{!isDefault && ( <div>…<img…/>…</div> )}` |

### 2. `src/__tests__/verbPage/sharedSectionTests.tsx` — new shared helper

Add `describeDefaultImageCards(label, particle, storageKeyPrefix, firstDef, firstExample, renderPage, getCard)`:
- card has `cursor-pointer`, not `cursor-default`
- clicking card expands it (removes `truncate` from example paragraph)
- clicking again collapses it (restores `truncate`)
- no `<img>` ever rendered regardless of clicks
- clicking saves `false` to `${storageKeyPrefix}_meaning_1_collapsed` in localStorage
- setting that key to `'false'` in localStorage → card starts expanded

### 3. ~45 test files — swap old "non-expandable" block for new helper

**Files affected** (all follow the same pattern change):

`get_verb_page/`: after, away, across, through, forward, by, behind, back, about_around, ahead, together, with, to, over, out  
`put_verb_page/`: down, out, across_over, into, by, back, ahead, behind, up, forward, off, on, in, about_around_round, through, together, to, away, with  
`make_verb_page/`: over, with, up, away, for, up_for, off, into, after, out

For each file, replace the old `describe('... non-expandable cards (default image)', ...)` and its associated `describe('... localStorage persistence', ...)` with a single call to `describeDefaultImageCards(...)`, passing the file-specific first-card definition and example regexes.

> Note: a few particles (e.g. get/off, get/out) have **mixed** meanings (some real-image, some default). Those test files already separate the two; only the "default image" group changes.

## Verification

```bash
npm run test:run
```

All tests should pass. Key scenarios to confirm manually in the test output:
- Default-image card starts collapsed, click expands, click again collapses
- No `img` role ever appears for default-image cards
- Real-image cards are unaffected