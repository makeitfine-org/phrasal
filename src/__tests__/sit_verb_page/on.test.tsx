import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'SitVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('SitVerbPage — "on" section definitions', () => {
  it('renders definition for being an official member of a board', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To be an official member of a board or committee\./i)).toBeInTheDocument();
  });

  it('renders definition for delaying a decision', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To delay making a decision or taking action on something\./i)).toBeInTheDocument();
  });

  it('all 2 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To be an official member of a board or committee\./i)).toHaveClass('truncate');
    expect(screen.getByText(/To delay making a decision or taking action on something\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To be an official member of a board or committee\./i)).toHaveAttribute(
      'title',
      'To be an official member of a board or committee.'
    );
  });
});

describeSectionToggle(LABEL, 'on', 'sitOn_section_expanded', /To be an official member of a board or committee\./i, renderPage);

describeChevronAndColour(LABEL, 'on', renderPage);

describeDefaultImageCards(LABEL, 'on', 'sitOn', /To be an official member of a board or committee\./i, /He sits on the board of directors for three different tech companies\./i, renderPage, getCard);
