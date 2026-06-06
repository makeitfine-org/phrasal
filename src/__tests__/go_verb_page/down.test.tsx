import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'GoVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('GoVerbPage — "down" section definitions', () => {
  it('renders definition for decreasing or falling', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To decrease or fall/i)).toBeInTheDocument();
  });

  it('renders definition for stopping working (computers or systems)', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To stop working \(computers or systems\)/i)).toBeInTheDocument();
  });

  it('renders definition for being remembered in a certain way', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To be remembered in a certain way/i)).toBeInTheDocument();
  });

  it('renders definition for being received by an audience', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To be received by an audience in a specific way/i)).toBeInTheDocument();
  });

  it('renders definition for setting (the sun)', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To set \(the sun\)/i)).toBeInTheDocument();
  });
});

describeSectionToggle(LABEL, 'down', 'goDown_section_expanded', /To decrease or fall/i, renderPage);

describeChevronAndColour(LABEL, 'down', renderPage);

describeDefaultImageCards(LABEL, 'down', 'goDown', /To decrease or fall/i, /"Our server error rates went down/i, renderPage, getCard);
