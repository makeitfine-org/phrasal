import { screen } from '@testing-library/react';
import { expandSection, getCard, renderPage } from './helpers';
import { describeChevronAndColour, describeDefaultImageCards, describeSectionToggle } from '../verbPage/sharedSectionTests';

const LABEL = 'PassVerbPage';

beforeEach(() => {
  localStorage.clear();
});

// --- around_round_about ---

describe('PassVerbPage — "around / round / about" section definitions', () => {
  it('renders definition for offering something to every person in a group', () => {
    renderPage();
    expandSection('around / round / about');
    expect(screen.getByText(/To offer or give something to every person in a group/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('around / round / about');
    expect(screen.getByText(/To offer or give something to every person in a group/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('around / round / about');
    expect(screen.getByText(/To offer or give something to every person in a group/i)).toHaveAttribute(
      'title',
      'To offer or give something to every person in a group.'
    );
  });
});

describeSectionToggle(LABEL, 'around / round / about', 'passAround_section_expanded', /To offer or give something to every person in a group/i, renderPage);

describeChevronAndColour(LABEL, 'around / round / about', renderPage);

describeDefaultImageCards(LABEL, 'around / round / about', 'passAround', /To offer or give something to every person in a group/i, /They passed around the tablet so everyone could see the new app design\./i, renderPage, getCard);

// --- away ---

describe('PassVerbPage — "away" section definitions', () => {
  it('renders definition for dying (polite phrase)', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To die \(a polite and respectful phrase\)/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To die \(a polite and respectful phrase\)/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To die \(a polite and respectful phrase\)/i)).toHaveAttribute(
      'title',
      'To die (a polite and respectful phrase).'
    );
  });
});

describeSectionToggle(LABEL, 'away', 'passAway_section_expanded', /To die \(a polite and respectful phrase\)/i, renderPage);

describeChevronAndColour(LABEL, 'away', renderPage);

describeDefaultImageCards(LABEL, 'away', 'passAway', /To die \(a polite and respectful phrase\)/i, /The founder of the company passed away peacefully last year\./i, renderPage, getCard);

// --- by ---

describe('PassVerbPage — "by" section definitions', () => {
  it('renders definition for going past a place or person', () => {
    renderPage();
    expandSection('by');
    expect(screen.getByText(/To go past a place or person/i)).toBeInTheDocument();
  });

  it('renders definition for missing an opportunity', () => {
    renderPage();
    expandSection('by');
    expect(screen.getByText(/To happen without affecting someone, or to miss an opportunity/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('by');
    expect(screen.getByText(/To go past a place or person/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('by');
    expect(screen.getByText(/To go past a place or person/i)).toHaveAttribute(
      'title',
      'To go past a place or person.'
    );
  });
});

describeSectionToggle(LABEL, 'by', 'passBy_section_expanded', /To go past a place or person/i, renderPage);

describeChevronAndColour(LABEL, 'by', renderPage);

describeDefaultImageCards(LABEL, 'by', 'passBy', /To go past a place or person/i, /I pass by your office every morning on my way to get coffee\./i, renderPage, getCard);

// --- down ---

describe('PassVerbPage — "down" section definitions', () => {
  it('renders definition for giving knowledge to younger generations', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To give knowledge, skills, or items to younger generations or junior members/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To give knowledge, skills, or items to younger generations or junior members/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To give knowledge, skills, or items to younger generations or junior members/i)).toHaveAttribute(
      'title',
      'To give knowledge, skills, or items to younger generations or junior members.'
    );
  });
});

describeSectionToggle(LABEL, 'down', 'passDown_section_expanded', /To give knowledge, skills, or items to younger generations or junior members/i, renderPage);

describeChevronAndColour(LABEL, 'down', renderPage);

describeDefaultImageCards(LABEL, 'down', 'passDown', /To give knowledge, skills, or items to younger generations or junior members/i, /The senior manager passed down her negotiation skills to the new team members\./i, renderPage, getCard);

// --- for ---

describe('PassVerbPage — "for" section definitions', () => {
  it('renders definition for being accepted as something else', () => {
    renderPage();
    expandSection('for');
    expect(screen.getByText(/To be accepted as something else, often despite not being it/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('for');
    expect(screen.getByText(/To be accepted as something else, often despite not being it/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('for');
    expect(screen.getByText(/To be accepted as something else, often despite not being it/i)).toHaveAttribute(
      'title',
      'To be accepted as something else, often despite not being it.'
    );
  });
});

describeSectionToggle(LABEL, 'for', 'passFor_section_expanded', /To be accepted as something else, often despite not being it/i, renderPage);

describeChevronAndColour(LABEL, 'for', renderPage);

describeDefaultImageCards(LABEL, 'for', 'passFor', /To be accepted as something else, often despite not being it/i, /His Java skills are so good that he could easily pass for a senior developer\./i, renderPage, getCard);

// --- in ---

describe('PassVerbPage — "in" section definitions', () => {
  it('renders definition for giving work to a teacher or manager', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To give work to a teacher or manager/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To give work to a teacher or manager/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To give work to a teacher or manager/i)).toHaveAttribute(
      'title',
      'To give work to a teacher or manager (similar to "hand in").'
    );
  });
});

describeSectionToggle(LABEL, 'in', 'passIn_section_expanded', /To give work to a teacher or manager/i, renderPage);

describeChevronAndColour(LABEL, 'in', renderPage);

describeDefaultImageCards(LABEL, 'in', 'passIn', /To give work to a teacher or manager/i, /Please remember to pass in your project reports by Friday afternoon\./i, renderPage, getCard);

// --- into ---

describe('PassVerbPage — "into" section definitions', () => {
  it('renders definition for becoming part of history or legend', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/To become part of something, usually history or legend/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/To become part of something, usually history or legend/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/To become part of something, usually history or legend/i)).toHaveAttribute(
      'title',
      'To become part of something, usually history or legend.'
    );
  });
});

