import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'SetVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('SetVerbPage — "out" section definitions', () => {
  it('renders definition for beginning an activity with a specific goal', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To begin an activity with a specific goal in mind\./i)).toBeInTheDocument();
  });

  it('renders definition for explaining ideas, facts, or plans clearly', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To explain ideas, facts, or plans clearly in writing or speaking\./i)).toBeInTheDocument();
  });

  it('renders definition for starting a journey', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To start a journey \(similar to "set off"\)\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To begin an activity with a specific goal in mind\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To begin an activity with a specific goal in mind\./i)).toHaveAttribute(
      'title',
      'To begin an activity with a specific goal in mind.'
    );
  });
});

describeSectionToggle(LABEL, 'out', 'setOut_section_expanded', /To begin an activity with a specific goal in mind\./i, renderPage);

describeChevronAndColour(LABEL, 'out', renderPage);

describeDefaultImageCards(LABEL, 'out', 'setOut', /To begin an activity with a specific goal in mind\./i, /We set out to build the fastest application on the market\./i, renderPage, getCard);
