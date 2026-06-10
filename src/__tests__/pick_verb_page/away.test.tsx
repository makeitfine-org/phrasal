import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'PickVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('PickVerbPage — "away" section definitions', () => {
  it('renders definition for removing small pieces of something slowly', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To remove small pieces of something slowly/i)).toBeInTheDocument();
  });

  it('renders definition for slowly reducing or destroying something', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To slowly reduce or destroy something/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To remove small pieces of something slowly/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To remove small pieces of something slowly/i)).toHaveAttribute(
      'title',
      'To remove small pieces of something slowly.'
    );
  });
});

describeSectionToggle(LABEL, 'away', 'pickAway_section_expanded', /To remove small pieces of something slowly/i, renderPage);

describeChevronAndColour(LABEL, 'away', renderPage);

describeDefaultImageCards(LABEL, 'away', 'pickAway', /To remove small pieces of something slowly/i, /He picked away the old paint from the wall\./i, renderPage, getCard);
