import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'PayVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('PayVerbPage — "away" section definitions', () => {
  it('renders definition for letting a rope slide through hands', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/Similar to "pay out," meaning to let a rope slide through your hands/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/Similar to "pay out," meaning to let a rope slide through your hands/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/Similar to "pay out," meaning to let a rope slide through your hands/i)).toHaveAttribute(
      'title',
      'Similar to "pay out," meaning to let a rope slide through your hands (nautical/rare).'
    );
  });
});

describeSectionToggle(LABEL, 'away', 'payAway_section_expanded', /Similar to "pay out," meaning to let a rope slide through your hands/i, renderPage);

describeChevronAndColour(LABEL, 'away', renderPage);

describeDefaultImageCards(LABEL, 'away', 'payAway', /Similar to "pay out," meaning to let a rope slide through your hands/i, /He paid away the line as the anchor dropped\./i, renderPage, getCard);
