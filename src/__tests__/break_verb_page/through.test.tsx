import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'BreakVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('BreakVerbPage — "through" section definitions', () => {
  it('renders definition for forcing a way through an obstacle', () => {
    renderPage();
    expandSection('through');
    expect(screen.getByText(/To force a way through an obstacle, barrier, or defense/i)).toBeInTheDocument();
  });

  it('renders definition for making a significant discovery', () => {
    renderPage();
    expandSection('through');
    expect(screen.getByText(/To make a significant discovery or overcome a major limitation/i)).toBeInTheDocument();
  });

  it('all 2 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('through');
    expect(screen.getByText(/To force a way through an obstacle, barrier, or defense/i)).toHaveClass('truncate');
    expect(screen.getByText(/To make a significant discovery or overcome a major limitation/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('through');
    expect(screen.getByText(/To force a way through an obstacle, barrier, or defense/i)).toHaveAttribute(
      'title',
      'To force a way through an obstacle, barrier, or defense.'
    );
  });
});

describeSectionToggle(LABEL, 'through', 'breakThrough_section_expanded', /To force a way through an obstacle, barrier, or defense/i, renderPage);

describeChevronAndColour(LABEL, 'through', renderPage);

describeDefaultImageCards(LABEL, 'through', 'breakThrough', /To force a way through an obstacle, barrier, or defense/i, /The sun finally broke through the heavy clouds/i, renderPage, getCard);
