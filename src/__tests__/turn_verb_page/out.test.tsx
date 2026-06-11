import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'TurnVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('TurnVerbPage — "out" section definitions', () => {
  it('renders definition for ending up a particular way', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To end up or result in a particular way\./i)).toBeInTheDocument();
  });

  it('renders definition for attending an event', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To attend an event or gather as a crowd\./i)).toBeInTheDocument();
  });

  it('renders definition for extinguishing a light', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To extinguish a light\./i)).toBeInTheDocument();
  });

  it('renders definition for producing something', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To produce or manufacture something\./i)).toBeInTheDocument();
  });

  it('renders definition for emptying pockets', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To empty one's pockets or a receptacle\./i)).toBeInTheDocument();
  });

  it('all 5 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('out');
    const defs = [
      screen.getByText(/To end up or result in a particular way\./i),
      screen.getByText(/To attend an event or gather as a crowd\./i),
      screen.getByText(/To extinguish a light\./i),
      screen.getByText(/To produce or manufacture something\./i),
      screen.getByText(/To empty one's pockets or a receptacle\./i),
    ];
    defs.forEach(el => expect(el).toHaveClass('truncate'));
  });

  it('first definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To end up or result in a particular way\./i)).toHaveAttribute(
      'title',
      'To end up or result in a particular way.'
    );
  });

  it('second definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To attend an event or gather as a crowd\./i)).toHaveAttribute(
      'title',
      'To attend an event or gather as a crowd.'
    );
  });

  it('third definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To extinguish a light\./i)).toHaveAttribute(
      'title',
      'To extinguish a light.'
    );
  });

  it('fourth definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To produce or manufacture something\./i)).toHaveAttribute(
      'title',
      'To produce or manufacture something.'
    );
  });

  it('fifth definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To empty one's pockets or a receptacle\./i)).toHaveAttribute(
      'title',
      "To empty one's pockets or a receptacle."
    );
  });
});

describeSectionToggle(LABEL, 'out', 'turnOut_section_expanded', /To end up or result in a particular way\./i, renderPage);

describeChevronAndColour(LABEL, 'out', renderPage);

describeDefaultImageCards(LABEL, 'out', 'turnOut', /To end up or result in a particular way\./i, /Despite the rain, the outdoor party turned out to be a great success\./i, renderPage, getCard);
