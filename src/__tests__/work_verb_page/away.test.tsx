import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'WorkVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('WorkVerbPage — "away" section definitions', () => {
  it('renders definition for continuing to work hard for a sustained period', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To continue working hard and diligently for a sustained period\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('away');
    const def = screen.getByText(/To continue working hard and diligently for a sustained period\./i);
    expect(def).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To continue working hard and diligently for a sustained period\./i)).toHaveAttribute(
      'title',
      'To continue working hard and diligently for a sustained period.'
    );
  });
});

describeSectionToggle(LABEL, 'away', 'workAway_section_expanded', /To continue working hard and diligently for a sustained period\./i, renderPage);

describeChevronAndColour(LABEL, 'away', renderPage);

describeDefaultImageCards(LABEL, 'away', 'workAway', /To continue working hard and diligently for a sustained period\./i, /She was happily working away at her desk all afternoon\./i, renderPage, getCard);
