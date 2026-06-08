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

## 2026-06-06T13:55:47Z
1. Give away
To provide something for free (as a gift or promotion).

Example: The software company is giving away free trials to new users.

To reveal a secret or hidden information.

Example: Please don't give away our negotiation strategy to the competitors.

To betray someone or accidentally show their true identity/feelings.

Example: He tried to hide his frustration, but his tone of voice gave him away.

To formally hand over a bride at a wedding.

Example: Her father gave her away at the ceremony.

2. Give back
To return something to its original owner.

Example: You must give back the company laptop when you leave the job.

To contribute to society or a community after achieving success.

Example: The successful manager likes to give back by mentoring junior developers.

3. Give in
To finally agree to what someone wants after initially refusing (yield/surrender).

Example: Management finally gave in to the workers' demands for flexible hours.

To hand over or submit a document (mainly British English).

Example: Please give in your project reports by Friday afternoon.

4. Give in to / Give into
To stop resisting a feeling, desire, or pressure.

Example: The company gave in to market pressure and lowered its prices.

5. Give off
To produce or emit something physical (like heat, light, a smell) or an invisible feeling (a vibe/energy).

Example: The server room gives off a lot of heat.

Example: The new team leader gives off a very confident energy.

6. Give on / Give onto
To open in the direction of, or provide a view of (used for doors, windows, or rooms).

Example: The CEO’s office has large windows that give onto the city skyline.

7. Give out
To distribute something to a group of people.

Example: They were giving out informational flyers at the business conference.

To stop working or fail completely (used for machines, supplies, or body parts).

Example: We couldn't finish the presentation because the projector's lamp gave out.

To make information public.

Example: The HR department will give out the details of the new health plan tomorrow.

8. Give over
To hand over control, responsibility, or possession of something.

Example: The founder gave over control of the daily operations to the new CEO.

To dedicate time or space to a specific purpose (usually passive: be given over to).

Example: The afternoon meeting was given over to brainstorming new Java applications.

To stop doing something annoying (mainly British informal).

Example: Oh, give over! Stop complaining about the minor bugs in the code.

9. Give up
To stop trying to do something or accept defeat (surrender).

Example: The coding problem was incredibly difficult, but the developer didn't give up.

To stop doing a regular habit.

Example: I decided to give up drinking coffee late in the afternoon.

To part with something valuable or give away your time.

Example: We had to give up our weekend to finish the software release on time.

To surrender yourself to the authorities.

Example: The hacker finally gave himself up to the police.

10. Give (it) up for
To applaud or clap for someone (used to welcome a speaker or performer).

Example: Let's give it up for our keynote speaker!

11. Give with
To provide or tell information (Informal/Slang).

Example: Come on, give with the details! What happened during the board meeting?

---

1) Create "take" link on list page with particals mentioned above phrasal verbs. 
   Take as the base "get" link.
2) Create "take" page with mentioned above phrasal verbs. 
   Take as the base "get" page.
3) Cover the functionality with tests
---

## 2026-06-06T14:14:44Z
git add all changes and commit them with suitable message
---

## 2026-06-06T14:20:37Z
Analyze and show me new relase tag with description and step how to create it.
---

## 2026-06-06T14:24:30Z
run step 2
---

## 2026-06-06T14:24:45Z
run step 3
---

## 2026-06-06T14:36:59Z
For any listed phrasal verb image download that image only on first click on it, not when the page is downloaded.
---

## 2026-06-06T14:52:57Z
When I refresh page, I'm in a listed phrasal verbs. does the image of the fragile group or a downloaded or it's... it is taken from the local cache or the browser computer.
---

## 2026-06-06T14:53:03Z
When I refresh page, I'm in a listed phrasal verbs. does the image of the fragile group or a downloaded or it's... it is taken from the local cache or the browser computer?
---

## 2026-06-06T14:56:25Z
Go off
To explode or fire (a weapon): The bomb went off in the city center.

To make a sudden loud noise (an alarm): My morning alarm went off at 6:00 AM.

To stop working or power down: The lights went off during the storm.

To spoil or go bad (food): This milk smells like it has gone off.

To happen in a specific way: The software presentation went off without any problems.

To stop liking someone or something: I used to love Java, but I’ve gone off it recently.

To leave a place: The manager went off to a meeting.

Go on
To continue: Please go on with your code explanation; I am listening.

To happen: What is going on in the server room?

To start operating (power, lights): The backup generator went on automatically.

To talk too much about something: He goes on and on about his leadership skills.

To proceed to do something next: After fixing the bug, she went on to optimize the database.

To base an opinion on something: We don't have much data to go on.

Go up
To increase or rise: Software licensing prices have gone up this year.

To be built or constructed: New office buildings are going up in the business district.

To explode or catch fire: The old factory went up in flames.

Go down
To decrease or fall: Our server error rates went down last month.

To stop working (computers/systems): The entire network went down for two hours.

To be remembered in a certain way: He will go down in history as a great CEO.

