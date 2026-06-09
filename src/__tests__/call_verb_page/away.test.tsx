import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'CallVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('CallVerbPage — "away" section definitions', () => {
  it('renders definition for calling someone away', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To ask someone to leave the place where they are to go somewhere else/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To ask someone to leave the place where they are to go somewhere else/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To ask someone to leave the place where they are to go somewhere else/i)).toHaveAttribute(
      'title',
      'To ask someone to leave the place where they are to go somewhere else, usually for an emergency.'
    );
  });
});

describeSectionToggle(LABEL, 'away', 'callAway_section_expanded', /To ask someone to leave the place where they are to go somewhere else/i, renderPage);

describeChevronAndColour(LABEL, 'away', renderPage);

describeDefaultImageCards(LABEL, 'away', 'callAway', /To ask someone to leave the place where they are to go somewhere else/i, /director was called away to an urgent meeting/i, renderPage, getCard);
