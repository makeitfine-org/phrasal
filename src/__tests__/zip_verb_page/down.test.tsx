import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'ZipVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('ZipVerbPage — "down" section definitions', () => {
  it('renders definition for unfastening a zipper downward', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To unfasten a zipper by moving it in a downward direction\./i)).toBeInTheDocument();
  });

  it('renders definition for travelling quickly down a path', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To travel quickly down a path, road, or digital page\./i)).toBeInTheDocument();
  });

  it('all 2 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('down');
    const defs = [
      screen.getByText(/To unfasten a zipper by moving it in a downward direction\./i),
      screen.getByText(/To travel quickly down a path, road, or digital page\./i),
    ];
    defs.forEach(el => expect(el).toHaveClass('truncate'));
  });

  it('first definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To unfasten a zipper by moving it in a downward direction\./i)).toHaveAttribute(
      'title',
      'To unfasten a zipper by moving it in a downward direction.'
    );
  });

  it('second definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To travel quickly down a path, road, or digital page\./i)).toHaveAttribute(
      'title',
      'To travel quickly down a path, road, or digital page.'
    );
  });
});

describeSectionToggle(LABEL, 'down', 'zipDown_section_expanded', /To unfasten a zipper by moving it in a downward direction\./i, renderPage);

describeChevronAndColour(LABEL, 'down', renderPage);

describeDefaultImageCards(LABEL, 'down', 'zipDown', /To unfasten a zipper by moving it in a downward direction\./i, /He zipped down his jacket because the sun came out\./i, renderPage, getCard);
