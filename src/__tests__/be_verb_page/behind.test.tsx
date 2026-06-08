import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'BeVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('BeVerbPage — "behind" section definitions', () => {
  it('renders definition for being late or delayed', () => {
    renderPage();
    expandSection('behind');
    expect(screen.getByText(/To be late or delayed\./i)).toBeInTheDocument();
  });

  it('renders definition for supporting someone', () => {
    renderPage();
    expandSection('behind');
    expect(screen.getByText(/To support someone or something\./i)).toBeInTheDocument();
  });

  it('all 2 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('behind');
    expect(screen.getByText(/To be late or delayed\./i)).toHaveClass('truncate');
    expect(screen.getByText(/To support someone or something\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('behind');
    expect(screen.getByText(/To be late or delayed\./i)).toHaveAttribute('title', 'To be late or delayed.');
  });
});

describeSectionToggle(LABEL, 'behind', 'beBehind_section_expanded', /To be late or delayed\./i, renderPage);

describeChevronAndColour(LABEL, 'behind', renderPage);

describeDefaultImageCards(LABEL, 'behind', 'beBehind', /To be late or delayed\./i, /We are two weeks behind schedule on this project/i, renderPage, getCard);
