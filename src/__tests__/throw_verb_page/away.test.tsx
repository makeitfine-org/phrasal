import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'ThrowVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('ThrowVerbPage — "away" section definitions', () => {
  it('renders definition for discarding as trash', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To discard as trash\./i)).toBeInTheDocument();
  });

  it('renders definition for wasting an opportunity', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To waste or fail to make use of an opportunity or advantage\./i)).toBeInTheDocument();
  });

  it('renders definition for speaking casually or unintentionally', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To speak casually or unintentionally/i)).toBeInTheDocument();
  });

  it('all 3 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('away');
    const defs = [
      screen.getByText(/To discard as trash\./i),
      screen.getByText(/To waste or fail to make use of an opportunity or advantage\./i),
      screen.getByText(/To speak casually or unintentionally/i),
    ];
    defs.forEach(el => expect(el).toHaveClass('truncate'));
  });

  it('first definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To discard as trash\./i)).toHaveAttribute(
      'title',
      'To discard as trash.'
    );
  });

  it('second definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To waste or fail to make use of an opportunity or advantage\./i)).toHaveAttribute(
      'title',
      'To waste or fail to make use of an opportunity or advantage.'
    );
  });

  it('third definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To speak casually or unintentionally/i)).toHaveAttribute(
      'title',
      'To speak casually or unintentionally (a "throwaway" comment).'
    );
  });
});

describeSectionToggle(LABEL, 'away', 'throwAway_section_expanded', /To discard as trash\./i, renderPage);

describeChevronAndColour(LABEL, 'away', renderPage);

describeDefaultImageCards(LABEL, 'away', 'throwAway', /To discard as trash\./i, /Don't throw away that receipt; you might need it\./i, renderPage, getCard);
