import { screen } from '@testing-library/react';
import { expandSection, getCard, renderPage } from './helpers';
import { describeChevronAndColour, describeDefaultImageCards, describeSectionToggle } from '../verbPage/sharedSectionTests';

const LABEL = 'LookVerbPage';

beforeEach(() => {
  localStorage.clear();
});

// --- after ---

describe('LookVerbPage — "after" section definitions', () => {
  it('renders definition for taking care of someone or something', () => {
    renderPage();
    expandSection('after');
    expect(screen.getByText(/To take care of someone or something/i)).toBeInTheDocument();
  });

  it('all 1 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('after');
    const defs = [
      screen.getByText(/To take care of someone or something/i),
    ];
    defs.forEach(el => expect(el).toHaveClass('truncate'));
  });

  it('first definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('after');
    expect(screen.getByText(/To take care of someone or something/i)).toHaveAttribute(
      'title',
      'To take care of someone or something and make sure they have what they need.'
    );
  });
});

describeSectionToggle(LABEL, 'after', 'lookAfter_section_expanded', /To take care of someone or something/i, renderPage);

describeChevronAndColour(LABEL, 'after', renderPage);

describeDefaultImageCards(LABEL, 'after', 'lookAfter', /To take care of someone or something/i, /As a manager, you must look after/i, renderPage, getCard);

// --- ahead ---

describe('LookVerbPage — "ahead" section definitions', () => {
  it('renders definition for thinking about and planning for the future', () => {
    renderPage();
    expandSection('ahead');
    expect(screen.getByText(/To think about and plan for the future\./i)).toBeInTheDocument();
  });

  it('all 1 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('ahead');
    const defs = [
      screen.getByText(/To think about and plan for the future\./i),
    ];
    defs.forEach(el => expect(el).toHaveClass('truncate'));
  });

  it('first definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('ahead');
    expect(screen.getByText(/To think about and plan for the future\./i)).toHaveAttribute(
      'title',
      'To think about and plan for the future.'
    );
  });
});

describeSectionToggle(LABEL, 'ahead', 'lookAhead_section_expanded', /To think about and plan for the future\./i, renderPage);

describeChevronAndColour(LABEL, 'ahead', renderPage);

describeDefaultImageCards(LABEL, 'ahead', 'lookAhead', /To think about and plan for the future\./i, /A good leader needs to look ahead/i, renderPage, getCard);

// --- around_round_about ---

describe('LookVerbPage — "around / round / about" section definitions', () => {
  it('renders definition for walking through a place to see what is there', () => {
    renderPage();
    expandSection('around / round / about');
    expect(screen.getByText(/To walk through a place to see what is there\./i)).toBeInTheDocument();
  });

  it('renders definition for searching in various places', () => {
    renderPage();
    expandSection('around / round / about');
    expect(screen.getByText(/To search for something in various places\./i)).toBeInTheDocument();
  });

  it('all 2 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('around / round / about');
    const defs = [
      screen.getByText(/To walk through a place to see what is there\./i),
      screen.getByText(/To search for something in various places\./i),
    ];
    defs.forEach(el => expect(el).toHaveClass('truncate'));
  });

  it('first definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('around / round / about');
    expect(screen.getByText(/To walk through a place to see what is there\./i)).toHaveAttribute(
      'title',
      'To walk through a place to see what is there.'
    );
  });

  it('second definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('around / round / about');
    expect(screen.getByText(/To search for something in various places\./i)).toHaveAttribute(
      'title',
      'To search for something in various places.'
    );
  });
});

describeSectionToggle(LABEL, 'around / round / about', 'lookAround_section_expanded', /To walk through a place to see what is there\./i, renderPage);

describeChevronAndColour(LABEL, 'around / round / about', renderPage);

describeDefaultImageCards(LABEL, 'around / round / about', 'lookAround', /To walk through a place to see what is there\./i, /We took some time to look around the new office/i, renderPage, getCard);

// --- away ---

