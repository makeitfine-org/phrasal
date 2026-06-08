import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'BeVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('BeVerbPage — "after" section definitions', () => {
  it('renders definition for wanting or seeking something', () => {
    renderPage();
    expandSection('after');
    expect(screen.getByText(/To want, try to get, or look for something\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('after');
    expect(screen.getByText(/To want, try to get, or look for something\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('after');
    expect(screen.getByText(/To want, try to get, or look for something\./i)).toHaveAttribute(
      'title',
      'To want, try to get, or look for something.'
    );
  });
});

describeSectionToggle(LABEL, 'after', 'beAfter_section_expanded', /To want, try to get, or look for something\./i, renderPage);

describeChevronAndColour(LABEL, 'after', renderPage);

describeDefaultImageCards(LABEL, 'after', 'beAfter', /To want, try to get, or look for something\./i, /What exactly are you after in this contract negotiation/i, renderPage, getCard);
