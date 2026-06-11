import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'LookVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('LookVerbPage — "over" section definitions', () => {
  it('renders definition for examining or reading something quickly', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To examine or read something quickly to check its quality\./i)).toBeInTheDocument();
  });

  it('all 1 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('over');
    const defs = [
      screen.getByText(/To examine or read something quickly to check its quality\./i),
    ];
    defs.forEach(el => expect(el).toHaveClass('truncate'));
  });

  it('first definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To examine or read something quickly to check its quality\./i)).toHaveAttribute(
      'title',
      'To examine or read something quickly to check its quality.'
    );
  });
});

describeSectionToggle(LABEL, 'over', 'lookOver_section_expanded', /To examine or read something quickly to check its quality\./i, renderPage);

describeChevronAndColour(LABEL, 'over', renderPage);

describeDefaultImageCards(LABEL, 'over', 'lookOver', /To examine or read something quickly to check its quality\./i, /Could you look over this financial report/i, renderPage, getCard);
