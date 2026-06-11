import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'SitVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('SitVerbPage — "over" section definitions', () => {
  it('renders definition for spending a long time doing something while conversing', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To spend a long time doing something, usually eating or drinking/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To spend a long time doing something, usually eating or drinking/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To spend a long time doing something, usually eating or drinking/i)).toHaveAttribute(
      'title',
      'To spend a long time doing something, usually eating or drinking, while having a conversation.'
    );
  });
});

describeSectionToggle(LABEL, 'over', 'sitOver_section_expanded', /To spend a long time doing something, usually eating or drinking/i, renderPage);

describeChevronAndColour(LABEL, 'over', renderPage);

describeDefaultImageCards(LABEL, 'over', 'sitOver', /To spend a long time doing something, usually eating or drinking/i, /We sat over coffee for hours discussing the new business strategy\./i, renderPage, getCard);
