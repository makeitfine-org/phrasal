import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'CutVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('CutVerbPage — "against" section definitions', () => {
  it('renders definition for going against the grain', () => {
    renderPage();
    expandSection('against');
    expect(screen.getByText(/To go against the grain, expectations, or natural order/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('against');
    expect(screen.getByText(/To go against the grain, expectations, or natural order/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('against');
    expect(screen.getByText(/To go against the grain, expectations, or natural order/i)).toHaveAttribute(
      'title',
      'To go against the grain, expectations, or natural order.'
    );
  });
});

describeSectionToggle(LABEL, 'against', 'cutAgainst_section_expanded', /To go against the grain, expectations, or natural order/i, renderPage);

describeChevronAndColour(LABEL, 'against', renderPage);

describeDefaultImageCards(LABEL, 'against', 'cutAgainst', /To go against the grain, expectations, or natural order/i, /His decision to expand the business cuts against/i, renderPage, getCard);
