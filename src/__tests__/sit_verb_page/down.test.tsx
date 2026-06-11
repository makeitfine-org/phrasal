import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'SitVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('SitVerbPage — "down" section definitions', () => {
  it('renders definition for taking a seat', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To take a seat \(literal\)\./i)).toBeInTheDocument();
  });

  it('renders definition for having a serious conversation', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To have a serious conversation or a formal meeting with someone/i)).toBeInTheDocument();
  });

  it('all 2 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To take a seat \(literal\)\./i)).toHaveClass('truncate');
    expect(screen.getByText(/To have a serious conversation or a formal meeting with someone/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To take a seat \(literal\)\./i)).toHaveAttribute(
      'title',
      'To take a seat (literal).'
    );
  });
});

describeSectionToggle(LABEL, 'down', 'sitDown_section_expanded', /To take a seat \(literal\)\./i, renderPage);

describeChevronAndColour(LABEL, 'down', renderPage);

describeDefaultImageCards(LABEL, 'down', 'sitDown', /To take a seat \(literal\)\./i, /Please sit down, the meeting will begin shortly\./i, renderPage, getCard);
