# Multi-user: reset a forgotten password with an emailed link — implementation TODOs

Source plan: `.claude/docs/blackbox/plans/2026-10-26 18:10 Multi-user accounts TOTP 2FA and reliable storage for phrasal.md`
(the password-reset part of P3, plus the Forgot/Reset pages from P7).
Backlog: the password-reset part of **task-100** (AC #1, #2, #3, #10, and the forgot-password parts of #5, #9, #11), and
the Forgot/Reset pages part of **task-103** (AC #1, #6, #13).
Templates: `multiuser-todos.md` and `email-verification-on-server-multiuser-todos.md` (same folder). This builds on:
- task-99: users, sessions in Postgres, CSRF, `RateLimiter`, `AuthContext`, Login/Register pages
- task-107: `user_tokens`, `TokenType`, `SecureTokenGenerator`, `EmailSender` + Mailpit, after-commit async mail
  events, `AcceptedResponse.CHECK_INBOX`, `RecordingEmailSender`, `mailpit-client.ts`, `VerifyEmailPage` pattern
- the sign-up password rules: `PasswordPolicy` (length, blocklist, repeated character, no email), `passwordPolicy.ts`

> Status: plan only. Nothing below is implemented yet.

---

## Scope

**In scope**
- Backend:
  - `POST /api/v1/auth/forgot-password`: always `202` with the same body, whether or not the email exists
  - `POST /api/v1/auth/reset-password`: a single-use link that expires after `PASSWORD_RESET_TOKEN_TTL` (default **1 h**),
    sets a new password and logs the user out of **every** session
  - tokens in the existing `user_tokens` table as `TokenType.PASSWORD_RESET`, so **no Flyway migration** is needed
  - a reset email, plus a "your password was changed" notice after a successful reset
  - rate limits for forgot (per IP and per email) and reset (per IP)
- Frontend:
  - a "Forgot password?" link on the login page
  - a `/forgot-password` page (email form → "check your inbox")
  - a `/reset-password` page that takes the link, asks for the new password twice, and then offers "Log in"
- Tests: backend unit + integration, frontend Vitest, e2e API + browser scenarios that read the mail from Mailpit.
- Docs: README, CLAUDE.md files, a new `docs/diagrams/password-reset-flow.md`, an `auth-flow.md` update, backlog.

**Out of scope (deferred, still tracked by their backlog tasks)**

| Deferred item | Task |
|---|---|
| Change password while logged in (needs the current password, account page) | task-103 (account screens) |
| HIBP breached-password check on register and reset | task-100 |
| Honeypot field on register | task-100 |
| Account deletion | task-100 |
| Rate limit on the 2FA step; a reset must never turn 2FA off | task-101 |
| Google-only accounts (no password yet): a reset would give them one. Revisit there. | task-104 |
| Real client IP behind Traefik (task-100 AC #8) | already done in task-99 (`multiuser-todos.md` 10.7 a) |
| Checking the token before the form is shown (an extra "check token" endpoint) | — (not planned, see decision 5) |

---

## Design decisions

1. **Reuse what task-107 built.** Nothing new at the infrastructure level:
   - `user_tokens` + a new enum constant `TokenType.PASSWORD_RESET`. `type` is `VARCHAR(30)` with no `CHECK`, so no
     migration is needed.
   - `SecureTokenGenerator`: 32 random bytes, base64url, only the SHA-256 hex is stored.
   - `EmailSender`, after-commit `@Async` mail events, the `Clock` bean, `RateLimiter`, `AcceptedResponse.CHECK_INBOX`.
2. **The emailed link points to the SPA:** `${APP_BASE_URL}/reset-password?token=<raw token>`.
   - The page shows a form. The token is sent only when the user submits the new password
     (`POST /api/v1/auth/reset-password`). Mail scanners that prefetch `GET` links can't use or burn the token.
   - `APP_BASE_URL` comes from configuration, never from the request `Host` header (host-header injection).
   - The page moves the token out of the address bar and history right away, as `VerifyEmailPage` does. nginx already
     sends `Referrer-Policy: strict-origin-when-cross-origin`.
3. **Token rules.**
   - TTL `phrasal.password-reset.token-ttl` = `${PASSWORD_RESET_TOKEN_TTL:1h}`. That is shorter than the 24 h verification
     link, because a reset link is a full account-takeover key. Expiry is checked in Java against the injected `Clock`.
   - Single use: `used_at` is set on success.
   - Only the newest link works: issuing a reset token invalidates the user's older open `PASSWORD_RESET` tokens.
     Verification tokens are not touched.
   - **Not idempotent, unlike verify.** A used reset link → `400 reset-link-invalid`. A replay must never set a password
     (task-100 AC #1: "the link works once only").
4. **Forgot-password never reveals whether an email exists** (task-100 AC #2).
   - It always returns `202` with `AcceptedResponse.CHECK_INBOX`, the same body as register and resend.
   - Existing account (verified **or** unverified) → new token + reset email. Unknown address → nothing happens, and no
     "no account here" mail is sent (that would let anyone spam any address).
   - Rate limits are counted **before** the lookup, so a `429` doesn't reveal existence either.
   - Residual timing: the known path does one more `UPDATE` + `INSERT`; the mail is sent after commit and async, so the
     difference is a few ms. The per-email and per-IP limits cap how much probing is possible. Accepted.
5. **Reset endpoint:** `POST /api/v1/auth/reset-password {"token": "…", "password": "…"}` → `204`.
   Checks, in order:
   1. DTO validation: `@NotBlank`, `@Size(max = 100)` on the token; `@ValidPassword` on the password (length, bytes,
      repeated character, blocklist) → `400 Validation Error` with `errors.password`
   2. token lookup by hash **and** type `PASSWORD_RESET`: unknown, used or replaced → `400 reset-link-invalid`;
      expired → `400 reset-link-expired`
   3. the "must not contain your email" rule, which needs the account email and so runs only on the server
      → `400 Validation Error` with `errors.password` (the same shape as step 1, so the page shows it under the field)

   Any failure leaves the token unused (the transaction rolls back), so the user can fix the password and submit again
   with the same link. Expired and invalid are told apart because the token is a secret, and the page can say
   "request a new link". The form is not pre-checked: the 1 h link is normally used right away.
6. **What a successful reset does (one transaction):**
   1. mark the token used, and invalidate every other open `PASSWORD_RESET` token of the user
   2. store `passwordEncoder.encode(newPassword)` (`{bcrypt}…`)
   3. **if the account is still unverified:** `markEmailVerified(now)` and invalidate its open `EMAIL_VERIFICATION`
      tokens. Opening the emailed link proves the user owns the inbox. This closes the task-107 residual risk (an
      attacker re-registers a victim's address before the victim clicks): the victim's reset sets their own password and
      verifies the account, which also stops the 7-day unverified clean-up from deleting it.
   4. revoke **all** sessions of the user (decision 8)
   5. publish `PasswordChangedNoticeRequested` → after commit, an async "your password was changed" email (decision 9)
7. **Reset does not log in.** It returns `204`, and the page shows "Password changed — log in". Same reasoning as verify
   (task-107 decision 6):
   - `SessionAuthenticator` stays the only place that creates sessions
   - a link opened on a phone doesn't create a session there
   - the user proves they know the new password once, by logging in
8. **Session revocation** (task-100 AC #3).
   - Spring Session JDBC's repository is a `FindByIndexNameSessionRepository`. `spring_session.principal_name` holds the
     email, because `AuthenticatedUser#getName()` returns it (`multiuser-todos.md` 8.3).
   - New `infrastructure/security/SessionRevoker#revokeAll(String email)`: `findByPrincipalName(email)`, then
     `deleteById` for each session. It returns the count.
   - It is called at the end of `reset()`, inside the transaction. Spring Session JDBC runs its own `TransactionTemplate`
     (Phase 0 confirms the propagation). If its delete commits on its own, the worst case is a logged-out user whose
     password didn't change, which is harmless. The reverse, a changed password with sessions still alive, can't happen.
   - The browser that sends the reset loses its session too, if it was logged in as that user. The page then calls
     `refresh()` from `AuthContext`, so the navigation bar switches to anonymous.
9. **"Your password was changed" notice.**
   - Subject `Your Phrasal password was changed`. The body has a link to `${APP_BASE_URL}/forgot-password` and says
     "If this wasn't you, reset your password now". No token.
   - It tells the real owner when someone else used the link (for example from a hijacked inbox session).
10. **Rate limits** (existing in-memory `RateLimiter`, new rules in `RateLimitProperties`):

    | Rule | Default | Env |
    |---|---|---|
    | `forgot-per-ip` (new) | 10 / 1 h | `RATE_LIMIT_FORGOT_PER_IP` |
    | `forgot-per-email` (new) | 3 / 1 h | `RATE_LIMIT_FORGOT_PER_EMAIL` |
    | `reset-per-ip` (new) | 30 / 5 m | `RATE_LIMIT_RESET_PER_IP` |

    - There is no `reset-per-email`: the reset request has no email, and a 256-bit token can't be guessed.
    - The per-email limit also caps how many reset emails one inbox gets, which protects the Brevo free tier
      (300 emails per day) and the recipient.
11. **Mail texts stay in one class.** `VerificationEmailComposer` / `VerificationEmailListener` already send a
    non-verification mail (the "account exists" notice). They are renamed to `AccountEmailComposer` /
    `AccountEmailListener` in a pure refactor step (Phase 1.2) before the reset mails are added.
12. **Admin account.** `AdminAccountInitializer` re-applies `PHRASAL_ADMIN_PASSWORD` at every start. So an admin who
    resets their password keeps the new one only until the next restart. This is intended (the configuration is the
    source of truth for the admin) and is documented in the README. There is no special case in the code.
13. **Frontend.**
    - Two new pages, `ForgotPasswordPage` (`/forgot-password`) and `ResetPasswordPage` (`/reset-password`), with the same
      Tailwind + `dark:` style as `LoginPage`. Both work at 375 px.
    - The yellow password-requirements box from `RegisterPage` is extracted into `components/PasswordRequirements.tsx`
      and reused. The reset page doesn't know the email, so it hides the "does not contain your email" rule and shows
      the server's field error instead.
    - `RESET_LINK_TTL_HOURS = 1` sits next to the pages, documented as "keep in sync with `PASSWORD_RESET_TOKEN_TTL`".
14. **No API break, no migration.** Everything is additive, so no commit needs `!`.
15. **Logging.** Never log a raw token, a reset link (except in `LoggingEmailSender`, as today), an email address at
    `INFO`, or a password. Log user ids:
    - `log.debug("Password reset requested userId={}")` (DEBUG, so the logs don't become an existence oracle)
    - `log.info("Password reset completed userId={} sessionsRevoked={}")`

---

## Conventions for every step

- Backend rules: `backend/CLAUDE.md`. Short version:
  - layers `domain → application → presentation`, with `infrastructure`/`config` cross-cutting
  - DTOs are records in `application/dto`; Lombok on entities/services; `@Service @Transactional @RequiredArgsConstructor @Slf4j`
  - Flyway: none needed in this task. If one turns out to be needed, take the next free number (V15).
- Checkstyle runs in `mvn verify`:
  - line length ≤ 120; **no magic numbers** (named constants); no star imports; no `TODO` comments
  - blank line after a class/record/enum opening brace
  - Javadoc on a record needs `@param` per component; public method Javadoc needs `@param`/`@return`; no raw `<…>` in
    Javadoc
  - strict import order
  - quick check: `cd backend && mvn -q -o checkstyle:check@checkstyle-check`
- JaCoCo needs **≥ 85 % line coverage per package**. Touched packages: `application.service`, `application.event`,
  `application.dto`, `infrastructure.security`, `infrastructure.exception`, `presentation.rest`, `config`.
- Every test class has positive **and** negative cases. Integration tests extend `AbstractIntegrationTest` (package-private,
  `net.phrasal.integration`), use a unique email per test, and keep the number of distinct Spring contexts low (a new
  context only for a `@TestPropertySource`, e.g. `RateLimitIntegrationTest`).
- Look up library APIs with **Context7** before writing Spring Session, Spring Security, React Router or Playwright code.
- Run the narrowest command after each step, e.g. `cd backend && mvn -q test -Dtest=PasswordResetServiceTest` or
  `cd frontend && npx vitest run src/__tests__/ResetPasswordPage.test.tsx`.
- **Each phase ends with `make clean build` green** (foreground, `timeout 600000`, log to the scratchpad). It also runs
  e2e, so a phase that changes behaviour updates e2e in the same phase.
- **Commits:** one per phase. Ask the user for approval before each commit. Format `type(scope): description`,
  ≤ 80 characters, **no `Co-Authored-By` trailer**.
- Never paste secrets into `audit.md` or `session-log.md` (use `*****`).

---

## Phase 0 — Preparation (no code)

- [x] **0.1** Branch: create `password-reset` from `develop`. Check first that `develop` contains the task-107 work
      (`git log --oneline develop | grep -i "require email verification"`). The working tree must be clean apart from
      blackbox files.
      - Done 2026-10-29: `4eea4dc feat(backend)!: require email verification and hide existing emails` is on develop;
        only `audit.md` was modified; branch `password-reset` created.
- [x] **0.2** Run `make clean build` once on the untouched branch. Note the baseline here: backend test count, Vitest
      files/tests, e2e scenarios/steps.
      - Baseline: backend 356 tests, Vitest 68 files / 1498 tests, e2e 84 scenarios / 592 steps; all green.
- [x] **0.3** Backlog (MCP). **Ask the user** which option to take:
  - [x] (a, recommended) create a new task "Let users reset a forgotten password", split from task-100, depending on
        task-107. Move task-100 AC #1, #2, #3, #10 there, plus the forgot-password parts of #5, #9 and #11, and add
        "`make clean build` passes". task-100 keeps HIBP, honeypot, deletion, the 2FA limit and the Traefik item.
        - User chose (a). Created **TASK-108**; task-100 got a note about the split (its AC text is left as is).
  - [ ] (b) work under task-100 and leave its other AC unchecked. (not chosen)
  - [x] move the chosen task to `In Progress` **before** any code; add the note "implementation plan:
        `reset-password-todos.md` (branch `password-reset`)"
  - [x] task-103: note that the Forgot/Reset pages are planned here (part of AC #1, #6, #13)
- [x] **0.4** Look up with Context7 and note the results here:
  - [x] Spring Session (the version in the Boot 4.1 BOM): `FindByIndexNameSessionRepository#findByPrincipalName`,
        `#deleteById`, the bean Boot registers for JDBC (`JdbcIndexedSessionRepository`) and how to inject it
        (`FindByIndexNameSessionRepository<? extends Session>`). Check whether its `TransactionTemplate` uses
        `PROPAGATION_REQUIRES_NEW` (decision 8 works either way; write down which one).
        - `findByPrincipalName(name)` returns `Map<String, S>` (session id → session); `deleteById(id)` is a plain SQL
          DELETE and publishes no event.
        - JDBC operations use `REQUIRES_NEW` (customizable via a `springSessionTransactionOperations` bean). So the
          revocation commits independently of the reset transaction; decision 8 still holds.
  - [x] confirm that `spring_session.principal_name` holds the normalized email for a logged-in user (dev DB:
        `SELECT principal_name FROM spring_session LIMIT 5`)
        - The dev DB was down after `make clean build`, so not queried. `AuthenticatedUser#getName()` returns the
          email, which Spring Session indexes. Phase 3 integration tests (login, reset, old cookie gets 401) confirm it.
  - [x] Mailpit search: combining `to:"…"` with `subject:"…"` in one `query`
        - Space-separated terms are ANDed (`to:"x@y" subject:"Reset your Phrasal password"`); `subject:` is a
          LIKE %…% match, quoted phrases are kept together.
  - [x] React Router 7: `useLocation().state` to pass the typed email from the login page to `/forgot-password`
        (the rest is the same as `VerifyEmailPage`)
        - `<Link to="/forgot-password" state={{ email }} />` and `useLocation().state` on the target page.
- [x] **0.5** `grep -rn "new RateLimitProperties(" backend/src` and note the call sites. Phases 2 and 3 add record
      components, and these call sites must be updated.
      - One call site: `backend/src/test/java/net/phrasal/infrastructure/security/RateLimiterTest.java:26`.
- [x] **0.6** `grep -rn "VerificationEmailComposer\|VerificationEmailListener" backend docs README.md` and note the hits
      for the rename in 1.2.
      - Main: `VerificationEmailComposer.java`, `VerificationEmailListener.java` (service package).
      - Tests: `VerificationEmailComposerTest.java`, `VerificationEmailListenerTest.java`.
      - Docs: `backend/CLAUDE.md:47`. No hits in `README.md` or `docs/`.


---

## Phase ordering: why every phase stays green

Everything is additive. Phase 1 adds building blocks that nothing calls yet. Phase 2 adds forgot-password (the emailed
link leads to a page that doesn't exist until Phase 6, which is harmless because nobody uses it yet). Phase 3 adds the
reset endpoint. Phase 4 covers both over the API in e2e. Phases 5–6 add the pages and the browser e2e. So
`make clean build` passes after every phase, and each phase is one reviewable commit.

---

## Phase 1 — Building blocks: token type, settings, mail texts (no behaviour change)

### 1.1 Token type and settings
- [x] **1.1.1** `backend/src/main/java/net/phrasal/domain/entity/TokenType.java`: add `PASSWORD_RESET`. Update the
      Javadoc: remove "password reset (task-100) adds…", and list both purposes.
- [x] **1.1.2** `config/PasswordResetProperties.java`:
      `@ConfigurationProperties("phrasal.password-reset") record PasswordResetProperties(Duration tokenTtl)`, with a
      Javadoc `@param`. Register it the same way as `EmailVerificationProperties` (check how that one is enabled:
      `@ConfigurationPropertiesScan` or `@EnableConfigurationProperties`).
- [x] **1.1.3** `application.yml`:
  ```yaml
  phrasal:
    password-reset:
      token-ttl: ${PASSWORD_RESET_TOKEN_TTL:1h}
  ```
- [x] **1.1.4** No migration: `git diff --stat backend/src/main/resources/db/migration` is empty.
- [x] **1.1.5** `integration/UserTokenRepositoryIntegrationTest`, new cases:
  - [x] a `PASSWORD_RESET` token round trip through `findByTokenHashAndType`
  - [x] negative: looking up a reset token's hash with type `EMAIL_VERIFICATION` → empty (the purposes are kept apart)
  - [x] `invalidateActive(userId, PASSWORD_RESET, now)` leaves the user's open `EMAIL_VERIFICATION` token untouched
- [x] **1.1.6** `domain/entity/UserTokenEntityTest`: a `PASSWORD_RESET` token's `toString` has the type and no hash.

### 1.2 Rename the mail classes (refactor only, decision 11)
- [x] **1.2.1** `git mv` (so history follows):
  - `application/service/VerificationEmailComposer.java` → `AccountEmailComposer.java`
  - `application/service/VerificationEmailListener.java` → `AccountEmailListener.java`
  - the two test classes the same way
  - update every reference found in 0.6 (constructor injection, tests)
- [x] **1.2.2** Class Javadoc: "Builds/sends the account emails (verification, account exists, password reset,
      password changed)".
- [x] **1.2.3** Log messages in the listener: `Account email sent userId={}` and
      `Account email failed userId={}: {}`. Update the Logback `ListAppender` assertions in the listener test.
- [x] **1.2.4** `cd backend && mvn -q test -Dtest='AccountEmailComposerTest,AccountEmailListenerTest'` → green, with
      the same test count as before the rename.

### 1.3 Mail texts (`AccountEmailComposer`)
- [x] **1.3.1** Inject `PasswordResetProperties` next to the existing properties.
- [x] **1.3.2** Constants, package-private like the existing ones:
      `PASSWORD_RESET_SUBJECT = "Reset your Phrasal password"`,
      `PASSWORD_CHANGED_SUBJECT = "Your Phrasal password was changed"`.
- [x] **1.3.3** `EmailMessage passwordReset(String to, String rawToken)`:
  - [x] link = `baseUrl + "/reset-password?token=" + rawToken` (base64url, no URL-encoding needed)
  - [x] text: "Someone asked to reset the password of your Phrasal account. Choose a new password here: <link>.
        This link expires in 1 hour and works once. If you didn't ask for this, ignore this email; your password stays
        the same."
  - [x] the lifetime comes from the existing private `describe(Duration)` helper (reused, not copied)
  - [x] HTML: one `<a href>` ("Choose a new password") and the same link as plain text; every dynamic value goes
        through `HtmlUtils.htmlEscape`
- [x] **1.3.4** `EmailMessage passwordChanged(String to)`:
  - [x] link = `baseUrl + "/forgot-password"`
  - [x] text: "The password of your Phrasal account was just changed, and every device was logged out. If this was
        you, there is nothing to do. If it wasn't, reset your password now: <link>"
  - [x] no token in the text or the HTML
- [x] **1.3.5** `AccountEmailComposerTest`, new cases:
  - [x] the reset link has the configured base URL, `/reset-password?token=` and the raw token
  - [x] a `1h` TTL → "1 hour"; a `30m` TTL → "30 minutes"
  - [x] the HTML escapes a base URL containing `&`
  - [x] `passwordChanged` contains `/forgot-password` and matches no `token=` pattern
  - [x] negative: the reset mail doesn't contain `/verify-email`, and the verification mail doesn't contain
        `/reset-password`

### 1.4 Events and listener
- [x] **1.4.1** `application/event/PasswordResetEmailRequested.java`:
      `record PasswordResetEmailRequested(Long userId, String email, String rawToken)`. Javadoc `@param`s.
      `toString()` shows only the user id.
- [x] **1.4.2** `application/event/PasswordChangedNoticeRequested.java`:
      `record PasswordChangedNoticeRequested(Long userId, String email)`, with a masking `toString()` (user id only).
- [x] **1.4.3** `AccountEmailListener`: two more `@Async @TransactionalEventListener(phase = AFTER_COMMIT)` methods,
      `onPasswordResetEmailRequested` → `composer.passwordReset(...)` and `onPasswordChangedNoticeRequested` →
      `composer.passwordChanged(...)`. Both go through the existing private `deliver(...)`.
- [x] **1.4.4** Tests:
  - [x] `AccountEmailListenerTest`: each new event → composer + sender called with the right recipient; the sender
        throws → no exception escapes, and the `WARN` has no token
  - [x] an event `toString` test (next to the existing event tests, or a new `application/event/AccountEventsTest`):
        neither event's `toString` contains the email or the token

### 1.5 Test mailbox (`integration/support/RecordingEmailSender`)
Why: after `registerAndLogin` the inbox already holds the verification email. "Wait for the first message, return the
newest" would then return that one instead of the async reset email.
- [x] **1.5.1** `EmailMessage awaitSubject(String to, String subject)`: polls (same timeout as `awaitCount`) until a
      message with that subject exists, and returns the newest such message.
- [x] **1.5.2** `int countWithSubject(String to, String subject)`, for "a second reset email arrived".
- [x] **1.5.3** `static String extractToken(EmailMessage message, Pattern linkPattern)`. The existing
      `extractToken(message)` delegates to it with the verification pattern.
- [x] **1.5.4** `String awaitPasswordResetToken(String to)`: `awaitSubject(to, "Reset your Phrasal password")` plus the
      pattern `/reset-password\?token=([A-Za-z0-9_-]{43})`.

### 1.6 Verify and commit
- [x] **1.6.1** `cd backend && mvn clean verify` → green, JaCoCo ≥ 85 % in every touched package.
- [x] **1.6.2** `make clean build` → green. Ask for commit approval →
      `feat(backend): add password reset token type and account emails`

---

## Phase 2 — Forgot-password endpoint

### 2.1 Configuration
- [x] **2.1.1** `config/RateLimitProperties.java`: add `Rule forgotPerIp, Rule forgotPerEmail`, with Javadoc `@param`s.
      Update every `new RateLimitProperties(` call site from 0.5.
- [x] **2.1.2** `application.yml` under `phrasal.rate-limit` (decision 10):
  ```yaml
  forgot-per-ip:
    limit: ${RATE_LIMIT_FORGOT_PER_IP:10}
    window: 1h
  forgot-per-email:
    limit: ${RATE_LIMIT_FORGOT_PER_EMAIL:3}
    window: 1h
  ```
- [x] **2.1.3** `backend/src/test/resources/application-test.yml`: both rules at `100000`, like the existing ones.
- [x] **2.1.4** `docker-compose.yml`, `backend.environment`: `RATE_LIMIT_FORGOT_PER_IP: "1000"` (e2e sends many requests
      from one IP). Keep `RATE_LIMIT_FORGOT_PER_EMAIL` at its default, so e2e can test the `429`.

### 2.2 Service
- [x] **2.2.1** `application/service/PasswordResetService.java` (`@Service @Transactional @RequiredArgsConstructor @Slf4j`),
      dependencies so far: `UserRepository`, `UserTokenRepository`, `SecureTokenGenerator`, `PasswordResetProperties`,
      `Clock`, `ApplicationEventPublisher`. Phase 3 adds more.
- [x] **2.2.2** `void requestReset(String rawEmail)`:
  1. `email = EmailNormalizer.normalize(rawEmail)`
  2. `userRepository.findByEmail(email).ifPresent(this::issueFor)`. Verified **and** unverified accounts get a link
     (decision 4); unknown addresses return silently.
- [x] **2.2.3** `private void issueFor(User user)`, the same shape as `EmailVerificationService.issueFor`:
  1. `now = LocalDateTime.now(clock)`
  2. `userTokenRepository.invalidateActive(user.getId(), PASSWORD_RESET, now)` (only the newest link works)
  3. `IssuedToken t = tokenGenerator.generate()`; save
     `new UserToken(userId, PASSWORD_RESET, t.hash(), now.plus(properties.tokenTtl()))`
  4. `eventPublisher.publishEvent(new PasswordResetEmailRequested(userId, user.getEmail(), t.rawToken()))`
  5. `log.debug("Password reset requested userId={}", userId)`
- [x] **2.2.4** `PasswordResetServiceTest` (Mockito, fixed `Clock`), request part:
  - [x] existing verified user: `invalidateActive(…, PASSWORD_RESET, now)` runs **before** `save` (Mockito `inOrder`);
        saved hash = `SecureTokenGenerator.hash(raw)`; `expiresAt = now + ttl`; the event carries the raw token
  - [x] existing unverified user → also gets a token and an event
  - [x] unknown email → no `save`, no `invalidateActive`, no event
  - [x] the email is normalized before the lookup (`"  Bob@X.com "` → `"bob@x.com"`)
  - [x] negative: verification tokens are never invalidated by a reset request (`invalidateActive` is never called
        with `EMAIL_VERIFICATION`)

### 2.3 DTO and controller
- [x] **2.3.1** `application/dto/ForgotPasswordRequest.java`:
      `record ForgotPasswordRequest(@NotBlank @Size(max = 254) String email)`. No `@Email`, for the same reason as
      `ResendVerificationRequest`: normalize first. `@Size` keeps the rate-limiter key bounded.
- [x] **2.3.2** `AuthController`: `@PostMapping("/forgot-password")`:
  1. `rateLimiter.check("forgot-per-ip", rateLimits.forgotPerIp(), httpRequest.getRemoteAddr())`
  2. `rateLimiter.check("forgot-per-email", rateLimits.forgotPerEmail(), EmailNormalizer.normalize(request.email()))`
  3. `passwordResetService.requestReset(request.email())`
  4. `ResponseEntity.status(HttpStatus.ACCEPTED).body(AcceptedResponse.CHECK_INBOX)`
- [x] **2.3.3** `SecurityConfig`: add `/api/v1/auth/forgot-password` to the `POST … permitAll()` matcher. CSRF stays on.

### 2.4 Integration tests: `integration/PasswordResetIntegrationTest` (forgot part)
- [x] **2.4.1** Add a helper to `AbstractIntegrationTest`: `protected String requestPasswordReset(String email)`.
      It sends `POST /forgot-password` with CSRF, expects `202`, and returns `mailbox.awaitPasswordResetToken(email)`.
- [x] **2.4.2** A verified user (`registerAndLogin`) → `202`, and the body equals `AcceptedResponse.CHECK_INBOX`.
      Exactly one email with subject `Reset your Phrasal password` arrives. Its link starts with the configured
      `phrasal.app.base-url` + `/reset-password?token=`.
- [x] **2.4.3** An unknown email → `202` with a **byte-identical** body, and nothing is sent
      (`assertNothingSentTo`, 1 s).
- [x] **2.4.4** An unverified user (register only) → `202`, and a reset email arrives.
- [x] **2.4.5** Padded, upper-case input (`"  USER@x.com "`) reaches the right account.
- [x] **2.4.6** The DB holds only the hash: `SELECT count(*) FROM user_tokens WHERE token_hash = ?` with the raw token
      → `0`; with `hash(raw)` → `1`; `type = 'PASSWORD_RESET'`; `expires_at` ≈ now + 1 h.
- [x] **2.4.7** A second request → the first token row has `used_at` set (only the newest link works). The user's
      verification token rows are unchanged.
- [x] **2.4.8** Negative: without CSRF → `403` csrf; blank email → `400 Validation Error`; a 255-char email → `400`.
- [x] **2.4.9** `RateLimitIntegrationTest` (it already lowers limits with `@TestPropertySource`): add
      `phrasal.rate-limit.forgot-per-email.limit=2` → the 3rd request for one email → `429` + `Retry-After`, for an
      **unknown** email too (no enumeration through the 429).
- [x] **2.4.10** `AccountCleanupIntegrationTest`: a `PASSWORD_RESET` token that expired 8 days ago is purged; one that
      expired 1 day ago is kept. `purgeExpiredTokens` already ignores the type; this proves it.

### 2.5 Review, verify, commit
- [x] **2.5.1** Run the `api-contract-review` skill on `forgot-password`: versioned path, `202/400/403/429`
      problem+json, no body echo, identical body for every address. Fix the findings or note them here.
      Reviewed: versioned path, POST action like its siblings, 202 generic body for every address, `@Valid` + size cap,
      DTO in/out, problem+json for 400/403/429 (tested), no body echo. No findings.
- [x] **2.5.2** `cd backend && mvn clean verify` → green.
- [x] **2.5.3** `make clean build` → green. Ask for commit approval →
      `feat(backend): add forgot-password endpoint that emails a reset link`

---

## Phase 3 — Reset-password endpoint, session revocation, changed notice

### 3.1 Configuration
- [x] **3.1.1** `RateLimitProperties`: add `Rule resetPerIp` (Javadoc `@param`); update the call sites again.
- [x] **3.1.2** `application.yml`: `reset-per-ip: { limit: ${RATE_LIMIT_RESET_PER_IP:30}, window: 5m }` (multi-line
      style, like the other rules). `application-test.yml`: `100000`.
- [x] **3.1.3** `docker-compose.yml`: `RATE_LIMIT_RESET_PER_IP: "1000"`.

### 3.2 Exceptions and handler
- [x] **3.2.1** `infrastructure/exception/ResetLinkInvalidException` (message
      `This password reset link is invalid or has already been used`) and `ResetLinkExpiredException` (message
      `This password reset link has expired`). Both `RuntimeException`, like the verification ones.
- [x] **3.2.2** `infrastructure/exception/PasswordPolicyViolationException(String message)`, for the server-only
      "contains your email" rule (decision 5, step 3).
- [x] **3.2.3** `GlobalExceptionHandler`, before the catch-all:
  - [x] invalid → `400`, title `Reset Link Invalid`, type `reset-link-invalid`
  - [x] expired → `400`, title `Reset Link Expired`, type `reset-link-expired`
  - [x] policy violation → `400`, title `Validation Error`, type `validation-error`,
        `errors = {"password": message}`. It is the **same shape** as `handleValidation`, so the frontend's field-error
        code works unchanged. Build it through the same private helper, not a copy.
- [x] **3.2.4** `GlobalExceptionHandlerTest`: the three mappings (status, title, type, `errors.password`, no internal
      detail).

### 3.3 Session revocation (decision 8)
- [x] **3.3.1** `infrastructure/security/SessionRevoker.java` (`@Component @RequiredArgsConstructor @Slf4j`), with the
      dependency `FindByIndexNameSessionRepository<? extends Session>` (injection form from 0.4):
  - [x] `int revokeAll(String email)`: `findByPrincipalName(email).keySet()` → `deleteById` each → return the count
  - [x] class Javadoc: the principal name is the email (`AuthenticatedUser#getName`); keep it that way, or this
        class silently finds nothing
- [x] **3.3.2** `SessionRevokerTest` (Mockito):
  - [x] two sessions → both ids deleted, returns 2
  - [x] none → no `deleteById`, returns 0
  - [x] negative: only the ids returned for that email are deleted (another user's ids are never passed in)

### 3.4 Service: `reset`
- [x] **3.4.1** `PasswordResetService`: add the dependencies `PasswordEncoder` and `SessionRevoker`.
- [x] **3.4.2** `void reset(String rawToken, String newPassword)` (decisions 5 and 6):
  1. `token = userTokenRepository.findByTokenHashAndType(SecureTokenGenerator.hash(rawToken), PASSWORD_RESET)`;
     missing → `ResetLinkInvalidException`
  2. load the user; missing → invalid (defensive)
  3. `token.isUsed()` → invalid (**not** idempotent, decision 3)
  4. `token.isExpired(now)` → `ResetLinkExpiredException`
  5. `PasswordPolicy.violation(newPassword, user.getEmail())` present → `PasswordPolicyViolationException(message)`.
     Bean Validation already ran the account-independent rules; this repeats them cheaply and adds the email rule.
  6. `token.markUsed(now)`; `invalidateActive(userId, PASSWORD_RESET, now)`
  7. `user.setPasswordHash(passwordEncoder.encode(newPassword))`
  8. `!user.isEmailVerified()` → `user.markEmailVerified(now)` + `invalidateActive(userId, EMAIL_VERIFICATION, now)`
  9. `int revoked = sessionRevoker.revokeAll(user.getEmail())`
  10. `eventPublisher.publishEvent(new PasswordChangedNoticeRequested(userId, user.getEmail()))`
  11. `log.info("Password reset completed userId={} sessionsRevoked={}", userId, revoked)`
- [x] **3.4.3** `PasswordResetServiceTest`, reset part (fixed `Clock`):
  - [x] happy path: the token is used at `now`; the encoder is called with the new password; the hash is set; other
        reset tokens are invalidated; `revokeAll(email)`; the notice event is published
  - [x] an unverified user → verified at `now`, and `invalidateActive(…, EMAIL_VERIFICATION, now)` is called
  - [x] a verified user → `emailVerifiedAt` unchanged, and verification tokens are not touched
  - [x] unknown token → `ResetLinkInvalidException`
  - [x] used token → invalid
  - [x] expired (now = `expiresAt`) → `ResetLinkExpiredException`
  - [x] a password containing the email → `PasswordPolicyViolationException`
  - [x] for every failure: the password is unchanged, the token stays unused, `revokeAll` and the event never happen

### 3.5 DTO and controller
- [x] **3.5.1** `application/dto/ResetPasswordRequest.java`:
      `record ResetPasswordRequest(@NotBlank @Size(max = 100) String token, @NotBlank @ValidPassword String password)`.
      Javadoc `@param`s. `toString()` masks **both** values.
- [x] **3.5.2** `CredentialRequestTest`: `ResetPasswordRequest.toString()` has neither the token nor the password.
- [x] **3.5.3** `AuthController`: `@PostMapping("/reset-password")`: `reset-per-ip` limit →
      `passwordResetService.reset(token, password)` → `ResponseEntity.noContent().build()`.
- [x] **3.5.4** `SecurityConfig`: add `/api/v1/auth/reset-password` to the `POST … permitAll()` matcher. Update the
      class Javadoc if it lists the public auth endpoints.

### 3.6 Integration tests: `PasswordResetIntegrationTest` (reset part)
- [x] **3.6.1** Helper in `AbstractIntegrationTest`: `protected ResultActions resetPassword(String token, String password)`
      (`POST /reset-password` with CSRF; the caller asserts the status).
- [x] **3.6.2** Happy path: `registerAndLogin` → `requestPasswordReset` → reset with a new password → `204`. Then:
  - [x] login with the old password → `401`; with the new one → `200`
  - [x] the DB hash changed and starts with `{bcrypt}`; the token row has `used_at` set
  - [x] the response sets no `SESSION` cookie (reset doesn't log in, decision 7)
- [x] **3.6.3** The same token again → `400`, `$.title == "Reset Link Invalid"` (single use).
- [x] **3.6.4** Expired: move `expires_at` into the past with `JdbcTemplate` → `400 Reset Link Expired`; the old
      password still logs in.
- [x] **3.6.5** A random 43-char token → `400 Invalid`; a blank or missing token → `400 Validation Error`; a 101-char
      token → `400`.
- [x] **3.6.6** Types are kept apart: a **verification** token sent to `/reset-password` → `400 Invalid`, and a reset
      token sent to `/verify-email` → `400 Verification Link Invalid`.
- [x] **3.6.7** Weak password (9 chars, or `password123` from the blocklist) → `400`, `$.errors.password` names the
      rule; the token is still unused, and a valid reset with the **same** token afterwards → `204`.
- [x] **3.6.8** A password containing the email → `400`, `$.errors.password` contains `must not contain your email`;
      the same token still works afterwards.
- [x] **3.6.9** Newest link only: two forgot requests → the first token → `400 Invalid`, the second → `204`.
- [x] **3.6.10** Sessions (task-100 AC #3):
  - [x] log in twice (two `SESSION` cookies), then reset → `GET /me` with either cookie → `401`
  - [x] `SELECT count(*) FROM spring_session WHERE principal_name = ?` → `0`
  - [x] the reset request itself carries one of those cookies → `204`, and that cookie is dead afterwards too
  - [x] another user's session survives (`/me` → `200`)
- [x] **3.6.11** An unverified account: register (no verify) → forgot → reset → login with the new password → `200`;
      _Done, with one deviation: the old verification link returns `204` (idempotent no-op, `verify` unchanged), not `400`; the token is used and the account is verified either way._
      `email_verified_at` is set; the old verification link → `400 Verification Link Invalid`.
- [x] **3.6.12** The "password changed" notice arrives (`awaitSubject`): it contains `/forgot-password` and no
      `token=`.
- [x] **3.6.13** Without CSRF → `403` csrf.
- [x] **3.6.14** `RateLimitIntegrationTest`: `phrasal.rate-limit.reset-per-ip.limit=2` → the 3rd reset attempt (even
      with invented tokens) → `429` + `Retry-After`.
- [x] **3.6.15** The admin (`AdminBootstrapIntegrationTest`, which already has the admin context): a reset works, and
      running the initializer again restores the configured password (decision 12). Skip this if it needs a new
      context; the README note covers it.

### 3.7 Review, verify, commit
- [x] **3.7.1** `api-contract-review` skill on `reset-password` (`204/400/403/429`, both problem types, no body echo).
      _Note: versioned path, POST action like its siblings, `204` with no body, `@Valid` + size cap on token, DTO with masked `toString`, problem+json for 400 (invalid/expired/validation, same `errors` shape) / 403 / 429, no echo of token or password. No findings._
- [x] **3.7.2** `cd backend && mvn clean verify` → green, JaCoCo ≥ 85 % (`infrastructure.security`,
      `infrastructure.exception`, `application.service`).
- [x] **3.7.3** `make clean build` → green. Ask for commit approval →
      `feat(backend): reset passwords via emailed link and revoke all sessions`

---

## Phase 4 — E2E: password reset over the API, mail from Mailpit

### 4.1 Support code
- [ ] **4.1.1** `e2e/src/support/mailpit-client.ts`:
  - [ ] `search(address, subject?)`: the query becomes `to:"<address>" subject:"<subject>"` when a subject is given
        (syntax from 0.4)
  - [ ] `latestMessageTo(address, { timeoutMs, subject })`: polls until a message **with that subject** exists
  - [ ] constants `VERIFICATION_SUBJECT = 'Confirm your Phrasal account'`,
        `PASSWORD_RESET_SUBJECT = 'Reset your Phrasal password'`,
        `PASSWORD_CHANGED_SUBJECT = 'Your Phrasal password was changed'`
  - [ ] `verificationLink` passes `VERIFICATION_SUBJECT`. That makes the existing steps robust once other mails reach
        the same inbox; their behaviour is otherwise unchanged.
  - [ ] new `passwordResetLink(address)` (pattern `/https?:\/\/[^\s"<]+\/reset-password\?token=[A-Za-z0-9_-]{43}/`)
        and `passwordResetToken(address)`
  - [ ] `countMessagesTo(address, subject?)`
- [ ] **4.1.2** `e2e/src/world.ts`: `resetTokens: string[]`. Reset it in the `Before` hook in `hooks.ts`.
- [ ] **4.1.3** `hooks.ts` `AfterAll`: no change. Tokens go with the users (FK cascade); Mailpit messages to
      `e2e-*@phrasal.test` are already deleted. Check it once.

### 4.2 Steps: `e2e/src/steps/password-reset-api.steps.ts`
- [ ] **4.2.1** Steps:
  - `When I request a password reset` (for `currentEmail`)
  - `When I request a password reset for an unknown address`
  - `When I request a password reset {int} times`
  - `Then I should receive a password reset email` (pushes the token onto `resetTokens`)
  - `Then I should have received {int} password reset emails`
  - `Then no password reset email should have been sent to that address` (waits 2 s, then counts)
  - `When I reset my password to {string} with the link from my email` (the newest token)
  - `When I reset my password to {string} from another device` (a fresh `ApiClient`, so the world's cookie jar,
    which holds the logged-in session, stays untouched)
  - `When I reset my password to {string} with the token {string}` (negative cases)
  - `When I use the same reset link again with the password {string}`
  - `Then the previous password reset link should no longer work`
  - `Then I should receive a password changed notice`
  - `Then the response should be the check-your-inbox message` (asserts the exact `CHECK_INBOX` body)
- [ ] **4.2.2** Reuse:
  - `Given a registered user exists`, `Given an unverified user exists`, `Given I am logged in as a new user`
  - `When I log in with the current email and password {string}`, `When I request my profile`
  - `Then the response status should be {int}`

### 4.3 Feature: `e2e/features/auth-api/password-reset.feature` (`@api`)
- [ ] **4.3.1** Forgot-password for a registered user → `202` + the check-inbox body; a reset email arrives.
- [ ] **4.3.2** Forgot-password for an unknown address → `202` + the **same** check-inbox body; no email is sent.
- [ ] **4.3.3** Reset with the emailed link → `204`; log in with the old password → `401`; with the new one → `200`;
      a "password changed" notice arrives.
- [ ] **4.3.4** The link works once: using it again → `400`.
- [ ] **4.3.5** An invented token → `400`.
- [ ] **4.3.6** A too-short new password → `400`, and the same link still works with a valid password → `204`.
- [ ] **4.3.7** A new request kills the old link: two requests → two emails; the previous link → `400`; the newest →
      `204`.
- [ ] **4.3.8** Reset logs out other sessions: `Given I am logged in as a new user` → reset from another device →
      `When I request my profile` → `401`.
- [ ] **4.3.9** An unverified user can reset: `Given an unverified user exists` → reset → log in with the new password
      → `200`.
- [ ] **4.3.10** Rate limit: `When I request a password reset 4 times` for one email → the last response is `429`
      (default `forgot-per-email` = 3 per hour; compose raises only the per-IP limit).
- [ ] **4.3.11** `npm --prefix e2e run test:api` against the running stack → green, including the old features.
- [ ] **4.3.12** `make clean build` → green. Ask for commit approval → `test(e2e): cover password reset through Mailpit`

---

## Phase 5 — Frontend: API, shared password box, forgot page, login link

### 5.1 API
- [ ] **5.1.1** `src/api/authApi.ts`:
  - [ ] `forgotPassword(email: string): Promise<void>` → `POST /auth/forgot-password` (body ignored)
  - [ ] `resetPassword(token: string, password: string): Promise<void>` → `POST /auth/reset-password`
- [ ] **5.1.2** `src/api/problemTypes.ts`: `RESET_LINK_INVALID = 'reset-link-invalid'`,
      `RESET_LINK_EXPIRED = 'reset-link-expired'`.
- [ ] **5.1.3** `src/__tests__/api/authApi.test.ts`: the path, method and body of both calls; a `202` resolves; a `400`
      problem rejects with an `ApiError` that carries the problem.
      `src/__tests__/api/problemTypes.test.ts`: the two new constants match their problem types, and a
      `verification-link-invalid` problem does **not** match `RESET_LINK_INVALID`.

### 5.2 Extract the password requirements box (refactor, no visible change)
- [ ] **5.2.1** `src/auth/passwordPolicy.ts`: `passwordRules(password, email?)`. When `email` is `undefined`, the
      `no-email` rule is left out; any string (also `''`) keeps today's behaviour.
- [ ] **5.2.2** `src/components/PasswordRequirements.tsx`, props `{ id: string; password: string; email?: string }`:
      the yellow box from `RegisterPage` (rules list with ✓/○, `PASSWORD_TIP`). Keep the `data-testid`s
      `password-requirements`, `password-rule-<id>` and `password-tip`, so the existing Vitest and e2e checks still pass.
- [ ] **5.2.3** `RegisterPage.tsx` uses `<PasswordRequirements id="password-requirements" password={password} email={email} />`.
- [ ] **5.2.4** Tests:
  - [ ] `src/__tests__/PasswordRequirements.test.tsx`: the rules are rendered and marked met/unmet as you type; without
        `email` there is no `password-rule-no-email`; with `email` it is there
  - [ ] the `passwordPolicy` tests (in `src/__tests__/auth/` or `utils/`, wherever they are): `passwordRules` without an
        email has 2 rules, with one it has 3
  - [ ] `RegisterPage.test.tsx` passes **unchanged** (it proves the refactor)

### 5.3 Forgot-password page
- [ ] **5.3.1** `src/pages/ForgotPasswordPage.tsx` (route `/forgot-password`):
  - [ ] an authenticated visitor → `<Navigate to="/" replace />` (same as Login/Register)
  - [ ] an email field (`type="email"`, `autoComplete="email"`, `required`, `data-testid="forgot-email"`), prefilled
        from `location.state?.email` (sent by the login page link)
  - [ ] the submit button "Send reset link" (`forgot-submit`), disabled with "Sending…" while pending
  - [ ] success → replace the form with a panel (`data-testid="forgot-check-email"`): "If an account exists for
        **{email}**, we sent a link to reset the password. It expires in 1 hour." (from a `RESET_LINK_TTL_HOURS = 1`
        constant, documented as "keep in sync with `PASSWORD_RESET_TOKEN_TTL`") + "Didn't get it? Check spam, or try
        again in a few minutes." + a link "Back to log in" (`forgot-login-link`)
  - [ ] `429` → the server detail in a `role="alert"` box (`auth-error`); `400` field error → under the field; other
        errors → "Something went wrong. Please try again."
  - [ ] reuse `inputClass`, `buttonClass`, `alertClass` and `linkClass` from `LoginPage`; `dark:` variants; 375 px
- [ ] **5.3.2** `src/main.tsx`: `<Route path="/forgot-password" element={<ForgotPasswordPage />} />` before `*`.

### 5.4 Login page
- [ ] **5.4.1** `LoginPage.tsx`: a link "Forgot password?" under the password field (`data-testid="forgot-password-link"`)
      → `<Link to="/forgot-password" state={{ email }}>`.
- [ ] **5.4.2** Keep the `401` text as it is ("Invalid email or password"). The link is always visible, so no extra
      branch is needed.

### 5.5 Tests
- [ ] **5.5.1** `src/__tests__/ForgotPasswordPage.test.tsx` (mocked `authApi`, `MemoryRouter`):
  - [ ] the field is prefilled from `location.state.email`; empty without state
  - [ ] submit calls `forgotPassword` with the typed email; pending disables the button
  - [ ] success shows `forgot-check-email` with the email and "1 hour"; the form is gone
  - [ ] `429` shows the server detail; a network error shows the generic message; no panel in either case
  - [ ] an authenticated user is redirected to `/`
- [ ] **5.5.2** `LoginPage.test.tsx`: the forgot link is there and carries the typed email in its state (navigate and
      assert the prefilled field).
- [ ] **5.5.3** `routeReload.test.tsx`: `/forgot-password` renders inside the shell.
- [ ] **5.5.4** `npm --prefix frontend run test:run && npm --prefix frontend run build` → green.
      `cd frontend && npx tsc --noEmit` → no new errors.
- [ ] **5.5.5** `make clean build` → green. Ask for commit approval →
      `feat(frontend): add forgot-password page and login link`

---

## Phase 6 — Frontend: reset-password page + browser e2e

### 6.1 Reset page
- [ ] **6.1.1** `src/pages/ResetPasswordPage.tsx` (route `/reset-password`). It **never** redirects an authenticated
      visitor: the link may be opened in a logged-in browser.
  - [ ] read `token` with `useSearchParams`, keep it in a ref, and immediately
        `navigate('/reset-password', { replace: true })`, so it leaves the address bar and history (same pattern as
        `VerifyEmailPage`)
  - [ ] states (`data-testid="reset-status"` with `data-state`):
    - `incomplete` (no token): "This link is incomplete." + a link "Request a new link" → `/forgot-password`
      (`reset-request-new-link`)
    - `form`: new password (`reset-password`, `autoComplete="new-password"`) with
      `<PasswordRequirements id="reset-password-requirements" password={password} />` (no email, decision 13);
      confirm (`reset-password-confirm`); submit "Set new password" (`reset-submit`)
    - `submitting`: the button is disabled and shows "Saving…"
    - `success`: "Your password has been changed. You were logged out on every device." + a button "Log in" →
      `/login` (`reset-login-link`)
    - `expired`: "This link has expired." + "Request a new link"
    - `invalid`: "This link is invalid or was already used." + "Request a new link"
  - [ ] client checks before the request: `passwordViolation(password)` (no email), and the two passwords match →
        a field error, no request
  - [ ] the submit button is also disabled while `useAuth().status === 'loading'`: the auth check on load sets the
        CSRF cookie that the POST needs (the same reason as in `VerifyEmailPage`)
  - [ ] server errors:
    - `isProblemType(e, RESET_LINK_EXPIRED)` → `expired`
    - `isProblemType(e, RESET_LINK_INVALID)` → `invalid`
    - `problem.errors.password` → under the password field (`field-error-password`); the state stays `form`, so the
      same link can be used again
    - `429` → the server detail in `auth-error`; network or other → "Something went wrong. Please try again." The
      state stays `form` in both cases.
  - [ ] on success: `await refresh()` from `useAuth()`. A browser that was logged in as this user just lost its
        session (decision 8), and the menu must show "Log in".
  - [ ] Tailwind + `dark:` like `LoginPage`; works at 375 px
- [ ] **6.1.2** `src/main.tsx`: `<Route path="/reset-password" element={<ResetPasswordPage />} />` before `*`.

### 6.2 Tests
- [ ] **6.2.1** `src/__tests__/ResetPasswordPage.test.tsx` (mocked `authApi`, `MemoryRouter` with
      `initialEntries={['/reset-password?token=abc']}`, a test `AuthContext` value):
  - [ ] the token leaves the location after mount; no API call happens before submit
  - [ ] no token → `incomplete` with the "Request a new link" link
  - [ ] mismatched passwords, or a 9-char password → a field error and no API call
  - [ ] a valid submit calls `resetPassword('abc', password)` once; pending disables the button
  - [ ] success → `success` state, the login link, and `refresh` was called
  - [ ] the expired and invalid problems → the matching states
  - [ ] a `400` with `errors.password` → the field error, the form is still there, and a second submit calls the API
        again with the same token
  - [ ] `429` → the alert; the form stays
  - [ ] the requirements box has no "does not contain your email" rule
  - [ ] the submit is disabled while the auth status is `loading`
- [ ] **6.2.2** `routeReload.test.tsx`: `/reset-password` renders inside the shell.

### 6.3 nginx / Vite
- [ ] **6.3.1** `frontend/nginx.conf`: no change. `Referrer-Policy` is already set (task-107 5.7.1), and the SPA
      fallback serves `/reset-password`. Check both with
      `curl -sI http://localhost:3000/reset-password?token=x | grep -i -e referrer -e "200 OK"` on the compose stack.
- [ ] **6.3.2** `frontend/vite.config.ts`: no change (history fallback is on by default).

### 6.4 E2E browser: steps
- [ ] **6.4.1** `e2e/src/steps/password-reset-ui.steps.ts` (`data-testid`s from 5.3 and 6.1, `FRONTEND_URL` as in
      `auth-ui.steps.ts`):
  - `When I click the forgot-password link on the login page`
  - `Then the forgot-password email field should contain my email`
  - `When I request a password reset through the form`
  - `Then I should see the forgot-password check-your-inbox message`
  - `When I open the password reset link from my email in the browser`
  - `When I open the reset page with the token {string}`
  - `When I open the reset page without a token`
  - `When I set the new password {string} through the form`
  - `When I set the new password {string} with the confirmation {string} through the form`
  - `Then I should see the reset state {string}`
  - `Then I should see the reset password field error mentioning {string}`
  - `Then I should see the request-a-new-link option`
- [ ] **6.4.2** Reuse:
  - `Given a registered user exists`, `When I open the {string} page`
  - `When I log in through the form with password {string}`, `Then the user menu should show my email`
  - `When I sign up through the form with a new email` (it ends logged in)
  - `Then I should see the {string} link in the navigation`

### 6.5 E2E browser: `e2e/features/frontend/password-reset.feature` (`@frontend`)
- [ ] **6.5.1** Full flow: a registered user → open the login page → type the email → click "Forgot password?" → the
      field holds my email → request the reset → check-your-inbox message → open the link from Mailpit → set a new
      password → state `success` → log in with the new password → the user menu shows my email.
- [ ] **6.5.2** An invented token → set a valid password → state `invalid` + the request-a-new-link option.
- [ ] **6.5.3** The page without a token → state `incomplete` + the request-a-new-link option.
- [ ] **6.5.4** Mismatched confirmation → a field error; the state stays `form`.
- [ ] **6.5.5** A password containing my email is rejected **by the server**, shown under the field. The same link
      then works with a valid password → `success`.
- [ ] **6.5.6** Logged-in browser: sign up through the form (logged in) → open my reset link in the same tab → set a new
      password → `success` → the navigation shows "Log in" again.
- [ ] **6.5.7** `make acceptanceTest` → all features green, including the old ones.
- [ ] **6.5.8** `npm --prefix frontend run test:run && npm --prefix frontend run build` → green. `make clean build` →
      green. Ask for commit approval → `feat(frontend): add reset-password page`

---

## Phase 7 — Config wiring check (delivery checklist)

New settings have safe defaults in `application.yml`, so most of this is a check. Write "no change" for each item in
the commit body (or in this file, if no commit is needed).
- [ ] **7.1** `docker-compose.yml`: `RATE_LIMIT_FORGOT_PER_IP` and `RATE_LIMIT_RESET_PER_IP` are `"1000"` (2.1.4,
      3.1.3); `RATE_LIMIT_FORGOT_PER_EMAIL` is **not** set (e2e tests the `429`); `MAIL_ENABLED`, `MAIL_HOST: mailpit` and
      `APP_BASE_URL` are already there from task-107.
- [ ] **7.2** `k8s/base` and `k8s/overlays/prod`: no change. Mail, `APP_BASE_URL` and the SMTP secrets are wired since
      task-107; `PASSWORD_RESET_TOKEN_TTL` and the new rate limits use their defaults.
      `kubectl kustomize k8s/overlays/dev` and `kubectl kustomize k8s/overlays/prod` (with the example patch copied to
      `secret.yaml` locally, then deleted) both still render.
- [ ] **7.3** `.github/workflows/ci_cd.yml`: no new secrets or env. The e2e job already has `MAILPIT_URL`.
- [ ] **7.4** `skaffold.yaml`: no change (mail is disabled in the dev overlay; the reset link appears in the backend
      log through `LoggingEmailSender`).
- [ ] **7.5** Only if something above did change: `make clean build` → green, and ask for commit approval →
      `build: wire password reset settings`

---

## Phase 8 — Docs, diagrams, backlog

- [ ] **8.1** `README.md` → "Accounts & security":
  - [ ] the endpoint table gains `forgot-password` (`202/400/403/429`) and `reset-password` (`204/400/403/429`)
  - [ ] a "Password reset" subsection:
    - the link expires after `PASSWORD_RESET_TOKEN_TTL` (1 h), works once, and only the newest link works
    - the same `202` for every address
    - a reset logs the user out everywhere and doesn't log in
    - it also confirms a still-unverified email
    - the "password changed" notice
    - the admin caveat (decision 12)
  - [ ] the env table: `PASSWORD_RESET_TOKEN_TTL`, `RATE_LIMIT_FORGOT_PER_IP`, `RATE_LIMIT_FORGOT_PER_EMAIL`,
        `RATE_LIMIT_RESET_PER_IP`
  - [ ] the password policy (task-100 AC #11): length 10–72 bytes, blocklist, no repeated single character, no email;
        the same rules on register and reset
  - [ ] local: the reset mail shows up in Mailpit (http://localhost:8025)
- [ ] **8.2** `backend/CLAUDE.md`:
  - [ ] the `SecurityConfig` rule-order line gains `forgot-password|reset-password`
  - [ ] rate limits: add forgot per IP / per email and reset per IP
  - [ ] a new "Password Reset" section:
    - `PasswordResetService`, `TokenType.PASSWORD_RESET` (no migration)
    - not idempotent; validation order (decision 5); `PasswordPolicyViolationException` → the same `errors.password`
      shape
    - `SessionRevoker` and the principal-name = email rule
    - reset verifies an unverified email
    - test helpers `requestPasswordReset`, `resetPassword`, `RecordingEmailSender.awaitSubject` /
      `awaitPasswordResetToken`
  - [ ] the Email Verification section: `AccountEmailComposer` / `AccountEmailListener` (renamed)
- [ ] **8.3** `frontend/CLAUDE.md`:
  - [ ] Auth components: `ForgotPasswordPage`, `ResetPasswordPage` (routes `/forgot-password`, `/reset-password`),
        `PasswordRequirements`, the login page link
  - [ ] `authApi.ts` (`forgotPassword`, `resetPassword`) and `problemTypes.ts` (`RESET_LINK_*`)
  - [ ] the `RESET_LINK_TTL_HOURS` sync note; the reset page calls `refresh()` after success
- [ ] **8.4** `e2e/CLAUDE.md`: `password-reset.feature` (API and frontend), the two new step files, the `subject` option
      in `mailpit-client.ts`, and `resetTokens` in the world.
- [ ] **8.5** `docs/diagrams/password-reset-flow.md` (blackbox policy, new flow), in Mermaid:
  - [ ] sequence: forgot → `202` → after-commit event → SMTP → inbox → `/reset-password?token` (SPA) → submit →
        `POST reset-password` → `204` → sessions revoked → notice mail → login
  - [ ] flowchart: forgot outcomes (unknown → nothing / verified or unverified → token + mail), with the rate limits
        before the lookup
  - [ ] flowchart: reset checks in order (DTO validation → token unknown/used → expired → email rule → apply), and
        which failures keep the token usable
- [ ] **8.6** `docs/diagrams/auth-flow.md`: the authorization flowchart gains the two `permitAll` endpoints; the
      "Deferred" note strikes "Password reset" and links the new diagram. `docs/diagrams/email-verification-flow.md`:
      if it mentions the "re-register before the victim clicks" residual risk, add "closed by password reset
      (verifies the address)".
- [ ] **8.7** Plan file `.claude/docs/blackbox/plans/2026-10-26 18:10 Multi-user …md`: append a `## Mutations Log` row:
      "P3 split: password reset done alone (reuses user_tokens, no migration; reset verifies unverified accounts; 1 h
      TTL); HIBP, honeypot, deletion stay in task-100". Add only; don't delete anything in that folder.
- [ ] **8.8** Backlog (MCP), following the 0.3 choice:
  - [ ] the reset task (new task or task-100): check off the AC that are done, add implementation notes and a final
        summary
  - [ ] task-100: a note that password reset is done (and where), and that its remaining AC are open
  - [ ] task-103: a note that the Forgot/Reset pages are done (part of AC #1, #6, #13)
  - [ ] **ask the user** before moving any task to `Done`
- [ ] **8.9** Ask for commit approval → `docs: document password reset flow`
- [ ] **8.10** On the user's exit signal: append the blackbox `session-log.md` entry (format in
      `.claude/rules/blackbox-policy.md`, **no secrets**). Mention the plan mutation (8.7) and the new/updated diagrams
      (8.5, 8.6).

---

## Phase 9 — Final verification

- [ ] **9.1** `make clean build` → green: backend verify (JaCoCo 85 %/package, Checkstyle), frontend build + tests,
      docker rebuild, e2e.
- [ ] **9.2** Manual run with `make dockerAll`, at http://localhost:3000, with the Mailpit UI at http://localhost:8025:
  - [ ] log in page → "Forgot password?" → the email is prefilled → send → "check your inbox" → the mail is in Mailpit
        and says "expires in 1 hour"
  - [ ] open the link → the token is gone from the address bar → set a new password → "changed" → log in with the new
        password works, and the old one fails
  - [ ] the "password changed" notice is in Mailpit and has no token
  - [ ] log in in two browsers (or a normal and a private window), reset from a third → both are logged out on reload
  - [ ] open the same link again → "invalid or already used"
  - [ ] set a token's `expires_at` into the past via psql → the page says expired → "Request a new link" → the new
        link works
  - [ ] a password containing my email → the server error under the field → fix it → success with the same link
  - [ ] forgot for an unknown address → the same message, nothing in Mailpit
  - [ ] 4 forgot requests for one address → a readable "too many requests" message
  - [ ] dark mode and 375 px width look right on the login, forgot and reset pages
  - [ ] `SELECT type, expires_at, used_at FROM user_tokens WHERE type = 'PASSWORD_RESET' ORDER BY id DESC LIMIT 5`
        shows hashes only; `docker compose logs backend | grep -c reset-password` → `0` (mail goes to Mailpit, so no link
        is logged)
- [ ] **9.3** Optional reviews before merging:
  - [ ] `/code-review`
  - [ ] `/security-review`: focus on enumeration (forgot response, `429`, timing), token entropy/hashing/expiry/single
        use, type separation from verification tokens, session revocation, `APP_BASE_URL` vs the Host header, logging
        of tokens
  - [ ] the `java-code-review` skill on `PasswordResetService`, `SessionRevoker` and the controller methods
- [ ] **9.4** Open the PR `password-reset` → `develop` (or `main`, as the user prefers), after the user approves.

---

## Phase 10 — Production rollout (after a tagged release)

- [ ] **10.1** Before the release: nothing new to configure. Brevo, the SMTP secrets and `APP_BASE_URL` come from
      task-107. Make sure that release is live and sending mail first.
- [ ] **10.2** After the deploy:
  - [ ] `kubectl --context hetzner logs deploy/backend` shows a clean start (no Flyway change expected)
  - [ ] `/actuator/health` → `UP`
- [ ] **10.3** Smoke test with a real mailbox (Gmail or Outlook):
  - [ ] https://phrasalbox.com/login → "Forgot password?" → the mail arrives within a minute, **in the inbox, not spam**
  - [ ] "Show original": SPF, DKIM (d=phrasalbox.com) and DMARC `PASS`
  - [ ] the link opens `https://phrasalbox.com/reset-password`, and the token leaves the address bar
  - [ ] a new password works; the old one fails; a second device that was logged in is now logged out
  - [ ] the "password changed" notice arrives
- [ ] **10.4** Brevo → Transactional → Logs shows the messages as delivered. The backend log has no tokens or links
      (`kubectl --context hetzner logs deploy/backend | grep -c reset-password` → `0`).

---

## Coverage map — task-100 AC (password-reset part)

| AC | Covered by |
|---|---|
| #1 request a reset email, set a new password via the link; works once, expires | 2.2, 2.4, 3.4, 3.6.2–3.6.4, 4.3.3–4.3.4, 6.5.1 |
| #2 identical forgot-password response for existing and unknown emails | decision 4, 2.4.2–2.4.3, 2.4.9, 4.3.1–4.3.2 |
| #3 a successful reset invalidates all other sessions | decision 8, 3.3, 3.6.10, 4.3.8, 6.5.6 |
| #5 429 on forgot-password, per IP and per email (register/login/2FA parts stay in task-100) | decision 10, 2.4.9, 3.6.14, 4.3.10 |
| #9 tests: token single use and expiry, session invalidation on reset, the 429 limits | Phases 1–3 |
| #10 e2e: forgot-password mail via Mailpit, reset, log in with the new password | 4.3.3, 6.5.1 |
| #11 README + backend/CLAUDE.md: rate limits and password policy | 8.1, 8.2 |
| #12 `make clean build` | every phase, 9.1 |
| #4, #6, #7, #8 (HIBP, honeypot, deletion, Traefik IP) | out of scope (see the Scope table) |

## Coverage map — related AC in other tasks

| Task / AC | Covered by |
|---|---|
| task-103 #1 (Forgot password and Reset password pages, mobile + dark) | 5.3, 6.1, 9.2 |
| task-103 #6 (readable errors incl. 429 on these forms) | 5.3.1, 6.1.1, 5.5.1, 6.2.1 |
| task-103 #13 (Vitest for each new page) — forgot/reset part | 5.1.3, 5.2.4, 5.5, 6.2 |
| task-107 residual risk (re-registration before the victim clicks) | decision 6 step 3, 3.6.11, 4.3.9 |
