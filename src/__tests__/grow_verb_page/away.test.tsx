import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'GrowVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('GrowVerbPage — "away" section definitions', () => {
  it('renders definition for gradually becoming less connected', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To gradually become less connected to someone or something/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To gradually become less connected to someone or something/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To gradually become less connected to someone or something/i)).toHaveAttribute(
      'title',
      'To gradually become less connected to someone or something, or to stop supporting a past habit or idea.'
    );
  });
});

describeSectionToggle(LABEL, 'away', 'growAway_section_expanded', /To gradually become less connected to someone or something/i, renderPage);

describeChevronAndColour(LABEL, 'away', renderPage);

describeDefaultImageCards(LABEL, 'away', 'growAway', /To gradually become less connected to someone or something/i, /As the startup expanded, we naturally grew away from our original/i, renderPage, getCard);
