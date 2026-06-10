import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'HoldVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('HoldVerbPage — "to" section definitions', () => {
  it('renders definition for making someone keep a promise', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To make someone keep a promise or follow a standard\./i)).toBeInTheDocument();
  });

  it('renders definition for continuing to believe an idea', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To continue to believe an idea or follow a plan, even when it is difficult\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To make someone keep a promise or follow a standard\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To make someone keep a promise or follow a standard\./i)).toHaveAttribute(
      'title',
      'To make someone keep a promise or follow a standard.'
    );
  });
});

describeSectionToggle(LABEL, 'to', 'holdTo_section_expanded', /To make someone keep a promise or follow a standard\./i, renderPage);

describeChevronAndColour(LABEL, 'to', renderPage);

describeDefaultImageCards(LABEL, 'to', 'holdTo', /To make someone keep a promise or follow a standard\./i, /We agreed to deliver the software by Friday, and the client will hold us to that deadline\./i, renderPage, getCard);
