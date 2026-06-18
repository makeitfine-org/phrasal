import { screen } from '@testing-library/react';
import { expandSection, getCard, renderPage } from './helpers';
import { describeChevronAndColour, describeDefaultImageCards, describeSectionToggle } from '../verbPage/sharedSectionTests';

const LABEL = 'BackVerbPage';

beforeEach(() => {
  localStorage.clear();
});

// --- away ---

describe('BackVerbPage — "away" section definitions', () => {
  it('renders definition for moving backwards from danger', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To move backwards to get away from someone or something frightening/i)).toBeInTheDocument();
  });

  it('renders definition for withdrawing support', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To show that you do not support a plan or idea anymore/i)).toBeInTheDocument();
  });

  it('all 2 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To move backwards to get away from someone or something frightening/i)).toHaveClass('truncate');
    expect(screen.getByText(/To show that you do not support a plan or idea anymore/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To move backwards to get away from someone or something frightening/i)).toHaveAttribute(
      'title',
      'To move backwards to get away from someone or something frightening.'
    );
  });
});

describeSectionToggle(LABEL, 'away', 'backAway_section_expanded', /To move backwards to get away from someone or something frightening/i, renderPage);

describeChevronAndColour(LABEL, 'away', renderPage);

describeDefaultImageCards(LABEL, 'away', 'backAway', /To move backwards to get away from someone or something frightening/i, /The developer backed away from the hot server rack/i, renderPage, getCard);

// --- down ---

describe('BackVerbPage — "down" section definitions', () => {
  it('renders definition for admitting you were wrong', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To admit that you were wrong, or to stop demanding something/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To admit that you were wrong, or to stop demanding something/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To admit that you were wrong, or to stop demanding something/i)).toHaveAttribute(
      'title',
      'To admit that you were wrong, or to stop demanding something because of opposition.'
    );
  });
});

describeSectionToggle(LABEL, 'down', 'backDown_section_expanded', /To admit that you were wrong, or to stop demanding something/i, renderPage);

describeChevronAndColour(LABEL, 'down', renderPage);

describeDefaultImageCards(LABEL, 'down', 'backDown', /To admit that you were wrong, or to stop demanding something/i, /A good manager knows when to back down/i, renderPage, getCard);

// --- in ---

describe('BackVerbPage — "in" section definitions', () => {
  it('renders definition for reversing into a parking space', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To drive a vehicle backward into a parking space/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To drive a vehicle backward into a parking space/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To drive a vehicle backward into a parking space/i)).toHaveAttribute(
      'title',
      'To drive a vehicle backward into a parking space.'
    );
  });
});

describeSectionToggle(LABEL, 'in', 'backIn_section_expanded', /To drive a vehicle backward into a parking space/i, renderPage);

describeChevronAndColour(LABEL, 'in', renderPage);

describeDefaultImageCards(LABEL, 'in', 'backIn', /To drive a vehicle backward into a parking space/i, /It is much safer to back in to this parking spot/i, renderPage, getCard);

// --- into ---

describe('BackVerbPage — "into" section definitions', () => {
  it('renders definition for accidentally reversing into something', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/To drive a vehicle backwards and accidentally hit something/i)).toBeInTheDocument();
  });

  it('renders definition for getting into something by chance', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/To get into a career or situation by chance/i)).toBeInTheDocument();
  });

  it('all 2 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/To drive a vehicle backwards and accidentally hit something/i)).toHaveClass('truncate');
    expect(screen.getByText(/To get into a career or situation by chance/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/To drive a vehicle backwards and accidentally hit something/i)).toHaveAttribute(
      'title',
      'To drive a vehicle backwards and accidentally hit something.'
    );
  });
});

describeSectionToggle(LABEL, 'into', 'backInto_section_expanded', /To drive a vehicle backwards and accidentally hit something/i, renderPage);

describeChevronAndColour(LABEL, 'into', renderPage);

describeDefaultImageCards(LABEL, 'into', 'backInto', /To drive a vehicle backwards and accidentally hit something/i, /I accidentally backed into the CEO's car/i, renderPage, getCard);

// --- off ---

describe('BackVerbPage — "off" section definitions', () => {
  it('renders definition for moving away from danger', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To move backward away from danger or a threat/i)).toBeInTheDocument();
  });

  it('renders definition for stopping criticism', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To stop criticizing someone or telling them what to do/i)).toBeInTheDocument();
  });

  it('renders definition for withdrawing from a plan', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To stop supporting an idea, or to decide not to do something/i)).toBeInTheDocument();
  });

  it('all 3 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To move backward away from danger or a threat/i)).toHaveClass('truncate');
    expect(screen.getByText(/To stop criticizing someone or telling them what to do/i)).toHaveClass('truncate');
    expect(screen.getByText(/To stop supporting an idea, or to decide not to do something/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To move backward away from danger or a threat/i)).toHaveAttribute(
      'title',
      'To move backward away from danger or a threat.'
    );
  });
});

