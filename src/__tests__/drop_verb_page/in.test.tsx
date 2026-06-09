import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'DropVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('DropVerbPage — "in" section definitions', () => {
  it('renders definition for making a short informal unplanned visit', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To make a short, informal visit without arranging it in advance\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To make a short, informal visit without arranging it in advance\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To make a short, informal visit without arranging it in advance\./i)).toHaveAttribute(
      'title',
      'To make a short, informal visit without arranging it in advance.'
    );
  });
});

describeSectionToggle(LABEL, 'in', 'dropIn_section_expanded', /To make a short, informal visit without arranging it in advance\./i, renderPage);

describeChevronAndColour(LABEL, 'in', renderPage);

describeDefaultImageCards(LABEL, 'in', 'dropIn', /To make a short, informal visit without arranging it in advance\./i, /Feel free to drop in if you have any questions/i, renderPage, getCard);
