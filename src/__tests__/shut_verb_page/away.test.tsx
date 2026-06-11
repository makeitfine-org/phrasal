import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'ShutVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('ShutVerbPage — "away" section definitions', () => {
  it('renders definition for isolating someone in a place', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To isolate someone or something in a place where they cannot be seen or disturbed\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To isolate someone or something in a place where they cannot be seen or disturbed\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To isolate someone or something in a place where they cannot be seen or disturbed\./i)).toHaveAttribute(
      'title',
      'To isolate someone or something in a place where they cannot be seen or disturbed.'
    );
  });
});

describeSectionToggle(LABEL, 'away', 'shutAway_section_expanded', /To isolate someone or something in a place where they cannot be seen or disturbed\./i, renderPage);

describeChevronAndColour(LABEL, 'away', renderPage);

describeDefaultImageCards(LABEL, 'away', 'shutAway', /To isolate someone or something in a place where they cannot be seen or disturbed\./i, /Before the exams, she shut herself away in the library for a week\./i, renderPage, getCard);
