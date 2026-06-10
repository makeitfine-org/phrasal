import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'LeaveVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('LeaveVerbPage — "over" section definitions', () => {
  it('renders definition for having a portion remaining', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To have a portion of something remaining after the rest has been used/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To have a portion of something remaining after the rest has been used/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To have a portion of something remaining after the rest has been used/i)).toHaveAttribute(
      'title',
      'To have a portion of something remaining after the rest has been used or eaten (almost always used in the passive as "left over").'
    );
  });
});

describeSectionToggle(LABEL, 'over', 'leaveOver_section_expanded', /To have a portion of something remaining after the rest has been used/i, renderPage);

describeChevronAndColour(LABEL, 'over', renderPage);

describeDefaultImageCards(LABEL, 'over', 'leaveOver', /To have a portion of something remaining after the rest has been used/i, /We have a lot of pizza left over from the project launch party\./i, renderPage, getCard);
