# Two-factor authentication flow

TOTP 2FA (RFC 6238) on top of the session login in [auth-flow.md](auth-flow.md). The TOTP secret is stored AES-GCM
encrypted (key: `TOTP_ENCRYPTION_KEY`); recovery codes are stored as SHA-256 hashes.

## Enrollment

```mermaid
sequenceDiagram
    actor U as Browser (SPA)
    participant B as Backend
    participant DB as Postgres

    U->>B: POST /api/v1/me/2fa/setup {password}
    B->>B: check password (400 wrong-password), 409 if already enabled
    B->>DB: save encrypted secret (totp_enabled_at stays NULL)
    B-->>U: 200 {secret, otpauthUri}
    U->>U: render QR code, user scans it
    U->>B: POST /api/v1/me/2fa/confirm {code}
    B->>B: rate limit, verify code (replay-safe)
    B->>DB: set totp_enabled_at, store 10 recovery code hashes
    B->>B: changeSessionId, new principal (twoFactorEnabled), revoke other sessions
    B-->>U: 200 {recoveryCodes} + new SESSION cookie
    B--)U: notice mail "two-factor turned on" (after commit)
    U->>U: show codes once (download / copy), Done refreshes /auth/me
```

## Two-step login

```mermaid
sequenceDiagram
    actor U as Browser (SPA)
    participant B as Backend
    participant DB as Postgres

    U->>B: POST /api/v1/auth/login {email, password}
    B->>B: rate limit, check password
    B->>B: account has 2FA: end current session, open pending session (user id + start time)
    B-->>U: 202 {twoFactorRequired: true} + pending SESSION cookie (no authorities)
    U->>B: POST /api/v1/auth/login/2fa {code}
    B->>B: pending login valid? (else 401 two-factor-login-expired)
    B->>B: rate limit, verify authenticator code or recovery code
    alt code accepted
        B->>DB: advance totp_last_step, or mark the recovery code used
        B->>B: changeSessionId, store security context
        B-->>U: 200 {id, email, role, ...} + new SESSION cookie
    else wrong or already used
        B-->>U: 400 invalid-two-factor-code (pending login stays)
    end
```

## Login states

```mermaid
stateDiagram-v2
    [*] --> Anonymous
    Anonymous --> Pending: password correct, account has 2FA (202)
    Pending --> Authenticated: valid code (200)
    Pending --> Pending: wrong code (400, rate limited)
    Pending --> Anonymous: 5 min timeout (TWO_FACTOR_LOGIN_TIMEOUT) or logout
    Anonymous --> Authenticated: password correct, no 2FA (200)
    Authenticated --> Anonymous: logout, idle timeout, password reset
```

## Authority decision

```mermaid
flowchart TD
    P[AuthenticatedUser principal] --> R{role ADMIN?}
    R -- no --> U[ROLE_USER]
    R -- yes --> T{twoFactorEnabled?}
    T -- yes --> A[ROLE_ADMIN]
    T -- no --> D[ROLE_USER, twoFactorEnrollmentRequired = true]
    D --> W[content writes and /actuator answer 403 until the admin enrolls]
```

## Deferred

- 2FA for Google sign-in (task-104): `SessionAuthenticator#startTwoFactorChallenge` is the seam; `setup` asks for the
  password, so Google-only accounts need another proof.
- Encryption key rotation: changing `TOTP_ENCRYPTION_KEY` invalidates every stored secret, so every 2FA user needs a
  recovery code and must enroll again.
