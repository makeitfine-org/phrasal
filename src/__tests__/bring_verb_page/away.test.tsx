import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'BringVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('BringVerbPage — "away" section definitions', () => {
  it('renders definition for gaining a lesson from an experience', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To learn or gain an impression, memory, or lesson from an experience/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To learn or gain an impression, memory, or lesson from an experience/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To learn or gain an impression, memory, or lesson from an experience/i)).toHaveAttribute(
      'title',
      'To learn or gain an impression, memory, or lesson from an experience.'
    );
  });
});

describeSectionToggle(LABEL, 'away', 'bringAway_section_expanded', /To learn or gain an impression, memory, or lesson from an experience/i, renderPage);

describeChevronAndColour(LABEL, 'away', renderPage);

describeDefaultImageCards(LABEL, 'away', 'bringAway', /To learn or gain an impression, memory, or lesson from an experience/i, /The main insight I brought away from the tech conference/i, renderPage, getCard);
