import { screen } from '@testing-library/react';
import { expandSection, getCard, renderPage } from './helpers';
import { describeChevronAndColour, describeDefaultImageCards, describeSectionToggle } from '../verbPage/sharedSectionTests';

const LABEL = 'DropVerbPage';

beforeEach(() => {
  localStorage.clear();
});

// --- across ---

describe('DropVerbPage — "across" section definitions', () => {
  it('renders definition for happening to find or meet', () => {
    renderPage();
    expandSection('across');
    expect(screen.getByText(/To happen to find or meet/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('across');
    expect(screen.getByText(/To happen to find or meet/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('across');
    expect(screen.getByText(/To happen to find or meet/i)).toHaveAttribute(
      'title',
      'To happen to find or meet (very rare / old-fashioned; "come across" is almost always preferred today).'
    );
  });
});

describeSectionToggle(LABEL, 'across', 'dropAcross_section_expanded', /To happen to find or meet/i, renderPage);

describeChevronAndColour(LABEL, 'across', renderPage);

describeDefaultImageCards(LABEL, 'across', 'dropAcross', /To happen to find or meet/i, /I dropped across an old project file/i, renderPage, getCard);

// --- around_round ---

describe('DropVerbPage — "around / round" section definitions', () => {
  it('renders definition for visiting someone informally', () => {
    renderPage();
    expandSection('around / round');
    expect(screen.getByText(/To visit someone informally\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('around / round');
    expect(screen.getByText(/To visit someone informally\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('around / round');
    expect(screen.getByText(/To visit someone informally\./i)).toHaveAttribute(
      'title',
      'To visit someone informally.'
    );
  });
});

describeSectionToggle(LABEL, 'around / round', 'dropAround_section_expanded', /To visit someone informally\./i, renderPage);

describeChevronAndColour(LABEL, 'around / round', renderPage);

describeDefaultImageCards(LABEL, 'around / round', 'dropAround', /To visit someone informally\./i, /I will drop round the office/i, renderPage, getCard);

// --- away ---

describe('DropVerbPage — "away" section definitions', () => {
  it('renders definition for becoming weaker or gradually disappearing', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To become weaker, smaller, or gradually disappear\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To become weaker, smaller, or gradually disappear\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To become weaker, smaller, or gradually disappear\./i)).toHaveAttribute(
      'title',
      'To become weaker, smaller, or gradually disappear.'
    );
  });
});

describeSectionToggle(LABEL, 'away', 'dropAway_section_expanded', /To become weaker, smaller, or gradually disappear\./i, renderPage);

describeChevronAndColour(LABEL, 'away', renderPage);

describeDefaultImageCards(LABEL, 'away', 'dropAway', /To become weaker, smaller, or gradually disappear\./i, /Public interest in the old software version slowly dropped away/i, renderPage, getCard);

// --- back ---

describe('DropVerbPage — "back" section definitions', () => {
  it('renders definition for returning to a lower position', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To return to a lower position or level\./i)).toBeInTheDocument();
  });

  it('renders definition for moving into a position behind someone', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To move into a position behind someone else/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To return to a lower position or level\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To return to a lower position or level\./i)).toHaveAttribute(
      'title',
      'To return to a lower position or level.'
    );
  });
});

describeSectionToggle(LABEL, 'back', 'dropBack_section_expanded', /To return to a lower position or level\./i, renderPage);

describeChevronAndColour(LABEL, 'back', renderPage);

