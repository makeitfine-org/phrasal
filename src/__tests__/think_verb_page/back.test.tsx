import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'ThinkVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('ThinkVerbPage — "back" section definitions', () => {
  it('renders definition for focusing on past events', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To focus your mind on events that have already happened\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To focus your mind on events that have already happened\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To focus your mind on events that have already happened\./i)).toHaveAttribute(
      'title',
      'To focus your mind on events that have already happened.'
    );
  });
});

describeSectionToggle(LABEL, 'back', 'thinkBack_section_expanded', /To focus your mind on events that have already happened\./i, renderPage);

describeChevronAndColour(LABEL, 'back', renderPage);

describeDefaultImageCards(LABEL, 'back', 'thinkBack', /To focus your mind on events that have already happened\./i, /When I think back to my first job, I realize how much I have learned\./i, renderPage, getCard);
