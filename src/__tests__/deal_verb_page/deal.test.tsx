import { screen } from '@testing-library/react';
import { expandSection, getCard, renderPage } from './helpers';
import { describeChevronAndColour, describeDefaultImageCards, describeSectionToggle } from '../verbPage/sharedSectionTests';

const LABEL = 'DealVerbPage';

beforeEach(() => {
  localStorage.clear();
});

// --- around_round ---

describe('DealVerbPage — "around / round" section definitions', () => {
  it('renders definition for giving a share to everyone present', () => {
    renderPage();
    expandSection('around / round');
    expect(screen.getByText(/To give a share of something to everyone present in a circle or group\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('around / round');
    expect(screen.getByText(/To give a share of something to everyone present in a circle or group\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('around / round');
    expect(screen.getByText(/To give a share of something to everyone present in a circle or group\./i)).toHaveAttribute(
      'title',
      'To give a share of something to everyone present in a circle or group.'
    );
  });
});

describeSectionToggle(LABEL, 'around / round', 'dealAround_section_expanded', /To give a share of something to everyone present in a circle or group\./i, renderPage);

describeChevronAndColour(LABEL, 'around / round', renderPage);

describeDefaultImageCards(LABEL, 'around / round', 'dealAround', /To give a share of something to everyone present in a circle or group\./i, /Please deal the documents around so everyone has a copy/i, renderPage, getCard);

// --- away ---

describe('DealVerbPage — "away" section definitions', () => {
  it('renders definition for giving something away in a trade', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To give something away in a trade or negotiation, often losing a valuable asset\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To give something away in a trade or negotiation, often losing a valuable asset\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To give something away in a trade or negotiation, often losing a valuable asset\./i)).toHaveAttribute(
      'title',
      'To give something away in a trade or negotiation, often losing a valuable asset.'
    );
  });
});

describeSectionToggle(LABEL, 'away', 'dealAway_section_expanded', /To give something away in a trade or negotiation, often losing a valuable asset\./i, renderPage);

describeChevronAndColour(LABEL, 'away', renderPage);

describeDefaultImageCards(LABEL, 'away', 'dealAway', /To give something away in a trade or negotiation, often losing a valuable asset\./i, /The company dealt away its most profitable division/i, renderPage, getCard);

// --- by ---

describe('DealVerbPage — "by" section definitions', () => {
  it('renders definition for treating someone in a particular way', () => {
    renderPage();
    expandSection('by');
    expect(screen.getByText(/To treat someone in a particular way \(formal \/ old-fashioned\)\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('by');
    expect(screen.getByText(/To treat someone in a particular way \(formal \/ old-fashioned\)\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('by');
    expect(screen.getByText(/To treat someone in a particular way \(formal \/ old-fashioned\)\./i)).toHaveAttribute(
      'title',
      'To treat someone in a particular way (formal / old-fashioned).'
    );
  });
});

describeSectionToggle(LABEL, 'by', 'dealBy_section_expanded', /To treat someone in a particular way \(formal \/ old-fashioned\)\./i, renderPage);

describeChevronAndColour(LABEL, 'by', renderPage);

describeDefaultImageCards(LABEL, 'by', 'dealBy', /To treat someone in a particular way \(formal \/ old-fashioned\)\./i, /she had been dealt by unfairly in the promotion process/i, renderPage, getCard);

// --- in ---

describe('DealVerbPage — "in" section definitions', () => {
  it('renders definition for buying and selling products as a business', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To buy and sell specific products as a business\./i)).toBeInTheDocument();
  });

  it('renders definition for including someone in an activity', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To include someone in an activity, especially a card game\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To buy and sell specific products as a business\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To buy and sell specific products as a business\./i)).toHaveAttribute(
      'title',
      'To buy and sell specific products as a business.'
    );
  });
});

describeSectionToggle(LABEL, 'in', 'dealIn_section_expanded', /To buy and sell specific products as a business\./i, renderPage);

describeChevronAndColour(LABEL, 'in', renderPage);

