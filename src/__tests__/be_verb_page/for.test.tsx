import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'BeVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('BeVerbPage — "for" section definitions', () => {
  it('renders definition for supporting something', () => {
    renderPage();
    expandSection('for');
    expect(screen.getByText(/To support or be in favor of\./i)).toBeInTheDocument();
  });

  it('renders definition for being intended for', () => {
    renderPage();
    expandSection('for');
    expect(screen.getByText(/To be intended for\./i)).toBeInTheDocument();
  });

  it('all 2 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('for');
    expect(screen.getByText(/To support or be in favor of\./i)).toHaveClass('truncate');
    expect(screen.getByText(/To be intended for\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('for');
    expect(screen.getByText(/To support or be in favor of\./i)).toHaveAttribute(
      'title',
      'To support or be in favor of.'
    );
  });
});

describeSectionToggle(LABEL, 'for', 'beFor_section_expanded', /To support or be in favor of\./i, renderPage);

describeChevronAndColour(LABEL, 'for', renderPage);

describeDefaultImageCards(LABEL, 'for', 'beFor', /To support or be in favor of\./i, /We are for the new flexible working hours/i, renderPage, getCard);
