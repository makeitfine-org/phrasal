import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'LetVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('LetVerbPage — "down" section definitions', () => {
  it('renders definition for disappointing someone', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To disappoint someone by failing to do what you promised/i)).toBeInTheDocument();
  });

  it('renders definition for making clothing longer', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To make clothing longer/i)).toBeInTheDocument();
  });

  it('renders definition for allowing air to escape', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To allow air to escape from something/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To disappoint someone by failing to do what you promised/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To disappoint someone by failing to do what you promised/i)).toHaveAttribute(
      'title',
      'To disappoint someone by failing to do what you promised or what they expected.'
    );
  });
});

describeSectionToggle(LABEL, 'down', 'letDown_section_expanded', /To disappoint someone by failing to do what you promised/i, renderPage);

describeChevronAndColour(LABEL, 'down', renderPage);

describeDefaultImageCards(LABEL, 'down', 'letDown', /To disappoint someone by failing to do what you promised/i, /The manager promised a bonus, but she let the team down by canceling it\./i, renderPage, getCard);
