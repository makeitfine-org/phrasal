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

## 2026-05-29T09:24:14Z
Cut down all useless and add to @src/data/phrasalVerbs.js these 3 phrasal verbs:
1. Give Away: To donate, bestow, or revealDistributing for free: Handing things over permanently without charge.Example: "They decided to give away their old clothes to charity."Revealing a secret: Accidentally letting information slip or betraying someone.Example: "Her nervous smile gave her away."2. Give Out: To distribute or to failDistributing to a group: Handing things out to multiple people (often associated with paper or supplies).Example: "The teacher gave out the exam papers to all the students."Breaking down/failing: Stopping functioning due to exhaustion or overuse.Example: "His car engine finally gave out in the middle of nowhere."3. Give Off: To emit or radiateEmitting a physical property: Releasing something like heat, light, a smell, or gas.Example: "The rotting leaves gave off a terrible smell."Radiating an aura/vibe: Emitting a certain emotional energy.Example: "She always gives off a very confident vibe."
---

## 2026-05-29T09:31:33Z
fix tests
---

## 2026-05-29T09:34:05Z
commit
---

## 2026-05-29T09:53:55Z
Create task with backlog.md:
  - Cut down all useless and add to @src/data/phrasalVerbs.js these phrasal verbs I'll give you
  - Fix and extend tests if neccessary

  These are phrasal verbs and its data:
  
---
Bring InMeaning: To introduce, earn, or move something from the outside into your current space.Examples:"It’s starting to rain; we need to bring in the patio furniture.""The new marketing campaign really helped bring in more customers.""The company expects to bring in a large profit this quarter."Bring OutMeaning: To expose, publish, highlight, or physically carry something outward from an enclosed space.Examples:"Let's bring out the cake and sing happy birthday.""That blue shirt really bring out the color of your eyes.""The author plans to bring out a new novel next year."
---
1. Carry OnMeaning: To continue with an activity or life in general. It is slightly more formal and often used to encourage someone to persist through a difficult situation.Usage note: Can be used alone as a command (e.g., "Just carry on.").Examples:"Sorry to interrupt, please carry on with your meeting.""We have to carry on even when times are tough.""Keep calm and carry on."2. Keep OnMeaning: To continue doing something without stopping, or to repeatedly do something.Usage note: It is almost always followed by a verb ending in -ing (a gerund). It can sometimes express frustration if the action is annoying.Examples:"If you keep on practicing, you will master it.""Why do you keep on bringing up last week's mistake?"3. Keep UpMeaning: To move at the same speed, match a level of progress, or stay informed.Usage note: Often used with "with" (e.g., keep up with).Examples:"Walk a bit slower, I can't keep up with you!""It's hard to keep up with all the latest technology.""Keep up the good work!"
---
Drop By: Typically implies stopping somewhere briefly, often while on your way to another destination or running errands. It is highly versatile and can apply to homes, offices, or shops.Drop In: Often implies entering someone's home with the intention of staying for a slightly longer, casual chat.
---
1. Catch UpThis phrase has a few distinct, common meanings:To reach someone/something: Going faster to reach someone ahead of you or reaching the same standard as a competitor."Walk faster so you can catch up with the group."To socialize: Meeting or talking to someone to hear about what is new in their life."Let's get coffee and catch up!"To complete missed tasks: Doing things you fell behind on."I need to catch up on my emails."To be consumed by: Often used in the passive form (caught up in) to describe being deeply involved or trapped in a situation."She got so caught up in the drama that she lost track of time."2. Catch OnThis verb generally relates to understanding or popularity:To understand: Finally realizing or comprehending something after a delay."He didn't get the joke at first, but he finally caught on."To become popular: A new product, trend, or idea gaining widespread acceptance."Electric vehicles are really catching on these days."
---
1. Take OutCore meaning: To remove or extract something from a container, a place, or someone.Examples:"Please take out the trash.""The dentist had to take out my wisdom tooth."Food context: In American/Canadian English, a noun used to describe restaurant food you pick up to eat elsewhere."Let's order some Chinese takeout tonight."2. Take AwayCore meaning: To remove something so that it is no longer in your possession or in a specific location.Examples:"The teacher had to take away the students' phones.""The painkillers will take away the headache."Food context: In British, Irish, and Australian English, this is the equivalent of American "takeout"."We are getting a pizza takeaway."3. Take OffCore meaning 1 (Removal): To remove something from your body or the surface of an object.Examples:"Please take off your shoes before coming inside.""The airplane is scheduled to take off at 8:00 PM."Core meaning 2 (Departure/Sudden Action): To leave a place quickly, or for a career/business to suddenly become very successful.Examples:"She saw her ex and decided to take off.""His startup really took off after that investor called."
---
Come UpUse this phrase when something naturally happens, emerges, or is brought into view unexpectedly.Emerging/Arising: "An unexpected problem came up at work, so I have to stay late."Mentioned in conversation: "The new project came up during our team meeting."Approaching/Rising: "The sun came up early this morning."For a deeper dive into the different meanings and contexts of 'come up':0:59Learn English Phrasal Verbs! Definition and ExamplesWelcome To EnglishYouTube · 29 Mar 2023Come Up WithUse this phrase when someone actively generates, invents, or finds something that is needed. It is almost always followed by an object (like a plan, idea, or money).Generating an idea: "We need to brainstorm and come up with a solution."Producing something needed: "She managed to come up with the money for her rent."Creating a plan: "The marketing team came up with a brilliant new advertising campaign."
--
 Hand In (Submit)Meaning: To give your work, an application, or a lost item to a teacher, boss, or official. It is synonymous with "submit" or "return."Direction: Flows to an authority figure (from you to them).Examples:"Please hand in your homework by Friday.""I need to hand in my resignation letter."2. Hand Out (Distribute)Meaning: To give out items to multiple people, usually from a central supply. It is synonymous with "distribute."Direction: Flows from an authority figure to the crowd/class.Examples:"The teacher will hand out the exam papers.""Volunteers are handing out free bottles of water."Note: As a single noun, it is spelled handout (e.g., "Take a handout from the front desk.").Quick SummaryHand in = You give something to the boss/teacher (Submitting).Hand out = The boss/teacher gives something to you (Distributing).
---
1. Pay Off (Phrasal Verb)This means to completely eliminate a debt or loan by making the final payment, or to yield a successful result.Debt: "I am finally going to pay off my student loans this year."Result: "Working hard for that promotion really paid off."2. Pay Back (Phrasal Verb)This involves returning money that you borrowed from a person or institution."Could you lend me \(\$20\) for lunch? I’ll pay you back on Friday.""I need to pay back the bank for the car loan."3. Pay Out (Phrasal Verb / Noun)This refers to distributing or disbursing a large sum of money from an account, fund, or investment."The insurance company will pay out the claim next week."As a noun (payout): "The lottery winner received a massive payout."
---
1. Come Out (Emerging & Revealing)Use "come out" when something moves from inside to outside, or when something hidden is revealed to the public.Leaving a space: "She just came out of the building."Publishing or releasing: "The new movie comes out next week."Revealing information: "The truth finally came out in court."Stain removal (fabric): "This coffee stain will easily come out in the wash."2. Come Off (Detaching & Succeeding)Use "come off" to describe something that was attached coming loose. It also has a distinct idiomatic meaning regarding success or giving off a certain vibe.Detaching: "The button came off my coat."Stain removal (hard surfaces): "That grease stain just won’t come off the kitchen counter."Perception/Vibe: "He tried to be helpful, but he came off as bossy."Success/Result: "The whole business deal just didn't come off."3. Come Away (Leaving & Gaining)Use "come away" to describe leaving a place or an experience while holding or possessing a new feeling, lesson, or physical object.Gaining an experience: "I came away from the seminar feeling inspired."Detaching while holding: "The door handle came away in my hand."
---
To help you remember the difference, think of the core action in each phrase:"Up" (Lifting/Collecting): Focuses on the physical act of acquiring an item or meeting someone."Out" (Choosing/Selecting): Focuses on making a decision among multiple options.When to use "Pick Up"Use this phrase for physical lifting, collecting an order, or giving someone a ride.Lifting: "I need to pick up my jacket from the floor."Collecting/Retrieving: "Could you pick up the groceries from the store on your way home?"Giving a ride: "I will pick you up from the airport at 5 PM."When to use "Pick Out"Use this phrase when you are making a decision or shopping and need to select something from a variety of choices.Choosing: "I need to pick out a new outfit for the wedding."Identifying: "Can you pick out the best photo from the vacation?"
---
Break out: To escape from confinement, or to suddenly start (e.g., a fire, war, or an illness). It can also mean developing a skin rash or pimples.Break away: To separate, leave, or escape from a person, group, or control.Break off: To suddenly stop speaking, or to end a relationship, negotiation, or engagement abruptly.Break down: For machines or vehicles to stop working, for a person to collapse emotionally, or to divide something into smaller, understandable parts (e.g., data or a process).Detailed Breakdown & Examples1. Break outMeanings:Escape: To break free from a prison, building, or confinement.Erupt suddenly: For a negative or large-scale event to start unexpectedly.Skin condition: To develop acne or a rash.Examples:The notorious thief managed to break out of the high-security prison last night.Panic broke out in the stadium when the fire alarm suddenly sounded.She tends to break out in hives whenever she eats strawberries.2. Break awayMeanings:Flee or escape: To pull free from someone physically holding you or constraining you.Leave a group: To separate from a larger group or political party.Examples:The puppy slipped its leash and tried to break away into the woods.The cyclist decided to break away from the main pack and pedal ahead.3. Break offMeanings:Stop talking: To suddenly stop in the middle of a sentence.End a relationship: To abruptly terminate an engagement, friendship, or diplomatic deal.Detach a piece: To break a physical part from a larger object.Examples:She broke off mid-sentence when the loud thunder rattled the windows.After realizing they were fundamentally incompatible, they decided to break off their engagement.He broke off a small piece of the chocolate bar and handed it to me.4. Break downMeanings:Mechanical failure: For a car, computer, or appliance to stop working or fail.Emotional collapse: To lose emotional control or start crying.Analyze or categorize: To separate complex information, numbers, or data into smaller, simpler, and easier-to-understand sections.Examples:My ten-year-old car finally broke down on the highway this morning.When she heard the devastating news, she simply broke down and wept.Can you break down the quarterly expenses so we can easily see where our money went?
---
1. Get Out (Leaving an enclosed space)Use get out (usually followed by "of") when leaving an enclosed, small, or confined space.When to use: Leaving buildings, rooms, or small vehicles (like cars, taxis, or helicopters).Examples:"Get out of the house, it's on fire!""Let's get out of the taxi when we reach the station."2. Get Off (Leaving a large vehicle or surface)Use get off when disembarking from large, open vehicles where you can stand up or walk around. It also applies to things you sit or lie on (like a bicycle, horse, or sofa).When to use: Buses, trains, airplanes, boats, and motorcycles.Examples:"I need to get off the train at the next stop.""Be careful when you get off your bicycle."3. Get Away (Escaping or taking a break)Use get away to mean escaping from a person, danger, or a location, or simply taking a vacation.When to use: Fleeing a dangerous situation, stepping away from a person, or taking time off.Examples:"I really need to get away for the weekend and relax.""The suspect managed to get away from the police."Summary ReferencePhrasal VerbCore MeaningCommon ApplicationsGet outLeaving an enclosed spaceCars, rooms, houses, cagesGet offDisembarking / leaving a surfaceTrains, buses, planes, bicycles, couchesGet awayEscaping or taking a vacationVacations, fleeing danger, leaving a person
---
"Get along with" is the standard American English term for having a harmonious, conflict-free relationship."Get on with" is the preferred British English equivalent for having a good relationship, but it also has an entirely different meaning: to continue doing a task.1. In RelationshipsWhen used to describe friendships or getting along, they are entirely interchangeable, though regional preferences dictate which one you will hear more often.US: "I get along with my new coworkers really well."UK: "I get on with my new coworkers really well."2. In Tasks (Exclusive to "Get on with")Because "get along" is only used for relationships or managing life, you cannot use it when telling someone to hurry up or continue a job. "Get on with" fills this role."Stop procrastinating and get on with your work.""I need to get on with packing before the taxi arrives."3. Other MeaningsGet along: Can mean managing or coping with a situation (e.g., "How are you getting along with your studies?").Get on: Can mean aging (e.g., "He's getting on in years").
---

