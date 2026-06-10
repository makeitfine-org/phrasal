import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'LayVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('LayVerbPage — "away" section definitions', () => {
  it('renders definition for saving money for future use', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To save money or goods for future use/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To save money or goods for future use/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To save money or goods for future use/i)).toHaveAttribute(
      'title',
      'To save money or goods for future use (often used in retail as "layaway").'
    );
  });
});

describeSectionToggle(LABEL, 'away', 'layAway_section_expanded', /To save money or goods for future use/i, renderPage);

describeChevronAndColour(LABEL, 'away', renderPage);

describeDefaultImageCards(LABEL, 'away', 'layAway', /To save money or goods for future use/i, /The company lays away a portion of its quarterly profits for future software investments\./i, renderPage, getCard);
