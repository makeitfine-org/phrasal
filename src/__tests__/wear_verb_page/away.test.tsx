import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'WearVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('WearVerbPage — "away" section definitions', () => {
  it('renders definition for eroding or wearing smooth through friction', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To erode or cause something to gradually disappear, thin, or become smooth through continuous friction, use, or weather\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('away');
    const def = screen.getByText(/To erode or cause something to gradually disappear, thin, or become smooth through continuous friction, use, or weather\./i);
    expect(def).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To erode or cause something to gradually disappear, thin, or become smooth through continuous friction, use, or weather\./i)).toHaveAttribute(
      'title',
      'To erode or cause something to gradually disappear, thin, or become smooth through continuous friction, use, or weather.'
    );
  });
});

describeSectionToggle(LABEL, 'away', 'wearAway_section_expanded', /To erode or cause something to gradually disappear, thin, or become smooth through continuous friction, use, or weather\./i, renderPage);

describeChevronAndColour(LABEL, 'away', renderPage);

describeDefaultImageCards(LABEL, 'away', 'wearAway', /To erode or cause something to gradually disappear, thin, or become smooth through continuous friction, use, or weather\./i, /Years of salty sea breezes have worn away the bright paint on the older coastal buildings\./i, renderPage, getCard);
