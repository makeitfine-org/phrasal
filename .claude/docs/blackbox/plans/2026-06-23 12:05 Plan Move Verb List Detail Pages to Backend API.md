# Plan: Move Verb List & Detail Pages to Backend API

## Context

The quiz pages already fetch from the backend API. But the verb list page (`/phrasal-verbs/list`) and all 71 verb detail pages (`/phrasal-verbs/list/:verb`) still render from hardcoded data in frontend source files. This plan moves that data to a new backend entity and makes the frontend fetch it from the API.

**Scale**: 71 verbs, 858 sections (particles), 1,711 meanings total. Only 2 verb pages (get, take) have custom images (34 refs); the rest (1,677) use `default.png`.

## Data Model

### New Entity: `VerbDetail`

One row per verb. Sections and meanings stored as JSONB — no need for separate tables since this is read-heavy educational content with no per-meaning mutations.

```sql
CREATE TABLE verb_details (
    id BIGSERIAL PRIMARY KEY,
    verb VARCHAR(50) NOT NULL UNIQUE,    -- "act", "get", "break" (lowercase slug)
    label VARCHAR(50) NOT NULL,          -- "Act", "Get", "Break" (display name)
    particles JSONB NOT NULL DEFAULT '[]', -- ["off","on","up"] for list page cards
    sections JSONB NOT NULL DEFAULT '[]', -- full detail page data (see below)
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    version BIGINT NOT NULL DEFAULT 0
);
```