## 2026-05-29T10:07:27Z
Create task with backlog.md:
  CRITICAL: Analyze carefully the phrasal verbs and their data I'll give you; don't reduce the data.
   
  Then extend @src/data/phrasalVerbs.js using that data.
  Fix and extend tests if neccessary

  These are phrasal verbs and its data:
  
---
Bring InMeaning: To introduce, earn, or move something from the outside into your current space.Examples:"It’s starting to rain; we need to bring in the patio furniture.""The new marketing campaign really helped bring in more customers.""The company expects to bring in a large profit this quarter."Bring OutMeaning: To expose, publish, highlight, or physically carry something outward from an enclosed space.Examples:"Let's bring out the cake and sing happy birthday.""That blue shirt really bring out the color of your eyes.""The author plans to bring out a new novel next year."
---
1. Carry OnMeaning: To continue with an activity or life in general. It is slightly more formal and often used to encourage someone to persist through a difficult situation.Usage note: Can be used alone as a command (e.g., "Just carry on.").Examples:"Sorry to interrupt, please carry on with your meeting.""We have to carry on even when times are tough.""Keep calm and carry on."2. Keep OnMeaning: To continue doing something without stopping, or to repeatedly do something.Usage note: It is almost always followed by a verb ending in -ing (a gerund). It can sometimes express frustration if the action is annoying.Examples:"If you keep on practicing, you will master it.""Why do you keep on bringing up last week's mistake?"3. Keep UpMeaning: To move at the same speed, match a level of progress, or stay informed.Usage note: Often used with "with" (e.g., keep up with).Examples:"Walk a bit slower, I can't keep up with you!""It's hard to keep up with all the latest technology.""Keep up the good work!"
---
Drop By: Typically implies stopping somewhere briefly, often while on your way to another destination or running errands. It is highly versatile and can apply to homes, offices, or shops.Drop In: Often implies entering someone's home with the intention of staying for a slightly longer, casual chat.
---
1. Catch UpThis phrase has a few distinct, common meanings:To reach someone/something: Going faster to reach someone ahead of you or reaching the same standard as a competitor."Walk faster so you can catch up with the group."To socialize: Meeting or talking to someone to hear about what is new in their life."Let's get coffee and catch up!"To complete missed tasks: Doing things you fell behind on."I need to catch up on my emails."To be consumed by: Often used in the passive form (caught up in) to describe being deeply involved or trapped in a situation."She got so caught up in the drama that she lost track of time."2. Catch OnThis verb generally relates to understanding or popularity:To understand: Finally realizing or comprehending something after a delay."He didn't get the joke at first, but he finally caught on."To become popular: A new product, trend, or idea gaining widespread acceptance."Electric vehicles are really catching on these days."
---
1. Take OutCore meaning: To remove or extract something from a container, a place, or someone.Examples:"Please take out the trash.""The dentist had to take out my wisdom tooth."Food context: In American/Canadian English, a noun used to describe restaurant food you pick up to eat elsewhere."Let's order some Chinese takeout tonight."2. Take AwayCore meaning: To remove something so that it is no longer in your possession or in a specific location.Examples:"The teacher had to take away the students' phones.""The painkillers will take away the headache."Food context: In British, Irish, and Australian English, this is the equivalent of American "takeout"."We are getting a pizza takeaway."3. Take OffCore meaning 1 (Removal): To remove something from your body or the surface of an object.Examples:"Please take off your shoes before coming inside.""The airplane is scheduled to take off at 8:00 PM."Core meaning 2 (Departure/Sudden Action): To leave a place quickly, or for a career/business to suddenly become very successful.Examples:"She saw her ex and decided to take off.""His startup really took off after that investor called."
---
Come UpUse this phrase when something naturally happens, emerges, or is brought into view unexpectedly.Emerging/Arising: "An unexpected problem came up at work, so I have to stay late."Mentioned in conversation: "The new project came up during our team meeting."Approaching/Rising: "The sun came up early this morning."For a deeper dive into the different meanings and contexts of 'come up':0:59Learn English Phrasal Verbs! Definition and ExamplesWelcome To EnglishYouTube · 29 Mar 2023Come Up WithUse this phrase when someone actively generates, invents, or finds something that is needed. It is almost always followed by an object (like a plan, idea, or money).Generating an idea: "We need to brainstorm and come up with a solution."Producing something needed: "She managed to come up with the money for her rent."Creating a plan: "The marketing team came up with a brilliant new advertising campaign."
--
 Hand In (Submit)Meaning: To give your work, an application, or a lost item to a teacher, boss, or official. It is synonymous with "submit" or "return."Direction: Flows to an authority figure (from you to them).Examples:"Please hand in your homework by Friday.""I need to hand in my resignation letter."2. Hand Out (Distribute)Meaning: To give out items to multiple people, usually from a central supply. It is synonymous with "distribute."Direction: Flows from an authority figure to the crowd/class.Examples:"The teacher will hand out the exam papers.""Volunteers are handing out free bottles of water."Note: As a single noun, it is spelled handout (e.g., "Take a handout from the front desk.").Quick SummaryHand in = You give something to the boss/teacher (Submitting).Hand out = The boss/teacher gives something to you (Distributing).
