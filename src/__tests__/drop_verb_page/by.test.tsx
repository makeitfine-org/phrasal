import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'DropVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('DropVerbPage — "by" section definitions', () => {
  it('renders definition for making a short informal visit', () => {
    renderPage();
    expandSection('by');
    expect(screen.getByText(/To make a short, informal visit \(similar to "drop in"\)\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('by');
    expect(screen.getByText(/To make a short, informal visit \(similar to "drop in"\)\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('by');
    expect(screen.getByText(/To make a short, informal visit \(similar to "drop in"\)\./i)).toHaveAttribute(
      'title',
      'To make a short, informal visit (similar to "drop in").'
    );
  });
});

describeSectionToggle(LABEL, 'by', 'dropBy_section_expanded', /To make a short, informal visit \(similar to "drop in"\)\./i, renderPage);

describeChevronAndColour(LABEL, 'by', renderPage);

describeDefaultImageCards(LABEL, 'by', 'dropBy', /To make a short, informal visit \(similar to "drop in"\)\./i, /Please drop by my desk later/i, renderPage, getCard);
