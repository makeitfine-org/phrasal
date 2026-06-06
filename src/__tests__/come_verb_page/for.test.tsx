import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'ComeVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('ComeVerbPage — "for" section definitions', () => {
  it('renders definition for arriving to collect someone', () => {
    renderPage();
    expandSection('for');
    expect(screen.getByText(/To arrive in order to collect someone or something/i)).toBeInTheDocument();
  });
});

describeSectionToggle(LABEL, 'for', 'comeFor_section_expanded', /To arrive in order to collect someone or something/i, renderPage);

describeChevronAndColour(LABEL, 'for', renderPage);

describeDefaultImageCards(LABEL, 'for', 'comeFor', /To arrive in order to collect someone or something/i, /"The courier will come for the signed contracts at 3:00 PM/i, renderPage, getCard);
