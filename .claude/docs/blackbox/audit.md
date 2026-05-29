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
