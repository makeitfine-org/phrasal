import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'RunVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('RunVerbPage — "ahead" section definitions', () => {
  it('renders definition for progressing faster than scheduled', () => {
    renderPage();
    expandSection('ahead');
    expect(screen.getByText(/To progress faster than scheduled/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('ahead');
    expect(screen.getByText(/To progress faster than scheduled/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('ahead');
    expect(screen.getByText(/To progress faster than scheduled/i)).toHaveAttribute(
      'title',
      'To progress faster than scheduled.'
    );
  });
});

describeSectionToggle(LABEL, 'ahead', 'runAhead_section_expanded', /To progress faster than scheduled/i, renderPage);

describeChevronAndColour(LABEL, 'ahead', renderPage);

describeDefaultImageCards(LABEL, 'ahead', 'runAhead', /To progress faster than scheduled/i, /The development team is running ahead of schedule/i, renderPage, getCard);
