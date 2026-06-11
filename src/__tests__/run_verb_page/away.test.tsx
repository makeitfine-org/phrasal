import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'RunVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('RunVerbPage — "away" section definitions', () => {
  it('renders definition for escaping a difficult situation', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To escape or leave a difficult situation/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To escape or leave a difficult situation/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To escape or leave a difficult situation/i)).toHaveAttribute(
      'title',
      'To escape or leave a difficult situation.'
    );
  });
});

describeSectionToggle(LABEL, 'away', 'runAway_section_expanded', /To escape or leave a difficult situation/i, renderPage);

describeChevronAndColour(LABEL, 'away', renderPage);

describeDefaultImageCards(LABEL, 'away', 'runAway', /To escape or leave a difficult situation/i, /A good leader does not run away from hard decisions/i, renderPage, getCard);
