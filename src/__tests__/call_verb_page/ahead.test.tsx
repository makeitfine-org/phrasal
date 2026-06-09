import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'CallVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('CallVerbPage — "ahead" section definitions', () => {
  it('renders definition for calling ahead', () => {
    renderPage();
    expandSection('ahead');
    expect(screen.getByText(/To telephone a place before you arrive there/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('ahead');
    expect(screen.getByText(/To telephone a place before you arrive there/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('ahead');
    expect(screen.getByText(/To telephone a place before you arrive there/i)).toHaveAttribute(
      'title',
      'To telephone a place before you arrive there (often to make a reservation or check something).'
    );
  });
});

describeSectionToggle(LABEL, 'ahead', 'callAhead_section_expanded', /To telephone a place before you arrive there/i, renderPage);

describeChevronAndColour(LABEL, 'ahead', renderPage);

describeDefaultImageCards(LABEL, 'ahead', 'callAhead', /To telephone a place before you arrive there/i, /call ahead to ensure the conference room/i, renderPage, getCard);
