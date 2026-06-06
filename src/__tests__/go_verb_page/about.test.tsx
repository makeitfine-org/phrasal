import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'GoVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('GoVerbPage — "about" section definitions', () => {
  it('renders definition for beginning to tackle a task', () => {
    renderPage();
    expandSection('about');
    expect(screen.getByText(/To begin to tackle a task or problem/i)).toBeInTheDocument();
  });

  it('renders definition for behaving in a normal way', () => {
    renderPage();
    expandSection('about');
    expect(screen.getByText(/To behave or do things in a normal or usual way/i)).toBeInTheDocument();
  });
});

describeSectionToggle(LABEL, 'about', 'goAbout_section_expanded', /To begin to tackle a task or problem/i, renderPage);

describeChevronAndColour(LABEL, 'about', renderPage);

describeDefaultImageCards(LABEL, 'about', 'goAbout', /To begin to tackle a task or problem/i, /"I don't know how to go about fixing this complex bug/i, renderPage, getCard);
