import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'GoVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('GoVerbPage — "into" section definitions', () => {
  it('renders definition for discussing in detail', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/To discuss or explain something in detail/i)).toBeInTheDocument();
  });

  it('renders definition for entering a profession or business', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/To enter a specific profession or business/i)).toBeInTheDocument();
  });

  it('renders definition for crashing or colliding', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/To crash or collide with something/i)).toBeInTheDocument();
  });

  it('renders definition for entering a state or condition', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/To enter a specific state or condition/i)).toBeInTheDocument();
  });
});

describeSectionToggle(LABEL, 'into', 'goInto_section_expanded', /To discuss or explain something in detail/i, renderPage);

describeChevronAndColour(LABEL, 'into', renderPage);

describeDefaultImageCards(LABEL, 'into', 'goInto', /To discuss or explain something in detail/i, /"Let's not go into the budget problems/i, renderPage, getCard);
