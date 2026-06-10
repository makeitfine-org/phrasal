import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'KnockVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('KnockVerbPage — "through" section definitions', () => {
  it('renders definition for removing a wall to connect rooms', () => {
    renderPage();
    expandSection('through');
    expect(screen.getByText(/To remove a wall between two spaces to connect rooms\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('through');
    expect(screen.getByText(/To remove a wall between two spaces to connect rooms\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('through');
    expect(screen.getByText(/To remove a wall between two spaces to connect rooms\./i)).toHaveAttribute(
      'title',
      'To remove a wall between two spaces to connect rooms.'
    );
  });
});

describeSectionToggle(LABEL, 'through', 'knockThrough_section_expanded', /To remove a wall between two spaces to connect rooms\./i, renderPage);

describeChevronAndColour(LABEL, 'through', renderPage);

describeDefaultImageCards(LABEL, 'through', 'knockThrough', /To remove a wall between two spaces to connect rooms\./i, /We knocked through the wall to create an open-plan office\./i, renderPage, getCard);
