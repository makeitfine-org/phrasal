import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'WriteVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('WriteVerbPage — "on" section definitions', () => {
  it('renders definition for writing about a topic formally', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To write about a specific topic or subject \(formal\/academic\)\./i)).toBeInTheDocument();
  });

  it('renders definition for continuing to write', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To continue writing despite distractions or obstacles\./i)).toBeInTheDocument();
  });

  it('all 2 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('on');
    const defs = [
      screen.getByText(/To write about a specific topic or subject \(formal\/academic\)\./i),
      screen.getByText(/To continue writing despite distractions or obstacles\./i),
    ];
    defs.forEach(el => expect(el).toHaveClass('truncate'));
  });

  it('first definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To write about a specific topic or subject \(formal\/academic\)\./i)).toHaveAttribute(
      'title',
      'To write about a specific topic or subject (formal/academic).'
    );
  });

  it('second definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To continue writing despite distractions or obstacles\./i)).toHaveAttribute(
      'title',
      'To continue writing despite distractions or obstacles.'
    );
  });
});

describeSectionToggle(LABEL, 'on', 'writeOn_section_expanded', /To write about a specific topic or subject \(formal\/academic\)\./i, renderPage);

describeChevronAndColour(LABEL, 'on', renderPage);

describeDefaultImageCards(LABEL, 'on', 'writeOn', /To write about a specific topic or subject \(formal\/academic\)\./i, /Professor Smith writes primarily on medieval European history\./i, renderPage, getCard);
