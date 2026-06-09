import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'DealVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('DealVerbPage — "away" section definitions', () => {
  it('renders definition for giving something away in a trade', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To give something away in a trade or negotiation, often losing a valuable asset\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To give something away in a trade or negotiation, often losing a valuable asset\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To give something away in a trade or negotiation, often losing a valuable asset\./i)).toHaveAttribute(
      'title',
      'To give something away in a trade or negotiation, often losing a valuable asset.'
    );
  });
});

describeSectionToggle(LABEL, 'away', 'dealAway_section_expanded', /To give something away in a trade or negotiation, often losing a valuable asset\./i, renderPage);

describeChevronAndColour(LABEL, 'away', renderPage);

describeDefaultImageCards(LABEL, 'away', 'dealAway', /To give something away in a trade or negotiation, often losing a valuable asset\./i, /The company dealt away its most profitable division/i, renderPage, getCard);
