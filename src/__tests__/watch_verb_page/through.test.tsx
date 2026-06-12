import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'WatchVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('WatchVerbPage — "through" section definitions', () => {
  it('renders definition for watching something entirely from beginning to end', () => {
    renderPage();
    expandSection('through');
    expect(screen.getByText(/To watch a program, movie, or series entirely from beginning to end\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('through');
    const def = screen.getByText(/To watch a program, movie, or series entirely from beginning to end\./i);
    expect(def).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('through');
    expect(screen.getByText(/To watch a program, movie, or series entirely from beginning to end\./i)).toHaveAttribute(
      'title',
      'To watch a program, movie, or series entirely from beginning to end.'
    );
  });
});

describeSectionToggle(LABEL, 'through', 'watchThrough_section_expanded', /To watch a program, movie, or series entirely from beginning to end\./i, renderPage);

describeChevronAndColour(LABEL, 'through', renderPage);

describeDefaultImageCards(LABEL, 'through', 'watchThrough', /To watch a program, movie, or series entirely from beginning to end\./i, /It took me a whole weekend, but I finally watched the series through\./i, renderPage, getCard);
