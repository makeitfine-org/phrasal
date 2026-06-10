import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'PassVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('PassVerbPage — "in" section definitions', () => {
  it('renders definition for giving work to a teacher or manager', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To give work to a teacher or manager/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To give work to a teacher or manager/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To give work to a teacher or manager/i)).toHaveAttribute(
      'title',
      'To give work to a teacher or manager (similar to "hand in").'
    );
  });
});

describeSectionToggle(LABEL, 'in', 'passIn_section_expanded', /To give work to a teacher or manager/i, renderPage);

describeChevronAndColour(LABEL, 'in', renderPage);

describeDefaultImageCards(LABEL, 'in', 'passIn', /To give work to a teacher or manager/i, /Please remember to pass in your project reports by Friday afternoon\./i, renderPage, getCard);
