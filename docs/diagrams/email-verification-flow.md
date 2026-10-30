# Email verification flow

The link points at the SPA (`${APP_BASE_URL}/verify-email?token=...`); the page posts the token to the API.
Mail is sent after the database commit, so SMTP trouble never fails a request.

## Sign-up to first login

```mermaid
sequenceDiagram
    actor U as Browser (SPA)
    participant B as Backend
    participant DB as Postgres
    participant M as SMTP (Mailpit / Brevo)
    actor I as Inbox

    U->>B: POST /api/v1/auth/register {email, password}
    B->>DB: INSERT users + user_tokens (SHA-256 of token)
    B-->>U: 202 {message}
    B--)B: after-commit event (async)
    B->>M: verification email with link
    M->>I: deliver
    I->>U: open /verify-email?token=...
    U->>B: POST /api/v1/auth/verify-email {token}
    B->>DB: mark token used, set email_verified_at
    B-->>U: 204
    U->>B: POST /api/v1/auth/login
    B-->>U: 200 + SESSION cookie
```

## Register branches

```mermaid
flowchart TD
    R[POST register] --> RL{rate limit ok?}
    RL -- no --> T429[429]
    RL -- yes --> HP{honeypot field website filled?}
    HP -- yes --> A
    HP -- no --> BR{password in a known breach?}
    BR -- yes --> B400[400 errors.password]
    BR -- "no, or the check failed open" --> H[hash password on every path]
    H --> K{address known?}
    K -- no --> N[create user, issue token, send link]
    K -- "yes, unverified" --> P[take new password, replace token, send link]
    K -- "yes, verified" --> X[send account-exists notice, change nothing]
    N --> A[202 same body]
    P --> A
    X --> A
```

## Verify outcomes

```mermaid
flowchart TD
    V[POST verify-email] --> F{token hash found?}
    F -- no --> I400[400 verification-link-invalid]
    F -- yes --> U{already used?}
    U -- "yes, user verified" --> OK204[204 no-op]
    U -- "yes, user unverified (replaced)" --> I400
    U -- no --> E{expired?}
    E -- yes --> X400[400 verification-link-expired]
    E -- no --> D[mark used, verify user, drop other tokens]
    D --> OK204
```

## Login of an unverified account

```mermaid
sequenceDiagram
    actor U as Browser (SPA)
    participant B as Backend

    U->>B: POST /api/v1/auth/login {email, password}
    B->>B: rate limit, then check password (pre-checks are a no-op)
    alt wrong password or unknown email
        B-->>U: 401
    else password ok, email unverified
        B-->>U: 403 email-not-verified (SPA offers a new link)
    else password ok, verified
        B-->>U: 200 + SESSION cookie
    end
    U->>B: POST /api/v1/auth/resend-verification {email}
    B-->>U: 202 (always; mail only for unverified accounts)
```

A filled honeypot gets the same `202` as everything else but creates nothing and sends nothing, so a bot cannot tell it
was caught. The "account exists" notice also answers an email-change request to an address that already has a verified
account: it says someone tried to use the address for a Phrasal account, and links to the login page.
