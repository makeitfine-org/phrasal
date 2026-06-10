import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'LeaveVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('LeaveVerbPage — "in" section definitions', () => {
  it('renders definition for not removing something', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To not remove something; to let it stay where it is/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To not remove something; to let it stay where it is/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To not remove something; to let it stay where it is/i)).toHaveAttribute(
      'title',
      'To not remove something; to let it stay where it is.'
    );
  });
});

describeSectionToggle(LABEL, 'in', 'leaveIn_section_expanded', /To not remove something; to let it stay where it is/i, renderPage);

describeChevronAndColour(LABEL, 'in', renderPage);

describeDefaultImageCards(LABEL, 'in', 'leaveIn', /To not remove something; to let it stay where it is/i, /The editor decided to leave that paragraph in the final article\./i, renderPage, getCard);
