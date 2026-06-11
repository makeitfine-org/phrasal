import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'TurnVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('TurnVerbPage — "into" section definitions', () => {
  it('renders definition for transforming into something different', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/To transform or change into something completely different\./i)).toBeInTheDocument();
  });

  it('renders definition for directing a vehicle', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/To direct a vehicle into a specific space or road\./i)).toBeInTheDocument();
  });

  it('all 2 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('into');
    const defs = [
      screen.getByText(/To transform or change into something completely different\./i),
      screen.getByText(/To direct a vehicle into a specific space or road\./i),
    ];
    defs.forEach(el => expect(el).toHaveClass('truncate'));
  });

  it('first definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/To transform or change into something completely different\./i)).toHaveAttribute(
      'title',
      'To transform or change into something completely different.'
    );
  });

  it('second definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/To direct a vehicle into a specific space or road\./i)).toHaveAttribute(
      'title',
      'To direct a vehicle into a specific space or road.'
    );
  });
});

describeSectionToggle(LABEL, 'into', 'turnInto_section_expanded', /To transform or change into something completely different\./i, renderPage);

describeChevronAndColour(LABEL, 'into', renderPage);

describeDefaultImageCards(LABEL, 'into', 'turnInto', /To transform or change into something completely different\./i, /The caterpillar turned into a beautiful butterfly\./i, renderPage, getCard);
