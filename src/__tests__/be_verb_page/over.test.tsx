import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'BeVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('BeVerbPage — "over" section definitions', () => {
  it('renders definition for being finished', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To be finished\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To be finished\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To be finished\./i)).toHaveAttribute('title', 'To be finished.');
  });
});

describeSectionToggle(LABEL, 'over', 'beOver_section_expanded', /To be finished\./i, renderPage);

describeChevronAndColour(LABEL, 'over', renderPage);

describeDefaultImageCards(LABEL, 'over', 'beOver', /To be finished\./i, /The sprint planning meeting is over/i, renderPage, getCard);
