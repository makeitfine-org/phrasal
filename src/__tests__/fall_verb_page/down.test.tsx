import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'FallVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('FallVerbPage — "down" section definitions', () => {
  it('renders definition for being proven weak or incorrect', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To be proven weak, inadequate, or incorrect \(often an argument or plan\)\./i)).toBeInTheDocument();
  });

  it('renders definition for dropping to the ground', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To drop to the ground \(literal\)\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To be proven weak, inadequate, or incorrect \(often an argument or plan\)\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To be proven weak, inadequate, or incorrect \(often an argument or plan\)\./i)).toHaveAttribute(
      'title',
      'To be proven weak, inadequate, or incorrect (often an argument or plan).'
    );
  });
});

describeSectionToggle(LABEL, 'down', 'fallDown_section_expanded', /To be proven weak, inadequate, or incorrect \(often an argument or plan\)\./i, renderPage);

describeChevronAndColour(LABEL, 'down', renderPage);

describeDefaultImageCards(LABEL, 'down', 'fallDown', /To be proven weak, inadequate, or incorrect \(often an argument or plan\)\./i, /His business strategy falls down when you look at the financial data\./i, renderPage, getCard);
