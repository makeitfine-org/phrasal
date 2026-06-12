import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'WarmVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('WarmVerbPage — "over" section definitions', () => {
  it('renders definition for reheating food', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To reheat cooked food \(North American English, synonymous with warm up\)\./i)).toBeInTheDocument();
  });

  it('renders definition for presenting an old idea as new', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To present an old idea or strategy as if it were new or original, usually with a negative connotation \(as the adjective warmed-over\)\./i)).toBeInTheDocument();
  });

  it('all 2 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('over');
    const defs = [
      screen.getByText(/To reheat cooked food \(North American English, synonymous with warm up\)\./i),
      screen.getByText(/To present an old idea or strategy as if it were new or original, usually with a negative connotation \(as the adjective warmed-over\)\./i),
    ];
    defs.forEach(el => expect(el).toHaveClass('truncate'));
  });

  it('first definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To reheat cooked food \(North American English, synonymous with warm up\)\./i)).toHaveAttribute(
      'title',
      'To reheat cooked food (North American English, synonymous with warm up).'
    );
  });

  it('second definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To present an old idea or strategy as if it were new or original, usually with a negative connotation \(as the adjective warmed-over\)\./i)).toHaveAttribute(
      'title',
      'To present an old idea or strategy as if it were new or original, usually with a negative connotation (as the adjective warmed-over).'
    );
  });
});

describeSectionToggle(LABEL, 'over', 'warmOver_section_expanded', /To reheat cooked food \(North American English, synonymous with warm up\)\./i, renderPage);

describeChevronAndColour(LABEL, 'over', renderPage);

describeDefaultImageCards(LABEL, 'over', 'warmOver', /To reheat cooked food \(North American English, synonymous with warm up\)\./i, /We can just warm over last night's dinner\./i, renderPage, getCard);
