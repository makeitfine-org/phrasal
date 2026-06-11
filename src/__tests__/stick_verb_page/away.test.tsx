import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'StickVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('StickVerbPage — "away" section definitions', () => {
  it('renders definition for storing something in a safe or hidden place', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To store or put something in a safe or hidden place\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To store or put something in a safe or hidden place\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To store or put something in a safe or hidden place\./i)).toHaveAttribute(
      'title',
      'To store or put something in a safe or hidden place.'
    );
  });
});

describeSectionToggle(LABEL, 'away', 'stickAway_section_expanded', /To store or put something in a safe or hidden place\./i, renderPage);

describeChevronAndColour(LABEL, 'away', renderPage);

describeDefaultImageCards(LABEL, 'away', 'stickAway', /To store or put something in a safe or hidden place\./i, /I stuck the old project contracts away in the archive cabinet\./i, renderPage, getCard);
