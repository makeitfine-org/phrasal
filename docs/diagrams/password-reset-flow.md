# Password reset flow

The link points at the SPA (`${APP_BASE_URL}/reset-password?token=...`); the page posts the token and the new password to
the API. Mail is sent after the database commit, so SMTP trouble never fails a request. Tokens live in `user_tokens` with
type `PASSWORD_RESET` (SHA-256 stored, single use, newest only, TTL `PASSWORD_RESET_TOKEN_TTL`, default 1 h).

## Forgot to new password

```mermaid
sequenceDiagram
    actor U as Browser (SPA)
    participant B as Backend
    participant DB as Postgres
    participant M as SMTP (Mailpit / Brevo)
    actor I as Inbox

    U->>B: POST /api/v1/auth/forgot-password {email}
    B->>DB: INSERT user_tokens (invalidate older ones)
    B-->>U: 202 {message}
    B--)B: after-commit event (async)
    B->>M: reset email with link
    M->>I: deliver
    I->>U: open /reset-password?token=...
    Note over U: SPA moves the token out of the address bar
    U->>B: POST /api/v1/auth/reset-password {token, password}
    B->>DB: new hash, token used, email verified, sessions deleted
    B-->>U: 204
    B--)B: after-commit event (async)
    B->>M: "password changed" notice
    U->>B: POST /api/v1/auth/login (new password)
    B-->>U: 200 + SESSION cookie
```

## Forgot-password outcomes

The answer is the same `202` on every path, so it cannot reveal which addresses have an account.

```mermaid
flowchart TD
    F[POST forgot-password] --> V{body valid?}
    V -- no --> R400[400]
    V -- yes --> IP{per-IP limit left?}
    IP -- no --> R429[429 + Retry-After]
    IP -- yes --> EM{per-email limit left?}
    EM -- no --> R429
    EM -- yes --> L{account exists?}
    L -- no --> N[nothing sent]
    L -- "yes (verified or unverified)" --> T[new token, older ones invalidated]
    T --> MAIL[reset mail after commit]
    N --> A202[202 same body]
    MAIL --> A202
```

## Reset-password checks, in order

```mermaid
flowchart TD
    S[POST reset-password] --> D{DTO valid?}
    D -- no --> R400[400 field errors: token still usable]
    D -- yes --> IP{per-IP limit left?}
    IP -- no --> R429[429: token untouched]
    IP -- yes --> K{token known, unused, newest?}
    K -- no --> INV[400 reset-link-invalid]
    K -- yes --> X{expired?}
    X -- yes --> EXP[400 reset-link-expired]
    X -- no --> E{password contains the account email?}
    E -- yes --> POL[400 errors.password: token still usable]
    E -- no --> APPLY[set hash, use token, verify email, delete sessions]
    APPLY --> OK[204 + notice mail after commit]
```

The rate limits run after body validation and before any lookup. Failures that keep the token usable: DTO validation, rate limit and the email rule. Invalid and expired links end the flow;
the user asks for a new link. A reset does not log anyone in; the admin password is re-applied from
`PHRASAL_ADMIN_PASSWORD` at the next backend start.
