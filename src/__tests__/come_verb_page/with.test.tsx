import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'ComeVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('ComeVerbPage — "with" section definitions', () => {
  it('renders definition for being included in a product or deal', () => {
    renderPage();
    expandSection('with');
    expect(screen.getByText(/To be included as part of a product, package, or deal/i)).toBeInTheDocument();
  });
});

describeSectionToggle(LABEL, 'with', 'comeWith_section_expanded', /To be included as part of a product, package, or deal/i, renderPage);

describeChevronAndColour(LABEL, 'with', renderPage);

describeDefaultImageCards(LABEL, 'with', 'comeWith', /To be included as part of a product, package, or deal/i, /"The enterprise software license comes with 24\/7 technical support/i, renderPage, getCard);
