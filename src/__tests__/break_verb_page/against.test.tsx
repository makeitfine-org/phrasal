import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'BreakVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('BreakVerbPage — "against" section definitions', () => {
  it('renders definition for crashing into something', () => {
    renderPage();
    expandSection('against');
    expect(screen.getByText(/To crash forcefully into something/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('against');
    expect(screen.getByText(/To crash forcefully into something/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('against');
    expect(screen.getByText(/To crash forcefully into something/i)).toHaveAttribute(
      'title',
      'To crash forcefully into something.'
    );
  });
});

describeSectionToggle(LABEL, 'against', 'breakAgainst_section_expanded', /To crash forcefully into something/i, renderPage);

describeChevronAndColour(LABEL, 'against', renderPage);

describeDefaultImageCards(LABEL, 'against', 'breakAgainst', /To crash forcefully into something/i, /We sat and watched the waves break against/i, renderPage, getCard);
