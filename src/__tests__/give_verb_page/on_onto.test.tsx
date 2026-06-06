import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'GiveVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('GiveVerbPage — "on / onto" section definitions', () => {
  it('renders definition for opening toward a view', () => {
    renderPage();
    expandSection('on / onto');
    expect(screen.getByText(/To open in the direction of, or provide a view of/i)).toBeInTheDocument();
  });
});

describeSectionToggle(LABEL, 'on / onto', 'giveOnOnto_section_expanded', /To open in the direction of, or provide a view of/i, renderPage);

describeChevronAndColour(LABEL, 'on / onto', renderPage);

describeDefaultImageCards(LABEL, 'on / onto', 'giveOnOnto', /To open in the direction of, or provide a view of/i, /"The CEO's office has large windows/i, renderPage, getCard);
