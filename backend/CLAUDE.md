# CLAUDE.md — backend

## Stack

- Java 25, Spring Boot 4.1.2 (Spring Framework 7, Hibernate 7, Jackson 3), PostgreSQL 16
- MapStruct 1.6.3, Lombok (getter/setter/constructor/slf4j)
- JUnit 6, Testcontainers 2 (`testcontainers-postgresql`, `org.testcontainers.postgresql.PostgreSQLContainer`), JaCoCo 0.8.15
- Boot 4 modular starters: `spring-boot-starter-webmvc`, `spring-boot-starter-flyway` (Flyway auto-config needs it, not just `flyway-core`), `spring-boot-starter-webmvc-test` (`@AutoConfigureMockMvc` is in `org.springframework.boot.webmvc.test.autoconfigure`)
- Maven, Flyway, Docker, Kubernetes + Skaffold

## Architecture Layers

```
domain/         → entities, repository interfaces only
application/    → services, DTOs, MapStruct mappers
presentation/   → REST controllers (@RestController)
infrastructure/ → exception handlers (@RestControllerAdvice), ProblemDetailFactory
config/         → Spring @Configuration classes (SecurityConfig = access rules)
```

## Security

- `SecurityConfig` rule order matters (first match wins): `/error` and `/actuator/health/**` public → other `/actuator/**` ADMIN → `GET /api/v1/auth/me` authenticated → `/api/v1/me/**` authenticated (per-user data, e.g. quiz progress) → `POST register|login|verify-email|resend-verification|forgot-password|reset-password|confirm-email-change` public → `GET /api/v1/auth/oauth2/**` public (Google sign-in) → `POST/PUT/DELETE` content paths ADMIN → `GET /api/**` public → everything else denied.
- Public `GET /api/**`; `POST/PUT/DELETE` on phrasal-verbs, grammar-entries, verb-details need role `ADMIN`; `/actuator/health/**` public, other actuator endpoints ADMIN.
- CSRF is cookie-based (`XSRF-TOKEN`, readable by the SPA, echoed in `X-XSRF-TOKEN`); `presentation/security/CsrfCookieFilter` forces the deferred token to be sent.
- 401/403 are written as `application/problem+json` by `presentation/security` handlers; build bodies with `ProblemDetailFactory`.
- No CORS mapping: the SPA is same-origin (Vite proxy / nginx / ingress).
- Sessions: Spring Session JDBC, `SESSION` cookie flags come from `server.servlet.session.cookie.*` via the `cookieSerializer` bean in `SecurityConfig` (Spring Session ignores them otherwise). Session principal is the `AuthenticatedUser` record, never the entity.
- Admin account: `AdminAccountInitializer` creates/repairs it from `PHRASAL_ADMIN_EMAIL` / `PHRASAL_ADMIN_PASSWORD` at every start (takeover is intentional; a weak password fails startup).
- Rate limits (`phrasal.rate-limit.*`, `RateLimiter`, in-memory per instance): register per IP and per email, login per IP and per email, resend per IP and per email, verify per IP, forgot-password per IP and per email, reset-password per IP, 2FA code attempts per IP and per account, `reauth-per-user` (password, email and delete actions), `email-change-per-email` (`confirm-email-change` uses `verify-per-ip`); every 429 is logged at WARN by `RateLimiter` (`rule=`, plus `clientIp=` for `*-per-ip` rules, never an email); 429 problem+json with `Retry-After`. `application-test.yml` raises the limits; override in a test with `@TestPropertySource`.
- Google sign-in switch: `phrasal.google.*` (`GoogleLoginProperties`; `GOOGLE_LOGIN_ENABLED`, default `false`; enabled with a blank `GOOGLE_CLIENT_ID`/`GOOGLE_CLIENT_SECRET` fails startup). `GoogleLoginConfig` builds the `ClientRegistrationRepository` only when enabled (redirect URI from `APP_BASE_URL`, optional `GOOGLE_*_URI` overrides for a stand-in provider). Public `GET /api/v1/auth/providers` → `{"google": bool}`. Only with that bean does `SecurityConfig` add `oauth2Login`: `GET /api/v1/auth/oauth2/authorization/google` starts it, `/api/v1/auth/oauth2/code/google` is the callback, `loginPage("/login")` (the SPA's; no generated backend page, API calls keep the JSON 401). The `OAuth2AuthenticationToken` stays in the request (`RequestAttributeSecurityContextRepository`), Google's tokens are dropped (`NoOpAuthorizedClientRepository`), userinfo is never called. `GoogleOidcUserService` → `GoogleSignInService` (match by subject, then by verified email, else create a passwordless `USER`; refuses unverified emails, a different linked subject and ADMIN; taking over an unverified local account drops its password and open links) → `GoogleLoginSuccessHandler` (`SessionAuthenticator#signInVerified`, redirect `/` or `/login/2fa`) / `GoogleLoginFailureHandler` (redirect `/login?error=` with `google-email-unverified`, `google-account-conflict`, `google-admin-account`, else `google`). Never log the subject, email, tokens or code. The test profile turns it on with `test-client`/`test-secret`.
- 401 comes from `ProblemDetailAuthenticationEntryPoint`, 403 from `ProblemDetailAccessDeniedHandler` (CSRF failures get type `/csrf`); both live in `presentation/security`.
- Security packages: `infrastructure/security` (`AuthenticatedUser`, `AppUserDetails`, `JpaUserDetailsService`, `RateLimiter`, `EmailNormalizer`, `TotpVerifier`, `AesGcmEncryptor`, `RecoveryCodes`, `TwoFactorSecrets`), `presentation/security` (filters, handlers, `SessionAuthenticator`, `PendingTwoFactorLogin`), `application/validation` (`@ValidPassword`, `PasswordPolicy`).
- Integration tests extend `AbstractIntegrationTest`, which clears the security context before/after each test. Mutating MockMvc calls need `.with(user(...).roles("ADMIN")).with(csrf())`, or `adminWithCsrf()`; use `registerAndLogin()` for a real session.

- Base package: `net.phrasal`
- Never let a lower layer import from a higher layer.
- DTOs live in `application/dto/` — Java 25 records (request with validation, response immutable).
- Mappers in `application/mapper/` — always use MapStruct interfaces (`componentModel = "spring"`), never manual mapping.
- Entities use Lombok `@Getter`/`@Setter`/`@EqualsAndHashCode(of=...)` and JSONB columns.
- Services use `@Slf4j`, `@RequiredArgsConstructor`, `@Service @Transactional`.
- Exception handling via `@RestControllerAdvice` with RFC 7807 ProblemDetail.

## Email Verification

- `register` always returns `202` with the same `AcceptedResponse` (never `409`): new → user + token + mail; unverified → new password + fresh token; verified → "account exists" notice. Hashing runs on every path so timing does not leak.
- `infrastructure/mail`: `EmailSender` port with `SmtpEmailSender` (`phrasal.mail.enabled=true`) and `LoggingEmailSender` (otherwise, logs the link); chosen with `@ConditionalOnProperty`. `management.health.mail.enabled: false` so a slow relay never marks the backend DOWN.
- Mail goes out through after-commit events (`VerificationEmailRequested`, `AccountExistsNoticeRequested`) handled by `AccountEmailListener` (both renamed from `Verification*`; they also serve password reset) with `@Async` + `@TransactionalEventListener(AFTER_COMMIT)`; never send mail inside the request transaction. `AccountEmailComposer` builds the text.
- Tokens live in the generic `user_tokens` table (V14) with `TokenType` (`EMAIL_VERIFICATION`, `PASSWORD_RESET`). `SecureTokenGenerator` makes 32 random bytes (base64url) and stores only the SHA-256 hex. Single use, newest token only (`invalidateActive`), TTL `phrasal.email-verification.token-ttl`. `users.email_verified_at` comes from V13.
- Verify: unknown or replaced token → `400` `verification-link-invalid`; expired → `400` `verification-link-expired`; repeating a used link of a verified user → `204`. Login of an unverified account → `403` `email-not-verified`.
- `SecurityConfig`: `setPreAuthenticationChecks` is a no-op and `AccountStatusUserDetailsChecker` runs post-authentication, so the password is checked first; a wrong password stays `401` and the `403` does not reveal which addresses exist. `AppUserDetails.isEnabled()` = email verified.
- `AccountCleanupService` (`@Scheduled`, `phrasal.cleanup.cron`, `phrasal.cleanup.enabled`, `UNVERIFIED_ACCOUNT_RETENTION`) deletes old tokens and stale unverified accounts. Time comes from an injected `Clock` (`ClockConfig`), never `LocalDateTime.now()`.
- Tests: `RecordingEmailSender` (+ `RecordingEmailSenderConfig`, imported by `AbstractIntegrationTest`, field `mailbox`) captures mail; `verifyEmail(email)` in `AbstractIntegrationTest` redeems the emailed link and `registerAndLogin` calls it.

## Password Reset

- `PasswordResetService` (`requestReset`, `reset`) reuses `user_tokens` with `TokenType.PASSWORD_RESET`; no migration. TTL `phrasal.password-reset.token-ttl` (`PASSWORD_RESET_TOKEN_TTL`, default 1h).
- `POST forgot-password` always returns `202` (`AcceptedResponse`); unknown address → nothing, verified or unverified → new token (older ones invalidated) + `PasswordResetEmailRequested`. Rate limits run before the user lookup.
- `POST reset-password` is **not idempotent** (`204` once; a repeat is `400`). Validation order: DTO validation → token unknown, used or replaced → `reset-link-invalid`; expired → `reset-link-expired`; password contains the account email → `PasswordPolicyViolationException`, answered with the same `errors.password` shape as `register` (the token stays usable); then apply.
- Applying: new password hash, token consumed, an unverified email becomes verified, `SessionRevoker.revokeAll` closes every session (Spring Session principal name = the email, so the email at the time of the reset must be used), then `PasswordChangedNoticeRequested` sends the "password changed" mail after commit. The reset does not log anyone in.
- Deviation: opening an old verification link after resetting an unverified account is a `204` no-op.
- Tests: `AbstractIntegrationTest.requestPasswordReset(email)` / `resetPassword(token, password)`, `RecordingEmailSender.awaitSubject(...)` / `awaitPasswordResetToken(...)`.

## Quiz Progress API

- `GET|PUT /api/v1/me/quiz-progress/{quizKey}` (`QuizProgressController`) stores one opaque JSON document per user and quiz in `user_quiz_progress` (`ON DELETE CASCADE` from `users`). The user id comes only from the `AuthenticatedUser` principal, never from the URL or body.
- `QuizKey` is a whitelist enum (`phrasal-verbs`, `grammar-i-wish-if-only`); an unknown key is `400`. Adding a quiz = a new enum constant plus a frontend `QuizKey` entry.
- Save is a native upsert (`INSERT … ON CONFLICT … DO UPDATE`, version + 1): last write wins, no optimistic locking.
- The state is an opaque JSON object; the server never interprets it. Size is capped by `phrasal.quiz-progress.max-state-bytes` (default 65536, `QuizProgressProperties`) → `400 Quiz Progress Too Large`. Never log the state.
- `SecurityConfig`: `/api/v1/me/**` → authenticated sits right after `GET /api/v1/auth/me`, before the public `GET /api/**` rule.
- `GlobalExceptionHandler` maps `HttpMessageNotReadableException` to `400 Malformed Request` (a non-object `state` or broken JSON).

## Two-Factor Authentication (TOTP)

- **Principal invariant:** the session principal is an `AuthenticatedUser(id, email, role, twoFactorEnabled, passwordless)` (`passwordless` = no password hash, a Google-only account; `/auth/me` returns it as `hasPassword`; older sessions read it as `false`). `authorities()` gives `ROLE_ADMIN` only for an ADMIN with 2FA; an ADMIN without it gets `ROLE_USER`, so content writes and `/actuator/**` answer `403` until it enrolls (`twoFactorEnrollmentRequired()` feeds `/auth/me`). `withTwoFactor(boolean)` builds the elevated principal after `confirm`/`disable`.
- **Two-step login:** `POST login` with a 2FA account does not authenticate; `PendingTwoFactorLogin.start` ends the current session and opens a fresh one holding only `PENDING_2FA_USER_ID` and `PENDING_2FA_SINCE` (no security context, so it grants nothing). `userId(request)` is empty after `phrasal.two-factor.login-timeout` (`TWO_FACTOR_LOGIN_TIMEOUT`, 5m) and removes the stale state. `POST login/2fa` verifies the code, then `SessionAuthenticator` rotates the session id. `SessionAuthenticator#signInVerified` holds that rule for every first factor (password login and Google sign-in): 2FA on → clear the context and open the pending login; otherwise establish the session.
- **Classes:** `TwoFactorService` (`status`, `setup`, `confirm`, `disable`, `regenerateRecoveryCodes`, `verifyCode`, `loadPrincipal`), `TotpVerifier` (java-otp, 6 digits, `matchingStep` accepts the previous, current and next step), `AesGcmEncryptor` (AES-256-GCM, random IV per value; the key is `phrasal.two-factor.encryption-key` = `TOTP_ENCRYPTION_KEY`, base64 of 32 bytes, startup fails without it), `RecoveryCodes` (10 codes, stored as SHA-256 hex), `TwoFactorSecrets` (secret generation, `otpauth://` URI). `TwoFactorController` serves `/api/v1/me/2fa/*`; `AuthController` serves `login/2fa`.
- **Replay rule:** a code is accepted only through conditional updates, so two parallel requests cannot both win: `UserRepository` moves `totp_last_step` forward only if the new step is greater, and `RecoveryCodeRepository` marks a code used only while `used_at IS NULL`. `confirm`, `disable` and `recovery-codes` share the rate-limit bucket `two-factor-per-user` with `login/2fa`.
- **Sessions:** after `confirm` and `disable` the session id rotates and `SessionRevoker` closes the other sessions (it must be given the pre-refresh session id); the client has to use the new `SESSION` cookie. Setup needs the current password (`wrong-password`, 400). Mail: `TwoFactorChangedNoticeRequested` (enabled flag) is handled after commit like the other notices.
- **Never log:** the TOTP secret (plain or encrypted), the `otpauth` URI, submitted codes, recovery codes or their hashes, the encryption key. Log only the user id (`log.info("Two-factor enabled userId={}", id)`).
- **Schema:** V15 adds `users.totp_secret_enc`, `totp_enabled_at`, `totp_last_step`, the table `user_recovery_codes` and deletes admin sessions once.
- **Tests:** `AbstractIntegrationTest` has `enableTwoFactor(session, password)` (returns `TwoFactorTestAccount(secret, recoveryCodes, session)`), `loginExpectingTwoFactor(body)` and `submitTwoFactorCode(pending, code)`; `integration/support/TotpTestCodes` makes valid codes for a secret and step. A rate-limit or timeout scenario goes in its own class (`TwoFactorRateLimitIntegrationTest`, `TwoFactorLoginTimeoutIntegrationTest`) because it needs other properties.

## Account Management

- **Classes:** `AccountController` (`/api/v1/me/password|email|delete`), `AccountService` (change password, delete), `EmailChangeService` (request and confirm), `AccountChecks` (`load`, `requirePassword`, admin guard), `FieldValidationException` (a service-side field error, rendered as `errors.<field>` in the problem body like a bean-validation failure). `confirm-email-change` lives in `AuthController` (public).
- **ADMIN rule:** ADMIN accounts get `403 admin-account-managed` on all three actions (their email and password come from config at every start).
- **Re-auth:** every action checks the current password first (`WrongPasswordException`, `400 wrong-password`); delete then checks a TOTP or recovery code when 2FA is on. All share `reauth-per-user`; `/me/email` also uses `email-change-per-email`.
- **Sessions:** change password keeps the pre-refresh session id, rotates, then `revokeOthers(email, thatId)`; email change confirm calls `revokeAll(oldEmail)`; delete calls `revokeAll` and the logout handler clears the cookie.
- **Email change:** `TokenType.EMAIL_CHANGE` and the V16 column `user_tokens.new_email`; the token goes to the new address; `202` is identical whether or not the address is taken (taken and verified → "account exists" notice instead); confirm re-checks the address (`409 email-change-conflict`) and notifies the old address. Never log the new address at INFO.
- **Mails:** `AccountEmailComposer` (`emailChangeConfirmation`, `emailChanged`, `passwordChanged`, `accountDeleted`), sent by `AccountEmailListener` after commit from events.
- **Honeypot:** `RegisterRequest.website` (optional, max 200); `honeypotFilled()` makes `AuthService#register` return at once, before any breach check, DB or mail work, so the answer is the normal `202`.
- **Tests:** `AbstractIntegrationTest` has `requestEmailChange`, `confirmEmailChange` and `mailbox.awaitLatest/awaitSubject`; `ChangeEmailIntegrationTest` reads the token with `awaitEmailChangeToken`; `AccountRateLimitIntegrationTest` has its own class because it needs other limits.

## Password Breach Check

- `infrastructure/security/BreachedPasswordChecker` calls the HIBP range API (k-anonymity: only the first five SHA-1 hex characters are sent) and `PasswordBreachGuard` applies it on register, reset and change (never login).
- Do **not** register a Spring Security `CompromisedPasswordChecker` bean: it would also run on login.
- It **fails open**: a timeout (`PASSWORD_BREACH_CHECK_TIMEOUT`, 2s) or error accepts the password and logs `Breached-password check unavailable` at WARN.
- `PASSWORD_BREACH_CHECK_ENABLED` is `true` by default, `false` in `application-test.yml` and docker-compose. `BreachedPasswordIntegrationTest` mocks the checker with `@MockitoBean`.

## Coding Rules

- Maven `artifactId` = `backend`, version = semantic `MAJOR.MINOR.PATCH` (currently 0.1.0)
- Use **Context7 MCP** before writing any Spring Boot / library API code — training data drifts

## Database Migrations (Flyway)

- File pattern: `src/main/resources/db/migration/V{n}__{description}.sql`
- Never modify an already-applied migration — always add a new one
- Increment `n` sequentially; leave no gaps

## Testing Requirements

- JaCoCo minimum: **85% line coverage per package** (enforced by `mvn verify`)
- Integration tests: Testcontainers (`postgres:16-alpine`) — never H2 for integration
- Both positive and negative cases required for every test class

## Local Hot Reload
- `spring-boot-devtools` lives in the opt-in Maven profile `devtools` (not active by default): `docker compose up -d postgres` then
  `SPRING_PROFILES_ACTIVE=dev mvn spring-boot:run -Pdevtools`; `mvn compile` triggers a restart. See root README.

## Skaffold Dev Builds

The Dockerfile uses BuildKit cache mounts (`--mount=type=cache,target=/root/.m2`) so Maven dependencies are cached across rebuilds without invalidating Docker layer cache. `skaffold dev` incremental rebuilds only re-run the Maven package step, not the dependency download.

`skaffold.yaml` sets `useBuildkit: true` to ensure BuildKit is active.

## Makefile Targets (backend)

Use these from the **repo root** instead of running Maven directly:

| Target | Command |
|---|---|
| `make buildBackend` | `cd backend && mvn clean verify` |
| `make clean` | Docker down + remove images + `mvn clean` + remove frontend dist |

## Version & Delivery Checklist

Before marking any backend task done:
1. `mvn verify` passes (tests + JaCoCo gate)
2. Flyway migration numbered correctly (no gaps, no edits to existing files)
3. `docker-compose.yml` reflects any new env vars or services
4. GitHub Actions `.github/workflows/ci_cd.yml` updated if pipeline steps changed
5. Kubernetes manifests in `k8s/base/` updated for deployment changes
6. Follow `.claude/rules/version-bump-procedure.md` for the full Dockerfile + rebuild sequence
7. For new or updated functionality add or update tests
