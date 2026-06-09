import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'CarryVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('CarryVerbPage — "out" section definitions', () => {
  it('renders definition for performing a task', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To perform, execute, or complete a task/i)).toBeInTheDocument();
  });

  it('renders definition for fulfilling a promise', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To fulfill a promise or a threat\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To perform, execute, or complete a task/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To perform, execute, or complete a task/i)).toHaveAttribute(
      'title',
      'To perform, execute, or complete a task, instruction, experiment, or plan.'
    );
  });
});

describeSectionToggle(LABEL, 'out', 'carryOut_section_expanded', /To perform, execute, or complete a task/i, renderPage);

describeChevronAndColour(LABEL, 'out', renderPage);

describeDefaultImageCards(LABEL, 'out', 'carryOut', /To perform, execute, or complete a task/i, /carried out the system update over the weekend/i, renderPage, getCard);
