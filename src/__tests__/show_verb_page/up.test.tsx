import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'ShowVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('ShowVerbPage — "up" section definitions', () => {
  it('renders definition for arriving at a place', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To arrive or appear at a place, especially when expected or late\./i)).toBeInTheDocument();
  });

  it('renders definition for being clearly visible', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To be clearly visible\./i)).toBeInTheDocument();
  });

  it("renders definition for revealing someone's faults", () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To reveal someone's faults or make them feel embarrassed/i)).toBeInTheDocument();
  });

  it('renders definition for testing positive for something', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To test positive for something/i)).toBeInTheDocument();
  });

  it('all 4 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To arrive or appear at a place, especially when expected or late\./i)).toHaveClass('truncate');
    expect(screen.getByText(/To be clearly visible\./i)).toHaveClass('truncate');
    expect(screen.getByText(/To reveal someone's faults or make them feel embarrassed/i)).toHaveClass('truncate');
    expect(screen.getByText(/To test positive for something/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To arrive or appear at a place, especially when expected or late\./i)).toHaveAttribute(
      'title',
      'To arrive or appear at a place, especially when expected or late.'
    );
  });
});

describeSectionToggle(LABEL, 'up', 'showUp_section_expanded', /To arrive or appear at a place, especially when expected or late\./i, renderPage);

describeChevronAndColour(LABEL, 'up', renderPage);

describeDefaultImageCards(LABEL, 'up', 'showUp', /To arrive or appear at a place, especially when expected or late\./i, /We waited for an hour, but the client never showed up for the meeting\./i, renderPage, getCard);
