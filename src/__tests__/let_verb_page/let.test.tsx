import { screen } from '@testing-library/react';
import { expandSection, getCard, renderPage } from './helpers';
import { describeChevronAndColour, describeDefaultImageCards, describeSectionToggle } from '../verbPage/sharedSectionTests';

const LABEL = 'LetVerbPage';

beforeEach(() => {
  localStorage.clear();
});

// --- by ---

describe('LetVerbPage — "by" section definitions', () => {
  it('renders definition for moving aside to let someone pass', () => {
    renderPage();
    expandSection('by');
    expect(screen.getByText(/To move aside to allow someone or something to pass you/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('by');
    expect(screen.getByText(/To move aside to allow someone or something to pass you/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('by');
    expect(screen.getByText(/To move aside to allow someone or something to pass you/i)).toHaveAttribute(
      'title',
      'To move aside to allow someone or something to pass you.'
    );
  });
});

describeSectionToggle(LABEL, 'by', 'letBy_section_expanded', /To move aside to allow someone or something to pass you/i, renderPage);

describeChevronAndColour(LABEL, 'by', renderPage);

describeDefaultImageCards(LABEL, 'by', 'letBy', /To move aside to allow someone or something to pass you/i, /Please step aside and let the paramedics by\./i, renderPage, getCard);

// --- down ---

describe('LetVerbPage — "down" section definitions', () => {
  it('renders definition for disappointing someone', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To disappoint someone by failing to do what you promised/i)).toBeInTheDocument();
  });

  it('renders definition for making clothing longer', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To make clothing longer/i)).toBeInTheDocument();
  });

  it('renders definition for allowing air to escape', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To allow air to escape from something/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To disappoint someone by failing to do what you promised/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To disappoint someone by failing to do what you promised/i)).toHaveAttribute(
      'title',
      'To disappoint someone by failing to do what you promised or what they expected.'
    );
  });
});

describeSectionToggle(LABEL, 'down', 'letDown_section_expanded', /To disappoint someone by failing to do what you promised/i, renderPage);

describeChevronAndColour(LABEL, 'down', renderPage);

describeDefaultImageCards(LABEL, 'down', 'letDown', /To disappoint someone by failing to do what you promised/i, /The manager promised a bonus, but she let the team down by canceling it\./i, renderPage, getCard);

// --- in ---

describe('LetVerbPage — "in" section definitions', () => {
  it('renders definition for allowing someone to enter a place', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To allow someone or something to enter a place/i)).toBeInTheDocument();
  });

  it('renders definition for sharing a secret', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To allow someone to share a secret or know about a special plan/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To allow someone or something to enter a place/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To allow someone or something to enter a place/i)).toHaveAttribute(
      'title',
      'To allow someone or something to enter a place.'
    );
  });
});

describeSectionToggle(LABEL, 'in', 'letIn_section_expanded', /To allow someone or something to enter a place/i, renderPage);

describeChevronAndColour(LABEL, 'in', renderPage);

describeDefaultImageCards(LABEL, 'in', 'letIn', /To allow someone or something to enter a place/i, /Please open the door and let the client in\./i, renderPage, getCard);

// --- into ---

describe('LetVerbPage — "into" section definitions', () => {
  it('renders definition for allowing someone to enter a building', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/To allow someone to enter a room or building/i)).toBeInTheDocument();
  });

  it('renders definition for sharing a secret', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/To share a secret with someone/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/To allow someone to enter a room or building/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/To allow someone to enter a room or building/i)).toHaveAttribute(
      'title',
      'To allow someone to enter a room or building.'
    );
  });
});

describeSectionToggle(LABEL, 'into', 'letInto_section_expanded', /To allow someone to enter a room or building/i, renderPage);

describeChevronAndColour(LABEL, 'into', renderPage);

describeDefaultImageCards(LABEL, 'into', 'letInto', /To allow someone to enter a room or building/i, /The security guard let us into the server room\./i, renderPage, getCard);

// --- off ---

describe('LetVerbPage — "off" section definitions', () => {
  it('renders definition for not punishing someone', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To not punish someone, or to give them a very light punishment/i)).toBeInTheDocument();
  });

  it('renders definition for making something explode', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To make a bomb explode, or to fire a gun or firework/i)).toBeInTheDocument();
  });

  it('renders definition for excusing someone from a duty', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To excuse someone from a duty or obligation/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To not punish someone, or to give them a very light punishment/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To not punish someone, or to give them a very light punishment/i)).toHaveAttribute(
      'title',
      'To not punish someone, or to give them a very light punishment.'
    );
  });
});

