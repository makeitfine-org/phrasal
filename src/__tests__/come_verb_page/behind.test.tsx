import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'ComeVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('ComeVerbPage — "behind" section definitions', () => {
  it('renders definition for following or ranking lower', () => {
    renderPage();
    expandSection('behind');
    expect(screen.getByText(/To follow closely or to rank lower than something else in a list/i)).toBeInTheDocument();
  });
});

describeSectionToggle(LABEL, 'behind', 'comeBehind_section_expanded', /To follow closely or to rank lower than something else in a list/i, renderPage);

describeChevronAndColour(LABEL, 'behind', renderPage);

describeDefaultImageCards(LABEL, 'behind', 'comeBehind', /To follow closely or to rank lower than something else in a list/i, /"In the market share report, our main product comes behind theirs/i, renderPage, getCard);
