import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'GrowVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('GrowVerbPage — "over" section definitions', () => {
  it('renders definition for becoming covered with growing plants', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To become covered with growing plants/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To become covered with growing plants/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To become covered with growing plants/i)).toHaveAttribute(
      'title',
      'To become covered with growing plants (like vines, moss, or grass).'
    );
  });
});

describeSectionToggle(LABEL, 'over', 'growOver_section_expanded', /To become covered with growing plants/i, renderPage);

describeChevronAndColour(LABEL, 'over', renderPage);

describeDefaultImageCards(LABEL, 'over', 'growOver', /To become covered with growing plants/i, /The old, abandoned factory was eventually grown over by ivy\./i, renderPage, getCard);
