import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'TalkVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('TalkVerbPage — "up" section definitions', () => {
  it('renders definition for praising or promoting something', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To praise or promote something to make it sound very good or exciting\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To praise or promote something to make it sound very good or exciting\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To praise or promote something to make it sound very good or exciting\./i)).toHaveAttribute(
      'title',
      'To praise or promote something to make it sound very good or exciting.'
    );
  });
});

describeSectionToggle(LABEL, 'up', 'talkUp_section_expanded', /To praise or promote something to make it sound very good or exciting\./i, renderPage);

describeChevronAndColour(LABEL, 'up', renderPage);

describeDefaultImageCards(LABEL, 'up', 'talkUp', /To praise or promote something to make it sound very good or exciting\./i, /They are really talking up the new product launch\./i, renderPage, getCard);
