import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'TryVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('TryVerbPage — "out for" section definitions', () => {
  it('renders definition for undergoing a competitive evaluation', () => {
    renderPage();
    expandSection('out for');
    expect(screen.getByText(/To undergo a competitive evaluation/i)).toBeInTheDocument();
  });

  it('all 1 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('out for');
    const defs = [
      screen.getByText(/To undergo a competitive evaluation/i),
    ];
    defs.forEach(el => expect(el).toHaveClass('truncate'));
  });

  it('first definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('out for');
    expect(screen.getByText(/To undergo a competitive evaluation/i)).toHaveAttribute(
      'title',
      'To undergo a competitive evaluation, audition, or test to earn a position on a team, in a play, or in a company.'
    );
  });
});

describeSectionToggle(LABEL, 'out for', 'tryOutFor_section_expanded', /To undergo a competitive evaluation/i, renderPage);

describeChevronAndColour(LABEL, 'out for', renderPage);

describeDefaultImageCards(LABEL, 'out for', 'tryOutFor', /To undergo a competitive evaluation/i, /Several junior developers are going to try out for the lead engineering vacancy/i, renderPage, getCard);
