import { screen } from '@testing-library/react';
import { expandSection, getCard, renderPage } from './helpers';
import { describeChevronAndColour, describeDefaultImageCards, describeSectionToggle } from '../verbPage/sharedSectionTests';

const LABEL = 'LayVerbPage';

beforeEach(() => {
  localStorage.clear();
});

// --- about ---

describe('LayVerbPage — "about" section definitions', () => {
  it('renders definition for attacking violently', () => {
    renderPage();
    expandSection('about');
    expect(screen.getByText(/To hit out in all directions; to attack violently\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('about');
    expect(screen.getByText(/To hit out in all directions; to attack violently\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('about');
    expect(screen.getByText(/To hit out in all directions; to attack violently\./i)).toHaveAttribute(
      'title',
      'To hit out in all directions; to attack violently.'
    );
  });
});

describeSectionToggle(LABEL, 'about', 'layAbout_section_expanded', /To hit out in all directions; to attack violently\./i, renderPage);

describeChevronAndColour(LABEL, 'about', renderPage);

describeDefaultImageCards(LABEL, 'about', 'layAbout', /To hit out in all directions; to attack violently\./i, /When the attackers approached, he began laying about him with a heavy stick\./i, renderPage, getCard);

// --- away ---

describe('LayVerbPage — "away" section definitions', () => {
  it('renders definition for saving money for future use', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To save money or goods for future use/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To save money or goods for future use/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To save money or goods for future use/i)).toHaveAttribute(
      'title',
      'To save money or goods for future use (often used in retail as "layaway").'
    );
  });
});

describeSectionToggle(LABEL, 'away', 'layAway_section_expanded', /To save money or goods for future use/i, renderPage);

describeChevronAndColour(LABEL, 'away', renderPage);

describeDefaultImageCards(LABEL, 'away', 'layAway', /To save money or goods for future use/i, /The company lays away a portion of its quarterly profits for future software investments\./i, renderPage, getCard);

// --- by ---

describe('LayVerbPage — "by" section definitions', () => {
  it('renders definition for saving money for a specific future need', () => {
    renderPage();
    expandSection('by');
    expect(screen.getByText(/To save money for a specific future need/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('by');
    expect(screen.getByText(/To save money for a specific future need/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('by');
    expect(screen.getByText(/To save money for a specific future need/i)).toHaveAttribute(
      'title',
      'To save money for a specific future need (similar to lay away).'
    );
  });
});

describeSectionToggle(LABEL, 'by', 'layBy_section_expanded', /To save money for a specific future need/i, renderPage);

describeChevronAndColour(LABEL, 'by', renderPage);

describeDefaultImageCards(LABEL, 'by', 'layBy', /To save money for a specific future need/i, /She laid by some money every month to fund her new startup\./i, renderPage, getCard);

// --- down ---

describe('LayVerbPage — "down" section definitions', () => {
  it('renders definition for establishing a rule or policy', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To officially establish a rule, policy, or principle\./i)).toBeInTheDocument();
  });

  it('renders definition for surrendering weapons', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To surrender weapons; to stop fighting\./i)).toBeInTheDocument();
  });

  it('renders definition for recording music', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To record music or audio\./i)).toBeInTheDocument();
  });

  it('renders definition for storing wine for aging', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To store wine in a cellar for aging\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To officially establish a rule, policy, or principle\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To officially establish a rule, policy, or principle\./i)).toHaveAttribute(
      'title',
      'To officially establish a rule, policy, or principle.'
    );
  });
});

describeSectionToggle(LABEL, 'down', 'layDown_section_expanded', /To officially establish a rule, policy, or principle\./i, renderPage);

describeChevronAndColour(LABEL, 'down', renderPage);

describeDefaultImageCards(LABEL, 'down', 'layDown', /To officially establish a rule, policy, or principle\./i, /The management team laid down clear guidelines for remote work\./i, renderPage, getCard);

// --- for ---

