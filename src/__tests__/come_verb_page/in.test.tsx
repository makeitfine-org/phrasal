import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'ComeVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('ComeVerbPage — "in" section definitions', () => {
  it('renders definition for entering a room or building', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To enter a room or building/i)).toBeInTheDocument();
  });

  it('renders definition for becoming relevant or involved', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To become relevant or involved in a situation/i)).toBeInTheDocument();
  });

  it('renders definition for arriving', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To arrive \(news, money, results\)/i)).toBeInTheDocument();
  });
});

describeSectionToggle(LABEL, 'in', 'comeIn_section_expanded', /To enter a room or building/i, renderPage);

describeChevronAndColour(LABEL, 'in', renderPage);

describeDefaultImageCards(LABEL, 'in', 'comeIn', /To enter a room or building/i, /"Please come in and take a seat/i, renderPage, getCard);
