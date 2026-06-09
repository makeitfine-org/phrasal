import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'DoVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('DoVerbPage — "out" section definitions', () => {
  it('renders definition for cleaning or decorating a room thoroughly', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To clean or decorate a room thoroughly\./i)).toBeInTheDocument();
  });

  it('renders definition for cheating someone to take something', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To cheat someone in order to take something from them/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To clean or decorate a room thoroughly\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To clean or decorate a room thoroughly\./i)).toHaveAttribute(
      'title',
      'To clean or decorate a room thoroughly.'
    );
  });
});

describeSectionToggle(LABEL, 'out', 'doOut_section_expanded', /To clean or decorate a room thoroughly\./i, renderPage);

describeChevronAndColour(LABEL, 'out', renderPage);

describeDefaultImageCards(LABEL, 'out', 'doOut', /To clean or decorate a room thoroughly\./i, /do out the kitchen cupboards/i, renderPage, getCard);
