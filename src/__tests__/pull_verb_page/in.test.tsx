import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'PullVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('PullVerbPage — "in" section definitions', () => {
  it('renders definition for arriving (trains)', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To arrive \(usually for trains\)/i)).toBeInTheDocument();
  });

  it('renders definition for moving to the side of the road', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To move a vehicle to the side of the road/i)).toBeInTheDocument();
  });

  it('renders definition for attracting people or money', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To attract people or money/i)).toBeInTheDocument();
  });

  it('renders definition for arresting someone', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To arrest someone/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To arrive \(usually for trains\)/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To arrive \(usually for trains\)/i)).toHaveAttribute(
      'title',
      'To arrive (usually for trains).'
    );
  });
});

describeSectionToggle(LABEL, 'in', 'pullIn_section_expanded', /To arrive \(usually for trains\)/i, renderPage);

describeChevronAndColour(LABEL, 'in', renderPage);

describeDefaultImageCards(LABEL, 'in', 'pullIn', /To arrive \(usually for trains\)/i, /The train from Warsaw is pulling in/i, renderPage, getCard);
