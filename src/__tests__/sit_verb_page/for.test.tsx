import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'SitVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('SitVerbPage — "for" section definitions', () => {
  it('renders definition for taking an official exam', () => {
    renderPage();
    expandSection('for');
    expect(screen.getByText(/To take an official exam\./i)).toBeInTheDocument();
  });

  it('renders definition for posing for an artist or photographer', () => {
    renderPage();
    expandSection('for');
    expect(screen.getByText(/To pose for an artist or photographer\./i)).toBeInTheDocument();
  });

  it('renders definition for taking care of children', () => {
    renderPage();
    expandSection('for');
    expect(screen.getByText(/To take care of children while their parents are out/i)).toBeInTheDocument();
  });

  it('all 3 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('for');
    expect(screen.getByText(/To take an official exam\./i)).toHaveClass('truncate');
    expect(screen.getByText(/To pose for an artist or photographer\./i)).toHaveClass('truncate');
    expect(screen.getByText(/To take care of children while their parents are out/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('for');
    expect(screen.getByText(/To take an official exam\./i)).toHaveAttribute(
      'title',
      'To take an official exam.'
    );
  });
});

describeSectionToggle(LABEL, 'for', 'sitFor_section_expanded', /To take an official exam\./i, renderPage);

describeChevronAndColour(LABEL, 'for', renderPage);

describeDefaultImageCards(LABEL, 'for', 'sitFor', /To take an official exam\./i, /She is going to sit for her project management certification next month\./i, renderPage, getCard);
