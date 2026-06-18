import { screen } from '@testing-library/react';
import { expandSection, getCard, renderPage } from './helpers';
import { describeChevronAndColour, describeDefaultImageCards, describeSectionToggle } from '../verbPage/sharedSectionTests';

const LABEL = 'ShowVerbPage';

beforeEach(() => {
  localStorage.clear();
});

// --- around_round_about ---

describe('ShowVerbPage — "around / round / about" section definitions', () => {
  it('renders definition for acting as a guide and giving a tour', () => {
    renderPage();
    expandSection('around / round / about');
    expect(screen.getByText(/To act as a guide and give someone a tour of a new place\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('around / round / about');
    expect(screen.getByText(/To act as a guide and give someone a tour of a new place\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('around / round / about');
    expect(screen.getByText(/To act as a guide and give someone a tour of a new place\./i)).toHaveAttribute(
      'title',
      'To act as a guide and give someone a tour of a new place.'
    );
  });
});

describeSectionToggle(LABEL, 'around / round / about', 'showAround_section_expanded', /To act as a guide and give someone a tour of a new place\./i, renderPage);

describeChevronAndColour(LABEL, 'around / round / about', renderPage);

describeDefaultImageCards(LABEL, 'around / round / about', 'showAround', /To act as a guide and give someone a tour of a new place\./i, /Welcome to the new headquarters! Let me show you around the office\./i, renderPage, getCard);

// --- down ---

describe('ShowVerbPage — "down" section definitions', () => {
  it('renders definition for laying cards face-up in a card game', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/In card games, to lay your cards face-up on the table to reveal your hand\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/In card games, to lay your cards face-up on the table to reveal your hand\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/In card games, to lay your cards face-up on the table to reveal your hand\./i)).toHaveAttribute(
      'title',
      'In card games, to lay your cards face-up on the table to reveal your hand.'
    );
  });
});

describeSectionToggle(LABEL, 'down', 'showDown_section_expanded', /In card games, to lay your cards face-up on the table to reveal your hand\./i, renderPage);

describeChevronAndColour(LABEL, 'down', renderPage);

describeDefaultImageCards(LABEL, 'down', 'showDown', /In card games, to lay your cards face-up on the table to reveal your hand\./i, /After the final bet, it was time to show down their cards\./i, renderPage, getCard);

// --- for ---

describe('ShowVerbPage — "for" section definitions', () => {
  it('renders definition for having a result to show for effort', () => {
    renderPage();
    expandSection('for');
    expect(screen.getByText(/Used in the phrase "have something to show for/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('for');
    expect(screen.getByText(/Used in the phrase "have something to show for/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('for');
    expect(screen.getByText(/Used in the phrase "have something to show for/i)).toHaveAttribute(
      'title',
      'Used in the phrase "have something to show for [an effort]," meaning to have a result or evidence of your hard work.'
    );
  });
});

describeSectionToggle(LABEL, 'for', 'showFor_section_expanded', /Used in the phrase "have something to show for/i, renderPage);

describeChevronAndColour(LABEL, 'for', renderPage);

describeDefaultImageCards(LABEL, 'for', 'showFor', /Used in the phrase "have something to show for/i, /I worked all weekend on the project, but because of a server crash, I have nothing to show for it\./i, renderPage, getCard);

// --- in_into ---

describe('ShowVerbPage — "in / into" section definitions', () => {
  it('renders definition for leading someone inside a building (show in)', () => {
    renderPage();
    expandSection('in / into');
    expect(screen.getByText(/To act as a guide and lead someone inside a room or building/i)).toBeInTheDocument();
  });

  it('renders definition for leading someone into a specific room (show into)', () => {
    renderPage();
    expandSection('in / into');
    expect(screen.getByText(/To lead someone into a specific room/i)).toBeInTheDocument();
  });

  it('all 2 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('in / into');
    expect(screen.getByText(/To act as a guide and lead someone inside a room or building/i)).toHaveClass('truncate');
    expect(screen.getByText(/To lead someone into a specific room/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('in / into');
    expect(screen.getByText(/To act as a guide and lead someone inside a room or building/i)).toHaveAttribute(
      'title',
      'To act as a guide and lead someone inside a room or building (show in).'
    );
  });
});

describeSectionToggle(LABEL, 'in / into', 'showIn_section_expanded', /To act as a guide and lead someone inside a room or building/i, renderPage);

describeChevronAndColour(LABEL, 'in / into', renderPage);

describeDefaultImageCards(LABEL, 'in / into', 'showIn', /To act as a guide and lead someone inside a room or building/i, /When the candidates arrive, please show them in\./i, renderPage, getCard);

// --- off ---

describe('ShowVerbPage — "off" section definitions', () => {
  it('renders definition for behaving to attract attention or admiration', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To behave in a way that is intended to attract attention or admiration/i)).toBeInTheDocument();
  });

  it('renders definition for proudly displaying something', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To proudly display something you have or have achieved\./i)).toBeInTheDocument();
  });

  it('renders definition for making something look its best', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To make something look its best or highlight its good qualities\./i)).toBeInTheDocument();
  });

  it('all 3 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To behave in a way that is intended to attract attention or admiration/i)).toHaveClass('truncate');
    expect(screen.getByText(/To proudly display something you have or have achieved\./i)).toHaveClass('truncate');
    expect(screen.getByText(/To make something look its best or highlight its good qualities\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To behave in a way that is intended to attract attention or admiration/i)).toHaveAttribute(
      'title',
      'To behave in a way that is intended to attract attention or admiration (often seen as negative or boastful).'
    );
  });
});

