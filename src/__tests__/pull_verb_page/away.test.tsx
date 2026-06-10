import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'PullVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('PullVerbPage — "away" section definitions', () => {
  it('renders definition for starting to move', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To start moving \(usually a vehicle\)/i)).toBeInTheDocument();
  });

  it('renders definition for moving body back', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To move your body back from someone/i)).toBeInTheDocument();
  });

  it('renders definition for increasing lead in competition', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To increase your lead in a competition/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To start moving \(usually a vehicle\)/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To start moving \(usually a vehicle\)/i)).toHaveAttribute(
      'title',
      'To start moving (usually a vehicle).'
    );
  });
});

describeSectionToggle(LABEL, 'away', 'pullAway_section_expanded', /To start moving \(usually a vehicle\)/i, renderPage);

describeChevronAndColour(LABEL, 'away', renderPage);

describeDefaultImageCards(LABEL, 'away', 'pullAway', /To start moving \(usually a vehicle\)/i, /The train pulled away from the station/i, renderPage, getCard);
