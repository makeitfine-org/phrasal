import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'CheckVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('CheckVerbPage — "into" section definitions', () => {
  it('renders definition for arriving and registering at a hotel', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/To arrive and register at a hotel, clinic, or hospital\./i)).toBeInTheDocument();
  });

  it('renders definition for investigating a problem', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/To investigate or look for more information about a problem\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/To arrive and register at a hotel, clinic, or hospital\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/To arrive and register at a hotel, clinic, or hospital\./i)).toHaveAttribute(
      'title',
      'To arrive and register at a hotel, clinic, or hospital.'
    );
  });
});

describeSectionToggle(LABEL, 'into', 'checkInto_section_expanded', /To arrive and register at a hotel, clinic, or hospital\./i, renderPage);

describeChevronAndColour(LABEL, 'into', renderPage);

describeDefaultImageCards(LABEL, 'into', 'checkInto', /To arrive and register at a hotel, clinic, or hospital\./i, /We checked into the Hilton at 3:00 PM\./i, renderPage, getCard);
