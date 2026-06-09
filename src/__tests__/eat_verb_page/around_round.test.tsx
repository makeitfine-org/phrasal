import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'EatVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('EatVerbPage — "around / round" section definitions', () => {
  it('renders definition for avoiding a specific ingredient', () => {
    renderPage();
    expandSection('around / round');
    expect(screen.getByText(/To consume a meal while deliberately avoiding a specific ingredient on the plate\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('around / round');
    expect(screen.getByText(/To consume a meal while deliberately avoiding a specific ingredient on the plate\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('around / round');
    expect(screen.getByText(/To consume a meal while deliberately avoiding a specific ingredient on the plate\./i)).toHaveAttribute(
      'title',
      'To consume a meal while deliberately avoiding a specific ingredient on the plate.'
    );
  });
});

describeSectionToggle(LABEL, 'around / round', 'eatAround_section_expanded', /To consume a meal while deliberately avoiding a specific ingredient on the plate\./i, renderPage);

describeChevronAndColour(LABEL, 'around / round', renderPage);

describeDefaultImageCards(LABEL, 'around / round', 'eatAround', /To consume a meal while deliberately avoiding a specific ingredient on the plate\./i, /The child absolutely hated mushrooms and carefully ate around them\./i, renderPage, getCard);
