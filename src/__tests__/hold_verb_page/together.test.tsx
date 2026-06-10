import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'HoldVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('HoldVerbPage — "together" section definitions', () => {
  it('renders definition for staying united', () => {
    renderPage();
    expandSection('together');
    expect(screen.getByText(/To remain united or to keep a group united\./i)).toBeInTheDocument();
  });

  it('renders definition for remaining intact', () => {
    renderPage();
    expandSection('together');
    expect(screen.getByText(/To remain intact and not break into pieces\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('together');
    expect(screen.getByText(/To remain united or to keep a group united\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('together');
    expect(screen.getByText(/To remain united or to keep a group united\./i)).toHaveAttribute(
      'title',
      'To remain united or to keep a group united.'
    );
  });
});

describeSectionToggle(LABEL, 'together', 'holdTogether_section_expanded', /To remain united or to keep a group united\./i, renderPage);

describeChevronAndColour(LABEL, 'together', renderPage);

describeDefaultImageCards(LABEL, 'together', 'holdTogether', /To remain united or to keep a group united\./i, /A strong manager knows how to hold a team together during stressful project sprints\./i, renderPage, getCard);
