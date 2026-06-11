import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'StandVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('StandVerbPage — "over" section definitions', () => {
  it('renders definition for watching someone closely', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To watch someone closely, often in an intimidating or annoying way\./i)).toBeInTheDocument();
  });

  it('renders definition for being postponed', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To be postponed or delayed to a later time\./i)).toBeInTheDocument();
  });

  it('all 2 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To watch someone closely, often in an intimidating or annoying way\./i)).toHaveClass('truncate');
    expect(screen.getByText(/To be postponed or delayed to a later time\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To watch someone closely, often in an intimidating or annoying way\./i)).toHaveAttribute(
      'title',
      'To watch someone closely, often in an intimidating or annoying way.'
    );
  });
});

describeSectionToggle(LABEL, 'over', 'standOver_section_expanded', /To watch someone closely, often in an intimidating or annoying way\./i, renderPage);

describeChevronAndColour(LABEL, 'over', renderPage);

describeDefaultImageCards(LABEL, 'over', 'standOver', /To watch someone closely, often in an intimidating or annoying way\./i, /I can't write code well if the boss is standing over me\./i, renderPage, getCard);