To be received by an audience: The new management policy did not go down well with the team.

To set (the sun): We finished work just as the sun was going down.

Go in
To enter a place: The door is open, so you can go in.

To be understood or remembered: The complex instructions just didn't go in.

To become hidden (the sun): It suddenly got cold when the sun went in behind a cloud.

Go into
To discuss or explain in detail: Let’s not go into the budget problems right now.

To enter a specific profession or business: She decided to go into project management.

To crash or collide with: The car lost control and went into a tree.

To enter a specific state or condition: The company went into liquidation.

Go out
To leave home for a social event: We are going out for dinner to celebrate the launch.

To stop burning or shining (fire/lights): The fire went out because we forgot to add wood.

To be published, broadcast, or sent: The team email went out yesterday.

To become unfashionable: That style of UI design went out years ago.

To have a romantic relationship: They have been going out for two years.

Go away
To leave a place or person: Please go away, I need to focus on my work.

To disappear or fade: The error message went away when I restarted the application.

To leave home for a holiday: We are going away to the mountains for the weekend.

Go cross / across
To move to the other side: We need to go across the street to reach the client's office.

(Note: "go across" is highly literal; "come across" or "get across" are more common idiomatically).

Go forward
To progress or advance: We are going forward with the new business strategy.

To move clocks ahead: The clocks go forward in the spring.

Go back
To return to a place or state: I need to go back to the office; I forgot my laptop.

To have existed since a specific time: This legacy code goes back to 2010.

To break a promise (go back on): The vendor went back on their promise to deliver the software today.

Go for
To choose or select: I will go for the standard Java framework instead of the experimental one.

To try to achieve something: If you want that promotion, you should go for it!

To attack someone physically or verbally: The dog suddenly went for the mailman.

To apply equally to someone else: The rules are strict, and that goes for managers, too.

Go by
To pass (time): As the years went by, the technology improved significantly.

To base a decision on something or follow rules: If we go by the manual, this should take two hours.

To be known by a specific name: His name is Robert, but he goes by Bob.

Go together
To look or sound good in combination: The new logo and the brand colors go together perfectly.

To frequently accompany each other: High risk and high reward usually go together in business.

Go with
To match or suit something: That font doesn't go with the website's professional design.

To choose or accept an idea/offer: We decided to go with the second marketing proposal.

To accompany someone: I’m going to the conference; do you want to go with me?

Go without
To manage or live without something you usually have: The budget is tight, so we will have to go without the extra monitors this year.

Go apart
(Note: "Go apart" is not a standard English phrasal verb. The correct verbs for this concept are "fall apart" [to break into pieces or fail] or "grow apart" [to slowly stop having a close relationship]).

Go over
To review, check, or examine something carefully: Let's go over the project requirements one more time.

To move toward someone or something: I will go over to the IT department to ask for help.

To be received in a specific way: His joke didn't go over very well during the serious meeting.

Go ahead
To start or proceed with an action: We have the budget, so we can go ahead with the development.

To move in front of someone: You go ahead, I will catch up with you in a minute.

Go after
To try to catch or stop someone: The police went after the thief.

To try to achieve or get something (like a job or goal): She is going after a leadership role in the company.

Go behind
To go to the back of something: The cat went behind the sofa.

To do something secretly without someone's permission (go behind someone's back): He went behind the manager's back and changed the server configurations.

Go through
To experience a difficult situation: The company went through a tough financial period last year.

To search or examine carefully: I need to go through my emails to find the invoice.

To be officially approved or completed: The merger finally went through yesterday.

To use up a supply of something: We go through a lot of coffee in the developers' room.

To practice or rehearse: Let's go through the presentation one more time.

Go about
To begin to tackle a task or problem: I don't know how to go about fixing this complex bug.

To behave or do things in a normal way: Despite the bad news, they went about their daily work.

Go around / round
To circulate or spread (illness or news): There is a rumor going around about a new software release.

To be enough for everyone to have a share: Are there enough printed reports to go around?

To visit someone at their location: I'll go around to his desk later to discuss the code.

To spin or rotate: The wheels go around.

Go to
To start a specific action or state: After 12 hours of coding, I finally went to sleep.

To be given or assigned to: All the extra project funds will go to the marketing team.

(Note: While mostly a standard verb + preposition, in phrases like "go to war" or "go to pieces," it functions as a set expression).

Go against
To oppose or disagree with: Implementing this feature goes against our main design principles.

To be unfavorable to someone (especially in sports or legal cases): The final verdict went against the company.

---

1) Create "take" link on list page with particals mentioned above phrasal verbs. 
   Take as the base "get" link.
2) Create "take" page with mentioned above phrasal verbs. 
   Take as the base "get" page.
3) Cover the functionality with tests
---

## 2026-06-06T15:45:52Z
git add all changes and commit them with suitable message
---

## 2026-06-06T15:59:03Z
Come about
Definition: To happen or occur, especially in a way that is not planned.

