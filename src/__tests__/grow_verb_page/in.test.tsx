import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'GrowVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('GrowVerbPage — "in" section definitions', () => {
  it('renders definition for filling an empty space by growing', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To fill an empty space by growing/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To fill an empty space by growing/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To fill an empty space by growing/i)).toHaveAttribute(
      'title',
      'To fill an empty space by growing (often used for hair or plants).'
    );
  });
});

describeSectionToggle(LABEL, 'in', 'growIn_section_expanded', /To fill an empty space by growing/i, renderPage);

describeChevronAndColour(LABEL, 'in', renderPage);

describeDefaultImageCards(LABEL, 'in', 'growIn', /To fill an empty space by growing/i, /We planted new seeds in the garden, and the grass is finally growing in\./i, renderPage, getCard);
