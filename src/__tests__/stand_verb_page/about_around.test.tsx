import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'StandVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('StandVerbPage — "about / around" section definitions', () => {
  it('renders definition for spending time doing nothing or waiting', () => {
    renderPage();
    expandSection('about / around');
    expect(screen.getByText(/To spend time in a place doing nothing or waiting\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('about / around');
    expect(screen.getByText(/To spend time in a place doing nothing or waiting\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('about / around');
    expect(screen.getByText(/To spend time in a place doing nothing or waiting\./i)).toHaveAttribute(
      'title',
      'To spend time in a place doing nothing or waiting.'
    );
  });
});

describeSectionToggle(LABEL, 'about / around', 'standAbout_section_expanded', /To spend time in a place doing nothing or waiting\./i, renderPage);

describeChevronAndColour(LABEL, 'about / around', renderPage);

describeDefaultImageCards(LABEL, 'about / around', 'standAbout', /To spend time in a place doing nothing or waiting\./i, /We were just standing around waiting for the meeting to start\./i, renderPage, getCard);