Example: "How did this bug in the Java code come about?"

Come across
Definition 1: To find or meet something or someone by chance.

Example: "I came across an excellent article on Agile leadership yesterday."

Definition 2: To give a specific impression to others.

Example: "She comes across as a very confident and capable manager."

Come after
Definition 1: To chase or pursue someone (often to punish them or take something).

Example: "If we break the NDA, the client’s legal team will come after us."

Definition 2: To follow in time or order.

Example: "Phase two of the project comes after the initial testing."

Come against
(Note: Almost always used with "up" as come up against)

Definition: To face a difficult problem or strong opposition.

Example: "We came up against several security issues during deployment."

Come ahead
(Often used as come out ahead)

Definition: To finish in a winning, profitable, or advantageous position.

Example: "Despite the economic crisis, our company came out ahead of the competition."

Come apart
Definition: To break into pieces or fail completely.

Example: "The legacy system is so old that its architecture is starting to come apart."

Come around / Come round
Definition 1: To change your opinion to agree with someone else.

Example: "He didn't like the new Java framework at first, but he came around after seeing the performance tests."

Definition 2: To visit someone at their home or desk.

Example: "The CEO is coming around to our department later this afternoon."

Definition 3: To regain consciousness (wake up after fainting).

Example: "He fainted from the heat, but he came round quickly."

Come away
Definition 1: To leave a place or situation with a specific feeling, idea, or result.

Example: "I came away from the strategy meeting feeling very optimistic about Q3."

Definition 2: To separate or detach from something.

Example: "The back cover of the laptop just came away in my hands."

Come back
Definition 1: To return to a place, state, or topic.

Example: "Let's come back to the budget discussion after lunch."

Definition 2: To become popular or fashionable again.

Example: "Older, hierarchical management styles are not likely to come back."

Come behind
Definition: To follow closely or to rank lower than something else in a list.

Example: "In the market share report, our main product comes behind theirs."

Come by
Definition 1: To get or obtain something, especially something that is rare or hard to find.

Example: "Experienced Senior Java Developers are hard to come by these days."

Definition 2: To make a short, casual visit.

Example: "Please come by my office when you have a moment."

Come down
Definition 1: To fall or decrease (prices, levels, etc.).

Example: "Our cloud hosting costs have finally come down this month."

Definition 2: To make a firm decision or support a specific side (come down on the side of).

Example: "The leadership team came down on the side of investing in AI."

Come for
Definition: To arrive in order to collect someone or something.

Example: "The courier will come for the signed contracts at 3:00 PM."

Come forward
Definition: To offer help, information, or take responsibility.

Example: "We need two volunteers to come forward and lead the new internal project."

Come in
Definition 1: To enter a room or building.

Example: "Please come in and take a seat."

Definition 2: To become relevant or involved in a situation (where do I come in?).

Example: "The backend is finished, so this is where the frontend team comes in."

Definition 3: To arrive (news, money, results).

Example: "The Q2 revenue reports just came in."

Come into
Definition 1: To inherit money or property.

Example: "He came into a lot of money and started his own software firm."

Definition 2: To become a factor or take effect.

Example: "When designing this application, data privacy regulations must come into play."

Come off
Definition 1: To happen successfully or go exactly as planned.

Example: "The software launch came off without a single major bug."

Definition 2: To detach or be removed from something.

Example: "The label came off the server box, so we don't know the serial number."

Come on
Definition 1: To start functioning (machines, systems, lights).

Example: "When the power failed, the backup servers came on automatically."

Definition 2: To make progress or improve.

Example: "The junior developer’s coding skills are really coming on."

Definition 3: Used to encourage someone to hurry up, try harder, or stop being unreasonable.

Example: "Come on, we can finish this sprint today if we focus!"

Come out
Definition 1: To be published, released, or made available to the public.

Example: "The next version of the Java Development Kit comes out next month."

Definition 2: To become known (often secrets or truth).

Example: "It eventually came out that the project was severely underfunded."

Definition 3: To be removed (like a stain).

Example: "The coffee stain won't come out of the carpet."

Come over
Definition 1: To visit someone's house, office, or country.

Example: "The regional manager is coming over from London next week."

Definition 2: To affect someone suddenly with a strong feeling.

Example: "A sudden wave of panic came over him before his presentation to the board."

Come through
Definition 1: To successfully complete or survive a difficult situation.

Example: "Thanks to strong leadership, the company came through the financial crisis."

Definition 2: To deliver what was promised or expected.

Example: "The engineering team came through with the bug fix right before the deadline."

Definition 3: To be approved or to arrive (official documents, messages).

Example: "My visa approval finally came through."

Come to
Definition 1: To reach a total amount.

Example: "The total cost for the new software licenses comes to $15,000."

Definition 2: To reach a state, decision, or situation.

Example: "After hours of negotiation, we finally came to an agreement."

Definition 3: To regain consciousness.

