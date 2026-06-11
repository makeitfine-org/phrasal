import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'TalkVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('TalkVerbPage — "back" section definitions', () => {
  it('renders definition for replying rudely to someone in authority', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To reply rudely to someone in a position of authority/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To reply rudely to someone in a position of authority/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To reply rudely to someone in a position of authority/i)).toHaveAttribute(
      'title',
      'To reply rudely to someone in a position of authority (like a parent, teacher, or boss).'
    );
  });
});

describeSectionToggle(LABEL, 'back', 'talkBack_section_expanded', /To reply rudely to someone in a position of authority/i, renderPage);

describeChevronAndColour(LABEL, 'back', renderPage);

describeDefaultImageCards(LABEL, 'back', 'talkBack', /To reply rudely to someone in a position of authority/i, /The student was sent to the principal for talking back to his teacher\./i, renderPage, getCard);
