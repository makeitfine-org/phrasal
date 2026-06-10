import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'LeaveVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('LeaveVerbPage — "behind" section definitions', () => {
  it('renders definition for forgetting to take something when departing', () => {
    renderPage();
    expandSection('behind');
    expect(screen.getByText(/To forget to take someone or something with you when you depart/i)).toBeInTheDocument();
  });

  it('renders definition for permanently moving on', () => {
    renderPage();
    expandSection('behind');
    expect(screen.getByText(/To permanently move on from a situation/i)).toBeInTheDocument();
  });

  it('renders definition for progressing faster than competitors', () => {
    renderPage();
    expandSection('behind');
    expect(screen.getByText(/To progress much faster than competitors/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('behind');
    expect(screen.getByText(/To forget to take someone or something with you when you depart/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('behind');
    expect(screen.getByText(/To forget to take someone or something with you when you depart/i)).toHaveAttribute(
      'title',
      'To forget to take someone or something with you when you depart.'
    );
  });
});

describeSectionToggle(LABEL, 'behind', 'leaveBehind_section_expanded', /To forget to take someone or something with you when you depart/i, renderPage);

describeChevronAndColour(LABEL, 'behind', renderPage);

describeDefaultImageCards(LABEL, 'behind', 'leaveBehind', /To forget to take someone or something with you when you depart/i, /I accidentally left my umbrella behind at the coffee shop\./i, renderPage, getCard);
