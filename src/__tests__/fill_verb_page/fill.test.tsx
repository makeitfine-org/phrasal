import { screen } from '@testing-library/react';
import { expandSection, getCard, renderPage } from './helpers';
import { describeChevronAndColour, describeDefaultImageCards, describeSectionToggle } from '../verbPage/sharedSectionTests';

const LABEL = 'FillVerbPage';

beforeEach(() => {
  localStorage.clear();
});

// --- down ---

describe('FillVerbPage — "down" section definitions', () => {
  it('renders definition for copying data or formulas to cells below', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To copy data or formulas to the cells below/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To copy data or formulas to the cells below/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To copy data or formulas to the cells below/i)).toHaveAttribute(
      'title',
      'To copy data or formulas to the cells below (specific to software/business context like Excel).'
    );
  });
});

describeSectionToggle(LABEL, 'down', 'fillDown_section_expanded', /To copy data or formulas to the cells below/i, renderPage);

describeChevronAndColour(LABEL, 'down', renderPage);

describeDefaultImageCards(LABEL, 'down', 'fillDown', /To copy data or formulas to the cells below/i, /Select the top cell and fill down the formula to the bottom of the column\./i, renderPage, getCard);

// --- in ---

describe('FillVerbPage — "in" section definitions', () => {
  it('renders definition for completing a form or document', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To complete a form or document by writing required information\./i)).toBeInTheDocument();
  });

  it('renders definition for providing missing information', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To provide someone with missing information/i)).toBeInTheDocument();
  });

  it('renders definition for temporarily doing someone else\'s job', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To temporarily do someone else's job because they are absent/i)).toBeInTheDocument();
  });

  it('renders definition for closing a hole or empty space', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To close a hole or empty space by putting a substance into it\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To complete a form or document by writing required information\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To complete a form or document by writing required information\./i)).toHaveAttribute(
      'title',
      'To complete a form or document by writing required information.'
    );
  });
});

describeSectionToggle(LABEL, 'in', 'fillIn_section_expanded', /To complete a form or document by writing required information\./i, renderPage);

describeChevronAndColour(LABEL, 'in', renderPage);

describeDefaultImageCards(LABEL, 'in', 'fillIn', /To complete a form or document by writing required information\./i, /Please fill in this application form and return it to the HR department\./i, renderPage, getCard);

// --- out ---

describe('FillVerbPage — "out" section definitions', () => {
  it('renders definition for completing a form (US English)', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To complete a form or document \(US English equivalent of "fill in"\)\./i)).toBeInTheDocument();
  });

  it('renders definition for becoming larger or heavier', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To become larger, heavier, or rounder/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To complete a form or document \(US English equivalent of "fill in"\)\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To complete a form or document \(US English equivalent of "fill in"\)\./i)).toHaveAttribute(
      'title',
      'To complete a form or document (US English equivalent of "fill in").'
    );
  });
});

describeSectionToggle(LABEL, 'out', 'fillOut_section_expanded', /To complete a form or document \(US English equivalent of "fill in"\)\./i, renderPage);

describeChevronAndColour(LABEL, 'out', renderPage);

describeDefaultImageCards(LABEL, 'out', 'fillOut', /To complete a form or document \(US English equivalent of "fill in"\)\./i, /It took me an hour to fill out the tax documents\./i, renderPage, getCard);

// --- up ---

describe('FillVerbPage — "up" section definitions', () => {
  it('renders definition for making something completely full', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To make something completely full, or to become completely full\./i)).toBeInTheDocument();
  });

  it('renders definition for eating enough food', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To eat enough food so that you are no longer hungry\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To make something completely full, or to become completely full\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To make something completely full, or to become completely full\./i)).toHaveAttribute(
      'title',
      'To make something completely full, or to become completely full.'
    );
  });
});

describeSectionToggle(LABEL, 'up', 'fillUp_section_expanded', /To make something completely full, or to become completely full\./i, renderPage);

describeChevronAndColour(LABEL, 'up', renderPage);

describeDefaultImageCards(LABEL, 'up', 'fillUp', /To make something completely full, or to become completely full\./i, /We need to fill up the car with petrol before we start driving\./i, renderPage, getCard);

// --- with ---

describe('FillVerbPage — "with" section definitions', () => {
  it('renders definition for putting a substance into a container', () => {
    renderPage();
    expandSection('with');
    expect(screen.getByText(/To put a substance or object into a container until there is no more space\./i)).toBeInTheDocument();
  });

  it('renders definition for causing someone to feel a strong emotion', () => {
    renderPage();
    expandSection('with');
    expect(screen.getByText(/To cause someone to feel a strong emotion\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('with');
    expect(screen.getByText(/To put a substance or object into a container until there is no more space\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('with');
    expect(screen.getByText(/To put a substance or object into a container until there is no more space\./i)).toHaveAttribute(
      'title',
      'To put a substance or object into a container until there is no more space.'
    );
  });
});

describeSectionToggle(LABEL, 'with', 'fillWith_section_expanded', /To put a substance or object into a container until there is no more space\./i, renderPage);

describeChevronAndColour(LABEL, 'with', renderPage);

describeDefaultImageCards(LABEL, 'with', 'fillWith', /To put a substance or object into a container until there is no more space\./i, /She filled the cup with coffee\./i, renderPage, getCard);
