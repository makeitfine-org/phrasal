import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'CheckVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('CheckVerbPage — "off" section definitions', () => {
  it('renders definition for marking an item on a list', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To mark an item on a list to show that it has been completed or verified\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To mark an item on a list to show that it has been completed or verified\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To mark an item on a list to show that it has been completed or verified\./i)).toHaveAttribute(
      'title',
      'To mark an item on a list to show that it has been completed or verified.'
    );
  });
});

describeSectionToggle(LABEL, 'off', 'checkOff_section_expanded', /To mark an item on a list to show that it has been completed or verified\./i, renderPage);

describeChevronAndColour(LABEL, 'off', renderPage);

describeDefaultImageCards(LABEL, 'off', 'checkOff', /To mark an item on a list to show that it has been completed or verified\./i, /After completing the code review, I checked off the task in Jira\./i, renderPage, getCard);
