import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'CallVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('CallVerbPage — "by" section definitions', () => {
  it('renders definition for making a short visit', () => {
    renderPage();
    expandSection('by');
    expect(screen.getByText(/To make a short, informal visit to a place while going somewhere else\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('by');
    expect(screen.getByText(/To make a short, informal visit to a place while going somewhere else\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('by');
    expect(screen.getByText(/To make a short, informal visit to a place while going somewhere else\./i)).toHaveAttribute(
      'title',
      'To make a short, informal visit to a place while going somewhere else.'
    );
  });
});

describeSectionToggle(LABEL, 'by', 'callBy_section_expanded', /To make a short, informal visit to a place while going somewhere else\./i, renderPage);

describeChevronAndColour(LABEL, 'by', renderPage);

describeDefaultImageCards(LABEL, 'by', 'callBy', /To make a short, informal visit to a place while going somewhere else\./i, /call by the IT department on my way to lunch/i, renderPage, getCard);
