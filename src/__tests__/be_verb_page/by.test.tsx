import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'BeVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('BeVerbPage — "by" section definitions', () => {
  it('renders definition for being physically near', () => {
    renderPage();
    expandSection('by');
    expect(screen.getByText(/To be physically near\./i)).toBeInTheDocument();
  });

  it('renders definition for being the work of someone', () => {
    renderPage();
    expandSection('by');
    expect(screen.getByText(/To be the work of someone \(passive sense\)\./i)).toBeInTheDocument();
  });

  it('all 2 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('by');
    expect(screen.getByText(/To be physically near\./i)).toHaveClass('truncate');
    expect(screen.getByText(/To be the work of someone \(passive sense\)\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('by');
    expect(screen.getByText(/To be physically near\./i)).toHaveAttribute('title', 'To be physically near.');
  });
});

describeSectionToggle(LABEL, 'by', 'beBy_section_expanded', /To be physically near\./i, renderPage);

describeChevronAndColour(LABEL, 'by', renderPage);

describeDefaultImageCards(LABEL, 'by', 'beBy', /To be physically near\./i, /The server room is by the elevator/i, renderPage, getCard);