describe('LookVerbPage — "away" section definitions', () => {
  it('renders definition for turning eyes away from something', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To turn your eyes away from someone or something\./i)).toBeInTheDocument();
  });

  it('all 1 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('away');
    const defs = [
      screen.getByText(/To turn your eyes away from someone or something\./i),
    ];
    defs.forEach(el => expect(el).toHaveClass('truncate'));
  });

  it('first definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To turn your eyes away from someone or something\./i)).toHaveAttribute(
      'title',
      'To turn your eyes away from someone or something.'
    );
  });
});

describeSectionToggle(LABEL, 'away', 'lookAway_section_expanded', /To turn your eyes away from someone or something\./i, renderPage);

describeChevronAndColour(LABEL, 'away', renderPage);

describeDefaultImageCards(LABEL, 'away', 'lookAway', /To turn your eyes away from someone or something\./i, /The presentation data was so confusing/i, renderPage, getCard);

// --- back_on ---

describe('LookVerbPage — "back (on)" section definitions', () => {
  it('renders definition for thinking about something in the past', () => {
    renderPage();
    expandSection('back (on)');
    expect(screen.getByText(/To think about something that happened in the past\./i)).toBeInTheDocument();
  });

  it('all 1 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('back (on)');
    const defs = [
      screen.getByText(/To think about something that happened in the past\./i),
    ];
    defs.forEach(el => expect(el).toHaveClass('truncate'));
  });

  it('first definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('back (on)');
    expect(screen.getByText(/To think about something that happened in the past\./i)).toHaveAttribute(
      'title',
      'To think about something that happened in the past.'
    );
  });
});

describeSectionToggle(LABEL, 'back (on)', 'lookBack_section_expanded', /To think about something that happened in the past\./i, renderPage);

describeChevronAndColour(LABEL, 'back (on)', renderPage);

describeDefaultImageCards(LABEL, 'back (on)', 'lookBack', /To think about something that happened in the past\./i, /When I look back on my early days/i, renderPage, getCard);

// --- down_on ---

describe('LookVerbPage — "down on" section definitions', () => {
  it('renders definition for thinking you are better than someone else', () => {
    renderPage();
    expandSection('down on');
    expect(screen.getByText(/To think that you are better or more important than someone else\./i)).toBeInTheDocument();
  });

  it('all 1 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('down on');
    const defs = [
      screen.getByText(/To think that you are better or more important than someone else\./i),
    ];
    defs.forEach(el => expect(el).toHaveClass('truncate'));
  });

  it('first definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('down on');
    expect(screen.getByText(/To think that you are better or more important than someone else\./i)).toHaveAttribute(
      'title',
      'To think that you are better or more important than someone else.'
    );
  });
});

describeSectionToggle(LABEL, 'down on', 'lookDown_section_expanded', /To think that you are better or more important than someone else\./i, renderPage);

describeChevronAndColour(LABEL, 'down on', renderPage);

describeDefaultImageCards(LABEL, 'down on', 'lookDown', /To think that you are better or more important than someone else\./i, /A professional leader should never look down on/i, renderPage, getCard);

// --- for ---

describe('LookVerbPage — "for" section definitions', () => {
  it('renders definition for trying to find something or someone', () => {
    renderPage();
    expandSection('for');
    expect(screen.getByText(/To try to find something or someone\./i)).toBeInTheDocument();
  });

  it('all 1 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('for');
    const defs = [
      screen.getByText(/To try to find something or someone\./i),
    ];
    defs.forEach(el => expect(el).toHaveClass('truncate'));
  });

  it('first definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('for');
    expect(screen.getByText(/To try to find something or someone\./i)).toHaveAttribute(
      'title',
      'To try to find something or someone.'
    );
  });
});

describeSectionToggle(LABEL, 'for', 'lookFor_section_expanded', /To try to find something or someone\./i, renderPage);

describeChevronAndColour(LABEL, 'for', renderPage);

