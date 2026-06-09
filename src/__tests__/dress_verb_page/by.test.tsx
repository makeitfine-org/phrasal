import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'DressVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('DressVerbPage — "by" section definitions', () => {
  it('renders definition for using a reference point to form a straight line', () => {
    renderPage();
    expandSection('by');
    expect(screen.getByText(/To use a specific person or point on one side as a guide to form a straight line/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('by');
    expect(screen.getByText(/To use a specific person or point on one side as a guide to form a straight line/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('by');
    expect(screen.getByText(/To use a specific person or point on one side as a guide to form a straight line/i)).toHaveAttribute(
      'title',
      'To use a specific person or point on one side as a guide to form a straight line (military / marching context).'
    );
  });
});

describeSectionToggle(LABEL, 'by', 'dressBy_section_expanded', /To use a specific person or point on one side as a guide to form a straight line/i, renderPage);

describeChevronAndColour(LABEL, 'by', renderPage);

describeDefaultImageCards(LABEL, 'by', 'dressBy', /To use a specific person or point on one side as a guide to form a straight line/i, /The marching band had to dress by the right/i, renderPage, getCard);
