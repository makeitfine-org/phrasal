# Blackbox — Prompt Audit Log
# Append-only. Raw user inputs for session auditability.

## 2026-05-29T08:09:56Z
Do I have configure backlog.md in the project?
---

## 2026-05-29T08:13:04Z
Add full coverage for phrasal verbs (definition, sentences).
If some phrsal verb isn't covered the fail test.
Consider @src/data/phrasalVerbs.js
---

## 2026-05-29T08:18:09Z
But you should separatly to check all verb, definition, sentences. It's a protaction from accedently modifiend any of them.
For example:
["Come up", "To bring up a topic", "I wanted to tell her that I got a new job but the chance never came up.", ["came up"]
check something like:
verb = "Come up"
definition =  "To bring up a topic"
sentences in ["I wanted to tell her that I got a new job but the chance never came up."]
---

## 2026-05-29T08:34:26Z
yes
---

## 2026-05-29T08:35:30Z
When I run `npm test` I see:
Test Files  9 passed (9)
                                                                                                                   │      Tests  381 passed (381)
                                                                                                                   │   Start at  10:33:45
                                                                                                                   │   Duration  2.18s (transform 285ms, setup 430ms, import 1.05s, tests 3.53s, environment 5.46s)

but after changes the amount of passed test reduced, so not all tests are recheck again
---
