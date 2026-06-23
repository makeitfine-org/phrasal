# Plan: Add Fuzzy Search with Fuse.js

## Context

Both search modals (`SearchModal` for the quiz page, `ListSearchModal` for the verb list page) use exact substring matching (`.includes()`). The user wants fuzzy search that handles typos ("figure owt" -> "figure out"), partial words across word boundaries ("tethree" -> "the team three"), and case-insensitive approximate matching ("Te thrh").

**Why Fuse.js over Elasticsearch or pg_trgm:**
- VPS has 1 CPU / 1 GB RAM running nginx + Java + PostgreSQL standalone -- no room for Elasticsearch (needs 256MB+ heap minimum)
- Both modals already load ALL data client-side (270 quiz verbs as props, 1,711 verb meanings fetched on mount) -- adding network round-trips for data already in memory would only add latency
- Fuse.js is ~24KB gzipped, zero dependencies, built-in TypeScript types, uses the Bitap algorithm for approximate string matching
- Zero VPS overhead, zero backend changes needed

## Implementation

### Step 1: Install Fuse.js

```bash
cd frontend && npm install fuse.js
```

### Step 2: Create `useFuzzySearch` hook

**Create** `frontend/src/hooks/useFuzzySearch.ts`

Generic hook that wraps Fuse.js with project-standard configuration:
- Accepts `items: T[]`, `keys` (with weights), `query: string`, `sortByField` (for alphabetical fallback)
- Builds `Fuse` instance via `useMemo` keyed on `[items, keys]`
- Empty query: returns all items sorted alphabetically by `sortByField`
- Non-empty query: returns Fuse results in relevance order (best match first), capped at 50 results

Fuse options (hardcoded -- both modals need identical fuzzy behavior):
```ts
threshold: 0.4,        // moderately fuzzy -- allows typos without too many false positives
ignoreLocation: true,   // critical -- matches deep in sentences not penalized
minMatchCharLength: 2,  // avoid single-char noise
findAllMatches: true,   // continue scoring after first match
```

Key weights differ per modal (passed as `keys` argument).

### Step 3: Update `SearchModal`

**Modify** `frontend/src/components/SearchModal.tsx`

Replace the `.filter().sort()` chain (lines 40-48) with `useFuzzySearch`:
1. Compute candidates via `useMemo` -- map `allVerbs` to `SearchResult[]`, filter by `showExcluded`/`excluded` (filter BEFORE Fuse so excluded items don't affect scoring)
2. Call `useFuzzySearch({ items: candidates, keys: [{name: 'verb', weight: 2}, {name: 'definition', weight: 1.5}], query, sortByField: 'verb' })`
3. Remove old filtering logic

### Step 4: Update `ListSearchModal`

**Modify** `frontend/src/components/ListSearchModal.tsx`

Replace the `.filter().sort()` chain (lines 52-60) with `useFuzzySearch`:
1. Call `useFuzzySearch({ items: entries, keys: [{name: 'verb', weight: 2}, {name: 'definition', weight: 1.5}, {name: 'example', weight: 1}], query, sortByField: 'verb' })`
2. Remove the `q` variable and old filter logic

### Step 5: Update existing tests

**Modify** `frontend/src/__tests__/SearchModal.test.tsx`:
- Line 247-258 ("sorts filtered results alphabetically"): Change to assert both "burn out" and "zone out" are present (relevance order replaces alphabetical for non-empty queries). Or rename to "returns matching results for non-empty query".
- Line 43 test ("Verb 1"): Still passes -- "Verb 1" matches, and `getByText('Verb 1')` finds exactly one element since "Verb 10"-"Verb 19" have different text
- Line 62 test ("zzznomatch"): Still passes -- threshold 0.4 won't match random strings
- Tests asserting exact result counts (line 69-75, 50-item limit): Still pass -- hook uses `{ limit: 50 }` and only 20 test items exist

**Modify** `frontend/src/__tests__/ListSearchModal.test.tsx`:
- Line 38-42 ("get" -> 3 results): Verify fuzzy search at threshold 0.4 doesn't match "Make up" or "Put off" for query "get". Should pass as-is.
- Line 45-51 ("postpone" -> 1 result): Should pass -- strong match, nothing else close
- Line 53-58 ("smell" -> 1 result): Should pass
- Line 164-169 ("reconcile" -> 1 result): Should pass
- Line 171-178 ("disgust" -> 1 result): Should pass -- but note this searches `definition` field, which contains "To disgust or repel". Fuse searches across the configured keys, so this will match on the `definition` field.

### Step 6: Add new tests

**Create** `frontend/src/__tests__/hooks/useFuzzySearch.test.ts`:
- Returns all items sorted alphabetically when query is empty
- Returns fuzzy-matched items in relevance order when query is non-empty
- Returns empty array when no items match at threshold 0.4
- Handles typos (e.g., "owt" matches "out")
- Handles cross-word-boundary queries ("tethree" finding "the team three")
- Respects weighted keys (verb match ranks higher than definition match)

**Add to** `SearchModal.test.tsx`:
- Fuzzy match test: misspelled query still finds the right verb
- Relevance ordering test: best match appears first

**Add to** `ListSearchModal.test.tsx`:
- Fuzzy match test across definition/example fields

### Step 7: Verify

```bash
cd frontend && npm run test:run   # all tests pass
make build                         # full pipeline passes
```

## Key Files

| Action | Path |
|---|---|
| Modify | `frontend/package.json` -- add `fuse.js` dependency |
| Create | `frontend/src/hooks/useFuzzySearch.ts` |
| Modify | `frontend/src/components/SearchModal.tsx` |
| Modify | `frontend/src/components/ListSearchModal.tsx` |
| Create | `frontend/src/__tests__/hooks/useFuzzySearch.test.ts` |
| Modify | `frontend/src/__tests__/SearchModal.test.tsx` |
| Modify | `frontend/src/__tests__/ListSearchModal.test.tsx` |

## Behavioral Changes

| Before | After |
|---|---|
| Exact substring match only | Fuzzy matching (typos, partial words) |
| Results always sorted alphabetically | Empty query: alphabetical. Non-empty query: relevance order (best match first) |
| "figure owt" -> no results | "figure owt" -> finds "figure out" |
| "tethree" -> no results | "tethree" -> finds entries containing "the team three" |

## Risks

- **Threshold tuning**: 0.4 is an educated guess. If too permissive (false positives), lower to 0.3. If too restrictive (misses expected matches), raise to 0.5. Validate against the user's examples after implementation.
- **Cross-word-boundary matching**: "tethree" -> "the team three" involves inserted spaces. Fuse.js Bitap algorithm handles insertions/deletions, but effectiveness at threshold 0.4 needs empirical verification. Score would be ~0.36 which passes.
- **Test count assertions**: Some tests assert exact result counts (e.g., `toHaveLength(3)`). Fuzzy search might match additional items. Need to verify each test with the actual Fuse behavior against the mock data.