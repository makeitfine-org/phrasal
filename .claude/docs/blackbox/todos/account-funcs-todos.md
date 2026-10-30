# Multi-user: change password, change email, delete account, abuse protection — implementation TODOs

Source plan: `.claude/docs/blackbox/plans/2026-10-26 18:10 Multi-user accounts TOTP 2FA and reliable storage for phrasal.md`
(section P3 "Account deletion" and "Password checks", plus the account screens from P7).
Backlog:
- **task-100**: AC #4 (breached passwords), the rest of #5 (rate limits), #6 (honeypot), #7 (account deletion),
  #8 (real client IP, proved in logs), #9, #11 and #12. AC #1–#3 and #10 are done in task-108.
- **TASK-109** "Let signed-in users change their password and email", created in Phase 0.
- **task-103**: the account-deletion part of AC #4, plus #6 and #13 for the new screens.

Templates: `multiuser-todos.md`, `reset-password-todos.md` and `2FA-todos.md` (same folder).

This builds on:
- task-99: users, Spring Session JDBC, CSRF, `SessionAuthenticator`, `AuthenticatedUser`, `RateLimiter`, `AuthContext`,
  `UserMenu`, `AdminAccountInitializer`
- task-107: `user_tokens` + `TokenType`, `SecureTokenGenerator`, `EmailSender` + Mailpit, after-commit `@Async` mail
  events, `AccountEmailComposer`/`AccountEmailListener`, `RecordingEmailSender`, `mailpit-client.ts`, the `Clock` bean
- task-108: `SessionRevoker`, `PasswordPolicy` (length, blocklist, email rule), `PasswordChangedNoticeRequested`,
  `PasswordRequirements`, `problemTypes.ts`
- task-101: `WrongPasswordException` (`400 wrong-password`), `TwoFactorService#verifyCode`, the "keep the pre-refresh
  session id, then `revokeOthers`" pattern in `TwoFactorController#confirm`, the `/account/security` page, the e2e
  `totp.ts` helper
- task-102: `user_quiz_progress` (`ON DELETE CASCADE`), `clearAccountQuizProgress()`, `useQuizProgressSync`, which
  already ignores a `401`

> Status: Phase 0 done (2026-10-30, branch `account-settings`, backlog task-100 + new TASK-109). Phase 1 done
> (2026-10-30, shared backend groundwork). Phase 2 done and committed (`f9957e2`). Phase 3 done and committed (`594a57c`). Phases 4 and 5 done and committed together (`96903e9`). Phases 6 (honeypot) and 7 (429 logging, limits review, client-IP proof) done and committed together (`98b9568`). Phase 8 done (no config changes needed), Phase 9 docs done, Phase 10.1 green; the manual run 10.2 is the user's. Awaiting commit approval for Phases 8-10.

---

## Scope

**In scope**
1. **Change password** while logged in: the user confirms the current password. Afterwards the current session id
   rotates, every other session is closed, and a "password changed" notice is sent.
2. **Change email**, confirmed through a link sent to the new address:
   - the request needs the current password
   - opening the link switches the address and closes every session
   - the old address gets a notice
3. **Delete account**: the user confirms the password, plus a 2FA code when 2FA is on. This deletes the user row and all
   its data, ends every session and sends a goodbye email.
