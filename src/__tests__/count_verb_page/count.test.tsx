import { screen } from '@testing-library/react';
import { expandSection, getCard, renderPage } from './helpers';
import { describeChevronAndColour, describeDefaultImageCards, describeSectionToggle } from '../verbPage/sharedSectionTests';

const LABEL = 'CountVerbPage';

beforeEach(() => {
  localStorage.clear();
});

// --- against ---

describe('CountVerbPage — "against" section definitions', () => {
  it('renders definition for being considered a disadvantage', () => {
    renderPage();
    expandSection('against');
    expect(screen.getByText(/To be considered a disadvantage or a negative point for someone\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('against');
    expect(screen.getByText(/To be considered a disadvantage or a negative point for someone\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('against');
    expect(screen.getByText(/To be considered a disadvantage or a negative point for someone\./i)).toHaveAttribute(
      'title',
      'To be considered a disadvantage or a negative point for someone.'
    );
  });
});

describeSectionToggle(LABEL, 'against', 'countAgainst_section_expanded', /To be considered a disadvantage or a negative point for someone\./i, renderPage);

describeChevronAndColour(LABEL, 'against', renderPage);

describeDefaultImageCards(LABEL, 'against', 'countAgainst', /To be considered a disadvantage or a negative point for someone\./i, /His lack of management experience might count against him/i, renderPage, getCard);

// --- back ---

describe('CountVerbPage — "back" section definitions', () => {
  it('renders definition for counting backwards from a number or date', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To count backwards from a specific number or date to calculate something\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To count backwards from a specific number or date to calculate something\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To count backwards from a specific number or date to calculate something\./i)).toHaveAttribute(
      'title',
      'To count backwards from a specific number or date to calculate something.'
    );
  });
});

describeSectionToggle(LABEL, 'back', 'countBack_section_expanded', /To count backwards from a specific number or date to calculate something\./i, renderPage);

describeChevronAndColour(LABEL, 'back', renderPage);

describeDefaultImageCards(LABEL, 'back', 'countBack', /To count backwards from a specific number or date to calculate something\./i, /we need to count back six weeks from today/i, renderPage, getCard);

// --- down ---

describe('CountVerbPage — "down" section definitions', () => {
  it('renders definition for saying numbers backwards to zero', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To say numbers backwards to zero, usually before a big event\./i)).toBeInTheDocument();
  });

  it('renders definition for waiting eagerly for an event', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To wait eagerly for an event to happen\./i)).toBeInTheDocument();
  });

  it('first definition paragraph has truncate class', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To say numbers backwards to zero, usually before a big event\./i)).toHaveClass('truncate');
  });

  it('first definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To say numbers backwards to zero, usually before a big event\./i)).toHaveAttribute(
      'title',
      'To say numbers backwards to zero, usually before a big event.'
    );
  });
});

describeSectionToggle(LABEL, 'down', 'countDown_section_expanded', /To say numbers backwards to zero, usually before a big event\./i, renderPage);

describeChevronAndColour(LABEL, 'down', renderPage);

describeDefaultImageCards(LABEL, 'down', 'countDown', /To say numbers backwards to zero, usually before a big event\./i, /The crowd started to count down from ten/i, renderPage, getCard);

// --- for ---

describe('CountVerbPage — "for" section definitions', () => {
  it('renders definition for having importance or value', () => {
    renderPage();
    expandSection('for');
    expect(screen.getByText(/To have a specific level of importance or value\./i)).toBeInTheDocument();
  });

  it('renders definition for being worth something', () => {
    renderPage();
    expandSection('for');
    expect(screen.getByText(/To be worth something \(often used with "nothing" or "something"\)\./i)).toBeInTheDocument();
  });

  it('first definition paragraph has truncate class', () => {
    renderPage();
    expandSection('for');
    expect(screen.getByText(/To have a specific level of importance or value\./i)).toHaveClass('truncate');
  });

  it('first definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('for');
    expect(screen.getByText(/To have a specific level of importance or value\./i)).toHaveAttribute(
      'title',
      'To have a specific level of importance or value.'
    );
  });
});

describeSectionToggle(LABEL, 'for', 'countFor_section_expanded', /To have a specific level of importance or value\./i, renderPage);

describeChevronAndColour(LABEL, 'for', renderPage);

describeDefaultImageCards(LABEL, 'for', 'countFor', /To have a specific level of importance or value\./i, /Good communication skills count for a lot/i, renderPage, getCard);

