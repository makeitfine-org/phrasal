import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'ZipVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('ZipVerbPage — "up" section definitions', () => {
  it('renders definition for closing a garment with a zipper', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To close a garment, bag, or tent completely by fastening its zipper\./i)).toBeInTheDocument();
  });

  it('renders definition for being quiet', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To be quiet or stop talking \(slang\/idiomatic, often commanded as zip it\)\./i)).toBeInTheDocument();
  });

  it('all 2 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('up');
    const defs = [
      screen.getByText(/To close a garment, bag, or tent completely by fastening its zipper\./i),
      screen.getByText(/To be quiet or stop talking \(slang\/idiomatic, often commanded as zip it\)\./i),
    ];
    defs.forEach(el => expect(el).toHaveClass('truncate'));
  });

  it('first definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To close a garment, bag, or tent completely by fastening its zipper\./i)).toHaveAttribute(
      'title',
      'To close a garment, bag, or tent completely by fastening its zipper.'
    );
  });

  it('second definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To be quiet or stop talking \(slang\/idiomatic, often commanded as zip it\)\./i)).toHaveAttribute(
      'title',
      'To be quiet or stop talking (slang/idiomatic, often commanded as zip it).'
    );
  });
});

describeSectionToggle(LABEL, 'up', 'zipUp_section_expanded', /To close a garment, bag, or tent completely by fastening its zipper\./i, renderPage);

describeChevronAndColour(LABEL, 'up', renderPage);

describeDefaultImageCards(LABEL, 'up', 'zipUp', /To close a garment, bag, or tent completely by fastening its zipper\./i, /Make sure you zip up your coat; it's freezing outside!/i, renderPage, getCard);
