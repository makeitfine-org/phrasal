# Multi-user: email + password sign-up — implementation TODOs

Source plan: `.claude/docs/blackbox/plans/2026-10-26 18:10 Multi-user accounts TOTP 2FA and reliable storage for phrasal.md`
(sections P2, plus parts of P3 and P7). Backlog: mainly **task-99**, plus the auth UI part of **task-103**.

> Status: plan only. Nothing below is implemented yet.

---

## Scope

**In scope**
- Register with email + password. The account is usable right away (no email confirmation).
- Log in, log out, `GET /api/v1/auth/me`.
- Spring Security baseline:
  - content GETs stay public; content POST/PUT/DELETE require ADMIN
  - CSRF in SPA cookie-to-header mode
  - sessions stored in Postgres
  - 401/403 returned as ProblemDetail
- Admin account bootstrapped from configuration.
- Basic abuse protection: rate limits on register and login.
- Frontend: Login and Register pages, auth context, a user menu in the navigation bar.
- Tests: backend unit + integration, frontend Vitest, e2e API + browser scenarios.
- Wiring and docs: docker-compose, k8s, CI, README, CLAUDE.md files, auth-flow diagram.

**Out of scope (deferred, still tracked by their backlog tasks)**

| Deferred item | Task |
|---|---|
| Email verification, Mailpit, SMTP, `EmailSender` | task-99 (remaining AC), task-106 |
| Password reset, account deletion, HIBP check, honeypot | task-100 |
| TOTP 2FA and recovery codes | task-101 |
| Server-side quiz progress, dropping `is_learned` | task-102, sync part of task-103 |
| Google sign-in | task-104 |
| Off-site backups, DB password rotation | task-97, task-98 |
| Domain cutover and deployment hardening | task-105 |

> **Warning:** task-98 (backups) was planned to come *before* any real user data exists.
> Shipping sign-up to prod without it means a lost volume also loses every account.
> Either do task-98 first, or accept that risk for an early prod rollout.

---

## Design decisions for this scope (differences from the full plan)

1. **No email confirmation.** No `email_verified_at` column yet, and every account is `enabled`.
   The column comes in a later migration together with verification (task-99 rest / task-104).
2. **Duplicate email on register returns `409 Conflict`.** The full plan returns 202 for every request to hide which emails exist.
   That only works when a confirmation email tells the real owner what happened. Without one, a silent 202 would leave a
   legitimate user unable to log in with no explanation. So register reports the conflict, and the
   rate limit (Phase 10) slows down email enumeration. Login still answers "Invalid email or password" for both an
   unknown email and a wrong password.
3. **Admin is bootstrapped from config (`PHRASAL_ADMIN_EMAIL` + `PHRASAL_ADMIN_PASSWORD`), not from an
   "admin emails" list.** Without email confirmation, an admin-email list would let anyone who registers
   that address first become admin. A startup initializer creates the admin account, or takes it over: it sets the role to ADMIN and
   re-hashes the configured password. Self-registration always creates `USER`.
4. **Register does not log in.** `POST /auth/register` returns `201` with `{id, email, role}`. The frontend then calls
   `POST /auth/login` with the same credentials. This keeps one place that creates sessions.
5. **Logout uses Spring Security's own logout filter** (`POST /api/v1/auth/logout` → `204`), not a controller method.
6. **The session principal is the `AuthenticatedUser` record** (`id`, `email`, `role`; `Serializable`, fixed `serialVersionUID`).
   It is never the JPA entity.
7. **Session cookie:** Spring Session default name `SESSION`; HttpOnly; SameSite=Lax; Secure in prod; idle timeout 7 days
   (configurable).
8. **Actuator:** `/actuator/health/**` stays public. `/actuator/info` and `/actuator/metrics` become ADMIN-only.
9. **`isLearned` stays untouched.** task-102 removes it.

---

## Conventions for every step

- Backend rules are in `backend/CLAUDE.md`. Short version:
  - layers `domain → application → presentation`, with `infrastructure`/`config` cross-cutting
  - DTOs are records in `application/dto`
  - Lombok on entities/services
  - Flyway `V{n}__*.sql`, never edit an applied migration
- Checkstyle runs in `mvn verify`: line length ≤ 120, **no magic numbers** (use named constants), no star imports,
  no `TODO` comments.
- JaCoCo needs **≥ 85 % line coverage per package**. Every new package (`infrastructure.security`,
  `presentation.security`, …) must reach it on its own.
- Every test class has positive **and** negative cases.
- Look up library APIs with **Context7** before writing Spring Security / Spring Session / React Router code.
- Run the narrowest command after each step, e.g. `cd backend && mvn -q test -Dtest=AuthServiceTest`. Run
  `make clean build` at the end of each phase.
- **Commits:** one commit per phase (or per step if the phase is large). Ask the user for approval before each commit.
  Format `type(scope): description`, ≤ 80 characters, no `Co-Authored-By` trailer.

---

## Phase 0 — Preparation (no code)

