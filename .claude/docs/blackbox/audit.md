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

## 2026-06-08T17:14:26Z
Ask about
Meaning: To try to get information about a subject or a person.

Example: I need to call the hotel to ask about their parking rules.

Ask after
Meaning: To ask for news about someone, usually concerning their health or how their life is going.

Example: I saw your old manager yesterday, and he asked after you.

Ask around / Ask round
Meaning 1: To ask many different people the same question, usually to find information or get help.

Example: I don't know a good plumber, but I will ask around the office for you.

Meaning 2 (British English - usually "ask round"): To invite someone to your home.

Example: We should ask the new neighbors round for a cup of coffee.

Ask away
Meaning: An expression used to tell someone that they can start asking their questions.

Example: If anyone has questions about the new software update, ask away!

Ask back
Meaning 1: To invite someone to return to a place (like your house or an event).

Example: We had a great time with them, so we will definitely ask them back soon.

Meaning 2: To invite someone to return for a second job interview.

Example: The first interview went very well, so they asked her back for a second one.

Ask down
Meaning: To invite someone to come downstairs from a higher floor.

Example: His mother asked him down for breakfast.

Ask for
Meaning 1: To request something to be given to you.

Example: I am going to the boss's office to ask for a pay rise.

Meaning 2: To say that you want to speak to a specific person.

Example: When you arrive at the reception desk, ask for Mr. Smith.

Meaning 3 (Idiomatic): To behave in a way that will clearly cause trouble or problems (usually "asking for it" or "asking for trouble").

Example: Driving that fast in the rain is just asking for trouble.

Ask in
Meaning: To invite someone to come inside a building, house, or room.

Example: It was raining heavily outside, so I asked her in to wait.

Ask into
Meaning: Similar to "ask in," but used when specifying the exact room someone is invited into.

Example: The manager asked me into his office to discuss the new project.

Ask off
Meaning: To request permission to not go to work for a specific period of time.

Example: I need to ask Friday off so I can attend my sister's wedding.

Ask out
Meaning: To invite someone to go to a movie, restaurant, etc., because you want to start a romantic relationship with them.

Example: He finally found the courage to ask her out on a date.

Ask over
Meaning: To invite someone to your home, usually for a short visit or a meal.

Example: Let's ask Tom and Sarah over for dinner this Saturday.

Ask up
Meaning: To invite someone to come upstairs to a higher floor.

Example: I asked him up to my apartment to show him my new computer setup.
---
Back away
Meaning 1: To move backwards to get away from someone or something frightening.

Example: The developer backed away from the hot server rack.

Meaning 2: To show that you do not support a plan or idea anymore, or to avoid a difficult situation.

Example: The investors started to back away from the project when costs increased.

Back down
Meaning 1: To admit that you were wrong, or to stop demanding something because of opposition.

Example: A good manager knows when to back down during a heated argument with a team member.

Back in
Meaning 1: To drive a vehicle backward into a parking space.

Example: It is much safer to back in to this parking spot so you can drive out easily later.

Back into
Meaning 1: To drive a vehicle backwards and accidentally hit something.

Example: I accidentally backed into the CEO's car this morning.

Meaning 2: (Informal) To get into a career or situation by chance, rather than by planning.

Example: She didn't study management; she just backed into the leadership role when her boss left.

Back off
Meaning 1: To move backward away from danger or a threat.

Example: The security guard told the angry customer to back off.

Meaning 2: To stop criticizing someone or telling them what to do.

Example: You need to back off and let your software team solve the problem on their own.

Meaning 3: To stop supporting an idea, or to decide not to do something you were planning to do.

Example: The company backed off from their plan to release the software early.

Back onto
Meaning 1: If a building backs onto something, the back of the building faces it. (This is the closest valid phrasal verb to the particle "on").

Example: Our new corporate headquarters backs onto a beautiful public park.

Back out / Back out of
Meaning 1: To drive a vehicle backward out of a space.

Example: She backed out of the garage very slowly.

Meaning 2: To decide not to do something that you agreed or promised to do.

Example: The client tried to back out of the contract at the last minute.

Back over
Meaning 1: To drive a vehicle backwards over something or someone.

Example: I accidentally backed over my laptop bag in the driveway.

Back up
Meaning 1: To move backwards.

Example: Could you back up a few steps so I can see the screen?

Meaning 2: To support someone or confirm that what they are saying is true.

Example: I will pitch the new Java framework to the board, but I need you to back me up.

Meaning 3: To make a copy of computer data so it is not lost.

Example: Always back up the database before deploying a major update.

Meaning 4: To cause traffic to stop or move very slowly.

Example: The accident backed up traffic on the highway for miles.
---
Be off
To leave: "I am off to the management conference now."

To be canceled: "The project launch is off because of critical bugs."

To be absent from work: "Two developers are off sick today."

To go bad (for food): "Don't drink that milk; I think it is off."

Be on
To happen as planned: "Is the team meeting still on for tomorrow?"

To function or operate (for machines): "Ensure the backup server is on."

To take medication: "He is on antibiotics for his cough."

Be up
To be awake and out of bed: "I was up all night fixing the Java code."

To increase: "Company profits are up by 15% this quarter."

To be next in turn: "You are up next for your performance review."

To expire (time): "Stop writing; your time is up."

To happen (informal): "What is up with the database connection?"

Be down
To stop working (for systems/machines): "The production environment is down right now."

To decrease: "Sales are down compared to last month."

To feel sad or depressed: "He is a bit down because he didn't get the promotion."

Be in
To be at home or in the office: "The CEO will be in at 9:00 AM."

To be submitted: "All financial reports must be in by Friday."

To be fashionable/popular: "Agile methodology is very in right now."

Be into
To be very interested in something: "She is really into software architecture and system design."

Be out
To be absent from home or the office: "The manager is out until next week."

To be published or released: "The new version of the application is out."

To be revealed (for a secret): "The secret is out; everyone knows about the merger."

To be impossible or unacceptable: "Working over the weekend is out."

Be away
To be absent or on a trip: "He is away on a business trip to London."

Be across
To be fully familiar with or understand a topic: "As a project manager, I need to be across all the new data privacy laws."

Be forward
To act presumptuously or too confidently: "I do not want to be forward, but I think your strategy has a major flaw."

