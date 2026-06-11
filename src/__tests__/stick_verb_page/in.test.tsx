import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'StickVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('StickVerbPage — "in" section definitions', () => {
  it('renders definition for remaining strongly in memory', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To remain strongly in someone's memory/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To remain strongly in someone's memory/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To remain strongly in someone's memory/i)).toHaveAttribute(
      'title',
      'To remain strongly in someone\'s memory (often used as "stick in your mind").'
    );
  });
});

describeSectionToggle(LABEL, 'in', 'stickIn_section_expanded', /To remain strongly in someone's memory/i, renderPage);

describeChevronAndColour(LABEL, 'in', renderPage);

describeDefaultImageCards(LABEL, 'in', 'stickIn', /To remain strongly in someone's memory/i, /The CEO's speech on agile leadership really stuck in my mind\./i, renderPage, getCard);