describeSectionToggle(LABEL, 'off', 'backOff_section_expanded', /To move backward away from danger or a threat/i, renderPage);

describeChevronAndColour(LABEL, 'off', renderPage);

describeDefaultImageCards(LABEL, 'off', 'backOff', /To move backward away from danger or a threat/i, /The security guard told the angry customer to back off/i, renderPage, getCard);

// --- onto ---

describe('BackVerbPage — "onto" section definitions', () => {
  it('renders definition for a building facing something at the back', () => {
    renderPage();
    expandSection('onto');
    expect(screen.getByText(/If a building backs onto something, the back of the building faces it/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('onto');
    expect(screen.getByText(/If a building backs onto something, the back of the building faces it/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('onto');
    expect(screen.getByText(/If a building backs onto something, the back of the building faces it/i)).toHaveAttribute(
      'title',
      'If a building backs onto something, the back of the building faces it.'
    );
  });
});

describeSectionToggle(LABEL, 'onto', 'backOnto_section_expanded', /If a building backs onto something, the back of the building faces it/i, renderPage);

describeChevronAndColour(LABEL, 'onto', renderPage);

describeDefaultImageCards(LABEL, 'onto', 'backOnto', /If a building backs onto something, the back of the building faces it/i, /Our new corporate headquarters backs onto/i, renderPage, getCard);

// --- out_out_of ---

describe('BackVerbPage — "out / out of" section definitions', () => {
  it('renders definition for reversing out of a space', () => {
    renderPage();
    expandSection('out / out of');
    expect(screen.getByText(/To drive a vehicle backward out of a space/i)).toBeInTheDocument();
  });

  it('renders definition for withdrawing from a commitment', () => {
    renderPage();
    expandSection('out / out of');
    expect(screen.getByText(/To decide not to do something that you agreed or promised to do/i)).toBeInTheDocument();
  });

  it('all 2 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('out / out of');
    expect(screen.getByText(/To drive a vehicle backward out of a space/i)).toHaveClass('truncate');
    expect(screen.getByText(/To decide not to do something that you agreed or promised to do/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('out / out of');
    expect(screen.getByText(/To drive a vehicle backward out of a space/i)).toHaveAttribute(
      'title',
      'To drive a vehicle backward out of a space.'
    );
  });
});

describeSectionToggle(LABEL, 'out / out of', 'backOut_section_expanded', /To drive a vehicle backward out of a space/i, renderPage);

describeChevronAndColour(LABEL, 'out / out of', renderPage);

describeDefaultImageCards(LABEL, 'out / out of', 'backOut', /To drive a vehicle backward out of a space/i, /She backed out of the garage very slowly/i, renderPage, getCard);

// --- over ---

describe('BackVerbPage — "over" section definitions', () => {
  it('renders definition for reversing over something', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To drive a vehicle backwards over something or someone/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To drive a vehicle backwards over something or someone/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To drive a vehicle backwards over something or someone/i)).toHaveAttribute(
      'title',
      'To drive a vehicle backwards over something or someone.'
    );
  });
});

describeSectionToggle(LABEL, 'over', 'backOver_section_expanded', /To drive a vehicle backwards over something or someone/i, renderPage);

describeChevronAndColour(LABEL, 'over', renderPage);

describeDefaultImageCards(LABEL, 'over', 'backOver', /To drive a vehicle backwards over something or someone/i, /I accidentally backed over my laptop bag/i, renderPage, getCard);

// --- up ---

describe('BackVerbPage — "up" section definitions', () => {
  it('renders definition for moving backwards', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To move backwards\./i)).toBeInTheDocument();
  });

  it('renders definition for supporting someone', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To support someone or confirm that what they are saying is true/i)).toBeInTheDocument();
  });

  it('renders definition for copying data', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To make a copy of computer data so it is not lost/i)).toBeInTheDocument();
  });

  it('renders definition for causing traffic', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To cause traffic to stop or move very slowly/i)).toBeInTheDocument();
  });

  it('all 4 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To move backwards\./i)).toHaveClass('truncate');
    expect(screen.getByText(/To support someone or confirm that what they are saying is true/i)).toHaveClass('truncate');
    expect(screen.getByText(/To make a copy of computer data so it is not lost/i)).toHaveClass('truncate');
    expect(screen.getByText(/To cause traffic to stop or move very slowly/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To move backwards\./i)).toHaveAttribute(
      'title',
      'To move backwards.'
    );
  });
});

describeSectionToggle(LABEL, 'up', 'backUp_section_expanded', /To move backwards\./i, renderPage);

describeChevronAndColour(LABEL, 'up', renderPage);

describeDefaultImageCards(LABEL, 'up', 'backUp', /To move backwards\./i, /Could you back up a few steps/i, renderPage, getCard);
