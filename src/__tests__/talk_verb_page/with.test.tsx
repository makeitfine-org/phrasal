import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'TalkVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('TalkVerbPage — "with" section definitions', () => {
  it('renders definition for having a two-way discussion with someone', () => {
    renderPage();
    expandSection('with');
    expect(screen.getByText(/To have a discussion with someone, often implying a more equal, two-way conversation\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('with');
    expect(screen.getByText(/To have a discussion with someone, often implying a more equal, two-way conversation\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('with');
    expect(screen.getByText(/To have a discussion with someone, often implying a more equal, two-way conversation\./i)).toHaveAttribute(
      'title',
      'To have a discussion with someone, often implying a more equal, two-way conversation.'
    );
  });
});

describeSectionToggle(LABEL, 'with', 'talkWith_section_expanded', /To have a discussion with someone, often implying a more equal, two-way conversation\./i, renderPage);

describeChevronAndColour(LABEL, 'with', renderPage);

describeDefaultImageCards(LABEL, 'with', 'talkWith', /To have a discussion with someone, often implying a more equal, two-way conversation\./i, /I enjoyed talking with you at the conference\./i, renderPage, getCard);
