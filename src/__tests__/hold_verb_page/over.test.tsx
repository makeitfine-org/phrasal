import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'HoldVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('HoldVerbPage — "over" section definitions', () => {
  it('renders definition for postponing a discussion', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To postpone or delay an event or discussion until a later time\./i)).toBeInTheDocument();
  });

  it('renders definition for staying in a job longer', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To allow someone to stay in a job or position longer than originally planned\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To postpone or delay an event or discussion until a later time\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To postpone or delay an event or discussion until a later time\./i)).toHaveAttribute(
      'title',
      'To postpone or delay an event or discussion until a later time.'
    );
  });
});

describeSectionToggle(LABEL, 'over', 'holdOver_section_expanded', /To postpone or delay an event or discussion until a later time\./i, renderPage);

describeChevronAndColour(LABEL, 'over', renderPage);

describeDefaultImageCards(LABEL, 'over', 'holdOver', /To postpone or delay an event or discussion until a later time\./i, /we will hold over the architecture discussion until tomorrow/i, renderPage, getCard);