describeSectionToggle(LABEL, 'off', 'letOff_section_expanded', /To not punish someone, or to give them a very light punishment/i, renderPage);

describeChevronAndColour(LABEL, 'off', renderPage);

describeDefaultImageCards(LABEL, 'off', 'letOff', /To not punish someone, or to give them a very light punishment/i, /The boss let him off with a warning for being late to the meeting\./i, renderPage, getCard);

// --- on ---

describe('LetVerbPage — "on" section definitions', () => {
  it('renders definition for revealing a secret', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To reveal a secret or show that you know something/i)).toBeInTheDocument();
  });

  it('renders definition for pretending', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To pretend/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To reveal a secret or show that you know something/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To reveal a secret or show that you know something/i)).toHaveAttribute(
      'title',
      'To reveal a secret or show that you know something.'
    );
  });
});

describeSectionToggle(LABEL, 'on', 'letOn_section_expanded', /To reveal a secret or show that you know something/i, renderPage);

describeChevronAndColour(LABEL, 'on', renderPage);

describeDefaultImageCards(LABEL, 'on', 'letOn', /To reveal a secret or show that you know something/i, /We are planning a surprise party, so please don't let on\./i, renderPage, getCard);

// --- out ---

describe('LetVerbPage — "out" section definitions', () => {
  it('renders definition for allowing someone to leave', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To allow a person or animal to leave a place/i)).toBeInTheDocument();
  });

  it('renders definition for making clothing wider', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To make clothing wider/i)).toBeInTheDocument();
  });

  it('renders definition for suddenly making a sound', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To suddenly make a sound/i)).toBeInTheDocument();
  });

  it('renders definition for a class or meeting finishing', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/When a class, school, or meeting finishes/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To allow a person or animal to leave a place/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To allow a person or animal to leave a place/i)).toHaveAttribute(
      'title',
      'To allow a person or animal to leave a place.'
    );
  });
});

describeSectionToggle(LABEL, 'out', 'letOut_section_expanded', /To allow a person or animal to leave a place/i, renderPage);

describeChevronAndColour(LABEL, 'out', renderPage);

describeDefaultImageCards(LABEL, 'out', 'letOut', /To allow a person or animal to leave a place/i, /Someone left the gate open and let the dogs out\./i, renderPage, getCard);

// --- through ---

describe('LetVerbPage — "through" section definitions', () => {
  it('renders definition for allowing someone to pass a barrier', () => {
    renderPage();
    expandSection('through');
    expect(screen.getByText(/To allow someone or something to pass a barrier/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('through');
    expect(screen.getByText(/To allow someone or something to pass a barrier/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('through');
    expect(screen.getByText(/To allow someone or something to pass a barrier/i)).toHaveAttribute(
      'title',
      'To allow someone or something to pass a barrier, a security check, or a test.'
    );
  });
});

describeSectionToggle(LABEL, 'through', 'letThrough_section_expanded', /To allow someone or something to pass a barrier/i, renderPage);

describeChevronAndColour(LABEL, 'through', renderPage);

describeDefaultImageCards(LABEL, 'through', 'letThrough', /To allow someone or something to pass a barrier/i, /The firewall is strictly configured and will not let unauthorized traffic through\./i, renderPage, getCard);

// --- up ---

describe('LetVerbPage — "up" section definitions', () => {
  it('renders definition for stopping or becoming less severe', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To stop or become less severe/i)).toBeInTheDocument();
  });

  it('renders definition for stopping working as hard', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To stop working as hard as you were before/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To stop or become less severe/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To stop or become less severe/i)).toHaveAttribute(
      'title',
      'To stop or become less severe (usually referring to bad weather or a difficult situation).'
    );
  });
});

describeSectionToggle(LABEL, 'up', 'letUp_section_expanded', /To stop or become less severe/i, renderPage);

describeChevronAndColour(LABEL, 'up', renderPage);

describeDefaultImageCards(LABEL, 'up', 'letUp', /To stop or become less severe/i, /The heavy workload hasn't let up since we started this new project\./i, renderPage, getCard);
