import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'WearVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('WearVerbPage — "on" section definitions', () => {
  it('renders definition for time passing slowly or tediously', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/Of time or an event: to pass, especially when it feels slow, tedious, or prolonged\./i)).toBeInTheDocument();
  });

  it('renders definition for gradually annoying or exhausting patience', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To gradually annoy, irritate, or exhaust someone's patience over time\./i)).toBeInTheDocument();
  });

  it('all 2 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('on');
    const defs = [
      screen.getByText(/Of time or an event: to pass, especially when it feels slow, tedious, or prolonged\./i),
      screen.getByText(/To gradually annoy, irritate, or exhaust someone's patience over time\./i),
    ];
    defs.forEach(el => expect(el).toHaveClass('truncate'));
  });

  it('first definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/Of time or an event: to pass, especially when it feels slow, tedious, or prolonged\./i)).toHaveAttribute(
      'title',
      'Of time or an event: to pass, especially when it feels slow, tedious, or prolonged.'
    );
  });

  it('second definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To gradually annoy, irritate, or exhaust someone's patience over time\./i)).toHaveAttribute(
      'title',
      "To gradually annoy, irritate, or exhaust someone's patience over time."
    );
  });
});

describeSectionToggle(LABEL, 'on', 'wearOn_section_expanded', /Of time or an event: to pass, especially when it feels slow, tedious, or prolonged\./i, renderPage);

describeChevronAndColour(LABEL, 'on', renderPage);

describeDefaultImageCards(LABEL, 'on', 'wearOn', /Of time or an event: to pass, especially when it feels slow, tedious, or prolonged\./i, /As the technical interview wore on, it became clear the applicant didn't actually have the required Java experience\./i, renderPage, getCard);
