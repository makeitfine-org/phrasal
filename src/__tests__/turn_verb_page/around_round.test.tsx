import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'TurnVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('TurnVerbPage — "around / round" section definitions', () => {
  it('renders definition for changing direction', () => {
    renderPage();
    expandSection('around / round');
    expect(screen.getByText(/To change direction and face the opposite way\./i)).toBeInTheDocument();
  });

  it('renders definition for improving a bad situation', () => {
    renderPage();
    expandSection('around / round');
    expect(screen.getByText(/To dramatically improve a bad situation or make a failing business successful\./i)).toBeInTheDocument();
  });

  it('renders definition for completing work within a timeframe', () => {
    renderPage();
    expandSection('around / round');
    expect(screen.getByText(/To complete a piece of work or fulfill a request within a specific timeframe\./i)).toBeInTheDocument();
  });

  it('all 3 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('around / round');
    const defs = [
      screen.getByText(/To change direction and face the opposite way\./i),
      screen.getByText(/To dramatically improve a bad situation or make a failing business successful\./i),
      screen.getByText(/To complete a piece of work or fulfill a request within a specific timeframe\./i),
    ];
    defs.forEach(el => expect(el).toHaveClass('truncate'));
  });

  it('first definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('around / round');
    expect(screen.getByText(/To change direction and face the opposite way\./i)).toHaveAttribute(
      'title',
      'To change direction and face the opposite way.'
    );
  });

  it('second definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('around / round');
    expect(screen.getByText(/To dramatically improve a bad situation or make a failing business successful\./i)).toHaveAttribute(
      'title',
      'To dramatically improve a bad situation or make a failing business successful.'
    );
  });

  it('third definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('around / round');
    expect(screen.getByText(/To complete a piece of work or fulfill a request within a specific timeframe\./i)).toHaveAttribute(
      'title',
      'To complete a piece of work or fulfill a request within a specific timeframe.'
    );
  });
});

describeSectionToggle(LABEL, 'around / round', 'turnAround_section_expanded', /To change direction and face the opposite way\./i, renderPage);

describeChevronAndColour(LABEL, 'around / round', renderPage);

describeDefaultImageCards(LABEL, 'around / round', 'turnAround', /To change direction and face the opposite way\./i, /Turn around and look at the camera\./i, renderPage, getCard);
