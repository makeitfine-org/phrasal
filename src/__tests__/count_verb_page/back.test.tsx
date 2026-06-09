import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'CountVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('CountVerbPage — "back" section definitions', () => {
  it('renders definition for counting backwards from a number or date', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To count backwards from a specific number or date to calculate something\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To count backwards from a specific number or date to calculate something\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To count backwards from a specific number or date to calculate something\./i)).toHaveAttribute(
      'title',
      'To count backwards from a specific number or date to calculate something.'
    );
  });
});

describeSectionToggle(LABEL, 'back', 'countBack_section_expanded', /To count backwards from a specific number or date to calculate something\./i, renderPage);

describeChevronAndColour(LABEL, 'back', renderPage);

describeDefaultImageCards(LABEL, 'back', 'countBack', /To count backwards from a specific number or date to calculate something\./i, /we need to count back six weeks from today/i, renderPage, getCard);
