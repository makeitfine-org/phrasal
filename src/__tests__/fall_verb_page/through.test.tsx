import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'FallVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('FallVerbPage — "through" section definitions', () => {
  it('renders definition for failing to be completed', () => {
    renderPage();
    expandSection('through');
    expect(screen.getByText(/To fail to happen or be completed \(usually plans, deals, or projects\)\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('through');
    expect(screen.getByText(/To fail to happen or be completed \(usually plans, deals, or projects\)\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('through');
    expect(screen.getByText(/To fail to happen or be completed \(usually plans, deals, or projects\)\./i)).toHaveAttribute(
      'title',
      'To fail to happen or be completed (usually plans, deals, or projects).'
    );
  });
});

describeSectionToggle(LABEL, 'through', 'fallThrough_section_expanded', /To fail to happen or be completed \(usually plans, deals, or projects\)\./i, renderPage);

describeChevronAndColour(LABEL, 'through', renderPage);

describeDefaultImageCards(LABEL, 'through', 'fallThrough', /To fail to happen or be completed \(usually plans, deals, or projects\)\./i, /The merger fell through at the last minute due to legal issues\./i, renderPage, getCard);
