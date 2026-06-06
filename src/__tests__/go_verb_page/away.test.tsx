import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'GoVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('GoVerbPage — "away" section definitions', () => {
  it('renders definition for leaving a place or person', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To leave a place or person/i)).toBeInTheDocument();
  });

  it('renders definition for disappearing or fading', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To disappear or fade/i)).toBeInTheDocument();
  });

  it('renders definition for leaving home for a holiday', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To leave home for a holiday/i)).toBeInTheDocument();
  });
});

describeSectionToggle(LABEL, 'away', 'goAway_section_expanded', /To leave a place or person/i, renderPage);

describeChevronAndColour(LABEL, 'away', renderPage);

describeDefaultImageCards(LABEL, 'away', 'goAway', /To leave a place or person/i, /"Please go away, I need to focus/i, renderPage, getCard);
