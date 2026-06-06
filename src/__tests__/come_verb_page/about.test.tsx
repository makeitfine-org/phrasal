import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'ComeVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('ComeVerbPage — "about" section definitions', () => {
  it('renders definition for happening or occurring', () => {
    renderPage();
    expandSection('about');
    expect(screen.getByText(/To happen or occur, especially in a way that is not planned/i)).toBeInTheDocument();
  });
});

describeSectionToggle(LABEL, 'about', 'comeAbout_section_expanded', /To happen or occur, especially in a way that is not planned/i, renderPage);

describeChevronAndColour(LABEL, 'about', renderPage);

describeDefaultImageCards(LABEL, 'about', 'comeAbout', /To happen or occur, especially in a way that is not planned/i, /"How did this bug in the Java code come about\?"/i, renderPage, getCard);
