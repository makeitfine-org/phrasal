import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'DressVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('DressVerbPage — "back" section definitions', () => {
  it('renders definition for stepping backward to form a straight line', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To step backward in order to form a straight line/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To step backward in order to form a straight line/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To step backward in order to form a straight line/i)).toHaveAttribute(
      'title',
      'To step backward in order to form a straight line (military / marching context).'
    );
  });
});

describeSectionToggle(LABEL, 'back', 'dressBack_section_expanded', /To step backward in order to form a straight line/i, renderPage);

describeChevronAndColour(LABEL, 'back', renderPage);

describeDefaultImageCards(LABEL, 'back', 'dressBack', /To step backward in order to form a straight line/i, /The front row had to dress back/i, renderPage, getCard);
