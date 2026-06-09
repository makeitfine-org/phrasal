import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'CheckVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('CheckVerbPage — "down" section definitions', () => {
  it('renders definition for going down a list of options', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To go down a list of options until you find one that works/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To go down a list of options until you find one that works/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To go down a list of options until you find one that works/i)).toHaveAttribute(
      'title',
      'To go down a list of options until you find one that works (often used in processes or sports).'
    );
  });
});

describeSectionToggle(LABEL, 'down', 'checkDown_section_expanded', /To go down a list of options until you find one that works/i, renderPage);

describeChevronAndColour(LABEL, 'down', renderPage);

describeDefaultImageCards(LABEL, 'down', 'checkDown', /To go down a list of options until you find one that works/i, /If the main database fails, the system will check down the list/i, renderPage, getCard);
