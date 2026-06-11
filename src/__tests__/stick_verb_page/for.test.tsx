import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'StickVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('StickVerbPage — "for" section definitions', () => {
  it('renders definition for lacking something necessary', () => {
    renderPage();
    expandSection('for');
    expect(screen.getByText(/To lack something necessary/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('for');
    expect(screen.getByText(/To lack something necessary/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('for');
    expect(screen.getByText(/To lack something necessary/i)).toHaveAttribute(
      'title',
      'To lack something necessary (used in the passive form "be stuck for").'
    );
  });
});

describeSectionToggle(LABEL, 'for', 'stickFor_section_expanded', /To lack something necessary/i, renderPage);

describeChevronAndColour(LABEL, 'for', renderPage);

describeDefaultImageCards(LABEL, 'for', 'stickFor', /To lack something necessary/i, /We are stuck for ideas on how to improve the application's performance\./i, renderPage, getCard);
