import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'LookVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('LookVerbPage — "into" section definitions', () => {
  it('renders definition for investigating a situation or problem', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/To investigate or research the facts of a situation or problem\./i)).toBeInTheDocument();
  });

  it('all 1 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('into');
    const defs = [
      screen.getByText(/To investigate or research the facts of a situation or problem\./i),
    ];
    defs.forEach(el => expect(el).toHaveClass('truncate'));
  });

  it('first definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/To investigate or research the facts of a situation or problem\./i)).toHaveAttribute(
      'title',
      'To investigate or research the facts of a situation or problem.'
    );
  });
});

describeSectionToggle(LABEL, 'into', 'lookInto_section_expanded', /To investigate or research the facts of a situation or problem\./i, renderPage);

describeChevronAndColour(LABEL, 'into', renderPage);

describeDefaultImageCards(LABEL, 'into', 'lookInto', /To investigate or research the facts of a situation or problem\./i, /The IT department will look into why the server crashed\./i, renderPage, getCard);
