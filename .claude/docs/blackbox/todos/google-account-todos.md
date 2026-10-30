# Sign in with Google: implementation TODOs

Source plan: `.claude/docs/blackbox/plans/2026-10-26 18:10 Multi-user accounts TOTP 2FA and reliable storage for phrasal.md`
(section P5). Backlog: **task-104**. It needs the Google OAuth client from **task-106** (AC #4, #5); publishing the
consent screen stays in **task-105** (AC #6).

> Status (2026-10-30): Phases 0–5 done on branch `google-sign-in`, except 0.7 (user actions in Google Cloud).
> Phases 6–13 not started.

Builds on what is already in `develop` (`cb933cc`):
- password login with a pending 2FA step (`SessionAuthenticator`, `PendingTwoFactorLogin`, `POST /auth/login/2fa`)
- email verification, password reset, account settings (change password/email, delete), honeypot, HIBP check
- the seam `SessionAuthenticator#startTwoFactorChallenge`, left by task-101 for this task
- `users.password_hash` is already nullable (V9), and `JpaUserDetailsService` already refuses accounts without a hash

---

## Scope

**In scope**
- A "Continue with Google" button on the Login and Register pages. It starts the server-side OIDC flow.
- First Google sign-in creates a verified `USER` account without a password. Later sign-ins find it by the Google subject.
- A verified Google email that matches an existing account links to it. An unverified local account loses its password
  when it is linked (pre-registration hijacking protection).
- An account with 2FA goes through the same `/login/2fa` step after Google as after a password login.
- Readable errors on the login page for a cancelled, failed or refused Google sign-in.
- Accounts without a password ("Google-only") can set one through the existing reset-by-email flow. That unlocks the
  actions that need the current password (change password, change email, delete, 2FA setup).
- A Google stand-in (`mock-oauth2-server`) in docker-compose for local dev and e2e, the way Mailpit stands in for Brevo.
- Tests: backend unit + integration (with a fake Google token endpoint), frontend Vitest, e2e API + browser scenarios.
- Wiring and docs: compose, k8s, CI, README, the CLAUDE.md files, a new diagram, the plan's Mutations Log, backlog.

**Out of scope (not planned, or tracked elsewhere)**

| Item | Where |
|---|---|
| Publishing the Google consent screen (out of Testing mode) | task-105 AC #6 |
| Other providers (GitHub, Apple, Microsoft) | — (not planned) |
| Unlinking Google, a "connected accounts" list | — (not planned) |
| Copying name, picture or a changed email from Google on each sign-in | — (not planned; the email stays ours) |
| Google One Tap or the Google JavaScript button | — (not planned; plain server-side redirect flow) |
| Re-authenticating with Google instead of a password for account actions | — (not planned; Google-only users set a password by email) |
| Rate limits on Google sign-ins | — (not planned; every attempt needs a real Google sign-in, which Google limits) |
| Returning to the page the visitor came from after Google | — (not planned; lands on `/`) |
| Google sign-in for ADMIN accounts | — (refused by decision 5) |
| Keeping Google access or refresh tokens | — (never; decision 6) |
| Restricting to a Google Workspace domain (`hd` claim), Google RISC security events | — (not planned) |

---

## Design decisions for this scope (differences from the plan are marked)

1. **Server-side OIDC authorization-code flow with Spring Security `oauth2Login`** (plan P5).
   - `GET /api/v1/auth/oauth2/authorization/google` starts it. `GET /api/v1/auth/oauth2/code/google` is the callback.
   - Both sit under `/api`, so Traefik, nginx and the Vite proxy need no routing change.
   - The button is a plain `<a href>` (full page navigation). No Google SDK in the browser.
2. **Feature switch and our own client registration** (*differs*: the plan used `spring.security.oauth2.client.*`).
   - `phrasal.google.enabled` (`GOOGLE_LOGIN_ENABLED`, default `false`). With `false` there is no `oauth2Login` at all.
   - A `GoogleLoginConfig` builds the `ClientRegistrationRepository` from `CommonOAuth2Provider.GOOGLE`, plus optional
     endpoint overrides for the stand-in provider. Boot's `spring.security.oauth2.client.registration.*` properties are
     not used: Boot refuses a registration with an empty client id, so they can't be "optional".
   - With `enabled=true`, a blank client id or secret fails startup (same as a missing `TOTP_ENCRYPTION_KEY`).
   - New public `GET /api/v1/auth/providers` → `{"google": true|false}`. The SPA shows the button only for `true`.
3. **The redirect URI comes from `APP_BASE_URL`** (*differs*: the plan used `{baseUrl}`).
   - It is `${APP_BASE_URL}/api/v1/auth/oauth2/code/google`, the same base the email links already use.
   - Why: `{baseUrl}` depends on forwarded headers, and `frontend/nginx.conf` hard-codes `X-Forwarded-Port 3000`.
     A visitor on another port (local `.env` uses 3100) would be sent back to the wrong origin.
   - In prod `APP_BASE_URL` is `https://phrasalbox.com`, which covers task-104 AC #7 without relying on headers.
   - The success and failure redirects are relative (`/`, `/login/2fa`, `/login?error=…`), so they stay on the origin
     of the callback.
4. **Account matching** (plan P5 and task-104):
   1. `google_subject` matches → that account.
   2. Otherwise, only if Google says `email_verified=true`: the account with that (normalized) email, if its
      `google_subject` is still empty → link it.
      - The local account is unverified → also mark it verified, remove its password, and invalidate its open
        verification and reset tokens. Whoever pre-registered the address loses access.
      - The account already has a different `google_subject` → refused (`google-account-conflict`).
   3. Otherwise, with a verified email → create a new verified `USER` account with no password.
   4. `email_verified` false or missing → refused (`google-email-unverified`). It never links and never creates,
      because the account would squat an address nobody proved.
   - The email of a linked account is never changed by Google. A phrasal email change keeps the link (the subject is
     the identity).
5. **ADMIN accounts can't use Google** (*new*). They are managed through config (`PHRASAL_ADMIN_*`) and need 2FA.
   Refusing Google keeps a stolen Google account of the admin address from even reaching the 2FA step
   (`google-admin-account`). One `if`; easy to drop later.
6. **The session principal stays the `AuthenticatedUser` record.**
   - `oauth2Login` gets a request-attribute `SecurityContextRepository`, so the `OAuth2AuthenticationToken` is never
     written to the session. Our success handler stores the `AuthenticatedUser` through `SessionAuthenticator`.
   - A no-op `OAuth2AuthorizedClientRepository`: Google's access token is not needed after sign-in, so it is not kept
     in memory or in `spring_session`.
   - If `OidcUserService#setRetrieveUserInfo` exists in 7.1, the userinfo call is turned off: the signed ID token already
     carries `sub`, `email` and `email_verified`.
7. **2FA after Google** uses `SessionAuthenticator`, exactly like password login: an account with 2FA gets a pending
   login (`startTwoFactorChallenge`) and is redirected to `/login/2fa`; no security context is saved.
8. **Errors come back as `/login?error=<code>`** with a fixed list of codes: `google`, `google-email-unverified`,
   `google-account-conflict`, `google-admin-account`. Any other OAuth2 error (cancel = `access_denied`, missing or
   replayed state, bad token) maps to `google`. The SPA maps codes to text and never prints the raw value.
9. **Accounts without a password** (*new*; deferred here by `reset-password-todos.md`, `account-funcs-todos.md` and
   `2FA-todos.md`):
   - Password login keeps answering the generic `401 Invalid email or password` (no enumeration). The login page
     shows a static hint "Signed up with Google? Use Continue with Google."
   - Change password, change email, delete account and 2FA setup keep requiring the current password
     (`400 wrong-password` for an account without one).
   - Such users set a password with the existing `forgot-password` → emailed link → `reset-password` flow. The reset
     proves the mailbox, as Google did. No new backend endpoint.
   - `AuthenticatedUser` gets `boolean passwordless`; `UserResponse` gets `hasPassword`. The negative name in the
     record is on purpose: sessions serialized before this change read the new component as `false`, which is right
     for every account that exists today.
10. **Local dev and e2e use `mock-oauth2-server`** (`ghcr.io/navikt/mock-oauth2-server`, exact tag pinned) in compose,
    with its interactive login form. Real Google locally: put the real client id and secret in `.env` and set the
    `GOOGLE_*_URI` overrides to empty values. k8s dev overlay: Google stays off.
11. **Schema:** `V17__add_users_google_subject.sql` (*differs*: the plan said V13). One nullable column, unique.
12. **Never log** the ID token, access token, authorization code, `state`, `nonce`, the Google subject, or the email at
    INFO. Log `userId` and the outcome (`created`, `linked`, `signed-in`) or the refusal code.

---

## Conventions for every step

- Backend rules are in `../../../../backend/CLAUDE.md`. Short version:
  - layers `domain → application → presentation`, with `infrastructure`/`config` cross-cutting; never import upward
  - DTOs are records in `application/dto`; Lombok on entities/services
  - Flyway `V{n}__*.sql`, never edit an applied migration
- Checkstyle runs in `mvn verify`:
  - line length ≤ 120, no star imports, no `TODO` comments
  - **no magic numbers** (named constants)
  - a blank line after a class `{`
  - `@param`/`@return` on non-private methods with Javadoc; no raw `<…>` in Javadoc
  - imports alphabetical (`com`, `lombok`, `net`, `org`), `java.*` before `javax.*`
  - no arrow-style `switch`
- JaCoCo needs **≥ 85 % line coverage per package**. Every test class has positive **and** negative cases.
- Look up library APIs with **Context7** before writing Spring Security OAuth2 / React Router code.
- Run the narrowest command after each step:
  - backend (from `backend/`): `mvn -q -o test -Dtest='A,B'`; Checkstyle `mvn -q -o checkstyle:check@checkstyle-check`
  - frontend (from `frontend/`): `npx vitest run <files>`
  - e2e: `npx cucumber-js --name "<title>"` with the stack up (`docker compose up -d --build --wait`)
- Run `make clean build` at the end of each phase. Restart the backend between full e2e runs (login 429).
- **Commits:** one per phase. Ask the user for approval before each commit. Format `type(scope): description`,
  ≤ 80 characters, no `Co-Authored-By` trailer.
- **Secrets:** the real Google client id and secret live only in GitHub Secrets, the password manager and the local
  `.env`. Never in git, `audit.md` or `session-log.md` (write `*****`). The mock client values in compose and tests
  are dev-only and may be committed.

---

## Phase 0 — Preparation (no code)

- [x] **0.1** Create branch `google-sign-in` from `develop` (contains `cb933cc`). Working tree clean apart from
      blackbox files.
- [x] **0.2** Run `make clean build` once on the untouched branch and note the baseline here.
  - Last known green (`cb933cc`): backend 696 tests, frontend 1654 tests in 86 files, e2e 140 scenarios / 1101 steps.
  - **Baseline 2026-10-30 (`google-sign-in` at `5d6cad5`): green**, same counts: backend 696, frontend 1654 in 86 files,
    e2e 140 scenarios / 1101 steps. It also serves as the Phase 0 end-of-phase build (Phase 0 changed no code).
- [x] **0.3** Move **task-104** to `In Progress` (Backlog.md MCP `task_edit`).
- [x] **0.4** Update task-104 (MCP `task_edit`):
  - [x] implementation note with decisions 2, 3, 5, 6, 9 and 10 above
  - [x] AC #9: say that compose wires the mock provider and that k8s dev keeps Google off
  - [x] add AC: "`GET /api/v1/auth/providers` reports whether Google sign-in is on; the button is hidden when it is off"
        (AC #13)
  - [x] add AC: "Google sign-in to an ADMIN account is refused with a readable error" (AC #14)
  - [x] add AC: "An account without a password can set one through the emailed reset link from the account security page"
        (AC #15)
- [x] **0.5** Look up with Context7 and write the notes under this step:
  - [x] Boot 4.1: the OAuth2 client starter name (expected `spring-boot-starter-security-oauth2-client`) and whether its
        auto-configuration backs off when we declare our own `ClientRegistrationRepository`
  - [x] Boot 4.1: `@ConditionalOnBooleanProperty`
  - [x] Security 7.1 `oauth2Login` DSL: `loginPage`, `authorizationEndpoint().baseUri`, `redirectionEndpoint().baseUri`,
        `userInfoEndpoint().oidcUserService`, `successHandler`, `failureHandler`, `authorizedClientRepository`, and
        `securityContextRepository` (on `AbstractAuthenticationFilterConfigurer`)
  - [x] `CommonOAuth2Provider.GOOGLE` defaults: scopes, URIs, `issuerUri`, `userNameAttributeName`, client auth method
  - [x] `OidcUserService#setRetrieveUserInfo` (decision 6)
  - [x] how the `nonce` is sent (hashed in the authorization URL) and checked against the ID token; needed by the fake
        provider in Phase 6
  - [x] the `OAuth2Error` codes for a user cancel (`access_denied`) and a missing authorization request
        (`authorization_request_not_found`)
  - [x] whether `loginPage("/login")` stops `DefaultLoginPageGeneratingFilter`, and that an explicit
        `exceptionHandling().authenticationEntryPoint` still wins over the `LoginUrlAuthenticationEntryPoint` default
  - [x] Nimbus (`RSAKeyGenerator`, `SignedJWT`, `JWKSet`) on the test classpath via `spring-security-oauth2-jose`

  **Notes (2026-10-30; Context7 plus the 7.1.2 / 4.1.2 sources jars).** Boot 4.1.2 manages Security **7.1.2**.
  - **Starter:** `org.springframework.boot:spring-boot-starter-security-oauth2-client`. The old
    `spring-boot-starter-oauth2-client` is still in the BOM, as a deprecated alias. The auto-config module is
    `spring-boot-security-oauth2-client` (package `org.springframework.boot.security.oauth2.client.autoconfigure`).
  - **Back-off** (`OAuth2ClientConfigurations`, `servlet/OAuth2ClientWebSecurityAutoConfiguration`):
    - Boot builds a `ClientRegistrationRepository` only when `spring.security.oauth2.client.registration.*` is set and
      no such bean exists. We never set those properties, so with Google off there are no OAuth2 beans at all.
    - With our own repository bean, Boot adds an `InMemoryOAuth2AuthorizedClientService`
      (`@ConditionalOnBean(ClientRegistrationRepository)` + `@ConditionalOnMissingBean`) and an
      `OAuth2AuthorizedClientRepository` (`@ConditionalOnMissingBean`). Declaring our no-op repository as a bean makes
      the second one back off. The first one stays, unused.
    - Boot's own `oauth2Login` `SecurityFilterChain` is `@ConditionalOnDefaultServletWebSecurity`, so it backs off
      because we declare `SecurityConfig#filterChain`. No second chain.
  - **`@ConditionalOnBooleanProperty`** exists (Boot 3.5+): `name`, `havingValue` (default `true`), `matchIfMissing`.
    Use `@ConditionalOnBooleanProperty("phrasal.google.enabled")`.
  - **`oauth2Login` DSL** (`OAuth2LoginConfigurer`) has `clientRegistrationRepository`, `authorizedClientRepository`,
    `authorizedClientService`, `loginPage`, `loginProcessingUrl`, `securityContextRepository` (its own method; set on
    the `OAuth2LoginAuthenticationFilter`), `authorizationEndpoint(c -> c.baseUri(..))`,
    `redirectionEndpoint(c -> c.baseUri(..))` and `userInfoEndpoint(c -> c.oidcUserService(..))`. `successHandler`,
    `failureHandler` and `permitAll` come from `AbstractAuthenticationFilterConfigurer`. Planned values:
    authorization base URI `/api/v1/auth/oauth2/authorization`, redirection base URI `/api/v1/auth/oauth2/code/*`. The
    redirection base URI must match the registration's `redirectUri`.
  - **`CommonOAuth2Provider.GOOGLE`:** `CLIENT_SECRET_BASIC`, the default redirect `{baseUrl}/{action}/oauth2/code/
    {registrationId}` (we override it, decision 3), scopes `openid profile email`, the authorization URI
    `https://accounts.google.com/o/oauth2/v2/auth`, token URI `https://www.googleapis.com/oauth2/v4/token`, JWK set URI
    `https://www.googleapis.com/oauth2/v3/certs`, issuer URI `https://accounts.google.com`, user-info URI
    `https://www.googleapis.com/oauth2/v3/userinfo`, user-name attribute `sub` and client name `Google`.
  - **`OidcUserService#setRetrieveUserInfo(Predicate<OidcUserRequest>)`** exists (`public final`). Use
    `setRetrieveUserInfo(request -> false)`; the ID token already carries `sub`, `email` and `email_verified`.
  - **Nonce:** `DefaultOAuth2AuthorizationRequestResolver` keeps the raw nonce in the authorization request
    attributes. The authorization URL gets `nonce=` plus base64url-no-padding(SHA-256(raw nonce)).
    `OidcAuthorizationCodeAuthenticationProvider` requires the ID token's `nonce` claim to **equal that hash**;
    otherwise the error is `invalid_nonce`. So the fake provider copies the `nonce` query parameter into the ID token
    unchanged.
  - **ID token checks** (`OidcIdTokenValidator`, `OidcIdTokenDecoderFactory`):
    - signed with RS256, verified against the registration's JWK set URI
    - `iss` must equal the registration's `issuerUri`
    - `aud` must contain the client id, and `azp` (if present) must equal it
    - `sub`, `exp` and `iat` are required; the clock skew is 60 s
    - any failure → `invalid_id_token`
  - **Error codes:** a user cancel arrives as `error=access_denied` (`OAuth2ErrorCodes.ACCESS_DENIED`). A callback
    with no saved authorization request gives `authorization_request_not_found` (`OAuth2LoginAuthenticationFilter`).
    A state that doesn't match gives `invalid_state_parameter`. Others: `invalid_nonce`, `invalid_id_token`. They all
    reach the failure handler as an `OAuth2AuthenticationException` and map to `google` (decision 8).
  - **Login page:**
    - `loginPage("/login")` sets `customLoginPage`, and then `initDefaultLoginFilter` does not configure
      `DefaultLoginPageGeneratingFilter`.
    - The configurer registers its `LoginUrlAuthenticationEntryPoint` only through
      `exceptionHandling.defaultAuthenticationEntryPointFor(..)` (for `text/html` requests).
    - `ExceptionHandlingConfigurer#getAuthenticationEntryPoint` uses an explicitly set `authenticationEntryPoint`
      first and only falls back to the defaults when none is set. Our JSON 401 entry point therefore still wins; Phase
      5 tests prove it.
    - Without `loginPage`, one registration makes it auto-redirect every unauthenticated request to Google. That is
      another reason to set it.
  - **Nimbus:** `nimbus-jose-jwt` comes in at compile scope through `spring-security-oauth2-jose`, so `RSAKeyGenerator`,
    `SignedJWT` and `JWKSet` are on the test classpath with no extra dependency (checked in 1.1.2).
- [x] **0.6** Read the `mock-oauth2-server` README (GitHub) and note: the current release tag, `JSON_CONFIG` with
      `interactiveLogin`, the login form field names (expected `username` → `sub`, `claims` = JSON), how the `iss`
      claim is derived (from the request host), and whether the image has a shell for a compose healthcheck.

  **Notes (2026-10-30; README plus the 6.1.4 sources).**
  - **Releases:** the latest is `6.1.4` (2026-10-28); earlier ones are `6.1.3` (10-23), `6.1.2` (10-18) and `6.1.1`
    (10-16). Choose the exact tag in Phase 8. Prefer one that is at least two weeks old, so `6.1.1` or older.
  - **Config:** `JSON_CONFIG` holds the full `OAuth2Config` JSON and wins over `JSON_CONFIG_PATH`. `interactiveLogin`
    is already `true` in standalone (Docker) mode; set it explicitly anyway. `tokenCallbacks` take `issuerId`,
    `tokenExpiry` and `requestMappings` (`requestParam`, `match`, `claims`). Env vars: `SERVER_PORT`/`PORT` (default
    `8080`), `SERVER_HOSTNAME` and `LOG_LEVEL`.
  - **Login form:** `GET /{issuerId}/authorize` shows a form that POSTs `username` (required) and `claims` (optional,
    a JSON object in a textarea).
    - `username` becomes `sub`, unless a request mapping sets `sub`.
    - `claims` are added to the token. They can't overwrite claims set by a mapping; JSON that doesn't parse is logged
      and ignored.
    - So e2e sets `email` and `email_verified` through `claims`.
  - **Nonce:** the mock copies the authorization request's `nonce` parameter (already the hash) into the ID token, which
    is what Spring checks.
  - **Endpoints:** the first path segment is the `issuerId`. With `default` that gives `/default/authorize`,
    `/default/token`, `/default/jwks`, `/default/userinfo` and `/default/.well-known/openid-configuration`.
  - **`iss`:** taken from the host that calls the endpoint, e.g. `http://localhost:8080/default`. The ID token comes
    from the **token** call, which the backend makes over the compose network, so `iss` is
    `http://mock-oauth2:8080/default`. Therefore:
    - the issuer and token/JWK URIs use the in-network host `mock-oauth2:8080`
    - only the authorization URI uses the browser host `localhost:${MOCK_OAUTH2_PORT}`
  - **Health:** `GET /isalive` returns 200 when the server is ready. The image (jib on `cgr.dev/chainguard/jre:latest-dev`)
    has `sh` and `/usr/bin/wget`, checked with `docker run --entrypoint sh` on 6.1.4. Compose healthcheck:
    `wget -q --spider http://localhost:8080/isalive`.
- [ ] **0.7** User actions (task-106 AC #4, #5). Needed for the manual real-Google check (12.3) and prod (Phase 13),
      **not** for local dev or e2e, which use the mock:
  - [ ] Google Cloud project, OAuth consent screen: app name, support email, authorized domain `phrasalbox.com`, scopes
        `openid`, `email`, `profile`, Testing mode, your Google account as a test user
  - [ ] OAuth client (Web application) with redirect URIs:
        `https://phrasalbox.com/api/v1/auth/oauth2/code/google`,
        `http://localhost:3000/api/v1/auth/oauth2/code/google`,
        `http://localhost:3100/api/v1/auth/oauth2/code/google` (the local `.env` port),
        `http://localhost:5173/api/v1/auth/oauth2/code/google`
  - [ ] client id and secret in the password manager and as GitHub Secrets `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`.
        Never paste them into the chat.

---

## Phase 1 — Dependency, migration, entity, repository

### 1.1 Dependency
- [x] **1.1.1** `../../../../backend/pom.xml`: add the OAuth2 client starter from 0.5 (version from the Boot BOM, not
      pinned). Added `spring-boot-starter-security-oauth2-client`.
- [x] **1.1.2** `mvn -q -o dependency:tree | grep -E "oauth2|nimbus"` (online once if the offline repo lacks it):
      `spring-security-oauth2-client`, `spring-security-oauth2-jose` and `nimbus-jose-jwt` are present.
      Result: `spring-boot-security-oauth2-client` 4.1.2, `spring-security-oauth2-client`/`-jose`/`-core` 7.1.2,
      `nimbus-jose-jwt` 10.9.1 and `oauth2-oidc-sdk` 11.38.2, all compile scope.
- [x] **1.1.3** Run the whole backend suite: nothing changes yet. With no `ClientRegistrationRepository` bean, Boot
      must not add a login page or a second filter chain. If it does, note it and handle it in Phase 2.
      Result: 696/696 green. The log shows no `OAuth2LoginAuthenticationFilter`, no `DefaultLoginPageGeneratingFilter`
      and no generated password. Nothing to handle in Phase 2.

### 1.2 Migration
- [x] **1.2.1** `../../../../backend/src/main/resources/db/migration/V17__add_users_google_subject.sql`:
  ```sql
  -- Google's stable account id ("sub" claim). NULL = never signed in with Google.
  ALTER TABLE users ADD COLUMN google_subject VARCHAR(255);
  CREATE UNIQUE INDEX ux_users_google_subject ON users (google_subject);
  ```
  (Postgres allows many NULLs in a unique index, so no partial index is needed.)

### 1.3 Domain
- [x] **1.3.1** `domain/entity/User.java`:
  - [x] field `googleSubject` (`@Column(name = "google_subject", length = GOOGLE_SUBJECT_MAX_LENGTH)`,
        `@Setter(AccessLevel.NONE)`), constant `GOOGLE_SUBJECT_MAX_LENGTH = 255`
  - [x] keep `@ToString(of = {"id", "email", "role"})`: the subject stays out of `toString`
  - [x] `public static User fromGoogle(String email, String subject, LocalDateTime verifiedAt)`: role `USER`, no password
        hash, verified at `verifiedAt`
  - [x] `public void linkGoogle(String subject)`: throws `IllegalStateException` if another subject is already set;
        the same subject again is a no-op
  - [x] `public void removePassword()`: nulls `passwordHash` (used only when linking an unverified account)
  - [x] `public boolean hasPassword()`
- [x] **1.3.2** `domain/repository/UserRepository.java`: `Optional<User> findByGoogleSubject(String googleSubject)`.

### 1.4 Tests
- [x] **1.4.1** `UserEntityTest`:
  - [x] `fromGoogle` sets email, subject, role `USER`, verified, no password; `hasPassword()` false
  - [x] `linkGoogle` on an empty subject sets it; the same subject again is fine; another subject → exception
  - [x] `removePassword` nulls the hash; `toString` contains neither the hash nor the subject
  - plus: a password user has `hasPassword()` true and no subject. 6 new tests, 22 in total.
- [x] **1.4.2** `UserRepositoryIntegrationTest`:
  - [x] save with a subject → `findByGoogleSubject` finds it; an unknown subject → empty
  - [x] negative: a second user with the same subject → `DataIntegrityViolationException`
  - [x] two users without a subject can coexist
  - plus: `linkGoogle` on a saved account persists the subject. 5 new tests, 18 in total.
- [x] **1.4.3** `mvn -q -o test -Dtest='UserEntityTest,UserRepositoryIntegrationTest'` → green (40 tests). Checkstyle
      clean.
- [x] **1.5** End of phase: `make clean build` green (2026-10-30). Backend 707 tests (+11), JaCoCo met; frontend 1654 in
      86 files; e2e 140 scenarios / 1101 steps.

---

## Phase 2 — Configuration: properties, client registration, providers endpoint

### 2.1 Properties
- [x] **2.1.1** `config/GoogleLoginProperties.java`: `@ConfigurationProperties("phrasal.google")`
      `record GoogleLoginProperties(boolean enabled, String clientId, String clientSecret, String authorizationUri,
      String tokenUri, String jwkSetUri, String issuerUri, String userInfoUri)`:
  - [x] compact constructor: `enabled` with a blank `clientId` or `clientSecret` → `IllegalStateException` naming the
        env var (`GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET`), never its value
  - [x] `toString()` masks `clientSecret` (records print every component)
  - [x] the URI fields are optional overrides; blank = Google's own endpoint
- [x] **2.1.2** `application.yml`:
  ```yaml
  phrasal:
    google:
      enabled: ${GOOGLE_LOGIN_ENABLED:false}
      client-id: ${GOOGLE_CLIENT_ID:}
      client-secret: ${GOOGLE_CLIENT_SECRET:}
      # Overrides for a stand-in provider (docker-compose mock). Empty = Google's own endpoints.
      authorization-uri: ${GOOGLE_AUTHORIZATION_URI:}
      token-uri: ${GOOGLE_TOKEN_URI:}
      jwk-set-uri: ${GOOGLE_JWK_SET_URI:}
      issuer-uri: ${GOOGLE_ISSUER_URI:}
      user-info-uri: ${GOOGLE_USER_INFO_URI:}
  ```
- [x] **2.1.3** `GoogleLoginPropertiesTest`: disabled + blank values → fine; enabled + blank id → exception whose message
      names `GOOGLE_CLIENT_ID`; enabled + blank secret → names `GOOGLE_CLIENT_SECRET`; `toString` doesn't contain the
      secret.

### 2.2 Client registration
- [x] **2.2.1** `config/GoogleLoginConfig.java`, `@Configuration`, active only when `phrasal.google.enabled=true`
      (`@ConditionalOnBooleanProperty`, checked in 0.5):
  - [x] `@Bean ClientRegistrationRepository` = `new InMemoryClientRegistrationRepository(registration)`
  - [x] `registration` = `CommonOAuth2Provider.GOOGLE.getBuilder("google")` + client id + secret +
        `redirectUri(appProperties.baseUrl() + "/api/v1/auth/oauth2/code/{registrationId}")` + `scope("openid",
        "email", "profile")`, then each non-blank override from `GoogleLoginProperties`
  - [x] put the URI building in a package-private static method `registration(GoogleLoginProperties, String baseUrl)`,
        so a unit test can check it without a context
- [x] **2.2.2** `GoogleLoginConfigTest` (unit):
  - [x] no overrides → Google's authorization, token and JWK URIs and issuer; scopes `openid email profile`; redirect
        `https://phrasalbox.com/api/v1/auth/oauth2/code/{registrationId}` for base URL `https://phrasalbox.com`
  - [x] overrides → every overridden URI is used, the others keep Google's
  - [x] a trailing `/` in the base URL doesn't produce `//api` (strip it, or document that `APP_BASE_URL` has none)
        Documented: `AppProperties` already fails startup for a base URL with a trailing slash
        (`AppPropertiesTest.trailingSlash`); the Javadoc of `registration(...)` says so. It takes the `URI` from
        `AppProperties`.
  - plus: a partial override keeps Google's other endpoints (blank and `null` ignored); an
    `ApplicationContextRunner` shows the repository exists with `enabled=true` and is absent with `false` or unset.
    5 tests.

### 2.3 Providers endpoint
- [x] **2.3.1** `application/dto/AuthProvidersResponse.java`: `record AuthProvidersResponse(boolean google)`.
- [x] **2.3.2** `AuthController`: `@GetMapping("/providers")` → `new AuthProvidersResponse(googleLoginProperties.enabled())`.
      Public through the existing `GET /api/**` rule; no rate limit (a constant answer).
- [x] **2.3.3** Integration tests:
  - [x] the default test profile → `{"google": false}` for now; Phase 6 turns Google on in `application-test.yml` and
        flips this assertion to `true`
  - [x] `GoogleLoginDisabledIntegrationTest` (`@TestPropertySource(properties = "phrasal.google.enabled=false")`):
        providers → `{"google": false}`; `GET /api/v1/auth/oauth2/authorization/google` → not a redirect (expect
        `404`; write the actual status in the test)
        Result: `404` with no `Location` for both the authorization endpoint and the callback; no
        `ClientRegistrationRepository` bean. 4 tests. The default-profile check is the new
        `AuthProvidersIntegrationTest` (anonymous and signed-in `GET` → `{"google":false}`; an anonymous `POST` → `401`).
- [x] **2.3.4** `mvn -q -o test -Dtest='GoogleLogin*Test,AuthController*'` → green.
      (There is no `AuthController*` test class; ran `GoogleLogin*Test,AuthProvidersIntegrationTest`: 17 tests green.)
      `GoogleLoginPropertiesTest` has 5 tests. Checkstyle clean. `backend/CLAUDE.md` Security section notes the switch,
      `GoogleLoginConfig` and the providers endpoint.
- [x] **2.4** End of phase: `make clean build` green (2026-10-30, together with Phase 3; see 3.6).

---

## Phase 3 — Principal: does the account have a password?

- [x] **3.1** `infrastructure/security/AuthenticatedUser.java`: add the component `boolean passwordless` (last).
  - [x] Javadoc: true for an account that signs in only with Google; sessions serialized before it existed read
        `false`, which is right for them (every older account has a password). Keep `serialVersionUID = 1L`.
  - [x] `withTwoFactor(boolean)` copies `passwordless`
- [x] **3.2** Every place that builds the record passes the right value:
  - [x] `AppUserDetails.toAuthenticatedUser()` → `false` (a password login proves there is one)
        Done as `!user.hasPassword()`: always `false` on the password path (`JpaUserDetailsService` refuses a null
        hash), and still right if the class is ever built for another account.
  - [x] `TwoFactorService.loadPrincipal(userId)` → `!user.hasPassword()` (the 2FA step after Google uses it)
  - [x] grep `new AuthenticatedUser(` in `src/main` and `src/test` and fix each call
        Main: `AppUserDetails`, `TwoFactorService`, `withTwoFactor`. Tests: `AuthenticatedUserTest`,
        `AppUserDetailsTest`, `SessionAuthenticatorTest`, `TwoFactorServiceTest`.
  - [x] plus: `UserMapper` (MapStruct, test-only use) maps `hasPassword` from `User#hasPassword()`.
- [x] **3.3** `application/dto/UserResponse.java`: add `boolean hasPassword` (= `!user.passwordless()`), with `@param`.
- [x] **3.4** Tests:
  - [x] `AuthenticatedUserTest`: `withTwoFactor` keeps `passwordless`; serialization round trip keeps it; the existing
        "older session" test (or a new one) shows a record serialized without the component reads `false`
  - [x] `UserResponseTest` (or the existing mapper/DTO test): `hasPassword` is the negation
        Covered in `SessionAuthenticatorTest` (responses built by `UserResponse.from` now expect `hasPassword=true`)
        and `UserMapperTest` (new case: a Google account → `hasPassword=false`).
  - [x] `TwoFactorServiceTest.loadPrincipal`: an account without a hash → `passwordless = true`
  - [x] `AuthSessionIntegrationTest`: `/me` after a password login has `hasPassword: true`
- [x] **3.5** `mvn -q -o test -Dtest='AuthenticatedUserTest,TwoFactorServiceTest,AuthSessionIntegrationTest'` → green.
      Ran those plus `AppUserDetailsTest`, `SessionAuthenticatorTest`, `UserMapperTest`, `AuthLoginIntegrationTest`,
      `TwoFactorLoginIntegrationTest`: 83 tests green. Checkstyle clean. `AuthenticatedUserTest` has a new
      `PRE_PASSWORDLESS_STREAM` (bytes written by the 4-component record before the change) that reads
      `passwordless=false`. `backend/CLAUDE.md` principal invariant updated.
- [x] **3.6** End of phase: `make clean build` green (2026-10-30, Phases 2 and 3 in one run). Backend 729 tests
      (+22: 17 in Phase 2, 5 in Phase 3), JaCoCo met; frontend 1654 in 86 files; e2e 140 scenarios / 1101 steps.

---

## Phase 4 — Application service: matching a Google identity to an account

### 4.1 Input, result, refusal
- [x] **4.1.1** `application/dto/GoogleIdentity.java`: `record GoogleIdentity(String subject, String email,
      boolean emailVerified)`; `toString()` masks the email and the subject.
- [x] **4.1.2** `infrastructure/exception/GoogleSignInRefusedException.java` with `enum Reason { EMAIL_UNVERIFIED,
      ACCOUNT_CONFLICT, ADMIN_ACCOUNT }` and `String code()` → `google-email-unverified`, `google-account-conflict`,
      `google-admin-account`. Never a 4xx/5xx body: it only feeds the redirect (Phase 5), so no
      `GlobalExceptionHandler` entry.
- [x] **4.1.3** `GoogleSignInService.Outcome` enum `{ SIGNED_IN, LINKED, CREATED }` and
      `record GoogleSignInResult(AuthenticatedUser principal, Outcome outcome)`, next to the service.
      Done as `application/service/GoogleSignInResult.java` with the enum nested in it (`GoogleSignInResult.Outcome`),
      so the record and its enum live in one file. The record is `Serializable`, because `GoogleOidcUser` (a
      `Serializable` `DefaultOidcUser`) carries it.

### 4.2 Service
- [x] **4.2.1** `application/service/GoogleSignInService.java` (`@Service @Transactional @RequiredArgsConstructor @Slf4j`).
      `GoogleSignInResult signIn(GoogleIdentity identity)`:
  1. blank subject or blank email → `IllegalArgumentException` (Spring maps it to the generic `google` error later)
  2. `email = EmailNormalizer.normalize(identity.email())`; longer than 254 characters → `IllegalArgumentException`
     too (the generic `google` error; it can't be stored)
  3. `findByGoogleSubject(subject)` → found: ADMIN → refuse `ADMIN_ACCOUNT`; otherwise `SIGNED_IN`
  4. `!identity.emailVerified()` → refuse `EMAIL_UNVERIFIED`
  5. `findByEmail(email)` → found:
     - ADMIN → refuse `ADMIN_ACCOUNT`
     - `googleSubject` set (it differs, or step 3 would have found it) → refuse `ACCOUNT_CONFLICT`
     - unverified → `removePassword()`, `markEmailVerified(now)`, `userTokenRepository.invalidateActive(id,
       EMAIL_VERIFICATION, now)` and the same for `PASSWORD_RESET`; then `linkGoogle(subject)` → `LINKED`
     - verified → `linkGoogle(subject)` → `LINKED`
  6. not found → `saveAndFlush(User.fromGoogle(email, subject, now))` → `CREATED`. A
     `DataIntegrityViolationException` (two first sign-ins at once) → rethrow as `IllegalStateException`, which ends in
     the generic `google` error; the next attempt finds the account by subject.
  7. principal = `new AuthenticatedUser(id, email, role, user.isTwoFactorEnabled(), !user.hasPassword())`
  8. `log.info("Google sign-in userId={} outcome={}", id, outcome)`; refusals `log.info("Google sign-in refused
     reason={}", code)`. Never the email or the subject.
  - Time comes from the injected `Clock` (`LocalDateTime.now(clock)`).
  - Plus: linking also goes through `saveAndFlush`, so a unique clash while linking (the same subject linked to
    another account at the same moment) ends in the same `IllegalStateException` instead of failing at commit.
- [x] **4.2.2** A refused unverified-local link must not leave half-changes: the refusal checks (ADMIN, conflict) run
      before any change. Say so in a comment.

### 4.3 Tests
- [x] **4.3.1** `GoogleSignInServiceTest` (Mockito):
  - [x] known subject → `SIGNED_IN`, no save, principal fields copied (2FA flag, `passwordless`)
  - [x] known subject on an ADMIN → `ADMIN_ACCOUNT`
  - [x] unknown subject + unverified email → `EMAIL_UNVERIFIED`, `findByEmail` never called
  - [x] verified email of a verified account without a subject → `LINKED`, password kept
  - [x] verified email of an unverified account → `LINKED`, password removed, verified now, both token types invalidated
  - [x] verified email of an account with another subject → `ACCOUNT_CONFLICT`, nothing changed
  - [x] verified email of an ADMIN → `ADMIN_ACCOUNT`, nothing changed
  - [x] new email → `CREATED`, saved user is `USER`, verified, no hash, normalized email (`" Bob@Gmail.COM "`)
  - [x] `saveAndFlush` throws `DataIntegrityViolationException` → `IllegalStateException`
  - [x] blank subject / blank email → `IllegalArgumentException`
  - [x] an account with 2FA → principal `twoFactorEnabled = true`
- [x] **4.3.2** `integration/GoogleSignInServiceIntegrationTest` (real DB, no HTTP):
  - [x] create, then the same identity again → one row, `SIGNED_IN`
  - [x] link an unverified registered account (use `register` through MockMvc, don't verify): afterwards
        `password_hash IS NULL`, `email_verified_at` set, the emailed verification link answers
        `verification-link-invalid`
        Corrected: `EmailVerificationService#verify` treats a spent link of a now-verified account as the usual
        no-op (`204`), so it can't answer `verification-link-invalid`. The test asserts the `204` and checks the part
        that matters instead: a reset link mailed before the link answers `Reset Link Invalid`, and the old password
        gets `401`.
  - [x] link a verified account: its password login still works
  - [x] plus (unit): a clash while linking → `IllegalStateException`; 254 characters accepted, 255 refused;
        `GoogleIdentity.toString` masks; the three refusal codes
- [x] **4.3.3** `mvn -q -o test -Dtest='GoogleSignInService*'` → green (2026-10-30): 23 tests (20 unit, 3
      integration). Checkstyle clean.

- [x] **4.4** End of phase: `make clean build` green (2026-10-30, Phases 4 and 5 in one run).
---

## Phase 5 — Presentation: OIDC user service, handlers, security chain

### 5.1 Session handling for a first factor proven elsewhere
- [x] **5.1.1** `SessionAuthenticator`: `public LoginOutcome signInVerified(AuthenticatedUser principal,
      HttpServletRequest, HttpServletResponse)`:
  - [x] 2FA on → `securityContextHolderStrategy.clearContext()`, `pendingLogin.start(request, id)`,
        return `TwoFactorRequired` (no `saveContext`)
  - [x] otherwise → `Authenticated(establish(principal, …))`
  - [x] make `login(...)` call it after `authenticate(...)`, so both paths share one rule
  - [x] `startTwoFactorChallenge` stays (or is replaced by `signInVerified`; then delete it and its Javadoc mention in
        `backend/CLAUDE.md`)
        Replaced and deleted (it had no caller). `backend/CLAUDE.md` "Two-step login" now names `signInVerified`;
        `LoginOutcome` Javadoc says "a sign-in (password or Google)".
- [x] **5.1.2** `SessionAuthenticatorTest`: `signInVerified` with and without 2FA (pending attribute set and no
      `saveContext`; or context saved with the `AuthenticatedUser` principal and a new session id); the existing
      `login` cases still pass. The 2FA case also proves a context set before the call (the OAuth2 token, in the
      real flow) is cleared.

### 5.2 OIDC user service
- [x] **5.2.1** `presentation/security/GoogleOidcUser.java`: `extends DefaultOidcUser`, carries the
      `GoogleSignInResult`. Only lives during the callback request (decision 6).
      No `equals`/`hashCode` override: it is never compared, and the inherited ones (name, authorities, issuer, sub)
      are enough.
- [x] **5.2.2** `presentation/security/GoogleOidcUserService.java` (`@Component`, implements
      `OAuth2UserService<OidcUserRequest, OidcUser>`):
  - [x] delegate to a `new OidcUserService()` (userinfo off if 0.5 says it is possible)
  - [x] build `GoogleIdentity` from the **ID token**: `getSubject()`, `getEmail()`, `Boolean.TRUE.equals(getEmailVerified())`
  - [x] call `googleSignInService.signIn(identity)` and return `new GoogleOidcUser(…, result)`
  - [x] `GoogleSignInRefusedException` → `throw new OAuth2AuthenticationException(new OAuth2Error(reason.code()))`
  - [x] `IllegalArgumentException` / `IllegalStateException` → `OAuth2AuthenticationException(new OAuth2Error("google"))`
        (logged at WARN with our own message, which never holds the email or subject). Both keep the cause.
        `GENERIC_ERROR = "google"` is a public constant there; the handlers reuse it.
- [x] **5.2.3** `GoogleOidcUserServiceTest` (Mockito, a stubbed delegate or a hand-built `OidcUserRequest`):
  - [x] verified claims → the service gets the right identity, the result is attached
  - [x] `email_verified` missing → identity has `emailVerified = false`
  - [x] each refusal reason → `OAuth2AuthenticationException` with its code
  - [x] an unexpected `IllegalStateException` → code `google`
  - [x] plus: `email_verified=false` → unverified; no `email` claim → the service gets `null` and its
        `IllegalArgumentException` → `google`; the OIDC user has name = `sub`, the same ID token, `OIDC_USER` and
        `SCOPE_openid`. Uses the real `OidcUserService` delegate with a hand-built request (userinfo off, so no
        network). 8 tests.

### 5.3 Success and failure handlers
- [x] **5.3.1** `presentation/security/GoogleLoginSuccessHandler.java` (`AuthenticationSuccessHandler`):
  - [x] read the `GoogleSignInResult` from the `GoogleOidcUser` principal; any other principal type →
        redirect `/login?error=google` (defensive)
  - [x] `sessionAuthenticator.signInVerified(...)` → `Authenticated` → redirect `/`; `TwoFactorRequired` →
        redirect `/login/2fa`
  - [x] redirects are relative paths (decision 3); constants for the three paths
- [x] **5.3.2** `presentation/security/GoogleLoginFailureHandler.java` (`AuthenticationFailureHandler`):
  - [x] an `OAuth2AuthenticationException` whose error code is one of the three refusal codes → `/login?error=<code>`
  - [x] anything else (cancel, missing state, bad token, I/O) → `/login?error=google`
  - [x] `log.info("Google sign-in failed code={}", oauth2ErrorCode)`; never the exception message at INFO (it can hold
        the token endpoint's answer); the stack trace only at DEBUG
        Plus: the code can come straight from the callback's `error` parameter, so the log gets it only when it
        matches `[a-z0-9_-]{1,64}` (otherwise `unrecognized`; a non-OAuth2 failure logs `none`). Fixed during the
        tests: `Set.contains(null)` on the immutable set threw for a non-OAuth2 failure.
- [x] **5.3.3** `GoogleLoginSuccessHandlerTest` / `GoogleLoginFailureHandlerTest` (`MockHttpServletRequest/Response`):
  - [x] success without 2FA → `302 /`, `signInVerified` called with the principal from the result
  - [x] success with 2FA → `302 /login/2fa`
  - [x] foreign principal → `302 /login?error=google`
  - [x] each refusal code passes through; `access_denied`, `authorization_request_not_found`, a plain
        `BadCredentialsException` → `google`; a made-up code like `<script>` → `google`
        Also `invalid_state_parameter`, `invalid_nonce`, `invalid_id_token`, `invalid_token_response`, `google` and
        `google-admin-account&x=1` → `google`; two `OutputCaptureExtension` tests prove the INFO log holds the plain
        code and never the message, and that odd codes are not copied. 3 + 15 tests.

### 5.4 Security chain
- [x] **5.4.1** `config/SecurityConfig`: inject `ObjectProvider<ClientRegistrationRepository>` (or a small
      `GoogleLoginConfigurer` bean from `GoogleLoginConfig`). Only when it is available, add:
      Done with `ObjectProvider` plus the three Google components as parameters of the `securityFilterChain` bean
      method, not constructor fields: as fields they made a cycle (success handler → `SessionAuthenticator` →
      `AuthenticationManager`, a bean of `SecurityConfig`). The DSL lives in a private static `googleLogin(...)`.
      `GoogleLoginConfig` got `AUTHORIZATION_BASE_URI` and `CALLBACK_BASE_URI` (`REDIRECT_PATH` builds on it).
      Plus: an object post-processor gives the `OAuth2AuthorizationRequestRedirectFilter` our failure handler.
      Without it an unknown registration id (`/api/v1/auth/oauth2/authorization/github`) answers a bare `500` and logs
      a WARN; now it redirects to `/login?error=google`.
  ```java
  .oauth2Login(oauth -> oauth
      .loginPage("/login")                                         // the SPA page; no generated backend page
      .authorizationEndpoint(a -> a.baseUri("/api/v1/auth/oauth2/authorization"))
      .redirectionEndpoint(r -> r.baseUri("/api/v1/auth/oauth2/code/*"))
      .userInfoEndpoint(u -> u.oidcUserService(googleOidcUserService))
      .securityContextRepository(new RequestAttributeSecurityContextRepository())
      .authorizedClientRepository(new NoOpAuthorizedClientRepository())
      .successHandler(successHandler)
      .failureHandler(failureHandler))
  ```
  - [x] `presentation/security/NoOpAuthorizedClientRepository` (load → `null`, save/remove → nothing), with a unit test
  - [x] add `GET /api/v1/auth/oauth2/**` → `permitAll` next to the other public auth rules (the `GET /api/**` rule
        already allows it; the explicit line documents it)
  - [x] update the class Javadoc rule list (and the rule order in `backend/CLAUDE.md`, with a paragraph on the flow)
- [x] **5.4.2** `SecurityRulesIntegrationTest` (Google on in the test profile from Phase 6):
      Plan mutation: the `application-test.yml` part of 6.1.2 (`phrasal.google.enabled: true`, `test-client`,
      `test-secret`) moved here, so these tests run against the real chain now. The endpoint overrides that point at
      `FakeGoogle` stay in 6.1.2; until then the registration has Google's real URIs, which no test calls.
      `AuthProvidersIntegrationTest` flipped to `{"google":true}`; `GoogleLoginDisabledIntegrationTest` (own context,
      `enabled=false`) still passes.
  - [x] anonymous `GET /api/v1/me/quiz-progress/phrasal-verbs` → still `401` problem+json, **not** a `302` to `/login`
        (with `Accept: */*` and with `Accept: text/html`, the case the login entry point would claim)
  - [x] `GET /login` on the backend → not a generated login page (`404`)
        Actual: `401` problem+json. `/login` is outside `/api/**`, so `denyAll` sends an anonymous caller to the JSON
        entry point; no HTML page either way.
  - [x] `POST /api/v1/auth/oauth2/authorization/google` → not a redirect (CSRF `403` or `401`; write the actual)
        Actual: `403` (the CSRF filter runs before the redirect filter), no `Location`.
  - [x] plus: `GET /api/v1/auth/oauth2/authorization/google` → `302` to `https://accounts.google.com/o/oauth2/v2/auth?…`
        (the chain is wired); an unknown provider → `302 /login?error=google`
- [x] **5.4.3** `mvn -q -o test -Dtest='SessionAuthenticatorTest,GoogleOidcUserServiceTest,GoogleLogin*HandlerTest,NoOpAuthorizedClientRepositoryTest'`
      → green. The full-flow tests follow in Phase 6.
      2026-10-30: those 37 plus `SecurityConfigAuthenticationTest` 3; and `SecurityRulesIntegrationTest` 22,
      `AuthProvidersIntegrationTest` 3, `GoogleLoginDisabledIntegrationTest` 4, `AuthSessionIntegrationTest` 5,
      `AuthLoginIntegrationTest` 10, `TwoFactorLoginIntegrationTest` 12, all green. Checkstyle clean.

- [x] **5.5** End of phase: `make clean build` green (2026-10-30, Phases 4 and 5 in one run). Backend 787 tests
      (+58: 23 in Phase 4, 35 in Phase 5), JaCoCo met; frontend 1654 in 86 files; e2e 140 scenarios / 1101 steps.
---

## Phase 6 — Full-flow integration tests with a fake Google

Why: `oidcLogin()` from spring-security-test skips the callback, the success handler and the session. A tiny fake
provider lets MockMvc run the real redirect → callback → token → ID token check → session path.

### 6.1 Fake provider
- [ ] **6.1.1** `integration/support/FakeGoogle.java`: a JDK `com.sun.net.httpserver.HttpServer` on a random port,
      started once per JVM (singleton, like the Postgres container). No new dependency.
  - [ ] an RSA key from Nimbus `RSAKeyGenerator`; `GET /jwks` serves its public `JWKSet`
  - [ ] `POST /token`: checks HTTP Basic `test-client:test-secret` (otherwise `401`), then returns
        `{access_token, token_type: "Bearer", expires_in, scope: "openid email profile", id_token}`
  - [ ] the ID token is signed RS256 with claims `iss` (`http://localhost:<port>`), `aud` = `test-client`, `sub`,
        `email`, `email_verified`, `nonce`, `iat`, `exp` (+5 min)
  - [ ] `nextIdentity(String sub, String email, boolean verified)` and `nextNonce(String)` set the claims of the next
        token; `nextAudience(String)` and `nextSigningKey(RSAKey)` exist only for the negative tests; `reset()` runs
        before each test
  - [ ] `GET /userinfo` only if userinfo could not be turned off (0.5); it returns the same `sub`/`email`
- [ ] **6.1.2** `../../../../backend/src/test/resources/application-test.yml`:
  ```yaml
  phrasal:
    google:
      enabled: true
      client-id: test-client      # test only
      client-secret: test-secret  # test only
  ```
  (this yml part is already done, moved to 5.4.2) and in `AbstractIntegrationTest`'s `@DynamicPropertySource`:
  `phrasal.google.authorization-uri`, `token-uri`,
  `jwk-set-uri`, `issuer-uri` (and `user-info-uri` if needed) pointing at `FakeGoogle`.
- [ ] **6.1.3** `AbstractIntegrationTest` helpers (cookie-based, like `registerAndLogin`):
  - [ ] `GoogleRedirect startGoogleSignIn()` → `GET /api/v1/auth/oauth2/authorization/google`, expects `302`, returns
        the `SESSION` cookie and the `state`, `nonce` and `redirect_uri` parsed from `Location`
  - [ ] `ResultActions finishGoogleSignIn(GoogleRedirect redirect, String sub, String email, boolean verified)` → sets
        the fake's next identity with `redirect.nonce()`, then `GET /api/v1/auth/oauth2/code/google?code=test-code&state=…`
        with the cookie
  - [ ] `Cookie googleSignIn(String sub, String email)` → both steps, expects `302 /`, returns the new `SESSION` cookie

### 6.2 `integration/GoogleLoginIntegrationTest`
- [ ] **6.2.1** Authorization redirect: `Location` starts with the fake authorization URI and has `response_type=code`,
      `client_id=test-client`, `scope` with `openid`, `email` and `profile`, `state`, `nonce`, and
      `redirect_uri=http://localhost:3000/api/v1/auth/oauth2/code/google` (the test `APP_BASE_URL`).
- [ ] **6.2.2** New user (task-104 AC #2):
  - [ ] callback → `302 /`; `GET /auth/me` with the new cookie → `200`, the email, `role USER`, `hasPassword false`
  - [ ] DB row: `google_subject` set, `password_hash` NULL, `email_verified_at` set
  - [ ] `spring_session.principal_name` = the email (so `SessionRevoker` can find it)
  - [ ] the session id changed between start and callback (fixation)
  - [ ] the stored principal is the `AuthenticatedUser` record: `/me` works, which it wouldn't with an `OidcUser`
- [ ] **6.2.3** Returning user: the same `sub` with a different `email` claim → the same account; its email unchanged.
- [ ] **6.2.4** Link by verified email (AC #3): `registerAndLogin` an account, log out, Google with that email →
      `302 /`, same user id; the password login still works afterwards.
- [ ] **6.2.5** Unverified local account (AC #4): `register` without verifying, Google with that email → `302 /`;
      the old password now gets `401`; the account is verified.
- [ ] **6.2.6** Refusals (AC #3, decision 4–5), each → `302 /login?error=<code>` and no session principal:
  - [ ] `email_verified=false`, unknown address → `google-email-unverified`, no row created
  - [ ] `email_verified=false`, existing address → `google-email-unverified`, the account untouched
  - [ ] an account already linked to another `sub` → `google-account-conflict`
  - [ ] an ADMIN account (saved directly through `UserRepository` with a unique email; the admin bootstrap has its
        own context in `AdminBootstrapIntegrationTest`) → `google-admin-account`, `google_subject` stays NULL
- [ ] **6.2.7** 2FA (AC #5): an account with 2FA (`enableTwoFactor`) signs in with Google → `302 /login/2fa`;
      `/auth/me` with that cookie → `401`; `submitTwoFactorCode(cookie, validCode)` → `200`; `/me` → `200`,
      `twoFactorEnabled true`.
- [ ] **6.2.8** Failures (AC #6), each → `302 /login?error=google`:
  - [ ] callback with `error=access_denied&state=<state>` (the user pressed Cancel at Google)
  - [ ] callback with a `state` that doesn't match the session
  - [ ] callback without a prior start (new session)
  - [ ] ID token with the wrong `nonce`
  - [ ] ID token with the wrong audience
  - [ ] ID token signed by another key
  - [ ] the token endpoint refuses the client (`FakeGoogle.failNextTokenRequest()` answers `401` once; cheaper than a
        second context with another secret)
- [ ] **6.2.9** `GoogleLoginDisabledIntegrationTest` (Phase 2) still passes with Google on everywhere else.
- [ ] **6.2.10** `cd backend && mvn clean verify` → green, JaCoCo ≥ 85 % in `presentation.security`,
      `application.service` and `config`.
- [ ] **6.2.11** Ask for commit approval → `feat(backend): let users sign in with their Google account`

---

## Phase 7 — Accounts without a password (backend)

No new endpoint (decision 9). This phase proves the existing endpoints behave and fixes one email text.

- [ ] **7.1** `integration/PasswordlessAccountIntegrationTest` (uses `googleSignIn` from 6.1.3):
  - [ ] `POST /auth/login` with the Google account's email and any password → `401 Invalid email or password`, the same
        body as an unknown email
  - [ ] `POST /me/password`, `/me/email`, `/me/delete` and `/me/2fa/setup` → `400 wrong-password`; nothing changed
  - [ ] set a password: `requestPasswordReset(email)` → token mailed → `resetPassword(token, newPassword)` → `204`;
        then the password login works, `/me` says `hasPassword true`, the Google login still finds the account by
        subject, and the old Google session is closed (`revokeAll`)
  - [ ] after that, change email, delete and 2FA setup work with the new password (one of them is enough; delete is
        the simplest)
- [ ] **7.2** `AccountEmailComposer.accountExists(...)`: add one static line to text and HTML: "If you signed up with
      Google, use "Continue with Google" on the login page, or reset your password to add one." It goes to every
      "account exists" notice, so it reveals nothing about this account.
- [ ] **7.3** `AccountEmailComposerTest`: the account-exists mail mentions Google in both parts; the other mails don't.
- [ ] **7.4** `mvn -q -o test -Dtest='PasswordlessAccountIntegrationTest,AccountEmailComposerTest'` → green.
- [ ] **7.5** Ask for commit approval → `feat(backend): let Google-only accounts set a password by email`
      (or fold into the Phase 6 commit if it is small; ask the user).

---

## Phase 8 — Config wiring: docker-compose, k8s, CI

### 8.1 docker-compose (dev and e2e)
- [ ] **8.1.1** `../../../../docker-compose.yml`: new service (tag from 0.6, pinned like `axllent/mailpit:v1.32.0`):
  ```yaml
  mock-oauth2:
    # Stands in for Google locally and in e2e, like Mailpit stands in for Brevo. Any username/claims are accepted.
    image: ghcr.io/navikt/mock-oauth2-server:<pinned-tag>
    ports:
      - "${MOCK_OAUTH2_PORT:-8090}:8080"
    environment:
      JSON_CONFIG: '{"interactiveLogin": true}'
    networks:
      - app-network
  ```
  - [ ] a healthcheck only if the image has a shell or a probe (0.6); otherwise none, and the e2e `BeforeAll` waits for
        `/default/.well-known/openid-configuration` (10.1.3)
  - [ ] the backend doesn't call the provider at startup, so no `depends_on`
- [ ] **8.1.2** `backend.environment` (dev-only values, the comment says how to use real Google):
  ```yaml
  # Google sign-in against the mock-oauth2 service. For real Google: put GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET in
  # .env and set the GOOGLE_*_URI variables to empty values ("GOOGLE_TOKEN_URI=").
  GOOGLE_LOGIN_ENABLED: ${GOOGLE_LOGIN_ENABLED:-true}
  GOOGLE_CLIENT_ID: ${GOOGLE_CLIENT_ID:-phrasal-local}
  GOOGLE_CLIENT_SECRET: ${GOOGLE_CLIENT_SECRET:-phrasal-local-secret}
  GOOGLE_AUTHORIZATION_URI: ${GOOGLE_AUTHORIZATION_URI-http://localhost:${MOCK_OAUTH2_PORT:-8090}/default/authorize}
  GOOGLE_TOKEN_URI: ${GOOGLE_TOKEN_URI-http://mock-oauth2:8080/default/token}
  GOOGLE_JWK_SET_URI: ${GOOGLE_JWK_SET_URI-http://mock-oauth2:8080/default/jwks}
  GOOGLE_ISSUER_URI: ${GOOGLE_ISSUER_URI-http://mock-oauth2:8080/default}
  ```
  - [ ] `${VAR-default}` (no colon) on purpose: an empty value in `.env` means "use Google's endpoint"
  - [ ] the browser reaches the mock at `localhost:<port>` (authorization), the backend reaches it at `mock-oauth2:8080`
        (token, keys); the mock puts the backend-side host into `iss`, which is why the issuer uses `mock-oauth2`
  - [ ] `docker compose config | grep GOOGLE_` shows the expected values (checks the nested `${…}`)
  - [ ] the local `.env` sets `APP_BASE_URL` to the frontend origin (`http://localhost:3100`); the redirect URI
        depends on it (decision 3)
- [ ] **8.1.3** `docker compose up -d --build --wait`, then `curl -s localhost:8180/api/v1/auth/providers` (the local
      backend port) → `{"google":true}`, and `curl -sI localhost:3100/api/v1/auth/oauth2/authorization/google` →
      `302` to `http://localhost:8090/default/authorize?...&redirect_uri=http%3A%2F%2Flocalhost%3A3100%2F...`.

### 8.2 nginx and Vite (check only)
- [ ] **8.2.1** `../../../../frontend/nginx.conf`: `/api/` already reaches the backend and passes `Set-Cookie` and
      `Location` unchanged. No edit: the redirect URI no longer depends on `X-Forwarded-Port` (decision 3).
- [ ] **8.2.2** `../../../../frontend/vite.config.ts`: `/api` is proxied; with `APP_BASE_URL=http://localhost:5173` the
      flow works through Vite too. Write that in the README (11.1), no code change.

### 8.3 k8s
- [ ] **8.3.1** `../../../../k8s/base/backend-configmap.yaml`: `google.enabled: "false"` (dev overlay has no mock).
- [ ] **8.3.2** `../../../../k8s/base/backend-secret.yaml`: `google.client-id: ""`, `google.client-secret: ""` (keep
      the DEV-ONLY comment).
- [ ] **8.3.3** `../../../../k8s/base/backend-deployment.yaml`: env `GOOGLE_LOGIN_ENABLED` (configMapKeyRef
      `google.enabled`), `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` (secretKeyRef `app-secrets`).
- [ ] **8.3.4** `../../../../k8s/overlays/prod/patches/backend-configmap.yaml`: `google.enabled: "true"`.
- [ ] **8.3.5** `../../../../k8s/overlays/prod/patches/secret.yaml.example`: `google.client-id: CHANGE_ME`,
      `google.client-secret: CHANGE_ME`.
- [ ] **8.3.6** `kubectl kustomize k8s/overlays/dev` and `kubectl kustomize k8s/overlays/prod` render (copy the example
      to `secret.yaml` locally, then delete the copy; `git status k8s` stays clean).
- [ ] **8.3.7** `../../../../skaffold.yaml`: check only (it uses the dev overlay; Google stays off).

### 8.4 CI
- [ ] **8.4.1** `../../../../.github/workflows/ci_cd.yml`, "Generate prod secret patch":
  - [ ] env `GOOGLE_CLIENT_ID: ${{ secrets.GOOGLE_CLIENT_ID }}`, `GOOGLE_CLIENT_SECRET: ${{ secrets.GOOGLE_CLIENT_SECRET }}`
  - [ ] guards like the TOTP one: `test -n "$GOOGLE_CLIENT_ID" || { echo "::error::GOOGLE_CLIENT_ID secret is missing"; exit 1; }`
        and the same for the secret
  - [ ] two `printf` lines `google.client-id` / `google.client-secret`
- [ ] **8.4.2** e2e job: nothing to add; `docker compose up -d --wait` starts `mock-oauth2` too. Check the job's env
      for `APP_BASE_URL` (defaults to `http://localhost:3000`, which matches the CI frontend port).
- [ ] **8.4.3** `make clean build` → green. Ask for commit approval →
      `build: wire Google sign-in and a local stand-in provider`

---

## Phase 9 — Frontend

### 9.1 Types, API, providers hook
- [ ] **9.1.1** `src/types.ts`: `CurrentUser` gets `hasPassword: boolean`; new `interface AuthProviders { google: boolean }`.
  - [ ] fix every test fixture that builds a `CurrentUser` (grep `twoFactorEnrollmentRequired:` in `src/__tests__`)
- [ ] **9.1.2** `src/api/authApi.ts`:
  - [ ] `export const GOOGLE_SIGN_IN_URL = '/api/v1/auth/oauth2/authorization/google'` (a full URL path, not under the
        client's `/api/v1` base, because it is used as an `href`)
  - [ ] `fetchAuthProviders(): Promise<AuthProviders>` → `GET /auth/providers`
- [ ] **9.1.3** `src/auth/useAuthProviders.ts`: returns `AuthProviders | null` (`null` while loading). One request per
      page load (module-level promise cache); a failed request → `{ google: false }`. Export a `resetAuthProvidersCache()`
      for tests.
- [ ] **9.1.4** Tests:
  - [ ] `src/__tests__/api/authApi.test.ts`: `fetchAuthProviders` hits `GET /api/v1/auth/providers`
  - [ ] `src/__tests__/auth/useAuthProviders.test.ts`: `null` → `{google: true}`; two components → one fetch; a
        rejected fetch → `{google: false}`

### 9.2 Google button
- [ ] **9.2.1** `src/components/GoogleSignInButton.tsx`:
  - [ ] renders nothing until `useAuthProviders()` says `google: true`
  - [ ] a plain `<a href={GOOGLE_SIGN_IN_URL}>` (full page load, **not** a router `Link`), `data-testid="google-sign-in"`
  - [ ] the standard four-colour Google "G" as inline SVG (`aria-hidden`) + text "Continue with Google"
  - [ ] Google's button colours: light `#FFFFFF` background, `#747775` border, `#1F1F1F` text; dark (`dark:`) `#131314`
        background, `#8E918F` border, `#E3E3E3` text; full width, works at 375 px
  - [ ] below it a divider "or" (`data-testid="auth-divider"`), rendered only with the button
- [ ] **9.2.2** `src/__tests__/GoogleSignInButton.test.tsx` (mock `authApi`):
  - [ ] loading → nothing; `google: false` → nothing; fetch error → nothing
  - [ ] `google: true` → a link with exactly that `href`, the text, and the divider

### 9.3 Login and Register pages
- [ ] **9.3.1** `src/auth/googleErrors.ts`: `googleErrorMessage(code: string | null): string | null`:
  - `google` → "Google sign-in didn't finish. Please try again."
  - `google-email-unverified` → "Google hasn't confirmed this email address, so it can't be used here. Sign up with
    email and password instead."
  - `google-account-conflict` → "This email address belongs to an account linked to a different Google account. Log
    in with your password instead."
  - `google-admin-account` → "Admin accounts sign in with email and password."
  - any other non-empty code → the `google` text; `null`/empty → `null`
- [ ] **9.3.2** `src/pages/LoginPage.tsx`:
  - [ ] `<GoogleSignInButton />` above the form
  - [ ] read `?error=` with `useSearchParams`, keep the mapped message in state, show it in the existing `auth-error`
        alert, then remove the parameter with `setSearchParams(…, { replace: true })` so a reload doesn't repeat it
  - [ ] a static hint under the password field: "Signed up with Google? Use Continue with Google."
        (`data-testid="login-google-hint"`); shown only when the button is
- [ ] **9.3.3** `src/pages/RegisterPage.tsx`: `<GoogleSignInButton />` above the form; nothing else changes (the
      honeypot stays).
- [ ] **9.3.4** Tests:
  - [ ] `src/__tests__/auth/googleErrors.test.ts`: every code, an unknown code, `null`, and `<script>` → generic text
  - [ ] `LoginPage.test.tsx`: the button and hint show when enabled; `?error=google-email-unverified` → that message in
        `auth-error`; `?error=whatever` → the generic message, never the raw value; the parameter is gone from the URL
        after render; existing tests still pass
  - [ ] `RegisterPage.test.tsx`: the button shows when enabled and hides when disabled
- [ ] **9.3.5** Check `useQuizProgressSync` with a user that appears on page load (a Google sign-in ends in a full reload
      of `/`, not in `AuthContext.login`): the anonymous progress is stashed and the server copy loads, as after a
      reload of a password session. If a test for that case is missing, add one to `QuizSync.test.tsx`.

### 9.4 Account security page for accounts without a password
- [ ] **9.4.1** `src/components/account/SetPasswordPanel.tsx` (`data-testid="set-password-panel"`):
  - [ ] text: "You sign in with Google. Set a password to change your email address, turn on two-factor
        authentication, or delete your account. You will be signed out everywhere after you set it."
  - [ ] button "Email me a link to set a password" (`set-password-request`) → `forgotPassword(user.email)`
  - [ ] success → "Check your inbox for a link. It expires in 1 hour." (`set-password-sent`; reuse
        `RESET_LINK_TTL_HOURS` from `ForgotPasswordPage`, move it to a shared module if needed)
  - [ ] `ApiError` (e.g. `429`) → `error.message` in an alert; the button is disabled while pending
- [ ] **9.4.2** `src/pages/AccountSecurityPage.tsx`, when `user.hasPassword === false` (and not admin):
  - [ ] show `SetPasswordPanel` at the top
  - [ ] hide `ChangePasswordForm`, `ChangeEmailForm` and `DeleteAccountSection`
  - [ ] in the 2FA status view, replace the "Turn on" button with "Set a password first to turn on two-factor
        authentication." (`two-factor-needs-password`)
- [ ] **9.4.3** Tests:
  - [ ] `src/__tests__/account/SetPasswordPanel.test.tsx`: request called with the user's email; success text; `429`
        message; pending state
  - [ ] `AccountSecurityPage.test.tsx`: a passwordless user sees the panel and the 2FA hint, and none of the three
        forms; a user with a password sees no panel (existing tests unchanged); the admin note is unchanged
- [ ] **9.4.4** `npm --prefix frontend run test:run && npm --prefix frontend run build` → green.
- [ ] **9.4.5** Ask for commit approval → `feat(frontend): add Continue with Google and a set-password panel`

---

## Phase 10 — E2E (Cucumber + Playwright, against the mock provider)

### 10.1 Support code
- [ ] **10.1.1** `../../../../e2e/src/support/mock-oauth2.ts`:
  - [ ] `MOCK_OAUTH2_URL` from `process.env` (default `http://localhost:8090`)
  - [ ] `uniqueGoogleSubject()` → `` `e2e-google-${Date.now()}-${random}` ``
  - [ ] `signInAtMock(page, { sub, email, emailVerified })`: waits for the mock's login page, fills `username` with
        `sub` and `claims` with `JSON.stringify({ email, email_verified })`, submits (field names from 0.6)
  - [ ] `waitForMockProvider()`: polls `/default/.well-known/openid-configuration` for up to 30 s
- [ ] **10.1.2** `../../../../e2e/src/world.ts`: `googleSubject: string | null`, reset in `hooks.ts` `Before`.
- [ ] **10.1.3** `../../../../e2e/src/hooks.ts`: call `waitForMockProvider()` in `BeforeAll` (cheap when it is up). The
      cleanup already deletes `e2e-%@phrasal.test` users; Google users use `uniqueEmail()`, so nothing new to delete.
- [ ] **10.1.4** `../../../../e2e/src/support/api-client.ts`: `getWithoutRedirect(path)` (`maxRedirects: 0`), for the
      `302` checks.
- [ ] **10.1.5** `../../../../e2e/src/support/db-client.ts` (or a helper next to it): `googleAccountState(email)` →
      `{ googleSubject, hasPassword, verified }`.
- [ ] **10.1.6** `../../../../e2e/.env.example`: `MOCK_OAUTH2_URL=http://localhost:8090`.

### 10.2 API feature: `e2e/features/auth-api/google-sign-in.feature` (`@api`)
- [ ] **10.2.1** Steps in `e2e/src/steps/google-api.steps.ts`:
  - `When I request the sign-in providers`
  - `Then Google sign-in should be enabled`
  - `When I start a Google sign-in`
  - `Then I should be redirected to the Google stand-in with the app's callback URL`
  - `When I open the Google callback without starting a sign-in`
  - `Then I should be redirected to the login page with the error {string}`
- [ ] **10.2.2** Scenarios:
  - [ ] providers → `200`, `google: true`
  - [ ] start → `302` to `<MOCK_OAUTH2_URL>/default/authorize` with `client_id`, `scope` (`openid email profile`),
        `state`, `nonce`, and `redirect_uri` = `<APP_BASE_URL>/api/v1/auth/oauth2/code/google`
  - [ ] callback with `code=x&state=y` and no started sign-in → `302 /login?error=google`

### 10.3 Browser feature: `e2e/features/frontend/google-sign-in.feature` (`@frontend`)
- [ ] **10.3.1** Steps in `e2e/src/steps/google-ui.steps.ts`. Reuse what exists: `I open the {string} page`,
      `a registered user exists`, `an unverified user exists`, `I have two-factor authentication enabled`,
      `I should be on the two-factor code page`, `I enter a valid two-factor code`, `the user menu should show my email`,
      `I log in through the form with password {string}`, `I should see an auth error`,
      `I open the password reset link from my email in the browser`. New:
  - `When I continue with Google as a new Google user`
  - `When I continue with Google again as the same Google user`
  - `When I continue with Google with my email`
  - `When I continue with Google with an unverified email`
  - `When I continue with Google with the admin email`
  - `Then I should see the Google sign-in button`
  - `Then I should see the Google error {string}` (text in `auth-error`, and no `error=` left in the URL)
  - `Then my account should be linked to Google without a password`
  - `When I ask for a link to set a password`
  - `Then I should see the set-password check-your-inbox message`
- [ ] **10.3.2** Scenarios:
  - [ ] the Login and Register pages show "Continue with Google"
  - [ ] a new Google user is signed in on `/`, the user menu shows the email, the DB row has a subject and no password
  - [ ] the same Google user signs in again → the same account (same email in the menu, one DB row)
  - [ ] a registered user links Google with the same email → signed in; after logout, the password login still works
  - [ ] an unverified registration with password "e2e-password-123", then Google with that email → signed in; after
        logout, the password login fails with an auth error
  - [ ] an unverified Google email → back on `/login` with the `google-email-unverified` text
  - [ ] the admin email → back on `/login` with the admin text
  - [ ] a user with 2FA continues with Google → the two-factor code page → a valid code → the user menu shows the email
  - [ ] a Google-only user opens Account security → the set-password panel → asks for a link → opens the reset link
        from Mailpit → sets a password → logs in through the form with it
  - [ ] cancel-like failure: open `/api/v1/auth/oauth2/code/google?error=access_denied&state=x` in the browser →
        `/login` with the generic Google text
- [ ] **10.3.3** `npx cucumber-js --name "Google"` then `make acceptanceTest` → all features green, old ones included.
- [ ] **10.3.4** Ask for commit approval → `test(e2e): cover Google sign-in against a stand-in provider`

---

## Phase 11 — Docs, diagrams, plan, backlog

- [ ] **11.1** `../../../../README.md`, new section "### Sign in with Google" (next to "Accounts & security"):
  - [ ] the two endpoints, `GET /auth/providers`, and where each redirect lands (`/`, `/login/2fa`, `/login?error=…`)
        with the error codes
  - [ ] the matching rules (subject → verified email → new account), the unverified-account rule, the admin refusal,
        and that Google never changes the account email
  - [ ] Google-only accounts: no password login; "Set a password" on Account security sends the reset link
  - [ ] Google Cloud setup (task-106): consent screen, Testing mode and test users, the OAuth client, the four redirect
        URIs; publishing is task-105
  - [ ] env table: `GOOGLE_LOGIN_ENABLED`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, the five `GOOGLE_*_URI`
        overrides, and that the redirect URI is built from `APP_BASE_URL`
  - [ ] local dev: the `mock-oauth2` service (http://localhost:8090), what to type in its form, how to switch to real
        Google in `.env`, and `APP_BASE_URL=http://localhost:5173` for Vite
  - [ ] GitHub Secrets `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` before the next tagged deploy
  - [ ] "Production monitoring": `kubectl logs … | grep "Google sign-in"` (outcome counts) and the leak check from 13.6
- [ ] **11.2** `../../../../backend/CLAUDE.md`, new section "Google Sign-In":
  - [ ] classes: `GoogleLoginProperties`, `GoogleLoginConfig`, `GoogleSignInService`, `GoogleOidcUserService`,
        `GoogleOidcUser`, `GoogleLoginSuccessHandler`, `GoogleLoginFailureHandler`, `NoOpAuthorizedClientRepository`
  - [ ] the linking rules, the refusal codes, the principal rule (no OIDC token in the session), `passwordless`
  - [ ] tests: `FakeGoogle`, `startGoogleSignIn` / `finishGoogleSignIn` / `googleSignIn`, `GoogleLoginDisabledIntegrationTest`
  - [ ] never-log list (decision 12)
  - [ ] update the Security rule order and the `startTwoFactorChallenge` sentence (5.1.1)
  - [ ] V17 in the schema notes
- [ ] **11.3** `../../../../frontend/CLAUDE.md`: `GoogleSignInButton`, `useAuthProviders`, `googleErrors`, the
      `?error=` handling on `LoginPage`, `SetPasswordPanel`, `CurrentUser.hasPassword`, `authApi.fetchAuthProviders`
      and `GOOGLE_SIGN_IN_URL`.
- [ ] **11.4** `../../../../e2e/CLAUDE.md`: the `mock-oauth2` service, `MOCK_OAUTH2_URL`, `mock-oauth2.ts`, the new
      features and steps files, `world.googleSubject`, `getWithoutRedirect`.
- [ ] **11.5** Diagrams (blackbox policy):
  - [ ] new `../../../../docs/diagrams/google-sign-in-flow.md`: a sequence diagram (browser → backend → Google →
        callback → `GoogleOidcUserService` → `GoogleSignInService` → success handler → `/` or `/login/2fa`), a flowchart
        of the matching rules and refusals, and a note on the mock provider
  - [ ] `auth-flow.md`: Google as a second entry into the session, the providers endpoint, the rule list
  - [ ] `two-factor-flow.md`: the Google entry into the pending 2FA step
  - [ ] `account-management-flow.md`: the Google-only path (set a password by email first)
- [ ] **11.6** Plan file `.claude/docs/blackbox/plans/2026-10-26 18:10 Multi-user …md`: append one `## Mutations Log`
      row (append only, delete nothing in that folder):
      `| <date> | split | P5 done as task-104: own ClientRegistrationRepository behind GOOGLE_LOGIN_ENABLED + GET /auth/providers; redirect URI from APP_BASE_URL; ADMIN accounts refused; Google-only accounts set a password via reset link; mock-oauth2-server in compose; V17 instead of V13 | Works without Google creds locally/CI; no forwarded-header dependency |`
- [ ] **11.7** Backlog (MCP):
  - [ ] task-104: check off the done AC (prod ones wait for Phase 13), implementation notes, final summary
  - [ ] task-106: note that AC #4/#5 are needed for 12.3 and Phase 13; check them only after the user confirms
  - [ ] task-103: note that the Google button (out of its scope) shipped here
  - [ ] **ask the user** before moving task-104 to `Done`
- [ ] **11.8** Ask for commit approval → `docs: document Google sign-in`
- [ ] **11.9** On the user's exit signal, append the blackbox `session-log.md` entry (format in
      `../../../rules/blackbox-policy.md`, under 20 lines, no secrets: no client id/secret, tokens or codes), including
      the plan mutation line and the new diagram.

---

## Phase 12 — Final verification

- [ ] **12.1** `make clean build` → green: backend verify (JaCoCo 85 %/package, Checkstyle), frontend build + tests,
      docker rebuild, e2e. Write the counts here.
- [ ] **12.2** Manual run with the mock (user): `docker compose up -d --build --wait`, http://localhost:3100,
      mock at http://localhost:8090, Mailpit at http://localhost:8025:
  - [ ] Login and Register show "Continue with Google"; dark mode and a 375 px window look right
  - [ ] new Google user → signed in on `/`; the menu shows the email; Account security shows the set-password panel
  - [ ] set a password through the emailed link → signed out → log in with the password and with Google
  - [ ] register + verify an account, then Google with that email → the same account
  - [ ] an account with 2FA → Google → `/login/2fa` → code → signed in
  - [ ] the admin email in the mock form → the admin message on `/login`
  - [ ] `email_verified` false in the mock form → the unverified message
  - [ ] DevTools: `SESSION` is `HttpOnly`, `SameSite=Lax`; no Google token in cookies or local storage
  - [ ] `docker compose logs backend | grep -iE "id_token|access_token|code=|state=|nonce="` → nothing;
        `grep "Google sign-in"` shows only `userId=` and `outcome=` / `reason=` / `code=`
- [ ] **12.3** Manual run with real Google (user; needs 0.7): put the client id and secret in `.env`, set the
      `GOOGLE_*_URI` variables empty, restart the backend, sign in with your test-user Google account at
      http://localhost:3100. Expected: Google's consent screen shows the app name; you land on `/` signed in.
- [ ] **12.4** Optional reviews before merging (only if the user asks): `api-contract-review` on `/auth/providers` and
      the redirects, `java-code-review`, `/security-review` (focus: linking rules, open redirect, state/nonce, logs),
      `/code-review`.
- [ ] **12.5** Open the PR `google-sign-in` → base chosen by the user, after the user approves.

---

## Phase 13 — Production rollout (user actions; every `kubectl` step needs approval)

- [ ] **13.1** Prerequisites:
  - [ ] GitHub Secrets `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` exist (the deploy now fails without them, 8.4.1)
  - [ ] `TOTP_ENCRYPTION_KEY` exists too (task-101 Phase 14 is still open; the same deploy needs it)
  - [ ] the prod redirect URI `https://phrasalbox.com/api/v1/auth/oauth2/code/google` is on the OAuth client
  - [ ] the consent screen is still in Testing mode: only its test users can sign in until task-105 AC #6 publishes it
        (others see Google's "access blocked" page). With only `openid`, `email` and `profile` the publish usually
        needs no Google review; check the console.
- [ ] **13.2** Release notes for the tag (`v0.x.0`): Google sign-in, Google-only accounts, the new secrets. Decide on a
      `pg_dump` before the deploy (V17 only adds a column).
- [ ] **13.3** After the deploy:
  - [ ] Flyway: the newest row of `flyway_schema_history` is `17`
  - [ ] `curl -s https://phrasalbox.com/actuator/health` → `UP`
  - [ ] `curl -s https://phrasalbox.com/api/v1/auth/providers` → `{"google":true}`
- [ ] **13.4** Redirect URI is https and the real domain (task-104 AC #7):
      `curl -sI https://phrasalbox.com/api/v1/auth/oauth2/authorization/google | grep -i location` → `accounts.google.com`
      with `redirect_uri=https%3A%2F%2Fphrasalbox.com%2Fapi%2Fv1%2Fauth%2Foauth2%2Fcode%2Fgoogle`.
- [ ] **13.5** Smoke test with a test-user Google account: sign in → `/`; Account security shows the set-password
      panel; log out. If that Google email already had an account, it is linked, not duplicated.
- [ ] **13.6** Log leak check: `kubectl logs deploy/backend | grep -iE "id_token|access_token|code=|state=|nonce="` →
      nothing.

---

## Coverage map (task-104 AC → where it's covered)

| AC | Covered by |
|---|---|
| #1 button on Login/Register, lands signed in | 9.2, 9.3, 10.3.2, 12.2 |
| #2 new verified USER; returning user by subject | 4.3, 6.2.2, 6.2.3, 10.3.2 |
| #3 link by verified email; unverified never links | 4.3, 6.2.4, 6.2.6, 10.3.2 |
| #4 linking an unverified local account removes its password | 4.3.2, 6.2.5, 10.3.2 |
| #5 2FA step before a session | 5.1, 6.2.7, 10.3.2 |
| #6 cancel/failure → login page with a readable error | 5.3, 6.2.8, 9.3, 10.2.2, 10.3.2 |
| #7 prod redirect URI https + real domain | decision 3, 2.2.2, 13.4 |
| #8 new migration for the Google subject | 1.2 (V17) |
| #9 env wiring compose/k8s/CI, no secrets committed | Phase 8 |
| #10 integration tests for the branches; Vitest for the button | Phases 4–7, 9.2.2 |
| #11 README setup; backend/CLAUDE.md linking rules | 11.1, 11.2 |
| #12 `make clean build` | 12.1 |
| new: providers endpoint, hidden button | 2.3, 9.1, 9.2.2, 10.2.2 |
| new: ADMIN refused | 4.3, 6.2.6, 10.3.2 |
| new: Google-only accounts set a password | Phase 7, 9.4, 10.3.2 |
