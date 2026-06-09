import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'CleanVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('CleanVerbPage — "away" section definitions', () => {
  it('renders definition for removing dirt or objects to leave a space tidy', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To remove dirt, rubbish, or objects to leave a space tidy\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To remove dirt, rubbish, or objects to leave a space tidy\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To remove dirt, rubbish, or objects to leave a space tidy\./i)).toHaveAttribute(
      'title',
      'To remove dirt, rubbish, or objects to leave a space tidy.'
    );
  });
});

describeSectionToggle(LABEL, 'away', 'cleanAway_section_expanded', /To remove dirt, rubbish, or objects to leave a space tidy\./i, renderPage);

describeChevronAndColour(LABEL, 'away', renderPage);

describeDefaultImageCards(LABEL, 'away', 'cleanAway', /To remove dirt, rubbish, or objects to leave a space tidy\./i, /Please clean away the empty plates/i, renderPage, getCard);
