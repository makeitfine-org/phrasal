import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'BeVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('BeVerbPage — "ahead" section definitions', () => {
  it('renders definition for being further advanced', () => {
    renderPage();
    expandSection('ahead');
    expect(screen.getByText(/To be winning or further advanced than expected\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('ahead');
    expect(screen.getByText(/To be winning or further advanced than expected\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('ahead');
    expect(screen.getByText(/To be winning or further advanced than expected\./i)).toHaveAttribute(
      'title',
      'To be winning or further advanced than expected.'
    );
  });
});

describeSectionToggle(LABEL, 'ahead', 'beAhead_section_expanded', /To be winning or further advanced than expected\./i, renderPage);

describeChevronAndColour(LABEL, 'ahead', renderPage);

describeDefaultImageCards(LABEL, 'ahead', 'beAhead', /To be winning or further advanced than expected\./i, /Our development team is ahead of schedule/i, renderPage, getCard);