Be back
To return: "I will be back at my desk in ten minutes."

Be for
To support or be in favor of: "We are for the new flexible working hours."

To be intended for: "This internal API is for senior developers only."

Be by
To be physically near: "The server room is by the elevator."

To be the work of someone (passive sense): "This excellent module is by our lead Java developer."

Be together
To be unified or in a relationship: "The leadership team needs to be together on this decision."

To be organized (have it together): "She is very professional and really has herself together."

Be with
To support someone: "I am with you on this proposal; it makes sense."

To understand someone: "I am not sure I am with you. Can you explain the logic again?"

Be without
To lack something: "We are without internet access at the moment."

Be apart
To be separated physically or emotionally: "The two microservices must be apart to avoid system dependencies."

Be over
To be finished: "The sprint planning meeting is over."

Be ahead
To be winning or further advanced than expected: "Our development team is ahead of schedule this month."

Be after
To want, try to get, or look for something: "What exactly are you after in this contract negotiation?"

Be behind
To be late or delayed: "We are two weeks behind schedule on this project."

To support someone or something: "The board of directors is completely behind the new CEO."

Be through
To be finished doing something or to end a relationship: "I am through with using this outdated software."

Be about
To be going to happen very soon (be about to): "Save your work; the system is about to restart."

To mean or consist of (what it is about): "Good leadership is about listening to your team."

Be around / round
To be present or available: "Will you be around for a code review later this afternoon?"

Be to
To be required or scheduled to do something (formal): "You are to report directly to the IT director."

Be against
To oppose someone or something: "Many users are against the new interface changes."
---

for each ["ask", "back", "be"]:
1) Create the link on list page with particals mentioned above phrasal verbs. 
   Take as the base "take" link.
2) Create the page with mentioned above phrasal verbs. 
   Take as the base "take" page.
3) Cover the functionality with tests
---

## 2026-06-08T17:34:51Z
Blow about / Blow around (round)

Meaning 1 (Literal): To move in different directions because of the wind.

Example: The autumn leaves are blowing around the garden.

Meaning 2 (Figurative): To spread rumors or stories (mostly British English).

Example: There are a few rumors blowing about the office regarding the new manager.

Blow apart

Meaning 1 (Literal): To completely destroy something using an explosion.

Example: The bomb blew the old building apart.

Meaning 2 (Figurative): To completely destroy an argument, idea, or plan by showing its flaws.

Example: The senior developer blew apart my software architecture proposal during the meeting.

Blow away

Meaning 1 (Figurative): To impress someone very much.

Example: The team's presentation on the new Java framework completely blew me away.

Meaning 2 (Literal): To move something away using the wind.

Example: Hold onto your documents, or the wind will blow them away.

Meaning 3 (Slang): To defeat competitors easily or kill someone.

Example: Our new product will blow the competition away.

Blow back

Meaning 1 (Literal): When the wind pushes something (like smoke or hair) back toward you.

Example: I tried to light the fire, but the smoke blew back into my face.

Meaning 2 (Figurative): To have unexpected negative consequences for the person who started an action (often used as the noun blowback).

Example: The company's aggressive marketing campaign blew back on them when customers complained.

Blow by

Meaning 1 (Figurative): To pass very quickly (usually referring to time).

Example: The weekend just blew by, and now it is Monday again.

Meaning 2 (Figurative): To easily move past a competitor or obstacle.

Example: The runner blew by the defender to score a goal.

Blow down

Meaning 1 (Literal): To make something fall to the ground using strong wind.

Example: The storm blew down several trees in our neighborhood.

Blow in

Meaning 1 (Figurative): To arrive casually, suddenly, or unexpectedly.

Example: The CEO just blew in from London and wants to see you.

Blow into

Meaning 1 (Figurative): To enter a room or building casually or loudly.

Example: She blew into the office 20 minutes late, holding a cup of coffee.

Meaning 2 (Literal): To push air from your mouth into a device.

Example: The police officer asked the driver to blow into the breathalyzer.

Blow off

Meaning 1 (Figurative): To ignore someone or fail to attend an appointment.

Example: I tried to organize a meeting with the client, but he blew me off.

Meaning 2 (Figurative): To ignore a responsibility or task.

Example: He blew off his homework to play video games.

Meaning 3 (Figurative): To release physical or emotional pressure (often "blow off steam").

Example: After a stressful week at work, I like to run 10 kilometers to blow off steam.

Blow out

Meaning 1 (Literal): To extinguish a flame with your breath or wind.

Example: Make a wish and blow out the candles on your birthday cake.

Meaning 2 (Figurative): To defeat an opponent very easily.

Example: Our sales team blew out the competition this quarter.

Meaning 3 (Literal): When a vehicle's tire suddenly bursts.

Example: I was driving to Warsaw when my front tire blew out.

Blow over

Meaning 1 (Figurative): When a bad situation, argument, or storm ends or is forgotten without causing serious damage.

Example: The management decided to wait for the PR scandal to blow over before launching the app.

Blow through

Meaning 1 (Figurative): To spend money very quickly and irresponsibly.

Example: The startup blew through its entire budget in just six months.

Meaning 2 (Literal): To travel through a place quickly without stopping.

Example: We didn't have time for sightseeing; we just blew through Paris on our way south.

Blow up

Meaning 1 (Literal): To explode or be destroyed by an explosion.

Example: The action movie hero walked away as the car blew up behind him.

Meaning 2 (Literal): To fill something with air (inflate).

Example: Can you help me blow up these balloons for the party?

Meaning 3 (Figurative): To suddenly become very angry.

Example: My boss blew up at me when I accidentally deleted the database.

Meaning 4 (Figurative): To enlarge a photograph or image.

Example: Let's blow up this chart so everyone in the meeting room can see it.

Meaning 5 (Figurative): To suddenly become very popular or successful.

Example: Their new social media app blew up overnight.
---
1. Brush off
Meaning 1 (Literal): To use your hand or a brush to remove dirt, dust, or something unwanted from a surface.

Example: I brushed off my suit before entering the meeting.

Meaning 2 (Idiomatic): To ignore someone, refuse to listen to them, or treat their ideas as unimportant.

Example: I tried to suggest a new Java framework, but the lead developer brushed me off.

