import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'CutVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('CutVerbPage — "about / round" section definitions', () => {
  it('renders definition for moving around aimlessly', () => {
    renderPage();
    expandSection('about / round');
    expect(screen.getByText(/To move or run around actively or aimlessly/i)).toBeInTheDocument();
  });

  it('renders definition for taking a shortcut around an obstacle', () => {
    renderPage();
    expandSection('about / round');
    expect(screen.getByText(/To take a quick shortcut around an obstacle/i)).toBeInTheDocument();
  });

  it('all 2 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('about / round');
    expect(screen.getByText(/To move or run around actively or aimlessly/i)).toHaveClass('truncate');
    expect(screen.getByText(/To take a quick shortcut around an obstacle/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('about / round');
    expect(screen.getByText(/To move or run around actively or aimlessly/i)).toHaveAttribute(
      'title',
      'To move or run around actively or aimlessly (UK Informal).'
    );
  });
});

describeSectionToggle(LABEL, 'about / round', 'cutAbout_section_expanded', /To move or run around actively or aimlessly/i, renderPage);

describeChevronAndColour(LABEL, 'about / round', renderPage);

describeDefaultImageCards(LABEL, 'about / round', 'cutAbout', /To move or run around actively or aimlessly/i, /The kids were cutting about/i, renderPage, getCard);