describeDefaultImageCards(LABEL, 'back', 'dropBack', /To return to a lower position or level\./i, /Our company's market share dropped back/i, renderPage, getCard);

// --- behind ---

describe('DropVerbPage — "behind" section definitions', () => {
  it('renders definition for failing to keep up with others', () => {
    renderPage();
    expandSection('behind');
    expect(screen.getByText(/To fail to keep up with others; to fall behind a schedule\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('behind');
    expect(screen.getByText(/To fail to keep up with others; to fall behind a schedule\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('behind');
    expect(screen.getByText(/To fail to keep up with others; to fall behind a schedule\./i)).toHaveAttribute(
      'title',
      'To fail to keep up with others; to fall behind a schedule.'
    );
  });
});

describeSectionToggle(LABEL, 'behind', 'dropBehind_section_expanded', /To fail to keep up with others; to fall behind a schedule\./i, renderPage);

describeChevronAndColour(LABEL, 'behind', renderPage);

describeDefaultImageCards(LABEL, 'behind', 'dropBehind', /To fail to keep up with others; to fall behind a schedule\./i, /We have dropped behind schedule/i, renderPage, getCard);

// --- by ---

describe('DropVerbPage — "by" section definitions', () => {
  it('renders definition for making a short informal visit', () => {
    renderPage();
    expandSection('by');
    expect(screen.getByText(/To make a short, informal visit \(similar to "drop in"\)\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('by');
    expect(screen.getByText(/To make a short, informal visit \(similar to "drop in"\)\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('by');
    expect(screen.getByText(/To make a short, informal visit \(similar to "drop in"\)\./i)).toHaveAttribute(
      'title',
      'To make a short, informal visit (similar to "drop in").'
    );
  });
});

describeSectionToggle(LABEL, 'by', 'dropBy_section_expanded', /To make a short, informal visit \(similar to "drop in"\)\./i, renderPage);

describeChevronAndColour(LABEL, 'by', renderPage);

describeDefaultImageCards(LABEL, 'by', 'dropBy', /To make a short, informal visit \(similar to "drop in"\)\./i, /Please drop by my desk later/i, renderPage, getCard);

// --- down ---

describe('DropVerbPage — "down" section definitions', () => {
  it('renders definition for falling to a lower position', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To fall or move to a lower position\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To fall or move to a lower position\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To fall or move to a lower position\./i)).toHaveAttribute(
      'title',
      'To fall or move to a lower position.'
    );
  });
});

describeSectionToggle(LABEL, 'down', 'dropDown_section_expanded', /To fall or move to a lower position\./i, renderPage);

describeChevronAndColour(LABEL, 'down', renderPage);

describeDefaultImageCards(LABEL, 'down', 'dropDown', /To fall or move to a lower position\./i, /select your country from the drop-down menu/i, renderPage, getCard);

// --- in ---

describe('DropVerbPage — "in" section definitions', () => {
  it('renders definition for making a short informal unplanned visit', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To make a short, informal visit without arranging it in advance\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To make a short, informal visit without arranging it in advance\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To make a short, informal visit without arranging it in advance\./i)).toHaveAttribute(
      'title',
      'To make a short, informal visit without arranging it in advance.'
    );
  });
});

describeSectionToggle(LABEL, 'in', 'dropIn_section_expanded', /To make a short, informal visit without arranging it in advance\./i, renderPage);

describeChevronAndColour(LABEL, 'in', renderPage);

describeDefaultImageCards(LABEL, 'in', 'dropIn', /To make a short, informal visit without arranging it in advance\./i, /Feel free to drop in if you have any questions/i, renderPage, getCard);

// --- into ---

describe('DropVerbPage — "into" section definitions', () => {
  it('renders definition for visiting a place briefly', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/To visit a place briefly\./i)).toBeInTheDocument();
  });

  it('renders definition for accidentally falling into a habit', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/To accidentally fall into a habit or state\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/To visit a place briefly\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/To visit a place briefly\./i)).toHaveAttribute(
      'title',
      'To visit a place briefly.'
    );
  });
});

describeSectionToggle(LABEL, 'into', 'dropInto_section_expanded', /To visit a place briefly\./i, renderPage);

describeChevronAndColour(LABEL, 'into', renderPage);

describeDefaultImageCards(LABEL, 'into', 'dropInto', /To visit a place briefly\./i, /I will drop into the IT department/i, renderPage, getCard);

// --- off ---

describe('DropVerbPage — "off" section definitions', () => {
  it('renders definition for taking someone or something to a place', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To take someone or something to a place and leave them there\./i)).toBeInTheDocument();
  });

  it('renders definition for decreasing in level or quality', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To decrease in level, amount, or quality\./i)).toBeInTheDocument();
  });

  it('renders definition for falling asleep', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To fall asleep\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To take someone or something to a place and leave them there\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To take someone or something to a place and leave them there\./i)).toHaveAttribute(
      'title',
      'To take someone or something to a place and leave them there.'
    );
  });
});

describeSectionToggle(LABEL, 'off', 'dropOff_section_expanded', /To take someone or something to a place and leave them there\./i, renderPage);