// --- in ---

describe('CountVerbPage — "in" section definitions', () => {
  it('renders definition for including someone in an activity', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To include someone in an activity, group, or plan\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To include someone in an activity, group, or plan\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To include someone in an activity, group, or plan\./i)).toHaveAttribute(
      'title',
      'To include someone in an activity, group, or plan.'
    );
  });
});

describeSectionToggle(LABEL, 'in', 'countIn_section_expanded', /To include someone in an activity, group, or plan\./i, renderPage);

describeChevronAndColour(LABEL, 'in', renderPage);

describeDefaultImageCards(LABEL, 'in', 'countIn', /To include someone in an activity, group, or plan\./i, /please count me in/i, renderPage, getCard);

// --- off ---

describe('CountVerbPage — "off" section definitions', () => {
  it('renders definition for saying numbers aloud to divide a group', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To say numbers aloud in order, usually to divide a group of people into smaller teams\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To say numbers aloud in order, usually to divide a group of people into smaller teams\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To say numbers aloud in order, usually to divide a group of people into smaller teams\./i)).toHaveAttribute(
      'title',
      'To say numbers aloud in order, usually to divide a group of people into smaller teams.'
    );
  });
});

describeSectionToggle(LABEL, 'off', 'countOff_section_expanded', /To say numbers aloud in order, usually to divide a group of people into smaller teams\./i, renderPage);

describeChevronAndColour(LABEL, 'off', renderPage);

describeDefaultImageCards(LABEL, 'off', 'countOff', /To say numbers aloud in order, usually to divide a group of people into smaller teams\./i, /The coach asked the players to count off by threes/i, renderPage, getCard);

// --- on ---

describe('CountVerbPage — "on" section definitions', () => {
  it('renders definition for depending on someone', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To depend or rely on someone to do something\./i)).toBeInTheDocument();
  });

  it('renders definition for expecting something to happen', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To expect something to happen and base your plans on it\./i)).toBeInTheDocument();
  });

  it('first definition paragraph has truncate class', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To depend or rely on someone to do something\./i)).toHaveClass('truncate');
  });

  it('first definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To depend or rely on someone to do something\./i)).toHaveAttribute(
      'title',
      'To depend or rely on someone to do something.'
    );
  });
});

describeSectionToggle(LABEL, 'on', 'countOn_section_expanded', /To depend or rely on someone to do something\./i, renderPage);

describeChevronAndColour(LABEL, 'on', renderPage);

describeDefaultImageCards(LABEL, 'on', 'countOn', /To depend or rely on someone to do something\./i, /You can always count on Sarah/i, renderPage, getCard);

// --- out ---

describe('CountVerbPage — "out" section definitions', () => {
  it('renders definition for not including someone in an activity', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To not include someone in an activity or plan\./i)).toBeInTheDocument();
  });

  it('renders definition for counting things one by one', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To count things one by one, often when distributing them \(like money\)\./i)).toBeInTheDocument();
  });

  it('renders definition for declaring a fighter defeated in boxing', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/\(In boxing\) To declare a fighter defeated/i)).toBeInTheDocument();
  });

  it('first definition paragraph has truncate class', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To not include someone in an activity or plan\./i)).toHaveClass('truncate');
  });

  it('first definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To not include someone in an activity or plan\./i)).toHaveAttribute(
      'title',
      'To not include someone in an activity or plan.'
    );
  });
});

describeSectionToggle(LABEL, 'out', 'countOut_section_expanded', /To not include someone in an activity or plan\./i, renderPage);

describeChevronAndColour(LABEL, 'out', renderPage);

describeDefaultImageCards(LABEL, 'out', 'countOut', /To not include someone in an activity or plan\./i, /count me out/i, renderPage, getCard);

// --- up ---

describe('CountVerbPage — "up" section definitions', () => {
  it('renders definition for adding things together to find a total', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To add things together to find the total amount\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To add things together to find the total amount\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To add things together to find the total amount\./i)).toHaveAttribute(
      'title',
      'To add things together to find the total amount.'
    );
  });
});

describeSectionToggle(LABEL, 'up', 'countUp_section_expanded', /To add things together to find the total amount\./i, renderPage);

describeChevronAndColour(LABEL, 'up', renderPage);

describeDefaultImageCards(LABEL, 'up', 'countUp', /To add things together to find the total amount\./i, /Please count up all the expenses/i, renderPage, getCard);
