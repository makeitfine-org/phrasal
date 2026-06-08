import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'BeVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('BeVerbPage — "around / round" section definitions', () => {
  it('renders definition for being present or available', () => {
    renderPage();
    expandSection('around / round');
    expect(screen.getByText(/To be present or available\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('around / round');
    expect(screen.getByText(/To be present or available\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('around / round');
    expect(screen.getByText(/To be present or available\./i)).toHaveAttribute('title', 'To be present or available.');
  });
});

describeSectionToggle(LABEL, 'around / round', 'beAround_section_expanded', /To be present or available\./i, renderPage);

describeChevronAndColour(LABEL, 'around / round', renderPage);

describeDefaultImageCards(LABEL, 'around / round', 'beAround', /To be present or available\./i, /Will you be around for a code review/i, renderPage, getCard);