4. **Protect the auth endpoints from abuse:**
   - one rate-limit bucket shared by every "type your password again" action, plus a per-address limit on email-change
     mail
   - a breached-password check (Have I Been Pwned) on register, password reset and password change; if HIBP can't be
     reached, the request goes through
   - a honeypot field on register
   - a log line on `429`, so the real client IP behind Traefik can be seen in prod (task-100 AC #8)
5. Frontend:
   - three new sections on `/account/security`: Change password, Change email, Delete account
   - a new page `/confirm-email-change`
   - a hidden honeypot input on Register
6. Tests: backend unit + integration, frontend Vitest, e2e API + browser scenarios for every feature.
7. Wiring and docs: docker-compose, k8s (check only), CI (check only), README, the CLAUDE.md files, a new diagram
   `docs/diagrams/account-management-flow.md`, updates to the existing diagrams, the plan's Mutations Log, backlog.

**Out of scope (not planned, or tracked elsewhere)**

| Item | Where |
|---|---|
| Accounts without a password (Google-only) changing email or deleting themselves | task-104 |
| An "undo" link in the email-changed notice (revert within N days) | — (not planned) |
| A notice to the old address when an email change is only *requested* | — (not planned; the notice is sent when the change happens) |
| Data export ("download my data") | — (not planned) |
| Soft delete / grace period before deletion | — (not planned; deletion is immediate) |
| Self-service changes for ADMIN accounts | — (by decision 7; admins are managed through config) |
| Moving `POST /me/2fa/setup` from the `login-per-email` bucket to the new `reauth-per-user` bucket | — (optional later) |
| CAPTCHA | — (plan decision: none for now) |
| Updating the account label inside authenticator apps after an email change | not possible on the server; documented |
| Production rollout of 2FA (`TOTP_ENCRYPTION_KEY` secret) | task-101 Phase 14 |
| Off-site backups | task-97, task-98 |

> **Warning (GDPR + backups):** deletion removes the data from the live database only. Once task-98 backups exist,
> a deleted account can still be inside a backup for the retention period (planned 30 days). The README must say so.
> Without task-98, a deleted account cannot be restored at all, not even by mistake.

---

## Design decisions (the ones marked ✅ were open questions; the user confirmed them as written in Phase 0, see 0.3)

1. ✅ **Endpoints.** Every one needs CSRF. `/api/v1/me/**` is already "any signed-in user" in `SecurityConfig`, so only
   the confirm endpoint needs a new rule. All endpoints use `POST`, following the 2FA decision (b): proxies and clients
   often drop `DELETE` bodies.

   | Method + path | Who | Body | Success | Errors |
   |---|---|---|---|---|
   | `POST /api/v1/me/password` | signed in | `{currentPassword, newPassword}` | `204`, new `SESSION` cookie | `400` validation (`errors.newPassword`), `400 wrong-password`, `403 admin-account-managed`, `429` |
   | `POST /api/v1/me/email` | signed in | `{newEmail, currentPassword}` | `202 {message}` (same text as register) | `400` validation (`errors.newEmail`: invalid or same as now), `400 wrong-password`, `403 admin-account-managed`, `429` |
   | `POST /api/v1/auth/confirm-email-change` | public (token) | `{token}` | `204`, every session closed | `400 email-change-link-invalid`, `400 email-change-link-expired`, `409 email-change-conflict`, `429` |
   | `POST /api/v1/me/delete` | signed in | `{password, code?}` | `204`, session ended, `SESSION` cookie cleared | `400 wrong-password`, `400 invalid-two-factor-code` (2FA on and code missing or wrong), `403 admin-account-managed`, `429` |

2. ✅ **Proving it's the owner.**
   - Every account change needs the current password.
   - Change password and change email need nothing more. The session already passed 2FA at login.
   - Delete also needs a TOTP or recovery code when 2FA is on. That's the same bar as turning 2FA off, which needs a
     code too.
   - The password is checked **before** the code, so a wrong password doesn't use up a TOTP time step.
3. **Rate limits.**
   - New rule `reauth-per-user` = `${RATE_LIMIT_REAUTH_PER_USER:5}` per **15 min**, keyed by the user id.
     - One bucket is shared by `/me/password`, `/me/email` and `/me/delete`.
     - It is checked before the password, and every attempt counts.
     - It stops password guessing from a stolen session.
   - New rule `email-change-per-email` = `${RATE_LIMIT_EMAIL_CHANGE_PER_EMAIL:3}` per **1 h**, keyed by the normalized
     *new* address. It stops anyone using the endpoint to flood a stranger's inbox.
   - `confirm-email-change` reuses the existing `verify-per-ip` rule. It's the same kind of risk: redeeming a token.
4. **Change password.**
   - The new password must:
     - pass `@ValidPassword` (length, blocklist, repeated characters)
     - not contain the account email (`PasswordPolicy.violation(pw, email)`)
     - differ from the current one
     - not appear in a known breach (Phase 5)
   - On success:
     - the current session id rotates (`SessionAuthenticator#refresh`, principal unchanged, so the 2FA state stays)
     - every other session is closed (`SessionRevoker#revokeOthers` with the **pre-refresh** id, as in
       `TwoFactorController#confirm`)
     - the existing `PasswordChangedNoticeRequested` mail is sent. Its text is reworded so it fits a change *and* a
       reset: "…you were logged out on your other devices".
5. ✅ **Change email, confirmed by a link sent to the new address.**
   - Storage:
     - new `TokenType.EMAIL_CHANGE` in `user_tokens`
     - Flyway **V16** adds `user_tokens.new_email`, which holds the pending address
     - only the newest token works (`invalidateActive`)
     - TTL `${EMAIL_CHANGE_TOKEN_TTL:1h}`
   - The request always answers `202` with `AcceptedResponse.CHECK_INBOX`:
     - If the new address already has an account, no token is made. The address gets the existing "account exists"
       notice instead, reworded to fit both cases. Nobody can find out which addresses have accounts, the same as
       with register.
     - Otherwise a link to `/confirm-email-change?token=…` goes to the **new** address. The email does not change yet.
   - Confirm (public, CSRF):
     1. token unknown, used or replaced → `400 email-change-link-invalid`; expired → `400 email-change-link-expired`
     2. address taken in the meantime → `409 email-change-conflict`. The unique index catches a race too.
     3. Apply:
        - set the new email; it stays verified, because the link proves the user controls that inbox
        - consume the token
        - invalidate the active `EMAIL_CHANGE`, `PASSWORD_RESET` and `EMAIL_VERIFICATION` tokens. Those links went to
          the old address.
     4. `SessionRevoker.revokeAll(oldEmail)`. Spring Session indexes sessions by principal name, which is the
        **old** email.
     5. Send the "email changed" notice to the **old** address. It names the new one.
   - Everyone logs in again with the new address.
   - 2FA keeps working, because the encryption AAD is `user:<id>`, not the email. The authenticator app still shows the
     old email as the label (documented).
6. **Delete account.**
   - It's a hard delete. The database cascades remove `user_tokens`, `user_quiz_progress` and `user_recovery_codes`;
     every FK is `ON DELETE CASCADE` (V12, V14, V15).
   - `spring_session` has no FK, so `SessionRevoker.revokeAll(email)` closes the sessions explicitly.
   - The current request's session is invalidated and the `SESSION` cookie is cleared, the same way the logout filter
     does it.
   - An `AccountDeletedNoticeRequested` mail goes out after commit.
   - Logs carry the user id only.
   - The frontend clears its local copy of the account's quiz progress (`clearAccountQuizProgress()`).
7. ✅ **ADMIN accounts can't use the three endpoints** → `403 admin-account-managed`. The UI hides the three sections for
   admins and shows a note instead.
   - Why: `AdminAccountInitializer` runs at every start.
     - It would reset a changed password back to `PHRASAL_ADMIN_PASSWORD`.
     - It would create a second admin after an email change.
     - It would re-create a deleted admin.
   - The rule is `role == ADMIN`. It's simpler than comparing with the configured email, and an admin should not delete
     itself by accident.
8. ✅ **Breached-password check.**
   - Implementation: Spring Security's `HaveIBeenPwnedRestApiPasswordChecker` (`CompromisedPasswordChecker`).
     - It uses k-anonymity: only the first 5 hex characters of the SHA-1 hash leave the server.
     - It is wrapped in our own bean, `infrastructure/security/BreachedPasswordChecker`.
   - **Never expose a `CompromisedPasswordChecker` bean**, otherwise Spring Security may apply it to every login (the
     plan forbids this).
   - It is called in services, not in Bean Validation:
     - register: before the "new / unverified / verified" branches, so the answer can't reveal whether the account
       exists
     - password reset
     - password change
   - A breached password → `400 errors.<field>` "This password has appeared in a data breach. Choose a different one."
   - If HIBP is down or slow (timeout `2s`), the check fails open: a WARN log without the password, and the request
     proceeds.
   - `phrasal.password.breach-check.enabled`:
     - `${PASSWORD_BREACH_CHECK_ENABLED:true}`, so prod gets it without extra wiring
     - **off** in `application-test.yml` and in docker-compose, so e2e and CI never depend on an outside service
9. ✅ **Honeypot on register.**
   - `RegisterRequest` gets an optional `website` field. A person never sees it; bots fill it.
   - If it's filled:
     - the same `202` body comes back
     - nothing is stored and no mail is sent
     - an INFO log line without the email is written
     - the rate limits still count
   - Frontend: an off-screen input with `tabIndex={-1}`, `autoComplete="off"` and `aria-hidden="true"`. It must not
     use `display:none`, because bots skip hidden fields.
10. **Field errors raised by services.**
    - `PasswordPolicyViolationException` becomes a subclass of a new `FieldValidationException(field, message)`.
    - Change password then reports `errors.newPassword`, and change email reports `errors.newEmail`.
    - It's the same `400 Validation Error` shape the forms already read. Register and reset keep `errors.password`.
11. **Real client IP (task-100 AC #8).**
    - The Ansible `HelmChartConfig` (`externalTrafficPolicy: Local`) already exists, from multiuser Phase 10.7 a.
    - What's missing is proof in the logs. `RateLimiter` will log a WARN on every `429` with the rule name.
    - The key is logged **only** for `*-per-ip` rules. It is never logged for emails or user ids.
12. **Frontend placement.**
    - Everything goes on the existing `/account/security` page, which the user menu already links to. There is no new
      nav item.
    - New route: `/confirm-email-change`.
    - `AuthContext` gets a `deleteAccount(password, code?)` action, so the logout-like cleanup lives in one place.

---

## Conventions for every step

- Backend rules are in `../../../../backend/CLAUDE.md`. Short version:
  - layers `domain → application → presentation`, with `infrastructure`/`config` cross-cutting
  - DTOs are records in `application/dto` with a masked `toString()` for secrets
  - Lombok on entities and services
  - Flyway `V{n}__*.sql`, never edit an applied migration (the next one is **V16**)
- Checkstyle runs in `mvn verify`:
  - line length ≤ 120
  - **no magic numbers** (use named constants)
  - a blank line after a class/record/enum `{`
  - `@param` for every record component
  - no raw `<…>` in Javadoc
  - `java.*` imports before `javax.*`
  - no switch arrow style
  - no `TODO` comments
- JaCoCo needs **≥ 85 % line coverage per package**.
- Every test class has positive **and** negative cases.
- Integration tests extend `AbstractIntegrationTest` and use `registerAndLogin()`, `enableTwoFactor()` and `mailbox`.
  A scenario that needs other properties (small rate limits, a mocked bean) goes in its **own** class, which keeps
  the number of Spring contexts low.
- **Never log:** passwords, tokens, codes, or email addresses at INFO. Log the user id only.
- Look up library APIs with **Context7** before writing Spring Security / Spring Session / RestClient / React Router
  code.
- e2e:
  - every new address must come from `uniqueEmail()`, so the `AfterAll` cleanup (`e2e-%@phrasal.test`) removes it
    after an email change too
  - `npx cucumber-js <feature>` runs **all** features; use `npm --prefix e2e run test:api` or the tags instead
  - two full runs within 5 minutes can hit the login `429`, so restart the backend in between
- Run the narrowest command after each step:
  - backend: `cd backend && mvn -q -o test -Dtest='A,B'`
  - frontend: `npm --prefix frontend run test:run`
  - e2e with the stack up: `npm --prefix e2e run test:api`
- `make clean build` at the end of every phase:
  - foreground, timeout 600000
  - log to the scratchpad, then `echo EXIT=$?`
- **Commits:** at the commit points listed in each phase. Ask the user for approval before every commit.
  Format `type(scope): description`, ≤ 80 characters, no `Co-Authored-By` trailer.

---

## Phase 0 — Preparation (no code)

- [x] **0.1** Branch. Ask the user which one to use; the proposal is a new branch `account-settings` from `develop`, which
      already contains the 2FA commits. The working tree must be clean apart from the blackbox files.
      → `account-settings` from `develop` at `71129e3`. Only `audit.md` was modified.
- [x] **0.2** Run `make clean build` once on the untouched branch and note the baseline: backend tests, frontend tests
      and files, e2e scenarios and steps.
      → Baseline 2026-10-30, `EXIT=0`: backend **575** tests (JaCoCo met), frontend **1592** tests in **81** files,
      e2e **119** scenarios / **916** steps.
- [x] **0.3** Ask the user to confirm the ❓ decisions 1, 2, 5, 7, 8 and 9. Write the answers here as
      "Phase 0 decisions (a)–(f)".

      **Phase 0 decisions (2026-10-30): the user accepted every one as planned.**
      - (a) Decision 1, endpoints: all `POST`, with the paths, bodies and status codes from the table.
      - (b) Decision 2, proving ownership: the current password for all three. Delete also needs a TOTP or recovery
        code when 2FA is on, and the password is checked first.
      - (c) Decision 5, change email: a link to the **new** address. A taken address gets the "account exists" notice,
        still with a `202`. The old address is notified only when the change happens.
      - (d) Decision 7, admins: `403 admin-account-managed` on all three endpoints; the UI hides the sections.
      - (e) Decision 8, HIBP:
        - library checker wrapped in `BreachedPasswordChecker`, never a `CompromisedPasswordChecker` bean
        - fails open with a 2 s timeout
        - on by default; off in `application-test.yml` and docker-compose
      - (f) Decision 9, honeypot: a silent `202` and nothing stored. The field is an off-screen input, not
        `display:none`.
      - Branch: `account-settings`, created from `develop` at `71129e3`.
- [x] **0.4** Backlog (MCP tools are deferred, so load them with ToolSearch `select:` first):
  - [x] move **task-100** to `In Progress`
  - [x] create the task **"Let signed-in users change their password and email"**, now **TASK-109**:
    - labels `multi-user`, `security`, `backend`, `frontend`, `e2e`; milestone `m-0`; dependencies TASK-99, TASK-107
    - description: why, plus decisions 1–5 and 7
    - AC, added as TASK-109 AC #1–#7. They are ticked in the backlog when the work ships (Phase 9), not here.
      - change password with the current password; other sessions are closed; a notice mail is sent
      - change email through a link sent to the new address; nobody can find out which addresses have accounts;
        every session is closed and the old address gets a notice
      - the three account endpoints share a per-user rate limit (429 ProblemDetail)
      - admin accounts are refused with 403
      - unit, integration, Vitest and e2e tests
      - README and CLAUDE.md files are updated
      - `make clean build` passes
  - [x] move the new task to `In Progress`
  - [x] task-100 and task-103: add the note "planned in `.claude/docs/blackbox/todos/account-funcs-todos.md`"
- [x] **0.5** Look up with Context7 and write the notes below:
  - Spring Security 7.1:
    - `CompromisedPasswordChecker`, `CompromisedPasswordDecision`
    - the `HaveIBeenPwnedRestApiPasswordChecker` constructors (default and `RestClient`)
    - what the checker does when the HTTP call fails: does it throw or return "not compromised"?
    - whether a `CompromisedPasswordChecker` **bean** is picked up automatically, and by whom
    - `SecurityContextLogoutHandler`, `CookieClearingLogoutHandler`
  - Spring Session JDBC: whether invalidating the `HttpSession` makes `SessionRepositoryFilter` send an expired
    `SESSION` cookie
  - Boot 4.1 / Framework 7: `RestClient.Builder` with connect/read timeouts (`ClientHttpRequestFactorySettings` or
    `ClientHttpRequestFactoryBuilder`)
  - Notes from Context7, checked against the source jars that Boot 4.1.2 resolves (spring-security-web/config 7.1.2,
    spring-session-core 4.1.1, spring-web 7.0.10):
    - **`HaveIBeenPwnedRestApiPasswordChecker`** (`org.springframework.security.web.authentication.password`, `final`):
      - It has only a no-arg constructor; the HTTP client is swapped with `setRestClient(RestClient)`.
      - The default client uses base URL `https://api.pwnedpasswords.com/range/`, and `check` calls `uri(prefix)`
        relative to it, so **our client must keep that base URL**.
      - `check(null)` returns "not compromised". Otherwise it takes the SHA-1, sends the 5-character prefix and
        matches the suffix line by line.
      - `CompromisedPasswordDecision(boolean)#isCompromised()` is in spring-security-core,
        `...authentication.password`.
    - **On HTTP failure it does not throw.** It catches `RestClientException`, logs ERROR "Request for leaked
      passwords failed" with the stack trace, and returns **not compromised**.
      - That covers timeouts (`ResourceAccessException`) and 4xx/5xx, so the check already fails open.
      - Consequence for 5.2: the caller can't see an HTTP failure, so `BreachedPasswordChecker` can't add its own
        WARN for it. Keep the library's ERROR line; it holds no password, only the 5-character prefix in the URL.
      - The wrapper still catches any other `RuntimeException` (fail open + WARN) and handles the enabled flag.
    - **A checker bean gets picked up automatically.** `InitializeUserDetailsBeanManagerConfigurer`
      (spring-security-config) builds a `DaoAuthenticationProvider` from the single `UserDetailsService` bean, which
      for us is `JpaUserDetailsService`. It calls `setCompromisedPasswordChecker` with any `CompromisedPasswordChecker`
      bean, and login would then throw `CompromisedPasswordException`.
      - Our login uses its own `ProviderManager` (`SecurityConfig#authenticationManager`), but don't rely on that.
      - The checker stays a private field of `BreachedPasswordChecker`. A Phase 5 test asserts the context has no
        `CompromisedPasswordChecker` bean.
    - **Logout handlers:**
      - `SecurityContextLogoutHandler#logout(request, response, auth)`:
        - invalidates the `HttpSession` (`invalidateHttpSession` defaults to true)
        - clears the `SecurityContextHolder`
        - saves an empty context to its `SecurityContextRepository`
      - `CookieClearingLogoutHandler(String... names)` adds a `Max-Age=0` cookie on path `contextPath + "/"`, **without**
        the Secure, HttpOnly or SameSite flags. Our logout's `.deleteCookies("SESSION")` uses it.
    - **Spring Session expires the cookie itself.**
      - `invalidate()` on the wrapped session sets `requestedSessionInvalidated`.
      - On commit, with no new session, `SessionRepositoryFilter` calls `httpSessionIdResolver.expireSession(...)`.
      - Our `DefaultCookieSerializer` bean (`SecurityConfig#cookieSerializer`) then writes `SESSION=` with
        `Max-Age=0` and the configured flags.
      - So for delete (4.2/4.3), `SecurityContextLogoutHandler` alone clears the cookie. `CookieClearingLogoutHandler`
        is optional and would add a second, flagless `Set-Cookie`. The integration test asserts `Max-Age=0` on
        `SESSION`.
    - **RestClient timeouts:**
      - The backend has **no** `spring-boot-starter-restclient` (no `spring-boot-restclient`/`spring-boot-http-client`
        module). So Boot auto-configures no `RestClient.Builder` bean, and `ClientHttpRequestFactorySettings` /
        `ClientHttpRequestFactoryBuilder` are not available.
      - Use the plain Framework API instead, with no new dependency:
        - `SimpleClientHttpRequestFactory` with `setConnectTimeout(Duration)` and `setReadTimeout(Duration)`
        - then `RestClient.builder().baseUrl(HIBP_RANGE_URL).requestFactory(factory).build()`
      - `JdkClientHttpRequestFactory(HttpClient)` plus `setReadTimeout(Duration)` works too.
    - Optional for 5.2: HIBP accepts the request header `Add-Padding: true` (via `defaultHeader`), which hides the
      response size.

---

## Phase 1 — Shared backend groundwork

Why: all three account endpoints need the same password check, the admin rule, field-level errors and one rate-limit
bucket. Doing these once keeps the feature phases small.

### 1.1 Field-level errors from services
- [x] **1.1.1** `infrastructure/exception/FieldValidationException.java` (`RuntimeException`):
  - constructor `(String field, String message)`, getter `field()`
  - Javadoc: "a field broke a rule that needs data Bean Validation doesn't have"
- [x] **1.1.2** `PasswordPolicyViolationException` extends `FieldValidationException`:
  - keep the `(String message)` constructor, which uses field `password`
  - add a `(String field, String message)` constructor
- [x] **1.1.3** `GlobalExceptionHandler`: replace `handlePasswordPolicyViolation` with
      `handleFieldValidation(FieldValidationException ex)` → `buildValidationProblem(Map.of(ex.field(), ex.getMessage()))`.
  - Keep the `log.warn` without the message, because it could contain user input.
- [x] **1.1.4** `GlobalExceptionHandlerTest`:
  - a `PasswordPolicyViolationException` still gives `errors.password`
  - a `FieldValidationException("newEmail", …)` gives `errors.newEmail`
- [x] **1.1.5** The existing register/reset integration tests still pass unchanged (`errors.password`).

### 1.2 Admin rule
- [x] **1.2.1** `infrastructure/exception/AdminAccountManagedException.java`, message
      `The admin account is managed through server configuration`.
- [x] **1.2.2** `GlobalExceptionHandler`: a handler placed **before** the `AccessDeniedException` one →
      `403`, title `Admin Account Managed`, type `.../errors/admin-account-managed`, detail = message.
- [x] **1.2.3** `GlobalExceptionHandlerTest`: the 403 mapping, the type and the detail.

### 1.3 Shared account checks
- [x] **1.3.1** `application/service/AccountChecks.java` (`@Component @RequiredArgsConstructor`):
  - `User load(Long userId)`: missing → `AuthenticationCredentialsNotFoundException("Account no longer exists")`, the
    same behaviour as `TwoFactorService#load`
  - `void requireSelfManaged(User user)`: `role == ADMIN` → `AdminAccountManagedException`
  - `void requirePassword(User user, String raw)`: `passwordHash == null || !matches` → `WrongPasswordException`
- [x] **1.3.2** Optional, but it keeps one rule: `TwoFactorService#setup` uses `accountChecks.requirePassword(…)`
      instead of its own inline check. `TwoFactorServiceTest` must stay green; adjust its mocks.
      → Done. `TwoFactorService#load` delegates to `accountChecks.load` too, so "Account no longer exists" lives in one
      place; `PasswordEncoder` left the service. The test builds a real `AccountChecks` from its existing mocks.
- [x] **1.3.3** `AccountChecksTest` (Mockito):
  - load: found; missing → exception
  - requireSelfManaged: USER passes; ADMIN → exception
  - requirePassword: right; wrong; null hash → exception

### 1.4 Rate-limit rules
- [x] **1.4.1** `RateLimitProperties`: add `Rule reauthPerUser` and `Rule emailChangePerEmail`, each with an `@param`
      line in the Javadoc.
- [x] **1.4.2** `application.yml`, under `phrasal.rate-limit`:
  ```yaml
      reauth-per-user:
        limit: ${RATE_LIMIT_REAUTH_PER_USER:5}
        window: 15m
      email-change-per-email:
        limit: ${RATE_LIMIT_EMAIL_CHANGE_PER_EMAIL:3}
        window: 1h
  ```
- [x] **1.4.3** `src/test/resources/application-test.yml`: raise both limits like the others (`100000`).
- [x] **1.4.4** Check every place that builds `RateLimitProperties` by hand (`RateLimiterTest`, `RateLimitConfig`,
      test fixtures) and add the two new rules there.
      → Only `RateLimiterTest` builds it by hand (`RateLimitConfig` holds just the `Ticker` bean). compose, k8s and the
      README rate-limit table are left for Phases 8 and 9.
- [x] **1.4.5** `RateLimiterTest` stays green.

### 1.5 Verify and commit
- [x] **1.5.1** `cd backend && mvn -q -o test -Dtest='GlobalExceptionHandlerTest,AccountChecksTest,TwoFactorServiceTest,RateLimiterTest'`.
- [x] **1.5.2** `cd backend && mvn clean verify`: JaCoCo and Checkstyle are green.
      → Ran as part of `make clean build`, EXIT=0: backend 585 tests (baseline 575), JaCoCo met, 0 Checkstyle
      violations; frontend 1592 tests in 81 files; e2e 119 scenarios / 916 steps.
- [x] **1.5.3** Ask for commit approval → `refactor(backend): add shared account checks and field errors`
      → Committed as `0ba52ef`.

---

## Phase 2 — Change password

### 2.1 Backend: DTO and service
- [x] **2.1.1** `application/dto/ChangePasswordRequest.java`:
  - `@NotBlank(message = "Current password is required") @Size(max = 200) String currentPassword`
  - `@NotBlank(message = "New password is required") @ValidPassword String newPassword`
  - `toString()` masks both values
  - `@param` Javadoc for both components
- [x] **2.1.2** `application/service/AccountService.java` (`@Slf4j @Service @Transactional @RequiredArgsConstructor`).
      `void changePassword(Long userId, String currentPassword, String newPassword)`:
  1. `user = accountChecks.load(userId)`
  2. `accountChecks.requireSelfManaged(user)`
  3. `accountChecks.requirePassword(user, currentPassword)`
  4. `PasswordPolicy.violation(newPassword, user.getEmail())` → `PasswordPolicyViolationException("newPassword", msg)`
  5. `passwordEncoder.matches(newPassword, user.getPasswordHash())` →
     `PasswordPolicyViolationException("newPassword", "New password must be different from your current one")`
  6. `user.setPasswordHash(passwordEncoder.encode(newPassword))`
  7. publish `PasswordChangedNoticeRequested(user.getId(), user.getEmail())`
  8. `log.info("Password changed userId={}", userId)`
  - Phase 5 adds the breach check between steps 5 and 6.
- [x] **2.1.3** `AccountEmailComposer#passwordChanged`: reword it so it fits a change and a reset:
      "The password of your Phrasal account was just changed, and you were logged out on your other devices."
  - Change the text block and the HTML variant.
  - Keep the subject `Your Phrasal password was changed`; e2e matches on it.
  - Update the event's Javadoc ("…changed through a reset link **or the account page**").
- [x] **2.1.4** `AccountEmailComposerTest`: the new wording, in both the text and the HTML part.

### 2.2 Backend: controller
- [x] **2.2.1** `presentation/rest/AccountController.java`, `@RequestMapping("/api/v1/me")`.
      `@PostMapping("/password")`:
  1. `rateLimiter.check("reauth-per-user", rateLimits.reauthPerUser(), user.id().toString())`
  2. `String storedSessionId = httpRequest.getSession().getId()`. Add the same comment as in
     `TwoFactorController#confirm`, which explains why the pre-refresh id is the one to keep.
  3. `accountService.changePassword(user.id(), request.currentPassword(), request.newPassword())`
  4. `sessionAuthenticator.refresh(user, httpRequest, httpResponse)`: same principal, new session id
  5. `sessionRevoker.revokeOthers(user.email(), storedSessionId)`
  6. `204`
- [x] **2.2.2** `SecurityConfig`: no change, because `/api/v1/me/**` is already authenticated. Confirm it with the test in
      2.3.2.

### 2.3 Backend tests
- [x] **2.3.1** `AccountServiceTest` (Mockito), change password:
  - success: the hash changes, the encoder is called with the new password, and the event is published with the id
    and email
  - wrong current password → `WrongPasswordException`; no save, no event
  - ADMIN → `AdminAccountManagedException`; the encoder is never called
  - the new password contains the email → `PasswordPolicyViolationException` with `field() == "newPassword"`
  - the new password equals the current one → `PasswordPolicyViolationException`
  - the user is missing → `AuthenticationCredentialsNotFoundException`
- [x] **2.3.2** `integration/ChangePasswordIntegrationTest` (real cookies through `registerAndLogin`):
  - [x] success → `204`, and the response sets a **new** `SESSION` cookie
  - [x] afterwards: login with the old password → `401`; with the new password → `200`
  - [x] a second session opened before the change → `GET /auth/me` → `401`; the new cookie → `200`
  - [x] `mailbox` receives `Your Phrasal password was changed`
  - [x] a 2FA user (`enableTwoFactor`) changes the password → `/auth/me` still shows `twoFactorEnabled: true`
  - [x] wrong current password → `400`, `$.type` ends with `/wrong-password`; the old password still works
  - [x] a 9-character new password → `400`, `$.errors.newPassword` contains `at least 10`
  - [x] a new password containing the email → `400`, `$.errors.newPassword`
  - [x] the new password equals the current one → `400`, `$.errors.newPassword`
  - [x] blank fields → `400` Validation Error
  - [x] anonymous → `401`; without CSRF → `403`
- [x] **2.3.3** `integration/AdminBootstrapIntegrationTest` (the class with a real admin): admin session +
      `POST /me/password` → `403`, `$.type` ends with `/admin-account-managed`.
- [x] **2.3.4** `integration/AccountRateLimitIntegrationTest`, with
      `@TestPropertySource(properties = "phrasal.rate-limit.reauth-per-user.limit=2")`:
  - 2 wrong current passwords → `400`, `400`; the 3rd → `429` with a `Retry-After` header
  - another user is not affected
  - Phases 3 and 4 add the "shared bucket" cases to this class.

### 2.4 Frontend
- [x] **2.4.1** `src/api/accountApi.ts`: `changePassword(currentPassword, newPassword): Promise<void>` →
      `POST /me/password`.
- [x] **2.4.2** `src/api/problemTypes.ts`: `ADMIN_ACCOUNT_MANAGED = 'admin-account-managed'`.
- [x] **2.4.3** `src/components/account/ChangePasswordForm.tsx`:
  - [x] a `<section aria-labelledby="change-password-heading">` with an `<h2>` "Change password"
  - [x] fields:
    - current password (`autoComplete="current-password"`)
    - new password (`autoComplete="new-password"`, `minLength={10}`)
    - confirm new password
  - [x] reuse `PasswordRequirements` and `src/auth/passwordPolicy.ts` for the client checks: length, and the passwords
        match. If they fail, no request is sent.
  - [x] the submit button shows "Saving…" and is disabled while pending
  - [x] errors:
    - `wrong-password` → under the current-password field
    - `problem.errors.newPassword` → under the new-password field
    - `429` / other → a `role="alert"` box with the server detail
  - [x] success:
    - clear the fields
    - show `role="status"` "Password changed. You were logged out on your other devices."
    - call `refresh()` from `useAuth`
  - [x] `data-testid`s: `change-password-current`, `change-password-new`, `change-password-confirm`,
        `change-password-submit`, `change-password-success`, `change-password-error`,
        `field-error-currentPassword`, `field-error-newPassword`
  - [x] Tailwind matches the 2FA section of the page, including `dark:` variants; the layout works at 375 px
- [x] **2.4.4** `AccountSecurityPage.tsx`: render `<ChangePasswordForm />` above the 2FA section.
  - If `user.role === 'ADMIN'`: don't render it. Show one note for the whole page instead (`data-testid="admin-managed-note"`):
    "The admin account's password and email are managed through server configuration." Phases 3 and 4 reuse the note.
- [x] **2.4.5** Tests:
  - [x] `src/__tests__/api/accountApi.test.ts`: path, method and body for `changePassword`
  - [x] `src/__tests__/account/ChangePasswordForm.test.tsx`:
    - renders the fields
    - mismatch → no request
    - short → no request
    - success → the API is called with both values, the status message shows, `refresh` is called, the fields are cleared
    - `wrong-password` → error under the current field
    - `400 errors.newPassword` → error under the new field
    - `429` → alert
    - pending state disables the button
  - [x] `src/__tests__/AccountSecurityPage.test.tsx`: the form is shown for USER; for ADMIN the form is hidden and the
        note is shown
- [x] **2.4.6** `npm --prefix frontend run test:run && npm --prefix frontend run build` → green.

### 2.5 E2E
- [x] **2.5.1** `e2e/src/steps/account-api.steps.ts`, new file:
  - `When I change my password from {string} to {string}`
  - `When I change my password with the wrong current password`
  - reuse `I log in with the current email and password {string}`, `I request my profile`, `I log out`,
    `the response status should be {int}`
  - reuse the "another device" client pattern from `password-reset-api.steps.ts` for a second session
- [x] **2.5.2** `e2e/features/account-api/change-password.feature` (`@api`):
  - [x] change password → 204; log out; the old password → 401; the new password → 200
  - [x] the other device is logged out (its profile → 401); this device still works (profile → 200)
  - [x] a "password changed" notice arrives in Mailpit (reuse `I should receive a password changed notice`)
  - [x] wrong current password → 400
  - [x] new password "short" → 400, and the error mentions "at least 10"
  - [x] anonymous → 401
- [x] **2.5.3** `e2e/src/steps/account-ui.steps.ts`, new file:
  - `When I open my account security page` → not added: the existing `I visit the account security page` (two-factor-ui steps) is reused
  - `When I change my password to {string} through the form`
  - `Then I should see the password changed message`
  - `When I log in again through the form with the password {string}` (added: the reset page's login step needs the reset page)
- [x] **2.5.4** `e2e/features/frontend/account-settings.feature` (`@frontend`): a new user changes the password
      through the form → message; logs out through the user menu; logs in through the form with the new password →
      the user menu shows the email.
- [x] **2.5.5** `npm --prefix e2e run test:api` with the stack up (`docker compose up -d --build --wait`) → green.

### 2.6 Verify and commit
- [x] **2.6.1** `make clean build` → green. Backend 604 tests, frontend 1605 tests, e2e 126 scenarios.
- [x] **2.6.2** Committed as `f9957e2`: `feat: let signed-in users change their password`. If the user wants it split:
      `feat(backend): …`, `feat(frontend): …`, `test(e2e): …`.

---

## Phase 3 — Change email (confirmed through the new address)

### 3.1 Schema and domain
- [x] **3.1.1** `V16__add_user_tokens_new_email.sql`:
  ```sql
  -- Email change: the pending new address travels with its one-time token.
  ALTER TABLE user_tokens
      ADD COLUMN new_email VARCHAR(254),
      ADD CONSTRAINT chk_user_tokens_new_email
          CHECK ((type = 'EMAIL_CHANGE') = (new_email IS NOT NULL)),
      ADD CONSTRAINT chk_user_tokens_new_email_lower
          CHECK (new_email = LOWER(new_email));
  ```
  - Existing rows are not `EMAIL_CHANGE` and have `new_email = NULL`, so both checks hold.
- [x] **3.1.2** `TokenType`: add `EMAIL_CHANGE` and extend the Javadoc ("authorises moving the account to the address
      stored with the token").
- [x] **3.1.3** `UserToken`:
  - field `@Column(name = "new_email", length = EMAIL_MAX_LENGTH) String newEmail`
  - a static factory `UserToken.emailChange(Long userId, String tokenHash, LocalDateTime expiresAt, String newEmail)`
  - keep the existing constructor for the other types
- [x] **3.1.4** `AccountCleanupService`: check that the expired-token cleanup deletes by expiry for **every** type. If
      it filters by type, add `EMAIL_CHANGE` and extend `AccountCleanupServiceTest`.
- [x] **3.1.5** `config/EmailChangeProperties.java`: `@ConfigurationProperties("phrasal.email-change")`,
      `record EmailChangeProperties(Duration tokenTtl)`. In `application.yml`:
      `phrasal.email-change.token-ttl: ${EMAIL_CHANGE_TOKEN_TTL:1h}`. Register it the same way as
      `PasswordResetProperties`.
- [x] **3.1.6** Tests:
  - `UserTokenRepository` integration (extend the existing class, or `UserTokenRepositoryIntegrationTest`):
    - [x] save + find an `EMAIL_CHANGE` token, with `newEmail` stored
    - [x] an `EMAIL_CHANGE` row without `new_email` → `DataIntegrityViolationException`
    - [x] a `PASSWORD_RESET` row **with** `new_email` → `DataIntegrityViolationException`
    - [x] an upper-case `new_email` → `DataIntegrityViolationException`
  - `UserTokenTest` (or the existing entity test): the factory sets every field

### 3.2 Exceptions and mails
- [x] **3.2.1** New exceptions in `infrastructure/exception`, each with a `GlobalExceptionHandler` method and a
      `GlobalExceptionHandlerTest` case:
  - `EmailChangeLinkInvalidException` → `400`, type `email-change-link-invalid`, detail
    "This email change link is invalid or was already used"
  - `EmailChangeLinkExpiredException` → `400`, type `email-change-link-expired`, detail "This email change link has expired"
  - `EmailChangeConflictException` → `409`, type `email-change-conflict`, detail
    "This address is already used by another account"
- [x] **3.2.2** Events in `application/event`. Each `toString()` shows the user id only:
  - `EmailChangeConfirmationRequested(Long userId, String newEmail, String rawToken)`
  - `EmailChangedNoticeRequested(Long userId, String oldEmail, String newEmail)`
- [x] **3.2.3** `AccountEmailComposer`:
  - [x] `emailChangeConfirmation(String to, String rawToken)`:
    - subject `Confirm your new Phrasal email address`
    - link `{baseUrl}/confirm-email-change?token=…`
    - the lifetime comes from `EmailChangeProperties`
    - text: "If you didn't ask for this, ignore this email; nothing changes."
  - [x] `emailChanged(String to, String newEmail)`:
    - subject `Your Phrasal email address was changed`
    - text: "The email address of your Phrasal account was changed to {newEmail}, and every device was logged out.
      If this wasn't you, contact the site administrator."
    - HTML-escape `newEmail`
  - [x] reword `accountExists` so it fits register **and** email change:
    "Someone tried to use this email address for a Phrasal account, but it already belongs to your account."
    Keep its subject.
- [x] **3.2.4** `AccountEmailListener`: two `@Async @TransactionalEventListener(AFTER_COMMIT)` methods for the new
      events. The confirmation goes to `newEmail`, the notice to `oldEmail`.
- [x] **3.2.5** Tests: `AccountEmailComposerTest` (subjects, link, lifetime, escaping, the new `accountExists`
      wording) and `AccountEmailListenerTest` (each event → `send` with the right recipient; a send failure is
      swallowed).

### 3.3 Service
- [x] **3.3.1** `application/service/EmailChangeService.java` (`@Slf4j @Service @Transactional @RequiredArgsConstructor`).
      `void requestChange(Long userId, String rawNewEmail, String currentPassword)`:
  1. `user = accountChecks.load(userId)`, then `requireSelfManaged(user)`
  2. `newEmail = EmailNormalizer.normalize(rawNewEmail)`; equals `user.getEmail()` →
     `FieldValidationException("newEmail", "New email must be different from your current one")`
  3. `accountChecks.requirePassword(user, currentPassword)`
  4. `userRepository.existsByEmail(newEmail)` → publish `AccountExistsNoticeRequested(userId, newEmail)`, log
     `Email change requested for a taken address userId={}`, and **return**. The caller still answers `202`.
  5. `invalidateActive(userId, EMAIL_CHANGE, now)`, generate a token, save `UserToken.emailChange(…, now + ttl, newEmail)`
  6. publish `EmailChangeConfirmationRequested(userId, newEmail, rawToken)`; `log.info("Email change requested userId={}", …)`
- [x] **3.3.2** `void confirmChange(String rawToken)`:
  1. find by `hash(rawToken)` + `EMAIL_CHANGE`, otherwise `EmailChangeLinkInvalidException`. Then the user by id,
     otherwise invalid.
  2. `token.isUsed()` → invalid; `token.isExpired(now)` → expired
  3. `existsByEmail(token.getNewEmail())` → `EmailChangeConflictException`
  4. `oldEmail = user.getEmail()`; `user.setEmail(newEmail)`; `user.markEmailVerified(now)`, which does nothing if the
     account is already verified; `token.markUsed(now)`
  5. `invalidateActive` for `EMAIL_CHANGE`, `PASSWORD_RESET` and `EMAIL_VERIFICATION`
  6. `userRepository.saveAndFlush(user)`; a `DataIntegrityViolationException` (race on `ux_users_email`) →
     `EmailChangeConflictException`
  7. `revoked = sessionRevoker.revokeAll(oldEmail)`. It **must** be the old email.
  8. publish `EmailChangedNoticeRequested(userId, oldEmail, newEmail)`;
     `log.info("Email changed userId={} sessionsRevoked={}", …)`
- [x] **3.3.3** `EmailChangeServiceTest` (Mockito, fixed `Clock`):
  - request:
    - success: old tokens invalidated, the token is saved with `newEmail` lower-cased, the event carries the raw token
      (the saved hash ≠ the raw token)
    - same address in other letter case → `FieldValidationException("newEmail")`
    - wrong password → `WrongPasswordException`, nothing saved
    - ADMIN → exception
    - taken address → `AccountExistsNoticeRequested`, no token saved, no confirmation event
  - confirm:
    - success: email set, token used, the three types invalidated, `revokeAll` called with the **old** email, notice
      event
    - unknown token → invalid
    - used token → invalid
    - expired token → expired
    - taken address → conflict
    - `saveAndFlush` throws `DataIntegrityViolationException` → conflict

### 3.4 Controller and security
- [x] **3.4.1** `application/dto/ChangeEmailRequest.java`:
  - `@NotBlank @Email @Size(max = 254) String newEmail`
  - `@NotBlank @Size(max = 200) String currentPassword`
  - `toString()` masks the password
- [x] **3.4.2** `application/dto/ConfirmEmailChangeRequest.java`: `@NotBlank @Size(max = 100) String token`, with the
      token masked in `toString()`.
- [x] **3.4.3** `AccountController`: `@PostMapping("/email")`:
  1. check `reauth-per-user` (user id)
  2. check `email-change-per-email` (normalized new email)
  3. call the service
  4. answer `202` with `AcceptedResponse.CHECK_INBOX`
- [x] **3.4.4** `AuthController`: `@PostMapping("/confirm-email-change")`:
  1. check `verify-per-ip` (`getRemoteAddr()`)
  2. `emailChangeService.confirmChange(token)`
  3. answer `204`
- [x] **3.4.5** `SecurityConfig`: add `/api/v1/auth/confirm-email-change` to the public `POST` list, next to
      `verify-email`.

### 3.5 Backend integration tests
- [x] **3.5.1** `AbstractIntegrationTest` helpers:
  - `requestEmailChange(Cookie session, String newEmail, String password)` → `ResultActions`
  - `confirmEmailChange(String token)` → `ResultActions`
  - `RecordingEmailSender`: an `awaitEmailChangeToken(address)` helper, the same as `awaitPasswordResetToken`
- [x] **3.5.2** `integration/ChangeEmailIntegrationTest`:
  - [x] request → `202` with the check-inbox message; the confirmation mail goes to the **new** address; `/auth/me`
        still shows the old email
  - [x] confirm → `204`; then:
    - the old session's `/auth/me` → `401`
    - login with the new email → `200`, `$.email` = new
    - login with the old email → `401`
    - the old address gets `Your Phrasal email address was changed`
  - [x] after the change, `SELECT count(*) FROM spring_session WHERE principal_name = ?` returns 0 for both the old and
        the new email
  - [x] the same link a second time → `400 email-change-link-invalid`
  - [x] a second request replaces the first: the first link → `400 email-change-link-invalid`, the second → `204`
  - [x] an expired link → `400 email-change-link-expired`. Move the row's `expires_at` back with `JdbcTemplate`; don't
        sleep.
  - [x] taken address: another registered user's email → `202`, no confirmation mail, and that address receives the
        "account exists" notice
  - [x] the address was taken between request and confirm → confirm `409 email-change-conflict`
  - [x] the same address in other letter case → `400`, `$.errors.newEmail`
  - [x] invalid email / blank fields → `400`
  - [x] wrong password → `400 wrong-password`, no mail
  - [x] a 2FA account changes its email → login with the new email asks for the code (`202`), and a TOTP from the
        **same** secret works (the AAD doesn't depend on the email)
  - [x] an outstanding password-reset link from before the change → `400 reset-link-invalid` afterwards
  - [x] anonymous request → `401`; without CSRF → `403`; anonymous confirm with CSRF → allowed (public)
- [x] **3.5.3** `AdminBootstrapIntegrationTest`: admin + `POST /me/email` → `403 admin-account-managed`.
- [x] **3.5.4** `AccountRateLimitIntegrationTest`:
  - shared bucket: 1 wrong change-password attempt + 1 wrong change-email attempt → the next attempt on either
    endpoint is `429`
  - with `email-change-per-email.limit=2` in the same `@TestPropertySource`: 2 users ask for the same new address →
    the 3rd request for that address → `429`
- [x] **3.5.5** `cd backend && mvn clean verify` → green.

### 3.6 Frontend
- [x] **3.6.1** `src/api/accountApi.ts`:
  - `requestEmailChange(newEmail, currentPassword): Promise<void>` → `POST /me/email`; the body is ignored, like
    `forgotPassword`
  - `confirmEmailChange(token): Promise<void>` → `POST /auth/confirm-email-change`
- [x] **3.6.2** `src/api/problemTypes.ts`: `EMAIL_CHANGE_LINK_INVALID`, `EMAIL_CHANGE_LINK_EXPIRED`,
      `EMAIL_CHANGE_CONFLICT`.
- [x] **3.6.3** `src/components/account/ChangeEmailForm.tsx`:
  - [x] a section with an `<h2>` "Change email", showing "Current: {user.email}"
  - [x] fields: new email (`type="email"`, `autoComplete="email"`), current password
  - [x] client check: new email ≠ current, compared case-insensitively → field error, no request
  - [x] success: clear the password, keep the form, and show `role="status"`:
        "We sent a confirmation link to {newEmail}. Your email stays {current} until you open it. The link expires in
        1 hour."
  - [x] errors:
    - `wrong-password` → under the password field
    - `errors.newEmail` → under the email field
    - `429` / other → alert
  - [x] `data-testid`s: `change-email-new`, `change-email-password`, `change-email-submit`, `change-email-success`,
        `change-email-error`, `field-error-newEmail`, `field-error-currentPassword`
- [x] **3.6.4** `AccountSecurityPage.tsx`: render `<ChangeEmailForm />` after the password form, hidden for ADMIN (the
      note from 2.4.4 covers it).
- [x] **3.6.5** `src/pages/ConfirmEmailChangePage.tsx` (route `/confirm-email-change`):
  - [x] read `token` from the query; no token → state `invalid`
  - [x] POST once on mount. Copy the guard against the doubled StrictMode effect from `VerifyEmailPage.tsx`; don't
        write a new one.
  - [x] states, each with `data-testid="email-change-state-<name>"`:
    - `confirming`
    - `done`: "Your email address was changed. Log in with your new address." + a link to `/login`. Call `refresh()`
      first, because the session is gone now.
    - `invalid` / `expired`: "This link is invalid or has expired. Request the change again on the Account security
      page." + a link to `/account/security`
    - `conflict`: "This address is already used by another account."
    - `error`: the server detail, e.g. for a `429`
  - [x] dark mode and 375 px width, like `VerifyEmailPage`
- [x] **3.6.6** `src/main.tsx`: `<Route path="/confirm-email-change" element={<ConfirmEmailChangePage />} />` before `*`.
- [x] **3.6.7** Tests:
  - [x] `accountApi.test.ts`: both new functions
  - [x] `src/__tests__/account/ChangeEmailForm.test.tsx`:
    - success message names both addresses
    - same address → no request
    - `wrong-password` → error under the password field
    - `400 errors.newEmail` → error under the email field
    - `429` → alert
    - pending state
  - [x] `src/__tests__/ConfirmEmailChangePage.test.tsx`:
    - no token → invalid
    - success → `done` and `refresh` is called
    - the invalid, expired and conflict problem types → the matching state
    - other errors → `error`
    - the request is sent exactly once under StrictMode
  - [x] `routeReload.test.tsx`: `/confirm-email-change` renders inside the shell
  - [x] `AccountSecurityPage.test.tsx`: the email form is shown for USER and hidden for ADMIN
- [x] **3.6.8** `npm --prefix frontend run test:run && npm --prefix frontend run build` → green.

### 3.7 E2E
- [x] **3.7.1** `e2e/src/support/mailpit-client.ts`:
  - `EMAIL_CHANGE_SUBJECT`, `EMAIL_CHANGED_SUBJECT` and `ACCOUNT_EXISTS_SUBJECT` (if it's not there yet)
  - `emailChangeLink(address)` / `emailChangeToken(address)`, built the same way as `passwordResetLink`/`Token`
- [x] **3.7.2** `e2e/src/world.ts`: add `newEmail: string | null`, and reset it in `hooks.ts` `Before`. The new address
      always comes from `uniqueEmail()`.
- [x] **3.7.3** `account-api.steps.ts`:
  - `When I request an email change to a new address with password {string}`
  - `When I request an email change to the address of another registered user`
  - `When I request an email change to my current address`
  - `Then I should receive an email change link at the new address`
  - `Then the other user's address should receive an account exists notice`
  - `When I confirm the email change with the link from my email`
  - `Then the old address should receive an email changed notice`
  - `When I log in with the new email and password {string}`
- [x] **3.7.4** `e2e/features/account-api/change-email.feature` (`@api`):
  - [x] request → 202; the link arrives at the new address; my profile still shows the old email
  - [x] confirm → 204; my profile → 401; log in with the new email → 200; with the old email → 401; the old address
        gets the notice
  - [x] the link works once (the second confirm → 400)
  - [x] taken address → 202, no link mail, an "account exists" notice to that address
  - [x] my current address → 400
  - [x] wrong password → 400
- [x] **3.7.5** `account-ui.steps.ts`:
  - `When I request an email change to a new address through the form`
  - `Then I should see the email change check-your-inbox message`
  - `When I open the email change link from my email in the browser`
  - `Then I should see the email change state {string}`
  - `When I log in through the form with the new email`
- [x] **3.7.6** `account-settings.feature`: a new user asks for the change through the form → message; opens the link
      in the browser → state `done`; logs in with the new email → the user menu shows the **new** email.
- [x] **3.7.7** `npm --prefix e2e run test:api` → green.

### 3.8 Verify and commit
- [x] **3.8.1** `make clean build` → green. Backend 647 tests, frontend 1626 tests, e2e 133 scenarios.
      Notes: 3.1.4 needed no change (the cleanup deletes by expiry for every type). The UI e2e step opens the link with
      only the token on `FRONTEND_PORT`, like the reset step. The "I confirm … again" step and `no email change link
      should be sent to the new address` were added to the e2e steps.
- [x] **3.8.2** Ask for commit approval → `feat: let signed-in users change their email address` (`594a57c`)

---

## Phase 4 — Delete account

### 4.1 Backend: DTO, event, mail
- [x] **4.1.1** `application/dto/DeleteAccountRequest.java`:
  - `@NotBlank @Size(max = 200) String password`
  - `@Size(max = 50) String code`: optional, needed only when 2FA is on
  - `toString()` masks both values
- [x] **4.1.2** `application/event/AccountDeletedNoticeRequested(Long userId, String email)`. `toString()` shows the user
      id only.
- [x] **4.1.3** `AccountEmailComposer#accountDeleted(String to)`:
  - subject `Your Phrasal account was deleted`
  - text: "Your Phrasal account and its saved progress were deleted. If this wasn't you, contact the site
    administrator."
  - no links with tokens
- [x] **4.1.4** `AccountEmailListener`: an after-commit `@Async` handler for it. Tests in `AccountEmailComposerTest` and
      `AccountEmailListenerTest`.

### 4.2 Backend: service
- [x] **4.2.1** `AccountService#deleteAccount(Long userId, String password, String code)`:
  1. `user = accountChecks.load(userId)`, then `requireSelfManaged(user)`
  2. `accountChecks.requirePassword(user, password)`. The password is checked before the code.
  3. if `user.isTwoFactorEnabled()`:
     - a blank `code` → `InvalidTwoFactorCodeException`
     - otherwise `twoFactorService.verifyCode(userId, code)`. Its conditional update detaches the user, so don't touch
       the old instance afterwards.
  4. `email = user.getEmail()`; publish `AccountDeletedNoticeRequested(userId, email)`
  5. `userRepository.deleteById(userId)`; `userRepository.flush()`. The FK cascades remove the tokens, progress and
     recovery codes.
  6. `revoked = sessionRevoker.revokeAll(email)`
  7. `log.info("Account deleted userId={} sessionsRevoked={}", userId, revoked)`
- [x] **4.2.2** `AccountServiceTest`, delete:
  - success without 2FA: `deleteById`, `revokeAll(email)` and the event are called in that order (Mockito `InOrder`)
  - success with 2FA + code: `verifyCode` is called
  - 2FA on + blank code → `InvalidTwoFactorCodeException`; nothing deleted
  - 2FA on + wrong code (`verifyCode` throws) → the exception propagates; nothing deleted
  - wrong password → `WrongPasswordException`; `verifyCode` is **never** called
  - ADMIN → exception
  - missing user → exception

### 4.3 Backend: controller
- [x] **4.3.1** `AccountController`: `@PostMapping("/delete")`:
  1. check `reauth-per-user`
  2. `accountService.deleteAccount(user.id(), request.password(), request.code())`
  3. end the current request's session, using the APIs noted in 0.5:
     - `new SecurityContextLogoutHandler().logout(httpRequest, httpResponse, authentication)`, which clears the context
       and invalidates the `HttpSession`
     - expire the `SESSION` cookie, unless 0.5 showed that Spring Session already does it on invalidation
  4. answer `204`
- [x] **4.3.2** Make sure an anonymous follow-up GET gets a fresh `XSRF-TOKEN`; the frontend calls `refresh()` anyway.
      Write it down in a comment only if the code relies on it.

### 4.4 Backend integration tests
- [x] **4.4.1** `integration/DeleteAccountIntegrationTest`:
  - [x] success → `204`, and the response expires the `SESSION` cookie (`Max-Age=0`)
  - [x] afterwards:
    - the old cookie's `/auth/me` → `401`
    - a second session's `/auth/me` → `401`
    - login → `401`
  - [x] data is gone. Seed it first:
    - `PUT /me/quiz-progress/phrasal-verbs`
    - `enableTwoFactor`, which makes recovery codes
    - `requestPasswordReset`, which makes a token

    Then, by `JdbcTemplate`, `users`, `user_tokens`, `user_quiz_progress`, `user_recovery_codes` and
    `spring_session` (by principal name) all count 0 for that user.
  - [x] the goodbye mail `Your Phrasal account was deleted` arrives
  - [x] the address is free again: register it → `202` and a **verification** mail, not an "account exists" notice
  - [x] wrong password → `400 wrong-password`; the account still works
  - [x] 2FA account:
    - no code → `400 invalid-two-factor-code`
    - wrong code → `400`
    - a valid TOTP (`TotpTestCodes`) → `204`
    - a recovery code, in a separate test → `204`
  - [x] anonymous → `401`; without CSRF → `403`
- [x] **4.4.2** `AdminBootstrapIntegrationTest`: admin + `POST /me/delete` → `403 admin-account-managed`, and the admin
      can still log in.
- [x] **4.4.3** `AccountRateLimitIntegrationTest`: the shared bucket also covers `/me/delete`: 2 wrong passwords on
      delete → the next change-password attempt → `429`.
- [x] **4.4.4** `cd backend && mvn clean verify` → green.

### 4.5 Frontend
- [x] **4.5.1** `accountApi.ts`: `deleteAccount(password, code?)` → `POST /me/delete`. Send `code` only when it's given.
- [x] **4.5.2** `AuthContext.tsx`: a new action `deleteAccount(password: string, code?: string): Promise<void>`:
  1. `await accountApi.deleteAccount(password, code)`. On error, rethrow; the state doesn't change.
  2. `clearAccountQuizProgress()`, for privacy, the same as logout. Don't flush progress; the account is gone.
  3. `await refresh()` → anonymous, and a fresh XSRF cookie
  - Add it to the `AuthContextValue` interface and to the no-op default value.
- [x] **4.5.3** Check `useQuizProgressSync`: when the status turns `anonymous`, a pending debounced PUT is cancelled or
      ends in a silent `401` (line ~86). Add a test if neither is covered yet.
- [x] **4.5.4** `src/components/account/DeleteAccountSection.tsx`:
  - [x] a section with an `<h2>` "Delete account" and a red outline button "Delete my account…"
        (`data-testid="delete-account-open"`)
  - [x] clicking it opens an inline confirm form:
    - the warning: "This permanently deletes your account, your saved quiz progress and your two-factor settings. It
      can't be undone."
    - a password field (`delete-account-password`)
    - when `user.twoFactorEnabled`: a code field (`delete-account-code`, "Authenticator or recovery code")
    - a required checkbox "I understand" (`delete-account-confirm`)
    - submit "Delete account" (`delete-account-submit`), red, disabled until the checkbox is ticked and while pending
    - "Cancel"
  - [x] success: `navigate('/login', { replace: true, state: { notice: 'Your account was deleted.' } })`.
        If `LoginPage` already shows a `location.state` notice (check the reset-password flow), reuse it. Otherwise add
        a small `role="status"` notice there (`data-testid="login-notice"`).
  - [x] errors:
    - `wrong-password` → under the password field
    - `invalid-two-factor-code` → under the code field
    - `429` / other → alert (`delete-account-error`)
- [x] **4.5.5** `AccountSecurityPage.tsx`: render `<DeleteAccountSection />` last, hidden for ADMIN.
- [x] **4.5.6** Tests:
  - [x] `accountApi.test.ts`: `deleteAccount` with and without a code
  - [x] `AuthContext.test.tsx`:
    - `deleteAccount` calls the API, then `clearAccountQuizProgress`, then `/me` → anonymous
    - a failing delete rethrows, keeps the user and doesn't clear progress
    - the default context value has a no-op `deleteAccount`
  - [x] `src/__tests__/account/DeleteAccountSection.test.tsx`:
    - the confirm form is hidden until opened
    - submit is disabled until the box is ticked
    - the code field is shown only with 2FA
    - success navigates to `/login` with the notice
    - `wrong-password` and `invalid-two-factor-code` errors land under their fields
    - Cancel closes the form
  - [x] `LoginPage.test.tsx`: a notice in `location.state` is shown
  - [x] `AccountSecurityPage.test.tsx`: the section is shown for USER and hidden for ADMIN
- [x] **4.5.7** `npm --prefix frontend run test:run && npm --prefix frontend run build` → green.

### 4.6 E2E
- [x] **4.6.1** `mailpit-client.ts`: `ACCOUNT_DELETED_SUBJECT`.
- [x] **4.6.2** `account-api.steps.ts`:
  - `When I delete my account with password {string}`
  - `When I delete my account with password {string} and a valid two-factor code`, using `e2e/src/support/totp.ts`
  - `Then I should receive an account deleted notice`
  - `When I register again with my old email`
- [x] **4.6.3** `e2e/features/account-api/delete-account.feature` (`@api`):
  - [x] delete → 204; my profile → 401; logging in → 401; the notice arrives; registering the same email again → 202
  - [x] wrong password → 400; my profile still → 200
  - [x] a 2FA user without a code → 400; with a valid code → 204. Reuse the 2FA steps from `two-factor-api.steps.ts`
        to turn 2FA on.
  - [x] the admin → 403 (`Given I am logged in as the admin`)
- [x] **4.6.4** `account-ui.steps.ts`:
  - `When I delete my account through the form with password {string}`
  - `Then I should see the account deleted notice`
- [x] **4.6.5** `account-settings.feature`: a new user deletes the account through the form → lands on `/login` with the
      notice; the navigation shows "Log in"; logging in through the form with the old credentials shows an auth error.
- [x] **4.6.6** `npm --prefix e2e run test:api` → green.

### 4.7 Verify and commit
- [x] **4.7.1** `make clean build` → green. Backend 668 tests, e2e 138 scenarios.
      Note: `AccountSecurityPage` redirects an anonymous visitor to `/login` on its own, which dropped the notice; the page
      now gets `onDeletingChange` from `DeleteAccountSection` and passes the notice in that redirect.
- [x] **4.7.2** Ask for commit approval → `feat: let users delete their account`

---

## Phase 5 — Abuse protection: breached-password check (HIBP)

### 5.1 Config
- [x] **5.1.1** `config/PasswordBreachCheckProperties.java`: `@ConfigurationProperties("phrasal.password.breach-check")`,
      `record PasswordBreachCheckProperties(boolean enabled, Duration timeout)`. In `application.yml`:
  ```yaml
  phrasal:
    password:
      breach-check:
        enabled: ${PASSWORD_BREACH_CHECK_ENABLED:true}
        timeout: ${PASSWORD_BREACH_CHECK_TIMEOUT:2s}
  ```
- [x] **5.1.2** `application-test.yml`: `phrasal.password.breach-check.enabled: false`.
- [x] **5.1.3** `docker-compose.yml` → `backend.environment`: `PASSWORD_BREACH_CHECK_ENABLED: "false"`, with the comment
      `# e2e must not depend on api.pwnedpasswords.com`.

### 5.2 Checker
- [x] **5.2.1** `infrastructure/security/BreachedPasswordChecker.java` (`@Component @Slf4j`):
  - [x] the constructor takes `PasswordBreachCheckProperties` and a `RestClient.Builder`. It builds a **private**
        `HaveIBeenPwnedRestApiPasswordChecker` on a `RestClient` with connect and read timeouts = `timeout`, using the
        API from 0.5.
  - [x] a package-private constructor that takes a `CompromisedPasswordChecker`, for unit tests
  - [x] `boolean isBreached(String password)`:
    - `enabled == false` → `false`, with no HTTP call
    - otherwise `delegate.check(password).isCompromised()`
    - any `RuntimeException` → `log.warn("Breached-password check unavailable: {}", ex.getClass().getSimpleName())`
      and `false` (fail open; never log the password)
  - [x] Javadoc:
    - only 5 characters of the SHA-1 prefix leave the server
    - **never** register a `CompromisedPasswordChecker` bean, because Spring Security would check every login
- [x] **5.2.2** `application/validation/PasswordPolicy`, or a small `application/service/PasswordBreachGuard`
      (`@Component`): `void requireNotBreached(String password, String field)` → throws
      `PasswordPolicyViolationException(field, BREACHED)`, where
      `BREACHED = "This password has appeared in a data breach. Choose a different one."`.
      Keep `PasswordPolicy` free of Spring.
- [x] **5.2.3** `grep -rn "CompromisedPasswordChecker" backend/src/main` → only inside `BreachedPasswordChecker`.

### 5.3 Call sites
- [x] **5.3.1** `AuthService#register`: call `requireNotBreached(request.password(), "password")` **first**, before
      looking up the email. All three branches (new, unverified, verified) then answer the same way.
- [x] **5.3.2** `PasswordResetService#reset`: right after `PasswordPolicy.violation(…)`. The token stays unused if the
      check rejects the password.
- [x] **5.3.3** `AccountService#changePassword`: after the "same as current" check, with field `newPassword`.

### 5.4 Tests
- [x] **5.4.1** `BreachedPasswordCheckerTest` (a Mockito `CompromisedPasswordChecker`):
  - compromised → `true`
  - clean → `false`
  - the delegate throws `RestClientException` → `false`, and nothing propagates
  - disabled → `false`, and the delegate is never called
- [x] **5.4.2** `BreachedPasswordCheckerTimeoutTest`: a local stub server (JDK `HttpServer` on port 0) that answers after
      `timeout + 1s`. Point the checker at it, if the delegate allows a custom base URL; otherwise skip this test and
      write down why. It must return `false` within ~timeout.
- [x] **5.4.3** Service unit tests: `AuthServiceTest`, `PasswordResetServiceTest` and `AccountServiceTest` each get a
      "breached → `PasswordPolicyViolationException`, nothing saved" case. Register: also check that the verified-account
      branch rejects a breached password the same way.
- [x] **5.4.4** `integration/BreachedPasswordIntegrationTest` with `@MockitoBean BreachedPasswordChecker`. This is one
      extra context, and it keeps every breach scenario in this class.
  - [x] register with a "breached" password → `400`, `$.errors.password` contains `data breach`, no mail
  - [x] reset with a "breached" password → `400`; the same link then works with a clean password → `204`
  - [x] change password with a "breached" new password → `400`, `$.errors.newPassword`
  - [x] the checker answers "clean" → register `202` (positive control)
- [x] **5.4.5** `cd backend && mvn clean verify` → green.

### 5.5 Frontend
- [x] **5.5.1** No new code is expected: `RegisterPage`, `ResetPasswordPage` and `ChangePasswordForm` already show
      `errors.password` / `errors.newPassword` under the field. Check it with one test per form: a `400` with
      `errors.password: "This password has appeared in a data breach…"` is shown under the field.
- [x] **5.5.2** `PasswordRequirements`: add a line "Not found in known data breaches (checked when you save)", and
      update `PasswordRequirements.test.tsx`.

### 5.6 E2E
- [x] **5.6.1** None: compose turns the check off on purpose (decision 8). Integration tests with a mocked checker cover
      task-100 AC #4. The prod smoke check in Phase 11 covers the real service.

### 5.7 Verify and commit
- [x] **5.7.1** `make clean build` → green. Backend 687 tests, frontend 1650 tests, e2e 138 scenarios.
      Notes: `BreachedPasswordChecker` needed `@Autowired` on its public constructor (it has a second, package-private one).
      The 5.4.2 stub server works, because `setRestClient` accepts a client with another base URL; `forRangeUrl` is the
      test factory. 5.5.2 is a plain line, not a rule, because only the server can know the answer.
- [x] **5.7.2** Ask for commit approval → `feat(backend): reject passwords found in known data breaches`

---

## Phase 6 — Abuse protection: honeypot on register

### 6.1 Backend
- [x] **6.1.1** `RegisterRequest`:
  - add the component `@Size(max = 200) String website`, with Javadoc "honeypot; people never see or fill it"
  - add a 2-argument constructor `(email, password)` → `this(email, password, null)`, so existing callers and tests
    don't change
  - `boolean honeypotFilled()` → `website != null && !website.isBlank()`
  - `toString()` → `website=<filled|empty>`, never the value
- [x] **6.1.2** `AuthService#register`: as the **first** statement, `if (request.honeypotFilled())`:
  - `log.info("Registration ignored: honeypot field filled")` (no email)
  - return without touching the DB, the encoder or mail
  - The controller's rate limits still run before it, unchanged.
- [x] **6.1.3** Tests:
  - [x] `AuthServiceTest`: honeypot filled → no repository, encoder or event calls; blank `website` → the normal path
  - [x] `AuthRegisterIntegrationTest`:
    - `website: "http://spam"` → `202` with the **same** body as a normal register; no `users` row; no mail
    - `website: ""` → a normal registration
    - `website` longer than 200 characters → `400`
  - [x] a unit test for the 2-argument constructor and `toString()`

### 6.2 Frontend
- [x] **6.2.1** `authApi.register(email, password, website = '')`: send `website` in the body.
      `AuthContext.register` passes it through.
- [x] **6.2.2** `RegisterPage.tsx`: a honeypot block:
  ```tsx
  <div aria-hidden="true" className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden">
    <label htmlFor="register-website">Website</label>
    <input id="register-website" name="website" type="text" tabIndex={-1} autoComplete="off"
           data-testid="register-website" value={website} onChange={…} />
  </div>
  ```
  The value goes to `register()`. Keep `display:none` and the `hidden` class out of it.
- [x] **6.2.3** Tests:
  - [x] `RegisterPage.test.tsx`:
    - the field has `tabIndex=-1`, `autoComplete="off"` and an `aria-hidden` wrapper
    - a normal submit sends `website: ''`
    - filling it sends the value
  - [x] `authApi.test.ts` / `AuthContext.test.tsx`: `website` is passed through

### 6.3 E2E
- [x] **6.3.1** `auth-api.steps.ts`: `When I register with a new email and the honeypot field filled`.
- [x] **6.3.2** `e2e/features/auth-api/abuse-protection.feature` (`@api`):
  - [x] honeypot → 202 with the check-inbox message; no verification email arrives for that address; logging in with
        those credentials → 401
- [x] **6.3.3** No browser scenario: Playwright counts an off-screen 1 px element as visible, so the Vitest checks in
      6.2.3 cover the UI part.

### 6.4 Verify and commit
- [x] **6.4.1** `make clean build` → green.
- [x] **6.4.2** Ask for commit approval → `feat: add a honeypot field to registration`

---

## Phase 7 — Abuse protection: rate-limit logging, client IP, limits review

### 7.1 Log every 429
- [x] **7.1.1** `RateLimiter#check`: right before throwing `RateLimitExceededException`:
  - `*-per-ip` rules → `log.warn("Rate limit exceeded rule={} clientIp={}", ruleName, key)`
  - every other rule → `log.warn("Rate limit exceeded rule={}", ruleName)`. Never the email or the user id.
  - Put the suffix in a constant: `private static final String PER_IP_SUFFIX = "-per-ip";`
- [x] **7.1.2** `RateLimiterTest`, using a Logback `ListAppender` or the pattern existing tests already use:
  - an IP rule logs the IP
  - an email rule doesn't log the email
  - no log line while under the limit

### 7.2 Review the limits
- [x] **7.2.1** Make a table of every endpoint that checks a secret or sends mail, and confirm each one has a limit.
      Fix any gap you find in this phase.

  | Endpoint | Rules |
  |---|---|
  | `POST /auth/register` | `register-per-ip`, `register-per-email` (+ honeypot) |
  | `POST /auth/login` | `login-per-ip`, `login-per-email` |
  | `POST /auth/login/2fa` | `two-factor-per-ip`, `two-factor-per-user` |
  | `POST /auth/verify-email` | `verify-per-ip` |
  | `POST /auth/resend-verification` | `resend-per-ip`, `resend-per-email` |
  | `POST /auth/forgot-password` | `forgot-per-ip`, `forgot-per-email` |
  | `POST /auth/reset-password` | `reset-per-ip` |
  | `POST /auth/confirm-email-change` | `verify-per-ip` (new) |
  | `POST /me/2fa/setup` | `login-per-email` (unchanged) |
  | `POST /me/2fa/confirm`, `/disable`, `/recovery-codes` | `two-factor-per-user` |
  | `POST /me/password`, `/me/email`, `/me/delete` | `reauth-per-user` (new) |
  | `POST /me/email` | + `email-change-per-email` (new) |

- [x] **7.2.2** Check that the docker-compose overrides (`RATE_LIMIT_LOGIN_PER_EMAIL=10`, `RATE_LIMIT_TWO_FACTOR_PER_IP`
      and the other `1000` values) don't hide the new e2e `429` scenario. `RATE_LIMIT_REAUTH_PER_USER` keeps its
      default of 5 in compose.

### 7.3 E2E
- [x] **7.3.1** `account-api.steps.ts`: `When I try to change my password with a wrong current password {int} times`.
- [x] **7.3.2** `abuse-protection.feature`: a new user makes 6 wrong attempts → the 6th answers 429. The bucket is keyed
      by the user id, so runs don't collide.
- [x] **7.3.3** `npm --prefix e2e run test:api` → green.

### 7.4 Client IP behind Traefik (task-100 AC #8)
- [x] **7.4.1** Check that `ansible/roles/k3s/templates/traefik-config.yaml.j2` (`externalTrafficPolicy: Local`) and the
      `ansible/README.md` check command are still correct. No change is expected.
- [x] **7.4.2** `ansible/README.md`: add how to **prove** it after a deploy. Run it from your own machine, with the
      user's approval for prod:
  ```bash
  for i in $(seq 1 7); do curl -s -o /dev/null -w '%{http_code}\n' -X POST https://phrasalbox.com/api/v1/auth/forgot-password \
    -H 'Content-Type: application/json' -H "X-XSRF-TOKEN: <token>" -b "XSRF-TOKEN=<token>" -d '{"email":"<test address>"}'; done
  kubectl logs deploy/backend | grep "Rate limit exceeded rule=forgot-per-ip"   # clientIp must be your public IP
  ```
  Use an address you own; the per-email limit (3/h) is reached first, and that is fine.
- [ ] **7.4.3** The real prod check is a Phase 11 item.

### 7.5 Verify and commit
- [x] **7.5.1** `make clean build` → green.
- [x] **7.5.2** Ask for commit approval → `feat(backend): log rate-limit hits with the client IP`

---

## Phase 8 — Config wiring check (compose, k8s, CI)

Most wiring happened inside the feature phases. This phase confirms that nothing was missed (delivery checklist items
1 and 3).

- [x] **8.1** `docker-compose.yml` has `PASSWORD_BREACH_CHECK_ENABLED: "false"` (5.1.3). No other new variable is needed:
      `RATE_LIMIT_REAUTH_PER_USER`, `RATE_LIMIT_EMAIL_CHANGE_PER_EMAIL` and `EMAIL_CHANGE_TOKEN_TTL` keep their
      `application.yml` defaults.
- [x] **8.2** `k8s/base` and `k8s/overlays/prod`: nothing is needed. The defaults are the prod values, the same as
      `PASSWORD_RESET_TOKEN_TTL` and the other rate limits, which aren't in k8s either. Confirm with
      `grep -rn "RATE_LIMIT\|TOKEN_TTL\|BREACH" k8s`.
  - [x] if a NetworkPolicy ever restricts egress, `api.pwnedpasswords.com:443` must be allowed. Today there is none;
        confirm with `grep -rn "kind: NetworkPolicy" k8s`.
- [x] **8.3** `kubectl kustomize k8s/overlays/dev` and `kubectl kustomize k8s/overlays/prod` both still render. For prod,
      copy the example secret patch to `secret.yaml` locally, then delete the copy.
- [x] **8.4** `.github/workflows/ci_cd.yml`: no new secrets and no new e2e env. The e2e job uses compose, so the breach
      check is off there. Write this conclusion in the commit body or in the task notes, not in code.
- [x] **8.5** `skaffold.yaml`, `frontend/nginx.conf`, `vite.config.ts`: no change; `/api` is still proxied same-origin.
- [x] **8.6** If anything changed in 8.1–8.5: `make clean build`, then ask for commit approval →
      `build: wire account settings config`. If nothing changed, skip the commit.

---

## Phase 9 — Docs, diagrams, backlog

- [x] **9.1** `../../../../README.md`:
  - [x] a new section "Account settings":
    - the endpoint table from decision 1, with status codes
    - which actions need the password, and which also need a 2FA code
    - what happens to sessions after each action
    - the emails each action sends
    - the email-change flow: link to the new address, the `202` that doesn't reveal accounts, everyone logged out,
      the authenticator label stays the old email
    - the admin restriction and why
  - [x] the rate-limit table: new rows `RATE_LIMIT_REAUTH_PER_USER` (5 / 15 min) and
        `RATE_LIMIT_EMAIL_CHANGE_PER_EMAIL` (3 / h); a note that `confirm-email-change` uses `verify-per-ip`
  - [x] the config table: `EMAIL_CHANGE_TOKEN_TTL` (1h), `PASSWORD_BREACH_CHECK_ENABLED` (true; false in compose),
        `PASSWORD_BREACH_CHECK_TIMEOUT` (2s)
  - [x] the password policy: the breach check runs only on register, reset and change; it fails open; the k-anonymity
        privacy note
  - [x] the honeypot (one line)
  - [x] GDPR: what deletion removes, plus the backup-retention warning from the top of this file
  - [x] "Production monitoring": add `kubectl logs deploy/backend | grep "Rate limit exceeded"` and
        `grep "Breached-password check unavailable"`
- [x] **9.2** `../../../../backend/CLAUDE.md`:
  - [x] Security rule order: add `confirm-email-change` to the public `POST` list
  - [x] the rate-limit list: `reauth-per-user`, `email-change-per-email`
  - [x] a new section "Account Management":
    - `AccountController` (`/api/v1/me/password|email|delete`), `AccountService`, `EmailChangeService`, `AccountChecks`
    - `FieldValidationException`
    - the ADMIN rule
    - the session rules: change password → rotate + `revokeOthers` with the pre-refresh id; email change →
      `revokeAll(oldEmail)`; delete → `revokeAll` + logout handler
    - `TokenType.EMAIL_CHANGE` + V16 `new_email`
    - never log the new address at INFO
  - [x] a new section "Password breach check": `BreachedPasswordChecker`, the "no `CompromisedPasswordChecker` bean"
        rule, fail-open, test profile off, `@MockitoBean` in `BreachedPasswordIntegrationTest`
  - [x] the honeypot (`RegisterRequest.website`, `honeypotFilled()`)
  - [x] test helpers: `requestEmailChange`, `confirmEmailChange`, `awaitEmailChangeToken`,
        `AccountRateLimitIntegrationTest`
- [x] **9.3** `../../../../frontend/CLAUDE.md`:
  - `accountApi.ts`
  - `AuthContext.deleteAccount`
  - `components/account/*`
  - `ConfirmEmailChangePage`
  - the honeypot input on Register
  - the new problem types
  - the `LoginPage` notice through `location.state`
- [x] **9.4** `../../../../e2e/CLAUDE.md`:
  - `features/account-api/*`, `frontend/account-settings.feature`, `auth-api/abuse-protection.feature`
  - `account-api.steps.ts`, `account-ui.steps.ts`
  - the new Mailpit helpers and subjects
  - `world.newEmail`
  - "a changed address must come from `uniqueEmail()`"
- [x] **9.5** `../../../../ansible/README.md`: the client-IP proof from 7.4.2.
- [x] **9.6** Diagrams (blackbox policy):
  - [x] create `../../../../docs/diagrams/account-management-flow.md` with Mermaid diagrams:
    - a sequence diagram: change password (rate limit → password → policy + breach → hash → rotate the session id →
      `revokeOthers` → notice)
    - a sequence diagram: change email (request → token with `new_email` → link to the new address → confirm → switch
      → `revokeAll(old)` → notice to the old address), including the "address taken" branch
    - a sequence diagram: delete account (password → code if 2FA → delete + cascade → `revokeAll` → logout handler →
      goodbye mail)
    - a flowchart: what is refused, and with which status
  - [x] update `auth-flow.md`: endpoint list, links to the new diagram, the honeypot and breach check on register
  - [x] update `password-reset-flow.md`: the breach-check step
  - [x] update `email-verification-flow.md`: the honeypot branch on register, and the reworded "account exists" notice
- [x] **9.7** Plan file `.claude/docs/blackbox/plans/2026-10-26 18:10 Multi-user …md`: append a `## Mutations Log` row
      (add only; never delete anything in that folder):
      `| <date> | split | P3 rest + account screens of P7 done as task-100 + new task: change password/email added (not in the plan); POST /me/delete instead of DELETE /account; email change via link to the new address (V16 user_tokens.new_email); admin accounts excluded; HIBP fails open, off in compose | Complete account self-service before public launch |`
- [x] **9.8** Backlog (MCP):
  - [x] task-100: check off AC #4, #5, #6, #7, #8 (code side; the prod proof follows in Phase 11), #9, #11 and #12 as
        they get done. Add implementation notes and a final summary. AC #1–#3 and #10 stay tracked in task-108.
  - [x] TASK-109 (the new task): check off its AC and add notes
  - [x] task-103: note that account deletion (the rest of AC #4) is done; check AC #6 and #13 for the new screens
  - [ ] **ask the user** before moving any task to `Done`
- [ ] **9.9** Commit approval → `docs: document account settings and abuse protection`
- [ ] **9.10** On the session's exit signal: append the blackbox `session-log.md` entry (format in
      `../../../rules/blackbox-policy.md`, under 20 lines, no secrets, no passwords, tokens or codes).

---

## Phase 10 — Final verification

- [x] **10.1** `make clean build` → green. Counts (2026-10-30): backend 696 tests, frontend 1654 tests in 86 files, e2e 140 scenarios / 1101 steps.
- [ ] **10.2** Manual run with `docker compose up -d --build --wait`, at http://localhost:3100 (Mailpit
      http://localhost:8025):
  - [ ] register + verify a test user; open Account security → three new sections are visible
  - [ ] change the password → status message; a second browser that was logged in is logged out; log in again with
        the new password
  - [ ] change the email → the link arrives in Mailpit at the new address → open it → "changed"; the old address got
        the notice; log in with the new email
  - [ ] turn 2FA on, then delete the account with the password + a code → `/login` with the notice; the account can't
        log in; the goodbye mail is in Mailpit
  - [ ] log in as the dev admin (with 2FA) → Account security shows the "managed through configuration" note and no
        password, email or delete sections
  - [ ] 6 wrong current passwords → a readable "too many attempts" message
  - [ ] `docker compose logs backend | grep "Rate limit exceeded"` shows the rule, and the IP only for IP rules
  - [ ] `docker compose logs backend | grep -iE "password=|token=|newEmail="` shows no secrets
- [ ] **10.3** Optional reviews before merging, only if the user asks:
  - [ ] `api-contract-review` on `/api/v1/me/password|email|delete` and `/api/v1/auth/confirm-email-change`
  - [ ] `java-code-review` on `AccountService`, `EmailChangeService`, `BreachedPasswordChecker`
  - [ ] `/security-review`
  - [ ] `/code-review`
- [ ] **10.4** Open the PR `account-settings` → base branch chosen by the user, after the user approves.

---

## Phase 11 — Production rollout (user actions; every `kubectl` step needs the user's approval)

- [ ] **11.1** Before the release:
  - [ ] no new GitHub Secret is needed. The task-101 secret `TOTP_ENCRYPTION_KEY` must exist anyway, otherwise the
        deploy fails (see `2FA-todos.md` Phase 14).
  - [ ] release notes: "Users can change their password and email and delete their account; registration and password
        changes reject passwords found in data breaches."
  - [ ] decide on a manual `pg_dump` before the deploy. V16 is additive.
- [ ] **11.2** After the deploy:
  - [ ] `kubectl logs deploy/backend` shows a clean start and Flyway V16 applied; `/actuator/health` is UP
  - [ ] `kubectl logs deploy/backend | grep -c "Breached-password check unavailable"` → `0` after a test registration.
        Egress to HIBP works.
- [ ] **11.3** Smoke test with a throwaway account on https://phrasalbox.com:
  - [ ] register with a known-breached password that isn't in the local blocklist → the "data breach" error shows
  - [ ] change the password, change the email (the link arrives in a real inbox, not spam), delete the account (the
        goodbye mail arrives)
- [ ] **11.4** Client-IP proof (task-100 AC #8): run 7.4.2 from your own machine → the log line shows your public IP,
      not a `10.42.x.x` pod address.
- [ ] **11.5** Log leak check: `kubectl logs deploy/backend | grep -ciE "newPassword|currentPassword|token=[A-Za-z0-9_-]{20}"`
      → `0`.

---

## Coverage map

### task-100 AC → where it's covered

| AC | Covered by |
|---|---|
| #1–#3, #10 password reset | done in task-108 |
| #4 breached passwords rejected on register + reset; fail open | Phase 5 (5.3, 5.4), prod 11.3 |
| #5 429 limits on register, login, forgot, 2FA step | done earlier (task-99/108/101); reviewed in 7.2; new limits in 1.4, 2.3.4, 3.5.4, 4.4.3, 7.3 |
| #6 honeypot ignored silently | Phase 6 |
| #7 delete account with password; data removed | Phase 4 |
| #8 real client IP in logs, codified in Ansible | Ansible done (multiuser 10.7 a); log line 7.1; proof 7.4, 11.4 |
| #9 unit + integration tests | 2.3, 3.5, 4.4, 5.4, 6.1.3, 7.1.2 |
| #11 docs (rate limits, password policy, Traefik) | 9.1, 9.2, 9.5 |
| #12 `make clean build` | every phase; 10.1 |

### TASK-109 "change password and email" AC → where it's covered

| AC | Covered by |
|---|---|
| change password, other sessions closed, notice | Phase 2 |
| change email via link, no account enumeration, sessions closed, notice | Phase 3 |
| shared per-user rate limit | 1.4, 2.3.4, 3.5.4, 7.3 |
| admin refused with 403 | 1.2, 2.3.3, 3.5.3, 4.4.2 |
| unit, integration, Vitest, e2e tests | 2.3–2.5, 3.5–3.7 |
| README + CLAUDE.md | Phase 9 |
| `make clean build` | 2.6, 3.8, 10.1 |

### task-103 AC → where it's covered (this file's part only)

| AC | Covered by |
|---|---|
| #4 delete account with password confirmation | 4.5 |
| #6 readable backend errors (incl. 429) on the new forms | 2.4.3, 3.6.3, 4.5.4 |
| #12 frontend/CLAUDE.md + README | 9.1, 9.3 |
| #13 Vitest for the new pages, components and API | 2.4.5, 3.6.7, 4.5.6, 6.2.3 |
| #15 `make clean build` | 10.1 |
