import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'BrushVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('BrushVerbPage — "over" section definitions', () => {
  it('renders definition for ignoring a problem', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To ignore a problem or treat a topic lightly/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To ignore a problem or treat a topic lightly/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To ignore a problem or treat a topic lightly/i)).toHaveAttribute(
      'title',
      'To ignore a problem or treat a topic lightly instead of explaining it in detail.'
    );
  });
});

describeSectionToggle(LABEL, 'over', 'brushOver_section_expanded', /To ignore a problem or treat a topic lightly/i, renderPage);

describeChevronAndColour(LABEL, 'over', renderPage);

describeDefaultImageCards(LABEL, 'over', 'brushOver', /To ignore a problem or treat a topic lightly/i, /brushed over the bad financial report/i, renderPage, getCard);