describeChevronAndColour(LABEL, 'off', renderPage);

describeDefaultImageCards(LABEL, 'off', 'dropOff', /To take someone or something to a place and leave them there\./i, /I will drop off the management report/i, renderPage, getCard);

// --- on ---

describe('DropVerbPage — "on" section definitions', () => {
  it('renders definition for criticizing someone suddenly', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To criticize or punish someone suddenly/i)).toBeInTheDocument();
  });

  it('renders definition for accidentally meeting someone', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To accidentally meet someone or find something/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To criticize or punish someone suddenly/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To criticize or punish someone suddenly/i)).toHaveAttribute(
      'title',
      'To criticize or punish someone suddenly (mainly UK, informal).'
    );
  });
});

describeSectionToggle(LABEL, 'on', 'dropOn_section_expanded', /To criticize or punish someone suddenly/i, renderPage);

describeChevronAndColour(LABEL, 'on', renderPage);

describeDefaultImageCards(LABEL, 'on', 'dropOn', /To criticize or punish someone suddenly/i, /The boss dropped on the development team/i, renderPage, getCard);

// --- out ---

describe('DropVerbPage — "out" section definitions', () => {
  it('renders definition for stopping participation in something', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To stop participating or being involved in something\./i)).toBeInTheDocument();
  });

  it('renders definition for leaving school before finishing', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To leave a school, college, or course before finishing\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To stop participating or being involved in something\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To stop participating or being involved in something\./i)).toHaveAttribute(
      'title',
      'To stop participating or being involved in something.'
    );
  });
});

describeSectionToggle(LABEL, 'out', 'dropOut_section_expanded', /To stop participating or being involved in something\./i, renderPage);

describeChevronAndColour(LABEL, 'out', renderPage);

describeDefaultImageCards(LABEL, 'out', 'dropOut', /To stop participating or being involved in something\./i, /One of our main investors dropped out/i, renderPage, getCard);

// --- over ---

describe('DropVerbPage — "over" section definitions', () => {
  it('renders definition for visiting someone informally at their location', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To visit someone informally at their location/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To visit someone informally at their location/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To visit someone informally at their location/i)).toHaveAttribute(
      'title',
      'To visit someone informally at their location (often their home).'
    );
  });
});

describeSectionToggle(LABEL, 'over', 'dropOver_section_expanded', /To visit someone informally at their location/i, renderPage);

describeChevronAndColour(LABEL, 'over', renderPage);

describeDefaultImageCards(LABEL, 'over', 'dropOver', /To visit someone informally at their location/i, /drop over later to review the Java architecture/i, renderPage, getCard);

// --- through ---

describe('DropVerbPage — "through" section definitions', () => {
  it('renders definition for failing to happen or be completed', () => {
    renderPage();
    expandSection('through');
    expect(screen.getByText(/To fail to happen or fail to be completed/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('through');
    expect(screen.getByText(/To fail to happen or fail to be completed/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('through');
    expect(screen.getByText(/To fail to happen or fail to be completed/i)).toHaveAttribute(
      'title',
      'To fail to happen or fail to be completed ("fall through" is much more common but "drop through" is sometimes used).'
    );
  });
});

describeSectionToggle(LABEL, 'through', 'dropThrough_section_expanded', /To fail to happen or fail to be completed/i, renderPage);

describeChevronAndColour(LABEL, 'through', renderPage);

describeDefaultImageCards(LABEL, 'through', 'dropThrough', /To fail to happen or fail to be completed/i, /The business merger dropped through/i, renderPage, getCard);

// --- to ---

describe('DropVerbPage — "to" section definitions', () => {
  it('renders definition for decreasing to a specific level', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To decrease to a specific level or amount\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To decrease to a specific level or amount\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To decrease to a specific level or amount\./i)).toHaveAttribute(
      'title',
      'To decrease to a specific level or amount.'
    );
  });
});

describeSectionToggle(LABEL, 'to', 'dropTo_section_expanded', /To decrease to a specific level or amount\./i, renderPage);

describeChevronAndColour(LABEL, 'to', renderPage);

describeDefaultImageCards(LABEL, 'to', 'dropTo', /To decrease to a specific level or amount\./i, /The server response time dropped to 50 milliseconds/i, renderPage, getCard);
