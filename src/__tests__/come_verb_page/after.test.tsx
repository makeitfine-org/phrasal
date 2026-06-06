import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'ComeVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('ComeVerbPage — "after" section definitions', () => {
  it('renders definition for chasing or pursuing someone', () => {
    renderPage();
    expandSection('after');
    expect(screen.getByText(/To chase or pursue someone \(often to punish them or take something\)/i)).toBeInTheDocument();
  });

  it('renders definition for following in time or order', () => {
    renderPage();
    expandSection('after');
    expect(screen.getByText(/To follow in time or order/i)).toBeInTheDocument();
  });
});

describeSectionToggle(LABEL, 'after', 'comeAfter_section_expanded', /To chase or pursue someone \(often to punish them or take something\)/i, renderPage);

describeChevronAndColour(LABEL, 'after', renderPage);

describeDefaultImageCards(LABEL, 'after', 'comeAfter', /To chase or pursue someone \(often to punish them or take something\)/i, /"If we break the NDA, the client's legal team will come after us/i, renderPage, getCard);
