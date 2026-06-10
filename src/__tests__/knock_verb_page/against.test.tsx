import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'KnockVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('KnockVerbPage — "against" section definitions', () => {
  it('renders definition for accidentally hitting something', () => {
    renderPage();
    expandSection('against');
    expect(screen.getByText(/To accidentally hit something while moving\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('against');
    expect(screen.getByText(/To accidentally hit something while moving\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('against');
    expect(screen.getByText(/To accidentally hit something while moving\./i)).toHaveAttribute(
      'title',
      'To accidentally hit something while moving.'
    );
  });
});

describeSectionToggle(LABEL, 'against', 'knockAgainst_section_expanded', /To accidentally hit something while moving\./i, renderPage);

describeChevronAndColour(LABEL, 'against', renderPage);

describeDefaultImageCards(LABEL, 'against', 'knockAgainst', /To accidentally hit something while moving\./i, /I knocked against the server rack and unplugged a cable\./i, renderPage, getCard);
