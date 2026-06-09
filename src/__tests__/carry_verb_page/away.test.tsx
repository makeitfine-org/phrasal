import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'CarryVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('CarryVerbPage — "away" section definitions', () => {
  it('renders definition for becoming too excited', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To become too excited and lose control of your behavior/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To become too excited and lose control of your behavior/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To become too excited and lose control of your behavior/i)).toHaveAttribute(
      'title',
      'To become too excited and lose control of your behavior (almost always used in the passive voice: "get/be carried away").'
    );
  });
});

describeSectionToggle(LABEL, 'away', 'carryAway_section_expanded', /To become too excited and lose control of your behavior/i, renderPage);

describeChevronAndColour(LABEL, 'away', renderPage);

describeDefaultImageCards(LABEL, 'away', 'carryAway', /To become too excited and lose control of your behavior/i, /got carried away with the new features/i, renderPage, getCard);
