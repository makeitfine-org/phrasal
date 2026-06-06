import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'GoVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('GoVerbPage — "to" section definitions', () => {
  it('renders definition for starting a specific action or entering a state', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To start a specific action or enter a state/i)).toBeInTheDocument();
  });

  it('renders definition for being given or assigned to someone', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To be given or assigned to someone/i)).toBeInTheDocument();
  });
});

describeSectionToggle(LABEL, 'to', 'goTo_section_expanded', /To start a specific action or enter a state/i, renderPage);

describeChevronAndColour(LABEL, 'to', renderPage);

describeDefaultImageCards(LABEL, 'to', 'goTo', /To start a specific action or enter a state/i, /"After 12 hours of coding, I finally went to sleep/i, renderPage, getCard);
