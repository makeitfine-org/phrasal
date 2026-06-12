import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'WorkVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('WorkVerbPage — "ahead" section definitions', () => {
  it('renders definition for completing tasks before they are due', () => {
    renderPage();
    expandSection('ahead');
    expect(screen.getByText(/To complete tasks before they are due or scheduled\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('ahead');
    const def = screen.getByText(/To complete tasks before they are due or scheduled\./i);
    expect(def).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('ahead');
    expect(screen.getByText(/To complete tasks before they are due or scheduled\./i)).toHaveAttribute(
      'title',
      'To complete tasks before they are due or scheduled.'
    );
  });
});

describeSectionToggle(LABEL, 'ahead', 'workAhead_section_expanded', /To complete tasks before they are due or scheduled\./i, renderPage);

describeChevronAndColour(LABEL, 'ahead', renderPage);

describeDefaultImageCards(LABEL, 'ahead', 'workAhead', /To complete tasks before they are due or scheduled\./i, /Whenever I have free time, I try to work ahead on my assignments\./i, renderPage, getCard);
