import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'StandVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('StandVerbPage — "down" section definitions', () => {
  it('renders definition for resigning from leadership', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To resign or leave a position of leadership\./i)).toBeInTheDocument();
  });

  it('renders definition for relaxing from security readiness', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To relax from a state of military or security readiness\./i)).toBeInTheDocument();
  });

  it('all 2 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To resign or leave a position of leadership\./i)).toHaveClass('truncate');
    expect(screen.getByText(/To relax from a state of military or security readiness\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To resign or leave a position of leadership\./i)).toHaveAttribute(
      'title',
      'To resign or leave a position of leadership.'
    );
  });
});

describeSectionToggle(LABEL, 'down', 'standDown_section_expanded', /To resign or leave a position of leadership\./i, renderPage);

describeChevronAndColour(LABEL, 'down', renderPage);

describeDefaultImageCards(LABEL, 'down', 'standDown', /To resign or leave a position of leadership\./i, /The CEO agreed to stand down after ten years in charge\./i, renderPage, getCard);
