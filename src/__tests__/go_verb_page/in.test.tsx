import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'GoVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('GoVerbPage — "in" section definitions', () => {
  it('renders definition for entering a place', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To enter a place/i)).toBeInTheDocument();
  });

  it('renders definition for being understood or remembered', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To be understood or remembered/i)).toBeInTheDocument();
  });

  it('renders definition for becoming hidden (the sun)', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To become hidden \(the sun going behind clouds\)/i)).toBeInTheDocument();
  });
});

describeSectionToggle(LABEL, 'in', 'goIn_section_expanded', /To enter a place/i, renderPage);

describeChevronAndColour(LABEL, 'in', renderPage);

describeDefaultImageCards(LABEL, 'in', 'goIn', /To enter a place/i, /"The door is open, so you can go in/i, renderPage, getCard);
