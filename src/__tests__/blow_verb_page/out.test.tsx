import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'BlowVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('BlowVerbPage — "out" section definitions', () => {
  it('renders definition for extinguishing a flame', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To extinguish a flame with your breath or wind\./i)).toBeInTheDocument();
  });

  it('renders definition for defeating an opponent', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To defeat an opponent very easily\./i)).toBeInTheDocument();
  });

  it("renders definition for a tire bursting", () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/When a vehicle's tire suddenly bursts\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To extinguish a flame with your breath or wind\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To extinguish a flame with your breath or wind\./i)).toHaveAttribute(
      'title',
      'To extinguish a flame with your breath or wind.'
    );
  });
});

describeSectionToggle(LABEL, 'out', 'blowOut_section_expanded', /To extinguish a flame with your breath or wind\./i, renderPage);

describeChevronAndColour(LABEL, 'out', renderPage);

describeDefaultImageCards(LABEL, 'out', 'blowOut', /To extinguish a flame with your breath or wind\./i, /blow out the candles/i, renderPage, getCard);