2. Brush up / Brush up on
Meaning 1 (Idiomatic): To improve your knowledge or skill in something you learned in the past but have partly forgotten.

Example: You should brush up on your management skills before applying for the leadership role.

3. Brush away
Meaning 1 (Literal): To remove something by sweeping it with your hand or a brush.

Example: She brushed away the crumbs from the keyboard.

Meaning 2 (Idiomatic): To quickly dismiss a feeling, thought, or fear.

Example: He brushed away his doubts and launched the new software product.

4. Brush down
Meaning 1 (Literal): To clean someone or something by brushing them from top to bottom.

Example: The rider brushed down the horse after the race.

5. Brush out
Meaning 1 (Literal): To remove tangles or dirt from hair or fur using a brush.

Example: It takes a long time to brush out this dog's thick coat.

Meaning 2 (Literal): To clean the inside of something with a brush.

Example: Please brush out the back of the company van before returning it.

6. Brush on
Meaning 1 (Literal): To apply a liquid (like paint, glue, or a sauce) to a surface using a brush.

Example: Brush on a light coat of varnish to protect the wood.

7. Brush over
Meaning 1 (Idiomatic): To ignore a problem or treat a topic lightly instead of explaining it in detail.

Example: The CEO brushed over the bad financial report and focused only on future goals.

8. Brush against
Meaning 1 (Literal): To touch someone or something lightly while moving past them.

Example: My shoulder brushed against the doorframe as I walked into the office.

9. Brush by
Meaning 1 (Literal): To walk past someone in a narrow space, touching them slightly.

Example: He brushed by me in the crowded hallway without saying excuse me.

10. Brush back
Meaning 1 (Literal): To push hair away from your face.

Example: She brushed back her hair to look closer at the screen.

Meaning 2 (Idiomatic / Sports): To force someone to move backward (often used in baseball when a pitcher throws a ball very close to the batter).

Example: The pitcher threw a fast ball inside to brush back the batter.

11. Brush through
Meaning 1 (Literal): To move a brush completely through hair to remove knots.

Example: Just brush through your hair quickly before the video call starts.
---
Build around (or round)
Definition: To base a strategy, system, plan, or team on a central person, idea, or concept.

Example 1 (Business): The CEO decided to build the new marketing strategy around customer retention.

Example 2 (Software): The entire application is built around a secure Java Spring Boot backend.

Build in / into
Definition: To include something as a permanent, essential, or integral part of a system, plan, or structure from the beginning.

Example 1: When planning the project schedule, we need to build in some extra time for unexpected delays.

Example 2: The leadership team is trying to build a culture of continuous feedback into the organization.

Example 3: Security features shouldn't be an afterthought; they must be built into the software architecture.

Build on (and informally, Build off)
Definition: To use a past achievement, existing idea, or success as a foundation for further progress and development. (Note: "Build off" is commonly used in spoken American English with the exact same meaning.)

Example 1: We can build on the momentum of last quarter's sales to reach our new targets.

Example 2: The new management framework builds on classic agile principles.

Example 3: That’s a great suggestion—let’s build off that idea during our next brainstorming session.

Build out
Definition: To develop, expand, or complete a system, space, or business so that it reaches its full potential or size.

Example 1: The startup received funding to build out its sales and marketing departments.

Example 2: The development team is working to build out the public API so external partners can use it.

Build up
This is the most versatile phrasal verb on the list and carries several distinct meanings.
Definition 1: To gradually increase in amount, size, strength, or intensity.

Example: If we don't refactor the code regularly, technical debt will build up quickly.

Example: The manager worked hard to build up the confidence of her junior developers.

Definition 2: To talk about someone or something in a very positive way to create a good impression (often before introducing them).

Example: The director really built up the new project manager before she walked into the meeting.

Definition 3: To develop an area with many buildings and infrastructure.

Example: The area around the new technology park has become highly built up over the last five years.

Build to (often Build up to)
Definition: To gradually increase and approach a climax, peak, or major event.

Example: The tension in the boardroom was building to a breaking point before the final decision was made.
---

for each ["blow", "brush", "build"]:
1) Create the link on list page with particals mentioned above phrasal verbs. 
   Take as the base "take" link.
2) Create the page with mentioned above phrasal verbs. 
   Take as the base "take" page.
3) Cover the functionality with tests
---

## 2026-06-09T10:15:26Z
Help me fix the issues reported by /doctor below.

For each issue: briefly explain what the fix will do, then ask me to confirm before running any shell command that deletes files, modifies global config, or changes my installation. Safe read-only checks are fine without asking. If a suggested fix looks wrong for my setup, say so instead of running it.

- Settings (/home/eug/.claude/settings.json › permissions.allow): Invalid permission rule "mcp__postgres-*__list_*" was skipped: Wildcard tool name "mcp__postgres-*__list_*" is not supported in allow rules. An allow pattern must name the scope it widens — globs are permitted only in the tool position after a literal mcp__<server>__ prefix. Deny and ask rules accept wildcards anywhere
---

## 2026-06-09T10:17:49Z
Help me fix the issues reported by /doctor below.

For each issue: briefly explain what the fix will do, then ask me to confirm before running any shell command that deletes files, modifies global config, or changes my installation. Safe read-only checks are fine without asking. If a suggested fix looks wrong for my setup, say so instead of running it.

- Settings (/home/eug/.claude/settings.json › permissions.allow): Invalid permission rule "mcp__postgres-*__list_*" was skipped: Wildcard tool name "mcp__postgres-*__list_*" is not supported in allow rules. An allow pattern must name the scope it widens — globs are permitted only in the tool position after a literal mcp__<server>__ prefix. Deny and ask rules accept wildcards anywhere
---

## 2026-06-09T10:19:05Z
Help me fix the issues reported by /doctor below.

For each issue: briefly explain what the fix will do, then ask me to confirm before running any shell command that deletes files, modifies global config, or changes my installation. Safe read-only checks are fine without asking. If a suggested fix looks wrong for my setup, say so instead of running it.

- Settings (/home/eug/.claude/settings.json › permissions.allow): Invalid permission rule "mcp__postgres-*__list_*" was skipped: Wildcard tool name "mcp__postgres-*__list_*" is not supported in allow rules. An allow pattern must name the scope it widens — globs are permitted only in the tool position after a literal mcp__<server>__ prefix. Deny and ask rules accept wildcards anywhere
---

