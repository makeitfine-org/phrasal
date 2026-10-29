# Multi-user: authenticator-app 2FA (TOTP) with recovery codes — implementation TODOs

Source plan: `.claude/docs/blackbox/plans/2026-10-26 18:10 Multi-user accounts TOTP 2FA and reliable storage for phrasal.md`
(section P4, plus the 2FA screens from P7).
Backlog: **task-101** (all AC), the 2FA part of **task-103** (AC #2, #4 without account deletion, #5, #6, #13, #14),
and the "2FA step" part of **task-100** AC #5 (rate limit).
Templates: `multiuser-todos.md`, `email-verification-on-server-multiuser-todos.md`, `reset-password-todos.md` (same folder).
This builds on:
- task-99: users, sessions in Postgres, CSRF, `SessionAuthenticator`, `AuthenticatedUser`, `RateLimiter`, `AuthContext`,
  Login/Register pages, `UserMenu`, `AdminAccountInitializer`
- task-107: `EmailSender` + Mailpit, after-commit `@Async` mail events, `AccountEmailComposer`/`AccountEmailListener`,
  `RecordingEmailSender`, `mailpit-client.ts`, the `Clock` bean
- task-108: `SessionRevoker`, `PasswordPolicy`, `ProblemDetailFactory` types, `problemTypes.ts`, `PasswordRequirements`

> Status: plan only. Nothing below is implemented yet.

---

## Scope

**In scope**
- Backend:
  - a new Flyway migration (`V15`): TOTP columns on `users`, a `user_recovery_codes` table
  - TOTP per RFC 6238 (SHA-1, 6 digits, 30 s), ±1 time step, replay protection
  - TOTP secrets encrypted at rest with AES-256-GCM; the key is a new secret env var `TOTP_ENCRYPTION_KEY`
  - 10 single-use recovery codes, stored hashed, shown once, and replaceable with a fresh set
  - enrollment: `GET /api/v1/me/2fa`, `POST /api/v1/me/2fa/setup`, `POST /api/v1/me/2fa/confirm`
  - management: `POST /api/v1/me/2fa/disable`, `POST /api/v1/me/2fa/recovery-codes`
  - two-step login: `POST /api/v1/auth/login` answers `202 {"twoFactorRequired": true}` for 2FA accounts, then
    `POST /api/v1/auth/login/2fa` takes a TOTP code or a recovery code
  - **admin rule**: ADMIN rights only in a session that passed the second factor; an admin without 2FA acts as a USER
  - rate limits on every code check
  - "2FA turned on / turned off" notice emails
- Frontend:
  - a code step after the password (`/login/2fa`)
  - an Account security page (`/account/security`): QR code + manual key, confirm, recovery codes (download/copy),
    regenerate, disable
  - an "Account security" entry in the user menu
  - an enrollment banner for admins without 2FA
- Tests: backend unit + integration, frontend Vitest, e2e API + browser scenarios (codes generated in the test).
- Wiring and docs: docker-compose, k8s base/prod, CI, README, CLAUDE.md files, a new `docs/diagrams/two-factor-flow.md`,
  an `auth-flow.md` update, backlog.

**Out of scope (deferred, still tracked by their backlog tasks)**

| Deferred item | Task |
|---|---|
| Google login passing through the same 2FA step (reuse `SessionAuthenticator#startTwoFactorChallenge`) | task-104 |
| Google-only accounts (no password) can't pass the password check of `setup`; revisit there | task-104 |
| Account deletion (recovery codes go with it through `ON DELETE CASCADE`) | task-100 |
| HIBP check, honeypot | task-100 |
| Change password while logged in | task-103 |
| Encryption key rotation (re-encrypt with a `v2:` key); the `v1:` prefix keeps it possible | — (not planned yet) |
| "Remember this device", passkeys/WebAuthn, SMS codes | — (not planned) |
| Mandatory 2FA for regular users | — (optional by decision) |
| Notice email when a recovery code is used to sign in | — (not planned) |

> **Warning:** task-98 (off-site backups) is still open. Without a backup *and* a copy of `TOTP_ENCRYPTION_KEY`, a lost
> volume or a lost key means every 2FA user needs a recovery code (or an admin SQL reset) to get back in.

---

## Design decisions

1. **Library: `com.eatthepath:java-otp:1.0.0` + `commons-codec` (Base32).**
   - Confirmed on Maven Central (`maven-metadata.xml`: latest/release 1.0.0, 2026-08-18). An earlier note here said it
     didn't exist; that came from a stale search index. 1.0.0 targets Java 8, has no runtime dependencies, and takes a
     `javax.crypto.SecretKey` (`SecretKeySpec(bytes, "HmacSHA1")` is one).
   - Alternative (Phase 0 asks): about 25 lines of hand-written HMAC-SHA1 with `javax.crypto.Mac`, tested against the same
     RFC vectors. That means no new dependency.
   - `commons-codec` is managed by the Boot BOM (Phase 0 confirms it), so it needs no version.
2. **TOTP is a pending-session state, not the Spring Security 7 MFA API**, as the plan says. Security 7 MFA has no TOTP
   factor and assumes redirects.
3. **Two-step login.**
   - Step 1, `POST /api/v1/auth/login`:
     - the password is checked first, then the email-verified check, exactly as today
     - account **without** 2FA → `200 UserResponse`, same as today
     - account **with** 2FA → `202 {"twoFactorRequired": true}`, and no security context is saved
   - The pending state lives in the HTTP session:
     - attributes `PENDING_2FA_USER_ID` (Long) and `PENDING_2FA_SINCE` (epoch millis, from the `Clock` bean)
     - it is valid for `phrasal.two-factor.login-timeout` = `${TWO_FACTOR_LOGIN_TIMEOUT:5m}`
   - At step 1, the **old session is invalidated** and a fresh one is created. Otherwise a session of another user who was
     logged in on this browser would stay alive while the 2FA user is only half logged in.
   - Step 2, `POST /api/v1/auth/login/2fa {"code": "…"}` (public, CSRF-protected):
     - pending state missing or expired → `401 two-factor-login-expired` ("Log in again")
     - wrong or used code → `400 invalid-two-factor-code`, and the pending state stays, so the user can retry
     - success → the pending attributes are removed, then `changeSessionId()`, then the full principal is saved
       → `200 UserResponse`
   - The `code` field accepts both kinds of code. Exactly 6 digits → TOTP; anything else → a recovery code (normalized
     first). The two formats can't collide.
4. **Session principal:** `AuthenticatedUser(Long id, String email, Role role, boolean twoFactorEnabled)`.
   - **Invariant:** a principal with `twoFactorEnabled = true` is only ever created by step 2, or by `confirm`, both of
     which check a code. So, in a session, `twoFactorEnabled` means "the second factor was checked in this session".
     Write this in the record Javadoc.
   - `authorities()`: `role == ADMIN && !twoFactorEnabled` → `ROLE_USER`, otherwise `ROLE_<role>`.
   - `twoFactorEnrollmentRequired()` = `role == ADMIN && !twoFactorEnabled`.
   - Serialization: keep `serialVersionUID = 1L`. A record that gains a component still reads old streams (the
     missing value becomes `false`). But the stored `UsernamePasswordAuthenticationToken` keeps its **own** serialized
     authority list, so old admin sessions would keep `ROLE_ADMIN`. That's why **V15 deletes every admin session**:
     admins log in once more after the deploy.
5. **Endpoint namespace: `/api/v1/me/2fa/*`.** The plan said `/account/2fa`. The change is because `/api/v1/me/**` is
   already the "any signed-in user" rule in `SecurityConfig` and holds the quiz progress, so no new security rule is
   needed. **Disable is `POST /api/v1/me/2fa/disable`**, not `DELETE` with a body: proxies and clients often drop
   `DELETE` bodies. Phase 0 asks the user to confirm.

   | Method + path | Body | Success | Notes |
   |---|---|---|---|
   | `GET /api/v1/me/2fa` | — | `200 {enabled, enabledAt, recoveryCodesRemaining}` | never returns the secret |
   | `POST /api/v1/me/2fa/setup` | `{password}` | `200 {secret, otpauthUri}` | already enabled → `409`; repeat → new secret |
   | `POST /api/v1/me/2fa/confirm` | `{code}` | `200 {recoveryCodes: [10]}` | TOTP only; no setup → `409` |
   | `POST /api/v1/me/2fa/recovery-codes` | `{code}` | `200 {recoveryCodes: [10]}` | TOTP or recovery code |
   | `POST /api/v1/me/2fa/disable` | `{code}` | `204` | TOTP or recovery code |
   | `POST /api/v1/auth/login/2fa` | `{code}` | `200 UserResponse` | TOTP or recovery code |

6. **`UserResponse` gains two fields:** `twoFactorEnabled` and `twoFactorEnrollmentRequired`, used by login, step 2 and
   `/me`. Both come from the principal, so there's still no DB call in `/me`. `role` stays the **account** role, so an
   unenrolled admin is `{"role": "ADMIN", "twoFactorEnrollmentRequired": true}`. The change is additive.
7. **Code checking.**
   - Accepted steps: current, current − 1, current + 1 (±30 s drift). Compare in constant time (`MessageDigest.isEqual`).
   - **Replay protection:** a step ≤ `users.totp_last_step` is rejected. The step is stored with one **conditional
     update**: `UPDATE users SET totp_last_step = :step WHERE id = :id AND (totp_last_step IS NULL OR totp_last_step < :step)`.
     Updated rows = 1 → accepted, 0 → replay. This is atomic, so two parallel requests with the same code can't both
     succeed.
8. **Secret storage.**
   - The secret is 20 random bytes (160 bits, RFC 4226 §4), shown as unpadded Base32 (32 characters).
   - It is stored as `v1:` + base64(iv[12] ‖ ciphertext ‖ tag[16]), using AES-256-GCM with a fresh IV per encryption.
     The AAD is `"user:" + userId`, so a ciphertext copied to another row doesn't decrypt.
   - Key: `phrasal.two-factor.encryption-key` = `${TOTP_ENCRYPTION_KEY:}`, base64 of exactly 32 bytes.
     **Missing or invalid → startup fails** (admin 2FA is mandatory, so the app can't work without it).
   - Decryption fails (wrong key or tampered row) → `log.error("TOTP secret cannot be decrypted userId={}")`, and the TOTP
     code is rejected (`400`). Recovery codes still work, because they don't need the key.
   - Generate a key with `openssl rand -base64 32`. **Keep a copy in the password manager.**
9. **Recovery codes.**
   - There are 10 codes. Each is 10 random bytes (80 bits), Base32, 16 characters, shown as `ABCD-EFGH-IJKL-MNOP`.
     80 bits makes unsalted SHA-256 safe even if the DB leaks (bcrypt isn't needed).
   - Before hashing, input is normalized: drop everything except `A–Z`/`2–7`, then upper-case. Lower case, spaces and
     dashes are therefore accepted.
   - Stored as SHA-256 hex in `user_recovery_codes`, with a unique index on `(user_id, code_hash)`.
   - **Single use** via a conditional update:
     `UPDATE user_recovery_codes SET used_at = :now WHERE user_id = :uid AND code_hash = :hash AND used_at IS NULL`.
   - Regenerating deletes every old code of the user and inserts 10 new ones in one transaction.
   - Codes appear only in the `confirm` / `recovery-codes` response body. They are never logged or emailed.
10. **Enrollment rules.**
    - `setup` needs the **current password**. Without it, a stolen session cookie could turn 2FA on and lock the real
      owner out (a password reset does not turn 2FA off). The password check shares the `login-per-email` rate-limit
      counter, so `setup` can't be used to guess passwords.
    - `setup` stores the encrypted secret with `totp_enabled_at = NULL`. 2FA is **not** active yet: login and the
      admin rule ignore it. Calling `setup` again replaces the pending secret.
    - `confirm` checks a TOTP code against the pending secret (recovery codes don't exist yet). It then:
      1. sets `totp_enabled_at` and `totp_last_step`
      2. creates the 10 codes
      3. **refreshes the session**: `changeSessionId()` plus a new principal with `twoFactorEnabled = true`, so an
         admin gets `ROLE_ADMIN` right away
      4. **revokes the user's other sessions** (they never passed a second factor)
      5. sends the "2FA turned on" notice
11. **Disable and regenerate** accept a TOTP code **or** a recovery code. A user who lost the phone logs in with a recovery
    code, disables 2FA and enrolls the new phone.
    - Disabling clears the secret, `totp_enabled_at` and `totp_last_step`, and deletes the recovery codes.
    - It also refreshes the session with `twoFactorEnabled = false`. An admin therefore drops to USER rights at once
      and sees the enrollment banner again. This is consistent with decision 4, so there's no special "admins can't
      disable" rule.
    - It sends the "2FA turned off" notice.
12. **Admin rule** (task-101 AC #7). Content writes keep the plain URL rule `hasRole("ADMIN")`. Only the authorities
    change (decision 4), and `/actuator/**` (ADMIN) follows the same rule.
13. **Errors** (all `application/problem+json`, `type` = `https://api.phrasal.net/errors/<type>`):

    | Status | `type` | When |
    |---|---|---|
    | 400 | `invalid-two-factor-code` | wrong, used or malformed code (`errors.code` is set too) |
    | 400 | `wrong-password` | `setup` with a wrong current password (`errors.password` is set too) |
    | 401 | `two-factor-login-expired` | step 2 without a pending state, or after the 5 min timeout |
    | 409 | `two-factor-already-enabled` | `setup` while 2FA is on |
    | 409 | `two-factor-setup-not-started` | `confirm` without a pending secret |
    | 409 | `two-factor-not-enabled` | `disable` / `recovery-codes` while 2FA is off |
    | 429 | `rate-limited` | existing handler, `Retry-After` header |

14. **Rate limits** (the existing in-memory `RateLimiter`, new rules in `RateLimitProperties`):

    | Rule | Default | Env | Used by |
    |---|---|---|---|
    | `two-factor-per-ip` (new) | 20 / 5 m | `RATE_LIMIT_TWO_FACTOR_PER_IP` | `login/2fa` |
    | `two-factor-per-user` (new) | 5 / 15 m | `RATE_LIMIT_TWO_FACTOR_PER_USER` | `login/2fa` (pending user id), `confirm`, `disable`, `recovery-codes` |
    | `login-per-email` (existing) | 5 / 5 m | — | also the password check of `setup` |

    - Every attempt counts, successful or not. There is no lockout, as in task-100.
    - With the password required first, 5 guesses per 15 min give about 0.14 % per day for a 6-digit code with ±1 step.
      That's accepted.
15. **Other flows keep 2FA untouched.**
    - A password reset keeps 2FA on and still revokes every session (test it).
    - `AdminAccountInitializer` re-applies the configured password only and never touches 2FA.
    - An admin who lost both the phone and the codes is reset with SQL (README runbook).
16. **Notice emails** reuse `AccountEmailComposer`/`AccountEmailListener`:
    - one event `TwoFactorChangedNoticeRequested(Long userId, String email, boolean enabled)`
    - subjects `Two-factor authentication is on for your Phrasal account` / `… is off …`
    - the body links to `${APP_BASE_URL}/account/security` and `/forgot-password` ("If this wasn't you…")
    - no secret or code in the mail
17. **Frontend.**
    - A new `components/twoFactor/` folder holds the setup and recovery-code parts.
    - The QR code is rendered client-side with `qrcode` (`toDataURL`) into an `<img>`. Vitest mocks it (jsdom has no
      canvas).
    - The recovery codes download as `phrasal-recovery-codes.txt` (Blob).
    - Pages: `LoginTwoFactorPage` (`/login/2fa`) and `AccountSecurityPage` (`/account/security`). Both use the same
      Tailwind + `dark:` style as `LoginPage`, and both work at 375 px.
    - Anonymous visitors on `/account/security` → `<Navigate to="/login" state={{ from }} />`.
18. **E2E strategy.**
    - Codes are generated with the `otpauth` npm package from the secret returned by `setup` (API) or shown on the page
      (browser).
    - Replay protection means one step can't be used twice. `totp.ts#nextAcceptedCode(secret, lastUsedStep)` uses the
      current step if it's newer, otherwise step + 1 (inside the ±1 window). Only if even that was used does it wait for
      the next step.
    - The compose DB volume survives `make clean build`, and so would the dev admin's 2FA. So `hooks.ts` resets the dev
      admin's 2FA in SQL in `BeforeAll` **and** `AfterAll`. Then a developer can still log in as the dev admin by hand
      after a test run.
19. **Logging.** Never log a secret, an otpauth URI, a TOTP code, a recovery code, the encryption key or a password.
    Log user ids:
    - `log.info("Two-factor enabled userId={}")` / `disabled` / `recovery codes regenerated`
    - `log.debug("Two-factor login challenge userId={}")`
    - `log.info("Logged in user id={} secondFactor={TOTP|RECOVERY_CODE}")`
20. **API compatibility.** Everything is additive, except that admins need 2FA for writes. That's a breaking change for
    any admin API script, so the Phase 7 commit uses `!` and the release notes say so.

---

## Conventions for every step

- Backend rules: `backend/CLAUDE.md`. Short version:
  - layers `domain → application → presentation`, with `infrastructure`/`config` cross-cutting
  - DTOs are records in `application/dto`; Lombok on entities/services; `@Service @Transactional @RequiredArgsConstructor @Slf4j`
  - Flyway: the next free number is **V15**. Never edit an applied migration.
- Checkstyle runs in `mvn verify`:
  - line length ≤ 120; **no magic numbers** (named constants: `SECRET_BYTES = 20`, `CODE_DIGITS = 6`, `IV_BYTES = 12`, …);
    no star imports; no `TODO` comments
  - blank line after a class/record/enum opening brace
  - Javadoc on a record needs `@param` per component; public method Javadoc needs `@param`/`@return`; no raw `<…>` in
    Javadoc
  - strict import order
  - quick check: `cd backend && mvn -q -o checkstyle:check@checkstyle-check`
- JaCoCo needs **≥ 85 % line coverage per package**. Touched packages: `domain.entity`, `domain.repository`, `config`,
  `application.service`, `application.dto`, `application.event`, `infrastructure.security`, `infrastructure.exception`,
  `presentation.rest`, `presentation.security`.
- Every test class has positive **and** negative cases.
  - Integration tests extend `AbstractIntegrationTest`, use a unique email per test, and keep the number of distinct
    Spring contexts low (a new context only for a `@TestPropertySource`).
  - Integration tests use the real clock. They take codes from `integration/support/TotpTestCodes`, which follows
    decision 18 (current step, else step + 1).
- Look up library APIs with **Context7** before writing java-otp, Spring Security, Spring Session, React Router,
  `qrcode`, `otpauth` or Playwright code.
- Run the narrowest command after each step, e.g. `cd backend && mvn -q test -Dtest=TotpVerifierTest` or
  `cd frontend && npx vitest run src/__tests__/AccountSecurityPage.test.tsx`.
- **Each phase ends with `make clean build` green** (foreground, `timeout 600000`, log to the scratchpad). It also runs
  e2e, so a phase that changes behaviour updates e2e in the same phase.
- **Commits:** one per phase. Ask the user for approval before each commit. Format `type(scope): description`,
  ≤ 80 characters, **no `Co-Authored-By` trailer**.
- Never paste secrets into `audit.md` or `session-log.md` (use `*****`). That includes `TOTP_ENCRYPTION_KEY`, TOTP
  secrets and recovery codes, even dev ones.

---

## Phase 0 — Preparation (no code)

- [x] **0.1** Branch: create `two-factor` from `develop`.
      Deviation: branched from `main` (2026-10-29). `develop` is an ancestor of `main`, and `main` additionally holds the
      plan commit `a6836d4`, which `develop` lacks. Merge `two-factor` into `develop` later as usual.
  - [x] check that `develop` contains the task-108 work: `git log --oneline develop | grep -i "reset passwords via emailed link"` — OK: `b1fef4d feat(backend): reset passwords via emailed link and revoke all sessions`
  - [x] the working tree is clean apart from blackbox files — only `audit.md` (blackbox) was modified
- [x] **0.2** Run `make clean build` once on the untouched branch. Note the baseline here: backend test count, Vitest
      files/tests, e2e scenarios/steps.
      (Last known: Vitest 71 files / 1532 tests, e2e 100 scenarios / 730 steps.)
      **Baseline (2026-10-29/30, `make clean build` green): backend 410 tests, Vitest 71 files / 1532 tests, e2e 100
      scenarios / 730 steps.**
- [x] **0.3** Backlog (MCP; the tools are deferred, load them with ToolSearch `select:`):
  - [x] move **task-101** to `In Progress` **before** any code; add the note "implementation plan: `2FA-todos.md`
        (branch `two-factor`)" — done 2026-10-29
  - [x] task-101 implementation note: the deviations from the plan (decisions 1, 5, 10, 11), so the AC wording stays
        valid — done
  - [x] task-103: note that the 2FA screens (AC #2, #4 without account deletion, #5) are planned here — done
  - [x] task-100: note that the "2FA step" part of AC #5 is planned here — done
- [x] **0.4** **Ask the user** to confirm, or change, these decisions. Write the answers here:
  - [x] (a) library: java-otp 0.4.0 + commons-codec (recommended), or hand-written HMAC-SHA1 (decision 1) → **java-otp 1.0.0** + commons-codec. The user pointed out that 1.0.0 exists; verified on Maven Central (`maven-metadata.xml`, released 2026-08-18). Decision 1 and 2.1.1 updated.
  - [x] (b) endpoints under `/api/v1/me/2fa/*` with `POST …/disable` (recommended), or the plan's `/api/v1/account/2fa` → **`/api/v1/me/2fa/*` + `POST …/disable`**
        + `DELETE` (decision 5)
  - [x] (c) `setup` asks for the current password (recommended) (decision 10) → **yes, the current password is required**
  - [x] (d) "2FA on/off" notice emails (recommended) (decision 16) → **yes, send notices**
- [x] **0.5** Look up and note the results here:
  - [x] java-otp (Context7 or the project README):
    - the `TimeBasedOneTimePasswordGenerator(Duration, int, String)` constructor
    - `generateOneTimePassword(Key, Instant)` → `int`
    - the `Key` type (`SecretKeySpec(bytes, "HmacSHA1")`)
    - the latest version on Maven Central (0.4.0 on 2026-10-29)
  - [x] `commons-codec` is in the Boot 4.1.2 BOM: `cd backend && mvn -q help:effective-pom | grep -A2 commons-codec`.
        Note whether `Base32#encodeToString` of 20 bytes gives 32 characters without `=` padding.
  - [x] the otpauth URI format (Google Authenticator "Key Uri Format"): label `Issuer:account`, URL-encoding of `@`
        and spaces, the parameters `secret`, `issuer`, `algorithm`, `digits`, `period`
  - [x] Spring Security 7:
    - `SecurityContextRepository#saveContext` after `changeSessionId()` (no change from today's login)
    - how to clear an old session before the pending state (`HttpSession#invalidate` then `getSession(true)`)
  - [x] Spring Data JPA: `@Modifying(clearAutomatically = true) @Query("UPDATE …")` returning `int` inside a
        `@Transactional` service
  - [x] `qrcode` (npm, 1.5.4 on 2026-10-29) + `@types/qrcode` (1.5.6): `QRCode.toDataURL(text, options)` → `Promise<string>`;
        the options for margin, size and error-correction level `M`
  - [x] `otpauth` (npm, 9.5.2 on 2026-10-29): `new TOTP({ secret: Secret.fromBase32(s), digits: 6, period: 30,
        algorithm: 'SHA1' }).generate({ timestamp })`
- [x] **0.6** `grep -rn "new RateLimitProperties(\|new AuthenticatedUser(\|new UserResponse(\|new AppUserDetails(" backend/src`
      and note the call sites. Phases 3–4 change these constructors.
- [x] **0.7** `grep -rn "logged in as the admin\|adminCredentials" e2e` and note the hits.
      (2026-10-29: only `crud.feature → Admin creates a phrasal verb`.) Phase 7 changes that step.
- **0.5 results**
  - java-otp **1.0.0** (Java 8 target, no runtime dependencies):
    `new TimeBasedOneTimePasswordGenerator(Duration, int, String)` throws `NoSuchAlgorithmException`
    (constants `DEFAULT_TIME_STEP`, `TOTP_ALGORITHM_HMAC_SHA1`).
    `generateOneTimePassword(SecretKey, Instant)` → `int`, `generateOneTimePasswordString(SecretKey, Instant)` →
    zero-padded `String`, `validateOneTimePassword(SecretKey, Instant, String)` → `boolean`; all throw
    `InvalidKeyException`. The key type is `javax.crypto.SecretKey` (`new SecretKeySpec(bytes, "HmacSHA1")` works).
    Use `generateOneTimePasswordString` and compare in constant time ourselves, since we need the matching step.
  - `commons-codec` **1.21.0** is managed by `spring-boot-dependencies:4.1.2` (`commons-codec.version`).
    `new Base32().encodeToString(new byte[20])` gives **32 characters, no `=` padding** (checked).
  - otpauth URI (the `otpauth` npm example): `otpauth://totp/ACME:Alice?issuer=ACME&secret=…&algorithm=SHA1&digits=6&period=30`.
    Backend builds the same, URL-encoding label and issuer (`@` → `%40`, space → `%20`).
  - Spring Security 7: after a programmatic login, build the `SecurityContext` and call
    `SecurityContextRepository#saveContext(context, request, response)` (same as today's login). `changeSessionId()`
    keeps attributes, so the pending-state flow invalidates the old session first (`HttpSession#invalidate`, then
    `request.getSession(true)`). Context7 doesn't show that second part; Phase 4 checks it with a test.
  - Spring Data JPA: `@Modifying(clearAutomatically = true) @Query(...)` returning `int` (standard; used in Phase 1).
  - `qrcode` npm **1.5.4**: `QRCode.toDataURL(text, { errorCorrectionLevel: 'M', margin: 2, width: 200 })` →
    `Promise<string>` (`width` is honored only if ≥ 21 and ≥ symbol + 2 × margin). `@types/qrcode` is checked in Phase 9.
  - `otpauth` npm **9.5.2**: `new TOTP({ secret: Secret.fromBase32(s), digits: 6, period: 30, algorithm: 'SHA1' })`;
    `generate({ timestamp })` takes **milliseconds** and returns a `string`.
- **0.6 results** (call sites to change in Phases 3–4):
  - `new UserResponse(`: `presentation/rest/AuthController.java:100`, `presentation/security/SessionAuthenticator.java:53`;
    tests `UserMapperTest:25`, `SessionAuthenticatorTest:63`
  - `new AuthenticatedUser(`: `infrastructure/security/AppUserDetails.java:20`; tests `AuthenticatedUserTest` (3),
    `SessionAuthenticatorTest:67`, `AppUserDetailsTest:32`
  - `new AppUserDetails(`: `JpaUserDetailsService:24`; tests `AppUserDetailsTest`, `SessionAuthenticatorTest:50`,
    `config/SecurityConfigAuthenticationTest:45`
  - `new RateLimitProperties(`: only `infrastructure/security/RateLimiterTest.java:26` (10 rules passed positionally)
- **0.7 results**: `crud.feature:28` (`Given I am logged in as the admin`) → `e2e/src/steps/auth-api.steps.ts:31` →
  `e2e/src/support/test-users.ts:9` `adminCredentials()`.
- [x] **0.8** Write down the RFC 6238 Appendix B SHA-1 vectors for Phase 2. The 6-digit code is the last 6 digits of the
      8-digit value, because both are `binary mod 10^digits`:
  - secret = ASCII `12345678901234567890`
  - `T = 59` → `94287082` → `287082`
  - `T = 1111111109` → `07081804` → `081804`
  - `T = 1111111111` → `14050471` → `050471`
  - `T = 1234567890` → `89005924` → `005924`
  - `T = 2000000000` → `69279037` → `279037`
  - `T = 20000000000` → `65353130` → `353130`

---

## Phase ordering: why every phase stays green

- Phases 1–2 add schema and building blocks that nothing calls yet.
- Phase 3 adds enrollment. Login doesn't ask for a code yet, so a 2FA user can still log in with the password alone.
  That's acceptable on a branch.
- Phase 4 closes that gap with the two-step login.
- Phase 5 adds disable/regenerate and the notices.
- Phase 6 covers the user flows over the API in e2e.
- Phase 7 turns on the admin rule and updates the e2e admin step **in the same phase**, so `crud.feature` stays green.
- Phases 8–10 add the UI and the browser e2e.

So `make clean build` passes after every phase. **Don't release from the branch before Phase 7 is done.**

---

## Phase 1 — Schema and domain (no behaviour change)

### 1.1 Migration
- [ ] **1.1.1** `backend/src/main/resources/db/migration/V15__add_user_two_factor.sql`:
  ```sql
  -- TOTP 2FA (task-101). The secret is AES-GCM encrypted by the backend; the key is not in the database.
  ALTER TABLE users
      ADD COLUMN totp_secret_enc VARCHAR(255),
      ADD COLUMN totp_enabled_at TIMESTAMP,
      ADD COLUMN totp_last_step  BIGINT,
      ADD CONSTRAINT chk_users_totp_enabled_has_secret
          CHECK (totp_enabled_at IS NULL OR totp_secret_enc IS NOT NULL);

  CREATE TABLE user_recovery_codes
  (
      id         BIGSERIAL PRIMARY KEY,
      user_id    BIGINT    NOT NULL REFERENCES users (id) ON DELETE CASCADE,
      code_hash  CHAR(64)  NOT NULL,
      used_at    TIMESTAMP,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
  );
  CREATE UNIQUE INDEX ux_user_recovery_codes_user_hash ON user_recovery_codes (user_id, code_hash);

  -- Admin sessions created before 2FA hold ROLE_ADMIN without a second factor: force a new login.
  DELETE FROM spring_session s USING users u WHERE s.principal_name = u.email AND u.role = 'ADMIN';
  ```
- [ ] **1.1.2** Check that `spring_session_attributes` rows go with the deleted sessions (`ON DELETE CASCADE` in V10:
      `SPRING_SESSION_ATTRIBUTES_FK`). No extra delete is needed.

### 1.2 Entity `User`
- [ ] **1.2.1** `domain/entity/User.java`, new fields:
  - [ ] `@Column(name = "totp_secret_enc", length = TOTP_SECRET_MAX_LENGTH) private String totpSecretEnc;`
  - [ ] `@Column(name = "totp_enabled_at") private LocalDateTime totpEnabledAt;`
  - [ ] `@Column(name = "totp_last_step") private Long totpLastStep;`
  - [ ] `@ToString(of = {"id", "email", "role"})` stays as it is: **the secret is never part of `toString`**
- [ ] **1.2.2** Domain methods (Javadoc with `@param`), no setters used by services for these fields:
  - [ ] `boolean isTwoFactorEnabled()` → `totpEnabledAt != null`
  - [ ] `void startTwoFactorSetup(String encryptedSecret)`: throws `IllegalStateException` if 2FA is already on; sets the
        secret, leaves `totpEnabledAt` null, resets `totpLastStep`
  - [ ] `void enableTwoFactor(LocalDateTime at, long step)`: throws if no pending secret or already on
  - [ ] `void disableTwoFactor()`: nulls all three fields (idempotent)
- [ ] **1.2.3** `domain/entity/UserEntityTest`, new cases:
  - [ ] a new user → `isTwoFactorEnabled()` false
  - [ ] `startTwoFactorSetup` → still false, secret stored
  - [ ] `enableTwoFactor` → true, step stored
  - [ ] negative: `enableTwoFactor` without setup → `IllegalStateException`
  - [ ] negative: `startTwoFactorSetup` while enabled → `IllegalStateException`
  - [ ] `disableTwoFactor` clears everything and can be called twice
  - [ ] `toString` doesn't contain the encrypted secret

### 1.3 Entity `RecoveryCode`
- [ ] **1.3.1** `domain/entity/RecoveryCode.java`:
  - [ ] table `user_recovery_codes`, sequence `user_recovery_codes_id_seq` (same style as `UserToken`)
  - [ ] `Long userId` (plain column like `UserToken`, no `@ManyToOne`), `String codeHash`, `LocalDateTime usedAt`,
        `@CreatedDate LocalDateTime createdAt`
  - [ ] constructor `RecoveryCode(Long userId, String codeHash)`
  - [ ] `@ToString(of = {"id", "userId", "usedAt"})`: **no hash**
- [ ] **1.3.2** `domain/repository/RecoveryCodeRepository.java`:
  - [ ] `long countByUserIdAndUsedAtIsNull(Long userId)`
  - [ ] `@Modifying @Query("DELETE FROM RecoveryCode r WHERE r.userId = :userId") int deleteAllByUserId(Long userId)`
  - [ ] `@Modifying @Query("UPDATE RecoveryCode r SET r.usedAt = :now WHERE r.userId = :userId AND r.codeHash = :hash AND r.usedAt IS NULL") int markUsed(...)`
        (decision 9)
- [ ] **1.3.3** `domain/repository/UserRepository.java`:
      `@Modifying @Query("UPDATE User u SET u.totpLastStep = :step WHERE u.id = :id AND (u.totpLastStep IS NULL OR u.totpLastStep < :step)") int advanceTotpStep(Long id, long step)`
      (decision 7). Use `clearAutomatically = true` so a later `findById` in the same transaction sees the new value.

### 1.4 Tests
- [ ] **1.4.1** `domain/entity/RecoveryCodeEntityTest`: constructor sets the fields; `toString` has no hash.
- [ ] **1.4.2** `integration/RecoveryCodeRepositoryIntegrationTest` (extends `AbstractIntegrationTest`, unique email):
  - [ ] save 3 codes → `countByUserIdAndUsedAtIsNull` = 3
  - [ ] `markUsed` → 1, then the same hash again → 0 (single use), and the count is 2
  - [ ] `markUsed` with another user's id → 0 (codes are per user)
  - [ ] `deleteAllByUserId` → 3, and another user's codes stay
  - [ ] negative: the same `(user_id, code_hash)` twice → `DataIntegrityViolationException`
  - [ ] deleting the user removes the codes (`ON DELETE CASCADE`)
- [ ] **1.4.3** `integration/UserRepositoryIntegrationTest`, new cases:
  - [ ] `advanceTotpStep(id, 100)` from null → 1; again with 100 → 0; with 99 → 0; with 101 → 1
  - [ ] negative: saving a user with `totp_enabled_at` set and no secret violates `chk_users_totp_enabled_has_secret`
        (set the fields with a native `JdbcTemplate` update, since the entity methods prevent it)
- [ ] **1.4.4** `cd backend && mvn -q test -Dtest='UserEntityTest,RecoveryCodeEntityTest,RecoveryCodeRepositoryIntegrationTest,UserRepositoryIntegrationTest'`.

### 1.5 Verify and commit
- [ ] **1.5.1** Local check of the admin-session delete in V15 (once, by hand):
  - [ ] before switching to this branch's build, log in as the dev admin at http://localhost:3000
  - [ ] after `make clean build` (the compose DB volume is kept), `SELECT count(*) FROM spring_session s JOIN users u
        ON s.principal_name = u.email WHERE u.role = 'ADMIN'` → `0`; a regular user's session is still there
- [ ] **1.5.2** `cd backend && mvn clean verify` → green, JaCoCo ≥ 85 % in `domain.*`.
- [ ] **1.5.3** `make clean build` → green. Ask for commit approval →
      `feat(backend): add TOTP columns and recovery code table`

---

## Phase 2 — Building blocks: encryption, TOTP, recovery codes, key wiring

### 2.1 Dependencies
- [ ] **2.1.1** `backend/pom.xml`:
  - [ ] `com.eatthepath:java-otp` with a `<java-otp.version>1.0.0</java-otp.version>` property (or nothing, if 0.4 (a)
        chose the hand-written version)
  - [ ] `commons-codec:commons-codec` without a version (BOM)
- [ ] **2.1.2** `cd backend && mvn -q dependency:tree -Dincludes=com.eatthepath,commons-codec` shows both, and java-otp
      pulls in nothing else.

### 2.2 Configuration
- [ ] **2.2.1** `config/TwoFactorProperties.java`:
      `@ConfigurationProperties("phrasal.two-factor") record TwoFactorProperties(String encryptionKey, String issuer, Duration loginTimeout)`,
      with Javadoc `@param`s. Override `toString()` to mask the key (`encryptionKey=*****`). Register it like
      `PasswordResetProperties`.
- [ ] **2.2.2** `application.yml`:
  ```yaml
  phrasal:
    two-factor:
      encryption-key: ${TOTP_ENCRYPTION_KEY:}
      issuer: ${TWO_FACTOR_ISSUER:Phrasal}
      login-timeout: ${TWO_FACTOR_LOGIN_TIMEOUT:5m}
  ```
- [ ] **2.2.3** `src/test/resources/application-test.yml`: `phrasal.two-factor.encryption-key: <a fixed test-only
      base64 key>`. Generate it with `openssl rand -base64 32`. Comment: `# test only, never used outside tests`.
- [ ] **2.2.4** `config/TwoFactorPropertiesTest`: `toString` doesn't contain the key.

### 2.3 `infrastructure/security/AesGcmEncryptor` (decision 8)
- [ ] **2.3.1** `@Component`. The constructor takes `TwoFactorProperties`:
  - [ ] blank key → `IllegalStateException("TOTP_ENCRYPTION_KEY is not set")`, so startup fails
  - [ ] not valid base64, or not exactly 32 bytes → `IllegalStateException("TOTP_ENCRYPTION_KEY must be 32 bytes, base64")`
  - [ ] the messages never contain the key value
- [ ] **2.3.2** `String encrypt(byte[] plaintext, String aad)`:
  - [ ] `AES/GCM/NoPadding`, 12-byte IV from one shared `SecureRandom`, 128-bit tag, `updateAAD(aad UTF-8)`
  - [ ] result `"v1:" + base64(iv ‖ ciphertext‖tag)`
- [ ] **2.3.3** `byte[] decrypt(String stored, String aad)`:
  - [ ] the prefix isn't `v1:` → `SecretDecryptionException`
  - [ ] wrong key, wrong AAD or a changed byte (`AEADBadTagException`) → `SecretDecryptionException`
- [ ] **2.3.4** `infrastructure/security/SecretDecryptionException` (`RuntimeException`), whose message has no secret.
- [ ] **2.3.5** `AesGcmEncryptorTest`:
  - [ ] round trip returns the same bytes
  - [ ] two encryptions of the same plaintext differ (fresh IV) and both decrypt
  - [ ] the output starts with `v1:` and doesn't contain the plaintext's Base32 or hex form
  - [ ] negative: wrong AAD (another user id) → exception
  - [ ] negative: one flipped ciphertext byte → exception
  - [ ] negative: decrypting with another key → exception
  - [ ] negative: an unknown prefix `v2:` → exception
  - [ ] negative: a blank, short (16-byte) or non-base64 key → `IllegalStateException`, message without the key

### 2.4 `infrastructure/security/TotpVerifier` (decision 7)
- [ ] **2.4.1** `@Component`, constants `TIME_STEP = Duration.ofSeconds(30)`, `CODE_DIGITS = 6`, `ALLOWED_DRIFT_STEPS = 1`.
- [ ] **2.4.2** `long stepAt(Instant now)` → `now.getEpochSecond() / 30`.
- [ ] **2.4.3** `String codeAt(byte[] secret, long step)`: java-otp (`HmacSHA1`), zero-padded to 6 digits
      (`generateOneTimePasswordString(SecretKey, Instant)` pads already; 1.0.0 API).
- [ ] **2.4.4** `OptionalLong matchingStep(byte[] secret, String code, Instant now)`:
  - [ ] the code isn't exactly 6 ASCII digits → empty, with no HMAC computed
  - [ ] tries steps `now − 1`, `now`, `now + 1`; compares with `MessageDigest.isEqual`; returns the matching step
  - [ ] doesn't know about replay: `TotpService` applies `advanceTotpStep` (decision 7)
- [ ] **2.4.5** `TotpVerifierTest`:
  - [ ] the 6 RFC 6238 vectors from 0.8 (secret = ASCII `12345678901234567890`), including the leading zeros
        `081804` and `005924`
  - [ ] drift: the code of step `s − 1` and of `s + 1` is accepted at step `s`; `s − 2` and `s + 2` are rejected
  - [ ] the returned step is the step that matched (not always "now")
  - [ ] negative: `"12345"`, `"1234567"`, `"12a456"`, `" 123456"`, `null` → empty
  - [ ] negative: a code from another secret → empty

### 2.5 Secret and recovery-code generators
- [ ] **2.5.1** `infrastructure/security/TwoFactorSecrets.java` (`@Component`, one shared `SecureRandom`):
  - [ ] `byte[] newSecret()` → 20 random bytes
  - [ ] `static String toBase32(byte[])` → commons-codec `Base32`, no padding, upper case
  - [ ] `String otpauthUri(String issuer, String email, String base32Secret)` →
        `otpauth://totp/{issuer}:{email}?secret=…&issuer=…&algorithm=SHA1&digits=6&period=30`. URL-encode the issuer
        and the email, with spaces as `%20`, not `+`.
- [ ] **2.5.2** `infrastructure/security/RecoveryCodes.java` (`@Component`):
  - [ ] constants `CODE_COUNT = 10`, `CODE_BYTES = 10`, `GROUP_LENGTH = 4`
  - [ ] `List<String> generate()` → 10 distinct codes `XXXX-XXXX-XXXX-XXXX`
  - [ ] `static String normalize(String input)` → strips everything except `A–Z`/`2–7` after upper-casing; `null` → `""`
  - [ ] `static String hash(String code)` → `SecureTokenGenerator.hash(normalize(code))` (reused, not copied)
  - [ ] `static boolean looksLikeTotp(String code)` → `code` matches `\d{6}` (decision 3)
- [ ] **2.5.3** Tests:
  - [ ] `TwoFactorSecretsTest`:
    - 20 bytes, and two calls differ
    - the Base32 is 32 characters `[A-Z2-7]`
    - the URI for `a b+c@x.test` encodes the space and `+`, contains `issuer=Phrasal`, `digits=6`, `period=30`
    - the URI's `secret` decodes back to the same bytes
  - [ ] `RecoveryCodesTest`:
    - 10 codes, all distinct, matching the format
    - `normalize(" abcd-efgh ijkl mnop ")` = `ABCDEFGHIJKLMNOP`
    - `hash` of a code equals `hash` of its lower-case, dash-free form
    - `looksLikeTotp`: `"123456"` true; `"12345"`, a recovery code and `null` false

### 2.6 Key wiring (needed now: the app doesn't start without the key)
- [ ] **2.6.1** `docker-compose.yml` → `backend.environment`:
      `TOTP_ENCRYPTION_KEY: ${TOTP_ENCRYPTION_KEY:-<dev-only base64 key>}`, with the comment `# DEV ONLY`.
      Use another `openssl rand -base64 32` value, not the test key.
- [ ] **2.6.2** `k8s/base/backend-secret.yaml`: `totp.encryption-key: <the same dev-only key>` (keep the DEV-ONLY
      comment).
- [ ] **2.6.3** `k8s/base/backend-deployment.yaml`: env `TOTP_ENCRYPTION_KEY` from `secretKeyRef app-secrets / totp.encryption-key`.
- [ ] **2.6.4** `k8s/overlays/prod/patches/secret.yaml.example`: `totp.encryption-key: CHANGE_ME`.
- [ ] **2.6.5** `.github/workflows/ci_cd.yml` → "Generate prod secret patch":
  - [ ] add `TOTP_ENCRYPTION_KEY: ${{ secrets.TOTP_ENCRYPTION_KEY }}` to `env` and
        `"  totp.encryption-key: \"${TOTP_ENCRYPTION_KEY}\""` to the `printf`
  - [ ] a guard before the `printf`: `test -n "$TOTP_ENCRYPTION_KEY" || { echo "::error::TOTP_ENCRYPTION_KEY secret is missing"; exit 1; }`,
        so a deploy without the secret fails in CI and not as a crash-looping pod
- [ ] **2.6.6** `kubectl kustomize k8s/overlays/dev`, and `k8s/overlays/prod` with the example patch copied to
      `secret.yaml` locally (then deleted), both render.
- [ ] **2.6.7** User action, written in the README in Phase 12: create the GitHub Secret `TOTP_ENCRYPTION_KEY` **before**
      the next tagged deploy and keep a copy in the password manager.

### 2.7 Verify and commit
- [ ] **2.7.1** `cd backend && mvn clean verify` → green.
- [ ] **2.7.2** `make clean build` → green (the compose backend starts with the dev key). Ask for commit approval →
      `feat(backend): add TOTP verifier, AES-GCM secret encryption and key config`

---

## Phase 3 — Enrollment API: status, setup, confirm

### 3.1 Principal and responses (decisions 4, 6)
- [ ] **3.1.1** `infrastructure/security/AuthenticatedUser.java`:
  - [ ] add the component `boolean twoFactorEnabled`; keep `serialVersionUID = 1L`
  - [ ] Javadoc `@param twoFactorEnabled`: write down the invariant from decision 4
  - [ ] `boolean twoFactorEnrollmentRequired()` → `role == Role.ADMIN && !twoFactorEnabled`
  - [ ] `AuthenticatedUser withTwoFactor(boolean enabled)`, used by `confirm` and `disable`
  - [ ] `authorities()` stays **unchanged** in this phase. Phase 7 changes it.
- [ ] **3.1.2** `AppUserDetails`: read `user.isTwoFactorEnabled()` into the principal. Update every `new AuthenticatedUser(`
      call site from 0.6.
- [ ] **3.1.3** `application/dto/UserResponse.java`: add `boolean twoFactorEnabled, boolean twoFactorEnrollmentRequired`
      (Javadoc `@param`s), plus a static `UserResponse from(AuthenticatedUser)`. Replace the three hand-built
      `new UserResponse(…)` calls (`AuthController#me`, `SessionAuthenticator#login`, any others from 0.6) with it.
- [ ] **3.1.4** Tests:
  - [ ] `AuthenticatedUserTest`:
    - `twoFactorEnrollmentRequired` for ADMIN/USER × on/off
    - `withTwoFactor` keeps id/email/role
    - serialize → deserialize gives an equal record
  - [ ] `AuthenticatedUserTest`: **deserializing a stream written by the old 3-component record** gives
        `twoFactorEnabled = false`. Build the bytes once with the old class, store them as a base64 test fixture, and
        explain in a comment why the test exists (existing sessions in `spring_session`).
  - [ ] `AppUserDetailsTest`: the 2FA flag is copied
  - [ ] `AuthSessionIntegrationTest` / `/me`: the response has `twoFactorEnabled: false` and
        `twoFactorEnrollmentRequired: false` for a user, and `true` for the bootstrapped admin
        (`AdminBootstrapIntegrationTest`)

### 3.2 DTOs
- [ ] **3.2.1** `application/dto/TwoFactorSetupRequest.java`: `@NotBlank @Size(max = 200) String password`. Mask it in
      `toString()`.
- [ ] **3.2.2** `application/dto/TwoFactorCodeRequest.java`: `@NotBlank @Size(max = 64) String code`. Mask it in
      `toString()`.
- [ ] **3.2.3** `application/dto/TwoFactorSetupResponse.java`: `record (String secret, String otpauthUri)`. `toString()`
      masks both.
- [ ] **3.2.4** `application/dto/RecoveryCodesResponse.java`: `record (List<String> recoveryCodes)`. `toString()` shows
      only the count.
- [ ] **3.2.5** `application/dto/TwoFactorStatusResponse.java`: `record (boolean enabled, LocalDateTime enabledAt, long recoveryCodesRemaining)`.
- [ ] **3.2.6** `application/dto/TwoFactorDtosTest` (or one test per record): every masking `toString` hides the
      secret, the code, the password and the codes; the record values round-trip.

### 3.3 Exceptions and handler (decision 13)
- [ ] **3.3.1** `infrastructure/exception/InvalidTwoFactorCodeException` (`RuntimeException`, message
      `Invalid or already used code`).
- [ ] **3.3.2** `infrastructure/exception/WrongPasswordException` (message `Current password is incorrect`).
- [ ] **3.3.3** `infrastructure/exception/TwoFactorStateException` with an enum `Reason { ALREADY_ENABLED,
      SETUP_NOT_STARTED, NOT_ENABLED }`. Each reason carries its `type` and detail text, so one handler serves all three.
- [ ] **3.3.4** `GlobalExceptionHandler`, before the catch-all, through `ProblemDetailFactory.build`:
  - [ ] `InvalidTwoFactorCodeException` → `400`, title `Invalid Code`, type `invalid-two-factor-code`,
        `errors: {code: "Invalid or already used code"}`
  - [ ] `WrongPasswordException` → `400`, title `Wrong Password`, type `wrong-password`, `errors: {password: …}`
  - [ ] `TwoFactorStateException` → `409`, title `Conflict`, type from the reason
- [ ] **3.3.5** `GlobalExceptionHandlerTest`: status, type, title and `errors` for each, plus each 409 reason.

### 3.4 Session refresh in `SessionAuthenticator`
- [ ] **3.4.1** Extract today's "save the principal" part of `login` into a private
      `UserResponse establish(AuthenticatedUser principal, HttpServletRequest, HttpServletResponse)`:
      `changeSessionId()` if a session exists → new context → `saveContext` → `UserResponse.from(principal)`.
      `login` calls it, so its behaviour doesn't change.
- [ ] **3.4.2** `public UserResponse refresh(AuthenticatedUser principal, HttpServletRequest, HttpServletResponse)` →
      `establish(...)`. Javadoc: "Replaces the principal of the current session, e.g. after 2FA was turned on or off".
- [ ] **3.4.3** `infrastructure/security/SessionRevoker`: add `int revokeOthers(String email, String keepSessionId)`.
      It's the same as `revokeAll`, but skips `keepSessionId`. `revokeAll` delegates with `null`.
- [ ] **3.4.4** Tests:
  - [ ] `SessionAuthenticatorTest`: `refresh` changes the session id and saves a context whose principal is the new record
  - [ ] `SessionRevokerTest`: `revokeOthers` keeps the given id and deletes the rest; `null` keeps nothing

### 3.5 Service: `application/service/TwoFactorService` (part 1)
- [ ] **3.5.1** `@Service @Transactional @RequiredArgsConstructor @Slf4j`. It injects `UserRepository`,
      `RecoveryCodeRepository`, `AesGcmEncryptor`, `TotpVerifier`, `TwoFactorSecrets`, `RecoveryCodes`,
      `PasswordEncoder`, `TwoFactorProperties`, `Clock`, `ApplicationEventPublisher`.
- [ ] **3.5.2** `TwoFactorStatusResponse status(Long userId)` (read-only transaction).
- [ ] **3.5.3** `TwoFactorSetupResponse setup(Long userId, String password)`:
  1. load the user; 2FA on → `TwoFactorStateException(ALREADY_ENABLED)`
  2. `passwordHash == null` or `!passwordEncoder.matches(password, hash)` → `WrongPasswordException`
  3. `secret = twoFactorSecrets.newSecret()`; `user.startTwoFactorSetup(encryptor.encrypt(secret, aad(userId)))`
  4. return the Base32 secret + otpauth URI (issuer from properties)
  5. `log.info("Two-factor setup started userId={}")`
- [ ] **3.5.4** `RecoveryCodesResponse confirm(Long userId, String code)`:
  1. 2FA on → `ALREADY_ENABLED`; no pending secret → `SETUP_NOT_STARTED`
  2. a code that doesn't look like TOTP → `InvalidTwoFactorCodeException` (recovery codes don't exist yet)
  3. `matchingStep(decrypt(...), code, clock.instant())` empty → `InvalidTwoFactorCodeException`
  4. `user.enableTwoFactor(now, step)`
  5. `recoveryCodeRepository.deleteAllByUserId`, then insert 10 new hashed codes
  6. `log.info("Two-factor enabled userId={}")` and return the raw codes
- [ ] **3.5.5** `private static String aad(Long userId)` → `"user:" + userId` (one place, also used in Phase 4).
- [ ] **3.5.6** `TwoFactorServiceTest` (Mockito, fixed `Clock`):
  - [ ] status: off; on with 7 of 10 codes remaining
  - [ ] setup: right password → encrypted secret stored, the response URI has the email; the stored value is not the
        Base32 secret
  - [ ] setup negative: wrong password → `WrongPasswordException` and nothing stored; already on → 409 reason;
        null password hash → `WrongPasswordException`
  - [ ] setup twice → the second secret replaces the first
  - [ ] confirm: a valid code (computed with `TotpVerifier#codeAt` from the stored secret) → enabled, 10 codes returned,
        10 hashes saved, none equal to a raw code
  - [ ] confirm negative: wrong code; a recovery-code-shaped input; no setup; already on; decryption fails
        (`SecretDecryptionException`) → `InvalidTwoFactorCodeException` and an `ERROR` log line without the secret

### 3.6 Controller: `presentation/rest/TwoFactorController`
- [ ] **3.6.1** `@RestController @RequestMapping("/api/v1/me/2fa")`, with `@AuthenticationPrincipal AuthenticatedUser user`:
  - [ ] `GET` → `status(user.id())`
  - [ ] `POST /setup` → `rateLimiter.check("login-per-email", …, user.email())` (decision 10), then `setup(...)`
  - [ ] `POST /confirm` → `rateLimiter.check("two-factor-per-user", …, user.id().toString())`, then `confirm(...)`, then:
    - `sessionAuthenticator.refresh(user.withTwoFactor(true), …)`
    - `sessionRevoker.revokeOthers(user.email(), request.getSession().getId())`. This runs **after** the refresh,
      because the session id changed.
    - return the codes
- [ ] **3.6.2** `config/RateLimitProperties`: add `Rule twoFactorPerIp, Rule twoFactorPerUser` (Javadoc `@param`s).
      Update the call sites from 0.6. `application.yml`:
  ```yaml
      two-factor-per-ip:
        limit: ${RATE_LIMIT_TWO_FACTOR_PER_IP:20}
        window: 5m
      two-factor-per-user:
        limit: ${RATE_LIMIT_TWO_FACTOR_PER_USER:5}
        window: 15m
  ```
  `application-test.yml`: both limits `100000`, like the others.
- [ ] **3.6.3** No `SecurityConfig` change: `/api/v1/me/**` is already `authenticated()`. Check that an anonymous request gets
      401 (3.7).

### 3.7 Integration tests: `integration/TwoFactorEnrollmentIntegrationTest`
- [ ] **3.7.1** Test support:
  - [ ] `integration/support/TotpTestCodes`: `codeNow(base32Secret)` and `nextCode(base32Secret, long lastStep)`
        (decision 18); `stepOf(...)`
  - [ ] `AbstractIntegrationTest#enableTwoFactor(Cookie session, String password)` → record
        `TwoFactorTestAccount(String secret, List<String> recoveryCodes, Cookie session)`. It runs setup + confirm and
        returns the **new** session cookie.
- [ ] **3.7.2** Cases (real session cookies + CSRF):
  - [ ] anonymous `GET /api/v1/me/2fa` and `POST …/setup` → `401` problem+json
  - [ ] status before setup → `enabled: false, recoveryCodesRemaining: 0`
  - [ ] setup with the right password → `200`; the `secret` is 32 Base32 characters; the `otpauthUri` starts with
        `otpauth://totp/Phrasal:` and contains the secret
  - [ ] the DB column `totp_secret_enc` starts with `v1:` and doesn't contain the secret (task-101 AC #8)
  - [ ] setup with a wrong password → `400 wrong-password`, `errors.password` set
  - [ ] setup without CSRF → `403`
  - [ ] confirm with a code from the secret → `200` with 10 codes `XXXX-XXXX-XXXX-XXXX`; status → `enabled: true,
        recoveryCodesRemaining: 10`; `user_recovery_codes` has 10 rows, and none holds a raw code
  - [ ] confirm changes the session id; the old cookie → `401` on `/me`; `/me` with the new cookie →
        `twoFactorEnabled: true`
  - [ ] confirm revokes the other sessions: log in a second time first (second cookie), confirm with the first → the
        second cookie → `401`
  - [ ] negative: confirm with `000000` (when it isn't the real code) → `400 invalid-two-factor-code`, still disabled
  - [ ] negative: confirm before setup → `409 two-factor-setup-not-started`
  - [ ] negative: setup again after confirm → `409 two-factor-already-enabled`
  - [ ] negative: blank code / blank password → `400 Validation Error`

### 3.8 Verify and commit
- [ ] **3.8.1** `cd backend && mvn clean verify` → green, JaCoCo ≥ 85 % in every touched package.
- [ ] **3.8.2** `make clean build` → green. Ask for commit approval →
      `feat(backend): let users enroll in authenticator-app 2FA`

---

## Phase 4 — Two-step login, recovery-code login, rate limits

### 4.1 Pending state (decision 3)
- [ ] **4.1.1** `presentation/security/PendingTwoFactorLogin.java` (`@Component`, uses `Clock` + `TwoFactorProperties`):
  - [ ] constants `USER_ID_ATTRIBUTE = "PENDING_2FA_USER_ID"`, `SINCE_ATTRIBUTE = "PENDING_2FA_SINCE"`
  - [ ] `void start(HttpServletRequest, Long userId)`: invalidate the current session if there is one, create a new
        one, set both attributes
  - [ ] `Optional<Long> userId(HttpServletRequest)`: no session, missing attributes, or older than `loginTimeout`
        → empty, and stale attributes are removed
  - [ ] `void clear(HttpServletRequest)`
- [ ] **4.1.2** `PendingTwoFactorLoginTest` (`MockHttpServletRequest`, a fixed clock that the test moves forward):
  - [ ] start → `userId` present; the old session was invalidated (`MockHttpSession#isInvalid`)
  - [ ] after 4m59s present; after 5m01s empty, and the attributes are removed
  - [ ] negative: no session → empty; an attribute with the wrong type → empty
  - [ ] `clear` removes both

### 4.2 `SessionAuthenticator`
- [ ] **4.2.1** `login(...)` returns a sealed `LoginOutcome`:
      `record Authenticated(UserResponse user)` | `record TwoFactorRequired()`, placed next to the class.
  - [ ] after `authenticate(...)`: `principal.twoFactorEnabled()` → `pendingLogin.start(request, principal.id())`,
        `log.debug("Two-factor login challenge userId={}")`, return `TwoFactorRequired`. **No `saveContext`.**
  - [ ] otherwise → `Authenticated(establish(principal, …))`, as today
- [ ] **4.2.2** `public UserResponse completeTwoFactorLogin(AuthenticatedUser principal, HttpServletRequest, HttpServletResponse)`:
      `pendingLogin.clear(request)` → `establish(principal.withTwoFactor(true), …)`. That includes `changeSessionId()`.
- [ ] **4.2.3** `public void startTwoFactorChallenge(...)`: a public seam for task-104 (Google login). It delegates to
      `pendingLogin.start`, with Javadoc saying that.
- [ ] **4.2.4** `SessionAuthenticatorTest`:
  - [ ] a 2FA principal → `TwoFactorRequired`, `saveContext` never called, the pending attribute set
  - [ ] a non-2FA principal → `Authenticated`, same as today
  - [ ] `completeTwoFactorLogin` → the pending attributes are gone, the session id changed, the saved principal has
        `twoFactorEnabled = true`

### 4.3 Service: `TwoFactorService` (part 2)
- [ ] **4.3.1** `enum SecondFactor { TOTP, RECOVERY_CODE }` and
      `SecondFactor verifyCode(Long userId, String code)` (used by login, disable and regenerate):
  1. load the user; 2FA off → `TwoFactorStateException(NOT_ENABLED)`
  2. `RecoveryCodes.looksLikeTotp(code)`:
     - yes → decrypt (on failure: `ERROR` log → invalid), `matchingStep`, then
       `userRepository.advanceTotpStep(id, step) == 1` → `TOTP`; otherwise `InvalidTwoFactorCodeException` (replay)
     - no → `recoveryCodeRepository.markUsed(userId, RecoveryCodes.hash(code), now) == 1` → `RECOVERY_CODE`;
       otherwise invalid
- [ ] **4.3.2** `AuthenticatedUser loadPrincipal(Long userId)`: rebuilds the principal from the DB for step 2.
      A missing user or 2FA turned off meanwhile → `TwoFactorLoginExpiredException` (4.4.1).
- [ ] **4.3.3** `TwoFactorServiceTest`, new cases:
  - [ ] a valid TOTP → `TOTP`, and `advanceTotpStep` called with the matched step
  - [ ] the same TOTP again (`advanceTotpStep` returns 0) → invalid (task-101 AC #4)
  - [ ] the drift code of step + 1 → accepted
  - [ ] a valid recovery code (any case, with or without dashes) → `RECOVERY_CODE`
  - [ ] the same recovery code again (`markUsed` returns 0) → invalid (task-101 AC #5)
  - [ ] negative: 2FA off → `NOT_ENABLED`; a wrong code; decryption fails but a recovery code still works

### 4.4 Exception, DTO, controller
- [ ] **4.4.1** `infrastructure/exception/TwoFactorLoginExpiredException` → `GlobalExceptionHandler` `401`, title
      `Unauthorized`, type `two-factor-login-expired`, detail `Your sign-in timed out. Log in again.`. Add it to
      `GlobalExceptionHandlerTest`.
- [ ] **4.4.2** `application/dto/LoginChallengeResponse.java`: `record LoginChallengeResponse(boolean twoFactorRequired)`
      with a constant `REQUIRED = new LoginChallengeResponse(true)`.
- [ ] **4.4.3** `AuthController#login` → `ResponseEntity<?>`. It switches on `LoginOutcome`: `Authenticated` →
      `200 user`, `TwoFactorRequired` → `202 LoginChallengeResponse.REQUIRED`. The rate limits stay as they are.
- [ ] **4.4.4** `AuthController`: `@PostMapping("/login/2fa")`:
  1. `rateLimiter.check("two-factor-per-ip", …, remoteAddr)`
  2. `userId = pendingLogin.userId(request)`; empty → `TwoFactorLoginExpiredException`
  3. `rateLimiter.check("two-factor-per-user", …, userId.toString())`
  4. `factor = twoFactorService.verifyCode(userId, code)`; `principal = twoFactorService.loadPrincipal(userId)`
  5. `log.info("Logged in user id={} secondFactor={}")` → `200 sessionAuthenticator.completeTwoFactorLogin(...)`
- [ ] **4.4.5** `SecurityConfig`: add `"/api/v1/auth/login/2fa"` to the public `POST` list.

### 4.5 Integration tests: `integration/TwoFactorLoginIntegrationTest`
- [ ] **4.5.1** Helpers in `AbstractIntegrationTest`:
  - [ ] `Cookie loginExpectingTwoFactor(String body)` → asserts `202` and `$.twoFactorRequired == true`, returns the
        pending cookie
  - [ ] `ResultActions submitTwoFactorCode(Cookie pending, String code)`
- [ ] **4.5.2** Cases (user with 2FA enabled through `enableTwoFactor`, then logged out):
  - [ ] login → `202 {"twoFactorRequired": true}`, a `SESSION` cookie, **no** user fields in the body
  - [ ] `/me` with the pending cookie → `401` (no authenticated session yet, task-101 AC #3)
  - [ ] `GET /api/v1/me/quiz-progress/…` with the pending cookie → `401`
  - [ ] code → `200` with email/role and `twoFactorEnabled: true`; the session id changed; `/me` with the new cookie → `200`
  - [ ] the same code again in a fresh login → `400 invalid-two-factor-code` (replay, task-101 AC #4)
  - [ ] a recovery code → `200`; the same recovery code in a later login → `400` (task-101 AC #5); status →
        `recoveryCodesRemaining: 9`
  - [ ] a recovery code typed in lower case without dashes → `200`
  - [ ] wrong code → `400`, and a correct code afterwards in the same pending session → `200` (the state survives)
  - [ ] negative: `POST /login/2fa` with no prior login → `401 two-factor-login-expired`
  - [ ] negative: pending state older than the timeout → `401`. Use a `@TestPropertySource` with
        `phrasal.two-factor.login-timeout=1s` in a **separate small class** (`TwoFactorLoginTimeoutIntegrationTest`),
        plus Awaitility, with no `Thread.sleep`.
  - [ ] negative: without CSRF → `403`
  - [ ] a user **without** 2FA → login `200` as today (regression)
  - [ ] logged in as user B on the same cookie jar, then step 1 as 2FA user A → B's session is gone (`/me` → `401`
        until A finishes; decision 3)
  - [ ] a password reset of a 2FA user (`requestPasswordReset` + `resetPassword`) → the next login still answers `202`
        (decision 15)
- [ ] **4.5.3** `integration/RateLimitIntegrationTest` (it already has a `@TestPropertySource`): add
      `two-factor-per-user.limit=3` and `two-factor-per-ip.limit=5`:
  - [ ] the 4th code attempt for one pending user → `429` + `Retry-After` (task-100 AC #5, 2FA part)
  - [ ] a second user from the same IP still works until the per-IP limit

### 4.6 Verify and commit
- [ ] **4.6.1** `cd backend && mvn clean verify` → green.
- [ ] **4.6.2** `make clean build` → green. The existing e2e users have no 2FA, so login stays `200`. Ask for commit
      approval → `feat(backend): require a TOTP or recovery code at login for 2FA accounts`

---

## Phase 5 — Disable, regenerate recovery codes, notice emails

### 5.1 Notice email (decision 16)
- [ ] **5.1.1** `application/event/TwoFactorChangedNoticeRequested.java`:
      `record (Long userId, String email, boolean enabled)`, with a masking `toString()` (user id + flag only).
- [ ] **5.1.2** `AccountEmailComposer`:
  - [ ] constants `TWO_FACTOR_ENABLED_SUBJECT = "Two-factor authentication is on for your Phrasal account"` and
        `TWO_FACTOR_DISABLED_SUBJECT = "Two-factor authentication is off for your Phrasal account"`
  - [ ] `EmailMessage twoFactorChanged(String to, boolean enabled)`:
    - text: "Two-factor authentication was just turned on/off for your Phrasal account. If this was you, there is
      nothing to do. If it wasn't, reset your password now: <base>/forgot-password, then review
      <base>/account/security."
    - HTML through `HtmlUtils.htmlEscape`, like the other mails
- [ ] **5.1.3** `AccountEmailListener`: `@Async @TransactionalEventListener(phase = AFTER_COMMIT) onTwoFactorChangedNoticeRequested`
      → `deliver(...)`.
- [ ] **5.1.4** `TwoFactorService#confirm` publishes the event with `enabled = true` (Phase 3 code, one line).
- [ ] **5.1.5** Tests:
  - [ ] `AccountEmailComposerTest`: both subjects; both links; no `token=`, no Base32-looking secret
  - [ ] `AccountEmailListenerTest`: event → composer + sender; the sender throws → no exception escapes
  - [ ] event `toString` test: no email
  - [ ] `TwoFactorServiceTest#confirm`: the event is published once, with `enabled = true`

### 5.2 Service: `TwoFactorService` (part 3)
- [ ] **5.2.1** `void disable(Long userId, String code)`:
  1. `verifyCode(userId, code)` (TOTP or recovery code; 2FA off → `NOT_ENABLED`)
  2. `user.disableTwoFactor()`; `recoveryCodeRepository.deleteAllByUserId(userId)`
  3. publish `TwoFactorChangedNoticeRequested(…, false)`; `log.info("Two-factor disabled userId={}")`
- [ ] **5.2.2** `RecoveryCodesResponse regenerateRecoveryCodes(Long userId, String code)`:
  1. `verifyCode(userId, code)`
  2. delete the old codes, insert 10 new ones, return them
  3. `log.info("Recovery codes regenerated userId={}")` (no notice email; the codes only matter with the password
     plus a code anyway)
- [ ] **5.2.3** Extract the "delete + insert 10 hashed codes" lines used by `confirm` and regenerate into one private
      method.
- [ ] **5.2.4** `TwoFactorServiceTest`:
  - [ ] disable with a TOTP / with a recovery code → fields cleared, codes deleted, event `enabled = false`
  - [ ] disable negative: wrong code → nothing changed, no event; 2FA off → `NOT_ENABLED`
  - [ ] regenerate → 10 new codes, old ones deleted first; a recovery code used to regenerate is itself among the
        deleted
  - [ ] regenerate negative: wrong code → old codes untouched

### 5.3 Controller
- [ ] **5.3.1** `TwoFactorController`:
  - [ ] `POST /recovery-codes` → `two-factor-per-user` limit → `regenerateRecoveryCodes` → `200`
  - [ ] `POST /disable` → `two-factor-per-user` limit → `disable` → `sessionAuthenticator.refresh(user.withTwoFactor(false), …)`
        → `204`

### 5.4 Integration tests: `integration/TwoFactorManagementIntegrationTest`
- [ ] **5.4.1** Cases:
  - [ ] regenerate with a TOTP → `200` with 10 codes that differ from the old ones; an **old** code at login → `400`;
        a new code → `200` (task-101 AC #5)
  - [ ] disable with a TOTP → `204`; status → `enabled: false, recoveryCodesRemaining: 0`; the next login → `200`
        straight away (no `202`); the DB secret column is `NULL` (task-101 AC #6)
  - [ ] disable with a recovery code → `204` (the lost-phone path)
  - [ ] after disabling, `setup` + `confirm` works again with a **new** secret, and an old code from the first secret → `400`
  - [ ] negative: disable with a wrong code → `400`, still enabled (task-101 AC #6)
  - [ ] negative: disable / regenerate while off → `409 two-factor-not-enabled`
  - [ ] negative: anonymous → `401`; without CSRF → `403`
  - [ ] mails: after confirm, `mailbox.awaitSubject(email, "Two-factor authentication is on…")`; after disable, the
        "off" mail. Neither contains the secret.

### 5.5 Verify and commit
- [ ] **5.5.1** `cd backend && mvn clean verify` → green.
- [ ] **5.5.2** `make clean build` → green. Ask for commit approval →
      `feat(backend): disable 2FA, regenerate recovery codes, send 2FA notices`

---

## Phase 6 — E2E: 2FA for regular users over the API

### 6.1 Support code
- [ ] **6.1.1** `cd e2e && npm install --save-dev otpauth` (version from 0.5).
- [ ] **6.1.2** `e2e/src/support/totp.ts`:
  - [ ] `PERIOD_SECONDS = 30`
  - [ ] `currentStep(now = Date.now())`
  - [ ] `codeForStep(secret, step)` (otpauth `TOTP#generate({ timestamp: step * 30_000 })`)
  - [ ] `async nextAcceptedCode(secret, lastUsedStep?: number): Promise<{ code: string; step: number }>`
        (decision 18): current step if `> lastUsedStep`, else `lastUsedStep + 1` if `≤ current + 1`, else wait until
        the next step (at most 30 s; the default step timeout is 30 s, so give this step `{ timeout: 65_000 }`)
  - [ ] `normalizeSecret(text)` strips spaces (the page shows the key in groups)
- [ ] **6.1.3** `e2e/src/world.ts`: `twoFactorSecret: string | null`, `recoveryCodes: string[]`, `lastTotpStep: number | null`.
      Reset them in `hooks.ts` `Before`.
- [ ] **6.1.4** `e2e/src/support/mailpit-client.ts`: nothing new if `messageBySubject` / search by subject already exists
      (task-108). Otherwise add `awaitMessage(to, subject)`.

### 6.2 Steps: `e2e/src/steps/two-factor-api.steps.ts`
- [ ] **6.2.1**
  - `When I start two-factor setup with my password`
  - `When I start two-factor setup with password {string}`
  - `When I confirm two-factor setup with a valid code`
  - `When I confirm two-factor setup with code {string}`
  - `Given I have two-factor authentication enabled` (setup + confirm, keeps the secret and the codes in the World)
  - `When I submit a valid two-factor code`
  - `When I submit the same two-factor code again`
  - `When I submit two-factor code {string}`
  - `When I submit recovery code number {int}`
  - `When I log in again with the current email and password` (reuses the `auth-api.steps.ts` helper)
  - `When I disable two-factor authentication with a valid code`
  - `When I regenerate recovery codes with a valid code`
  - `When I submit {int} wrong two-factor codes`
  - `Then the login should ask for a second factor` (`202` + `twoFactorRequired`)
  - `Then I should receive {int} recovery codes`
  - `Then the two-factor status should be {string}` (`enabled` / `disabled`)
  - `Then I should receive the email {string}` (Mailpit, current email)
- [ ] **6.2.2** Reuse `the response status should be {int}` and `When I request my profile`.

### 6.3 Feature: `e2e/features/auth-api/two-factor.feature` (`@api`)
- [ ] **6.3.1** Scenarios:
  - [ ] enable 2FA: setup → `200`, confirm with a valid code → `200` with 10 recovery codes; status enabled; the "on"
        email arrives (task-101 AC #1, #2)
  - [ ] a wrong confirmation code → `400`, status still disabled
  - [ ] setup with a wrong password → `400`
  - [ ] login asks for a second factor → `202`; my profile → `401`; a valid code → `200`; my profile → `200`
        (task-101 AC #3)
  - [ ] the same code twice → the second one `400` (task-101 AC #4)
  - [ ] a recovery code works once (`200`, then `400` in the next login) (task-101 AC #5)
  - [ ] regenerated codes replace the old ones
  - [ ] disable with a valid code → `204`; the next login → `200` with no second step; the "off" email arrives
        (task-101 AC #6)
  - [ ] `POST /login/2fa` without logging in first → `401`
- [ ] **6.3.2** Rate limit: compose keeps `RATE_LIMIT_TWO_FACTOR_PER_USER` at the default (5 / 15 min). Add to
      `docker-compose.yml` `RATE_LIMIT_TWO_FACTOR_PER_IP: "1000"` (e2e runs from one IP, like the other per-IP limits).
  - [ ] scenario: 6 wrong codes for one pending login → the 6th returns `429` (task-100 AC #5, 2FA part)
- [ ] **6.3.3** `hooks.ts` `AfterAll`: no change needed. The test users are deleted, and recovery codes go with them
      (`ON DELETE CASCADE`).
- [ ] **6.3.4** `npm --prefix e2e run test:api` against the running stack → green.

### 6.4 Verify and commit
- [ ] **6.4.1** `make clean build` → green (new scenario/step counts noted here). Ask for commit approval →
      `test(e2e): cover 2FA setup, two-step login and recovery codes`

---

## Phase 7 — Admin rule: ADMIN rights only after the second factor (breaking for admin API clients)

### 7.1 Backend
- [ ] **7.1.1** `AuthenticatedUser#authorities()`: `twoFactorEnrollmentRequired()` → `ROLE_USER`, otherwise
      `ROLE_<role>` (decision 4). Update the Javadoc.
- [ ] **7.1.2** `AuthenticatedUserTest`:
  - [ ] ADMIN + on → `ROLE_ADMIN`
  - [ ] ADMIN + off → `ROLE_USER`
  - [ ] USER + either → `ROLE_USER`
- [ ] **7.1.3** `SecurityConfig`: no rule change. Write a class Javadoc line: "ADMIN authority requires a completed
      second factor, see `AuthenticatedUser#authorities`".

### 7.2 Integration tests
- [ ] **7.2.1** `AdminBootstrapIntegrationTest` (it uses the real admin from `@TestPropertySource`):
  - [ ] `adminLogin`: `/me` → `role: ADMIN`, `twoFactorEnrollmentRequired: true`
  - [ ] `adminCanWrite` becomes `adminNeedsTwoFactorToWrite`:
    1. login → `200`
    2. `POST /api/v1/phrasal-verbs` → `403`
    3. `enableTwoFactor` → new cookie
    4. POST → `201`
    5. log out, log in → `202`, code → `200`, POST → `201`
    (task-101 AC #7)
  - [ ] `GET /actuator/metrics` with the unenrolled admin → `403`, after enrollment → `200`
  - [ ] after `disable`, the same session → POST `403`, and `/me` → `twoFactorEnrollmentRequired: true`
  - [ ] `adminResetThenRestart` and `adminOwnProgress` still pass. Adjust them if they need ADMIN rights. Keep the
        admin's 2FA state per test independent: disable at the end, or reset it through `JdbcTemplate` in
        `@AfterEach`.
  - [ ] the bootstrap re-run (`AdminAccountInitializer`) leaves `totp_secret_enc` / `totp_enabled_at` unchanged
        (decision 15)
- [ ] **7.2.2** `SecurityRulesIntegrationTest`: the mock `user().roles("ADMIN")` cases stay. They test the URL rules, not
      the principal. Add a comment pointing to `AdminBootstrapIntegrationTest` for the 2FA rule.
- [ ] **7.2.3** `cd backend && mvn clean verify` → green.

### 7.3 E2E admin step (decision 18)
- [ ] **7.3.1** `e2e/src/support/admin-two-factor.ts`:
  - [ ] `async resetAdminTwoFactor()`: `createDbClient()`, then
        `UPDATE users SET totp_secret_enc = NULL, totp_enabled_at = NULL, totp_last_step = NULL WHERE email = $1` and
        `DELETE FROM user_recovery_codes WHERE user_id = (SELECT id FROM users WHERE email = $1)`, in try/finally
  - [ ] a module-level `adminState: { secret: string; lastStep: number } | null`, cleared by the reset
- [ ] **7.3.2** `hooks.ts`: call `resetAdminTwoFactor()` in `BeforeAll` (a clean start after an aborted run) and in
      `AfterAll` (developers can still log in as the dev admin by hand).
- [ ] **7.3.3** `auth-api.steps.ts` → `Given I am logged in as the admin`:
  - [ ] login → `200` (no 2FA yet) → `POST /me/2fa/setup` with the admin password → `confirm` with
        `nextAcceptedCode` → store `adminState` → the cookie jar now holds the elevated session
  - [ ] login → `202` (2FA already on in this run) → `POST /auth/login/2fa` with `nextAcceptedCode(adminState.secret,
        adminState.lastStep)` → `200`; update `lastStep`
  - [ ] assert `/me` → `role: ADMIN, twoFactorEnrollmentRequired: false`
- [ ] **7.3.4** New step `Given I am logged in as the admin without two-factor`: `resetAdminTwoFactor()`, then login →
      `200`.
- [ ] **7.3.5** `features/phrasal-verbs-api/crud.feature`:
  - [ ] new scenario "Admin without two-factor cannot create a phrasal verb" → `403` (task-101 AC #7)
  - [ ] "Admin creates a phrasal verb" stays → `201`, now through the 2FA step (task-101 AC #11, API part)
- [ ] **7.3.6** `features/auth-api/two-factor.feature`: add "Admin signs in with a code and edits content":
      login → `202` → code → `200` → create → `201` (task-101 AC #11).

### 7.4 Verify and commit
- [ ] **7.4.1** `make clean build` → green.
- [ ] **7.4.2** Ask for commit approval → `feat!: require two-factor authentication for admin writes`. The scope is
      omitted because the commit touches backend + e2e. Add a body line `BREAKING CHANGE: admin content writes and
      /actuator need a completed 2FA step`.

---

## Phase 8 — Frontend: API, auth context, login code step

### 8.1 Types and API
- [ ] **8.1.1** `frontend/src/types.ts`:
  - [ ] `CurrentUser` gets `twoFactorEnabled: boolean` and `twoFactorEnrollmentRequired: boolean`
  - [ ] `TwoFactorStatus { enabled: boolean; enabledAt: string | null; recoveryCodesRemaining: number }`
  - [ ] `TwoFactorSetup { secret: string; otpauthUri: string }`
  - [ ] `RecoveryCodes { recoveryCodes: string[] }`
  - [ ] update the test fixtures that build a `CurrentUser` (`grep -rn "role: 'USER'\|role: 'ADMIN'" frontend/src/__tests__`)
- [ ] **8.1.2** `src/api/authApi.ts`:
  - [ ] `export type LoginResult = 'authenticated' | 'two-factor-required'`
  - [ ] `login(email, password): Promise<LoginResult>`: the body has `twoFactorRequired === true` →
        `'two-factor-required'`, otherwise `'authenticated'`
  - [ ] `verifyTwoFactorLogin(code): Promise<CurrentUser>` → `POST /auth/login/2fa`
- [ ] **8.1.3** `src/api/twoFactorApi.ts`:
  - `fetchTwoFactorStatus()` → `GET /me/2fa`
  - `startTwoFactorSetup(password)` → `POST /me/2fa/setup`
  - `confirmTwoFactorSetup(code)` → `POST /me/2fa/confirm`
  - `regenerateRecoveryCodes(code)` → `POST /me/2fa/recovery-codes`
  - `disableTwoFactor(code)` → `POST /me/2fa/disable`
- [ ] **8.1.4** `src/api/problemTypes.ts`: `INVALID_TWO_FACTOR_CODE`, `TWO_FACTOR_LOGIN_EXPIRED`, `WRONG_PASSWORD`,
      `TWO_FACTOR_ALREADY_ENABLED`, `TWO_FACTOR_SETUP_NOT_STARTED`, `TWO_FACTOR_NOT_ENABLED`.
- [ ] **8.1.5** Tests:
  - [ ] `src/__tests__/api/authApi.test.ts`:
    - `login` maps a `202 {twoFactorRequired: true}` body → `'two-factor-required'` and a user body → `'authenticated'`
    - `verifyTwoFactorLogin` path/method/body
  - [ ] `src/__tests__/api/twoFactorApi.test.ts`: each function hits the right path, method and body; an `ApiError` is
        rethrown

### 8.2 Auth context
- [ ] **8.2.1** `src/auth/AuthContext.tsx`:
  - [ ] `login(email, password): Promise<LoginResult>`: `stashAllAnonymousProgress()` as today → `authApi.login` →
        `'authenticated'` → `refresh()`; `'two-factor-required'` → no refresh (still anonymous); return the result
  - [ ] new `completeTwoFactorLogin(code): Promise<void>` → `authApi.verifyTwoFactorLogin(code)` → `refresh()`
  - [ ] the default context value gets a no-op `completeTwoFactorLogin`, and `login` resolves to `'authenticated'`
- [ ] **8.2.2** Check that `stashAllAnonymousProgress()` is safe to call twice (a user who abandons the code step and logs
      in again). If it isn't, guard it, and add a test in `src/__tests__/utils/` for the double call.
- [ ] **8.2.3** `src/__tests__/auth/AuthContext.test.tsx`, new cases:
  - [ ] `login` returning `'two-factor-required'` → status stays `anonymous`, `/me` not re-fetched
  - [ ] `completeTwoFactorLogin` → `authenticated`
  - [ ] a failing `completeTwoFactorLogin` rethrows and leaves the state anonymous

### 8.3 Login page
- [ ] **8.3.1** `src/pages/LoginPage.tsx`: `'two-factor-required'` →
      `navigate('/login/2fa', { replace: true, state: { from } })`. `'authenticated'` → as today.
- [ ] **8.3.2** `src/__tests__/LoginPage.test.tsx`: a 2FA account navigates to `/login/2fa` and passes `from` along;
      the normal path is unchanged.

### 8.4 Code step page: `src/pages/LoginTwoFactorPage.tsx` (route `/login/2fa`)
- [ ] **8.4.1** Layout like `LoginPage` (card, `dark:` classes, 375 px):
  - [ ] heading "Two-factor authentication"; text "Enter the 6-digit code from your authenticator app."
  - [ ] code input: `inputMode="numeric"`, `autoComplete="one-time-code"`, `pattern="[0-9]{6}"`, `maxLength={6}`,
        `autoFocus`, `data-testid="two-factor-code"`
  - [ ] a link-style button "Use a recovery code instead" (`two-factor-use-recovery`). It switches to a text input
        (`autoComplete="off"`, `two-factor-recovery-code`), and back ("Use the authenticator app").
  - [ ] submit `two-factor-submit`, showing "Checking…" and disabled while pending
- [ ] **8.4.2** Behaviour:
  - [ ] already `authenticated` → `<Navigate to={from ?? '/'} replace />`
  - [ ] success → `navigate(from ?? '/', { replace: true })`
  - [ ] `invalid-two-factor-code` → field error under the input ("Invalid or already used code"), and the input is
        cleared
  - [ ] `two-factor-login-expired` → alert "Your sign-in timed out." + a link "Log in again" → `/login` (keep `from`)
  - [ ] 429 → the server detail in the alert (`auth-error`)
- [ ] **8.4.3** `src/main.tsx`: `<Route path="/login/2fa" element={<LoginTwoFactorPage />} />` inside the `PageShell`
      route, before `*`.
- [ ] **8.4.4** `src/__tests__/LoginTwoFactorPage.test.tsx` (`MemoryRouter` + a test `AuthContext` value):
  - [ ] renders the code input with the right attributes
  - [ ] submit calls `completeTwoFactorLogin` with the typed code, then navigates to `from`
  - [ ] the recovery toggle switches inputs and submits the recovery code
  - [ ] invalid code → field error, input cleared
  - [ ] expired → alert + "Log in again" link
  - [ ] 429 → alert with the detail
  - [ ] the pending state disables the button
  - [ ] an authenticated visitor is redirected
- [ ] **8.4.5** `src/__tests__/routeReload.test.tsx`: `/login/2fa` renders inside the shell.

### 8.5 Verify and commit
- [ ] **8.5.1** `npm --prefix frontend run test:run && npm --prefix frontend run build` → green.
- [ ] **8.5.2** `make clean build` → green. Ask for commit approval → `feat(frontend): add two-factor login step`

---

## Phase 9 — Frontend: account security page, user menu entry, admin banner

### 9.1 Dependency and building blocks
- [ ] **9.1.1** `cd frontend && npm install qrcode && npm install --save-dev @types/qrcode` (versions from 0.5).
- [ ] **9.1.2** `src/components/twoFactor/QrCode.tsx`:
  - [ ] `useEffect` → `QRCode.toDataURL(value, { errorCorrectionLevel: 'M', margin: 1, width: 200 })` → `<img>` with
        `alt="QR code for your authenticator app"`, `data-testid="two-factor-qr"`, and a white background in dark mode
        too (scanners need contrast)
  - [ ] on error → render nothing (the manual key below is the fallback)
  - [ ] ignore a late result after unmount (an `active` flag)
- [ ] **9.1.3** `src/utils/recoveryCodesFile.ts`:
  - [ ] `recoveryCodesText(email, codes, now)` → a header ("Phrasal recovery codes for …, created …; each code works
        once"), then one code per line
  - [ ] `downloadRecoveryCodes(text)` → Blob + `URL.createObjectURL` + a temporary `<a download="phrasal-recovery-codes.txt">`,
        then `revokeObjectURL`
- [ ] **9.1.4** `src/utils/formatSecret.ts`: `formatSecret('ABCDEFGH…')` → `'ABCD EFGH …'` (groups of 4, for manual
      entry).
- [ ] **9.1.5** `src/components/twoFactor/RecoveryCodesPanel.tsx`:
  - [ ] a warning "Save these codes now. They are shown only once. Each works once."
  - [ ] the codes in a monospace grid (`data-testid="recovery-code"` per code)
  - [ ] buttons "Download" (`recovery-codes-download`), "Copy" (`recovery-codes-copy`; `navigator.clipboard.writeText`,
        then "Copied" for 2 s) and "I have saved my codes" (`recovery-codes-done`, calls `onDone`)
- [ ] **9.1.6** `src/components/twoFactor/CodeForm.tsx`: one reusable form "code + submit". It accepts a TOTP or a
      recovery code (text input, `autoComplete="one-time-code"`), with props `label`, `submitLabel`, `onSubmit(code)`,
      `testIdPrefix`. It shows the `invalid-two-factor-code` field error and other errors in an alert. Used by confirm,
      regenerate and disable.
- [ ] **9.1.7** Tests:
  - [ ] `src/__tests__/twoFactor/QrCode.test.tsx` (`vi.mock('qrcode')`): renders the `<img>` with the data URL; an error
        → nothing; no state update after unmount
  - [ ] `src/__tests__/utils/recoveryCodesFile.test.ts`: the text has every code on its own line; download creates and
        revokes the object URL and clicks the anchor (mocked)
  - [ ] `src/__tests__/utils/formatSecret.test.ts`: groups of 4; empty string
  - [ ] `src/__tests__/twoFactor/RecoveryCodesPanel.test.tsx`: shows 10 codes; Copy calls the clipboard and shows
        "Copied"; Download calls the util; Done calls `onDone`
  - [ ] `src/__tests__/twoFactor/CodeForm.test.tsx`: submits the trimmed code; field error for invalid code; alert for
        other errors; pending disables

### 9.2 Setup wizard: `src/components/twoFactor/TwoFactorSetup.tsx`
- [ ] **9.2.1** Steps, kept in local state `'password' | 'scan' | 'codes'`:
  1. **password**: "Confirm your password to turn on two-factor authentication" → `startTwoFactorSetup(password)`;
     `wrong-password` → field error under the password (`two-factor-password`, `two-factor-password-submit`)
  2. **scan**:
     - `<QrCode value={otpauthUri} />` + "Can't scan? Enter this key:" + `formatSecret(secret)` in monospace
       (`data-testid="two-factor-secret"`, `select-all`)
     - then `<CodeForm>` "Enter the 6-digit code from the app" → `confirmTwoFactorSetup(code)` (`two-factor-confirm-*`)
  3. **codes**: `<RecoveryCodesPanel>`. On Done → `refresh()` (the admin gets elevated rights, decision 10) → `onEnabled()`.
- [ ] **9.2.2** "Cancel" in step 2 → back to the status view. The pending secret stays unused on the server, and a new
      setup replaces it.
- [ ] **9.2.3** `src/__tests__/twoFactor/TwoFactorSetup.test.tsx` (mock `twoFactorApi` and `qrcode`):
  - [ ] wrong password → field error, still on the password step
  - [ ] right password → QR + grouped secret shown
  - [ ] wrong code → field error, still on scan
  - [ ] right code → 10 recovery codes shown
  - [ ] Done → `refresh` + `onEnabled` called
  - [ ] Cancel → `onCancel`

### 9.3 Page: `src/pages/AccountSecurityPage.tsx` (route `/account/security`)
- [ ] **9.3.1** Access:
  - [ ] `status === 'loading'` → nothing (or a small skeleton)
  - [ ] `anonymous` → `<Navigate to="/login" replace state={{ from: '/account/security' }} />`
- [ ] **9.3.2** Content (heading "Account security", the email shown):
  - [ ] loads `fetchTwoFactorStatus()`; on error → alert + "Try again"
  - [ ] **off**: "Two-factor authentication is off" + button "Turn on" (`two-factor-enable`) → `<TwoFactorSetup>`.
        For an admin, the text says "Required for administrators: content editing stays locked until you turn this on."
  - [ ] **on**: "Two-factor authentication is on since <date>" (`two-factor-status`) + "Recovery codes left: N"
        (`recovery-codes-remaining`). When N ≤ 3, a warning "Generate new codes soon".
  - [ ] "Generate new recovery codes" (`recovery-codes-regenerate`) → `<CodeForm>` → `<RecoveryCodesPanel>` → reload
        the status
  - [ ] "Turn off" (`two-factor-disable`) → a confirmation text (and for admins "You will lose admin rights until you
        turn it on again") → `<CodeForm>` → `disableTwoFactor` → `refresh()` + reload the status
- [ ] **9.3.3** `src/main.tsx`: `<Route path="/account/security" element={<AccountSecurityPage />} />` before `*`.
- [ ] **9.3.4** `src/__tests__/AccountSecurityPage.test.tsx`:
  - [ ] anonymous → redirected to `/login` with `from`
  - [ ] loading → nothing
  - [ ] off → "Turn on" visible; admin text only for an admin
  - [ ] on → date + remaining count; ≤ 3 → warning
  - [ ] regenerate flow → new codes shown, status reloaded
  - [ ] disable flow → `disableTwoFactor` + `refresh` called, status reloaded
  - [ ] status load error → alert + retry works
- [ ] **9.3.5** `src/__tests__/routeReload.test.tsx`: `/account/security` renders inside the shell.

### 9.4 User menu and admin banner
- [ ] **9.4.1** `src/components/UserMenu.tsx`: an "Account security" link (`/account/security`,
      `data-testid="nav-account-security"` desktop / `${prefix}-account-security` mobile), between the email and
      "Log out". It closes the menu on click.
- [ ] **9.4.2** `src/components/TwoFactorEnrollmentBanner.tsx`:
  - [ ] renders only when `user?.twoFactorEnrollmentRequired` and the path isn't `/account/security`
  - [ ] text "Administrators must turn on two-factor authentication before editing content." + link "Set it up"
        → `/account/security`
  - [ ] `role="status"`, `data-testid="two-factor-enrollment-banner"`, amber colours with `dark:` variants
- [ ] **9.4.3** `src/components/PageShell.tsx`: render the banner below the navigation.
- [ ] **9.4.4** Tests:
  - [ ] `src/__tests__/UserMenu.test.tsx`: the link is visible when authenticated (desktop + mobile), hidden when
        anonymous; clicking it closes the dropdown
  - [ ] `src/__tests__/TwoFactorEnrollmentBanner.test.tsx`: shown for an unenrolled admin; hidden for a user, for an
        enrolled admin, for anonymous visitors, and on `/account/security`
  - [ ] `src/__tests__/PageShell.test.tsx`: the existing tests still pass (the default context is anonymous); the banner
        appears with an unenrolled-admin context

### 9.5 Verify and commit
- [ ] **9.5.1** `npm --prefix frontend run test:run && npm --prefix frontend run build` → green. Check the bundle-size
      line of the build: `qrcode` adds about 25 kB gzip. If the build warns about chunk size, lazy-load
      `AccountSecurityPage` with `React.lazy`.
- [ ] **9.5.2** `make clean build` → green. Ask for commit approval →
      `feat(frontend): add account security page with 2FA setup and recovery codes`

---

## Phase 10 — E2E browser: 2FA through the UI

### 10.1 Steps: `e2e/src/steps/two-factor-ui.steps.ts`
- [ ] **10.1.1** Use the `data-testid`s from Phases 8–9, `FRONTEND_URL` as in `frontend.steps.ts`, and the
      `totp.ts` helpers from Phase 6:
  - `When I turn on two-factor authentication through the account security page` (open the page → Turn on → password
    → read `two-factor-secret` → `normalizeSecret` → code → keep the secret and the shown recovery codes in the World)
  - `Then I should see {int} recovery codes`
  - `When I finish saving my recovery codes`
  - `When I enter a valid two-factor code`
  - `When I enter recovery code number {int}`
  - `When I enter the two-factor code {string}`
  - `When I turn off two-factor authentication with a valid code`
  - `Then I should be on the two-factor code page`
  - `Then the account security page should show two-factor authentication as {string}`
  - `Then I should see the two-factor enrollment banner`
  - `Then I should not see the two-factor enrollment banner`
- [ ] **10.1.2** Reuse `When I log in through the form`, `When I log out through the user menu`,
      `Then the user menu should show my email` and `Then I should see an auth error` from `auth-ui.steps.ts`.
- [ ] **10.1.3** New step `Given I am logged in through the form as the admin without two-factor`:
      `resetAdminTwoFactor()` → log in with `adminCredentials()`.

### 10.2 Feature: `e2e/features/frontend/two-factor.feature` (`@frontend`)
- [ ] **10.2.1** Scenarios:
  - [ ] a registered user turns on 2FA through the account security page → sees 10 recovery codes → the page shows "on"
        (task-103 AC #4)
  - [ ] after turning it on and logging out, login goes to the code page; a valid code → the user menu shows my email
        (task-103 AC #2)
  - [ ] a wrong code → an error is shown and I stay on the code page
  - [ ] login with a recovery code → logged in (task-103 AC #2)
  - [ ] turning 2FA off with a valid code → the page shows "off"; the next login needs no code
  - [ ] an admin without 2FA sees the enrollment banner; after turning 2FA on, the banner is gone (task-103 AC #5)
  - [ ] the account security page as an anonymous visitor → redirected to the login page
- [ ] **10.2.2** Each scenario that turns 2FA on uses a fresh user (`a registered user exists`), so the scenarios stay
      independent. The admin scenario relies on the `AfterAll` reset from Phase 7.
- [ ] **10.2.3** `make acceptanceTest` → all features green, including the old ones.

### 10.3 Verify and commit
- [ ] **10.3.1** `make clean build` → green (note the new scenario/step counts here). Ask for commit approval →
      `test(e2e): cover two-factor setup and login in the browser`

---

## Phase 11 — Config wiring check (delivery checklist)

- [ ] **11.1** `docker-compose.yml`: `TOTP_ENCRYPTION_KEY` (Phase 2) and `RATE_LIMIT_TWO_FACTOR_PER_IP: "1000"` (Phase 6)
      are present. No new service.
- [ ] **11.2** k8s:
  - [ ] base secret + deployment env have `totp.encryption-key` / `TOTP_ENCRYPTION_KEY` (Phase 2)
  - [ ] the prod example patch has `totp.encryption-key: CHANGE_ME`
  - [ ] no configmap change: the rate-limit and timeout defaults are fine for prod
- [ ] **11.3** `.github/workflows/ci_cd.yml`:
  - [ ] the prod secret patch has the key and the empty-secret guard (Phase 2)
  - [ ] the e2e job needs no new env (compose defaults)
  - [ ] the backend job needs nothing (the test profile has its own key)
- [ ] **11.4** Skaffold: `grep -n "env\|secret" skaffold.yaml backend/skaffold.yaml frontend/skaffold.yaml` → it uses the
      k8s base, so nothing changes. Write the conclusion in the commit body or in this file, not in code.
- [ ] **11.5** `frontend/nginx.conf` and `vite.config.ts`: `/api` is proxied same-origin, and the new SPA routes
      (`/login/2fa`, `/account/security`) fall back to `index.html` like the others. Check with a hard reload of both
      URLs on http://localhost:3000.
- [ ] **11.6** `kubectl kustomize k8s/overlays/dev` and `…/prod` (with the example patch copied, then deleted) render.
- [ ] **11.7** If nothing changed in this phase, no commit is needed. Otherwise ask for approval →
      `build: wire 2FA settings into compose, k8s and CI`

---

## Phase 12 — Docs, diagrams, backlog

- [ ] **12.1** `README.md`: a new section "Two-factor authentication (2FA)" under "Accounts & security", and remove
      "**Not yet:** 2FA" (line ~557):
  - [ ] user guide: Account security → Turn on → scan the QR code with Google Authenticator / Aegis / 1Password →
        enter the code → save the recovery codes
  - [ ] the endpoint table (decision 5) with status codes, and the 202 login challenge
  - [ ] the admin rule: ADMIN rights only after the second factor; the banner; why old admin sessions were logged out
        once (V15)
  - [ ] **key backup**: `TOTP_ENCRYPTION_KEY` (GitHub Secret + password manager). Without it, restored backups can't
        check TOTP codes, but recovery codes still work. Changing the key = every 2FA user needs a recovery code.
  - [ ] **runbook "admin lost phone and recovery codes"**: the SQL from 7.3.1 through
        `kubectl --context hetzner exec postgres-0 -- psql …`, then log in and enroll again
  - [ ] rate limits and their env vars (decision 14); `TWO_FACTOR_LOGIN_TIMEOUT`
  - [ ] the GitHub Secret to create before the next deploy, plus `openssl rand -base64 32`
- [ ] **12.2** `backend/CLAUDE.md`, "Security" section:
  - [ ] the principal invariant (decision 4) and `authorities()`
  - [ ] the pending-login attributes and their timeout
  - [ ] `TwoFactorService`, `TotpVerifier`, `AesGcmEncryptor`, `RecoveryCodes`, `TwoFactorSecrets`
  - [ ] the replay rule (conditional updates)
  - [ ] what must never be logged (decision 19)
  - [ ] integration tests: `enableTwoFactor`, `loginExpectingTwoFactor`, `TotpTestCodes`
- [ ] **12.3** `frontend/CLAUDE.md`: the new pages (`LoginTwoFactorPage`, `AccountSecurityPage`), `components/twoFactor/`,
      `TwoFactorEnrollmentBanner`, `twoFactorApi.ts`, the `LoginResult` of `AuthContext#login`, and `qrcode` (mocked in
      Vitest).
- [ ] **12.4** `e2e/CLAUDE.md`: `totp.ts` (`nextAcceptedCode` and why), `admin-two-factor.ts` + the BeforeAll/AfterAll
      reset, the new steps and features, and the `otpauth` dependency.
- [ ] **12.5** `docs/diagrams/two-factor-flow.md` (new, blackbox policy; Mermaid):
  - [ ] a sequence diagram: enrollment (setup with password → QR → confirm → codes → session refresh + other sessions
        revoked → notice mail)
  - [ ] a sequence diagram: two-step login (password → 202 + pending session → code → changeSessionId → 200)
  - [ ] a state diagram: anonymous → pending (5 min) → authenticated; expiry back to anonymous
  - [ ] a flowchart: authority decision (ADMIN + 2FA → ROLE_ADMIN, otherwise ROLE_USER)
  - [ ] a note on what's deferred (Google 2FA path, key rotation)
- [ ] **12.6** `docs/diagrams/auth-flow.md`: strike TOTP 2FA in the "not yet" line (link to `two-factor-flow.md`) and add
      the 2FA condition to the authorization flowchart.
- [ ] **12.7** Plan file `.claude/docs/blackbox/plans/2026-10-26 18:10 Multi-user …md`: append a `## Mutations Log` row
      (add only, don't delete anything in that folder):
      `| <date> | split | P4 done as task-101 + 2FA screens of task-103: java-otp 1.0.0; endpoints under /api/v1/me/2fa + POST disable; setup needs the password; confirm elevates the session; V15 instead of V12 (also deletes admin sessions) | Reuse the /me/** rule; prevent lockout via a stolen session |`
- [ ] **12.8** Backlog (MCP):
  - [ ] task-101: check off the AC that are done, and add implementation notes and a final summary
  - [ ] task-103: note that the 2FA screens are done (AC #2, #5, the 2FA part of #4, #6, #13, #14); account deletion
        and AC #12 rest stay open
  - [ ] task-100: note that the 2FA-step rate limit (part of AC #5) is done here
  - [ ] task-104: note the `SessionAuthenticator#startTwoFactorChallenge` seam and that `setup` needs a password
        (Google-only accounts)
  - [ ] **ask the user** before moving task-101 to `Done`
- [ ] **12.9** Commit after approval → `docs: document two-factor authentication`
- [ ] **12.10** On the user's exit signal, append the blackbox `session-log.md` entry (format in
      `.claude/rules/blackbox-policy.md`, no secrets): the plan mutation, the new diagram, the decisions from 0.4.

---

## Phase 13 — Final verification

- [ ] **13.1** `make clean build` → green: backend verify (JaCoCo 85 %/package, Checkstyle), frontend build + tests,
      docker rebuild, e2e. Note the final counts here.
- [ ] **13.2** Manual run on http://localhost:3000 (Mailpit http://localhost:8025) **with a real authenticator app** on a
      phone:
  - [ ] register + verify a user → Account security → Turn on → scan the QR code → the code from the app works → 10
        codes shown; Download gives a `.txt` with all 10
  - [ ] the "2FA is on" mail arrives in Mailpit, with no secret in it
  - [ ] log out → log in → the code page → the app code works; the same code a second time fails
  - [ ] log in with a recovery code → works; "Recovery codes left: 9"
  - [ ] a second browser logged in before enabling → logged out after enabling
  - [ ] wait more than 5 min on the code page → "Your sign-in timed out" + "Log in again"
  - [ ] 6 wrong codes → a readable "too many requests" message
  - [ ] turn off with a code → the "off" mail; the next login asks for no code
  - [ ] dev admin: the banner shows; `POST /api/v1/phrasal-verbs` through the UI/API → 403; turn on 2FA → the banner is
        gone, writes work
  - [ ] dark mode and 375 px width on `/login/2fa` and `/account/security`; the QR code still scans in dark mode
  - [ ] DB: `SELECT totp_secret_enc FROM users WHERE totp_enabled_at IS NOT NULL` → only `v1:…` values;
        `user_recovery_codes.code_hash` → 64 hex characters only
  - [ ] logs: `docker compose logs backend | grep -ciE "otpauth|secret=|recoveryCodes=\["` → `0`
- [ ] **13.3** Optional reviews before merging (only if the user asks):
  - [ ] `/code-review`
  - [ ] `/security-review` (focus: pending-state handling, replay, the timing of the code compare, logging)
  - [ ] `api-contract-review` on `/api/v1/me/2fa/*` and the 202 login challenge
  - [ ] `java-code-review` on `TwoFactorService`, `SessionAuthenticator`, `AesGcmEncryptor`
- [ ] **13.4** Open the PR `two-factor` → `develop`, after the user approves and picks the base branch.

---

## Phase 14 — Production rollout (after a tagged release)

- [ ] **14.1** Before the release (user actions):
  - [ ] create the GitHub Secret `TOTP_ENCRYPTION_KEY` (`openssl rand -base64 32`) and store the same value in the
        password manager. **Never paste it into chat or the blackbox files.**
  - [ ] decide on a manual `pg_dump` before the deploy (task-98 is still open). V15 is additive, but it deletes the admin
        sessions.
  - [ ] release notes: "Admins must turn on 2FA before editing content (breaking for admin API scripts); every admin is
        logged out once"
- [ ] **14.2** After the deploy:
  - [ ] `kubectl --context hetzner logs deploy/backend` shows a clean start and Flyway `V15` applied
  - [ ] `/actuator/health` → `UP`
  - [ ] `kubectl --context hetzner exec postgres-0 -- psql -U postgres -d phrasaldb -c "SELECT count(*) FROM spring_session s JOIN users u ON s.principal_name = u.email WHERE u.role = 'ADMIN'"` → `0`
- [ ] **14.3** Admin smoke test at https://phrasalbox.com:
  - [ ] log in as the admin → the enrollment banner → turn on 2FA with the phone → **store the recovery codes in the
        password manager**
  - [ ] create and delete a test entry → works
  - [ ] log out → log in → the code step → works
- [ ] **14.4** User smoke test with a second account: turn on → log in with a code → turn off. The notice mails arrive
      in a real inbox (not spam).
- [ ] **14.5** `kubectl --context hetzner logs deploy/backend | grep -ciE "otpauth|secret=|recoveryCodes=\["` → `0`.

---

## Coverage map — task-101 AC

| AC | Covered by |
|---|---|
| #1 setup gives an otpauth URI + secret; active only after a valid code | 3.5.6, 3.7.2, 6.3.1, 10.2.1 |
| #2 10 recovery codes shown once, only hashes stored | 3.5.6, 3.7.2, 6.3.1, 9.1.5 |
| #3 no session until a code; pending ~5 min | 4.1.2, 4.5.2, 6.3.1 |
| #4 replay rejected, ±1 step accepted | 2.4.5, 4.3.3, 4.5.2, 6.3.1 |
| #5 recovery codes single use; regenerate invalidates old ones | 1.4.2, 4.3.3, 4.5.2, 5.4.1, 6.3.1 |
| #6 disabling needs a valid code | 5.2.4, 5.4.1, 6.3.1, 10.2.1 |
| #7 ADMIN without 2FA (or without the step) → 403 on writes | 7.1.2, 7.2.1, 7.3.5 |
| #8 secrets encrypted; key env var in compose, k8s, CI | 2.3.5, 2.6, 3.7.2, 11.1–11.3 |
| #9 new migration, old ones untouched | 1.1.1 |
| #10 unit (RFC vectors, replay, drift, encryption, single use) + integration (two-step login, admin) | Phases 1–5, 7.2 |
| #11 e2e: admin enrolls, logs in with a code, CRUD works | 7.3.3, 7.3.5, 7.3.6 |
| #12 README + backend/CLAUDE.md | 12.1, 12.2 |
| #13 `make clean build` | 13.1 (and the end of every phase) |

## Coverage map — related AC in other tasks

| Task / AC | Covered by |
|---|---|
| task-103 #2 code step after the password (TOTP or recovery code) | Phase 8, 10.2.1 |
| task-103 #3 user menu with Account/Security | 9.4.1 |
| task-103 #4 enable (QR + key), codes once + download, regenerate, disable (account deletion: task-100) | Phase 9, 10.2.1 |
| task-103 #5 admin without 2FA is prompted | 9.4.2, 10.2.1 |
| task-103 #6 readable errors incl. 429 | 8.4.2, 9.1.6, 9.2.1 |
| task-103 #13 Vitest for each new page, hook and util (2FA part) | 8.1.5, 8.2.3, 8.4.4, 9.1.7, 9.2.3, 9.3.4, 9.4.4 |
| task-103 #14 browser e2e (2FA part) | Phase 10 |
| task-100 #5 rate limit on the 2FA step | 4.5.3, 6.3.2 |
