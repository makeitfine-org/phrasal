import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'GiveVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('GiveVerbPage — "out" section definitions', () => {
  it('renders definition for distributing to a group', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To distribute something to a group of people/i)).toBeInTheDocument();
  });

  it('renders definition for stopping working or failing', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To stop working or fail completely/i)).toBeInTheDocument();
  });

  it('renders definition for making information public', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To make information public/i)).toBeInTheDocument();
  });
});

describeSectionToggle(LABEL, 'out', 'giveOut_section_expanded', /To distribute something to a group of people/i, renderPage);

describeChevronAndColour(LABEL, 'out', renderPage);

describeDefaultImageCards(LABEL, 'out', 'giveOut', /To distribute something to a group of people/i, /"They were giving out informational flyers/i, renderPage, getCard);
