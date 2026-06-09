import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'FallVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('FallVerbPage — "behind" section definitions', () => {
  it('renders definition for failing to complete work on time', () => {
    renderPage();
    expandSection('behind');
    expect(screen.getByText(/To fail to complete work or make payments on time\./i)).toBeInTheDocument();
  });

  it('renders definition for moving slower than the group', () => {
    renderPage();
    expandSection('behind');
    expect(screen.getByText(/To move slower than the rest of a group\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('behind');
    expect(screen.getByText(/To fail to complete work or make payments on time\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('behind');
    expect(screen.getByText(/To fail to complete work or make payments on time\./i)).toHaveAttribute(
      'title',
      'To fail to complete work or make payments on time.'
    );
  });
});

describeSectionToggle(LABEL, 'behind', 'fallBehind_section_expanded', /To fail to complete work or make payments on time\./i, renderPage);

describeChevronAndColour(LABEL, 'behind', renderPage);

describeDefaultImageCards(LABEL, 'behind', 'fallBehind', /To fail to complete work or make payments on time\./i, /If you don't manage your time well, you will fall behind on the project schedule\./i, renderPage, getCard);