---
1. Pay Off (Phrasal Verb)This means to completely eliminate a debt or loan by making the final payment, or to yield a successful result.Debt: "I am finally going to pay off my student loans this year."Result: "Working hard for that promotion really paid off."2. Pay Back (Phrasal Verb)This involves returning money that you borrowed from a person or institution."Could you lend me \(\$20\) for lunch? I’ll pay you back on Friday.""I need to pay back the bank for the car loan."3. Pay Out (Phrasal Verb / Noun)This refers to distributing or disbursing a large sum of money from an account, fund, or investment."The insurance company will pay out the claim next week."As a noun (payout): "The lottery winner received a massive payout."
---
1. Come Out (Emerging & Revealing)Use "come out" when something moves from inside to outside, or when something hidden is revealed to the public.Leaving a space: "She just came out of the building."Publishing or releasing: "The new movie comes out next week."Revealing information: "The truth finally came out in court."Stain removal (fabric): "This coffee stain will easily come out in the wash."2. Come Off (Detaching & Succeeding)Use "come off" to describe something that was attached coming loose. It also has a distinct idiomatic meaning regarding success or giving off a certain vibe.Detaching: "The button came off my coat."Stain removal (hard surfaces): "That grease stain just won’t come off the kitchen counter."Perception/Vibe: "He tried to be helpful, but he came off as bossy."Success/Result: "The whole business deal just didn't come off."3. Come Away (Leaving & Gaining)Use "come away" to describe leaving a place or an experience while holding or possessing a new feeling, lesson, or physical object.Gaining an experience: "I came away from the seminar feeling inspired."Detaching while holding: "The door handle came away in my hand."
---
To help you remember the difference, think of the core action in each phrase:"Up" (Lifting/Collecting): Focuses on the physical act of acquiring an item or meeting someone."Out" (Choosing/Selecting): Focuses on making a decision among multiple options.When to use "Pick Up"Use this phrase for physical lifting, collecting an order, or giving someone a ride.Lifting: "I need to pick up my jacket from the floor."Collecting/Retrieving: "Could you pick up the groceries from the store on your way home?"Giving a ride: "I will pick you up from the airport at 5 PM."When to use "Pick Out"Use this phrase when you are making a decision or shopping and need to select something from a variety of choices.Choosing: "I need to pick out a new outfit for the wedding."Identifying: "Can you pick out the best photo from the vacation?"
---
Break out: To escape from confinement, or to suddenly start (e.g., a fire, war, or an illness). It can also mean developing a skin rash or pimples.Break away: To separate, leave, or escape from a person, group, or control.Break off: To suddenly stop speaking, or to end a relationship, negotiation, or engagement abruptly.Break down: For machines or vehicles to stop working, for a person to collapse emotionally, or to divide something into smaller, understandable parts (e.g., data or a process).Detailed Breakdown & Examples1. Break outMeanings:Escape: To break free from a prison, building, or confinement.Erupt suddenly: For a negative or large-scale event to start unexpectedly.Skin condition: To develop acne or a rash.Examples:The notorious thief managed to break out of the high-security prison last night.Panic broke out in the stadium when the fire alarm suddenly sounded.She tends to break out in hives whenever she eats strawberries.2. Break awayMeanings:Flee or escape: To pull free from someone physically holding you or constraining you.Leave a group: To separate from a larger group or political party.Examples:The puppy slipped its leash and tried to break away into the woods.The cyclist decided to break away from the main pack and pedal ahead.3. Break offMeanings:Stop talking: To suddenly stop in the middle of a sentence.End a relationship: To abruptly terminate an engagement, friendship, or diplomatic deal.Detach a piece: To break a physical part from a larger object.Examples:She broke off mid-sentence when the loud thunder rattled the windows.After realizing they were fundamentally incompatible, they decided to break off their engagement.He broke off a small piece of the chocolate bar and handed it to me.4. Break downMeanings:Mechanical failure: For a car, computer, or appliance to stop working or fail.Emotional collapse: To lose emotional control or start crying.Analyze or categorize: To separate complex information, numbers, or data into smaller, simpler, and easier-to-understand sections.Examples:My ten-year-old car finally broke down on the highway this morning.When she heard the devastating news, she simply broke down and wept.Can you break down the quarterly expenses so we can easily see where our money went?
---
1. Get Out (Leaving an enclosed space)Use get out (usually followed by "of") when leaving an enclosed, small, or confined space.When to use: Leaving buildings, rooms, or small vehicles (like cars, taxis, or helicopters).Examples:"Get out of the house, it's on fire!""Let's get out of the taxi when we reach the station."2. Get Off (Leaving a large vehicle or surface)Use get off when disembarking from large, open vehicles where you can stand up or walk around. It also applies to things you sit or lie on (like a bicycle, horse, or sofa).When to use: Buses, trains, airplanes, boats, and motorcycles.Examples:"I need to get off the train at the next stop.""Be careful when you get off your bicycle."3. Get Away (Escaping or taking a break)Use get away to mean escaping from a person, danger, or a location, or simply taking a vacation.When to use: Fleeing a dangerous situation, stepping away from a person, or taking time off.Examples:"I really need to get away for the weekend and relax.""The suspect managed to get away from the police."Summary ReferencePhrasal VerbCore MeaningCommon ApplicationsGet outLeaving an enclosed spaceCars, rooms, houses, cagesGet offDisembarking / leaving a surfaceTrains, buses, planes, bicycles, couchesGet awayEscaping or taking a vacationVacations, fleeing danger, leaving a person
---
"Get along with" is the standard American English term for having a harmonious, conflict-free relationship."Get on with" is the preferred British English equivalent for having a good relationship, but it also has an entirely different meaning: to continue doing a task.1. In RelationshipsWhen used to describe friendships or getting along, they are entirely interchangeable, though regional preferences dictate which one you will hear more often.US: "I get along with my new coworkers really well."UK: "I get on with my new coworkers really well."2. In Tasks (Exclusive to "Get on with")Because "get along" is only used for relationships or managing life, you cannot use it when telling someone to hurry up or continue a job. "Get on with" fills this role."Stop procrastinating and get on with your work.""I need to get on with packing before the taxi arrives."3. Other MeaningsGet along: Can mean managing or coping with a situation (e.g., "How are you getting along with your studies?").Get on: Can mean aging (e.g., "He's getting on in years").
---

## 2026-05-29T10:22:29Z
Data:
---
Bring InMeaning: To introduce, earn, or move something from the outside into your current space.Examples:"It’s starting to rain; we need to bring in the patio furniture.""The new marketing campaign really helped bring in more customers.""The company expects to bring in a large profit this quarter."Bring OutMeaning: To expose, publish, highlight, or physically carry something outward from an enclosed space.Examples:"Let's bring out the cake and sing happy birthday.""That blue shirt really bring out the color of your eyes.""The author plans to bring out a new novel next year."
---
1. Carry OnMeaning: To continue with an activity or life in general. It is slightly more formal and often used to encourage someone to persist through a difficult situation.Usage note: Can be used alone as a command (e.g., "Just carry on.").Examples:"Sorry to interrupt, please carry on with your meeting.""We have to carry on even when times are tough.""Keep calm and carry on."2. Keep OnMeaning: To continue doing something without stopping, or to repeatedly do something.Usage note: It is almost always followed by a verb ending in -ing (a gerund). It can sometimes express frustration if the action is annoying.Examples:"If you keep on practicing, you will master it.""Why do you keep on bringing up last week's mistake?"3. Keep UpMeaning: To move at the same speed, match a level of progress, or stay informed.Usage note: Often used with "with" (e.g., keep up with).Examples:"Walk a bit slower, I can't keep up with you!""It's hard to keep up with all the latest technology.""Keep up the good work!"
---
Drop By: Typically implies stopping somewhere briefly, often while on your way to another destination or running errands. It is highly versatile and can apply to homes, offices, or shops.Drop In: Often implies entering someone's home with the intention of staying for a slightly longer, casual chat.
---
1. Catch UpThis phrase has a few distinct, common meanings:To reach someone/something: Going faster to reach someone ahead of you or reaching the same standard as a competitor."Walk faster so you can catch up with the group."To socialize: Meeting or talking to someone to hear about what is new in their life."Let's get coffee and catch up!"To complete missed tasks: Doing things you fell behind on."I need to catch up on my emails."To be consumed by: Often used in the passive form (caught up in) to describe being deeply involved or trapped in a situation."She got so caught up in the drama that she lost track of time."2. Catch OnThis verb generally relates to understanding or popularity:To understand: Finally realizing or comprehending something after a delay."He didn't get the joke at first, but he finally caught on."To become popular: A new product, trend, or idea gaining widespread acceptance."Electric vehicles are really catching on these days."
---
1. Take OutCore meaning: To remove or extract something from a container, a place, or someone.Examples:"Please take out the trash.""The dentist had to take out my wisdom tooth."Food context: In American/Canadian English, a noun used to describe restaurant food you pick up to eat elsewhere."Let's order some Chinese takeout tonight."2. Take AwayCore meaning: To remove something so that it is no longer in your possession or in a specific location.Examples:"The teacher had to take away the students' phones.""The painkillers will take away the headache."Food context: In British, Irish, and Australian English, this is the equivalent of American "takeout"."We are getting a pizza takeaway."3. Take OffCore meaning 1 (Removal): To remove something from your body or the surface of an object.Examples:"Please take off your shoes before coming inside.""The airplane is scheduled to take off at 8:00 PM."Core meaning 2 (Departure/Sudden Action): To leave a place quickly, or for a career/business to suddenly become very successful.Examples:"She saw her ex and decided to take off.""His startup really took off after that investor called."
---
Come UpUse this phrase when something naturally happens, emerges, or is brought into view unexpectedly.Emerging/Arising: "An unexpected problem came up at work, so I have to stay late."Mentioned in conversation: "The new project came up during our team meeting."Approaching/Rising: "The sun came up early this morning."For a deeper dive into the different meanings and contexts of 'come up':0:59Learn English Phrasal Verbs! Definition and ExamplesWelcome To EnglishYouTube · 29 Mar 2023Come Up WithUse this phrase when someone actively generates, invents, or finds something that is needed. It is almost always followed by an object (like a plan, idea, or money).Generating an idea: "We need to brainstorm and come up with a solution."Producing something needed: "She managed to come up with the money for her rent."Creating a plan: "The marketing team came up with a brilliant new advertising campaign."
--
 Hand In (Submit)Meaning: To give your work, an application, or a lost item to a teacher, boss, or official. It is synonymous with "submit" or "return."Direction: Flows to an authority figure (from you to them).Examples:"Please hand in your homework by Friday.""I need to hand in my resignation letter."2. Hand Out (Distribute)Meaning: To give out items to multiple people, usually from a central supply. It is synonymous with "distribute."Direction: Flows from an authority figure to the crowd/class.Examples:"The teacher will hand out the exam papers.""Volunteers are handing out free bottles of water."Note: As a single noun, it is spelled handout (e.g., "Take a handout from the front desk.").Quick SummaryHand in = You give something to the boss/teacher (Submitting).Hand out = The boss/teacher gives something to you (Distributing).
