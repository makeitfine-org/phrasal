import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'GiveVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('GiveVerbPage — "with" section definitions', () => {
  it('renders definition for providing information informally', () => {
    renderPage();
    expandSection('with');
    expect(screen.getByText(/To provide or tell information/i)).toBeInTheDocument();
  });
});

describeSectionToggle(LABEL, 'with', 'giveWith_section_expanded', /To provide or tell information/i, renderPage);

describeChevronAndColour(LABEL, 'with', renderPage);

describeDefaultImageCards(LABEL, 'with', 'giveWith', /To provide or tell information/i, /"Come on, give with the details/i, renderPage, getCard);
