import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'LookVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('LookVerbPage — "around / round / about" section definitions', () => {
  it('renders definition for walking through a place to see what is there', () => {
    renderPage();
    expandSection('around / round / about');
    expect(screen.getByText(/To walk through a place to see what is there\./i)).toBeInTheDocument();
  });

  it('renders definition for searching in various places', () => {
    renderPage();
    expandSection('around / round / about');
    expect(screen.getByText(/To search for something in various places\./i)).toBeInTheDocument();
  });

  it('all 2 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('around / round / about');
    const defs = [
      screen.getByText(/To walk through a place to see what is there\./i),
      screen.getByText(/To search for something in various places\./i),
    ];
    defs.forEach(el => expect(el).toHaveClass('truncate'));
  });

  it('first definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('around / round / about');
    expect(screen.getByText(/To walk through a place to see what is there\./i)).toHaveAttribute(
      'title',
      'To walk through a place to see what is there.'
    );
  });

  it('second definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('around / round / about');
    expect(screen.getByText(/To search for something in various places\./i)).toHaveAttribute(
      'title',
      'To search for something in various places.'
    );
  });
});

describeSectionToggle(LABEL, 'around / round / about', 'lookAround_section_expanded', /To walk through a place to see what is there\./i, renderPage);

describeChevronAndColour(LABEL, 'around / round / about', renderPage);

describeDefaultImageCards(LABEL, 'around / round / about', 'lookAround', /To walk through a place to see what is there\./i, /We took some time to look around the new office/i, renderPage, getCard);
