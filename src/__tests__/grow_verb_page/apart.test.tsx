import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'GrowVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('GrowVerbPage — "apart" section definitions', () => {
  it('renders definition for gradually becoming less close in a relationship', () => {
    renderPage();
    expandSection('apart');
    expect(screen.getByText(/To gradually become less close in a relationship over time\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('apart');
    expect(screen.getByText(/To gradually become less close in a relationship over time\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('apart');
    expect(screen.getByText(/To gradually become less close in a relationship over time\./i)).toHaveAttribute(
      'title',
      'To gradually become less close in a relationship over time.'
    );
  });
});

describeSectionToggle(LABEL, 'apart', 'growApart_section_expanded', /To gradually become less close in a relationship over time\./i, renderPage);

describeChevronAndColour(LABEL, 'apart', renderPage);

describeDefaultImageCards(LABEL, 'apart', 'growApart', /To gradually become less close in a relationship over time\./i, /The co-founders grew apart over the years and eventually split the business\./i, renderPage, getCard);
