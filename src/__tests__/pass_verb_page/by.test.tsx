import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'PassVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('PassVerbPage — "by" section definitions', () => {
  it('renders definition for going past a place or person', () => {
    renderPage();
    expandSection('by');
    expect(screen.getByText(/To go past a place or person/i)).toBeInTheDocument();
  });

  it('renders definition for missing an opportunity', () => {
    renderPage();
    expandSection('by');
    expect(screen.getByText(/To happen without affecting someone, or to miss an opportunity/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('by');
    expect(screen.getByText(/To go past a place or person/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('by');
    expect(screen.getByText(/To go past a place or person/i)).toHaveAttribute(
      'title',
      'To go past a place or person.'
    );
  });
});

describeSectionToggle(LABEL, 'by', 'passBy_section_expanded', /To go past a place or person/i, renderPage);

describeChevronAndColour(LABEL, 'by', renderPage);

describeDefaultImageCards(LABEL, 'by', 'passBy', /To go past a place or person/i, /I pass by your office every morning on my way to get coffee\./i, renderPage, getCard);
