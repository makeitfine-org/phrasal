import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'PassVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('PassVerbPage — "away" section definitions', () => {
  it('renders definition for dying (polite phrase)', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To die \(a polite and respectful phrase\)/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To die \(a polite and respectful phrase\)/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To die \(a polite and respectful phrase\)/i)).toHaveAttribute(
      'title',
      'To die (a polite and respectful phrase).'
    );
  });
});

describeSectionToggle(LABEL, 'away', 'passAway_section_expanded', /To die \(a polite and respectful phrase\)/i, renderPage);

describeChevronAndColour(LABEL, 'away', renderPage);

describeDefaultImageCards(LABEL, 'away', 'passAway', /To die \(a polite and respectful phrase\)/i, /The founder of the company passed away peacefully last year\./i, renderPage, getCard);
