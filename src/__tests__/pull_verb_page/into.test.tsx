import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'PullVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('PullVerbPage — "into" section definitions', () => {
  it('renders definition for arriving at a destination', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/To arrive at a destination \(for vehicles\)/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/To arrive at a destination \(for vehicles\)/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/To arrive at a destination \(for vehicles\)/i)).toHaveAttribute(
      'title',
      'To arrive at a destination (for vehicles).'
    );
  });
});

describeSectionToggle(LABEL, 'into', 'pullInto_section_expanded', /To arrive at a destination \(for vehicles\)/i, renderPage);

describeChevronAndColour(LABEL, 'into', renderPage);

describeDefaultImageCards(LABEL, 'into', 'pullInto', /To arrive at a destination \(for vehicles\)/i, /The bus pulled into the station/i, renderPage, getCard);
