import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'BlowVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('BlowVerbPage — "away" section definitions', () => {
  it('renders definition for impressing someone', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To impress someone very much\./i)).toBeInTheDocument();
  });

  it('renders definition for moving by wind', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To move something away using the wind\./i)).toBeInTheDocument();
  });

  it('renders definition for defeating competitors', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To defeat competitors easily or kill someone\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To impress someone very much\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To impress someone very much\./i)).toHaveAttribute(
      'title',
      'To impress someone very much.'
    );
  });
});

describeSectionToggle(LABEL, 'away', 'blowAway_section_expanded', /To impress someone very much\./i, renderPage);

describeChevronAndColour(LABEL, 'away', renderPage);

describeDefaultImageCards(LABEL, 'away', 'blowAway', /To impress someone very much\./i, /completely blew me away/i, renderPage, getCard);
