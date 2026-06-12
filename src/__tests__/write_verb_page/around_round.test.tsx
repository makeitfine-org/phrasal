import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'WriteVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('WriteVerbPage — "around / round" section definitions', () => {
  it('renders definition for avoiding the main point', () => {
    renderPage();
    expandSection('around / round');
    expect(screen.getByText(/To intentionally avoid addressing the main point or a difficult topic in a text\./i)).toBeInTheDocument();
  });

  it('renders definition for circulating a memo', () => {
    renderPage();
    expandSection('around / round');
    expect(screen.getByText(/To circulate a memo or letter to a group of people \(British: write round\)\./i)).toBeInTheDocument();
  });

  it('all 2 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('around / round');
    const defs = [
      screen.getByText(/To intentionally avoid addressing the main point or a difficult topic in a text\./i),
      screen.getByText(/To circulate a memo or letter to a group of people \(British: write round\)\./i),
    ];
    defs.forEach(el => expect(el).toHaveClass('truncate'));
  });

  it('first definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('around / round');
    expect(screen.getByText(/To intentionally avoid addressing the main point or a difficult topic in a text\./i)).toHaveAttribute(
      'title',
      'To intentionally avoid addressing the main point or a difficult topic in a text.'
    );
  });

  it('second definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('around / round');
    expect(screen.getByText(/To circulate a memo or letter to a group of people \(British: write round\)\./i)).toHaveAttribute(
      'title',
      'To circulate a memo or letter to a group of people (British: write round).'
    );
  });
});

describeSectionToggle(LABEL, 'around / round', 'writeAround_section_expanded', /To intentionally avoid addressing the main point or a difficult topic in a text\./i, renderPage);

describeChevronAndColour(LABEL, 'around / round', renderPage);

describeDefaultImageCards(LABEL, 'around / round', 'writeAround', /To intentionally avoid addressing the main point or a difficult topic in a text\./i, /The biography is frustrating because the author writes around the politician's well-known scandals\./i, renderPage, getCard);
