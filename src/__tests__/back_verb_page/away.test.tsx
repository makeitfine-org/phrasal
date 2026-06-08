import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'BackVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('BackVerbPage — "away" section definitions', () => {
  it('renders definition for moving backwards from danger', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To move backwards to get away from someone or something frightening/i)).toBeInTheDocument();
  });

  it('renders definition for withdrawing support', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To show that you do not support a plan or idea anymore/i)).toBeInTheDocument();
  });

  it('all 2 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To move backwards to get away from someone or something frightening/i)).toHaveClass('truncate');
    expect(screen.getByText(/To show that you do not support a plan or idea anymore/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To move backwards to get away from someone or something frightening/i)).toHaveAttribute(
      'title',
      'To move backwards to get away from someone or something frightening.'
    );
  });
});

describeSectionToggle(LABEL, 'away', 'backAway_section_expanded', /To move backwards to get away from someone or something frightening/i, renderPage);

describeChevronAndColour(LABEL, 'away', renderPage);

describeDefaultImageCards(LABEL, 'away', 'backAway', /To move backwards to get away from someone or something frightening/i, /The developer backed away from the hot server rack/i, renderPage, getCard);
