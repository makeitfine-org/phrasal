import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'FigureVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('FigureVerbPage — "out" section definitions', () => {
  it('renders definition for understanding a problem and finding a solution', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To understand a problem and find a solution\./i)).toBeInTheDocument();
  });

  it('renders definition for calculating an amount or cost', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To calculate an amount or cost\./i)).toBeInTheDocument();
  });

  it("renders definition for understanding someone's character", () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To understand someone's character, behavior, or motives\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To understand a problem and find a solution\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To understand a problem and find a solution\./i)).toHaveAttribute(
      'title',
      'To understand a problem and find a solution.'
    );
  });
});

describeSectionToggle(LABEL, 'out', 'figureOut_section_expanded', /To understand a problem and find a solution\./i, renderPage);

describeChevronAndColour(LABEL, 'out', renderPage);

describeDefaultImageCards(LABEL, 'out', 'figureOut', /To understand a problem and find a solution\./i, /It took the team three hours to figure out why the Java application was crashing\./i, renderPage, getCard);
