import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'CastVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('CastVerbPage — "out" section definitions', () => {
  it('renders definition for expelling someone from a group', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To forcefully expel someone or something/i)).toBeInTheDocument();
  });
});

describeSectionToggle(LABEL, 'out', 'castOut_section_expanded', /To forcefully expel someone or something/i, renderPage);

describeChevronAndColour(LABEL, 'out', renderPage);

describeDefaultImageCards(LABEL, 'out', 'castOut', /To forcefully expel someone or something/i, /"The corrupt board member was cast out/i, renderPage, getCard);
