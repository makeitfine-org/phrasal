# Auth flow

Session-based auth inside Spring Boot (Spring Security 7 + Spring Session JDBC). The SPA and API share one origin.

## Register, login, me, logout

```mermaid
sequenceDiagram
    actor U as Browser (SPA)
    participant B as Backend
    participant DB as Postgres

    U->>B: POST /api/v1/auth/register {email, password}
    B->>B: rate limit, honeypot check (website filled: stop here, same 202), validate password, breach check, hash
    B->>DB: INSERT users (role USER, email unverified)
    B-->>U: 202 {message} (same body for every address)
    Note over U,B: verify-email and login: see email-verification-flow.md

    U->>B: POST /api/v1/auth/login {email, password}
    B->>B: rate limit (IP + email), authenticate
    Note over U,B: account with 2FA: 202 and a second step, see two-factor-flow.md
    B->>B: changeSessionId (fixation protection)
    B->>DB: INSERT spring_session (principal AuthenticatedUser)
    B-->>U: 200 {id, email, role, twoFactorEnabled, twoFactorEnrollmentRequired} + Set-Cookie SESSION (HttpOnly, SameSite=Lax)

    U->>B: GET /api/v1/auth/me (Cookie SESSION)
    B->>DB: load session
    B-->>U: 200 {id, email, role}

    U->>B: POST /api/v1/auth/logout (X-XSRF-TOKEN)
    B->>DB: DELETE spring_session
    B-->>U: 204 + clears SESSION and XSRF-TOKEN cookies
    U->>B: GET /api/v1/auth/me (refresh, sets a new XSRF-TOKEN)
    B-->>U: 401 problem+json
```

## CSRF cookie-to-header on a write

```mermaid
sequenceDiagram
    actor U as SPA
    participant B as Backend

    U->>B: GET /api/v1/... (any request)
    B-->>U: Set-Cookie XSRF-TOKEN (readable by JS)
    U->>U: read XSRF-TOKEN cookie
    U->>B: POST /api/v1/... + Cookie XSRF-TOKEN + header X-XSRF-TOKEN
    alt header matches cookie
        B-->>U: handled (2xx / 401 / 403 by role)
    else missing or wrong
        B-->>U: 403 problem+json (type /csrf)
    end
```

## Authorization rules

```mermaid
flowchart TD
    R[Request] --> E{/error or /actuator/health/**?}
    E -- yes --> PUB[Allow: public]
    E -- no --> A{/actuator/** ?}
    A -- yes --> ADM[Require ADMIN]
    A -- no --> ME{GET /api/v1/auth/me?}
    ME -- yes --> AUTH[Require login: 401 if anonymous]
    ME -- no --> MEP{/api/v1/me/** ?}
    MEP -- yes --> AUTH
    MEP -- no --> RL{POST register, login, verify-email, resend-verification, forgot-password, reset-password or confirm-email-change?}
    RL -- yes --> PUB
    RL -- no --> OA{GET /api/v1/auth/oauth2/** ?}
    OA -- yes --> PUB
    OA -- no --> W{POST / PUT / DELETE on phrasal-verbs, grammar-entries, verb-details?}
    W -- yes --> ADM
    W -- no --> G{GET /api/** ?}
    G -- yes --> PUB
    G -- no --> DENY[Deny]
    ADM --> C{logged in?}
    C -- no --> U401[401]
    C -- yes --> RO{role ADMIN?}
    RO -- no --> F403[403]
    RO -- yes --> TF{2FA enabled?}
    TF -- no --> F403
    TF -- yes --> OK[Allow]
```

## Google as a second entry

Besides the password login, a visitor can start `GET /api/v1/auth/oauth2/authorization/google`. The callback ends in the
same session as password login (`SessionAuthenticator#signInVerified`), or in the pending 2FA step. The SPA asks
`GET /api/v1/auth/providers` (public, `{"google": bool}`) before it shows the button. `/auth/me` and `login` answers carry
`hasPassword`. Rules, refusals and the mock provider: [google-sign-in-flow.md](google-sign-in-flow.md).

## Account settings

Signed-in users change their password, change their email or delete their account through `/api/v1/me/password|email|delete`
(rules, sessions and mails: [account-management-flow.md](account-management-flow.md)). The only public endpoint of that
feature is `POST /api/v1/auth/confirm-email-change`, which opens from the link mailed to the new address.

## Deferred

~~TOTP 2FA~~ (done, see [two-factor-flow.md](two-factor-flow.md)), ~~Google sign-in~~ (done, see [google-sign-in-flow.md](google-sign-in-flow.md)), ~~password reset~~ (done, see [password-reset-flow.md](password-reset-flow.md)), ~~email verification~~ (done, see [email-verification-flow.md](email-verification-flow.md)), ~~server-side quiz progress~~ (done, see [quiz-progress-flow.md](quiz-progress-flow.md)).
