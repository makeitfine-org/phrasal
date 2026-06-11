import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'TalkVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('TalkVerbPage — "away" section definitions', () => {
  it('renders definition for continuing talking for a long time', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To continue talking for a long time, often in a relaxed manner\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To continue talking for a long time, often in a relaxed manner\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To continue talking for a long time, often in a relaxed manner\./i)).toHaveAttribute(
      'title',
      'To continue talking for a long time, often in a relaxed manner.'
    );
  });
});

describeSectionToggle(LABEL, 'away', 'talkAway_section_expanded', /To continue talking for a long time, often in a relaxed manner\./i, renderPage);

describeChevronAndColour(LABEL, 'away', renderPage);

describeDefaultImageCards(LABEL, 'away', 'talkAway', /To continue talking for a long time, often in a relaxed manner\./i, /We sat in the cafe, talking away for hours\./i, renderPage, getCard);
