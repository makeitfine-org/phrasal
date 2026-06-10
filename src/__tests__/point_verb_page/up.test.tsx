import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'PointVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('PointVerbPage — "up" section definitions', () => {
  it('renders definition for emphasizing something or making a problem easier to notice', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To emphasize something or make a problem easier to notice/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To emphasize something or make a problem easier to notice/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To emphasize something or make a problem easier to notice/i)).toHaveAttribute(
      'title',
      'To emphasize something or make a problem easier to notice (similar to "highlight").'
    );
  });
});

describeSectionToggle(LABEL, 'up', 'pointUp_section_expanded', /To emphasize something or make a problem easier to notice/i, renderPage);

describeChevronAndColour(LABEL, 'up', renderPage);

describeDefaultImageCards(LABEL, 'up', 'pointUp', /To emphasize something or make a problem easier to notice/i, /The recent system crash points up/i, renderPage, getCard);
