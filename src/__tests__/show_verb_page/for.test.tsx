import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'ShowVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('ShowVerbPage — "for" section definitions', () => {
  it('renders definition for having a result to show for effort', () => {
    renderPage();
    expandSection('for');
    expect(screen.getByText(/Used in the phrase "have something to show for/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('for');
    expect(screen.getByText(/Used in the phrase "have something to show for/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('for');
    expect(screen.getByText(/Used in the phrase "have something to show for/i)).toHaveAttribute(
      'title',
      'Used in the phrase "have something to show for [an effort]," meaning to have a result or evidence of your hard work.'
    );
  });
});

describeSectionToggle(LABEL, 'for', 'showFor_section_expanded', /Used in the phrase "have something to show for/i, renderPage);

describeChevronAndColour(LABEL, 'for', renderPage);

describeDefaultImageCards(LABEL, 'for', 'showFor', /Used in the phrase "have something to show for/i, /I worked all weekend on the project, but because of a server crash, I have nothing to show for it\./i, renderPage, getCard);