- [ ] **0.1** Make sure the work happens on branch `multi-user`, with a clean working tree apart from blackbox files.
- [ ] **0.2** Run `make clean build` once on the untouched branch and note the baseline (all green, e2e count).
- [ ] **0.3** Move **task-99** to `In Progress` in Backlog.md.
- [ ] **0.4** Update task-99 to match the reduced scope (Backlog.md MCP `task_edit`):
  - [ ] add an implementation note: "email confirmation deferred; admin bootstrapped from config; register returns 409 on duplicate"
  - [ ] leave the email-related AC (#1 verification part, #3, #13, the Mailpit part of #18) unchecked, with a note that they are deferred
  - [ ] add AC: "Admin account is created/updated at startup from PHRASAL_ADMIN_EMAIL / PHRASAL_ADMIN_PASSWORD"
  - [ ] add AC: "Register and login are rate-limited per IP and per email (429 ProblemDetail)"
- [ ] **0.5** Look up with Context7 and note the exact APIs for:
  - Security 7.1:
    - `csrf.spa()`
    - `DaoAuthenticationProvider` constructor
    - `HttpSessionSecurityContextRepository`
    - `HttpStatusReturningLogoutSuccessHandler`
    - `PathPatternRequestMatcher` / `requestMatchers(HttpMethod, String...)`
  - Spring Session JDBC: the PostgreSQL schema file inside the jar (`org/springframework/session/jdbc/schema-postgresql.sql`).
  - Boot 4.1: the `server.servlet.session.cookie.*` and `spring.session.*` properties.

---

## Phase 1 — Backend test infrastructure (refactor only, no behaviour change)

Why: each of the 3 integration test classes starts its own Postgres container. This phase adds about 5 more classes.
A shared singleton container plus one cached Spring context keeps build time flat.

- [ ] **1.1** Create `backend/src/test/java/net/phrasal/integration/AbstractIntegrationTest.java`:
  - [ ] `@SpringBootTest @AutoConfigureMockMvc @ActiveProfiles("test")`, `abstract class`
  - [ ] `static final PostgreSQLContainer POSTGRES = new PostgreSQLContainer("postgres:16-alpine")…`, started in a
        `static {}` block (singleton pattern: no `@Container`/`@Testcontainers`, so the container lives for the whole JVM)
  - [ ] `@DynamicPropertySource` registering `spring.datasource.url/username/password`
  - [ ] `@Autowired protected MockMvc mockMvc;`
- [ ] **1.2** Make `PhrasalVerbIntegrationTest`, `GrammarEntryIntegrationTest` and `VerbDetailIntegrationTest` extend it:
  - [ ] remove their own `@Container`, `@DynamicPropertySource`, `@SpringBootTest`, `@AutoConfigureMockMvc`,
        `@Testcontainers`, `@ActiveProfiles` and the `mockMvc` field
  - [ ] keep every test method unchanged
- [ ] **1.3** Check that tests don't depend on each other's data now that they share one DB:
  - [ ] grep for `findAll().get(0)` and count-based asserts, and make sure created rows use unique names
  - [ ] if a test deletes or changes seed rows that another class reads, make it create its own row first
- [ ] **1.4** Run `cd backend && mvn clean verify`. All tests pass, JaCoCo and Checkstyle are green, and only one Postgres
      container starts (check the log).
- [ ] **1.5** Ask for commit approval → `test(backend): share one Testcontainers Postgres across integration tests`

---

## Phase 2 — Dependencies, users table, session tables

### 2.1 Dependencies
- [ ] **2.1.1** Add to `backend/pom.xml`. Versions come from the Boot BOM, so don't pin them:
  - [ ] `spring-boot-starter-security`
  - [ ] `spring-boot-starter-session-jdbc`
  - [ ] `spring-boot-starter-security-test` (scope `test`). If Boot 4.1 has no such starter (check Context7 / the BOM),
        use `org.springframework.security:spring-security-test`.
- [ ] **2.1.2** Expect existing tests to fail at this point: security now protects everything, and the session tables
      don't exist yet. Phases 2.2–3 fix that. Don't commit in between.

### 2.2 Flyway migrations
- [ ] **2.2.1** `backend/src/main/resources/db/migration/V9__create_users.sql`:
  ```sql
  CREATE TABLE users
  (
      id            BIGSERIAL PRIMARY KEY,
      email         VARCHAR(254) NOT NULL,
      password_hash VARCHAR(100),               -- nullable: future Google-only accounts
      role          VARCHAR(20)  NOT NULL DEFAULT 'USER',
      created_at    TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at    TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
      version       BIGINT       NOT NULL DEFAULT 0,
      CONSTRAINT chk_users_role CHECK (role IN ('USER', 'ADMIN')),
      CONSTRAINT chk_users_email_lower CHECK (email = LOWER(email))
  );
  CREATE UNIQUE INDEX ux_users_email ON users (email);
  ```
- [ ] **2.2.2** `V10__create_spring_session_tables.sql`: copy the content of `org/springframework/session/jdbc/schema-postgresql.sql`
      from the `spring-session-jdbc` jar in `~/.m2` (`unzip -p <jar> org/springframework/session/jdbc/schema-postgresql.sql`).
      Don't write it by hand.
- [ ] **2.2.3** In `application.yml`, add `spring.session.jdbc.initialize-schema: never` so Flyway owns the schema.

### 2.3 Domain
- [ ] **2.3.1** `domain/entity/Role.java`: `enum Role { USER, ADMIN }`.
- [ ] **2.3.2** `domain/entity/User.java`:
  - [ ] table `users`
  - [ ] same style as `PhrasalVerb`: sequence `users_id_seq`, `@CreatedDate`/`@LastModifiedDate`/`@Version`, `@EntityListeners(AuditingEntityListener.class)`
  - [ ] `@Enumerated(EnumType.STRING) Role role`
  - [ ] `@ToString(of = {"id", "email", "role"})`. **Never include `passwordHash`.**
  - [ ] `@EqualsAndHashCode(of = {"id", "email"})`
  - [ ] constructor `User(String email, String passwordHash, Role role)`
- [ ] **2.3.3** `domain/repository/UserRepository.java`:
  - `Optional<User> findByEmail(String email)`
  - `boolean existsByEmail(String email)`

### 2.4 Tests
- [ ] **2.4.1** `domain/entity/UserEntityTest.java` (unit):
  - [ ] constructor sets the fields
  - [ ] `toString` doesn't contain the hash
  - [ ] equals/hashCode use id + email
- [ ] **2.4.2** `integration/UserRepositoryIntegrationTest.java` (extends `AbstractIntegrationTest`):
  - [ ] save + `findByEmail` round trip; `existsByEmail` true and false
  - [ ] negative: a second user with the same email → `DataIntegrityViolationException`
  - [ ] negative: an upper-case email violates `chk_users_email_lower` → `DataIntegrityViolationException`
  - [ ] the `spring_session` and `spring_session_attributes` tables exist (query `information_schema.tables` via `JdbcTemplate`)
- [ ] **2.4.3** Use a unique email per test (e.g. a `UUID` suffix), because the DB is shared now.

> Don't commit yet: existing CRUD tests fail until Phase 3 configures security. Phases 2 and 3 go into one commit.

---

## Phase 3 — Security baseline (public reads, ADMIN writes, CSRF, ProblemDetail errors)

### 3.1 ProblemDetail for 401 / 403
- [ ] **3.1.1** `presentation/security/ProblemDetailAuthenticationEntryPoint.java` (`AuthenticationEntryPoint`):
  - [ ] writes `401`, `Content-Type: application/problem+json`
  - [ ] body: title `Unauthorized`, type `https://api.phrasal.net/errors/unauthorized`, detail `Authentication is required`,
        `timestamp`
  - [ ] serialize with the Spring-managed Jackson 3 `JsonMapper` (inject it, don't `new` one)
- [ ] **3.1.2** `presentation/security/ProblemDetailAccessDeniedHandler.java` (`AccessDeniedHandler`):
  - [ ] writes `403` ProblemDetail, title `Forbidden`, type `.../errors/forbidden`
  - [ ] if the exception is a `CsrfException` (`MissingCsrfTokenException` / `InvalidCsrfTokenException`):
        detail `Invalid or missing CSRF token`, type `.../errors/csrf`
  - [ ] otherwise detail `You do not have permission to perform this action`
- [ ] **3.1.3** Extract the shared "build ProblemDetail" code instead of copying it. Options: a small
      `infrastructure/exception/ProblemDetailFactory` used by `GlobalExceptionHandler` and both handlers, or a static
      helper. Keep `ERROR_BASE_URI` in one place.

### 3.2 GlobalExceptionHandler
- [ ] **3.2.1** Add handlers **before** the `Exception` catch-all:
  - [ ] `AuthenticationException` → `401` ProblemDetail (title `Unauthorized`; detail `Invalid email or password` for
        `BadCredentialsException`, generic otherwise). Login in Phase 6 depends on this.
  - [ ] `AccessDeniedException` → `403` ProblemDetail
- [ ] **3.2.2** Extend `GlobalExceptionHandlerTest` with both handlers (status, title, no internal message leaked).

### 3.3 SecurityConfig
- [ ] **3.3.1** `config/SecurityConfig.java` with `@Configuration @EnableWebSecurity` and one `SecurityFilterChain` bean:
  - [ ] `csrf(c -> c.spa())`
  - [ ] `exceptionHandling(e -> e.authenticationEntryPoint(entryPoint).accessDeniedHandler(deniedHandler))`
  - [ ] turn off `formLogin`, `httpBasic` and `requestCache` (JSON API only, no redirects)
  - [ ] `authorizeHttpRequests`, in this order:
    1. `/error` → `permitAll`
    2. `/actuator/health`, `/actuator/health/**` → `permitAll`
    3. `/actuator/**` → `hasRole("ADMIN")`
    4. `GET /api/v1/auth/me` → `authenticated()`
    5. `POST /api/v1/auth/register`, `POST /api/v1/auth/login` → `permitAll`
    6. `POST|PUT|DELETE /api/v1/phrasal-verbs/**`, `/api/v1/grammar-entries/**`, `/api/v1/verb-details/**` → `hasRole("ADMIN")`
    7. `GET /api/**` → `permitAll`
    8. `anyRequest()` → `denyAll()`
  - [ ] use the `requestMatchers(HttpMethod, String...)` form (PathPattern based in Security 7)
- [ ] **3.3.2** Make sure the `XSRF-TOKEN` cookie is actually sent to the browser. The token is *deferred*, and the docs say it is
      cleared after login and logout.
  - [ ] check with an integration test (3.5.6) whether `GET /api/v1/phrasal-verbs` returns `Set-Cookie: XSRF-TOKEN`
  - [ ] if it doesn't, add `presentation/security/CsrfCookieFilter` (`OncePerRequestFilter` that reads
        `request.getAttribute(CsrfToken.class.getName())` and calls `getToken()`), registered `addFilterAfter(…, CsrfFilter.class)`
- [ ] **3.3.3** Delete the CORS mapping. The whole `config/WebMvcConfig.java` goes, since it only contains CORS.
      The Vite proxy, the nginx container and the Traefik ingress all make calls same-origin.
- [ ] **3.3.4** `grep -rn "allowedOrigins\|CorsRegistry" backend/src` returns nothing.

### 3.4 Existing integration tests
- [ ] **3.4.1** In the three CRUD integration tests, add to every POST/PUT/DELETE request:
      `.with(user("admin@test").roles("ADMIN")).with(csrf())`
      (static imports from `SecurityMockMvcRequestPostProcessors`).
- [ ] **3.4.2** Leave the GET tests unchanged. They prove anonymous reads still work (task-99 AC #7).

### 3.5 New tests: `integration/SecurityRulesIntegrationTest.java`
Pick one endpoint per resource and test every rule. Use `@ParameterizedTest` with `@MethodSource` over the three resources where it helps.
- [ ] **3.5.1** Anonymous `GET` on each of the 3 list endpoints and one `/{id}` → `200`.
- [ ] **3.5.2** Anonymous `POST`/`PUT`/`DELETE` (with CSRF) → `401`, `Content-Type` `application/problem+json`,
      `$.title == "Unauthorized"`.
- [ ] **3.5.3** `user().roles("USER")` + CSRF on POST/PUT/DELETE → `403`, `$.title == "Forbidden"`.
- [ ] **3.5.4** `ADMIN` **without** `csrf()` on POST → `403`, `$.type` ends with `/csrf`.
- [ ] **3.5.5** `ADMIN` + CSRF on POST → `201` (positive control).
- [ ] **3.5.6** The XSRF cookie: a GET response sets the `XSRF-TOKEN` cookie, which is **not** HttpOnly (the SPA must read it).
- [ ] **3.5.7** `GET /actuator/health` anonymous → `200`; `GET /actuator/metrics` anonymous → `401`, as ADMIN → `200`.
- [ ] **3.5.8** A CORS preflight `OPTIONS` with `Origin: http://localhost:5173` gets no `Access-Control-Allow-Origin` header.
- [ ] **3.5.9** Unit tests `ProblemDetailAuthenticationEntryPointTest` / `ProblemDetailAccessDeniedHandlerTest` with
      `MockHttpServletResponse`: status, content type, JSON body; CSRF and non-CSRF branches.

### 3.6 Keep e2e green
`make clean build` runs e2e, and `crud.feature → "Create a new phrasal verb"` now gets `401` as anonymous.
- [ ] **3.6.1** Change that scenario into **"Anonymous visitor cannot create a phrasal verb"**: same `When`, `Then the
      response status should be 401`. That covers task-99 AC #18, second half. Phase 16 adds the authenticated create back.
- [ ] **3.6.2** Keep `isLearned: false` in the create step payload. That field stays until task-102.

### 3.7 Verify and commit
- [ ] **3.7.1** `cd backend && mvn clean verify`, everything green.
- [ ] **3.7.2** `make clean build`, everything green including e2e.
- [ ] **3.7.3** Manual check: `make dockerAll`, open http://localhost:3000, the quizzes and list pages still load.
      `curl -i -X POST localhost:8080/api/v1/phrasal-verbs` → 401 problem+json.
- [ ] **3.7.4** Ask for commit approval → `feat(backend): add Spring Security, users table and admin-only writes`

---

## Phase 4 — Password hashing, user lookup, session principal

- [ ] **4.1** `infrastructure/security/AuthenticatedUser.java`:
  - [ ] `record AuthenticatedUser(Long id, String email, Role role) implements Serializable`
  - [ ] `@Serial private static final long serialVersionUID = 1L;`
  - [ ] a method `List<GrantedAuthority> authorities()` → `ROLE_` + role
- [ ] **4.2** `infrastructure/security/AppUserDetails.java`: implements `UserDetails` (and
      `CredentialsContainer`). Holds `AuthenticatedUser` plus the password hash.
  - [ ] `getUsername()` = email
  - [ ] `isEnabled()` = `true`. Email confirmation is deferred; leave a short comment saying so (no `TODO`, Checkstyle).
  - [ ] `eraseCredentials()` nulls the hash
  - [ ] `toAuthenticatedUser()` returns the record. Only the record is stored in the session (Phase 6).
- [ ] **4.3** `infrastructure/security/JpaUserDetailsService.java` (`UserDetailsService`):
  - [ ] `loadUserByUsername(email)`: normalize email (trim + `toLowerCase(Locale.ROOT)`), then `UserRepository.findByEmail`
  - [ ] missing user → `UsernameNotFoundException`
  - [ ] user with `passwordHash == null` → also `UsernameNotFoundException` (future Google-only accounts can't password-login)
- [ ] **4.4** `infrastructure/security/EmailNormalizer.java`: a final utility class with a private constructor (or a static method
      on `AuthenticatedUser`'s package) used by register, login and the admin initializer. One rule everywhere.
- [ ] **4.5** In `SecurityConfig`, add beans:
  - [ ] `PasswordEncoder` = `PasswordEncoderFactories.createDelegatingPasswordEncoder()` (stores `{bcrypt}…`)
  - [ ] `AuthenticationManager` = `new ProviderManager(daoProvider)`, where `DaoAuthenticationProvider` gets the
        `JpaUserDetailsService` + `PasswordEncoder` (check the Security 7 constructor in Context7)
  - [ ] `SecurityContextRepository` = `new HttpSessionSecurityContextRepository()`, also passed to
        `http.securityContext(c -> c.securityContextRepository(repo))`
- [ ] **4.6** Unit tests:
  - [ ] `AuthenticatedUserTest`: authorities for USER and ADMIN; Java-serialize and deserialize gives an equal record
  - [ ] `AppUserDetailsTest`: username/enabled/authorities; `eraseCredentials` nulls the password
  - [ ] `JpaUserDetailsServiceTest` (Mockito):
    - found
    - email normalized before lookup (`" Bob@X.com "` → `"bob@x.com"`)
    - not found → exception
    - null hash → exception
  - [ ] `EmailNormalizerTest`: trim, lower-case, Turkish-locale-safe (`Locale.ROOT`)
- [ ] **4.7** Run `mvn -q test -Dtest='AuthenticatedUserTest,AppUserDetailsTest,JpaUserDetailsServiceTest,EmailNormalizerTest'`.

---

## Phase 5 — Register endpoint

### 5.1 Password rule as a Bean Validation constraint
- [ ] **5.1.1** `application/validation/ValidPassword.java`: annotation `@Constraint(validatedBy = PasswordPolicyValidator.class)`.
- [ ] **5.1.2** `application/validation/PasswordPolicyValidator.java`:
  - [ ] constants `MIN_LENGTH = 10`, `MAX_UTF8_BYTES = 72` (Checkstyle MagicNumber)
  - [ ] `null` → valid (`@NotBlank` reports that case)
  - [ ] fewer than 10 characters → violation `Password must be at least 10 characters`
  - [ ] `getBytes(UTF_8).length > 72` → violation `Password must not exceed 72 bytes (UTF-8)`
  - [ ] use `context.disableDefaultConstraintViolation()` + `buildConstraintViolationWithTemplate`, so the message names
        the rule that failed (task-99 AC #2)
- [ ] **5.1.3** `PasswordPolicyValidatorTest`:
  - 9 chars ✗, 10 chars ✓
  - 72 ASCII ✓, 73 ASCII ✗
  - 25 × "€" (3 bytes each = 75 bytes, only 25 chars) ✗
  - 24 × "€" = 72 bytes ✓
  - null ✓

### 5.2 DTOs
- [ ] **5.2.1** `application/dto/RegisterRequest.java`:
  - `@NotBlank @Email @Size(max = 254) String email`
  - `@NotBlank @ValidPassword String password`
  - override `toString()` to mask the password
- [ ] **5.2.2** `application/dto/UserResponse.java`: `record UserResponse(Long id, String email, String role)`. Used by
      register, login and me.

### 5.3 Exception
- [ ] **5.3.1** `infrastructure/exception/EmailAlreadyRegisteredException.java` (`RuntimeException`), with a generic message
      `An account with this email already exists`.
- [ ] **5.3.2** `GlobalExceptionHandler`: handler → `409` ProblemDetail, title `Email Already Registered`, type
      `.../errors/email-already-registered`.
- [ ] **5.3.3** `GlobalExceptionHandlerTest`: add the 409 case.

### 5.4 Service
- [ ] **5.4.1** `application/service/AuthService.java` (`@Service @Transactional @RequiredArgsConstructor @Slf4j`).
      `UserResponse register(RegisterRequest)`:
  1. `email = EmailNormalizer.normalize(request.email())`
  2. `existsByEmail` → throw `EmailAlreadyRegisteredException`
  3. `new User(email, passwordEncoder.encode(password), Role.USER)`, then `saveAndFlush`
  4. catch `DataIntegrityViolationException` (race between two registers) → `EmailAlreadyRegisteredException`
  5. `log.info("Registered user id={}", id)`. **Never log the email or password at INFO.**
  6. return `UserResponse`
- [ ] **5.4.2** Map entity → DTO with MapStruct: `application/mapper/UserMapper` (`componentModel = "spring"`), role enum → `String`.
- [ ] **5.4.3** `UserMapperTest`: entity → response, `null` → `null`.
- [ ] **5.4.4** `AuthServiceTest` (Mockito):
  - [ ] success: the encoder is called, the saved user is `USER` with a normalized email, the hash is not the raw password
  - [ ] duplicate (`existsByEmail` true) → exception, `save` never called
  - [ ] race (`saveAndFlush` throws `DataIntegrityViolationException`) → `EmailAlreadyRegisteredException`

### 5.5 Controller
- [ ] **5.5.1** `presentation/rest/AuthController.java`, `@RequestMapping("/api/v1/auth")`:
  - `@PostMapping("/register")` → `ResponseEntity.status(CREATED).body(authService.register(request))`
- [ ] **5.5.2** `integration/AuthRegisterIntegrationTest.java`. All requests use `.with(csrf())` unless stated otherwise.
  - [ ] valid → `201`, `$.email` lower-cased, `$.role == "USER"`, no `password`/`passwordHash` in the body
  - [ ] the DB row has a hash starting with `{bcrypt}`
  - [ ] same email again, in different letter case → `409`, `$.title == "Email Already Registered"`
  - [ ] password with 9 characters → `400`, `$.errors.password` contains `at least 10`
  - [ ] password over 72 bytes → `400`, `$.errors.password` contains `72 bytes`
  - [ ] invalid email / blank fields → `400` Validation Error
  - [ ] without CSRF token → `403`
  - [ ] register as anonymous works (no auth needed)

---

## Phase 6 — Login endpoint

- [ ] **6.1** `application/dto/LoginRequest.java`: `@NotBlank @Email String email`, `@NotBlank String password`. Mask the
      password in `toString()`.
- [ ] **6.2** `presentation/security/SessionAuthenticator.java` (`@Component`). It keeps the session code in one place,
      so register auto-login or Google login can reuse it later.
  - [ ] `UserResponse login(LoginRequest, HttpServletRequest, HttpServletResponse)`:
    1. `authenticationManager.authenticate(UsernamePasswordAuthenticationToken.unauthenticated(normalizedEmail, password))`.
       A `BadCredentialsException` propagates to the `GlobalExceptionHandler` → 401.
    2. take `AuthenticatedUser` from the `AppUserDetails` principal and build a **new** authenticated token with
       principal = `AuthenticatedUser` (record), credentials = `null`, authorities = `principal.authorities()`
    3. session fixation protection: if `request.getSession(false) != null`, call `request.changeSessionId()`
    4. `SecurityContext ctx = securityContextHolderStrategy.createEmptyContext(); ctx.setAuthentication(token);`
       `securityContextHolderStrategy.setContext(ctx); securityContextRepository.saveContext(ctx, request, response);`
    5. return `UserResponse`
- [ ] **6.3** `AuthController`: `@PostMapping("/login")` → `200` with `UserResponse`.
- [ ] **6.4** `SessionAuthenticatorTest` (unit, Mockito + `MockHttpServletRequest`):
  - [ ] success saves the context, and the principal is the `AuthenticatedUser` record, **not** `AppUserDetails`
  - [ ] an existing session gets a new id
  - [ ] bad credentials → the exception propagates and `saveContext` is never called
- [ ] **6.5** `integration/AuthLoginIntegrationTest.java`:
  - [ ] register, then login → `200`, body has id/email/role, response sets the `SESSION` cookie
  - [ ] the login email is normalized (`"  USER@x.com "` works)
  - [ ] wrong password → `401`, `$.detail == "Invalid email or password"`
  - [ ] unknown email → `401` with **the same** body as a wrong password (no enumeration)
  - [ ] fixation: get a session cookie first (e.g. a GET that creates one, or `MockHttpSession`), log in, and check the id differs
  - [ ] without CSRF → `403`
  - [ ] blank fields → `400`

---

## Phase 7 — `/me` and logout

- [ ] **7.1** `AuthController`: `@GetMapping("/me")` with `@AuthenticationPrincipal AuthenticatedUser user` → `200 UserResponse`.
      Build it from the principal, so there's no DB call.
- [ ] **7.2** `SecurityConfig` logout:
  ```java
  .logout(l -> l
      .logoutUrl("/api/v1/auth/logout")                  // POST only, CSRF-protected by default
      .logoutSuccessHandler(new HttpStatusReturningLogoutSuccessHandler(HttpStatus.NO_CONTENT))
      .deleteCookies("SESSION"))
  ```
- [ ] **7.3** `integration/AuthSessionIntegrationTest.java`. It runs the full flow over **real cookies** and doesn't use
      `user()`, so the principal goes through Spring Session.
  - [ ] register → login (keep the `SESSION` cookie) → `GET /me` with the cookie → `200`, matching email and role
  - [ ] `GET /me` anonymous → `401` problem+json (task-99 AC #5)
  - [ ] `POST /logout` with cookie + CSRF → `204`; afterwards `GET /me` with the old cookie → `401`
  - [ ] `POST /logout` without CSRF → `403`
  - [ ] a `USER` session cookie on `POST /api/v1/phrasal-verbs` → `403` (a real session, not the mock `user()`)
- [ ] **7.4** Put the "register + login and return the cookies" code in a small test helper
      (`integration/support/AuthTestClient` or a protected method in `AbstractIntegrationTest`). Phases 8–10 reuse it.

---

## Phase 8 — Session cookie flags and persistence

- [ ] **8.1** `application.yml`:
  ```yaml
  server:
    servlet:
      session:
        timeout: ${SESSION_TIMEOUT:7d}
        cookie:
          http-only: true
          same-site: lax
          secure: ${SESSION_COOKIE_SECURE:false}
  ```
- [ ] **8.2** `application-prod.yml`: `server.servlet.session.cookie.secure: true` (hard-coded, so prod can't be misconfigured).
- [ ] **8.3** Check with Context7 that Boot 4.1 applies `server.servlet.session.cookie.*` to Spring Session's
      `DefaultCookieSerializer`. If it doesn't, declare a `CookieSerializer` bean in `SecurityConfig`.
- [ ] **8.4** `integration/SessionPersistenceIntegrationTest.java`:
  - [ ] after login, the `Set-Cookie` header for `SESSION` contains `HttpOnly` and `SameSite=Lax`, and no `Secure` in the test profile
  - [ ] after login, `SELECT count(*) FROM spring_session WHERE principal_name = ?` (email) = 1. This proves the session lives in
        Postgres and survives restarts (task-99 AC #6).
  - [ ] after logout the row is gone
  - [ ] a separate unit/slice test with `@TestPropertySource(properties = "server.servlet.session.cookie.secure=true")` (or
        the prod profile property) → the cookie has `Secure`. It's a new context, which is acceptable for one class.
- [ ] **8.5** Manual restart check (once, during Phase 18): log in through the UI, `docker compose restart backend`,
      reload. Still logged in.
- [ ] **8.6** `cd backend && mvn clean verify` → green. Ask for commit approval →
      `feat(backend): add register, login, logout and me endpoints`

---

## Phase 9 — Admin account bootstrap

- [ ] **9.1** `config/AdminAccountProperties.java`: `@ConfigurationProperties("phrasal.security.admin")`
      `record AdminAccountProperties(String email, String password)`. Enable it with
      `@EnableConfigurationProperties` / `@ConfigurationPropertiesScan`.
- [ ] **9.2** `application.yml`:
  ```yaml
  phrasal:
    security:
      admin:
        email: ${PHRASAL_ADMIN_EMAIL:}
        password: ${PHRASAL_ADMIN_PASSWORD:}
  ```
- [ ] **9.3** `application/service/AdminAccountInitializer.java` (`ApplicationRunner`, `@Transactional`):
  - [ ] email or password blank → `log.info("Admin bootstrap skipped: PHRASAL_ADMIN_EMAIL/PASSWORD not set")` and return
  - [ ] configured password breaks the password policy (reuse `PasswordPolicyValidator` logic via a static
        `PasswordPolicy.violation(String)` helper, or extract it) → **fail startup** with `IllegalStateException`.
        A weak admin password must never be accepted silently.
  - [ ] user missing → create it with role `ADMIN` and the encoded password, and log `Admin account created id={}`
  - [ ] user exists:
    - role not `ADMIN` → set `ADMIN`
    - `!passwordEncoder.matches(configured, hash)` → re-encode
    - log what changed, never the password
  - [ ] idempotent: a second run with the same config changes nothing (no `UPDATE`; check that `version` is unchanged)
  - [ ] the takeover rule above (role + password reset) is intentional. Write it in the class Javadoc: it closes the
        "someone registered the admin email first" hole that exists because email confirmation is missing.
- [ ] **9.4** `AdminAccountInitializerTest` (Mockito):
  - blank config → no repo calls
  - weak password → exception
  - create
  - promote + reset password
  - already in sync → no save
- [ ] **9.5** `integration/AdminBootstrapIntegrationTest.java` with
      `@TestPropertySource(properties = {"phrasal.security.admin.email=admin@it.test", "phrasal.security.admin.password=…"})`:
  - [ ] the admin can log in, `/me` → `role == "ADMIN"`
  - [ ] with that real admin session cookie + CSRF, `POST /api/v1/phrasal-verbs` → `201`
  - [ ] registering `admin@it.test` → `409`
  - [ ] keep the number of distinct test contexts low: put every admin-dependent test in this one class

---

## Phase 10 — Rate limiting on register and login (recommended before public launch)

Without email confirmation, rate limits are the only brake on bot sign-ups and password guessing. There is
no per-account lockout, because anyone could use it to lock a victim out.

- [ ] **10.1** Add `com.github.ben-manes.caffeine:caffeine` to `pom.xml` (version managed by the Boot BOM).
- [ ] **10.2** `config/RateLimitProperties.java`: `@ConfigurationProperties("phrasal.rate-limit")` with `boolean enabled`
      and three rules, each `record Rule(int limit, Duration window)`.
  ```yaml
  phrasal:
    rate-limit:
      enabled: ${RATE_LIMIT_ENABLED:true}
      register-per-ip:  { limit: "${RATE_LIMIT_REGISTER_PER_IP:5}",  window: 1h }
      login-per-ip:     { limit: "${RATE_LIMIT_LOGIN_PER_IP:20}",    window: 5m }
      login-per-email:  { limit: "${RATE_LIMIT_LOGIN_PER_EMAIL:5}",  window: 5m }
  ```
- [ ] **10.3** `infrastructure/security/RateLimiter.java`:
  - [ ] fixed window: one Caffeine `Cache<String, AtomicInteger>` per rule, `expireAfterWrite(window)`, `maximumSize(100_000)`
  - [ ] `void check(String ruleName, Rule rule, String key)` → throws `RateLimitExceededException(retryAfterSeconds)`
        when the count exceeds the limit
  - [ ] inject a Caffeine `Ticker` so tests can move time forward without `sleep`
- [ ] **10.4** `infrastructure/exception/RateLimitExceededException.java`, plus a `GlobalExceptionHandler` method
      returning `ResponseEntity<ProblemDetail>` with `429`, title `Too Many Requests`, type `.../errors/rate-limited`
      and the `Retry-After` header.
- [ ] **10.5** Call it from `AuthController`. Client IP is `request.getRemoteAddr()`; `forward-headers-strategy: native` already
      resolves `X-Forwarded-For` from trusted proxies.
  - [ ] register: `register-per-ip`
  - [ ] login: `login-per-ip` and `login-per-email` (normalized email). Count **every** attempt, successful or not. That's simpler
        and still stops guessing.
- [ ] **10.6** Tests:
  - [ ] `RateLimiterTest`: N allowed then N+1 throws; a new window after the fake ticker advances; different keys are independent;
        `enabled=false` → never throws
  - [ ] `integration/RateLimitIntegrationTest` with small limits via `@TestPropertySource`
        (`register-per-ip.limit=2`, `login-per-email.limit=3`):
    - 3rd register from the same IP → `429` + `Retry-After`
    - 4th login for one email → `429`
    - another email still works
  - [ ] `GlobalExceptionHandlerTest`: the 429 mapping
- [ ] **10.7** **Prod client IP.** With K3s ServiceLB, Traefik sees one internal IP for every visitor. Per-IP limits would then
      apply **site-wide** (5 registrations per hour for everyone). Pick one before prod:
  - [ ] (a) Ansible `ansible/roles/k3s/tasks/main.yml`: add a `HelmChartConfig` for `traefik` in `kube-system` with
        `service.spec.externalTrafficPolicy: Local`. Then verify in backend logs that real client IPs appear
        (task-100 AC #8). Document it in `ansible/README.md`.
  - [ ] (b) Until (a) is done, set `RATE_LIMIT_REGISTER_PER_IP` / `RATE_LIMIT_LOGIN_PER_IP` high in the prod configmap,
        and rely on the per-email limit.
- [ ] **10.8** `cd backend && mvn clean verify` → green. Ask for commit approval → `feat(backend): rate-limit register and login`

---

## Phase 11 — Config wiring: docker-compose, k8s, CI

- [ ] **11.1** `docker-compose.yml`, `backend.environment` (dev-only values):
  ```yaml
  PHRASAL_ADMIN_EMAIL: ${PHRASAL_ADMIN_EMAIL:-admin@phrasal.test}
  PHRASAL_ADMIN_PASSWORD: ${PHRASAL_ADMIN_PASSWORD:-admin-dev-password}
  SESSION_COOKIE_SECURE: "false"
  RATE_LIMIT_REGISTER_PER_IP: "1000"   # e2e registers many users from one IP
  RATE_LIMIT_LOGIN_PER_IP: "1000"
  ```
  (Keep `RATE_LIMIT_LOGIN_PER_EMAIL` at its default so e2e can test the 429.)
- [ ] **11.2** `k8s/base/backend-secret.yaml`: add `admin.email` / `admin.password` with the same dev defaults. Keep the DEV-ONLY comment.
- [ ] **11.3** `k8s/base/backend-deployment.yaml`: env `PHRASAL_ADMIN_EMAIL` / `PHRASAL_ADMIN_PASSWORD` from `secretKeyRef app-secrets`.
- [ ] **11.4** `k8s/base/backend-configmap.yaml` + deployment env: `rate-limit.register-per-ip`, `rate-limit.login-per-ip`
      (needed only for option 10.7 b; otherwise skip and rely on the defaults).
- [ ] **11.5** `k8s/overlays/prod/patches/secret.yaml.example`: add `admin.email: CHANGE_ME`, `admin.password: CHANGE_ME`.
- [ ] **11.6** `.github/workflows/ci_cd.yml`:
  - [ ] "Generate prod secret patch" step: add `PHRASAL_ADMIN_EMAIL: ${{ secrets.PHRASAL_ADMIN_EMAIL }}` and
        `PHRASAL_ADMIN_PASSWORD: ${{ secrets.PHRASAL_ADMIN_PASSWORD }}` to `env`, and the two `stringData` lines to the `printf`
  - [ ] e2e job "Run e2e tests" env: `ADMIN_EMAIL: admin@phrasal.test`, `ADMIN_PASSWORD: admin-dev-password` (the compose defaults)
- [ ] **11.7** User action (write it in the README): create GitHub Secrets `PHRASAL_ADMIN_EMAIL` and `PHRASAL_ADMIN_PASSWORD`
      (≥ 10 characters) **before** the next tagged deploy. Keep a copy in the password manager. Never commit them.
- [ ] **11.8** Run `kubectl kustomize k8s/overlays/dev` and `kubectl kustomize k8s/overlays/prod` (with the example patch copied
      to `secret.yaml` locally, then deleted). Both render without errors.
- [ ] **11.9** Check `frontend/nginx.conf` and `vite.config.ts`: no change needed. Both proxy `/api` same-origin and pass
      `Set-Cookie` through. Write that conclusion in the commit body, not in code.
- [ ] **11.10** `make clean build` → green (the compose stack now boots with an admin). Ask for commit approval →
      `build: wire admin and session settings into compose, k8s and CI`

---

## Phase 12 — Frontend API client: POST/PUT/DELETE, CSRF, ProblemDetail

- [ ] **12.1** `src/types.ts`: add
  ```ts
  export interface ProblemDetail {
    type?: string; title?: string; status?: number; detail?: string;
    errors?: Record<string, string>;            // field errors from GlobalExceptionHandler
  }
  export type Role = 'USER' | 'ADMIN';
  export interface CurrentUser { id: number; email: string; role: Role; }
  ```
- [ ] **12.2** `src/utils/cookies.ts`: `readCookie(name: string): string | null`. Parse `document.cookie` and decode the value.
- [ ] **12.3** `src/api/client.ts`:
  - [ ] `ApiError` gets an optional third field `problem?: ProblemDetail`. `message` = `problem.detail ?? problem.title ?? statusText`.
  - [ ] private `request<T>(method, path, { params?, body? })`:
    - always `credentials: 'same-origin'`
    - for non-GET: `Content-Type: application/json` (only when there is a body) and `X-XSRF-TOKEN: readCookie('XSRF-TOKEN')`
      when the cookie exists
    - `!response.ok`: try to parse a JSON body (`application/problem+json` or `application/json`) into `problem`; ignore parse errors
    - `204` or an empty body → `undefined as T`
  - [ ] keep the public `get<T>(path, params?)` signature, so existing callers don't change
  - [ ] add `post<T>(path, body?)`, `put<T>(path, body?)`, `del<T>(path)`
- [ ] **12.4** `src/__tests__/api/client.test.ts`:
  - [ ] update the existing assertion `toHaveBeenCalledWith(expect.stringContaining(...))` to also accept the init object
        (`expect.objectContaining({ credentials: 'same-origin' })`)
  - [ ] new cases:
    - POST sends method, JSON body, `Content-Type`, `X-XSRF-TOKEN` from `document.cookie`
    - no cookie → no header
    - PUT/DELETE send the header
    - 204 → `undefined`
    - a 400 problem+json → `ApiError` with `problem.errors.password`
    - a 401 with an empty body → `ApiError` without `problem`, `status === 401`
    - a non-JSON error body doesn't throw a parse error
  - [ ] `src/__tests__/utils/cookies.test.ts`: found, missing, URL-encoded value, several cookies
- [ ] **12.5** `npm --prefix frontend run test:run` → green.

---

## Phase 13 — Auth API and auth context

### 13.1 API module
- [ ] **13.1.1** `src/api/authApi.ts`:
  - `register(email, password): Promise<CurrentUser>` → `POST /auth/register`
  - `login(email, password): Promise<CurrentUser>` → `POST /auth/login`
  - `logout(): Promise<void>` → `POST /auth/logout`
  - `fetchCurrentUser(): Promise<CurrentUser | null>` → `GET /auth/me`; `ApiError` with status 401 → `null`, other errors rethrown
- [ ] **13.1.2** `src/__tests__/api/authApi.test.ts`: each function hits the right path/method/body; `fetchCurrentUser` 401 → `null`,
      500 → throws.

### 13.2 Context + hook
`frontend/CLAUDE.md` currently says "no context or global store". Phase 17 updates that rule: one auth context is allowed.
- [ ] **13.2.1** `src/auth/AuthContext.tsx`:
  - [ ] state: `status: 'loading' | 'authenticated' | 'anonymous'`, `user: CurrentUser | null`
  - [ ] on mount: `fetchCurrentUser()` → set state. On a network error → `anonymous` (the site must work without the backend auth).
  - [ ] actions:
    - `login(email, password)`: api login, then `refresh()`
    - `register(email, password)`: api register, then `login` with the same credentials
    - `logout()`: api logout, then `refresh()`. The refresh is required: logout clears the XSRF cookie, and the follow-up GET sets a new one.
    - `refresh()`
  - [ ] actions rethrow `ApiError` so pages can show messages
  - [ ] **default context value** = `{ status: 'anonymous', user: null, …no-op actions }`. Then components rendered without a provider
        (all existing tests) keep working without changes.
- [ ] **13.2.2** `src/auth/useAuth.ts`: `export function useAuth() { return useContext(AuthContext); }`.
- [ ] **13.2.3** `src/main.tsx`: wrap `<BrowserRouter>` in `<AuthProvider>`, inside `ErrorBoundary`.
- [ ] **13.2.4** `src/__tests__/auth/AuthContext.test.tsx` (mock `authApi`):
  - initial `loading` → `authenticated` when `/me` returns a user
  - `anonymous` on `null`
  - `anonymous` on a network error
  - `login` updates the user
  - `register` calls register **then** login
  - `logout` → anonymous and `/me` re-fetched
  - a failing `login` rethrows and leaves the state anonymous
  - `useAuth` without a provider returns the anonymous default

---

## Phase 14 — Login and Register pages

- [ ] **14.1** `src/pages/LoginPage.tsx` (route `/login`):
  - [ ] fields: email (`type="email"`, `autoComplete="email"`, `required`), password (`type="password"`,
        `autoComplete="current-password"`, `required`)
  - [ ] submit button shows "Logging in…" and is disabled while pending
  - [ ] on success, `navigate(location.state?.from ?? '/', { replace: true })`
  - [ ] on `ApiError`, show `error.message` in a `role="alert"` box (401 → "Invalid email or password", 429 → the server
        detail, which says to try later)
  - [ ] a link "No account? Sign up" → `/register`
  - [ ] already authenticated → `<Navigate to="/" replace />`
  - [ ] Tailwind classes match existing pages, including `dark:` variants. Layout works at 375 px width.
  - [ ] `data-testid`s: `login-email`, `login-password`, `login-submit`, `auth-error`
- [ ] **14.2** `src/pages/RegisterPage.tsx` (route `/register`):
  - [ ] fields: email, password (`autoComplete="new-password"`, `minLength={10}`), confirm password
  - [ ] client checks before the request: passwords match, length ≥ 10. Show a hint under the field: "At least 10 characters".
  - [ ] server errors:
    - `problem.errors.<field>` shown under that field
    - 409 → "An account with this email already exists", with a link to `/login`
    - other → alert box
  - [ ] on success, `register()` from the context (which also logs in), then navigate to `/`
  - [ ] a link "Already have an account? Log in"
  - [ ] `data-testid`s: `register-email`, `register-password`, `register-password-confirm`, `register-submit`, `auth-error`,
        `field-error-<name>`
- [ ] **14.3** `src/main.tsx`: add `<Route path="/login" …>` and `<Route path="/register" …>` inside the `PageShell` route,
      **before** `*`.
- [ ] **14.4** Tests, rendered with `MemoryRouter` and a test `AuthContext.Provider` value, or a mocked `authApi`:
  - [ ] `src/__tests__/LoginPage.test.tsx`:
    - renders the fields
    - submit calls `login` with the typed values
    - pending state disables the button
    - 401 error shows the alert
    - success navigates to `from` or `/`
    - an authenticated user is redirected
  - [ ] `src/__tests__/RegisterPage.test.tsx`:
    - mismatched passwords → no request, error shown
    - short password → no request
    - success → `register` called, then navigate
    - 400 field error shown under password
    - 409 shows the message + login link
  - [ ] `src/__tests__/routeReload.test.tsx` (or similar): `/login` and `/register` render inside the shell
- [ ] **14.5** `npm --prefix frontend run test:run && npm --prefix frontend run build` → green.

---

## Phase 15 — User menu in the navigation bar

- [ ] **15.1** `src/components/UserMenu.tsx` (uses `useAuth`):
  - [ ] `loading` → render nothing (no flicker of "Log in")
  - [ ] `anonymous` → links "Log in" (`/login`, `data-testid="nav-login"`) and "Sign up" (`/register`, `nav-register`)
  - [ ] `authenticated` → button with the email (truncated, `data-testid="user-menu"`), plus a dropdown with:
    - the email
    - an "Admin" badge when `role === 'ADMIN'`
    - "Log out" (`nav-logout`): `logout()` then `navigate('/')`
  - [ ] reuse the existing `useClickOutside` pattern from `NavigationMenu.tsx`: move it to `src/hooks/useClickOutside.ts`
        instead of copying it
  - [ ] the dropdown closes on route change, like `DesktopDropdown`
- [ ] **15.2** `NavigationMenu.tsx`:
  - [ ] desktop: render `<UserMenu />` in the right-hand group, before the theme toggle
  - [ ] mobile menu: the same entries at the bottom of `nav-mobile-menu`; tapping one closes the menu
- [ ] **15.3** Tests:
  - [ ] `src/__tests__/UserMenu.test.tsx`:
    - anonymous shows both links
    - loading shows nothing
    - authenticated shows the email
    - the admin badge only for ADMIN
    - logout calls `logout` and navigates home
    - click outside closes the dropdown
  - [ ] `src/__tests__/NavigationMenu.test.tsx`: existing tests still pass (the default context is anonymous). Add:
    - the "Log in" link is visible on desktop
    - the mobile menu contains the auth links
  - [ ] if `useClickOutside` moved: `src/__tests__/hooks/useClickOutside.test.ts`
- [ ] **15.4** `npm --prefix frontend run test:run && npm --prefix frontend run build` → green. Ask for commit approval →
      `feat(frontend): add login, register pages and user menu`

---

## Phase 16 — E2E (Cucumber + Playwright)

### 16.1 Support code
- [ ] **16.1.1** `e2e/src/support/api-client.ts`: add a tiny cookie jar. axios in Node keeps no cookies.
  - [ ] after each response, parse `set-cookie` into a `Map<string, string>`; delete entries whose `Max-Age=0` / expired
  - [ ] send `Cookie: k=v; …` on every request
  - [ ] for POST/PUT/DELETE: if there's no `XSRF-TOKEN` in the jar yet, first do `GET /api/v1/phrasal-verbs?size=1` to obtain it,
        then send the `X-XSRF-TOKEN` header
  - [ ] public helpers: `getCookie(name)`, `clearCookies()`, `withoutCsrf()` (for the negative scenario) or a `post(path, data, { csrf: false })` option
- [ ] **16.1.2** `e2e/src/support/test-users.ts`:
  - `uniqueEmail()` → `` `e2e-${Date.now()}-${Math.random().toString(36).slice(2, 8)}@phrasal.test` ``
  - `TEST_PASSWORD = 'e2e-password-123'`
  - `ADMIN_EMAIL` / `ADMIN_PASSWORD` from `process.env`
- [ ] **16.1.3** `e2e/src/world.ts`: add `currentEmail: string | null`. Reset it in `hooks.ts` `Before`.
- [ ] **16.1.4** `e2e/src/hooks.ts`: an `AfterAll` cleanup via `createDbClient()`:
  `DELETE FROM spring_session WHERE principal_name LIKE 'e2e-%@phrasal.test'`, then
  `DELETE FROM users WHERE email LIKE 'e2e-%@phrasal.test'`. Wrap it in try/finally and close the client.
- [ ] **16.1.5** `e2e/.env.example`: add `ADMIN_EMAIL=admin@phrasal.test` and `ADMIN_PASSWORD=admin-dev-password` (the compose dev defaults).

### 16.2 API steps + features
- [ ] **16.2.1** `e2e/src/steps/auth-api.steps.ts`:
  - `Given I am logged in as the admin`
  - `Given I am logged in as a new user`
  - `Given a registered user exists`
  - `When I register with a new email and password {string}`
  - `When I register again with the same email`
  - `When I log in with the current email and password {string}`
  - `When I request my profile`
  - `When I log out`
  - `When I fail to log in {int} times`
  - `Then the profile email should be the current email`
  - `Then the response role should be {string}`
  - Reuse the existing `the response status should be {int}` step.
- [ ] **16.2.2** `e2e/features/auth-api/auth.feature` (`@api`):
  - [ ] register a new account → 201, role USER
  - [ ] duplicate email → 409
  - [ ] password "short" → 400
  - [ ] log in → 200; my profile → 200 with my email
  - [ ] wrong password → 401
  - [ ] anonymous profile → 401
  - [ ] log out → 204; profile afterwards → 401
  - [ ] 6 failed logins for one email → the 6th returns 429
- [ ] **16.2.3** `e2e/features/phrasal-verbs-api/crud.feature`:
  - [ ] keep "Anonymous visitor cannot create a phrasal verb" → 401 (from Phase 3)
  - [ ] add "Regular user cannot create a phrasal verb": `Given I am logged in as a new user` … → 403
  - [ ] add "Admin creates a phrasal verb": `Given I am logged in as the admin` … → 201 + `id`
  - [ ] GET scenarios unchanged (anonymous)
- [ ] **16.2.4** `npm --prefix e2e run test:api` against the running stack → green.

### 16.3 Browser steps + feature
- [ ] **16.3.1** `e2e/src/steps/auth-ui.steps.ts`:
  - `When I open the {string} page`
  - `When I sign up through the form with a new email`
  - `When I log in through the form`
  - `When I log in through the form with password {string}`
  - `When I log out through the user menu`
  - `Then the user menu should show my email`
  - `Then I should see the {string} link in the navigation`
  - `Then I should see an auth error`
  Use the `data-testid`s from Phases 14–15, and `FRONTEND_URL` as in `frontend.steps.ts`.
- [ ] **16.3.2** `e2e/features/frontend/auth.feature` (`@frontend`):
  - [ ] sign up through the form → redirected home, the user menu shows my email
  - [ ] log out → the "Log in" link is back
  - [ ] a registered user logs in through the form → the user menu shows the email
  - [ ] wrong password → an auth error is visible, still anonymous
  - [ ] logged in, reload the page → still logged in (session cookie through nginx)
  - [ ] anonymous visitor still sees the quiz input (keeps AC #7 visible in the UI)
- [ ] **16.3.3** `make acceptanceTest` → all features green, including the old ones.
- [ ] **16.3.4** Ask for commit approval → `test(e2e): cover register, login, logout and admin-only writes`

---

## Phase 17 — Docs, diagram, backlog

- [ ] **17.1** `README.md`: new section "Accounts & security":
  - [ ] endpoint table (`register`, `login`, `logout`, `me`) with status codes
  - [ ] roles; who can write content
  - [ ] admin bootstrap (`PHRASAL_ADMIN_EMAIL`/`PASSWORD`, the takeover rule); how to promote a user by SQL if ever needed
  - [ ] session cookie flags and timeout (`SESSION_TIMEOUT`), CSRF header for API clients (curl example: get `XSRF-TOKEN`, then
        send `X-XSRF-TOKEN`)
  - [ ] rate limits and their env vars
  - [ ] the GitHub Secrets to create before the next deploy
  - [ ] "email confirmation: not yet" note
- [ ] **17.2** `backend/CLAUDE.md`: "Security" section:
  - `SecurityConfig` rules order
  - the principal is the `AuthenticatedUser` record (never an entity)
  - ProblemDetail entry point and denied handler
  - new packages `infrastructure/security`, `presentation/security`, `application/validation`
  - tests extend `AbstractIntegrationTest`; mutating MockMvc calls need `.with(user(...).roles("ADMIN")).with(csrf())`
- [ ] **17.3** `frontend/CLAUDE.md`:
  - [ ] fix the stack line: React **19** (package.json already has `^19.3.1`)
  - [ ] replace "no context or global store" with "one `AuthContext` (src/auth) is allowed; no other global state"
  - [ ] API client table: `post/put/del`, CSRF, `ApiError.problem`, `authApi.ts`
  - [ ] new pages (`LoginPage`, `RegisterPage`), `UserMenu`, `useClickOutside`
- [ ] **17.4** `e2e/CLAUDE.md`: new `features/auth-api/`, the auth steps, the cookie jar in `api-client.ts`, `test-users.ts`, cleanup
      hook, and the `ADMIN_EMAIL`/`ADMIN_PASSWORD` env vars.
- [ ] **17.5** `docs/diagrams/auth-flow.md` (blackbox policy, new flow): Mermaid diagrams for
  - [ ] a sequence diagram: register → login (changeSessionId, `SESSION` row in Postgres) → `/me` → logout
  - [ ] a sequence diagram: CSRF cookie-to-header on a POST
  - [ ] a flowchart: authorization rules (public GET / ADMIN writes / actuator)
  - [ ] a note listing what's deferred (verification, reset, TOTP, Google)
- [ ] **17.6** Plan file `.claude/docs/blackbox/plans/2026-10-26 18:10 Multi-user …md`: append a `## Mutations Log` table row
      "P2 split: email verification + Mailpit deferred; admin bootstrap via config instead of admin-email list". Add only;
      don't delete anything in that folder.
- [ ] **17.7** Backlog (MCP):
  - [ ] task-99: check off the AC that are done, add implementation notes and the final summary
  - [ ] create a follow-up task "Email verification for registered accounts". Move the deferred task-99 AC
        (#1 verification part, #3, #13, the Mailpit part of #18) there, and depend it on task-106 for prod SMTP.
  - [ ] after that split, task-99 can move to `Done`. **Ask the user before changing the status.**
  - [ ] task-103: note that login, register and the user menu are done here; the rest stays open
- [ ] **17.8** Append the blackbox `session-log.md` entry (format in `.claude/rules/blackbox-policy.md`, no secrets).

---

## Phase 18 — Final verification

- [ ] **18.1** `make clean build` → green: backend verify (JaCoCo 85 %/package, Checkstyle), frontend build + tests, docker rebuild, e2e.
- [ ] **18.2** Manual run with `make dockerAll`, at http://localhost:3000:
  - [ ] anonymous: home, quiz, verb list and grammar quiz all work; the nav shows "Log in / Sign up"
  - [ ] register a new account → logged in, the menu shows the email
  - [ ] DevTools → the `SESSION` cookie is `HttpOnly`, `SameSite=Lax`; `XSRF-TOKEN` is readable
  - [ ] `docker compose restart backend`, reload → still logged in
  - [ ] log out → anonymous; log in again → works
  - [ ] wrong password 6× → a readable "too many requests" message
  - [ ] `curl -i -X POST localhost:3000/api/v1/phrasal-verbs -H 'Content-Type: application/json' -d '{}'` → `401` problem+json
  - [ ] log in as the dev admin → `/me` role is ADMIN; the admin badge shows in the menu
- [ ] **18.3** Optional reviews before merging: `/code-review`, `/security-review`, the `api-contract-review` skill on the auth endpoints.
- [ ] **18.4** Before the first prod deploy (tagged release):
  - [ ] the task-98 backups decision has been made (see the warning at the top)
  - [ ] GitHub Secrets `PHRASAL_ADMIN_EMAIL` / `PHRASAL_ADMIN_PASSWORD` exist
  - [ ] the client-IP option from 10.7 is chosen and applied
  - [ ] after the deploy: `curl -i -X POST https://phrasalbox.com/api/v1/phrasal-verbs` → 401; the cookie has `Secure; HttpOnly; SameSite=Lax`
- [ ] **18.5** Open the PR `multi-user` → `main`, after the user approves.

---

## Coverage map (task-99 AC → where it's covered)

| AC | Covered by |
|---|---|
| #1 register + login (verification deferred) | 5.5.2, 6.5, 7.3, 16.2.2, 16.3.2 |
| #2 password length rule, 400 naming the rule | 5.1.3, 5.5.2, 16.2.2 |
| #3 no enumeration on register | **changed:** 409 by design (decision 2); login stays generic (6.5) |
| #4 cookie flags, session id change, logout invalidates | 6.5, 7.3, 8.4 |
| #5 `/me` 200 / 401 | 7.3, 16.2.2 |
| #6 sessions in Postgres survive restart | 8.4, 18.2 |
| #7 anonymous GETs unchanged | 3.4.2, 3.5.1, 16.3.2 |
| #8 401 / 403 / ADMIN on writes, ProblemDetail | 3.5, 9.5, 16.2.3 |
| #9 CSRF rejection | 3.5.4, 5.5.2, 7.3 |
| #10 CORS mapping removed | 3.3.3, 3.5.8 |
| #11 admin role | **changed:** config bootstrap (Phase 9) |
| #12 actuator health reachable | 3.5.7 |
| #13 Mailpit | deferred |
| #14 migrations V9+ | 2.2 |
| #15 frontend client POST/PUT/DELETE, CSRF, ProblemDetail | Phase 12 |
| #16 env wiring | Phase 11 |
| #17 unit + integration tests, JaCoCo | Phases 2–10 |
| #18 e2e admin CRUD + anonymous 401 | 3.6, 16.2.3 |
| #19 docs | Phase 17 |
| #20 `make clean build` | 18.1 |
