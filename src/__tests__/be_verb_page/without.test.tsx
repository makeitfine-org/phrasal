import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'BeVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('BeVerbPage — "without" section definitions', () => {
  it('renders definition for lacking something', () => {
    renderPage();
    expandSection('without');
    expect(screen.getByText(/To lack something\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('without');
    expect(screen.getByText(/To lack something\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('without');
    expect(screen.getByText(/To lack something\./i)).toHaveAttribute('title', 'To lack something.');
  });
});

describeSectionToggle(LABEL, 'without', 'beWithout_section_expanded', /To lack something\./i, renderPage);

describeChevronAndColour(LABEL, 'without', renderPage);

describeDefaultImageCards(LABEL, 'without', 'beWithout', /To lack something\./i, /We are without internet access at the moment/i, renderPage, getCard);
