import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'SettleVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('SettleVerbPage — "over" section definitions', () => {
  it('renders definition for descending and covering something', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To descend and cover something/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To descend and cover something/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To descend and cover something/i)).toHaveAttribute(
      'title',
      'To descend and cover something (often used to describe weather, a feeling, or a mood in a room).'
    );
  });
});

describeSectionToggle(LABEL, 'over', 'settleOver_section_expanded', /To descend and cover something/i, renderPage);

describeChevronAndColour(LABEL, 'over', renderPage);

describeDefaultImageCards(LABEL, 'over', 'settleOver', /To descend and cover something/i, /A deep silence settled over the boardroom when the team saw the terrible financial results\./i, renderPage, getCard);
