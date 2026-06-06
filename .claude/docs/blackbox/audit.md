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

## 2026-06-05T20:06:06Z
I'd like to be able to copy text on "get" phrasal verb page
---

## 2026-06-05T20:08:52Z
When select/copy text don't extend/collapse the frame
---

## 2026-06-05T20:10:56Z
Add tests for new added phrasal verbs
---

## 2026-06-05T20:11:08Z
Cover the functionality with tests
---

## 2026-06-05T20:18:24Z
git add all changes and commit them with suitable message
---

## 2026-06-05T20:20:24Z
file:///home/eug/Pictures/Screenshots/Screenshot%20from%202026-06-05%2022-20-04.png Fix that
---

## 2026-06-05T20:23:24Z
git add all changes and commit them with suitable message
---

## 2026-06-05T20:32:30Z
on the page "Phrasal Verbs List":
---

## 2026-06-05T20:35:34Z
on the page "Phrasal Verbs List":
- on "get" change "Phrasal verbs formed with "get": get off, get on, get up, and more" to listening all particulars which are on the get page, 
  for example: "off, on, up ...". 
  Listen on 2 lines, if no space just show other by hovering
- Add the capability to copy the "get" words and its particulars
---

## 2026-06-05T20:40:02Z
git add all changes and commit them with suitable message
---

## 2026-06-05T20:48:07Z
copy tests for 'Copy all "get" phrasal verbs' functionality
---

## 2026-06-05T20:50:13Z
Cover with the tests 'Copy all "get" phrasal verbs' functionality.
---

## 2026-06-05T20:57:52Z
phrasal verbs:

Make after
Definition: To chase someone or something.

Example: The security guard made after the shoplifter.

Make away (with)
Definition: To steal something and escape with it.

Example: Hackers made away with thousands of encrypted passwords.

Make for
Definition 1: To move directly towards a place.

Example 1: After the meeting ended, we made for the exit.

Definition 2: To help make something possible or produce a specific result.

Example 2: Clear communication makes for a highly effective management team.

Make into
Definition: To change or transform something into something else.

Example: The developers made the old legacy system into a modern Java application.

Make off (with)
Definition: To leave quickly, especially in order to escape after doing something wrong.

Example: The thieves made off before the police arrived.

Make out
Definition 1: To manage to see, hear, or read something with difficulty.

Example 1: I could not make out the error message on the monitor because the screen was too bright.

Definition 2: To understand someone's character or a situation.

Example 2: He is a very quiet team leader; I cannot quite make him out.

Definition 3: To write all the necessary information on an official document (like a check or invoice).

Example 3: Please make the invoice out to the company's head office.

Definition 4: To claim or pretend that something is true.

Example 4: The software vendor made out that their system was completely bug-free.

Definition 5: To progress, perform, or succeed in a situation.

Example 5: How did you make out with the new project timeline?

Definition 6: (Informal) To kiss and touch romantically.

Example 6: The teenagers were making out in the back of the cinema.

Make over
Definition 1: To change or improve the appearance of someone or something.

Example 1: We made over the entire office space to encourage better collaboration.

Definition 2: To legally transfer ownership of property or money to someone else.

Example 2: The CEO made over his shares to his business partner.

Make up
Definition 1: To invent a story, excuse, or explanation.

Example 1: He made up an excuse for missing the daily stand-up meeting.

Definition 2: To form the whole of something (to constitute).

Example 2: Senior developers make up 40% of our engineering department.

Definition 3: To become friendly again after an argument.

Example 3: The co-founders argued over the budget, but they made up the next day.

Definition 4: To prepare, build, or arrange something from parts.

Example 4: Can you make up a list of requirements for the new software module?

Make up for
Definition: To compensate for something bad, missing, or lost.

Example: We worked late on Friday to make up for the time lost during the server crash.

Make with
Definition: (Slang/Informal) To produce, supply, or give something quickly.

Example: Make with the financial reports, the board is waiting!

---

1) Create "make" link on list page with particals mentioned above phrasal verbs. Take as base "get" link.
2) Create "make" page with mentioned above phrasal verbs. Take as base "get" page.
---

## 2026-06-05T21:12:12Z
git add all changes and commit them with suitable message
---

## 2026-06-05T21:18:45Z
Put off
To delay or postpone:

Example: We have to put off the sprint planning meeting until tomorrow.

To make someone not want to do something or dislike something:

Example: The complex code architecture put me off learning Java at first.

To distract someone:

Example: Please be quiet; your talking is putting me off my work.

Put on
To dress oneself:

Example: I put on my suit for the management interview.

To organize a performance or event:

Example: The company put on a great training event for new developers.

To gain weight:

Example: He put on three kilos during the holidays.

To turn on a machine or appliance:

Example: Could you put the projector on for the presentation?

To pretend to have a feeling or attitude:

Example: She isn't really angry; she's just putting it on.

Put up
To build or erect something:

Example: They put up a new office building in Warsaw.

To increase prices or rates:

Example: The software provider put up their subscription fees.

To provide accommodation for someone:

Example: I can put you up at my apartment while you are visiting for the conference.

To offer resistance or fight:

Example: The competitor put up a strong fight for the market share.

Put down
To write something:

Example: Let me put down your contact details.

To criticize or humiliate someone:

Example: A good leader never puts down their team members.

To pay a deposit:

Example: We put down a 10% deposit for the new office space.

To suppress a rebellion by force:

Example: The government quickly put down the protests.

To euthanize an animal:

Example: The vet had to put down the sick dog.

(Put down to) To attribute a cause to something:

Example: I put the project's success down to excellent teamwork.

Put in
To spend time or effort on something:

Example: The development team put in 50 hours a week to finish the Java update.

To install an appliance or system:

Example: We are putting in a new server system today.

To officially submit a request or document:

Example: I put in a request for more holiday time.

To interrupt a conversation:

Example: "I think we should test the code first," the junior developer put in.

Put into
To invest time, money, or effort into a project:

Example: The company put a lot of money into research and development.

To express something in words:

Example: It is hard to put this complex business strategy into simple words.

Put out
To extinguish a fire or a cigarette:

Example: The fire alarm rang, but they quickly put out the small fire.

To publish or release something:

Example: The team put out a new version of the app last night.

To inconvenience someone:

Example: I hope it doesn't put you out if we move the meeting to 5 PM.

To place something outside (like trash):

Example: Don't forget to put out the recycling bins.

Put away
To store things in their correct place:

Example: Please put away those files when you finish reading them.

To save money for the future:

Example: She puts away a portion of her salary every month for retirement.

To send someone to prison or a mental hospital (informal):

Example: The judge put him away for ten years for fraud.

To eat or drink a large amount:

Example: He can really put away a lot of coffee during a coding session.

Put across / Put over
To explain an idea clearly so people understand it:

Example: The CEO put his vision across very well during the meeting. (Or: put over).

Put forward
To suggest an idea, plan, or person for consideration:

Example: The manager put forward a new agile framework for the team.

To change a clock to a later time:

Example: Don't forget to put your clocks forward in the spring.

Put back
To return something to its original place:

Example: Please put the laptop back in the cabinet.

To delay an event:

Example: The product launch was put back to November.

To change a clock to an earlier time:

Example: We put the clocks back one hour in the autumn.

Put by
To save money for the future (similar to put away):

Example: I try to put by some money each month for a new computer.

Put together
To assemble the parts of something:

Example: We need to put together the new office furniture.

To organize or create a group or plan:

Example: The HR director put together an excellent leadership training program.

Put with
(Put up with) To tolerate or accept a difficult situation without complaining:

Example: As a project manager, you have to put up with unexpected delays.
(Note: "Put with" alone is not a phrasal verb, it always takes "up" first).

Put ahead
To give someone an advantage:

Example: Learning Java will really put you ahead in the job market.

Put behind
To forget about a bad experience and move on:

Example: We lost a big client, but we need to put it behind us and focus on the future.

Put through
To connect someone on the telephone:

Example: Please hold the line, I will put you through to the IT department.

To make someone experience something very difficult:

Example: The tough interview process really put the candidates through a lot of stress.

To successfully complete a business transaction or law:

Example: We finally managed to put the deal through.

Put about / Put around / Put round
To spread a rumor or false story:

Example: Someone is putting it about that the company is going bankrupt.

Put to
To suggest an idea or a question to someone directly:

Example: I put it to the board of directors, but they rejected the idea.

To cause trouble or expense:

Example: Moving the server room put us to a lot of trouble.

---

1) Create "put" link on list page with particals mentioned above phrasal verbs. Take as base "get" link.
2) Create "put" page with mentioned above phrasal verbs. Take as base "get" page.
---

## 2026-06-06T06:21:59Z
For listed phrasal verbs with default.png image delete img tag with that pic and don't show that, but on click to frame just extend/collapse the phrasal verb content.
Consider test they must be passed.
---

## 2026-06-06T06:30:44Z
For all listed phrasal verbs pages (like "get", "put", etc) create template and use that buy substitution the current.
It will be use for preventing code duplicating.
---

## 2026-06-06T06:41:05Z
Also for all listed phrasal verbs pages (like "get", "put", etc) create test template and use that buy substitution the current ones.
It will be use for preventing code duplicating.
---

## 2026-06-06T07:29:57Z
Also for all listed phrasal verbs pages create tests template and use that buy substitution the current ones in folders: @src/__tests__/make_verb_page, @src/__tests__/get_verb_page/ @src/__tests__/put_verb_page/.
It will be use for preventing code duplicating.
Use changes in current `git status`.
---

