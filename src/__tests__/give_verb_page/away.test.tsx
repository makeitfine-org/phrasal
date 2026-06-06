import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'GiveVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('GiveVerbPage — "away" section definitions', () => {
  it('renders definition for providing something for free', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To provide something for free/i)).toBeInTheDocument();
  });

  it('renders definition for revealing a secret', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To reveal a secret or hidden information/i)).toBeInTheDocument();
  });

  it('renders definition for betraying someone', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To betray someone or accidentally show their true identity/i)).toBeInTheDocument();
  });

  it('renders definition for handing over a bride', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To formally hand over a bride at a wedding/i)).toBeInTheDocument();
  });
});

describeSectionToggle(LABEL, 'away', 'giveAway_section_expanded', /To provide something for free/i, renderPage);

describeChevronAndColour(LABEL, 'away', renderPage);

describeDefaultImageCards(LABEL, 'away', 'giveAway', /To provide something for free/i, /"The software company is giving away free trials/i, renderPage, getCard);
