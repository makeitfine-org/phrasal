import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'WorkVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('WorkVerbPage — "together" section definitions', () => {
  it('renders definition for collaborating as a team', () => {
    renderPage();
    expandSection('together');
    expect(screen.getByText(/To collaborate or cooperate as a team\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('together');
    const def = screen.getByText(/To collaborate or cooperate as a team\./i);
    expect(def).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('together');
    expect(screen.getByText(/To collaborate or cooperate as a team\./i)).toHaveAttribute(
      'title',
      'To collaborate or cooperate as a team.'
    );
  });
});

describeSectionToggle(LABEL, 'together', 'workTogether_section_expanded', /To collaborate or cooperate as a team\./i, renderPage);

describeChevronAndColour(LABEL, 'together', renderPage);

describeDefaultImageCards(LABEL, 'together', 'workTogether', /To collaborate or cooperate as a team\./i, /If we work together, we can finish this much faster\./i, renderPage, getCard);
