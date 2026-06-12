import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'WorkVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('WorkVerbPage — "against" section definitions', () => {
  it('renders definition for acting as a disadvantage', () => {
    renderPage();
    expandSection('against');
    expect(screen.getByText(/To make it harder for someone to succeed; to act as a disadvantage\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('against');
    const def = screen.getByText(/To make it harder for someone to succeed; to act as a disadvantage\./i);
    expect(def).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('against');
    expect(screen.getByText(/To make it harder for someone to succeed; to act as a disadvantage\./i)).toHaveAttribute(
      'title',
      'To make it harder for someone to succeed; to act as a disadvantage.'
    );
  });
});

describeSectionToggle(LABEL, 'against', 'workAgainst_section_expanded', /To make it harder for someone to succeed; to act as a disadvantage\./i, renderPage);

describeChevronAndColour(LABEL, 'against', renderPage);

describeDefaultImageCards(LABEL, 'against', 'workAgainst', /To make it harder for someone to succeed; to act as a disadvantage\./i, /His lack of formal experience might work against him in the interview\./i, renderPage, getCard);
