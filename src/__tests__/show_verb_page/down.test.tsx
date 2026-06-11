import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'ShowVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('ShowVerbPage — "down" section definitions', () => {
  it('renders definition for laying cards face-up in a card game', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/In card games, to lay your cards face-up on the table to reveal your hand\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/In card games, to lay your cards face-up on the table to reveal your hand\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/In card games, to lay your cards face-up on the table to reveal your hand\./i)).toHaveAttribute(
      'title',
      'In card games, to lay your cards face-up on the table to reveal your hand.'
    );
  });
});

describeSectionToggle(LABEL, 'down', 'showDown_section_expanded', /In card games, to lay your cards face-up on the table to reveal your hand\./i, renderPage);

describeChevronAndColour(LABEL, 'down', renderPage);

describeDefaultImageCards(LABEL, 'down', 'showDown', /In card games, to lay your cards face-up on the table to reveal your hand\./i, /After the final bet, it was time to show down their cards\./i, renderPage, getCard);
