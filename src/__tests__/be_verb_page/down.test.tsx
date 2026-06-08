import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'BeVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('BeVerbPage — "down" section definitions', () => {
  it('renders definition for a system not working', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To stop working \(for systems or machines\)\./i)).toBeInTheDocument();
  });

  it('renders definition for decreasing', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To decrease\./i)).toBeInTheDocument();
  });

  it('renders definition for feeling sad', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To feel sad or depressed\./i)).toBeInTheDocument();
  });

  it('all 3 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To stop working \(for systems or machines\)\./i)).toHaveClass('truncate');
    expect(screen.getByText(/To decrease\./i)).toHaveClass('truncate');
    expect(screen.getByText(/To feel sad or depressed\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To stop working \(for systems or machines\)\./i)).toHaveAttribute(
      'title',
      'To stop working (for systems or machines).'
    );
  });
});

describeSectionToggle(LABEL, 'down', 'beDown_section_expanded', /To stop working \(for systems or machines\)\./i, renderPage);

describeChevronAndColour(LABEL, 'down', renderPage);

describeDefaultImageCards(LABEL, 'down', 'beDown', /To stop working \(for systems or machines\)\./i, /The production environment is down right now/i, renderPage, getCard);
