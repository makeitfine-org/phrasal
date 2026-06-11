import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'TryVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('TryVerbPage — "for" section definitions', () => {
  it('renders definition for making a concerted effort to achieve something', () => {
    renderPage();
    expandSection('for');
    expect(screen.getByText(/To make a concerted effort to achieve/i)).toBeInTheDocument();
  });

  it('all 1 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('for');
    const defs = [
      screen.getByText(/To make a concerted effort to achieve/i),
    ];
    defs.forEach(el => expect(el).toHaveClass('truncate'));
  });

  it('first definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('for');
    expect(screen.getByText(/To make a concerted effort to achieve/i)).toHaveAttribute(
      'title',
      'To make a concerted effort to achieve, win, or obtain something, often when success is not guaranteed.'
    );
  });
});

describeSectionToggle(LABEL, 'for', 'tryFor_section_expanded', /To make a concerted effort to achieve/i, renderPage);

describeChevronAndColour(LABEL, 'for', renderPage);

describeDefaultImageCards(LABEL, 'for', 'tryFor', /To make a concerted effort to achieve/i, /Sam decided to try for the Senior Recruitment Coordinator position\./i, renderPage, getCard);
