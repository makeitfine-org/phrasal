import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'CarryVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('CarryVerbPage — "forward" section definitions', () => {
  it('renders definition for making a project progress', () => {
    renderPage();
    expandSection('forward');
    expect(screen.getByText(/To make a project or idea progress to the next stage\./i)).toBeInTheDocument();
  });

  it('renders definition for transferring a financial total', () => {
    renderPage();
    expandSection('forward');
    expect(screen.getByText(/To transfer a financial total or a specific benefit/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('forward');
    expect(screen.getByText(/To make a project or idea progress to the next stage\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('forward');
    expect(screen.getByText(/To make a project or idea progress to the next stage\./i)).toHaveAttribute(
      'title',
      'To make a project or idea progress to the next stage.'
    );
  });
});

describeSectionToggle(LABEL, 'forward', 'carryForward_section_expanded', /To make a project or idea progress to the next stage\./i, renderPage);

describeChevronAndColour(LABEL, 'forward', renderPage);

describeDefaultImageCards(LABEL, 'forward', 'carryForward', /To make a project or idea progress to the next stage\./i, /carry this initiative forward/i, renderPage, getCard);