## 2026-06-09T10:19:47Z
yes
---

## 2026-06-09T10:22:59Z
On "Phrasal Verbs List" page make Particles same as "Get" as for extended/collapse functionality
---

## 2026-06-09T10:30:18Z
git add all changes and commit them with suitable message
---

## 2026-06-09T10:36:50Z
On "Phrasal Verbs List" only when click on arrow down/up then extend/ellapse phrasal verbs particles but if click on the frame of phrasal verb the get into it.
---

## 2026-06-09T10:45:03Z
git add all changes and commit them with suitable message
---

## 2026-06-09T10:47:47Z
Also phrasal verb base words, like "Put", "Give" and other and "Particles" shoud not be shown as underlined links when how on them but just be test.
---

## 2026-06-09T10:50:35Z
Cover the functionality with tests
---

## 2026-06-09T10:53:48Z
git add all changes and commit them with suitable message
---

## 2026-06-09T10:58:21Z
Create a backlog.md task (but don't execute it) to solve the described problem:


---
Call off
To cancel an event or agreement: The management called off the product launch because the software was not ready.

To order an animal or person to stop attacking: The company had to call off its lawyers after they reached a settlement.

Call on
To formally ask someone to speak or do something: The director called on the lead developer to explain the new Java architecture.

To visit someone for a short time: I will call on the client tomorrow afternoon to discuss the contract.

To use a quality or resource (call upon): The new manager had to call on all her leadership skills during the crisis.

Call up
To telephone someone: I will call up the vendor to negotiate the server prices.

To bring information to a computer screen: Please call up the sales data for the last quarter.

To summon someone for military service: He was called up to the army during the war.

To make someone remember something: The old office building called up memories of my first job.

Call down
To reprimand or heavily criticize someone (mostly US English): The supervisor called him down for missing the project deadline.

To request a higher power to bring something (like a blessing or curse): The angry customer threatened to call down the wrath of the consumer protection agency.

Call in
To ask an expert or professional for help: We had to call in a consultant to fix the database performance issues.

To telephone your workplace or a radio/TV program: Two of our developers called in sick today.

To demand that products or loans be returned: The manufacturer called in all the faulty laptops.

Call into
To cause doubts about something (Idiom: "call into question"): The recent server crash called the team's testing procedures into question.

(Note: "Call into" is rarely used as a standalone phrasal verb outside of this specific idiom or literal movement, e.g., "call into a room").

Call out
To criticize someone publicly for bad behavior: A good leader doesHere is a complete guide to the phrasal verbs and common expressions formed with call using your list of prepositions and adverbs.

Where relevant, the examples focus on business, management, and software development contexts.

Call off
Meaning 1: To cancel an event, meeting, or agreement that was planned.

Example: We had to call off the project meeting because the lead developer was sick.

Meaning 2: To order a person or animal to stop attacking or searching.

Example: The manager told the legal team to call off their aggressive negotiations.

Call on / Call upon
Meaning 1: To ask someone formally to speak or do something.

Example: I would like to call on our CEO to say a few words.

Meaning 2: To use a quality, skill, or resource that you have.

Example: The team had to call on all their experience to fix the critical bug.

Meaning 3: To visit someone for a short time (often formally).

Example: We will call on the new client tomorrow morning.

Call up
Meaning 1: To telephone someone.

Example: I will call up the software vendor to ask about the pricing.

Meaning 2: To find and show information on a computer screen.

Example: Can you call up the latest sales data on your monitor?

Meaning 3: To officially order someone to join the military.

Example: His grandfather was called up during the war.

Call down
Meaning 1: To shout to someone who is on a lower level than you.

Example: She called down from the second floor to ask if the package had arrived.

Meaning 2: To request negative consequences or punishment upon someone (formal/literary).

Example: He called down curses on his rivals.

Call in
Meaning 1: To ask an expert or specialist to come and help with a problem.

Example: The system crashed, so we had to call in an external IT consultant.

Meaning 2: To telephone your office or a radio/TV show.

Example: Two team members called in sick today.

Meaning 3: To demand that people return a product because it is broken or dangerous (a recall).

Example: The manufacturer called in thousands of laptops due to battery issues.

Call into
Meaning 1 (Idiom): To call into question means to make people doubt something.

Example: The recent security breach called into question the software's reliability.

Meaning 2: To summon someone into a room.

Example: The manager called him into the office for a performance review.

Call out
Meaning 1: To publicly criticize someone for doing something wrong.

Example: The leader called out the team member for unprofessional behavior.

Meaning 2: To ask a professional to come for an emergency.

Example: We had to call out an engineer in the middle of the night.

Meaning 3: To speak loudly so someone can hear you.

Example: The manager called out my name across the warehouse.

Call away
Meaning 1: To ask someone to leave the place where they are to go somewhere else, usually for an emergency.

Example: The director was called away to an urgent meeting.

Call across
Meaning 1: To shout to someone on the other side of a room, street, or space.

Example: He called across the open-plan office to ask for the password.

Call forward
Meaning 1: To ask someone to step to the front of a group.

Example: The CEO called the project manager forward to receive an award.

Call back
Meaning 1: To return a telephone call.

Example: I am in a meeting, can I call you back in an hour?

Meaning 2: To ask someone to return for a second job interview.

Example: They liked her portfolio and called her back for a final interview.

Call for
Meaning 1: To demand or require a specific action or quality.

Example: Managing a large team calls for great communication skills.

Meaning 2: To publicly ask for something to happen.

Example: The users are calling for better privacy features in the app.

Meaning 3: To go to a place to pick someone or something up.

Example: I will call for you at the hotel at 8:00 AM.

Call by
Meaning 1: To make a short, informal visit to a place while going somewhere else.

Example: I’ll call by the IT department on my way to lunch to drop off the broken mouse.

Call together
Meaning 1: To formally ask a group of people to meet in one place.

Example: We need to call the board of directors together to discuss the merger.

Call over
Meaning 1: To ask someone to come to where you are standing.

Example: I called the junior developer over to look at my screen.

Meaning 2: To read aloud a list of names to check who is present (mostly British English).

Example: The trainer called over the names before the workshop started.

Call ahead
Meaning 1: To telephone a place before you arrive there (often to make a reservation or check something).

Example: We should call ahead to ensure the conference room is available.

Call after
Meaning 1: To shout to someone as they are walking away from you.

Example: I called after him, but he had already entered the elevator.

Meaning 2: To give a child the same name as someone else (More common in British English; "name after" is standard in American English).

Example: He was called after his grandfather.

Call through
Meaning 1: To connect a phone call to someone else.

Example: The receptionist called me through to the HR director.

Call about
Meaning 1: To make a phone call concerning a specific topic (standard verb + preposition).

Example: I am calling about the open software engineering position.

Call around / Call round
Meaning 1: To telephone several different people or companies, usually to get information or compare prices.

Example: I will call around to find a better price for our cloud hosting.

Meaning 2: To visit someone's house casually.

Example: Feel free to call round after work for a coffee.

Call to
Meaning 1: To shout in order to get someone's attention.

Example: She called to the cab driver to stop.
===
for "call"":
1) Create the link on list page with particals mentioned above phrasal verbs. 
   Take as the base "take" link.
