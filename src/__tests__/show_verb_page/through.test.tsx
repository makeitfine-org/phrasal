import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'ShowVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('ShowVerbPage — "through" section definitions', () => {
  it('renders definition for being visible under a layer of something', () => {
    renderPage();
    expandSection('through');
    expect(screen.getByText(/To be visible under or through a layer of something else/i)).toBeInTheDocument();
  });

  it('renders definition for an emotion becoming obvious', () => {
    renderPage();
    expandSection('through');
    expect(screen.getByText(/To become obvious or visible, referring to an emotion or quality/i)).toBeInTheDocument();
  });

  it('all 2 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('through');
    expect(screen.getByText(/To be visible under or through a layer of something else/i)).toHaveClass('truncate');
    expect(screen.getByText(/To become obvious or visible, referring to an emotion or quality/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('through');
    expect(screen.getByText(/To be visible under or through a layer of something else/i)).toHaveAttribute(
      'title',
      'To be visible under or through a layer of something else (like cloth or paper).'
    );
  });
});

describeSectionToggle(LABEL, 'through', 'showThrough_section_expanded', /To be visible under or through a layer of something else/i, renderPage);

describeChevronAndColour(LABEL, 'through', renderPage);

describeDefaultImageCards(LABEL, 'through', 'showThrough', /To be visible under or through a layer of something else/i, /You need to apply another coat of paint; the old dark color is showing through\./i, renderPage, getCard);
