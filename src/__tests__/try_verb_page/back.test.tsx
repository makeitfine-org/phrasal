import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'TryVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('TryVerbPage — "back" section definitions', () => {
  it('renders definition for making another attempt', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To make another attempt to contact someone/i)).toBeInTheDocument();
  });

  it('all 1 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('back');
    const defs = [
      screen.getByText(/To make another attempt to contact someone/i),
    ];
    defs.forEach(el => expect(el).toHaveClass('truncate'));
  });

  it('first definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To make another attempt to contact someone/i)).toHaveAttribute(
      'title',
      'To make another attempt to contact someone or return to a place at a later time because the first attempt was unsuccessful.'
    );
  });
});

describeSectionToggle(LABEL, 'back', 'tryBack_section_expanded', /To make another attempt to contact someone/i, renderPage);

describeChevronAndColour(LABEL, 'back', renderPage);

describeDefaultImageCards(LABEL, 'back', 'tryBack', /To make another attempt to contact someone/i, /I'll try back in an hour\./i, renderPage, getCard);
