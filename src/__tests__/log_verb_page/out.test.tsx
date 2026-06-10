import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'LogVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('LogVerbPage — "out" section definitions', () => {
  it('renders definition for safely closing a session', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To safely close your session and disconnect from a system/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To safely close your session and disconnect from a system/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To safely close your session and disconnect from a system/i)).toHaveAttribute(
      'title',
      'To safely close your session and disconnect from a system, application, or website.'
    );
  });
});

describeSectionToggle(LABEL, 'out', 'logOut_section_expanded', /To safely close your session and disconnect from a system/i, renderPage);

describeChevronAndColour(LABEL, 'out', renderPage);

describeDefaultImageCards(LABEL, 'out', 'logOut', /To safely close your session and disconnect from a system/i, /Always remember to log out of the database when you finish your shift\./i, renderPage, getCard);