## 2026-06-06T07:39:54Z
git add all changes and commit them with suitable message
---

## 2026-06-06T07:47:12Z
For listed phrasal verbs with default.png don't donwload and show that image and even <img>, but on click to frame just extend/collapse the phrasal verb content.
Cover the functionality with tests.
---

## 2026-06-06T08:19:52Z
git add all changes and commit them with suitable message
---

## 2026-06-06T08:25:25Z
Take off
Remove (clothing): "Please take off your shoes inside the house."

Leave the ground (planes): "The flight will take off in ten minutes."

Become successful quickly (business/ideas): "Her new software company really took off this year."

Leave suddenly (informal): "He took off before the meeting ended."

Not go to work: "I need to take a few days off to rest."

Take on
Accept work or responsibility: "I cannot take on any new projects right now."

Hire someone: "The company is taking on fifty new developers."

Compete against: "Our team will take on the market leader next year."

Take up
Start a new activity or hobby: "He took up golf to relax after work."

Occupy time or space: "These large files take up too much space on the server."

Accept an offer: "I will take you up on that job offer."

Shorten clothes: "I need to take up these trousers; they are too long."

Take down
Write notes: "Please take down the main points of the presentation."

Remove from a high place or dismantle: "We need to take down the old website."

Defeat or humiliate: "The journalist's report took down the corrupt manager."

Take in
Understand and remember information: "The technical manual was very hard to take in."

Provide shelter: "She took in a dog from the street."

Deceive or trick (usually passive): "Many people were taken in by the email scam."

Make clothes smaller: "I lost weight, so I had to take in my suits."

Take into
Mainly used in the idiom: Take into account / consideration (consider): "We must take the budget into account before making a decision."

Take out
Remove something: "Please take the trash out."

Invite someone somewhere and pay: "I would like to take you out for dinner."

Obtain an official service (loan/insurance): "The business took out a large bank loan."

Destroy or kill (informal): "The virus took out the entire IT system."

Special phrase: Take it out on someone (treat someone badly because you are angry): "I know you are stressed, but do not take it out on your team."

Take away
Remove or subtract: "If you take away the marketing costs, the profit is high."

Confiscate (take without permission): "The teacher took away his mobile phone."

Buy food to eat elsewhere: "We bought a pizza to take away."

Learn a main message (Noun: a takeaway): "What did you take away from that leadership seminar?"

Take cross / across
Literal use only: To physically guide someone or something across a space. "She took the blind man across the street."

Take forward
Develop or progress a plan: "We need a new manager to take this project forward."

Take back
Return something you bought: "The laptop was broken, so I took it back to the store."

Admit you said something wrong: "I take back what I said; you were right."

Make someone remember the past: "Hearing that old song takes me back to my university days."

Accept someone back into a relationship or job: "The company took him back after he finished his studies."

Take for
Mistake someone's identity or character: "Do you take me for a fool?"

Special phrase: Take for granted (fail to appreciate): "A good leader never takes their employees for granted."

Take by
Mainly used in idioms:

Take by surprise (happen unexpectedly): "The sudden market crash took us by surprise."

Take by storm (become very successful quickly): "The new app took the world by storm."

Take together
Consider as a group: "Taken together, these three software modules form a powerful system."

Take with
Be attracted to or impressed by (usually passive): "I was very taken with his presentation on Agile management."

Take without
Literal use only: To physically take an item without something else. "I will take the coffee without sugar."

Take apart
Separate into pieces (dismantle): "The engineer took the machine apart to fix it."

Criticize heavily or defeat easily: "The director took my business plan apart."

Take over
Gain control of a company or situation: "A larger corporation wants to take over our business."

Replace someone in a task: "I am tired. Can you take over driving?"

Take ahead
Literal use only: To physically carry something to the front. No standard phrasal verb.

Take after
Look or behave like an older family member: "She takes after her father; they both love mathematics."

Take behind
Literal use only: To physically move something to the back. No standard phrasal verb.

Take through
Explain a process step-by-step: "Let me take you through the new software setup."

Take about
Literal use only: To require a certain amount of time/effort. "It will take about two hours."

Take around / round
Show someone a place: "Welcome to the headquarters. I will take you around."

Take to
Start liking someone or something quickly: "The team took to the new manager immediately."

Start a new habit (often negative): "Because of stress, he took to drinking coffee late at night."

Take against
Start disliking someone without a clear reason: "I do not know why, but she took against me from my first day in the office."

---

1) Create "take" link on list page with particals mentioned above phrasal verbs. 
   Take as the base "get" link.
2) Create "take" page with mentioned above phrasal verbs. 
   Take as the base "get" page.
3) Cover the functionality with tests
---

## 2026-06-06T08:39:44Z
completed?
---

