# Multi-user: store learning progress per user on the server — implementation TODOs

Source plan: `.claude/docs/blackbox/plans/2026-10-26 18:10 Multi-user accounts TOTP 2FA and reliable storage for phrasal.md`
(sections P6, plus the progress-sync part of P7). Backlog: **task-102**, plus the sync part of **task-103**
(AC #7–#11, and the sync parts of #13 and #14).
Template: `multiuser-todos.md` (same folder). Builds on task-99 (users, sessions, CSRF, `AuthContext`).

> Status: Phase 0 done on branch `quiz-progress` (2026-10-28), except the prod data check in 0.4.

---

## Scope

**In scope**
- Backend:
  - per-user quiz progress API: `GET/PUT /api/v1/me/quiz-progress/{quizKey}`
  - one table `user_quiz_progress`, one row per user and quiz
  - quiz-key whitelist, a JSON-object-only body, a 64 KB size cap
  - drop the global `phrasal_verbs.is_learned` column, its index, the `?learned=` filter and `isLearned` in the DTOs
- Frontend:
  - content items carry their stable database `id`
  - the `isLearned` split is removed
  - an index ↔ id mapping at the server boundary
  - a sync hook: load on login, first-login import, debounced save (2 s), flush before logout
- **Fix for the reported bug:** two accounts used in one browser no longer share quiz progress.
- Tests: backend unit + integration, frontend Vitest, e2e API + browser scenarios.
- Docs: README, CLAUDE.md files, a new `docs/diagrams/quiz-progress-flow.md`, an `auth-flow.md` update, backlog.

**Out of scope (deferred, still tracked by their backlog tasks)**

| Deferred item | Task |
|---|---|
| Account deletion endpoint. The cascade on `user_quiz_progress` is ready for it. | task-100 |
| 2FA, account/security screens, verify/forgot/reset pages | task-101, task-103 (rest) |
| Versioning of anonymous localStorage state, cleanup after releases | task-87 |
| Merging anonymous progress into existing server progress. The server copy wins (decision 7). | — (not planned) |
| Syncing UI preferences: dark mode, expand/collapse state | — (stay local) |
| Off-site backups. Progress becomes real user data from now on. | task-98 |

> **Warning (same as in `multiuser-todos.md`):** without task-98, a lost Postgres volume now also loses every user's
> learning progress.

---

## Design decisions

1. **Endpoint shape.**
   - `GET /api/v1/me/quiz-progress/{quizKey}`:
     - `200 { quizKey, state, version, updatedAt }`
     - `404` ProblemDetail before the first save
   - `PUT /api/v1/me/quiz-progress/{quizKey}`:
     - body `{ "state": { … } }`
     - returns `200` with the same response shape, for both create and update (an idempotent PUT; the client does not care)
   - There is no `DELETE`. "Reset all progress" is a PUT of the fresh state.
   - There is no user id in the URL, so cross-user access is impossible by construction.
2. **Quiz keys** are a whitelist, enum `QuizKey`:

   | Path value | Quiz | localStorage key |
   |---|---|---|
   | `phrasal-verbs` | phrasal verb quiz | `phrasalQuizState` |
   | `grammar-i-wish-if-only` | I wish / If only quiz | `grammarIWishState` |

   An unknown key returns `400`.
3. **Storage.** Table `user_quiz_progress`:
   - columns: surrogate `id`, `user_id`, `quiz_key`, `state jsonb`, `version`, `created_at`, `updated_at`
   - `user_id` is an FK to `users` with `ON DELETE CASCADE`
   - a unique index on `(user_id, quiz_key)`

   The entity holds `Long userId`, not a `@ManyToOne`, so there is no lazy loading and no join.
   This differs from the plan's composite PK. A surrogate id matches every other entity in the project.
4. **Last write wins, atomically.** The write is a native upsert:
   `INSERT … ON CONFLICT (user_id, quiz_key) DO UPDATE SET state = …, version = version + 1, updated_at = now()`.
   - It covers two tabs saving at once, and two "first PUTs" racing after both got a 404.
   - The client sends no `If-Match`. `version` is informational only.
5. **The server stores the document opaquely.** It checks only:
   - `state` is a JSON object (`Map<String, Object>`)
   - the serialized size is ≤ `phrasal.quiz-progress.max-state-bytes` (default `65536`)

   Either failure returns `400` ProblemDetail. task-102 AC #4 asks for 400, not 413.
6. **Client document format v1 (id-based)**. Only the client knows this format:
   ```json
   { "schemaVersion": 1,
     "mastered": [12, 40], "excluded": [7],
     "history": [{ "id": 12, "inputValue": "get up", "status": "correct" }],
     "currentIndex": 0 }
   ```
   - localStorage stays **index-based** as it is today, so anonymous behaviour doesn't change (task-87 owns that format).
   - Mapping happens only when reading from or writing to the server:
     - unknown ids (deleted content) are dropped
     - `currentIndex` is clamped
   - A `schemaVersion` the client doesn't know → the client neither applies nor saves.
7. **Sync rules.** A browser holds at most one account's progress at a time:
   - **Anonymous:** localStorage only. No progress requests at all (task-103 AC #7).
   - **After login, GET:**
     - `200` → the server copy replaces the local one
     - `404` → upload the local copy (first-login import), but only if it is anonymous or this user's own copy.
       If it belongs to another account, start empty.
   - **Same user, unsynced local changes** (`dirty` flag) → push the local copy first, then continue as synced.
     This covers "tab closed within 2 s of a change".
   - **Every change:** `dirty = true`, then a PUT debounced by 2 s.
   - **Flush:** on unmount, on `pagehide` (with `fetch` `keepalive`), and **before logout**.
   - **Logout, or a session found expired at boot:** that account's local quiz progress is cleared. `darkMode` is kept.
     **This fixes the reported "two users share progress".**
   - **GET fails** (network or 5xx) → keep local, no PUT for this mount, so stale data never overwrites the server.
   - Sync metadata lives in one localStorage key, `quizProgressSync` = `{ [quizKey]: { ownerId, dirty } }`.
8. **Dropping `is_learned` is index-safe.**
   - Every row is `false`, so all verbs are already in the quiz pool. Removing the split doesn't shift any
     existing local indices.
   - Phase 0 verifies that the count is 0 on dev and prod before the migration.
9. **Old clients don't break.**
   - An `isLearned` field in a POST/PUT body is ignored. This relies on Boot 4's Jackson setting for unknown
     properties, which Phase 0 confirms.
   - `?learned=` and `sort=isLearned` are ignored (`PageableUtils` already drops unknown sort fields).
   - Removing `isLearned` from responses is still an API break, so the commit uses `!`.
10. **No rate limit on the progress PUT.** It requires a session, the size is capped, and the client debounces.
    Every authenticated user, ADMIN included, has their own progress.
11. **Malformed JSON → `400` ProblemDetail globally.** Today the `Exception` catch-all turns it into `500`.
    The new handler also improves the content endpoints.
12. **Migrations:**
    - `V11__drop_phrasal_verbs_is_learned.sql`
    - `V12__create_user_quiz_progress.sql`

    The full plan's V11 (user tokens) moved to task-107, so the next free numbers are taken here. Whichever lands later
    (task-107 or another branch) takes the next number.

---

## Conventions for every step

- Backend rules: `backend/CLAUDE.md`. Short version:
  - layers `domain → application → presentation`, with `infrastructure`/`config` cross-cutting
  - DTOs are records in `application/dto`
  - Lombok on entities/services; MapStruct mappers
  - Flyway `V{n}__*.sql`, never edit an applied migration
- Checkstyle runs in `mvn verify`:
  - line length ≤ 120; **no magic numbers** (use named constants); no star imports; no `TODO` comments
  - blank line after a class/enum opening brace
  - Javadoc on a record needs `@param`; public method Javadoc needs `@param`/`@return`
  - strict alphabetical import order
- JaCoCo needs **≥ 85 % line coverage per package**.
- Every test class has positive **and** negative cases. Integration tests extend `AbstractIntegrationTest`, use a unique
  email per test, and use real sessions (`registerAndLogin`), because the controller needs the `AuthenticatedUser`
  principal and `user()` mocks don't provide one.
- Look up library APIs with **Context7** before writing Hibernate JSON, Spring Data native queries, Jackson 3,
  React 19 or Playwright code.
- Run the narrowest command after each step, e.g. `cd backend && mvn -q test -Dtest=QuizProgressServiceTest` or
  `cd frontend && npx vitest run src/__tests__/hooks/useQuizProgressSync.test.ts`.
- **Each phase ends with `make clean build` green.** It also runs e2e, so a phase that changes an API must update e2e
  in the same phase.
- **Commits:** one per phase. Ask the user for approval before each commit. Format `type(scope): description`,
  ≤ 80 characters, no `Co-Authored-By` trailer.

---

## Phase 0 — Preparation (no code)

- [x] **0.1** Branch: create `quiz-progress` from `multi-user`, because it needs the task-99 code. Rebase onto `main` once
      `multi-user` is merged. The working tree must be clean apart from blackbox files.
      → created from `dcbe5e5`. Only blackbox files and the user's `backlog/drafts/hard.md` draft were modified.
- [x] **0.2** Run `make clean build` once on the untouched branch. Note the baseline: backend test count, Vitest count, e2e
      scenarios and steps.
      → green (2026-10-28). Backend **193** tests, Checkstyle 0 violations, JaCoCo met. Vitest **57** files /
      **1358** tests. e2e **49** scenarios / **322** steps.
- [x] **0.3** Move **task-102** to `In Progress` (Backlog.md MCP `task_edit`). Add a note to task-103: "progress-sync part
      started in `save-on-server-multiuser-todos.md`".
- [ ] **0.4** Data check before dropping the column. Expect `0` on both:
  - [x] dev: `docker compose exec postgres psql -U postgres -d phrasaldb -c "SELECT count(*) FROM phrasal_verbs WHERE is_learned"`
        → `0` of 270 rows. The V4 seed sets `false` on every row and contains no `true`.
  - [ ] prod: the same query via `kubectl exec` on the postgres pod (`--context hetzner`, `default/postgres-0`).
        **Pending:** the auto-mode classifier blocked production reads, so the user runs it. **Must be done before
        Phase 1.**
  - [ ] if either is not `0`: stop and ask the user. Dropping the column would then put those verbs into the quiz pool
        and shift local indices.
- [x] **0.5** Look up with Context7 and note here:
  - [x] Boot 4 / Jackson 3: is `FAIL_ON_UNKNOWN_PROPERTIES` off by default? That decides whether a legacy `isLearned`
        body field is ignored or rejected (decision 9).
        → **Off.**
        - In jackson-databind 3.1.7 the enum default is `false` (checked in the bytecode).
        - `spring-boot-jackson` 4.1.2 doesn't override it, and the project has no `spring.jackson.*` settings.
        - So a legacy `isLearned` is ignored, and 1.3.3 `shouldAcceptLegacyIsLearnedInBody` expects `201`.
          No `@JsonIgnoreProperties` is needed.
  - [x] Hibernate 7: `@JdbcTypeCode(SqlTypes.JSON)` on `Map<String, Object>` with a `jsonb` column, which the project's
        format mapper must support. `PhrasalVerb.sentences` already uses it for `List<String>`.
        → **Works.**
        - Hibernate 7.4.13 uses JSON for any attribute type marked `@JdbcTypeCode(SqlTypes.JSON)`, and detects the
          JSON library automatically (`hibernate.type.json_format_mapper` overrides it).
        - The project already maps `VerbDetail.sections` (`List<VerbDetailSection>`) this way.
        - Numbers come back as `Integer`/`Long`/`Double`, so tests compare values, not Java types.
  - [x] Spring Data JPA: `@Modifying @Query(nativeQuery = true)` with `INSERT … ON CONFLICT … DO UPDATE`, binding a
        JSON string with `CAST(:state AS jsonb)`.
        → **Supported** (4.1.2): `@Modifying` methods return `void` or `int`. `clearAutomatically` clears the
        `EntityManager` after the query; it isn't cleared by default.
        - The query needs an active transaction (the service's `@Transactional`). The repository integration test
          needs one too: `@Transactional` or a `TransactionTemplate`.
        - Use `CAST(:state AS jsonb)`, not `:state::jsonb`, which clashes with named-parameter parsing.
        - `@NativeQuery` is an equivalent shorthand.
  - [x] Spring MVC: which exception is thrown for an unreadable JSON body or a type mismatch in a record component
        (`HttpMessageNotReadableException`).
        → **Confirmed** in spring-web 7.0.10.
        - `AbstractJacksonHttpMessageConverter` wraps every `JacksonException` in `HttpMessageNotReadableException`:
          syntax errors, and `MismatchedInputException` such as `{"state":[1,2]}`, `{"state":"x"}` or a top-level
          `[1,2]`.
        - A missing body throws it too.
        - Only `InvalidDefinitionException`, a server-side bug, becomes `HttpMessageConversionException` and stays 500.
        - `GlobalExceptionHandler` doesn't extend `ResponseEntityExceptionHandler`, so today all of these hit the 500
          catch-all. This confirms decision 11.
  - [x] `fetch` `keepalive` limits (body ≤ 64 KB in Chromium), React 19 `useEffect` cleanup ordering, Vitest fake timers.
        → **keepalive:** the Fetch Standard caps the sum of in-flight keepalive bodies at 64 KiB per document, in every
        browser. Over the cap, `fetch` rejects with `TypeError`.
          A state close to the 65536-byte server cap, plus the `{"state":…}` wrapper, goes over it. **Phase 8:** on
          `pagehide`, send bodies above ~60 KB without `keepalive` (best effort). `dirty` stays `true` on failure, so the
          same user's next mount pushes it (8.2.4 step 1).
        → **React 19.3:** a cleanup runs with the old values before the next setup, and once on unmount.
          `main.tsx` uses `<React.StrictMode>`, so in dev every effect runs setup → cleanup → setup once. **Phase 8:**
          - the load effect ignores a stale result (an `active` flag cleared in the cleanup)
          - the load-once guard is keyed by `(userId, quizKey)`
          - the cleanup flush sends only when a save is pending
          - one extra GET in dev is acceptable
        → **Vitest 5.0.3:**
          - `vi.useFakeTimers()` fakes `setTimeout`, `clearTimeout`, `Date` and the rest; `toFake` narrows it.
          - `await vi.advanceTimersByTimeAsync(2000)` runs timers and flushes promise callbacks between them. Use it in
            debounce tests.
          - `await vi.runAllTimersAsync()` drains everything.
  - [x] Playwright: `page.waitForResponse`, `page.request` (shares the browser cookies), `page.on('request')`.
        → Playwright 1.63+ (the e2e module uses ^1.64.1):
          - Create the `page.waitForResponse(predicate)` promise **before** the click, then await it.
          - `page.request` is `page.context().request`. It sends the context's cookies and writes `Set-Cookie` back, so
            the saved-progress check runs as the logged-in browser user. A GET needs no CSRF header.
          - Record requests with `page.on('request', fn)` and detach with `page.off`.

---

## Phase 1 — Drop the global `isLearned` (backend + e2e payload)

Why first: it is small and independent. Our frontend keeps working without changes, because
`if (!r.isLearned)` treats a missing field as "not learned" and puts every verb into the pool.

### 1.1 Migration
- [x] **1.1.1** `backend/src/main/resources/db/migration/V11__drop_phrasal_verbs_is_learned.sql`:
  ```sql
  DROP INDEX IF EXISTS idx_phrasal_verbs_is_learned;
  ALTER TABLE phrasal_verbs DROP COLUMN is_learned;
  ```
  → it also starts with a one-line comment that points to V12.
- [x] **1.1.2** Don't touch V1, V3 or V4. They are applied migrations, and a fresh DB still runs them in order.
      → `git diff` on V1/V3/V4 is empty.

### 1.2 Domain, DTOs, mapper, repository, service, controller
- [x] **1.2.1** `domain/entity/PhrasalVerb.java`:
  - [x] remove the `isLearned` field
  - [x] remove the `idx_phrasal_verbs_is_learned` `@Index`
  - [x] change `@ToString(of = {"id", "verb", "isLearned"})` to `{"id", "verb"}`
- [x] **1.2.2** `application/dto/PhrasalVerbRequest.java`: remove `Boolean isLearned` and the compact constructor that
      defaulted it.
- [x] **1.2.3** `application/dto/PhrasalVerbResponse.java`: remove `Boolean isLearned`.
- [x] **1.2.4** `application/mapper/PhrasalVerbMapper.java`: no explicit mapping exists. Make sure MapStruct compiles with no
      "unmapped target" warning.
      → no change needed; the build log has no "unmapped" warning.
- [x] **1.2.5** `domain/repository/PhrasalVerbRepository.search`:
  - [x] drop the `(:learned IS NULL OR pv.isLearned = :learned)` clause
  - [x] drop the `learned` parameter
- [x] **1.2.6** `application/service/PhrasalVerbService`:
  - [x] `getAll(String q, Pageable pageable)`
  - [x] remove `"isLearned"` from `ALLOWED_SORT_FIELDS`
- [x] **1.2.7** `presentation/rest/PhrasalVerbController.getAll`: remove `@RequestParam Boolean learned`.
- [x] **1.2.8** `grep -rn -i "learned" backend/src/main/java` returns nothing.

### 1.3 Backend tests
- [x] **1.3.1** `PhrasalVerbEntityTest`:
  - [x] drop the `isLearned` asserts and the setter test
  - [x] rename the display name "defaults isLearned to false"
        → now "constructor sets fields and leaves id and audit fields empty". Also added `toStringOmitsOtherFields`.
- [x] **1.3.2** `PhrasalVerbMapperTest`: remove the `setIsLearned` / `isLearned()` lines. Mapping of the remaining fields
      stays covered.
      → `wordsToHide` and `version` are now asserted too.
- [x] **1.3.3** `PhrasalVerbIntegrationTest`:
  - [x] remove `"isLearned"` from the create and update bodies (lines ~68 and ~93) and the `$.isLearned` assert (~103)
  - [x] replace `shouldFilterByLearned` with `shouldIgnoreLegacyLearnedParam`: `GET ?learned=true` → `200`, and
        `totalElements` equals the unfiltered count
  - [x] new `shouldNotExposeIsLearned`: `GET /{id}` → `jsonPath("$.isLearned").doesNotExist()`
  - [x] new `shouldIgnoreSortByIsLearned`: `GET ?sort=isLearned,desc` → `200`, sorted by the default `verb`
  - [x] new `shouldAcceptLegacyIsLearnedInBody` (admin + CSRF): a POST body with `"isLearned": true` → `201`, and the
        response has no `isLearned`. If 0.5 shows Jackson rejects unknown properties, decide with the user instead:
        accept with `@JsonIgnoreProperties(ignoreUnknown = true)` on the request record, or document a `400`.
        → `201`, as 0.5 predicted. No annotation was needed.
  - [x] `PhrasalVerbServiceTest`: new `getAll_dropsLegacyIsLearnedSort` (falls back to `verb`).
- [x] **1.3.4** `SecurityRulesIntegrationTest` (~line 31) and `AdminBootstrapIntegrationTest` (~line 43): drop
      `isLearned` from the JSON bodies.
- [x] **1.3.5** `cd backend && mvn clean verify` → green. Flyway applies V11 on the Testcontainers DB, and
      `ddl-auto: validate` passes.
      → The first run failed the JaCoCo gate: `net.phrasal.application.dto` had 0.83 line coverage, below 0.85. The
        removed compact constructor had been covered, and the password-masking `toString` overrides of
        `LoginRequest` and `RegisterRequest` never were.
        - Added `application/dto/CredentialRequestTest`, which asserts the password is masked.
        - Now green: **200** tests, Checkstyle 0 violations, all coverage checks met.

### 1.4 e2e payload (task-102 AC #9)
- [x] **1.4.1** `e2e/src/steps/phrasal-verbs-api.steps.ts`: remove `isLearned: false` from the create payload.
- [x] **1.4.2** `e2e/features/phrasal-verbs-api/crud.feature` → "Get a single phrasal verb": add
      `And the response should not contain "isLearned"`. Add that step next to `the response should contain {string}`
      if it doesn't exist.
      → step added.
- [x] **1.4.3** `make clean build` → green. The frontend still works, because every verb is in the pool. Ask for commit
      approval → `feat(backend)!: drop global isLearned flag and learned filter`
      → green (2026-10-28):
        - backend **200** tests (193 + 7)
        - Vitest **57** files / **1358** tests
        - e2e **49** scenarios / **323** steps (one new step)
      Commit approval requested. **Don't deploy V11** until the 0.4 prod check returns `0`.

---

## Phase 2 — Progress table, entity, repository

### 2.1 Migration
- [ ] **2.1.1** `V12__create_user_quiz_progress.sql`:
  ```sql
  CREATE TABLE user_quiz_progress
  (
      id         BIGSERIAL PRIMARY KEY,
      user_id    BIGINT      NOT NULL REFERENCES users (id) ON DELETE CASCADE,
      quiz_key   VARCHAR(50) NOT NULL,
      state      JSONB       NOT NULL,
      created_at TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP,
      version    BIGINT      NOT NULL DEFAULT 0,
      CONSTRAINT chk_user_quiz_progress_state_object CHECK (jsonb_typeof(state) = 'object')
  );
  CREATE UNIQUE INDEX ux_user_quiz_progress_user_quiz ON user_quiz_progress (user_id, quiz_key);
  ```
  - No `CHECK` on `quiz_key`. The whitelist lives in the `QuizKey` enum, so adding a quiz doesn't need a migration.
  - The unique index also serves lookups by `user_id`, so there is no extra index.

### 2.2 Domain
- [ ] **2.2.1** `domain/entity/QuizKey.java`: `enum QuizKey { PHRASAL_VERBS("phrasal-verbs"), GRAMMAR_I_WISH_IF_ONLY("grammar-i-wish-if-only") }`
  - [ ] `String pathValue()`
  - [ ] `static Optional<QuizKey> fromPathValue(String value)`: exact match, case-sensitive. `null` → empty.
  - [ ] the DB stores `pathValue()` (stable), never `name()`. Convert with a JPA `AttributeConverter<QuizKey, String>`
        (`domain/entity/QuizKeyConverter`, `@Converter`), not `@Enumerated`.
- [ ] **2.2.2** `domain/entity/UserQuizProgress.java`:
  - [ ] table `user_quiz_progress`; sequence `user_quiz_progress_id_seq`, `allocationSize = 1` (same style as `User`)
  - [ ] `@Column(name = "user_id", nullable = false, updatable = false) Long userId` (no relationship)
  - [ ] `@Convert(converter = QuizKeyConverter.class) @Column(name = "quiz_key", nullable = false, updatable = false) QuizKey quizKey`
  - [ ] `@JdbcTypeCode(SqlTypes.JSON) @Column(nullable = false, columnDefinition = "jsonb") Map<String, Object> state`
  - [ ] `@CreatedDate` / `@LastModifiedDate` / `@Version`, `@EntityListeners(AuditingEntityListener.class)`
  - [ ] `@ToString(of = {"id", "userId", "quizKey", "version"})`. **Never include `state`**, because it holds user input.
  - [ ] `@EqualsAndHashCode(of = {"id"})`
  - [ ] constructor `UserQuizProgress(Long userId, QuizKey quizKey, Map<String, Object> state)`
- [ ] **2.2.3** `domain/repository/UserQuizProgressRepository.java` (`JpaRepository<UserQuizProgress, Long>`):
  - [ ] `Optional<UserQuizProgress> findByUserIdAndQuizKey(Long userId, QuizKey quizKey)`
  - [ ] the upsert (decision 4):
    ```java
    @Modifying(flushAutomatically = true, clearAutomatically = true)
    @Query(nativeQuery = true, value = """
            INSERT INTO user_quiz_progress (user_id, quiz_key, state)
            VALUES (:userId, :quizKey, CAST(:state AS jsonb))
            ON CONFLICT (user_id, quiz_key) DO UPDATE
            SET state = EXCLUDED.state,
                version = user_quiz_progress.version + 1,
                updated_at = CURRENT_TIMESTAMP
            """)
    int upsert(@Param("userId") Long userId, @Param("quizKey") String quizKey, @Param("state") String stateJson);
    ```
    `clearAutomatically` makes the following `findBy…` read the fresh row, not a stale persistence-context copy.

### 2.3 Tests
- [ ] **2.3.1** `domain/entity/QuizKeyTest`:
  - [ ] each path value round-trips
  - [ ] unknown → empty; `null` → empty; wrong case (`Phrasal-Verbs`) → empty
- [ ] **2.3.2** `domain/entity/QuizKeyConverterTest`:
  - [ ] enum → path value → enum
  - [ ] `null` stays `null` both ways
  - [ ] an unknown DB value → `IllegalStateException`
- [ ] **2.3.3** `domain/entity/UserQuizProgressEntityTest`:
  - [ ] the constructor sets the fields
  - [ ] `toString` contains no state content
  - [ ] equals/hashCode use `id`
- [ ] **2.3.4** `integration/UserQuizProgressRepositoryIntegrationTest` (extends `AbstractIntegrationTest`). Create the user
      with `UserRepository`, unique email.
  - [ ] first `upsert` → 1 row, `version == 0`, the state round-trips (nested arrays/objects and numbers keep their values)
  - [ ] second `upsert` → still 1 row, `version == 1`, new state, `updated_at` ≥ the old value
  - [ ] the same quiz key for two users → 2 independent rows
  - [ ] `findByUserIdAndQuizKey` for another user → empty
  - [ ] cascade (task-102 AC #5): `userRepository.delete(user)` → the progress row is gone. Check with `JdbcTemplate`.
  - [ ] negative: a non-object JSON (`'[1,2]'`) via `JdbcTemplate` violates `chk_user_quiz_progress_state_object`
        → `DataIntegrityViolationException`
  - [ ] negative: a non-existent `user_id` → FK violation
- [ ] **2.3.5** `cd backend && mvn clean verify` → green. Don't commit yet. Phases 2–4 form one backend commit.

---

## Phase 3 — Service, DTOs, exceptions, configuration

### 3.1 Configuration
- [ ] **3.1.1** `config/QuizProgressProperties.java`:
  - `@ConfigurationProperties("phrasal.quiz-progress") record QuizProgressProperties(int maxStateBytes)`
  - Javadoc with `@param`
  - picked up by the existing `@ConfigurationPropertiesScan`/`@EnableConfigurationProperties` (check which one is used)
- [ ] **3.1.2** `application.yml`:
  ```yaml
  phrasal:
    quiz-progress:
      max-state-bytes: 65536
  ```
  No env var is needed (decision 5). `application-test.yml` stays unchanged. Tests that need a smaller limit use
  `@TestPropertySource` in their own class.

### 3.2 DTOs
- [ ] **3.2.1** `application/dto/QuizProgressRequest.java`: `record QuizProgressRequest(@NotNull Map<String, Object> state)`.
- [ ] **3.2.2** `application/dto/QuizProgressResponse.java`:
      `record QuizProgressResponse(String quizKey, Map<String, Object> state, Long version, LocalDateTime updatedAt)`.
- [ ] **3.2.3** `application/mapper/QuizProgressMapper` (MapStruct, `componentModel = "spring"`): entity → response, with
      `quizKey` mapped via `QuizKey.pathValue()` (an `@Mapping(expression = …)` or a default method).

### 3.3 Exceptions + handler
- [ ] **3.3.1** `infrastructure/exception/UnknownQuizKeyException` (`RuntimeException`). Message: `Unknown quiz key`. Don't echo
      the raw path value.
- [ ] **3.3.2** `infrastructure/exception/QuizProgressNotFoundException extends ResourceNotFoundException`:
  - resource name `Quiz Progress`, error type `quiz-progress-not-found`
  - the existing handler turns it into a `404` ProblemDetail
- [ ] **3.3.3** `infrastructure/exception/QuizProgressTooLargeException` (`RuntimeException`), message
      `Quiz progress must not exceed {max} bytes`.
- [ ] **3.3.4** `GlobalExceptionHandler`, all **before** the `Exception` catch-all:
  - [ ] `UnknownQuizKeyException` → `400`, title `Unknown Quiz Key`, type `unknown-quiz-key`
  - [ ] `QuizProgressTooLargeException` → `400`, title `Quiz Progress Too Large`, type `quiz-progress-too-large`
  - [ ] `HttpMessageNotReadableException` → `400`, title `Malformed Request`, type `malformed-request`.
        Detail `Request body is missing or is not valid JSON`; never the parser message (decision 11).
- [ ] **3.3.5** `GlobalExceptionHandlerTest`: the three new mappings (status, title, type), and no internal message leaked.

### 3.4 Service
- [ ] **3.4.1** `application/service/QuizProgressService` (`@Service @Transactional(readOnly = true) @RequiredArgsConstructor @Slf4j`):
  - [ ] `QuizProgressResponse get(Long userId, String quizKeyPath)`:
    1. `QuizKey key = QuizKey.fromPathValue(path).orElseThrow(UnknownQuizKeyException::new)`
    2. `findByUserIdAndQuizKey` → map, or throw `QuizProgressNotFoundException`
  - [ ] `@Transactional QuizProgressResponse save(Long userId, String quizKeyPath, QuizProgressRequest request)`:
    1. resolve the key (as above)
    2. `byte[] json = jsonMapper.writeValueAsBytes(request.state())`. Inject the Spring-managed Jackson 3 `JsonMapper`.
    3. `json.length > properties.maxStateBytes()` → `QuizProgressTooLargeException`
    4. `repository.upsert(userId, key.pathValue(), new String(json, UTF_8))`
    5. re-read with `findByUserIdAndQuizKey` → response
    6. `log.debug("Saved quiz progress userId={} quizKey={} bytes={}", …)`. **Never log the state.**
- [ ] **3.4.2** `QuizProgressServiceTest` (Mockito):
  - [ ] get: found → response; missing → `QuizProgressNotFoundException`; unknown key → `UnknownQuizKeyException`, and the
        repository is never called
  - [ ] save: valid → `upsert` called with the compact JSON and the path value, then the response is returned
  - [ ] save: exactly `max` bytes → OK; `max + 1` → `QuizProgressTooLargeException`, and `upsert` is never called
  - [ ] save: unknown key → exception before serialization
- [ ] **3.4.3** `QuizProgressMapperTest`: entity → response (quiz key as path value); `null` → `null`.
- [ ] **3.4.4** `mvn -q test -Dtest='QuizProgressServiceTest,QuizProgressMapperTest,GlobalExceptionHandlerTest'` → green.

---

## Phase 4 — Controller, security rule, integration tests

### 4.1 Controller
- [ ] **4.1.1** `presentation/rest/QuizProgressController`, `@RequestMapping("/api/v1/me/quiz-progress")`:
  - [ ] `@GetMapping("/{quizKey}")` → `200 QuizProgressResponse`
  - [ ] `@PutMapping(path = "/{quizKey}", consumes = APPLICATION_JSON_VALUE)` with `@Valid @RequestBody QuizProgressRequest`
        → `200 QuizProgressResponse`
  - [ ] both take `@AuthenticationPrincipal AuthenticatedUser user` and pass `user.id()`. Never read a user id from the
        request.

### 4.2 Security rule
- [ ] **4.2.1** `config/SecurityConfig.authorizeHttpRequests`: add `.requestMatchers("/api/v1/me/**").authenticated()`
      right after the `GET /api/v1/auth/me` rule and **before** `GET /api/**` → `permitAll`. Otherwise an anonymous GET
      would be permitted and the controller would get a `null` principal.
- [ ] **4.2.2** Leave the CSRF configuration unchanged. The PUT is an unsafe method, so CSRF already applies.
- [ ] **4.2.3** Update the class Javadoc / rule-order comment if it lists the rules.

### 4.3 `integration/QuizProgressIntegrationTest` (real sessions via `registerAndLogin`)
- [ ] **4.3.1** Anonymous `GET` → `401` problem+json; anonymous `PUT` with CSRF → `401` (task-102 AC #2).
- [ ] **4.3.2** A new user's `GET /phrasal-verbs` → `404`, `$.title == "Quiz Progress Not Found"` (AC #1).
- [ ] **4.3.3** `PUT` with cookie + CSRF → `200`:
  - `$.quizKey == "phrasal-verbs"`, `$.version == 0`
  - then `GET` → `200` with an identical `$.state` (nested arrays/objects)
- [ ] **4.3.4** A second `PUT` → `$.version == 1`, and the state is replaced, not merged.
- [ ] **4.3.5** The two quiz keys are independent: a save on `phrasal-verbs` → `GET grammar-i-wish-if-only` still `404`.
- [ ] **4.3.6** Cross-user isolation (AC #3):
  - user A saves
  - user B `GET` → `404`
  - user B `PUT` → A's `GET` still returns A's state
- [ ] **4.3.7** An unknown key, `PUT /unknown-quiz` and `GET /unknown-quiz` → `400`, `$.title == "Unknown Quiz Key"` (AC #4).
- [ ] **4.3.8** A non-object body (AC #4). Each of these → `400`:
  - `{"state": [1,2]}`
  - `{"state": "x"}`
  - `[1,2]`
  - `not json`
  - The malformed ones get `$.title == "Malformed Request"`. A missing `state` (`{}`) → `400 Validation Error`.
- [ ] **4.3.9** Size limit (AC #4): a separate small class `QuizProgressSizeLimitIntegrationTest` with
      `@TestPropertySource(properties = "phrasal.quiz-progress.max-state-bytes=200")`, so there is only one extra context:
  - just under the limit → `200`
  - over the limit → `400` `Quiz Progress Too Large`
- [ ] **4.3.10** `PUT` **without** CSRF → `403`, `$.type` ends with `/csrf`.
- [ ] **4.3.11** The real admin session (`AdminBootstrapIntegrationTest`, which already has an admin) can save and read its
      own progress → `200`. Put this case in that class, so there is no new context.
- [ ] **4.3.12** Content GETs stay public: anonymous `GET /api/v1/phrasal-verbs` → `200`. This is a regression guard for the
      new rule order (AC #6).
- [ ] **4.3.13** Malformed JSON on a content POST (admin + CSRF) → `400 Malformed Request`, not `500` (decision 11).

### 4.4 Verify and commit
- [ ] **4.4.1** Run the `api-contract-review` skill on `QuizProgressController`:
  - versioned path, DTO-only responses
  - 200/400/401/403/404 problem+json
  - idempotent PUT
  - Fix the findings or note them.
- [ ] **4.4.2** `cd backend && mvn clean verify`: green, with JaCoCo ≥ 85 % in every touched package
      (`domain.entity`, `domain.repository`, `application.service`, `application.mapper`, `presentation.rest`,
      `infrastructure.exception`, `config`).
- [ ] **4.4.3** `make clean build` → green. Ask for commit approval → `feat(backend): add per-user quiz progress API`

---

## Phase 5 — E2E: progress API

- [ ] **5.1** `e2e/src/steps/quiz-progress-api.steps.ts`. Reuse `Given I am logged in as a new user` and
      `the response status should be {int}`.
  - `When I request my {string} quiz progress` → `GET /api/v1/me/quiz-progress/{key}`
  - `When I save my {string} quiz progress with {int} excluded items` → `PUT` with a v1 document
    (`excluded: [1..n]`, `mastered: [1..n]`, `history: []`, `currentIndex: -1`)
  - `When I save a raw quiz progress body {string} for {string}` (for the non-object case)
  - `When I save an oversized {string} quiz progress` → `state.padding = 'x'.repeat(70_000)`
  - `Then the quiz progress should have {int} excluded items`
  - `Then the quiz progress version should be {int}`
- [ ] **5.2** `e2e/features/progress-api/quiz-progress.feature` (`@api`):
  - [ ] anonymous → `401`
  - [ ] new user, read → `404`
  - [ ] save 3 excluded → `200`; read back → `200`, 3 excluded, version 0
  - [ ] save again → version 1
  - [ ] another new user reads the same key → `404` (isolation)
  - [ ] unknown key `"unknown-quiz"` → `400`
  - [ ] state is an array → `400`
  - [ ] oversized → `400`
- [ ] **5.3** Cleanup: no new SQL. `hooks.ts` `AfterAll` already deletes the e2e users, and the cascade removes their
      progress. Check once with `SELECT count(*) FROM user_quiz_progress` after a run: no e2e rows are left.
- [ ] **5.4** `package.json`: make sure the `@api` tag run (`test:api`) picks up the new feature folder. Check the
      `cucumber.js` paths glob.
- [ ] **5.5** `npm --prefix e2e run test:api` against the running stack → green. `make clean build` → green. Ask for commit
      approval → `test(e2e): cover quiz progress API`

---

## Phase 6 — Frontend: content carries ids, `isLearned` split removed

- [ ] **6.1** `src/types.ts`:
  - [ ] `VerbEntry` gets `id: number`
  - [ ] `GrammarEntry` gets `id: number`
  - [ ] `BrowseVerbEntry = VerbEntry & { quizIndex: number }`. `quizIndex` is now always set.
- [ ] **6.2** `src/api/phrasalVerbsApi.ts` (task-103 AC #11):
  - [ ] remove `isLearned` from `PhrasalVerbResponse`
  - [ ] every response becomes a `VerbEntry` with `id: r.id`
  - [ ] `verbsForBrowse = allVerbs.map((v, i) => ({ ...v, quizIndex: i }))`
  - [ ] order stays `sort: 'id,asc'`, so existing local indices keep pointing at the same verbs (decision 8)
- [ ] **6.3** `src/api/grammarEntriesApi.ts`: map `id: r.id`.
- [ ] **6.4** `src/components/GrammarQuiz.tsx`: `entryToVerbEntry` and `displayEntries` pass `id: entry.id`.
- [ ] **6.5** `src/components/AllVerbsModal.tsx`: drop the `v.quizIndex !== undefined` guard, since `quizIndex` is always a
      number.
- [ ] **6.6** Static reference data:
  - [ ] `grep -rn "allVerbsWithLearned\|verbsForBrowse\|allVerbs" src --include=*.ts --include=*.tsx` to find what still
        imports `src/data/phrasalVerbs.ts`
  - [ ] delete the unused exports (`allVerbsWithLearned`, and the learned-based `allVerbs`/`verbsForBrowse` builders if
        nothing imports them)
  - [ ] keep `rawData`. Its 5th tuple element stays as reference data, documented in `RawVerbEntry` as "seed flag,
        unused".
  - [ ] if a builder is still used: give it a synthetic `id` (row index + 1)
  - [ ] `wishData.ts`: add a synthetic `id` if the type requires it
- [ ] **6.7** Tests and fixtures:
  - [ ] `src/__tests__/__fixtures__/phrasalVerbs.json` and any inline `VerbEntry`/`GrammarEntry` literals get `id`s
  - [ ] `src/__tests__/hooks/usePhrasalVerbs.test.ts`:
    - a response without `isLearned` → every verb in `allVerbs`
    - `verbsForBrowse[i].quizIndex === i`
    - ids carried through
  - [ ] `src/__tests__/hooks/useGrammarEntries.test.ts`: ids carried through
  - [ ] `src/__tests__/AllVerbsModal.test.tsx`: delete "isLearned entry (quizIndex undefined) is never hidden". Add
        "excluded entries are hidden unless 'show excluded' is on", if that's not already covered.
  - [ ] `src/__tests__/api/client.test.ts` (~line 37): replace the `learned: 'false'` example param with a neutral one
        (`q: 'get'`)
- [ ] **6.8** `grep -rn -i "isLearned\|learned" frontend/src` → only the `rawData` reference comment remains.
- [ ] **6.9** `npx tsc --noEmit` (in `frontend/`) → no new errors. The 3 known errors stay: `useFocusTrap.test.tsx`,
      `useQuiz.ts:312`, `e2e theme.steps.ts`.
- [ ] **6.10** `npm --prefix frontend run test:run && npm --prefix frontend run build` → green. `make clean build` → green.
      Ask for commit approval → `refactor(frontend): carry content ids and drop isLearned split`

---

## Phase 7 — Frontend: progress API, id mapping, sync metadata

### 7.1 API client
- [ ] **7.1.1** `src/api/client.ts`:
  - [ ] the private `request` options get `keepalive?: boolean`, passed to `fetch`
  - [ ] `put<T>(path, body?, options?: { keepalive?: boolean })`; existing callers don't change
- [ ] **7.1.2** `src/__tests__/api/client.test.ts`: `put` with `{ keepalive: true }` passes `keepalive: true` to `fetch`.
      Without it, no `keepalive` key is sent.
- [ ] **7.1.3** `src/api/quizProgressApi.ts`:
  ```ts
  export type QuizKey = 'phrasal-verbs' | 'grammar-i-wish-if-only';
  export interface QuizProgressDocument {               // decision 6
    schemaVersion: 1;
    mastered: number[]; excluded: number[];
    history: { id: number; inputValue: string; status: Status }[];
    currentIndex: number;
  }
  export interface QuizProgress { quizKey: QuizKey; state: QuizProgressDocument; version: number; updatedAt: string; }
  export async function fetchQuizProgress(key: QuizKey): Promise<QuizProgress | null>   // 404 → null, others rethrow
  export async function saveQuizProgress(key: QuizKey, state: QuizProgressDocument,
                                         options?: { keepalive?: boolean }): Promise<QuizProgress>
  ```
- [ ] **7.1.4** `src/__tests__/api/quizProgressApi.test.ts`:
  - [ ] GET path `/api/v1/me/quiz-progress/phrasal-verbs`; 200 → object; 404 → `null`; 401 and 500 → throw `ApiError`
  - [ ] PUT sends method, `{ state }` body, `X-XSRF-TOKEN` and `keepalive` when asked

### 7.2 Index ↔ id mapping (pure functions)
- [ ] **7.2.1** Move `PersistedState` from `useQuiz.ts` to `src/types.ts` as `export interface QuizPersistedState`.
      `useQuiz` imports it.
- [ ] **7.2.2** `src/utils/quizProgressMapping.ts`:
  - [ ] `toProgressDocument(local: QuizPersistedState, itemIds: number[]): QuizProgressDocument`:
    - indices → ids
    - out-of-range indices dropped
    - `currentIndex` unchanged (it is a position in `history`, not an item index)
  - [ ] `fromProgressDocument(doc: unknown, itemIds: number[]): QuizPersistedState | null`:
    - `schemaVersion !== 1` or a wrong shape → `null`
    - ids → indices through a `Map<id, index>`
    - unknown ids dropped (content deleted)
    - history items with unknown ids dropped
    - `currentIndex` clamped to `[-1, history.length - 1]`. If the item it pointed at was dropped, it falls back to the
      last remaining item.
- [ ] **7.2.3** `src/__tests__/utils/quizProgressMapping.test.ts` (task-103 AC #10, #13):
  - [ ] round trip: local → document → local gives equal state
  - [ ] a document uses ids, never indices (`itemIds = [10, 20, 30]`, index 1 → id 20)
  - [ ] **content deleted before an item**: ids `[10, 20, 30]` → `[10, 30]`. The excluded id 30 now maps to index 1, and
        mastered 20 is dropped.
  - [ ] **content added**: a new id appended → existing ids keep their state, and the new item is unseen
  - [ ] history with a deleted item → removed, and `currentIndex` clamped
  - [ ] an unsupported `schemaVersion: 2`, `null`, an array, or missing fields → `null`
  - [ ] an empty document → empty state

### 7.3 Sync metadata + local clearing
- [ ] **7.3.1** `src/utils/quizProgressStorage.ts`:
  - [ ] `QUIZ_STORAGE_KEYS: Record<QuizKey, string>` = `{ 'phrasal-verbs': 'phrasalQuizState', 'grammar-i-wish-if-only': 'grammarIWishState' }`
  - [ ] `readSyncMeta(key): { ownerId: number | null; dirty: boolean }`, stored in localStorage key `quizProgressSync`.
        Tolerate missing or corrupt JSON (→ defaults).
  - [ ] `writeSyncMeta(key, meta)`; `clearSyncMeta()`
  - [ ] `clearLocalQuizState(key)`: remove only `mastered`, `excluded`, `history` and `currentIndex` from that storage key.
        Keep other fields such as `darkMode` in `phrasalQuizState`.
  - [ ] `clearAccountQuizProgress()`: for every key whose meta has an `ownerId`, call `clearLocalQuizState`, then
        `clearSyncMeta()`
  - [ ] every `localStorage` access is wrapped in try/catch, so a blocked storage never breaks the quiz
- [ ] **7.3.2** `src/__tests__/utils/quizProgressStorage.test.ts`:
  - [ ] meta defaults; round trip; corrupt JSON → defaults
  - [ ] `clearLocalQuizState('phrasal-verbs')` keeps `darkMode`
  - [ ] `clearAccountQuizProgress` clears only owned keys. Anonymous local progress (no `ownerId`) stays.
- [ ] **7.3.3** `npx vitest run src/__tests__/api src/__tests__/utils` → green.

---

## Phase 8 — Frontend: sync hook, `useQuiz` integration, logout flush

### 8.1 `useQuiz` changes (no behaviour change for anonymous visitors)
- [ ] **8.1.1** `UseQuizConfig` gets an optional `sync?: { quizKey: QuizKey; itemIds: number[] }`. Without it, the hook
      behaves exactly as today. All existing `useQuiz.test.ts` cases must stay green, unchanged.
- [ ] **8.1.2** New internal `applyState(state: QuizPersistedState)`:
  - sets `mastered`, `excluded`, `history` and `currentIndex`
  - sets `bootstrapDone.current = state.history.length > 0`, so an empty applied state bootstraps the next item
  - closes the open modals
  - The existing persistence effect then writes the applied state to localStorage, keeping `darkMode` via the merge.
- [ ] **8.1.3** Build a memoized `snapshot: QuizPersistedState` from the four state values. When `config.sync` is set, call
      `useQuizProgressSync({ ...config.sync, storageKey, snapshot, applyState })`.
- [ ] **8.1.4** `handleGlobalReset` stays as it is. For a logged-in user, the reset state is saved by the normal debounced
      PUT (decision 1: no DELETE).

### 8.2 `src/hooks/useQuizProgressSync.ts` (decision 7)
- [ ] **8.2.1** Inputs: `quizKey`, `storageKey`, `itemIds`, `snapshot`, `applyState`. It reads `useAuth()`.
      It returns `{ syncStatus: 'off' | 'loading' | 'synced' | 'error' }`, which tests and a future indicator can use.
- [ ] **8.2.2** `status === 'loading'` → do nothing.
- [ ] **8.2.3** `status === 'anonymous'`:
  - if `readSyncMeta(quizKey).ownerId != null`: this is a cached copy of an account whose session ended. Call
    `clearLocalQuizState` + `writeSyncMeta(key, { ownerId: null, dirty: false })` + `applyState(EMPTY)`.
  - otherwise do nothing, and **send no request** (task-103 AC #7)
- [ ] **8.2.4** `status === 'authenticated'` (user `U`). Run the load once per `(U.id, quizKey)`:
  1. `meta.ownerId === U.id && meta.dirty` → `saveQuizProgress(toProgressDocument(snapshot))`. On success,
     `dirty = false` → `synced`.
  2. Otherwise `fetchQuizProgress`:
     - **200** → `fromProgressDocument`:
       - `null` (unknown schema) → `error`, no saves for this mount
       - otherwise `applyState(mapped)`, meta `{ ownerId: U.id, dirty: false }` → `synced`
     - **404**:
       - `meta.ownerId` is `null` or `U.id` → PUT the local snapshot (first-login import, task-103 AC #9)
       - another owner → `applyState(EMPTY)` first, then PUT the empty state
       - then meta `{ ownerId: U.id, dirty: false }` → `synced`
     - **error** → `error`. Local state stays, and nothing is saved for this mount (decision 7).
- [ ] **8.2.5** Saving while `synced`:
  - [ ] keep `lastSavedJson` (a ref) = JSON of the last document sent or received. A snapshot whose document equals it is
        not saved. This skips the echo after `applyState` and no-op renders.
  - [ ] on a change: `writeSyncMeta(dirty: true)`, then (re)start a `SAVE_DEBOUNCE_MS = 2000` timer → PUT →
        `dirty = false` and update `lastSavedJson`
  - [ ] PUT `401` → `off` (the session expired); keep `dirty = true`, so the same user's next login pushes it (step 1)
  - [ ] PUT `400` → `console.warn` once (e.g. the size limit); keep `dirty`
  - [ ] network error → keep `dirty`; the next change retries
  - [ ] never two PUTs in flight for one quiz key: chain them, so the last snapshot always wins
- [ ] **8.2.6** Flush:
  - [ ] unmount → a pending timer is sent immediately
  - [ ] `window` `pagehide` → a pending save is sent with `keepalive: true`
  - [ ] module-level registry: `export async function flushQuizProgress(): Promise<void>` runs every mounted hook's
        pending save and waits for it. This is the only module-level state, used by `AuthContext.logout`.
- [ ] **8.2.7** User switch without a logout (`U.id` changes while mounted): cancel the pending timer, then run the load
      again (step 8.2.4).

### 8.3 `AuthContext.logout`
- [ ] **8.3.1** `src/auth/AuthContext.tsx` `logout`:
  - `await flushQuizProgress().catch(() => {})` (best effort)
  - then `await authApi.logout()`
  - then `clearAccountQuizProgress()` (privacy: the next person in this browser starts clean)
  - then `refresh()`
- [ ] **8.3.2** `login`/`register` don't change. The sync hook reacts to the status change.

### 8.4 Tests (Vitest, fake timers, mocked `quizProgressApi`, a test `AuthContext.Provider`)
- [ ] **8.4.1** `src/__tests__/hooks/useQuizProgressSync.test.ts`:
  - [ ] anonymous → no API calls at all, even after changes (AC #7)
  - [ ] loading → no calls
  - [ ] authenticated + server 200 → `applyState` called with the mapped state, meta owner set, and no PUT echo
  - [ ] authenticated + 404 + anonymous local → a PUT of the local snapshot (first-login import, AC #9)
  - [ ] authenticated + 404 + local owned by **another** user → `applyState(EMPTY)` and a PUT of the empty state. The
        other user's data is never uploaded (the reported bug).
  - [ ] same owner + `dirty` → PUT first, no GET
  - [ ] GET 500 / network error → `error`, and no PUT even after changes
  - [ ] unknown `schemaVersion` → `error`, no apply, no PUT
  - [ ] debounce: 5 changes within 2 s → exactly **one** PUT with the last snapshot; `dirty` is `true` before and `false`
        after
  - [ ] a PUT failing with 401 → `off`, and `dirty` stays `true`
  - [ ] unmount with a pending change → an immediate PUT; `pagehide` → a PUT with `keepalive: true`
  - [ ] `flushQuizProgress()` resolves after the pending PUT finishes
  - [ ] anonymous + owned meta (expired session) → local state cleared, `darkMode` kept
  - [ ] user switch A → B while mounted → A's pending timer cancelled, and B loads
- [ ] **8.4.2** `src/__tests__/useQuiz.test.ts`:
  - [ ] the existing cases are unchanged and green
  - [ ] new: `sync` set + an anonymous context → identical behaviour, no fetch
  - [ ] new: an applied server state shows in `mastered`, `excluded` and `history`, and is written to localStorage while
        `darkMode` is kept
  - [ ] new: an applied empty state bootstraps a new item
- [ ] **8.4.3** `src/__tests__/auth/AuthContext.test.tsx`:
  - logout order: flush → api logout → local progress cleared → `/me` re-fetched
  - a failing flush still logs out
- [ ] **8.4.4** `npx vitest run src/__tests__/hooks src/__tests__/useQuiz.test.ts src/__tests__/auth` → green.

---

## Phase 9 — Frontend: wire the quizzes, test ids

- [ ] **9.1** `PhrasalVerbQuiz.tsx`: `useQuiz({ …, sync: { quizKey: 'phrasal-verbs', itemIds } })`, with
      `itemIds = useMemo(() => allVerbs.map(v => v.id), [allVerbs])`.
- [ ] **9.2** `GrammarQuiz.tsx`: `sync: { quizKey: 'grammar-i-wish-if-only', itemIds: entries.map(e => e.id) }` (memoized).
- [ ] **9.3** Test ids for e2e:
  - [ ] `Header.tsx`: `data-testid="excluded-count"` on the excluded badge. It is rendered only when > 0.
  - [ ] `QuizCard.tsx`: `data-testid="exclude-toggle"` on the exclude/include button
- [ ] **9.4** Tests:
  - [ ] `src/__tests__/PhrasalVerbsPage.test.tsx` and `GrammarPage.test.tsx`: the existing cases stay green (the default
        auth context is anonymous)
  - [ ] new: an authenticated test provider + a mocked `quizProgressApi` returning progress → the excluded badge shows the
        server count after load
  - [ ] `Header.test.tsx` / `QuizCard.test.tsx`: the new test ids render
- [ ] **9.5** Manual smoke with `npm run dev`:
  - anonymous: the quiz works, and DevTools shows no `/me/quiz-progress` requests
  - logged in: one GET on load, one PUT about 2 s after a change
- [ ] **9.6** `npm --prefix frontend run test:run && npm --prefix frontend run build` → green. `make clean build` → green.
      Ask for commit approval → `feat(frontend): sync quiz progress for logged-in users`

---

## Phase 10 — E2E: progress sync in the browser

- [ ] **10.1** `e2e/src/steps/progress-sync.steps.ts`. Reuse the auth UI steps (`I sign up through the form with a new
      email`, `I log out through the user menu`) and `I navigate to the phrasal verbs quiz`.
  - `When I exclude the current quiz item`: click `exclude-toggle`
  - `When I exclude the current quiz item and wait for the progress save`: start
    `page.waitForResponse(r => r.url().includes('/api/v1/me/quiz-progress/') && r.request().method() === 'PUT' && r.ok())`
    **before** the click, then await it
  - `When I clear the browser storage and reload`: `page.evaluate(() => localStorage.clear())`, then `page.reload()`. Keep
    the cookies, so the session survives.
  - `Then the excluded count should be {int}`: `0` → `excluded-count` is absent; otherwise its text equals the number
  - `Then my saved {string} progress should have {int} excluded items`: `page.request.get(...)`, which shares the browser
    cookies
  - `Given I record progress requests`: `page.on('request')` pushes matching URLs into the world
  - `Then no quiz progress request should have been sent`
- [ ] **10.2** `e2e/features/frontend/progress-sync.feature` (`@frontend`):
  - [ ] **Progress survives clearing localStorage** (task-103 AC #8): sign up → quiz → exclude + wait for save → clear
        storage + reload → excluded count 1
  - [ ] **First sign-up uploads anonymous progress** (AC #9): anonymous quiz → exclude → sign up → wait for save → saved
        `phrasal-verbs` progress has 1 excluded item
  - [ ] **Another account doesn't see my progress** (the reported bug): sign up as A → exclude + wait for save → log out →
        quiz shows excluded count 0 → sign up as B → quiz shows excluded count 0
  - [ ] **Logging back in restores progress**: continue the previous scenario, or a new one: log out B → log in as A →
        quiz → excluded count 1
  - [ ] **Anonymous visitor sends no progress requests** (AC #7): record requests → quiz → exclude → wait 3 s → none sent
- [ ] **10.3** Wait strategy: never a fixed `sleep` except in the "no requests" scenario, where 3 s > the 2 s debounce.
      Everywhere else, use `waitForResponse` / locator expectations.
- [ ] **10.4** `make acceptanceTest` → every feature green, the old ones included. `make clean build` → green.
      Ask for commit approval → `test(e2e): cover quiz progress sync in the browser`

---

## Phase 11 — Config wiring check (delivery checklist)

- [ ] **11.1** `docker-compose.yml`: no new env vars (`max-state-bytes` has a default in `application.yml`). Write
      "no change" in the commit body.
- [ ] **11.2** `k8s/base` and `k8s/overlays/{dev,prod}`: no new config. `kubectl kustomize k8s/overlays/dev` and `…/prod`
      still render.
- [ ] **11.3** `.github/workflows/ci_cd.yml`:
  - no new secrets
  - the e2e job runs every feature folder, the new `progress-api/` included; check the glob/tags
- [ ] **11.4** `frontend/nginx.conf` and `vite.config.ts`: `/api/v1/me/**` is already proxied under `/api`, so no change
      is needed.

---

## Phase 12 — Docs, diagrams, backlog

- [ ] **12.1** `README.md` → "Accounts & security": new subsection "Learning progress":
  - [ ] the endpoint table (GET/PUT, 200/400/401/403/404) and an example body
  - [ ] the quiz keys
  - [ ] the 64 KB limit
  - [ ] the sync rules: anonymous = local only; login = server wins / first-login import; 2 s debounce; logout clears the
        local copy
  - [ ] a breaking-change note: `isLearned` and `?learned=` were removed from the phrasal-verbs API
- [ ] **12.2** `backend/CLAUDE.md`:
  - the progress API
  - the `QuizKey` whitelist (adding a quiz = an enum constant plus a frontend `QuizKey` entry)
  - the native upsert (last write wins)
  - the opaque JSON document and the size limit
  - the `/api/v1/me/**` rule position in `SecurityConfig`
  - the `HttpMessageNotReadableException` → 400 handler
- [ ] **12.3** `frontend/CLAUDE.md`:
  - [ ] State Management table: quiz state = localStorage + server sync for logged-in users; new key `quizProgressSync`;
        logout clears account-owned quiz state
  - [ ] the API table: `quizProgressApi.ts`, `put` `keepalive`
  - [ ] the hooks table: `useQuizProgressSync`
  - [ ] utils: `quizProgressMapping.ts`, `quizProgressStorage.ts`
  - [ ] `VerbEntry.id` / `GrammarEntry.id`; the `isLearned` split is gone
- [ ] **12.4** `e2e/CLAUDE.md`: the `features/progress-api/` and `features/frontend/progress-sync.feature` files, the new
      steps files, and the test ids `excluded-count` / `exclude-toggle`.
- [ ] **12.5** `docs/diagrams/quiz-progress-flow.md` (blackbox policy, new flow), in Mermaid:
  - [ ] a sequence diagram: login → GET → 200 apply / 404 import → debounced PUT → upsert
  - [ ] a flowchart: the load decision (owner / dirty / 200 / 404 / error)
  - [ ] a sequence diagram: logout → flush → `/auth/logout` → clear the local copy
- [ ] **12.6** `docs/diagrams/auth-flow.md`: add `/api/v1/me/** → authenticated` to the authorization-rules flowchart
      (an existing diagram covering `SecurityConfig`).
- [ ] **12.7** Plan file `.claude/docs/blackbox/plans/2026-10-26 18:10 Multi-user …md`: append a `## Mutations Log` row:
      "P6/P7 split: progress sync implemented alone. Surrogate id + upsert instead of a composite PK. Migrations V11/V12
      instead of V14/V15. Logout clears the local copy." Add only; don't delete anything in that folder.
- [ ] **12.8** Backlog (MCP):
  - [ ] task-102: check off AC #1–#4 and #6–#11. For AC #5, write "covered by `ON DELETE CASCADE` + a repository test;
        the deletion endpoint is task-100". Add implementation notes and the final summary.
  - [ ] task-103: check off AC #7–#11. Note that #13 and #14 are done for the sync part, and that 2FA, account and
        email-flow screens remain.
  - [ ] **ask the user** before moving task-102 to `Done`
- [ ] **12.9** Append the blackbox `session-log.md` entry (format in `.claude/rules/blackbox-policy.md`, no secrets). Mention
      the plan mutation and the new or updated diagrams.

---

## Phase 13 — Final verification

- [ ] **13.1** `make clean build` → green: backend verify (JaCoCo 85 %/package, Checkstyle), frontend build + tests,
      docker rebuild, e2e.
- [ ] **13.2** Manual run with `make dockerAll`, at http://localhost:3000:
  - [ ] anonymous: both quizzes work; DevTools shows no `/me/quiz-progress` requests
  - [ ] anonymous progress (exclude 2 verbs) → sign up → the progress is kept, and the DB row exists:
        `SELECT quiz_key, version FROM user_quiz_progress`
  - [ ] a second browser or incognito window → log in as the same user → the same progress
  - [ ] DevTools → clear localStorage → reload → the progress comes back from the server
  - [ ] log out → the quiz starts fresh, and dark mode is unchanged
  - [ ] log in as another user → their own (empty) progress
  - [ ] **stable ids** (task-103 AC #10): as the admin, `DELETE` a verb that sits **before** an excluded one (curl with
        the session + `X-XSRF-TOKEN`) → reload as the user → the same verb is still excluded, not its neighbour
  - [ ] `docker compose restart backend` → the progress is still there
  - [ ] the grammar quiz: same checks, key `grammar-i-wish-if-only`
- [ ] **13.3** Optional reviews before merging:
  - [ ] `/code-review`
  - [ ] `/security-review`: focus on the cross-user isolation, the principal-only user id, and no state in the logs
  - [ ] the `java-code-review` skill on the new backend classes
- [ ] **13.4** Before the first prod deploy with this change:
  - [ ] the task-98 backups decision is made (progress is now user data)
  - [ ] the 0.4 prod check was `0`
  - [ ] after the deploy: anonymous `GET https://<domain>/api/v1/me/quiz-progress/phrasal-verbs` → `401`
- [ ] **13.5** Open the PR → `main`, after the user approves.

---

## Coverage map — task-102 AC

| AC | Covered by |
|---|---|
| #1 save/read per quiz key, 404 before the first save | 4.3.2–4.3.5, 5.2 |
| #2 anonymous → 401 ProblemDetail | 4.3.1, 5.2 |
| #3 no access to another user's progress | 4.3.6, 2.3.4, 5.2 |
| #4 unknown key / too large / not an object → 400 | 3.4.2, 4.3.7–4.3.9, 5.2 |
| #5 deleting the user removes the progress | 2.1.1 (`ON DELETE CASCADE`), 2.3.4; the endpoint is task-100 |
| #6 `is_learned`, index, `learned` param, `isLearned` field removed; anonymous GETs work | Phase 1, 4.3.12 |
| #7 new migrations, existing ones untouched | 1.1, 2.1 |
| #8 unit + integration tests, JaCoCo | Phases 1–4 |
| #9 e2e crud.feature and steps updated | 1.4 |
| #10 backend/CLAUDE.md and README document the API | 12.1, 12.2 |
| #11 `make clean build` | 13.1 |

## Coverage map — task-103 AC (sync part only)

| AC | Covered by |
|---|---|
| #7 anonymous: localStorage only, no progress requests | 8.2.3, 8.4.1, 10.2 |
| #8 logged in: restored after clearing localStorage or in another browser | 8.2.4, 10.2, 13.2 |
| #9 first login uploads local progress | 8.2.4, 8.4.1, 10.2 |
| #10 stable ids; add/remove doesn't shift state | 7.2, 13.2 |
| #11 no `isLearned` in the frontend; every verb enters the pool | Phase 6 |
| #13 Vitest for sync debounce, first-login import, index ↔ id mapping | 7.2.3, 8.4 |
| #14 progress-sync feature (survives clearing localStorage) | 10.2 |
| #1–#6, #12 (rest), #15 | task-103 remainder (2FA, account and email-flow screens) |
