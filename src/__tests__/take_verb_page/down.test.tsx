import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'TakeVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('TakeVerbPage — "down" section definitions', () => {
  it('renders definition for writing information', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To write down information/i)).toBeInTheDocument();
  });

  it('renders definition for removing or dismantling', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To remove from a high place or to dismantle something/i)).toBeInTheDocument();
  });

  it('renders definition for defeating someone', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To defeat or humiliate someone/i)).toBeInTheDocument();
  });
});

describeSectionToggle(LABEL, 'down', 'takeDown_section_expanded', /To write down information/i, renderPage);

describeChevronAndColour(LABEL, 'down', renderPage);

describeDefaultImageCards(LABEL, 'down', 'takeDown', /To write down information/i, /"Please take down the main points/i, renderPage, getCard);
