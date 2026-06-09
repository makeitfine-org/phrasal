import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'FindVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('FindVerbPage — "against" section definitions', () => {
  it('renders definition for making an official decision that someone is guilty', () => {
    renderPage();
    expandSection('against');
    expect(screen.getByText(/To make an official decision that someone is guilty or loses a dispute/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('against');
    expect(screen.getByText(/To make an official decision that someone is guilty or loses a dispute/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('against');
    expect(screen.getByText(/To make an official decision that someone is guilty or loses a dispute/i)).toHaveAttribute(
      'title',
      'To make an official decision that someone is guilty or loses a dispute (formal, used in legal or official settings).'
    );
  });
});

describeSectionToggle(LABEL, 'against', 'findAgainst_section_expanded', /To make an official decision that someone is guilty or loses a dispute/i, renderPage);

describeChevronAndColour(LABEL, 'against', renderPage);

describeDefaultImageCards(LABEL, 'against', 'findAgainst', /To make an official decision that someone is guilty or loses a dispute/i, /The court found against the leadership team because they did not follow labor laws\./i, renderPage, getCard);
