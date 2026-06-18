import { fireEvent, screen, within } from '@testing-library/react';
import { expandSection, getCard, getSection, renderPage } from './helpers';
import { describeChevronAndColour, describeDefaultImageCards, describeSectionToggle } from '../verbPage/sharedSectionTests';

const LABEL = 'GetVerbPage';

beforeEach(() => {
  localStorage.clear();
});

// --- about_around ---

describeSectionToggle(LABEL, 'about / around', 'getAboutAround_section_expanded', /To travel to different places/i, renderPage);

describeChevronAndColour(LABEL, 'about / around', renderPage);

describe('GetVerbPage — "about / around" section definitions', () => {
  it('all 4 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('about / around');
    expect(screen.getByText(/To travel to different places/i)).toHaveClass('truncate');
    expect(screen.getByText(/To find a way to avoid a rule/i)).toHaveClass('truncate');
    expect(screen.getByText(/To spread \(usually news or rumors\)/i)).toHaveClass('truncate');
    expect(screen.getByText(/To finally do something you have delayed/i)).toHaveClass('truncate');
  });

  it('all 4 title attributes contain the full definition text', () => {
    renderPage();
    expandSection('about / around');
    expect(screen.getByText(/To travel to different places/i)).toHaveAttribute('title', 'To travel to different places');
    expect(screen.getByText(/To find a way to avoid a rule/i)).toHaveAttribute('title', 'To find a way to avoid a rule or solve a problem');
    expect(screen.getByText(/To spread \(usually news or rumors\)/i)).toHaveAttribute('title', 'To spread (usually news or rumors)');
    expect(screen.getByText(/To finally do something you have delayed/i)).toHaveAttribute(
      'title',
      'To finally do something you have delayed doing (often "get around to")'
    );
  });
});

describe('GetVerbPage — "about / around" card expand / collapse', () => {
  it('cards start collapsed (no examples visible)', () => {
    renderPage();
    expect(screen.queryByText(/"We used the subway to get around the city\."/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/"The programmers found a clever way/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/"Word gets around fast in this office\."/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/"I will get around to updating my resume/i)).not.toBeInTheDocument();
  });

  it('all 4 example sentences visible without expanding cards', () => {
    renderPage();
    expandSection('about / around');
    expect(screen.getByText(/"We used the subway to get around the city\."/i)).toBeInTheDocument();
    expect(screen.getByText(/"The programmers found a clever way to get around the security block\."/i)).toBeInTheDocument();
    expect(screen.getByText(/"Word gets around fast in this office\."/i)).toBeInTheDocument();
    expect(screen.getByText(/"I will get around to updating my resume this weekend\."/i)).toBeInTheDocument();
  });
});

describeDefaultImageCards(LABEL, 'about / around', 'getAboutAround', /To travel to different places/i, /"We used the subway/i, renderPage, getCard);

// --- across ---

describeSectionToggle(LABEL, 'across', 'getAcross_section_expanded', /To communicate an idea successfully/i, renderPage);

describeChevronAndColour(LABEL, 'across', renderPage);

describe('GetVerbPage — "across" section definitions', () => {
  it('all 2 "across" definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('across');
    expect(screen.getByText(/To communicate an idea successfully/i)).toHaveClass('truncate');
    expect(screen.getByText(/To physically cross a road/i)).toHaveClass('truncate');
  });

  it('all 2 "across" title attributes contain the full definition text', () => {
    renderPage();
    expandSection('across');
    expect(screen.getByText(/To communicate an idea successfully/i)).toHaveAttribute(
      'title',
      'To communicate an idea successfully so people understand it'
    );
    expect(screen.getByText(/To physically cross a road/i)).toHaveAttribute(
      'title',
      'To physically cross a road, river, or space'
    );
  });
});

describe('GetVerbPage — "across" card expand / collapse', () => {
  it('"across" cards start collapsed (no examples visible)', () => {
    renderPage();
    expect(screen.queryByText(/"The leader got her vision across/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/"We need to get across the street\."/i)).not.toBeInTheDocument();
  });

  it('all 2 "across" example sentences visible without expanding cards', () => {
    renderPage();
    expandSection('across');
    expect(screen.getByText(/"The leader got her vision across perfectly during the presentation\."/i)).toBeInTheDocument();
    expect(screen.getByText(/"We need to get across the street\."/i)).toBeInTheDocument();
  });
});

describeDefaultImageCards(LABEL, 'across', 'getAcross', /To communicate an idea successfully/i, /"The leader got her vision across/i, renderPage, getCard);

// --- after ---

describeSectionToggle(LABEL, 'after', 'getAfter_section_expanded', /To urge, remind, or scold someone/i, renderPage);

describeChevronAndColour(LABEL, 'after', renderPage);

describe('GetVerbPage — "after" section definitions', () => {
  it('all 2 "after" definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('after');
    expect(screen.getByText(/To urge, remind, or scold someone/i)).toHaveClass('truncate');
    expect(screen.getByText(/To chase someone or something/i)).toHaveClass('truncate');
  });

  it('all 2 "after" title attributes contain the full definition text', () => {
    renderPage();
    expandSection('after');
    expect(screen.getByText(/To urge, remind, or scold someone/i)).toHaveAttribute(
      'title',
      'To urge, remind, or scold someone to do something they are supposed to do'
    );
    expect(screen.getByText(/To chase someone or something/i)).toHaveAttribute(
      'title',
      'To chase someone or something'
    );
  });
});

describe('GetVerbPage — "after" card expand / collapse', () => {
  it('"after" cards start collapsed (no examples visible)', () => {
    renderPage();
    expect(screen.queryByText(/"I need to get after the developers/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/"The dog got after the cat\."/i)).not.toBeInTheDocument();
  });

  it('all 2 "after" example sentences visible without expanding cards', () => {
    renderPage();
    expandSection('after');
    expect(screen.getByText(/"I need to get after the developers to finish writing the code\."/i)).toBeInTheDocument();
    expect(screen.getByText(/"The dog got after the cat\."/i)).toBeInTheDocument();
  });
});

describeDefaultImageCards(LABEL, 'after', 'getAfter', /To urge, remind, or scold someone/i, /"I need to get after the developers/i, renderPage, getCard);

// --- ahead ---

describeSectionToggle(LABEL, 'ahead', 'getAhead_section_expanded', /To be successful and make progress/i, renderPage);

describeChevronAndColour(LABEL, 'ahead', renderPage);

describe('GetVerbPage — "ahead" section definitions', () => {
  it('"ahead" definition paragraph has truncate class', () => {
    renderPage();
    expandSection('ahead');
    expect(screen.getByText(/To be successful and make progress/i)).toHaveClass('truncate');
  });

  it('"ahead" title attribute contains the full definition text', () => {
    renderPage();
    expandSection('ahead');
    expect(screen.getByText(/To be successful and make progress/i)).toHaveAttribute(
      'title',
      'To be successful and make progress in your career or life'
    );
  });
});

describe('GetVerbPage — "ahead" card', () => {
  it('"ahead" card starts collapsed (no example visible before expand)', () => {
    renderPage();
    expect(screen.queryByText(/"She reads a lot of business books/i)).not.toBeInTheDocument();
  });

  it('"ahead" example visible without expanding card', () => {
    renderPage();
    expandSection('ahead');
    expect(screen.getByText(/"She reads a lot of business books because she wants to get ahead in her career\."/i)).toBeInTheDocument();
  });
});

describeDefaultImageCards(LABEL, 'ahead', 'getAhead', /To be successful and make progress/i, /"She reads a lot of business books/i, renderPage, getCard);

// --- away ---

describeSectionToggle(LABEL, 'away', 'getAway_section_expanded', /To escape/i, renderPage);

describeChevronAndColour(LABEL, 'away', renderPage);

describe('GetVerbPage — "away" section definitions', () => {
  it('all 3 "away" definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To escape/i)).toHaveClass('truncate');
    expect(screen.getByText(/To go on a holiday or take a break/i)).toHaveClass('truncate');
    expect(screen.getByText(/To do something wrong without being punished/i)).toHaveClass('truncate');
  });

  it('all 3 "away" title attributes contain the full definition text', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To escape/i)).toHaveAttribute('title', 'To escape');
    expect(screen.getByText(/To go on a holiday or take a break/i)).toHaveAttribute('title', 'To go on a holiday or take a break');
    expect(screen.getByText(/To do something wrong without being punished/i)).toHaveAttribute(
      'title',
      'To do something wrong without being punished (often "get away with")'
    );
  });
});

describe('GetVerbPage — "away" card expand / collapse', () => {
  it('"away" cards start collapsed (no examples visible)', () => {
    renderPage();
    expect(screen.queryByText(/"The thief got away before the police arrived\."/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/"We are hoping to get away to the mountains/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/"He lied about his sales numbers/i)).not.toBeInTheDocument();
  });

  it('all 3 "away" example sentences visible without expanding cards', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/"The thief got away before the police arrived\."/i)).toBeInTheDocument();
    expect(screen.getByText(/"We are hoping to get away to the mountains for the weekend\."/i)).toBeInTheDocument();
    expect(screen.getByText(/"He lied about his sales numbers, but he won't get away with it\."/i)).toBeInTheDocument();
  });
});

describeDefaultImageCards(LABEL, 'away', 'getAway', /To escape/i, /"The thief got away/i, renderPage, getCard);

// --- back ---

describeSectionToggle(LABEL, 'back', 'getBack_section_expanded', /To return to a place or a state/i, renderPage);

describeChevronAndColour(LABEL, 'back', renderPage);

describe('GetVerbPage — "back" section definitions', () => {
  it('all 4 "back" definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To return to a place or a state/i)).toHaveClass('truncate');
    expect(screen.getByText(/To have something returned to you/i)).toHaveClass('truncate');
    expect(screen.getByText(/To return to a previous activity/i)).toHaveClass('truncate');
    expect(screen.getByText(/To take revenge on someone/i)).toHaveClass('truncate');
  });

  it('all 4 "back" title attributes contain the full definition text', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To return to a place or a state/i)).toHaveAttribute('title', 'To return to a place or a state');
    expect(screen.getByText(/To have something returned to you/i)).toHaveAttribute('title', 'To have something returned to you');
    expect(screen.getByText(/To return to a previous activity/i)).toHaveAttribute('title', 'To return to a previous activity (often "get back to")');
    expect(screen.getByText(/To take revenge on someone/i)).toHaveAttribute('title', 'To take revenge on someone (often "get back at")');
  });
});

