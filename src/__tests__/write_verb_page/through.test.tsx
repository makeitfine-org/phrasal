import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'WriteVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('WriteVerbPage — "through" section definitions', () => {
  it('renders definition for revising a piece of writing', () => {
    renderPage();
    expandSection('through');
    expect(screen.getByText(/To revise a piece of writing completely from beginning to end \(journalism\/editing\)\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('through');
    const def = screen.getByText(/To revise a piece of writing completely from beginning to end \(journalism\/editing\)\./i);
    expect(def).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('through');
    expect(screen.getByText(/To revise a piece of writing completely from beginning to end \(journalism\/editing\)\./i)).toHaveAttribute(
      'title',
      'To revise a piece of writing completely from beginning to end (journalism/editing).'
    );
  });
});

describeSectionToggle(LABEL, 'through', 'writeThrough_section_expanded', /To revise a piece of writing completely from beginning to end \(journalism\/editing\)\./i, renderPage);

describeChevronAndColour(LABEL, 'through', renderPage);

describeDefaultImageCards(LABEL, 'through', 'writeThrough', /To revise a piece of writing completely from beginning to end \(journalism\/editing\)\./i, /The editor told the reporter to write through the draft to make the narrative flow better\./i, renderPage, getCard);