---
1. Pay Off (Phrasal Verb)This means to completely eliminate a debt or loan by making the final payment, or to yield a successful result.Debt: "I am finally going to pay off my student loans this year."Result: "Working hard for that promotion really paid off."2. Pay Back (Phrasal Verb)This involves returning money that you borrowed from a person or institution."Could you lend me \(\$20\) for lunch? I’ll pay you back on Friday.""I need to pay back the bank for the car loan."3. Pay Out (Phrasal Verb / Noun)This refers to distributing or disbursing a large sum of money from an account, fund, or investment."The insurance company will pay out the claim next week."As a noun (payout): "The lottery winner received a massive payout."
---
1. Come Out (Emerging & Revealing)Use "come out" when something moves from inside to outside, or when something hidden is revealed to the public.Leaving a space: "She just came out of the building."Publishing or releasing: "The new movie comes out next week."Revealing information: "The truth finally came out in court."Stain removal (fabric): "This coffee stain will easily come out in the wash."2. Come Off (Detaching & Succeeding)Use "come off" to describe something that was attached coming loose. It also has a distinct idiomatic meaning regarding success or giving off a certain vibe.Detaching: "The button came off my coat."Stain removal (hard surfaces): "That grease stain just won’t come off the kitchen counter."Perception/Vibe: "He tried to be helpful, but he came off as bossy."Success/Result: "The whole business deal just didn't come off."3. Come Away (Leaving & Gaining)Use "come away" to describe leaving a place or an experience while holding or possessing a new feeling, lesson, or physical object.Gaining an experience: "I came away from the seminar feeling inspired."Detaching while holding: "The door handle came away in my hand."
---
To help you remember the difference, think of the core action in each phrase:"Up" (Lifting/Collecting): Focuses on the physical act of acquiring an item or meeting someone."Out" (Choosing/Selecting): Focuses on making a decision among multiple options.When to use "Pick Up"Use this phrase for physical lifting, collecting an order, or giving someone a ride.Lifting: "I need to pick up my jacket from the floor."Collecting/Retrieving: "Could you pick up the groceries from the store on your way home?"Giving a ride: "I will pick you up from the airport at 5 PM."When to use "Pick Out"Use this phrase when you are making a decision or shopping and need to select something from a variety of choices.Choosing: "I need to pick out a new outfit for the wedding."Identifying: "Can you pick out the best photo from the vacation?"
---
Break out: To escape from confinement, or to suddenly start (e.g., a fire, war, or an illness). It can also mean developing a skin rash or pimples.Break away: To separate, leave, or escape from a person, group, or control.Break off: To suddenly stop speaking, or to end a relationship, negotiation, or engagement abruptly.Break down: For machines or vehicles to stop working, for a person to collapse emotionally, or to divide something into smaller, understandable parts (e.g., data or a process).Detailed Breakdown & Examples1. Break outMeanings:Escape: To break free from a prison, building, or confinement.Erupt suddenly: For a negative or large-scale event to start unexpectedly.Skin condition: To develop acne or a rash.Examples:The notorious thief managed to break out of the high-security prison last night.Panic broke out in the stadium when the fire alarm suddenly sounded.She tends to break out in hives whenever she eats strawberries.2. Break awayMeanings:Flee or escape: To pull free from someone physically holding you or constraining you.Leave a group: To separate from a larger group or political party.Examples:The puppy slipped its leash and tried to break away into the woods.The cyclist decided to break away from the main pack and pedal ahead.3. Break offMeanings:Stop talking: To suddenly stop in the middle of a sentence.End a relationship: To abruptly terminate an engagement, friendship, or diplomatic deal.Detach a piece: To break a physical part from a larger object.Examples:She broke off mid-sentence when the loud thunder rattled the windows.After realizing they were fundamentally incompatible, they decided to break off their engagement.He broke off a small piece of the chocolate bar and handed it to me.4. Break downMeanings:Mechanical failure: For a car, computer, or appliance to stop working or fail.Emotional collapse: To lose emotional control or start crying.Analyze or categorize: To separate complex information, numbers, or data into smaller, simpler, and easier-to-understand sections.Examples:My ten-year-old car finally broke down on the highway this morning.When she heard the devastating news, she simply broke down and wept.Can you break down the quarterly expenses so we can easily see where our money went?
---
1. Get Out (Leaving an enclosed space)Use get out (usually followed by "of") when leaving an enclosed, small, or confined space.When to use: Leaving buildings, rooms, or small vehicles (like cars, taxis, or helicopters).Examples:"Get out of the house, it's on fire!""Let's get out of the taxi when we reach the station."2. Get Off (Leaving a large vehicle or surface)Use get off when disembarking from large, open vehicles where you can stand up or walk around. It also applies to things you sit or lie on (like a bicycle, horse, or sofa).When to use: Buses, trains, airplanes, boats, and motorcycles.Examples:"I need to get off the train at the next stop.""Be careful when you get off your bicycle."3. Get Away (Escaping or taking a break)Use get away to mean escaping from a person, danger, or a location, or simply taking a vacation.When to use: Fleeing a dangerous situation, stepping away from a person, or taking time off.Examples:"I really need to get away for the weekend and relax.""The suspect managed to get away from the police."Summary ReferencePhrasal VerbCore MeaningCommon ApplicationsGet outLeaving an enclosed spaceCars, rooms, houses, cagesGet offDisembarking / leaving a surfaceTrains, buses, planes, bicycles, couchesGet awayEscaping or taking a vacationVacations, fleeing danger, leaving a person
---
"Get along with" is the standard American English term for having a harmonious, conflict-free relationship."Get on with" is the preferred British English equivalent for having a good relationship, but it also has an entirely different meaning: to continue doing a task.1. In RelationshipsWhen used to describe friendships or getting along, they are entirely interchangeable, though regional preferences dictate which one you will hear more often.US: "I get along with my new coworkers really well."UK: "I get on with my new coworkers really well."2. In Tasks (Exclusive to "Get on with")Because "get along" is only used for relationships or managing life, you cannot use it when telling someone to hurry up or continue a job. "Get on with" fills this role."Stop procrastinating and get on with your work.""I need to get on with packing before the taxi arrives."3. Other MeaningsGet along: Can mean managing or coping with a situation (e.g., "How are you getting along with your studies?").Get on: Can mean aging (e.g., "He's getting on in years").

---
Create backlog.md task but don't execute it.
Use meaning and sentences for the phrasal verbs mentioned in the provided data only.
---

## 2026-05-29T10:36:35Z
commit
---

## 2026-05-29T10:47:06Z
I plan to make a new release give, so:
- give the next release tag
- give description for next release
---

## 2026-05-29T10:50:40Z
apply
---

## 2026-05-29T11:00:24Z
If I set reset on the phrasal verb then even if it was marked as mastered it should be unmarked
---

## 2026-05-29T11:04:45Z
not work
---

## 2026-05-29T11:10:38Z
commit
---

