import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'PullVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('PullVerbPage — "ahead" section definitions', () => {
  it('renders definition for taking the lead in a race', () => {
    renderPage();
    expandSection('ahead');
    expect(screen.getByText(/To take the lead in a race or competition/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('ahead');
    expect(screen.getByText(/To take the lead in a race or competition/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('ahead');
    expect(screen.getByText(/To take the lead in a race or competition/i)).toHaveAttribute(
      'title',
      'To take the lead in a race or competition.'
    );
  });
});

describeSectionToggle(LABEL, 'ahead', 'pullAhead_section_expanded', /To take the lead in a race or competition/i, renderPage);

describeChevronAndColour(LABEL, 'ahead', renderPage);

describeDefaultImageCards(LABEL, 'ahead', 'pullAhead', /To take the lead in a race or competition/i, /our software company finally pulled ahead/i, renderPage, getCard);
