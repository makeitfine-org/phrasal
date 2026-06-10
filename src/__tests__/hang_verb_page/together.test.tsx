import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'HangVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('HangVerbPage — "together" section definitions', () => {
  it('renders definition for supporting each other and staying united as a group', () => {
    renderPage();
    expandSection('together');
    expect(screen.getByText(/To support each other and stay united as a group/i)).toBeInTheDocument();
  });

  it('renders definition for being logical, consistent, or believable', () => {
    renderPage();
    expandSection('together');
    expect(screen.getByText(/To be logical, consistent, or believable/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('together');
    expect(screen.getByText(/To support each other and stay united as a group/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('together');
    expect(screen.getByText(/To support each other and stay united as a group/i)).toHaveAttribute(
      'title',
      'To support each other and stay united as a group, especially in difficult times.'
    );
  });
});

describeSectionToggle(LABEL, 'together', 'hangTogether_section_expanded', /To support each other and stay united as a group/i, renderPage);

describeChevronAndColour(LABEL, 'together', renderPage);

describeDefaultImageCards(LABEL, 'together', 'hangTogether', /To support each other and stay united as a group/i, /If the startup wants to survive this crisis, the leadership team must hang together\./i, renderPage, getCard);
