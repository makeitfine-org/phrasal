import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'PickVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('PickVerbPage — "through" section definitions', () => {
  it('renders definition for searching carefully among a pile of items', () => {
    renderPage();
    expandSection('through');
    expect(screen.getByText(/To search carefully among a pile or collection of items/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('through');
    expect(screen.getByText(/To search carefully among a pile or collection of items/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('through');
    expect(screen.getByText(/To search carefully among a pile or collection of items/i)).toHaveAttribute(
      'title',
      'To search carefully among a pile or collection of items.'
    );
  });
});

describeSectionToggle(LABEL, 'through', 'pickThrough_section_expanded', /To search carefully among a pile or collection of items/i, renderPage);

describeChevronAndColour(LABEL, 'through', renderPage);

describeDefaultImageCards(LABEL, 'through', 'pickThrough', /To search carefully among a pile or collection of items/i, /The team picked through the raw data looking for helpful trends\./i, renderPage, getCard);
