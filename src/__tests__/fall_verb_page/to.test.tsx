import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'FallVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('FallVerbPage — "to" section definitions', () => {
  it("renders definition for becoming someone's duty or responsibility", () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To become someone's duty or responsibility \(similar to fall on\)\./i)).toBeInTheDocument();
  });

  it('renders definition for starting something energetically', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To start doing something energetically, especially eating or working\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To become someone's duty or responsibility \(similar to fall on\)\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To become someone's duty or responsibility \(similar to fall on\)\./i)).toHaveAttribute(
      'title',
      "To become someone's duty or responsibility (similar to fall on)."
    );
  });
});

describeSectionToggle(LABEL, 'to', 'fallTo_section_expanded', /To become someone's duty or responsibility \(similar to fall on\)\./i, renderPage);

describeChevronAndColour(LABEL, 'to', renderPage);

describeDefaultImageCards(LABEL, 'to', 'fallTo', /To become someone's duty or responsibility \(similar to fall on\)\./i, /It falls to the senior developer to train the new team members\./i, renderPage, getCard);
