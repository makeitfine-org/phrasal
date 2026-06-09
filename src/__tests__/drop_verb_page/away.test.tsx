import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'DropVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('DropVerbPage — "away" section definitions', () => {
  it('renders definition for becoming weaker or gradually disappearing', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To become weaker, smaller, or gradually disappear\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To become weaker, smaller, or gradually disappear\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To become weaker, smaller, or gradually disappear\./i)).toHaveAttribute(
      'title',
      'To become weaker, smaller, or gradually disappear.'
    );
  });
});

describeSectionToggle(LABEL, 'away', 'dropAway_section_expanded', /To become weaker, smaller, or gradually disappear\./i, renderPage);

describeChevronAndColour(LABEL, 'away', renderPage);

describeDefaultImageCards(LABEL, 'away', 'dropAway', /To become weaker, smaller, or gradually disappear\./i, /Public interest in the old software version slowly dropped away/i, renderPage, getCard);
