# Blackbox — Prompt Audit Log
# Append-only. Raw user inputs for session auditability.

## 2026-06-02T09:39:13Z
I plan to make a new release give, so:
- give the next release tag
- give description for next release
---

## 2026-06-02T09:39:51Z
apply
---

## 2026-06-05T09:05:30Z
run test and make changes in test @src/__tests__/phrasalVerbs.test.ts
---

## 2026-06-05T09:13:21Z
When click on "Phrasal Verbs" link on main page you should get to "Phrasal Verbs" page (like it's done for "Grammar") and the should be link "test most pupular".
---

## 2026-06-05T09:13:53Z
When click on "Phrasal Verbs" link on main page you should get to "Phrasal Verbs" page (like it's done for "Grammar") and the should be link "test most pupular".
Move there that "Phrasal Verbs" quiz.
---

## 2026-06-05T09:17:57Z
git add all changes and commit them with suitable message
---

## 2026-06-05T10:09:26Z
Inside the "Phrasal verbs" page create sub-page "list", and inside list create page "Get".
For the "Get" create page with definitions/examples/pictures I'll provide you:
Get off
1. To leave a form of public transport (bus, train, plane):
Example: We need to get off the train at the next station.
/home/eug/Downloads/Gemini_Generated_Image_s9u56js9u56js9u5.png

2. To finish work:
Example: I usually get off work at 5:00 PM.
/home/eug/Downloads/Gemini_Generated_Image_s9u56js9u56js9u5 (1).png

3. To escape punishment:
Example: The manager made a huge mistake, but he got off with just a warning.
/home/eug/Downloads/Gemini_Generated_Image_s9u56js9u56js9u5 (2).png

4. To send something (like a letter or email):
Example: I will get this report off to the client before the end of the day.
/home/eug/Downloads/Gemini_Generated_Image_s9u56js9u56js9u5 (3).png
---

## 2026-06-05T10:19:10Z
git add all changes and commit them with suitable message
---

## 2026-06-05T10:51:01Z
move image from get-off folder to get/off one
---

## 2026-06-05T10:52:12Z
git add all changes and commit them with suitable message
---

## 2026-06-05T10:55:23Z
- Remove "4 meanings" from get get off page
- Picture should be shown without hidden some parts.
---

## 2026-06-05T10:57:28Z
pictures are now 500x500 adope to that.
---

## 2026-06-05T10:59:25Z
make smaller the all frame for the pic/defintion/example
---

## 2026-06-05T11:00:41Z
do not make test font smaller
---

## 2026-06-05T11:03:53Z
git add all changes and commit them with suitable message
---

## 2026-06-05T11:05:00Z
get test bigger for mobile devices
---

## 2026-06-05T11:05:50Z
more bigger
---

## 2026-06-05T11:08:32Z
but only for mobile devices for desktop it was good.
---

## 2026-06-05T11:09:23Z
commit
---

## 2026-06-05T11:12:03Z
When I click on frame (pic/defintion/example etc.) of any phrasal verb it shoul be collapse to just definition, for example (4 To send something (like a letter or email).
---

## 2026-06-05T11:12:20Z
When I click on frame (pic/defintion/example etc.) of any phrasal verb it shoul be collapse to just definition, for example (4 To send something (like a letter or email).
If I click again it should collapse back.
---

## 2026-06-05T11:14:32Z
git add all changes and commit them with suitable message
---

## 2026-06-05T11:16:20Z
It should emarge collapsed but save state of extended/collapsed if refresh. Also add tests for that
---

## 2026-06-05T11:18:52Z
git add all changes and commit them with suitable message
---

## 2026-06-05T12:05:22Z
Make for each phrasal verb 2 lines for definition so that it looks the same.
---

## 2026-06-05T12:06:29Z
Make for each phrasal verb 1 line for definition so that it looks the same.
For those longer just show all when hover with mouse.
---

## 2026-06-05T12:08:20Z
Write tests for that, and for hovering with mouse
---

## 2026-06-05T12:09:48Z
git add all changes and commit them with suitable message
---

## 2026-06-05T12:12:58Z
Make default with not 500 but 700.
But don't increase picture, just make for it a border around
---

## 2026-06-05T12:14:38Z
git add all changes and commit them with suitable message
---

## 2026-06-05T12:15:21Z
Yes
---

## 2026-06-05T12:15:57Z
Yes
---

## 2026-06-05T12:17:17Z
- Add border around frame of each phrasal verb: light for dark thema and dark for light thema.
Add tests for that all
---

## 2026-06-05T12:34:35Z
For "get" page place "off" separactly on new line on the left and extend/collapse by in that definition.
---

## 2026-06-05T12:39:51Z
No, I meant single "off" and by click collapse/extend it and show its content.
---

## 2026-06-05T12:44:30Z
git add all changes and commit them with suitable message
---

## 2026-06-05T12:51:12Z
Show that triangle near "off" by sharp angle down when extended and by sharp angle right when collapse
---

## 2026-06-05T12:53:02Z
cover that with the tests.
---

## 2026-06-05T12:53:46Z
git add all changes and commit them with suitable message
---

## 2026-06-05T12:55:35Z
Get on

To step onto a form of public transport:
Example: Hurry up and get on the bus before it leaves!
/home/eug/Downloads/transport.png

To make progress or handle a situation:
Example: How are you getting on with the new Java project?
/home/eug/Downloads/progress.png

To have a good relationship (often "get on with"):
Example: I get on very well with my team members.
/home/eug/Downloads/relationship.png

To continue doing something:
Example: Let's stop chatting and get on with the meeting.
/home/eug/Downloads/continue.png

---

Do the same as it's for "get off".
---

## 2026-06-05T13:02:28Z
git add all changes and commit them with suitable message
---

## 2026-06-05T13:18:12Z
for "off", "onn":
- when extended put num and definition after pic near the example in the bottom
---

## 2026-06-05T13:18:25Z
for "off", "onn":
- when extended put num and definition after pic near the example in the bottom
---

## 2026-06-05T13:20:12Z
@src/pages/get/GetVerbPage.tsx
---

## 2026-06-05T13:20:17Z
@src/pages/get/GetVerbPage.tsx
for get phrasal verb "off", "on":
  - when extended put num and definition after pic near the example in the bottom
---

## 2026-06-05T13:21:24Z
leave small space between border and picture dont'stick them
---

## 2026-06-05T13:22:08Z
Cover the functionality with tests
---

## 2026-06-05T13:24:13Z
git add all changes and commit them with suitable message
---

## 2026-06-05T13:24:56Z
Keep a little closer "off" and "on"
---

## 2026-06-05T13:25:47Z
Cover this functionality with tests
---

## 2026-06-05T13:29:48Z
git add all changes and commit them with suitable message
---

## 2026-06-05T14:10:20Z
Add white line separator between "off" and "on". It should be tiny
---

## 2026-06-05T14:11:19Z
Add white line separator between "off" and "on". It should be tiny
---

## 2026-06-05T14:11:46Z
git add all changes and commit them with suitable message
---

## 2026-06-05T14:23:03Z
Get up
To rise from bed after sleeping:
Example: I get up at 6:30 AM every morning.
/home/eug/Downloads/iloveimg-compressed/bad.png
/home/eug/Downloads/iloveimg-compressed/desk.png

To stand up:
Example: He got up from his desk to welcome the visitors.

To organize or arrange something:
Example: We need to get up a team to handle this new software update.
/home/eug/Downloads/iloveimg-compressed/arrange.png

---

Do the same as it's for "get off", "get on".
---

## 2026-06-05T15:36:27Z
Get down

To move to a lower position:
Example: You need to get down from that ladder before you fall.
/home/eug/Downloads/iloveimg-compressed/climb_down.png

To make someone feel sad or depressed:
Example: This rainy weather is really getting me down.
/home/eug/Downloads/Done pics/down/sad.png

To write something:
Example: Let me get your contact details down in my notebook.
/home/eug/Downloads/Done pics/down/write.png

To start focusing on a task seriously (often "get down to"):
Example: Enough small talk; let's get down to business.
/home/eug/Downloads/Done pics/down/focus.png



Get in

To enter a car, room, or building:
Example: Get in the car, we are going to be late.
/home/eug/Downloads/iloveimg-compressed/car.png

To arrive (usually a train, flight, or arriving at home/work):
Example: What time does your flight get in?
/home/eug/Downloads/iloveimg-compressed/arriving.jpg

To be accepted into a school, club, or organization:
Example: She applied to a top university and she got in.
/home/eug/Downloads/Done pics/in/accepted.png

To submit something:
Example: I need to get my expenses application in by Friday.
/home/eug/Downloads/Done pics/in/submit.png

---

Do the same as it's for "get off", "get on".
---

## 2026-06-05T16:42:51Z
Get into

To become interested or involved in something:
Example: I recently got into software development.
/home/eug/Downloads/iloveimg-compressed/state.png

To enter a specific state or situation:
Example: The company got into financial trouble last year.
/home/eug/Downloads/iloveimg-compressed/interest.png

To start a habit:
Example: I've got into the habit of checking my emails before breakfast.
/home/eug/Downloads/iloveimg-compressed/hobby.png

---

Do the same as it's for "get off", "get on".
---

## 2026-06-05T17:04:07Z
Get out

To leave a place or a car:
Example: The fire alarm rang, and everyone got out of the building.

To become known (usually a secret or hidden information):
Example: The news of the CEO leaving got out to the press.

To produce or publish something:
Example: We need to get this new application out by next month.

To avoid doing something you do not want to do (often "get out of"):
Example: He tried to get out of doing the presentation, but his boss said no.

---

Do the same as it's for "get off", "get on".
As base picture just use:
/home/eug/Downloads/pw.png
---

## 2026-06-05T17:09:43Z
change that png pictures to [Image #4]
---

## 2026-06-05T17:10:37Z
instead of 4 the same just use single one
---

## 2026-06-05T17:13:49Z
git add all changes and commit them with suitable message
---

## 2026-06-05T17:18:35Z
- move "images/get" folder in "phrasal_verbs" one
- move default.png to upper level of "phrasal_verbs" folder
---

## 2026-06-05T17:19:08Z
- move "images/get" folder in "phrasal_verbs/list" one
- move default.png to upper level of "phrasal_verbs/list" folder
---

## 2026-06-05T17:24:35Z
git add all changes and commit them with suitable message
---

## 2026-06-05T17:46:16Z
@src/__tests__/GetVerbPage.test.tsx split test semantically into smaller tests and place them in folder @src/__tests__/get_verb_page
---

## 2026-06-05T17:55:08Z
git add all changes and commit them with suitable message
---

## 2026-06-05T18:45:08Z
When open first time phrasal verbs have to be collapsed by default
---

## 2026-06-05T18:46:58Z
When open first time phrasal verbs have to be collapsed by default
---

## 2026-06-05T18:50:42Z
on @src/pages/get/GetVerbPage.tsx change when open first time phrasal verbs have to be collapsed by default
---

## 2026-06-05T18:52:01Z
Fix test
---

## 2026-06-05T19:14:34Z
git add all changes and commit them with suitable message
---

## 2026-06-05T19:20:26Z
For the phrasal verbs along with definition also show on the next line the example.
If it is longer than one line, this example, then just show it fully when the mouse is hoverd on it.
---

## 2026-06-05T19:25:54Z
Add tests for that functionality
---

## 2026-06-05T19:31:30Z
git add all changes and commit them with suitable message
---

## 2026-06-05T19:37:24Z
For the phrasal verbs that have default.png as the picture don't show it by clicking on its frame. Do nothing by clicking on that frame.
---

## 2026-06-05T19:41:42Z
Cover the functionality with tests
---

## 2026-06-05T19:45:12Z
git add all changes and commit them with suitable message
---

## 2026-06-05T19:46:52Z
Get away
To escape:

Example: The thief got away before the police arrived.

To go on a holiday or take a break:

Example: We are hoping to get away to the mountains for the weekend.

To do something wrong without being punished (often "get away with"):

Example: He lied about his sales numbers, but he won't get away with it.

Get across
(Note: "Get cross" simply means to become angry. "Get across" is the phrasal verb.)

To communicate an idea successfully so people understand it:

Example: The leader got her vision across perfectly during the presentation.

To physically cross a road, river, or space:

Example: We need to get across the street.

Get forward
To move to the front (often used in sports to describe attacking):

Example: The team's defenders need to get forward to help score a goal.

Get back
To return to a place or a state:

Example: When did you get back from your business trip?

To have something returned to you:

Example: I finally got my laptop back from the IT department.

To return to a previous activity (often "get back to"):

Example: I'll answer that question later; let's get back to the main topic.

To take revenge on someone (often "get back at"):

Example: She wants to get back at her competitor by launching a better product.

Get by
To manage to survive or do something with limited money, knowledge, or resources:

Example: My Spanish isn't perfect, but I know enough to get by.

Example: The budget is tight, but the department will get by.

To physically move past someone:

Example: Excuse me, could you move a little so I can get by?

Get together
To meet socially:

Example: Let's get together for a coffee next week.

To organize your thoughts, life, or things (often "get your act together"):

Example: If he wants a promotion, he needs to get his act together and work harder.

Get with
To understand or adapt to modern trends or new rules (informal):

Example: You need to get with the new management strategy, or you will be left behind.

Get over
To recover from an illness, a shock, or a bad emotional experience:

Example: It took him two weeks to get over the flu.

To overcome a problem or difficulty:

Example: We need to get over this technical issue before the software launches.

To finish something unpleasant so you don't have to worry about it (often "get it over with"):

Example: I hate performance reviews, but let's just do it and get it over with.

Get ahead
To be successful and make progress in your career or life:

Example: She reads a lot of business books because she wants to get ahead in her career.

Get after
To urge, remind, or scold someone to do something they are supposed to do:

Example: I need to get after the developers to finish writing the code.

To chase someone or something:

Example: The dog got after the cat.

Get behind
To fail to do work or pay bills on schedule:

Example: I was sick for a week, and I got behind on my emails.

To support a person, idea, or project:

Example: The whole team got behind the new manager's plan.

Get through
To finish a difficult task or survive a difficult period:

Example: We just need to get through this busy week, and then we can relax.

To make contact by telephone:

Example: I tried to call customer service, but I couldn't get through.

To make someone understand something (often "get through to"):

Example: I've explained the risks, but I just can't get through to him.

Get about / Get around / Get round
(Note: These are very similar and often used interchangeably, though "round" is more common in British English).

To travel to different places:

Example: We used the subway to get around the city.

To find a way to avoid a rule or solve a problem:

Example: The programmers found a clever way to get around the security block.

To spread (usually news or rumors):

Example: Word gets around fast in this office.

To finally do something you have delayed doing (often "get around to"):

Example: I will get around to updating my resume this weekend.

Get to
To arrive at a destination:

Example: What time did you get to the office this morning?

To have the opportunity to do something:

Example: Because of my job, I get to travel all over the world.

To annoy or upset someone:

Example: The constant complaining is really getting to me.

To begin an action (often "get to work"):

Example: The break is over; let's get to work.

---

Do the same as it's for "get out".
---

## 2026-06-05T19:51:54Z
Add tests for new added phrasal verbs
---
