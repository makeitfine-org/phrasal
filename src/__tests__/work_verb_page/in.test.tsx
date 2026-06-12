import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'WorkVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('WorkVerbPage — "in" section definitions', () => {
  it('renders definition for making time in a busy schedule', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To make time or space for something or someone in a busy schedule\./i)).toBeInTheDocument();
  });

  it('renders definition for mixing a substance thoroughly', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To mix a substance into another substance thoroughly\./i)).toBeInTheDocument();
  });

  it('all 2 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('in');
    const defs = [
      screen.getByText(/To make time or space for something or someone in a busy schedule\./i),
      screen.getByText(/To mix a substance into another substance thoroughly\./i),
    ];
    defs.forEach(el => expect(el).toHaveClass('truncate'));
  });

  it('first definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To make time or space for something or someone in a busy schedule\./i)).toHaveAttribute(
      'title',
      'To make time or space for something or someone in a busy schedule.'
    );
  });

  it('second definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To mix a substance into another substance thoroughly\./i)).toHaveAttribute(
      'title',
      'To mix a substance into another substance thoroughly.'
    );
  });
});

describeSectionToggle(LABEL, 'in', 'workIn_section_expanded', /To make time or space for something or someone in a busy schedule\./i, renderPage);

describeChevronAndColour(LABEL, 'in', renderPage);

describeDefaultImageCards(LABEL, 'in', 'workIn', /To make time or space for something or someone in a busy schedule\./i, /My schedule is packed, but I can work a quick meeting in at 3:00 PM\./i, renderPage, getCard);
