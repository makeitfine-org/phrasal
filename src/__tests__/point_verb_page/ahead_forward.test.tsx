import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'PointVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('PointVerbPage — "ahead / forward" section definitions', () => {
  it('renders definition for looking toward or indicating the future', () => {
    renderPage();
    expandSection('ahead / forward');
    expect(screen.getByText(/To look toward or indicate the future/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('ahead / forward');
    expect(screen.getByText(/To look toward or indicate the future/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('ahead / forward');
    expect(screen.getByText(/To look toward or indicate the future/i)).toHaveAttribute(
      'title',
      'To look toward or indicate the future.'
    );
  });
});

describeSectionToggle(LABEL, 'ahead / forward', 'pointAhead_section_expanded', /To look toward or indicate the future/i, renderPage);

describeChevronAndColour(LABEL, 'ahead / forward', renderPage);

describeDefaultImageCards(LABEL, 'ahead / forward', 'pointAhead', /To look toward or indicate the future/i, /This new business model points forward/i, renderPage, getCard);
