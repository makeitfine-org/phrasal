import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'WatchVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('WatchVerbPage — "on" section definitions', () => {
  it('renders definition for observing without becoming involved', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To observe something happening, often dramatic or serious, without becoming actively involved\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('on');
    const def = screen.getByText(/To observe something happening, often dramatic or serious, without becoming actively involved\./i);
    expect(def).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To observe something happening, often dramatic or serious, without becoming actively involved\./i)).toHaveAttribute(
      'title',
      'To observe something happening, often dramatic or serious, without becoming actively involved.'
    );
  });
});

describeSectionToggle(LABEL, 'on', 'watchOn_section_expanded', /To observe something happening, often dramatic or serious, without becoming actively involved\./i, renderPage);

describeChevronAndColour(LABEL, 'on', renderPage);

describeDefaultImageCards(LABEL, 'on', 'watchOn', /To observe something happening, often dramatic or serious, without becoming actively involved\./i, /A large crowd gathered and watched on in shock as the building burned\./i, renderPage, getCard);
