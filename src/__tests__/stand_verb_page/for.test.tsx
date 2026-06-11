import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'StandVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('StandVerbPage — "for" section definitions', () => {
  it('renders definition for representing a word or idea', () => {
    renderPage();
    expandSection('for');
    expect(screen.getByText(/To represent a word or idea/i)).toBeInTheDocument();
  });

  it('renders definition for tolerating or accepting', () => {
    renderPage();
    expandSection('for');
    expect(screen.getByText(/To tolerate or accept/i)).toBeInTheDocument();
  });

  it('renders definition for supporting a cause or principle', () => {
    renderPage();
    expandSection('for');
    expect(screen.getByText(/To support a cause or principle\./i)).toBeInTheDocument();
  });

  it('all 3 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('for');
    expect(screen.getByText(/To represent a word or idea/i)).toHaveClass('truncate');
    expect(screen.getByText(/To tolerate or accept/i)).toHaveClass('truncate');
    expect(screen.getByText(/To support a cause or principle\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('for');
    expect(screen.getByText(/To represent a word or idea/i)).toHaveAttribute(
      'title',
      'To represent a word or idea (for abbreviations).'
    );
  });
});

describeSectionToggle(LABEL, 'for', 'standFor_section_expanded', /To represent a word or idea/i, renderPage);

describeChevronAndColour(LABEL, 'for', renderPage);

describeDefaultImageCards(LABEL, 'for', 'standFor', /To represent a word or idea/i, /In software development, API stands for Application Programming Interface\./i, renderPage, getCard);
