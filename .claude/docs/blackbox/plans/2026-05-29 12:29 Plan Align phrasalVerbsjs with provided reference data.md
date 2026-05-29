# Plan: Align phrasalVerbs.js with provided reference data

## Context

TASK-1 added 23 new entries, but two problems remain:
1. **Wrong sentences** — many existing entries (both original and newly added) use invented example sentences that don't match the canonical sentences in the user's reference data.
2. **Missing meanings** — several phrasal verbs in the reference data have meanings or sub-usages that are not yet represented.

The user's constraint: for every phrasal verb mentioned in the reference data, use *only* the sentences from that data — no invented alternatives.

---

## Part A — Update existing entries (sentence/definition corrections)

For each entry below: replace the sentence (and definition where noted) with the value from the reference data.

| Verb | Current sentence | Replace with |
|---|---|---|
| Bring In "earn" | "The company hopes to bring in new customers with the marketing campaign." | "The new marketing campaign really helped bring in more customers." |
| Carry On | "We should carry on with our plans despite the challenges." | "Sorry to interrupt, please carry on with your meeting." |
| Keep On | "Don't give up just keep on trying." | "If you keep on practicing, you will master it." |
| Keep Up With | "It's hard to keep up with the latest technological advancements." | "It's hard to keep up with all the latest technology." |
| Keep Up | "Walk a bit slower, I can't keep up!" | "Walk a bit slower, I can't keep up with you!" |
| Catch On "understand" | "The students caught on to the new concept." | "He didn't get the joke at first, but he finally caught on." |
| Take Out "remove" | "The children sat at their desks and took out their pens and paper." | "Please take out the trash." — also update def to "To remove or extract something from a container, a place, or someone" |
| Take Off "remove clothing" | "She was very happy…took off her shoes…hurting her feet…" | "Please take off your shoes before coming inside." |
| Take Off "departure" | "The plane will take off in a few minutes." | "The airplane is scheduled to take off at 8:00 PM." |
| Come Up "arise" | "A sudden opportunity came up and I couldn't pass it up." | "An unexpected problem came up at work, so I have to stay late." |
| Come Up "topic" | "I wanted to tell her…but the chance never came up." | "The new project came up during our team meeting." |
| Come Up With | "We need to come up with a plan to solve this problem." | "We need to brainstorm and come up with a solution." |
| Hand In (first sentence) | "Please hand in your final essay by Friday." | "Please hand in your homework by Friday." |
| Hand Out | "The teacher hands out worksheets to the students." | "The teacher will hand out the exam papers." — also fix wordsToHide to `["hand out"]` |
| Pay Off "result" | "All his hard work paid off when he won the competition." | "Working hard for that promotion really paid off." |
| Pay Off "debt" | "He finally paid off his debts and became debt-free." | "I am finally going to pay off my student loans this year." |
| Pay Back | "Thanks for getting me lunch…I'll pay you back tomorrow." | "Could you lend me $20 for lunch? I'll pay you back on Friday." |
| Come Out "revealed" | "The truth finally came out after years of speculation." | "The truth finally came out in court." |
| Come Off "succeed" | "The party last night came off really well." | "The whole business deal just didn't come off." |
| Come Off "detach" | "He tried to open the jar but the lid wouldn't come off." | "The button came off my coat." |
| Pick Up "collect" | "Can you pick up some groceries on your way home?" | "Could you pick up the groceries from the store on your way home?" |
| Pick Out "choose" | "She picked out a beautiful dress for the party." | "I need to pick out a new outfit for the wedding." |
| Break Away | "The rebel group managed to break away from their captors." | "The puppy slipped its leash and tried to break away into the woods." — also narrow def to "flee/escape from someone or something physically" |
| Break Off "end relationship" | "They decided to break off their engagement." | "After realizing they were fundamentally incompatible, they decided to break off their engagement." |
| Break Out "escape+erupt" | "A riot broke out in the city center." | Two entries: (1) escape def + "The notorious thief managed to break out of the high-security prison last night." (2) erupt def + "Panic broke out in the stadium when the fire alarm suddenly sounded." |
| Break Down "mechanical" | "My car finally broke down…" | "My ten-year-old car finally broke down on the highway this morning." |
| Break Down "analyze" | "…so we can see where our money went?" | "…so we can easily see where our money went?" |
| Get Out | "We need to get out of this dangerous situation." | "Get out of the house, it's on fire!" — also update def: "To leave an enclosed space or small vehicle" |
| Get Off | "Please get off the bus at the next stop." | "I need to get off the train at the next stop." — also update def: "To disembark from a large vehicle or leave a surface" |
| Get Away "escape/vacation" | "Let's get away from the city and relax at the beach." | Split into two entries: (1) vacation "I really need to get away for the weekend and relax." (2) escape "The suspect managed to get away from the police." |
| Get Along With | "She gets along with her coworkers very well." | "I get along with my new coworkers really well." — also fix wordsToHide to `["get along with"]` |
| Get On With "relationship" | "I get on with my coworkers." | "I get on with my new coworkers really well." |

