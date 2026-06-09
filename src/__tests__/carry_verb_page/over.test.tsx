import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'CarryVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('CarryVerbPage — "over" section definitions', () => {
  it('renders definition for continuing to exist in a different situation', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To continue to exist in a different situation/i)).toBeInTheDocument();
  });

  it('renders definition for delaying something', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To delay or postpone something to a later time\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To continue to exist in a different situation/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To continue to exist in a different situation/i)).toHaveAttribute(
      'title',
      'To continue to exist in a different situation, environment, or time.'
    );
  });
});

describeSectionToggle(LABEL, 'over', 'carryOver_section_expanded', /To continue to exist in a different situation/i, renderPage);

describeChevronAndColour(LABEL, 'over', renderPage);

describeDefaultImageCards(LABEL, 'over', 'carryOver', /To continue to exist in a different situation/i, /carried over perfectly into his new role/i, renderPage, getCard);
