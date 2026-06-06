import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'ComeVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('ComeVerbPage — "down" section definitions', () => {
  it('renders definition for falling or decreasing', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To fall or decrease \(prices, levels, etc\.\)/i)).toBeInTheDocument();
  });

  it('renders definition for making a firm decision', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To make a firm decision or support a specific side/i)).toBeInTheDocument();
  });
});

describeSectionToggle(LABEL, 'down', 'comeDown_section_expanded', /To fall or decrease \(prices, levels, etc\.\)/i, renderPage);

describeChevronAndColour(LABEL, 'down', renderPage);

describeDefaultImageCards(LABEL, 'down', 'comeDown', /To fall or decrease \(prices, levels, etc\.\)/i, /"Our cloud hosting costs have finally come down this month/i, renderPage, getCard);
