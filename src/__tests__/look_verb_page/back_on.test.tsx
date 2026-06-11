import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'LookVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('LookVerbPage — "back (on)" section definitions', () => {
  it('renders definition for thinking about something in the past', () => {
    renderPage();
    expandSection('back (on)');
    expect(screen.getByText(/To think about something that happened in the past\./i)).toBeInTheDocument();
  });

  it('all 1 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('back (on)');
    const defs = [
      screen.getByText(/To think about something that happened in the past\./i),
    ];
    defs.forEach(el => expect(el).toHaveClass('truncate'));
  });

  it('first definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('back (on)');
    expect(screen.getByText(/To think about something that happened in the past\./i)).toHaveAttribute(
      'title',
      'To think about something that happened in the past.'
    );
  });
});

describeSectionToggle(LABEL, 'back (on)', 'lookBack_section_expanded', /To think about something that happened in the past\./i, renderPage);

describeChevronAndColour(LABEL, 'back (on)', renderPage);

describeDefaultImageCards(LABEL, 'back (on)', 'lookBack', /To think about something that happened in the past\./i, /When I look back on my early days/i, renderPage, getCard);