**`sections` JSONB shape** (matches frontend's `SectionData[]`):
```json
[
  {
    "particle": "on / upon",
    "storageKeyPrefix": "actOn",
    "meanings": [
      {
        "definition": "To take action because of information...",
        "example": "The manager decided to act on the feedback...",
        "imageSrc": "images/phrasal_verbs/list/default.png",
        "imageAlt": "A manager acting on team feedback"
      }
    ]
  }
]
```

The `storageKey` field (`actOn_section_expanded`) is NOT stored in the DB — it's derived on the frontend as `${storageKeyPrefix}_section_expanded`. This keeps DB data clean.

## Backend Layer (following existing patterns)

### Step 1: Flyway Migration

**`V7__create_verb_details_table.sql`** — DDL + index on `verb`.

**`V8__seed_verb_details.sql`** — 71 INSERT statements. Each row contains the verb slug, label, particles array, and full sections JSONB extracted from the corresponding frontend page file. This is the largest file (~5000+ lines) but is mechanical SQL generation from the existing frontend data.

### Step 2: Domain Entity

**`domain/entity/VerbDetail.java`** — JPA entity following `PhrasalVerb` pattern:
- `@Entity @Table(name = "verb_details")`, audit listeners, Lombok
- `particles` field: `List<String>` with `@JdbcTypeCode(SqlTypes.JSON)`
- `sections` field: `List<VerbDetailSection>` with `@JdbcTypeCode(SqlTypes.JSON)`
- Inner record or embedded class `VerbDetailSection` with `particle`, `storageKeyPrefix`, `List<VerbDetailMeaning> meanings`
- Inner record `VerbDetailMeaning` with `definition`, `example`, `imageSrc`, `imageAlt`

### Step 3: Repository

**`domain/repository/VerbDetailRepository.java`** — extends `JpaRepository<VerbDetail, Long>`:
- `Optional<VerbDetail> findByVerb(String verb)` — for detail page
- `findAll()` — for list page (71 rows, no pagination needed, but keep pageable for consistency)

### Step 4: DTOs

**`application/dto/VerbDetailResponse.java`** — record with all fields for detail page.
**`application/dto/VerbDetailSummaryResponse.java`** — record with just `id, verb, label, particles` for list page.
**`application/dto/VerbDetailRequest.java`** — record with validation for create/update.

### Step 5: Mapper

**`application/mapper/VerbDetailMapper.java`** — MapStruct, following existing pattern.

### Step 6: Service

**`application/service/VerbDetailService.java`** — `@Service @Transactional`:
- `getAll(Pageable)` → returns `Page<VerbDetailSummaryResponse>` (list page)
- `getByVerb(String verb)` → returns `VerbDetailResponse` (detail page)
- `getById(Long id)`, `create(...)`, `update(...)`, `delete(...)` — standard CRUD

### Step 7: Controller

**`presentation/rest/VerbDetailController.java`** — at `/api/v1/verb-details`:
- `GET /` → list with pagination (returns summaries with particles for list page)
- `GET /{verb}` → by verb slug (returns full sections for detail page)
- `GET /id/{id}` → by id
- Standard CRUD (POST, PUT, DELETE)

### Step 8: Exception

**`infrastructure/exception/VerbDetailNotFoundException.java`** — following existing pattern.
Add handler to `GlobalExceptionHandler.java`.

### Step 9: Backend Tests

Following existing patterns exactly:
- **`VerbDetailEntityTest.java`** — entity construction, equals/hashCode
- **`VerbDetailMapperTest.java`** — mapper methods
- **`VerbDetailServiceTest.java`** — service with mocked repo (like `PhrasalVerbServiceTest`)
- **`VerbDetailIntegrationTest.java`** — MockMvc + Testcontainers (like `PhrasalVerbIntegrationTest`)

## Frontend Layer

### Step 10: API Client

**`frontend/src/api/verbDetailsApi.ts`** — new file:
- `fetchVerbList()` → `GET /api/v1/verb-details?size=100` → maps to `VerbListItem[]`
- `fetchVerbDetail(verb: string)` → `GET /api/v1/verb-details/{verb}` → maps to `SectionData[]`

Types:
```ts
interface VerbListItem { verb: string; label: string; particles: string[] }
```

### Step 11: Hooks

**`frontend/src/hooks/useVerbList.ts`** — returns `{ verbs: VerbListItem[], loading, error }`
**`frontend/src/hooks/useVerbDetail.ts`** — takes `verb: string`, returns `{ title: string, sections: SectionData[], loading, error }`

### Step 12: Update Frontend Components

**`PhrasalVerbsListPage.tsx`** — Major refactor:
- Remove all 71 `*_PARTICLES` constants and the `VERBS` array
- Use `useVerbList()` hook to fetch verb list from backend
- Build `VERBS` array from API response (map `VerbListItem` to the card data structure)
- Add loading/error states
- Keep all UI logic unchanged (expand/collapse, copy, search, portal)

**`listVerbIndex.ts`** — Convert from static imports to API-driven:
- Remove all 71 imports from verb page files
- Either: fetch verb details at search time, or build index from the list API
- Simplest approach: `ListSearchModal` fetches index from a new API endpoint, or we build a search endpoint on the backend

Actually, the cleanest approach for `ListSearchModal`: add a backend endpoint `GET /api/v1/verb-details/search?q=...` that searches across all meanings. But that changes the search UX (currently instant client-side filter). 

**Better approach**: Keep `listVerbIndex.ts` but make it fetch-based. Create a hook `useListSearchIndex()` that fetches ALL verb details on mount (71 verb details is ~200KB JSON, acceptable) and builds the index in memory. `ListSearchModal` uses this hook.

**71 Verb Detail Pages** — Replace each `{Verb}VerbPage.tsx` with a single dynamic page:

**`frontend/src/pages/VerbDetailPage.tsx`** — new single component:
- Uses `useParams()` to get the verb slug from the URL
- Uses `useVerbDetail(verb)` hook to fetch sections
- Renders `<VerbPageLayout title={title} sections={sections} />`
- Loading/error states

**`main.tsx`** — Replace 71 static routes with one dynamic route:
- Remove all 71 verb page imports
- Replace with: `<Route path="/phrasal-verbs/list/:verb" element={<VerbDetailPage />} />`

This eliminates the 71 separate page files entirely. The `VerbPageLayout` component stays unchanged.

### Step 13: Update Frontend Tests

**Update verb page tests**: The 71 test directories in `frontend/src/__tests__/*_verb_page/` currently import the page component directly and test its rendered content. Since the page components are being replaced by a single `VerbDetailPage` that fetches from the API:

- Create a new test file `frontend/src/__tests__/VerbDetailPage.test.tsx` that mocks the `useVerbDetail` hook and tests loading/error/success states
- The existing 71 verb page test directories test that specific definitions/examples render correctly — these assertions tested hardcoded data which is now in the DB. Remove these test directories since the data correctness is now a backend concern (verified by seed data + integration tests)
- Add tests for `useVerbList` and `useVerbDetail` hooks
- Add tests for the API functions in `verbDetailsApi.ts`
- Update `PhrasalVerbsListPage.test.tsx` to mock `useVerbList` hook
- Update `ListSearchModal.test.tsx` if search index changes

**New test files**:
- `frontend/src/__tests__/api/verbDetailsApi.test.ts`
- `frontend/src/__tests__/hooks/useVerbList.test.ts`
- `frontend/src/__tests__/hooks/useVerbDetail.test.ts`
- `frontend/src/__tests__/VerbDetailPage.test.tsx`

### Step 14: E2E Tests

Add to `e2e/features/frontend/quiz.feature` (or new feature file):
- Scenario: Verb list page loads verbs from backend
- Scenario: Verb detail page loads sections from backend
- Scenario: Navigate from verb list to verb detail

### Step 15: Cleanup

- Delete 71 verb page directories (`frontend/src/pages/act/`, `frontend/src/pages/ask/`, etc.)
- Delete 71 verb page test directories (`frontend/src/__tests__/act_verb_page/`, etc.)
- Clean up `listVerbIndex.ts` (no more static imports)
- Update `CLAUDE.md` to reflect new architecture

## Verification

1. `cd backend && JAVA_HOME=/usr/lib/jvm/java-21-openjdk-amd64 mvn clean verify` — all backend tests pass including new VerbDetail tests
2. `cd frontend && npm run test:run` — all frontend tests pass
3. `make clean build` — full stack builds, Docker works, e2e passes

## Key Files

| Action | Path |
|---|---|
| Create | `backend/src/main/resources/db/migration/V7__create_verb_details_table.sql` |
| Create | `backend/src/main/resources/db/migration/V8__seed_verb_details.sql` |
| Create | `backend/.../domain/entity/VerbDetail.java` |
| Create | `backend/.../domain/repository/VerbDetailRepository.java` |
| Create | `backend/.../application/dto/VerbDetail{Response,SummaryResponse,Request}.java` |
| Create | `backend/.../application/mapper/VerbDetailMapper.java` |
| Create | `backend/.../application/service/VerbDetailService.java` |
| Create | `backend/.../presentation/rest/VerbDetailController.java` |
| Create | `backend/.../infrastructure/exception/VerbDetailNotFoundException.java` |
| Create | Backend test files (entity, mapper, service, integration) |
| Create | `frontend/src/api/verbDetailsApi.ts` |
| Create | `frontend/src/hooks/useVerbList.ts` |
| Create | `frontend/src/hooks/useVerbDetail.ts` |
| Create | `frontend/src/pages/VerbDetailPage.tsx` |
| Modify | `frontend/src/main.tsx` — dynamic route replaces 71 static routes |
| Modify | `frontend/src/pages/PhrasalVerbsListPage.tsx` — fetch from API |
| Modify | `frontend/src/data/listVerbIndex.ts` — fetch-based index |
| Modify | `frontend/src/components/ListSearchModal.tsx` — accept async index |
| Delete | 71 `frontend/src/pages/{verb}/{Verb}VerbPage.tsx` files |
| Delete | 71 `frontend/src/__tests__/{verb}_verb_page/` directories |
| Create | Frontend test files (API, hooks, VerbDetailPage) |
| Modify | `e2e/features/frontend/quiz.feature` — verb list/detail scenarios |
| Modify | `CLAUDE.md` — updated architecture docs |