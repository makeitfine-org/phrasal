import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'ComeVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('ComeVerbPage — "away" section definitions', () => {
  it('renders definition for leaving with a specific feeling', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To leave a place or situation with a specific feeling, idea, or result/i)).toBeInTheDocument();
  });

  it('renders definition for separating or detaching', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To separate or detach from something/i)).toBeInTheDocument();
  });
});

describeSectionToggle(LABEL, 'away', 'comeAway_section_expanded', /To leave a place or situation with a specific feeling, idea, or result/i, renderPage);

describeChevronAndColour(LABEL, 'away', renderPage);

describeDefaultImageCards(LABEL, 'away', 'comeAway', /To leave a place or situation with a specific feeling, idea, or result/i, /"I came away from the strategy meeting feeling very optimistic about Q3/i, renderPage, getCard);
