import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'LookVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('LookVerbPage — "ahead" section definitions', () => {
  it('renders definition for thinking about and planning for the future', () => {
    renderPage();
    expandSection('ahead');
    expect(screen.getByText(/To think about and plan for the future\./i)).toBeInTheDocument();
  });

  it('all 1 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('ahead');
    const defs = [
      screen.getByText(/To think about and plan for the future\./i),
    ];
    defs.forEach(el => expect(el).toHaveClass('truncate'));
  });

  it('first definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('ahead');
    expect(screen.getByText(/To think about and plan for the future\./i)).toHaveAttribute(
      'title',
      'To think about and plan for the future.'
    );
  });
});

describeSectionToggle(LABEL, 'ahead', 'lookAhead_section_expanded', /To think about and plan for the future\./i, renderPage);

describeChevronAndColour(LABEL, 'ahead', renderPage);

describeDefaultImageCards(LABEL, 'ahead', 'lookAhead', /To think about and plan for the future\./i, /A good leader needs to look ahead/i, renderPage, getCard);
