import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'FigureVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('FigureVerbPage — "up" section definitions', () => {
  it('renders definition for adding numbers to calculate a total', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To add numbers together to calculate a total amount\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To add numbers together to calculate a total amount\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To add numbers together to calculate a total amount\./i)).toHaveAttribute(
      'title',
      'To add numbers together to calculate a total amount.'
    );
  });
});

describeSectionToggle(LABEL, 'up', 'figureUp_section_expanded', /To add numbers together to calculate a total amount\./i, renderPage);

describeChevronAndColour(LABEL, 'up', renderPage);

describeDefaultImageCards(LABEL, 'up', 'figureUp', /To add numbers together to calculate a total amount\./i, /Let me figure up the total hours we spent on the server migration last month\./i, renderPage, getCard);
