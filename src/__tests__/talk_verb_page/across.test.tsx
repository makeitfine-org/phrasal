import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'TalkVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('TalkVerbPage — "across" section definitions', () => {
  it('renders definition for speaking at the same time as someone else', () => {
    renderPage();
    expandSection('across');
    expect(screen.getByText(/To speak at the same time as someone else/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('across');
    expect(screen.getByText(/To speak at the same time as someone else/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('across');
    expect(screen.getByText(/To speak at the same time as someone else/i)).toHaveAttribute(
      'title',
      'To speak at the same time as someone else, often in a confusing way where people are not listening to each other.'
    );
  });
});

describeSectionToggle(LABEL, 'across', 'talkAcross_section_expanded', /To speak at the same time as someone else/i, renderPage);

describeChevronAndColour(LABEL, 'across', renderPage);

describeDefaultImageCards(LABEL, 'across', 'talkAcross', /To speak at the same time as someone else/i, /The meeting was a mess because everyone was talking across each other\./i, renderPage, getCard);
