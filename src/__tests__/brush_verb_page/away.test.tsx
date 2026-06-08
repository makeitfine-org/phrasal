import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'BrushVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('BrushVerbPage — "away" section definitions', () => {
  it('renders definition for removing by sweeping', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To remove something by sweeping it with your hand or a brush\./i)).toBeInTheDocument();
  });

  it('renders definition for dismissing a feeling', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To quickly dismiss a feeling, thought, or fear\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To remove something by sweeping it with your hand or a brush\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To remove something by sweeping it with your hand or a brush\./i)).toHaveAttribute(
      'title',
      'To remove something by sweeping it with your hand or a brush.'
    );
  });
});

describeSectionToggle(LABEL, 'away', 'brushAway_section_expanded', /To remove something by sweeping it with your hand or a brush\./i, renderPage);

describeChevronAndColour(LABEL, 'away', renderPage);

describeDefaultImageCards(LABEL, 'away', 'brushAway', /To remove something by sweeping it with your hand or a brush\./i, /She brushed away the crumbs from the keyboard/i, renderPage, getCard);
