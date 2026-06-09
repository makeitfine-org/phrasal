import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'EatVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('EatVerbPage — "away" section definitions', () => {
  it('renders definition for gradually destroying or eroding something', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To gradually destroy, erode, or consume something over time\./i)).toBeInTheDocument();
  });

  it('renders definition for continuously bothering or distressing someone', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To continuously bother, distress, or cause anxiety for someone \(often used with "at"\)\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To gradually destroy, erode, or consume something over time\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To gradually destroy, erode, or consume something over time\./i)).toHaveAttribute(
      'title',
      'To gradually destroy, erode, or consume something over time.'
    );
  });
});

describeSectionToggle(LABEL, 'away', 'eatAway_section_expanded', /To gradually destroy, erode, or consume something over time\./i, renderPage);

describeChevronAndColour(LABEL, 'away', renderPage);

describeDefaultImageCards(LABEL, 'away', 'eatAway', /To gradually destroy, erode, or consume something over time\./i, /Over thousands of years, the river slowly ate away the soft limestone\./i, renderPage, getCard);
