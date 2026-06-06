import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'GiveVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('GiveVerbPage — "up" section definitions', () => {
  it('renders definition for stopping trying / accepting defeat', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To stop trying to do something or accept defeat/i)).toBeInTheDocument();
  });

  it('renders definition for stopping a regular habit', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To stop doing a regular habit/i)).toBeInTheDocument();
  });

  it('renders definition for parting with something valuable', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To part with something valuable or give away your time/i)).toBeInTheDocument();
  });

  it('renders definition for surrendering to authorities', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To surrender yourself to the authorities/i)).toBeInTheDocument();
  });
});

describeSectionToggle(LABEL, 'up', 'giveUp_section_expanded', /To stop trying to do something or accept defeat/i, renderPage);

describeChevronAndColour(LABEL, 'up', renderPage);

describeDefaultImageCards(LABEL, 'up', 'giveUp', /To stop trying to do something or accept defeat/i, /"The coding problem was incredibly difficult/i, renderPage, getCard);