describeDefaultImageCards(LABEL, 'in', 'dealIn', /To buy and sell specific products as a business\./i, /His store deals in rare books and antique maps/i, renderPage, getCard);

// --- into ---

describe('DealVerbPage — "into" section definitions', () => {
  it('renders definition for including someone in a group or game', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/To physically or metaphorically include someone in a group or game/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/To physically or metaphorically include someone in a group or game/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/To physically or metaphorically include someone in a group or game/i)).toHaveAttribute(
      'title',
      'To physically or metaphorically include someone in a group or game (very similar to "deal in").'
    );
  });
});

describeSectionToggle(LABEL, 'into', 'dealInto_section_expanded', /To physically or metaphorically include someone in a group or game/i, renderPage);

describeChevronAndColour(LABEL, 'into', renderPage);

describeDefaultImageCards(LABEL, 'into', 'dealInto', /To physically or metaphorically include someone in a group or game/i, /we will deal you into the game/i, renderPage, getCard);

// --- out ---

describe('DealVerbPage — "out" section definitions', () => {
  it('renders definition for distributing things among a group', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To distribute or share things among a group of people\./i)).toBeInTheDocument();
  });

  it('renders definition for giving a punishment', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To give a punishment to someone\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To distribute or share things among a group of people\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To distribute or share things among a group of people\./i)).toHaveAttribute(
      'title',
      'To distribute or share things among a group of people.'
    );
  });
});

describeSectionToggle(LABEL, 'out', 'dealOut_section_expanded', /To distribute or share things among a group of people\./i, renderPage);

describeChevronAndColour(LABEL, 'out', renderPage);

describeDefaultImageCards(LABEL, 'out', 'dealOut', /To distribute or share things among a group of people\./i, /The manager dealt out the new project assignments/i, renderPage, getCard);

// --- to ---

describe('DealVerbPage — "to" section definitions', () => {
  it('renders definition for taking strong action to fix a problem', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To punish, attack someone, or take strong action to fix a problem/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To punish, attack someone, or take strong action to fix a problem/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To punish, attack someone, or take strong action to fix a problem/i)).toHaveAttribute(
      'title',
      'To punish, attack someone, or take strong action to fix a problem (Regional: Australia / New Zealand).'
    );
  });
});

describeSectionToggle(LABEL, 'to', 'dealTo_section_expanded', /To punish, attack someone, or take strong action to fix a problem/i, renderPage);

describeChevronAndColour(LABEL, 'to', renderPage);

describeDefaultImageCards(LABEL, 'to', 'dealTo', /To punish, attack someone, or take strong action to fix a problem/i, /the IT department will have to deal to it/i, renderPage, getCard);

// --- with ---

describe('DealVerbPage — "with" section definitions', () => {
  it('renders definition for taking action to solve a problem', () => {
    renderPage();
    expandSection('with');
    expect(screen.getByText(/To take action to solve a problem or complete a task\./i)).toBeInTheDocument();
  });

  it('renders definition for doing business with someone', () => {
    renderPage();
    expandSection('with');
    expect(screen.getByText(/To do business with someone or an organization\./i)).toBeInTheDocument();
  });

  it('renders definition for being about a specific subject', () => {
    renderPage();
    expandSection('with');
    expect(screen.getByText(/To be about a specific subject\./i)).toBeInTheDocument();
  });

  it('renders definition for managing difficult emotions', () => {
    renderPage();
    expandSection('with');
    expect(screen.getByText(/To manage or handle difficult emotions or situations\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('with');
    expect(screen.getByText(/To take action to solve a problem or complete a task\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('with');
    expect(screen.getByText(/To take action to solve a problem or complete a task\./i)).toHaveAttribute(
      'title',
      'To take action to solve a problem or complete a task.'
    );
  });
});

describeSectionToggle(LABEL, 'with', 'dealWith_section_expanded', /To take action to solve a problem or complete a task\./i, renderPage);

describeChevronAndColour(LABEL, 'with', renderPage);

describeDefaultImageCards(LABEL, 'with', 'dealWith', /To take action to solve a problem or complete a task\./i, /I have a lot of emails to deal with this morning/i, renderPage, getCard);
