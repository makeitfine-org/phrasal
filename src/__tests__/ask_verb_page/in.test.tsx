import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'AskVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('AskVerbPage — "in" section definitions', () => {
  it('renders definition for inviting someone inside', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To invite someone to come inside a building, house, or room/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To invite someone to come inside a building, house, or room/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To invite someone to come inside a building, house, or room/i)).toHaveAttribute(
      'title',
      'To invite someone to come inside a building, house, or room.'
    );
  });
});

describeSectionToggle(LABEL, 'in', 'askIn_section_expanded', /To invite someone to come inside a building, house, or room/i, renderPage);

describeChevronAndColour(LABEL, 'in', renderPage);

describeDefaultImageCards(LABEL, 'in', 'askIn', /To invite someone to come inside a building, house, or room/i, /It was raining heavily outside, so I asked her in/i, renderPage, getCard);
