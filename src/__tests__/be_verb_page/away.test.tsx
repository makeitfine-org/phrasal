import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'BeVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('BeVerbPage — "away" section definitions', () => {
  it('renders definition for being absent on a trip', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To be absent or on a trip\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To be absent or on a trip\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To be absent or on a trip\./i)).toHaveAttribute('title', 'To be absent or on a trip.');
  });
});

describeSectionToggle(LABEL, 'away', 'beAway_section_expanded', /To be absent or on a trip\./i, renderPage);

describeChevronAndColour(LABEL, 'away', renderPage);

describeDefaultImageCards(LABEL, 'away', 'beAway', /To be absent or on a trip\./i, /He is away on a business trip to London/i, renderPage, getCard);
