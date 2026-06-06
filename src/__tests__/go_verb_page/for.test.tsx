import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'GoVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('GoVerbPage — "for" section definitions', () => {
  it('renders definition for choosing or selecting', () => {
    renderPage();
    expandSection('for');
    expect(screen.getByText(/To choose or select something/i)).toBeInTheDocument();
  });

  it('renders definition for trying to achieve something', () => {
    renderPage();
    expandSection('for');
    expect(screen.getByText(/To try to achieve or get something/i)).toBeInTheDocument();
  });

  it('renders definition for attacking someone', () => {
    renderPage();
    expandSection('for');
    expect(screen.getByText(/To attack someone physically or verbally/i)).toBeInTheDocument();
  });

  it('renders definition for applying equally to someone', () => {
    renderPage();
    expandSection('for');
    expect(screen.getByText(/To apply equally to someone or something else/i)).toBeInTheDocument();
  });
});

describeSectionToggle(LABEL, 'for', 'goFor_section_expanded', /To choose or select something/i, renderPage);

describeChevronAndColour(LABEL, 'for', renderPage);

describeDefaultImageCards(LABEL, 'for', 'goFor', /To choose or select something/i, /"I will go for the standard Java framework/i, renderPage, getCard);
