import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'TurnVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('TurnVerbPage — "away" section definitions', () => {
  it('renders definition for refusing entry', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To refuse someone entry or admittance\./i)).toBeInTheDocument();
  });

  it('renders definition for looking in a different direction', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To look in a different direction, often out of disgust, shame, or lack of interest\./i)).toBeInTheDocument();
  });

  it('all 2 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('away');
    const defs = [
      screen.getByText(/To refuse someone entry or admittance\./i),
      screen.getByText(/To look in a different direction, often out of disgust, shame, or lack of interest\./i),
    ];
    defs.forEach(el => expect(el).toHaveClass('truncate'));
  });

  it('first definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To refuse someone entry or admittance\./i)).toHaveAttribute(
      'title',
      'To refuse someone entry or admittance.'
    );
  });

  it('second definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To look in a different direction, often out of disgust, shame, or lack of interest\./i)).toHaveAttribute(
      'title',
      'To look in a different direction, often out of disgust, shame, or lack of interest.'
    );
  });
});

describeSectionToggle(LABEL, 'away', 'turnAway_section_expanded', /To refuse someone entry or admittance\./i, renderPage);

describeChevronAndColour(LABEL, 'away', renderPage);

describeDefaultImageCards(LABEL, 'away', 'turnAway', /To refuse someone entry or admittance\./i, /The bouncer turned us away because the club was at full capacity\./i, renderPage, getCard);