describe('LayVerbPage — "for" section definitions', () => {
  it('renders definition for waiting to ambush someone', () => {
    renderPage();
    expandSection('for');
    expect(screen.getByText(/To wait secretly to attack someone/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('for');
    expect(screen.getByText(/To wait secretly to attack someone/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('for');
    expect(screen.getByText(/To wait secretly to attack someone/i)).toHaveAttribute(
      'title',
      'To wait secretly to attack someone; to ambush (old-fashioned/rare).'
    );
  });
});

describeSectionToggle(LABEL, 'for', 'layFor_section_expanded', /To wait secretly to attack someone/i, renderPage);

describeChevronAndColour(LABEL, 'for', renderPage);

describeDefaultImageCards(LABEL, 'for', 'layFor', /To wait secretly to attack someone/i, /The thieves were laying for the manager outside the bank\./i, renderPage, getCard);

// --- in ---

describe('LayVerbPage — "in" section definitions', () => {
  it('renders definition for storing a large supply', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To collect and store a large supply of something for future use\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To collect and store a large supply of something for future use\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To collect and store a large supply of something for future use\./i)).toHaveAttribute(
      'title',
      'To collect and store a large supply of something for future use.'
    );
  });
});

describeSectionToggle(LABEL, 'in', 'layIn_section_expanded', /To collect and store a large supply of something for future use\./i, renderPage);

describeChevronAndColour(LABEL, 'in', renderPage);

describeDefaultImageCards(LABEL, 'in', 'layIn', /To collect and store a large supply of something for future use\./i, /We need to lay in plenty of coffee before the development team starts the big sprint\./i, renderPage, getCard);

// --- into ---

describe('LayVerbPage — "into" section definitions', () => {
  it('renders definition for criticizing or attacking angrily', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/To criticize someone angrily or attack them physically\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/To criticize someone angrily or attack them physically\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/To criticize someone angrily or attack them physically\./i)).toHaveAttribute(
      'title',
      'To criticize someone angrily or attack them physically.'
    );
  });
});

describeSectionToggle(LABEL, 'into', 'layInto_section_expanded', /To criticize someone angrily or attack them physically\./i, renderPage);

describeChevronAndColour(LABEL, 'into', renderPage);

describeDefaultImageCards(LABEL, 'into', 'layInto', /To criticize someone angrily or attack them physically\./i, /The lead developer laid into the junior programmer for pushing broken code to the main server\./i, renderPage, getCard);

// --- off ---

describe('LayVerbPage — "off" section definitions', () => {
  it("renders definition for ending a worker's employment", () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To end a worker's employment/i)).toBeInTheDocument();
  });

  it('renders definition for stopping criticism or bothering', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To stop criticizing or bothering someone\./i)).toBeInTheDocument();
  });

  it('renders definition for stopping using something', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To stop using, consuming, or doing something for a while\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To end a worker's employment/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To end a worker's employment/i)).toHaveAttribute(
      'title',
      "To end a worker's employment, usually because the company has no work or no budget."
    );
  });
});

describeSectionToggle(LABEL, 'off', 'layOff_section_expanded', /To end a worker's employment/i, renderPage);

describeChevronAndColour(LABEL, 'off', renderPage);

describeDefaultImageCards(LABEL, 'off', 'layOff', /To end a worker's employment/i, /The business had to lay off 20 employees due to the economic crisis\./i, renderPage, getCard);

// --- on ---

describe('LayVerbPage — "on" section definitions', () => {
  it('renders definition for providing food or entertainment', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To provide or supply something, especially food, entertainment, or transport\./i)).toBeInTheDocument();
  });

  it('renders definition for applying thickly or exaggerating', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To apply something very thickly/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To provide or supply something, especially food, entertainment, or transport\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To provide or supply something, especially food, entertainment, or transport\./i)).toHaveAttribute(
      'title',
      'To provide or supply something, especially food, entertainment, or transport.'
    );
  });
});

describeSectionToggle(LABEL, 'on', 'layOn_section_expanded', /To provide or supply something, especially food, entertainment, or transport\./i, renderPage);

