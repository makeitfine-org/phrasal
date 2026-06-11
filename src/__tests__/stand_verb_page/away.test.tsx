import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'StandVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('StandVerbPage — "away" section definitions', () => {
  it('renders definition for moving backwards or keeping a distance', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To move backwards or keep a distance from something/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To move backwards or keep a distance from something/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To move backwards or keep a distance from something/i)).toHaveAttribute(
      'title',
      'To move backwards or keep a distance from something (mostly literal).'
    );
  });
});

describeSectionToggle(LABEL, 'away', 'standAway_section_expanded', /To move backwards or keep a distance from something/i, renderPage);

describeChevronAndColour(LABEL, 'away', renderPage);

describeDefaultImageCards(LABEL, 'away', 'standAway', /To move backwards or keep a distance from something/i, /Please stand away from the servers while they are restarting\./i, renderPage, getCard);
