# Auth flow

Session-based auth inside Spring Boot (Spring Security 7 + Spring Session JDBC). The SPA and API share one origin.

## Register, login, me, logout

```mermaid
sequenceDiagram
    actor U as Browser (SPA)
    participant B as Backend
    participant DB as Postgres

    U->>B: POST /api/v1/auth/register {email, password}
    B->>B: rate limit, validate password, hash
    B->>DB: INSERT users (role USER)
    B-->>U: 201 {id, email, role}

    U->>B: POST /api/v1/auth/login {email, password}
    B->>B: rate limit (IP + email), authenticate
    B->>B: changeSessionId (fixation protection)
    B->>DB: INSERT spring_session (principal AuthenticatedUser)
    B-->>U: 200 {id, email, role} + Set-Cookie SESSION (HttpOnly, SameSite=Lax)

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
    MEP -- no --> RL{POST register or login?}
    RL -- yes --> PUB
    RL -- no --> W{POST / PUT / DELETE on phrasal-verbs, grammar-entries, verb-details?}
    W -- yes --> ADM
    W -- no --> G{GET /api/** ?}
    G -- yes --> PUB
    G -- no --> DENY[Deny]
    ADM --> C{logged in?}
    C -- no --> U401[401]
    C -- yes --> RO{role ADMIN?}
    RO -- no --> F403[403]
    RO -- yes --> OK[Allow]
```

## Deferred

Email verification (and Mailpit), password reset, TOTP 2FA, Google sign-in, ~~server-side quiz progress~~ (done, see [quiz-progress-flow.md](quiz-progress-flow.md)).
