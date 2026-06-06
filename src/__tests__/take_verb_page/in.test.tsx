import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'TakeVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('TakeVerbPage — "in" section definitions', () => {
  it('renders definition for absorbing information', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To absorb and understand information/i)).toBeInTheDocument();
  });

  it('renders definition for providing shelter', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To allow someone or something to stay in your home/i)).toBeInTheDocument();
  });

  it('renders definition for deceiving', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To deceive or trick someone/i)).toBeInTheDocument();
  });

  it('renders definition for making clothing smaller', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To make a piece of clothing narrower or smaller/i)).toBeInTheDocument();
  });
});

describeSectionToggle(LABEL, 'in', 'takeIn_section_expanded', /To absorb and understand information/i, renderPage);

describeChevronAndColour(LABEL, 'in', renderPage);

describeDefaultImageCards(LABEL, 'in', 'takeIn', /To absorb and understand information/i, /"The technical manual was very hard to take in/i, renderPage, getCard);
