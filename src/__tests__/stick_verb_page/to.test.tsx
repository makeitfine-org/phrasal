import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'StickVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('StickVerbPage — "to" section definitions', () => {
  it('renders definition for continuing to follow a plan without changing', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To continue doing or following a specific plan, rule, or subject without changing\./i)).toBeInTheDocument();
  });

  it('renders definition for keeping a promise or agreement', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To keep a promise or agreement\./i)).toBeInTheDocument();
  });

  it('all 2 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('to');
    const defs = [
      screen.getByText(/To continue doing or following a specific plan, rule, or subject without changing\./i),
      screen.getByText(/To keep a promise or agreement\./i),
    ];
    defs.forEach(el => expect(el).toHaveClass('truncate'));
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To continue doing or following a specific plan, rule, or subject without changing\./i)).toHaveAttribute(
      'title',
      'To continue doing or following a specific plan, rule, or subject without changing.'
    );
  });
});

describeSectionToggle(LABEL, 'to', 'stickTo_section_expanded', /To continue doing or following a specific plan, rule, or subject without changing\./i, renderPage);

describeChevronAndColour(LABEL, 'to', renderPage);

describeDefaultImageCards(LABEL, 'to', 'stickTo', /To continue doing or following a specific plan, rule, or subject without changing\./i, /Let's stick to the meeting agenda so we finish on time\./i, renderPage, getCard);
