import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'BlowVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('BlowVerbPage — "into" section definitions', () => {
  it('renders definition for entering a room casually', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/To enter a room or building casually or loudly\./i)).toBeInTheDocument();
  });

  it('renders definition for pushing air into a device', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/To push air from your mouth into a device\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/To enter a room or building casually or loudly\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/To enter a room or building casually or loudly\./i)).toHaveAttribute(
      'title',
      'To enter a room or building casually or loudly.'
    );
  });
});

describeSectionToggle(LABEL, 'into', 'blowInto_section_expanded', /To enter a room or building casually or loudly\./i, renderPage);

describeChevronAndColour(LABEL, 'into', renderPage);

describeDefaultImageCards(LABEL, 'into', 'blowInto', /To enter a room or building casually or loudly\./i, /She blew into the office 20 minutes late/i, renderPage, getCard);
