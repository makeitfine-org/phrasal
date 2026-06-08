import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'BeVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('BeVerbPage — "to" section definitions', () => {
  it('renders definition for being required to do something', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To be required or scheduled to do something \(formal\)\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To be required or scheduled to do something \(formal\)\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To be required or scheduled to do something \(formal\)\./i)).toHaveAttribute(
      'title',
      'To be required or scheduled to do something (formal).'
    );
  });
});

describeSectionToggle(LABEL, 'to', 'beTo_section_expanded', /To be required or scheduled to do something \(formal\)\./i, renderPage);

describeChevronAndColour(LABEL, 'to', renderPage);

describeDefaultImageCards(LABEL, 'to', 'beTo', /To be required or scheduled to do something \(formal\)\./i, /You are to report directly to the IT director/i, renderPage, getCard);
