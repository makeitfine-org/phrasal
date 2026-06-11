import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'StickVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('StickVerbPage — "by" section definitions', () => {
  it('renders definition for remaining loyal to someone', () => {
    renderPage();
    expandSection('by');
    expect(screen.getByText(/To remain loyal to someone during difficult times\./i)).toBeInTheDocument();
  });

  it('renders definition for keeping a promise', () => {
    renderPage();
    expandSection('by');
    expect(screen.getByText(/To keep a promise or remain committed to a decision\./i)).toBeInTheDocument();
  });

  it('all 2 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('by');
    const defs = [
      screen.getByText(/To remain loyal to someone during difficult times\./i),
      screen.getByText(/To keep a promise or remain committed to a decision\./i),
    ];
    defs.forEach(el => expect(el).toHaveClass('truncate'));
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('by');
    expect(screen.getByText(/To remain loyal to someone during difficult times\./i)).toHaveAttribute(
      'title',
      'To remain loyal to someone during difficult times.'
    );
  });
});

describeSectionToggle(LABEL, 'by', 'stickBy_section_expanded', /To remain loyal to someone during difficult times\./i, renderPage);

describeChevronAndColour(LABEL, 'by', renderPage);

describeDefaultImageCards(LABEL, 'by', 'stickBy', /To remain loyal to someone during difficult times\./i, /The founders stuck by each other when the company almost went bankrupt\./i, renderPage, getCard);
