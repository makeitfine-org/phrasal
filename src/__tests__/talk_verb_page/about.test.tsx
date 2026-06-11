import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'TalkVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('TalkVerbPage — "about" section definitions', () => {
  it('renders definition for discussing a specific topic', () => {
    renderPage();
    expandSection('about');
    expect(screen.getByText(/To discuss a specific topic, person, or idea\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('about');
    expect(screen.getByText(/To discuss a specific topic, person, or idea\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('about');
    expect(screen.getByText(/To discuss a specific topic, person, or idea\./i)).toHaveAttribute(
      'title',
      'To discuss a specific topic, person, or idea.'
    );
  });
});

describeSectionToggle(LABEL, 'about', 'talkAbout_section_expanded', /To discuss a specific topic, person, or idea\./i, renderPage);

describeChevronAndColour(LABEL, 'about', renderPage);

describeDefaultImageCards(LABEL, 'about', 'talkAbout', /To discuss a specific topic, person, or idea\./i, /We need to talk about the new software update\./i, renderPage, getCard);
