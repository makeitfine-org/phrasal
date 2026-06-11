import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'LookVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('LookVerbPage — "away" section definitions', () => {
  it('renders definition for turning eyes away from something', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To turn your eyes away from someone or something\./i)).toBeInTheDocument();
  });

  it('all 1 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('away');
    const defs = [
      screen.getByText(/To turn your eyes away from someone or something\./i),
    ];
    defs.forEach(el => expect(el).toHaveClass('truncate'));
  });

  it('first definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To turn your eyes away from someone or something\./i)).toHaveAttribute(
      'title',
      'To turn your eyes away from someone or something.'
    );
  });
});

describeSectionToggle(LABEL, 'away', 'lookAway_section_expanded', /To turn your eyes away from someone or something\./i, renderPage);

describeChevronAndColour(LABEL, 'away', renderPage);

describeDefaultImageCards(LABEL, 'away', 'lookAway', /To turn your eyes away from someone or something\./i, /The presentation data was so confusing/i, renderPage, getCard);