2) Create the page with mentioned above phrasal verbs. 
   Take as the base "take" page.
3) Cover the functionality with tests
---

## 2026-06-09T11:01:43Z
git add all changes and commit them with suitable message
---

## 2026-06-09T11:04:15Z
Create a backlog.md task the same way as task-13 (but don't execute it) to solve the described problem:



---
Carry about / Carry around / Carry round
Meaning 1: To keep something with you everywhere you go (physical).

Example: The lead developer carries around a notebook to write down new software ideas.

Meaning 2: To hold onto a feeling or emotion (usually negative) for a long time.

Example: She carried around a lot of stress after the project failed.

Carry away
Meaning 1: To become too excited and lose control of your behavior (almost always used in the passive voice: "get/be carried away").

Example: The marketing team got carried away with the new features and promised the client things we couldn't build.

Carry back
Meaning 1: To bring a past memory to mind; to make someone remember a specific time.

Example: Hearing that old startup story carried the CEO back to his first year in business.

Carry forward
Meaning 1: To make a project or idea progress to the next stage.

Example: We need a strong manager to carry this initiative forward.

Meaning 2: (Business / Accounting) To transfer a financial total or a specific benefit to a new page, period, or year.

Example: Any unused vacation days from this year will be carried forward to next year.

Carry off
Meaning 1: To succeed in doing something difficult, often when others did not expect you to.

Example: It was a highly risky strategy, but the leadership team carried it off perfectly.

Meaning 2: To win a prize, competition, or award.

Example: Our company carried off three major industry awards this year.

Meaning 3: To cause death, usually due to a disease (formal and older use).

Example: The virus carried off thousands of people in the 19th century.

Carry on
Meaning 1: To continue doing something.

Example: Please carry on with your coding; I will check your progress after lunch.

Meaning 2: To manage, run, or take part in a business or activity.

Example: They carry on a successful IT consulting business in Warsaw.

Meaning 3: To behave in an uncontrolled, angry, or childish way.

Example: The customer carried on for ten minutes about the delayed software release.

Meaning 4: To have a secret, often romantic or sexual, relationship.

Example: It was rumored that the two directors were carrying on.

Carry out
Meaning 1: To perform, execute, or complete a task, instruction, experiment, or plan.

Example: The IT department carried out the system update over the weekend without any issues.

Meaning 2: To fulfill a promise or a threat.

Example: The management carried out their promise to increase employee training budgets.

Carry over
Meaning 1: To continue to exist in a different situation, environment, or time.

Example: His excellent management skills carried over perfectly into his new role as a director.

Meaning 2: To delay or postpone something to a later time.

Example: We ran out of time, so the final agenda item was carried over to next week's meeting.

Carry through
Meaning 1: To complete a task successfully despite facing significant difficulties.

Example: The team's dedication carried the software release through to a successful launch.

Meaning 2: To help someone or something survive a difficult situation.

Example: The emergency investment carried the business through the financial crisis.
===
for "carry"":
1) Create the link on list page with particals mentioned above phrasal verbs. 
   Take as the base "take" link.
2) Create the page with mentioned above phrasal verbs. 
   Take as the base "take" page.
3) Cover the functionality with tests
---

