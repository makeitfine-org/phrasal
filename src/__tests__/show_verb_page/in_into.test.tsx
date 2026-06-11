import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'ShowVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('ShowVerbPage — "in / into" section definitions', () => {
  it('renders definition for leading someone inside a building (show in)', () => {
    renderPage();
    expandSection('in / into');
    expect(screen.getByText(/To act as a guide and lead someone inside a room or building/i)).toBeInTheDocument();
  });

  it('renders definition for leading someone into a specific room (show into)', () => {
    renderPage();
    expandSection('in / into');
    expect(screen.getByText(/To lead someone into a specific room/i)).toBeInTheDocument();
  });

  it('all 2 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('in / into');
    expect(screen.getByText(/To act as a guide and lead someone inside a room or building/i)).toHaveClass('truncate');
    expect(screen.getByText(/To lead someone into a specific room/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('in / into');
    expect(screen.getByText(/To act as a guide and lead someone inside a room or building/i)).toHaveAttribute(
      'title',
      'To act as a guide and lead someone inside a room or building (show in).'
    );
  });
});

describeSectionToggle(LABEL, 'in / into', 'showIn_section_expanded', /To act as a guide and lead someone inside a room or building/i, renderPage);

describeChevronAndColour(LABEL, 'in / into', renderPage);

describeDefaultImageCards(LABEL, 'in / into', 'showIn', /To act as a guide and lead someone inside a room or building/i, /When the candidates arrive, please show them in\./i, renderPage, getCard);
