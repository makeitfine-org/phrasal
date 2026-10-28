# Multi-user: sign-up email verification with an expiring link — implementation TODOs

Source plan: `.claude/docs/blackbox/plans/2026-10-26 18:10 Multi-user accounts TOTP 2FA and reliable storage for phrasal.md`
(the verification, Mailpit, `EmailSender` and env parts of P2 that were deferred, plus the verify page from P7).
Backlog: **task-107** (all AC), the verify-email page part of **task-103** (AC #1, #6), the SMTP part of **task-106**.
Templates: `multiuser-todos.md` and `save-on-server-multiuser-todos.md` (same folder). Builds on task-99 (users,
sessions, CSRF, rate limiter, `AuthContext`) and task-102 (quiz progress, `AbstractIntegrationTest` helpers).

> Status: plan only. Nothing below is implemented yet.

---

## Scope

**In scope**
- Backend:
  - `users.email_verified_at`; existing accounts are backfilled as verified
  - a generic `user_tokens` table (type, SHA-256 hash, expiry, used-at), reusable by password reset (task-100)
  - register returns **`202` with an identical body** whether or not the email exists (no enumeration). The `409`
    from task-99 is removed.
  - a verification email with a link that expires after `EMAIL_VERIFICATION_TOKEN_TTL` (default **24 h**)
  - `POST /api/v1/auth/verify-email` and `POST /api/v1/auth/resend-verification`
  - login only after verification (`403 Email Not Verified`, shown only after a correct password)
  - an `EmailSender` port with an SMTP adapter (Brevo in prod, Mailpit locally) and a logging adapter (mail disabled)
  - rate limits for resend and per-email register
  - a scheduled clean-up of expired tokens and of never-verified accounts (recommended, Phase 7)
- Frontend:
  - register shows "check your inbox" instead of logging in
  - a `/verify-email` page that consumes the link
  - a "resend verification email" action on the register, login and verify pages
- Infra: Mailpit in docker-compose; mail + base-URL env wired into compose, k8s base, prod overlay and CI.
- Tests: backend unit + integration, frontend Vitest, e2e API + browser scenarios reading mail from Mailpit.
- Docs: README, CLAUDE.md files, a new `docs/diagrams/email-verification-flow.md`, an `auth-flow.md` update, backlog.

**Out of scope (deferred, still tracked by their backlog tasks)**

| Deferred item | Task |
|---|---|
| Password reset (it will reuse `user_tokens`, `EmailSender` and the mail templates from here) | task-100 |
| HIBP check, honeypot field, account deletion | task-100 |
| Changing the email address of an existing account (would need re-verification) | — (not planned) |
| HTML mail templates with a template engine (Thymeleaf etc.). Plain text + minimal inline HTML is enough. | — |
| Brevo HTTP API instead of SMTP; bounce/complaint webhooks | — (not planned) |
| Google sign-in (trusts Google's `email_verified`) | task-104 |

> **Already done by the user (2026-10-28):** domain `phrasalbox.com`, Brevo account, sender domain authenticated
> (SPF/DKIM/DMARC), sender `no-reply@phrasalbox.com`, SMTP key created and tested with `backlog/drafts/email.sh`
> (`smtp-relay.brevo.com:587`, STARTTLS). That covers task-106 AC #1–#3 for email. The SMTP login and key must still
> go into GitHub Secrets (Phase 8).

---

## Design decisions

1. **The emailed link points to the SPA, not to the API.**
   - Link: `${APP_BASE_URL}/verify-email?token=<raw token>`.
   - The page then sends `POST /api/v1/auth/verify-email {"token": "…"}`.
   - Why: mail security scanners (Outlook Safe Links, Gmail previews) prefetch `GET` links. A `GET` that consumed the
     token would burn it before the user clicks. Scanners don't run the SPA's JavaScript, so the `POST` only happens in a
     real browser.
   - `APP_BASE_URL` comes from configuration and is **never** built from the request `Host` header, which would let an
     attacker put their own host into our emails (host-header injection).
2. **Token.**
   - 32 bytes from `SecureRandom`, encoded base64url without padding (43 characters, 256 bits of entropy).
   - Only `SHA-256(raw)` as lowercase hex (64 chars) is stored, in `user_tokens.token_hash` with a unique index.
     A DB dump or log never contains a usable link.
   - Lookup is by hash (an index seek), so no constant-time comparison is needed.
   - TTL `phrasal.email-verification.token-ttl` = `${EMAIL_VERIFICATION_TOKEN_TTL:24h}`. Expiry is checked in Java
     against an injected `Clock`, so tests can move time.
   - Single use: `used_at` is set on success. Issuing a new token marks every older unused token of the same user and
     type as used, so **only the newest link works**.
3. **Table `user_tokens`** (generic, so task-100 adds `PASSWORD_RESET` without a migration):
   - `id`, `user_id` (FK `ON DELETE CASCADE`), `type VARCHAR(30)`, `token_hash CHAR(64)`, `expires_at`, `used_at`,
     `created_at`
   - no `CHECK` on `type`: the whitelist is the `TokenType` enum, the same reasoning as `QuizKey` in task-102
   - the entity holds `Long userId`, not a `@ManyToOne` (same style as `UserQuizProgress`)
4. **Register never reveals whether an email exists** (task-107 AC #2). It always returns `202` with the same body:
   `{"message":"If this address can be used, we have sent a link to it. Check your inbox."}`.
   - **New email:** create the user (unverified), issue a token, send the verification email.
   - **Existing, unverified:** replace the password hash with the new one ("the latest registration wins"), issue a new
     token (older ones die), send the verification email. This also fixes "I registered, lost the mail and forgot the
     password".
   - **Existing, verified:** change nothing. Send an "you already have an account" notice email with a link to `/login`.
     This tells the real owner what happened, which was the reason task-99 chose `409`.
   - **Timing:** every path runs `passwordEncoder.encode(...)` once, and mail is sent **after commit, asynchronously**, so
     response times don't differ by path.
5. **Pre-registration hijacking is closed** by decision 4 plus "only the newest link works":
   - An attacker who registers the victim's address first can't verify it (no inbox access).
   - When the victim registers, the victim's password replaces the attacker's and the attacker's link dies.
   - Residual risk: the attacker re-registers after the victim and before the victim clicks. The per-email register
     limit (3 per hour) narrows it; password reset (task-100) recovers the account.
   - Unverified accounts are deleted after 7 days (Phase 7), which frees squatted addresses.
6. **Verify does not log in.** `POST /verify-email` → `204`. The page shows "Email confirmed — log in".
   - `SessionAuthenticator` stays the only place that creates sessions (task-99 decision 4).
   - A link opened on a phone doesn't create a session on the phone.
   - **Idempotent:** a token that is already used **and** whose user is verified → `204` again. React 19 StrictMode runs
     the effect twice in dev, and users double-click links.
   - Unknown token, or used for an account that is still unverified → `400`, type `verification-link-invalid`.
   - Expired → `400`, type `verification-link-expired`. The token is a secret, so telling "expired" from "invalid" leaks
     nothing, and it lets the page say "request a new link".
7. **Login of an unverified account.**
   - `AppUserDetails.isEnabled()` = `emailVerifiedAt != null`.
   - Spring's `DaoAuthenticationProvider` runs the "enabled" check **before** the password check by default. Then anyone
     could learn that an address has an unverified account, without knowing the password.
   - So the enabled check moves **after** the password check: pre-authentication checks = no-op, post-authentication
     checks = `AccountStatusUserDetailsChecker` (verify the setters in Phase 0).
   - Correct password + unverified → `DisabledException` → `403`, title `Email Not Verified`, type `email-not-verified`.
     Wrong password → the usual `401 Invalid email or password`.
8. **Resend.** `POST /api/v1/auth/resend-verification {"email": "…"}` → always `202`, same body as register.
   - Only an existing **unverified** account gets a new token and email. Unknown or verified → nothing happens.
   - Rate limits are counted before the lookup, so a `429` doesn't reveal existence either.
9. **Rate limits** (existing in-memory `RateLimiter`, new rules in `RateLimitProperties`):

   | Rule | Default | Env |
   |---|---|---|
   | `register-per-ip` (exists) | 5 / 1 h | `RATE_LIMIT_REGISTER_PER_IP` |
   | `register-per-email` (new) | 3 / 1 h | `RATE_LIMIT_REGISTER_PER_EMAIL` |
   | `resend-per-ip` (new) | 10 / 1 h | `RATE_LIMIT_RESEND_PER_IP` |
   | `resend-per-email` (new) | 3 / 1 h | `RATE_LIMIT_RESEND_PER_EMAIL` |
   | `verify-per-ip` (new) | 30 / 5 m | `RATE_LIMIT_VERIFY_PER_IP` |

   The per-email limits also cap how many emails one address can receive, which protects the Brevo free tier
   (300 emails per day) and the recipient.
10. **Mail sending.**
    - Port `infrastructure/mail/EmailSender#send(EmailMessage)`; `EmailMessage(to, subject, text, html)` record.
    - `SmtpEmailSender` (`JavaMailSender`, multipart text + HTML) when `phrasal.mail.enabled=true`.
    - `LoggingEmailSender` when `false`: logs recipient id/subject and the link at `INFO`, for minikube and quick local
      runs. It is never active in prod (prod hard-codes `enabled: true`).
    - `AuthService` publishes `VerificationEmailRequested` / `AccountExistsNoticeRequested` events. A listener with
      `@TransactionalEventListener(phase = AFTER_COMMIT)` + `@Async` builds and sends the mail:
      - no mail for a rolled-back registration
      - SMTP latency and failures never reach the HTTP response
      - a send failure is logged (`WARN`, user id only, never the token or the link); the user can resend
    - Virtual threads are already on (`spring.threads.virtual.enabled`), so Boot's async executor uses them.
    - Content: plain Java text blocks in `VerificationEmailComposer`, no template engine. Subject
      `Confirm your Phrasal account`; the body says when the link expires and "ignore this mail if it wasn't you".
11. **SMTP configuration** (`spring.mail.*`):
    - `application.yml` defaults are Mailpit-friendly: `localhost:1025`, no auth, no STARTTLS, `phrasal.mail.enabled`
      `false`.
    - `application-prod.yml` hard-codes `smtp.auth=true`, `starttls.enable=true`, `starttls.required=true`, the same
      way it hard-codes the secure session cookie, so prod can't silently send in clear text.
    - Timeouts `connectiontimeout`/`timeout`/`writetimeout` = 5000 ms everywhere.
    - **`management.health.mail.enabled: false`.** Otherwise Boot's mail health indicator makes `/actuator/health`
      `DOWN` whenever Brevo is slow, and Docker/k8s would restart a healthy backend.
12. **Existing accounts are backfilled as verified** (`email_verified_at = created_at`). They signed up before
    verification existed, and locking them out has no benefit. The bootstrapped admin is always marked verified (the
    operator configured that address).
13. **Migrations:** `V13__add_users_email_verified_at.sql`, `V14__create_user_tokens.sql`. (The full plan's V11 was
    taken by task-102.) If another branch lands first, take the next free numbers.
14. **API break:** register changes from `201 UserResponse` / `409` to `202` + message. The backend commit uses `!`.
    Our frontend changes in the same release; there are no other clients.

---

## Conventions for every step

- Backend rules: `backend/CLAUDE.md`. Short version:
  - layers `domain → application → presentation`, with `infrastructure`/`config` cross-cutting
  - DTOs are records in `application/dto`; Lombok on entities/services; MapStruct mappers
  - Flyway `V{n}__*.sql`, never edit an applied migration
- Checkstyle runs in `mvn verify`:
  - line length ≤ 120; **no magic numbers** (named constants: token bytes, TTLs, timeouts); no star imports;
    no `TODO` comments
  - blank line after a class/enum opening brace
  - Javadoc on a record needs `@param`; public method Javadoc needs `@param`/`@return`
  - strict alphabetical import order
- JaCoCo needs **≥ 85 % line coverage per package**. The new `infrastructure.mail` package must reach it on its own.
- Every test class has positive **and** negative cases. Integration tests extend `AbstractIntegrationTest`, use a unique
  email per test, and keep the number of distinct Spring contexts low (one extra class per `@TestPropertySource` only).
- **Never log** a raw token, a verification link (except `LoggingEmailSender`), an email address at `INFO`, or a password.
  Log user ids.
- Look up library APIs with **Context7** before writing Spring Mail, Spring Security, `@Async`/events, Mailpit API,
  React Router or Playwright code.
- Run the narrowest command after each step, e.g. `cd backend && mvn -q test -Dtest=EmailVerificationServiceTest` or
  `cd frontend && npx vitest run src/__tests__/VerifyEmailPage.test.tsx`.
- **Each phase ends with `make clean build` green.** It also runs e2e, so a phase that changes an API contract must
  update e2e in the same phase.
- **Commits:** one per phase (or per step if large). Ask the user for approval before each commit. Format
  `type(scope): description`, ≤ 80 characters, no `Co-Authored-By` trailer.

---

## Phase 0 — Preparation (no code)

- [x] **0.1** Branch: create `email-verification` from `develop` (task-99 and task-102 are merged there). The working tree
      must be clean apart from blackbox files.
      → Done 2026-10-28: created from `develop` (= `be4af61`); only audit.md and a backlog draft were modified.
- [x] **0.2** Run `make clean build` once on the untouched branch. Note the baseline here: backend test count, Vitest
      files/tests, e2e scenarios/steps.
      → Baseline 2026-10-28: backend 248 tests, 0 failures, JaCoCo OK; Vitest 64 files / 1461 tests;
      e2e 63 scenarios / 456 steps; all green.
- [x] **0.3** Backlog (MCP `task_edit`):
  - [x] move **task-107** to `In Progress`
  - [x] task-107 note: "implementation plan: `email-verification-on-server-multiuser-todos.md`"
  - [x] task-106 note: "domain phrasalbox.com, Brevo sender domain (SPF/DKIM/DMARC) and SMTP key done 2026-10-28".
        **Ask the user** before checking AC #1–#3.
- [x] **0.4** Data check (expected: a handful of rows). Write the numbers here, they tell how many accounts V13 backfills:
  - [x] dev: `docker compose exec postgres psql -U postgres -d phrasaldb -c "SELECT role, count(*) FROM users GROUP BY role"`
        → ADMIN 1, USER 2 (V13 backfills 3 local accounts).
  - [ ] prod: the same query via `kubectl exec` (`--context hetzner`, `default/postgres-0`). **The user runs it**
        (the auto-mode classifier blocks production reads).
- [x] **0.5** Look up with Context7 and note the results here:
  - [x] Boot 4.1: the starter name (`spring-boot-starter-mail`) and its module/auto-configuration; `spring.mail.*`
        properties (host, port, username, password, `properties.mail.smtp.*`, `default-encoding`); the mail health
        indicator property (`management.health.mail.enabled`) and whether the health group used by Docker includes it.
        → Context7: `JavaMailSender` is auto-created when `spring.mail.host` is set and the starter is present; a mail
        `HealthIndicator` is auto-configured and toggled with `management.health.mail.enabled` (we set it `false`).
  - [x] Spring Framework 7: `JavaMailSender`, `MimeMessageHelper(mime, true, UTF_8)`, `setText(text, html)`,
        `InternetAddress` with a personal name (`Phrasal <no-reply@phrasalbox.com>`); `jakarta.mail` package names.
  - [x] Security 7.1: `AbstractUserDetailsAuthenticationProvider#setPreAuthenticationChecks` /
        `#setPostAuthenticationChecks`, `AccountStatusUserDetailsChecker`, and which exception a disabled user gets
        (`DisabledException`). Confirm the default order (pre-checks before the password check), which is why
        decision 7 is needed.
        → Verified with `javap` on spring-security-core 7.1.2: both setters exist on the abstract provider;
        pre-checks run before `additionalAuthenticationChecks` (the password check), so a disabled user is rejected
        before the password is checked; `AccountStatusUserDetailsChecker` throws `DisabledException` (also `Locked`,
        `AccountExpired`, `CredentialsExpired`).
  - [x] `@TransactionalEventListener(phase = AFTER_COMMIT)` + `@Async`: needs `@EnableAsync`; which executor Boot 4
        auto-configures with virtual threads (`applicationTaskExecutor`, `SimpleAsyncTaskExecutor`); exceptions in an
        `@Async void` method go to the `AsyncUncaughtExceptionHandler`.
        → Context7: with `spring.threads.virtual.enabled=true` and no `Executor` bean, Boot configures a
        `SimpleAsyncTaskExecutor` on virtual threads (`applicationTaskExecutor`); a `@Primary` executor or an
        `AsyncConfigurer` overrides it. Our config enables virtual threads, so `@EnableAsync` alone is enough.
  - [x] `@Scheduled(cron = …)` + `@EnableScheduling`; how to turn scheduling off in tests
        (`spring.task.scheduling` or a `phrasal.cleanup.enabled` flag).
        → Decision: gate the whole `SchedulingConfig` with `@ConditionalOnProperty("phrasal.cleanup.enabled")`
        (false in the test profile); the job logic is tested by calling the service method directly (Phase 7).
  - [x] Spring Boot tests: is `@Import(...)` on the abstract `AbstractIntegrationTest` inherited by subclasses and part
        of the context-cache key? (Phase 3 registers a recording mail sender that way.)
        → Spring's `ImportsContextCustomizer` finds `@Import` through the class hierarchy and is part of the merged
        context key, so all subclasses share one cached context. Phase 3 proves it (context count stays unchanged).
  - [x] Mailpit: the current image tag (`axllent/mailpit:v1.x`, pin it), SMTP port 1025, UI/API port 8025, the healthcheck
        command (`/mailpit readyz`), and the API calls the e2e client needs:
        `GET /api/v1/search?query=to:"<addr>"`, `GET /api/v1/message/{ID}` (fields `Text`, `HTML`, `Subject`, `To`),
        `DELETE /api/v1/search?query=…`. Note the exact JSON shapes.
        → Newest tag `v1.32.0` (use `axllent/mailpit:v1.32.0`). `GET /readyz` returns 200 when ready. Search response:
        `{total, unread, count, messages_count, messages_unread, start, tags, messages[]}`; a blank `query` is a 400.
        `GET /api/v1/message/{id}` (`id` may be `latest`) returns `{ID, MessageID, From, To[], Subject, Date, Tags,
        Text, HTML, Size, ...}`; `DELETE /api/v1/search?query=` returns `ok`.
  - [x] React Router 7: `useSearchParams`, `navigate(..., { replace: true })` to drop the token from the URL.
        → installed `react-router` 7.18.4 exports `useSearchParams`; navigate options include `replace?: boolean`.
  - [x] Playwright: `page.goto(link)`; reading the link text from the Mailpit API with `page.request` or the Node
        `ApiClient`.
        → installed `playwright` 1.64.1; `page.goto(url: string, …)` as expected. Mailpit is read with a plain
        `fetch` in `mailpit-client.ts`, independent of the browser.

---

## Phase 1 — Schema, domain, token generation

### 1.1 Migrations
- [x] **1.1.1** `backend/src/main/resources/db/migration/V13__add_users_email_verified_at.sql`:
  ```sql
  -- Email verification (task-107). Accounts created before this migration are treated as verified.
  ALTER TABLE users ADD COLUMN email_verified_at TIMESTAMP;
  UPDATE users SET email_verified_at = created_at WHERE email_verified_at IS NULL;
  ```
  - No index: the column is read through the user row, never searched on its own. Phase 7's clean-up query filters on
    `created_at` + `IS NULL`, and the table is small.
- [x] **1.1.2** `V14__create_user_tokens.sql`:
  ```sql
  CREATE TABLE user_tokens
  (
      id         BIGSERIAL PRIMARY KEY,
      user_id    BIGINT      NOT NULL REFERENCES users (id) ON DELETE CASCADE,
      type       VARCHAR(30) NOT NULL,
      token_hash CHAR(64)    NOT NULL,
      expires_at TIMESTAMP   NOT NULL,
      used_at    TIMESTAMP,
      created_at TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP
  );
  CREATE UNIQUE INDEX ux_user_tokens_token_hash ON user_tokens (token_hash);
  CREATE INDEX idx_user_tokens_user_type ON user_tokens (user_id, type);
  CREATE INDEX idx_user_tokens_expires_at ON user_tokens (expires_at);
  ```
  - `idx_user_tokens_user_type` serves "invalidate older tokens"; `idx_user_tokens_expires_at` serves the clean-up.
  - No `version` column: a token row is written once and updated once (`used_at`).
- [x] **1.1.3** Don't touch V1–V12. `git diff --stat` on them is empty.

### 1.2 Domain
- [x] **1.2.1** `domain/entity/User.java`:
  - [x] `@Column(name = "email_verified_at") private LocalDateTime emailVerifiedAt;`
  - [x] `public boolean isEmailVerified() { return emailVerifiedAt != null; }`
  - [x] `public void markEmailVerified(LocalDateTime at)`: sets it only when it is still `null` (idempotent)
  - [x] keep `@ToString(of = {"id", "email", "role"})`; the constructor stays (new users start unverified)
- [x] **1.2.2** `domain/entity/TokenType.java`: `enum TokenType { EMAIL_VERIFICATION }`. Javadoc: task-100 adds
      `PASSWORD_RESET`; the DB stores `name()` via `@Enumerated(EnumType.STRING)`.
- [x] **1.2.3** `domain/entity/UserToken.java`:
  - [x] table `user_tokens`; sequence `user_tokens_id_seq`, `allocationSize = 1`
  - [x] `Long userId` (`updatable = false`), `TokenType type`, `String tokenHash`, `LocalDateTime expiresAt`,
        `LocalDateTime usedAt`, `@CreatedDate LocalDateTime createdAt` + `@EntityListeners(AuditingEntityListener.class)`
  - [x] `boolean isExpired(LocalDateTime now)` (`!now.isBefore(expiresAt)`), `boolean isUsed()`,
        `void markUsed(LocalDateTime now)`
  - [x] `@ToString(of = {"id", "userId", "type", "expiresAt", "usedAt"})`. **Never include `tokenHash`.**
  - [x] `@EqualsAndHashCode(of = {"id"})`; constructor `UserToken(Long userId, TokenType type, String tokenHash, LocalDateTime expiresAt)`
- [x] **1.2.4** `domain/repository/UserTokenRepository.java` (`JpaRepository<UserToken, Long>`):
  - [x] `Optional<UserToken> findByTokenHashAndType(String tokenHash, TokenType type)`
  - [x] `@Modifying @Query("UPDATE UserToken t SET t.usedAt = :now WHERE t.userId = :userId AND t.type = :type AND t.usedAt IS NULL")`
        `int invalidateActive(Long userId, TokenType type, LocalDateTime now)`
  - [x] `@Modifying @Query("DELETE FROM UserToken t WHERE t.expiresAt < :cutoff")` `int deleteExpiredBefore(LocalDateTime cutoff)`
        (used by Phase 7)
- [x] **1.2.5** `domain/repository/UserRepository.java`: add
      `@Modifying @Query("DELETE FROM User u WHERE u.emailVerifiedAt IS NULL AND u.createdAt < :cutoff") int deleteUnverifiedCreatedBefore(LocalDateTime cutoff)`
      (Phase 7). A bulk JPQL delete skips entity callbacks; the FK cascade removes tokens and progress in the DB.

### 1.3 Clock and token generator
- [x] **1.3.1** `config/ClockConfig.java`: `@Bean Clock clock() { return Clock.systemUTC(); }`. Check first that no
      `Clock` bean exists (`grep -rn "Clock" backend/src/main`).
      → No `Clock` bean existed; `ClockConfig` added.
- [x] **1.3.2** `infrastructure/security/SecureTokenGenerator.java` (`@Component`):
  - [x] constant `TOKEN_BYTES = 32`; one `SecureRandom` field
  - [x] `IssuedToken generate()` → `record IssuedToken(String rawToken, String hash)` (nested or top-level, with Javadoc
        `@param`); raw = base64url without padding
  - [x] `static String hash(String rawToken)`: SHA-256 over UTF-8 bytes → `HexFormat.of().formatHex(...)`
  - [x] `IssuedToken.toString()` masks `rawToken`
- [x] **1.3.3** `config/EmailVerificationProperties.java`:
      `@ConfigurationProperties("phrasal.email-verification") record EmailVerificationProperties(Duration tokenTtl, Duration unverifiedAccountRetention)`
      with Javadoc `@param`s.
- [x] **1.3.4** `config/AppProperties.java`: `@ConfigurationProperties("phrasal.app") record AppProperties(URI baseUrl)`.
      Validate at startup (`@Validated` + `@NotNull`): the URL has a scheme and host and no trailing slash, so links are
      built as `baseUrl + "/verify-email?token=" + token`.
- [x] **1.3.5** `application.yml`:
  ```yaml
  phrasal:
    app:
      base-url: ${APP_BASE_URL:http://localhost:3000}
    email-verification:
      token-ttl: ${EMAIL_VERIFICATION_TOKEN_TTL:24h}
      unverified-account-retention: ${UNVERIFIED_ACCOUNT_RETENTION:7d}
  ```

### 1.4 Tests
- [x] **1.4.1** `domain/entity/UserEntityTest`: new user is unverified; `markEmailVerified` sets the time once, a second
      call keeps the first time.
- [x] **1.4.2** `domain/entity/UserTokenEntityTest`:
  - [x] constructor sets the fields; `toString` doesn't contain the hash
  - [x] `isExpired`: one second before → `false`; exactly at `expiresAt` → `true`; after → `true`
  - [x] `markUsed` → `isUsed()`; equals/hashCode use `id`
- [x] **1.4.3** `infrastructure/security/SecureTokenGeneratorTest`:
  - [x] raw token is 43 chars and matches `^[A-Za-z0-9_-]{43}$`
  - [x] 1 000 tokens are all distinct
  - [x] `hash` is 64 lowercase hex chars, deterministic, and equals a known SHA-256 vector (`"abc"` →
        `ba7816bf…f20015ad`)
  - [x] `hash(generate().rawToken()) == generate().hash()` for the same token; `IssuedToken.toString()` hides the raw token
- [x] **1.4.4** `integration/UserTokenRepositoryIntegrationTest` (extends `AbstractIntegrationTest`, `@Transactional` or
      `TransactionTemplate` for the `@Modifying` queries):
  - [x] save + `findByTokenHashAndType` round trip; wrong type → empty
  - [x] `invalidateActive` marks only the unused tokens of that user and type; returns the count; other users untouched
  - [x] `deleteExpiredBefore` removes only rows older than the cutoff
  - [x] cascade: deleting the user removes its tokens (check with `JdbcTemplate`)
  - [x] negative: a duplicate `token_hash` → `DataIntegrityViolationException`
  - [x] negative: a non-existent `user_id` → FK violation
- [x] **1.4.5** `integration/UserRepositoryIntegrationTest`: V13 backfill — a user inserted through `JdbcTemplate` without
      `email_verified_at` stays `NULL` (the backfill ran once, at migration time); `deleteUnverifiedCreatedBefore`
      deletes only old unverified rows and keeps verified and recent ones.
- [x] **1.4.6** `cd backend && mvn clean verify` → green (Flyway applies V13/V14, `ddl-auto: validate` passes).
      `make clean build` → green (nothing uses the new schema yet). Ask for commit approval →
      `feat(backend): add email verification schema and token generator`

---

## Phase ordering — why every phase stays green

The breaking switch (register `202`, login only after verification) is isolated in **Phase 6**. Before it, everything is
additive:
- Phases 2–3: the backend sends verification emails and accepts verify/resend, but unverified accounts can still log in
  and register still answers `201`.
- Phases 4–5: e2e and the frontend start verifying through Mailpit, which works with both backend behaviours.
- Phase 6: the backend enforces verification and hides existing emails. Only a few tests and one frontend branch change.

So `make clean build` passes after every phase, and each phase is one reviewable commit.

---

## Phase 2 — Mail infrastructure + Mailpit (no behaviour change)

### 2.1 Dependency and configuration
- [x] **2.1.1** `backend/pom.xml`: `spring-boot-starter-mail` (version from the Boot BOM; name confirmed in 0.5).
- [x] **2.1.2** `application.yml`:
  ```yaml
  spring:
    mail:
      host: ${MAIL_HOST:localhost}
      port: ${MAIL_PORT:1025}
      username: ${MAIL_USERNAME:}
      password: ${MAIL_PASSWORD:}
      default-encoding: UTF-8
      properties:
        mail.smtp.auth: ${MAIL_SMTP_AUTH:false}
        mail.smtp.starttls.enable: ${MAIL_SMTP_STARTTLS:false}
        mail.smtp.connectiontimeout: 5000
        mail.smtp.timeout: 5000
        mail.smtp.writetimeout: 5000

  phrasal:
    mail:
      enabled: ${MAIL_ENABLED:false}   # not PHRASAL_MAIL_ENABLED, see the Phase 8 note
      from: ${PHRASAL_MAIL_FROM:Phrasal <no-reply@phrasalbox.com>}

  management:
    health:
      mail:
        enabled: false   # decision 11: a slow SMTP relay must not mark the backend DOWN
  ```
- [x] **2.1.3** `application-prod.yml` (decision 11, hard-coded):
  ```yaml
  spring:
    mail:
      properties:
        mail.smtp.auth: true
        mail.smtp.starttls.enable: true
        mail.smtp.starttls.required: true
  phrasal:
    mail:
      enabled: true
  ```
- [x] **2.1.4** `application-test.yml`: `phrasal.mail.enabled: false` (explicit). Tests never open an SMTP connection.
- [x] **2.1.5** `config/MailProperties.java`: `@ConfigurationProperties("phrasal.mail") record MailProperties(boolean enabled, String from)`. Implemented as `PhrasalMailProperties`.
      Name it `PhrasalMailProperties` if it clashes with Boot's `MailProperties` in imports.

### 2.2 Port and adapters (`infrastructure/mail`, new package)
- [x] **2.2.1** `EmailMessage.java`: `record EmailMessage(String to, String subject, String text, String html)`.
      `toString()` shows only the subject (bodies contain links).
- [x] **2.2.2** `EmailSender.java`: `interface EmailSender { void send(EmailMessage message); }` with Javadoc
      ("implementations may throw `MailException`; callers log and continue").
- [x] **2.2.3** `SmtpEmailSender.java` (`@Component @ConditionalOnProperty(name = "phrasal.mail.enabled", havingValue = "true")`):
  - [x] builds a `MimeMessage` with `MimeMessageHelper(message, true, UTF_8)`: from = `PhrasalMailProperties.from()`,
        to, subject, `setText(text, html)`
  - [x] wraps `MessagingException` into `MailPreparationException`
  - [x] `log.debug("Sent email subject={}", subject)`; never the recipient at INFO, never the body
- [x] **2.2.4** `LoggingEmailSender.java` (`@ConditionalOnProperty(..., havingValue = "false", matchIfMissing = true)`):
      logs `"Mail disabled; would send '{subject}'. Text:\n{text}"` at `INFO`. The text contains the link, which is the
      point (minikube, quick local runs). Class Javadoc: never active in prod (decision 10).
- [x] **2.2.5** `config/AsyncConfig.java`: `@Configuration @EnableAsync`. Keep Boot's auto-configured executor (virtual
      threads). Register an `AsyncUncaughtExceptionHandler` that logs `WARN` with the method name only, if 0.5 shows
      the default handler logs arguments.

### 2.3 Mailpit in docker-compose
- [x] **2.3.1** `docker-compose.yml`, new service (tag pinned from 0.5):
  ```yaml
  mailpit:
    image: axllent/mailpit:v1.<x>.<y>
    ports:
      - "${MAILPIT_SMTP_PORT:-1025}:1025"
      - "${MAILPIT_UI_PORT:-8025}:8025"
    environment:
      MP_MAX_MESSAGES: 500
    healthcheck:
      test: ["CMD", "/mailpit", "readyz"]
      interval: 10s
      timeout: 5s
      retries: 5
    networks:
      - app-network
  ```
- [x] **2.3.2** `backend.environment` (dev values) and `depends_on: mailpit: condition: service_healthy`:
  ```yaml
  MAIL_ENABLED: "true"
  MAIL_HOST: mailpit
  MAIL_PORT: "1025"
  APP_BASE_URL: ${APP_BASE_URL:-http://localhost:3000}
  ```
- [x] **2.3.3** `make dockerAll` → http://localhost:8025 opens the Mailpit UI; `docker compose ps` shows mailpit healthy. (verified: mailpit reported healthy by `docker compose up`; UI not opened by hand)

### 2.4 Tests
- [x] **2.4.1** `infrastructure/mail/SmtpEmailSenderTest` (Mockito `JavaMailSender`, a real `MimeMessage` from
      `new MimeMessage((Session) null)`):
  - [x] from/to/subject set; the message is multipart with both text and HTML parts; UTF-8 subject (`"Zażółć"`) survives
  - [x] `JavaMailSender.send` throwing `MailSendException` → propagates (the caller decides)
- [x] **2.4.2** `infrastructure/mail/LoggingEmailSenderTest`: logs the subject and text (capture with a Logback
      `ListAppender`); never throws.
- [x] **2.4.3** `infrastructure/mail/EmailMessageTest`: `toString` contains the subject and not the bodies.
- [x] **2.4.4** `integration/MailSenderSelectionIntegrationTest`: in the default test context the `EmailSender` bean is a
      `LoggingEmailSender`, and `/actuator/health` → `200 UP` (no mail indicator). Put these asserts into an existing
      integration class instead if that avoids a new context.
- [x] **2.4.5** `cd backend && mvn clean verify` → green; `infrastructure.mail` ≥ 85 %.
- [x] **2.4.6** `make clean build` → green (compose now starts mailpit). Ask for commit approval →
      `feat(backend): add email sender with SMTP and logging adapters, Mailpit`

---

## Phase 3 — Verification service, verify/resend endpoints (additive)

After this phase: register still answers `201` and login still accepts unverified accounts, but every registration
sends a verification email and the link works.

### 3.1 Configuration
- [x] **3.1.1** `config/RateLimitProperties.java`: add `Rule resendPerIp, Rule resendPerEmail, Rule verifyPerIp`
      (Javadoc `@param`s). `registerPerEmail` comes in Phase 6.
- [x] **3.1.2** `application.yml` under `phrasal.rate-limit` (decision 9):
  ```yaml
  resend-per-ip:    { limit: "${RATE_LIMIT_RESEND_PER_IP:10}",    window: 1h }
  resend-per-email: { limit: "${RATE_LIMIT_RESEND_PER_EMAIL:3}",  window: 1h }
  verify-per-ip:    { limit: "${RATE_LIMIT_VERIFY_PER_IP:30}",    window: 5m }
  ```
- [x] **3.1.3** `application-test.yml`: the three new rules at `100000`, like the existing ones.

### 3.2 Composer
- [x] **3.2.1** `application/service/VerificationEmailComposer.java` (`@Component`), using `AppProperties` and
      `EmailVerificationProperties`:
  - [x] `EmailMessage verification(String to, String rawToken)`:
    - link = `baseUrl + "/verify-email?token=" + rawToken` (the token is base64url, so no URL-encoding is needed;
      assert that in a test)
    - subject `Confirm your Phrasal account`
    - text and HTML: greeting, the link, "This link expires in 24 hours" (from the TTL, formatted as hours),
      "If you didn't sign up, ignore this email."
    - HTML: one `<a href>` and the same link as plain text; HTML-escape every dynamic value
  - [x] `EmailMessage accountExists(String to)` (used in Phase 6): subject `You already have a Phrasal account`, a link to
        `baseUrl + "/login"`, "If this wasn't you, you can ignore this email."
- [x] **3.2.2** `VerificationEmailComposerTest`:
  - [x] the link has the configured base URL, `/verify-email?token=`, and the raw token
  - [x] `24h` TTL → "24 hours"; `30m` → "30 minutes" (or whatever the formatter supports; test both units)
  - [x] the HTML escapes a base URL containing `&` (defensive)
  - [x] `accountExists` contains `/login` and **no** token

### 3.3 Events and the async listener
- [x] **3.3.1** `application/event/VerificationEmailRequested.java`: `record VerificationEmailRequested(Long userId, String email, String rawToken)`
      with a masking `toString()` (no token, no email).
- [x] **3.3.2** `application/event/AccountExistsNoticeRequested.java`: `record AccountExistsNoticeRequested(Long userId, String email)`
      (used in Phase 6), masking `toString()`.
- [x] **3.3.3** `application/service/VerificationEmailListener.java` (`@Component`):
  - [x] `@Async @TransactionalEventListener(phase = TransactionPhase.AFTER_COMMIT)` for each event type
  - [x] composes the message and calls `EmailSender.send`
  - [x] catches `MailException` (and `RuntimeException`): `log.warn("Verification email failed userId={}: {}", id, ex.getClass().getSimpleName())`.
        Never rethrows, never logs the token or the email.
  - [x] `log.info("Verification email sent userId={}", id)` on success
- [x] **3.3.4** `VerificationEmailListenerTest` (plain unit test, call the methods directly):
  - [x] composer + sender called with the right recipient
  - [x] sender throws → no exception escapes; a `WARN` is logged without the token (Logback `ListAppender`)

### 3.4 Service
- [x] **3.4.1** `application/service/EmailVerificationService.java` (`@Service @Transactional @RequiredArgsConstructor @Slf4j`),
      dependencies: `UserRepository`, `UserTokenRepository`, `SecureTokenGenerator`, `EmailVerificationProperties`,
      `Clock`, `ApplicationEventPublisher`.
  - [x] `void issueFor(User user)`:
    1. `now = LocalDateTime.now(clock)`
    2. `userTokenRepository.invalidateActive(user.getId(), EMAIL_VERIFICATION, now)` (only the newest link works)
    3. `IssuedToken t = generator.generate()`; save `new UserToken(userId, EMAIL_VERIFICATION, t.hash(), now.plus(ttl))`
    4. `publisher.publishEvent(new VerificationEmailRequested(userId, email, t.rawToken()))`
  - [x] `void verify(String rawToken)`:
    1. `token = repo.findByTokenHashAndType(SecureTokenGenerator.hash(rawToken), EMAIL_VERIFICATION)`;
       missing → `VerificationLinkInvalidException`
    2. load the user (missing → invalid, defensive)
    3. `token.isUsed()`: user verified → return (idempotent, decision 6); otherwise → invalid
    4. `token.isExpired(now)` → `VerificationLinkExpiredException`
    5. `token.markUsed(now)`; `user.markEmailVerified(now)`; `invalidateActive(...)` for any other open token
    6. `log.info("Email verified userId={}", id)`
  - [x] `void resend(String rawEmail)`:
    1. `email = EmailNormalizer.normalize(rawEmail)`
    2. `findByEmail(email).filter(u -> !u.isEmailVerified()).ifPresent(this::issueFor)`
    3. nothing else: unknown and verified addresses return silently (decision 8)
- [x] **3.4.2** `AuthService.register` (still `201`, still `409` on duplicate in this phase): after `saveAndFlush`, call
      `emailVerificationService.issueFor(user)`.
- [x] **3.4.3** `EmailVerificationServiceTest` (Mockito, fixed `Clock`):
  - [x] `issueFor`: invalidates older tokens **before** saving; saved hash = `hash(raw)`; `expiresAt = now + ttl`;
        event published with the raw token
  - [x] `verify` happy path: token used, user verified at `now`
  - [x] unknown token → `VerificationLinkInvalidException`
  - [x] expired (now = expiresAt) → `VerificationLinkExpiredException`; the user stays unverified, the token stays unused
  - [x] used token + verified user → no exception, nothing changes
  - [x] used token + unverified user (an invalidated older link) → invalid
  - [x] `resend`: unverified → `issueFor` called; verified → nothing; unknown → nothing; email normalized before lookup
- [x] **3.4.4** `AuthServiceTest`: register calls `issueFor` with the saved user; a duplicate never calls it.

### 3.5 Exceptions and handler
- [x] **3.5.1** `infrastructure/exception/VerificationLinkInvalidException` (message
      `This verification link is invalid or has already been used`) and `VerificationLinkExpiredException`
      (message `This verification link has expired`). Both `RuntimeException`.
- [x] **3.5.2** `GlobalExceptionHandler`, before the catch-all:
  - [x] invalid → `400`, title `Verification Link Invalid`, type `verification-link-invalid`
  - [x] expired → `400`, title `Verification Link Expired`, type `verification-link-expired`
- [x] **3.5.3** `GlobalExceptionHandlerTest`: both mappings (status, title, type, no internal detail).

### 3.6 DTOs and controller
- [x] **3.6.1** `application/dto/VerifyEmailRequest.java`: `record VerifyEmailRequest(@NotBlank @Size(max = 100) String token)`;
      `toString()` masks the token.
- [x] **3.6.2** `application/dto/ResendVerificationRequest.java`: `record ResendVerificationRequest(@NotBlank String email)`
      (no `@Email`, same reason as `LoginRequest`: normalization first).
- [x] **3.6.3** `application/dto/AcceptedResponse.java`: `record AcceptedResponse(String message)` with a constant
      `AcceptedResponse.CHECK_INBOX` holding the decision-4 text. Resend uses it now; register in Phase 6.
- [x] **3.6.4** `AuthController`:
  - [x] `@PostMapping("/verify-email")`: `verify-per-ip` limit → `service.verify(token)` → `204`
  - [x] `@PostMapping("/resend-verification")`: `resend-per-ip` + `resend-per-email` (normalized) limits →
        `service.resend(email)` → `202 AcceptedResponse.CHECK_INBOX`
- [x] **3.6.5** `SecurityConfig`: add `/api/v1/auth/verify-email` and `/api/v1/auth/resend-verification` to the
      `POST … permitAll` matcher. CSRF stays on (the SPA sends the header; e2e primes it).

### 3.7 Test support: a recording mail sender
- [x] **3.7.1** `src/test/java/net/phrasal/integration/support/RecordingEmailSender.java`: an `EmailSender` keeping
      messages in a `ConcurrentHashMap<String, BlockingDeque<EmailMessage>>` by recipient.
  - [x] `EmailMessage awaitLatest(String to)`: polls up to 5 s (the listener is async), else fails with a clear message
  - [x] `String awaitVerificationToken(String to)`: extracts the token with
        `Pattern.compile("/verify-email\\?token=([A-Za-z0-9_-]{43})")`
  - [x] `void assertNothingSentTo(String to, Duration wait)` for the negative cases
- [x] **3.7.2** `@Import(RecordingEmailSenderConfig.class)` on `AbstractIntegrationTest`, where the config declares the Done as `@Import(RecordingEmailSenderConfig.class)`; inherited by all integration classes.
      recorder as a `@Primary EmailSender` bean. All integration classes then share **one** context (0.5 confirms the
      inheritance; otherwise put the bean in a `@TestConfiguration` picked up by component scan of a test-only package).
- [x] **3.7.3** `AbstractIntegrationTest`: add `protected void verifyEmail(String email)`: read the token from the
      recorder, `POST /verify-email` with CSRF → `204`. Phase 6 calls it from `registerAndLogin`.

### 3.8 `integration/EmailVerificationIntegrationTest`
- [x] **3.8.1** register → exactly one email to that address; subject `Confirm your Phrasal account`; the link starts with
      the configured `phrasal.app.base-url`.
- [x] **3.8.2** `POST /verify-email` with the token → `204`; the DB row has `email_verified_at` set; the `user_tokens` row
      has `used_at` set.
- [x] **3.8.3** the same token again → `204` (idempotent).
- [x] **3.8.4** a random 43-char token → `400 Verification Link Invalid`; blank/missing token → `400 Validation Error`;
      a 101-char token → `400`.
- [x] **3.8.5** expired: move the row's `expires_at` into the past with `JdbcTemplate` → `400 Verification Link Expired`,
      and the user is still unverified.
- [x] **3.8.6** resend for an unverified user → `202` with the `CHECK_INBOX` body; a second email arrives; the **first**
      token is now `400 Invalid`, the second works.
- [x] **3.8.7** resend for an unknown email → `202` with a byte-identical body; nothing is sent
      (`assertNothingSentTo`, 1 s).
- [x] **3.8.8** resend for a verified user → `202` identical; nothing is sent.
- [x] **3.8.9** resend/verify **without** CSRF → `403` csrf.
- [x] **3.8.10** the DB never contains the raw token: `SELECT count(*) FROM user_tokens WHERE token_hash = ?` with the raw
      token → `0`; with `hash(raw)` → `1`.
- [x] **3.8.11** `RateLimitIntegrationTest` (it already lowers limits via `@TestPropertySource`): add
      `resend-per-email.limit=2` → the 3rd resend for one email → `429` + `Retry-After`, for an **unknown** email too
      (no enumeration through 429).
- [x] **3.8.12** Run the `api-contract-review` skill on the two new endpoints (versioned path, 202/204/400/403/429 Result: no contract problems; added `@Size(max = 254)` to the resend email (it is a rate-limiter key).
      problem+json, no body echo). Fix or note findings.
- [x] **3.8.13** `cd backend && mvn clean verify` → green, JaCoCo ≥ 85 % in every touched package.
- [x] **3.8.14** `make clean build` → green. The Mailpit UI now shows a verification email for each e2e registration. (green: backend 316, Vitest 1461, e2e 63/456; commit pending approval)
      Ask for commit approval → `feat(backend): send verification emails and add verify/resend endpoints`

---

## Phase 4 — E2E: read mail from Mailpit, verify over the API

### 4.1 Support code
- [x] **4.1.1** `e2e/src/support/mailpit-client.ts` (axios, base URL `MAILPIT_URL`, default `http://localhost:8025`),
      API shapes from 0.5:
  - [x] `latestMessageTo(email, { timeoutMs = 10_000 })`: polls `GET /api/v1/search?query=to:"<email>"` every 250 ms
        until a message exists, then `GET /api/v1/message/{ID}`; returns `{ subject, text, html }`
  - [x] `verificationLink(email)`: `latestMessageTo` + regex `/https?:\/\/[^\s"<]+\/verify-email\?token=[A-Za-z0-9_-]{43}/`;
        throws with the subject list when none matches
  - [x] `verificationToken(email)`: the `token` query parameter of that link
  - [x] `countMessagesTo(email)`: for the "nothing sent" checks
  - [x] `deleteMessagesTo(pattern)`: `DELETE /api/v1/search?query=to:"<pattern>"` for clean-up
- [x] **4.1.2** `e2e/.env.example`: `MAILPIT_URL=http://localhost:8025`.
- [x] **4.1.3** `e2e/src/hooks.ts` `AfterAll`: also delete Mailpit messages to `@phrasal.test` addresses (inside the
      existing try/finally; a Mailpit error must not hide a DB clean-up error). `user_tokens` rows go with the users
      (FK cascade), so no new SQL.

### 4.2 Steps
- [x] **4.2.1** `e2e/src/steps/email-verification-api.steps.ts`:
  - `When I open the verification link from my email` → `POST /api/v1/auth/verify-email` with the token from Mailpit
  - `When I verify with the token {string}` (negative cases)
  - `When I request a new verification email`
  - `When I request a new verification email for an unknown address`
  - `Then I should receive a verification email`
  - `Then I should have received {int} verification emails`
  - `Then the previous verification link should no longer work` (keeps the first token in the world)
  - `Then no email should have been sent to that address` (waits 2 s, then counts)
  - Reuse `the response status should be {int}`.
- [x] **4.2.2** `e2e/src/world.ts`: `verificationTokens: string[]`, reset in `Before`.
- [x] **4.2.3** `e2e/src/steps/auth-api.steps.ts`, make the shared steps already verify (works before and after
      Phase 6):
  - [x] `Given I am logged in as a new user`: register → `verificationToken` → verify (`204`) → login (`200`)
  - [x] `Given a registered user exists`: register → verify → clear cookies
  - [x] new `Given an unverified user exists`: register only, clear cookies

### 4.3 Feature
- [x] **4.3.1** `e2e/features/auth-api/email-verification.feature` (`@api`):
  - [x] register → a verification email arrives
  - [x] open the link → `204`; open it again → `204`
  - [x] an invented token → `400`
  - [x] resend → `202`, two emails received, the previous link no longer works, the new one works
  - [x] resend for an unknown address → `202`, and no email is sent
  - [x] resend for a verified user → `202`, and no new email arrives
- [x] **4.3.2** `npm --prefix e2e run test:api` against the running stack → green, the old features included.
- [x] **4.3.3** `.github/workflows/ci_cd.yml`, e2e job "Run e2e tests" env: `MAILPIT_URL: http://localhost:8025`.
      The CI stack comes from `docker compose up -d --wait`, so mailpit starts with it; check `--wait` also waits for
      its healthcheck.
- [x] **4.3.4** `make clean build` → green. Ask for commit approval → `test(e2e): verify accounts through Mailpit`

---

## Phase 5 — Frontend: check-inbox, verify page, resend

### 5.1 API
- [x] **5.1.1** `src/api/authApi.ts`:
  - [x] `register(email, password): Promise<void>` (ignore the body; works for today's `201` and Phase 6's `202`)
  - [x] `verifyEmail(token: string): Promise<void>` → `POST /auth/verify-email`
  - [x] `resendVerification(email: string): Promise<void>` → `POST /auth/resend-verification`
- [x] **5.1.2** `src/api/problemTypes.ts` (or in `client.ts`): `isProblemType(error: unknown, type: string): boolean`,
      true when `error instanceof ApiError` and `error.problem?.type` ends with `/${type}`. Constants
      `EMAIL_NOT_VERIFIED`, `VERIFICATION_LINK_EXPIRED`, `VERIFICATION_LINK_INVALID`.
- [x] **5.1.3** `src/__tests__/api/authApi.test.ts`: path/method/body of the two new calls; `register` resolves for `201`
      and `202`. `src/__tests__/api/problemTypes.test.ts`: match, no match, non-`ApiError`, missing problem.

### 5.2 Auth context
- [x] **5.2.1** `src/auth/AuthContext.tsx`: `register(email, password)` calls only `authApi.register`. **No login**
      (decision 6 / task-107: login only after verification). Update the interface Javadoc/comment.
- [x] **5.2.2** `src/__tests__/auth/AuthContext.test.tsx`: replace "register calls register then login" with "register
      calls only register; status stays anonymous"; `stashAllAnonymousProgress` is not called by register.

### 5.3 Shared resend component
- [x] **5.3.1** `src/components/ResendVerification.tsx`, props `{ initialEmail?: string; compact?: boolean }`:
  - [x] an email field (prefilled, hidden when `initialEmail` is given and `compact`), button "Resend verification email"
        (`data-testid="resend-verification"`)
  - [x] pending → disabled, "Sending…"
  - [x] success → `role="status"` text "If an account needs verification, we've sent a new link." (`resend-done`)
  - [x] `429` → the server detail (it contains the wait time); other errors → generic message
  - [x] after a success, the button stays disabled for 30 s (`RESEND_COOLDOWN_MS` constant) to stop double sends
- [x] **5.3.2** `src/__tests__/ResendVerification.test.tsx` (mocked `authApi`, fake timers): calls the API with the
      typed/prefilled email; success message; 429 message; cooldown re-enables after 30 s.

### 5.4 Register page
- [x] **5.4.1** `src/pages/RegisterPage.tsx`: on success, replace the form with a "Check your inbox" panel
      (`data-testid="register-check-email"`):
  - [x] "We sent a link to **{email}**. It expires in 24 hours." (the hours from a `VERIFICATION_LINK_TTL_HOURS`
        constant, documented as "keep in sync with `EMAIL_VERIFICATION_TOKEN_TTL`")
  - [x] "Didn't get it? Check spam, or" + `<ResendVerification initialEmail={email} compact />`
  - [x] a link "Back to log in"
  - [x] no `navigate('/')`
  - [x] keep the `409` branch for now; Phase 6 removes it
- [x] **5.4.2** `src/__tests__/RegisterPage.test.tsx`: success shows the panel with the email, no navigation, no login;
      the resend button is there; the existing validation cases stay.

### 5.5 Verify page
- [x] **5.5.1** `src/pages/VerifyEmailPage.tsx` (route `/verify-email`):
  - [x] read `token` with `useSearchParams`; immediately `navigate('/verify-email', { replace: true })` with the token
        kept in a ref, so it leaves the address bar and history
  - [x] no token → "This link is incomplete" + `<ResendVerification />`
  - [x] one POST per token: a ref guard (StrictMode runs the effect twice; the server is idempotent anyway)
  - [x] states (`data-testid="verify-status"` with `data-state`):
    - `verifying`: "Confirming your email…"
    - `success`: "Your email is confirmed." + a button "Log in" → `/login` (`verify-login-link`)
    - `expired`: "This link has expired." + `<ResendVerification />`
    - `invalid`: "This link is invalid or was already used." + `<ResendVerification />` + "Log in" link (a used link
      for an already verified account answers `204`, so "invalid" really means a dead link)
    - `error` (network/5xx/429): "Something went wrong. Try the link again." + retry button
  - [x] an authenticated visitor still sees the result (no redirect), then "Go to the quiz"
  - [x] Tailwind + `dark:` variants like `LoginPage`; works at 375 px
- [x] **5.5.2** `src/main.tsx`: `<Route path="/verify-email" element={<VerifyEmailPage />} />` before `*`.
- [x] **5.5.3** `src/__tests__/VerifyEmailPage.test.tsx` (mocked `authApi`, `MemoryRouter` with
      `initialEntries={['/verify-email?token=abc']}`):
  - [x] calls `verifyEmail('abc')` exactly once, even under `<React.StrictMode>`
  - [x] success / expired / invalid / error states render the right text and actions
  - [x] no token → no API call, the resend form shows
  - [x] the token is removed from the location after mount
- [x] **5.5.4** `src/__tests__/routeReload.test.tsx`: `/verify-email` renders inside the shell.

### 5.6 Login page
- [x] **5.6.1** `src/pages/LoginPage.tsx`: when `isProblemType(e, EMAIL_NOT_VERIFIED)`, show "Please confirm your email
      first. Check your inbox." (`auth-error`) plus `<ResendVerification initialEmail={email} compact />`. Inert until
      Phase 6, since the backend doesn't answer `403` yet.
- [x] **5.6.2** `src/__tests__/LoginPage.test.tsx`: a `403` `email-not-verified` shows the message and the resend button
      with the typed email; a `401` still shows only the alert.

### 5.7 nginx
- [x] **5.7.1** `frontend/nginx.conf`: `add_header Referrer-Policy "strict-origin-when-cross-origin" always;` in the
      `location /` block. Browsers already default to it; making it explicit means a token in the URL never goes to
      Google Fonts in a `Referer`. The SPA fallback (`try_files … /index.html`) already serves `/verify-email`.
      Check `frontend/vite.config.ts` dev server too (history fallback is on by default).

### 5.8 E2E: browser
- [x] **5.8.1** `e2e/src/steps/auth-ui.steps.ts`, keep the meaning of the 25 existing usages ("I end up signed up and
      logged in"):
  - [x] `When I sign up through the form with a new email`: fill + submit → wait for `register-check-email` →
        `page.goto(verificationLink)` → wait for `verify-status[data-state="success"]` → log in through the form →
        wait for `user-menu`. The same tab keeps localStorage, so the progress-sync scenarios still see their anonymous
        progress.
  - [x] new `When I submit the sign-up form with a new email` (stops at the check-email panel)
  - [x] new `Then I should see the check-your-inbox message`
  - [x] new `When I open the verification link from my email in the browser`
  - [x] new `Then I should see that my email is confirmed`
  - [x] new `When I open the verification page with the token {string}`
  - [x] new `Then I should see the verification state {string}`
  - [x] new `When I ask for a new verification email`, `Then I should see the resend confirmation`
- [x] **5.8.2** `e2e/features/frontend/email-verification.feature` (`@frontend`):
  - [x] sign up → check-inbox message → open the link → confirmed → log in → the user menu shows my email
  - [x] an invented token → state `invalid` + resend form
  - [x] the page without a token → resend form
  - [x] check-inbox panel → resend → resend confirmation, and a second email arrives in Mailpit
- [x] **5.8.3** `e2e/features/frontend/auth.feature` "Signing up logs the user in" → rename to "Signing up and
      confirming the email logs the user in" (the step does the full flow now).
- [x] **5.8.4** `npx tsc --noEmit` in `frontend/` → no new errors (the 3 known ones stay).
- [x] **5.8.5** `npm --prefix frontend run test:run && npm --prefix frontend run build` → green. `make clean build` →
      green. Ask for commit approval → `feat(frontend): add email verification page and resend action`

---

## Phase 6 — Enforce verification, hide existing emails (breaking)

### 6.1 Login only after verification (decision 7)
- [x] **6.1.1** `infrastructure/security/AppUserDetails.java`:
  - [x] store `boolean emailVerified` from `user.isEmailVerified()`
  - [x] `isEnabled()` returns it; replace the "email confirmation is deferred" comment
- [x] **6.1.2** `config/SecurityConfig.authenticationManager`:
  - [x] `provider.setPreAuthenticationChecks(user -> { })`: no account-status check before the password check
  - [x] `provider.setPostAuthenticationChecks(new AccountStatusUserDetailsChecker())`: disabled → `DisabledException`
        only after a correct password
  - [x] a short comment saying why (no enumeration of unverified accounts)
- [x] **6.1.3** `GlobalExceptionHandler`: `DisabledException` → `403`, title `Email Not Verified`, type
      `email-not-verified`, detail `Please confirm your email address before logging in`. Put it before the generic
      `AuthenticationException` handler.
- [x] **6.1.4** Tests:
  - [x] `AppUserDetailsTest`: verified → enabled; unverified → disabled
  - [x] `GlobalExceptionHandlerTest`: the `403` mapping
  - [x] `SecurityConfigAuthenticationTest` (unit, real `DaoAuthenticationProvider` from the config method, mocked
        `JpaUserDetailsService`): unverified + **wrong** password → `BadCredentialsException`; unverified + correct
        password → `DisabledException`; verified + correct → authenticated

### 6.2 Register: always 202 (decisions 4, 5)
- [x] **6.2.1** `AuthService.register(RegisterRequest)` returns `void`:
  1. `email = normalize(...)`; `hash = passwordEncoder.encode(password)` **on every path** (timing)
  2. `findByEmail(email)`:
     - empty → `saveAndFlush(new User(email, hash, USER))` → `issueFor(user)`. A `DataIntegrityViolationException`
       (two registrations racing) → reload by email and continue with the "existing" branch.
     - present, unverified → `user.setPasswordHash(hash)` → `issueFor(user)` (older links die)
     - present, verified → publish `AccountExistsNoticeRequested(userId, email)`; nothing else changes
  3. log `Registration accepted userId={} outcome={NEW|PENDING|EXISTING}` at `DEBUG`; at `INFO` only for `NEW`
     (`Registered user id={}`), so logs don't become an enumeration oracle for log readers
- [x] **6.2.2** `VerificationEmailListener`: handle `AccountExistsNoticeRequested` with `composer.accountExists(...)`.
- [x] **6.2.3** `AuthController.register`:
  - [x] new limit `register-per-email` (normalized email) next to `register-per-ip`, counted before the service call
  - [x] returns `ResponseEntity.accepted().body(AcceptedResponse.CHECK_INBOX)`
- [x] **6.2.4** `RateLimitProperties` + `application.yml`: `register-per-email: { limit: "${RATE_LIMIT_REGISTER_PER_EMAIL:3}", window: 1h }`;
      `application-test.yml`: `100000`.
- [x] **6.2.5** Delete `EmailAlreadyRegisteredException`, its handler and its `GlobalExceptionHandlerTest` case.
      `grep -rn "EmailAlreadyRegistered\|email-already-registered" backend frontend e2e` → nothing (frontend/e2e are
      cleaned in 6.5/6.6).
- [x] **6.2.6** `AuthServiceTest` (rewrite the register cases):
  - [x] new → user saved unverified as `USER`, `issueFor` called
  - [x] existing unverified → password hash replaced, `issueFor` called, no new user
  - [x] existing verified → password unchanged, no token, `AccountExistsNoticeRequested` published
  - [x] the encoder is called exactly once on each of the three paths
  - [x] race (`saveAndFlush` throws) → falls back to the existing-account branch, no exception

### 6.3 Admin bootstrap
- [x] **6.3.1** `AdminAccountInitializer`:
  - [x] create → `markEmailVerified(now)`
  - [x] repair → when unverified: `markEmailVerified(now)` and `userTokenRepository.invalidateActive(...)`; log
        `verified=true` alongside `promoted` / `passwordReset`; an already verified admin is unchanged (idempotent,
        `version` unchanged)
  - [x] update the class Javadoc: the takeover rule stays. Someone could still register the admin address before the
        first boot; they can't verify it, and the initializer takes it over.
- [x] **6.3.2** `AdminAccountInitializerTest`: create sets verified; repair verifies an unverified account; an already
      verified admin causes no save.

### 6.4 Integration tests
- [x] **6.4.1** `AbstractIntegrationTest.registerAndLogin`: register (`202`) → `verifyEmail(email)` (3.7.3) → login.
      Every existing caller keeps working unchanged (QuizProgress, Session, RateLimit, …).
- [x] **6.4.2** `AuthRegisterIntegrationTest`:
  - [x] valid → `202`, body equals `AcceptedResponse.CHECK_INBOX`; the DB row is unverified, hash starts `{bcrypt}`
  - [x] **no enumeration (task-107 AC #2):** register a new email, register it again (unverified), verify it, register
        it a third time (verified). All three responses have the same status, headers (except `Date`/cookies) and
        byte-identical bodies.
  - [x] existing unverified + a new password → the old password no longer logs in (after verification), the new one does
  - [x] existing verified → the notice email arrives (`You already have a Phrasal account`), the password is unchanged,
        and no verification token was created
  - [x] the old "duplicate → 409" test is removed; the password-rule, blank-field and CSRF tests stay
- [x] **6.4.3** `AuthLoginIntegrationTest`:
  - [x] unverified + correct password → `403`, `$.title == "Email Not Verified"`, no `SESSION` cookie
  - [x] unverified + wrong password → `401`, the same body as an unknown email (no enumeration)
  - [x] after verification → `200`
- [x] **6.4.4** `RateLimitIntegrationTest`: register cases expect `202` before the limit; new
      `register-per-email.limit=2` → the 3rd register for one email → `429`.
- [x] **6.4.5** `AdminBootstrapIntegrationTest`: "registering the admin email → 409" becomes "→ 202, the admin password
      still works, and a notice email goes to the admin address".
- [x] **6.4.6** `grep -rn "isCreated()" backend/src/test | grep -i register` → nothing left.
- [x] **6.4.7** `cd backend && mvn clean verify` → green.

### 6.5 Frontend
- [x] **6.5.1** `RegisterPage.tsx`: remove the `409` branch, `duplicate` state and `HTTP_CONFLICT`. Field errors (`400`) and
      `429` stay.
- [x] **6.5.2** `RegisterPage.test.tsx`: remove the 409 case; add "a 429 shows the server detail".
- [x] **6.5.3** `npm --prefix frontend run test:run` → green.

### 6.6 E2E
- [x] **6.6.1** `features/auth-api/auth.feature`:
  - [x] "Register a new account" → status `202` (drop the role check: the response has no user)
  - [x] "Registering the same email twice is rejected" → "Registering an existing email looks the same as a new one":
        the second response is `202` with the same body as the first (new step
        `Then the response should equal the first registration response`)
  - [x] new "An unverified user cannot log in": `Given an unverified user exists` → log in → `403`
  - [x] new "Login works after verification": unverified user → open the link → log in → `200`
- [x] **6.6.2** `auth-api.steps.ts`: the register helper no longer asserts `201`; `Given …` steps assert `202`.
- [x] **6.6.3** `features/frontend/email-verification.feature`: new "An unverified user sees a resend option on the login
      page": unverified user → log in through the form → the not-verified message and `resend-verification` are visible.
- [x] **6.6.4** `make clean build` → green. Ask for commit approval →
      `feat(backend)!: require email verification and hide existing emails`

---

## Phase 7 — Clean-up job (recommended)

Why: expired tokens pile up, and an address squatted by an attacker who can't verify it should become free again.

- [ ] **7.1** `config/SchedulingConfig.java`: `@Configuration @EnableScheduling
      @ConditionalOnProperty(name = "phrasal.cleanup.enabled", havingValue = "true", matchIfMissing = true)`.
      `application-test.yml`: `phrasal.cleanup.enabled: false`, so no job fires during tests.
- [ ] **7.2** `application/service/AccountCleanupService.java` (`@Service @RequiredArgsConstructor @Slf4j`):
  - [ ] `@Transactional int purgeExpiredTokens()`: `deleteExpiredBefore(now - 7 days)` (`TOKEN_RETENTION` constant: keep
        recently expired rows, so "expired" vs "invalid" stays accurate for a week)
  - [ ] `@Transactional int purgeUnverifiedAccounts()`: `deleteUnverifiedCreatedBefore(now - unverifiedAccountRetention)`
  - [ ] `@Scheduled(cron = "${phrasal.cleanup.cron:0 30 3 * * *}")` `void runNightly()`: both, then
        `log.info("Clean-up removed tokens={} unverifiedAccounts={}", …)`. 03:30, after the 03:00 backup (task-98).
  - [ ] two backend replicas (dev overlay) running it at once is harmless: both deletes are idempotent
- [ ] **7.3** `AccountCleanupServiceTest` (Mockito, fixed `Clock`): the cutoffs passed to the repositories; the counts are
      logged.
- [ ] **7.4** `integration/AccountCleanupIntegrationTest` (calls the service directly; scheduling is off):
  - [ ] an unverified user created 8 days ago (backdate `created_at` with `JdbcTemplate`) → deleted, with its tokens
  - [ ] an unverified user created 1 day ago → kept; a verified user created 30 days ago → kept
  - [ ] a token expired 8 days ago → deleted; one expired 1 day ago → kept
- [ ] **7.5** `cd backend && mvn clean verify` → green. `make clean build` → green. Ask for commit approval →
      `feat(backend): purge expired tokens and stale unverified accounts`

---

## Phase 8 — Config wiring: k8s, prod, CI (delivery checklist)

> **Env var naming:** Spring binds an environment variable like `PHRASAL_MAIL_ENABLED` straight to
> `phrasal.mail.enabled`, and environment variables beat `application-prod.yml`. That would let a stray env var switch
> prod mail off. So the switch is read through a placeholder with a non-binding name, `MAIL_ENABLED`
> (`enabled: ${MAIL_ENABLED:false}` in `application.yml`), and prod still hard-codes `true`. Check 2.1.2 and 2.3.2 use
> that name.

- [ ] **8.1** `k8s/base/backend-configmap.yaml` (minikube/dev defaults; mail disabled → links in the backend log):
  ```yaml
  mail.enabled: "false"
  mail.host: mailpit-not-deployed
  mail.port: "1025"
  mail.from: "Phrasal <no-reply@phrasalbox.com>"
  app.base-url: http://localhost:3000   # skaffold port-forward (frontend/skaffold.yaml)
  ```
- [ ] **8.2** `k8s/base/backend-secret.yaml`: `mail.username: ""`, `mail.password: ""`, and the DEV-ONLY comment lists the
      new GitHub Secrets.
- [ ] **8.3** `k8s/base/backend-deployment.yaml` env:
  - [ ] from the configmap: `MAIL_ENABLED`, `MAIL_HOST`, `MAIL_PORT`, `PHRASAL_MAIL_FROM`, `APP_BASE_URL`
  - [ ] from the secret: `MAIL_USERNAME`, `MAIL_PASSWORD`
- [ ] **8.4** `k8s/overlays/prod/patches/backend-configmap.yaml`:
  ```yaml
  mail.enabled: "true"
  mail.host: smtp-relay.brevo.com
  mail.port: "587"
  mail.from: "Phrasal <no-reply@phrasalbox.com>"
  app.base-url: https://phrasalbox.com
  ```
- [ ] **8.5** `k8s/overlays/prod/patches/secret.yaml.example`: `mail.username: CHANGE_ME`, `mail.password: CHANGE_ME`.
- [ ] **8.6** `.github/workflows/ci_cd.yml` "Generate prod secret patch":
  - [ ] `env`: `MAIL_USERNAME: ${{ secrets.MAIL_USERNAME }}`, `MAIL_PASSWORD: ${{ secrets.MAIL_PASSWORD }}`
  - [ ] two more `printf` lines, values in double quotes (`"  mail.password: \"${MAIL_PASSWORD}\""`), so a `:` or `#`
        can't break the YAML
  - [ ] the e2e job already got `MAILPIT_URL` in 4.3.3; no other job needs mail
- [ ] **8.7** **User action** (write it in the README): create GitHub Secrets `MAIL_USERNAME` (the Brevo SMTP login, shown
      under SMTP & API → SMTP) and `MAIL_PASSWORD` (the SMTP key) **before** the next tagged deploy. Keep a copy in the
      password manager. Never commit them, never paste them into `audit.md` or `session-log.md`.
- [ ] **8.8** `kubectl kustomize k8s/overlays/dev` and `kubectl kustomize k8s/overlays/prod` (with the example patch
      copied to `secret.yaml` locally, then deleted) both render, and the backend env lists the seven new variables.
- [ ] **8.9** `docker-compose.yml`: check once more that the compose stack has `MAIL_ENABLED: "true"`, `MAIL_HOST: mailpit`,
      `APP_BASE_URL`, and the high per-IP limits for e2e (`RATE_LIMIT_RESEND_PER_IP: "1000"`,
      `RATE_LIMIT_VERIFY_PER_IP: "1000"`). Keep the per-email limits at their defaults so e2e can test the `429`.
- [ ] **8.10** `skaffold.yaml`: no change (mail is disabled in the dev overlay). Write "no change" in the commit body.
- [ ] **8.11** `make clean build` → green. Ask for commit approval → `build: wire mail and base URL into k8s and CI`

---

## Phase 9 — Docs, diagrams, backlog

- [ ] **9.1** `README.md` → "Accounts & security":
  - [ ] the endpoint table gains `verify-email` (204/400/403/429) and `resend-verification` (202/403/429); register is
        now `202`, and the `409` row goes
  - [ ] "Email verification" subsection: the link expires after `EMAIL_VERIFICATION_TOKEN_TTL` (24 h), only the newest
        link works, login needs a confirmed email, unverified accounts are deleted after 7 days, existing accounts were
        marked verified
  - [ ] local mail: Mailpit UI at http://localhost:8025 (`make dockerAll`); with mail disabled the link is in the
        backend log
  - [ ] prod mail: Brevo SMTP (`smtp-relay.brevo.com:587`, STARTTLS), sender `no-reply@phrasalbox.com`, free tier
        300 emails/day; the SPF/DKIM/DMARC records live at the DNS host
  - [ ] the env table: `MAIL_ENABLED`, `MAIL_HOST`, `MAIL_PORT`, `MAIL_USERNAME`, `MAIL_PASSWORD`, `PHRASAL_MAIL_FROM`,
        `APP_BASE_URL`, `EMAIL_VERIFICATION_TOKEN_TTL`, `UNVERIFIED_ACCOUNT_RETENTION`, the new `RATE_LIMIT_*`
  - [ ] the GitHub Secrets to create (8.7); remove the "email confirmation: not yet" note
  - [ ] breaking change: register returns `202` and never `409`
- [ ] **9.2** `backend/CLAUDE.md`:
  - [ ] the `infrastructure/mail` package (`EmailSender` port, SMTP/logging adapters, `@ConditionalOnProperty`)
  - [ ] after-commit async events for mail; never send mail inside the request transaction
  - [ ] `user_tokens` + `TokenType` (task-100 adds `PASSWORD_RESET`), hashing via `SecureTokenGenerator`
  - [ ] the pre/post authentication checks in `SecurityConfig` and why
  - [ ] tests: `RecordingEmailSender`, `verifyEmail(...)` in `AbstractIntegrationTest`, `registerAndLogin` verifies
  - [ ] the injected `Clock`; `management.health.mail.enabled: false`
- [ ] **9.3** `frontend/CLAUDE.md`: `VerifyEmailPage`, `ResendVerification`, `problemTypes.ts`, the new `authApi`
      functions; register no longer logs in; the `VERIFICATION_LINK_TTL_HOURS` sync note.
- [ ] **9.4** `e2e/CLAUDE.md`: `mailpit-client.ts`, `MAILPIT_URL`, the new feature files and steps, the fact that
      "sign up through the form" now verifies through Mailpit, the Mailpit clean-up in `AfterAll`.
- [ ] **9.5** `docs/diagrams/email-verification-flow.md` (blackbox policy, new flow), in Mermaid:
  - [ ] sequence: register → 202 → after-commit event → SMTP → inbox → `/verify-email?token` (SPA) → `POST verify-email`
        → 204 → login
  - [ ] flowchart: register branches (new / existing unverified / existing verified)
  - [ ] flowchart: verify outcomes (unknown / used+verified / used+unverified / expired / ok)
  - [ ] sequence: login of an unverified account (password check first, then `403`)
- [ ] **9.6** `docs/diagrams/auth-flow.md`: the authorization-rules flowchart gains the two new `permitAll` endpoints;
      the register step shows `202`; the "Deferred" note strikes email verification and links the new diagram.
- [ ] **9.7** Plan file `.claude/docs/blackbox/plans/2026-10-26 18:10 Multi-user …md`: append a `## Mutations Log` row:
      "P2 remainder done as task-107: verify link points to the SPA; register 202 with existing-account notice; tokens
      in generic user_tokens; migrations V13/V14 instead of V9/V11 parts." Add only; don't delete anything there.
- [ ] **9.8** Backlog (MCP):
  - [ ] task-107: check off AC #1–#8 that are done; implementation notes; final summary
  - [ ] task-103: note that the verify-email page and readable errors for it are done (part of AC #1, #6)
  - [ ] task-100: note that `user_tokens`, `SecureTokenGenerator`, `EmailSender` and the composer are ready for reset
  - [ ] task-106: note the SMTP secrets step (8.7); **ask the user** before checking AC #1–#3/#6
  - [ ] **ask the user** before moving task-107 to `Done`
- [ ] **9.9** Append the blackbox `session-log.md` entry (format in `.claude/rules/blackbox-policy.md`, **no secrets**,
      SMTP values as `*****`). Mention the plan mutation and the new/updated diagrams.
- [ ] **9.10** Ask for commit approval → `docs: document email verification, Mailpit and Brevo setup`

---

## Phase 10 — Production rollout (Brevo)

- [ ] **10.1** Before the tagged deploy:
  - [ ] GitHub Secrets `MAIL_USERNAME` / `MAIL_PASSWORD` exist (8.7)
  - [ ] Brevo shows `phrasalbox.com` as authenticated and `no-reply@phrasalbox.com` as a verified sender
  - [ ] the 0.4 prod row count is known (that many accounts get backfilled as verified)
  - [ ] the task-98 backup decision is made (the migrations add data to `users`)
- [ ] **10.2** After the deploy:
  - [ ] `kubectl logs deploy/backend` shows Flyway V13/V14 applied and no mail errors at startup
  - [ ] `/actuator/health` → `UP` (no mail indicator)
  - [ ] an existing account still logs in (backfill worked)
- [ ] **10.3** Smoke test with a real mailbox (Gmail or Outlook):
  - [ ] register at https://phrasalbox.com → "Check your inbox"
  - [ ] the mail arrives within a minute, **in the inbox, not spam**
  - [ ] "Show original": SPF `PASS`, DKIM `PASS` (d=phrasalbox.com), DMARC `PASS`
  - [ ] the link opens `https://phrasalbox.com/verify-email`, says confirmed, and the token is gone from the address bar
  - [ ] logging in before clicking → "Please confirm your email" + resend; after clicking → logged in
  - [ ] register the same address again → the "you already have an account" mail arrives
  - [ ] optional: send a verification to a mail-tester.com address → score ≥ 9/10
- [ ] **10.4** Brevo dashboard → Transactional → Logs shows the messages as delivered. The backend log has no tokens or
      links (`kubectl logs deploy/backend | grep -c verify-email` → `0`).
- [ ] **10.5** Later (not part of this task): after a few weeks of clean DMARC reports, tighten DMARC from `p=none` to
      `p=quarantine`.

---

## Phase 11 — Final verification

- [ ] **11.1** `make clean build` → green: backend verify (JaCoCo 85 %/package, Checkstyle), frontend build + tests,
      docker rebuild, e2e.
- [ ] **11.2** Manual run with `make dockerAll`, at http://localhost:3000 and the Mailpit UI at http://localhost:8025:
  - [ ] sign up → "Check your inbox" → the mail in Mailpit → the link → confirmed → log in → the user menu shows the email
  - [ ] log in before confirming → the not-verified message + resend → a second mail; the first link now says invalid
  - [ ] set a token's `expires_at` into the past via psql → the page says expired → resend → the new link works
  - [ ] sign up again with a confirmed address → the notice mail; the old password still works
  - [ ] dark mode and 375 px width look right on the register, verify and login pages
  - [ ] `docker compose stop mailpit` → sign up still answers `202` quickly; the backend logs one `WARN` without the
        token; `docker compose start mailpit` → resend works
  - [ ] `SELECT type, expires_at, used_at FROM user_tokens ORDER BY id DESC LIMIT 5` shows hashes only (no raw tokens)
- [ ] **11.3** Optional reviews before merging:
  - [ ] `/code-review`
  - [ ] `/security-review`: focus on enumeration (register, resend, login, timing), token entropy/hashing/expiry, host
        header vs `APP_BASE_URL`, logging of tokens
  - [ ] the `java-code-review` skill on the new backend classes
- [ ] **11.4** Open the PR `email-verification` → `main` (or into `develop`, as the user prefers), after the user approves.

---

## Coverage map — task-107 AC

| AC | Covered by |
|---|---|
| #1 register → verification email; login only after verifying | 3.4, 3.8.1–3.8.2, 6.1, 6.4.3, 4.3.1, 5.8.2, 6.6.1 |
| #2 identical responses for existing and non-existing emails (register, resend) | decision 4/8, 3.8.7–3.8.8, 3.8.11, 6.4.2, 6.6.1 |
| #3 Mailpit in docker-compose; e2e reads mail from it | 2.3, 4.1.1 |
| #4 e2e: register, verify via Mailpit, log in, authenticated write | 4.2.3 (`I am logged in as a new user` now verifies) + the existing `crud.feature` admin/user scenarios and `quiz-progress.feature` PUT |
| #5 mail + base URL in compose, k8s base, prod secret generation, CI | 2.3.2, 8.1–8.6, 4.3.3 |
| #6 unit + integration tests for verify, resend, no enumeration; JaCoCo | Phases 1–3, 6, 7 |
| #7 README, backend/CLAUDE.md, e2e/CLAUDE.md document the flow and Mailpit | 9.1, 9.2, 9.4 |
| #8 `make clean build` | every phase, 11.1 |

## Coverage map — related AC in other tasks

| Task / AC | Covered by |
|---|---|
| task-103 #1 (Verify email page reachable, mobile + dark) | 5.5, 11.2 |
| task-103 #6 (readable errors incl. 429 on these forms) | 5.3, 5.5, 5.6, 6.5 |
| task-103 #13 (Vitest for each new page/hook) — verify/resend part | 5.1.3, 5.2.2, 5.3.2, 5.4.2, 5.5.3, 5.6.2 |
| task-103 #14 (auth.feature: register, verify via Mailpit, login, logout) | 5.8.1–5.8.3 |
| task-100 (reuse for password reset) | decision 3, 9.8 |
| task-106 #2–#3, #6 (Brevo, DNS records, secrets) | done by the user; 8.7, 10.1, 10.3 |
