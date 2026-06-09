import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'CheckVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('CheckVerbPage — "against" section definitions', () => {
  it('renders definition for comparing one thing with another', () => {
    renderPage();
    expandSection('against');
    expect(screen.getByText(/To compare one thing with another to see if they match or to find differences\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('against');
    expect(screen.getByText(/To compare one thing with another to see if they match or to find differences\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('against');
    expect(screen.getByText(/To compare one thing with another to see if they match or to find differences\./i)).toHaveAttribute(
      'title',
      'To compare one thing with another to see if they match or to find differences.'
    );
  });
});

describeSectionToggle(LABEL, 'against', 'checkAgainst_section_expanded', /To compare one thing with another to see if they match or to find differences\./i, renderPage);

describeChevronAndColour(LABEL, 'against', renderPage);

describeDefaultImageCards(LABEL, 'against', 'checkAgainst', /To compare one thing with another to see if they match or to find differences\./i, /The finance team must check the monthly expenses against the budget\./i, renderPage, getCard);
