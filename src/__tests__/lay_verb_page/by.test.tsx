import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'LayVerbPage';

beforeEach(() => {
  localStorage.clear();
});

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
