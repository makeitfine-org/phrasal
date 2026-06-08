import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'BringVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('BringVerbPage — "up" section definitions', () => {
  it('renders definition for raising a child', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To care for and raise a child until they are an adult/i)).toBeInTheDocument();
  });

  it('renders definition for mentioning a subject', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To mention a subject or start talking about a specific topic/i)).toBeInTheDocument();
  });

  it('renders definition for making something appear on screen', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To make something appear on a computer screen/i)).toBeInTheDocument();
  });

  it('renders definition for vomiting', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To vomit/i)).toBeInTheDocument();
  });

  it('all 4 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To care for and raise a child until they are an adult/i)).toHaveClass('truncate');
    expect(screen.getByText(/To mention a subject or start talking about a specific topic/i)).toHaveClass('truncate');
    expect(screen.getByText(/To make something appear on a computer screen/i)).toHaveClass('truncate');
    expect(screen.getByText(/To vomit/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To care for and raise a child until they are an adult/i)).toHaveAttribute(
      'title',
      'To care for and raise a child until they are an adult.'
    );
  });
});

describeSectionToggle(LABEL, 'up', 'bringUp_section_expanded', /To care for and raise a child until they are an adult/i, renderPage);

describeChevronAndColour(LABEL, 'up', renderPage);

describeDefaultImageCards(LABEL, 'up', 'bringUp', /To care for and raise a child until they are an adult/i, /She was brought up in a bilingual household/i, renderPage, getCard);
