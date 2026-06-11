import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'LookVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('LookVerbPage — "for" section definitions', () => {
  it('renders definition for trying to find something or someone', () => {
    renderPage();
    expandSection('for');
    expect(screen.getByText(/To try to find something or someone\./i)).toBeInTheDocument();
  });

  it('all 1 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('for');
    const defs = [
      screen.getByText(/To try to find something or someone\./i),
    ];
    defs.forEach(el => expect(el).toHaveClass('truncate'));
  });

  it('first definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('for');
    expect(screen.getByText(/To try to find something or someone\./i)).toHaveAttribute(
      'title',
      'To try to find something or someone.'
    );
  });
});

describeSectionToggle(LABEL, 'for', 'lookFor_section_expanded', /To try to find something or someone\./i, renderPage);

describeChevronAndColour(LABEL, 'for', renderPage);

describeDefaultImageCards(LABEL, 'for', 'lookFor', /To try to find something or someone\./i, /The development team is looking for a solution/i, renderPage, getCard);
