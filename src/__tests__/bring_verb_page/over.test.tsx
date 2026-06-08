import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'BringVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('BringVerbPage — "over" section definitions', () => {
  it('renders definition for bringing something from one place to another', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To bring someone or something from one place to another/i)).toBeInTheDocument();
  });

  it('renders definition for persuading someone to change sides', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To persuade someone to change to your side or opinion/i)).toBeInTheDocument();
  });

  it('all 2 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To bring someone or something from one place to another/i)).toHaveClass('truncate');
    expect(screen.getByText(/To persuade someone to change to your side or opinion/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To bring someone or something from one place to another/i)).toHaveAttribute(
      'title',
      "To bring someone or something from one place to another (especially to someone's home)."
    );
  });
});

describeSectionToggle(LABEL, 'over', 'bringOver_section_expanded', /To bring someone or something from one place to another/i, renderPage);

describeChevronAndColour(LABEL, 'over', renderPage);

describeDefaultImageCards(LABEL, 'over', 'bringOver', /To bring someone or something from one place to another/i, /I'll bring over my notes/i, renderPage, getCard);
