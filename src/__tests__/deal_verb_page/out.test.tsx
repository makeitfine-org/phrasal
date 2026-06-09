import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'DealVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('DealVerbPage — "out" section definitions', () => {
  it('renders definition for distributing things among a group', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To distribute or share things among a group of people\./i)).toBeInTheDocument();
  });

  it('renders definition for giving a punishment', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To give a punishment to someone\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To distribute or share things among a group of people\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To distribute or share things among a group of people\./i)).toHaveAttribute(
      'title',
      'To distribute or share things among a group of people.'
    );
  });
});

describeSectionToggle(LABEL, 'out', 'dealOut_section_expanded', /To distribute or share things among a group of people\./i, renderPage);

describeChevronAndColour(LABEL, 'out', renderPage);

describeDefaultImageCards(LABEL, 'out', 'dealOut', /To distribute or share things among a group of people\./i, /The manager dealt out the new project assignments/i, renderPage, getCard);
