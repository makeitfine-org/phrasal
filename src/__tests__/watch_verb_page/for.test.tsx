import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'WatchVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('WatchVerbPage — "for" section definitions', () => {
  it('renders definition for looking actively for something to happen', () => {
    renderPage();
    expandSection('for');
    expect(screen.getByText(/To look actively for a sign, event, or specific thing to happen\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('for');
    const def = screen.getByText(/To look actively for a sign, event, or specific thing to happen\./i);
    expect(def).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('for');
    expect(screen.getByText(/To look actively for a sign, event, or specific thing to happen\./i)).toHaveAttribute(
      'title',
      'To look actively for a sign, event, or specific thing to happen.'
    );
  });
});

describeSectionToggle(LABEL, 'for', 'watchFor_section_expanded', /To look actively for a sign, event, or specific thing to happen\./i, renderPage);

describeChevronAndColour(LABEL, 'for', renderPage);

describeDefaultImageCards(LABEL, 'for', 'watchFor', /To look actively for a sign, event, or specific thing to happen\./i, /Keep driving, and watch for the exit sign just past the bridge\./i, renderPage, getCard);
