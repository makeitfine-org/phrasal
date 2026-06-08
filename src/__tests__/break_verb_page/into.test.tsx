import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'BreakVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('BreakVerbPage — "into" section definitions', () => {
  it('renders definition for entering a building by force transitive', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/To enter a building by force \(transitive/i)).toBeInTheDocument();
  });

  it('renders definition for suddenly beginning an action', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/To suddenly begin doing something/i)).toBeInTheDocument();
  });

  it('renders definition for entering a new profession or market', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/To successfully enter a new profession, industry, or market/i)).toBeInTheDocument();
  });

  it('renders definition for opening something by force', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/To open something by force or use emergency supplies\/funds/i)).toBeInTheDocument();
  });

  it('all 4 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/To enter a building by force \(transitive/i)).toHaveClass('truncate');
    expect(screen.getByText(/To suddenly begin doing something/i)).toHaveClass('truncate');
    expect(screen.getByText(/To successfully enter a new profession, industry, or market/i)).toHaveClass('truncate');
    expect(screen.getByText(/To open something by force or use emergency supplies\/funds/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/To enter a building by force \(transitive/i)).toHaveAttribute(
      'title',
      'To enter a building by force (transitive — requires an object).'
    );
  });
});

describeSectionToggle(LABEL, 'into', 'breakInto_section_expanded', /To enter a building by force \(transitive/i, renderPage);

describeChevronAndColour(LABEL, 'into', renderPage);

describeDefaultImageCards(LABEL, 'into', 'breakInto', /To enter a building by force \(transitive/i, /Someone broke into my apartment/i, renderPage, getCard);
