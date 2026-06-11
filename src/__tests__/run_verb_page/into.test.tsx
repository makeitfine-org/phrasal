import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'RunVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('RunVerbPage — "into" section definitions', () => {
  it('renders definition for experiencing a problem unexpectedly', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/To experience a problem or difficulty unexpectedly/i)).toBeInTheDocument();
  });

  it('renders definition for meeting someone unexpectedly', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/To meet someone unexpectedly/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/To experience a problem or difficulty unexpectedly/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/To experience a problem or difficulty unexpectedly/i)).toHaveAttribute(
      'title',
      'To experience a problem or difficulty unexpectedly.'
    );
  });
});

describeSectionToggle(LABEL, 'into', 'runInto_section_expanded', /To experience a problem or difficulty unexpectedly/i, renderPage);

describeChevronAndColour(LABEL, 'into', renderPage);

describeDefaultImageCards(LABEL, 'into', 'runInto', /To experience a problem or difficulty unexpectedly/i, /We ran into an unexpected bug while compiling/i, renderPage, getCard);
