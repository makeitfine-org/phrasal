import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'TurnVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('TurnVerbPage — "about" section definitions', () => {
  it('all 1 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('about');
    const defs = [screen.getByText(/To physically turn to face the opposite direction\./i)];
    defs.forEach(el => expect(el).toHaveClass('truncate'));
  });

  it('first definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('about');
    expect(screen.getByText(/To physically turn to face the opposite direction\./i)).toHaveAttribute(
      'title',
      'To physically turn to face the opposite direction.'
    );
  });
});

describeSectionToggle(LABEL, 'about', 'turnAbout_section_expanded', /To physically turn to face the opposite direction\./i, renderPage);

describeChevronAndColour(LABEL, 'about', renderPage);

describeDefaultImageCards(LABEL, 'about', 'turnAbout', /To physically turn to face the opposite direction\./i, /The soldier turned about and marched away\./i, renderPage, getCard);