## 2026-06-09T11:16:38Z
Create a backlog.md tasks the same way as task-13 and task-14 (but don't execute it) to solve the described problems:



---
1. Catch on
Meaning 1: To understand something (often after a delay or difficulty).

Example: The syntax of the new Java library was confusing at first, but the junior developers eventually caught on.

Meaning 2: To become popular or widely accepted.

Example: Microservices architecture quickly caught on as the standard for enterprise software development.

2. Catch up
Meaning 1: To reach the same level, standard, or position as someone or something else.

Example: Our software is lacking some features, so we need to release a major update to catch up with our main competitor.

Meaning 2: To do work or tasks that you did not have time to do earlier (often followed by "on").

Example: I need to block out two hours this afternoon to catch up on my code reviews and emails.

Meaning 3: To talk to someone to find out the latest news about their life or work.

Example: Let's schedule a brief meeting on Friday to catch up on the project's progress.

Meaning 4: To involve someone in a situation, often against their will (used in the passive: be/get caught up in).

Example: The lead engineer got caught up in administrative tasks and had no time to write code.

3. Catch out
Meaning 1: To discover that someone has made a mistake, lied, or done something wrong.

Example: The automated testing pipeline caught the developer out by exposing a critical security flaw in the code.

Meaning 2: To put someone in a difficult, unexpected, or unprepared situation.

Example: The sudden crash of our cloud servers caught the management team out during the product launch.

4. Catch in
Note: This is mostly used in specific phrases or in the passive voice.

Meaning 1: To discover someone in the middle of doing something (usually bad).

Example: The audit team caught the vendor in a lie about their data protection protocols.

Meaning 2: To be trapped or delayed by an unavoidable situation (used as caught in).

Example: I missed the daily Scrum meeting because I got caught in heavy traffic.
---
1. Check off
Meaning 1: To mark an item on a list to show that it has been completed or verified.

Example: After completing the code review, I checked off the task in Jira.

2. Check on
Meaning 1: To look at someone or something to make sure they are safe, progressing well, or in good condition.

Example: The manager stopped by to check on the new Java developers.

3. Check up (usually "Check up on")
Meaning 1: To investigate someone or something to discover what they are doing or if they are okay.

Example: The client called to check up on the progress of the software release.

4. Check down
Meaning 1: To go down a list of options until you find one that works (often used in processes or sports).

Example: If the main database fails, the system will check down the list and connect to the backup server.

5. Check in
Meaning 1: To register your arrival at a hotel, airport, or event.

Example: The CEO checked in at the hotel right before the leadership conference.

Meaning 2: To contact someone briefly to give an update or make sure everything is okay.

Example: Let's check in on Friday to discuss the sprint results.

Meaning 3 (Tech): To upload or save source code to a version control system (like Git or SVN).

Example: Make sure to check in your Java code before you leave for the weekend.

Meaning 4: To leave your bags at the airport before a flight.

Example: I need to check in my heavy suitcase.

6. Check into
Meaning 1: To arrive and register at a hotel, clinic, or hospital.

Example: We checked into the Hilton at 3:00 PM.

Meaning 2: To investigate or look for more information about a problem.

Example: The application keeps crashing; the IT team needs to check into it immediately.

7. Check out
Meaning 1: To pay your bill and leave a hotel.

Example: We have to check out of our rooms by 11:00 AM.

Meaning 2: To examine, investigate, or look at something interesting.

Example: You should check out this new Java framework; it could save us a lot of time.

Meaning 3: To prove to be true or correct after investigation.

Example: The server logs show no errors, so the user's story doesn't check out.

Meaning 4: To pay for goods at a store or online.

Example: I added the books to my online cart and checked out.

Meaning 5 (Tech): To download or switch to a specific version of code from a repository (like Git).

Example: Please check out the feature-login branch and run the tests.

Meaning 6 (Informal): To stop paying attention or disconnect mentally because you are tired or bored.

Example: The meeting was so long that half the team checked out after an hour.

8. Check back
Meaning 1: To return later to see if something has happened or is ready.

Example: The system is still restarting; please check back in five minutes.

9. Check for
(Note: Grammatically this is a verb + preposition, not a true phrasal verb, but it is very common).

Meaning 1: To look closely to find a specific thing (often errors, signs, or problems).

Example: We ran automated tests to check for security bugs in the code.

10. Check with
Meaning 1: To ask someone for permission, advice, or information before doing something.

Example: You need to check with the project manager before changing the database structure.

11. Check over
Meaning 1: To examine something carefully from start to finish to find errors or problems.

Example: Please check over the business contract before you sign it.

12. Check through
Meaning 1: To look at or read a collection of items carefully.

Example: I checked through the error logs to find where the Java exception happened.

Meaning 2: To send luggage directly to a final destination without needing to collect it during a connection.

Example: My bags were checked through all the way to Warsaw.

13. Check around / Check round
Meaning 1: To look in various places or ask several people for information (often to compare prices or options).

Example: We should check around for a cheaper cloud hosting provider before signing a contract.

14. Check against
Meaning 1: To compare one thing with another to see if they match or to find differences.

Example: The finance team must check the monthly expenses against the budget.
---
1. Cheer up
This is the most common phrasal verb with "cheer." It relates to improving someone's mood.

Meaning A (Intransitive - focus on oneself): To start feeling happier; to stop being sad.

Example: You need to cheer up! The project delay is not a total disaster.

Meaning B (Transitive - focus on someone else): To make another person feel happier.

Example: We bought some coffee and cake to cheer the team up after a stressful week.

2. Cheer on
This is used when giving active, vocal support.

Meaning: To encourage someone by shouting words of support, usually when they are competing or doing something difficult.

Example: The whole department went to the meeting to cheer her on during her final presentation.

Example: It is a leader's job to cheer on their employees when they take on new challenges.

3. Cheer for
While sometimes categorized as a verb + preposition, this functions as a standard phrasal unit regarding loyalty or support.

Meaning: To publicly support a specific person, team, or idea, hoping they will succeed.

Example: Everyone in the office is cheering for the new software release to be a success.

Example: Which company are you cheering for in this bidding war?

4. Cheer against
This is the direct opposite of "cheer for."

Meaning: To express a desire for someone or something to fail or lose.

Example: In a healthy business environment, you focus on improving your own product rather than cheering against your competitors.

5. Cheer off
This is less common in everyday business but frequently used in sports or public speaking.

Meaning: To applaud or shout in support of someone as they are leaving a stage, field, or room.

Example: After 20 years with the company, the retiring manager was cheered off the stage by his colleagues.
===
for each ["catch", "check", "cheer"]:
1) Create the link on list page with particals mentioned above phrasal verbs. 
   Take as the base "take" link.
2) Create the page with mentioned above phrasal verbs. 
   Take as the base "take" page.
3) Cover the functionality with tests
---

