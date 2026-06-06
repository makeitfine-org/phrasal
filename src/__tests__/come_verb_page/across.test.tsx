import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'ComeVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('ComeVerbPage — "across" section definitions', () => {
  it('renders definition for finding something by chance', () => {
    renderPage();
    expandSection('across');
    expect(screen.getByText(/To find or meet something or someone by chance/i)).toBeInTheDocument();
  });

  it('renders definition for giving an impression', () => {
    renderPage();
    expandSection('across');
    expect(screen.getByText(/To give a specific impression to others/i)).toBeInTheDocument();
  });
});

describeSectionToggle(LABEL, 'across', 'comeAcross_section_expanded', /To find or meet something or someone by chance/i, renderPage);

describeChevronAndColour(LABEL, 'across', renderPage);

describeDefaultImageCards(LABEL, 'across', 'comeAcross', /To find or meet something or someone by chance/i, /"I came across an excellent article on Agile leadership yesterday/i, renderPage, getCard);