Example: "When he came to in the hospital, he asked for his laptop."

Definition 4: Concerning a specific topic (when it comes to).

Example: "When it comes to team management, communication is the most important skill."

Come together
Definition 1: To unite as a group for a common purpose.

Example: "The entire IT department came together to resolve the server outage."

Definition 2: To begin to form a coherent, successful whole.

Example: "After weeks of messy coding, the final application is finally coming together."

Come up
Definition 1: To be mentioned or discussed in conversation.

Example: "The topic of remote work came up during the board meeting."

Definition 2: To happen unexpectedly (often causing a problem).

Example: "I have to cancel our 1-on-1 meeting; something urgent has come up."

Definition 3: To approach in time.

Example: "We need to prepare; the final project deadline is coming up fast."

Come with
Definition: To be included as part of a product, package, or deal.

Example: "The enterprise software license comes with 24/7 technical support."

Come without
(Often used purely as the verb "come" + the preposition "without")

Definition: To lack a feature or item that is normally included.

Example: "The basic version of the app comes without the advanced analytics dashboard."

---

1) Create "take" link on list page with particals mentioned above phrasal verbs. 
   Take as the base "get" link.
2) Create "take" page with mentioned above phrasal verbs. 
   Take as the base "get" page.
3) Cover the functionality with tests
---

## 2026-06-06T17:18:10Z
Analyze and show me new relase tag with description and step how to create it.
---

