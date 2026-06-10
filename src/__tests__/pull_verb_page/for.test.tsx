import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'PullVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('PullVerbPage — "for" section definitions', () => {
  it('renders definition for supporting someone\'s success', () => {
    renderPage();
    expandSection('for');
    expect(screen.getByText(/To support, hope, or cheer for someone's success/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('for');
    expect(screen.getByText(/To support, hope, or cheer for someone's success/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('for');
    expect(screen.getByText(/To support, hope, or cheer for someone's success/i)).toHaveAttribute(
      'title',
      "To support, hope, or cheer for someone's success."
    );
  });
});

describeSectionToggle(LABEL, 'for', 'pullFor_section_expanded', /To support, hope, or cheer for someone's success/i, renderPage);

describeChevronAndColour(LABEL, 'for', renderPage);

describeDefaultImageCards(LABEL, 'for', 'pullFor', /To support, hope, or cheer for someone's success/i, /We are all pulling for you/i, renderPage, getCard);
