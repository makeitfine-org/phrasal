import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'ComeVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('ComeVerbPage — "back" section definitions', () => {
  it('renders definition for returning to a place or topic', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To return to a place, state, or topic/i)).toBeInTheDocument();
  });

  it('renders definition for becoming popular again', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To become popular or fashionable again/i)).toBeInTheDocument();
  });
});

describeSectionToggle(LABEL, 'back', 'comeBack_section_expanded', /To return to a place, state, or topic/i, renderPage);

describeChevronAndColour(LABEL, 'back', renderPage);

describeDefaultImageCards(LABEL, 'back', 'comeBack', /To return to a place, state, or topic/i, /"Let's come back to the budget discussion after lunch/i, renderPage, getCard);
