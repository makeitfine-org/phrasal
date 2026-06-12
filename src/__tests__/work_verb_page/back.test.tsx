import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'WorkVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('WorkVerbPage — "back" section definitions', () => {
  it('renders definition for calculating backwards from a deadline', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To start from an end result or deadline and calculate backwards to determine when to begin\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('back');
    const def = screen.getByText(/To start from an end result or deadline and calculate backwards to determine when to begin\./i);
    expect(def).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To start from an end result or deadline and calculate backwards to determine when to begin\./i)).toHaveAttribute(
      'title',
      'To start from an end result or deadline and calculate backwards to determine when to begin.'
    );
  });
});

describeSectionToggle(LABEL, 'back', 'workBack_section_expanded', /To start from an end result or deadline and calculate backwards to determine when to begin\./i, renderPage);

describeChevronAndColour(LABEL, 'back', renderPage);

describeDefaultImageCards(LABEL, 'back', 'workBack', /To start from an end result or deadline and calculate backwards to determine when to begin\./i, /If the project is due on Friday, we need to work back to see when we must start\./i, renderPage, getCard);
