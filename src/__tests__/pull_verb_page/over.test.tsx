import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'PullVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('PullVerbPage — "over" section definitions', () => {
  it('renders definition for stopping a vehicle by the road', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To stop a vehicle by the side of the road/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To stop a vehicle by the side of the road/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To stop a vehicle by the side of the road/i)).toHaveAttribute(
      'title',
      'To stop a vehicle by the side of the road.'
    );
  });
});

describeSectionToggle(LABEL, 'over', 'pullOver_section_expanded', /To stop a vehicle by the side of the road/i, renderPage);

describeChevronAndColour(LABEL, 'over', renderPage);

describeDefaultImageCards(LABEL, 'over', 'pullOver', /To stop a vehicle by the side of the road/i, /The police officer signaled for the driver to pull over/i, renderPage, getCard);
