import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'ZipVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('ZipVerbPage — "about / around / round" section definitions', () => {
  it('renders definition for moving quickly around an area', () => {
    renderPage();
    expandSection('about / around / round');
    expect(screen.getByText(/To move quickly and energetically from one place to another within an area\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('about / around / round');
    const def = screen.getByText(/To move quickly and energetically from one place to another within an area\./i);
    expect(def).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('about / around / round');
    expect(screen.getByText(/To move quickly and energetically from one place to another within an area\./i)).toHaveAttribute(
      'title',
      'To move quickly and energetically from one place to another within an area.'
    );
  });
});

describeSectionToggle(LABEL, 'about / around / round', 'zipAbout_section_expanded', /To move quickly and energetically from one place to another within an area\./i, renderPage);

describeChevronAndColour(LABEL, 'about / around / round', renderPage);

describeDefaultImageCards(LABEL, 'about / around / round', 'zipAbout', /To move quickly and energetically from one place to another within an area\./i, /She spent the entire Saturday zipping around town running errands\./i, renderPage, getCard);
