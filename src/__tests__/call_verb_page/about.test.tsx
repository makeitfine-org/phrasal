import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'CallVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('CallVerbPage — "about" section definitions', () => {
  it('renders definition for calling about a topic', () => {
    renderPage();
    expandSection('about');
    expect(screen.getByText(/To make a phone call concerning a specific topic\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('about');
    expect(screen.getByText(/To make a phone call concerning a specific topic\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('about');
    expect(screen.getByText(/To make a phone call concerning a specific topic\./i)).toHaveAttribute(
      'title',
      'To make a phone call concerning a specific topic.'
    );
  });
});

describeSectionToggle(LABEL, 'about', 'callAbout_section_expanded', /To make a phone call concerning a specific topic\./i, renderPage);

describeChevronAndColour(LABEL, 'about', renderPage);

describeDefaultImageCards(LABEL, 'about', 'callAbout', /To make a phone call concerning a specific topic\./i, /calling about the open software engineering position/i, renderPage, getCard);
