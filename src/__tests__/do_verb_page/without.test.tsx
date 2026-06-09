import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'DoVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('DoVerbPage — "without" section definitions', () => {
  it('renders definition for managing to survive without something needed', () => {
    renderPage();
    expandSection('without');
    expect(screen.getByText(/To manage to survive or continue even when you do not have something you need\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('without');
    expect(screen.getByText(/To manage to survive or continue even when you do not have something you need\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('without');
    expect(screen.getByText(/To manage to survive or continue even when you do not have something you need\./i)).toHaveAttribute(
      'title',
      'To manage to survive or continue even when you do not have something you need.'
    );
  });
});

describeSectionToggle(LABEL, 'without', 'doWithout_section_expanded', /To manage to survive or continue even when you do not have something you need\./i, renderPage);

describeChevronAndColour(LABEL, 'without', renderPage);

describeDefaultImageCards(LABEL, 'without', 'doWithout', /To manage to survive or continue even when you do not have something you need\./i, /we will just have to do without/i, renderPage, getCard);
