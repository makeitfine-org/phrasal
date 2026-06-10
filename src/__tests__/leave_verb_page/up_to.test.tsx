import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'LeaveVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('LeaveVerbPage — "up (to)" section definitions', () => {
  it('renders definition for letting someone else make a decision', () => {
    renderPage();
    expandSection('up (to)');
    expect(screen.getByText(/To let someone else make a decision or choose an option/i)).toBeInTheDocument();
  });

  it('renders definition for letting a decoration remain hanging', () => {
    renderPage();
    expandSection('up (to)');
    expect(screen.getByText(/To let a physical object or decoration remain hanging/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('up (to)');
    expect(screen.getByText(/To let someone else make a decision or choose an option/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('up (to)');
    expect(screen.getByText(/To let someone else make a decision or choose an option/i)).toHaveAttribute(
      'title',
      'To let someone else make a decision or choose an option.'
    );
  });
});

describeSectionToggle(LABEL, 'up (to)', 'leaveUp_section_expanded', /To let someone else make a decision or choose an option/i, renderPage);

describeChevronAndColour(LABEL, 'up (to)', renderPage);

describeDefaultImageCards(LABEL, 'up (to)', 'leaveUp', /To let someone else make a decision or choose an option/i, /We can eat pizza or sushi for lunch; I will leave it up to you\./i, renderPage, getCard);
