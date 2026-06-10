import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'HangVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('HangVerbPage — "behind" section definitions', () => {
  it('renders definition for staying in a place after other people have left', () => {
    renderPage();
    expandSection('behind');
    expect(screen.getByText(/To stay in a place after other people have already left\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('behind');
    expect(screen.getByText(/To stay in a place after other people have already left\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('behind');
    expect(screen.getByText(/To stay in a place after other people have already left\./i)).toHaveAttribute(
      'title',
      'To stay in a place after other people have already left.'
    );
  });
});

describeSectionToggle(LABEL, 'behind', 'hangBehind_section_expanded', /To stay in a place after other people have already left\./i, renderPage);

describeChevronAndColour(LABEL, 'behind', renderPage);

describeDefaultImageCards(LABEL, 'behind', 'hangBehind', /To stay in a place after other people have already left\./i, /The lead developer hung behind after the meeting to ask a few more questions\./i, renderPage, getCard);