describeSectionToggle(LABEL, 'into', 'passInto_section_expanded', /To become part of something, usually history or legend/i, renderPage);

describeChevronAndColour(LABEL, 'into', renderPage);

describeDefaultImageCards(LABEL, 'into', 'passInto', /To become part of something, usually history or legend/i, /His successful software release passed into company history\./i, renderPage, getCard);

// --- off ---

describe('PassVerbPage — "off" section definitions', () => {
  it('renders definition for falsely presenting something as something else', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To falsely present someone or something as something else/i)).toBeInTheDocument();
  });

  it('renders definition for happening in a certain way', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To happen or take place in a certain way/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To falsely present someone or something as something else/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To falsely present someone or something as something else/i)).toHaveAttribute(
      'title',
      'To falsely present someone or something as something else.'
    );
  });
});

describeSectionToggle(LABEL, 'off', 'passOff_section_expanded', /To falsely present someone or something as something else/i, renderPage);

describeChevronAndColour(LABEL, 'off', renderPage);

describeDefaultImageCards(LABEL, 'off', 'passOff', /To falsely present someone or something as something else/i, /He tried to pass off the copied code as his own original work\./i, renderPage, getCard);

// --- on ---

describe('PassVerbPage — "on" section definitions', () => {
  it('renders definition for giving information to someone else', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To give information or an object to someone else/i)).toBeInTheDocument();
  });

  it('renders definition for refusing an opportunity or offer', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To refuse an opportunity or offer/i)).toBeInTheDocument();
  });

  it('renders definition for dying (polite phrase)', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To die \(another polite phrase\)/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To give information or an object to someone else/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To give information or an object to someone else/i)).toHaveAttribute(
      'title',
      'To give information or an object to someone else.'
    );
  });
});

describeSectionToggle(LABEL, 'on', 'passOn_section_expanded', /To give information or an object to someone else/i, renderPage);

describeChevronAndColour(LABEL, 'on', renderPage);

describeDefaultImageCards(LABEL, 'on', 'passOn', /To give information or an object to someone else/i, /Please pass on this message to the development team\./i, renderPage, getCard);

// --- out ---

describe('PassVerbPage — "out" section definitions', () => {
  it('renders definition for distributing something to a group', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To distribute something to a group of people/i)).toBeInTheDocument();
  });

  it('renders definition for losing consciousness', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To lose consciousness or faint/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To distribute something to a group of people/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To distribute something to a group of people/i)).toHaveAttribute(
      'title',
      'To distribute something to a group of people.'
    );
  });
});