describeChevronAndColour(LABEL, 'on', renderPage);

describeDefaultImageCards(LABEL, 'on', 'layOn', /To provide or supply something, especially food, entertainment, or transport\./i, /The company laid on a massive buffet for the leadership conference\./i, renderPage, getCard);

// --- out ---

describe('LayVerbPage — "out" section definitions', () => {
  it('renders definition for explaining a plan clearly', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To explain a plan or idea clearly and in detail\./i)).toBeInTheDocument();
  });

  it('renders definition for arranging things visibly', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To arrange things so they can be easily seen or used\./i)).toBeInTheDocument();
  });

  it('renders definition for spending a large amount of money', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To spend a large amount of money\./i)).toBeInTheDocument();
  });

  it('renders definition for knocking someone unconscious', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To knock someone unconscious\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To explain a plan or idea clearly and in detail\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To explain a plan or idea clearly and in detail\./i)).toHaveAttribute(
      'title',
      'To explain a plan or idea clearly and in detail.'
    );
  });
});

describeSectionToggle(LABEL, 'out', 'layOut_section_expanded', /To explain a plan or idea clearly and in detail\./i, renderPage);

describeChevronAndColour(LABEL, 'out', renderPage);

describeDefaultImageCards(LABEL, 'out', 'layOut', /To explain a plan or idea clearly and in detail\./i, /The CEO laid out the new business strategy during the meeting\./i, renderPage, getCard);

// --- over ---

describe('LayVerbPage — "over" section definitions', () => {
  it('renders definition for stopping temporarily during a journey', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To stop somewhere temporarily during a long journey/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To stop somewhere temporarily during a long journey/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To stop somewhere temporarily during a long journey/i)).toHaveAttribute(
      'title',
      'To stop somewhere temporarily during a long journey (this creates the noun "layover").'
    );
  });
});

describeSectionToggle(LABEL, 'over', 'layOver_section_expanded', /To stop somewhere temporarily during a long journey/i, renderPage);

describeChevronAndColour(LABEL, 'over', renderPage);

describeDefaultImageCards(LABEL, 'over', 'layOver', /To stop somewhere temporarily during a long journey/i, /I had to lay over in Frankfurt for six hours before my connecting flight to New York\./i, renderPage, getCard);

// --- to ---

describe('LayVerbPage — "to" section definitions', () => {
  it('renders definition for bringing a ship to a standstill', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To bring a ship to a standstill while facing the wind\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To bring a ship to a standstill while facing the wind\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To bring a ship to a standstill while facing the wind\./i)).toHaveAttribute(
      'title',
      '(Nautical) To bring a ship to a standstill while facing the wind.'
    );
  });
});

describeSectionToggle(LABEL, 'to', 'layTo_section_expanded', /To bring a ship to a standstill while facing the wind\./i, renderPage);

describeChevronAndColour(LABEL, 'to', renderPage);

describeDefaultImageCards(LABEL, 'to', 'layTo', /To bring a ship to a standstill while facing the wind\./i, /The captain decided to lay to until the storm passed\./i, renderPage, getCard);

// --- up ---

describe('LayVerbPage — "up" section definitions', () => {
  it('renders definition for being forced to stay in bed', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To be forced to stay in bed because of illness or injury/i)).toBeInTheDocument();
  });

  it('renders definition for taking something out of active use', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To take something out of active use and store it/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To be forced to stay in bed because of illness or injury/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To be forced to stay in bed because of illness or injury/i)).toHaveAttribute(
      'title',
      'To be forced to stay in bed because of illness or injury (usually used in the passive: "laid up").'
    );
  });
});

describeSectionToggle(LABEL, 'up', 'layUp_section_expanded', /To be forced to stay in bed because of illness or injury/i, renderPage);

describeChevronAndColour(LABEL, 'up', renderPage);

describeDefaultImageCards(LABEL, 'up', 'layUp', /To be forced to stay in bed because of illness or injury/i, /Our project manager is laid up with the flu and won't be in the office this week\./i, renderPage, getCard);
