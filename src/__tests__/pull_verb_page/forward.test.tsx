import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'PullVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('PullVerbPage — "forward" section definitions', () => {
  it('renders definition for moving a vehicle slightly forward', () => {
    renderPage();
    expandSection('forward');
    expect(screen.getByText(/To move a vehicle slightly forward/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('forward');
    expect(screen.getByText(/To move a vehicle slightly forward/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('forward');
    expect(screen.getByText(/To move a vehicle slightly forward/i)).toHaveAttribute(
      'title',
      'To move a vehicle slightly forward.'
    );
  });
});

describeSectionToggle(LABEL, 'forward', 'pullForward_section_expanded', /To move a vehicle slightly forward/i, renderPage);

describeChevronAndColour(LABEL, 'forward', renderPage);

describeDefaultImageCards(LABEL, 'forward', 'pullForward', /To move a vehicle slightly forward/i, /Can you pull forward a little bit/i, renderPage, getCard);
