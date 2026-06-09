import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'FallVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('FallVerbPage — "over" section definitions', () => {
  it('renders definition for collapsing or dropping to the ground', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To collapse or drop to the ground\./i)).toBeInTheDocument();
  });

  it('renders definition for trying extremely hard looking foolish', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To try extremely hard, often looking foolish, to do something \(fall over oneself\)\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To collapse or drop to the ground\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To collapse or drop to the ground\./i)).toHaveAttribute(
      'title',
      'To collapse or drop to the ground.'
    );
  });
});

describeSectionToggle(LABEL, 'over', 'fallOver_section_expanded', /To collapse or drop to the ground\./i, renderPage);

describeChevronAndColour(LABEL, 'over', renderPage);

describeDefaultImageCards(LABEL, 'over', 'fallOver', /To collapse or drop to the ground\./i, /The server rack almost fell over during the earthquake\./i, renderPage, getCard);
