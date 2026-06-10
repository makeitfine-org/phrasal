import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'PullVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('PullVerbPage — "out" section definitions', () => {
  it('renders definition for moving into traffic', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To move into traffic \(for vehicles\)/i)).toBeInTheDocument();
  });

  it('renders definition for leaving a station', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To leave a station \(for trains\)/i)).toBeInTheDocument();
  });

  it('renders definition for withdrawing from an agreement', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To withdraw from an agreement, deal, or situation/i)).toBeInTheDocument();
  });

  it('renders definition for extracting something', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To extract or remove something/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To move into traffic \(for vehicles\)/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To move into traffic \(for vehicles\)/i)).toHaveAttribute(
      'title',
      'To move into traffic (for vehicles).'
    );
  });
});

describeSectionToggle(LABEL, 'out', 'pullOut_section_expanded', /To move into traffic \(for vehicles\)/i, renderPage);

describeChevronAndColour(LABEL, 'out', renderPage);

describeDefaultImageCards(LABEL, 'out', 'pullOut', /To move into traffic \(for vehicles\)/i, /A truck pulled out right in front of me/i, renderPage, getCard);
