import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'WearVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('WearVerbPage — "down" section definitions', () => {
  it('renders definition for overcoming resistance through persistent pressure', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To overcome someone's resistance, opposition, or reluctance through persistent pressure\./i)).toBeInTheDocument();
  });

  it('renders definition for reducing size or effectiveness through friction', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To reduce the size, thickness, or effectiveness of something by continuous friction or prolonged use\./i)).toBeInTheDocument();
  });

  it('all 2 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('down');
    const defs = [
      screen.getByText(/To overcome someone's resistance, opposition, or reluctance through persistent pressure\./i),
      screen.getByText(/To reduce the size, thickness, or effectiveness of something by continuous friction or prolonged use\./i),
    ];
    defs.forEach(el => expect(el).toHaveClass('truncate'));
  });

  it('first definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To overcome someone's resistance, opposition, or reluctance through persistent pressure\./i)).toHaveAttribute(
      'title',
      "To overcome someone's resistance, opposition, or reluctance through persistent pressure."
    );
  });

  it('second definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To reduce the size, thickness, or effectiveness of something by continuous friction or prolonged use\./i)).toHaveAttribute(
      'title',
      'To reduce the size, thickness, or effectiveness of something by continuous friction or prolonged use.'
    );
  });
});

describeSectionToggle(LABEL, 'down', 'wearDown_section_expanded', /To overcome someone's resistance, opposition, or reluctance through persistent pressure\./i, renderPage);

describeChevronAndColour(LABEL, 'down', renderPage);

describeDefaultImageCards(LABEL, 'down', 'wearDown', /To overcome someone's resistance, opposition, or reluctance through persistent pressure\./i, /The developer initially wanted a much higher salary, but the long negotiation process eventually wore them down\./i, renderPage, getCard);
