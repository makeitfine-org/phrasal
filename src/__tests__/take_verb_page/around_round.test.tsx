import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'TakeVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('TakeVerbPage — "around / round" section definitions', () => {
  it('renders definition for showing someone around', () => {
    renderPage();
    expandSection('around / round');
    expect(screen.getByText(/To show someone around a place/i)).toBeInTheDocument();
  });
});

describeSectionToggle(LABEL, 'around / round', 'takeAroundRound_section_expanded', /To show someone around a place/i, renderPage);

describeChevronAndColour(LABEL, 'around / round', renderPage);

describeDefaultImageCards(LABEL, 'around / round', 'takeAroundRound', /To show someone around a place/i, /"Welcome to the headquarters/i, renderPage, getCard);
