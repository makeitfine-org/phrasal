import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'TakeVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('TakeVerbPage — "away" section definitions', () => {
  it('renders definition for removing or subtracting', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To remove or subtract something/i)).toBeInTheDocument();
  });

  it('renders definition for confiscating', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To confiscate something without permission/i)).toBeInTheDocument();
  });

  it('renders definition for buying food to eat elsewhere', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To buy food from a restaurant to eat elsewhere/i)).toBeInTheDocument();
  });

  it('renders definition for learning a message', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To learn or receive a main lesson or message/i)).toBeInTheDocument();
  });
});

describeSectionToggle(LABEL, 'away', 'takeAway_section_expanded', /To remove or subtract something/i, renderPage);

describeChevronAndColour(LABEL, 'away', renderPage);

describeDefaultImageCards(LABEL, 'away', 'takeAway', /To remove or subtract something/i, /"If you take away the marketing costs/i, renderPage, getCard);
