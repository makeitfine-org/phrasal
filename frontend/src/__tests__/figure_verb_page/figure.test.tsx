import { screen } from '@testing-library/react';
import { expandSection, getCard, renderPage } from './helpers';
import { describeChevronAndColour, describeDefaultImageCards, describeSectionToggle } from '../verbPage/sharedSectionTests';

const LABEL = 'FigureVerbPage';

beforeEach(() => {
  localStorage.clear();
});

// --- for ---

describe('FigureVerbPage — "for" section definitions', () => {
  it('renders definition for expecting someone to be a certain type of person', () => {
    renderPage();
    expandSection('for');
    expect(screen.getByText(/To expect someone to be a certain type of person, or to make an assumption about their character\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('for');
    expect(screen.getByText(/To expect someone to be a certain type of person, or to make an assumption about their character\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('for');
    expect(screen.getByText(/To expect someone to be a certain type of person, or to make an assumption about their character\./i)).toHaveAttribute(
      'title',
      'To expect someone to be a certain type of person, or to make an assumption about their character.'
    );
  });
});

describeSectionToggle(LABEL, 'for', 'figureFor_section_expanded', /To expect someone to be a certain type of person, or to make an assumption about their character\./i, renderPage);

describeChevronAndColour(LABEL, 'for', renderPage);

describeDefaultImageCards(LABEL, 'for', 'figureFor', /To expect someone to be a certain type of person, or to make an assumption about their character\./i, /I figured him for a strict leader, but he is actually very relaxed\./i, renderPage, getCard);

// --- in ---

describe('FigureVerbPage — "in" section definitions', () => {
  it('renders definition for including a detail in a calculation or plan', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To include a specific detail or amount when making a calculation or plan\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To include a specific detail or amount when making a calculation or plan\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To include a specific detail or amount when making a calculation or plan\./i)).toHaveAttribute(
      'title',
      'To include a specific detail or amount when making a calculation or plan.'
    );
  });
});

describeSectionToggle(LABEL, 'in', 'figureIn_section_expanded', /To include a specific detail or amount when making a calculation or plan\./i, renderPage);

describeChevronAndColour(LABEL, 'in', renderPage);

describeDefaultImageCards(LABEL, 'in', 'figureIn', /To include a specific detail or amount when making a calculation or plan\./i, /When estimating the project timeline, you must figure in the time needed for testing and fixing bugs\./i, renderPage, getCard);

// --- into ---

describe('FigureVerbPage — "into" section definitions', () => {
  it('renders definition for being a relevant factor in a situation or plan', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/To be a relevant factor or play a part in a situation, decision, or plan\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/To be a relevant factor or play a part in a situation, decision, or plan\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/To be a relevant factor or play a part in a situation, decision, or plan\./i)).toHaveAttribute(
      'title',
      'To be a relevant factor or play a part in a situation, decision, or plan.'
    );
  });
});

describeSectionToggle(LABEL, 'into', 'figureInto_section_expanded', /To be a relevant factor or play a part in a situation, decision, or plan\./i, renderPage);

describeChevronAndColour(LABEL, 'into', renderPage);

describeDefaultImageCards(LABEL, 'into', 'figureInto', /To be a relevant factor or play a part in a situation, decision, or plan\./i, /The cost of hiring new developers did not figure into the original budget\./i, renderPage, getCard);

// --- on ---

describe('FigureVerbPage — "on" section definitions', () => {
  it('renders definition for planning on something happening', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To plan on something happening or expect something to be true\./i)).toBeInTheDocument();
  });

  it('renders definition for relying on or trusting someone', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To rely on or trust someone\/something\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To plan on something happening or expect something to be true\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To plan on something happening or expect something to be true\./i)).toHaveAttribute(
      'title',
      'To plan on something happening or expect something to be true.'
    );
  });
});

describeSectionToggle(LABEL, 'on', 'figureOn_section_expanded', /To plan on something happening or expect something to be true\./i, renderPage);

describeChevronAndColour(LABEL, 'on', renderPage);

describeDefaultImageCards(LABEL, 'on', 'figureOn', /To plan on something happening or expect something to be true\./i, /We figure on launching the new product by the end of the second quarter\./i, renderPage, getCard);

// --- out ---

describe('FigureVerbPage — "out" section definitions', () => {
  it('renders definition for understanding a problem and finding a solution', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To understand a problem and find a solution\./i)).toBeInTheDocument();
  });

  it('renders definition for calculating an amount or cost', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To calculate an amount or cost\./i)).toBeInTheDocument();
  });

  it("renders definition for understanding someone's character", () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To understand someone's character, behavior, or motives\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To understand a problem and find a solution\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To understand a problem and find a solution\./i)).toHaveAttribute(
      'title',
      'To understand a problem and find a solution.'
    );
  });
});

describeSectionToggle(LABEL, 'out', 'figureOut_section_expanded', /To understand a problem and find a solution\./i, renderPage);

describeChevronAndColour(LABEL, 'out', renderPage);

describeDefaultImageCards(LABEL, 'out', 'figureOut', /To understand a problem and find a solution\./i, /It took the team three hours to figure out why the Java application was crashing\./i, renderPage, getCard);

// --- up ---

describe('FigureVerbPage — "up" section definitions', () => {
  it('renders definition for adding numbers to calculate a total', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To add numbers together to calculate a total amount\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To add numbers together to calculate a total amount\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To add numbers together to calculate a total amount\./i)).toHaveAttribute(
      'title',
      'To add numbers together to calculate a total amount.'
    );
  });
});

describeSectionToggle(LABEL, 'up', 'figureUp_section_expanded', /To add numbers together to calculate a total amount\./i, renderPage);

describeChevronAndColour(LABEL, 'up', renderPage);

describeDefaultImageCards(LABEL, 'up', 'figureUp', /To add numbers together to calculate a total amount\./i, /Let me figure up the total hours we spent on the server migration last month\./i, renderPage, getCard);
