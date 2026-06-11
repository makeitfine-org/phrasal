import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'ThrowVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('ThrowVerbPage — "over" section definitions', () => {
  it('renders definition for abandoning a romantic partner', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To abandon, reject, or leave someone/i)).toBeInTheDocument();
  });

  it('renders definition for abandoning a plan or idea', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To abandon a plan or idea\./i)).toBeInTheDocument();
  });

  it('all 2 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('over');
    const defs = [
      screen.getByText(/To abandon, reject, or leave someone/i),
      screen.getByText(/To abandon a plan or idea\./i),
    ];
    defs.forEach(el => expect(el).toHaveClass('truncate'));
  });

  it('first definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To abandon, reject, or leave someone/i)).toHaveAttribute(
      'title',
      'To abandon, reject, or leave someone (especially a romantic partner).'
    );
  });

  it('second definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To abandon a plan or idea\./i)).toHaveAttribute(
      'title',
      'To abandon a plan or idea.'
    );
  });
});

describeSectionToggle(LABEL, 'over', 'throwOver_section_expanded', /To abandon, reject, or leave someone/i, renderPage);

describeChevronAndColour(LABEL, 'over', renderPage);

describeDefaultImageCards(LABEL, 'over', 'throwOver', /To abandon, reject, or leave someone/i, /She threw him over for a wealthy businessman\./i, renderPage, getCard);
