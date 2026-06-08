import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'AskVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('AskVerbPage — "away" section definitions', () => {
  it('renders definition for telling someone to start asking questions', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/An expression used to tell someone that they can start asking/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/An expression used to tell someone that they can start asking/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/An expression used to tell someone that they can start asking/i)).toHaveAttribute(
      'title',
      'An expression used to tell someone that they can start asking their questions.'
    );
  });
});

describeSectionToggle(LABEL, 'away', 'askAway_section_expanded', /An expression used to tell someone that they can start asking/i, renderPage);

describeChevronAndColour(LABEL, 'away', renderPage);

describeDefaultImageCards(LABEL, 'away', 'askAway', /An expression used to tell someone that they can start asking/i, /If anyone has questions about the new software update/i, renderPage, getCard);
