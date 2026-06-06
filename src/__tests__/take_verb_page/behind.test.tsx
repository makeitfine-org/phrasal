import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'TakeVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('TakeVerbPage — "behind" section definitions', () => {
  it('renders definition for literal use', () => {
    renderPage();
    expandSection('behind');
    expect(screen.getByText(/Literal use: to physically move someone or something to the back/i)).toBeInTheDocument();
  });
});

describeSectionToggle(LABEL, 'behind', 'takeBehind_section_expanded', /Literal use: to physically move someone or something to the back/i, renderPage);

describeChevronAndColour(LABEL, 'behind', renderPage);

describeDefaultImageCards(LABEL, 'behind', 'takeBehind', /Literal use: to physically move someone or something to the back/i, /"Take the new equipment behind the stage/i, renderPage, getCard);
