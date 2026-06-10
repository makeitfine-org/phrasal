import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'LeaveVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('LeaveVerbPage — "back" section definitions', () => {
  it('renders definition for making a student repeat a school year', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To make a student repeat a school year/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To make a student repeat a school year/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To make a student repeat a school year/i)).toHaveAttribute(
      'title',
      'To make a student repeat a school year because their grades were too low (mainly used in US English).'
    );
  });
});

describeSectionToggle(LABEL, 'back', 'leaveBack_section_expanded', /To make a student repeat a school year/i, renderPage);

describeChevronAndColour(LABEL, 'back', renderPage);

describeDefaultImageCards(LABEL, 'back', 'leaveBack', /To make a student repeat a school year/i, /He failed his math and science exams, so the school left him back a year\./i, renderPage, getCard);
