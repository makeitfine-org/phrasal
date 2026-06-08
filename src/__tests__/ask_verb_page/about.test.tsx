import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'AskVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('AskVerbPage — "about" section definitions', () => {
  it('renders definition for getting information', () => {
    renderPage();
    expandSection('about');
    expect(screen.getByText(/To try to get information about a subject or a person/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('about');
    expect(screen.getByText(/To try to get information about a subject or a person/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('about');
    expect(screen.getByText(/To try to get information about a subject or a person/i)).toHaveAttribute(
      'title',
      'To try to get information about a subject or a person.'
    );
  });
});

describeSectionToggle(LABEL, 'about', 'askAbout_section_expanded', /To try to get information about a subject or a person/i, renderPage);

describeChevronAndColour(LABEL, 'about', renderPage);

describeDefaultImageCards(LABEL, 'about', 'askAbout', /To try to get information about a subject or a person/i, /I need to call the hotel to ask about their parking rules/i, renderPage, getCard);
