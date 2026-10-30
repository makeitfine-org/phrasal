# Account management flow

Signed-in users change their password, change their email or delete their account. All three `/me` actions are `POST`,
need the `SESSION` cookie and the CSRF header, and re-check the **current password** (`reauth-per-user`: 5 per 15 min per
account). ADMIN accounts are refused with `403 admin-account-managed`. Mail is sent after the database commit, so SMTP
trouble never fails a request.

## Change password

```mermaid
sequenceDiagram
    actor U as Browser (SPA)
    participant B as Backend
    participant DB as Postgres
    participant H as Have I Been Pwned
    participant M as SMTP (Mailpit / Brevo)

    U->>B: POST /api/v1/me/password {currentPassword, newPassword}
    B->>B: rate limit reauth-per-user, ADMIN refused
    B->>B: check current password (400 wrong-password)
    B->>B: password policy (400 errors.newPassword)
    B->>H: first 5 hex of SHA-1 (k-anonymity)
    H-->>B: suffix list (a timeout or error fails open)
    B->>DB: store the new hash
    B->>B: keep the pre-refresh session id, rotate the session id
    B->>DB: revokeOthers(email, kept id): delete the other sessions
    B-->>U: 204 + new SESSION cookie
    B--)M: "password changed" notice (after commit)
```

## Change email

```mermaid
sequenceDiagram
    actor U as Browser (SPA)
    participant B as Backend
    participant DB as Postgres
    participant M as SMTP (Mailpit / Brevo)
    actor N as Inbox (new address)
    actor O as Inbox (old address)

    U->>B: POST /api/v1/me/email {newEmail, currentPassword}
    B->>B: rate limits reauth-per-user and email-change-per-email, ADMIN refused
    B->>B: check current password
    alt new address already has a verified account
        B--)M: "you already have an account" notice to that address
    else address is free
        B->>DB: INSERT user_tokens EMAIL_CHANGE with new_email (older ones invalidated)
        B--)M: confirmation link to the NEW address
        M->>N: deliver
    end
    B-->>U: 202 {message} (same body in both cases)
    N->>U: open /confirm-email-change?token=...
    U->>B: POST /api/v1/auth/confirm-email-change {token}
    B->>B: rate limit verify-per-ip
    alt token unknown, used or not the newest
        B-->>U: 400 email-change-link-invalid
    else expired
        B-->>U: 400 email-change-link-expired
    else address taken in the meantime
        B-->>U: 409 email-change-conflict
    else
        B->>DB: switch the email (verified), use the token
        B->>DB: revokeAll(old email): delete every session
        B-->>U: 204
        B--)M: "email changed" notice
        M->>O: deliver
    end
```

The authenticator-app label keeps the old email until 2FA is set up again.

## Delete account

```mermaid
sequenceDiagram
    actor U as Browser (SPA)
    participant B as Backend
    participant DB as Postgres
    participant M as SMTP (Mailpit / Brevo)

    U->>B: POST /api/v1/me/delete {password, code?}
    B->>B: rate limit reauth-per-user, ADMIN refused
    B->>B: check password first (400 wrong-password)
    opt 2FA is on
        B->>B: verify TOTP or recovery code (400 invalid-two-factor-code)
    end
    B->>DB: DELETE users row (cascade: progress, tokens, recovery codes)
    B->>DB: revokeAll(email): delete every session
    B-->>U: 204 + logout handler clears SESSION and XSRF-TOKEN
    B--)M: "account deleted" notice (after commit)
    U->>U: navigate to /login with a notice
```

Deletion touches the live database only; a backup taken earlier can still hold the account for its retention period.

## What is refused, and with which status

```mermaid
flowchart TD
    R[POST /me/password, /me/email or /me/delete] --> A{logged in?}
    A -- no --> R401[401]
    A -- yes --> C{CSRF header ok?}
    C -- no --> R403c[403 csrf]
    C -- yes --> V{body valid?}
    V -- no --> R400v[400 field errors]
    V -- yes --> RL{reauth-per-user limit left?}
    RL -- no --> R429[429 + Retry-After, logged as Rate limit exceeded]
    RL -- yes --> AD{ADMIN account?}
    AD -- yes --> R403a[403 admin-account-managed]
    AD -- no --> PW{current password right?}
    PW -- no --> R400p[400 wrong-password]
    PW -- yes --> W{which action?}
    W -- password --> P{policy and breach check ok?}
    P -- no --> R400n[400 errors.newPassword]
    P -- yes --> OKP[204]
    W -- email --> EL{email-change-per-email limit left?}
    EL -- no --> R429
    EL -- yes --> OKE[202 same body for every address]
    W -- delete --> TF{2FA on and code wrong?}
    TF -- yes --> R400c[400 invalid-two-factor-code]
    TF -- no --> OKD[204]
```

## Accounts created by Google sign-in

An account without a password (`hasPassword: false`) answers `400 wrong-password` to all three actions and to 2FA setup,
because there is no current password to check. The SPA hides those forms and shows "Set a password": it posts
`forgot-password` for the account's own address, the emailed link sets the password and closes every session, and the
account then behaves like any other. See [google-sign-in-flow.md](google-sign-in-flow.md).