## 2026-06-09T11:23:30Z
Create a backlog.md tasks the same way as task-13 and task-14 (but don't execute it) to solve the described problems:



---
Count against
Meaning 1: To be considered a disadvantage or a negative point for someone.

Example: His lack of management experience might count against him in the job interview.

Count back
Meaning 1: To count backwards from a specific number or date to calculate something.

Example: To figure out when the project started, we need to count back six weeks from today.

Count down
Meaning 1: To say numbers backwards to zero, usually before a big event.

Example: The crowd started to count down from ten before the rocket launch.

Meaning 2: To wait eagerly for an event to happen.

Example: We are counting down the days until our summer holiday.

Count for
Meaning 1: To have a specific level of importance or value.

Example: Good communication skills count for a lot in a software development team.

Meaning 2: To be worth something (often used with "nothing" or "something").

Example: Does all my hard work count for nothing?

Count in
Meaning 1: To include someone in an activity, group, or plan.

Example: If you are ordering pizza for lunch, please count me in!

Count off
Meaning 1: To say numbers aloud in order, usually to divide a group of people into smaller teams.

Example: The coach asked the players to count off by threes.

Count on
Meaning 1: To depend or rely on someone to do something.

Example: You can always count on Sarah to help you finish the report on time.

Meaning 2: To expect something to happen and base your plans on it.

Example: We didn't count on it raining so heavily during our outdoor meeting.

Count out
Meaning 1: To not include someone in an activity or plan.

Example: I feel too sick to go to the dinner party, so count me out.

Meaning 2: To count things one by one, often when distributing them (like money).

Example: The cashier slowly counted out the coins and gave me my change.

Meaning 3: (In boxing) To declare a fighter defeated because they cannot stand up before the referee counts to ten.

Example: The champion hit him hard, and the referee counted him out.

Count up
Meaning 1: To add things together to find the total amount.

Example: Please count up all the expenses from the business trip.
---
Clean away

Definition: To remove dirt, rubbish, or objects to leave a space tidy.

Example: Please clean away the empty plates from the dining table.

Clean around

Definition: To wash or tidy the space near an object without moving the object itself.

Example: Don't worry about moving the heavy cabinet; just clean around it.

Clean down

Definition: To wash an entire surface, usually from top to bottom.

Example: We need to clean down the walls before we start painting.

Clean off

Definition: To remove dirt, marks, or a substance from a surface.

Example: Make sure to clean the mud off your boots before coming inside.

Clean out

Definition 1: To empty and clean the inside of a space (like a room, cupboard, or box), usually by throwing away unwanted items.

Example: I spent my Saturday cleaning out the garage.

Definition 2 (Informal): To use or take all of someone's money.

Example: Paying for those car repairs completely cleaned me out.

Definition 3: To steal everything of value from a place.

Example: The thieves cleaned out the safe during the night.

Clean up

Definition 1: To make a place or a person completely clean and tidy.

Example: We need to clean up the living room before our guests arrive.

Definition 2 (Informal): To make a large profit or a lot of money quickly.

Example: The retail company cleaned up during the holiday sales.

Definition 3: To stop crime, corruption, or bad behavior in a specific organization or area.

Example: The new mayor promised to clean up the city center.

Clean up after (Uses "up" and "after")

Definition: To remove the mess or dirt created by someone or something else.

Example: I am constantly cleaning up after my new puppy.
===
for each ["count", "clean"]:
1) Create the link on list page with particals mentioned above phrasal verbs. 
   Take as the base "take" link.
2) Create the page with mentioned above phrasal verbs. 
   Take as the base "take" page.
3) Cover the functionality with tests
---

## 2026-06-09T11:29:47Z
Complete one by one the backlog task-13, task-14. after completion each task make /compact Claude code command.
---

## 2026-06-09T11:42:56Z
Complete the backlog task-14. after completion run /compact Claude code command.
---

## 2026-06-09T14:14:39Z
Complete the backlog task-15. after completion run /compact Claude code command.
---

## 2026-06-09T14:22:23Z
Complete the backlog task-16. After completion run /compact Claude code command.
---

