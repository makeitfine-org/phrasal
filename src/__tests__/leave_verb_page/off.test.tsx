import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'LeaveVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('LeaveVerbPage — "off" section definitions', () => {
  it('renders definition for stopping doing something', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To stop doing something/i)).toBeInTheDocument();
  });

  it('renders definition for excluding from a list', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To purposefully or accidentally exclude someone or something from a list/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To stop doing something/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To stop doing something/i)).toHaveAttribute(
      'title',
      'To stop doing something.'
    );
  });
});

describeSectionToggle(LABEL, 'off', 'leaveOff_section_expanded', /To stop doing something/i, renderPage);

describeChevronAndColour(LABEL, 'off', renderPage);

describeDefaultImageCards(LABEL, 'off', 'leaveOff', /To stop doing something/i, /Let's start the meeting exactly where we left off yesterday\./i, renderPage, getCard);
