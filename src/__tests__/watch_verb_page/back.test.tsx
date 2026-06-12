import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'WatchVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('WatchVerbPage — "back" section definitions', () => {
  it('renders definition for viewing a recording for review', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To view a video, film, or recording of a previous event, often for review or analysis\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('back');
    const def = screen.getByText(/To view a video, film, or recording of a previous event, often for review or analysis\./i);
    expect(def).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To view a video, film, or recording of a previous event, often for review or analysis\./i)).toHaveAttribute(
      'title',
      'To view a video, film, or recording of a previous event, often for review or analysis.'
    );
  });
});

describeSectionToggle(LABEL, 'back', 'watchBack_section_expanded', /To view a video, film, or recording of a previous event, often for review or analysis\./i, renderPage);

describeChevronAndColour(LABEL, 'back', renderPage);

describeDefaultImageCards(LABEL, 'back', 'watchBack', /To view a video, film, or recording of a previous event, often for review or analysis\./i, /We recorded the interview so we could watch it back later and take notes\./i, renderPage, getCard);
