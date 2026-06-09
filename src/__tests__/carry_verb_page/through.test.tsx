import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'CarryVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('CarryVerbPage — "through" section definitions', () => {
  it('renders definition for completing a task despite difficulties', () => {
    renderPage();
    expandSection('through');
    expect(screen.getByText(/To complete a task successfully despite facing significant difficulties\./i)).toBeInTheDocument();
  });

  it('renders definition for helping someone survive a difficult situation', () => {
    renderPage();
    expandSection('through');
    expect(screen.getByText(/To help someone or something survive a difficult situation\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('through');
    expect(screen.getByText(/To complete a task successfully despite facing significant difficulties\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('through');
    expect(screen.getByText(/To complete a task successfully despite facing significant difficulties\./i)).toHaveAttribute(
      'title',
      'To complete a task successfully despite facing significant difficulties.'
    );
  });
});

describeSectionToggle(LABEL, 'through', 'carryThrough_section_expanded', /To complete a task successfully despite facing significant difficulties\./i, renderPage);

describeChevronAndColour(LABEL, 'through', renderPage);

describeDefaultImageCards(LABEL, 'through', 'carryThrough', /To complete a task successfully despite facing significant difficulties\./i, /carried the software release through to a successful launch/i, renderPage, getCard);
