import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'RunVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('RunVerbPage — "up" section definitions', () => {
  it('renders definition for creating a large debt or cost', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To create a large debt or cost/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To create a large debt or cost/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To create a large debt or cost/i)).toHaveAttribute(
      'title',
      'To create a large debt or cost.'
    );
  });
});

describeSectionToggle(LABEL, 'up', 'runUp_section_expanded', /To create a large debt or cost/i, renderPage);

describeChevronAndColour(LABEL, 'up', renderPage);

describeDefaultImageCards(LABEL, 'up', 'runUp', /To create a large debt or cost/i, /We ran up a huge AWS bill/i, renderPage, getCard);
