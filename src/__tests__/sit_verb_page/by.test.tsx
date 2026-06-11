import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'SitVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('SitVerbPage — "by" section definitions', () => {
  it('renders definition for failing to take action', () => {
    renderPage();
    expandSection('by');
    expect(screen.getByText(/To fail to take action to stop something bad from happening\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('by');
    expect(screen.getByText(/To fail to take action to stop something bad from happening\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('by');
    expect(screen.getByText(/To fail to take action to stop something bad from happening\./i)).toHaveAttribute(
      'title',
      'To fail to take action to stop something bad from happening.'
    );
  });
});

describeSectionToggle(LABEL, 'by', 'sitBy_section_expanded', /To fail to take action to stop something bad from happening\./i, renderPage);

describeChevronAndColour(LABEL, 'by', renderPage);

describeDefaultImageCards(LABEL, 'by', 'sitBy', /To fail to take action to stop something bad from happening\./i, /I cannot sit by and let them make this terrible business decision\./i, renderPage, getCard);
