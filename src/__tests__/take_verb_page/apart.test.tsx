import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'TakeVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('TakeVerbPage — "apart" section definitions', () => {
  it('renders definition for dismantling', () => {
    renderPage();
    expandSection('apart');
    expect(screen.getByText(/To separate something into its component pieces/i)).toBeInTheDocument();
  });

  it('renders definition for criticizing heavily', () => {
    renderPage();
    expandSection('apart');
    expect(screen.getByText(/To criticize someone or something very heavily/i)).toBeInTheDocument();
  });
});

describeSectionToggle(LABEL, 'apart', 'takeApart_section_expanded', /To separate something into its component pieces/i, renderPage);

describeChevronAndColour(LABEL, 'apart', renderPage);

describeDefaultImageCards(LABEL, 'apart', 'takeApart', /To separate something into its component pieces/i, /"The engineer took the machine apart/i, renderPage, getCard);
