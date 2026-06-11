import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'SettleVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('SettleVerbPage — "for" section definitions', () => {
  it('renders definition for accepting something less than desired', () => {
    renderPage();
    expandSection('for');
    expect(screen.getByText(/To accept something that is available, even though it is not exactly what you wanted or hoped for\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('for');
    expect(screen.getByText(/To accept something that is available, even though it is not exactly what you wanted or hoped for\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('for');
    expect(screen.getByText(/To accept something that is available, even though it is not exactly what you wanted or hoped for\./i)).toHaveAttribute(
      'title',
      'To accept something that is available, even though it is not exactly what you wanted or hoped for.'
    );
  });
});

describeSectionToggle(LABEL, 'for', 'settleFor_section_expanded', /To accept something that is available, even though it is not exactly what you wanted or hoped for\./i, renderPage);

describeChevronAndColour(LABEL, 'for', renderPage);

describeDefaultImageCards(LABEL, 'for', 'settleFor', /To accept something that is available, even though it is not exactly what you wanted or hoped for\./i, /We wanted to hire a senior Java developer, but because of the budget, we had to settle for a mid-level programmer\./i, renderPage, getCard);
