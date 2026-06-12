import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'ZipVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('ZipVerbPage — "on" section definitions', () => {
  it('renders definition for attaching a garment part with a zipper', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To attach a piece of fabric or a removable garment part using a zipper\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('on');
    const def = screen.getByText(/To attach a piece of fabric or a removable garment part using a zipper\./i);
    expect(def).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To attach a piece of fabric or a removable garment part using a zipper\./i)).toHaveAttribute(
      'title',
      'To attach a piece of fabric or a removable garment part using a zipper.'
    );
  });
});

describeSectionToggle(LABEL, 'on', 'zipOn_section_expanded', /To attach a piece of fabric or a removable garment part using a zipper\./i, renderPage);

describeChevronAndColour(LABEL, 'on', renderPage);

describeDefaultImageCards(LABEL, 'on', 'zipOn', /To attach a piece of fabric or a removable garment part using a zipper\./i, /If it starts raining, you can just zip on the hood\./i, renderPage, getCard);
