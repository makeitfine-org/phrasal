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

## 2026-05-29T08:37:55Z
When I do change in, for example, @src/data/phrasalVerbs.js tests rerun but with changes in @src/__tests__/__snapshots__/phrasalVerbs.test.js.snap no test rerun
---

## 2026-05-29T08:43:39Z
but when I add a new phrasal verb, the test doesn't fail, but I whant if some phrasal verb isn't covered with snapshot then some test resposible for this checking fails
---

## 2026-05-29T08:48:10Z
I'd like to swap @src/__tests__/__snapshots__/phrasalVerbs.test.js.snap to test, which will real time scanned by vite test. a
---

## 2026-05-29T08:48:53Z
I'd like to swap @src/__tests__/__snapshots__/phrasalVerbs.test.js.snap to test, which will real time scanned by vite test.
Also add test that will resposible: if at least any phrasal verb isn't covered by test test then fail.
---

## 2026-05-29T08:52:49Z
Also add test that will resposible: if at least any new phrasal verb isn't covered by test test then fail. The new which can be added in the future
---

## 2026-05-29T08:59:55Z
I wan't this @src/__tests__/phrasalVerbs.test.js scanned in real time by vita test
---

## 2026-05-29T09:03:16Z
commit all
---