describeDefaultImageCards(LABEL, 'for', 'lookFor', /To try to find something or someone\./i, /The development team is looking for a solution/i, renderPage, getCard);

// --- forward_to ---

describe('LookVerbPage — "forward to" section definitions', () => {
  it('renders definition for feeling excited about something in the future', () => {
    renderPage();
    expandSection('forward to');
    expect(screen.getByText(/To feel excited and happy about something/i)).toBeInTheDocument();
  });

  it('all 1 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('forward to');
    const defs = [
      screen.getByText(/To feel excited and happy about something/i),
    ];
    defs.forEach(el => expect(el).toHaveClass('truncate'));
  });

  it('first definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('forward to');
    expect(screen.getByText(/To feel excited and happy about something/i)).toHaveAttribute(
      'title',
      'To feel excited and happy about something that is going to happen in the future.'
    );
  });
});

describeSectionToggle(LABEL, 'forward to', 'lookForward_section_expanded', /To feel excited and happy about something/i, renderPage);

describeChevronAndColour(LABEL, 'forward to', renderPage);

describeDefaultImageCards(LABEL, 'forward to', 'lookForward', /To feel excited and happy about something/i, /I look forward to reviewing the new business strategy/i, renderPage, getCard);

// --- in_on ---

describe('LookVerbPage — "in (on)" section definitions', () => {
  it('renders definition for visiting a person for a short time', () => {
    renderPage();
    expandSection('in (on)');
    expect(screen.getByText(/To visit a person for a short time/i)).toBeInTheDocument();
  });

  it('all 1 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('in (on)');
    const defs = [
      screen.getByText(/To visit a person for a short time/i),
    ];
    defs.forEach(el => expect(el).toHaveClass('truncate'));
  });

  it('first definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('in (on)');
    expect(screen.getByText(/To visit a person for a short time/i)).toHaveAttribute(
      'title',
      'To visit a person for a short time, usually to check that they are okay.'
    );
  });
});

describeSectionToggle(LABEL, 'in (on)', 'lookIn_section_expanded', /To visit a person for a short time/i, renderPage);

describeChevronAndColour(LABEL, 'in (on)', renderPage);

describeDefaultImageCards(LABEL, 'in (on)', 'lookIn', /To visit a person for a short time/i, /I will look in on the new trainees/i, renderPage, getCard);

// --- into ---

describe('LookVerbPage — "into" section definitions', () => {
  it('renders definition for investigating a situation or problem', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/To investigate or research the facts of a situation or problem\./i)).toBeInTheDocument();
  });

  it('all 1 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('into');
    const defs = [
      screen.getByText(/To investigate or research the facts of a situation or problem\./i),
    ];
    defs.forEach(el => expect(el).toHaveClass('truncate'));
  });

  it('first definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/To investigate or research the facts of a situation or problem\./i)).toHaveAttribute(
      'title',
      'To investigate or research the facts of a situation or problem.'
    );
  });
});

describeSectionToggle(LABEL, 'into', 'lookInto_section_expanded', /To investigate or research the facts of a situation or problem\./i, renderPage);

describeChevronAndColour(LABEL, 'into', renderPage);

describeDefaultImageCards(LABEL, 'into', 'lookInto', /To investigate or research the facts of a situation or problem\./i, /The IT department will look into why the server crashed\./i, renderPage, getCard);

// --- on ---

describe('LookVerbPage — "on" section definitions', () => {
  it('renders definition for watching an event without taking part', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To watch an event happen without taking part in it\./i)).toBeInTheDocument();
  });

  it('renders definition for considering someone in a specific way', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To consider someone or something in a specific way\./i)).toBeInTheDocument();
  });

  it('all 2 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('on');
    const defs = [
      screen.getByText(/To watch an event happen without taking part in it\./i),
      screen.getByText(/To consider someone or something in a specific way\./i),
    ];
    defs.forEach(el => expect(el).toHaveClass('truncate'));
  });

  it('first definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To watch an event happen without taking part in it\./i)).toHaveAttribute(
      'title',
      'To watch an event happen without taking part in it.'
    );
  });

  it('second definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To consider someone or something in a specific way\./i)).toHaveAttribute(
      'title',
      'To consider someone or something in a specific way.'
    );
  });
});

