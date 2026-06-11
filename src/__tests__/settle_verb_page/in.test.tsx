import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'SettleVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('SettleVerbPage — "in" section definitions', () => {
  it('renders definition for becoming comfortable in a new environment', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To become comfortable, relaxed, and familiar in a new home, environment, or job\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To become comfortable, relaxed, and familiar in a new home, environment, or job\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To become comfortable, relaxed, and familiar in a new home, environment, or job\./i)).toHaveAttribute(
      'title',
      'To become comfortable, relaxed, and familiar in a new home, environment, or job.'
    );
  });
});

describeSectionToggle(LABEL, 'in', 'settleIn_section_expanded', /To become comfortable, relaxed, and familiar in a new home, environment, or job\./i, renderPage);

describeChevronAndColour(LABEL, 'in', renderPage);

describeDefaultImageCards(LABEL, 'in', 'settleIn', /To become comfortable, relaxed, and familiar in a new home, environment, or job\./i, /It takes about a month for a new employee to fully settle in and learn the company culture\./i, renderPage, getCard);
