import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'CastVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('CastVerbPage — "up" section definitions', () => {
  it('renders definition for calculating figures', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To calculate or add up a column of figures/i)).toBeInTheDocument();
  });

  it('renders definition for sea washing something ashore', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/Of the sea.*To wash something onto the shore/i)).toBeInTheDocument();
  });
});

describeSectionToggle(LABEL, 'up', 'castUp_section_expanded', /To calculate or add up a column of figures/i, renderPage);

describeChevronAndColour(LABEL, 'up', renderPage);

describeDefaultImageCards(LABEL, 'up', 'castUp', /To calculate or add up a column of figures/i, /"The financial manager cast up/i, renderPage, getCard);
