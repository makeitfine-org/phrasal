# Quiz progress flow

Per-user quiz progress (`user_quiz_progress`, one JSON document per user and quiz key). Anonymous visitors stay on
`localStorage` and send no progress requests.

## Login, load, debounced save

```mermaid
sequenceDiagram
    actor U as SPA (useQuizProgressSync)
    participant B as Backend
    participant DB as Postgres

    U->>B: POST /api/v1/auth/login
    B-->>U: 200 + SESSION cookie
    U->>B: GET /api/v1/me/quiz-progress/{quizKey}
    alt saved before
        B->>DB: SELECT by (user id from principal, quiz key)
        B-->>U: 200 {state, version}
        U->>U: map content ids to indexes, apply, keep local copy
    else first login
        B-->>U: 404 Quiz Progress Not Found
        U->>B: PUT {state} (local progress imported once)
        B->>DB: upsert, version 0
        B-->>U: 200
    end
    U->>U: user changes the quiz, 2 s debounce
    U->>B: PUT /api/v1/me/quiz-progress/{quizKey} {state} + X-XSRF-TOKEN
    B->>B: size limit, key whitelist
    B->>DB: INSERT ... ON CONFLICT DO UPDATE (version + 1)
    B-->>U: 200 {version}
```

## Load decision

```mermaid
flowchart TD
    S[Auth status known] --> A{logged in?}
    A -- no --> OFF[Sync off: localStorage only; swap cached account progress for the stashed anonymous copy if one was owned]
    A -- yes --> D{local owner is this user and dirty?}
    D -- yes --> PUT[PUT the local copy]
    D -- no --> G[GET progress]
    G --> R{result}
    R -- 200 --> AP[Apply server state, owner = user]
    R -- 404 --> O{local owner}
    O -- none or this user --> IMP[PUT local progress: first-login import]
    O -- another user --> EMP[Start empty, PUT empty progress]
    R -- error --> ERR[Status error: keep local copy, retry on the next change]
    PUT --> SYN[Synced]
    AP --> SYN
    IMP --> SYN
    EMP --> SYN
```

## Logout

```mermaid
sequenceDiagram
    actor U as SPA
    participant B as Backend

    U->>B: PUT pending progress (flushQuizProgress, session still valid)
    U->>B: POST /api/v1/auth/logout
    B-->>U: 204, session removed
    U->>U: replace the account's quiz state with the stashed anonymous progress (localStorage and screen)
    U->>B: GET /api/v1/auth/me
    B-->>U: 401 (new XSRF-TOKEN)
```
