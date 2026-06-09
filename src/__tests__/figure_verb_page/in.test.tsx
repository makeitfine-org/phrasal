import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'FigureVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('FigureVerbPage — "in" section definitions', () => {
  it('renders definition for including a detail in a calculation or plan', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To include a specific detail or amount when making a calculation or plan\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To include a specific detail or amount when making a calculation or plan\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To include a specific detail or amount when making a calculation or plan\./i)).toHaveAttribute(
      'title',
      'To include a specific detail or amount when making a calculation or plan.'
    );
  });
});

describeSectionToggle(LABEL, 'in', 'figureIn_section_expanded', /To include a specific detail or amount when making a calculation or plan\./i, renderPage);

describeChevronAndColour(LABEL, 'in', renderPage);

describeDefaultImageCards(LABEL, 'in', 'figureIn', /To include a specific detail or amount when making a calculation or plan\./i, /When estimating the project timeline, you must figure in the time needed for testing and fixing bugs\./i, renderPage, getCard);
