# Plan: Backend Code Refactoring Based on Skills

## Context

The user asked to refactor the backend Java code guided by the project's `.claude/skills/` (clean-code, spring-boot-patterns, logging-patterns, java-code-review, jpa-patterns). After reading all 31 backend source files, all 9 skills, the checkstyle config, and all test files, I identified 5 targeted refactoring opportunities. Each is motivated by a specific skill principle and addresses real duplication or inconsistency — no speculative abstractions.

## Changes

### 1. Replace manual `Logger LOG` with Lombok `@Slf4j` (4 files)

**Skill:** logging-patterns, backend/CLAUDE.md convention ("Services use `@Slf4j`")

**What:** Replace `private static final Logger LOG = LoggerFactory.getLogger(...)` with `@Slf4j` annotation. Rename `LOG` references to `log` (Lombok generates lowercase `log`).

**Files:**
- `application/service/PhrasalVerbService.java`
- `application/service/GrammarEntryService.java`
- `application/service/VerbDetailService.java`
- `infrastructure/exception/GlobalExceptionHandler.java`

**Checkstyle fix:** Add `log` exception to `ConstantName` rule in `aux/code/checkstyle/checkstyle.xml`:
```xml
<module name="ConstantName">
    <property name="format" value="^log$|^[A-Z][A-Z0-9]*(_[A-Z0-9]+)*$"/>
</module>
```

**Test impact:** None — tests don't reference the logger.

---

### 2. Extract duplicated `sanitize(Pageable)` to `PageableUtils` (3 services + 1 new util)

**Skill:** clean-code DRY — identical method copy-pasted across all 3 services, differing only in allowed fields and default sort.

**What:** Create `net.phrasal.application.util.PageableUtils` with a static method:
```java
public static Pageable sanitize(Pageable pageable, Set<String> allowedFields, String defaultSort)
```

Each service calls `PageableUtils.sanitize(pageable, ALLOWED_SORT_FIELDS, "verb")` instead of its own private method.

**Files:**
- NEW: `application/util/PageableUtils.java`
- `application/service/PhrasalVerbService.java` — remove `sanitize()`, call util
- `application/service/GrammarEntryService.java` — remove `sanitize()`, call util
- `application/service/VerbDetailService.java` — remove `sanitize()`, call util

**Test impact:** Existing service tests cover sanitization via `getAll` tests. Add `PageableUtilsTest` with positive/negative cases (valid sort, invalid sort fallback, mixed valid+invalid).

---

### 3. Flip to class-level `@Transactional(readOnly = true)` (3 services)

**Skill:** spring-boot-patterns — "default read-only, explicit `@Transactional` for writes" is the recommended pattern. Currently the services do the opposite: class-level `@Transactional` (write) with per-method `@Transactional(readOnly = true)` on reads.

**What:** On each service:
- Class annotation: `@Transactional` → `@Transactional(readOnly = true)`
- Remove `@Transactional(readOnly = true)` from read methods (inherited)
- Add `@Transactional` to write methods (`create`, `update`, `delete`)

**Files:**
- `application/service/PhrasalVerbService.java`
- `application/service/GrammarEntryService.java`
- `application/service/VerbDetailService.java`

**Test impact:** None — transaction semantics don't change; unit tests mock the repository.

---

### 4. Consolidate exception handling with base class (3 exceptions + handler)

**Skill:** clean-code DRY, spring-boot-patterns — the 3 handler methods in `GlobalExceptionHandler` are structurally identical. The 3 exception classes are near-identical too.

**Approach:** Introduce a `ResourceNotFoundException` base class. Keep the 3 domain subclasses so tests retain type-specific assertions. Consolidate the 3 handler methods into 1 that catches the base class.

**Files:**
- NEW: `infrastructure/exception/ResourceNotFoundException.java` — abstract base with `resourceName` and `errorType` fields
- `infrastructure/exception/PhrasalVerbNotFoundException.java` — extends `ResourceNotFoundException`
- `infrastructure/exception/GrammarEntryNotFoundException.java` — extends `ResourceNotFoundException`
- `infrastructure/exception/VerbDetailNotFoundException.java` — extends `ResourceNotFoundException`
- `infrastructure/exception/GlobalExceptionHandler.java` — replace 3 handlers with 1 `handleResourceNotFound(ResourceNotFoundException)`

**Test impact:**
- `GlobalExceptionHandlerTest` — update to call single handler method. Test with all 3 subclasses.
- Service tests — NO changes (still assert specific subclass types).

---

### 5. Remove dead `findByCategory` method

**Skill:** clean-code — dead code removal.

**What:** `GrammarEntryRepository.findByCategory()` at line 14 is unused — only `search()` is called from `GrammarEntryService`.

**Files:**
- `domain/repository/GrammarEntryRepository.java` — delete `findByCategory`

**Test impact:** None — no test calls this method.

---

## Files Modified Summary

| File | Change |
|---|---|
| `application/util/PageableUtils.java` | NEW — extracted sanitize logic |
| `infrastructure/exception/ResourceNotFoundException.java` | NEW — abstract base exception |
| `application/service/PhrasalVerbService.java` | @Slf4j, PageableUtils, transaction flip |
| `application/service/GrammarEntryService.java` | @Slf4j, PageableUtils, transaction flip |
| `application/service/VerbDetailService.java` | @Slf4j, PageableUtils, transaction flip |
| `infrastructure/exception/GlobalExceptionHandler.java` | @Slf4j, single handler |
| `infrastructure/exception/PhrasalVerbNotFoundException.java` | extends ResourceNotFoundException |
| `infrastructure/exception/GrammarEntryNotFoundException.java` | extends ResourceNotFoundException |
| `infrastructure/exception/VerbDetailNotFoundException.java` | extends ResourceNotFoundException |
| `domain/repository/GrammarEntryRepository.java` | remove dead findByCategory |
| `aux/code/checkstyle/checkstyle.xml` | allow `log` in ConstantName |

**New test files:**
| File | Coverage |
|---|---|
| `application/util/PageableUtilsTest.java` | NEW — valid/invalid/mixed sort sanitization |

**Modified test files:**
| File | Change |
|---|---|
| `infrastructure/exception/GlobalExceptionHandlerTest.java` | single handler method, 3 subclass variants |

## Verification

```bash
cd backend && JAVA_HOME=/usr/lib/jvm/java-21-openjdk-amd64 mvn clean verify
```

This runs checkstyle, all unit tests, all integration tests, and the JaCoCo 85% coverage gate.