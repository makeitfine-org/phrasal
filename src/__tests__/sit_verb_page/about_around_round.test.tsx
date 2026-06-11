import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'SitVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('SitVerbPage — "about / around / round" section definitions', () => {
  it('renders definition for spending time doing nothing productive', () => {
    renderPage();
    expandSection('about / around / round');
    expect(screen.getByText(/To spend time doing nothing productive or useful\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('about / around / round');
    expect(screen.getByText(/To spend time doing nothing productive or useful\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('about / around / round');
    expect(screen.getByText(/To spend time doing nothing productive or useful\./i)).toHaveAttribute(
      'title',
      'To spend time doing nothing productive or useful.'
    );
  });
});

describeSectionToggle(LABEL, 'about / around / round', 'sitAbout_section_expanded', /To spend time doing nothing productive or useful\./i, renderPage);

describeChevronAndColour(LABEL, 'about / around / round', renderPage);

describeDefaultImageCards(LABEL, 'about / around / round', 'sitAbout', /To spend time doing nothing productive or useful\./i, /Instead of looking for a new job, he just sits around the house all day\./i, renderPage, getCard);
