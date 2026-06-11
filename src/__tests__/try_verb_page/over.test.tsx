import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'TryVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('TryVerbPage — "over" section definitions', () => {
  it('renders definition for rehearsing something from beginning to end', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To practice, rehearse, or run through something/i)).toBeInTheDocument();
  });

  it('all 1 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('over');
    const defs = [
      screen.getByText(/To practice, rehearse, or run through something/i),
    ];
    defs.forEach(el => expect(el).toHaveClass('truncate'));
  });

  it('first definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To practice, rehearse, or run through something/i)).toHaveAttribute(
      'title',
      'To practice, rehearse, or run through something from beginning to end to check for flaws (slightly dated, most commonly used with music or speeches).'
    );
  });
});

describeSectionToggle(LABEL, 'over', 'tryOver_section_expanded', /To practice, rehearse, or run through something/i, renderPage);

describeChevronAndColour(LABEL, 'over', renderPage);

describeDefaultImageCards(LABEL, 'over', 'tryOver', /To practice, rehearse, or run through something/i, /Let's try over the presentation one more time/i, renderPage, getCard);