## 2026-06-07T12:18:39Z
off    "indicates breaking contact between two 
things, moving away from a surface, or stopping a process."
on    "the exact opposite of ""off."" It indicates attachment, 
continuation, activation, or starting a process."
up    "indicates completion, improvement, increase, creation, or 
physical upward movement"
down    "indicates reduction, lowering, stopping, restriction, or 
completing something on paper"
in    "indicates inclusion, entry, penetration, submission, or 
movement toward the interior of a space, system, or group"
into    transformation, deep entry, intense investigation, or crash involvemen
out    "indicates exclusion, exit, extension, public release, 
fading away, or doing something completely to the very end"
away    "indicates continuous action, complete disappearance, 
moving to a safe distance, or giving things to others freely"
cross / across    "indicates movement from one side to another, 
intersecting paths, or clear communication that bridges a gap"
forward    "indicates advancement, progression toward the future, 
anticipation, or sending something onward to a next stage or recipient"
back    return, retreat, retaliation, or looking at the past
for    "indicates purpose, substitution, destination, representation, or seeking
a specific target. It answers the question ""why"" or ""what is the goal."""
by    "proximity (passing near something), survival (managing with limited 
resources), brief visits, or passive adherence to rules"
together    "unification, connection, collaboration, organization, or combining 
individual parts into a single whole"
with    "indicates accompaniment, agreement, handling a situation, sharing 
an emotion, or possessing a specific trait"
without    "indicates deprivation, managing a lack of something, 
skipping an action, or excluding an item"
apart    "indicates separation, disintegration, division, or breaking into smaller 
pieces"
over    "indicates repetition, transition across a boundary, visual inspection, 
falling, or complete control and dominance"
ahead    "indicates future planning, moving forward in time or space, 
or gaining an advantage and being successful"
after    indicates pursuit, caretaking, imitation, or tracking a timeline
behind    "indicates falling back in progress, leaving something at 
a previous location, supporting someone, or hidden motives"
through    "indicates completion from beginning to end, endurance during 
a difficult time, penetration across a barrier, or deep inspection"
about    "indicates aimless movement, proximity, a shift in direction, 
or a topic of focus"
around / round    "circular motion, casual or aimless activity, bypassing an obstacle, 
changing your mind, or spreading to many people"
to    "direction, alignment, attachment, awakening, or a direct response 
to a person or thing"
against    "opposition, physical contact or leaning, comparison, or preparation 
for an upcoming problem"
along    "indicate either forward movement/progress, accompaniment, 
or agreement."

---

1) Create "Particles" link on list page with particals mentioned above phrasal verbs.
   Place it at the top of Phrasal Verbs List page and add tiny line below.     
2) Create "Particles" page with mentioned above descriptons.    
3) Cover the functionality with tests
---

## 2026-06-07T12:28:48Z
The tiny line on List page after Particles should be changed based on thema (dark/light) the same way it's done for any phrasal verb line separatord.
---

## 2026-06-07T12:30:31Z
Cover this functionality with tests
---

## 2026-06-07T12:32:05Z
git add all changes and commit them with suitable message
---

## 2026-06-07T12:34:46Z
Analyze and show me new relase tag with description and step how to create it.
---

## 2026-06-07T12:36:59Z
run steps: 1, 2, 3, 4
---

## 2026-06-07T17:22:13Z
- Change "Test most popular" to "Quiz most popular" on "/phrasal-verbs" page
- Change "Phrasal Verbs" to "Quiz Phrasal Verbs" on "/phrasal-verbs/test-most-popular" page
---

## 2026-06-07T17:29:08Z
git add all changes and commit them with suitable message
---

## 2026-06-07T17:32:00Z
On "phrasal-verbs/list" page add search by functionality as it's done on "phrasal-verbs/test-most-popular" for "Search phrasal verbs" functionality.
- So when bagen to enter it's searching by all phrasal verbs from the "Phrasal Verbs List" matches
- If choose move to the page of the phrasal verb and open the toggle list of that phrasal verbs
  and scrolling to that (focusing)
---

## 2026-06-07T17:48:24Z
git add all changes and commit them with suitable message
---

## 2026-06-07T17:53:49Z
Make the search button of Phrasal Verbs Lists the same look as it's for Quiz Phrasal Verbs "Search phrasal verbs". 
And this search button on the right edge of the boundary
---

## 2026-06-07T17:57:06Z
It should be place where it was but shifted to the left border
---

## 2026-06-07T18:00:12Z
All good just move it to the right border.
---

## 2026-06-07T18:01:14Z
git add all changes and commit them with suitable message
---

## 2026-06-07T18:03:25Z
On Phrasal Verbs List Search you should search by all existing listed phrasal verbs meaning and examples
---

## 2026-06-07T18:08:47Z
I didn't give you permission to commit, where did you get them?
---

## 2026-06-07T18:09:44Z
did you have that permission in some file settings?
---

## 2026-06-07T18:17:06Z
- When I search on Phrasal Verbs List Search you show only on definition, for example for "get off":
  file:///home/eug/Pictures/Screenshots/Screenshot%20from%202026-06-07%2020-13-33.png
  but you should show on "get off" definition.
  Also you have to search matches by all existing listed phrasal verbs definitions and its examples
---

## 2026-06-07T18:24:43Z
but you should in search phrasal verb definitions not in scope, by one for each search row.
Also show its example below.
---

## 2026-06-07T18:38:38Z
git add all changes and commit them with suitable message
---

## 2026-06-07T18:41:26Z
Analyze and show me new relase tag with description and step how to create it.
---

## 2026-06-07T18:43:32Z
run steps: 2, 3 but previously change v0.3.2 to v0.4.0
---

## 2026-06-07T18:43:57Z
run steps: 4
---

## 2026-06-07T18:52:30Z
After release on incognito page I see: file:///home/eug/Pictures/Screenshots/Screenshot%20from%202026-06-07%2020-50-21.png,
But on browser without incognito I see old release (I've even cleaned cookies): file:///home/eug/Pictures/Screenshots/Screenshot%20from%202026-06-07%2020-51-41.png
---

## 2026-06-07T22:05:25Z
on the Phrasal Verbs List page show only base verb, for example "Get", "Put", and on click incread/decrease size to show/hide particles. 
Save state of showing/hiding.
---

## 2026-06-07T22:28:39Z
Analyze and show me new relase tag with description and step how to create it.
---

## 2026-06-07T22:29:08Z
run steps: 2-4
---

## 2026-06-08T14:22:26Z
Act on (or Act upon)
Meaning 1: To take action because of information, advice, or instructions.

Example: The manager decided to act on the feedback she received from the team.

Example: The police are acting on an anonymous tip to solve the case.

Meaning 2: To have an effect on something (often used in medicine or science).

Example: This type of medication acts on the nervous system to reduce pain.

Act up
Meaning 1: To misbehave or cause trouble (usually referring to children).

Example: The children were bored, so they started acting up in the classroom.

Meaning 2: To malfunction, stop working properly, or cause physical pain (referring to machines or body parts).

Example: My old laptop is acting up again; the screen keeps freezing.

Example: John's knee always acts up when the weather gets cold.

Act out
Meaning 1: To perform a story, scene, or situation using actions and words.

Example: During the workshop, the developers acted out the user's journey to understand the software requirements better.

Meaning 2: To express negative emotions or stress through disruptive or bad behavior, often because the person cannot talk about their feelings.

Example: The teenager was acting out at school because of his parents' divorce.

Act for
Meaning 1: To represent someone else or do something on their behalf (especially in legal or business situations).

Example: The lawyer was hired to act for the CEO during the contract negotiations.

Act against
Meaning 1: To do something that opposes, harms, or violates a person, rule, or interest.

Example: By sharing confidential data, the employee acted against the company's core policies.

---

1) Create "take" link on list page with particals mentioned above phrasal verbs. 
   Take as the base "get" link.
2) Create "take" page with mentioned above phrasal verbs. 
   Take as the base "get" page.
3) Cover the functionality with tests
---

## 2026-06-08T14:40:40Z
for the phrasal verb picture do the same logic as for "take" phrasal verb
---

## 2026-06-08T16:11:35Z
git add all changes and commit them with suitable message
---

## 2026-06-08T16:16:05Z
Cut off
To remove something by cutting: "He cut off the tags from his new shirt."

To interrupt someone speaking: "She cut me off mid-sentence to correct a date."

To stop providing a service or supply: "The electric company cut off our power because of an unpaid bill."

To isolate or block access to a place: "The heavy snowstorm cut off the mountain village from the main road."

To block another vehicle's path aggressively: "A white van cut me off on the highway, forcing me to brake hard."

To disinherit or stop giving someone money: "His wealthy parents finally cut him off."

Cut on
To turn on a device or switch (Regional/Southern US): "Can you cut on the lights? It's getting dark in here." (Note: In most dialects, "turn on" is standard).

Cut up
To chop into small pieces: "Could you cut up the carrots for the stew?"

To act silly or cause a playful disruption (Informal): "The students were cutting up in the back of the classroom."

To deeply upset someone emotionally (often passive): "He was really cut up about failing his certification exam."

To severely criticize: "The reviewers absolutely cut the new software release up."

To drive aggressively across someone's path (UK Informal): "That driver just cut me up on the roundabout."

Cut down
To cause something to fall by cutting (felling): "The city cut down the old oak tree because it was rotting."

To reduce the amount or frequency of something: "I'm trying to cut down on caffeine before bed."

To kill or severely injure someone (often tragic/literary context): "The young soldiers were cut down in their prime."

Cut in
To interrupt a conversation: "Do you mind if I cut in with a quick question?"

To move suddenly in front of another vehicle/person: "The sports car cut in far too closely."

To include someone in a deal or share of profits: "Since you brought us the client, we'll cut you in on the commission."

To automatically start operating (machines): "When the temperature drops, the backup heater cuts in."

To interrupt a dancing couple to take over as a partner: "May I cut in?"

Cut into
To slice or penetrate a physical object: "The sharp wire cut into my skin."

To consume a portion of something valuable (time, money, profits): "The server outages are cutting into our quarterly profits."

To interrupt (similar to cut in): "I don't want to cut into your lunch break, but this is urgent."

Cut out
To remove a shape or part by cutting: "She cut out an interesting article from the newspaper."

To stop eating or doing something completely: "My doctor told me to cut out sugar."

To suddenly stop working (engines/machines): "The car engine cut out halfway up the hill."

To exclude someone: "They completely cut me out of the decision-making process."

To be naturally suited for something (usually negative and passive: "cut out for"): "After three weeks, he realized he wasn't cut out for sales."

Cut away
To remove the outer or unwanted parts by cutting: "The surgeon carefully cut away the damaged tissue."

To suddenly shift the camera to another scene (Film/Media): "The broadcast cut away to a reporter live at the scene."

Cut across
To take a shortcut across an area: "We cut across the park to get to the station faster."

To affect or apply to multiple different groups, transcending boundaries: "The demand for flexible working conditions cuts across all departments."

Cut back
To reduce spending, production, or consumption: "The company is cutting back on hiring this quarter."

To prune a plant to control its growth: "We need to cut back the rose bushes before winter."

To return to a previous scene (Film/Media): "The movie cuts back to the protagonist's childhood."

Cut together
To edit film or audio by joining distinct pieces: "The marketing team cut together a fast-paced promotional video."

Cut apart
To separate or dismantle by cutting: "They cut the old ship apart for scrap metal."

To severely criticize or destroy an argument: "The defense attorney cut the witness's testimony apart."

Cut over
To switch from an old system to a new one (IT/Business context): "The engineering team will cut over to the new cloud servers at midnight." (The noun form is "cutover").

Cut ahead
To move in front of others in a line unethically: "A group of teenagers tried to cut ahead of us in the queue."

Cut through
To take a shortcut through an area: "Let's cut through the alley to avoid the main street traffic."

To quickly deal with or bypass obstacles and bureaucracy: "We hired a local consultant to cut through the legal red tape."

To penetrate a barrier, such as sound, darkness, or confusion: "The siren cut through the silence of the night."

Cut about / Cut round
To move or run around actively or aimlessly (UK Informal): "The kids were cutting about the garden all afternoon."

To take a quick shortcut around an obstacle (Cut round): "If we cut round the back of the building, we'll miss the crowd."

Cut to
To skip ahead to a specific, more important point: "Let's cut to the chase and discuss the budget."

To shift to a new scene (Film/Media scriptwriting): "The hero falls asleep. Cut to: interior, office, daytime."

Cut against
To go against the grain, expectations, or natural order: "His decision to expand the business cuts against the current economic trends."

---

1) Create "act" link on list page with particals mentioned above phrasal verbs. 
   Take as the base "take" link.
2) Create "take" page with mentioned above phrasal verbs. 
   Take as the base "take" page.
3) Cover the functionality with tests
---

## 2026-06-08T16:54:30Z
Break Off
To remove a part of something (by force or snapping):

Example: He broke off a square of chocolate and gave it to me.

To suddenly stop speaking or doing something:

Example: She broke off in the middle of her sentence when the phone rang.

To end a relationship, agreement, or negotiation:

Example: The two countries have broken off diplomatic relations.

Break Up
To separate into smaller pieces:

Example: The ship broke up on the rocks during the storm.

To end a romantic relationship or marriage:

Example: Sam and Alex broke up after five years of dating.

To force a crowd to disperse or to stop a fight:

Example: The police arrived to break up the protest.

To divide something into smaller, manageable parts:

Example: Let's break up this large project into smaller tasks.

To lose audio signal (telecommunications):

Example: I can't hear you very well, your voice is breaking up.

To end the school term for holidays (chiefly British):

Example: The children are excited because school breaks up next week.

To burst into laughter, or make someone else laugh (chiefly American):

Example: That comedian always breaks me up.

Break Down
To stop working (machinery or vehicles):

Example: My car broke down on the highway.

To lose control of one's emotions and start crying:

Example: She broke down in tears when she heard the news.

To fail or collapse (negotiations, systems, or relationships):

Example: The peace talks broke down after neither side would compromise.

To divide information into smaller parts for easier analysis:

Example: Can you break down this budget so I can see where the money is going?

To destroy or remove a barrier or obstacle:

Example: The organization works to break down social barriers.

To decompose or separate into basic chemical elements:

Example: Plastic takes hundreds of years to break down in the environment.

Break In
To enter a building by force or illegally (intransitive):

Example: Thieves broke in while we were away on vacation.

To interrupt a conversation:

Example: "I completely disagree," he broke in.

To wear new shoes or use new equipment until they become comfortable:

Example: My feet hurt because I'm still breaking in these new leather boots.

To train a new employee, or to train an animal (like a horse) to be ridden:

Example: It takes a few weeks to break in a wild horse.

Break Into
To enter a building by force (transitive — requires an object):

Example: Someone broke into my apartment last night.

To suddenly begin doing something (laughing, running, singing, sweating):

Example: As soon as she saw him, she broke into a smile.

To successfully enter a new profession, industry, or market:

Example: It is very difficult to break into the publishing industry.

To open something by force or use emergency supplies/funds:

Example: We had to break into our savings to pay for the roof repair.

Break Out
To start suddenly (war, fire, disease, riots):

Example: World War II broke out in 1939.

To escape from a place (like a prison):

Example: Three inmates managed to break out of the maximum-security facility.

To develop a skin condition (sweat, spots, acne, rash):

Example: Eating too much dairy makes my skin break out.

To bring something out to use or celebrate with:

Example: We won the contract! Let's break out the champagne.

Break Away
To physically escape from someone who is holding you:

Example: He grabbed her arm, but she managed to break away.

To separate from a group, crowd, or pack (often in a race):

Example: Three cyclists broke away from the main pack to take the lead.

To leave a political party, country, or organization to form a new one:

Example: The rebel faction broke away to form their own government.

Break Back
To regain a lost advantage (specifically in sports like tennis):

Example: He lost his serve in the first set but immediately broke back in the next game.

Break For
To suddenly run toward something (usually safety or cover):

Example: When the rain started pouring, we broke for the trees.

To pause an activity for a short period:

Example: Let's break for lunch and resume the meeting at 2:00 PM.

Break With
To stop following a tradition, habit, or custom:

Example: The designer broke with tradition by using bright neon colors for the wedding dress.

To end a relationship or association with a person or group:

Example: He broke with his family over their political differences.

Break Apart
To separate or shatter into pieces (often violently):

Example: The space shuttle broke apart upon re-entering the atmosphere.

To destroy a relationship, organization, or group:

Example: The scandal threatened to break the entire committee apart.

Break Over
To wash or burst over something (like waves):

Example: The massive wave broke over the bow of the ship.

To happen suddenly and intensely in a specific location (weather or events):

Example: The storm broke over the city just after midnight.

Break Through
To force a way through an obstacle, barrier, or defense:

Example: The sun finally broke through the heavy clouds.

To make a significant discovery or overcome a major limitation:

Example: Scientists hope to break through in their cancer research this year.

Break To
To tell someone bad or surprising news gently (used as "break it to" or "break the news to"):

Example: I hate to break it to you, but your flight has been canceled.

Break Against
To crash forcefully into something:

Example: We sat and watched the waves break against the rocky cliffs.
---
Bring about
Definition 1: To cause something to happen.

Example: The new management structure brought about a massive improvement in team efficiency.

Definition 2: (Nautical) To cause a ship to change direction.

Example: The captain brought the ship about to avoid the storm.

Bring around / round
Definition 1: To persuade someone to agree with your point of view.

Example: He didn't want to use the new software at first, but we eventually brought him around.

Definition 2: To restore someone to consciousness.

Example: She fainted from the heat, but a glass of cold water brought her round.

Definition 3: To bring someone or something to a place (like a home).

Example: I’ll bring the documents round to your apartment this evening.

Definition 4: To gradually introduce a specific topic into a conversation.

Example: After chatting about the weather, she smoothly brought the conversation around to the job offer.

Bring away
Definition: To learn or gain an impression, memory, or lesson from an experience.

Example: The main insight I brought away from the tech conference was how heavily AI will impact sourcing.

Bring back
Definition 1: To return something to its original place or owner.

Example: Please bring back the laptop when you finish the presentation.

Definition 2: To cause someone to remember something from the past.

Example: Walking through my old university campus really brought back memories.

Definition 3: To reintroduce something or start doing something again.

Example: The company decided to bring back the remote work policy.

Bring by
Definition: To visit someone briefly in order to deliver something.

Example: I’ll bring the signed contracts by the office tomorrow morning.

Bring down
Definition 1: To reduce a level, rate, or amount.

Example: We need to bring down our time-to-hire metric this quarter.

Definition 2: To cause a government or leader to lose power.

Example: The financial scandal eventually brought down the prime minister.

Definition 3: To make someone feel sad, depressed, or less energetic.

Example: This endless rainy weather is really bringing me down.

Definition 4: To cause an aircraft or an animal to fall to the ground.

Example: The pilot safely brought down the plane despite the engine failure.

Bring forward
Definition 1: To change the date or time of an event so that it happens earlier.

Example: Because of a scheduling conflict, the interview was brought forward to 10:00 AM.

Definition 2: To introduce a plan, proposal, or argument for discussion.

Example: The team brought forward several excellent ideas during the brainstorming session.

Definition 3: (Accounting) To transfer a total from the bottom of one page to the top of the next.

Example: The balance of $5,000 was brought forward to the new ledger.

Bring in
Definition 1: To involve someone new in a project or situation (often an expert).

Example: We had to bring in a senior DevOps consultant to fix the server architecture.

Definition 2: To earn or produce money.

Example: Her freelance coding projects bring in an extra $2,000 a month.

Definition 3: To introduce a new law, rule, or system.

Example: The government is bringing in stricter data privacy regulations.

Definition 4: To take someone to a police station for questioning or arrest.

Example: The police brought him in for questioning.

Definition 5: (Legal) To yield or announce a verdict in court.

Example: The jury brought in a verdict of not guilty.

Bring into
Definition: To cause someone or something to become involved in a specific situation, state, or condition.

Example (involve): Please don’t bring me into your argument.

Example (state): The new guidelines will be brought into effect next month.

Bring off
Definition: To succeed in doing something very difficult, often unexpectedly.

Example: Negotiating that salary package with a tight budget was tough, but she brought it off beautifully.

Bring on
Definition 1: To cause something to happen (usually something negative, like an illness or bad situation).

Example: I think the sudden change in weather brought on my cold.

Definition 2: To help someone develop or improve, especially in their career or skills.

Example: The senior manager really brought the junior recruiters on over the last year.

Definition 3: To send a player onto the field during a sports match.

Example: The coach brought on a substitute striker in the 80th minute.

Definition 4: Used as an exclamation ("Bring it on!") to show you are prepared for a challenge.

Example: Another difficult technical assessment to evaluate? Bring it on!

Bring out
Definition 1: To produce a new product and start selling it, or to publish something.

Example: Apple is bringing out a new iPhone model in September.

Definition 2: To highlight or make a particular quality noticeable.

Example: The behavioral interview questions really brought out her leadership qualities.

Definition 3: To cause a physical reaction on the skin (like a rash).

Example: Eating strawberries always brings me out in a rash.

Definition 4: (Bring someone out of their shell) To make a shy person more confident.

Example: Working closely with a team really brought him out of his shell.

Bring over
Definition 1: To bring someone or something from one place to another (especially to someone's home).

Example: I'll bring over my notes so we can study English grammar together.

Definition 2: To persuade someone to change to your side or opinion (similar to bring around).

Example: We managed to bring the hesitant candidate over to our side with a better relocation package.

Bring through
Definition: To help someone successfully survive a very difficult, dangerous, or life-threatening situation.

Example: The incredible medical team brought him through the surgery safely.

Bring to
Definition 1: To make someone conscious again after they have fainted.

Example: The paramedics used smelling salts to bring him to.

Definition 2: To reach a mathematical total.

Example: The latest hires bring our total headcount to 150 employees.

Bring together
Definition: To help people or groups to become friendly, collaborate, or unite.

Example: The project brought together software developers from all over Europe.

Bring up
Definition 1: To care for and raise a child until they are an adult.

Example: She was brought up in a bilingual household.

Definition 2: To mention a subject or start talking about a specific topic.

Example: Make sure you bring up the remote work options during the first interview.

Definition 3: To make something appear on a computer screen.

Example: Let me just bring up his GitHub repository so we can review his code.

Definition 4: To vomit.

Example: He ate some bad seafood and brought up his dinner.
---

for each ["break", "bring"]:
1) Create the link on list page with particals mentioned above phrasal verbs. 
   Take as the base "take" link.
2) Create the page with mentioned above phrasal verbs. 
   Take as the base "take" page.
3) Cover the functionality with tests
---
