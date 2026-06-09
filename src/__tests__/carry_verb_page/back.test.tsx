import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'CarryVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('CarryVerbPage — "back" section definitions', () => {
  it('renders definition for bringing a past memory to mind', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To bring a past memory to mind/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To bring a past memory to mind/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To bring a past memory to mind/i)).toHaveAttribute(
      'title',
      'To bring a past memory to mind; to make someone remember a specific time.'
    );
  });
});

describeSectionToggle(LABEL, 'back', 'carryBack_section_expanded', /To bring a past memory to mind/i, renderPage);

describeChevronAndColour(LABEL, 'back', renderPage);

describeDefaultImageCards(LABEL, 'back', 'carryBack', /To bring a past memory to mind/i, /carried the CEO back to his first year in business/i, renderPage, getCard);
