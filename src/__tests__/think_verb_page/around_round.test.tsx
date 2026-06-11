import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'ThinkVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('ThinkVerbPage — "around / round" section definitions', () => {
  it('renders definition for considering every perspective to find a solution', () => {
    renderPage();
    expandSection('around / round');
    expect(screen.getByText(/To consider a situation or problem from every possible perspective/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('around / round');
    expect(screen.getByText(/To consider a situation or problem from every possible perspective/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('around / round');
    expect(screen.getByText(/To consider a situation or problem from every possible perspective/i)).toHaveAttribute(
      'title',
      'To consider a situation or problem from every possible perspective in order to find a solution.'
    );
  });
});

describeSectionToggle(LABEL, 'around / round', 'thinkAround_section_expanded', /To consider a situation or problem from every possible perspective/i, renderPage);

describeChevronAndColour(LABEL, 'around / round', renderPage);

describeDefaultImageCards(LABEL, 'around / round', 'thinkAround', /To consider a situation or problem from every possible perspective/i, /The team needs to think around this issue to find a creative fix\./i, renderPage, getCard);
