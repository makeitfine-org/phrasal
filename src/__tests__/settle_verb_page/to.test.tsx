import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'SettleVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('SettleVerbPage — "to" section definitions', () => {
  it('renders definition for beginning full attention to a task', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To begin giving your full attention and effort to a task/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To begin giving your full attention and effort to a task/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To begin giving your full attention and effort to a task/i)).toHaveAttribute(
      'title',
      'To begin giving your full attention and effort to a task (very similar to "settle down to").'
    );
  });
});

describeSectionToggle(LABEL, 'to', 'settleTo_section_expanded', /To begin giving your full attention and effort to a task/i, renderPage);

describeChevronAndColour(LABEL, 'to', renderPage);

describeDefaultImageCards(LABEL, 'to', 'settleTo', /To begin giving your full attention and effort to a task/i, /Once everyone had their coffee, the team settled to the task of fixing the software bugs\./i, renderPage, getCard);
