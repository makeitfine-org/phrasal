import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'CountVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('CountVerbPage — "up" section definitions', () => {
  it('renders definition for adding things together to find a total', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To add things together to find the total amount\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To add things together to find the total amount\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To add things together to find the total amount\./i)).toHaveAttribute(
      'title',
      'To add things together to find the total amount.'
    );
  });
});

describeSectionToggle(LABEL, 'up', 'countUp_section_expanded', /To add things together to find the total amount\./i, renderPage);

describeChevronAndColour(LABEL, 'up', renderPage);

describeDefaultImageCards(LABEL, 'up', 'countUp', /To add things together to find the total amount\./i, /Please count up all the expenses/i, renderPage, getCard);
