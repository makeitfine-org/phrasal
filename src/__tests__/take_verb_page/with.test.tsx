import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'TakeVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('TakeVerbPage — "with" section definitions', () => {
  it('renders definition for being impressed', () => {
    renderPage();
    expandSection('with');
    expect(screen.getByText(/To be attracted to or impressed by/i)).toBeInTheDocument();
  });
});

describeSectionToggle(LABEL, 'with', 'takeWith_section_expanded', /To be attracted to or impressed by/i, renderPage);

describeChevronAndColour(LABEL, 'with', renderPage);

describeDefaultImageCards(LABEL, 'with', 'takeWith', /To be attracted to or impressed by/i, /"I was very taken with his presentation/i, renderPage, getCard);
