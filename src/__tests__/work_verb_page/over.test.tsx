import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'WorkVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('WorkVerbPage — "over" section definitions', () => {
  it('renders definition for physically assaulting someone', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To physically assault or beat someone up severely \(informal\)\./i)).toBeInTheDocument();
  });

  it('renders definition for examining or revising something thoroughly', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To examine, treat, or revise something very thoroughly\./i)).toBeInTheDocument();
  });

  it('all 2 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('over');
    const defs = [
      screen.getByText(/To physically assault or beat someone up severely \(informal\)\./i),
      screen.getByText(/To examine, treat, or revise something very thoroughly\./i),
    ];
    defs.forEach(el => expect(el).toHaveClass('truncate'));
  });

  it('first definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To physically assault or beat someone up severely \(informal\)\./i)).toHaveAttribute(
      'title',
      'To physically assault or beat someone up severely (informal).'
    );
  });

  it('second definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To examine, treat, or revise something very thoroughly\./i)).toHaveAttribute(
      'title',
      'To examine, treat, or revise something very thoroughly.'
    );
  });
});

describeSectionToggle(LABEL, 'over', 'workOver_section_expanded', /To physically assault or beat someone up severely \(informal\)\./i, renderPage);

describeChevronAndColour(LABEL, 'over', renderPage);

describeDefaultImageCards(LABEL, 'over', 'workOver', /To physically assault or beat someone up severely \(informal\)\./i, /The gang threatened to work him over if he didn't pay\./i, renderPage, getCard);
