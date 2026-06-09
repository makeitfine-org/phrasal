import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'FallVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('FallVerbPage — "on / upon" section definitions', () => {
  it("renders definition for becoming someone's duty or responsibility", () => {
    renderPage();
    expandSection('on / upon');
    expect(screen.getByText(/To become someone's duty or responsibility\./i)).toBeInTheDocument();
  });

  it('renders definition for happening on a specific date', () => {
    renderPage();
    expandSection('on / upon');
    expect(screen.getByText(/To happen on a specific date\./i)).toBeInTheDocument();
  });

  it('renders definition for attacking eagerly or suddenly', () => {
    renderPage();
    expandSection('on / upon');
    expect(screen.getByText(/To attack eagerly or suddenly\./i)).toBeInTheDocument();
  });

  it('renders definition for experiencing difficult times', () => {
    renderPage();
    expandSection('on / upon');
    expect(screen.getByText(/To experience difficult times \(idiom: fall on hard times\)\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('on / upon');
    expect(screen.getByText(/To become someone's duty or responsibility\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('on / upon');
    expect(screen.getByText(/To become someone's duty or responsibility\./i)).toHaveAttribute(
      'title',
      "To become someone's duty or responsibility."
    );
  });
});

describeSectionToggle(LABEL, 'on / upon', 'fallOn_section_expanded', /To become someone's duty or responsibility\./i, renderPage);

describeChevronAndColour(LABEL, 'on / upon', renderPage);

describeDefaultImageCards(LABEL, 'on / upon', 'fallOn', /To become someone's duty or responsibility\./i, /When the CEO resigned, the responsibility fell on the vice president\./i, renderPage, getCard);
