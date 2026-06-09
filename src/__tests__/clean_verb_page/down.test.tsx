import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'CleanVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('CleanVerbPage — "down" section definitions', () => {
  it('renders definition for washing an entire surface from top to bottom', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To wash an entire surface, usually from top to bottom\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To wash an entire surface, usually from top to bottom\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To wash an entire surface, usually from top to bottom\./i)).toHaveAttribute(
      'title',
      'To wash an entire surface, usually from top to bottom.'
    );
  });
});

describeSectionToggle(LABEL, 'down', 'cleanDown_section_expanded', /To wash an entire surface, usually from top to bottom\./i, renderPage);

describeChevronAndColour(LABEL, 'down', renderPage);

describeDefaultImageCards(LABEL, 'down', 'cleanDown', /To wash an entire surface, usually from top to bottom\./i, /We need to clean down the walls/i, renderPage, getCard);
