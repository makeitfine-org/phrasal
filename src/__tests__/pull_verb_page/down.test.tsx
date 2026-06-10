import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'PullVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('PullVerbPage — "down" section definitions', () => {
  it('renders definition for demolishing a building', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To demolish or destroy a building/i)).toBeInTheDocument();
  });

  it('renders definition for making someone feel depressed', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To make someone feel depressed or weak/i)).toBeInTheDocument();
  });

  it('renders definition for earning money', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To earn a specific amount of money/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To demolish or destroy a building/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To demolish or destroy a building/i)).toHaveAttribute(
      'title',
      'To demolish or destroy a building.'
    );
  });
});

describeSectionToggle(LABEL, 'down', 'pullDown_section_expanded', /To demolish or destroy a building/i, renderPage);

describeChevronAndColour(LABEL, 'down', renderPage);

describeDefaultImageCards(LABEL, 'down', 'pullDown', /To demolish or destroy a building/i, /They are pulling down the old factory/i, renderPage, getCard);