describeSectionToggle(LABEL, 'on', 'lookOn_section_expanded', /To watch an event happen without taking part in it\./i, renderPage);

describeChevronAndColour(LABEL, 'on', renderPage);

describeDefaultImageCards(LABEL, 'on', 'lookOn', /To watch an event happen without taking part in it\./i, /The manager looked on as the team/i, renderPage, getCard);

// --- out ---

describe('LookVerbPage — "out" section definitions', () => {
  it('renders definition for being careful or warning of danger', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To be careful or to warn someone of danger\./i)).toBeInTheDocument();
  });

  it('renders definition for taking care of someone', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To take care of someone and make sure they are treated well/i)).toBeInTheDocument();
  });

  it('renders definition for watching carefully to find something', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To watch carefully in order to find something/i)).toBeInTheDocument();
  });

  it('all 3 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('out');
    const defs = [
      screen.getByText(/To be careful or to warn someone of danger\./i),
      screen.getByText(/To take care of someone and make sure they are treated well/i),
      screen.getByText(/To watch carefully in order to find something/i),
    ];
    defs.forEach(el => expect(el).toHaveClass('truncate'));
  });

  it('first definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To be careful or to warn someone of danger\./i)).toHaveAttribute(
      'title',
      'To be careful or to warn someone of danger.'
    );
  });

  it('second definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To take care of someone and make sure they are treated well/i)).toHaveAttribute(
      'title',
      'To take care of someone and make sure they are treated well (look out for).'
    );
  });

  it('third definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To watch carefully in order to find something/i)).toHaveAttribute(
      'title',
      'To watch carefully in order to find something (look out for).'
    );
  });
});

describeSectionToggle(LABEL, 'out', 'lookOut_section_expanded', /To be careful or to warn someone of danger\./i, renderPage);

describeChevronAndColour(LABEL, 'out', renderPage);

describeDefaultImageCards(LABEL, 'out', 'lookOut', /To be careful or to warn someone of danger\./i, /Look out! That server rack is falling\./i, renderPage, getCard);

// --- over ---

describe('LookVerbPage — "over" section definitions', () => {
  it('renders definition for examining or reading something quickly', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To examine or read something quickly to check its quality\./i)).toBeInTheDocument();
  });

  it('all 1 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('over');
    const defs = [
      screen.getByText(/To examine or read something quickly to check its quality\./i),
    ];
    defs.forEach(el => expect(el).toHaveClass('truncate'));
  });

  it('first definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To examine or read something quickly to check its quality\./i)).toHaveAttribute(
      'title',
      'To examine or read something quickly to check its quality.'
    );
  });
});

describeSectionToggle(LABEL, 'over', 'lookOver_section_expanded', /To examine or read something quickly to check its quality\./i, renderPage);

describeChevronAndColour(LABEL, 'over', renderPage);

describeDefaultImageCards(LABEL, 'over', 'lookOver', /To examine or read something quickly to check its quality\./i, /Could you look over this financial report/i, renderPage, getCard);

// --- through ---

describe('LookVerbPage — "through" section definitions', () => {
  it('renders definition for reading something quickly', () => {
    renderPage();
    expandSection('through');
    expect(screen.getByText(/To read something quickly\./i)).toBeInTheDocument();
  });

  it('renders definition for deliberately ignoring someone', () => {
    renderPage();
    expandSection('through');
    expect(screen.getByText(/To deliberately ignore someone you know/i)).toBeInTheDocument();
  });

  it('all 2 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('through');
    const defs = [
      screen.getByText(/To read something quickly\./i),
      screen.getByText(/To deliberately ignore someone you know/i),
    ];
    defs.forEach(el => expect(el).toHaveClass('truncate'));
  });

  it('first definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('through');
    expect(screen.getByText(/To read something quickly\./i)).toHaveAttribute(
      'title',
      'To read something quickly.'
    );
  });

  it('second definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('through');
    expect(screen.getByText(/To deliberately ignore someone you know/i)).toHaveAttribute(
      'title',
      'To deliberately ignore someone you know by pretending you do not see them.'
    );
  });
});