## 2026-06-09T14:31:24Z
Create a backlog.md tasks the same way as task-13 and task-14 (but don't execute it) to solve the described problems:


---
Deal with
This is the most common phrasal verb using "deal" and has several distinct meanings.

Meaning 1: To take action to solve a problem or complete a task.

Example: I have a lot of emails to deal with this morning.

Meaning 2: To do business with someone or an organization.

Example: Our company only deals with local suppliers to reduce shipping costs.

Meaning 3: To be about a specific subject.

Example: This training course deals with effective management techniques.

Meaning 4: To manage or handle difficult emotions or situations.

Example: It can be hard to deal with stress when you have a tight deadline.

Deal in
Meaning 1: To buy and sell specific products as a business.

Example: His store deals in rare books and antique maps.

Meaning 2: To include someone in an activity, especially a card game.

Example: We are going to start the next game of poker. Deal me in!

Deal out
Meaning 1: To distribute or share things among a group of people.

Example: The manager dealt out the new project assignments to the team.

Meaning 2: To give a punishment to someone.

Example: The judge dealt out a very harsh sentence for the crime.

Deal away
Meaning 1: To give something away in a trade or negotiation, often losing a valuable asset.

Example: The company dealt away its most profitable division to pay off debts.

Deal into
Meaning 1: To physically or metaphorically include someone in a group or game (Very similar to "deal in").

Example: Pull up a chair and we will deal you into the game.

Deal around / round
Meaning 1: To give a share of something to everyone present in a circle or group.

Example: Please deal the documents around so everyone has a copy.

Deal to (Regional: Australia / New Zealand)
Meaning 1: To punish someone, attack someone, or take strong action to fix a problem.

Example: If the server keeps crashing, the IT department will have to deal to it.

Deal by (Formal / Old-fashioned)
Meaning 1: To treat someone in a particular way.

Example: She always felt that she had been dealt by unfairly in the promotion process.
---
Do up
To fasten or tie: (clothes, shoelaces, seatbelts).

Example: It is very cold outside, so make sure to do up your coat.

To repair, decorate, or renovate: (a building or room).

Example: They bought an old, ruined house to do it up and sell it for a profit.

To wrap: (a parcel or gift).

Example: I need to do up this present with a nice red ribbon.

Do down
To criticize someone unfairly: (making them or yourself seem less successful or important).

Example: Stop doing yourself down; you gave an excellent presentation today.

To cheat someone: (usually in a business deal).

Example: The mechanic tried to do me down on the cost of the car repairs.

Do in
To make someone extremely tired: (exhaust).

Example: That 10-kilometer run really did me in.

To injure a body part:

Example: I did my back in while moving that heavy sofa.

To kill or murder: (informal).

Example: The gang threatened to do him in if he went to the police.

Do into
To translate a piece of text into another language: (formal and slightly old-fashioned).

Example: The ancient poem was done into English by a famous scholar.

Do out / Do out of
To clean or decorate a room thoroughly: (usually "do out").

Example: I need to do out the kitchen cupboards this weekend; they are so messy.

To cheat someone in order to take something from them: (usually "do someone out of something").

Example: He lied on the contract to do his business partner out of his share of the money.

Do away (with)
To abolish, get rid of, or stop using something:

Example: Many companies are trying to do away with paper receipts.

To kill someone or an animal: (informal).

Example: The villain in the movie planned to do away with the king.

Do for
To severely damage, ruin, or kill: (usually used in the passive as "be done for").

Example: If the manager catches us sleeping at our desks, we are done for.

Do by
To treat someone in a particular way: (almost always used in the phrase "do right by" or "do well by" someone).

Example: As a leader, you must always try to do right by your team members.

Do with
To need or want something: (always used with "could" or "can").

Example: I could really do with a hot cup of coffee right now.

To have a connection or relationship with: (often used as "have something/nothing to do with").

Example: The software bug has nothing to do with the recent system update.

Do without
To manage to survive or continue even when you do not have something you need.

Example: We have no milk left for the coffee, so we will just have to do without.

Do over
To do something again because it was wrong the first time: (mainly US English).

Example: This financial report is full of mistakes; you need to do it over.

To attack and beat someone up: (UK informal).

Example: He got done over by a group of angry football fans.

To burgle or rob a place: (UK informal).

Example: Their apartment was done over while they were on holiday.

Do about
To take action to fix a problem:

Example: The project deadline is at risk; what are we going to do about it?

Do to
To treat someone in a certain way, usually causing harm, damage, or change:

Example: I can't believe what the hairdresser did to my hair!
---
1. Dress up
This is the most common phrasal verb with "dress" and has three main meanings.

Meaning 1: To wear formal, elegant, or special clothes, usually for an event.

Example: We are going to a fancy restaurant tonight, so we need to dress up.

Meaning 2: To put on a costume to look like someone or something else (like for a party or Halloween).

Example: The children decided to dress up as pirates and princesses.

Meaning 3: To make something look more attractive, interesting, or better than it really is.

Example: You can dress up a plain soup by adding some fresh herbs and cream.

2. Dress down
This is the direct opposite of "dress up" in its first meaning, but it also has a completely different professional meaning.

Meaning 1: To wear clothes that are more informal or casual than what you usually wear.

Example: My company allows us to dress down on Fridays and wear jeans.

Meaning 2: To strongly criticize or scold someone because they did something wrong.

Example: The manager dressed down the team for missing the important deadline.

3. Dress out
This phrasal verb is mostly used in two specific situations: sports and hunting/farming.

Meaning 1: To put on a sports uniform or equipment to get ready to play in a game.

Example: Only twenty players will dress out for the football game this weekend.

Meaning 2: To clean and prepare an animal's body so the meat can be eaten or sold.

Example: It took the hunters a few hours to dress out the deer they caught.

4. Specialized Military Phrasal Verbs (Dress off / back / on / by)
In military or marching band contexts, "dress" means to form a perfectly straight line. These particles are used to give marching orders.

Dress on / Dress by / Dress off: To use a specific person or point as a guide to form a straight line.

Example: The captain ordered the soldiers to dress on the center guide.

Example: The marching band had to dress by the right.

Dress back: To step backward in order to form a straight line.

Example: The front row had to dress back to give the others more space.
---
1. Drop off
Meaning 1: To take someone or something to a place and leave them there.

Example: I will drop off the management report at your office tomorrow.

Meaning 2: To decrease in level, amount, or quality.

Example: Software sales usually drop off during the summer holidays.

Meaning 3: To fall asleep.

Example: The presentation was so boring that a few people dropped off.

2. Drop on
Meaning 1: (Mainly UK, Informal) To criticize or punish someone suddenly.

Example: The boss dropped on the development team for missing the deadline.

Meaning 2: (Informal) To accidentally meet someone or find something.

Example: We dropped on a great solution for the Java bug.

3. Drop down
Meaning 1: To fall or move to a lower position.

Example: Please select your country from the drop-down menu in the application.

4. Drop in
Meaning 1: To make a short, informal visit without arranging it in advance.

Example: Feel free to drop in if you have any questions about the new code.

5. Drop into
Meaning 1: To visit a place briefly.

Example: I will drop into the IT department to pick up my new laptop.

Meaning 2: To accidentally fall into a habit or state.

Example: It is easy to drop into bad coding habits if you don't do code reviews.

6. Drop out
Meaning 1: To stop participating or being involved in something.

Example: One of our main investors dropped out of the project.

Meaning 2: To leave a school, college, or course before finishing.

Example: He dropped out of his business degree to start his own company.

7. Drop away
Meaning 1: To become weaker, smaller, or gradually disappear.

Example: Public interest in the old software version slowly dropped away.

8. Drop across
Meaning 1: (Very rare / Old-fashioned) To happen to find or meet. (Note: Today, native speakers almost always use "come across" instead).

Example: I dropped across an old project file on the server.

9. Drop back
Meaning 1: To return to a lower position or level.

Example: Our company's market share dropped back to second place this quarter.

Meaning 2: To move into a position behind someone else (like in a race).

Example: The runner dropped back because he was exhausted.

10. Drop by
Meaning 1: To make a short, informal visit (similar to "drop in").

Example: Please drop by my desk later so we can discuss the leadership training.

11. Drop over
Meaning 1: To visit someone informally at their location (often their home).

Example: Why don't you drop over later to review the Java architecture together?

12. Drop behind
Meaning 1: To fail to keep up with others; to fall behind a schedule.

Example: We have dropped behind schedule on the latest software release.

13. Drop through
Meaning 1: To fail to happen or fail to be completed. (Note: "Fall through" is much more common, but "drop through" is sometimes used).

Example: The business merger dropped through at the last minute.

14. Drop around / Drop round
Meaning 1: To visit someone informally.

Example: I will drop round the office tomorrow to sign the final contracts.

15. Drop to
Meaning 1: To decrease to a specific level or amount.

Example: The server response time dropped to 50 milliseconds after the update.
===
for each ["deal", "do", "dress", "drop"]:
1) Create the link on list page with particals mentioned above phrasal verbs. 
   Take as the base "take" link.
2) Create the page with mentioned above phrasal verbs. 
   Take as the base "take" page.
3) Cover the functionality with tests
---

## 2026-06-09T14:34:50Z
git add all changes and commit them with suitable message
---

## 2026-06-09T14:36:59Z
Complete the backlog task-17. After completion run /compact Claude code command.
---

## 2026-06-09T14:46:15Z
Complete the backlog task-18. After completion run /compact Claude code command.
---

## 2026-06-09T14:53:31Z
Complete the backlog task-19. After completion run /compact Claude code command.
---

## 2026-06-09T15:08:38Z
Complete the backlog task-20. After completion run /compact Claude code command.
---

## 2026-06-09T15:17:18Z
Complete the backlog task-201. After completion run /compact Claude code command.
---

## 2026-06-09T15:17:24Z
Complete the backlog task-21. After completion run /compact Claude code command.
---
