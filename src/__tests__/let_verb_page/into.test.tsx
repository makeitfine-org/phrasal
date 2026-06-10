import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'LetVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('LetVerbPage — "into" section definitions', () => {
  it('renders definition for allowing someone to enter a building', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/To allow someone to enter a room or building/i)).toBeInTheDocument();
  });

  it('renders definition for sharing a secret', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/To share a secret with someone/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/To allow someone to enter a room or building/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/To allow someone to enter a room or building/i)).toHaveAttribute(
      'title',
      'To allow someone to enter a room or building.'
    );
  });
});

describeSectionToggle(LABEL, 'into', 'letInto_section_expanded', /To allow someone to enter a room or building/i, renderPage);

describeChevronAndColour(LABEL, 'into', renderPage);

describeDefaultImageCards(LABEL, 'into', 'letInto', /To allow someone to enter a room or building/i, /The security guard let us into the server room\./i, renderPage, getCard);