## 2026-05-29T11:14:56Z
Create a backlog.md task (but don't execute it) to move project from javascript to typescript. Consider also moveing  jsx to tsx, etc.
---

## 2026-05-29T11:25:33Z
implement backlog.md task-3
---

## 2026-05-29T13:53:00Z
did you complete implementing of task-3?
---

## 2026-05-29T13:58:19Z
- did you complete implementing of task-3?
- did you migrate project form javascript to typescript?
---

## 2026-05-29T13:58:33Z
commit all
---

## 2026-05-29T14:49:47Z
Add routing, and:
- Add a front page with the name of "English tutorial" by route "/"
- Move the current "Phrasal Verbs" functionality as a link on this front page.
  Also this link current "Phrasal Verbs" should be now access by route "/phrasal-verbs" instead of "/"

In future it's going to be added other exercises.
---

## 2026-05-29T15:03:31Z
commit
---

## 2026-05-29T15:13:09Z
Create a backlog.md task (but don't execute it).
 Extend functionality:
  1. Add tests for routing and front end page
  2. Add to be common for all pages:
    2.1 Switching dark/light themas
    2.2 Button to return on home page
  3. Add tests for all this functionality
---

## 2026-05-29T15:29:54Z
Implement backlog.md task-4 and all its subtasks
---

## 2026-05-29T15:42:03Z
commit all
---

## 2026-05-29T15:42:38Z
commit all
---

## 2026-05-29T15:43:24Z
commit all
---

## 2026-05-29T15:46:23Z
Why didn't you move some "Done" task into completed?
---

## 2026-05-29T15:48:39Z
Check whether task-4 completed?
---

## 2026-05-29T15:49:34Z
yes
---

## 2026-05-29T15:51:04Z
Move appropriate backlog md tasks to completed folder
---

## 2026-05-29T15:52:13Z
commit all
---

## 2026-05-29T16:29:32Z
Create a backlog.md task (but don't execute it).
Add outline for buttons. Consider dark/light thema. Cover with tests
---

## 2026-05-29T16:31:02Z
Complete the backlog task-5
---

## 2026-05-29T16:44:21Z
Create a backlog.md task (but don't execute it).Add border beautifull, tiny for buttons. Consider dark/light thema. Cover with tests
---

## 2026-05-29T16:46:26Z
Complete the backlog task-5
---

## 2026-05-29T16:55:06Z
commit all
---

## 2026-05-29T16:56:22Z
commit all
---

## 2026-05-29T17:00:15Z
Generate suitable icon and add its link for the application
---

## 2026-05-29T17:04:29Z
Add test
---

## 2026-05-29T17:07:50Z
import { readFileSync } from 'fs';
import { resolve } from 'path';

const root = resolve(__dirname, '../../');
some words in thist lines a underlined by Intellij idea
---

## 2026-05-29T17:09:45Z
commit all
---

## 2026-05-29T17:18:59Z
Instead of 'Home' title show favicon.svg image for link to Home page
---

## 2026-05-29T17:20:34Z
Add test for that
---

## 2026-05-29T17:23:04Z
image isn't shown: show favicon.svg image
---

## 2026-05-29T17:24:35Z
commit all
---

## 2026-05-29T17:31:24Z
Create a new release with tag and suitable description (analize what was made since last release).
---

## 2026-05-29T17:35:14Z
What command did you do for release?
---

## 2026-05-29T17:36:03Z
but I didn't set tag 'v0.1.0' when execute 'git tag'
---

## 2026-05-29T17:42:31Z
I plan to make a new release give, so:
- give the next release tag
- give description for next release
---

## 2026-05-29T17:45:33Z
apply
---

## 2026-05-29T17:46:57Z
change release v0.2.0 to v0.1.1
---

## 2026-05-29T17:47:05Z
apply
---

## 2026-05-29T17:51:20Z
after releasing with tag v0.1.1 when I do a refresh on https://makeitfine-org.github.io/phrasal/phrasal-verbs I get 404 error: file:///home/eug/Pictures/Screenshots/Screenshot%20from%202026-05-29%2019-50-06.png
Fix it and write test for that.
---

## 2026-05-29T17:56:55Z
commit all
---

## 2026-05-29T18:00:27Z
Add tests for reloading each page and check out that no errors appear from Router
---

## 2026-05-29T18:03:18Z
Add default pages for '4XX Client Error Codes Reference' and '5XX Server Error Codes Explained'
---

## 2026-05-29T18:07:14Z
Also add test '4XX Client Error Codes Reference' and '5XX Server Error Codes Explained', and check the new created pages for 4xx and 5xx errors work.
---

## 2026-05-29T18:19:32Z
You don't understand me.
I mean you should show default error page for 4xx and 5xx errors.
So if there is error only. You should not show pages for error on home page
---

## 2026-05-29T18:29:39Z
I plan to make a new release give, so:
- give the next release tag
- give description for next release
---

## 2026-05-29T18:30:32Z
apply
---

## 2026-05-29T18:36:33Z
commit all
---

## 2026-05-29T18:37:27Z
I plan to make a new release give, so:
- give the next release tag
- give description for next release
---

## 2026-05-29T18:38:25Z
apply
---

## 2026-05-29T19:19:11Z
<SearchModal
          allVerbs={allVerbs}
          excluded={excluded}
          onSelect={handleJumpToVerb}
          onUnexclude={handleUnexcludeAndJump}
          onClose={() => setShowSearchModal(false)}
        /> change to search phrasal verbs sort alphabetically
---

## 2026-05-29T19:20:17Z
Cover that with the test(s)
---

## 2026-05-29T19:22:24Z
execute git add all changes and commit them with suitable message
---

## 2026-05-29T19:25:54Z
I plan to make a new release give, so:
- give the next release tag
- give description for next release
---

## 2026-05-29T19:26:22Z
apply
---

## 2026-05-29T19:32:26Z
I plan to make a new release give, so:
- give the next release tag
- give description for next release
---

## 2026-05-29T19:34:13Z
apply
---

## 2026-05-30T09:26:32Z
Fix @src/data/phrasalVerbs.ts rawData:
- definition and sentence shouldn't contain asked phrasal verb.
- Definition should not contains special symobls, ",/,(,)" etc.
---
for example: 
["Log out/Log off", "To sign out of your account", "You should always log out of your accounts when you use a public computer.", ["log out"], false],
may be fixed as:
["Log out", "To sign out of your account", "You should always log out of your accounts when you use a public computer.", ["log out"], false],
["Log off", "To sign out of your account", "You should always log off of your accounts when you use a public computer.", ["log off"], false],
And:
["Turn on/Turn off", "To switch a machine or light on or off", "Turn off the light I'm trying to sleep!", ["Turn off"], false],
as
["Turn on", "To switch a machine or light on", "Turn on the light I'm not trying to sleep!", ["Turn on"], false],
["Turn off", "To switch a machine or light off", "Turn off the light I'm trying to sleep!", ["Turn off"], false]
---

## 2026-05-30T09:32:33Z
Fix @src/data/phrasalVerbs.ts rawData:
- definition and sentence shouldn't contain asked phrasal verb.
- Definition should not contains special symobls, ",/,(,)" etc.
---
for example: 
["Log out/Log off", "To sign out of your account", "You should always log out of your accounts when you use a public computer.", ["log out"], false],
may be fixed as:
["Log out", "To sign out of your account", "You should always log out of your accounts when you use a public computer.", ["log out"], false],
["Log off", "To sign out of your account", "You should always log off of your accounts when you use a public computer.", ["log off"], false],
And:
["Turn on/Turn off", "To switch a machine or light on or off", "Turn off the light I'm trying to sleep!", ["Turn off"], false],
as
["Turn on", "To switch a machine or light on", "Turn on the light I'm not trying to sleep!", ["Turn on"], false],
["Turn off", "To switch a machine or light off", "Turn off the light I'm trying to sleep!", ["Turn off"], false]
---

## 2026-05-30T09:44:34Z
Fix @src/data/phrasalVerbs.ts rawData:
  - definition and sentence shouldn't contain asked phrasal verb.
  - Definition should not contains special symobls, ",/,(,)" etc.
  ---
  for example:
  ["Log out/Log off", "To sign out of your account", "You should always log out of your accounts when you use a public computer.", ["log out"], false],
  may be fixed as:
  ["Log out", "To sign out of your account", "You should always log out of your accounts when you use a public computer.", ["log out"], false],
  ["Log off", "To sign out of your account", "You should always log off of your accounts when you use a public computer.", ["log off"], false],
  And:
  ["Turn on/Turn off", "To switch a machine or light on or off", "Turn off the light I'm trying to sleep!", ["Turn off"], false],
  as
  ["Turn on", "To switch a machine or light on", "Turn on the light I'm not trying to sleep!", ["Turn on"], false],
  ["Turn off", "To switch a machine or light off", "Turn off the light I'm trying to sleep!", ["Turn off"], false]

export const rawData: RawVerbEntry[] = [
    ["Act out", "To perform a role or behavior", "The students acted out a scene from the play.", ["acted out"], false],
    ["Act up", "To behave inappropriately or malfunction", "The computer started to act up and froze.", ["act up"], false],
    ["Ask for", "To request or invite someone to do something", "I'm going to ask for help with this difficult task.", ["ask for"], false],
    ["Back up", "To support or assist someone or something", "Can you back up your claims with evidence?", ["back up"], false],
    ["Back up", "To reverse or move backward", "Could you back up the car so I can park?", ["back up"], false],
    ["Be cut out for", "To be suited for a particular role or occupation", "She is definitely cut out for a career in medicine.", ["cut out for"], false],
    ["Blow up", "To explode or burst into pieces", "The fireworks will blow up in the sky tonight.", ["blow up"], false],
    ["Blow up", "To lose one's temper or become angry", "He blew up at his colleague during the meeting.", ["blew up"], false],
    ["Break away", "To flee or escape from someone or something physically", "The puppy slipped its leash and tried to break away into the woods.", ["break away"], false],
    ["Break away", "To separate from a larger group or organization", "The cyclist decided to break away from the main pack and pedal ahead.", ["break away"], false],
    ["Break down", "To stop working due to a mechanical or technical failure", "My ten-year-old car finally broke down on the highway this morning.", ["broke down"], false],
    ["Break down", "To lose emotional control and start crying", "When she heard the devastating news, she simply broke down and wept.", ["broke down"], false],
    ["Break down", "To divide complex information into smaller, simpler parts", "Can you break down the quarterly expenses so we can easily see where our money went?", ["break down"], false],
    ["Break in", "To enter a building or place forcibly or illegally", "The thief attempted to break in to the house.", ["break in"], false],
    ["Break off", "To suddenly stop speaking in the middle of a sentence", "She broke off mid-sentence when the loud thunder rattled the windows.", ["broke off"], false],
    ["Break off", "To end a relationship or conversation abruptly", "After realizing they were fundamentally incompatible, they decided to break off their engagement.", ["break off"], false],
    ["Break off", "To detach or separate a piece from a larger object", "He broke off a small piece of the chocolate bar and handed it to me.", ["broke off"], false],
    ["Break out", "To escape from confinement or captivity", "The notorious thief managed to break out of the high-security prison last night.", ["break out"], false],
    ["Break out", "To start suddenly and spread rapidly", "Panic broke out in the stadium when the fire alarm suddenly sounded.", ["broke out"], false],
    ["Break out", "To develop a skin rash, acne, or other skin irritation", "She tends to break out in hives whenever she eats strawberries.", ["break out"], false],
    ["Break through", "To overcome an obstacle or make a significant achievement", "They managed to break through the language barrier.", ["break through"], false],
    ["Bring along", "To bring someone or something with you", "Don't forget to bring along your passport.", ["bring along"], false],
    ["Bring in", "To introduce or earn a certain amount of money", "The new marketing campaign really helped bring in more customers.", ["bring in"], false],
    ["Bring in", "To move something from outside into an indoor space", "It's starting to rain; we need to bring in the patio furniture.", ["bring in"], false],
    ["Bring out", "To carry something from inside to outside", "Let's bring out the cake and sing happy birthday.", ["bring out"], false],
    ["Bring out", "To release or publish something to the public", "The author plans to bring out a new novel next year.", ["bring out"], false],
    ["Bring out", "To make a quality or feature more noticeable or vivid", "That blue shirt really brings out the color of your eyes.", ["brings out"], false],
    ["Brush off", "To dismiss or ignore someone or something casually", "He brushed off my suggestion and continued with his plan.", ["brushed off"], false],
    ["Build on", "To develop or expand on something already existing", "We need to build on the success of our previous project.", ["build on"], false],
    ["Call for", "To require or demand something", "This situation calls for immediate action.", ["calls for"], false],
    ["Call in", "To request someone's presence or services", "The expert was called in to investigate the crime scene.", ["called in"], false],
    ["Call out", "To shout or say something loudly and clearly", "The teacher called out the answer to the question.", ["called out"], false],
    ["Call up", "To make a telephone call", "I'll call up the restaurant and make a reservation.", ["call up"], false],
    ["Carried away", "To become overly excited or emotional in a situation", "She got carried away and spent all her savings on the shopping spree.", ["carried away"], false],
    ["Carry on", "To continue with an activity or life in general, often through difficulty", "Sorry to interrupt, please carry on with your meeting.", ["carry on"], false],
    ["Carry out", "To complete or perform a task or action", "We need to carry out a thorough investigation.", ["carry out"], false],
    ["Catch on", "To understand or grasp something, often after a delay", "He didn't get the joke at first, but he finally caught on.", ["caught on"], false],
    ["Catch on", "To become widely popular or accepted by many people", "Electric vehicles are really catching on these days.", ["catching on"], false],
    ["Catch up", "To reach the same level or position as someone who is ahead of you", "Walk faster so you can catch up with the group.", ["catch up"], false],
    ["Catch up", "To spend time with someone to hear about what is new in their life", "Let's get coffee and catch up!", ["catch up"], false],
    ["Catch up", "To complete tasks or work that you have fallen behind on", "I need to catch up on my emails.", ["catch up"], false],
    ["Catch up", "To become deeply absorbed or involved in a situation (usually caught up in)", "She got so caught up in the drama that she lost track of time.", ["caught up"], false],
    ["Check off", "To mark or indicate that something has been completed or verified", "I'll check off the items on the list as we go.", ["check off"], false],
    ["Check over", "To review or examine something carefully", "Please check over the document for any errors.", ["check over"], false],
    ["Check up on", "To verify or investigate the condition or progress of something", "The doctor wants to check up on your recovery.", ["check up on"], false],
    ["Clean out", "To empty or remove the contents of something", "I need to clean out the garage and get rid of old items.", ["clean out"], false],
    ["Clean up", "To tidy or make something clean and neat", "They need to clean up the room before the guests arrive.", ["clean up"], false],
    ["Come about", "To happen or occur", "I'm not sure how it came about but I'm glad it did.", ["came about"], false],
    ["Come along", "To make progress or improve", "How is your project coming along?", ["coming along"], false],
    ["Come along", "To accompany or join someone", "Will you come along to the party with me?", ["come along"], false],
    ["Come away", "To leave a place or experience while retaining a new feeling, impression, or object", "I came away from the seminar feeling inspired.", ["came away"], false],
    ["Come away", "To become detached while still remaining in your hand", "The door handle came away in my hand.", ["came away"], false],
    ["Come back", "To return to a place or situation", "He promised to come back and visit us next year.", ["come back"], false],
    ["Come by", "To obtain or acquire something", "I managed to come by some concert tickets for tonight.", ["come by"], false],
    ["Come down", "To move from a higher to a lower position", "The elevator malfunctioned so we had to come down the stairs.", ["come down"], false],
    ["Come down on", "To criticize or reprimand someone heavily", "The boss came down on him for consistently being late to work.", ["came down on"], false],
    ["Come down with", "To become ill with a particular illness or condition", "She came down with the flu and had to stay home from work.", ["came down with"], false],
    ["Come forward", "To offer oneself for a task position or help", "If anyone has any information please come forward and speak to the authorities.", ["come forward"], false],
    ["Come in", "To enter a place", "Please knock before you come in.", ["come in"], false],
    ["Come off", "To succeed or produce the intended result", "The whole business deal just didn't come off.", ["came off"], false],
    ["Come off", "To detach or be removed from a surface", "The button came off my coat.", ["came off"], false],
    ["Come off", "To be removed from a hard surface (stains, marks)", "That grease stain just won't come off the kitchen counter.", ["come off"], false],
    ["Come off", "To give a particular impression or come across in a certain way", "He tried to be helpful, but he came off as bossy.", ["came off"], false],
    ["Come on", "To encourage or urge someone", "Come on you can do it!", ["Come on"], false],
    ["Come out", "To be revealed or made public", "The truth finally came out in court.", ["came out"], false],
    ["Come out", "To be removed from fabric through washing", "This coffee stain will easily come out in the wash.", ["come out"], false],
    ["Come out", "To emerge from an enclosed space or leave a building", "She just came out of the building.", ["came out"], false],
    ["Come out", "To be published, released, or made available to the public", "The new movie comes out next week.", ["comes out"], false],
    ["Come over", "To visit someone's place", "Why don't you come over to my house this weekend?", ["come over"], false],
    ["Come up", "To arise or occur unexpectedly", "An unexpected problem came up at work, so I have to stay late.", ["came up"], false],
    ["Come up", "To rise or approach (sun, tide, or deadline)", "The sun came up early this morning.", ["came up"], false],
    ["Come up with", "To actively generate, invent, or find something that is needed", "We need to brainstorm and come up with a solution.", ["come up with"], false],
    ["Count on", "To rely on or trust someone or something", "You can always count on me for support.", ["count on"], false],
    ["Cut down on", "To reduce the amount or quantity of something", "I'm trying to cut down on caffeine.", ["cut down on"], false],
    ["Deal with", "To handle or manage a situation or problem", "We need to deal with this issue immediately.", ["deal with"], false],
    ["Do away with", "To eliminate or get rid of something", "Let's do away with unnecessary paperwork.", ["do away with"], false],
    ["Do up", "To fasten or decorate something", "She did up her hair and put on a beautiful dress for the party.", ["did up"], false],
    ["Dress up", "To wear formal or fancy clothing for a special occasion", "We should dress up for the wedding.", ["dress up"], false],
    ["Eat up", "To consume all the food", "He ate up his entire meal in just a few minutes.", ["ate up"], false],
    ["Fall back on", "To rely on something as a last resort or backup", "If I can't find a job I might fall back on my savings.", ["fall back on"], false],
    ["Fall in", "To collapse inward or form a line or formation", "The old building finally fell in after years of neglect.", ["fell in"], false],
    ["Fall out", "To have a disagreement or argument", "They fell out over a trivial issue and stopped speaking to each other.", ["fell out"], false],
    ["Fall out", "To unintentionally drop an object", "Her credit card fell out of her pocket.", ["fell out"], false],
    ["Fall through", "To fail to happen or be completed as planned", "Our plans to go on a trip fell through due to bad weather.", ["fell through"], false],
    ["Figure out", "To understand or solve something", "She finally figured out the solution to the puzzle.", ["figured out"], false],
    ["Find out", "To discover or obtain information", "I need to find out what time the meeting starts.", ["find out"], false],
    ["Get along with", "To have a harmonious, conflict-free relationship with someone", "I get along with my new coworkers really well.", ["get along with"], false],
    ["Get along with", "To manage or cope with a situation", "How are you getting along with your studies?", ["getting along with"], false],
    ["Get away", "To go on a vacation or take a break from your routine", "I really need to get away for the weekend and relax.", ["get away"], false],
    ["Get away", "To escape from a person or dangerous situation", "The suspect managed to get away from the police.", ["get away"], false],
    ["Get by", "To manage or survive with the available resources or income", "They can get by with their current budget.", ["get by"], false],
    ["Get in", "To enter or arrive at a place", "He needs to get in before the meeting starts.", ["get in"], false],
    ["Get off", "To disembark from a large vehicle or leave a surface", "I need to get off the train at the next stop.", ["get off"], false],
    ["Get on", "To make progress or continue", "He needs to get on with his work.", ["get on"], false],
    ["Get on with", "To have a good relationship or get along with someone", "I get on with my new coworkers really well.", ["get on with"], false],
    ["Get on with", "To continue doing a task or get back to work without delay", "Stop procrastinating and get on with your work.", ["get on with"], false],
    ["Get out", "To leave an enclosed space or small vehicle", "Get out of the house, it's on fire!", ["Get out"], false],
    ["Get over", "To recover from an illness or emotional distress", "It took her a long time to get over the loss of her pet.", ["get over"], false],
    ["Get through", "To finish or complete", "I have a lot of work to get through today.", ["get through"], false],
    ["Give off", "To emit a physical property such as heat, light, or smell", "The rotting leaves gave off a terrible smell.", ["gave off"], false],
    ["Give off", "To radiate a certain emotional energy or vibe", "She always gives off a very confident vibe.", ["gives off"], false],
    ["Go away", "To leave or depart", "Can you please go away and leave me alone?", ["go away"], false],
    ["Go back", "To return to a previous location or time", "We go back to visit our hometown every summer.", ["go back"], false],
    ["Go by", "To pass or elapse", "Time goes by so quickly when you're having fun.", ["goes by"], false],
    ["Go on", "To continue or proceed", "Please go on with your presentation.", ["go on"], false],
    ["Go out", "To leave one's place of residence or to socialize for entertainment", "Let's go out for dinner tonight.", ["go out"], false],
    ["Go through", "To experience or endure", "She had to go through a lot of difficulties to achieve her goals.", ["go through"], false],
    ["Go with", "To match or be suitable for", "The red shoes go with my dress perfectly.", ["go with"], false],
    ["Hand out", "To distribute or give items to multiple people", "The teacher will hand out the exam papers.", ["hand out"], false],

    ["Hand in", "To submit work or an item to a teacher, boss, or official", ["Please hand in your homework by Friday.", "I need to hand in my resignation letter."], ["hand in"], false],

    ["Hang about", "To linger or wait around", "He likes to hang about in the park after school.", ["hang about"], false],
    ["Hang around", "To spend time in a place without any specific purpose", "We used to hang around the mall when we were teenagers.", ["hang around"], false],
    ["Hold on", "To wait or remain on the line", "Please hold on while I transfer your call.", ["hold on"], false],
    ["Keep in", "To retain or maintain something within a confined space or boundary", "He always keeps in his emotions and rarely shows them.", ["keeps in"], false],
    ["Keep on", "To continue doing something persistently, usually followed by a gerund (-ing verb)", "If you keep on practicing, you will master it.", ["keep on"], false],
    ["Keep up with", "To maintain the same pace or level as someone or something", "It's hard to keep up with all the latest technology.", ["keep up with"], false],
    ["Keep up", "To maintain the same speed or standard as others", "Walk a bit slower, I can't keep up with you!", ["keep up"], false],
    ["Keep up", "To continue at the same level of performance or quality", "Keep up the good work!", ["Keep up"], false],
    ["Knock down", "To demolish or destroy", "They plan to knock down the old building and construct a new one.", ["knock down"], false],
    ["Lay off", "To terminate someone's employment", "The company had to lay off several employees due to financial problems.", ["lay off"], false],
    ["Leave out", "To omit or exclude", "She accidentally left out an important detail in her report.", ["left out"], false],
    ["Let down", "To disappoint or fail someone", "He promised to help but he let us down when he didn't show up.", ["let", "down"], false],
    ["Let in", "To allow someone to enter", "Please let me in the room; I forgot my key.", ["let", "in"], false],
    ["Let off", "To release or excuse from a punishment", "The police officer decided to let him off with a warning.", ["let", "off"], false],
    ["Look after", "To take care of or watch over", "She needs to look after her younger siblings while their parents are away.", ["look after"], false],
    ["Look down on", "To view with contempt or consider inferior", "She looks down on people who don't have a college education.", ["looks down on"], false],
    ["Look forward to", "To anticipate or be excited about", "I'm really looking forward to our vacation next month.", ["looking forward to"], false],
    ["Look into", "To investigate or examine", "The authorities will look into the matter and take appropriate action.", ["look into"], false],
    ["Look out for", "To watch or be vigilant for something or someone", "Look out for any signs of danger.", ["Look out for"], false],
    ["Look up to", "To admire or respect someone", "I look up to my older sister for her achievements.", ["look up to"], false],
    ["Make out", "To understand or see something unclear or distant", "I can't make out the words on the sign from here.", ["make out"], false],
    ["Make out", "To engage in passionate kissing", "They were caught making out in the park.", ["making out"], false],
    ["Make up", "To invent or create a story or excuse", "He made up a silly excuse for being late.", ["made up"], false],
    ["Make up", "To reconcile or restore a friendly relationship", "After their argument they decided to make up and be friends again.", ["make up"], false],
    ["Mix up", "To confuse or mistake something or someone", "She always mixes up our names.", ["mixes up"], false],
    ["Pass away", "To die", "Her grandfather passed away last night.", ["passed away"], false],
    ["Pass on", "To transmit or convey something", "Please pass on the message to the team.", ["pass on"], false],
    ["Pass out", "To faint or lose consciousness temporarily", "He felt dizzy and passed out during the presentation.", ["passed out"], false],
    ["Pass up", "To miss or decline an opportunity", "Don't pass up the chance to travel the world.", ["pass up"], false],
    ["Pay off", "To yield a successful or positive result", "Working hard for that promotion really paid off.", ["paid off"], false],
    ["Pay off", "To completely eliminate a debt by making the final payment", "I am finally going to pay off my student loans this year.", ["pay off"], false],
    ["Pick out", "To choose or select something from a range of options", "I need to pick out a new outfit for the wedding.", ["pick out"], false],
    ["Pick out", "To identify or spot someone or something among others", "Can you pick out the best photo from the vacation?", ["pick out"], false],
    ["Pick up", "To physically lift something from the ground or a surface", "I need to pick up my jacket from the floor.", ["pick up"], false],
    ["Pick up", "To collect or retrieve something or someone", "Could you pick up the groceries from the store on your way home?", ["pick up"], false],
    ["Pick up", "To collect someone in a vehicle and take them somewhere", "I will pick you up from the airport at 5 PM.", ["pick up"], false],
    ["Point out", "To indicate or draw attention to something or someone", "He pointed out the mistake in the report.", ["pointed out"], false],
    ["Pull off", "To succeed in achieving something difficult or impressive", "She pulled off a flawless performance on stage.", ["pulled off"], false],
    ["Put forward", "To propose or suggest something", "He put forward a new idea for the project.", ["put forward"], false],
    ["Put off", "To postpone or delay something", "We had to put off the meeting until next week.", ["put off"], false],
    ["Put up with", "To tolerate or endure something", "She had to put up with his constant complaining.", ["put up with"], false],
    ["Put up", "To assemble or display", "They put up their artwork for the gallery show.", ["put up"], false],
    ["Run away", "To escape or flee from a place or situation", "The child decided to run away from home.", ["run away"], false],
    ["Run into", "To meet or encounter someone by chance", "I ran into an old friend at the grocery store.", ["ran into"], false],
    ["Run off", "To leave quickly or suddenly", "He ran off without saying goodbye.", ["ran off"], false],
    ["Run out (of)", "To use up or exhaust the supply of something", "We ran out of milk so I need to go to the store.", ["ran out of"], false],
    ["Set off", "To start a journey or trip", "We set off early in the morning to avoid traffic.", ["set off"], false],
    ["Set off", "To trigger or initiate something such as a series of events", "Her comments set off a heated debate among the panelists.", ["set off"], false],
    ["Set up", "To establish or arrange something", "They set up a new business together.", ["set up"], false],
    ["Settle down", "To calm down or become established in a stable life", "After traveling for years she decided to settle down in a small town.", ["settle down"], false],
    ["Settle in", "To become accustomed or get comfortable in a new place", "It took some time for them to settle in their new home.", ["settle in"], false],
    ["Settle up", "To pay a debt or resolve financial matters", "They need to settle up the bill before leaving the restaurant.", ["settle up"], false],
    ["Show off", "To display or demonstrate one's skills or possessions", "He loves to show off his new car to everyone.", ["show off"], false],
    ["Show up", "To arrive or appear especially unexpectedly or at a specified time", "She showed up at the party wearing a stunning dress.", ["showed up"], false],
    ["Shut down", "To close or stop the operation of a business or system", "The company decided to shut down its manufacturing plant.", ["shut down"], false],
    ["Shut down", "To dismiss or reject an idea proposal or argument", "The team leader immediately shut down his suggestion.", ["shut down"], false],
    ["Sit down", "To take a seat or position oneself comfortably", "Let's sit down and discuss the details of the project.", ["sit down"], false],
    ["Stand out", "To be noticeably different or exceptional", "Her talent stands out among the other contestants.", ["stands out"], false],
    ["Stand up to", "To confront or resist someone or something", "He decided to stand up to the bully.", ["stand up to"], false],
    ["Stick around", "To remain or stay in a place or situation", "Can you stick around until I finish this task?", ["stick around"], false],
    ["Take after", "To resemble or have similar traits as someone", "She takes after her mother in terms of looks and personality.", ["takes after"], false],
    ["Take apart", "To disassemble or dismantle something", "We need to take apart the furniture before moving it.", ["take apart"], false],
    ["Take back", "To retract or withdraw a statement or offer", "I want to take back what I said earlier.", ["take back"], false],
    ["Take back", "To return something to its original location or owner", "Could you please take back this book to the library?", ["take back"], false],
    ["Take down", "To write or record something", "Please take down the important points of the meeting.", ["take down"], false],
    ["Take in", "To understand or comprehend something", "I couldn't take in all the information at once.", ["take in"], false],
    ["Take on", "To undertake or accept a responsibility or challenge", "He decided to take on the project despite the difficulties.", ["take on"], false],
    ["Take over", "To assume control or become dominant", "The new manager will take over the department next week.", ["take over"], false],
    ["Take up", "To start or begin a hobby activity or occupation", "I want to take up playing the piano.", ["take up"], false],
    ["Talk over", "To discuss or consider something with others", "Let's talk over the details of the project.", ["talk over"], false],
    ["Think over", "To consider or reflect on something", "I need some time to think over your proposal.", ["think over"], false],
    ["Throw away", "To discard or get rid of something", "She decided to throw away the old magazines.", ["throw away"], false],
    ["Try for", "To attempt to achieve or obtain something", "He will try for a promotion at work.", ["try for"], false],
    ["Try on", "To test or experiment with wearing something", "She wants to try on the dress before buying it.", ["try on"], false],
    ["Try out", "To test or evaluate something", "They decided to try out the new software.", ["try out"], false],
    ["Turn down", "To reject or refuse an offer or request", "She turned down the job offer because of the low salary.", ["turned down"], false],
    ["Use up", "To deplete or exhaust the supply or quantity of something", "We used up all the printer ink.", ["used up"], false],
    ["Wake up", "To stop sleeping and become conscious", "I usually wake up early in the morning.", ["wake up"], false],
    ["Walk away", "To leave or abandon a situation or relationship", "He decided to walk away from the argument.", ["walk away"], false],
    ["Walk out", "To leave suddenly or in protest", "The audience walked out during the boring performance.", ["walked out"], false],
    ["Watch out", "To be cautious or vigilant", "Watch out for the step it's slippery.", ["Watch out"], false],
    ["Wear off", "To gradually fade or disappear", "The effects of the medication will wear off in a few hours.", ["wear off"], false],
    ["Work off", "To eliminate or reduce through physical activity or effort", "I need to work off the extra calories I consumed.", ["work off"], false],
    ["Work up", "To develop or generate a particular feeling or state", "I'm trying to work up the courage to ask her out.", ["work up"], false],
    ["Write down", "To record or write something on paper", "Please write down the important details.", ["write down"], false],
    ["Write off", "To consider something as a loss or failure", "They had to write off the damaged goods.", ["write off"], false],
    ["Write up", "To write a report summary or account of something", "I need to write up the meeting minutes.", ["write up"], false],
    ["Zip up", "To fasten or close a zipper", "She forgot to zip up her jacket before going outside.", ["zip up"], false],
    ["Pay back", "To return money that you borrowed from someone", "Could you lend me $20 for lunch? I'll pay you back on Friday.", ["pay", "back"], false],
    ["Pay out", "To distribute or disburse money from a fund or account", "The insurance company will pay out the claim next week.", ["pay out"], false],
    ["Give out", "To distribute or hand things out to multiple people", "The teacher gave out the exam papers to all the students.", ["gave out"], false],
    ["Look up", "To check the meaning of something", "If you don't know the meaning of a word you should look it up in the dictionary.", ["look", "up"], false],
    ["Give up", "To stop trying; surrender", "After two weeks of trying to build my own table I gave up and just bought one.", ["gave up"], false],
    ["Give away", "To donate or permanently hand something over without charge", "They decided to give away their old clothes to charity.", ["give away"], false],
    ["Give away", "To accidentally reveal a secret or betray someone", "Her nervous smile gave her away.", ["gave", "away"], false],
    ["Hold back", "To stop yourself from doing or saying something", "Amy has a great voice but whenever she's singing in public she feels shy and holds back.", ["holds back"], false],
    ["Drop off", "To take someone or something somewhere and leave them/it there", "Can you drop me off at the grocery store on your way home?", ["drop", "off"], false],
    ["Work out", "To come up with a solution or a compromise", "Don't worry I'm sure we can work something out so that everyone is happy.", ["work", "out"], false],
    ["Drop by", "To make a brief, casual stop at a place while passing through an area", "Feel free to drop by the office if you're in the neighborhood.", ["drop by"], false],
    ["Drop in", "To visit someone without making an appointment", "Drop in to my office anytime.", ["Drop in"], false],
    ["Check out", "To see or try something out to learn more about it", "Check out my new car!", ["Check out"], false],
    ["Take out", "To remove or extract something from a container, place, or person", "Please take out the trash.", ["take out"], false],
    ["Take out", "To take someone on a date", "He took her out to the most expensive restaurant in the city.", ["took", "out"], false],
    ["Take away", "To remove something from someone so they no longer have access to it", "The teacher had to take away the students' phones.", ["take away"], false],
    ["Take away", "To eliminate or significantly reduce a pain, problem, or feeling", "The painkillers will take away the headache.", ["take away"], false],
    ["Turn on/Turn off", "To switch a machine or light on or off", "Turn off the light I'm trying to sleep!", ["Turn off"], false],
    ["Cheer on", "To support someone through words of encouragement", "Even though Samantha was in last place her brother cheered her on through the entire race.", ["cheered", "on"], false],
    ["Fill in", "To do someone else's job temporarily", "Can you fill in for me while I'm on vacation?", ["fill in"], false],
    ["Put out", "To extinguish a fire", "The firefighters managed to put out the fire before it spread to other houses.", ["put out"], false],
    ["Put out", "To irritate someone by asking them for a favor", "I'd ask you to make me dinner but I don't want to put you out.", ["put", "out"], false],
    ["Put on", "To get your clothes or makeup on", "Every morning she puts on her dress lipstick shoes and hat—in that order.", ["puts on"], false],
    ["Take off", "To remove clothing or something worn on the body", "Please take off your shoes before coming inside.", ["take off"], false],
    ["Fill out", "To complete a form by providing required information", "Please fill out the application form and submit it by Friday.", ["fill out"], false],
    ["Cheer up", "To show support to someone who seems sad or to try to make someone happier", "Andrew was having a bad day so his girlfriend cheered him up by taking him out for ice cream.", ["cheered", "up"], false],
    ["Cut off", "To interrupt or stop something", "His father is rich but he cut him off without any money of his own.", ["cut", "off"], false],
    ["Cut out", "To stop it", "Hey cut it out! I was watching that movie so stop changing the channel!", ["cut", "out"], false],
    ["Call off", "To cancel something", "We had to call off the picnic because of the rain.", ["call off"], false],
    ["Bring up", "To mention something", "Mark was sick and had to miss the party so please don't bring it up I don't want him to feel bad for missing it.", ["bring", "up"], false],
    ["Bring on", "To cause something to happen usually something negative", "His lung cancer was brought on by years of smoking.", ["brought on"], false],
    ["Bring it on!", "To accept a challenge with confidence", "You want to have a race? Bring it on! I can beat you!", ["Bring", "on"], false],
    ["Call on", "To visit someone", "I'll call on you this evening to see how you're feeling.", ["call on"], false],
    ["Warm up to", "To start liking someone or something more as you spend more time with them", "The new puppy was scared of my husband when we first got him but he warmed up to him pretty quickly.", ["warmed up to"], false],
    ["Come across", "To meet or find by chance", "I was cleaning the attic and I came across my high school uniform. Can you believe it still fits?", ["came across"], false],
    ["Get back at", "To get revenge on someone", "Her ex-husband took her house so she got back at him by taking his dogs.", ["got back at"], false],
    ["Go out with", "To go on a date with someone", "Sarah was so happy when Peter finally asked her to go out with him!", ["go out with"], false],
    ["Log in", "To sign in to your account on a website or computer", "Don't forget to log in to your account to learn English better and faster.", ["log in"], false],
    ["Pay for", "To give someone money for a particular purpose", "She used her credit card to pay for the hotel reservation.", ["pay for"], false],
    ["Pay for", "To suffer because of something you did", "He'll pay for all the problems he caused me by being late today!", ["pay for"], false],
    ["Fall for", "To fall in love with someone", "He fell for her the moment he saw her.", ["fell for"], false],
    ["Cut in", "To interrupt a conversation or activity", "The teacher cut him in and asked him to explain the answer to the class.", ["cut", "in"], false],
    ["Call on", "To use someone's or something's knowledge", "I may need to call on the university's excellent professors in order to answer your question.", ["call on"], false],
    ["Drop out", "To quit or stop participating in something", "She was a straight-A student but she dropped out of college to pursue her dream of becoming an artist.", ["dropped out"], false],
    ["Log out/Log off", "To sign out of your account", "You should always log out of your accounts when you use a public computer.", ["log out"], false],
    ["Look out", "To watch out for something", "Look out there's a baseball coming your way!", ["Look out"], false],
    ["Come up", "To be mentioned or brought up in conversation", "The new project came up during our team meeting.", ["came up"], false],
    ["Come up", "When something happens unexpectedly", "I was going to meet my friends for dinner but something came up so I had to cancel.", ["came up"], false],
    ["Come forward", "To volunteer information about something like a crime", "The police are encouraging people to come forward with any information about the kidnapped girl.", ["come forward"], false],
    ["Check in", "To register at a hotel for a stay", "We haven't checked in at the hotel yet.", ["checked in"], false],
    ["End up", "To eventually be in a particular place or situation", "After driving around for hours we finally ended up at the beach.", ["ended up"], false],
    ["Fall apart", "To stop working or break into pieces", "The old chair fell apart when I sat on it.", ["fell apart"], false],
    ["Fall down", "To collapse or fall to the ground", "The little girl tripped and fell down the stairs.", ["fell down"], false],
    ["Fall off", "To decline in quality or quantity", "Sales fell off during the holiday season.", ["fell off"], false],
    ["Give out", "To break down or stop functioning due to exhaustion or overuse", "His car engine finally gave out in the middle of nowhere.", ["gave out"], false],
    ["Go ahead", "To go in front of someone or to give permission", "You can go ahead and start the meeting without me.", ["go ahead"], false],
    ["Grow up", "To tell someone to stop acting childish", "Some people tell Steve he needs to grow up but he loves acting like a child.", ["grow up"], false],
    ["Grow apart", "To get distant from someone like a friend", "When my friend moved to a different country I tried to stay close with her but we slowly grew apart.", ["grew apart"], false],
    ["Hang on", "To keep something", "When everyone else was getting fired Paul managed to hang on to his job.", ["hang on"], false],
    ["Hang out", "To spend time with someone casually", "My friends and I used to hang out in the park after school.", ["hang out"], false],
    ["Hang up", "To end a phone call especially if before the other person is ready", "I was in the middle of a sentence and he hung up on me! How rude.", ["hung up"], false],
    ["Hold on", "To hold something tightly", "You'd better hold on to your hat; it's windy out there!", ["hold on"], false],
    ["Hold on", "To ask someone to wait for a moment", "Hold on I'll be right back.", ["Hold on"], false],
    ["Give in", "To surrender especially in a fight or argument", "Ben's mother gave in and let him stay out late with his friends.", ["gave in"], false],
    ["Take off", "For an aircraft to leave the ground and become airborne", "The airplane is scheduled to take off at 8:00 PM.", ["take off"], false],
    ["Take off", "To leave a place suddenly or in a hurry", "She saw her ex and decided to take off.", ["take off"], false],
    ["Take off", "To suddenly become very successful or popular", "His startup really took off after that investor called.", ["took off"], false],
    ["Turn around", "To move so you're facing the opposite direction", "Sally was about to get on the plane but she turned around when someone called her name.", ["turned around"], false],
    ["Turn up", "When something that was lost is found unexpectedly", "Anything I lose usually turns up under the couch. It's my cat's favorite hiding place.", ["turns up"], false],
    ["Work out", "To exercise", "I try to work out every morning by repeatedly lifting a heavy donut to my mouth.", ["work out"], false],
];
Do not search the codebase or run tests.
---

## 2026-05-30T10:25:02Z
fix tests
---

## 2026-05-30T10:30:59Z
fix tests based on changes in @src/data/phrasalVerbs.ts
---

## 2026-05-30T10:46:37Z
fix tests based on changes in @src/data/phrasalVerbs.ts
---

## 2026-05-30T10:48:50Z
execute git add all changes and commit them with suitable message
---
