import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'AskVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('AskVerbPage — "back" section definitions', () => {
  it('renders definition for inviting someone to return to a place', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To invite someone to return to a place/i)).toBeInTheDocument();
  });

  it('renders definition for inviting someone for a second interview', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To invite someone to return for a second job interview/i)).toBeInTheDocument();
  });

  it('all 2 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To invite someone to return to a place/i)).toHaveClass('truncate');
    expect(screen.getByText(/To invite someone to return for a second job interview/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To invite someone to return to a place/i)).toHaveAttribute(
      'title',
      'To invite someone to return to a place (like your house or an event).'
    );
  });
});

describeSectionToggle(LABEL, 'back', 'askBack_section_expanded', /To invite someone to return to a place/i, renderPage);

describeChevronAndColour(LABEL, 'back', renderPage);

describeDefaultImageCards(LABEL, 'back', 'askBack', /To invite someone to return to a place/i, /We had a great time with them/i, renderPage, getCard);
