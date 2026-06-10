import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'KeepVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('KeepVerbPage — "away" section definitions', () => {
  it('renders definition for avoiding going near something', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To avoid going near something or someone\./i)).toBeInTheDocument();
  });

  it('renders definition for preventing someone from going near', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To prevent someone or something from going near\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To avoid going near something or someone\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To avoid going near something or someone\./i)).toHaveAttribute(
      'title',
      'To avoid going near something or someone.'
    );
  });
});

describeSectionToggle(LABEL, 'away', 'keepAway_section_expanded', /To avoid going near something or someone\./i, renderPage);

describeChevronAndColour(LABEL, 'away', renderPage);

describeDefaultImageCards(LABEL, 'away', 'keepAway', /To avoid going near something or someone\./i, /You should keep away from that dog; it looks aggressive\./i, renderPage, getCard);
