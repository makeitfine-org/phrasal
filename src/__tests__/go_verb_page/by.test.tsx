import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'GoVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('GoVerbPage — "by" section definitions', () => {
  it('renders definition for time passing', () => {
    renderPage();
    expandSection('by');
    expect(screen.getByText(/To pass \(used for time\)/i)).toBeInTheDocument();
  });

  it('renders definition for basing a decision on something', () => {
    renderPage();
    expandSection('by');
    expect(screen.getByText(/To base a decision on something or follow rules/i)).toBeInTheDocument();
  });

  it('renders definition for being known by a name', () => {
    renderPage();
    expandSection('by');
    expect(screen.getByText(/To be known by a specific name/i)).toBeInTheDocument();
  });
});

describeSectionToggle(LABEL, 'by', 'goBy_section_expanded', /To pass \(used for time\)/i, renderPage);

describeChevronAndColour(LABEL, 'by', renderPage);

describeDefaultImageCards(LABEL, 'by', 'goBy', /To pass \(used for time\)/i, /"As the years went by, the technology improved/i, renderPage, getCard);
