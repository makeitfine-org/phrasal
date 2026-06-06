import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'ComeVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('ComeVerbPage — "into" section definitions', () => {
  it('renders definition for inheriting money or property', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/To inherit money or property/i)).toBeInTheDocument();
  });

  it('renders definition for becoming a factor or taking effect', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/To become a factor or take effect/i)).toBeInTheDocument();
  });
});

describeSectionToggle(LABEL, 'into', 'comeInto_section_expanded', /To inherit money or property/i, renderPage);

describeChevronAndColour(LABEL, 'into', renderPage);

describeDefaultImageCards(LABEL, 'into', 'comeInto', /To inherit money or property/i, /"He came into a lot of money and started his own software firm/i, renderPage, getCard);
