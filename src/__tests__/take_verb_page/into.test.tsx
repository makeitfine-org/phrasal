import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'TakeVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('TakeVerbPage — "into" section definitions', () => {
  it('renders definition for considering something', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/To consider something when making a decision/i)).toBeInTheDocument();
  });
});

describeSectionToggle(LABEL, 'into', 'takeInto_section_expanded', /To consider something when making a decision/i, renderPage);

describeChevronAndColour(LABEL, 'into', renderPage);

describeDefaultImageCards(LABEL, 'into', 'takeInto', /To consider something when making a decision/i, /"We must take the budget into account/i, renderPage, getCard);