describe('GetVerbPage — "back" card expand / collapse', () => {
  it('"back" cards start collapsed (no examples visible)', () => {
    renderPage();
    expect(screen.queryByText(/"When did you get back from your business trip\?"/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/"I finally got my laptop back/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/"I'll answer that question later/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/"She wants to get back at her competitor/i)).not.toBeInTheDocument();
  });

  it('all 4 "back" example sentences visible without expanding cards', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/"When did you get back from your business trip\?"/i)).toBeInTheDocument();
    expect(screen.getByText(/"I finally got my laptop back from the IT department\."/i)).toBeInTheDocument();
    expect(screen.getByText(/"I'll answer that question later; let's get back to the main topic\."/i)).toBeInTheDocument();
    expect(screen.getByText(/"She wants to get back at her competitor by launching a better product\."/i)).toBeInTheDocument();
  });
});

describeDefaultImageCards(LABEL, 'back', 'getBack', /To return to a place or a state/i, /"When did you get back/i, renderPage, getCard);

// --- behind ---

describeSectionToggle(LABEL, 'behind', 'getBehind_section_expanded', /To fall behind schedule/i, renderPage);

describeChevronAndColour(LABEL, 'behind', renderPage);

describe('GetVerbPage — "behind" section definitions', () => {
  it('all 2 "behind" definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('behind');
    expect(screen.getByText(/To fall behind schedule/i)).toHaveClass('truncate');
    expect(screen.getByText(/To support a person, idea, or project/i)).toHaveClass('truncate');
  });

  it('all 2 "behind" title attributes contain the full definition text', () => {
    renderPage();
    expandSection('behind');
    expect(screen.getByText(/To fall behind schedule/i)).toHaveAttribute(
      'title',
      'To fall behind schedule or fail to keep up with work or payments'
    );
    expect(screen.getByText(/To support a person, idea, or project/i)).toHaveAttribute(
      'title',
      'To support a person, idea, or project'
    );
  });
});

describe('GetVerbPage — "behind" card expand / collapse', () => {
  it('"behind" cards start collapsed (no examples visible)', () => {
    renderPage();
    expect(screen.queryByText(/"I was sick for a week, and I got behind/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/"The whole team got behind the new manager/i)).not.toBeInTheDocument();
  });

  it('all 2 "behind" example sentences visible without expanding cards', () => {
    renderPage();
    expandSection('behind');
    expect(screen.getByText(/"I was sick for a week, and I got behind on my emails\."/i)).toBeInTheDocument();
    expect(screen.getByText(/"The whole team got behind the new manager's plan\."/i)).toBeInTheDocument();
  });
});

describeDefaultImageCards(LABEL, 'behind', 'getBehind', /To fall behind schedule/i, /"I was sick for a week/i, renderPage, getCard);

// --- by ---

describeSectionToggle(LABEL, 'by', 'getBy_section_expanded', /To manage to survive or do something with limited/i, renderPage);

describeChevronAndColour(LABEL, 'by', renderPage);

describe('GetVerbPage — "by" section definitions', () => {
  it('all 2 "by" definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('by');
    expect(screen.getByText(/To manage to survive or do something with limited/i)).toHaveClass('truncate');
    expect(screen.getByText(/To physically move past someone/i)).toHaveClass('truncate');
  });

  it('all 2 "by" title attributes contain the full definition text', () => {
    renderPage();
    expandSection('by');
    expect(screen.getByText(/To manage to survive or do something with limited/i)).toHaveAttribute(
      'title',
      'To manage to survive or do something with limited money, knowledge, or resources'
    );
    expect(screen.getByText(/To physically move past someone/i)).toHaveAttribute(
      'title',
      'To physically move past someone'
    );
  });
});

describe('GetVerbPage — "by" card expand / collapse', () => {
  it('"by" cards start collapsed (no examples visible)', () => {
    renderPage();
    expect(screen.queryByText(/"My Spanish isn't perfect/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/"Excuse me, could you move a little/i)).not.toBeInTheDocument();
  });

  it('all 2 "by" example sentences visible without expanding cards', () => {
    renderPage();
    expandSection('by');
    expect(screen.getByText(/"My Spanish isn't perfect, but I know enough to get by\."/i)).toBeInTheDocument();
    expect(screen.getByText(/"Excuse me, could you move a little so I can get by\?"/i)).toBeInTheDocument();
  });
});

describeDefaultImageCards(LABEL, 'by', 'getBy', /To manage to survive or do something with limited/i, /"My Spanish isn't perfect/i, renderPage, getCard);

// --- down ---

describeSectionToggle(LABEL, 'down', 'getDown_section_expanded', /To move to a lower position/i, renderPage);

describe(`${LABEL} — "down" section independence`, () => {
  it('collapsing "down" section does not affect "off", "on", or "up" sections', () => {
    renderPage();
    expandSection('off');
    expandSection('on');
    expandSection('up');
    expandSection('down');
    fireEvent.click(screen.getByText('down'));
    expect(screen.getByText(/To leave a form of public transport/i)).toBeInTheDocument();
    expect(screen.getByText(/To step onto a form of public transport/i)).toBeInTheDocument();
    expect(screen.getByText(/To rise from bed after sleeping/i)).toBeInTheDocument();
  });
});

describeChevronAndColour(LABEL, 'down', renderPage);

describe('GetVerbPage — "down" section definitions', () => {
  it('all 4 "down" definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To move to a lower position/i)).toHaveClass('truncate');
    expect(screen.getByText(/To make someone feel sad or depressed/i)).toHaveClass('truncate');
    expect(screen.getByText(/To write something/i)).toHaveClass('truncate');
    expect(screen.getByText(/To start focusing on a task seriously/i)).toHaveClass('truncate');
  });

  it('all 4 "down" title attributes contain the full definition text', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To move to a lower position/i)).toHaveAttribute('title', 'To move to a lower position');
    expect(screen.getByText(/To make someone feel sad or depressed/i)).toHaveAttribute('title', 'To make someone feel sad or depressed');
    expect(screen.getByText(/To write something/i)).toHaveAttribute('title', 'To write something');
    expect(screen.getByText(/To start focusing on a task seriously/i)).toHaveAttribute('title', 'To start focusing on a task seriously (often "get down to")');
  });
});

describe('GetVerbPage — "down" card expand / collapse', () => {
  it('"down" cards start collapsed (no examples visible)', () => {
    renderPage();
    expect(screen.queryByText(/"You need to get down from that ladder before you fall\."/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/"This rainy weather is really getting me down\."/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/"Let me get your contact details down in my notebook\."/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/"Enough small talk; let's get down to business\."/i)).not.toBeInTheDocument();
  });

  it('expands a "down" card when clicked', () => {
    renderPage();
    expandSection('down');
    fireEvent.click(getCard(/To move to a lower position/i));
    expect(screen.getByText(/"You need to get down from that ladder before you fall\."/i)).toBeInTheDocument();
  });

  it('renders all 4 "down" example sentences when all cards are expanded', () => {
    renderPage();
    expandSection('down');
    fireEvent.click(getCard(/To move to a lower position/i));
    fireEvent.click(getCard(/To make someone feel sad or depressed/i));
    fireEvent.click(getCard(/To write something/i));
    fireEvent.click(getCard(/To start focusing on a task seriously/i));
    expect(screen.getByText(/"You need to get down from that ladder before you fall\."/i)).toBeInTheDocument();
    expect(screen.getByText(/"This rainy weather is really getting me down\."/i)).toBeInTheDocument();
    expect(screen.getByText(/"Let me get your contact details down in my notebook\."/i)).toBeInTheDocument();
    expect(screen.getByText(/"Enough small talk; let's get down to business\."/i)).toBeInTheDocument();
  });
});

