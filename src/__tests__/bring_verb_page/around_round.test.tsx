import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'BringVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('BringVerbPage — "around / round" section definitions', () => {
  it('renders definition for persuading someone to agree', () => {
    renderPage();
    expandSection('around / round');
    expect(screen.getByText(/To persuade someone to agree with your point of view/i)).toBeInTheDocument();
  });

  it('renders definition for restoring someone to consciousness', () => {
    renderPage();
    expandSection('around / round');
    expect(screen.getByText(/To restore someone to consciousness/i)).toBeInTheDocument();
  });

  it('renders definition for bringing something to a place', () => {
    renderPage();
    expandSection('around / round');
    expect(screen.getByText(/To bring someone or something to a place/i)).toBeInTheDocument();
  });

  it('renders definition for introducing a topic into conversation', () => {
    renderPage();
    expandSection('around / round');
    expect(screen.getByText(/To gradually introduce a specific topic into a conversation/i)).toBeInTheDocument();
  });

  it('all 4 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('around / round');
    expect(screen.getByText(/To persuade someone to agree with your point of view/i)).toHaveClass('truncate');
    expect(screen.getByText(/To restore someone to consciousness/i)).toHaveClass('truncate');
    expect(screen.getByText(/To bring someone or something to a place/i)).toHaveClass('truncate');
    expect(screen.getByText(/To gradually introduce a specific topic into a conversation/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('around / round');
    expect(screen.getByText(/To persuade someone to agree with your point of view/i)).toHaveAttribute(
      'title',
      'To persuade someone to agree with your point of view.'
    );
  });
});

describeSectionToggle(LABEL, 'around / round', 'bringAround_section_expanded', /To persuade someone to agree with your point of view/i, renderPage);

describeChevronAndColour(LABEL, 'around / round', renderPage);

describeDefaultImageCards(LABEL, 'around / round', 'bringAround', /To persuade someone to agree with your point of view/i, /He didn't want to use the new software/i, renderPage, getCard);