describeSectionToggle(LABEL, 'off', 'showOff_section_expanded', /To behave in a way that is intended to attract attention or admiration/i, renderPage);

describeChevronAndColour(LABEL, 'off', renderPage);

describeDefaultImageCards(LABEL, 'off', 'showOff', /To behave in a way that is intended to attract attention or admiration/i, /He only bought that expensive sports car to show off\./i, renderPage, getCard);

// --- out ---

describe('ShowVerbPage — "out" section definitions', () => {
  it('renders definition for leading someone to the exit', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To lead or escort someone to the exit of a building or room\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To lead or escort someone to the exit of a building or room\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To lead or escort someone to the exit of a building or room\./i)).toHaveAttribute(
      'title',
      'To lead or escort someone to the exit of a building or room.'
    );
  });
});

describeSectionToggle(LABEL, 'out', 'showOut_section_expanded', /To lead or escort someone to the exit of a building or room\./i, renderPage);

describeChevronAndColour(LABEL, 'out', renderPage);

describeDefaultImageCards(LABEL, 'out', 'showOut', /To lead or escort someone to the exit of a building or room\./i, /Thank you for the interview\. My assistant will show you out\./i, renderPage, getCard);

// --- over ---

describe('ShowVerbPage — "over" section definitions', () => {
  it('renders definition for guiding someone around a building to inspect it', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To guide someone around a building to inspect it/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To guide someone around a building to inspect it/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To guide someone around a building to inspect it/i)).toHaveAttribute(
      'title',
      'To guide someone around a building to inspect it (primarily British English, similar to "show around").'
    );
  });
});

describeSectionToggle(LABEL, 'over', 'showOver_section_expanded', /To guide someone around a building to inspect it/i, renderPage);

describeChevronAndColour(LABEL, 'over', renderPage);

describeDefaultImageCards(LABEL, 'over', 'showOver', /To guide someone around a building to inspect it/i, /The real estate agent showed us over the new office space\./i, renderPage, getCard);

// --- through ---

describe('ShowVerbPage — "through" section definitions', () => {
  it('renders definition for being visible under a layer of something', () => {
    renderPage();
    expandSection('through');
    expect(screen.getByText(/To be visible under or through a layer of something else/i)).toBeInTheDocument();
  });

  it('renders definition for an emotion becoming obvious', () => {
    renderPage();
    expandSection('through');
    expect(screen.getByText(/To become obvious or visible, referring to an emotion or quality/i)).toBeInTheDocument();
  });

  it('all 2 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('through');
    expect(screen.getByText(/To be visible under or through a layer of something else/i)).toHaveClass('truncate');
    expect(screen.getByText(/To become obvious or visible, referring to an emotion or quality/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('through');
    expect(screen.getByText(/To be visible under or through a layer of something else/i)).toHaveAttribute(
      'title',
      'To be visible under or through a layer of something else (like cloth or paper).'
    );
  });
});

describeSectionToggle(LABEL, 'through', 'showThrough_section_expanded', /To be visible under or through a layer of something else/i, renderPage);

describeChevronAndColour(LABEL, 'through', renderPage);

describeDefaultImageCards(LABEL, 'through', 'showThrough', /To be visible under or through a layer of something else/i, /You need to apply another coat of paint; the old dark color is showing through\./i, renderPage, getCard);

// --- to ---

describe('ShowVerbPage — "to" section definitions', () => {
  it('renders definition for escorting someone to a specific location', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To escort or lead someone to a specific location or seat\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To escort or lead someone to a specific location or seat\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To escort or lead someone to a specific location or seat\./i)).toHaveAttribute(
      'title',
      'To escort or lead someone to a specific location or seat.'
    );
  });
});

describeSectionToggle(LABEL, 'to', 'showTo_section_expanded', /To escort or lead someone to a specific location or seat\./i, renderPage);

describeChevronAndColour(LABEL, 'to', renderPage);

describeDefaultImageCards(LABEL, 'to', 'showTo', /To escort or lead someone to a specific location or seat\./i, /The host showed us to our table\./i, renderPage, getCard);

// --- up ---

describe('ShowVerbPage — "up" section definitions', () => {
  it('renders definition for arriving at a place', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To arrive or appear at a place, especially when expected or late\./i)).toBeInTheDocument();
  });

  it('renders definition for being clearly visible', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To be clearly visible\./i)).toBeInTheDocument();
  });

  it("renders definition for revealing someone's faults", () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To reveal someone's faults or make them feel embarrassed/i)).toBeInTheDocument();
  });

  it('renders definition for testing positive for something', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To test positive for something/i)).toBeInTheDocument();
  });

  it('all 4 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To arrive or appear at a place, especially when expected or late\./i)).toHaveClass('truncate');
    expect(screen.getByText(/To be clearly visible\./i)).toHaveClass('truncate');
    expect(screen.getByText(/To reveal someone's faults or make them feel embarrassed/i)).toHaveClass('truncate');
    expect(screen.getByText(/To test positive for something/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To arrive or appear at a place, especially when expected or late\./i)).toHaveAttribute(
      'title',
      'To arrive or appear at a place, especially when expected or late.'
    );
  });
});

describeSectionToggle(LABEL, 'up', 'showUp_section_expanded', /To arrive or appear at a place, especially when expected or late\./i, renderPage);

describeChevronAndColour(LABEL, 'up', renderPage);

describeDefaultImageCards(LABEL, 'up', 'showUp', /To arrive or appear at a place, especially when expected or late\./i, /We waited for an hour, but the client never showed up for the meeting\./i, renderPage, getCard);
