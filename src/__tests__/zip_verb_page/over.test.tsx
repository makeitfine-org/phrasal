import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'ZipVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('ZipVerbPage — "over" section definitions', () => {
  it('renders definition for travelling quickly to a nearby location', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To travel quickly to a nearby location, often someone's home or office\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('over');
    const def = screen.getByText(/To travel quickly to a nearby location, often someone's home or office\./i);
    expect(def).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To travel quickly to a nearby location, often someone's home or office\./i)).toHaveAttribute(
      'title',
      "To travel quickly to a nearby location, often someone's home or office."
    );
  });
});

describeSectionToggle(LABEL, 'over', 'zipOver_section_expanded', /To travel quickly to a nearby location, often someone's home or office\./i, renderPage);

describeChevronAndColour(LABEL, 'over', renderPage);

describeDefaultImageCards(LABEL, 'over', 'zipOver', /To travel quickly to a nearby location, often someone's home or office\./i, /I'll zip over to your place after work to drop off the tools you lent me\./i, renderPage, getCard);
