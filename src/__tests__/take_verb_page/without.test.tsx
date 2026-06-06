import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'TakeVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('TakeVerbPage — "without" section definitions', () => {
  it('renders definition for literal use', () => {
    renderPage();
    expandSection('without');
    expect(screen.getByText(/Literal use: to take an item without something else/i)).toBeInTheDocument();
  });
});

describeSectionToggle(LABEL, 'without', 'takeWithout_section_expanded', /Literal use: to take an item without something else/i, renderPage);

describeChevronAndColour(LABEL, 'without', renderPage);

describeDefaultImageCards(LABEL, 'without', 'takeWithout', /Literal use: to take an item without something else/i, /"I will take the coffee without sugar/i, renderPage, getCard);