## 2026-06-06T08:40:38Z
git add all changes and commit them with suitable message
---

## 2026-06-06T12:19:44Z
Add images for the phrasal verbs brought up:

Take off

Remove (clothing): "Please take off your shoes inside the house."
/home/eug/Downloads/Done pics/take/off/take off - Remove (clothing).png

Leave the ground (planes): "The flight will take off in ten minutes."
/home/eug/Downloads/Done pics/take/off/take off - Leave the ground (planes).png

Become successful quickly (business/ideas): "Her new software company really took off this year."
/home/eug/Downloads/Done pics/take/off/take off - Become successful quickly (business, ideas).png

Leave suddenly (informal): "He took off before the meeting ended."
/home/eug/Downloads/Done pics/take/off/Leave suddenly (informal).png

Not go to work: "I need to take a few days off to rest."
/home/eug/Downloads/Done pics/take/off/take off - Not go to work.png
---

## 2026-06-06T12:20:14Z
Add images for the phrasal verbs brought up:

Take off

Remove (clothing): "Please take off your shoes inside the house."
/home/eug/Downloads/Done pics/take/off/take off - Remove (clothing).png

Leave the ground (planes): "The flight will take off in ten minutes."
/home/eug/Downloads/Done pics/take/off/take off - Leave the ground (planes).png

Become successful quickly (business/ideas): "Her new software company really took off this year."
/home/eug/Downloads/Done pics/take/off/take off - Become successful quickly (business, ideas).png

Leave suddenly (informal): "He took off before the meeting ended."
/home/eug/Downloads/Done pics/take/off/Leave suddenly (informal).png

Not go to work: "I need to take a few days off to rest."
/home/eug/Downloads/Done pics/take/off/take off - Not go to work.png


Cover the changes with tests
---

## 2026-06-06T12:46:47Z
Add images for the phrasal verbs brought up:

Take off

Remove (clothing): "Please take off your shoes inside the house."
/home/eug/Downloads/Done pics/take/off/take off - Remove (clothing).png

Leave the ground (planes): "The flight will take off in ten minutes."
/home/eug/Downloads/Done pics/take/off/take off - Leave the ground (planes).png

Become successful quickly (business/ideas): "Her new software company really took off this year."
/home/eug/Downloads/Done pics/take/off/take off - Become successful quickly (business, ideas).png

Leave suddenly (informal): "He took off before the meeting ended."
/home/eug/Downloads/Done pics/take/off/Leave suddenly (informal).png

Not go to work: "I need to take a few days off to rest."
/home/eug/Downloads/Done pics/take/off/take off - Not go to work.png

As an example see how it's done for example in "Get off" with image.

Cover the changes with tests
---

## 2026-06-06T13:02:43Z
git add all changes and commit them with suitable message
---

## 2026-06-06T13:05:22Z
Add images for the phrasal verbs brought up:
---
Take on

Accept work or responsibility: "I cannot take on any new projects right now."
/home/eug/Downloads/Done pics/take/on/take on - Accept work or responsibility.png

Hire someone: "The company is taking on fifty new developers."
/home/eug/Downloads/Done pics/take/on/take on - Hire someone.png

Compete against: "Our team will take on the market leader next year."
/home/eug/Downloads/Done pics/take/on/take on - Compete against.png
---
As an example see how it's done for example in "Get off" with image.
Cover the changes with tests.
---

## 2026-06-06T13:20:13Z
Add images for the phrasal verbs brought up:
---
Take up

Start a new activity or hobby: "He took up golf to relax after work."
/home/eug/Downloads/Done pics/take/up/take up - Start a new activity or hobby.png

Occupy time or space: "These large files take up too much space on the server."
/home/eug/Downloads/Done pics/take/up/take up - Occupy time or space.png

Accept an offer: "I will take you up on that job offer."
/home/eug/Downloads/Done pics/take/up/take up - Accept an offer.png

Shorten clothes: "I need to take up these trousers; they are too long."
/home/eug/Downloads/Done pics/take/up/take up - Shorten clothes.png
---
As an example see how it's done for example in "Get off" with image.
Cover the changes with tests.
---

## 2026-06-06T13:31:39Z
When click on any listed phrasal verb the distance between lines of definition and example increased a little, 
frame of the phrasal verb content also becomes higher and lines of defintion and example becomes closer to the up and down border.
Make that stop shifting.
screan before click: file:///home/eug/Pictures/Screenshots/Screenshot%20from%202026-06-06%2015-28-54.png
screnn after click: file:///home/eug/Pictures/Screenshots/Screenshot%20from%202026-06-06%2015-29-13.png
---

## 2026-06-06T13:39:51Z
Cover the functionality with tests
---

## 2026-06-06T13:44:20Z
git add all changes and commit them with suitable message
---

## 2026-06-06T13:46:23Z
git add all changes and commit them with suitable message
---
