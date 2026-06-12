import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'ZipVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('ZipVerbPage — "in" section definitions', () => {
  it('renders definition for arriving quickly', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To arrive or enter a place very quickly\./i)).toBeInTheDocument();
  });

  it('renders definition for attaching an inner lining', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To attach an inner lining to a larger garment using a zipper\./i)).toBeInTheDocument();
  });

  it('all 2 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('in');
    const defs = [
      screen.getByText(/To arrive or enter a place very quickly\./i),
      screen.getByText(/To attach an inner lining to a larger garment using a zipper\./i),
    ];
    defs.forEach(el => expect(el).toHaveClass('truncate'));
  });

  it('first definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To arrive or enter a place very quickly\./i)).toHaveAttribute(
      'title',
      'To arrive or enter a place very quickly.'
    );
  });

  it('second definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To attach an inner lining to a larger garment using a zipper\./i)).toHaveAttribute(
      'title',
      'To attach an inner lining to a larger garment using a zipper.'
    );
  });
});

describeSectionToggle(LABEL, 'in', 'zipIn_section_expanded', /To arrive or enter a place very quickly\./i, renderPage);

describeChevronAndColour(LABEL, 'in', renderPage);

describeDefaultImageCards(LABEL, 'in', 'zipIn', /To arrive or enter a place very quickly\./i, /I'll zip in and grab a coffee before the meeting starts\./i, renderPage, getCard);
