import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'WearVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('WearVerbPage — "through" section definitions', () => {
  it('renders definition for creating a hole through continuous friction', () => {
    renderPage();
    expandSection('through');
    expect(screen.getByText(/To create a hole in something as a result of continuous use, friction, or rubbing\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('through');
    const def = screen.getByText(/To create a hole in something as a result of continuous use, friction, or rubbing\./i);
    expect(def).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('through');
    expect(screen.getByText(/To create a hole in something as a result of continuous use, friction, or rubbing\./i)).toHaveAttribute(
      'title',
      'To create a hole in something as a result of continuous use, friction, or rubbing.'
    );
  });
});

describeSectionToggle(LABEL, 'through', 'wearThrough_section_expanded', /To create a hole in something as a result of continuous use, friction, or rubbing\./i, renderPage);

describeChevronAndColour(LABEL, 'through', renderPage);

describeDefaultImageCards(LABEL, 'through', 'wearThrough', /To create a hole in something as a result of continuous use, friction, or rubbing\./i, /She leaned on her desk so much that she completely wore through the elbows of her favourite sweater\./i, renderPage, getCard);
