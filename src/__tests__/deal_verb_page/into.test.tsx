import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'DealVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('DealVerbPage — "into" section definitions', () => {
  it('renders definition for including someone in a group or game', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/To physically or metaphorically include someone in a group or game/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/To physically or metaphorically include someone in a group or game/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/To physically or metaphorically include someone in a group or game/i)).toHaveAttribute(
      'title',
      'To physically or metaphorically include someone in a group or game (very similar to "deal in").'
    );
  });
});

describeSectionToggle(LABEL, 'into', 'dealInto_section_expanded', /To physically or metaphorically include someone in a group or game/i, renderPage);

describeChevronAndColour(LABEL, 'into', renderPage);

describeDefaultImageCards(LABEL, 'into', 'dealInto', /To physically or metaphorically include someone in a group or game/i, /we will deal you into the game/i, renderPage, getCard);
