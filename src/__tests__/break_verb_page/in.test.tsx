import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'BreakVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('BreakVerbPage — "in" section definitions', () => {
  it('renders definition for entering a building illegally', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To enter a building by force or illegally \(intransitive\)/i)).toBeInTheDocument();
  });

  it('renders definition for interrupting a conversation', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To interrupt a conversation/i)).toBeInTheDocument();
  });

  it('renders definition for wearing in new shoes', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To wear new shoes or use new equipment until they become comfortable/i)).toBeInTheDocument();
  });

  it('renders definition for training a new employee or animal', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To train a new employee, or to train an animal/i)).toBeInTheDocument();
  });

  it('all 4 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To enter a building by force or illegally \(intransitive\)/i)).toHaveClass('truncate');
    expect(screen.getByText(/To interrupt a conversation/i)).toHaveClass('truncate');
    expect(screen.getByText(/To wear new shoes or use new equipment until they become comfortable/i)).toHaveClass('truncate');
    expect(screen.getByText(/To train a new employee, or to train an animal/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To enter a building by force or illegally \(intransitive\)/i)).toHaveAttribute(
      'title',
      'To enter a building by force or illegally (intransitive).'
    );
  });
});

describeSectionToggle(LABEL, 'in', 'breakIn_section_expanded', /To enter a building by force or illegally \(intransitive\)/i, renderPage);

describeChevronAndColour(LABEL, 'in', renderPage);

describeDefaultImageCards(LABEL, 'in', 'breakIn', /To enter a building by force or illegally \(intransitive\)/i, /Thieves broke in while we were away/i, renderPage, getCard);
