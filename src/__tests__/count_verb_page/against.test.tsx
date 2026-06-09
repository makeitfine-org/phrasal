import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'CountVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('CountVerbPage — "against" section definitions', () => {
  it('renders definition for being considered a disadvantage', () => {
    renderPage();
    expandSection('against');
    expect(screen.getByText(/To be considered a disadvantage or a negative point for someone\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('against');
    expect(screen.getByText(/To be considered a disadvantage or a negative point for someone\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('against');
    expect(screen.getByText(/To be considered a disadvantage or a negative point for someone\./i)).toHaveAttribute(
      'title',
      'To be considered a disadvantage or a negative point for someone.'
    );
  });
});

describeSectionToggle(LABEL, 'against', 'countAgainst_section_expanded', /To be considered a disadvantage or a negative point for someone\./i, renderPage);

describeChevronAndColour(LABEL, 'against', renderPage);

describeDefaultImageCards(LABEL, 'against', 'countAgainst', /To be considered a disadvantage or a negative point for someone\./i, /His lack of management experience might count against him/i, renderPage, getCard);