describeSectionToggle(LABEL, 'out', 'passOut_section_expanded', /To distribute something to a group of people/i, renderPage);

describeChevronAndColour(LABEL, 'out', renderPage);

describeDefaultImageCards(LABEL, 'out', 'passOut', /To distribute something to a group of people/i, /Could you pass out these documents before the management meeting starts\?/i, renderPage, getCard);

// --- over ---

describe('PassVerbPage — "over" section definitions', () => {
  it('renders definition for ignoring someone for a promotion', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To ignore or not choose someone for a position or promotion/i)).toBeInTheDocument();
  });

  it('renders definition for ignoring a topic in conversation', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To ignore a topic in a conversation/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To ignore or not choose someone for a position or promotion/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To ignore or not choose someone for a position or promotion/i)).toHaveAttribute(
      'title',
      'To ignore or not choose someone for a position or promotion.'
    );
  });
});

describeSectionToggle(LABEL, 'over', 'passOver_section_expanded', /To ignore or not choose someone for a position or promotion/i, renderPage);

describeChevronAndColour(LABEL, 'over', renderPage);

describeDefaultImageCards(LABEL, 'over', 'passOver', /To ignore or not choose someone for a position or promotion/i, /She was passed over for the leadership role, so she decided to leave the company\./i, renderPage, getCard);

// --- through ---

describe('PassVerbPage — "through" section definitions', () => {
  it('renders definition for travelling through a place briefly', () => {
    renderPage();
    expandSection('through');
    expect(screen.getByText(/To travel or stop in a place for a very short time/i)).toBeInTheDocument();
  });

  it('renders definition for experiencing a phase or situation', () => {
    renderPage();
    expandSection('through');
    expect(screen.getByText(/To experience a phase or situation/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('through');
    expect(screen.getByText(/To travel or stop in a place for a very short time/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('through');
    expect(screen.getByText(/To travel or stop in a place for a very short time/i)).toHaveAttribute(
      'title',
      'To travel or stop in a place for a very short time.'
    );
  });
});

describeSectionToggle(LABEL, 'through', 'passThrough_section_expanded', /To travel or stop in a place for a very short time/i, renderPage);

describeChevronAndColour(LABEL, 'through', renderPage);

describeDefaultImageCards(LABEL, 'through', 'passThrough', /To travel or stop in a place for a very short time/i, /I am just passing through Warsaw, so I only have time for a quick lunch\./i, renderPage, getCard);

// --- to ---

describe('PassVerbPage — "to" section definitions', () => {
  it('renders definition for transferring ownership or responsibility', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To transfer ownership or responsibility to someone else/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To transfer ownership or responsibility to someone else/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To transfer ownership or responsibility to someone else/i)).toHaveAttribute(
      'title',
      'To transfer ownership or responsibility to someone else.'
    );
  });
});

describeSectionToggle(LABEL, 'to', 'passTo_section_expanded', /To transfer ownership or responsibility to someone else/i, renderPage);

describeChevronAndColour(LABEL, 'to', renderPage);

describeDefaultImageCards(LABEL, 'to', 'passTo', /To transfer ownership or responsibility to someone else/i, /When the CEO retired, leadership passed to her deputy\./i, renderPage, getCard);

// --- up ---

describe('PassVerbPage — "up" section definitions', () => {
  it('renders definition for failing to take advantage of an opportunity', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To fail to take advantage of an opportunity/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To fail to take advantage of an opportunity/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To fail to take advantage of an opportunity/i)).toHaveAttribute(
      'title',
      'To fail to take advantage of an opportunity.'
    );
  });
});

describeSectionToggle(LABEL, 'up', 'passUp_section_expanded', /To fail to take advantage of an opportunity/i, renderPage);

describeChevronAndColour(LABEL, 'up', renderPage);

describeDefaultImageCards(LABEL, 'up', 'passUp', /To fail to take advantage of an opportunity/i, /You should not pass up the chance to lead this new team\./i, renderPage, getCard);
