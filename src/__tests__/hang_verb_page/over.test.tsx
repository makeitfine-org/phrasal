import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'HangVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('HangVerbPage — "over" section definitions', () => {
  it('renders definition for making someone worry about a future problem', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To make someone worry about a future problem, or to loom like a threat\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To make someone worry about a future problem/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To make someone worry about a future problem/i)).toHaveAttribute(
      'title',
      'To make someone worry about a future problem, or to loom like a threat.'
    );
  });
});

describeSectionToggle(LABEL, 'over', 'hangOver_section_expanded', /To make someone worry about a future problem/i, renderPage);

describeChevronAndColour(LABEL, 'over', renderPage);

describeDefaultImageCards(LABEL, 'over', 'hangOver', /To make someone worry about a future problem/i, /The threat of budget cuts was hanging over the entire IT department\./i, renderPage, getCard);
