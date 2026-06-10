import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'LeaveVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('LeaveVerbPage — "for" section definitions', () => {
  it('renders definition for beginning a journey', () => {
    renderPage();
    expandSection('for');
    expect(screen.getByText(/To begin a journey with a specific destination in mind/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('for');
    expect(screen.getByText(/To begin a journey with a specific destination in mind/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('for');
    expect(screen.getByText(/To begin a journey with a specific destination in mind/i)).toHaveAttribute(
      'title',
      'To begin a journey with a specific destination in mind.'
    );
  });
});

describeSectionToggle(LABEL, 'for', 'leaveFor_section_expanded', /To begin a journey with a specific destination in mind/i, renderPage);

describeChevronAndColour(LABEL, 'for', renderPage);

describeDefaultImageCards(LABEL, 'for', 'leaveFor', /To begin a journey with a specific destination in mind/i, /We need to pack our bags because we leave for London early tomorrow morning\./i, renderPage, getCard);
