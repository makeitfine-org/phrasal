import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'StandVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('StandVerbPage — "up" section definitions', () => {
  it('renders definition for rising to your feet', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To rise to your feet\./i)).toBeInTheDocument();
  });

  it('renders definition for remaining valid or strong when tested', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To remain valid, true, or strong when tested\./i)).toBeInTheDocument();
  });

  it('renders definition for failing to keep an appointment', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To fail to keep an appointment or date with someone\./i)).toBeInTheDocument();
  });

  it('all 3 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To rise to your feet\./i)).toHaveClass('truncate');
    expect(screen.getByText(/To remain valid, true, or strong when tested\./i)).toHaveClass('truncate');
    expect(screen.getByText(/To fail to keep an appointment or date with someone\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To rise to your feet\./i)).toHaveAttribute(
      'title',
      'To rise to your feet.'
    );
  });
});

describeSectionToggle(LABEL, 'up', 'standUp_section_expanded', /To rise to your feet\./i, renderPage);

describeChevronAndColour(LABEL, 'up', renderPage);

describeDefaultImageCards(LABEL, 'up', 'standUp', /To rise to your feet\./i, /Please stand up when the clients enter the room\./i, renderPage, getCard);
