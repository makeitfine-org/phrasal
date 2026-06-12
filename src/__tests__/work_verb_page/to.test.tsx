import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'WorkVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('WorkVerbPage — "to" section definitions', () => {
  it('renders definition for operating according to a specific schedule or constraint', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To operate according to a specific schedule, rule, or constraint\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('to');
    const def = screen.getByText(/To operate according to a specific schedule, rule, or constraint\./i);
    expect(def).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To operate according to a specific schedule, rule, or constraint\./i)).toHaveAttribute(
      'title',
      'To operate according to a specific schedule, rule, or constraint.'
    );
  });
});

describeSectionToggle(LABEL, 'to', 'workTo_section_expanded', /To operate according to a specific schedule, rule, or constraint\./i, renderPage);

describeChevronAndColour(LABEL, 'to', renderPage);

describeDefaultImageCards(LABEL, 'to', 'workTo', /To operate according to a specific schedule, rule, or constraint\./i, /We are working to a very tight deadline\./i, renderPage, getCard);