---

## Part B — Add new entries (missing meanings)

New entries to insert near their verb family:

| Verb | Definition | Sentence | wordsToHide |
|---|---|---|---|
| Bring Out "publish" | To release or publish something to the public | "The author plans to bring out a new novel next year." | `["bring out"]` |
| Keep Up "maintain" | To continue at the same level of performance | "Keep up the good work!" | `["Keep up"]` |
| Come Up "rising" | To rise or approach (sun, tide, deadline) | "The sun came up early this morning." | `["came up"]` |
| Come Out "stain/fabric" | To be removed from fabric through washing | "This coffee stain will easily come out in the wash." | `["come out"]` |
| Come Off "stain/hard" | To be removed from a hard surface | "That grease stain just won't come off the kitchen counter." | `["come off"]` |
| Come Away "detach" | To become detached while still in your hand | "The door handle came away in my hand." | `["came away"]` |
| Pick Up "lift" | To physically lift something from the ground or a surface | "I need to pick up my jacket from the floor." | `["pick up"]` |
| Pick Up "ride" | To collect someone by vehicle | "I will pick you up from the airport at 5 PM." | `["pick up"]` |
| Pick Out "identify" | To identify or spot something among others | "Can you pick out the best photo from the vacation?" | `["pick out"]` |
| Break Away "leave group" | To separate from a larger group or pack | "The cyclist decided to break away from the main pack and pedal ahead." | `["break away"]` |
| Break Off "stop talking" | To suddenly stop speaking mid-sentence | "She broke off mid-sentence when the loud thunder rattled the windows." | `["broke off"]` |
| Take Off "leave quickly" | To leave a place suddenly or in a hurry | "She saw her ex and decided to take off." | `["take off"]` |
| Take Off "career success" | To suddenly become very successful or popular | "His startup really took off after that investor called." | `["took off"]` |
| Get Along "coping" | To manage or cope with a situation | "How are you getting along with your studies?" | `["getting along"]` |

---

## Part C — Bug fix

Remove the mislabeled entry at the Come Up block:
```
["Come up", "To think of an idea", "I came up with this idea for a TV show...", ["came up with"], false]
```
This entry is labeled "Come up" but uses "came up with" throughout — it should be removed (Come Up With already has its own correct entry).

---

## Net count change

- Part A updates: 0 net (replacements only), except Break Out +1 and Get Away +1 from splits
- Part B new entries: 14
- Part C bug fix: −1

**New total: 253 + 1 + 1 + 14 − 1 = 268 entries**

Update `phrasalVerbs.test.js` count to 268.

---

## Verification

```bash
npm run test:run -- -u   # regenerate fixture
npm run test:run         # confirm all pass (expect 156 tests)
```

The entry count test should pass at 268, fixture should diff only the changed/added entries, and the uncovered guard should be empty.