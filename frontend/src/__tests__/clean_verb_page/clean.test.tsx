import { screen } from '@testing-library/react';
import { expandSection, getCard, renderPage } from './helpers';
import { describeChevronAndColour, describeDefaultImageCards, describeSectionToggle } from '../verbPage/sharedSectionTests';

const LABEL = 'CleanVerbPage';

beforeEach(() => {
  localStorage.clear();
});

// --- around ---

describe('CleanVerbPage — "around" section definitions', () => {
  it('renders definition for washing the space near an object', () => {
    renderPage();
    expandSection('around');
    expect(screen.getByText(/To wash or tidy the space near an object without moving the object itself\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('around');
    expect(screen.getByText(/To wash or tidy the space near an object without moving the object itself\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('around');
    expect(screen.getByText(/To wash or tidy the space near an object without moving the object itself\./i)).toHaveAttribute(
      'title',
      'To wash or tidy the space near an object without moving the object itself.'
    );
  });
});

describeSectionToggle(LABEL, 'around', 'cleanAround_section_expanded', /To wash or tidy the space near an object without moving the object itself\./i, renderPage);

describeChevronAndColour(LABEL, 'around', renderPage);

describeDefaultImageCards(LABEL, 'around', 'cleanAround', /To wash or tidy the space near an object without moving the object itself\./i, /Don't worry about moving the heavy cabinet/i, renderPage, getCard);

// --- away ---

describe('CleanVerbPage — "away" section definitions', () => {
  it('renders definition for removing dirt or objects to leave a space tidy', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To remove dirt, rubbish, or objects to leave a space tidy\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To remove dirt, rubbish, or objects to leave a space tidy\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To remove dirt, rubbish, or objects to leave a space tidy\./i)).toHaveAttribute(
      'title',
      'To remove dirt, rubbish, or objects to leave a space tidy.'
    );
  });
});

describeSectionToggle(LABEL, 'away', 'cleanAway_section_expanded', /To remove dirt, rubbish, or objects to leave a space tidy\./i, renderPage);

describeChevronAndColour(LABEL, 'away', renderPage);

describeDefaultImageCards(LABEL, 'away', 'cleanAway', /To remove dirt, rubbish, or objects to leave a space tidy\./i, /Please clean away the empty plates/i, renderPage, getCard);

// --- down ---

describe('CleanVerbPage — "down" section definitions', () => {
  it('renders definition for washing an entire surface from top to bottom', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To wash an entire surface, usually from top to bottom\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To wash an entire surface, usually from top to bottom\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To wash an entire surface, usually from top to bottom\./i)).toHaveAttribute(
      'title',
      'To wash an entire surface, usually from top to bottom.'
    );
  });
});

describeSectionToggle(LABEL, 'down', 'cleanDown_section_expanded', /To wash an entire surface, usually from top to bottom\./i, renderPage);

describeChevronAndColour(LABEL, 'down', renderPage);

describeDefaultImageCards(LABEL, 'down', 'cleanDown', /To wash an entire surface, usually from top to bottom\./i, /We need to clean down the walls/i, renderPage, getCard);

// --- off ---

describe('CleanVerbPage — "off" section definitions', () => {
  it('renders definition for removing dirt or marks from a surface', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To remove dirt, marks, or a substance from a surface\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To remove dirt, marks, or a substance from a surface\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To remove dirt, marks, or a substance from a surface\./i)).toHaveAttribute(
      'title',
      'To remove dirt, marks, or a substance from a surface.'
    );
  });
});

describeSectionToggle(LABEL, 'off', 'cleanOff_section_expanded', /To remove dirt, marks, or a substance from a surface\./i, renderPage);

describeChevronAndColour(LABEL, 'off', renderPage);

describeDefaultImageCards(LABEL, 'off', 'cleanOff', /To remove dirt, marks, or a substance from a surface\./i, /Make sure to clean the mud off your boots/i, renderPage, getCard);

// --- out ---

describe('CleanVerbPage — "out" section definitions', () => {
  it('renders definition for emptying and cleaning the inside of a space', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To empty and clean the inside of a space/i)).toBeInTheDocument();
  });

  it('renders definition for using all of someone\'s money', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To use or take all of someone's money\./i)).toBeInTheDocument();
  });

  it('renders definition for stealing everything of value from a place', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To steal everything of value from a place\./i)).toBeInTheDocument();
  });

  it('first definition paragraph has truncate class', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To empty and clean the inside of a space/i)).toHaveClass('truncate');
  });

  it('first definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To empty and clean the inside of a space/i)).toHaveAttribute(
      'title',
      'To empty and clean the inside of a space (like a room, cupboard, or box), usually by throwing away unwanted items.'
    );
  });
});

describeSectionToggle(LABEL, 'out', 'cleanOut_section_expanded', /To empty and clean the inside of a space/i, renderPage);

describeChevronAndColour(LABEL, 'out', renderPage);

describeDefaultImageCards(LABEL, 'out', 'cleanOut', /To empty and clean the inside of a space/i, /I spent my Saturday cleaning out the garage/i, renderPage, getCard);

// --- up ---

describe('CleanVerbPage — "up" section definitions', () => {
  it('renders definition for making a place completely clean and tidy', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To make a place or a person completely clean and tidy\./i)).toBeInTheDocument();
  });

  it('renders definition for making a large profit quickly', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To make a large profit or a lot of money quickly\./i)).toBeInTheDocument();
  });

  it('renders definition for stopping crime or corruption', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To stop crime, corruption, or bad behavior in a specific organization or area\./i)).toBeInTheDocument();
  });

  it('first definition paragraph has truncate class', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To make a place or a person completely clean and tidy\./i)).toHaveClass('truncate');
  });

  it('first definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To make a place or a person completely clean and tidy\./i)).toHaveAttribute(
      'title',
      'To make a place or a person completely clean and tidy.'
    );
  });
});

describeSectionToggle(LABEL, 'up', 'cleanUp_section_expanded', /To make a place or a person completely clean and tidy\./i, renderPage);

describeChevronAndColour(LABEL, 'up', renderPage);

describeDefaultImageCards(LABEL, 'up', 'cleanUp', /To make a place or a person completely clean and tidy\./i, /We need to clean up the living room/i, renderPage, getCard);

// --- up_after ---

describe('CleanVerbPage — "up after" section definitions', () => {
  it('renders definition for removing mess created by someone else', () => {
    renderPage();
    expandSection('up after');
    expect(screen.getByText(/To remove the mess or dirt created by someone or something else\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('up after');
    expect(screen.getByText(/To remove the mess or dirt created by someone or something else\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('up after');
    expect(screen.getByText(/To remove the mess or dirt created by someone or something else\./i)).toHaveAttribute(
      'title',
      'To remove the mess or dirt created by someone or something else.'
    );
  });
});

describeSectionToggle(LABEL, 'up after', 'cleanUpAfter_section_expanded', /To remove the mess or dirt created by someone or something else\./i, renderPage);

describeChevronAndColour(LABEL, 'up after', renderPage);

describeDefaultImageCards(LABEL, 'up after', 'cleanUpAfter', /To remove the mess or dirt created by someone or something else\./i, /I am constantly cleaning up after my new puppy/i, renderPage, getCard);
