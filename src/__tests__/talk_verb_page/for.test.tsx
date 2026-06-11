import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'TalkVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('TalkVerbPage — "for" section definitions', () => {
  it('renders definition for speaking on behalf of someone', () => {
    renderPage();
    expandSection('for');
    expect(screen.getByText(/To speak on behalf of someone else or a group\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('for');
    expect(screen.getByText(/To speak on behalf of someone else or a group\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('for');
    expect(screen.getByText(/To speak on behalf of someone else or a group\./i)).toHaveAttribute(
      'title',
      'To speak on behalf of someone else or a group.'
    );
  });
});

describeSectionToggle(LABEL, 'for', 'talkFor_section_expanded', /To speak on behalf of someone else or a group\./i, renderPage);

describeChevronAndColour(LABEL, 'for', renderPage);

describeDefaultImageCards(LABEL, 'for', 'talkFor', /To speak on behalf of someone else or a group\./i, /I can only talk for myself, not the whole department\./i, renderPage, getCard);
