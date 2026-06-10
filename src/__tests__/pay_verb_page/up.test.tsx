import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'PayVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('PayVerbPage — "up" section definitions', () => {
  it('renders definition for giving money you owe when forced to', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To give someone the money you owe them, especially when you do not want to/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To give someone the money you owe them, especially when you do not want to/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To give someone the money you owe them, especially when you do not want to/i)).toHaveAttribute(
      'title',
      'To give someone the money you owe them, especially when you do not want to or when you are forced to do it.'
    );
  });
});

describeSectionToggle(LABEL, 'up', 'payUp_section_expanded', /To give someone the money you owe them, especially when you do not want to/i, renderPage);

describeChevronAndColour(LABEL, 'up', renderPage);

describeDefaultImageCards(LABEL, 'up', 'payUp', /To give someone the money you owe them, especially when you do not want to/i, /The supplier threatened legal action until the client finally paid up\./i, renderPage, getCard);