describeSectionToggle(LABEL, 'through', 'lookThrough_section_expanded', /To read something quickly\./i, renderPage);

describeChevronAndColour(LABEL, 'through', renderPage);

describeDefaultImageCards(LABEL, 'through', 'lookThrough', /To read something quickly\./i, /I will look through the Java documentation/i, renderPage, getCard);

// --- to ---

describe('LookVerbPage — "to" section definitions', () => {
  it('renders definition for relying on someone to provide something', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To rely on someone to provide something/i)).toBeInTheDocument();
  });

  it('renders definition for directing attention to something', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To direct your attention to something\./i)).toBeInTheDocument();
  });

  it('all 2 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('to');
    const defs = [
      screen.getByText(/To rely on someone to provide something/i),
      screen.getByText(/To direct your attention to something\./i),
    ];
    defs.forEach(el => expect(el).toHaveClass('truncate'));
  });

  it('first definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To rely on someone to provide something/i)).toHaveAttribute(
      'title',
      'To rely on someone to provide something (like help or advice).'
    );
  });

  it('second definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To direct your attention to something\./i)).toHaveAttribute(
      'title',
      'To direct your attention to something.'
    );
  });
});

describeSectionToggle(LABEL, 'to', 'lookTo_section_expanded', /To rely on someone to provide something/i, renderPage);

describeChevronAndColour(LABEL, 'to', renderPage);

describeDefaultImageCards(LABEL, 'to', 'lookTo', /To rely on someone to provide something/i, /The board of directors looks to the CEO/i, renderPage, getCard);

// --- up ---

describe('LookVerbPage — "up" section definitions', () => {
  it('renders definition for finding information in a reference', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To try to find a piece of information/i)).toBeInTheDocument();
  });

  it('renders definition for improving or getting better', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To improve or get better/i)).toBeInTheDocument();
  });

  it('renders definition for contacting someone not seen for a long time', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To contact or visit someone you have not seen/i)).toBeInTheDocument();
  });

  it('renders definition for deeply respecting someone', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To deeply respect and admire someone/i)).toBeInTheDocument();
  });

  it('all 4 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('up');
    const defs = [
      screen.getByText(/To try to find a piece of information/i),
      screen.getByText(/To improve or get better/i),
      screen.getByText(/To contact or visit someone you have not seen/i),
      screen.getByText(/To deeply respect and admire someone/i),
    ];
    defs.forEach(el => expect(el).toHaveClass('truncate'));
  });

  it('first definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To try to find a piece of information/i)).toHaveAttribute(
      'title',
      'To try to find a piece of information in a book, list, or on the internet.'
    );
  });

  it('second definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To improve or get better/i)).toHaveAttribute(
      'title',
      'To improve or get better (usually referring to a situation or business).'
    );
  });

  it('third definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To contact or visit someone you have not seen/i)).toHaveAttribute(
      'title',
      'To contact or visit someone you have not seen for a long time.'
    );
  });

  it('fourth definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To deeply respect and admire someone/i)).toHaveAttribute(
      'title',
      'To deeply respect and admire someone (look up to).'
    );
  });
});

describeSectionToggle(LABEL, 'up', 'lookUp_section_expanded', /To try to find a piece of information/i, renderPage);

describeChevronAndColour(LABEL, 'up', renderPage);

describeDefaultImageCards(LABEL, 'up', 'lookUp', /To try to find a piece of information/i, /If you don't know the exact syntax/i, renderPage, getCard);
