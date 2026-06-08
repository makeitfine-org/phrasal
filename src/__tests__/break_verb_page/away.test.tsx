import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'BreakVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('BreakVerbPage — "away" section definitions', () => {
  it('renders definition for physically escaping someone', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To physically escape from someone who is holding you/i)).toBeInTheDocument();
  });

  it('renders definition for separating from a group in a race', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To separate from a group, crowd, or pack/i)).toBeInTheDocument();
  });

  it('renders definition for leaving a political party or organization', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To leave a political party, country, or organization to form a new one/i)).toBeInTheDocument();
  });

  it('all 3 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To physically escape from someone who is holding you/i)).toHaveClass('truncate');
    expect(screen.getByText(/To separate from a group, crowd, or pack/i)).toHaveClass('truncate');
    expect(screen.getByText(/To leave a political party, country, or organization to form a new one/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To physically escape from someone who is holding you/i)).toHaveAttribute(
      'title',
      'To physically escape from someone who is holding you.'
    );
  });
});

describeSectionToggle(LABEL, 'away', 'breakAway_section_expanded', /To physically escape from someone who is holding you/i, renderPage);

describeChevronAndColour(LABEL, 'away', renderPage);

describeDefaultImageCards(LABEL, 'away', 'breakAway', /To physically escape from someone who is holding you/i, /He grabbed her arm, but she managed to break away/i, renderPage, getCard);