describe('GetVerbPage — "down" collapsed card view', () => {
  it('collapsed card shows example sentence', () => {
    renderPage();
    expandSection('down');
    const card = getCard(/To move to a lower position/i);
    expect(within(card).getByText(/"You need to get down from that ladder/i)).toBeInTheDocument();
  });

  it('collapsed card example has truncate class', () => {
    renderPage();
    expandSection('down');
    const card = getCard(/To move to a lower position/i);
    expect(within(card).getByText(/"You need to get down from that ladder/i)).toHaveClass('truncate');
  });

  it('collapsed card example has title attribute with quoted text', () => {
    renderPage();
    expandSection('down');
    const card = getCard(/To move to a lower position/i);
    expect(within(card).getByText(/"You need to get down from that ladder/i)).toHaveAttribute(
      'title',
      '"You need to get down from that ladder before you fall."'
    );
  });

  it('expanded card example does not have truncate class', () => {
    renderPage();
    expandSection('down');
    fireEvent.click(getCard(/To move to a lower position/i));
    const card = getCard(/To move to a lower position/i);
    expect(within(card).getByText(/"You need to get down from that ladder/i)).not.toHaveClass('truncate');
  });
});

describe('GetVerbPage — "down" localStorage persistence', () => {
  it('saves "down" card expanded state to localStorage', () => {
    renderPage();
    expandSection('down');
    fireEvent.click(getCard(/To move to a lower position/i));
    expect(localStorage.getItem('getDown_meaning_1_collapsed')).toBe('false');
  });

  it('restores "down" card expanded state from localStorage on mount', () => {
    localStorage.setItem('getDown_section_expanded', 'true');
    localStorage.setItem('getDown_meaning_1_collapsed', 'false');
    renderPage();
    expect(screen.getByText(/"You need to get down from that ladder before you fall\."/i)).toBeInTheDocument();
  });
});

describe('GetVerbPage — "down" text selection does not toggle card', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('clicking card with text selected does not expand it', () => {
    vi.spyOn(window, 'getSelection').mockReturnValue({ toString: () => 'selected text' } as Selection);
    renderPage();
    expandSection('down');
    fireEvent.click(getCard(/To move to a lower position/i));
    expect(within(getCard(/To move to a lower position/i)).getByText(/"You need to get down from that ladder/i)).toHaveClass('truncate');
  });

  it('clicking expanded card with text selected does not collapse it', () => {
    renderPage();
    expandSection('down');
    fireEvent.click(getCard(/To move to a lower position/i));
    vi.spyOn(window, 'getSelection').mockReturnValue({ toString: () => 'selected text' } as Selection);
    fireEvent.click(getCard(/To move to a lower position/i));
    expect(within(getCard(/To move to a lower position/i)).getByText(/"You need to get down from that ladder/i)).not.toHaveClass('truncate');
  });

  it('clicking card with empty selection toggles normally', () => {
    vi.spyOn(window, 'getSelection').mockReturnValue({ toString: () => '' } as Selection);
    renderPage();
    expandSection('down');
    fireEvent.click(getCard(/To move to a lower position/i));
    expect(within(getCard(/To move to a lower position/i)).getByText(/"You need to get down from that ladder/i)).not.toHaveClass('truncate');
  });
});

// --- forward ---

describeSectionToggle(LABEL, 'forward', 'getForward_section_expanded', /To move to the front/i, renderPage);

describeChevronAndColour(LABEL, 'forward', renderPage);

describe('GetVerbPage — "forward" section definitions', () => {
  it('"forward" definition paragraph has truncate class', () => {
    renderPage();
    expandSection('forward');
    expect(screen.getByText(/To move to the front/i)).toHaveClass('truncate');
  });

  it('"forward" title attribute contains the full definition text', () => {
    renderPage();
    expandSection('forward');
    expect(screen.getByText(/To move to the front/i)).toHaveAttribute(
      'title',
      'To move to the front (often used in sports to describe attacking)'
    );
  });
});

describe('GetVerbPage — "forward" card', () => {
  it('"forward" card starts collapsed (no example visible before expand)', () => {
    renderPage();
    expect(screen.queryByText(/"The team's defenders need to get forward/i)).not.toBeInTheDocument();
  });

  it('"forward" example visible without expanding card', () => {
    renderPage();
    expandSection('forward');
    expect(screen.getByText(/"The team's defenders need to get forward to help score a goal\."/i)).toBeInTheDocument();
  });
});

describeDefaultImageCards(LABEL, 'forward', 'getForward', /To move to the front/i, /"The team's defenders/i, renderPage, getCard);

// --- general ---

describe('GetVerbPage — general', () => {
  it('renders "Get" heading', () => {
    renderPage();
    expect(screen.getByRole('heading', { name: 'Get' })).toBeInTheDocument();
  });

  it('does not render "4 meanings" subtitle', () => {
    renderPage();
    expect(screen.queryByText(/4 meanings/i)).not.toBeInTheDocument();
  });

  it('renders correct numbered badges across all 7 sections (off:4, on:4, up:3, down:4, in:4, into:3, out:4)', () => {
    renderPage();
    ['off', 'on', 'up', 'down', 'in', 'into', 'out'].forEach(p => fireEvent.click(screen.getByText(p)));
    expect(screen.getAllByText('1')).toHaveLength(7);
    expect(screen.getAllByText('2')).toHaveLength(7);
    expect(screen.getAllByText('3')).toHaveLength(7);
    expect(screen.getAllByText('4')).toHaveLength(5);
  });
});

// --- in ---

describeSectionToggle(LABEL, 'in', 'getIn_section_expanded', /To enter a car, room, or building/i, renderPage);

describe(`${LABEL} — "in" section independence`, () => {
  it('collapsing "in" section does not affect other sections', () => {
    renderPage();
    expandSection('off');
    expandSection('down');
    expandSection('in');
    fireEvent.click(screen.getByText('in'));
    expect(screen.getByText(/To leave a form of public transport/i)).toBeInTheDocument();
    expect(screen.getByText(/To move to a lower position/i)).toBeInTheDocument();
  });
});

describeChevronAndColour(LABEL, 'in', renderPage);

describe('GetVerbPage — "in" section definitions', () => {
  it('all 4 "in" definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To enter a car, room, or building/i)).toHaveClass('truncate');
    expect(screen.getByText(/To arrive \(usually a train, flight/i)).toHaveClass('truncate');
    expect(screen.getByText(/To be accepted into a school, club, or organization/i)).toHaveClass('truncate');
    expect(screen.getByText(/To submit something/i)).toHaveClass('truncate');
  });

  it('all 4 "in" title attributes contain the full definition text', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To enter a car, room, or building/i)).toHaveAttribute('title', 'To enter a car, room, or building');
    expect(screen.getByText(/To arrive \(usually a train, flight/i)).toHaveAttribute('title', 'To arrive (usually a train, flight, or arriving at home/work)');
    expect(screen.getByText(/To be accepted into a school, club, or organization/i)).toHaveAttribute('title', 'To be accepted into a school, club, or organization');
    expect(screen.getByText(/To submit something/i)).toHaveAttribute('title', 'To submit something');
  });
});

describe('GetVerbPage — "in" card expand / collapse', () => {
  it('"in" cards start collapsed (no examples visible)', () => {
    renderPage();
    expect(screen.queryByText(/"Get in the car, we are going to be late\."/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/"What time does your flight get in\?"/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/"She applied to a top university and she got in\."/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/"I need to get my expenses application in by Friday\."/i)).not.toBeInTheDocument();
  });

  it('expands an "in" card when clicked', () => {
    renderPage();
    expandSection('in');
    fireEvent.click(getCard(/To enter a car, room, or building/i));
    expect(screen.getByText(/"Get in the car, we are going to be late\."/i)).toBeInTheDocument();
  });

  it('renders all 4 "in" example sentences when all cards are expanded', () => {
    renderPage();
    expandSection('in');
    fireEvent.click(getCard(/To enter a car, room, or building/i));
    fireEvent.click(getCard(/To arrive \(usually a train, flight/i));
    fireEvent.click(getCard(/To be accepted into a school, club, or organization/i));
    fireEvent.click(getCard(/To submit something/i));
    expect(screen.getByText(/"Get in the car, we are going to be late\."/i)).toBeInTheDocument();
    expect(screen.getByText(/"What time does your flight get in\?"/i)).toBeInTheDocument();
    expect(screen.getByText(/"She applied to a top university and she got in\."/i)).toBeInTheDocument();
    expect(screen.getByText(/"I need to get my expenses application in by Friday\."/i)).toBeInTheDocument();
  });
});

describe('GetVerbPage — "in" collapsed card view', () => {
  it('collapsed card shows example sentence', () => {
    renderPage();
    expandSection('in');
    const card = getCard(/To enter a car, room, or building/i);
    expect(within(card).getByText(/"Get in the car/i)).toBeInTheDocument();
  });

  it('collapsed card example has truncate class', () => {
    renderPage();
    expandSection('in');
    const card = getCard(/To enter a car, room, or building/i);
    expect(within(card).getByText(/"Get in the car/i)).toHaveClass('truncate');
  });

  it('collapsed card example has title attribute with quoted text', () => {
    renderPage();
    expandSection('in');
    const card = getCard(/To enter a car, room, or building/i);
    expect(within(card).getByText(/"Get in the car/i)).toHaveAttribute(
      'title',
      '"Get in the car, we are going to be late."'
    );
  });

  it('expanded card example does not have truncate class', () => {
    renderPage();
    expandSection('in');
    fireEvent.click(getCard(/To enter a car, room, or building/i));
    const card = getCard(/To enter a car, room, or building/i);
    expect(within(card).getByText(/"Get in the car/i)).not.toHaveClass('truncate');
  });
});

describe('GetVerbPage — "in" localStorage persistence', () => {
  it('saves "in" card expanded state to localStorage', () => {
    renderPage();
    expandSection('in');
    fireEvent.click(getCard(/To enter a car, room, or building/i));
    expect(localStorage.getItem('getIn_meaning_1_collapsed')).toBe('false');
  });

  it('restores "in" card expanded state from localStorage on mount', () => {
    localStorage.setItem('getIn_section_expanded', 'true');
    localStorage.setItem('getIn_meaning_1_collapsed', 'false');
    renderPage();
    expect(screen.getByText(/"Get in the car, we are going to be late\."/i)).toBeInTheDocument();
  });
});

describe('GetVerbPage — "in" text selection does not toggle card', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('clicking card with text selected does not expand it', () => {
    vi.spyOn(window, 'getSelection').mockReturnValue({ toString: () => 'selected text' } as Selection);
    renderPage();
    expandSection('in');
    fireEvent.click(getCard(/To enter a car, room, or building/i));
    expect(within(getCard(/To enter a car, room, or building/i)).getByText(/"Get in the car/i)).toHaveClass('truncate');
  });

  it('clicking expanded card with text selected does not collapse it', () => {
    renderPage();
    expandSection('in');
    fireEvent.click(getCard(/To enter a car, room, or building/i));
    vi.spyOn(window, 'getSelection').mockReturnValue({ toString: () => 'selected text' } as Selection);
    fireEvent.click(getCard(/To enter a car, room, or building/i));
    expect(within(getCard(/To enter a car, room, or building/i)).getByText(/"Get in the car/i)).not.toHaveClass('truncate');
  });

  it('clicking card with empty selection toggles normally', () => {
    vi.spyOn(window, 'getSelection').mockReturnValue({ toString: () => '' } as Selection);
    renderPage();
    expandSection('in');
    fireEvent.click(getCard(/To enter a car, room, or building/i));
    expect(within(getCard(/To enter a car, room, or building/i)).getByText(/"Get in the car/i)).not.toHaveClass('truncate');
  });
});

// --- into ---

describeSectionToggle(LABEL, 'into', 'getInto_section_expanded', /To become interested or involved in something/i, renderPage);

describe(`${LABEL} — "into" section independence`, () => {
  it('collapsing "into" section does not affect other sections', () => {
    renderPage();
    expandSection('off');
    expandSection('in');
    expandSection('into');
    fireEvent.click(screen.getByText('into'));
    expect(screen.getByText(/To leave a form of public transport/i)).toBeInTheDocument();
    expect(screen.getByText(/To enter a car, room, or building/i)).toBeInTheDocument();
  });
});

describeChevronAndColour(LABEL, 'into', renderPage);

describe('GetVerbPage — "into" section definitions', () => {
  it('all 3 "into" definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/To become interested or involved in something/i)).toHaveClass('truncate');
    expect(screen.getByText(/To enter a specific state or situation/i)).toHaveClass('truncate');
    expect(screen.getByText(/To start a habit/i)).toHaveClass('truncate');
  });

  it('all 3 "into" title attributes contain the full definition text', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/To become interested or involved in something/i)).toHaveAttribute('title', 'To become interested or involved in something');
    expect(screen.getByText(/To enter a specific state or situation/i)).toHaveAttribute('title', 'To enter a specific state or situation');
    expect(screen.getByText(/To start a habit/i)).toHaveAttribute('title', 'To start a habit');
  });
});

describe('GetVerbPage — "into" card expand / collapse', () => {
  it('"into" cards start collapsed (no examples visible)', () => {
    renderPage();
    expect(screen.queryByText(/"I recently got into software development\."/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/"The company got into financial trouble last year\."/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/"I've got into the habit of checking my emails before breakfast\."/i)).not.toBeInTheDocument();
  });

  it('expands an "into" card when clicked', () => {
    renderPage();
    expandSection('into');
    fireEvent.click(getCard(/To become interested or involved in something/i));
    expect(screen.getByText(/"I recently got into software development\."/i)).toBeInTheDocument();
  });

  it('renders all 3 "into" example sentences when all cards are expanded', () => {
    renderPage();
    expandSection('into');
    fireEvent.click(getCard(/To become interested or involved in something/i));
    fireEvent.click(getCard(/To enter a specific state or situation/i));
    fireEvent.click(getCard(/To start a habit/i));
    expect(screen.getByText(/"I recently got into software development\."/i)).toBeInTheDocument();
    expect(screen.getByText(/"The company got into financial trouble last year\."/i)).toBeInTheDocument();
    expect(screen.getByText(/"I've got into the habit of checking my emails before breakfast\."/i)).toBeInTheDocument();
  });
});

describe('GetVerbPage — "into" collapsed card view', () => {
  it('collapsed card shows example sentence', () => {
    renderPage();
    expandSection('into');
    const card = getCard(/To become interested or involved in something/i);
    expect(within(card).getByText(/"I recently got into software development/i)).toBeInTheDocument();
  });

  it('collapsed card example has truncate class', () => {
    renderPage();
    expandSection('into');
    const card = getCard(/To become interested or involved in something/i);
    expect(within(card).getByText(/"I recently got into software development/i)).toHaveClass('truncate');
  });

  it('collapsed card example has title attribute with quoted text', () => {
    renderPage();
    expandSection('into');
    const card = getCard(/To become interested or involved in something/i);
    expect(within(card).getByText(/"I recently got into software development/i)).toHaveAttribute(
      'title',
      '"I recently got into software development."'
    );
  });

  it('expanded card example does not have truncate class', () => {
    renderPage();
    expandSection('into');
    fireEvent.click(getCard(/To become interested or involved in something/i));
    const card = getCard(/To become interested or involved in something/i);
    expect(within(card).getByText(/"I recently got into software development/i)).not.toHaveClass('truncate');
  });
});

describe('GetVerbPage — "into" localStorage persistence', () => {
  it('saves "into" card expanded state to localStorage', () => {
    renderPage();
    expandSection('into');
    fireEvent.click(getCard(/To become interested or involved in something/i));
    expect(localStorage.getItem('getInto_meaning_1_collapsed')).toBe('false');
  });

  it('restores "into" card expanded state from localStorage on mount', () => {
    localStorage.setItem('getInto_section_expanded', 'true');
    localStorage.setItem('getInto_meaning_1_collapsed', 'false');
    renderPage();
    expect(screen.getByText(/"I recently got into software development\."/i)).toBeInTheDocument();
  });
});

describe('GetVerbPage — "into" text selection does not toggle card', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('clicking card with text selected does not expand it', () => {
    vi.spyOn(window, 'getSelection').mockReturnValue({ toString: () => 'selected text' } as Selection);
    renderPage();
    expandSection('into');
    fireEvent.click(getCard(/To become interested or involved in something/i));
    expect(within(getCard(/To become interested or involved in something/i)).getByText(/"I recently got into software development/i)).toHaveClass('truncate');
  });

  it('clicking expanded card with text selected does not collapse it', () => {
    renderPage();
    expandSection('into');
    fireEvent.click(getCard(/To become interested or involved in something/i));
    vi.spyOn(window, 'getSelection').mockReturnValue({ toString: () => 'selected text' } as Selection);
    fireEvent.click(getCard(/To become interested or involved in something/i));
    expect(within(getCard(/To become interested or involved in something/i)).getByText(/"I recently got into software development/i)).not.toHaveClass('truncate');
  });

  it('clicking card with empty selection toggles normally', () => {
    vi.spyOn(window, 'getSelection').mockReturnValue({ toString: () => '' } as Selection);
    renderPage();
    expandSection('into');
    fireEvent.click(getCard(/To become interested or involved in something/i));
    expect(within(getCard(/To become interested or involved in something/i)).getByText(/"I recently got into software development/i)).not.toHaveClass('truncate');
  });
});

// --- off ---

describe('GetVerbPage — "off" section definitions', () => {
  it('renders definition for leaving transport', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To leave a form of public transport/i)).toBeInTheDocument();
  });

  it('renders definition for finishing work', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To finish work/i)).toBeInTheDocument();
  });

  it('renders definition for escaping punishment', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To escape punishment/i)).toBeInTheDocument();
  });

  it('renders definition for sending something', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To send something/i)).toBeInTheDocument();
  });

  it('all 4 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To leave a form of public transport/i)).toHaveClass('truncate');
    expect(screen.getByText(/To finish work/i)).toHaveClass('truncate');
    expect(screen.getByText(/To escape punishment/i)).toHaveClass('truncate');
    expect(screen.getByText(/To send something/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To leave a form of public transport/i)).toHaveAttribute(
      'title',
      'To leave a form of public transport (bus, train, plane)'
    );
  });

  it('all 4 title attributes contain the full definition text', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To leave a form of public transport/i)).toHaveAttribute(
      'title',
      'To leave a form of public transport (bus, train, plane)'
    );
    expect(screen.getByText(/To finish work/i)).toHaveAttribute('title', 'To finish work');
    expect(screen.getByText(/To escape punishment/i)).toHaveAttribute('title', 'To escape punishment');
    expect(screen.getByText(/To send something/i)).toHaveAttribute(
      'title',
      'To send something (like a letter or email)'
    );
  });

  it('hovering over a definition exposes the full text via title attribute', () => {
    renderPage();
    expandSection('off');
    const p = screen.getByText(/To leave a form of public transport/i);
    fireEvent.mouseEnter(p);
    expect(p).toHaveAttribute('title', 'To leave a form of public transport (bus, train, plane)');
  });

  it('title attribute is present on all definitions after mouse enters each one', () => {
    renderPage();
    expandSection('off');
    const defs = [
      { pattern: /To leave a form of public transport/i, full: 'To leave a form of public transport (bus, train, plane)' },
      { pattern: /To finish work/i, full: 'To finish work' },
      { pattern: /To escape punishment/i, full: 'To escape punishment' },
      { pattern: /To send something/i, full: 'To send something (like a letter or email)' },
    ];
    for (const { pattern, full } of defs) {
      const p = screen.getByText(pattern);
      fireEvent.mouseEnter(p);
      expect(p).toHaveAttribute('title', full);
    }
  });
});

describeSectionToggle(LABEL, 'off', 'getOff_section_expanded', /To leave a form of public transport/i, renderPage);

describeChevronAndColour(LABEL, 'off', renderPage);

describe('GetVerbPage — "off" card borders', () => {
  it('meaning card has dark border class for light theme', () => {
    renderPage();
    expandSection('off');
    expect(getCard(/To leave a form of public transport/i)).toHaveClass('border-gray-600');
  });

  it('meaning card has light border class for dark theme', () => {
    renderPage();
    expandSection('off');
    expect(getCard(/To leave a form of public transport/i)).toHaveClass('dark:border-gray-400');
  });

  it('all 4 cards have dark border class for light theme', () => {
    renderPage();
    expandSection('off');
    expect(getCard(/To leave a form of public transport/i)).toHaveClass('border-gray-600');
    expect(getCard(/To finish work/i)).toHaveClass('border-gray-600');
    expect(getCard(/To escape punishment/i)).toHaveClass('border-gray-600');
    expect(getCard(/To send something/i)).toHaveClass('border-gray-600');
  });

  it('all 4 cards have light border class for dark theme', () => {
    renderPage();
    expandSection('off');
    expect(getCard(/To leave a form of public transport/i)).toHaveClass('dark:border-gray-400');
    expect(getCard(/To finish work/i)).toHaveClass('dark:border-gray-400');
    expect(getCard(/To escape punishment/i)).toHaveClass('dark:border-gray-400');
    expect(getCard(/To send something/i)).toHaveClass('dark:border-gray-400');
  });
});

describe('GetVerbPage — "off" card expand / collapse', () => {
  it('starts all cards collapsed (no examples visible)', () => {
    renderPage();
    expect(screen.queryByText(/"We need to get off the train at the next station\."/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/"I usually get off work at 5:00 PM\."/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/"The manager made a huge mistake, but he got off with just a warning\."/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/"I will get this report off to the client before the end of the day\."/i)).not.toBeInTheDocument();
  });

  it('starts all cards collapsed (no images visible)', () => {
    renderPage();
    expect(screen.queryAllByRole('img')).toHaveLength(0);
  });

  it('expands a card when clicked', () => {
    renderPage();
    expandSection('off');
    fireEvent.click(getCard(/To leave a form of public transport/i));
    expect(screen.getByText(/"We need to get off the train at the next station\."/i)).toBeInTheDocument();
  });

  it('shows the image when a card is expanded', () => {
    renderPage();
    expandSection('off');
    fireEvent.click(getCard(/To leave a form of public transport/i));
    expect(screen.getAllByRole('img')).toHaveLength(1);
  });

  it('collapses an expanded card when clicked again', () => {
    renderPage();
    expandSection('off');
    const card = getCard(/To leave a form of public transport/i);
    fireEvent.click(card);
    fireEvent.click(card);
    expect(within(card).queryByRole('img')).not.toBeInTheDocument();
  });

  it('renders all 4 example sentences when all cards are expanded', () => {
    renderPage();
    expandSection('off');
    fireEvent.click(getCard(/To leave a form of public transport/i));
    fireEvent.click(getCard(/To finish work/i));
    fireEvent.click(getCard(/To escape punishment/i));
    fireEvent.click(getCard(/To send something/i));
    expect(screen.getByText(/"We need to get off the train at the next station\."/i)).toBeInTheDocument();
    expect(screen.getByText(/"I usually get off work at 5:00 PM\."/i)).toBeInTheDocument();
    expect(screen.getByText(/"The manager made a huge mistake, but he got off with just a warning\."/i)).toBeInTheDocument();
    expect(screen.getByText(/"I will get this report off to the client before the end of the day\."/i)).toBeInTheDocument();
  });

  it('renders 4 images when all cards are expanded', () => {
    renderPage();
    expandSection('off');
    fireEvent.click(getCard(/To leave a form of public transport/i));
    fireEvent.click(getCard(/To finish work/i));
    fireEvent.click(getCard(/To escape punishment/i));
    fireEvent.click(getCard(/To send something/i));
    expect(screen.getAllByRole('img')).toHaveLength(4);
  });
});

describe('GetVerbPage — "off" expanded card layout', () => {
  it('collapsed card definition has truncate class', () => {
    renderPage();
    expandSection('off');
    const card = getCard(/To leave a form of public transport/i);
    expect(within(card).getByText(/To leave a form of public transport/i)).toHaveClass('truncate');
  });

  it('expanded card definition does not have truncate class', () => {
    renderPage();
    expandSection('off');
    fireEvent.click(getCard(/To leave a form of public transport/i));
    const card = getCard(/To leave a form of public transport/i);
    expect(within(card).getByText(/To leave a form of public transport/i)).not.toHaveClass('truncate');
  });

  it('expanded card image appears before definition in DOM order', () => {
    renderPage();
    expandSection('off');
    fireEvent.click(getCard(/To leave a form of public transport/i));
    const card = getCard(/To leave a form of public transport/i);
    const img = within(card).getByRole('img');
    const def = within(card).getByText(/To leave a form of public transport/i);
    expect(img.compareDocumentPosition(def) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });

  it('expanded card definition appears before example in DOM order', () => {
    renderPage();
    expandSection('off');
    fireEvent.click(getCard(/To leave a form of public transport/i));
    const card = getCard(/To leave a form of public transport/i);
    const def = within(card).getByText(/To leave a form of public transport/i);
    const example = within(card).getByText(/"We need to get off the train/i);
    expect(def.compareDocumentPosition(example) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });

  it('collapsed card shows number badge', () => {
    renderPage();
    expandSection('off');
    const card = getCard(/To leave a form of public transport/i);
    expect(within(card).getByText('1')).toBeInTheDocument();
  });

  it('expanded card number badge appears after image in DOM order', () => {
    renderPage();
    expandSection('off');
    fireEvent.click(getCard(/To leave a form of public transport/i));
    const card = getCard(/To leave a form of public transport/i);
    const img = within(card).getByRole('img');
    const badge = within(card).getByText('1');
    expect(img.compareDocumentPosition(badge) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });

  it('collapsed card has no image', () => {
    renderPage();
    expandSection('off');
    const card = getCard(/To leave a form of public transport/i);
    expect(within(card).queryByRole('img')).not.toBeInTheDocument();
  });

  it('collapsed card shows example text truncated', () => {
    renderPage();
    expandSection('off');
    const card = getCard(/To leave a form of public transport/i);
    expect(within(card).getByText(/"We need to get off the train/i)).toBeInTheDocument();
    expect(within(card).getByText(/"We need to get off the train/i)).toHaveClass('truncate');
  });

  it('collapsed card example has title attribute with quoted text', () => {
    renderPage();
    expandSection('off');
    const card = getCard(/To leave a form of public transport/i);
    expect(within(card).getByText(/"We need to get off the train/i)).toHaveAttribute(
      'title',
      '"We need to get off the train at the next station."'
    );
  });

  it('expanded card example does not have truncate class', () => {
    renderPage();
    expandSection('off');
    fireEvent.click(getCard(/To leave a form of public transport/i));
    const card = getCard(/To leave a form of public transport/i);
    expect(within(card).getByText(/"We need to get off the train/i)).not.toHaveClass('truncate');
  });

  it('off card has cursor-pointer class (real image, expandable)', () => {
    renderPage();
    expandSection('off');
    const card = getCard(/To leave a form of public transport/i);
    expect(card).toHaveClass('cursor-pointer');
    expect(card).not.toHaveClass('cursor-default');
  });
});

describe('GetVerbPage — "off" localStorage persistence', () => {
  it('saves expanded state to localStorage when a card is expanded', () => {
    renderPage();
    expandSection('off');
    fireEvent.click(getCard(/To leave a form of public transport/i));
    expect(localStorage.getItem('getOff_meaning_1_collapsed')).toBe('false');
  });

  it('saves collapsed state to localStorage when a card is collapsed', () => {
    renderPage();
    expandSection('off');
    const card = getCard(/To leave a form of public transport/i);
    fireEvent.click(card);
    fireEvent.click(card);
    expect(localStorage.getItem('getOff_meaning_1_collapsed')).toBe('true');
  });

  it('restores expanded state from localStorage on mount', () => {
    localStorage.setItem('getOff_section_expanded', 'true');
    localStorage.setItem('getOff_meaning_1_collapsed', 'false');
    renderPage();
    expect(screen.getByText(/"We need to get off the train at the next station\."/i)).toBeInTheDocument();
  });

  it('keeps other cards collapsed when one is restored as expanded', () => {
    localStorage.setItem('getOff_section_expanded', 'true');
    localStorage.setItem('getOff_meaning_1_collapsed', 'false');
    renderPage();
    expect(within(getCard(/To finish work/i)).queryByRole('img')).not.toBeInTheDocument();
  });
});

describe('GetVerbPage — "off" text selection does not toggle card', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('clicking card with text selected does not expand it', () => {
    vi.spyOn(window, 'getSelection').mockReturnValue({ toString: () => 'selected text' } as Selection);
    renderPage();
    expandSection('off');
    fireEvent.click(getCard(/To leave a form of public transport/i));
    expect(within(getCard(/To leave a form of public transport/i)).getByText(/"We need to get off the train/i)).toHaveClass('truncate');
  });

  it('clicking expanded card with text selected does not collapse it', () => {
    renderPage();
    expandSection('off');
    fireEvent.click(getCard(/To leave a form of public transport/i));
    vi.spyOn(window, 'getSelection').mockReturnValue({ toString: () => 'selected text' } as Selection);
    fireEvent.click(getCard(/To leave a form of public transport/i));
    expect(within(getCard(/To leave a form of public transport/i)).getByText(/"We need to get off the train/i)).not.toHaveClass('truncate');
  });

  it('clicking card with empty selection toggles normally', () => {
    vi.spyOn(window, 'getSelection').mockReturnValue({ toString: () => '' } as Selection);
    renderPage();
    expandSection('off');
    fireEvent.click(getCard(/To leave a form of public transport/i));
    expect(within(getCard(/To leave a form of public transport/i)).getByText(/"We need to get off the train/i)).not.toHaveClass('truncate');
  });
});

// --- on ---

describeSectionToggle(LABEL, 'on', 'getOn_section_expanded', /To step onto a form of public transport/i, renderPage);

describe(`${LABEL} — "on" section independence`, () => {
  it('collapsing "on" section does not affect "off" section', () => {
    renderPage();
    expandSection('off');
    expandSection('on');
    fireEvent.click(screen.getByText('on'));
    expect(screen.getByText(/To leave a form of public transport/i)).toBeInTheDocument();
  });
  it('collapsing "off" section does not affect "on" section', () => {
    renderPage();
    expandSection('on');
    expandSection('off');
    fireEvent.click(screen.getByText('off'));
    expect(screen.getByText(/To step onto a form of public transport/i)).toBeInTheDocument();
  });
});

describeChevronAndColour(LABEL, 'on', renderPage);

describe('GetVerbPage — "on" section definitions', () => {
  it('all 4 "on" definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To step onto a form of public transport/i)).toHaveClass('truncate');
    expect(screen.getByText(/To make progress or handle a situation/i)).toHaveClass('truncate');
    expect(screen.getByText(/To have a good relationship/i)).toHaveClass('truncate');
    expect(screen.getByText(/To continue doing something/i)).toHaveClass('truncate');
  });

  it('all 4 "on" title attributes contain the full definition text', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To step onto a form of public transport/i)).toHaveAttribute(
      'title',
      'To step onto a form of public transport'
    );
    expect(screen.getByText(/To make progress or handle a situation/i)).toHaveAttribute(
      'title',
      'To make progress or handle a situation'
    );
    expect(screen.getByText(/To have a good relationship/i)).toHaveAttribute(
      'title',
      'To have a good relationship (often "get on with")'
    );
    expect(screen.getByText(/To continue doing something/i)).toHaveAttribute(
      'title',
      'To continue doing something'
    );
  });
});

describe('GetVerbPage — "on" card expand / collapse', () => {
  it('"on" cards start collapsed (no examples visible)', () => {
    renderPage();
    expect(screen.queryByText(/"Hurry up and get on the bus before it leaves!"/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/"How are you getting on with the new Java project\?"/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/"I get on very well with my team members\."/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/"Let's stop chatting and get on with the meeting\."/i)).not.toBeInTheDocument();
  });

  it('expands an "on" card when clicked', () => {
    renderPage();
    expandSection('on');
    fireEvent.click(getCard(/To step onto a form of public transport/i));
    expect(screen.getByText(/"Hurry up and get on the bus before it leaves!"/i)).toBeInTheDocument();
  });

  it('shows image when an "on" card is expanded', () => {
    renderPage();
    expandSection('on');
    fireEvent.click(getCard(/To step onto a form of public transport/i));
    expect(screen.getAllByRole('img')).toHaveLength(1);
  });

  it('renders all 4 "on" example sentences when all cards are expanded', () => {
    renderPage();
    expandSection('on');
    fireEvent.click(getCard(/To step onto a form of public transport/i));
    fireEvent.click(getCard(/To make progress or handle a situation/i));
    fireEvent.click(getCard(/To have a good relationship/i));
    fireEvent.click(getCard(/To continue doing something/i));
    expect(screen.getByText(/"Hurry up and get on the bus before it leaves!"/i)).toBeInTheDocument();
    expect(screen.getByText(/"How are you getting on with the new Java project\?"/i)).toBeInTheDocument();
    expect(screen.getByText(/"I get on very well with my team members\."/i)).toBeInTheDocument();
    expect(screen.getByText(/"Let's stop chatting and get on with the meeting\."/i)).toBeInTheDocument();
  });

  it('renders 4 images when all "on" cards are expanded', () => {
    renderPage();
    expandSection('on');
    fireEvent.click(getCard(/To step onto a form of public transport/i));
    fireEvent.click(getCard(/To make progress or handle a situation/i));
    fireEvent.click(getCard(/To have a good relationship/i));
    fireEvent.click(getCard(/To continue doing something/i));
    expect(screen.getAllByRole('img')).toHaveLength(4);
  });
});

describe('GetVerbPage — "on" collapsed card view', () => {
  it('collapsed card shows example sentence', () => {
    renderPage();
    expandSection('on');
    const card = getCard(/To step onto a form of public transport/i);
    expect(within(card).getByText(/"Hurry up and get on the bus/i)).toBeInTheDocument();
  });

  it('collapsed card example has truncate class', () => {
    renderPage();
    expandSection('on');
    const card = getCard(/To step onto a form of public transport/i);
    expect(within(card).getByText(/"Hurry up and get on the bus/i)).toHaveClass('truncate');
  });

  it('collapsed card example has title attribute with quoted text', () => {
    renderPage();
    expandSection('on');
    const card = getCard(/To step onto a form of public transport/i);
    expect(within(card).getByText(/"Hurry up and get on the bus/i)).toHaveAttribute(
      'title',
      '"Hurry up and get on the bus before it leaves!"'
    );
  });

  it('expanded card example does not have truncate class', () => {
    renderPage();
    expandSection('on');
    fireEvent.click(getCard(/To step onto a form of public transport/i));
    const card = getCard(/To step onto a form of public transport/i);
    expect(within(card).getByText(/"Hurry up and get on the bus/i)).not.toHaveClass('truncate');
  });
});

describe('GetVerbPage — "on" localStorage persistence', () => {
  it('saves "on" card expanded state to localStorage', () => {
    renderPage();
    expandSection('on');
    fireEvent.click(getCard(/To step onto a form of public transport/i));
    expect(localStorage.getItem('getOn_meaning_1_collapsed')).toBe('false');
  });

  it('restores "on" card expanded state from localStorage on mount', () => {
    localStorage.setItem('getOn_section_expanded', 'true');
    localStorage.setItem('getOn_meaning_1_collapsed', 'false');
    renderPage();
    expect(screen.getByText(/"Hurry up and get on the bus before it leaves!"/i)).toBeInTheDocument();
  });
});

describe('GetVerbPage — "on" text selection does not toggle card', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('clicking card with text selected does not expand it', () => {
    vi.spyOn(window, 'getSelection').mockReturnValue({ toString: () => 'selected text' } as Selection);
    renderPage();
    expandSection('on');
    fireEvent.click(getCard(/To step onto a form of public transport/i));
    expect(within(getCard(/To step onto a form of public transport/i)).getByText(/"Hurry up and get on the bus/i)).toHaveClass('truncate');
  });

  it('clicking expanded card with text selected does not collapse it', () => {
    renderPage();
    expandSection('on');
    fireEvent.click(getCard(/To step onto a form of public transport/i));
    vi.spyOn(window, 'getSelection').mockReturnValue({ toString: () => 'selected text' } as Selection);
    fireEvent.click(getCard(/To step onto a form of public transport/i));
    expect(within(getCard(/To step onto a form of public transport/i)).getByText(/"Hurry up and get on the bus/i)).not.toHaveClass('truncate');
  });

  it('clicking card with empty selection toggles normally', () => {
    vi.spyOn(window, 'getSelection').mockReturnValue({ toString: () => '' } as Selection);
    renderPage();
    expandSection('on');
    fireEvent.click(getCard(/To step onto a form of public transport/i));
    expect(within(getCard(/To step onto a form of public transport/i)).getByText(/"Hurry up and get on the bus/i)).not.toHaveClass('truncate');
  });
});

// --- out ---

describeSectionToggle(LABEL, 'out', 'getOut_section_expanded', /To leave a place or a car/i, renderPage);

describe(`${LABEL} — "out" section independence`, () => {
  it('collapsing "out" section does not affect other sections', () => {
    renderPage();
    expandSection('off');
    expandSection('into');
    expandSection('out');
    fireEvent.click(screen.getByText('out'));
    expect(screen.getByText(/To leave a form of public transport/i)).toBeInTheDocument();
    expect(screen.getByText(/To become interested or involved in something/i)).toBeInTheDocument();
  });
});

describeChevronAndColour(LABEL, 'out', renderPage);

describe('GetVerbPage — "out" section definitions', () => {
  it('all 4 "out" definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To leave a place or a car/i)).toHaveClass('truncate');
    expect(screen.getByText(/To become known/i)).toHaveClass('truncate');
    expect(screen.getByText(/To produce or publish something/i)).toHaveClass('truncate');
    expect(screen.getByText(/To avoid doing something you do not want to do/i)).toHaveClass('truncate');
  });

  it('all 4 "out" title attributes contain the full definition text', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To leave a place or a car/i)).toHaveAttribute('title', 'To leave a place or a car');
    expect(screen.getByText(/To become known/i)).toHaveAttribute('title', 'To become known (usually a secret or hidden information)');
    expect(screen.getByText(/To produce or publish something/i)).toHaveAttribute('title', 'To produce or publish something');
    expect(screen.getByText(/To avoid doing something you do not want to do/i)).toHaveAttribute('title', 'To avoid doing something you do not want to do (often "get out of")');
  });
});

describe('GetVerbPage — "out" card expand / collapse', () => {
  it('"out" cards start collapsed (no examples visible)', () => {
    renderPage();
    expect(screen.queryByText(/"The fire alarm rang, and everyone got out of the building\."/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/"The news of the CEO leaving got out to the press\."/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/"We need to get this new application out by next month\."/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/"He tried to get out of doing the presentation, but his boss said no\."/i)).not.toBeInTheDocument();
  });

  it('example is visible in collapsed view without clicking', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/"The fire alarm rang, and everyone got out of the building\."/i)).toBeInTheDocument();
  });

  it('all 4 "out" example sentences visible without expanding cards', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/"The fire alarm rang, and everyone got out of the building\."/i)).toBeInTheDocument();
    expect(screen.getByText(/"The news of the CEO leaving got out to the press\."/i)).toBeInTheDocument();
    expect(screen.getByText(/"We need to get this new application out by next month\."/i)).toBeInTheDocument();
    expect(screen.getByText(/"He tried to get out of doing the presentation, but his boss said no\."/i)).toBeInTheDocument();
  });
});

describe('GetVerbPage — "out" collapsed card view', () => {
  it('collapsed card shows example sentence', () => {
    renderPage();
    expandSection('out');
    const card = getCard(/To leave a place or a car/i);
    expect(within(card).getByText(/"The fire alarm rang/i)).toBeInTheDocument();
  });

  it('collapsed card example has truncate class', () => {
    renderPage();
    expandSection('out');
    const card = getCard(/To leave a place or a car/i);
    expect(within(card).getByText(/"The fire alarm rang/i)).toHaveClass('truncate');
  });

  it('collapsed card example has title attribute with quoted text', () => {
    renderPage();
    expandSection('out');
    const card = getCard(/To leave a place or a car/i);
    expect(within(card).getByText(/"The fire alarm rang/i)).toHaveAttribute(
      'title',
      '"The fire alarm rang, and everyone got out of the building."'
    );
  });

});

describeDefaultImageCards(LABEL, 'out', 'getOut', /To leave a place or a car/i, /"The fire alarm rang/i, renderPage, getCard);

// --- over ---

describeSectionToggle(LABEL, 'over', 'getOver_section_expanded', /To recover from an illness/i, renderPage);

describeChevronAndColour(LABEL, 'over', renderPage);

describe('GetVerbPage — "over" section definitions', () => {
  it('all 3 "over" definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To recover from an illness/i)).toHaveClass('truncate');
    expect(screen.getByText(/To overcome a problem or difficulty/i)).toHaveClass('truncate');
    expect(screen.getByText(/To finish something unpleasant/i)).toHaveClass('truncate');
  });

  it('all 3 "over" title attributes contain the full definition text', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To recover from an illness/i)).toHaveAttribute(
      'title',
      'To recover from an illness, a shock, or a bad emotional experience'
    );
    expect(screen.getByText(/To overcome a problem or difficulty/i)).toHaveAttribute(
      'title',
      'To overcome a problem or difficulty'
    );
    expect(screen.getByText(/To finish something unpleasant/i)).toHaveAttribute(
      'title',
      'To finish something unpleasant so you don\'t have to worry about it (often "get it over with")'
    );
  });
});

describe('GetVerbPage — "over" card expand / collapse', () => {
  it('"over" cards start collapsed (no examples visible)', () => {
    renderPage();
    expect(screen.queryByText(/"It took him two weeks to get over the flu\."/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/"We need to get over this technical issue/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/"I hate performance reviews/i)).not.toBeInTheDocument();
  });

  it('all 3 "over" example sentences visible without expanding cards', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/"It took him two weeks to get over the flu\."/i)).toBeInTheDocument();
    expect(screen.getByText(/"We need to get over this technical issue before the software launches\."/i)).toBeInTheDocument();
    expect(screen.getByText(/"I hate performance reviews, but let's just do it and get it over with\."/i)).toBeInTheDocument();
  });
});

describeDefaultImageCards(LABEL, 'over', 'getOver', /To recover from an illness/i, /"It took him two weeks/i, renderPage, getCard);

// --- separators ---

describe('GetVerbPage — section separators', () => {
  it('renders twenty horizontal rule separators', () => {
    renderPage();
    expect(document.querySelectorAll('hr')).toHaveLength(20);
  });

  it('all separators have border-gray-600 class', () => {
    renderPage();
    document.querySelectorAll('hr').forEach(hr => {
      expect(hr).toHaveClass('border-gray-600');
    });
  });

  it('first separator appears between off and on sections in DOM order', () => {
    renderPage();
    const [hr1] = document.querySelectorAll('hr');
    const offSection = getSection('off');
    const onSection = getSection('on');
    expect(offSection.compareDocumentPosition(hr1) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(hr1.compareDocumentPosition(onSection) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });

  it('second separator appears between on and up sections in DOM order', () => {
    renderPage();
    const [, hr2] = document.querySelectorAll('hr');
    const onSection = getSection('on');
    const upSection = getSection('up');
    expect(onSection.compareDocumentPosition(hr2) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(hr2.compareDocumentPosition(upSection) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });

  it('third separator appears between up and down sections in DOM order', () => {
    renderPage();
    const [,, hr3] = document.querySelectorAll('hr');
    const upSection = getSection('up');
    const downSection = getSection('down');
    expect(upSection.compareDocumentPosition(hr3) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(hr3.compareDocumentPosition(downSection) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });

  it('fourth separator appears between down and in sections in DOM order', () => {
    renderPage();
    const [,,, hr4] = document.querySelectorAll('hr');
    const downSection = getSection('down');
    const inSection = getSection('in');
    expect(downSection.compareDocumentPosition(hr4) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(hr4.compareDocumentPosition(inSection) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });

  it('fifth separator appears between in and into sections in DOM order', () => {
    renderPage();
    const [,,,, hr5] = document.querySelectorAll('hr');
    const inSection = getSection('in');
    const intoSection = getSection('into');
    expect(inSection.compareDocumentPosition(hr5) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(hr5.compareDocumentPosition(intoSection) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });

  it('sixth separator appears between into and out sections in DOM order', () => {
    renderPage();
    const [,,,,, hr6] = document.querySelectorAll('hr');
    const intoSection = getSection('into');
    const outSection = getSection('out');
    expect(intoSection.compareDocumentPosition(hr6) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(hr6.compareDocumentPosition(outSection) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });
});

describe('GetVerbPage — section spacing', () => {
  it('"off" section wrapper has mb-5 class', () => {
    renderPage();
    expect(getSection('off')).toHaveClass('mb-5');
  });

  it('"on" section wrapper has mb-5 class', () => {
    renderPage();
    expect(getSection('on')).toHaveClass('mb-5');
  });

  it('"off" section wrapper does not have mb-10 class', () => {
    renderPage();
    expect(getSection('off')).not.toHaveClass('mb-10');
  });

  it('"on" section wrapper does not have mb-10 class', () => {
    renderPage();
    expect(getSection('on')).not.toHaveClass('mb-10');
  });
});

// --- through ---

describeSectionToggle(LABEL, 'through', 'getThrough_section_expanded', /To finish a difficult task or survive a difficult period/i, renderPage);

describeChevronAndColour(LABEL, 'through', renderPage);

describe('GetVerbPage — "through" section definitions', () => {
  it('all 3 "through" definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('through');
    expect(screen.getByText(/To finish a difficult task or survive a difficult period/i)).toHaveClass('truncate');
    expect(screen.getByText(/To make contact by telephone/i)).toHaveClass('truncate');
    expect(screen.getByText(/To make someone understand something/i)).toHaveClass('truncate');
  });

  it('all 3 "through" title attributes contain the full definition text', () => {
    renderPage();
    expandSection('through');
    expect(screen.getByText(/To finish a difficult task or survive a difficult period/i)).toHaveAttribute(
      'title',
      'To finish a difficult task or survive a difficult period'
    );
    expect(screen.getByText(/To make contact by telephone/i)).toHaveAttribute(
      'title',
      'To make contact by telephone'
    );
    expect(screen.getByText(/To make someone understand something/i)).toHaveAttribute(
      'title',
      'To make someone understand something (often "get through to")'
    );
  });
});

describe('GetVerbPage — "through" card expand / collapse', () => {
  it('"through" cards start collapsed (no examples visible)', () => {
    renderPage();
    expect(screen.queryByText(/"We just need to get through this busy week/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/"I tried to call customer service/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/"I've explained the risks/i)).not.toBeInTheDocument();
  });

  it('all 3 "through" example sentences visible without expanding cards', () => {
    renderPage();
    expandSection('through');
    expect(screen.getByText(/"We just need to get through this busy week, and then we can relax\."/i)).toBeInTheDocument();
    expect(screen.getByText(/"I tried to call customer service, but I couldn't get through\."/i)).toBeInTheDocument();
    expect(screen.getByText(/"I've explained the risks, but I just can't get through to him\."/i)).toBeInTheDocument();
  });
});

describeDefaultImageCards(LABEL, 'through', 'getThrough', /To finish a difficult task or survive a difficult period/i, /"We just need to get through/i, renderPage, getCard);

// --- to ---

describeSectionToggle(LABEL, 'to', 'getTo_section_expanded', /To arrive at a destination/i, renderPage);

describeChevronAndColour(LABEL, 'to', renderPage);

describe('GetVerbPage — "to" section definitions', () => {
  it('all 4 "to" definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To arrive at a destination/i)).toHaveClass('truncate');
    expect(screen.getByText(/To have the opportunity to do something/i)).toHaveClass('truncate');
    expect(screen.getByText(/To annoy or upset someone/i)).toHaveClass('truncate');
    expect(screen.getByText(/To begin an action/i)).toHaveClass('truncate');
  });

  it('all 4 "to" title attributes contain the full definition text', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To arrive at a destination/i)).toHaveAttribute('title', 'To arrive at a destination');
    expect(screen.getByText(/To have the opportunity to do something/i)).toHaveAttribute('title', 'To have the opportunity to do something');
    expect(screen.getByText(/To annoy or upset someone/i)).toHaveAttribute('title', 'To annoy or upset someone');
    expect(screen.getByText(/To begin an action/i)).toHaveAttribute('title', 'To begin an action (often "get to work")');
  });
});

describe('GetVerbPage — "to" card expand / collapse', () => {
  it('"to" cards start collapsed (no examples visible)', () => {
    renderPage();
    expect(screen.queryByText(/"What time did you get to the office/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/"Because of my job, I get to travel/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/"The constant complaining is really getting to me\."/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/"The break is over/i)).not.toBeInTheDocument();
  });

  it('all 4 "to" example sentences visible without expanding cards', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/"What time did you get to the office this morning\?"/i)).toBeInTheDocument();
    expect(screen.getByText(/"Because of my job, I get to travel all over the world\."/i)).toBeInTheDocument();
    expect(screen.getByText(/"The constant complaining is really getting to me\."/i)).toBeInTheDocument();
    expect(screen.getByText(/"The break is over; let's get to work\."/i)).toBeInTheDocument();
  });
});

describeDefaultImageCards(LABEL, 'to', 'getTo', /To arrive at a destination/i, /"What time did you get to the office/i, renderPage, getCard);

// --- together ---

describeSectionToggle(LABEL, 'together', 'getTogether_section_expanded', /To meet socially/i, renderPage);

describeChevronAndColour(LABEL, 'together', renderPage);

describe('GetVerbPage — "together" section definitions', () => {
  it('all 2 "together" definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('together');
    expect(screen.getByText(/To meet socially/i)).toHaveClass('truncate');
    expect(screen.getByText(/To organize your thoughts/i)).toHaveClass('truncate');
  });

  it('all 2 "together" title attributes contain the full definition text', () => {
    renderPage();
    expandSection('together');
    expect(screen.getByText(/To meet socially/i)).toHaveAttribute('title', 'To meet socially');
    expect(screen.getByText(/To organize your thoughts/i)).toHaveAttribute(
      'title',
      'To organize your thoughts, life, or things (often "get your act together")'
    );
  });
});

describe('GetVerbPage — "together" card expand / collapse', () => {
  it('"together" cards start collapsed (no examples visible)', () => {
    renderPage();
    expect(screen.queryByText(/"Let's get together for a coffee/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/"If he wants a promotion/i)).not.toBeInTheDocument();
  });

  it('all 2 "together" example sentences visible without expanding cards', () => {
    renderPage();
    expandSection('together');
    expect(screen.getByText(/"Let's get together for a coffee next week\."/i)).toBeInTheDocument();
    expect(screen.getByText(/"If he wants a promotion, he needs to get his act together and work harder\."/i)).toBeInTheDocument();
  });
});

describeDefaultImageCards(LABEL, 'together', 'getTogether', /To meet socially/i, /"Let's get together/i, renderPage, getCard);

// --- up ---

describeSectionToggle(LABEL, 'up', 'getUp_section_expanded', /To rise from bed after sleeping/i, renderPage);

describe(`${LABEL} — "up" section independence`, () => {
  it('collapsing "up" section does not affect "off" or "on" sections', () => {
    renderPage();
    expandSection('off');
    expandSection('on');
    expandSection('up');
    fireEvent.click(screen.getByText('up'));
    expect(screen.getByText(/To leave a form of public transport/i)).toBeInTheDocument();
    expect(screen.getByText(/To step onto a form of public transport/i)).toBeInTheDocument();
  });
});

describeChevronAndColour(LABEL, 'up', renderPage);

describe('GetVerbPage — "up" section definitions', () => {
  it('all 3 "up" definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To rise from bed after sleeping/i)).toHaveClass('truncate');
    expect(screen.getByText(/To stand up/i)).toHaveClass('truncate');
    expect(screen.getByText(/To organize or arrange something/i)).toHaveClass('truncate');
  });

  it('all 3 "up" title attributes contain the full definition text', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To rise from bed after sleeping/i)).toHaveAttribute(
      'title',
      'To rise from bed after sleeping'
    );
    expect(screen.getByText(/To stand up/i)).toHaveAttribute('title', 'To stand up');
    expect(screen.getByText(/To organize or arrange something/i)).toHaveAttribute(
      'title',
      'To organize or arrange something'
    );
  });
});

describe('GetVerbPage — "up" card expand / collapse', () => {
  it('"up" cards start collapsed (no examples visible)', () => {
    renderPage();
    expect(screen.queryByText(/"I get up at 6:30 AM every morning\."/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/"He got up from his desk to welcome the visitors\."/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/"We need to get up a team to handle this new software update\."/i)).not.toBeInTheDocument();
  });

  it('expands an "up" card when clicked', () => {
    renderPage();
    expandSection('up');
    fireEvent.click(getCard(/To rise from bed after sleeping/i));
    expect(screen.getByText(/"I get up at 6:30 AM every morning\."/i)).toBeInTheDocument();
  });

  it('renders all 3 "up" example sentences when all cards are expanded', () => {
    renderPage();
    expandSection('up');
    fireEvent.click(getCard(/To rise from bed after sleeping/i));
    fireEvent.click(getCard(/To stand up/i));
    fireEvent.click(getCard(/To organize or arrange something/i));
    expect(screen.getByText(/"I get up at 6:30 AM every morning\."/i)).toBeInTheDocument();
    expect(screen.getByText(/"He got up from his desk to welcome the visitors\."/i)).toBeInTheDocument();
    expect(screen.getByText(/"We need to get up a team to handle this new software update\."/i)).toBeInTheDocument();
  });
});

describe('GetVerbPage — "up" collapsed card view', () => {
  it('collapsed card shows example sentence', () => {
    renderPage();
    expandSection('up');
    const card = getCard(/To rise from bed after sleeping/i);
    expect(within(card).getByText(/"I get up at 6:30 AM/i)).toBeInTheDocument();
  });

  it('collapsed card example has truncate class', () => {
    renderPage();
    expandSection('up');
    const card = getCard(/To rise from bed after sleeping/i);
    expect(within(card).getByText(/"I get up at 6:30 AM/i)).toHaveClass('truncate');
  });

  it('collapsed card example has title attribute with quoted text', () => {
    renderPage();
    expandSection('up');
    const card = getCard(/To rise from bed after sleeping/i);
    expect(within(card).getByText(/"I get up at 6:30 AM/i)).toHaveAttribute(
      'title',
      '"I get up at 6:30 AM every morning."'
    );
  });

  it('expanded card example does not have truncate class', () => {
    renderPage();
    expandSection('up');
    fireEvent.click(getCard(/To rise from bed after sleeping/i));
    const card = getCard(/To rise from bed after sleeping/i);
    expect(within(card).getByText(/"I get up at 6:30 AM/i)).not.toHaveClass('truncate');
  });
});

describe('GetVerbPage — "up" localStorage persistence', () => {
  it('saves "up" card expanded state to localStorage', () => {
    renderPage();
    expandSection('up');
    fireEvent.click(getCard(/To rise from bed after sleeping/i));
    expect(localStorage.getItem('getUp_meaning_1_collapsed')).toBe('false');
  });

  it('restores "up" card expanded state from localStorage on mount', () => {
    localStorage.setItem('getUp_section_expanded', 'true');
    localStorage.setItem('getUp_meaning_1_collapsed', 'false');
    renderPage();
    expect(screen.getByText(/"I get up at 6:30 AM every morning\."/i)).toBeInTheDocument();
  });
});

describe('GetVerbPage — "up" text selection does not toggle card', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('clicking card with text selected does not expand it', () => {
    vi.spyOn(window, 'getSelection').mockReturnValue({ toString: () => 'selected text' } as Selection);
    renderPage();
    expandSection('up');
    fireEvent.click(getCard(/To rise from bed after sleeping/i));
    expect(within(getCard(/To rise from bed after sleeping/i)).getByText(/"I get up at 6:30 AM/i)).toHaveClass('truncate');
  });

  it('clicking expanded card with text selected does not collapse it', () => {
    renderPage();
    expandSection('up');
    fireEvent.click(getCard(/To rise from bed after sleeping/i));
    vi.spyOn(window, 'getSelection').mockReturnValue({ toString: () => 'selected text' } as Selection);
    fireEvent.click(getCard(/To rise from bed after sleeping/i));
    expect(within(getCard(/To rise from bed after sleeping/i)).getByText(/"I get up at 6:30 AM/i)).not.toHaveClass('truncate');
  });

  it('clicking card with empty selection toggles normally', () => {
    vi.spyOn(window, 'getSelection').mockReturnValue({ toString: () => '' } as Selection);
    renderPage();
    expandSection('up');
    fireEvent.click(getCard(/To rise from bed after sleeping/i));
    expect(within(getCard(/To rise from bed after sleeping/i)).getByText(/"I get up at 6:30 AM/i)).not.toHaveClass('truncate');
  });
});

// --- with ---

describeSectionToggle(LABEL, 'with', 'getWith_section_expanded', /To understand or adapt to modern trends/i, renderPage);

describeChevronAndColour(LABEL, 'with', renderPage);

describe('GetVerbPage — "with" section definitions', () => {
  it('"with" definition paragraph has truncate class', () => {
    renderPage();
    expandSection('with');
    expect(screen.getByText(/To understand or adapt to modern trends/i)).toHaveClass('truncate');
  });

  it('"with" title attribute contains the full definition text', () => {
    renderPage();
    expandSection('with');
    expect(screen.getByText(/To understand or adapt to modern trends/i)).toHaveAttribute(
      'title',
      'To understand or adapt to modern trends or new rules (informal)'
    );
  });
});

describe('GetVerbPage — "with" card', () => {
  it('"with" card starts collapsed (no example visible before expand)', () => {
    renderPage();
    expect(screen.queryByText(/"You need to get with the new management strategy/i)).not.toBeInTheDocument();
  });

  it('"with" example visible without expanding card', () => {
    renderPage();
    expandSection('with');
    expect(screen.getByText(/"You need to get with the new management strategy, or you will be left behind\."/i)).toBeInTheDocument();
  });
});

describeDefaultImageCards(LABEL, 'with', 'getWith', /To understand or adapt to modern trends/i, /"You need to get with/i, renderPage, getCard);
