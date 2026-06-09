import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'FallVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('FallVerbPage — "away" section definitions', () => {
  it('renders definition for gradually decreasing', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To gradually decrease, fade, or disappear\./i)).toBeInTheDocument();
  });

  it('renders definition for breaking off and dropping', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To break off and drop to the ground\./i)).toBeInTheDocument();
  });

  it('renders definition for sloping downwards', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To slope downwards\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To gradually decrease, fade, or disappear\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To gradually decrease, fade, or disappear\./i)).toHaveAttribute(
      'title',
      'To gradually decrease, fade, or disappear.'
    );
  });
});

describeSectionToggle(LABEL, 'away', 'fallAway_section_expanded', /To gradually decrease, fade, or disappear\./i, renderPage);

describeChevronAndColour(LABEL, 'away', renderPage);

describeDefaultImageCards(LABEL, 'away', 'fallAway', /To gradually decrease, fade, or disappear\./i, /Client interest fell away when the prices increased\./i, renderPage, getCard);
