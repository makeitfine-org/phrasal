import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'BrushVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('BrushVerbPage — "against" section definitions', () => {
  it('renders definition for touching lightly while moving past', () => {
    renderPage();
    expandSection('against');
    expect(screen.getByText(/To touch someone or something lightly while moving past them\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('against');
    expect(screen.getByText(/To touch someone or something lightly while moving past them\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('against');
    expect(screen.getByText(/To touch someone or something lightly while moving past them\./i)).toHaveAttribute(
      'title',
      'To touch someone or something lightly while moving past them.'
    );
  });
});

describeSectionToggle(LABEL, 'against', 'brushAgainst_section_expanded', /To touch someone or something lightly while moving past them\./i, renderPage);

describeChevronAndColour(LABEL, 'against', renderPage);

describeDefaultImageCards(LABEL, 'against', 'brushAgainst', /To touch someone or something lightly while moving past them\./i, /My shoulder brushed against the doorframe/i, renderPage, getCard);
