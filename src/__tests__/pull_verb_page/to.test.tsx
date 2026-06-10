import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'PullVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('PullVerbPage — "to" section definitions', () => {
  it('renders definition for closing a door without locking it', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To close something, like a door or window/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To close something, like a door or window/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To close something, like a door or window/i)).toHaveAttribute(
      'title',
      'To close something, like a door or window, but often without locking it.'
    );
  });
});

describeSectionToggle(LABEL, 'to', 'pullTo_section_expanded', /To close something, like a door or window/i, renderPage);

describeChevronAndColour(LABEL, 'to', renderPage);

describeDefaultImageCards(LABEL, 'to', 'pullTo', /To close something, like a door or window/i, /Please pull the door to when you leave/i, renderPage, getCard);
