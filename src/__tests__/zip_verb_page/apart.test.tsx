import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'ZipVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('ZipVerbPage — "apart" section definitions', () => {
  it('renders definition for separating fabric using a zipper', () => {
    renderPage();
    expandSection('apart');
    expect(screen.getByText(/To separate two pieces of fabric or material by opening a zipper that connects them\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('apart');
    const def = screen.getByText(/To separate two pieces of fabric or material by opening a zipper that connects them\./i);
    expect(def).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('apart');
    expect(screen.getByText(/To separate two pieces of fabric or material by opening a zipper that connects them\./i)).toHaveAttribute(
      'title',
      'To separate two pieces of fabric or material by opening a zipper that connects them.'
    );
  });
});

describeSectionToggle(LABEL, 'apart', 'zipApart_section_expanded', /To separate two pieces of fabric or material by opening a zipper that connects them\./i, renderPage);

describeChevronAndColour(LABEL, 'apart', renderPage);

describeDefaultImageCards(LABEL, 'apart', 'zipApart', /To separate two pieces of fabric or material by opening a zipper that connects them\./i, /These convertible hiking pants zip apart at the knee to become shorts\./i, renderPage, getCard);
